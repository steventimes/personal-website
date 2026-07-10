# Technical Editorial Portfolio Redesign

Date: 2026-07-10
Status: Approved design

## Goal

The site should present Hongchen (Steven) Yang as a database systems researcher and software engineer. A visitor should understand his technical focus, strongest work, and contact options within the first two viewports.

The redesign serves research collaborators and engineering recruiters. It leads with evidence from systems research, evaluation work, public-interest privacy tooling, and public code.

## Success Criteria

- The first viewport states Steven's name, technical focus, education, and two primary actions.
- The next viewport starts the selected work section and gives FluidLSM the strongest visual position.
- The page names concrete systems, methods, and tools instead of relying on generic skill claims.
- The layout remains readable at 360 px, 768 px, and 1440 px widths.
- Keyboard and no-JavaScript users can reach every section and external link.
- GitHub API failure does not remove the public-code proof from the page.
- The repository builds and passes type checks with Node 22.12 or newer.

## Constraints

- Keep Astro static output and GitHub Pages deployment.
- Build on the current uncommitted Astro 7 and Tailwind CSS 4 migration.
- Preserve the existing Google verification tag, favicon, resume, headshot, public contact links, and deep-link anchors.
- Keep all factual claims within the current site data and linked Blacklight article.
- Keep the site in English.
- Do not add gradients, glows, decorative dashboards, floating ornaments, bento grids, pill-heavy layouts, fake metrics, or background animation.
- Do not add a label, badge, or eyebrow above the hero heading.

## Information Architecture

The page uses this order:

1. Header and hero
2. Selected Work
3. Experience
4. Technical Stack
5. Public Code
6. Contact

Existing deep links remain valid:

- `#about` points to the hero profile content.
- `#projects` points to Selected Work.
- `#experience` points to Experience.
- `#skills` points to Technical Stack.
- `#repos` points to Public Code.
- `#contact` points to Contact.

The visible header navigation uses Work, Experience, Stack, and Contact. The command palette includes all deep links plus Resume, Email, GitHub, and LinkedIn.

## First Viewport

The header contains Steven's name, four navigation links, a compact command-palette trigger, and a Resume link. Mobile users get a native menu that works without JavaScript.

The hero uses a two-column layout on desktop and one column on mobile. The text column contains:

- `Hongchen (Steven) Yang`
- `Database systems researcher and software engineer.`
- A short paragraph covering Brandeis University, database systems research, and reproducible evaluation.
- Two actions: `View résumé` and `Email Steven`.

The portrait occupies the second column. The implementation uses the source image's native 4:3 ratio and avoids the current 4:5 crop.

A single metadata row below the hero contains Brandeis University, B.S. Computer Science with Mathematics minor, December 2026, and 3.748 GPA with Dean's List. The row replaces repeated education and highlight blocks.

## Selected Work

Selected Work uses three open case-study rows. Thin rules separate the rows. Each row contains a title, short context, work performed, technical methods, and one link when available. The section avoids cards.

### Work item 1: FluidLSM and workload-aware RocksDB tuning

- Context: shifting workloads, skew, and burstiness affect compaction behavior and performance in LSM-tree systems.
- Work: group dependent configuration parameters, prune derived knobs, study tuning methods, and build prototype benchmarks that inform FluidLSM.
- Methods: RocksDB, LSM trees, Bayesian optimization, tree-based surrogate models, and lightweight online learning.

### Work item 2: Fragmented higher-education data and text-to-SQL

- Context: fragmented institutional data complicates text-to-SQL evaluation.
- Work: design controllable synthetic schemas, define fragmentation metrics, and build ETL and evaluation pipelines for provenance and baseline comparisons.
- Methods: Python, SQL, synthetic data, provenance tracking, and text-to-SQL evaluation.

### Work item 3: Blacklight privacy detection

- Context: The Markup's Blacklight tool inspects websites for tracking technologies.
- Work: contribute research, feature development, and validation for TikTok and X tracking-pixel detection.
- Evidence: link to the published update and retain the existing statement that Blacklight has handled more than 18 million scans.
- Methods: privacy measurement, tracker detection, and product research.

## Experience

Experience keeps all four roles and their dates:

- Researcher, Smart & Scalable Data Systems Lab
- Data Science Intern, Independent Study
- Teaching Assistant, Introduction to Database
- Software Engineering Intern, Shanghai Development Center of Computer Software Technology

Each entry uses a two-column row with organization and date on the left, then title and two or three concise bullets on the right. The bullets preserve the distinction between research, data evaluation, teaching, and backend engineering.

## Technical Stack

Technical Stack uses a compact matrix instead of rounded tags. Each group has a label and a plain text list separated by centered dots.

Groups:

- Programming
- Systems and Data
- Backend and Web
- Tooling
- Spoken Languages

The stack keeps Java, C++, Python, Go, Rust, JavaScript, TypeScript, SQL, RocksDB, PostgreSQL, MySQL, Redis, Spring Boot, MyBatis, Astro, HTML, CSS, Tailwind CSS, Docker, Linux, Git, and GitHub Actions.

## Public Code

