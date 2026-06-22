# PLAN.md — Personal Site Audit (Ponytail Mode)

Audited: 2026-06-20 · 19 commits · 198 MB on disk (191 MB node_modules)

---

## 🔴 HIGH PRIORITY (structural / real bugs)

### 1. Binary blobs tracked in Git — `public/*.pdf` + `public/*.jpg`
**Problem:** 2.4 MB `headphoto.jpg` and 84 KB `resume.pdf` live in the git object store. Every versioned copy swells `.git/objects/`. Not in `.gitignore`.
**Fix:** Run `git rm --cached` to untrack, add to `.gitignore`, host externally (S3/CDN) or use Git LFS.
**Priority:** High

### 2. Ctrl+K button → dispatches forged KeyboardEvent to trigger Ctrl+F binding
**Problem:** `<button>Search</button>` fires `document.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true}))` to trigger CommandPalette's `Ctrl+F` listener. Button says `Ctrl K` in the UI tip but the binding is `Ctrl+F`. Line 60 in `index.astro` calls this hack instead of calling a real function.
**Fix:** Expose `open()` on `window` from CommandPalette script, call it directly on button click. Same binding (`Ctrl+F` actually works), no forged events.
**Priority:** High

### 3. `RepoCards` prop `featured=[]` is dead — never passed from parent
**Problem:** `RepoCards` has `featured = []` default and uses it for pinned repos, but `index.astro` calls `<RepoCards username={...} />` without passing `featured`. Dead prop, dead fetch loop for zero items.
**Fix:** Either pass pinned repo names from `site.ts`, or delete the prop and just fetch all repos.
**Priority:** High

### 4. GitHub Actions deploy output reference likely wrong
**Problem:** `deploy` job references `steps.deployment.outputs.page_url` but `deploy-pages@v4` does not expose `page_url` as an output. This step silently resolves to empty or `undefined` string in the `url:` field.
**Fix:** Remove the `url:` mapping, or use the GitHub Pages environment URL if auto-detected.
**Priority:** High

---

## 🟡 MEDIUM (code quality / maintainability)

### 5. `global.css` fights Tailwind — reinvents dark color system
**Problem:** `.text-heading`, `.text-body`, `.text-secondary`, `.text-muted` live in CSS with explicit `.dark` overrides. This duplicates what Tailwind's `dark:` variants and built-in slate/gray palette already do. 60 lines of CSS that Tailwind covers in two characters.
**Fix:** Delete the custom utility classes. Use `<p class="text-slate-900 dark:text-slate-100">` directly. Keeps styling in markup where it belongs.
**Priority:** Medium

### 6. 2.4 MB headshot photo — unoptimized
**Problem:** `headphoto.jpg` is 5219×3840 pixels, 2.4 MB. For a `<div class="w-full h-80 object-cover">` (roughly 320×320 visible), this is 60× oversized.
**Fix:** Resize to ~800×600, compress to <200 KB. Astro's Image integration or a simple `sharp` resize in CI.
**Priority:** Medium

### 7. `site.ts` has a dead `link: "#repos"` — links to self
**Problem:** `projects[1].link = "#repos"` — the Soccer Analytics project links to the repos section of the same page, not an actual project page or repo URL.
**Fix:** Point to an actual GitHub repo URL, or leave `link` unset and guard in the template.
**Priority:** Medium

### 8. Section.astro scroll-reveal causes FOUC
**Problem:** Sets `opacity: 0 / translateY(10px)` inline in JS after DOM paint. If JS runs slowly or fails, content stays invisible. No `prefers-reduced-motion` respect.
**Fix:** Start hidden in CSS with `motion-safe:` queries. IntersectionObserver only adds the visible class.
**Priority:** Medium

### 9. `any[]` casts in Timeline.astro and SkillPills.astro — lost type safety
**Problem:** `(items as any[])` and `(items as string[])` bypass the component prop type. The props are already typed via `Astro.props` — the cast covers up mismatch instead of catching it.
**Fix:** Use `items.map((it: typeof items[0]) => ...)` or add a concrete `interface` for the prop type.
**Priority:** Medium

### 10. Two separate `<script is:inline>` blocks in BaseLayout.astro — merge
**Problem:** First script does dark mode init, second handles the theme toggle button. These share the `key` / `btn` / `updateLabel` symbols but are separate inline scripts.
**Fix:** Merge into one `</script><script is:inline>` — fewer network chunks, shared scope.
**Priority:** Medium

---

## 🟢 LOW (cosmetic / minor)

### 11. `astro.config.mjs` overcomplicates base path
**Problem:** `base: BASE === "/" ? undefined : BASE` — when BASE is `/`, it sets `undefined`, making Astro default to `/`. The `SITE` const is never used elsewhere. Three lines for what `base: "/"` does.
**Fix:** Delete `SITE` and `BASE` constants. `export default defineConfig({ base: "/", integrations: [tailwind()] })`.
**Priority:** Low

### 12. README.md is skeletal — TODO note still in there
**Problem:** README has "fix the color contrast issue" as the only TODO. The issue is likely the `.text-body` / `.text-heading` colors — already largely addressed by the dark mode classes, but the README hasn't been updated.
**Fix:** Either fix the contrast properly or delete the TODO line. READMEs should reflect current state.
**Priority:** Low

### 13. 191 MB `node_modules` — Astro's dependency footprint
**Problem:** Not a code issue, but `node_modules/` weighs 191 MB for a 5-component personal site. `npm ci` in CI pulls this every deploy.
**Fix:** Consider `pnpm` for deduplicated storage, or accept it (will not if you want Astro). No action needed — just awareness.
**Priority:** Low

### 14. `.vscode/settings.json` is a one-line empty array — noise
**Problem:** `{ "github-actions.workflows.pinned.workflows": [] }` — VSCode didn't need to write this file.
**Fix:** Delete `.vscode/settings.json`. It's tracked in git and adds zero value.
**Priority:** Low

### 15. Package uses `astro: ^4.16.0` — Astro is at v5.x
**Problem:** Not breaking, but v4 is EOL and v5 has better perf and fewer deps.
**Fix:** `npx @astrojs/upgrade` when you have time. Not urgent.
**Priority:** Low

---

## ✅ Already Good

- `node_modules`, `.astro/`, `dist` in `.gitignore` ✅
- `package-lock.json` tracked (required for `npm ci` in CI) ✅
- `src/` organized by concern (components, data, layouts, pages, styles) ✅
- SPA-style single page with client-side `<script>` (fine for a portfolio) ✅
- Command palette is a nice touch ✅
- GitHub Actions CI with caching ✅
- No unnecessary npm dependencies ✅

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 High  | 4     |
| 🟡 Medium| 6     |
| 🟢 Low   | 5     |

**Top 3 quick wins:** untrack binaries (H1), fix the keyboard event hack (H2), remove dead `featured` prop (H3).
