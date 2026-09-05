# Mastercard · Senior AI Engineer, AI Foundations (Singapore, hybrid) · match report

**Fit: strong.** This is the closest match to your actual title and work: operationalising AI systems with CI/CD, versioning, monitoring, guardrails, and responsible AI, plus data and feature pipelines. The mobile payments RAG project is a direct domain signal, and the Azure AI Search work covers the "embedding and vector workflows" line directly. The remaining gaps are drift detection, feature stores, and retraining automation.

- Variant: `docs/applications/resumes/mastercard-senior-ai-engineer.json`
- PDF: `docs/applications/pdf/mastercard-senior-ai-engineer.pdf` (2 pages; page 2 opens with the Tiger Analytics Analyst role)

## What the posting weights

End-to-end MLOps: training pipelines, deployment frameworks, versioning, monitoring, drift detection, retraining automation; data and feature pipelines including vector and feature stores; model evaluation and tuning; fine-tuning, RAG, guardrails; production services; mentoring; responsible AI.

## Coverage

| Requirement | Status | Where |
|---|---|---|
| Operationalising ML end to end: training, deployment, versioning, monitoring | Covered | LLMOps workflow, platform operations |
| CI/CD for ML: test automation, release pipelines, reproducibility, registry | Covered | Per-PR evaluation, approval gates, audit trail, MLflow experiment tracking and model registry at Tiger Analytics |
| Model performance monitoring, drift detection, telemetry, incident triage | Partial | Tracing and telemetry strong. No drift detection or retraining automation |
| Data ingestion, preprocessing, feature engineering (batch or streaming) | Covered | Databricks, ADF, SQL. Batch only |
| Feature pipelines and embedding or vector workflows | Covered | Azure AI Search ingestion, embedding, and indexing pipelines at SimCorp; embedding index in the mobile payments RAG. No feature store |
| Model evaluation, hyperparameter tuning, validation | Partial | LLM evaluation strong. Classical tuning is MSc-level |
| Fine-tuning and RAG patterns | Partial | RAG strong. No fine-tuning |
| Production services and APIs integrating AI workflows | Covered | Orchestrator, code-review agent, RAG service |
| Clean architecture, tests, performance, reliability engineering | Covered | Resilience patterns, quality gates |
| Independent delivery and cross-functional partnership | Covered | Owns platform operations; hackathon advisory |
| Mentoring, design and code review | Covered | Review agent; advisory to 10+ teams |
| Responsible AI, guardrails, operational stability | Covered | Least privilege, cost caps, fail-open, tenant isolation |
| Security posture (corporate security responsibility) | Covered | SAST/SCA, Key Vault, managed identities |
| Payments domain | Covered | Mobile payments RAG (bonus) |

## Changes versus the master resume

- **About** rewritten around ownership, going deep, taking initiative on unclaimed problems, and daily use of AI coding agents, with no tech stack named. Title reads "Senior AI Engineer". Role lines: a high bar for reliability, security, and responsible use, and raising the bar for others through reviews and mentoring. Two achievements: the review agent and the company-wide workflow.
- **Skills**: the master's six categories, unchanged. Only the items differ: embeddings, vector and hybrid search, Azure AI Search, Pinecone, multi-agent systems (A2A, Microsoft Agent Framework), guardrails and responsible AI, model evaluation and hyperparameter tuning. Cloud / LLMOps: CI/CD for ML, MLflow (experiment tracking, model registry), model and prompt versioning, model serving, monitoring and tracing, Key Vault, SAST/SCA. Data Engineering names ingestion, embedding, and indexing pipelines. Soft skills: ownership, independent delivery, mentoring and code review. No SSE or GCP here; the posting's "streaming" means data streaming and it does not ask for a second cloud.
- **SimCorp**: the four master bullets are verbatim, each with one sentence appended: (1) production guardrails and the metrics; (2) stability and incident triage across team boundaries; (3) automated tests, scanning, integration tests, traceability, managed identities; (4) mentoring through reviews. A fifth bullet, placed before the Center of Excellence bullet, covers the Azure AI Search RAG work: automated document ingestion, embedding, and indexing pipelines, semantic configuration, hybrid (vector and keyword) search, and metadata-based indexing.
- **Tiger Analytics**: same work, same order. Wording tuned to the posting and connected extensions added: RAG adds the ingestion, chunking, and embedding pipeline and a labelled query set. LLMOps adds versioned prompts, MLflow experiment tracking and model registry, precision, recall, and safety in CI, and the audit trail. FMCG adds reusable feature tables. Analytics adds data-quality checks and refresh monitoring. Migration adds automated tests and security scanning.
- **Projects**: Image Segmentation and Semantic IR, master text unchanged. The IR project now links to its repo.

## Verify before sending

These lines go beyond what your portfolio pages document. Keep each one only if it is true; delete it otherwise.

- SimCorp, bullet 4: "Mentor engineers through design and code reviews."
- Tiger RAG: "validated retrieval quality against a labelled query set before each release."
- Tiger LLMOps: "tracked experiments and registered models in MLflow" (you have confirmed MLflow; confirm the registry part specifically).
- Tiger FMCG: "reusable feature tables for downstream analytics and modelling."
- Tiger analytics: "data-quality checks and refresh monitoring."
- Tiger migration: "automated tests".

## Gaps to expect in screening

- Drift detection, feature stores, and retraining automation are named repeatedly. Be ready to describe how you would build them, and consider the MLOps project in the gap analysis so you can point at real code.
- Fine-tuning will come up. Answer with evaluation depth and the RAG-versus-fine-tune tradeoffs you have actually made.
- Streaming data (Kafka or Event Hubs) is mentioned as "batch and/or streaming". Batch is fine, but do not overclaim; the SSE response streaming in the orchestrator is a different thing.

## Before you send

This is the application I would prioritise. Write two lines in `## Why this role` connecting the mobile payments RAG work to Mastercard's domain.
