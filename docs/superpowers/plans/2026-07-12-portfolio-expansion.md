# Portfolio Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the single-page consultant portfolio into a multi-page personal builder's portfolio with Nav, Work, Now, Playground, About, and Resume pages.

**Architecture:** Astro multi-page site with persistent React navigation, content collections for Work/Now/Playground, and dedicated `.astro` pages for About and Resume. Each phase produces a deployable PR that leaves the site functional.

**Tech Stack:** Astro 7, React 19, Tailwind CSS 4, Motion 12, Shiki 4, Phosphor Icons, Geist Sans

## Global Constraints

- Node >= 22.12.0
- All content collections use Astro `glob` loader with Zod schemas
- All React components use named exports (no default exports) — matches existing pattern
- Motion animations use the `[0.16, 1, 0.3, 1]` ease curve — matches existing pattern
- Tailwind classes use the existing theme tokens: `bg-base`, `text-foreground`, `text-accent`, `border-black/10`
- No new npm dependencies unless explicitly noted
- Each phase is a separate PR
- Design spec: `docs/superpowers/specs/2026-07-12-portfolio-expansion-design.md`

---

## Phase 1: Navigation + Layout Foundation + Cleanup

**PR scope:** Add persistent nav header, update Layout to include it, simplify footer, delete unused boilerplate. The home page keeps its current content for now — this phase just wraps it in the new shell.

---

### Task 1.1: Delete Unused Boilerplate

**Files:**
- Delete: `src/components/Welcome.astro`
- Delete: `src/assets/astro.svg`
- Delete: `src/assets/background.svg`

- [ ] **Step 1: Delete the files**

```bash
Remove-Item src/components/Welcome.astro
Remove-Item src/assets/astro.svg
Remove-Item src/assets/background.svg
```

- [ ] **Step 2: Verify no imports reference these files**

```bash
# Search for any imports of these files
grep -r "Welcome" src/ --include="*.astro" --include="*.tsx" --include="*.ts"
grep -r "astro.svg" src/ --include="*.astro" --include="*.tsx" --include="*.ts"
grep -r "background.svg" src/ --include="*.astro" --include="*.tsx" --include="*.ts"
```

Expected: No matches (these files are unused).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: delete unused starter boilerplate"
```

---

### Task 1.2: Create the Nav Component

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: `Nav` React component. Props: none. Renders a `<header>` with site name linking to `/` and page links. Accepts `client:load` directive.

- [ ] **Step 1: Create the Nav component**

Create `src/components/Nav.tsx`:

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, X } from '@phosphor-icons/react';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/now', label: 'Now' },
  { href: '/playground', label: 'Playground' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base/80 border-b border-black/5">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="/"
          className="text-foreground font-semibold tracking-tight text-lg hover:text-accent transition-colors duration-300"
        >
          Vinayak Gupta
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-black/5 bg-base/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-gray-600 hover:text-foreground transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npx astro build 2>&1 | Select-String -Pattern "error" -CaseSensitive
```

