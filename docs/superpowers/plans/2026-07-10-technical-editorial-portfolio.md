# Technical Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current single-page portfolio as a restrained technical editorial site that proves Steven's database-systems and engineering work through selected case studies, reliable public-code evidence, and accessible navigation.

**Architecture:** Keep Astro static output, Tailwind CSS 4, typed content in `src/data/site.ts`, and browser-native TypeScript for progressive enhancement. Astro renders all portfolio and repository snapshot content at build time; client scripts add the command palette and refresh repository metadata without replacing the static fallback.

**Tech Stack:** Astro 7, Tailwind CSS 4, TypeScript, IBM Plex variable fonts, Vitest, Playwright, GitHub Pages

## Global Constraints

- Use Node 22.12 or newer and npm 9.6.5 or newer.
- Keep Astro static output and the existing GitHub Pages root-site configuration.
- Build on the current uncommitted Astro 7 and Tailwind CSS 4 migration; do not restore files from HEAD.
- Preserve the Google verification tag, favicon, resume, headshot, contact links, and anchors `#about`, `#projects`, `#experience`, `#skills`, `#repos`, and `#contact`.
- Keep all visible copy in English and keep factual claims within the approved design spec.
- Use a true white `#ffffff` page background, near-black `#111318` text, cool gray `#59616c`, rule `#d9dde3`, accent `#1559d6`, accent hover `#0f46ad`, and subtle band `#f5f7fa`.
- Add no hero eyebrow, badge, gradient, glow, decorative dashboard, bento grid, pill-heavy layout, fake metric, color wash, or section entrance animation.
- Render useful static repository content before JavaScript runs.
- Preserve accessible keyboard focus and `prefers-reduced-motion` behavior.
- Stage only the files listed in each task. Existing unrelated dirty files remain untouched until their assigned task.

## File Map

**Create**

- `src/components/SiteHeader.astro`: desktop navigation, native mobile menu, Resume link, command trigger.
- `src/components/Hero.astro`: identity, positioning, portrait, actions, profile metadata.
- `src/components/SelectedWork.astro`: selected technical case-study rows.
- `src/components/TechnicalStack.astro`: compact technology matrix.
- `src/components/RepoList.astro`: static repository snapshot and live-update hooks.
- `src/components/Contact.astro`: contact block.
- `src/lib/commands.ts`: pure command filtering and active-index helpers.
- `src/lib/repositories.ts`: GitHub validation, ranking, and snapshot merge helpers.
- `src/lib/commands.test.ts`: Vitest coverage for command helpers.
- `src/lib/repositories.test.ts`: Vitest coverage for GitHub helpers.
- `tests/portfolio.spec.ts`: Playwright content, interaction, failure, no-JavaScript, and responsive checks.
- `playwright.config.ts`: local Astro web server and Chromium configuration.
- `docs/superpowers/concepts/technical-editorial/inventory.md`: extracted visual system and allowed-copy inventory.
- `docs/superpowers/verification/2026-07-10-technical-editorial-fidelity.md`: final concept-to-render ledger.

**Modify**

- `package.json`: fonts, checking, unit-test, and browser-test dependencies and scripts.
- `package-lock.json`: exact dependency graph.
- `.github/workflows/deploy_website.yml`: check, unit-test, and build gates.
- `README.md`: current commands, structure, and design behavior.
- `src/data/site.ts`: typed single source for all visible content and snapshots.
- `src/layouts/BaseLayout.astro`: font imports, metadata, and JavaScript capability class.
- `src/pages/index.astro`: composition only.
- `src/components/Section.astro`: open section structure and background variant.
- `src/components/Timeline.astro`: concise editorial experience rows.
- `src/components/CommandPalette.astro`: dialog semantics and status nodes.
- `src/scripts/command-palette.ts`: keyboard navigation, platform shortcut label, and state synchronization.
- `src/scripts/repo-cards.ts`: update static repository rows rather than build cards from scratch.
- `src/styles/global.css`: approved tokens, typography, layouts, focus, responsive behavior.

