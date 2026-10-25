# Portfolio direction: initiative, made useful

Notebook identity agreed with Vinayak on 27 September 2026; evidence-first
positioning updated on 25 October 2026. The approved
[positioning design](superpowers/specs/2026-10-25-portfolio-positioning-design.md)
governs this update. Illustrations are not production screenshots.

## The impression to earn

"This person will help our team move forward."

Vinayak is a self-directed engineer who spots useful opportunities, learns what
is needed, and owns the path from idea to a working solution. Show a growing
ability to connect user needs, technical choices, team workflows, and operational
concerns without advertising an aspirational job title.

The narrative thread is **I build AI agents for real team workflows.**
AI Engineer is the professional identity. The actual SimCorp employment title,
Senior Software Engineer - MLOps, remains a separate fact. Introduce the person,
show the evidence, then explain the approach.

| Trait | Evidence and expression |
| --- | --- |
| Self-direction and agency | Explain what Vinayak initiated, not just assigned tasks. |
| Enthusiasm and fast application of technology | Connect experiments to a real team problem; show a usable demonstration. |
| Ownership beyond role boundaries | Make contributions to implementation, integration, infrastructure, and delivery explicit. |
| User focus | Lead with developer friction and the useful change, not a list of frameworks. |
| Reasoning and aptitude | Expose constraints, decisions, tradeoffs, and failure paths. Avoid self-rated intelligence claims. |
| AI engineering | Feature the reviewer and orchestration platform, with RAG as supporting evidence. |
| Collaboration | Show developer dialogue and describe helping teammates find a path forward. |
| Resourcefulness | Demonstrate small, well-scoped automation that leaves people time for higher-value work. |

## Visual authority

Keep the engineering-notebook identity: paper `#fafafa`, ink `#111111`, graphite
`#4b5563`, white artifact surfaces, hairline rules, sharp corners, and locally
hosted Geist Sans. Signal Blue `#2563eb` identifies interaction, not decoration.
Do not introduce gradients, stock dashboard imagery, skill meters, badge walls,
or a sales-deck statistics grid.

Use asymmetric layouts and a clear display/body scale. Give every major project
a meaningful artifact instead of dressing all content as identical cards.
On mobile, reflow diagrams into readable sequences rather than scaling them down.
Motion is optional, respects reduced motion, and never hides essential content.

### Editorial card refinement

On 27 September, Vinayak requested more distinct project and related cards:
subtle 3D newspaper-like sheets instead of an uninterrupted text list. Use closed
hairline borders, warm paper, thin layered edges, and restrained hover reflection
and lift. Apply this to Home/Work projects, Now entries, About practice cards,
and Playground cards. Keep articles and diagrams flat; keep interactive form
panels stationary. Preserve keyboard feedback and disable movement for touch
and reduced-motion preferences.

## Page contracts

### Navigation and consolidation

Approved on 25 October: **Home -> Work -> Resume -> Playground**. Use this
order in both desktop and mobile navigation. Home absorbs About and a compact
Now section; it is not a concatenation of the three existing pages.

The navigation includes an explicit Home link as well as the linked name.
Update internal links to the new homepage anchors. Preserve incoming `/about`
and `/now` URLs by forwarding them to `/#about` and `/#currently`, respectively,
including a usable link for visitors who do not follow an automatic redirect.

### Home: introduce, show evidence, explain the approach

The approved section order is:

1. **Meet Vinayak:** name, AI Engineer identity, actual role, and a concise
   introduction. "See the work" is primary; email remains available. Include
   "Noida, India. Open to roles in India and internationally."
2. **Selected work:** two compact editorial cards for the reviewer and
   orchestrator, with canonical maturity, usage scope, summaries and case links.
   Follow with a compact RAG link and its qualified reported outcome.
   No embedded dialogue, architecture diagram, full case study, or metric grid.
3. **How I think and work** (`#about`): combine the strongest Home/About
   material about curiosity, ownership, reasoning, and collaboration without
   repeated introductions. Retain the factual AI CoE / 10+ teams example.
4. **Currently** (`#currently`): a small dated section sourced from the existing
   Now collection, linking to the relevant work. Retain honest status/date
   semantics and keep the longer notes accessible through native disclosures
   rather than rendering the old Now page in full.
5. **Beyond code:** retain the existing personal interests, then the shared
   contact footer.

Preserve the newspaper-card material and typography system. The first screen
must communicate identity. Evidence follows immediately, ahead of principles;
there is no requirement to keep cards below a full viewport. Keep the old
"Curious by default. Useful by intention." tagline in the Home page title.

### Work: a gallery of useful systems

- Preserve professional / side-project / open-source filtering.
- Professional is the initial server-rendered and hydrated selection (six
  projects). All work includes eight collection entries, including the two in
  the closed "Earlier / academic" disclosure. Keep all four filters even for
  an empty collection; enable them only after hydration.
- Feature reviewer and orchestrator; follow with compact RAG, Git LLMOps, FMCG
  and Story-to-PR. Keep existing illustrations and display qualified outcomes
  separately from contribution and usage scope.
- Retain wireless/ANPR and semantic IR under their original categories in the
  earlier disclosure. Category changes collapse it without moving filter focus.
- Keep Image Segmentation as an ancillary GitHub link in All work, not a new
  collection entry or part of the count. A server-rendered "Other work" disclosure
  outside React links to both nonprofessional projects and that repository,
  including when scripts fail or stall. Hide it only after hydration succeeds
  and focus is outside it.
