# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily recruiters and hiring managers evaluating Vinayak for a role — skimming quickly, comparing candidates, looking for proof of real shipped work rather than a pitch. Secondarily, a personal record for Vinayak himself and fellow builders to see what he's actively working on, not just a static list of past credentials.

## Product Purpose

A personal developer portfolio whose primary goal is landing a job or role. It exists to convince a hiring manager, within seconds, that Vinayak ships real production work and owns problems end-to-end — while doubling as an honest, current log of what he's building. Success looks like a recruiter or hiring manager reaching out convinced, not just impressed.

## Positioning

Judge me by what's live right now. This isn't a static resume dressed up as a website — `/now` and `/playground` prove an actively building engineer, not a portfolio that stopped updating the day it shipped.

**I build AI tools that help people.** A self-directed engineer who spots useful
opportunities, learns what is needed, and takes ownership of an end-to-end result.
Show the connection between user needs, technical decisions, collaboration, and
delivery; do not advertise an aspirational title or self-rated aptitude.

The agreed page-by-page narrative, visual evidence strategy, and content
boundaries are recorded in [the portfolio design brief](docs/portfolio-design.md).

## Operating Context

- **Primary CTA:** Email / Get in touch.
- **Secondary Path:** "See what I've built → `/work`".
- **Belief Ladder:**
  1. This is real, shipped production work, not toy demos or vague claims.
  2. Beyond writing code, Vinayak takes end-to-end ownership, thinking in terms of the whole problem rather than his assigned slice.
  3. He is building right now, not just listing past credentials.
  4. Reaching out is worth a hiring manager's time.

## Capabilities and Constraints

- Unified `src/content/work/` collection rendered on `/work` with category filtering (professional / side-project / open-source).
- Key site sections include `/work`, `/now`, `/playground`, and `/about`.
- Technical stack: Astro (no generic SaaS / AI aesthetic).
- **Anti-references:** Consultant sales-deck framing (stats-grid "engineer spec" sections, "Book a call" CTAs, service tiers), purple gradients, glassmorphism as decoration, hero-metric templates, stiff formal resume PDF energy.

## Brand Commitments

- **Tone & Voice:** Hacker/builder with warmth — functional and human, not flashy or salesy. Copy is first-person and conversational. Confident without performing confidence; the work is the proof, not the adjectives describing it.
- **Visual Identity Constraints:** All corners remain sharp (zero `border-radius` except specific timeline dots). Signal Blue (`#2563eb`) held in reserve for single active state at a time. Hairline borders (`#0000001a` / `#0000000d`) for separation.

## Evidence on Hand

- Case studies and project write-ups in `src/content/work/`.
- A person-first Home merges About and a compact Currently notebook. Navigation
  is Home, Work, Playground, Resume; old About/Now links remain compatible.
- Active building proof via the homepage Currently section and `/playground`.
- Vinayak confirmed an interactive developer experience for the review agent and
  a story-to-PR workflow for trivial, refined user stories. The latter's exact
  stack and measured impact are not yet documented.
- Illustrative conversations and browser-only simulations are teaching artifacts,
  not production recordings or live AI integrations. Label them wherever shown.
- Absence note: GitHub activity integration (`github.com/ctrl-infinity`) is not yet wired up; future work must not fabricate GitHub metrics until connected.

## Product Principles

1. **Show, don't pitch:** `/now` and `/playground` demonstrate ongoing activity in real time rather than asserting it in prose.
2. **Ownership over task-listing:** Content foregrounds end-to-end thinking rather than a stacked list of responsibilities.
3. **Practice what you preach:** The site itself reads as fast, honest, and unglossy — the same ship-quality claimed for its author.
4. **Focused call to action:** Email is the primary ask, `/work` is the main supporting path.
5. **Human voice:** Reads like Vinayak speaking directly to the visitor.

## Accessibility & Inclusion

Standard WCAG AA baseline: sufficient color contrast, full keyboard navigation, and a `prefers-reduced-motion` alternative for motion-driven reveals.
