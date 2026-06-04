# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing website for Semagram Energy (https://semagram.energy) — "Accelerating Access to Power Grids". It is a **single static page** (`index.html`) styled with Tailwind CSS and a small amount of vanilla JS, deployed to Cloudflare via Wrangler. There is no framework, no router, no backend, and no test suite.

## Commands

```bash
npm run build-css   # one-shot Tailwind compile: src/css/tailwind.css -> assets/css/main.css
npm run tw-build    # same, but --watch (use this while developing)
npm run build       # compile CSS, then rebuild ./dist (index.html + assets + semagram_logo)
npm run deploy      # npm run build, then `wrangler deploy` to Cloudflare
```

There is no lint and no test runner (`npm test` is a stub that exits 1).

## Build / deploy flow

- Tailwind input is `src/css/tailwind.css`; the **compiled output `assets/css/main.css` is committed** and served directly. Editing `main.css` by hand is pointless — it gets overwritten on the next build. Style changes belong in `src/css/tailwind.css` (custom `@layer` rules), `tailwind.config.js` (theme/colors/animations), or as utility classes in `index.html`.
- Tailwind's `content` scan is **only `./index.html`** (see `tailwind.config.js`). Any class used solely from JS or injected dynamically will be purged from the build unless it also appears in `index.html`.
- `npm run build` regenerates the `dist/` directory from scratch (`rm -rf dist`). `dist/` is the Wrangler asset directory (`wrangler.jsonc` → `"directory": "./dist"`) and is gitignored, so it is a pure build artifact — never edit `dist/` directly.

## Page structure

`index.html` is one long document organized as `<section>` blocks, each with an `id` used for nav anchors and scrollspy: `home`, `solutions`, `community`, `clients`, `support`, `team`, `contact`. The `solutions` section is a tabbed interface (Developers / Consulting / ISO-Utilities).

`assets/js/main.js` is hand-written vanilla JS (no modules, no build step) wiring up: page-loading overlay, mobile navbar toggle (`.menu-show`), sticky header (`.scrolled` on scroll), scrollspy + smooth-scroll for `.ic-page-scroll` anchors, the `.tabs` component (incl. the `--x`/`--y` cursor glow), a portfolio filter, and scroll-to-top.

Third-party libs are loaded from CDN and initialized in an inline `<script>` at the bottom of `index.html`: **Swiper** (testimonial carousel), **GLightbox** (video/image popups), and **ScrollReveal** (`.scroll-revealed` entrance animations). Their CSS comes from the CDN `<link>` tags in `<head>`.

## Conventions

- Design tokens live in `tailwind.config.js` `theme.extend`: colors (`primary`, `secondary`, `accent`, `background-*`, `border-color`), shadows (`card-1`, `card-2`), and keyframe animations (`zoom-in-out`, `float`, `glow`, `text-pulse`). Reuse these rather than hardcoding hex values.
- Reusable component classes (`.glass-panel`, `.tabs-*`, `.grid-loader`, `.nav-menu`, `.section-area`, the `.row`/`.col-*` grid, etc.) are defined in `src/css/tailwind.css` under `@layer components`/`@layer utilities`. Prefer these over re-deriving the same styling inline.
- JS hooks use `data-web-*` attributes (e.g. `data-web-toggle=navbar-collapse`, `data-web-target`, `data-web-trigger=scroll-top`) — match this pattern when adding interactive elements.
- The site is light-mode only (`color-scheme: light`); forced dark mode was intentionally removed.

## Important caveat

After changing `src/css/tailwind.css`, `tailwind.config.js`, or any Tailwind classes in `index.html`, you must run `npm run build-css` (or have `tw-build` watching) for changes to appear — the browser loads the committed `assets/css/main.css`, not the source.