**Delete after replacement**

- `src/components/SkillPills.astro`
- `src/components/RepoCards.astro`

---

### Task 1: Generate and extract the visual concept

**Files:**

- Create: `docs/superpowers/concepts/technical-editorial/inventory.md`
- Use without committing: `/tmp/steven-portfolio-concepts/01-hero.png` through `/tmp/steven-portfolio-concepts/06-command-mobile.png`

**Interfaces:**

- Consumes: approved design spec at `docs/superpowers/specs/2026-07-10-technical-editorial-portfolio-design.md`
- Produces: six visual references plus an inventory of tokens, exact copy, layout, assets, and responsive rules used by Tasks 4 through 8

- [ ] **Step 1: Read the required visual-generation instructions**

Read the complete `imagegen` skill and `frontend-app-builder/references/imagegen-website-concepts.md`. Record that Browser/IAB is unavailable, so Task 8 will use Playwright Chromium.

- [ ] **Step 2: Generate coordinated section concepts**

Use Image Gen for six fresh, readable images. Reuse this design-director brief for every call and append the named section requirements:

```text
Design a restrained technical-editorial portfolio for Hongchen (Steven) Yang, a Brandeis database-systems researcher and software engineer. Use a true white background, near-black type, cool gray secondary type, thin cool-gray rules, and one technical-blue accent. Use IBM Plex Sans and IBM Plex Mono. The layout is open and typographic with no bento grid, gradients, glow, floating decoration, pills, fake metrics, hero eyebrow, tinted portrait overlay, or entrance animation. Controls and UI text must remain code-native. Preserve an 1120px content frame, sharp 0-6px corners, generous but efficient whitespace, and a 4:3 portrait frame. The complete page order is Hero, Selected Work, Experience, Technical Stack, Public Code, Contact. Keep section rhythm varied through columns, ruled rows, one pale-gray band, and typography rather than decorative cards. Make the screenshot large enough to read every heading, button, metadata label, and repository row.
```

Generate these fresh views:

1. Desktop header and hero at 1440 by 1000, including the start of Selected Work.
2. Selected Work with FluidLSM, fragmented higher-education data and text-to-SQL, and Blacklight.
3. Experience with four editorial timeline rows.
4. Technical Stack matrix and Public Code ruled list.
5. Contact and footer continuation.
6. Command palette detail beside a 390px mobile header/menu state.

- [ ] **Step 3: Reject visual drift before extraction**

Use `view_image` on every generated image. Regenerate an image if it includes a hero eyebrow, gradient, glowing element, decorative metric, repeated card grid, warm page background, portrait tint, unreadable text, or an extra section.

- [ ] **Step 4: Write the design inventory**

Create `inventory.md` with these required headings and exact values:

```markdown
# Technical Editorial Concept Inventory

## Concept Paths
## Allowed Above-the-Fold Copy
## Section Order and Native Dimensions
## Color Tokens
## Typography Scale
## Container and Spacing Rules
## Portrait Treatment
## Component Families
## Icon Inventory
## Responsive Continuation
## Interaction and Motion
## Prohibited Additions
```

The allowed copy list must contain only:

```text
Hongchen (Steven) Yang
Work
Experience
Stack
Contact
Search
Resume
Database systems researcher and software engineer.
View résumé
Email Steven
Brandeis University
B.S. Computer Science · Mathematics minor
December 2026
3.748 GPA · Dean's List every semester
Selected Work
```

- [ ] **Step 5: Commit the inventory**

```bash
git add docs/superpowers/concepts/technical-editorial/inventory.md
git commit -m "docs: extract technical editorial design system"
```

Expected: the commit contains the text inventory only; raster concepts remain in `/tmp` for fidelity QA.

---

### Task 2: Establish the quality and font toolchain

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Modify: `.github/workflows/deploy_website.yml`

**Interfaces:**

- Consumes: Node 22.12+ from `.nvmrc`
- Produces: `npm run check`, `npm run test:unit`, `npm run test:ui`, and `npm run verify`

