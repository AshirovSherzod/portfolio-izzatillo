# Jamolitdinov Izzatillo — Portfolio

Personal portfolio website for **Jamolitdinov Izzatillo**, a graphic designer. The site presents his work, services and contact details in one place.

Areas of focus: **Graphic**, **Web (UI/UX)**, **Motion** and **3D** design.

The interface is available in three languages: **Uzbek** (default), **English** and **Russian**.

## Tech stack

| Area                 | Technology                                           |
| -------------------- | ---------------------------------------------------- |
| Framework            | React 19                                             |
| Language             | TypeScript 5.9 (`strict` mode)                       |
| Build tool           | Vite 7                                               |
| Styling              | Tailwind CSS v4 (via the `@tailwindcss/vite` plugin) |
| Routing              | React Router v7                                      |
| Internationalization | i18next + react-i18next                              |
| Icons                | react-icons, react-country-flag                      |
| Linting              | ESLint 9 (flat config) + typescript-eslint           |
| Package manager      | npm                                                  |

> Because the project uses Tailwind v4, there is **no** `tailwind.config.js` and **no** PostCSS configuration — all Tailwind settings live inside `src/index.css` as CSS.

## Getting started

Requirements: **Node.js 20+** and **npm**.

```bash
git clone <repo-url>
cd portfolio-izzatillo

npm install
npm run dev
```

The dev server usually starts at `http://localhost:5173`.

### The forms (optional)

Both forms send their message to a Telegram bot through
[`api/send.ts`](api/send.ts), a Vercel Edge function. Without configuration the
site still builds and runs — only submitting a form fails.

```bash
cp .env.example .env
```

Fill in `TELEGRAM_BOT_TOKEN` (from @BotFather) and `TELEGRAM_CHAT_ID`
(from @userinfobot).

> Note the names carry **no** `VITE_` prefix. That is deliberate: Vite inlines
> `VITE_`-prefixed values into the browser bundle, which would put the bot token
> in front of every visitor. These are read by the function on the server.

`npm run dev` serves the front end only — it has no `/api` route, so submitting
a form fails against it. To exercise the forms locally, run the Vercel CLI
instead, which serves the function alongside the site:

```bash
npm i -g vercel
vercel dev
```

### Scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server with HMR                  |
| `npm run build`   | Type-checks with `tsc -b`, then bundles into `dist/` |
| `npm run lint`    | Runs ESLint                                          |
| `npm run preview` | Serves the built `dist/` folder locally              |

`build` runs the TypeScript check first — a type error stops the build.

## Project structure

```
api/
└── send.ts               # Edge function: forwards form messages to Telegram

src/
├── main.tsx              # Entry point: React root, Router, i18n
├── App.tsx               # Header + Routes + Footer
├── index.css             # The single CSS file (Tailwind + design tokens)
├── assets/               # Images and logo
├── data/                 # projects, services, brands, contact, brief
├── hooks/                # useDismiss, useSectionNav, useBodyScrollLock
├── lib/                  # nav sections, localized copy, Telegram, form styles
├── i18n/
│   ├── index.ts          # i18next setup, Language type
│   ├── i18next.d.ts      # Type-safe t() keys
│   └── locales/          # uz.json, en.json, ru.json
├── pages/
│   ├── home/             # Landing page (composes the sections)
│   ├── brief/            # Client brief page
│   └── notFound/         # 404 page
└── components/
    ├── brands/           # Client logo marquee
    ├── brief/            # Brief form
    ├── header/           # Navigation + language switcher
    ├── hero/             # Hero section
    ├── about/            # About me
    ├── services/         # Services
    ├── portfolio/        # Work
    ├── contact/          # Contact
    ├── footer/           # Footer
    ├── LanSelect/        # Language dropdown
    └── tiltCard/         # 3D tilt card
```

Components do **not** have their own `.css` files — all styling is written as Tailwind classes directly in JSX.

## Design system

The site is built around a neon-green accent and a glassmorphism surface on a dark background.

Design tokens live in the `@theme` block of `src/index.css`:

