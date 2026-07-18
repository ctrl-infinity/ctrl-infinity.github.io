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
  tag-bg: "#0000000d"
  foreground-soft: "#111111cc"
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
---

# Design System: Vinayak Gupta — Portfolio

## 1. Overview

**Creative North Star: "The Engineering Notebook"**

This site reads like annotations in a lab notebook, not a marketing brochure: monochrome type carrying nearly all the weight, a single utilitarian accent reserved for signal (links, primary actions, hover states), and structure built from whitespace and hairline rules rather than cards or shadows. Nothing is decorated to look impressive — it's arranged to be read quickly and trusted immediately, the same way a well-kept notebook earns trust through legibility, not polish.

The system explicitly rejects the consultant sales-deck register it's evolving away from (stats-grid "proof" sections, "Book a call" CTAs, service-tier offerings), the generic SaaS/AI aesthetic (purple gradients, glassmorphism, hero-metric templates), and the stiff formality of a corporate resume PDF. It is warm through voice and content, not through visual softness — the palette and shapes stay plain so the writing can carry the personality.

**Key Characteristics:**
- Monochrome base (off-white / near-black) with one electric-blue signal color used sparingly
- Zero border-radius anywhere — every shape is a sharp rectangle
- Flat by default — no shadows at rest; separation comes from whitespace and 1px hairline dividers
- Generous vertical rhythm (96–128px between sections) against tight, editorial line lengths
- Motion is a confirmation, not a performance: fades and small upward translations, nothing bouncy

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
- **Hairline** (`#0000001a`, black at 10% opacity) — every section divider and border on the site.
- **Tag Wash** (`#0000000d`, black at 5% opacity) — the only "filled" surface in the system, reserved for tag/chip backgrounds.

### Named Rules
**The One Signal Rule.** Signal Blue appears in exactly one state at a time — a hover, a focus ring, a selection highlight. It never sits on the page at rest. If two elements are blue simultaneously, something is wrong.

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

### Named Rules
**The One Eyebrow Rule.** Uppercase-tracked mono labels are reserved for genuine metadata (a client name, a status), never used as decorative section kickers. If a section doesn't have real label-shaped data, it gets a plain Headline with no eyebrow above it.

## 4. Elevation

Flat by default, with room to break the rule sparingly for genuinely elevated surfaces. At rest, nothing on the page casts a shadow or sits above another layer — depth is implied entirely by whitespace and the Hairline divider between sections. That default holds for every current component (buttons, tags, cards). It's acceptable to introduce a soft shadow specifically for content that's truly floating above the page — a modal, a dropdown, a popover — where flatness would be illegible, not for cards, buttons, or anything resting in the normal document flow.

### Named Rules
**The Flat-at-Rest Rule.** If it's part of the page's normal layout, it has no shadow and no radius. Shadows are earned only by content that overlays the page (modals, menus, tooltips) — never by a card, button, or section sitting in normal flow.

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

### Cards / Work Items
- **Corner Style:** Zero radius, matching the site-wide rule.
- **Background:** Transparent; image tiles use Placeholder Gray (`#f3f4f6`) until an image loads.
- **Shadow Strategy:** None at rest (see Elevation). Separation between items comes from grid gap alone.
- **Border:** None. Cards are not boxed — text and image sit directly on the page background.
- **Internal Padding:** No card padding; content spacing is handled by flex/grid gap (`24–64px` depending on density).
- **Hover:** Image scales to `105%` over 1000ms; title text transitions to Signal Blue over 300–500ms. The two are the only interactive cues.

### Section Structure
- **Divider:** Every section opens with a `1px` Hairline top border (`#0000001a`) — the sole structural device separating sections, used in place of cards or background-color blocks.
- **Rhythm:** Vertical padding of `96px` (standard sections) to `128px` (major sections like the footer CTA), always paired with tight, editorial-width content columns.
- **Split Layout:** Editorial content (case studies) uses a 12-column grid with metadata in a narrow left rail (4 columns) and content in a wide right column (8 columns) — a signature pattern worth carrying into future list-style pages.

### Navigation
Not yet implemented in code. When built (per the planned persistent header), it should inherit the same rules already governing the rest of the system: flat, zero-radius, Signal Blue reserved for the active/hover state only, label text in the mono Label style if status or metadata is shown inline.

## 6. Do's and Don'ts

### Do:
- **Do** keep every corner sharp — zero `border-radius` anywhere, no exceptions for cards, buttons, tags, or images.
- **Do** hold Signal Blue (`#2563eb`) in reserve for exactly one active state at a time — hover, focus, or selection — never at rest.
- **Do** use the `1px` Hairline (`#0000001a`) as the only section-separation device; prefer whitespace over any new visual boundary.
- **Do** cap body text between 25ch and 65ch depending on column width, and keep the mono Label style exclusive to genuine metadata.
- **Do** let motion read as confirmation (fade + small upward translation, `ease [0.16, 1, 0.3, 1]`) — never bounce, elastic, or overshoot.

### Don't:
- **Don't** reintroduce the consultant sales-deck register — no stats-grid "proof" sections, no "Book a call" CTA, no service-tier offering lists.
- **Don't** use purple/multi-color gradients, glassmorphism, or a hero-metric template (big number + small label + gradient accent) — the generic SaaS/AI look this system explicitly rejects.
- **Don't** let the site read like a stiff, formal resume PDF — copy stays first-person and conversational even where structure is dense.
- **Don't** add a drop shadow or colored border-stripe to any card, button, or list item sitting in normal page flow — reserve shadow for genuinely overlaid surfaces only (modals, dropdowns, tooltips).
- **Don't** apply an uppercase mono eyebrow to every section head as decoration — it's reserved for sections with real label-shaped metadata (client, status, date).
