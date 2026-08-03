# Bento Grid / Modular Canvas — Redesign Plan

**Status:** Planning complete, ready for implementation. Not yet built.
**Branch:** `redesign/bento-modular-canvas`

## Why

The current "Engineering Notebook" identity (monochrome, zero-radius, flat, hairline-divided)
now reads as safe, templated, and forgettable rather than distinctive. This plan replaces it
with a Bento Grid / Modular Canvas direction — Apple product pages and Framer portfolio
templates as the visual anchor — while preserving all product truth: content, case studies,
the `/now` and `/playground` build-log honesty, and the first-person voice. The old look is
treated as evidence of what this site is, not authority over what it becomes.

This explicitly and knowingly overrides PRODUCT.md's prior anti-reference against
glassmorphism/generic-SaaS templates. That anti-reference gets rewritten as part of this
work — the rest of PRODUCT.md's anti-reference list (stats-grid "proof" sections, "Book a
call" CTAs, service tiers, purple gradients, stiff resume-PDF energy) is untouched and still
applies.

## Locked direction

- **Visual anchor:** Apple product landing pages / Framer portfolio templates.
- **Layout:** asymmetric, variable-sized tiles (e.g. one 2x2 flagship + two 1x1 tiles).
- **Shape:** rounded corners, 16–24px radius scale (replaces the current zero-radius rule).
- **Surface:** soft glassmorphism / backdrop blur (replaces the current flat-at-rest rule;
  Nav's blur is no longer a one-off exception — it's one glass surface among several).
- **Interaction:** tiles scale ~1.02 and deepen shadow on hover, site-wide (CSS-only). The
  homepage's flagship tile additionally gets true cursor-tracking 3D tilt via `motion/react`
  (`useMotionValue`/`useTransform`, gated on `useReducedMotion()`).
- **Color:** stays near-monochrome; richness comes from *more liberal use of the existing
  signal-blue accent* (glow, wash, low-opacity gradient) — no new brand hues.
- **Mode:** light only. No dark-mode tokens in this pass.
- **GitHub activity tile:** out of scope — no live integration exists and fabricated metrics
  are forbidden by PRODUCT.md.

## 1. Design tokens (`src/styles/global.css`)

Current `@theme` block only defines `--color-base`, `--color-foreground`, `--color-accent`,
`--font-sans` — everything else DESIGN.md documents today is unimplemented, scattered raw
Tailwind utility classes. Add, additively:

- **Radius scale:** `--radius-sm` (12px, chips/controls), `--radius-md` (16px, 1x1 tiles),
  `--radius-lg` (20px, medium tiles/panels), `--radius-xl` (24px, flagship 2x2 tile).
- **Blur scale:** `--blur-glass-sm` (8px, chips), `--blur-glass-md` (16px, tile surfaces),
  `--blur-glass-lg` (24px, nav + flagship tile).
- **Glass/canvas colors:** `--color-glass` (~70% white tile fill), `--color-glass-border`
  (translucent edge, replaces `border-black/5-10%` on glass surfaces), `--color-canvas`
  (a slightly-off-base section background — flat `#fafafa`-on-`#fafafa` gives blur nothing to
  distort, see Risk 1), `--color-accent-glow` (~15% accent, for hover glow on interactive/
  flagship tiles).
- **Elevation:** `--shadow-tile-rest`, `--shadow-tile-hover` (deepen on hover, paired with the
  `scale(1.02)`).
- **Shared component classes** in `@layer components`: `.chip` (replaces the tag-chip markup
  currently duplicated across `WorkCard.tsx`, `PlaygroundCard.astro`, `NowEntry.astro`, and
  inline in `index.astro`) and `.bento-tile` (radius/glass/border/shadow-rest + hover state) —
  one definition shared by both `.astro` and `.tsx` components instead of re-duplicating
  Tailwind strings per component.

### DESIGN.md rewrite (sections, not a patch)

- Frontmatter: add the new color/radius tokens.
- §1 Overview: retire "The Engineering Notebook" framing; state the new north star.
- §4 Elevation: Nav's blur stops being "the one shipped exception" — bento tiles are now a
  first-class elevated pattern; state explicitly what stays flat (prose bodies, resume).
- §5 Components: replace "Cards: two patterns" (List Card / Framed Card) with a Bento Tile
  spec.
- §6 Do's/Don'ts: flip the glassmorphism/shadow bullets that are now reversed; do not leave
  stale prohibitions sitting next to the new rules.

### PRODUCT.md rewrite (targeted)

- `Brand Commitments → Visual Identity Constraints`: drop the zero-radius rule; add the new
  radius/glass language.
