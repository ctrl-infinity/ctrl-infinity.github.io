---
name: Vinayak Gupta — Portfolio
description: An editorial engineering notebook — monochrome typography with one signal color, flat and sharp by default.
colors:
  base: "#fafafa"
  foreground: "#111111"
  accent: "#2563eb"
  muted: "#4b5563"
  subtle: "#6b7280"
  faint: "#9ca3af"
  surface-muted: "#f3f4f6"
  hairline: "#0000001a"
  hairline-soft: "#0000000d"
  tag-bg: "#0000000d"
  foreground-soft: "#111111cc"
  surface: "#ffffff"
  nav-scrim: "#fafafacc"
typography:
  display:
    fontFamily: "Geist, 'Geist Sans', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, 'Geist Sans', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, 'Geist Sans', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, 'Geist Sans', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
    fontFeature: "uppercase"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
  2xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  tag:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.foreground-soft}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
  filter-tab-active:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  framed-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Vinayak Gupta — Portfolio

## 1. Overview

**Creative North Star: "The Engineering Notebook"**

This site reads like annotations in a lab notebook, not a marketing brochure: monochrome type carrying nearly all the weight, a single utilitarian accent reserved for signal (links, primary actions, hover states), and structure built from whitespace and hairline rules rather than cards or shadows. Nothing is decorated to look impressive — it's arranged to be read quickly and trusted immediately, the same way a well-kept notebook earns trust through legibility, not polish.

The system explicitly rejects the consultant sales-deck register it's evolving away from (stats-grid "proof" sections, "Book a call" CTAs, service-tier offerings), the generic SaaS/AI aesthetic (purple gradients, glassmorphism, hero-metric templates), and the stiff formality of a corporate resume PDF. It is warm through voice and content, not through visual softness — the palette and shapes stay plain so the writing can carry the personality.

**Key Characteristics:**
- Monochrome base (off-white / near-black) with one electric-blue signal color used sparingly
- Zero border-radius anywhere, with one narrow accepted exception for circular wayfinding dots (see Named Rules)
- Flat by default — no shadows at rest; separation comes from whitespace and 1px hairline dividers
- Generous vertical rhythm (96–128px between sections) against tight, editorial line lengths
- Motion is a confirmation, not a performance: fades and small upward translations, nothing bouncy
- A persistent, translucent-blur navigation header sits above every page — the one place the "flat, opaque surface" default is deliberately broken, because it must stay legible over scrolling content

Now implemented across six pages (`/`, `/work`, `/now`, `/playground` + detail routes, `/about`, `/resume`), all sharing this system through the persistent `Nav` and `Footer`.

## 2. Colors

A near-monochrome palette — off-white and near-black doing almost all the work — with one saturated accent held in reserve for moments that matter.

### Primary
- **Signal Blue** (`#2563eb`): The only saturated color in the system. Used exclusively for hover states on interactive text/buttons and for text selection highlight. Never used decoratively or on more than one element at a time.

### Neutral
- **Notebook Paper** (`#fafafa`) — page background (`--color-base`).
- **Ink** (`#111111`) — primary text and button fills (`--color-foreground`).
- **Ink Soft** (`#111111cc`, 80% ink) — text on tag chips, slightly recessed from full ink.
- **Graphite** (`#4b5563`, Tailwind gray-600) — body copy secondary to headings.
- **Pencil** (`#6b7280`, Tailwind gray-500) — labels, eyebrows, metadata, view-all links.
- **Faint Pencil** (`#9ca3af`, Tailwind gray-400) — the least important text on a page (durations, timestamps).
- **Placeholder Gray** (`#f3f4f6`, Tailwind gray-100) — background fill behind not-yet-loaded images.
- **Hairline** (`#0000001a`, black at 10% opacity) — major section dividers and borders (page sections, resume PDF frame, timeline rail, `NowGroup` header rule).
- **Hairline Soft** (`#0000000d`, black at 5% opacity) — lighter-weight borders for denser UI: the nav's bottom border, list-item dividers inside a `NowGroup`, the rest state of a `PlaygroundCard` border.
- **Tag Wash** (`#0000000d`, black at 5% opacity) — the only "filled" surface reserved for tag/chip backgrounds and the active-filter pill; shares its value with Hairline Soft but a distinct role (fill vs. border).
- **Surface** (`#ffffff`, pure white) — the fill for framed/bordered containers that need to read as a distinct layer from the page: the Playground card, the résumé PDF viewer frame. Not used for plain list-style cards (Work, Selected Work), which stay transparent against the page.
- **Nav Scrim** (`#fafafacc`, base at 80% opacity) — the translucent fill behind the sticky nav header, paired with a backdrop blur so page content stays legible as it scrolls underneath.

