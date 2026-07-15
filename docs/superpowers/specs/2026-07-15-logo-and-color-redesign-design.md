# Logo & Color Redesign

Source of truth: `Semagram_Design_File.html` (brand guidelines, v1.0 2026), provided by the user outside this repo.

## Goal

Replace the site's logo with the new brand mark/wordmark from the design file, and bring the site's color tokens in line with the design file's palette.

## Logo

Replace the bitmap logo (`assets/img/semagram_text.png` — bold "Semagram" wordmark + gradient hourglass mark) with an inline SVG lockup matching the design file exactly:

- **Icon**: the "energy hash" mark — inline `<svg viewBox="44.348 42.174 35.217 40.435">`, exact path data from the design file, stroke-based (`fill="none" stroke="currentColor"`), so it inherits color from the wrapping element.
- **Wordmark**: live text `semagram`, lowercase, Inter, weight 400, `letter-spacing: -0.02em`, using `currentColor`.
- Icon and wordmark sit in a flex row with a small gap (~0.15–0.2em), colored via `text-accent` (brand blue) on light backgrounds, matching current usage.

Applies to two locations:
- Header nav logo — [index.html:79](../../../index.html)
- Footer logo — [index.html:687](../../../index.html)

Old logo files (`assets/img/semagram_text.png`, `assets/img/semagram-text-white.png`, `semagram_logo/semagram_icon.svg`, `semagram_logo/semagram_icon_white.svg`, `semagram_logo/semagram_text.png`, `semagram_logo/semagram_text_white.png`) become unused. Leave them in place (not deleted) — cleanup can happen separately if wanted.

Favicons are explicitly out of scope (no image-rasterization tooling available in this repo to regenerate the PNG favicon set; existing favicon files are left untouched).

## Color tokens (`tailwind.config.js`)

Full palette overhaul — replace existing token values, add new tokens for emerald/muted/deep-blue:

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

These token names are already used throughout `index.html` (~90 usages of `text-primary`, `bg-accent`, `bg-background-*`, `border-color`, etc.), so updating `tailwind.config.js` and rebuilding CSS (`npm run build-css`) propagates the change site-wide without touching those call sites.

## Hardcoded color cleanup in `index.html`

Colors that bypass the Tailwind tokens and duplicate/approximate brand colors, updated to the exact brand hex or token:

- `#2563eb`, `#3C82F6`, `#3b82f6` (chart/diagram stroke + gradient-stop colors, footer-link hover style) → `#2663EB` / `accent`
- `bg-blue-500`, `bg-blue-600`, `bg-blue-700`, `bg-blue-800`, `shadow-blue-500/30` (CTA block, [index.html:651-672](../../../index.html)) → `accent` / `accent-deep` equivalents
- Footer's inline `<style>` block ([index.html:756](../../../index.html)), which hardcodes `#0f172a` / `#2563eb` as literal copies of primary/accent → `#1B1B12` / `#2663EB`
- "Shield/utility" illustration greens `#34d399`, `#059669` → `#0FA06B` (Emerald) / `#0B7A50` (Emerald deep) — same semantic (green), now the exact brand green
- "Consult" illustration violet `#8b5cf6` → brand blue. Since it's used alongside an existing blue in a two-tone particle/gradient effect (one gradient trail peaking violet ↔ blue, two separate moving dots), map to `#2663EB` (Blue) and `#1B4FD0` (Blue deep) respectively rather than collapsing both to one flat hex — keeps the two elements visually distinct while staying strictly inside the brand's blue family (both colors are already part of the design file's own tint ramp). No color outside the brand palette remains anywhere on the page after this.
- Leave untouched: `#94a3b8` (slate particle dots in the same illustration — no brand equivalent, purely decorative dot color, low visual weight) and the favicon `mask-icon` color `#1e293b` (favicons out of scope per above)

## Testing

Visual check in browser after `npm run build-css`: header logo, footer logo, CTA block, and the two decorative illustration SVGs, confirmed against the design file's palette. No automated tests exist for this static site.
