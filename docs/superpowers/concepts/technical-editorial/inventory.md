# Technical Editorial Concept Inventory

## Concept Paths

- `/tmp/steven-portfolio-concepts/01-hero.png` — desktop header, hero, and Selected Work lead-in.
- `/tmp/steven-portfolio-concepts/02-selected-work.png` — three case-study rows.
- `/tmp/steven-portfolio-concepts/03-experience.png` — four editorial timeline rows.
- `/tmp/steven-portfolio-concepts/04-stack-public-code.png` — stack matrix and repository list.
- `/tmp/steven-portfolio-concepts/05-contact.png` — contact and footer.
- `/tmp/steven-portfolio-concepts/06-command-mobile.png` — command palette and 390 px mobile menu state.

The concept previews are QA references only and are intentionally not repository assets. Browser/IAB is unavailable; Task 8 should use Playwright Chromium for implementation QA.

## Allowed Above-the-Fold Copy

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

## Section Order and Native Dimensions

1. Hero
2. Selected Work
3. Experience
4. Technical Stack
5. Public Code
6. Contact

Use a 1440 px-wide desktop reference with a 1120 px content frame. The hero is a desktop two-column composition; its portrait frame is 4:3. At mobile widths, use one column with 20 px gutters; the command/mobile detail targets a 390 px-wide viewport.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| Page | `#ffffff` | True-white page background |
| Ink | `#111318` | Headings and primary text |
| Muted | `#59616c` | Secondary text |
| Rule | `#d9dde3` | Thin separators |
| Blue | `#1559d6` | Links, focus, and active state |
| Blue hover | `#0f46ad` | Hover state |
| Band | `#f5f7fa` | The single subtle full-width band |
| Error | `#a32626` | Error text only |

## Typography Scale

- IBM Plex Sans: headings, body, navigation, controls, and links.
- IBM Plex Mono: dates, metadata labels, technical methods, shortcuts, and repository metadata.
- Hero name: 64 px desktop / 42 px mobile.
- Section heading: 32 px desktop / 27 px mobile.
- Work title: 22 px.
- Body: 16–18 px at 1.6 line height.
- Metadata and control text: 12–14 px.

## Container and Spacing Rules

- Maximum content width: 1120 px.
- Horizontal padding: 32 px desktop and 20 px mobile.
- Section spacing: 88–112 px desktop and 64–80 px mobile.
- Use open sections, full-width rules, editorial rows, and one pale-gray band; do not introduce card wrappers.
- Corners stay square to lightly softened: 0–6 px. Page content has no shadow.

## Portrait Treatment

Use the supplied headshot only, in its native 4:3 crop, in the right hero column on desktop. Keep the image natural: no tint, translucent wash, gradient, glow, or overlay. It stacks below hero text on narrow screens.

## Component Families

- Quiet header: name, native anchor links, compact command trigger, and Resume link.
- Hero: two text actions, 4:3 portrait, then one ruled metadata row.
- Selected Work: three open case-study rows separated by thin rules; FluidLSM receives the strongest hierarchy.
- Experience: four two-column timeline rows, organization/date at left and title/bullets at right.
- Technical Stack: label-and-value matrix with centered-dot text lists.
- Public Code: static snapshot in a ruled repository list; stacked rows on mobile.
- Contact: one short sentence, email action, plain social links, and quiet footer.
- Command palette: a single dialog with the only permissible soft shadow.

## Icon Inventory

- Search / command trigger: compact magnifying-glass or text trigger, 14–16 px, thin outline, near-black/cool-gray; shortcut is Plex Mono.
- Menu control: 16–20 px three-line outline icon on mobile, aligned to the header edge.
- Close control: 16 px thin outline `×` in the command dialog.
- External-link indicator: optional 14 px thin northeast arrow, aligned after external links.
- No decorative icon rows, badges, glyph collections, or logo marks.

## Responsive Continuation

- Desktop hero is two columns; below 768 px it becomes one column.
- Preserve native anchors and a no-JavaScript mobile menu.
- Timeline and case-study content stack rather than becoming cards.
- Stack matrix labels move above values as needed.
- Public Code retains row semantics and stacks its metadata at mobile widths.
- The command palette remains centered and readable; mobile navigation is a separate native menu state.

## Interaction and Motion

- Native anchor links, standard focus rings, underlines, and color changes use 120–180 ms transitions.
- Command palette supports filtering, arrow keys, Enter, Escape, Tab, close button, and outside-click dismissal.
- Display `⌘K` on macOS and `Ctrl K` elsewhere when scripting is available.
- No entrance animations or scroll-driven section animation. Respect reduced motion and disable smooth scrolling when requested.

## Prohibited Additions

- Hero eyebrow, kicker, badge, pill, or pretitle.
- Gradients, glow, translucent washes, portrait tint, floating ornaments, or background animation.
- Bento grids, repeated card grids, rounded tag clouds, fake metrics, dashboards, and decorative filler.
- Warm/off-white backgrounds, page-content shadows, extra sections, invented claims, or extra above-the-fold copy.
