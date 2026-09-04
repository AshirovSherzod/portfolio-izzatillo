# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site for **Jamolitdinov Izzatillo**, a graphic designer (Graphic / Web UI-UX / Motion / 3D). Single-page marketing site with a dark neon-green aesthetic, plus a `/brief` page carrying a client brief form.

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
2. `@layer base` — the page background, plus a global `prefers-reduced-motion` guard. The background is two **fixed** pseudo-elements at `z-index: -1`: `body::before` holds the gradients, `body::after` the masked grid. They are fixed rather than painted on `body` because a body background stretches with the document, sliding the bottom gradient off-screen on long pages; `background-attachment: fixed` would be shorter but iOS Safari ignores it.
3. `@utility glass` — the frosted-glass surface used by the header, buttons, the About card and the language selector. Apply as `glass rounded-[10px]`; the utility sets background, border and `backdrop-filter` only, so the radius comes from a Tailwind class alongside it.
4. `@layer components` — `.tilt-card` / `.tilt-text`, which depend on CSS custom properties (`--px`, `--py`, `--rx`, `--ry`) written from JS, and the `.marquee` rules behind the brands strip. Neither is expressible as utilities.

Note on `backdrop-filter`: write the standard property only. Lightning CSS adds the `-webkit-` prefix automatically. Writing both by hand with different values causes the minifier to drop the standard one, which silently breaks the effect in Firefox.

### The tilt card

[TiltCard.tsx](src/components/tiltCard/TiltCard.tsx) is a mouse-driven 3D tilt wrapper. It writes `transform` directly to the DOM node via a ref (not React state) on every `mousemove` for performance, and publishes cursor position as CSS variables that `.tilt-card.is-hover .tilt-text` in `index.css` reads to parallax the caption label. So the JS and the CSS in `index.css` are coupled — changing one variable name requires changing both.

It is mouse-only; there are no touch handlers, so the effect is inert on mobile.

### i18n

[src/i18n/index.ts](src/i18n/index.ts) initialises i18next with three JSON resource bundles from `src/i18n/locales/`. It also exports a `Language` union type derived from the `resources` object — use that type rather than a bare `string` for language codes.

[src/i18n/i18next.d.ts](src/i18n/i18next.d.ts) augments i18next's `CustomTypeOptions` so `t()` keys are type-checked against `uz.json`. **Consequence: `uz.json` is the source of truth for translation keys.** Adding a key to `en.json` alone will not typecheck; add it to `uz.json` first, then mirror it into `en.json` and `ru.json`.

### Content data files

`src/data/` holds everything that is content rather than code — [projects.ts](src/data/projects.ts), [services.ts](src/data/services.ts), [brands.ts](src/data/brands.ts) and [contact.ts](src/data/contact.ts). Copy that varies per project/service lives in the entry as a `Localized` object read through `pickLocalized`; only UI chrome (headings, filter labels, category names) goes in the locale files. Adding a project or a service stays a one-file change.

`contact.ts` also exports `resumeUrl`, deliberately empty: About renders the resume download button only when it is set, so there is never a button with nothing behind it.

**`contact.ts` currently holds placeholder values** — a fake email, phone and social URLs, marked with a TODO. Both the Footer and the Contact section render them today, so they must be replaced before the site is public.

### The two forms

There are two: [ContactForm.tsx](src/components/contact/ContactForm.tsx) and [BriefForm.tsx](src/components/brief/BriefForm.tsx). Both send through [src/lib/telegram.ts](src/lib/telegram.ts), which posts to [api/send.ts](api/send.ts) — a Vercel serverless function that forwards the text to the Telegram Bot API. They share field styling through [src/lib/formStyles.ts](src/lib/formStyles.ts) and both carry the same honeypot field.

The brief's dropdown options live in [src/data/brief.ts](src/data/brief.ts) as `Localized` values, like every other content file. `buildMessage` composes the Telegram text with **Uzbek** labels regardless of the visitor's language — the message is read by the site owner, not the sender. Credentials come from `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`, typed in [vite-env.d.ts](src/vite-env.d.ts).

