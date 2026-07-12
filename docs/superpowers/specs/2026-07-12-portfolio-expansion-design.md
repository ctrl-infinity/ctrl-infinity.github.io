# Portfolio Expansion: From Consultant Site to Builder's Portfolio

## Overview

Transform the current single-page freelance consultant portfolio into a multi-page personal developer portfolio. The site should project a **Hacker/Builder + Warm & Approachable** personality — functional, human, not flashy. The current Astro 7 + React 19 + Tailwind 4 + Motion stack stays. The visual design evolves in place: same palette, same typography, warmed up through content and structure rather than visual effects.

## Goals

- Reframe from "hire me as a consultant" to "here's who I am and what I build"
- Create a multi-page site with persistent navigation
- Add new sections: Now/WIP, Playground, About, Resume
- Unify the work showcase into a single "Things I've Built" page
- Make all content markdown-driven via Astro content collections

## What Gets Removed

- **EngineerSpec** component — sales-deck stats grid. Those proof points can live alongside specific projects in `/work`.
- **Services** component — "How I Help" with consultant service offerings. Gone.
- **"Book a call" CTA** — replaced with something more personal.
- **"Recent Rescues" framing** — replaced with "Things I've Built."
- **Separate CaseStudies and SelectedWork** — merged into one unified Work page.
- **Welcome.astro** — unused Astro starter boilerplate. Delete.
- **src/assets/astro.svg, background.svg** — unused starter assets. Delete.
- **Giant "Let's build something" footer CTA** — replaced with a simpler, personal footer.

---

## Site Structure

### Navigation

Persistent header on all pages:

```
[Vinayak Gupta]              [Work]  [Now]  [Playground]  [About]  [Resume]
```

- **Left:** Name as wordmark, links to `/`.
- **Right:** Page links in a flat row.
- **Desktop:** All links visible inline.
- **Mobile:** Hamburger menu or minimal slide-in.
- **Style:** Subtle backdrop blur when scrolled, thin bottom border, sticks to top.

### Routes

| Route | Purpose |
|---|---|
| `/` | Hero + brief personal blurb |
| `/work` | "Things I've Built" — unified project entries |
| `/now` | What you're currently working on / exploring |
| `/playground` | Experiments, demos, code toys |
| `/playground/[slug]` | Individual experiment detail pages |
| `/about` | Story, stack, life outside code, timeline |
| `/resume` | HTML-rendered resume + PDF download |

### Footer

Simplified across all pages:
- Your name + tagline
- Social links (GitHub, LinkedIn, Email)
- Kept low-key and consistent

---

## Page Designs

### 1. Home Page (`/`)

A bold, confident landing page — an elevator pitch that gets out of the way.

**Content:**
- Animated fade-in (keep current Motion animation, it works)
- Your name
- A one-liner in your own voice about who you are (first-person, conversational)
- Current status ("Software Engineer · Currently at [Company]" or "Open to work")
- One primary CTA linking to `/work` ("See what I've built →")
- Optional subtle secondary link to `/about`

**What's removed from current home page:**
- EngineerSpec stats grid
- CaseStudies section
- Services section
- SelectedWork section
- Giant footer CTA

**Tone:** First-person, brief, warm. Arrives, introduces, steps aside.

---

### 2. Work Page (`/work`)

Unified "Things I've Built" page. Replaces both CaseStudies and SelectedWork.

**Content Collection: `work`**

Replaces both `projects` and `case-studies` collections. Schema:

```typescript
{
  title: string,
  description: string,
  role: string,
  category: 'professional' | 'side-project' | 'open-source',
  tags: string[],
  image: string (optional),
  link: string (optional),
  client: string (optional),       // for professional work
  duration: string (optional),     // for professional work
  featured: boolean (default false),
  order: number (default 99),
}
```

**Page Layout:**
- Section header: "Things I've Built" + subtitle
- Filter buttons at top: All | Professional | Side Project | Open Source
- Cards listed vertically, each showing: title, role, short description, tech tags, optional image
- Client-side filtering with Motion animations on enter/exit
- Project images are optional — cards without images just show text

**Migration:**
- Existing `projects/` entries → `work/` entries with `category: 'professional'`
- Existing `case-studies/` entries → `work/` entries with `category: 'professional'`
- Old `projects` and `case-studies` collections get deleted after migration

---

### 3. Now Page (`/now`)

Shows what you're currently working on, exploring, or have paused.

**Content Collection: `now`**

```typescript
{
  title: string,
  description: string,
  status: 'active' | 'exploring' | 'paused',
  tags: string[],
  startDate: string (optional),
  link: string (optional),
  order: number (default 99),
}
```

**Page Layout:**
- Section header: "What I'm Up To" + "Last updated: [date]"
- Entries grouped by status: Active first, then Exploring, then Paused
- Within each group, sorted by order then date
- Each entry shows: status icon, title, description, tags, start date
- Casual, conversational tone in descriptions

**Status icons:**
- Active: ⚡
- Exploring: 🔭
- Paused: 💤

**No progress bars or percentages** — status tags are honest and sufficient.

---

### 4. Playground Page (`/playground`)

Flexible experiments page. Each entry can be a different type.

**Content Collection: `playground`**

