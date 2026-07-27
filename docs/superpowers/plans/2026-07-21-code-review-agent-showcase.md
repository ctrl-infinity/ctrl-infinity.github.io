# Code Review Agent Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the existing "Code Review Agent for Azure DevOps" work entry a full first-person case study — a new `/work/[slug]` detail page reachable from its `/work` card — that shows team impact and implementation without violating the site's established "Engineering Notebook" design system.

**Architecture:** Add one optional `metrics` field to the `work` content collection schema; rewrite the sparse `code-review-agent.md` entry into a full sanitized case study; add a static, zero-JS `ArchitectureDiagram.astro` component; add a `src/pages/work/[slug].astro` detail route (12-column editorial split: sticky metadata/impact rail + prose content column) that only generates for work entries with a body; make `WorkCard` link to it when a detail page exists; wire `work.astro` to pass the new props through.

**Tech Stack:** Astro 7 (content collections via `astro:content` + the glob loader), Tailwind CSS v4, React 19 only for the existing `WorkCard`/`WorkPage`/`WorkFilter` islands (the new detail page itself ships zero framework JS, per the site's static-page perf convention).

**Source of truth already read in full and quoted below where relevant:** `PRODUCT.md`, `DESIGN.md`, `src/styles/global.css`, `src/content.config.ts`, `src/pages/work.astro`, `src/pages/playground/[slug].astro`, `src/components/WorkCard.tsx`, `src/components/WorkPage.tsx`, `src/components/PlaygroundCard.astro`, `src/scripts/reveal.ts`, `src/layouts/Layout.astro`, `src/content/work/code-review-agent.md`. `entry.body: string` is confirmed present on `CollectionEntry` in `node_modules/astro/dist/types/public/content.d.ts` (no fallback flag needed for the `getStaticPaths` body filter).

## Global Constraints

These come from `PRODUCT.md` / `DESIGN.md` ("The Engineering Notebook" register) and apply to every task below:

- **One Signal Rule:** Signal Blue (`#2563eb`, Tailwind `text-accent`/`border-accent`/etc.) appears in exactly one *active* state at a time (hover/focus/selection) — never at rest, never as a background fill on new elements.
- **Zero border-radius anywhere.** No `rounded-*` utility on anything new.
- **Flat at rest.** No `shadow-*`, no `blur-*`/`backdrop-blur`, no gradient on anything in normal page flow. Separation comes from whitespace and 1px hairline borders (`border-black/10` ≈ `#0000001a`, or `bg-black/5` ≈ `#0000000d` for the "tag wash" fill).
- **One Eyebrow Rule:** mono uppercase tracked labels (`font-mono text-xs uppercase tracking-wider`) are reserved for genuine metadata (role, client, duration, category, a metric's name) — never decorative section kickers.
- **No stats/metric grid ("hero-metric template").** Impact numbers render as quiet label/value rows in the sidebar rail, not a card grid with large centered numbers.
- **Zero framework JS on the new page.** `src/pages/work/[slug].astro` is a static `.astro` file — no `client:load` island, no React import.
- **Contrast:** metric/metadata **values** use `text-foreground` (`#111`); **labels** use `text-gray-500` (`#6b7280`, ≈4.8:1 on `#fafafa` — passes AA for the 12px label size). Never `text-gray-400` for anything that must hit 4.5:1.
- **First-person, conversational copy** in the case-study body — "I built…", not "This solution provides…".
- **Motion:** any new reveal-on-scroll behavior reuses the existing `src/scripts/reveal.ts` (`data-reveal` attribute + `setupReveal()`), which already no-ops under `prefers-reduced-motion: reduce` and never hides above-the-fold content (progressive enhancement only). Do not add a new motion mechanism.

---

### Task 1: Add `metrics` field to the `work` content schema

**Files:**
- Modify: `src/content.config.ts`

**Interfaces:**
- Produces: an optional `metrics?: { label: string; value: string }[]` field on every `work` collection entry's `data`, consumed by Task 2 (content) and Task 4 (detail page rail).

- [ ] **Step 1: Add the field to the `work` schema**

In `src/content.config.ts`, the `work` collection is currently:

```ts
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
```

Change it to (only the `order` line is followed by a new `metrics` line — every other line is unchanged):

```ts
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
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  })
});
```

Do not touch the `now` or `playground` collections below it in the same file.

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: `astro build` completes, still 7 pages built (no schema validation errors — the field is optional so the four existing work entries without it are unaffected).

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add optional metrics field to work collection schema"
```

---

### Task 2: Rewrite the Code Review Agent case-study content

**Files:**
- Modify: `src/content/work/code-review-agent.md`

**Interfaces:**
- Consumes: the `metrics` field from Task 1.
- Produces: a non-empty markdown body for the `code-review-agent` entry (`entry.id === 'code-review-agent'`), which is what makes Task 4's `getStaticPaths` filter (`entry.body?.trim()`) generate a detail page for it, and real `## `-level headings/code fences/image markdown for Task 4's prose wrapper to style.

The current file is frontmatter-only with no body:

```md
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

- [ ] **Step 1: Replace the entire file content**

Write the complete file as:

```md
---
title: "Code Review Agent for Azure DevOps"
description: "Built a code reviewer that lives entirely inside Azure DevOps — service hooks kick off a pipeline that runs a headless Claude command in PowerShell and posts feedback straight onto the PR. Cut first-review turnaround and gave every PR a consistent first pass."
role: "Engineer"
category: "professional"
tags: ["PowerShell", "Azure DevOps", "Service Hooks", "Claude", "CI/CD", "Pipelines"]
client: "SaaS Company"
duration: "2 weeks"
order: 0
metrics:
  - label: "Turnaround"
    value: "[confirm real figure, e.g. −70%]"
  - label: "PRs reviewed"
    value: "[confirm real figure, e.g. 400+]"
  - label: "Engineers"
    value: "[confirm real figure, e.g. 12]"
  - label: "Flagged early"
    value: "[confirm real figure, e.g. 30%]"
---

<!-- TODO(vinayak): before publishing — replace the bracketed [confirm...] figures above and below with real numbers, add public/images/code-review-agent-pr.png (redacted PR comment screenshot), and swap the snippets below for the real sanitized PowerShell/YAML. -->

## The problem

Every pull request sat in a queue until someone had time to look at it. On a busy day that meant hours between "ready for review" and the first real comment — and when reviewers were slammed, the first pass was inconsistent: some PRs got a thorough read, others got a rubber stamp. I wanted every PR to get the same careful first look, immediately, without adding another tool for the team to log into.

## How it works

The whole thing lives inside Azure DevOps — no external server, no separate dashboard, nothing else to run or maintain.

1. A pull request is created or updated.
2. An Azure DevOps **service hook** fires on the PR event and triggers a pipeline.
3. The pipeline checks out the diff and runs a **headless Claude command** through PowerShell.
4. Claude reviews the changed files against the team's conventions and flags real issues — not the style nitpicks a linter already catches.
5. The pipeline posts the findings back onto the PR as comments, through the Azure DevOps REST API.

Keeping it fully inside ADO was deliberate. Secrets never leave the org's existing pipeline permissions, there's no new service boundary to secure, and any engineer who can already read the pipeline logs can see exactly what the agent did and why.

## Implementation

The pipeline step is a small PowerShell script that shells out to a headless Claude command against the PR diff, then posts the result back through the ADO REST API:

```powershell
# review-pr.ps1 — runs inside the ADO pipeline
$diff = git diff "origin/$env:SYSTEM_PULLREQUEST_TARGETBRANCH...HEAD"

$review = claude -p "Review this diff for bugs, security issues, and
  convention violations. Be specific and concise." `
  --output-format json <<< $diff | ConvertFrom-Json

$body = @{
  comments = @(@{ content = $review.summary })
  status   = 1
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Uri "$env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI$env:SYSTEM_TEAMPROJECT/_apis/git/repositories/$env:BUILD_REPOSITORY_NAME/pullRequests/$env:SYSTEM_PULLREQUEST_PULLREQUESTID/threads?api-version=7.1" `
  -Method Post -Headers $headers -Body $body -ContentType "application/json"
```

The service hook and the pipeline trigger are wired together in the pipeline YAML:

```yaml
# azure-pipelines.yml
trigger: none

pr:
  branches:
    include: ["*"]

pool:
  vmImage: "ubuntu-latest"

steps:
  - task: PowerShell@2
    displayName: "Run Claude code review"
    inputs:
      filePath: "scripts/review-pr.ps1"
    env:
      ANTHROPIC_API_KEY: $(ANTHROPIC_API_KEY)
```

Nothing here needs infrastructure beyond what the team's pipelines already had — the service hook and the `pr:` trigger are stock Azure DevOps, and the review logic is a single PowerShell script.

## Results

First-review turnaround dropped by **[confirm turnaround]**, the agent has now reviewed **[confirm PR count] pull requests** across **[confirm engineer count] engineers** on the team, and it catches real issues **[confirm flagged-early rate]** of the time before a human reviewer even opens the diff. *(Replace the bracketed figures with real numbers before publishing.)*

![Agent leaving a review comment on a pull request](/images/code-review-agent-pr.png)
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: succeeds. The screenshot image doesn't exist yet — that's fine, `astro build` doesn't verify local markdown image paths referenced as absolute `/images/...` URLs (they're plain `<img>` src strings, not Astro's asset pipeline), so this doesn't fail the build. It will 404 until Task's asset is added later by Vinayak.

- [ ] **Step 3: Commit**

```bash
git add src/content/work/code-review-agent.md
git commit -m "content: write full case study for the Code Review Agent"
```

---

### Task 3: Create the architecture diagram component

**Files:**
- Create: `src/components/work/ArchitectureDiagram.astro`

**Interfaces:**
- Produces: a default-export-free Astro component `ArchitectureDiagram` with no props, imported by Task 4 as `import ArchitectureDiagram from '../../components/work/ArchitectureDiagram.astro'` and rendered as `<ArchitectureDiagram />`.

This is a flat, monochrome, zero-JS 5-step sequence diagram: `PR created/updated → ADO service hook → Pipeline runs → Headless Claude (PowerShell) → Comments posted to PR`. Numbering is legitimate here (unlike a decorative `01/02/03` eyebrow) because this is a real, ordered sequence — the steps happen in this order and that order is the point.

- [ ] **Step 1: Write the component**

```astro
---
interface Step {
  title: string;
  role: string;
}

const steps: Step[] = [
  { title: 'PR created or updated', role: 'A developer opens or pushes to a pull request' },
  { title: 'ADO service hook fires', role: 'Azure DevOps emits the pull request event' },
  { title: 'Pipeline runs', role: 'A build pipeline picks up the event' },
  { title: 'Headless Claude reviews', role: 'PowerShell invokes a headless Claude command against the diff' },
  { title: 'Comments posted to PR', role: "Feedback lands back on the PR via Azure DevOps' REST API" },
];

type Cell =
  | { kind: 'node'; step: Step; index: number }
  | { kind: 'connector' };

const cells: Cell[] = steps.flatMap((step, index) =>
  index === 0
    ? [{ kind: 'node', step, index } as Cell]
    : [{ kind: 'connector' } as Cell, { kind: 'node', step, index } as Cell]
);
---

<figure class="my-12" data-reveal>
  <div class="flex flex-col md:flex-row md:items-stretch">
    {cells.map((cell) =>
      cell.kind === 'connector' ? (
        <div class="flex items-center justify-center text-gray-300 shrink-0 py-1 md:py-0 md:px-1" aria-hidden="true">
          <span class="hidden md:inline">→</span>
          <span class="md:hidden">↓</span>
        </div>
      ) : (
        <div class="group md:flex-1 border border-black/10 px-5 py-4 flex flex-col gap-2 hover:border-accent transition-colors duration-300">
          <span class="font-mono text-xs text-gray-400 group-hover:text-accent transition-colors duration-300">
            0{cell.index + 1}
          </span>
          <span class="text-sm font-medium text-foreground">{cell.step.title}</span>
          <span class="text-xs text-gray-500 leading-relaxed">{cell.step.role}</span>
        </div>
      )
    )}
  </div>
  <figcaption class="mt-4 text-xs font-mono text-gray-500">
    Runs entirely inside Azure DevOps — no external services, secrets never leave ADO.
  </figcaption>
</figure>
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: succeeds (this component isn't imported anywhere yet, so this just confirms the `.astro` file itself has no syntax errors — Astro type-checks/compiles all files under `src/` during build).

- [ ] **Step 3: Commit**

```bash
git add src/components/work/ArchitectureDiagram.astro
git commit -m "feat: add static architecture diagram component for work case studies"
```

---

### Task 4: Add the work case-study detail page

**Files:**
- Create: `src/pages/work/[slug].astro`

**Interfaces:**
- Consumes: `metrics` field (Task 1), the now-populated body/frontmatter of `code-review-agent.md` (Task 2), `ArchitectureDiagram` component (Task 3).
- Produces: the route `/work/code-review-agent` (and, automatically, a detail page for any future `work` entry that has a non-empty body). Task 5/6 will link to this route as `/work/${slug}`.

- [ ] **Step 1: Write the page**

```astro
---
import Layout from '../../layouts/Layout.astro';
import ArchitectureDiagram from '../../components/work/ArchitectureDiagram.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const work = await getCollection('work');
  return work
    .filter((entry) => entry.body?.trim())
    .map((entry) => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const { title, description, role, category, client, duration, tags, metrics } = entry.data;

const categoryLabels: Record<string, string> = {
  professional: 'Professional',
  'side-project': 'Side Project',
  'open-source': 'Open Source',
};
---

<Layout title={`${title} — Vinayak Gupta`} description={description}>
  <article class="px-6 md:px-12 max-w-6xl mx-auto py-24">
    <header class="mb-12">
      <a href="/work" class="text-sm font-mono text-gray-400 hover:text-accent transition-colors mb-6 inline-block">
        ← Back to Work
      </a>

      <div class="mb-4">
        <span class="text-xs font-mono text-gray-400 uppercase tracking-wider px-2 py-1 bg-black/5">
          {categoryLabels[category] ?? category}
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
        {title}
      </h1>

      <p class="text-lg text-gray-600 leading-relaxed max-w-[60ch]">
        {description}
      </p>
    </header>

    <div class="border-t border-black/10 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
      <aside class="md:col-span-4 md:sticky md:top-24 self-start flex flex-col gap-6 h-fit" data-reveal>
        <div class="flex flex-col gap-5">
          <div>
            <div class="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Role</div>
            <div class="text-foreground">{role}</div>
          </div>
          {client && (
            <div>
              <div class="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Client</div>
              <div class="text-foreground">{client}</div>
            </div>
          )}
          {duration && (
            <div>
              <div class="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Timeline</div>
              <div class="text-foreground font-mono text-sm">{duration}</div>
            </div>
          )}
          <div>
            <div class="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Stack</div>
            <div class="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span class="px-3 py-1 bg-black/5 text-xs text-foreground/80 font-mono">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {metrics && metrics.length > 0 && (
          <div class="flex flex-col gap-3 border-t border-black/10 pt-6">
            <div class="text-xs font-mono text-gray-500 uppercase tracking-wider">Impact</div>
            {metrics.map((metric: { label: string; value: string }) => (
              <div class="flex items-baseline justify-between gap-4">
                <span class="text-xs font-mono text-gray-500 uppercase tracking-wider">{metric.label}</span>
                <span class="text-foreground font-medium text-right">{metric.value}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      <div class="md:col-span-8">
        <ArchitectureDiagram />

        <div class="prose prose-gray max-w-none
          [&_pre]:bg-[#1e1e1e] [&_pre]:text-gray-200 [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed
          [&_code]:font-mono [&_code]:text-sm
          [&_p]:text-gray-600 [&_p]:leading-relaxed
          [&_h2]:text-foreground [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4
          [&_h3]:text-foreground [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3
          [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4
          [&_ul]:text-gray-600 [&_ol]:text-gray-600
          [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-gray-500
          [&_img]:border [&_img]:border-black/10
          [&_figcaption]:font-mono [&_figcaption]:text-xs [&_figcaption]:text-gray-500 [&_figcaption]:mt-2
        ">
          <Content />
        </div>
      </div>
    </div>
  </article>
</Layout>

<script>
  import { setupReveal } from '../../scripts/reveal';
  setupReveal();
</script>
```

- [ ] **Step 2: Verify the build succeeds and generates exactly one new page**

Run: `npm run build`
Expected: 8 pages built (7 existing + `/work/code-review-agent/index.html`). Confirm the other four work entries (still body-less) did NOT get pages:

Run: `ls dist/work/` (or `Get-ChildItem dist/work` on PowerShell)
Expected: only a `code-review-agent/` subdirectory alongside `index.html` — no directories for `ecommerce-storefront`, `fintech-core`, `headless-migration`, or `transaction-engine`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/[slug].astro
git commit -m "feat: add work case-study detail page"
```

---

### Task 5: Make WorkCard link to its case study

**Files:**
- Modify: `src/components/WorkCard.tsx`

**Interfaces:**
- Produces: `WorkCardProps` gains two optional fields, `slug?: string` and `hasDetail?: boolean`. Consumed by Task 6 (`work.astro` supplies them) and already flows through `WorkPage.tsx` unchanged, since it spreads `<WorkCard key={project.title} {...project} />` — no edit needed there.

Current file:

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

- [ ] **Step 1: Replace the entire file content**

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
  slug?: string;
  hasDetail?: boolean;
}

export function WorkCard({ title, description, role, tags, image, client, duration, slug, hasDetail }: WorkCardProps) {
  const content = (
    <>
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

        {hasDetail && slug && (
          <span className="text-sm font-mono text-gray-400 group-hover:text-accent transition-colors duration-300 mt-1">
            Case study →
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-6"
    >
      {hasDetail && slug ? (
        <a href={`/work/${slug}`} className="flex flex-col gap-6">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.article>
  );
}
```

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: succeeds (this component is only used through `work.astro`/`WorkPage`, which don't yet pass `slug`/`hasDetail` until Task 6 — so all five cards render exactly as before, unlinked, since both new props are `undefined`).

- [ ] **Step 3: Commit**

```bash
git add src/components/WorkCard.tsx
git commit -m "feat: let WorkCard link to its case-study detail page"
```

---

### Task 6: Wire slug/hasDetail through the work index page

**Files:**
- Modify: `src/pages/work.astro`

**Interfaces:**
- Consumes: `slug`/`hasDetail` props added to `WorkCardProps` in Task 5.

Current file:

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

- [ ] **Step 1: Add `slug` and `hasDetail` to the mapped entry**

Replace the `.map(...)` call with:

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
    slug: entry.id,
    hasDetail: !!entry.body?.trim(),
  }));
---

<Layout title="Work — Vinayak Gupta" description="Things I've built — professional work, side projects, and open source.">
  <WorkPage projects={sortedWork} client:load />
</Layout>
```

(Only the `.map()` body and the two new lines inside it change — imports and the `<Layout>`/`<WorkPage>` markup stay identical.)

- [ ] **Step 2: Verify the build succeeds and check the rendered output**

Run: `npm run build`
Expected: succeeds, still 8 pages (7 base + the one work detail page from Task 4).

Run: `grep -o 'href="/work/code-review-agent"[^>]*' dist/work/index.html` (or on PowerShell: `Select-String -Path dist/work/index.html -Pattern 'href="/work/code-review-agent"'`)
Expected: a match — the Code Review Agent card on `/work` now links to `/work/code-review-agent`. Confirm the other four cards do NOT have an `href` wrapping them (e.g. `grep -o 'href="/work/fintech-core"' dist/work/index.html` should have no output).

- [ ] **Step 3: Commit**

```bash
git add src/pages/work.astro
git commit -m "feat: link work cards to their case-study page when one exists"
```

---

## Final Verification (after all tasks)

1. `npm run build` succeeds end-to-end, 8 pages, and the built `/work/code-review-agent/index.html` contains no `<script` tag other than Astro's own hoisted module for the `reveal.ts` import (confirm via `grep -c '<script' dist/work/code-review-agent/index.html` — expect exactly 1, and it should be `type="module"`, not a React/Framer runtime chunk).
2. Start the dev server per `CLAUDE.md` (`astro dev --background`) and visually confirm in a browser:
   - `/work`: the Code Review Agent card shows the richer description/tags and a "Case study →" affordance that goes accent-blue only on hover; the other four cards are unchanged (unlinked, no footer link).
   - `/work/code-review-agent`: 12-column split renders (sticky rail on desktop, stacked on mobile widths); rail shows Role/Client/Timeline/Stack then an Impact section with bracketed placeholder values in ink, labels in gray; the architecture diagram shows 5 numbered steps connected by arrows (→ on desktop, ↓ on mobile), monochrome at rest, accent-blue border only on node hover; code fences render on the dark `#1e1e1e` background; the screenshot placeholder path renders as a broken image until the real asset is added (expected, per Open Items below); "← Back to Work" returns to `/work`.
3. Toggle OS-level reduced motion and confirm the reveal transitions are skipped (content still visible, just no animation) — this is inherited automatically from `reveal.ts`'s existing `prefers-reduced-motion` check, not new code, but worth eyeballing once.

## Open Items (owned by Vinayak, not blocking merge of this plan)

- Replace the four bracketed `[confirm...]` metric values in `src/content/work/code-review-agent.md` frontmatter and in the Results section prose with real numbers.
- Add `public/images/code-review-agent-pr.png` — the redacted PR-comment screenshot referenced by the case study's closing image.
- Replace the illustrative PowerShell/YAML snippets in the case study with the real sanitized versions (scrubbed of org/repo/secret specifics).