- [ ] **Step 1: Verify the old toolchain lacks the required gates**

Run:

```bash
npm run check
```

Expected: FAIL with `Missing script: "check"`.

- [ ] **Step 2: Install exact project dependencies**

Run under Node 22.12 or newer:

```bash
npm install @fontsource-variable/ibm-plex-sans @fontsource-variable/ibm-plex-mono
npm install --save-dev @astrojs/check vitest @playwright/test
```

Then install the browser used only for QA:

```bash
npx playwright install chromium
```

Expected: `package-lock.json` updates with no peer-dependency error.

- [ ] **Step 3: Add scripts**

Set the `scripts` object to:

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check && tsc --noEmit --pretty false",
  "test:unit": "vitest run",
  "test:ui": "playwright test",
  "verify": "npm run check && npm run test:unit && npm run build"
}
```

- [ ] **Step 4: Add the Playwright configuration**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "/tmp/steven-portfolio-playwright",
  fullyParallel: false,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } }
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: true,
    timeout: 120_000
  }
});
```

- [ ] **Step 5: Add CI gates before build**

In `.github/workflows/deploy_website.yml`, place these steps after `Install`:

```yaml
      - name: Check
        run: npm run check

      - name: Unit tests
        run: npm run test:unit
```

Keep the existing build, Pages upload, and deployment steps.

- [ ] **Step 6: Verify the empty harness**

Run:

```bash
npm run check
npx vitest run --passWithNoTests
```

Expected: check passes; Vitest exits 0 without weakening the permanent `test:unit` script.

- [ ] **Step 7: Commit the toolchain**

```bash
git add package.json package-lock.json playwright.config.ts .github/workflows/deploy_website.yml .npmrc .nvmrc astro.config.mjs postcss.config.cjs tailwind.config.mjs
git commit -m "build: finish Astro 7 quality toolchain"
```

Expected: this commit captures the existing Astro 7 and Tailwind 4 migration files that belong to the toolchain, including the two deleted legacy config files.

---

### Task 3: Centralize typed content and repository logic

**Files:**

- Modify: `src/data/site.ts`
- Create: `src/lib/repositories.ts`
- Create: `src/lib/repositories.test.ts`

**Interfaces:**

- Produces: `WorkItem`, `ExperienceItem`, `TechnologyGroup`, `RepositorySnapshot`, `GitHubRepository`, `isGitHubRepository(value)`, `rankRepositories(repos, limit)`, and `mergeRepository(snapshot, remote)`
- Consumers: `SelectedWork.astro`, `Timeline.astro`, `TechnicalStack.astro`, `RepoList.astro`, and `repo-cards.ts`

- [ ] **Step 1: Write failing repository tests**

Create `src/lib/repositories.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { isGitHubRepository, mergeRepository, rankRepositories } from "./repositories";

const repo = (name: string, stars: number, updated: string, fork = false) => ({
  name,
  description: `${name} description`,
  html_url: `https://github.com/steventimes/${name}`,
  language: "Python",
  stargazers_count: stars,
  forks_count: 0,
  updated_at: updated,
  fork
});

