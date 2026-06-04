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

## 6. Hero — transmission-tower digital twin (interactive)

The hero motif is a **detailed lattice transmission tower** (with a smaller distant tower, insulator strings, and sagging catenary conductors) rendered as inline SVG in the `#home` section, biased to the right so it clears the left-aligned copy. It builds itself on load, a single scan brings it to life, and it then stays interactive. This **replaces the earlier network-graph hero**.

Interactions (after the intro, via one `requestAnimationFrame` loop):
- **Cursor light:** a glowing cyan orb + hot white core follows the cursor (HTML divs, screen blend); short **crackling arcs** spark off it and a **bolt jumps to the nearest sensor node** when close. The native cursor is hidden over the hero (`cursor:none`); links re-enable the pointer.
- **Click → energy surge:** clicking the hero fires shockwave **rings** and a bright **surge** that races down every conductor (cyan, thickened) and decays. Clicks on links/buttons are ignored (they navigate normally).
- **Sensor nodes** (~5) on key joints pulse; **data packets** travel the conductors; ambient **particle field** drifts and is pushed by the cursor.
- **Telemetry HUD:** two faint labels with leader lines — `500 kV` and a live `LOAD %`.
- **Parallax:** the tower group shifts subtly toward the cursor.
- Mouse → viewBox coords via `svg.getScreenCTM().inverse()` (accurate under `preserveAspectRatio="xMidYMid slice"`).
- **Pillar cards & tabs:** reuse the existing `--x`/`--y` cursor-glow pattern.
- **Performance/accessibility:** single shared rAF loop; an `IntersectionObserver` pauses it when the hero scrolls off-screen; decorative SVG is `aria-hidden`; reduced-motion renders a static finished tower (no loop, no cursor physics — see §6a).

### Background digital-twin screen + "SPEED UP"
A small, **transparent dark monitor** sits in the clear gap below the central conductors, revealed after the scan; it brightens on hover. Its left shows a mini schematic of both towers; its right is a **`SPEED UP` button**. Each click reveals another batch (~3) of faint **network-mesh towers** expanding outward in the background (connected by hairline conductors, placed in clear zones to avoid overlapping the hero/copy), and nudges the energy-flow speed up — up to **5 clicks**, then the button relabels `GRID ↑`. The button is hit-tested at the section level (the SVG is `pointer-events:none`).

## 6a. Entrance animation — tower self-construction + colorizing scan

The page-load intro **replaces the old grid-loader overlay** and *is* the tower building itself:

1. Faint grid fades in; a **mono status readout** (bottom-left) shows a live `%` counter cycling: `surveying site → raising lattice → mounting cross-arms → hanging insulators → stringing conductors → syncing digital twin`.
2. **Foundations → lattice rises panel-by-panel** (legs, beams, X-bracing draw via `stroke-dasharray`), then cross-arms, **insulator strings drop in**, and **conductors string across** to the distant tower / off-frame — all in **grey**.
3. A **single cyan scan band sweeps across once**, recoloring the grey tower into its energized "current" state as it passes (cyan wavefront leaving colored steel + blue conductors behind; sensors light up; conductors begin flowing).
4. When the scan completes, the **hero copy reveals** (eyebrow, headline lines, subhead slide up from masks; CTAs fade up), the telemetry HUD and twin screen appear, and the loop hands off to the interactive state (§6).

Implementation notes:
- One inline SVG; grey build → scan recolor → interactive, driven by `setTimeout` chains + one `setInterval` (counter). Build runs at ~0.66× for a brisk open.
- Under `prefers-reduced-motion`: render the finished, colored tower immediately (no construction, no scan, no perpetual loop, no cursor physics); reveal copy via a plain fade.
- Decorative SVG is `aria-hidden`; hero text is in the DOM from the start (visually masked), so it never blocks assistive tech.

## 7. Technical approach

Respects the existing build (per CLAUDE.md):

- Single static `index.html` + Tailwind + vanilla JS, deployed via Wrangler. No framework.
- **Tailwind:** add `electric` color + `font-display`/`font-mono` families + any new keyframes (e.g. `pulse-travel`, `spotlight`) to `tailwind.config.js theme.extend`. Add reusable component/utility classes (`.grid-bg`, `.eyebrow`, pillar card, stack-diagram) to `src/css/tailwind.css` under `@layer`. **Must run `npm run build-css`** after changes — the browser loads committed `assets/css/main.css`. Tailwind `content` scan is only `./index.html`, so any class used must appear in `index.html`.
- **JS:** add the transmission-tower digital-twin intro (build → colorizing scan → interactive cursor light / click surge / sensors / HUD / particles / background mesh + SPEED UP) to `assets/js/main.js` as a self-contained IIFE, guarded so it no-ops if the `#home` SVG is absent. It replaces the old `.page-loading` grid-loader overlay. Keep the rest of the existing wiring (navbar toggle, sticky header, scrollspy, tabs, portfolio filter, scroll-to-top).
- Keep ScrollReveal / Swiper / GLightbox CDN setup as-is; add Google Fonts `<link>`s.
- Update `<head>` meta/OG/Twitter copy to the new tagline.

## 8. Components (units of work)

1. **Design tokens** — `tailwind.config.js` colors, fonts, keyframes.
2. **CSS layer** — grid-bg utility, eyebrow/mono label, pillar card, stack diagram, gradient-text helper, section spacing.
3. **Hero + entrance** — markup + transmission-tower digital-twin intro (build → colorizing scan → interactive cursor light / click surge / sensors / HUD / particles / background mesh + SPEED UP); replaces grid-loader; reduced-motion fallback; off-screen rAF pause.
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
