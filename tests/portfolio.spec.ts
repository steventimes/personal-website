import { expect, test } from "@playwright/test";

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.close();
});

test("renders the evidence-led page order and primary actions", async ({ page }) => {
  await page.route("https://api.github.com/**", (route) => route.abort());
  await page.goto("/");

  await expect(page.getByRole("heading", {
    level: 1,
    name: "Hongchen (Steven) Yang"
  })).toBeVisible();
  await expect(page.getByText("Database systems researcher and software engineer.")).toBeVisible();
  await expect(page.getByRole("link", { name: "View résumé" })).toHaveAttribute("href", "/resume.pdf");
  await expect(page.getByRole("link", { name: "Email Steven" })).toHaveAttribute("href", /^mailto:/);

  const sectionHeadings = await page.locator("main h2").allTextContents();
  expect(sectionHeadings).toEqual([
    "Selected Work",
    "Experience",
    "Technical Stack",
    "Public Code",
    "Contact"
  ]);

  for (const id of ["about", "projects", "experience", "skills", "repos", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
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

test("uses the locked palette and portrait ratio", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const portrait = page.getByRole("img", { name: /Hongchen.*portrait/i });
  const box = await portrait.boundingBox();
  expect(box).not.toBeNull();
  expect(Math.abs((box!.width / box!.height) - (4 / 3))).toBeLessThan(0.03);
});

test("captures concept comparison screenshots", async ({ page }) => {
  await page.route("https://api.github.com/**", (route) => route.abort());

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/steven-portfolio-desktop-full.png", fullPage: true });
  await page.locator("#about").screenshot({ path: "/tmp/steven-portfolio-hero.png" });
  await page.locator("#projects").screenshot({ path: "/tmp/steven-portfolio-work.png" });
  await page.locator("#experience").screenshot({ path: "/tmp/steven-portfolio-experience.png" });
  await page.locator("#skills").screenshot({ path: "/tmp/steven-portfolio-stack.png" });
  await page.locator("#repos").screenshot({ path: "/tmp/steven-portfolio-repos.png" });
  await page.locator("#contact").screenshot({ path: "/tmp/steven-portfolio-contact.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/steven-portfolio-mobile.png", fullPage: false });
});

test("uses locked work title and command dialog styles", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", {
    level: 3,
    name: "Fragmented higher-education data and text-to-SQL"
  })).toHaveCSS("font-size", "22px");

  await page.getByRole("button", { name: "Search" }).click();
  const dialog = page.getByRole("dialog", { name: "Navigate" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Navigate" })).toHaveCSS("color", "rgb(17, 19, 24)");

  const input = dialog.getByRole("searchbox", { name: "Search" });
  await expect(input).toHaveCSS("color", "rgb(17, 19, 24)");
  await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(input).toHaveCSS("border-color", "rgb(217, 221, 227)");
  await expect(dialog.getByRole("button", { name: "Close" })).toHaveCSS("color", "rgb(89, 97, 108)");
});

test("command search supports keyboard filtering and navigation", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Control+K");
  await page.getByRole("searchbox", { name: "Search" }).fill("Work");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#projects");
});

test("command trigger keeps aria-expanded in sync", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /Search/ });

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Control+K");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("JavaScript-disabled mobile navigation keeps section links available", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();

  try {
    await page.goto("/");
    await page.getByText("Menu", { exact: true }).click();
    await page.getByRole("link", { name: "Experience" }).click();
    expect(await page.evaluate(() => location.hash)).toBe("#experience");
    await expect(page.locator("[data-command-trigger]")).toBeHidden();
  } finally {
    await context.close();
  }
});

test("keeps the static repository snapshot when GitHub fails", async ({ page }) => {
  await page.route("https://api.github.com/**", (route) => route.abort());
  await page.goto("/");
  for (const name of [
    "fpstreams",
    "soccer-analytics",
    "high-ed-data-generator",
    "Prompt-Testing-Framework"
  ]) {
    await expect(page.getByRole("link", { name: new RegExp(name, "i") })).toBeVisible();
  }
  await expect(page.getByText("Live GitHub data unavailable.")).toBeVisible();
});

test("refreshes repository metadata while preserving authored content", async ({ page }) => {
  await page.route("https://api.github.com/**", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([{
      name: "fpstreams",
      description: "Remote description that must not replace authored content.",
      html_url: "https://github.com/steventimes/remote-fpstreams-url",
      language: "Rust",
      stargazers_count: 2,
      forks_count: 1,
      updated_at: "2026-07-12T10:00:00Z",
      fork: false
    }])
  }));
  await page.goto("/");

  const row = page.locator('[data-repo-name="fpstreams"]');
  await expect(row.getByText("2 stars", { exact: true })).toBeVisible();
  await expect(row.getByText(
    "A typed functional programming library for Python with lazy streams, Option and Result containers, parallel processing, and optional Rust acceleration.",
    { exact: true }
  )).toBeVisible();
  await expect(row.getByRole("link", { name: "fpstreams" })).toHaveAttribute(
    "href",
    "https://github.com/steventimes/fpstreams"
  );
});
