# Apple · Software Engineer, Generative AI & ML (Singapore) · match report

**Fit: weak on hard requirements, strong on the day-to-day work.** The team's work (multi-turn agentic conversational platform, retrieval strategies, latency and cost) is close to what you build. But the minimum qualifications include items you do not meet, and two of them cannot be tailored around.

- Variant: `docs/applications/resumes/apple-software-engineer-generative-ai-ml.json`
- PDF: `docs/applications/pdf/apple-software-engineer-generative-ai-ml.pdf` (2 pages; page 2 opens with the Tiger Analytics LLMOps bullet)

## What the posting weights

Multi-agent conversational LLM applications, retrieval and grounding, model fine-tuning and evaluation, scalable deployment and monitoring, localisation across markets. Minimum qualifications are unusually specific.

## Coverage

| Requirement | Status | Where |
|---|---|---|
| 5+ years hands-on ML, backend, or data engineering | Missing | You have 4 years (Sept 2022 to now) |
| 1 to 2 years training, fine-tuning, or evaluating LLMs | Partial | Evaluation since 2024 is solid. No fine-tuning evidence |
| RAG architectures and vector retrieval | Covered | Azure AI Search RAG at SimCorp (semantic configuration, hybrid search, metadata indexing); mobile payments RAG; Semantic IR project |
| Multi-agent orchestration frameworks in Rust and Python | Partial | Python and .NET with Microsoft Agent Framework and LangGraph. No Rust |
| PyTorch, TensorFlow, or JAX | Covered | TensorFlow on resume; PyTorch listed on your site, so included. Confirm you can defend it |
| Data preprocessing, tokenisation, pipeline automation | Covered | Tiger Analytics pipelines; IR project |
| transformers and datasets libraries | Missing | Not evidenced anywhere |
| Multi-modal LLMs, STT or TTS | Missing | Listed as a plus only |
| Deployment to AWS, GCP, or hybrid (required) | Partial | GCP from personal projects, now in skills. Professional deployment is Azure only |
| Training or evaluating LLMs in Chinese; fluent Chinese | Missing | Assumed not applicable. Tell me if this is wrong |
| Partnering with business and engineering teams | Covered | Hackathon advisory, cross-team platform |
| Bachelor's or Master's in CS or ML | Covered | MSc |

## Changes versus the master resume

- **About** rewritten around ownership, going deep, taking initiative on unclaimed problems, and daily use of AI coding agents, with no tech stack named. Title reads "Software Engineer". Role lines: the customer experience behind latency and cost numbers, and working in the open with researchers, data scientists, and partner teams. Achievement: the review agent and the 70% turnaround cut.
- **Skills**: the master's six categories, unchanged. Only the items differ: LLM evaluation and benchmarking, vector, semantic and hybrid search, Azure AI Search, Pinecone, Microsoft Agent Framework (builds on Semantic Kernel and AutoGen), LangGraph, conversational and streaming agents (SSE), PyTorch, CNN and RNN, data preprocessing and tokenisation, pipeline automation. GCP (personal projects) and MLflow under Cloud / LLMOps. SSE streaming APIs under Web Technologies. Soft skills: fast learning and adaptability.
- **SimCorp**: the four master bullets are verbatim, each with one sentence appended: (1) the three measured metrics; (2) AG-UI streaming over Server-Sent Events (SSE) and latency protection; (3) SAST/SCA, smoke tests, latency monitoring; (4) architecture discussions with partner teams. A fifth bullet, placed before the Center of Excellence bullet, covers the Azure AI Search RAG work: automated ingestion and indexing pipelines, semantic configuration, hybrid (vector and keyword) search, and metadata-based indexing.
- **Tiger Analytics**: same work, same order. Wording tuned to the posting and connected extensions added: RAG adds retrieval strategies evaluated against a labelled query set and reduced hallucination. LLMOps adds accuracy and safety metrics per prompt change, experiments tracked in MLflow, and the audit trail. FMCG adds preprocessing and tokenisation of product text. Analytics adds pipeline monitoring. Migration adds automated tests.
- **Projects**: Image Segmentation and Semantic IR, master text unchanged. The IR project now links to its repo.

## Verify before sending

These lines go beyond what your portfolio pages document. Keep each one only if it is true; delete it otherwise.

- SimCorp, bullet 3: "the tracing feeds latency monitoring across agents."
- SimCorp, bullet 4: "Take part in architecture discussions with partner teams onboarding new domain agents."
- Tiger RAG: "against a labelled query set."
- Tiger FMCG: "preprocessing and tokenisation of unstructured product text for downstream features."
- Tiger analytics: "pipeline monitoring so refresh failures were caught before they reached users."
- Tiger migration: "automated tests".
- Skills: "PyTorch" rests on your About page, not the master resume.

## Gaps to expect in screening

- The Chinese-language requirement is a likely knockout filter. GCP is now on the resume from personal projects, so expect a question on production depth there. Apply only if you accept a low pass rate at the screen, or if you have a referral who can vouch for the team waiving the language requirement.
- The 5-year bar may be enforced automatically. Nothing on the resume can change that.
- Expect a question on fine-tuning. The honest answer today is evaluation-only.

## Before you send

Consider a short note in the application explaining that professional deployment has been on Azure, with GCP from personal projects, and that the patterns (container apps, managed identities, IaC, tracing) transfer directly.
