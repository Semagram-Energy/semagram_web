# Semagram Website Rebrand — Design Spec

**Date:** 2026-06-04
**Status:** Approved for planning
**Topic:** Rebrand the marketing site around a new story — *"Building general intelligence for the power industry"* — while keeping the existing single-page static architecture.

## 1. Goal & narrative

Shift the site from today's *"Accelerating Access to Power Grids"* / interconnection pitch to a platform-level thesis: **Semagram is building general intelligence for the power industry.** The page is **vision-first, then grounded for buyers** — open at altitude, then prove concrete value lower down.

The story rests on three pillars (the "general intelligence" = these three together):

1. **The canonical data model for grid interconnection and planning.** Semagram sits *above* legacy solvers, orchestrates the right workflows for the right projects and problems with proprietary solver technology, and can model projects from scratch.
2. **The structured memory layer across projects.** A self-improving agent that compounds — every project makes the next one better.
3. **Community-focused.** Human in the loop, *from the creators of PowerAgent.*

## 2. Non-goals (YAGNI)

- No framework, router, or backend. Stays a single static `index.html`.
- No CMS, no blog, no multi-page site.
- No new third-party runtime libraries for the hero animation — built with inline SVG + vanilla JS.
- No dark mode toggle. Site remains light-mode only (consistent with the existing intentional decision).

## 3. Audience & framing

- **Primary audience:** both investors/vision *and* grid buyers — vision-first layout.
- **Content architecture:** capabilities lead, audience supports. The 3 pillars are the centerpiece "how it works" story; the existing audience segmentation (Developers / Consulting / ISO-Utilities) survives lower down as a "who it's for" section.

## 4. Page structure (new section flow)

Single `index.html`, `<section>` blocks with `id`s for nav anchors + scrollspy:

| # | Section | id | Notes |
|---|---------|-----|-------|
| 1 | Hero | `home` | Cursor-reactive Network Graph background (light). H1 "Building general intelligence for the power industry". Grounding subhead. `From the creators of PowerAgent` micro-tag. Primary CTA (Request access / Contact) + secondary ("See the platform" anchor to platform). |
| 2 | Platform / "How it works" | `platform` | Short thesis section using the **Stack diagram** (legacy solvers → canonical data model → structured memory → self-improving agent). States the "sit above legacy solvers" idea. Sets altitude. |
| 3 | The 3 Pillars | `pillars` | Centerpiece. Three feature blocks for the pillars in §1. Each: icon/mini-motif, heading, description, supporting bullets. Card cursor-glow on hover. |
| 4 | Who it's for | `solutions` | Existing Developers / Consulting / ISO-Utilities **tabs**, restyled and reframed as "Built for every stakeholder." Keeps the `.tabs` component + cursor glow. |
| 5 | Clients | `clients` | "Trusted by" logo wall (ERCOT / ISO-NE / CenterPoint / Eversource). Kept. |
| 6 | Community / PowerAgent | `community` | Ecosystem section + GitHub CTA. Kept; deeper dive on pillar 3. |
| 7 | Supported by | `support` | Backer logos (Harvard PAI / Harvard Grid / iLab / Bessemer). Kept. |
| 8 | Team | `team` | Headshots. Kept. |
| 9 | Contact CTA + Footer | `contact` | Closing CTA, newsletter form, footer links. Kept. |