| Token                  | Value      | Used as                       |
| ---------------------- | ---------- | ----------------------------- |
| `--color-neon`         | `#00ffa3`  | `text-neon`, `border-neon/20` |
| `--color-ink`          | `#031b1b`  | `bg-ink/75`                   |
| `--color-glass`        | white 6.8% | inside the `glass` utility    |
| `--color-glass-border` | white 16%  | inside the `glass` utility    |
| `--font-sans`          | Montserrat | site-wide font                |

A `glass` utility is available for the repeated frosted-glass surface. The border radius is applied separately:

```jsx
<button className="glass rounded-[10px]">Breaf</button>
```

The body background (gradients + grid overlay) and the `.tilt-card` / `.tilt-text` rules stay as plain CSS inside `index.css`, since they cannot be expressed as Tailwind utilities.

## Internationalization

Translations live in three JSON files under `src/i18n/locales/`. Thanks to `i18next.d.ts`, `t()` keys are checked by TypeScript, and **`uz.json` is the source of truth** for those keys.

To add new copy:

1. Add the key to **`uz.json` first**.
2. Then mirror it into `en.json` and `ru.json`.
3. Use it in a component via `const { t } = useTranslation()` and `t("key")`.

If a key is missing from `uz.json`, TypeScript will report an error.

## Current status

Done:

- [x] Header — sticky, with a mobile burger menu
- [x] Hero section
- [x] About section — copy fully translated (UZ / EN / RU)
- [x] 3D tilt card effect
- [x] UZ / EN / RU translations
- [x] Responsive layout
- [x] Working navigation — smooth scroll to sections, and routing to `/brief`
- [x] Language persists across reloads (`localStorage`, then browser language)
- [x] Portfolio grid with category filters and a project modal
- [x] Services section
- [x] Brands marquee
- [x] Footer
- [x] Contact section with a Telegram-backed form
- [x] Brief (`/brief`) page — a Telegram-backed client brief form
- [x] 404 page
- [x] SEO and Open Graph meta tags, `robots.txt`, `sitemap.xml`
- [x] Vercel SPA configuration (`vercel.json`)

Before going live — content, not code:

- [ ] Real project data (`src/data/projects.ts` still holds placeholder examples, and `public/projects/` is empty)
- [ ] Real contact details (`src/data/contact.ts` holds placeholders)
- [ ] Resume/CV PDF — drop it in `public/` and set `resumeUrl` in `src/data/contact.ts`; until then the download button is hidden rather than dead
- [ ] `public/og-cover.jpg` — a 1200×630 share image
- [ ] Swap the placeholder domain in `index.html`, `public/robots.txt` and `public/sitemap.xml` for the real one

## Adding a portfolio project

1. Put the image in `public/projects/` (WebP preferred).
2. Add an entry to the `projects` array in [`src/data/projects.ts`](src/data/projects.ts):

```ts
{
  id: "uzum-rebrand",
  title: { uz: "Uzum rebrending", en: "Uzum Rebrand", ru: "Ребрендинг Uzum" },
  category: "graphic",          // graphic | web | motion | 3d
  cover: "/projects/uzum-rebrand.webp",
  images: ["/projects/uzum-1.webp"],  // optional, shown in the modal
  client: "Uzum",                     // optional
  year: 2025,                         // optional
  link: "https://behance.net/...",    // optional
}
```

No other file needs editing — the grid, the filters and the modal all read from this array. If `cover` is missing or the file cannot be loaded, a placeholder is shown instead, so the layout never breaks.

## Deployment

The site is a static SPA and is set up for **Vercel**.

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Vite            |
| Build command    | `npm run build` |
| Output directory | `dist`          |

[`vercel.json`](vercel.json) rewrites every unmatched path to `index.html`. Without
that rewrite, opening or refreshing `/brief` directly would return the host's own
404 and React Router would never run.

Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as environment variables in the
Vercel project, for the Production environment — both forms fail without them.
**Redeploy after adding or changing either one**: Vercel binds environment
variables to a deployment at build time, so a deployment that already exists
will not pick up a new value.

## Notes

- The `backup/` folder holds the **previous version** of the project — the JavaScript + plain CSS code from before the TypeScript and Tailwind migration. It is excluded from both the build and ESLint, and does not need to be edited.
- There is no test suite yet.