Expected: No errors. The component exists but isn't imported anywhere yet.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component with mobile menu"
```

---

### Task 1.3: Simplify the Footer

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: `Footer` React component. No props change. Removes the giant CTA, keeps name + social links.

- [ ] **Step 1: Rewrite the Footer component**

Replace the full contents of `src/components/Footer.tsx` with:

```tsx
export function Footer() {
  return (
    <footer className="px-6 md:px-12 max-w-7xl mx-auto py-16 mt-24 border-t border-black/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-foreground font-medium">Vinayak Gupta</p>
          <p className="text-sm text-gray-500">Software Engineer & Builder</p>
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <a
            href="https://github.com/ctrl-infinity"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/vinayak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@example.com"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
```

> **Note:** The email and LinkedIn URLs are placeholders carried over from the existing site. The user should update them with real values.

- [ ] **Step 2: Verify build**

```bash
npx astro build 2>&1 | Select-String -Pattern "error" -CaseSensitive
```

Expected: No build errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "refactor: simplify Footer, remove consultant CTA"
```

---

### Task 1.4: Integrate Nav into Layout and Update Home Page

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Nav` component from Task 1.2
- Produces: Updated Layout with Nav on all pages. Home page stripped down to Hero + Footer.

- [ ] **Step 1: Update Layout.astro to include Nav**

Replace the full contents of `src/layouts/Layout.astro` with:

```astro
---
import '../styles/global.css';
import '@fontsource/geist-sans';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

interface Props {
	title?: string;
	description?: string;
}

const {
	title = 'Vinayak Gupta — Software Engineer & Builder',
	description = 'Personal portfolio of Vinayak Gupta. Software Engineer & Builder.'
} = Astro.props;
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="generator" content={Astro.generator} />

		<title>{title}</title>
		<meta name="description" content={description} />
	</head>
	<body class="bg-base text-foreground antialiased selection:bg-accent selection:text-white">
		<Nav client:load />
		<main class="pt-16">
			<slot />
		</main>
		<Footer />
	</body>
</html>
```

Key changes:
- Nav is included in Layout so it appears on every page
- Footer is included in Layout so it appears on every page
- `<main>` wrapper with `pt-16` to offset the fixed nav height
- Better default title and description

- [ ] **Step 2: Simplify index.astro — Hero only**

Replace the full contents of `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import { Hero } from '../components/Hero';
---

<Layout>
	<Hero client:load />
</Layout>
```

The EngineerSpec, CaseStudies, Services, SelectedWork, and Footer imports are removed. Footer is now in Layout.

- [ ] **Step 3: Verify the dev server renders correctly**

```bash
npx astro build
```

Expected: Clean build with no errors. The site should show Nav → Hero → Footer.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: integrate Nav into Layout, simplify home page"
```

---

### Task 1.5: Rewrite Hero Copy for Builder Tone

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: Nothing
- Produces: Updated `Hero` component with personal/builder tone, no "Book a call" CTA.

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the full contents of `src/components/Hero.tsx` with:

```tsx
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-8">
          Software Engineer · Builder
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-foreground">
          Hey, I'm Vinayak.
        </h1>

        <p className="text-lg text-gray-600 max-w-[50ch] mb-12 leading-relaxed">
          I build things for the web and tinker with whatever catches my eye.
          Currently engineering software and exploring what's next.
        </p>

        <a
          href="/work"
          className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-base text-white hover:bg-accent transition-colors duration-300"
        >
          See what I've built →
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npx astro build
```

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "refactor: rewrite Hero with personal builder tone"
```

---

### Task 1.6: Delete Unused Components

**Files:**
- Delete: `src/components/EngineerSpec.tsx`
- Delete: `src/components/Services.tsx`
- Delete: `src/components/CaseStudies.tsx`
- Delete: `src/components/SelectedWork.tsx`

- [ ] **Step 1: Verify these components are no longer imported**

```bash
grep -r "EngineerSpec\|Services\|CaseStudies\|SelectedWork" src/pages/ src/layouts/ --include="*.astro" --include="*.tsx"
```

Expected: No matches (they were removed from `index.astro` in Task 1.4).

- [ ] **Step 2: Delete the files**

```bash
Remove-Item src/components/EngineerSpec.tsx
Remove-Item src/components/Services.tsx
Remove-Item src/components/CaseStudies.tsx
Remove-Item src/components/SelectedWork.tsx
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete unused consultant-framing components"
```

---

### Task 1.7: Final Phase 1 Verification

- [ ] **Step 1: Full build verification**

```bash
npx astro build
```

Expected: Clean build with zero errors.

- [ ] **Step 2: Dev server visual check**

```bash
npx astro dev --host
```

Verify:
- Nav is visible at top with "Vinayak Gupta" and 5 links (Work, Now, Playground, About, Resume)
- Hero shows personal tone: "Hey, I'm Vinayak."
- CTA says "See what I've built →" and links to `/work`
- Footer shows simplified name + social links
- Mobile: hamburger menu works
- Nav links go to 404s (expected — pages don't exist yet)

- [ ] **Step 3: Commit any remaining changes and tag the phase**

```bash
git add -A
git commit -m "feat: complete Phase 1 — nav, layout, hero rewrite, cleanup" --allow-empty
```

---

## Phase 2: Unified Work Page

**PR scope:** Create the unified `work` content collection, migrate existing content, build the `/work` page with category filters. Delete old `projects` and `case-studies` collections.

---

### Task 2.1: Create the Work Content Collection

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/work/fintech-core.md`
- Create: `src/content/work/ecommerce-storefront.md`
- Create: `src/content/work/transaction-engine.md`
- Create: `src/content/work/headless-migration.md`
- Create: `src/content/work/code-review-agent.md`

**Interfaces:**
- Consumes: Nothing
- Produces: `work` collection with schema: `{ title, description, role, category, tags, image?, link?, client?, duration?, featured, order }`

- [ ] **Step 1: Update content.config.ts — add work collection, keep old collections temporarily**

Replace the full contents of `src/content.config.ts` with:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    category: z.enum(['professional', 'side-project', 'open-source']),
    tags: z.array(z.string()),
    image: z.string().optional(),
    link: z.string().url().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  })
});

