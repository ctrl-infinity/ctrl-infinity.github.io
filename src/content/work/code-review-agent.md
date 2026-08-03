---
title: "Code Review Agent for Azure DevOps"
description: "Designed and shipped an org-wide, autonomous AI code-review agent (Claude Code) that reviews every pull request across all Azure DevOps repos via a webhook-triggered CI pipeline — zero per-repo configuration, schema-constrained findings, and idempotent, marker-based comment reconciliation."
role: "Senior Engineer - MLOps"
category: "professional"
tags: ["PowerShell", "Azure DevOps", "Claude Code", "Service Hooks", "LLM Agents", "CI/CD"]
client: "SimCorp / Enterprise Team"
duration: "2024"
problem: >-
  Every pull request sat in a queue until someone had time to look at it. On a busy day that meant
  hours between "ready for review" and the first real comment — and when reviewers were slammed,
  the first pass was inconsistent: some PRs got a thorough read, others got a superficial pass.
  Rolling this out org-wide meant it also had to work identically across every repo, with no
  per-team setup, and it had to be trustworthy enough to run unattended with real write access to
  PR threads.
order: 2
metrics:
  - label: "Turnaround"
    value: "-70%"
  - label: "PRs reviewed"
    value: "400+"
  - label: "Engineers"
    value: "15+"
  - label: "Flagged early"
    value: "35%"
---

## Running Underneath Every Stage

- **Cost & size caps** — Diff-size and turn-budget limits; per-run spend is logged in the comment footer.
- **Secretless auth** — Workload Identity Federation for the pipeline's service principal — no client secret stored anywhere.
- **Fail-open** — Any step's failure posts "a human review is recommended" rather than breaking the pipeline.
- **Auditable runs** — Every run is stamped with repo, PR, branches, and trigger type, so a spurious run is obvious at a glance.

## Results

First-review turnaround dropped by **70%**, the agent has reviewed **over 400 pull requests** across **15+ engineers** on the team, and it catches real issues **35%** of the time before a human reviewer even opens the diff.