describe("repository helpers", () => {
  it("validates the complete GitHub shape", () => {
    expect(isGitHubRepository(repo("valid", 1, "2026-07-10T00:00:00Z"))).toBe(true);
    expect(isGitHubRepository({ name: "partial" })).toBe(false);
  });

  it("ranks non-forks by stars and then update time", () => {
    const ranked = rankRepositories([
      repo("recent", 0, "2026-07-10T00:00:00Z"),
      repo("starred", 1, "2026-01-01T00:00:00Z"),
      repo("old", 0, "2025-01-01T00:00:00Z"),
      repo("fork", 9, "2026-07-10T00:00:00Z", true)
    ], 3);
    expect(ranked.map((item) => item.name)).toEqual(["starred", "recent", "old"]);
  });

  it("keeps the authored description while refreshing metadata", () => {
    const merged = mergeRepository({
      name: "fpstreams",
      description: "Authored summary",
      language: "Python",
      stars: 1,
      forks: 0,
      updatedAt: "2026-03-10T13:40:21Z",
      url: "https://github.com/steventimes/fpstreams"
    }, repo("fpstreams", 2, "2026-07-10T00:00:00Z"));
    expect(merged.description).toBe("Authored summary");
    expect(merged.stars).toBe(2);
  });
});
```

- [ ] **Step 2: Run the tests and confirm the missing module failure**

Run:

```bash
npm run test:unit -- src/lib/repositories.test.ts
```

Expected: FAIL because `src/lib/repositories.ts` does not exist.

- [ ] **Step 3: Implement the repository helpers**

Create `src/lib/repositories.ts` with these exported shapes and rules:

```ts
export interface RepositorySnapshot {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

export const isGitHubRepository = (value: unknown): value is GitHubRepository => {
  if (!value || typeof value !== "object") return false;
  const repo = value as Partial<GitHubRepository>;
  return typeof repo.name === "string"
    && (typeof repo.description === "string" || repo.description === null)
    && typeof repo.html_url === "string"
    && (typeof repo.language === "string" || repo.language === null)
    && typeof repo.stargazers_count === "number"
    && typeof repo.forks_count === "number"
    && typeof repo.updated_at === "string"
    && typeof repo.fork === "boolean";
};

export const rankRepositories = (repos: GitHubRepository[], limit = 4) =>
  repos.filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count
      || Date.parse(b.updated_at) - Date.parse(a.updated_at))
    .slice(0, limit);

export const mergeRepository = (
  snapshot: RepositorySnapshot,
  remote: GitHubRepository
): RepositorySnapshot => ({
  ...snapshot,
  language: remote.language || snapshot.language,
  stars: remote.stargazers_count,
  forks: remote.forks_count,
  updatedAt: remote.updated_at
});
```

- [ ] **Step 4: Replace `site.ts` with a typed single source**

Define and export these interfaces:

```ts
export interface WorkItem {
  id: string;
  title: string;
  context: string;
  contribution: string;
  methods: string[];
  link?: { label: string; href: string };
}

export interface ExperienceItem {
  title: string;
  org: string;
  time: string;
  bullets: string[];
}

export interface TechnologyGroup {
  label: string;
  items: string[];
}

export interface Profile {
  role: string;
  intro: string;
  photoPath: string;
  resumePath: string;
  email: string;
  metadata: Array<{ label: string; value: string }>;
}
```

Keep the four approved experience entries and create the three approved work items. Add these exact repository snapshots in ranked order:

```ts
repositories: [
  {
    name: "fpstreams",
    description: "A typed functional programming library for Python with lazy streams, Option and Result containers, parallel processing, and optional Rust acceleration.",
    language: "Python",
    stars: 1,
    forks: 0,
    updatedAt: "2026-03-10T13:40:21Z",
    url: "https://github.com/steventimes/fpstreams"
  },
  {
    name: "soccer-analytics",
    description: "A data and machine-learning pipeline for match collection, Postgres and Redis storage, rolling feature engineering, and competition-specific prediction models.",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-10T02:57:23Z",
    url: "https://github.com/steventimes/soccer-analytics"
  },
  {
    name: "high-ed-data-generator",
    description: "A Rust synthetic higher-education data generator with Python and DuckDB tools for fragmentation evaluation.",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-10T02:55:56Z",
    url: "https://github.com/steventimes/high-ed-data-generator"
  },
  {
    name: "Prompt-Testing-Framework",
    description: "A PromptOps workspace for testing, versioning, comparing, and governing LLM prompts across a Spring backend and Vite frontend.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-10T02:54:58Z",
    url: "https://github.com/steventimes/Prompt-Testing-Framework"
  }
]
```

Move the hero intro, navigation labels, education metadata, contact copy, and footer text into `site.ts`. Keep the existing `about`, `highlights`, `skills`, and `projects` fields until Task 4 replaces every old consumer; Task 4 removes those legacy fields in the same commit as the component replacement.

- [ ] **Step 5: Run unit and type checks**

Run:

```bash
npm run test:unit -- src/lib/repositories.test.ts
npm run check
```

Expected: repository tests and `npm run check` pass. Do not weaken types with `any`.

- [ ] **Step 6: Commit the content model**

```bash
git add src/data/site.ts src/lib/repositories.ts src/lib/repositories.test.ts
git commit -m "refactor: centralize typed portfolio content"
```

---

### Task 4: Build the semantic page and editorial components

**Files:**

- Create: `tests/portfolio.spec.ts`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/SelectedWork.astro`
- Create: `src/components/TechnicalStack.astro`
- Create: `src/components/RepoList.astro`
- Create: `src/components/Contact.astro`
- Modify: `src/components/Timeline.astro`
- Modify: `src/components/Section.astro`
- Modify: `src/pages/index.astro`
- Delete: `src/components/SkillPills.astro`

