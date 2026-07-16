# Logo & Color Redesign

Source of truth: `Semagram_Design_File.html` (brand guidelines, v1.0 2026), provided by the user outside this repo.

## Goal

Replace the site's logo with the new brand mark/wordmark from the design file, and bring every color on the site in line with the design file's palette.

## Base branch note

This branch was originally cut from `main` and implemented against a stale version of `index.html`. It was later rebased onto `cloudflare-deploy` (the real latest branch), which contains a separate, larger rebrand — a network-graph hero, a Space Grotesk display font, a `Space Grotesk`/`electric` cyan (`#22d3ee`) token, a platform/stack diagram, a PowerAgent partner card, and a demo-request form — none of which existed in `main`. The logo and color work below was redone from scratch against `cloudflare-deploy`. Typography (Space Grotesk) was left untouched — out of scope.

## Logo

Replace the bitmap logo (`assets/img/semagram_text.png` — bold "Semagram" wordmark + gradient hourglass mark) with an inline SVG lockup matching the design file exactly:

- **Icon**: the "energy hash" mark — inline `<svg viewBox="44.348 42.174 35.217 40.435">`, exact path data from the design file, stroke-based (`fill="none" stroke="currentColor"`), so it inherits color from the wrapping element. `height: 1em`, scales with the wrapping element's font size (matches the design file's own `.lockup svg { height: 1em }` pattern).
- **Wordmark**: live text `semagram`, lowercase, Inter, weight 400, `letter-spacing: -0.02em`, using `currentColor`.
- Icon and wordmark sit in a flex row with a `0.15em` gap, colored via `text-accent` (brand blue).

Applies to two locations on `cloudflare-deploy`'s `index.html`:
- Header nav logo (`text-2xl`, ~135px wide)
- Footer logo (`text-4xl`, ~196px wide)

Both comfortably clear the design file's ~120px minimum-lockup-width guideline. Old logo files (`assets/img/semagram_text.png`, `assets/img/semagram-text-white.png`, `semagram_logo/*`) become unused; left in place, not deleted. Favicons are out of scope (no image-rasterization tooling in this repo).

## Color tokens (`tailwind.config.js`)

| Token | Old | New | Design-file name |
|---|---|---|---|
| `primary` | `#0f172a` | `#1B1B12` | Ink |
| `secondary` | `#475569` | `#4A4A3D` | body-copy gray |
| `accent` | `#2563eb` | `#2663EB` | Semagram Blue |
| `accent-deep` *(new)* | — | `#1B4FD0` | Blue deep |
| `emerald` *(new)* | — | `#0FA06B` | Emerald |
| `emerald-deep` *(new)* | — | `#0B7A50` | Emerald deep |
| `muted` *(new)* | — | `#84846C` | Muted |
| `background-light` | `#ffffff` | `#FFFFFF` | White |
| `background-medium` | `#f8fafc` | `#FBFBF7` | Surface |
| `background-dark` | `#f1f5f9` | `#F3F3EC` | Paper |
| `border-color` | `rgba(0,0,0,.1)` | `rgba(27,27,18,.12)` | Line |

