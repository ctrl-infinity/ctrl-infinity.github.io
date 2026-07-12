# Design Spec: Portfolio Variant (The Exhibition)

## 0. Design Read
**"Reading this as: software engineer portfolio for potential clients and collaborators, with an ultra-minimalist editorial language, leaning toward Tailwind v4 + Motion with subtle scroll-driven reveals."**

## 1. The Three Dials
- **`DESIGN_VARIANCE: 7`**: Moving away from standard centered layouts and basic bento boxes. We will use asymmetrical splits and staggered grids.
- **`MOTION_INTENSITY: 6`**: The site will feel alive but not chaotic. We will use Motion (`motion/react`) for elegant scroll-reveals (e.g., images gently scaling up and fading in as they enter the viewport).
- **`VISUAL_DENSITY: 3`**: Very airy. We rely on typography and generous whitespace (`gap-16`, `py-24`) rather than visible card borders or drop shadows.

## 2. Aesthetic & Foundation
- **Typography**: A modern geometric or neo-grotesque sans-serif (e.g., `Geist` or `Satoshi`). Headlines are large (`text-5xl` to `text-7xl`) with tight tracking (`tracking-tighter`). Body text is highly readable and restrained (`max-w-[65ch]`, `text-gray-600` or equivalent).
- **Color Palette**: 
  - **Base**: Pure monochrome. An off-white background (e.g., `#fafafa`) with deep off-black text (`#111111`).
  - **Accent**: A single, highly saturated accent color (e.g., an Electric Blue or Deep Terracotta) used strictly for primary CTAs and hover interactions. 
- **Shapes & Materiality**: No generic drop shadows. No standard rounded cards. If elements need separation, we use negative space or a single delicate 1px hairline divider (`divide-y divide-black/10`).

## 3. Content Architecture (Mapped from karolbinkow.ski)

### A. Hero Section
- **Layout**: Left-aligned, un-centered. Max 4 elements.
- **Content**: 
  - Small uppercase eyebrow (e.g., `SOFTWARE ENGINEER · BUILDER`).
  - Large 2-line headline.
  - Subtext (max 20 words) explaining the specific value prop.
  - Primary CTA ("Book a call").
- **Motion**: Initial load stagger (opacity 0 to 1, slight Y translation).

### B. "Engineer Spec" (Fast Facts)
- **Layout**: A sparse 4-column typographic grid (`lg:grid-cols-4`). No borders.
- **Content**: Key achievements (e.g., "Zero to production", "Test suite 10m -> 30s"). 

### C. Case Studies
- **Layout**: Purely typographic. A 12-column split where metadata (client/duration) sits on the left (4 columns) and the main content (title/description/tags) sits on the right (8 columns). No images.
- **Motion**: Staggered fade and translate up as elements enter the viewport.

### D. "What I Actually Do" (Services)
- **Layout**: Clean typographic list or horizontal scroll-snap pills. Avoiding the "3 equal columns of cards" cliché.

### E. Selected Work & Side Projects
- **Layout**: A responsive 2-column grid (`md:grid-cols-2`) with 4/3 aspect ratio images.
- **Motion**: Images scale up slightly (`scale-105`) with a smooth transition on hover.

### F. How I Work
- **Layout**: Numbered editorial list (e.g., `01`, `02`) with strong typographic hierarchy.

### G. Footer / Contact
- **Layout**: Massive display text for the final CTA.

### H. Data Architecture (Content Collections)
- **Implementation**: Case studies and projects are dynamically driven by Astro Content Collections using Astro v7's `glob` loader. Content is authored in Markdown files in `src/content/` and passed as props to the React islands.

## 4. Anti-Slop Guardrails
- **No Purple AI Gradients**: Stick to the stark monochrome + single accent.
- **No Split-Headers**: Section titles are standalone.
- **Eyebrow Restraint**: Maximum 1 eyebrow label per 3 sections.
- **CTA Rule**: Only one primary CTA intent across the entire page (e.g., "Book a call").
