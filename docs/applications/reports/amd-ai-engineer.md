# AMD · AI Engineer (Singapore) · match report

**Fit: strong.** The posting is an agentic-AI and forward-deployment role. Your two SimCorp systems and the Azure AI Search RAG work are direct evidence for almost every responsibility. The one caution is level: the posting says "early-career engineers", and your resume shows 4 years and a Senior title. Expect the compensation band to sit below your current level.

- Variant: `docs/applications/resumes/amd-ai-engineer.json`
- PDF: `docs/applications/pdf/amd-ai-engineer.pdf` (2 pages; page 2 opens with the Tiger Analytics LLMOps bullet)

## What the posting weights

Agentic AI (multi-step agents, tool use, orchestration, structured outputs), prompt and context engineering, RAG over enterprise knowledge, evaluation, then forward deployment into business processes with monitoring and stakeholder work. Python plus cloud, containers, CI/CD.

## Coverage

| Requirement | Status | Where |
|---|---|---|
| Agents with multi-step reasoning and workflow execution | Covered | Code-review agent; orchestration platform |
| LLMs, tool use, memory, orchestration frameworks | Covered | Microsoft Agent Framework (builds on Semantic Kernel and AutoGen), Claude Code |
| Function calling, structured outputs, automated workflows | Covered | Schema-constrained findings; skills row |
| RAG pipelines over enterprise knowledge | Covered | Azure AI Search RAG at SimCorp; mobile payments RAG at Tiger |
| Performance, reliability, scalability, response quality | Covered | -60% latency; circuit breakers, retry, fallback |
| Evaluation and benchmarking | Covered | LLMOps eval jobs per pull request |
| System prompts, grounding, hallucination reduction | Covered | Context pipeline bullet; hybrid search and metadata-based indexing; "reduced hallucinated answers" |
| Deploy into real business processes, integrate APIs and DBs | Covered | Agent runs in every repo; Cosmos DB, webhooks |
| Stakeholder collaboration, requirements refinement | Covered | Hackathon advisory; client work at Tiger |
| Monitoring, logging, testing, observability | Covered | OpenTelemetry, Azure Monitor, smoke tests |
| Azure OpenAI, Anthropic, OpenAI, Gemini | Covered | Azure OpenAI, Anthropic Claude |
| Vector databases (Pinecone, Weaviate, Chroma, Milvus, Azure AI Search) | Covered | Azure AI Search in the SimCorp RAG bullet: ingestion and indexing pipelines, semantic configuration, hybrid search, metadata-based indexing. Azure AI Search and Pinecone in skills |
| LangChain, LangGraph, CrewAI, LlamaIndex, AutoGen, Semantic Kernel | Covered | Microsoft Agent Framework, described as building on Semantic Kernel and AutoGen; LangGraph in skills |
| Cloud platforms: Azure, AWS, GCP | Covered | Azure in production; GCP from personal projects, in skills |
| Docker, Kubernetes, CI/CD, Git | Covered | Skills and experience |
| Degree in CS or related | Covered | MSc Machine Intelligence |

## Changes versus the master resume

- **About** rewritten around ownership, going deep, taking initiative on unclaimed problems, and daily use of AI coding agents, with no tech stack named. Title reads "AI Engineer". Role lines: working directly with business stakeholders and turning a process into a reliable digital worker. Achievement: the review agent and the 70% turnaround cut.
- **Skills**: the master's six categories, unchanged. Only the items differ: agents and orchestration, Microsoft Agent Framework (builds on Semantic Kernel and AutoGen), LangGraph, function calling and structured outputs, Azure AI Search, Pinecone, embeddings with semantic and hybrid search, prompt and context engineering, LLM evaluation, Anthropic Claude. GCP (personal projects) under Cloud / LLMOps. REST APIs and JSON under Data Engineering. SSE streaming APIs under Web Technologies. Soft skills reworded to the posting's traits.
- **SimCorp**: the four master bullets are verbatim, each with one sentence appended: (1) prompt and context design, cost caps, fail-open, and the three metrics; (2) agent-card discovery and response streaming over Server-Sent Events (SSE); (3) SAST/SCA, smoke tests, monitoring deployed agents; (4) stakeholder scoping. A fifth bullet, placed before the Center of Excellence bullet, covers the Azure AI Search RAG work: automated document ingestion and indexing pipelines, semantic configuration, hybrid (vector and keyword) search, and metadata-based indexing.
- **Tiger Analytics**: same work, same order. Wording tuned to the posting and connected extensions added: RAG adds chunking and grounding strategy, system prompts, and an evaluation set. LLMOps adds per-PR evaluation. FMCG adds REST APIs. Analytics adds data-quality checks and monitoring. Migration adds automated tests. MLflow is left out here; the posting does not ask for it.
- **Projects**: Image Segmentation and Semantic IR, master text unchanged. The IR project now links to its repo.

## Verify before sending

These lines go beyond what your portfolio pages document. Keep each one only if it is true; delete it otherwise.

- SimCorp, bullet 4: "Worked directly with business stakeholders to scope use cases and refine requirements."
- Tiger RAG: "built an evaluation set of real support queries to measure hallucination and answer consistency across prompt iterations."
- Tiger FMCG: "exposed through REST APIs consumed by the platform's business applications."
- Tiger analytics: "data-quality checks and monitoring so failures surfaced before business users saw stale reports."
- Tiger migration: "automated tests".

## Gaps to expect in screening

- If the posting truly targets early-career hires, a recruiter may see the Senior title as a mismatch. Decide whether you would accept the band before applying.
- Expect depth questions on the Azure AI Search setup: index schema, semantic configuration, how hybrid ranking was tuned, and how metadata filters were applied at query time.
- Expect a question mapping Microsoft Agent Framework concepts onto LangGraph or Semantic Kernel, and one on what you have built with LangGraph specifically.

## Before you send

Fill in `## Why this role` in the JD file if you want a cover note. Confirm the "Anthropic Claude" skill item is one you are comfortable defending as production use, since it rests on Claude Code.
