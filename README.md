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
cd porfolio-izzatillo

npm install
npm run dev
```

The dev server usually starts at `http://localhost:5173`.

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
src/
├── main.tsx              # Entry point: React root, Router, i18n
├── App.tsx               # Header + Routes + Footer
├── index.css             # The single CSS file (Tailwind + design tokens)
├── assets/               # Images and logo
├── i18n/
│   ├── index.ts          # i18next setup, Language type
│   ├── i18next.d.ts      # Type-safe t() keys
│   └── locales/          # uz.json, en.json, ru.json
├── pages/
│   ├── home/             # Landing page (composes the sections)
│   └── breaf/            # Brief page
└── components/
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

- [x] Header (navigation, logo, language switcher)
- [x] Hero section
- [x] About section
- [x] 3D tilt card effect
- [x] UZ / EN / RU translations (core keys)

Not built yet:

- [ ] Services section
- [ ] Portfolio gallery
- [ ] Contact form
- [ ] Footer
- [ ] Breaf (`/breaf`) page
- [ ] Brands section (the logos in `public/brands/` are unused so far)
- [ ] Responsive design (no breakpoints yet)
- [ ] Working navigation buttons (scroll / routing)
- [ ] Restoring the selected language from `localStorage`
- [ ] 404 page and SEO meta tags

## Notes

- The `backup/` folder holds the **previous version** of the project — the JavaScript + plain CSS code from before the TypeScript and Tailwind migration. It is excluded from both the build and ESLint, and does not need to be edited.
- There is no test suite yet.
