# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for **Jamolitdinov Izzatillo**, a graphic designer (Graphic / Web UI-UX / Motion / 3D). Single-page marketing site with a dark neon-green aesthetic, plus a planned `/breaf` (client brief) page.

Content is trilingual: Uzbek (default), English, Russian.

## Commands

Package manager is **npm** (the project was migrated off pnpm — do not reintroduce `pnpm-lock.yaml`).

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build  — type errors fail the build
npm run lint     # eslint (flat config)
npm run preview  # serve dist/
```

There is no test suite and no test runner configured.

## Stack

React 19 + Vite 7 + TypeScript (strict) + **Tailwind CSS v4** + react-router-dom v7 + i18next.

Tailwind v4 is wired through the **`@tailwindcss/vite` plugin** in [vite.config.ts](vite.config.ts) — there is no `tailwind.config.js` and no PostCSS config. All Tailwind configuration lives in CSS.

## Architecture

### Styling — read [src/index.css](src/index.css) before touching styles

This is the **only** CSS file in the project. Component-level `.css` files were deliberately removed; everything else is Tailwind utility classes in JSX. Do not add new `.css` files.

`src/index.css` has four parts, and each exists for a reason:

1. `@theme` — design tokens. `--color-neon` (`#00ffa3`, the accent), `--color-ink` (`#031b1b`, the dark base), `--color-glass` / `--color-glass-border`, and the Montserrat `--font-sans`. Use `text-neon`, `bg-ink/75`, `border-neon/20` etc. rather than hardcoding hex values.
2. `@layer base` — the `body` background (two radial gradients + a linear gradient) and the `body::before` grid overlay with a radial mask. Not expressible as utilities; leave it here.
3. `@utility glass` — the frosted-glass surface used by the header, buttons, the About card and the language selector. Apply as `glass rounded-[10px]`; the utility sets background, border and `backdrop-filter` only, so the radius comes from a Tailwind class alongside it.
4. `@layer components` — `.tilt-card` / `.tilt-text`. These depend on CSS custom properties (`--px`, `--py`, `--rx`, `--ry`) written from JS, so they cannot be utilities.

Note on `backdrop-filter`: write the standard property only. Lightning CSS adds the `-webkit-` prefix automatically. Writing both by hand with different values causes the minifier to drop the standard one, which silently breaks the effect in Firefox.

### The tilt card

[TiltCard.tsx](src/components/tiltCard/TiltCard.tsx) is a mouse-driven 3D tilt wrapper. It writes `transform` directly to the DOM node via a ref (not React state) on every `mousemove` for performance, and publishes cursor position as CSS variables that `.tilt-card.is-hover .tilt-text` in `index.css` reads to parallax the caption label. So the JS and the CSS in `index.css` are coupled — changing one variable name requires changing both.

It is mouse-only; there are no touch handlers, so the effect is inert on mobile.

### i18n

[src/i18n/index.ts](src/i18n/index.ts) initialises i18next with three JSON resource bundles from `src/i18n/locales/`. It also exports a `Language` union type derived from the `resources` object — use that type rather than a bare `string` for language codes.

[src/i18n/i18next.d.ts](src/i18n/i18next.d.ts) augments i18next's `CustomTypeOptions` so `t()` keys are type-checked against `uz.json`. **Consequence: `uz.json` is the source of truth for translation keys.** Adding a key to `en.json` alone will not typecheck; add it to `uz.json` first, then mirror it into `en.json` and `ru.json`.

### Portfolio data

[src/data/projects.ts](src/data/projects.ts) is the single place work is added — drop an image in `public/projects/`, add an entry, done. No other file needs touching.

Project titles are **not** in the locale files. They live in the data entry as a `Localized` object (`{ uz, en, ru }`) and are read through `pickLocalized` from [src/lib/localized.ts](src/lib/localized.ts). Only UI chrome (headings, filter labels, category names) goes in `src/i18n/locales/`. Keep it that way: putting per-project copy into the locale files would mean editing four files to add one project.

Category labels resolve as ``t(`cat-${category}`)``, so every member of `PROJECT_CATEGORIES` needs a matching `cat-*` key in all three locales — TypeScript catches a missing one because template literal types distribute over the union.