**Nav:** `Platform` · `Pillars` · `Solutions` (who it's for) · `Community` · `Team` · `Contact`. All anchors use the existing `.ic-page-scroll` scrollspy/smooth-scroll mechanism; scrollspy section list updated to the new ids.

## 5. Visual system

- **Light mode only.** Tokens extend the current palette:
  - `primary` `#0f172a` (navy), `secondary` `#475569`, `accent` `#2563eb` (blue) — unchanged.
  - **New:** `electric` / cyan `#22d3ee`, used *sparingly* for intelligence "pulses," gradient text accents, and cursor-proximity highlights.
  - Backgrounds: existing `background-light/medium/dark`.
- **Typography (new):**
  - Headlines: **Space Grotesk** (700) — geometric, technical.
  - Body: **Inter** (existing) — 400/500/700.
  - Micro-labels / eyebrows / technical captions: **JetBrains Mono** (500), often with a `//` prefix.
  - Loaded via Google Fonts `<link>` in `<head>`. `Space Grotesk` and `JetBrains Mono` added to `tailwind.config.js` `fontFamily` as `font-display` and `font-mono`; `Inter` stays default `sans`.
- **Hero headline** uses a navy→cyan gradient on the phrase "general intelligence."
- **Reusable grid-line background** utility (28px faint grid) for hero and the platform section.
- **Type scale & spacing:** larger, tighter hero headline; uppercase mono eyebrows; more generous section whitespace for a modern-startup feel.

## 6. Interactivity (cursor-reactive)

Core requirement: the background visibly reacts to cursor movement.

- **Hero Network Graph** (`#home`): inline SVG of ~12 nodes + ~15 edges on the right side (clear of the copy). Vanilla JS animation loop (`requestAnimationFrame`):
  - Nodes spring toward their home position; when the cursor is within ~200px they drift toward it, then settle back on `pointerleave`.
  - Edges within ~170px of the cursor shift from blue to **cyan** and brighten/thicken by proximity.
  - A soft radial **spotlight** div follows the cursor and reveals the grid.
  - A continuous **data pulse** (cyan dot) travels edge-to-edge along the network.
  - Mouse coords normalized to the SVG viewBox; uses `pointermove`/`pointerleave`.
- **Platform section:** a lighter version of the spotlight-grid reveal (no node physics) for cohesion.
- **Pillar cards & tabs:** reuse the existing `--x`/`--y` cursor-glow pattern already in `.tabs`.
- **Performance/accessibility:** single shared rAF loop, throttled via the loop (no per-event layout thrash); disable node physics + pulse under `prefers-reduced-motion`; graph is decorative (`aria-hidden`).

## 6a. Entrance animation — graph self-construction

The page-load intro **replaces the current grid-loader overlay** and *is* the network graph building itself — the brand motif and the preloader are the same thing.

Sequence (on first load):
1. Faint grid background fades in; a **mono status readout** (JetBrains Mono, accent blue) appears bottom-left with a live `%` counter, cycling phases tied to the pillars: `indexing grid topology → linking interconnection projects → aligning to canonical model → memory layer online`.
2. **Nodes pop into place** one by one with a springy ease (`cubic-bezier(.34,1.56,.64,1)`), staggered.
3. **Edges draw themselves** sequentially between nodes via `stroke-dasharray`/`stroke-dashoffset` animation.
4. A **cyan data pulse** fires once through the completed network; the status readout fades out.
5. The **hero copy reveals** — eyebrow, headline lines, and subhead slide up from clip-path masks (staggered, `cubic-bezier(.16,1,.3,1)`); CTAs fade up.
6. The same SVG **transitions into the live cursor-reactive state** (§6) — no second graph; the constructed graph becomes the interactive one.

Implementation notes:
- One inline SVG reused for both construction and the live hero. A JS state flag flips from "building" to "interactive" when construction completes, at which point the rAF cursor loop takes over.
- Total construction is ~2–2.7s; tunable. Timings driven by `setTimeout` chains + one `setInterval` for the counter, all cancelable on replay.
- Under `prefers-reduced-motion`: skip the staggered build and pulse — render the finished graph immediately and do a simple fade-in of the hero copy (no node physics, no traveling pulse).
- Decorative SVG is `aria-hidden`; the loader must never trap focus or block content for assistive tech (hero text present in DOM from the start, just visually masked).

## 7. Technical approach

Respects the existing build (per CLAUDE.md):

- Single static `index.html` + Tailwind + vanilla JS, deployed via Wrangler. No framework.
- **Tailwind:** add `electric` color + `font-display`/`font-mono` families + any new keyframes (e.g. `pulse-travel`, `spotlight`) to `tailwind.config.js theme.extend`. Add reusable component/utility classes (`.grid-bg`, `.eyebrow`, pillar card, stack-diagram) to `src/css/tailwind.css` under `@layer`. **Must run `npm run build-css`** after changes — the browser loads committed `assets/css/main.css`. Tailwind `content` scan is only `./index.html`, so any class used must appear in `index.html`.
- **JS:** add the graph self-construction intro + hero network-graph + spotlight logic to `assets/js/main.js` (hand-written, no modules), guarded so it no-ops if the `#home` SVG is absent. The construction sequence replaces the existing `.page-loading` grid-loader overlay. Keep the rest of the existing wiring (navbar toggle, sticky header, scrollspy, tabs, portfolio filter, scroll-to-top).
- Keep ScrollReveal / Swiper / GLightbox CDN setup as-is; add Google Fonts `<link>`s.
- Update `<head>` meta/OG/Twitter copy to the new tagline.

## 8. Components (units of work)

1. **Design tokens** — `tailwind.config.js` colors, fonts, keyframes.
2. **CSS layer** — grid-bg utility, eyebrow/mono label, pillar card, stack diagram, gradient-text helper, section spacing.
3. **Hero + entrance** — markup + graph self-construction intro (replaces grid-loader) that hands off to the cursor-reactive network-graph JS + spotlight; reduced-motion fallback.
4. **Platform/Stack section** — markup + stack diagram + light spotlight grid.
5. **3 Pillars section** — three cards, copy, hover glow.
6. **Solutions (who it's for)** — restyle existing tabs, reframe headings.
7. **Kept sections** — restyle Clients, Community, Support, Team, Contact/footer to the new type system + spacing.
8. **Nav + scrollspy** — new labels, anchors, section id list.
9. **Meta/SEO** — title, description, OG/Twitter tags.
10. **Build** — `npm run build-css`, verify in `dist`, smoke-test interactions.

## 9. Success criteria

- New narrative is unmistakable above the fold; the 3 pillars are the page's spine.
- On load, the network graph visibly constructs itself (nodes pop, edges draw, status readout, pulse) then hands off to the live hero; reduced-motion renders the finished graph immediately.
- Hero background visibly and smoothly reacts to the cursor (nodes, edge highlight, spotlight, pulse) at 60fps on a typical laptop; degrades gracefully under reduced-motion.
- Space Grotesk / Inter / JetBrains Mono render correctly; cyan accent used sparingly.
- All kept sections (clients, community, support, team, contact, newsletter) present and functioning.
- Builds cleanly via `npm run build-css` + `npm run build`; no purged classes; deploys via Wrangler.
- Site remains light-mode only and fully responsive (mobile nav, stacked layouts).

## 10. Open / deferred wording

- Exact hero subhead and per-pillar body copy to be drafted during implementation and refined with the user (draft-and-refine, not blocking).
- Whether `Platform` and `Pillars` are two nav items or one is a presentation detail decided during build.
