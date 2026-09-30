---
name: Vinayak Gupta — Portfolio
description: An engineering notebook where useful systems, decisions, and working artifacts carry the story.
colors:
  base: "#fafafa"
  foreground: "#111111"
  accent: "#2563eb"
  muted: "#4b5563"
  subtle: "#6b7280"
  rule: "#d9d9d9"
  surface: "#ffffff"
  workflow: "#f0f0ee"
  inverse-muted: "#d1d5db"
  inverse-rule: "#777777"
  hairline-soft: "#0000000d"
  tag-bg: "#0000000d"
  nav-scrim: "#fafafacc"
  paper: "#fffefb"
  paper-edge: "#e8e6df"
  paper-border: "#c9c7c1"
typography:
  display:
    fontFamily: "'Geist Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.8vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  case-display:
    fontFamily: "'Geist Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "'Geist Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 2.7vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  section: { fontSize: "1.625rem", fontWeight: 600, lineHeight: 1.3 }
  section-mobile: { fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.3 }
  card-title: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.2 }
  title: { fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.3 }
  experiment-title: { fontSize: "2rem", fontWeight: 500, lineHeight: 1.2 }
  subheading: { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.5 }
  intro: { fontSize: "1.125rem", fontWeight: 400, lineHeight: 1.65 }
  feature-copy: { fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.65 }
  body: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.7 }
  compact-body: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.7 }
  metadata: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6 }
  technical-note: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.6 }
  caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.5 }
  inline-code: { fontSize: "0.9em", fontWeight: 400, lineHeight: 1.8 }
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  panel: "28px"
  lg: "32px"
  section: "48px"
  split: "64px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  filter-active:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  artifact-review:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    padding: "28px"
  experiment:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: Vinayak Gupta — Portfolio

## 1. Overview

**Creative North Star: "The Engineering Notebook"**

Keep the established monochrome notebook, but let artifacts share the work with
words. A developer exchange, a system map, and a changing decision trace make
the engineering tangible. The impression is a resourceful teammate who takes
useful ideas through to delivery, not a wall of technologies or aspirational titles.

This is an extension of the existing identity, not a new brand. It keeps Geist
Sans, off-white paper, ink, sharp geometry, first-person voice, and restrained
interaction color. It replaces text-only project lists, oversized section gaps,
and empty experiments with meaningful visual evidence. The full narrative and
truth boundaries are in [the portfolio brief](docs/portfolio-design.md).

**Key Characteristics:**
- Monochrome paper and ink; blue identifies interaction.
- Identity and approach first on Home; artifacts before technical depth in Work.
- Sharp corners, thin rules, and subtly layered editorial cards.
- Compact editorial rhythm and generous reading measures.
- Actual project decisions, not adjective badges or invented metrics.

## 2. Color and material

Notebook Paper `#fafafa` is the page, Ink `#111111` carries headings and primary
actions, and Graphite `#4b5563` carries secondary copy. Rules use `#d9d9d9`;
the retained navigation uses its softer black/5 border.

Dark artifacts use white text with `#d1d5db` metadata. Workflow diagrams use
`#f0f0ee`, not a simulated screenshot or code-editor skin. White experiment
panels and the existing resume frame have a functional boundary.

**The One Signal Rule.** Signal Blue `#2563eb` is reserved for hover, focus, and
selection, not decoration. Simultaneous keyboard focus and hover may both be
visible; accessibility is more important than an artificial one-element limit.
Opened disclosures use an ink underline, not persistent blue.

**The Paper Depth Rule.** Pages and article content remain flat. Project and
related editorial cards are the user-approved exception: warm paper `#fffefb`,
a 1px `#c9c7c1` boundary, two thin offset sheet edges, and a restrained downward
shadow. No rounding, glass, colored glow, or decorative gradients. The existing
translucent navigation remains a functional overlay.

## 3. Typography

Locally hosted Geist Sans supplies weights 400, 500, 600, and 700. System monospace
is used for short technical traces, code, and tools, not for every heading.
The YAML ramp records actual shared component sizes; its compact sizes distinguish
captions, metadata, controls, body copy, and artifact text rather than establishing
new display voices.

- Page display: 40–72px, weight 600, 1.05 line-height, tight tracking.
- Mobile home display: `clamp(2.25rem, 9.5vw, 3.5rem)`.
- Case display: 36–60px; feature title: 30–40px; gallery title: 28px.
- Section titles: 26px desktop, 22px mobile; system stages: 20px.
- Main copy: 16–18px; dense disclosure/control text: 15px.
- Metadata: 14px; technical notes: 13px; artifact captions: 12px.
- Body line-height: 1.65–1.8, with prose generally limited to 65–76ch.

**The Metadata Rule.** Small uppercase labels identify an actual speaker or
content type. They are not decorative kickers above every section. Status is
plain text, not an emoji or proficiency badge.

## 4. Layout and rhythm

The shared shell is at most 1280px wide. Side gutters are 48px from 768px up and
24px below it. Main navigation is 64px tall. Hero spacing is 72px/56px desktop,
32px/32px mobile; most sections use 48px desktop and 32px mobile padding.