- Preview the actual mechanism: review dialogue, story-to-PR sequence,
  independently connected agents, or retrieval stages.
- Separate concise summaries and personal contribution from full descriptions.
- Keep every existing project discoverable. Never invent a preview or hide a
  project merely because it has less visual material.

### Case studies: understand, follow, inspect

1. Understand the user problem and Vinayak's scope at a glance.
2. Follow a conceptual system map without reading a long article.
3. Inspect a stage for its responsibility, design choice, and failure handling.
4. Read the original technical write-up for depth.
5. Distinguish measured outcomes from system facts such as protocol or runtime.

The review agent is the most detailed example: Trigger -> Context -> Review ->
Publish. The original project material supports project-wide hooks, capped
diffs, linked work items, read-only review tools, structured findings, comment
reconciliation, and recommending human review on failure. Interactive developer
experience was confirmed by Vinayak during this discussion.

No interactive control may be a dead mockup. Core information remains available
without JavaScript; use semantic disclosure controls for supplementary detail.

### About: integrated into Home

About is no longer a separate navigation destination. Merge its personal
introduction, practical learning, collaboration evidence, and outside-of-code
copy into the homepage. Consolidate overlapping working principles and capability
descriptions instead of duplicating them. Keep the sense of connecting data,
intelligence, and delivery without a second skills list or fabricated timeline.

### Currently: a compact homepage notebook

- Preserve active, exploring, and paused states.
- Use explicit editorial review dates; never derive freshness from build time.
- Separate current work from open questions. Do not invent future commitments.
- Link current work back to its case study.
- Reuse the Now collection as the source; do not maintain a second copy of the
  same project notes. Longer descriptions remain accessible via native details.
- Handle an empty collection by omitting entry controls and displaying an honest
  "No current notes published" message at the retained `#currently` anchor.

### Playground: how I explain a system

- Ship a small deterministic, browser-only experiment rather than placeholder
  cards or a fake live AI chat.
- Let visitors change request conditions and inspect a dispatch policy.
- Label the inputs, output, and limitations: illustrative simulation, no model,
  backend, credentials, telemetry feed, or production benchmark.
- Keep the playground collection and detail routes extensible.

### Resume: a utility surface

Keep existing experience, education, the PDF URL, and confirmed factual claims.
Shared navigation, typography, focus treatment, and contact details should remain
consistent with the rest of the portfolio.

The Resume page now uses the shared main-page heading, shell, and primary action,
with editorial paper cards for experience, projects, and education. Keep dense
reading cards stationary, metadata legible, and skills in a ruled list. All
published content remains visible without JavaScript; native section links support
quick navigation through the page. The identity is AI Engineer, with broad India/
international mobility. Use the approved four skills groups and 21 entries.
Replace academic resume projects with reviewer, orchestrator and RAG, preserving
their truthful milestones, scope and reported-results qualifiers.
Label `#resume-projects` "Selected professional work", and use absolute case-study
URLs in both web and PDF. Do not display GPA. Regenerate the actual PDF locally
or through authorized existing CI, then inspect all pages and links; the target
is at most two legible A4 pages. Do not use an external compilation API.

## Truth and content boundaries

- Confirmed on 25 October 2026: the reviewer is a self-initiated internal tool,
  actively used since July 2026 for approximately 30-40 PRs/month across 5-6
  repositories. Team feedback followed launch; no measured savings are claimed.
- The orchestrator has been in UAT since March 2026 with five agents onboarded.
  Production/staging environment architecture is not proof of a production
  launch. Preserve DevOps ownership versus contributions to the wider system.
- Existing Markdown and resume data are the source for project and contact facts.
- The story-to-PR project is based on Vinayak's own description: an automatic
  workflow takes trivial, refined stories and raises PRs. Its exact stack,
  deployment maturity, measured savings, and implementation internals have not
  been provided. Do not invent them.
- Illustrative review exchanges must always be labeled, including compact
  previews. They are not transcripts, recordings, or evidence of particular PRs.
- Keep existing reported metrics, but do not manufacture baselines, sample
  windows, evaluation datasets, latency charts, or usage counters.
- No GitHub activity integration is wired. Do not display fabricated activity.
- Real redacted captures, metrics methodology, and further project-specific
  tradeoffs can replace illustrative material when supplied.

## Implementation and acceptance

Use Astro content collections and small reusable visual components. Keep React
only where the existing gallery needs client-side filtering; use native HTML
and small scripts for other interactions. No new UI framework or cloud service.

Acceptance: all existing routes remain available, the new workflow has a real
case-study route, filtering works, diagrams and demos work by keyboard and touch,
mobile pages have no horizontal overflow, reduced motion is respected, and the
site builds with the project's supported Node version. Preview locally; do not
publish or change the deployed site as part of this task.

For the consolidation, also verify identical four-item navigation on desktop
and mobile, Home active state, all old About/Now entry paths, working section
anchors below the fixed header, and no-JavaScript access to the current notes.
At 1440x900 and 390x844, the first viewport must introduce Vinayak, with the
AI Engineer role and workflow statement visible. The homepage contains exactly
two compact selected-work cards and one supporting RAG entry.
Work, Playground, Resume, all case studies, and the PDF retain their behavior.