The page renders a static snapshot before client JavaScript runs. The implementation selects up to four current non-fork repositories by star count and recent activity, then stores their name, description, language, URL, stars, forks, and update date in `site.ts`.

The client script may refresh metadata from the GitHub API. It validates every field and updates existing DOM nodes. API errors leave the static snapshot in place and show a muted status message. The page never replaces useful content with a loading placeholder or an error-only state.

The section uses a ruled list at desktop widths and stacked rows on mobile. It labels the data as a public-repository snapshot rather than curated project work.

## Contact

Contact uses one short sentence, an email link, LinkedIn, and GitHub. The footer contains Steven's name, location, and copyright year. It does not advertise the implementation stack.

## Visual System

### Color

- Page background: true white, `#ffffff`
- Primary text: near-black, `#111318`
- Secondary text: cool gray, `#59616c`
- Rules: `#d9dde3`
- Accent: technical blue, `#1559d6`
- Accent hover: `#0f46ad`
- Subtle band: `#f5f7fa`
- Error text: `#a32626`

The implementation uses solid colors. It adds no gradient or translucent color wash over the portrait.

### Typography

Bundle IBM Plex Sans and IBM Plex Mono locally. IBM Plex Sans handles headings, body copy, navigation, and controls. IBM Plex Mono handles dates, metadata labels, technical methods, keyboard shortcuts, and repository metadata.

Use a restrained scale:

- Hero name: 64 px desktop, 42 px mobile
- Section headings: 32 px desktop, 27 px mobile
- Work titles: 22 px
- Body: 16 to 18 px with 1.6 line height
- Metadata and controls: 12 to 14 px

### Layout

- Maximum content width: 1120 px
- Desktop horizontal padding: 32 px
- Mobile horizontal padding: 20 px
- Section spacing: 88 to 112 px desktop, 64 to 80 px mobile
- Corners: 0 to 6 px
- Shadows: none on page content; the command dialog may use one soft shadow
- Containers: open sections, full-width rules, rows, and one subtle background band

### Motion

Use 120 to 180 ms transitions for color, underline, and focus changes. Do not animate sections into view. Respect `prefers-reduced-motion` and disable smooth scrolling when requested.

## Component Boundaries

- `BaseLayout.astro`: document shell, metadata, font imports, and the JavaScript capability class.
- `SiteHeader.astro`: desktop navigation, no-JavaScript mobile menu, Resume link, and command trigger.
- `Hero.astro`: identity, technical positioning, actions, portrait, and metadata row.
- `SelectedWork.astro`: three case-study rows from typed data.
- `Timeline.astro`: experience rows.
- `TechnicalStack.astro`: grouped technology matrix.
- `RepoList.astro`: static repository snapshot and enhancement hooks.
- `Contact.astro`: contact actions and footer lead-in.
- `CommandPalette.astro`: dialog markup and navigation data.
- `Section.astro`: anchor, heading, spacing, and optional background variant.

`index.astro` composes these components. It contains no duplicated portfolio facts.

## Data Model

`src/data/site.ts` becomes the single source for visible facts. It defines typed structures for profile metadata, selected work, experience, technology groups, repository snapshots, navigation, and contact links.

Client scripts read serialized data from component attributes. They validate unknown JSON and remote API responses before using them. The scripts create or update nodes through DOM APIs.

## Interaction Details

- Header links use native anchors.
- Mobile navigation uses native HTML and remains available without JavaScript.
- The command trigger displays `⌘K` on macOS and `Ctrl K` elsewhere when scripting runs.
- The command palette supports text filtering, Arrow Up, Arrow Down, Enter, Escape, Tab, close button, and outside-click dismissal.
- External command results follow the same new-tab policy as page links.
- Focus rings meet a 3:1 contrast ratio against nearby colors.
- The command trigger declares its dialog relationship and expanded state.

## Error and Empty States

- GitHub API failure keeps the static repository rows and adds `Live GitHub data unavailable.` below them.
- Invalid repository data leaves the affected static row unchanged.
- An empty command search shows `No matching destination.` and announces the result count.
- No-JavaScript users see the full portfolio, mobile navigation, static repository snapshot, and contact links. They do not see an inert command trigger.

## Verification

Engineering checks:

- Install dependencies with Node 22.12 or newer and `npm ci`.
- Run Astro template and TypeScript checks through one `npm run check` script.
- Run `npm run build`.
- Run `git diff --check`.

Browser checks use Playwright because the Browser plugin is unavailable in this environment:

- Desktop at 1440 by 1000.
- Tablet at 768 by 1024.
- Mobile at 390 by 844 and 360 by 800.
- Header anchors, native mobile menu, Resume, email, command palette, keyboard selection, and dialog dismissal.
- GitHub success and failure paths.
- No-JavaScript navigation and repository snapshot.
- Keyboard-only focus order and reduced-motion behavior.

Visual verification compares each generated concept image with the matching implementation screenshot. The final pass checks copy, layout, typography, color, portrait crop, rules, responsive behavior, and command-dialog styling.

## Approved Scope

The redesign changes presentation, information order, component boundaries, data organization, navigation reliability, GitHub fallback behavior, accessibility, and project checks. It does not add a backend, CMS, contact form, blog, analytics, theme switcher, or unrelated portfolio claims.
