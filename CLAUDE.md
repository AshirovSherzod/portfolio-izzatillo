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

### Routing

[App.tsx](src/App.tsx) renders `Header`, a `<Routes>` block (`/` → Home, `/breaf` → Breaf), then `Footer`. Home composes the page sections in order: Hero, About, Services, Portfolio, Contact.

## Current state — much of the site is unbuilt

Only **Header**, **Hero**, **About**, **LanSelect** and **TiltCard** are implemented. These are stubs that render nothing but their own name:

- `Services.tsx`, `Portfolio.tsx`, `Contact.tsx`, `Footer.tsx`
- `pages/breaf/Breaf.tsx` (the whole route)

Known gaps, in case they come up:

- **No responsive design at all** — there is not a single breakpoint (`sm:` / `md:` / `lg:`) in the codebase. Fixed widths like `w-1/2` and `w-[30%]` break on mobile.
- **No interactive navigation** — header nav items are plain `<li>` elements, and the Hero/Header buttons have no `onClick` or `Link`.
- **Language does not persist** — `LanSelect` writes the choice to `localStorage` under `"lang"`, but `i18n/index.ts` hardcodes `lng: "uz"` and never reads it back.
- **No 404 route** and no SEO/Open Graph meta tags.
- `public/brands/` holds ten client logos (Uzum, Uzinfocom, and others) that nothing in the code references yet — intended for an unbuilt brands/clients section.
- "Breaf" is a misspelling of "Brief" that runs through the route path, filenames and i18n keys.

## Repo conventions

- `backup/` holds the pre-migration JavaScript + plain-CSS version of the project. It is excluded from `tsconfig.app.json` (`include: ["src"]`) and from ESLint (`globalIgnores`). Never edit it, and do not treat it as live code when searching.
- [README.md](README.md) is the human-facing project passport: stack, setup, design tokens, i18n workflow and a checklist of what is built vs. unbuilt. Keep its "Current status" checklist in sync when a section stops being a stub.
- Prettier is not configured, but files follow its defaults: 2-space indent, double quotes, semicolons, trailing commas.
- UI copy and code comments are written in Uzbek. Match that when adding either.