Home uses asymmetric personal-introduction and working-principle splits. Work is a two-column gallery; at
767px and below, layouts become single-column reading sequences. At 1000px,
agent maps wrap their domain agents onto a second row. Below 400px, workflow
steps stack rather than shrink. Case-study reading navigation becomes a wrapping
link list on mobile instead of a sticky side rail.

The homepage introduces Vinayak and his approach before two compact project
previews. Dialogues and system diagrams live in Work, not on Home. Currently
and Beyond code finish the personal narrative. Work's four visual projects
lead the gallery, then text-led projects follow.

**The Artifact Rule.** A visual must explain the mechanism or interaction. Never
invent a screenshot just to fill a rectangle. Projects without a suitable visual
remain fully discoverable as concise text entries.

## 5. Components

### Actions, navigation, and filters

Primary actions are sharp ink rectangles, at least 52px high. Text links carry
direction through language and arrows. Keyboard focus uses a 2px blue outline
with 5px offset; a skip link moves directly to main content.

Navigation order: Home, Work, Playground, Resume. Home also contains the former
About and Now content at `/#about` and `/#currently`. Old URLs forward to those
anchors, with static-build fallback links. Current routes receive
`aria-current` and an underline. Mobile navigation is a disclosure with expanded
state; Escape closes it and returns focus to the toggle.

Work filters are native buttons with `aria-pressed`, at least 44px high. The
selected filter is ink/white, not a sliding background. A live count announces
results. All project content is server-rendered before React hydration.

### Project artifacts and case studies

Project cards on Home and Work, resume entries, and Playground
cards share `.editorial-card`. Each has its own closed border and 28px inset
(16px on mobile), so text-only projects remain distinct from the page.
Illustrations stay flat inside the paper; do not nest another raised card.

Fine-pointer hover darkens the border, reveals a white top/left edge reflection,
and raises the sheet by 3px with a 0.35-degree perspective tilt over 220ms.
Keyboard focus within a card provides the same border/shadow feedback while
preserving the actual link's blue focus outline. Touch and reduced-motion users
keep the visible paper boundary without movement. The Playground's input panel
uses the paper surface but never moves under the user's controls.

`ProjectVisual` supplies four deliberately different mechanisms: illustrative
review conversation, story-to-PR sequence, agent connectivity, and retrieval
stages. Compact previews keep their truth labels. A preview is not a fake control.

Case studies lead with problem and personal scope. The review pipeline has
Trigger, Context, Review, and Publish stages. Native details expose responsibility,
choice, and boundary without JavaScript. The original technical article remains
below the visual explanation. Reported metrics and categorical system facts
have separate sections; unpublished measurement methodology is acknowledged.

### Personal introduction and working principles

Home is person-first: name, actual role, curiosity, and practical learning lead.
Use ruled editorial rows, not feature tiles, for working principles. Connect
curiosity, ownership, and collaboration to behavior, with the existing AI CoE
advisory example as evidence. Merge overlapping About content rather than
appending the old page or creating a second skills list.

### Notebook and experiment

Currently is a compact homepage section sourced from the Now collection. Native
disclosures show titles, active/exploring/paused status, and explicit editorial
dates, with longer descriptions and links inside. Preserve the anchor and show
an honest empty-state message if there are no entries. Never compute freshness
from the deployment date.

The dispatch experiment uses labeled native checkboxes, a select, a reset button,
and an atomic live result with a text trace. Its initial result is server-rendered;
controls activate only after JavaScript is ready. A no-script explanation identifies
the static example. It never calls an AI model or claims production behavior.

### Resume

Resume shares the main-page shell, heading scale, section rules, contact-link
styling, and primary download button. Experience, projects, and education use
the same editorial paper cards; they remain stationary for sustained reading.
Dates and locations use readable sentence-case metadata, not tiny uppercase
labels. Skills remain a ruled definition list rather than a badge wall.

Desktop experience and education pair a narrow metadata column with a readable
detail column; mobile stacks these in source order. Section links work without
JavaScript. Resume data, all highlights, and the existing downloadable PDF are
preserved. No reveal animation delays access to professional information.

### Motion

No animation is necessary to understand the redesigned pages. Editorial card
movement is limited to fine-pointer hover without a reduced-motion preference.
Retained navigation
uses a 200ms entrance and 300ms link transitions; existing optional reveal effects
use small translations. Reduced motion disables transitions and animations.
Do not hide essential content while waiting for an animation.

## 6. Do's and Don'ts

### Do:
- **Do** preserve sharp geometry and the paper/ink identity, with depth reserved for editorial cards.
- **Do** lead with a useful interaction or mechanism before technical depth.
- **Do** label every invented demonstration as illustrative.
- **Do** connect capabilities to contributions and decisions.
- **Do** keep keyboard access, focus, and small-screen reading intact.

### Don't:
- **Don't** add skill meters, adjective badges, invented savings, or live-looking counters.
- **Don't** turn the portfolio into a services sales deck or claim an aspirational title.
- **Don't** use gradients, stock dashboard decoration, or fake AI interactions.
- **Don't** replace original technical detail with unsupported summaries.
- **Don't** use a build timestamp as evidence that work is current.
