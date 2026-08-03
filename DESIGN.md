---
name: Vinayak Gupta — Portfolio
description: Bento Grid / Modular Canvas design system — translucent glass surfaces, rounded radii, modular tiles, and signal blue accents.
colors:
  base: "#fafafa"
  canvas: "#f4f4f6"
  foreground: "#111111"
  accent: "#2563eb"
  accent-glow: "rgba(37, 99, 235, 0.15)"
  glass: "rgba(255, 255, 255, 0.75)"
  glass-border: "rgba(0, 0, 0, 0.08)"
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
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  full: "9999px"
blur:
  sm: "8px"
  md: "16px"
  lg: "24px"
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
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  bento-tile:
    backgroundColor: "{colors.glass}"
    borderColor: "{colors.glass-border}"
    backdropBlur: "{blur.md}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.foreground-soft}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
---

# Design System: Vinayak Gupta — Portfolio

## 1. Overview

**Creative North Star: "Bento Grid / Modular Canvas"**

This site presents work and logs through asymmetric, variable-sized modular bento tiles — anchored visually by Apple product landing pages and Framer portfolio showcases. It combines translucent glassmorphic surfaces, rounded corner radii (16–24px scale), and rich elevation states while preserving product truth: first-person voice, real project writing, and active `/now` and `/playground` build logs.

The system explicitly rejects consultant sales-deck register (stats-grid proof sections, "Book a call" CTAs, service tiers), purple/multi-color gradients, and stiff formal resume PDF energy.

**Key Characteristics:**
- Near-monochrome base with subtle off-canvas ground (`#f4f4f6`) that lets backdrop-blur glass surfaces refract naturally.
- 16–24px rounded corner radius scale across tiles, controls, and chips.
- Translucent glass surfaces (`backdrop-blur-md`, 75% white fill, hairline glass borders).
- Interactive elevation: CSS scale (~1.02) and shadow deepening on hover; flagship homepage tile features optional cursor-tracking 3D tilt.
- Signal Blue (`#2563eb`) accent used for hover focus, active pills, and glows.
- Persistent translucent nav header with `backdrop-blur-lg`.

## 2. Colors

### Primary
- **Signal Blue** (`#2563eb`): Accent color used for hover highlights, active tab pills, focus rings, and soft ambient glows on flagship elements.

### Canvas & Surfaces
- **Canvas Ground** (`#f4f4f6`): Page background behind bento sections.
- **Glass Fill** (`rgba(255, 255, 255, 0.75)`): Translucent tile background.
- **Glass Border** (`rgba(0, 0, 0, 0.08)`): Hairline glass boundary rule.
- **Accent Glow** (`rgba(37, 99, 235, 0.15)`): Soft blue glow for flagship tile interaction.

### Neutral Typography & Details
- **Ink** (`#111111`) — primary text and button fills (`--color-foreground`).
- **Ink Soft** (`#111111cc`) — secondary text on chips and card subtitles.
- **Graphite** (`#4b5563`) — body copy.
- **Pencil** (`#6b7280`) — metadata and labels.
- **Faint Pencil** (`#9ca3af`) — timestamps and minor dates.

## 3. Typography

**Display/Body Font:** Geist Sans (with Inter, ui-sans-serif, system-ui fallback)
**Label Font:** System monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)

## 4. Elevation

Bento tiles are elevated glass surfaces sitting above the canvas ground with soft resting shadows (`0 4px 20px -2px rgba(0,0,0,0.05)`). On hover, tiles scale slightly and deepen their shadow (`0 12px 32px -4px rgba(0,0,0,0.10)`).

Prose bodies (case study detail text, resume document) remain flat on the page.

## 5. Components

### Bento Grid & Tiles
- **BentoGrid:** Responsive grid container supporting asymmetric 2x2 flagship and 1x1 tile layouts.
- **BentoTile:** Glassmorphic card surface (`rgba(255,255,255,0.75)` fill, `backdrop-blur-md`, `border: 1px solid rgba(0,0,0,0.08)`). Corner radius scales from 16px (`--radius-md`) for standard tiles to 24px (`--radius-xl`) for flagship tiles.

### Buttons & Chips
- **Primary Buttons:** Ink fill, rounded `--radius-md` (16px), blue on hover.
- **Chips / Tags:** Translucent wash background, `--radius-sm` (12px), `4px 12px` padding.

## 6. Do's and Don'ts

### Do:
- **Do** use rounded corners across tiles, buttons, and chips matching the radius scale (12px–24px).
- **Do** use glass surfaces (`backdrop-blur`) over the off-canvas ground (`#f4f4f6`).
- **Do** use smooth CSS scale and shadow deepening for tile hovers.
- **Do** keep text legible with sufficient contrast against glass backgrounds.

### Don't:
- **Don't** reintroduce consultant sales-deck register ("Book a call", stats grids).
- **Don't** use multi-colored rainbow/purple gradients.
- **Don't** apply heavy 3D tilt outside the homepage flagship tile.

