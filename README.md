# Personal Website

A concise single-page portfolio built with Astro 7, Tailwind CSS 4, and browser-native TypeScript. It is statically generated and deployed to GitHub Pages.

## Requirements

- Node.js 22.12 or newer
- npm 9.6.5 or newer

## Development

```sh
npm ci
npm run dev
```

Run `npm run build` to create the production site in `dist/`. Dependency lifecycle scripts are disabled through `.npmrc`; the site does not require them to build.

## Structure

- `src/data/site.ts` contains portfolio content.
- `src/components/` contains Astro presentation components.
- `src/scripts/` contains client-side TypeScript for navigation and GitHub repository rendering.
- `src/styles/global.css` contains the Tailwind import and the small site-specific design layer.

Remote GitHub data is validated and rendered with DOM APIs rather than HTML string injection.