`electric: "#22d3ee"` is left in the config (unused as a utility class, but documents intent — see PowerAgent decision below). Blue tint ramp used throughout for layered/gradient effects (all from the design file's own ramp): 10% `#EAF0FE`, 30% `#BFD2FA`, 55% `#7CA1F4`, Base `#2663EB`, Deep `#1B4FD0`.

## Hardcoded color cleanup in `index.html`

- `#2563eb`/`#3C82F6`/`#3b82f6` (dev-tab illustration, footer inline style) → `#2663EB`
- `#8b5cf6` violet + its paired `#3b82f6` (consult-tab illustration, two-tone particle/gradient effect) → `#2663EB` / `#1B4FD0` — kept two-tone using two brand blues instead of collapsing to one flat hex, per explicit user instruction to eliminate the off-brand violet entirely
- `#94a3b8` slate particle dots (consult-tab illustration) → `#84846C` (Muted) — also per the "no colors outside the palette" instruction
- `#34d399`/`#059669` (shield/utility-tab illustration) → `#0FA06B`/`#0B7A50` (Emerald/Emerald-deep)
- CTA block `bg-blue-500/600/700/800`, `shadow-blue-500/30`, demo-form submit button same pattern → `accent`/`accent-deep` equivalents
- Platform/stack diagram: `to-blue-600` → `to-accent-deep`; `bg-blue-100/60` → `bg-[#BFD2FA]/60` (30% tint); `bg-blue-50` → `bg-[#EAF0FE]` (10% tint) — matches the diagram's existing "decreasing intensity" layering using the brand's own tint ramp
- Footer inline `<style>` block hardcoding `#0f172a`/`#2563eb` as literal primary/accent copies → `#1B1B12`/`#2663EB`
- Left untouched: `#ffffff`/`#fff` (already exact White), favicon `mask-icon` color `#1e293b` (favicons out of scope)

## `src/css/tailwind.css`

- `.text-gradient` (used on 4 marketing headline phrases): `linear-gradient(90deg, #2563eb, #22d3ee)` → `linear-gradient(90deg, #2663EB, #0FA06B)` (Blue → Emerald, in-palette two-tone accent)
- `.interactive-glow` hover glow: `rgba(37,99,235,*)` → `rgba(38,99,235,*)` (exact new accent rgb)
- `.hero-clight`/`.hero-core` (custom cursor glow over the hero): cyan stops replaced with brand blue tints (`rgba(124,161,244,*)`, `#BFD2FA`, `#2663EB`)
- `rgba(15,23,42,*)` (literal old-ink rgb used in various box-shadows/grid-bg lines) → `rgba(27,27,18,*)`, including inside `.pa-panel`'s box-shadow (a neutral drop-shadow, not part of PowerAgent's cyan identity)
- **Left untouched**: `.pa-panel`/`.pa-panel::before/::after`/`.pa-spark`/`.pa-node` (lines ~424–484) — see PowerAgent decision below

## `assets/js/main.js`

Two independent color systems live here, handled differently:

**Global click-spark effect** (page-wide, cyan spark on every click) — straightforward decorative off-brand color, swapped: ring `#22d3ee` → `#2663EB`; alternating jagged spark strokes `#bdf5ff`/`#22d3ee` → `#7CA1F4`/`#2663EB`.

**Hero "transmission-tower digital-twin" animation** (~500 lines, generative SVG) — a deliberately-tuned illustration system: steel grays for physical tower structure, cyan for "energized current" flowing through lines. This is semantically load-bearing, not a stray accent choice, so it got its own explicit decision from the user: **recolor the cyan to brand blue, leave the steel grays alone.**
- `COND` (energized wire, `#3b6fe0`) → `#2663EB` (accent)
- `CY` (current pulse / sensors / HUD dots / spark, `#22d3ee` + 3 literal duplicates on load-icon "powered" glyphs) → `#7CA1F4` (55% tint — lighter than the wire so the flowing current still reads as "hotter" than the solid conductor)
- `FLEET_FEED` (highlighted power-feed span into the load mesh, `#5b8fd6`) → `#2663EB` (same "energized" semantic as `COND`)
- Fainter highlight variants (`#7dd3fc` feed-span endpoint dot, `#aef3ff` crackle-bolt effect) → `#BFD2FA` (30% tint, lighter than `CY` to preserve the 3-tier brightness hierarchy: wire < current-glow < faint-highlight)
- Hardcoded literal `#0f172a` (HUD label text fill) → `#1B1B12` (Ink)
- **Left untouched** (structural/neutral, not a brand-color choice): `STEEL_GREY`/`STEEL`/`STEEL_DK`/`COND_GREY`/`INSUL_GREY`/`INSUL`/`FLEET_COL`/`FLEET_FILL` and the loose grays `#aebbcf`, `#cbd5e1`

## PowerAgent partner card — explicit exception

The "PowerAgent — the open-source foundation" card (`.pa-panel` in `index.html`, styled via `.pa-panel`/`.pa-spark`/`.pa-node` in `tailwind.css`) uses cyan (`#22d3ee`) deliberately, to echo PowerAgent's own logo, which is genuinely cyan/sky-blue (verified against `assets/img/poweragent_logo_dark.png`). Per explicit user decision, this card is the **one exception** left in cyan — border glow, HUD corner brackets, and flowing spark line all stay `#22d3ee`/`#bdf5ff`. It's the only cyan remaining anywhere on the page after this pass, and it reads as "crediting another brand" rather than an off-brand styling choice.

## Testing

Visual check in browser (local static server) after `npm run build-css`: header/footer logo, hero (tower animation + custom cursor glow), platform stack diagram, PowerAgent card, tab illustrations (dev/consult/shield), CTA block, demo form, footer — all confirmed against the brand palette, with the PowerAgent card confirmed as the sole intentional exception. No automated tests exist for this static site.