### Named Rules
**The One Signal Rule.** Signal Blue appears in exactly one state at a time — a hover, a focus ring, a selection highlight. It never sits on the page at rest, with one narrow, deliberate exception: the small dot markers on the `/about` timeline, which use Signal Blue as a permanent wayfinding mark, not decoration. That exception doesn't generalize — it justifies itself only where blue is doing the job of a location pin, not a hover state.

## 3. Typography

**Display/Body Font:** Geist Sans (with Inter, ui-sans-serif, system-ui fallback)
**Label Font:** System monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

**Character:** A single geometric-humanist sans carries every reading size from hero to caption — restrained and technical, never decorative. Monospace is reserved for a small, deliberate set of label-style elements (eyebrows, client/date metadata), giving the page a builder's-notebook accent without introducing a second display voice.

### Hierarchy
- **Display** (bold 700, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.1, tracking −0.02em): Hero headline only. One per page.
- **Headline** (bold 700, `1.875–2.25rem`, line-height 1.2, tracking −0.02em): Section titles ("Selected Work", "Recent Rescues").
- **Title** (medium 500, `1.5rem`–`2.25rem` depending on context, line-height 1.3, tracking −0.01em): Card and case-study titles; brightens to Signal Blue on hover.
- **Body** (regular 400, `1.125rem`, line-height 1.6): Supporting copy, capped between 25ch and 60ch depending on column width — never the full measure of its container.
- **Label** (regular 400, `0.75rem`, mono, tracking 0.2em, uppercase): Eyebrows, client names, category tags. The only uppercase-tracked text on the site.

Tag/chip text sits between 70–80% ink opacity depending on density — 80% (`#111111cc`) where a tag stands alone against more whitespace (Work cards), 70% (`#111111b3`) inside denser lists (Now entries, Playground cards). Both read as the same "quiet metadata" register; treat the range as intentional flexibility, not drift to correct.

### Named Rules
**The One Eyebrow Rule.** Uppercase-tracked mono labels are reserved for genuine metadata (a client name, a status, a content type), never used as decorative section kickers. Shipped examples: `NowGroup` status headers ("CURRENTLY ACTIVE"), `PlaygroundCard` type badges ("◆ INTERACTIVE"), timeline years. If a section doesn't have real label-shaped data, it gets a plain Headline with no eyebrow above it. A status can also carry a single leading emoji as its icon (⚡ active, 🔭 exploring, 💤 paused) in place of an SVG glyph — treat this as the system's one icon language for status, not a general invitation to decorate headings with emoji.

## 4. Elevation

Flat by default, with room to break the rule sparingly for genuinely elevated surfaces. At rest, nothing in normal page flow casts a shadow or sits above another layer — depth is implied entirely by whitespace and the Hairline divider between sections. That default holds for every list-style component (buttons, tags, Work/Selected Work cards).

The one shipped exception is the persistent `Nav` header: `position: fixed` + `backdrop-blur-md` + Nav Scrim (`#fafafacc`) so it stays legible over scrolling content. This is functional elevation (it must read as above the page because it literally is), not decorative glass — it's the overlay case the rule already carved out, applied to a header instead of a modal.

### Named Rules
**The Flat-at-Rest Rule.** If it's part of the page's normal layout, it has no shadow and no radius, and no blur. Blur and shadow are earned only by content that overlays the page in a real stacking sense — a fixed nav, a modal, a menu, a tooltip — never by a card, button, or section sitting in normal flow.

## 5. Components

Every component is quiet and confident: understated at rest, decisive on interaction. Nothing is rounded; color appears only in response to hover or focus.

### Buttons
- **Shape:** Sharp rectangle, zero radius (`0px`) — no exceptions anywhere on the site.
- **Primary:** Ink fill (`#111111`) with white text, `16px 32px` padding, medium/lg weight label.
- **Hover / Focus:** Fill transitions to Signal Blue (`#2563eb`) over 300ms — the button is the accent's primary stage.
- **Secondary / Ghost:** Not yet in use; if introduced, follow the same zero-radius rule and reserve Signal Blue for the same hover-only role, expressed as a text or border treatment rather than a fill.

### Tags / Chips
- **Style:** Tag Wash background (`#0000000d`), Ink Soft text (`#111111cc`), `4px 12px` padding, `0.75rem` size, zero radius. No border.
- **State:** Static — tags are metadata, not controls. No hover treatment.

### Cards: two patterns, chosen by context

**List Cards** (Work, Selected Work) — long-form entries read top-to-bottom in a single flow:
- **Corner Style:** Zero radius.
- **Background:** Transparent; image tiles use Placeholder Gray (`#f3f4f6`) until an image loads (Work images are optional — a card with no image just shows text, never a broken frame).
- **Shadow Strategy:** None at rest. Separation between items comes from flex gap alone (`64px` between Work entries).
- **Border:** None. Cards are not boxed — text and image sit directly on the page background.
- **Hover:** Image scales to `105%` over 1000ms; title text transitions to Signal Blue over 300–500ms.