**Interfaces:**

- Consumes: typed values exported by `src/data/site.ts`
- Produces: all approved sections and deep links in server-rendered HTML

- [ ] **Step 1: Write the failing page-structure test**

Create the first block in `tests/portfolio.spec.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and confirm old-content failure**

Run:

```bash
npm run test:ui -- --grep "evidence-led"
```

Expected: FAIL on the new role line or heading order.

- [ ] **Step 3: Create focused Astro components**

Use typed props for each component. `index.astro` should reduce to composition equivalent to:

```astro
<BaseLayout title={`${site.name} | Database Systems Researcher`} description={site.role}>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <SiteHeader name={site.name} navigation={site.navigation} resumePath={site.resumePath} />
  <main id="main-content">
    <Hero profile={site.profile} />
    <Section id="projects" title="Selected Work">
      <SelectedWork items={site.selectedWork} />
    </Section>
    <Section id="experience" title="Experience" variant="band">
      <Timeline items={site.experience} />
    </Section>
    <Section id="skills" title="Technical Stack">
      <TechnicalStack groups={site.technology} />
    </Section>
    <Section id="repos" title="Public Code">
      <RepoList username={site.githubUsername} repositories={site.repositories} />
    </Section>
    <Section id="contact" title="Contact" variant="band">
      <Contact email={site.email} linkedin={site.linkedin} github={site.githubUrl} />
    </Section>
  </main>
  <footer class="site-footer">
    <p>{site.name} · {site.location} · © {new Date().getFullYear()}</p>
  </footer>
  <CommandPalette items={site.commands} />
</BaseLayout>
```

Place `id="about"` on the hero profile region. Use `Section` only for consistent anchors, headings, spacing, and the optional pale band. Use articles and lists where their semantics match the content. Create `RepoList.astro` as a static-only renderer in this task; Task 7 adds live refresh. Remove the legacy `about`, `highlights`, `skills`, and `projects` fields from `site.ts` after all new components compile.

- [ ] **Step 4: Keep experience concise**

Render organization and date in a metadata column, then title and approved bullets in the content column. Keep each role's bullets from `site.ts`; do not add skill tags or cards.

- [ ] **Step 5: Run structure, type, and build checks**

Run:

```bash
npm run check
npm run build
npm run test:ui -- --grep "evidence-led"
```

Expected: all commands pass.

- [ ] **Step 6: Commit the semantic surface**

```bash
git add src/pages/index.astro src/data/site.ts src/components/SiteHeader.astro src/components/Hero.astro src/components/SelectedWork.astro src/components/TechnicalStack.astro src/components/RepoList.astro src/components/Contact.astro src/components/Timeline.astro src/components/Section.astro src/components/SkillPills.astro src/components/RepoCards.astro tests/portfolio.spec.ts
git commit -m "feat: build evidence-led portfolio sections"
```

---

### Task 5: Implement the approved visual system and responsive layout

**Files:**

- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**

- Consumes: the concept inventory from Task 1 and semantic class names from Task 4
- Produces: exact tokens, local fonts, desktop/mobile composition, focus appearance, and portrait treatment

- [ ] **Step 1: Add failing visual-contract tests**

Append:

```ts
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
```

- [ ] **Step 2: Confirm the current crop or palette fails**

Run:

```bash
npm run test:ui -- --grep "locked palette|horizontal overflow"
```

Expected: the portrait-ratio test fails against the old 4:5 treatment.

- [ ] **Step 3: Import local variable fonts**

At the top of `BaseLayout.astro` frontmatter:

```ts
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource-variable/ibm-plex-mono";
```

Add `class="no-js"` to `<html>` and one small inline head script that replaces `no-js` with `js` before paint. Do not add theme logic.

- [ ] **Step 4: Replace the global design layer**

Start `global.css` with these locked tokens:

```css
@import "tailwindcss";