The credentials are `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, deliberately **without** a `VITE_` prefix. An earlier version read them as `VITE_` values, which Vite inlines into the browser bundle — the token was readable in DevTools by anyone. Adding the prefix back would undo that fix, so never rename these.

It reads its two variables inside the handler rather than at module scope: module bodies run once per cold start, and a value captured there can outlive a later change to it.

The function returns a JSON body, and the client checks for `ok: true` rather than trusting the status code alone. Vite's dev server answers `/api/send` with `index.html` and a 200, so a status-only check reported success while sending nothing. Exercising the form locally needs `vercel dev`, not `npm run dev`.

`sendMessage` is called **without** `parse_mode`: user text containing `<` or `&` would otherwise break Telegram's HTML parsing and fail the request. A Telegram error response is logged server-side only — its body can echo the request URL, and the token with it.

### Portfolio data

[src/data/projects.ts](src/data/projects.ts) is the single place work is added — drop an image in `public/projects/`, add an entry, done. No other file needs touching.

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

[App.tsx](src/App.tsx) renders `ScrollManager`, `Header`, a `<Routes>` block (`/` → Home, `/brief` → Brief, `*` → NotFound), then `Footer`. Home composes the page sections in order: Hero, About, Brands, Services, Portfolio, Contact. Brands is not in `SECTIONS` — it is a strip, not a nav target.

Header nav targets the on-page sections listed in [src/lib/sections.ts](src/lib/sections.ts) — that `SECTIONS` array is what the nav is generated from, and each id must match both a section `id` attribute and a translation key. Adding a section means touching the array, the component's `id`, and all three locale files.

Cross-page navigation ("Services" clicked while on `/brief`) works through a **module-level `pendingSection` variable**, not router state. `useSectionNav` sets it and navigates; `ScrollManager` in App consumes it on the next pathname change and scrolls there, otherwise scrolls to top. Router state was tried first and does not work here: clearing the state after scrolling re-fires the effect and yanks the page back to the top mid-scroll.

`ScrollManager` relies on effects running after DOM commit, so the target section exists by the time it looks it up. Sections carry `scroll-mt-28` to clear the sticky header.

## Current state

Every section of the landing page is built, `/brief` carries a working form, and
there is a 404 route. The remaining gaps are **content, not code**.

- **The projects in `src/data/projects.ts` are placeholder examples**, marked with a TODO, and `public/projects/` is empty — the whole grid currently renders placeholders.
- **`src/data/contact.ts` holds a fake email, phone and social URLs**, also marked with a TODO. Footer and Contact both render them.
- `resumeUrl` in that same file is empty, so the About download button is hidden. Setting it (with a PDF in `public/`) is all that is needed to bring it back.
- `index.html`, `public/robots.txt` and `public/sitemap.xml` share a **placeholder domain** (`portfolio-izzatillo.vercel.app`). Change all three together when a real domain is attached.
- `og:image` points at `/og-cover.jpg`, which does not exist yet — it needs a 1200×630 image.

Smaller known gaps:

- The brands marquee duplicates the list and translates the track by -50%, which only lines up because both copies are identical — keep them in sync if you touch `.marquee-group`. It carries its own `prefers-reduced-motion` rule setting `animation: none`, because the global guard only shortens `animation-duration`, which would freeze an infinite animation on its last frame instead of stopping it.
- `TiltCard` is mouse-only — no touch handlers, and `prefers-reduced-motion` is not honoured.

## Deployment

Static SPA, configured for Vercel. [vercel.json](vercel.json) rewrites every
unmatched path to `index.html`; without it, loading or refreshing `/brief`
directly returns the host's 404 and React Router never boots. It also sets a
one-year immutable cache on `/assets/*`, which is safe because Vite content-hashes
those filenames.

`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` must be set as environment variables
on the host, for the Production environment, and **a redeploy is required after
adding or changing one** — Vercel binds environment variables to a deployment
when it is built, so an existing deployment never sees a newly added value.

When the pair is missing, the function answers 500 with a `missing` array naming
the absent variables (names only, never values), which is usually faster than
opening the dashboard.

The catch-all rewrite does not shadow `/api/send`: Vercel applies rewrites only
after the filesystem and functions have been checked.

`tsc -b` covers three project references: `tsconfig.app.json` for `src`,
`tsconfig.node.json` for the Vite config, and `tsconfig.api.json` for `api` —
the last one carries Node types rather than the browser's, since that code runs
on the server. A type error in `api/` fails `npm run build` like any other.

## Repo conventions

- `backup/` holds the pre-migration JavaScript + plain-CSS version of the project. It is excluded from `tsconfig.app.json` (`include: ["src"]`) and from ESLint (`globalIgnores`). Never edit it, and do not treat it as live code when searching.
- [README.md](README.md) is the human-facing project passport: stack, setup, design tokens, i18n workflow and a checklist of what is built vs. unbuilt. Keep its "Current status" checklist in sync when a section stops being a stub.
- Prettier is not configured, but files follow its defaults: 2-space indent, double quotes, semicolons, trailing commas.
- UI copy and code comments are written in Uzbek. Match that when adding either.