**Framed Cards** (Playground grid, résumé PDF viewer) — heterogeneous items in a grid, or content that needs a literal frame:
- **Corner Style:** Zero radius, same as everywhere else.
- **Background:** Surface (`#ffffff`), distinct from the `#fafafa` page background — the only place the system uses two different "whites."
- **Border:** Hairline Soft (`#0000000d`) at rest, darkening to `#00000026` (black/15) on hover for Playground cards; plain Hairline (`#0000001a`) for the static résumé frame, which has no hover state.
- **Internal Padding:** `24px`.
- **When to use which:** reach for List Cards when items are read in sequence (a feed); reach for Framed Cards when items sit in a multi-column grid and need a visible boundary to parse as separate objects, or when framing genuinely external content (an embedded PDF).

### Section Structure
- **Divider:** Every section opens with a `1px` Hairline top border (`#0000001a`) — the sole structural device separating sections, used in place of cards or background-color blocks.
- **Rhythm:** Vertical padding of `96px` (standard sections) to `128px` (major sections like the footer CTA), always paired with tight, editorial-width content columns.
- **Split Layout:** Editorial content (case studies) uses a 12-column grid with metadata in a narrow left rail (4 columns) and content in a wide right column (8 columns) — a signature pattern worth carrying into future list-style pages.

### Navigation
- **Structure:** Fixed header, full-width, `64px` tall, wordmark (name) left, flat link row right on desktop, hamburger toggle on mobile (Phosphor `List`/`X` icons — the project's one icon library).
- **Surface:** The system's one deliberately non-flat surface — Nav Scrim (`#fafafacc`) with `backdrop-blur-md` and a Hairline Soft (`#0000000d`) bottom border, justified under the Elevation exception above.
- **Link Style:** Muted (`text-gray-600`) at rest, shifts to full Ink on hover — deliberately not Signal Blue, so the nav doesn't compete with the one CTA-carrying use of blue elsewhere on the page. The wordmark is the exception: it does go to Signal Blue on hover, since it's the site's identity mark rather than a navigation link.
- **Mobile Menu:** Slides open as a translucent panel matching the header surface, `200ms` ease-out; links stack vertically, same muted-to-ink hover treatment.

### Filter Tabs (Work page category filter)
- **Structure:** A flat row of text buttons, no visible track or pill container.
- **Active State:** A shared-element background in Tag Wash (`#0000000d`) animates (`layoutId`, 300ms ease-out-expo) to sit behind whichever tab is active — the only place in the system a background "slides."
- **Text:** Active tab is full Ink; inactive tabs are Faint Pencil (`#9ca3af`), brightening to Pencil (`#6b7280`) on hover.
- **Shape:** Zero radius, matching the site-wide rule — the active pill is a sharp rectangle, not a rounded tab.

## 6. Do's and Don'ts

### Do:
- **Do** keep every corner sharp — zero `border-radius` anywhere. The only shipped exception is the small circular dot markers on the `/about` timeline; it does not extend to cards, buttons, tags, or images.
- **Do** hold Signal Blue (`#2563eb`) in reserve for exactly one active state at a time — hover, focus, or selection — never at rest. The only shipped exception is the timeline's wayfinding dots, which use blue as a permanent location mark, not decoration; don't use that precedent to justify blue anywhere else at rest.
- **Do** use the `1px` Hairline (`#0000001a`) or its lighter sibling Hairline Soft (`#0000000d`) as the section- and list-separation device; prefer whitespace over any new visual boundary.
- **Do** cap body text between 25ch and 65ch depending on column width, and keep the mono Label style exclusive to genuine metadata (client, status, content type, date).
- **Do** let motion read as confirmation (fade + small upward translation, `ease [0.16, 1, 0.3, 1]`) — never bounce, elastic, or overshoot.
- **Do** reserve `backdrop-blur` for the fixed nav specifically — it's functional (legibility over scrolling content), not a decorative material to reach for elsewhere.

### Don't:
- **Don't** reintroduce the consultant sales-deck register — no stats-grid "proof" sections, no "Book a call" CTA, no service-tier offering lists.
- **Don't** use purple/multi-color gradients, glassmorphism as decoration, or a hero-metric template (big number + small label + gradient accent) — the generic SaaS/AI look this system explicitly rejects.
- **Don't** let the site read like a stiff, formal resume PDF — copy stays first-person and conversational even where structure is dense.
- **Don't** add a drop shadow or colored border-stripe to any card, button, or list item sitting in normal page flow — reserve shadow/blur for genuinely overlaid surfaces only (the fixed nav, modals, dropdowns, tooltips).
- **Don't** apply an uppercase mono eyebrow to every section head as decoration — it's reserved for sections with real label-shaped metadata (client, status, date, content type).
- **Don't** use the Framed Card's white Surface fill and Hairline Soft border as a substitute for the plain List Card pattern — it's for grids of heterogeneous items and framed external content (Playground, résumé viewer), not a general card upgrade.
