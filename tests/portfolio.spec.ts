import { expect, test } from "@playwright/test";

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