```typescript
{
  title: string,
  description: string,
  tags: string[],
  type: 'interactive' | 'demo' | 'snippet' | 'external',
  link: string (optional),          // for external entries
  component: string (optional),     // path to React component for interactive entries
  order: number (default 99),
}
```

**Page Layout:**
- Section header: "Playground" + subtitle
- Card grid: 2-3 columns responsive
- Each card: title, short description, type badge, tags

**Type determines click behavior:**
- `interactive` → `/playground/[slug]` with live React component
- `demo` → `/playground/[slug]` with iframe/embedded preview
- `snippet` → `/playground/[slug]` with Shiki-highlighted code + rendered output side by side
- `external` → opens external URL (CodePen, StackBlitz, etc.)

**Dynamic routes:** `/playground/[slug]` pages generated from content collection for non-external entries.

**Dependencies already available:** Shiki (installed, currently unused) for syntax highlighting, React for interactive components.

---

### 5. About Page (`/about`)

Rich personal page showing who you are beyond the code.

**Implementation:** A dedicated `.astro` page with content sections as independent components. Not content-collection driven — this page changes rarely and the flexibility of direct authoring is more valuable. Sections are separate components so they can be reordered by moving lines in the `.astro` file.

**Sections (in default order, reorderable):**

#### Story
- A few paragraphs in first person
- How you got into engineering, what drives you, what kind of problems you gravitate toward
- Conversational, not a formal bio

#### What I Work With
- Categorized text list (Languages, Frontend, Backend, Tools)
- Optional one-line opinions per tool ("TypeScript — won't start a project without it")
- **Not a logo grid** — text shows taste, logos are generic

#### Timeline
- Vertical line with year markers and short descriptions
- Key career milestones and highlights only — not a full CV (that's `/resume`)
- Reverse chronological

#### Outside of Code
- Two or three sentences about hobbies, interests, life beyond engineering
- Enough to be human, not a dating profile

---

### 6. Resume Page (`/resume`)

HTML resume page with PDF download.

**Source of truth:** LaTeX file in `src/resume/resume.tex`
**Compiled output:** `public/resume/vinayak-gupta-resume.pdf`

**Page Layout:**
- Prominent "Download PDF" button at the top
- PDF embedded in a clean viewer below (using `<object>` or `<iframe>` with PDF rendering)
- Clean, minimal framing — let the resume speak for itself

**Workflow:** Edit `.tex` → compile locally → commit both `.tex` and `.pdf` → Astro serves the PDF.

---

## Technical Decisions

### Design System Evolution

- **Keep:** Geist Sans, `#fafafa` background, `#111111` foreground, `#2563eb` accent, sharp rectangles, Motion animations
- **Add:** Monospace accent font (e.g., `font-mono`) for builder-feel elements like status tags, dates, categories
- **Warm up:** Through content tone and structure, not through visual effects

### Content Collections

| Collection | Directory | Purpose |
|---|---|---|
| `work` | `src/content/work/` | Unified projects (replaces `projects` + `case-studies`) |
| `now` | `src/content/now/` | Current work / exploration |
| `playground` | `src/content/playground/` | Experiments and demos |

### Components to Create

| Component | Type | Purpose |
|---|---|---|
| `Nav` | React | Persistent navigation header with mobile menu |
| `WorkCard` | React | Project card for work page |
| `WorkFilter` | React | Category filter buttons for work page |
| `NowEntry` | React | Single now/WIP entry |
| `NowGroup` | React | Group of entries by status |
| `PlaygroundCard` | React | Experiment card for grid |
| `AboutStory` | Astro | Story section |
| `AboutStack` | Astro | Stack/tools section |
| `AboutTimeline` | Astro | Career timeline |
| `AboutOutside` | Astro | Outside of code section |

### Components to Delete

| Component | Reason |
|---|---|
| `EngineerSpec.tsx` | Sales-deck stats, doesn't fit builder framing |
| `Services.tsx` | Consultant service offerings, removed |
| `CaseStudies.tsx` | Replaced by unified Work page |
| `SelectedWork.tsx` | Replaced by unified Work page |
| `Welcome.astro` | Unused Astro starter boilerplate |

### Components to Modify

| Component | Changes |
|---|---|
| `Hero.tsx` | Rewrite copy to personal/builder tone, remove "Book a call" CTA |
| `Footer.tsx` | Simplify: remove giant CTA, keep name + social links |

### Files to Delete

- `src/components/Welcome.astro`
- `src/assets/astro.svg`
- `src/assets/background.svg`
- `src/content/projects/` (migrated to `work/`)
- `src/content/case-studies/` (migrated to `work/`)

### Broken Links to Fix

- `#contact` anchor in Hero → remove or link to footer
- `#all-projects` in SelectedWork → removed (SelectedWork is gone)
- `hello@example.com` → update with real email or remove
- `linkedin.com/in/vinayak` → update with real LinkedIn URL

### Unused Dependencies

- `@phosphor-icons/react` — installed but unused. Keep it; useful for Now/Playground status icons and nav.
- `shiki` — installed but unused. Will be used for Playground snippet rendering.

---

## Out of Scope (Future Batches)

These were discussed but deferred:
- Bookmarks / Pins section (favorite videos, articles, links)
- Blog / writing section for own content
- Custom favicon (currently default Astro logo)
- OG / social meta tags
- Dark mode