The grid is a bento layout, defined in [bento.ts](src/components/portfolio/bento.ts). Tile sizes come from a fixed six-step cycle that tiles a 4-column grid exactly:

```
1 1 2 2      large = 2x2   wide = 2x1   small = 1x1
1 1 3 4      cycle: large, wide, small, small, wide, wide
5 5 6 6
```

The cycle is applied **only to complete groups of six**; whatever is left over renders as `wide`. That guard is the whole point — an earlier version applied a size rule to every index and a partly-consumed pattern left a hole in the middle of the grid, which is very visible. If you change `BENTO_CYCLE`, verify the new cycle still packs a 4-column grid with no gaps before committing.

The pattern is `lg`-only. Below `lg` the cards are uniform `aspect-4/3` tiles in a 1- or 2-column grid; at `lg` they switch to `aspect-auto` and take their height from `auto-rows-[230px]` and their row span.

`cover` and `images` are optional. [ProjectImage](src/components/portfolio/ProjectImage.tsx) renders a placeholder when a path is missing _or_ when the file 404s (`onError`), so a half-filled data file never breaks the grid. It tracks the failed URL rather than a boolean so the state resets on its own when `src` changes — resetting it in an effect trips the `react-hooks/set-state-in-effect` lint rule.

### Routing and scroll navigation

[App.tsx](src/App.tsx) renders `ScrollManager`, `Header`, a `<Routes>` block (`/` → Home, `/brief` → Brief), then `Footer`. Home composes the page sections in order: Hero, About, Services, Portfolio, Contact.

Header nav targets the on-page sections listed in [src/lib/sections.ts](src/lib/sections.ts) — that `SECTIONS` array is what the nav is generated from, and each id must match both a section `id` attribute and a translation key. Adding a section means touching the array, the component's `id`, and all three locale files.

Cross-page navigation ("Services" clicked while on `/brief`) works through a **module-level `pendingSection` variable**, not router state. `useSectionNav` sets it and navigates; `ScrollManager` in App consumes it on the next pathname change and scrolls there, otherwise scrolls to top. Router state was tried first and does not work here: clearing the state after scrolling re-fires the effect and yanks the page back to the top mid-scroll.

`ScrollManager` relies on effects running after DOM commit, so the target section exists by the time it looks it up. Sections carry `scroll-mt-28` to clear the sticky header.

## Current state — much of the site is unbuilt

Only **Header** (with a mobile menu), **Hero**, **About**, **Portfolio**, **LanSelect** and **TiltCard** are implemented. These are stubs that render nothing but their own name:

- `Services.tsx`, `Contact.tsx` — these render only their own name, but they do carry the section `id` and spacing the nav depends on, so keep those when filling them in
- `Footer.tsx`
- `pages/brief/Brief.tsx` (the whole route)

Known gaps, in case they come up:

- **The projects in `src/data/projects.ts` are placeholder examples**, marked with a TODO. They must be replaced with real work before the site goes live.
- **The stub sections have no responsive work yet.** Header, Hero and About are done (`sm:` / `lg:` breakpoints, `lg:` is where the desktop nav appears); follow the same pattern when filling in the others.
- **No 404 route** and no SEO/Open Graph meta tags.
- `public/brands/` holds ten client logos (Uzum, Uzinfocom, and others) that nothing in the code references yet — intended for an unbuilt brands/clients section.
- **About's copy is hardcoded Uzbek JSX**, so EN/RU visitors still read Uzbek there.
- The Resume download button in About has no PDF behind it and no `onClick`.
- `TiltCard` is mouse-only — no touch handlers, and `prefers-reduced-motion` is not honoured.

## Repo conventions

- `backup/` holds the pre-migration JavaScript + plain-CSS version of the project. It is excluded from `tsconfig.app.json` (`include: ["src"]`) and from ESLint (`globalIgnores`). Never edit it, and do not treat it as live code when searching.
- [README.md](README.md) is the human-facing project passport: stack, setup, design tokens, i18n workflow and a checklist of what is built vs. unbuilt. Keep its "Current status" checklist in sync when a section stops being a stub.
- Prettier is not configured, but files follow its defaults: 2-space indent, double quotes, semicolons, trailing commas.
- UI copy and code comments are written in Uzbek. Match that when adding either.
