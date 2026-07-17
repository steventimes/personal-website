import { expect, test } from "@playwright/test";

const githubApiPattern = "https://api.github.com/**";

test.beforeEach(async ({ page }) => {
  await page.route(githubApiPattern, (route) => route.abort());
});

test("renders the evidence-led page order and primary actions", async ({ page }) => {
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

test("presents a compact research profile", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("#about");
  await expect(hero.getByText(
    "Brandeis University · B.S. Computer Science · Mathematics minor · December 2026",
    { exact: true }
  )).toBeVisible();
  await expect(hero.getByText(
    "3.748 GPA · Dean's List every semester",
    { exact: true }
  )).toBeVisible();

  const featured = page.locator(".work-item--featured");
  await expect(featured.getByText("Current research", { exact: true })).toBeVisible();
  await expect(featured.locator("dt", { hasText: "Question" })).toBeVisible();
  await expect(featured.locator("dt", { hasText: "Contribution" })).toBeVisible();
  await expect(page.locator(".timeline__status", { hasText: "Current" })).toHaveCount(3);
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

test("uses the research-memo palette, type scale, and portrait ratio", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(247, 248, 250)");

  const portrait = page.getByRole("img", { name: /Hongchen.*portrait/i });
  const box = await portrait.boundingBox();
  expect(box).not.toBeNull();
  expect(Math.abs((box!.width / box!.height) - (4 / 3))).toBeLessThan(0.03);

  const title = page.getByRole("heading", {
    level: 3,
    name: "FluidLSM and workload-aware RocksDB tuning"
  });
  const size = Number.parseFloat(await title.evaluate(
    (element) => getComputedStyle(element).fontSize
  ));
  expect(size).toBeGreaterThanOrEqual(30);
  expect(size).toBeLessThanOrEqual(38);
  await expect(page.locator(".work-item--featured")).toHaveCSS(
    "border-left-color",
    "rgb(36, 87, 166)"
  );
});

test("captures concept comparison screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/steven-portfolio-desktop-first-viewport.png", fullPage: false });
  await page.screenshot({ path: "/tmp/steven-portfolio-desktop-full.png", fullPage: true });
  await page.locator("#about").screenshot({ path: "/tmp/steven-portfolio-hero.png" });
  await page.locator("#projects").screenshot({ path: "/tmp/steven-portfolio-work.png" });
  await page.locator("#experience").screenshot({ path: "/tmp/steven-portfolio-experience.png" });
  await page.locator("#skills").screenshot({ path: "/tmp/steven-portfolio-stack.png" });
  await page.locator("#repos").screenshot({ path: "/tmp/steven-portfolio-repos.png" });
  await page.locator("#contact").screenshot({ path: "/tmp/steven-portfolio-contact.png" });
  await page.locator(".site-footer").screenshot({ path: "/tmp/steven-portfolio-footer.png" });

  await page.getByRole("button", { name: "Search" }).click();
  const commandDialog = page.getByRole("dialog", { name: "Navigate" });
  const commandInput = commandDialog.getByRole("searchbox", { name: "Search" });
  await commandInput.press("ArrowDown");
  await commandDialog.screenshot({ path: "/tmp/steven-portfolio-command.png" });
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/steven-portfolio-mobile.png", fullPage: false });
  await page.locator(".site-header__menu > summary").click();
  await page.screenshot({ path: "/tmp/steven-portfolio-mobile-menu.png", fullPage: false });
  const menuOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(menuOverflow).toBeLessThanOrEqual(0);
});

