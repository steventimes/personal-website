import { expect, test } from "@playwright/test";

test("renders the research-first hero and research hierarchy", async ({ page }) => {
  await page.goto("/");

  const introduction = page.locator("#about");
  await expect(introduction.getByRole("heading", {
    level: 1,
    name: "Hongchen (Steven) Yang"
  })).toHaveCount(1);
  await expect(introduction.getByText(
    "I study adaptive storage systems and build agent workflows for real operational tasks.",
    { exact: true }
  )).toBeVisible();
  await expect(introduction.getByText("Hero", { exact: true })).toHaveCount(0);
  await expect(introduction.getByRole("link", { name: "Email", exact: true })).toHaveAttribute("href", /^mailto:/);
  await expect(introduction.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/steventimes"
  );
  await expect(introduction.getByRole("link", { name: "Résumé", exact: true })).toHaveAttribute("href", "/resume.pdf");
  await expect(introduction.getByText("B.S. Computer Science", { exact: true })).toBeVisible();
  await expect(introduction.getByText("Mathematics minor", { exact: true })).toHaveCount(0);

  await expect(page.getByRole("heading", {
    level: 3,
    name: "FluidLSM and workload-aware RocksDB tuning"
  })).toBeVisible();
  await expect(page.locator(".research-trace li")).toHaveText([
    "Workload shifts",
    "Compaction behavior",
    "Adaptive tuning",
    "FluidLSM"
  ]);
  await expect(page.getByRole("heading", {
    level: 3,
    name: "Data fragmentation and text-to-SQL evaluation"
  })).toBeVisible();
});

test("uses the research-first page order and no runtime search hooks", async ({ page }) => {
  await page.goto("/");

  expect(await page.locator("main h2").allTextContents()).toEqual([
    "Research",
    "Experience",
    "Public Code",
    "Other Work",
    "Technical Profile",
    "Contact"
  ]);

  for (const id of ["about", "research", "experience", "code", "other-work", "skills", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  await expect(page.locator("[data-command-palette], [data-command-trigger], [data-repo-cards]")).toHaveCount(0);
  const requestedUrls = await page.evaluate(() => performance
    .getEntriesByType("resource")
    .map((entry) => entry.name));
  expect(requestedUrls.some((url) => url.includes("api.github.com"))).toBe(false);
});

test("features the latest internship and keeps its code link in context", async ({ page }) => {
  await page.goto("/");

  const internship = page.locator(".experience-feature");
  await expect(internship.getByRole("heading", { name: "AI Development Intern" })).toBeVisible();
  await expect(internship.getByText("Hefei City Cloud Data Center Co., Ltd.", { exact: true })).toBeVisible();
  await expect(internship.getByText("Jun 2026 – Aug 2026", { exact: true })).toBeVisible();
  await expect(internship.getByRole("link", {
    name: /View reimbursement workflow code/
  })).toHaveAttribute("href", "https://github.com/steventimes/Email-project-yudao");
  await expect(internship.locator(".experience-feature__work > li")).toHaveCount(3);
  await expect(page.locator(".experience-list > li")).toHaveCount(2);
  await expect(page.locator("#code").getByText("Email-project-yudao", { exact: true })).toHaveCount(0);
});

test("renders curated public code and deployment-only other work", async ({ page }) => {
  await page.goto("/");

  const projects = page.locator("#code .project-row");
  await expect(projects).toHaveCount(2);
  await expect(projects.nth(0).getByRole("heading", { name: "fpstreams" })).toBeVisible();
  await expect(projects.nth(1).getByRole("heading", { name: "dependency-checker" })).toBeVisible();
  await expect(projects.nth(1)).toContainText("coding-agent skill");
  await expect(page.locator("#code").getByText(/soccer-analytics|Prompt-Testing-Framework|high-ed-data-generator/)).toHaveCount(0);

  await expect(page.getByRole("link", { name: /Open Software Systems Atlas/ })).toHaveAttribute(
    "href",
    "https://software-systems-atlas.pages.dev"
  );
  await expect(page.locator('a[href*="github.com/steventimes/software-system-atlas"]')).toHaveCount(0);
});

test("uses the restrained systems-research visual system", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(247, 249, 252)");
  await expect(page.locator(".research-primary")).toHaveCSS("border-top-color", "rgb(34, 84, 209)");
  await expect(page.locator(".research-secondary")).toHaveCSS("border-top-color", "rgb(20, 125, 119)");

  const portrait = await page.getByRole("img", { name: /Hongchen.*portrait/i }).boundingBox();
  expect(portrait).not.toBeNull();
  expect(portrait!.width).toBeGreaterThan(220);
  expect(portrait!.width).toBeLessThan(420);
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 360, height: 800 }
]) {
  test(`has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("JavaScript-disabled mobile navigation keeps section links available", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();

  try {
    await page.goto("/");
    await page.getByText("Menu", { exact: true }).click();
    await page.getByRole("link", { name: "Experience", exact: true }).click();
    expect(await page.evaluate(() => location.hash)).toBe("#experience");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  } finally {
    await context.close();
  }
});