export const collections = { work };
```

- [ ] **Step 2: Create migrated work content files**

Create `src/content/work/fintech-core.md`:

```markdown
---
title: "Fintech Core Platform"
description: "Built a real-time event-sourced transaction engine using Node.js and Postgres, replacing an aging polling system. Cut latency by 90% and enabled instant ledger updates."
role: "Lead Engineer"
category: "professional"
tags: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Event Sourcing"]
image: "/images/fintech-mockup.jpg"
client: "Fintech Startup"
duration: "4 weeks"
order: 1
---
```

Create `src/content/work/ecommerce-storefront.md`:

```markdown
---
title: "Global E-Commerce Storefront"
description: "Audited the architecture of a Next.js App Router migration stuck on caching issues. Fixed the cache invalidation strategy and shipped the migration 2 weeks ahead of schedule."
role: "Performance Consultant"
category: "professional"
tags: ["Next.js", "Astro", "Commerce Layer", "React", "Vercel"]
image: "/images/ecommerce-mockup.jpg"
client: "E-Commerce Enterprise"
duration: "3 months"
order: 2
---
```

Create `src/content/work/code-review-agent.md`:

```markdown
---
title: "Code Review Agent for Azure DevOps"
description: "Integrated a code-review agent in the ADO ecosystem for accelerated code reviews using service hooks and PowerShell automation."
role: "Engineer"
category: "professional"
tags: ["PowerShell", "Azure DevOps", "Service Hooks"]
client: "SaaS Company"
duration: "2 weeks"
order: 3
---
```

Create `src/content/work/headless-migration.md`:

```markdown
---
title: "Headless CMS Migration"
description: "Unblocked a team stuck on Next.js App Router caching issues. Audited the architecture, fixed the cache invalidation strategy, and shipped the migration ahead of schedule."
role: "Consultant"
category: "professional"
tags: ["Next.js", "React", "Vercel"]
client: "E-Commerce Enterprise"
duration: "3 months"
order: 4
---
```

Create `src/content/work/transaction-engine.md`:

```markdown
---
title: "Real-Time Transaction Engine"
description: "Replaced an aging polling system with a real-time event-sourced architecture using Node.js and Postgres, cutting latency by 90% and enabling instant ledger updates."
role: "Lead Engineer"
category: "professional"
tags: ["Node.js", "PostgreSQL", "Event Sourcing"]
client: "Fintech Startup"
duration: "4 weeks"
order: 5
---
```

- [ ] **Step 3: Delete old content directories**

```bash
Remove-Item -Recurse src/content/projects
Remove-Item -Recurse src/content/case-studies
```

- [ ] **Step 4: Verify build**

```bash
npx astro build
```

Expected: Clean build. The old collections are removed from config and their directories are gone.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: create unified work content collection, migrate existing content"
```

---

### Task 2.2: Build the Work Page Components

**Files:**
- Create: `src/components/WorkCard.tsx`
- Create: `src/components/WorkFilter.tsx`

**Interfaces:**
- Consumes: Work collection schema from Task 2.1
- Produces:
  - `WorkCard` component. Props: `{ title: string, description: string, role: string, category: string, tags: string[], image?: string, client?: string, duration?: string }`
  - `WorkFilter` component. Props: `{ categories: string[], active: string, onChange: (category: string) => void }`

- [ ] **Step 1: Create WorkCard component**

Create `src/components/WorkCard.tsx`:

```tsx
import { motion } from 'motion/react';

export interface WorkCardProps {
  title: string;
  description: string;
  role: string;
  category: string;
  tags: string[];
  image?: string;
  client?: string;
  duration?: string;
}

export function WorkCard({ title, description, role, tags, image, client, duration }: WorkCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-6"
    >
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{role}</span>
          {client && (
            <>
              <span className="text-gray-300">·</span>
              <span>{client}</span>
            </>
          )}
          {duration && (
            <>
              <span className="text-gray-300">·</span>
              <span className="font-mono text-xs">{duration}</span>
            </>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed max-w-[60ch]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-black/5 text-xs text-foreground/80 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Create WorkFilter component**

Create `src/components/WorkFilter.tsx`:

```tsx
import { motion } from 'motion/react';

interface WorkFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  professional: 'Professional',
  'side-project': 'Side Project',
  'open-source': 'Open Source',
};