- `Capabilities and Constraints → Anti-references`: drop "glassmorphism as decoration" only —
  every other listed anti-reference (stats-grids, "Book a call," service tiers, purple
  gradients, resume-PDF stiffness) stays, unchanged, and must not be silently dropped
  alongside it.

## 2. Component architecture

**New:**
- `src/components/bento/BentoGrid.astro` — CSS grid wrapper, span utilities applied per-slot
  by the consuming page.
- `src/components/bento/BentoTile.astro` — Astro-native `.bento-tile` wrapper, CSS-only hover,
  usable on every page with zero JS.
- `src/components/bento/BentoTile.tsx` — `motion/react` variant with cursor-tilt.
  **Homepage flagship tile only** (per confirmed decision) — not retrofitted elsewhere.

**Refactor, most-central first:**
- `src/pages/index.astro` — replace the inline "Featured Production Work" grid (lines 15–47)
  with `BentoGrid`/`BentoTile`; wire up the currently-dead `featured: boolean` field (falls
  back to `.slice(0,3)` by `order` if fewer than 3 entries are flagged); fix the latent bug
  where every featured card links to a `/work/[id]` detail page that may not exist (only link
  when a detail page is confirmed to exist, mirroring the `hasDetail` pattern already used on
  `/work`'s `WorkCard.tsx`).
- `src/components/WorkCard.tsx` — restyle to `.bento-tile` (rounded/glass/shadow); **keep** its
  current single-column stacked-card structure, not a variable-span grid (see Risk 4 — content
  volume + `motion` layout/filter animations don't pair well with asymmetric spans).
- `src/components/WorkFilter.tsx` — cosmetic only: `layoutId="activeFilter"` pill becomes
  `rounded-full`; existing shared-element animation logic untouched.
- `src/components/PlaygroundCard.astro` — closest existing analog to a bento tile already;
  swap flat `bg-white border-black/5` for `.bento-tile`.
- `src/components/NowEntry.astro` / `NowGroup.astro` — stays list/log-structured (a changelog
  reads top-to-bottom, not as a grid); restyle rows as soft rounded cards, not tiles.
- `src/components/about/AboutStack.astro` — likely bento-tileable (skill/tool categories); read
  its actual content shape before committing to a tile count.
- `src/components/about/AboutTimeline.astro` — keep the rail + circular-dot pattern as-is; the
  dots stop being "the one radius exception" since radius is now the norm site-wide.
- `src/components/Nav.astro` — move its ad hoc `backdrop-blur-md bg-base/80` onto the new
  shared `--blur-glass-lg`/`--color-glass` tokens.
- `src/components/Footer.astro` — consider adding a bento-style "Get in touch" CTA tile, since
  email is the site's primary CTA (per PRODUCT.md) but currently has no dedicated visual
  treatment anywhere on the site. Recommended, not required.

**Unchanged:** content collection schemas (only *using* already-defined `featured`/`image`
fields, no schema changes needed), routing, `src/scripts/reveal.ts` (keep verbatim; apply
`data-reveal` to new Astro-rendered tiles; don't mix with `WorkCard.tsx`'s own `motion`
enter/exit animations on the same component), the 12-col rail+content split on
`work/[slug].astro` and `resume.astro`'s label-rail layout (surface treatment changes only).

## 3. Page-by-page plan

| Page | Bento-ness | Plan |
|---|---|---|
| `/` | High | `BentoGrid`: one 2x2 flagship + two 1x1 tiles, driven by `featured` flag. Flagship tile gets real screenshot once sourced (interim: designed placeholder, not fabricated data) + homepage-only cursor tilt. Hero CTA radius updated to match. Consider a small "currently building" tile pulled from `now`. |
| `/work` list | Medium | `WorkCard`/`WorkFilter` restyled to bento tile language; grid stays uniform single-column (not asymmetric) — see Risk 4. |
| `/work/[slug]` | Low | Keep 12-col split; consolidate the metadata rail into one `.bento-tile` info panel; chips move to `.chip`; `ArchitectureDiagram.astro` gets a rounded/glass frame; prose body stays flat. |
| `/now` | Low | Keep chronological log structure; rows become soft rounded cards, not tiles. |
| `/playground` list | Medium | `PlaygroundCard` → `.bento-tile`; grid stays uniform. Only 1 entry exists today — design a graceful few-item state rather than letting one card stretch oddly (see Risk 5). |
| `/playground/[slug]` | Low | Same treatment as work detail, minus the metadata rail. |
| `/about` | Medium | `AboutStack` tiled (after confirming its content shape); `AboutTimeline` unchanged; `AboutStory`/`AboutOutside` get a light surface touch-up only, stay prose. |
| `/resume` | Minimal, by design | Mostly opt out — a formal, scannable, print-adjacent document; over-decorating undercuts its credibility register. At most soften the download button and PDF-frame corners to `--radius-sm`. |
| Nav / Footer | Site-wide | Nav's blur moves onto shared tokens; Footer optionally gains a CTA tile. |

## 4. Animation / interaction

- **Base hover (everywhere, CSS-only):** `scale(1.02)` + shadow deepen, ~250–300ms,
  `cubic-bezier(0.16, 1, 0.3, 1)` — reuses DESIGN.md's existing "motion as confirmation"
  easing curve, just on a new property. Implemented as `.bento-tile:hover` — works on every
  Astro page with zero JS.
- **Cursor tilt:** `BentoTile.tsx`, **homepage flagship tile only** (confirmed). Not retrofitted
  onto `/work`, `/playground`, `/about`, `/resume` — those stay CSS-only scale/shadow.
- **Scroll-reveal:** keep `src/scripts/reveal.ts` verbatim; apply `data-reveal` to new
  Astro-rendered tiles; leave `WorkCard.tsx` on its own `motion` enter/exit props.
- **Reduced motion:** both existing mechanisms already gate correctly
  (`reveal.ts` checks `matchMedia`, CSS keyframes wrap in `@media (prefers-reduced-motion:
  no-preference)`). New tilt code must call `useReducedMotion()` and skip the rotate
  transform specifically (scale/shadow can still apply — those are discrete state changes,
  not continuous motion).

## 5. Risks / things to watch during implementation

1. **Glass needs something to blur.** Flat `#fafafa`-on-`#fafafa` gives backdrop-blur nothing
   to distort — `--color-canvas` is a minimal fix; a fuller Apple/Framer look may want a
   subtle background gradient/texture behind bento sections. Judge this visually once built,
   iterate on the token value rather than guessing it up front.
2. **WCAG AA contrast on glass.** Translucent white tiles over near-white risk pushing the
   thinnest existing text tier (`gray-400`) below 4.5:1 (or 3:1 for large text) once opacity
   layers in. Old contrast values were tuned for opaque surfaces and don't carry over
   automatically — run an explicit contrast audit (axe/Lighthouse) on final glass opacity
   before shipping (Phase 7 below).
3. **Only 6 work items, 1 playground item.** Not enough volume for a true variable-span grid
   anywhere except the homepage's hand-curated 3-tile section — `/work` and `/playground` list
   grids stay uniform-tile by design, not a stretch goal to revisit later.
4. **Zero project images today.** User has confirmed real screenshots will be sourced — until
   then, build with a clean, honest interim state (not fabricated/stock imagery) so the
   flagship tile and `/work` cards don't ship looking unfinished or dishonest.
5. **`featured` field requires a manual content step.** Wiring it up is code; actually setting
   `featured: true` on the 2–3 entries to surface is a content edit only the user can make with
   intent (which projects to lead with).
6. **Latent 404 bug** in the current featured-work grid (every card links to a work detail page
   even when most don't have one) — fix incidentally while this section is rebuilt, don't
   widen it.

## 6. Phased execution order (for the future implementation pass)

1. **Foundations:** token additions to `global.css`; DESIGN.md + PRODUCT.md rewrites. No
   component changes yet — independently reviewable.
2. **Primitives:** `BentoGrid.astro`, `BentoTile.astro`, `BentoTile.tsx`. Verify in isolation
   before any real page depends on them.
3. **Homepage:** wire `featured`, replace the inline grid, fix the link-bug, resolve imagery
   per the confirmed plan, restyle Hero CTAs. Screenshot-able flagship checkpoint.
4. **`/work` list + detail:** restyle `WorkCard`/`WorkFilter`; verify `motion` layout
   animations still behave correctly with the new styling (the one place existing animation
   code could regress); consolidate the detail-page metadata rail.
5. **`/playground` + `/now`:** convert `PlaygroundCard`; restyle `NowEntry`/`NowGroup` rows.
6. **`/about`, `/resume`, Nav/Footer:** tile `AboutStack` (after confirming its content shape);
   light touch-ups elsewhere; align Nav/Footer glass tokens; optional Footer CTA tile.
7. **Cross-cutting audit:** WCAG AA contrast pass on every glass surface; reduced-motion audit
   on every new hover/tilt path; responsive check at `md`/`lg` for every grid, with explicit
   mobile collapse-to-single-column rules; final DESIGN.md/PRODUCT.md vs. shipped-code
   read-through (a natural moment to close pre-existing doc/code drift rather than widen it).

## Open items owned by Vinayak (not blocking plan approval)

- Source real project screenshots for the homepage flagship tile and `/work` cards.
- Decide which 2–3 `work` entries get `featured: true` once that field is wired up.
- Consider backfilling 1–2 more `playground` entries so that grid doesn't ship with a single
  card (optional — a designed sparse state is an acceptable alternative).