:root {
  color-scheme: light;
  --page: #ffffff;
  --ink: #111318;
  --muted: #59616c;
  --line: #d9dde3;
  --accent: #1559d6;
  --accent-hover: #0f46ad;
  --band: #f5f7fa;
  --danger: #a32626;
  --font-sans: "IBM Plex Sans Variable", "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono Variable", "IBM Plex Mono", ui-monospace, monospace;
  --content: 70rem;
}
```

Implement the concept inventory's exact spacing and type scale. Use open rows and rules. Page content receives no box shadow. Set portrait `aspect-ratio: 4 / 3`, `object-fit: cover`, and `object-position` only after comparing the face crop with the source image.

- [ ] **Step 5: Capture section screenshots and repair drift**

Append this visual QA test to `tests/portfolio.spec.ts`:

```ts
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
```

Run:

```bash
npm run test:ui -- --grep "captures concept comparison"
```

Compare the first viewport, Selected Work, Experience, Stack/Public Code, and Contact against the corresponding concepts. Fix typography, spacing, copy wrapping, rule positions, and portrait crop before moving to Task 6.

- [ ] **Step 6: Run visual-contract tests**

Run:

```bash
npm run test:ui -- --grep "locked palette|horizontal overflow"
```

Expected: all palette, ratio, and overflow tests pass at four viewports.

- [ ] **Step 7: Commit the visual system**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css tests/portfolio.spec.ts
git commit -m "style: apply restrained technical editorial system"
```

---

### Task 6: Make navigation and command search robust

**Files:**

- Create: `src/lib/commands.ts`
- Create: `src/lib/commands.test.ts`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/CommandPalette.astro`
- Modify: `src/scripts/command-palette.ts`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**

- Produces: `filterCommandItems(items, query)` and `nextActiveIndex(current, direction, count)`
- Consumers: command-palette client script and its unit tests

- [ ] **Step 1: Write failing command helper tests**

```ts
import { describe, expect, it } from "vitest";
import { filterCommandItems, nextActiveIndex } from "./commands";

const items = [
  { label: "Selected Work", href: "#projects" },
  { label: "Resume", href: "/resume.pdf" }
];

describe("command helpers", () => {
  it("filters labels without case sensitivity", () => {
    expect(filterCommandItems(items, "WORK")).toEqual([items[0]]);
  });

  it("wraps keyboard selection", () => {
    expect(nextActiveIndex(1, 1, 2)).toBe(0);
    expect(nextActiveIndex(0, -1, 2)).toBe(1);
    expect(nextActiveIndex(-1, 1, 2)).toBe(0);
  });
});
```

Run `npm run test:unit -- src/lib/commands.test.ts`. Expected: FAIL because the helper module is missing.

- [ ] **Step 2: Implement pure helpers**

```ts
export interface CommandItem {
  label: string;
  href: string;
  external?: boolean;
}

export const filterCommandItems = (items: CommandItem[], query: string) => {
  const normalized = query.trim().toLowerCase();
  return items.filter((item) => item.label.toLowerCase().includes(normalized));
};

