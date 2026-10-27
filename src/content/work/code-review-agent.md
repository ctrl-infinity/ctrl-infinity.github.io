---
title: "Code Review Agent for Azure DevOps"
description: "Initiated and built an internal Claude Code reviewer to address the team's review bottleneck. Actively used since July 2026, with schema-constrained findings and idempotent comment reconciliation."
summary: "An AI code reviewer with an interactive developer experience, built to help teammates discuss findings and move forward."
contribution: "Agent design, project-wide integration, and delivery."
outcome: "A consistent first pass without per-repository setup."
visual: "review"
status: "active-use"
evidence: "Approximately 30-40 PRs/month across 5-6 repositories."
role: "Senior Engineer - MLOps"
category: "professional"
tags: ["PowerShell", "Azure DevOps", "Claude Code", "Service Hooks", "LLM Agents", "CI/CD"]
client: "SimCorp / Enterprise Team"
duration: "July 2026"
problem: >-
  Pull requests were creating a review bottleneck for our team. I initiated and built
  an automated first pass so reviewers had a consistent starting point. A central
  pipeline avoids per-repository setup, while a deliberate boundary separates
  read-only inspection from publishing feedback to PR threads.
order: 1
featured: true
---

## Running Underneath Every Stage

- **Run limits** — Diff-size and turn-budget limits; per-run spend is logged in the comment footer.
- **Secretless auth** — Workload Identity Federation for the pipeline's service principal — no client secret stored anywhere.
- **Fail-open** — Any step's failure posts "a human review is recommended" rather than breaking the pipeline.
- **Auditable runs** — Every run is stamped with repo, PR, branches, and trigger type, so a spurious run is obvious at a glance.

## Results

The reviewer has been in active team use since July 2026. It handles approximately
30-40 PRs per month across 5-6 repositories. These are approximate usage figures,
not a measured reduction in review time or a review-accuracy benchmark.

I drove the initiative from the initial idea through delivery. Once it was live,
teammates provided feedback and I worked on the fixes.

The agent provides automated first-pass feedback without per-repository setup.
It reconciles existing comments to avoid duplicate threads as pull requests
change, giving human reviewers a consistent starting point for their own review.