test("uses restrained work title and command dialog styles", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", {
    level: 3,
    name: "Fragmented higher-education data and text-to-SQL"
  })).toHaveCSS("font-size", "24px");

  const searchTrigger = page.getByRole("button", { name: "Search" });
  await expect(searchTrigger).toHaveCSS("column-gap", "8px");
  await searchTrigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigate" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Navigate" })).toHaveCSS("color", "rgb(23, 25, 31)");

  const input = dialog.getByRole("searchbox", { name: "Search" });
  await expect(input).toHaveCSS("color", "rgb(23, 25, 31)");
  await expect(input).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(input).toHaveCSS("border-color", "rgb(216, 221, 229)");
  await expect(dialog.getByRole("button", { name: "Close" })).toHaveCSS("color", "rgb(89, 97, 112)");
  await input.press("ArrowDown");
  const activeOption = dialog.locator("[role='option'][aria-selected='true']");
  await expect(activeOption).toHaveCSS("background-color", "rgb(247, 248, 250)");
  await expect(activeOption).toHaveCSS("border-left-color", "rgb(36, 87, 166)");
});

test("command search supports keyboard filtering and navigation", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Control+K");
  await page.getByRole("searchbox", { name: "Search" }).fill("Work");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#projects");
});

test("command search uses the approved empty-state copy", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+K");
  await page.getByRole("searchbox", { name: "Search" }).fill("no such destination");
  await expect(page.getByText("No matching destination.")).toBeVisible();
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

test("every command close path clears active option state", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /Search/ });
  const dialog = page.locator("[data-command-palette]");
  const input = dialog.locator("[data-command-input]");
  const firstOption = dialog.locator("[role='option']").first();

  await trigger.click();
  await input.press("ArrowDown");
  await expect(input).toHaveAttribute("aria-activedescendant", /option-/);
  await expect(firstOption).toHaveAttribute("aria-selected", "true");
  await firstOption.click();

  await expect(dialog).not.toBeVisible();
  await expect(input).not.toHaveAttribute("aria-activedescendant", /.+/);
  await expect(firstOption).toHaveAttribute("aria-selected", "false");

  await trigger.click();
  await input.press("ArrowDown");
  await dialog.getByRole("button", { name: "Close" }).focus();
  await page.keyboard.press("Escape");

  await expect(dialog).not.toBeVisible();
  await expect(input).not.toHaveAttribute("aria-activedescendant", /.+/);
  await expect(firstOption).toHaveAttribute("aria-selected", "false");
});

test("Tab keeps command focus inside the modal", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /Search/ });
  const dialog = page.getByRole("dialog", { name: "Navigate" });
  const input = dialog.getByRole("searchbox", { name: "Search" });
  const closeButton = dialog.getByRole("button", { name: "Close" });

  await trigger.focus();
  await page.keyboard.press("Control+K");
  await expect(input).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(dialog).toBeVisible();
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await expect(dialog.locator("[role='option']").first()).toHaveAttribute("tabindex", "-1");

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
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
  await page.goto("/");
  for (const name of [
    "software-system-atlas",
    "fpstreams",
    "soccer-analytics",
    "high-ed-data-generator",
    "Prompt-Testing-Framework"
  ]) {
    await expect(page.getByRole("link", { name: new RegExp(name, "i") })).toBeVisible();
  }
  await expect(page.getByText(
    "A bilingual software-systems curriculum with 14 volumes, 320 chapter files, machine-readable catalogs, and automated documentation checks.",
    { exact: true }
  )).toBeVisible();
  await expect(page.getByText("Live GitHub data unavailable.")).toBeVisible();
});

test("refreshes repository metadata while preserving authored content", async ({ page }) => {
  await page.unroute(githubApiPattern);
  await page.route(githubApiPattern, (route) => route.fulfill({
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
    }, {
      name: "soccer-analytics"
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
  await expect(row.getByText("Rust", { exact: true })).toBeVisible();
  await expect(row.getByText("1 fork", { exact: true })).toBeVisible();

  const staticRow = page.locator('[data-repo-name="soccer-analytics"]');
  await expect(staticRow.getByText("Python", { exact: true })).toBeVisible();
  await expect(staticRow.getByText("0 stars", { exact: true })).toBeVisible();
  await expect(staticRow.getByText("0 forks", { exact: true })).toBeVisible();
  await expect(page.getByText("Live GitHub data unavailable.")).toBeHidden();
});