export const nextActiveIndex = (current: number, direction: 1 | -1, count: number) => {
  if (count <= 0) return -1;
  if (current < 0) return direction === 1 ? 0 : count - 1;
  return (current + direction + count) % count;
};
```

- [ ] **Step 3: Add failing browser tests for keyboard and no-JavaScript navigation**

Append tests that:

1. Press `Control+K`, type `Work`, press ArrowDown and Enter, and assert `location.hash === "#projects"`.
2. Assert `aria-expanded` changes from `false` to `true` while the dialog is open and returns to `false` on Escape.
3. Create a JavaScript-disabled mobile context, open the native menu summary, and follow the Experience link.
4. Assert the Search trigger is hidden in the JavaScript-disabled context.

- [ ] **Step 4: Implement the native mobile menu**

Use `<details class="mobile-menu">` with a `<summary>Menu</summary>` and native anchor links. Do not depend on the command palette for mobile section access.

- [ ] **Step 5: Implement command keyboard state**

Update `command-palette.ts` to:

- validate serialized items and safe URLs;
- render option anchors with stable ids and `role="option"`;
- track the active option with `aria-activedescendant`;
- support Arrow Up, Arrow Down, Enter, Escape, and Tab;
- update `aria-expanded` on every trigger;
- label the shortcut as `⌘K` on macOS and `Ctrl K` elsewhere;
- open external commands in a new tab with `rel="noreferrer"`;
- announce result counts through a polite status node;
- leave the trigger hidden until enhancement succeeds.

- [ ] **Step 6: Run navigation tests**

Run:

```bash
npm run test:unit -- src/lib/commands.test.ts
npm run test:ui -- --grep "command|JavaScript"
```

Expected: all command and no-JavaScript navigation tests pass.

- [ ] **Step 7: Commit navigation**

```bash
git add src/lib/commands.ts src/lib/commands.test.ts src/components/SiteHeader.astro src/components/CommandPalette.astro src/scripts/command-palette.ts tests/portfolio.spec.ts
git commit -m "feat: harden portfolio navigation"
```

---

### Task 7: Add static repository proof with live refresh

**Files:**

- Modify: `src/components/RepoList.astro`
- Modify: `src/scripts/repo-cards.ts`
- Modify: `src/pages/index.astro`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**

- Consumes: `RepositorySnapshot[]`, `isGitHubRepository`, `rankRepositories`, and `mergeRepository`
- Produces: server-rendered rows with `data-repo-name` hooks and non-destructive live metadata refresh

- [ ] **Step 1: Add failing static and API-failure tests**

Append:

```ts
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
```

Add a success test that fulfills the GitHub route with a fixture containing `fpstreams` at 2 stars, then asserts the existing row updates to `2 stars` while keeping the authored description.

- [ ] **Step 2: Confirm the current loading-only UI fails**

Run:

```bash
npm run test:ui -- --grep "static repository|GitHub fails"
```

Expected: FAIL because the static-only renderer does not expose live refresh or failure status yet.

- [ ] **Step 3: Render static repository rows**

`RepoList.astro` must render all four snapshots as links before the script runs. Each row includes name, authored description, language, stars, forks, and formatted update date. Use data attributes for update targets rather than embedding remote HTML.

- [ ] **Step 4: Refresh metadata without replacing content**

Update `repo-cards.ts` to fetch the user's public repositories, validate the payload, rank four non-forks, and match remote items by repository name. Update language, stars, forks, and date in existing rows. Preserve the authored description and URL. On fetch or validation failure, reveal `Live GitHub data unavailable.` and keep every row.

- [ ] **Step 5: Run repository tests**

Run:

```bash
npm run test:unit -- src/lib/repositories.test.ts
npm run test:ui -- --grep "repository|GitHub"
```

Expected: unit ranking tests and both browser network paths pass.

- [ ] **Step 6: Commit repository evidence**

```bash
git add src/components/RepoList.astro src/scripts/repo-cards.ts src/pages/index.astro tests/portfolio.spec.ts
git commit -m "feat: make public code resilient"
```

---

### Task 8: Finish documentation, fidelity QA, and repository verification

**Files:**

- Modify: `README.md`
- Create: `docs/superpowers/verification/2026-07-10-technical-editorial-fidelity.md`
- Modify: any implementation file with a verified mismatch

**Interfaces:**

- Consumes: accepted concepts, inventory, completed page, and test harness
- Produces: verified production build and written fidelity ledger

- [ ] **Step 1: Update the README**

Document:

```markdown
## Development