export function WorkFilter({ categories, active, onChange }: WorkFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            active === category
              ? 'text-foreground'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {categoryLabels[category] || category}
          {active === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-black/5 -z-10"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/WorkCard.tsx src/components/WorkFilter.tsx
git commit -m "feat: add WorkCard and WorkFilter components"
```

---

### Task 2.3: Create the Work Page

**Files:**
- Create: `src/pages/work.astro`
- Create: `src/components/WorkPage.tsx`

**Interfaces:**
- Consumes: `WorkCard` (Task 2.2), `WorkFilter` (Task 2.2), `work` collection (Task 2.1)
- Produces: `/work` route rendering the unified work page

- [ ] **Step 1: Create the WorkPage React wrapper**

The filtering logic needs client-side interactivity, so we create a React component that receives the data from Astro and handles filtering.

Create `src/components/WorkPage.tsx`:

```tsx
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { WorkCard, type WorkCardProps } from './WorkCard';
import { WorkFilter } from './WorkFilter';

interface WorkPageProps {
  projects: WorkCardProps[];
}

export function WorkPage({ projects }: WorkPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...new Set(projects.map((p) => p.category))];

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-24">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Things I've Built
        </h1>
        <p className="text-gray-500 max-w-[50ch] mb-8">
          A mix of professional work, side projects, and open source.
        </p>
        <WorkFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <div className="flex flex-col gap-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <WorkCard key={project.title} {...project} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the Astro page**

Create `src/pages/work.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import { WorkPage } from '../components/WorkPage';
import { getCollection } from 'astro:content';

const workCollection = await getCollection('work');
const sortedWork = workCollection
  .sort((a, b) => a.data.order - b.data.order)
  .map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    role: entry.data.role,
    category: entry.data.category,
    tags: entry.data.tags,
    image: entry.data.image,
    client: entry.data.client,
    duration: entry.data.duration,
  }));
---

<Layout title="Work — Vinayak Gupta" description="Things I've built — professional work, side projects, and open source.">
  <WorkPage projects={sortedWork} client:load />
</Layout>
```

- [ ] **Step 3: Verify build and test**

```bash
npx astro build
```

Expected: Clean build. The `/work` route should exist.

- [ ] **Step 4: Dev server visual check**

```bash
npx astro dev --host
```

Navigate to `/work`. Verify:
- Page title: "Things I've Built"
- Filter buttons: All, Professional (active categories from content)
- Project cards render with title, role, description, tags
- Cards with images show images
- Filtering animates cards in/out
- Nav and Footer present

- [ ] **Step 5: Commit**

```bash
git add src/pages/work.astro src/components/WorkPage.tsx
git commit -m "feat: add /work page with category filters"
```

---

## Phase 3: Now Page

**PR scope:** Create the `now` content collection with sample entries and build the `/now` page with status grouping.

---

### Task 3.1: Create the Now Content Collection

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/now/portfolio-expansion.md` (sample entry)

**Interfaces:**
- Consumes: Nothing
- Produces: `now` collection with schema: `{ title, description, status, tags, startDate?, link?, order }`

- [ ] **Step 1: Add the now collection to content.config.ts**

Add the following collection definition before the `export const collections` line in `src/content.config.ts`:

```typescript
const now = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/now" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['active', 'exploring', 'paused']),
    tags: z.array(z.string()),
    startDate: z.string().optional(),
    link: z.string().url().optional(),
    order: z.number().default(99),
  })
});
```

Update the exports:

```typescript
export const collections = { work, now };
```

- [ ] **Step 2: Create a sample now entry**

Create `src/content/now/portfolio-expansion.md`:

```markdown
---
title: "Expanding my portfolio site"
description: "Rebuilding my portfolio from a consultant-style site into a personal builder's portfolio. Adding new sections, playground experiments, and making it feel more like me."
status: "active"
tags: ["astro", "react", "tailwind"]
startDate: "Jul 2026"
order: 1
---
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/now/
git commit -m "feat: add now content collection with sample entry"
```

---

### Task 3.2: Build the Now Page

**Files:**
- Create: `src/components/NowEntry.tsx`
- Create: `src/components/NowGroup.tsx`
- Create: `src/pages/now.astro`

**Interfaces:**
- Consumes: `now` collection (Task 3.1)
- Produces:
  - `NowEntry` component. Props: `{ title, description, tags, startDate?, link? }`
  - `NowGroup` component. Props: `{ status: string, entries: NowEntryProps[] }`
  - `/now` route

- [ ] **Step 1: Create NowEntry component**

Create `src/components/NowEntry.tsx`:

```tsx
import { motion } from 'motion/react';

export interface NowEntryProps {
  title: string;
  description: string;
  tags: string[];
  startDate?: string;
  link?: string;
}

export function NowEntry({ title, description, tags, startDate, link }: NowEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2 py-6"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium text-foreground">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
              {title} ↗
            </a>
          ) : (
            title
          )}
        </h3>
        {startDate && (
          <span className="text-xs font-mono text-gray-400 shrink-0">
            {startDate}
          </span>
        )}
      </div>

      <p className="text-gray-600 leading-relaxed max-w-[60ch]">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-black/5 text-xs text-foreground/70 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create NowGroup component**

Create `src/components/NowGroup.tsx`:

```tsx
import { NowEntry, type NowEntryProps } from './NowEntry';

interface NowGroupProps {
  status: string;
  entries: NowEntryProps[];
}

const statusConfig: Record<string, { icon: string; label: string }> = {
  active: { icon: '⚡', label: 'Currently Active' },
  exploring: { icon: '🔭', label: 'Exploring' },
  paused: { icon: '💤', label: 'Paused' },
};

export function NowGroup({ status, entries }: NowGroupProps) {
  if (entries.length === 0) return null;

  const config = statusConfig[status] || { icon: '•', label: status };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2 pb-4 border-b border-black/10">
        <span className="text-lg">{config.icon}</span>
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-gray-500">
          {config.label}
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-black/5">
        {entries.map((entry) => (
          <NowEntry key={entry.title} {...entry} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the Now page**

Create `src/pages/now.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import { NowGroup } from '../components/NowGroup';
import { getCollection } from 'astro:content';

const nowCollection = await getCollection('now');
const sorted = nowCollection.sort((a, b) => a.data.order - b.data.order);

const grouped = {
  active: sorted.filter((e) => e.data.status === 'active').map((e) => ({
    title: e.data.title,
    description: e.data.description,
    tags: e.data.tags,
    startDate: e.data.startDate,
    link: e.data.link,
  })),
  exploring: sorted.filter((e) => e.data.status === 'exploring').map((e) => ({
    title: e.data.title,
    description: e.data.description,
    tags: e.data.tags,
    startDate: e.data.startDate,
    link: e.data.link,
  })),
  paused: sorted.filter((e) => e.data.status === 'paused').map((e) => ({
    title: e.data.title,
    description: e.data.description,
    tags: e.data.tags,
    startDate: e.data.startDate,
    link: e.data.link,
  })),
};

const today = new Date();
const lastUpdated = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
---

<Layout title="Now — Vinayak Gupta" description="What I'm currently working on, exploring, and thinking about.">
  <section class="px-6 md:px-12 max-w-7xl mx-auto py-24">
    <div class="mb-16">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        What I'm Up To
      </h1>
      <p class="text-sm font-mono text-gray-400">
        Last updated: {lastUpdated}
      </p>
    </div>

    <NowGroup status="active" entries={grouped.active} />
    <NowGroup status="exploring" entries={grouped.exploring} />
    <NowGroup status="paused" entries={grouped.paused} />
  </section>
</Layout>
```

- [ ] **Step 4: Verify build and visual check**

```bash
npx astro build
```

Expected: Clean build.

Start dev server and navigate to `/now`. Verify:
- Page title: "What I'm Up To"
- "Last updated" shows current month/year
- Active section shows with ⚡ icon and the sample entry
- Exploring and Paused sections don't render (no entries yet — `NowGroup` returns null for empty)

- [ ] **Step 5: Commit**

```bash
git add src/components/NowEntry.tsx src/components/NowGroup.tsx src/pages/now.astro
git commit -m "feat: add /now page with status grouping"
```

---

## Phase 4: Playground Page

**PR scope:** Create the `playground` content collection, build the card grid index page and dynamic `[slug]` detail pages.

---

### Task 4.1: Create the Playground Content Collection

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/playground/sample-experiment.md` (sample entry)

**Interfaces:**
- Consumes: Nothing
- Produces: `playground` collection with schema: `{ title, description, tags, type, link?, component?, order }`

- [ ] **Step 1: Add the playground collection to content.config.ts**

Add the following collection definition before the `export const collections` line in `src/content.config.ts`:

```typescript
const playground = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/playground" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    type: z.enum(['interactive', 'demo', 'snippet', 'external']),
    link: z.string().url().optional(),
    component: z.string().optional(),
    order: z.number().default(99),
  })
});
```

Update the exports:

```typescript
export const collections = { work, now, playground };
```

- [ ] **Step 2: Create a sample playground entry**

Create `src/content/playground/sample-experiment.md`:

```markdown
---
title: "CSS Grid Playground"
description: "An interactive tool for visualizing CSS Grid layouts. Drag to resize, toggle properties, see the code update live."
tags: ["css", "react", "interactive"]
type: "snippet"
order: 1
---

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.grid-item {
  background: #f0f0f0;
  padding: 2rem;
  text-align: center;
}
```

This is a simple CSS Grid example showing a 3-column layout with equal-width columns and consistent spacing.
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Clean build.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/playground/
git commit -m "feat: add playground content collection with sample entry"
```

---

### Task 4.2: Build the Playground Card and Index Page

**Files:**
- Create: `src/components/PlaygroundCard.tsx`
- Create: `src/pages/playground/index.astro`

**Interfaces:**
- Consumes: `playground` collection (Task 4.1)
- Produces:
  - `PlaygroundCard` component. Props: `{ title, description, tags, type, slug, link? }`
  - `/playground` route

- [ ] **Step 1: Create PlaygroundCard component**

Create `src/components/PlaygroundCard.tsx`:

```tsx
import { motion } from 'motion/react';

