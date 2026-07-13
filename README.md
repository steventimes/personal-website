# Personal Website

Hongchen (Steven) Yang's technical portfolio presents database systems research, engineering work, experience, public code, and contact details.

`src/data/site.ts` is the source for visible portfolio facts. Astro components render that content into a static page.

## Development

Use Node 22.12 or newer.

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run verify
npm run test:ui
```

## Site behavior

The Public Code section renders an authored snapshot before JavaScript runs. The client validates GitHub API data and refreshes repository metadata when available; a failed refresh leaves the snapshot intact.

The command palette supports filtering and keyboard navigation. Mobile navigation uses native `details` markup, so section and résumé links remain available without JavaScript.

## Deployment

The GitHub Actions workflow checks, tests, and builds the static site before deploying `dist/` to GitHub Pages.