Use Node 22.12 or newer.

`npm ci`
`npm run dev`

## Verification

`npm run verify`
`npm run test:ui`
```

Describe the content source, progressive GitHub refresh, command palette, native mobile fallback, and GitHub Pages deployment. Remove wording that calls the site a Tailwind showcase.

- [ ] **Step 2: Run the full engineering gate**

Run:

```bash
npm run verify
npm run test:ui
git diff --check
```

Expected: every command exits 0. Do not continue on a failure.

- [ ] **Step 3: Capture final screenshots**

Use Playwright Chromium because Browser/IAB is unavailable. Run `npm run test:ui -- --grep "captures concept comparison"`; keep the generated `/tmp/steven-portfolio-*.png` files for:

- 1440 by 1000 first viewport
- desktop Selected Work
- desktop Experience
- desktop Stack and Public Code
- desktop Contact
- 390 by 844 first viewport and mobile menu
- command palette detail

- [ ] **Step 4: Compare concepts and renders with `view_image`**

Open each accepted concept and matching final screenshot in the same QA pass. Check at least these points:

1. Exact first-viewport copy and next-section preview.
2. White background, blue accent, gray rules, and absence of gradients or tint.
3. IBM Plex type character, sizes, weights, line heights, and mobile wrapping.
4. 4:3 portrait crop and image blending.
5. Open rows and section rhythm without added cards.
6. Command dialog typography, focus, and icon treatment.
7. Desktop and mobile spacing with no overflow.

Fix every mismatch that would receive a design-review comment, then repeat the affected screenshot and `view_image` comparison.

- [ ] **Step 5: Run the above-the-fold copy diff**

Compare the rendered first viewport against the allowed list in the concept inventory. Navigation, hero, CTA, metadata, and visible next-section text must match. Record any semantic-only accessible text separately; it must not create new visible copy.

- [ ] **Step 6: Write the fidelity ledger**

Create the ledger with this table:

```markdown
| Check | Concept evidence | Render evidence | Fix or result |
| --- | --- | --- | --- |
| First viewport | ... | ... | ... |
| Palette | ... | ... | ... |
| Typography | ... | ... | ... |
| Portrait | ... | ... | ... |
| Container model | ... | ... | ... |
| Responsive layout | ... | ... | ... |
| Command interaction | ... | ... | ... |
```

Add the native viewport checked, above-the-fold copy result, core interaction path result, remaining intentional deviations, and the final agency-signoff judgment.

- [ ] **Step 7: Remove QA artifacts from the repository**

Keep Playwright output and screenshots in `/tmp`. Confirm that no trace, screenshot, generated raster concept, or debug log appears in `git status`.

- [ ] **Step 8: Commit documentation and verified repairs**

```bash
git add README.md docs/superpowers/verification/2026-07-10-technical-editorial-fidelity.md src package.json package-lock.json playwright.config.ts .github/workflows/deploy_website.yml tests
git commit -m "docs: record portfolio verification"
```

- [ ] **Step 9: Inspect final scope**

Run:

```bash
git status --short
git log --oneline -10
npm run verify
```

Expected: only known user-owned changes outside the plan may remain. The final verification command exits 0, and every implementation commit has a focused message.

---

## Plan Self-Review Results

- Spec coverage: all information architecture, visual, component, data, interaction, error, accessibility, responsive, and verification requirements map to Tasks 1 through 8.
- Placeholder scan: the plan contains no unfinished markers, deferred steps, or unnamed error handling.
- Type consistency: `Profile`, `RepositorySnapshot`, `GitHubRepository`, `WorkItem`, `ExperienceItem`, `TechnologyGroup`, `CommandItem`, and all helper names match across producer and consumer tasks.
- Scope: the plan adds no backend, CMS, contact form, blog, analytics, theme switcher, or new portfolio claim.