export interface PlaygroundCardProps {
  title: string;
  description: string;
  tags: string[];
  type: string;
  slug: string;
  link?: string;
}

const typeLabels: Record<string, string> = {
  interactive: '✦ Interactive',
  demo: '▶ Demo',
  snippet: '{ } Snippet',
  external: '↗ External',
};

export function PlaygroundCard({ title, description, tags, type, slug, link }: PlaygroundCardProps) {
  const href = type === 'external' && link ? link : `/playground/${slug}`;
  const isExternal = type === 'external';

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 p-6 border border-black/5 hover:border-black/15 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          {typeLabels[type] || type}
        </span>
      </div>

      <h3 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-black/5 text-xs text-foreground/70 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
```

- [ ] **Step 2: Create the Playground index page**

Create `src/pages/playground/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { PlaygroundCard } from '../../components/PlaygroundCard';
import { getCollection } from 'astro:content';

const playgroundCollection = await getCollection('playground');
const sorted = playgroundCollection.sort((a, b) => a.data.order - b.data.order);

const entries = sorted.map((entry) => ({
  title: entry.data.title,
  description: entry.data.description,
  tags: entry.data.tags,
  type: entry.data.type,
  slug: entry.id,
  link: entry.data.link,
}));
---

<Layout title="Playground — Vinayak Gupta" description="Small experiments, code toys, and things I built to learn something new.">
  <section class="px-6 md:px-12 max-w-7xl mx-auto py-24">
    <div class="mb-16">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        Playground
      </h1>
      <p class="text-gray-500 max-w-[50ch]">
        Small experiments, code toys, and things I built to learn something new.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <PlaygroundCard {...entry} client:load />
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 3: Verify build and visual check**

```bash
npx astro build
```

Expected: Clean build.

Start dev server and navigate to `/playground`. Verify:
- Page title: "Playground"
- Sample card renders with type badge, title, description, tags
- Grid layout is responsive (1 col mobile, 2 col tablet, 3 col desktop)

- [ ] **Step 4: Commit**

```bash
git add src/components/PlaygroundCard.tsx src/pages/playground/index.astro
git commit -m "feat: add /playground index page with card grid"
```

---

### Task 4.3: Create Playground Detail Pages

**Files:**
- Create: `src/pages/playground/[slug].astro`

**Interfaces:**
- Consumes: `playground` collection (Task 4.1)
- Produces: `/playground/[slug]` dynamic routes for non-external entries

- [ ] **Step 1: Create the dynamic route page**

Create `src/pages/playground/[slug].astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const playground = await getCollection('playground');
  return playground
    .filter((entry) => entry.data.type !== 'external')
    .map((entry) => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<Layout title={`${entry.data.title} — Playground`} description={entry.data.description}>
  <article class="px-6 md:px-12 max-w-4xl mx-auto py-24">
    <header class="mb-12">
      <a href="/playground" class="text-sm font-mono text-gray-400 hover:text-accent transition-colors mb-6 inline-block">
        ← Back to Playground
      </a>

      <div class="flex items-center gap-3 mb-4">
        <span class="text-xs font-mono text-gray-400 uppercase tracking-wider px-2 py-1 bg-black/5">
          {entry.data.type}
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        {entry.data.title}
      </h1>

      <p class="text-lg text-gray-600 leading-relaxed">
        {entry.data.description}
      </p>

      <div class="flex flex-wrap gap-2 mt-6">
        {entry.data.tags.map((tag: string) => (
          <span class="px-3 py-1 bg-black/5 text-xs text-foreground/70 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </header>

    <div class="prose prose-gray max-w-none
      [&_pre]:bg-[#1e1e1e] [&_pre]:text-gray-200 [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed
      [&_code]:font-mono [&_code]:text-sm
      [&_p]:text-gray-600 [&_p]:leading-relaxed
      [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
      [&_h3]:text-foreground [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3
      [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4
      [&_ul]:text-gray-600 [&_ol]:text-gray-600
      [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-gray-500
    ">
      <Content />
    </div>
  </article>
</Layout>
```

- [ ] **Step 2: Verify build**

```bash
npx astro build
```

Expected: Clean build. A static page should be generated for the sample entry at `/playground/sample-experiment`.

- [ ] **Step 3: Dev server visual check**

Navigate to `/playground/sample-experiment`. Verify:
- Back link to Playground
- Title, description, type badge, tags render correctly
- Markdown body content renders with code blocks styled

- [ ] **Step 4: Commit**

```bash
git add src/pages/playground/[slug].astro
git commit -m "feat: add playground detail pages with dynamic routes"
```

---

## Phase 5: About Page

**PR scope:** Create the About page with reorderable section components (Story, Stack, Timeline, Outside of Code).

---

### Task 5.1: Create About Section Components

**Files:**
- Create: `src/components/about/AboutStory.astro`
- Create: `src/components/about/AboutStack.astro`
- Create: `src/components/about/AboutTimeline.astro`
- Create: `src/components/about/AboutOutside.astro`

**Interfaces:**
- Consumes: Nothing
- Produces: Four independent Astro components, each rendering one section of the About page. No props — content is authored directly in the components.

- [ ] **Step 1: Create AboutStory component**

Create `src/components/about/AboutStory.astro`:

```astro
<section class="mb-24">
  <h2 class="text-2xl font-bold tracking-tight text-foreground mb-8">Story</h2>
  <div class="max-w-[65ch] space-y-6 text-gray-600 leading-relaxed">
    <p>
      <!-- Replace with your story -->
      I got into software engineering because I liked building things that people could actually use.
      Not in a "passion for technology" kind of way — more like I kept running into problems and
      thought, "I could probably make something for this."
    </p>
    <p>
      That instinct hasn't changed much. I'm drawn to the kind of work where something is stuck
      or messy, and it needs someone to sit down, figure out what's actually going on, and ship
      the fix. I care about code that's clear enough for the next person to work on without
      needing a tour guide.
    </p>
    <p>
      I work mostly with TypeScript, React, and Node.js — not out of brand loyalty, but because
      they let me move fast without constantly fighting the tools.
    </p>
  </div>
</section>
```

- [ ] **Step 2: Create AboutStack component**

Create `src/components/about/AboutStack.astro`:

```astro
---
const stack = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", note: "won't start a project without it" },
      { name: "JavaScript", note: "" },
      { name: "Python", note: "scripting and data work" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", note: "my default for anything interactive" },
      { name: "Astro", note: "content sites, this one included" },
      { name: "Tailwind CSS", note: "fast styling without the bikeshedding" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", note: "" },
      { name: "PostgreSQL", note: "my default for anything with relational data" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", note: "" },
      { name: "Docker", note: "" },
      { name: "VS Code", note: "" },
    ],
  },
];
---

<section class="mb-24">
  <h2 class="text-2xl font-bold tracking-tight text-foreground mb-8">What I Work With</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    {stack.map((group) => (
      <div>
        <h3 class="text-sm font-mono uppercase tracking-[0.15em] text-gray-400 mb-4">
          {group.category}
        </h3>
        <ul class="space-y-3">
          {group.items.map((item) => (
            <li class="text-foreground">
              <span class="font-medium">{item.name}</span>
              {item.note && (
                <span class="text-gray-500 text-sm"> — {item.note}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Create AboutTimeline component**

Create `src/components/about/AboutTimeline.astro`:

```astro
---
const milestones = [
  {
    year: "2024",
    title: "Senior Engineer at [Company]",
    description: "Describe what you worked on.",
  },
  {
    year: "2022",
    title: "Engineer at [Company]",
    description: "Describe what you built.",
  },
  {
    year: "2020",
    title: "Started building for the web",
    description: "How it all began.",
  },
];
---

<section class="mb-24">
  <h2 class="text-2xl font-bold tracking-tight text-foreground mb-8">Timeline</h2>
  <div class="relative">
    {/* Vertical line */}
    <div class="absolute left-[3.5rem] top-0 bottom-0 w-px bg-black/10 hidden md:block" />

    <div class="space-y-12">
      {milestones.map((milestone) => (
        <div class="flex gap-8 items-start">
          <div class="shrink-0 w-14 text-right">
            <span class="text-sm font-mono text-gray-400">{milestone.year}</span>
          </div>
          <div class="relative">
            {/* Dot on the line */}
            <div class="absolute -left-[1.15rem] top-1.5 w-2 h-2 bg-accent rounded-full hidden md:block" />
            <h3 class="text-lg font-medium text-foreground">{milestone.title}</h3>
            <p class="text-gray-600 mt-1 max-w-[50ch]">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create AboutOutside component**

Create `src/components/about/AboutOutside.astro`:

```astro
<section class="mb-24">
  <h2 class="text-2xl font-bold tracking-tight text-foreground mb-8">Outside of Code</h2>
  <div class="max-w-[65ch] space-y-4 text-gray-600 leading-relaxed">
    <p>
      <!-- Replace with your interests -->
      When I'm not coding, you'll probably find me reading, gaming, or going down some
      rabbit hole about a topic I'll never use professionally. I like long walks, good coffee,
      and well-designed tools.
    </p>
  </div>
</section>
```

- [ ] **Step 5: Verify build**

```bash
npx astro build
```

Expected: Clean build. Components exist but aren't used yet.

- [ ] **Step 6: Commit**

```bash
git add src/components/about/
git commit -m "feat: add About section components (Story, Stack, Timeline, Outside)"
```

---

### Task 5.2: Create the About Page

**Files:**
- Create: `src/pages/about.astro`

**Interfaces:**
- Consumes: `AboutStory`, `AboutStack`, `AboutTimeline`, `AboutOutside` (Task 5.1)
- Produces: `/about` route

- [ ] **Step 1: Create the About page**

Create `src/pages/about.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import AboutStory from '../components/about/AboutStory.astro';
import AboutStack from '../components/about/AboutStack.astro';
import AboutTimeline from '../components/about/AboutTimeline.astro';
import AboutOutside from '../components/about/AboutOutside.astro';
---

<Layout title="About — Vinayak Gupta" description="Who I am, what I work with, and what I do outside of code.">
  <section class="px-6 md:px-12 max-w-7xl mx-auto py-24">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-16">
      About Me
    </h1>

    {/* Reorder these components by moving the lines */}
    <AboutStory />
    <AboutStack />
    <AboutTimeline />
    <AboutOutside />
  </section>
</Layout>
```

> **Note:** To reorder sections, just move the component lines. Each one is fully independent.

- [ ] **Step 2: Verify build and visual check**

```bash
npx astro build
```

Expected: Clean build.

Start dev server and navigate to `/about`. Verify:
- Page title: "About Me"
- Four sections render in order: Story, Stack, Timeline, Outside
- Stack section shows categorized list with opinions
- Timeline shows vertical line with year markers and dots

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add /about page with reorderable sections"
```

---

## Phase 6: Resume Page

**PR scope:** Create the Resume page with PDF embed and download button. Set up the LaTeX source location.

---

### Task 6.1: Create the Resume Page and Directory Structure

**Files:**
- Create: `src/resume/` directory (for LaTeX source — gitkeep for now)
- Create: `public/resume/` directory (for compiled PDF — gitkeep for now)
- Create: `src/pages/resume.astro`

**Interfaces:**
- Consumes: Nothing
- Produces: `/resume` route with PDF embed and download button

- [ ] **Step 1: Create directory structure**

```bash
New-Item -ItemType Directory -Path src/resume -Force
New-Item -ItemType File -Path src/resume/.gitkeep
New-Item -ItemType Directory -Path public/resume -Force
New-Item -ItemType File -Path public/resume/.gitkeep
```

- [ ] **Step 2: Create the Resume page**

Create `src/pages/resume.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';

const pdfPath = '/resume/vinayak-gupta-resume.pdf';
---

<Layout title="Resume — Vinayak Gupta" description="Vinayak Gupta's resume. Software Engineer & Builder.">
  <section class="px-6 md:px-12 max-w-7xl mx-auto py-24">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        Resume
      </h1>
      <a
        href={pdfPath}
        download
        class="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white text-sm font-medium hover:bg-accent transition-colors duration-300"
      >
        Download PDF ↓
      </a>
    </div>

    <div class="border border-black/10 bg-white">
      <object
        data={pdfPath}
        type="application/pdf"
        width="100%"
        class="min-h-[80vh] w-full"
      >
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <p class="text-gray-500 mb-4">
            PDF preview not available in your browser.
          </p>
          <a
            href={pdfPath}
            download
            class="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Download PDF ↓
          </a>
        </div>
      </object>
    </div>

    <p class="text-xs text-gray-400 mt-6 font-mono">
      Source: LaTeX → compiled to PDF. Place your .tex file in src/resume/ and compiled .pdf in public/resume/.
    </p>
  </section>
</Layout>
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Clean build. The page will show the fallback message until a real PDF is placed in `public/resume/`.

- [ ] **Step 4: Commit**

```bash
git add src/resume/ public/resume/ src/pages/resume.astro
git commit -m "feat: add /resume page with PDF embed and download"
```

---

### Task 6.2: Final Verification — All Pages

- [ ] **Step 1: Full build**

```bash
npx astro build
```

Expected: Clean build with zero errors.

- [ ] **Step 2: Dev server smoke test — all routes**

```bash
npx astro dev --host
```

Navigate to each route and verify it renders:

| Route | Expected |
|---|---|
| `/` | Nav → Hero ("Hey, I'm Vinayak.") → Footer |
| `/work` | Filter buttons, project cards with data from content collection |
| `/now` | "What I'm Up To", status groups, sample entry visible |
| `/playground` | Card grid with sample experiment card |
| `/playground/sample-experiment` | Detail page with rendered markdown |
| `/about` | Four sections: Story, Stack, Timeline, Outside |
| `/resume` | PDF embed (fallback message if no PDF yet), download button |

- [ ] **Step 3: Mobile responsiveness check**

Resize browser to mobile width and verify:
- Nav shows hamburger menu, menu opens/closes
- All pages are readable at narrow widths
- Cards stack to single column on mobile
- No horizontal scroll

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio expansion — all pages functional" --allow-empty
```
