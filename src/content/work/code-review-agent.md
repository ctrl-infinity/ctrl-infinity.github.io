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
