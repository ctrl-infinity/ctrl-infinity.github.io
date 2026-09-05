# Databricks · Sr. Software Engineer, AI OSS Ecosystem (Singapore) · match report

**Fit: moderate.** The role builds open-source AI/ML platform tooling (this is the team behind MLflow and related projects) for training, deploying, and monitoring models and agents. Your internal platform work maps well, you have used Databricks in production, and you have used MLflow, which is this team's own product. The blocker is that the posting wants open-source contributions and you have none of substance.

- Variant: `docs/applications/resumes/databricks-sr-software-engineer.json`
- PDF: `docs/applications/pdf/databricks-sr-software-engineer.pdf` (2 pages; page 2 opens with the Tiger Analytics LLMOps bullet)

## What the posting weights

Building and maintaining tools and frameworks for AI/ML teams, platform integrations with ecosystem frameworks, the model and agent lifecycle (training, evaluation, deployment, monitoring), open-source community work, mentoring.

## Coverage

| Requirement | Status | Where |
|---|---|---|
| BS or higher in CS | Covered | MSc |
| 5+ years building production systems in Python, Scala, or Java | Partial | 4 years, Python and .NET. No Scala or Java |
| Tools and frameworks for AI/ML, ideally open source | Partial | Company-wide LLMOps framework, org-wide review agent, extensible orchestrator. All internal |
| AI/ML and AIOps concepts: training, deployment, monitoring | Covered | Deployment and monitoring strong; MLflow experiment and model tracking at Tiger Analytics; training pipelines lighter |
| Agent frameworks: LangChain, LlamaIndex, DSPy (preferred) | Partial | LangGraph in skills; Microsoft Agent Framework (builds on Semantic Kernel and AutoGen); A2A protocol. None of the three named ones |
| Significant open-source contributions (MLflow, PyTorch, etc.) (preferred) | Missing | Public repos are small and academic |
| Mentor junior engineers | Partial | Hackathon advisory to 10+ teams |
| Platform integrations with ecosystem frameworks | Partial | A2A integration layer, dynamic discovery, Azure AI Search ingestion and indexing pipelines |
| Databricks product familiarity | Covered | Databricks, PySpark, and MLflow at Tiger Analytics (bonus) |

## Changes versus the master resume

- **About** rewritten around ownership, going deep, taking initiative on unclaimed problems, and daily use of AI coding agents, with no tech stack named. Title reads "Software Engineer". Role lines: platforms other teams build on, maintaining and documenting what you ship, helping teams adopt it, and wanting to work in the open with the AI/ML community. Two achievements: the review agent and the company-wide workflow.
- **Skills**: the master's six categories, unchanged. Only the items differ: LLMOps/AIOps lifecycle, Microsoft Agent Framework (builds on Semantic Kernel and AutoGen), LangGraph, autonomous agents, Azure AI Search, tool use and structured outputs. MLflow leads the Cloud / LLMOps row, followed by model and prompt versioning. PowerShell and TypeScript under Languages. SSE streaming APIs under Web Technologies. Soft skills: ownership, mentoring, design and code review, technical documentation.
- **SimCorp**: the four master bullets are verbatim, each with one sentence appended: (1) developer-tooling framing with secretless auth, cost caps, fail-open, auditable runs, and metrics; (2) agent cards, central registry, response streaming over Server-Sent Events (SSE); (3) SonarQube and Mend scanning, integration tests, traceability tagging, and platform documentation; (4) reviewing designs and code for integrating teams. A short fifth bullet, placed before the Center of Excellence bullet, covers the Azure AI Search ingestion and indexing pipelines with semantic configuration, hybrid search, and metadata-based indexing.
- **Tiger Analytics**: same work, same order. Wording tuned to the posting and connected extensions added: RAG adds reusable modules other teams could integrate. LLMOps adds prompts and flows as code, evaluation in CI with experiments and models tracked in MLflow, adoption across units, and onboarding guides. FMCG names PySpark on Databricks. Analytics adds reusable parameterised jobs. Migration adds workflow templates and automated tests.
- **Projects**: Image Segmentation and Semantic IR, master text unchanged. The IR project now links to its repo.

## Verify before sending

These lines go beyond what your portfolio pages document. Keep each one only if it is true; delete it otherwise.

- SimCorp, bullet 3: "wrote the onboarding and operating documentation other teams use to integrate with the platform."
- SimCorp, bullet 4: "Review designs and code for teams integrating with the platform."
- Tiger RAG: "Packaged the retrieval and serving components as reusable modules other teams could integrate."
- Tiger LLMOps: "with documentation and onboarding guides I wrote."
- Tiger analytics: "reusable, parameterised jobs."
- Tiger migration: "reusable workflow templates, automated tests".

## Gaps to expect in screening

- "Significant contributions to open-source projects" is preferred, not required, but for an OSS Ecosystem team it will carry weight. This is the single highest-value gap to close before applying, and the fastest option is a few real merged PRs to MLflow or promptflow (see the gap analysis).
- MLflow depth. You have used it at Tiger; this team builds it. Be ready to talk about tracking, the registry, what frustrated you, and what you would change.
- The 5-year bar may be applied at screen.
- Expect Scala or Java questions to be waved through if Python depth is clear.

## Before you send

If you can land even one merged pull request in MLflow, LangChain, or Microsoft Agent Framework before applying, add it as a project and it changes the read of the whole resume. Otherwise apply as is and lean on Databricks and MLflow experience in the "Why this role" note.
