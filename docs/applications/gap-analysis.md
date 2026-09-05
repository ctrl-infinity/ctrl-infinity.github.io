# Portfolio gap analysis across the four saved roles

Roles analysed: AMD AI Engineer, Apple Software Engineer (Generative AI & ML), Databricks Sr. Software Engineer (AI OSS Ecosystem), Mastercard Senior AI Engineer (AI Foundations). All four are in Singapore.

Sources: the master resume, the seven portfolio work entries, the two Now entries, the About page, your public GitHub, the four job descriptions, and the facts you added on 2 September 2026 (Azure AI Search RAG work at SimCorp, Microsoft Agent Framework lineage, LangGraph, GCP from personal projects, SSE streaming in the orchestrator, MLflow at Tiger Analytics).

## The short version

1. **Nothing public and recent.** Every project on the resume and the site's project entries dates from 2021 to 2022 and is academic. Your strongest work is internal and unverifiable. Three of the four postings ask, directly or indirectly, for public evidence.
2. **The ecosystem vocabulary was missing; most of it is now in.** Azure AI Search, Pinecone, LangGraph, MLflow, and SSE streaming are on the variants where they are relevant. Still absent: Hugging Face libraries, feature store, drift monitoring, and any named evaluation tool.
3. **Azure in production, GCP only personal.** Apple requires AWS or GCP. GCP now appears in the AMD and Apple skills from personal projects. One deployed project on AWS or GCP would turn that into evidence that survives a screen.
4. **Four years against a five-year bar.** Apple, Databricks, and Mastercard (implicitly, by "Senior") sit at 5+. You cannot fix this, but you can make the four years read as denser than most.
5. **No fine-tuning, no classical MLOps loop.** Evaluation is strong and MLflow now covers tracking and registry, but training pipelines, hyperparameter tuning, drift detection, and retraining automation are absent. Mastercard's posting is built around that loop.
6. **The site contradicts the resume in places, and is missing the AI Search work.** Fixable in an afternoon, and worth doing before any recruiter opens both.

## Requirements heatmap

Legend: Yes = evidenced on the resume or site. Partial = adjacent evidence, no direct claim. No = nothing to point at.

| Requirement | AMD | Apple | Databricks | Mastercard | Your evidence |
|---|---|---|---|---|---|
| Agentic systems: tool use, orchestration, structured outputs | Yes | Yes | Yes | Yes | Code-review agent, A2A orchestrator |
| RAG and vector retrieval | Yes | Yes | Yes | Yes | Azure AI Search RAG at SimCorp, mobile payments RAG, Semantic IR |
| LLM evaluation and benchmarking | Yes | Yes | Yes | Yes | Git-based LLMOps evaluation |
| Prompt and context engineering | Yes | Yes | n/a | Partial | Context pipeline in the review agent |
| Production deployment, containers, CI/CD | Yes | Yes | Yes | Yes | Whole SimCorp platform |
| Observability, tracing, monitoring | Yes | Yes | Yes | Yes | OpenTelemetry, Azure Monitor |
| Guardrails, security, responsible AI | n/a | n/a | n/a | Yes | Least privilege, cost caps, tenant isolation |
| Stakeholder and cross-team work, mentoring | Yes | Yes | Partial | Yes | Hackathon advisory, client projects |
| Data pipelines, batch | Partial | Yes | Yes | Yes | Databricks, ADF, SQL |
| Named vector DB (Pinecone, Weaviate, Chroma, Milvus, Azure AI Search) | Yes | Yes | Yes | Yes | Azure AI Search at SimCorp: ingestion and indexing pipelines, semantic configuration, hybrid search, metadata indexing. Pinecone in skills |
| Named agent framework (LangChain, LangGraph, LlamaIndex, DSPy, AutoGen, Semantic Kernel, CrewAI) | Yes | Yes | Partial | n/a | Microsoft Agent Framework (builds on Semantic Kernel and AutoGen); LangGraph in skills. LangChain, LlamaIndex, DSPy still absent |
| Fine-tuning LLMs | n/a | No | n/a | No | None |
| Hugging Face transformers and datasets, PyTorch | n/a | No | Partial | Partial | PyTorch on site only |
| Model registry, drift detection, retraining automation | n/a | n/a | Partial | Partial | MLflow tracking and registry at Tiger Analytics. No drift detection or retraining |
| Feature store, streaming data | n/a | n/a | n/a | No | None. The orchestrator streams responses over SSE, which is API streaming, not data streaming |
| Open-source contributions | n/a | n/a | No | n/a | Small academic repos |
| AWS or GCP | Partial | Partial | n/a | n/a | GCP from personal projects, in skills. Production is Azure only |
| 5+ years experience | n/a | No | No | Partial | 4 years |
| Scala or Java | n/a | n/a | No | n/a | Python, C#, Go, JS |
| Rust | n/a | No | n/a | n/a | None |
| Multimodal, voice (STT/TTS) | n/a | No | n/a | n/a | None |
| Chinese language | n/a | No | n/a | n/a | Assumed none |

## Experience gaps

- **Years.** Sept 2022 to Sept 2026 is 4 years. The tailored summaries say "4 years" plainly and let the density of the SimCorp work argue the seniority. Do not round up.
- **Fine-tuning.** Two of four postings name it. You have evaluation depth but no training run to point at. One small, documented LoRA fine-tune with a proper eval closes this.
- **Classical MLOps loop.** Mastercard lists training pipelines, hyperparameter tuning, model registry, drift detection, retraining automation, feature stores. MLflow now covers tracking and the registry. The rest is still missing: the artefacts differ and the words are absent.
- **Open source.** Databricks' AI OSS Ecosystem team will read your GitHub. Today it shows a portfolio site, a June 2026 YouTube Shorts well-being prototype, and forks from 2020 and 2021. No merged PRs to any ecosystem project.
- **Second cloud.** Azure depth is real and should stay front and centre. GCP from personal projects is now in the AMD and Apple skills. A single deployed project on AWS or GCP would turn that into evidence that survives a screen.
- **Multimodal, Rust, Chinese.** Apple-specific. Not worth chasing unless you want that role above all others.

## Keyword gaps

Terms that appear in the postings and still nowhere in your materials. Add only the ones you can defend in an interview.

- Vector stores: FAISS, Chroma, Weaviate, Milvus. Azure AI Search and Pinecone are now covered.
- Agent frameworks: LangChain, LlamaIndex, DSPy, CrewAI. Microsoft Agent Framework is now described as building on Semantic Kernel and AutoGen, and LangGraph is in skills.
- Model tooling: Hugging Face transformers, datasets, PEFT/LoRA, PyTorch. MLflow is now covered.
- MLOps loop: drift detection, feature store, retraining, A/B or shadow deployment. Model registry is now covered.
- Evaluation tooling: RAGAS, promptfoo, DeepEval, or whatever you used. "Automated evaluation jobs" is still unnamed.
- Guardrails: named tools (Azure AI Content Safety, Guardrails AI, NeMo Guardrails) if any were used.
- Streaming: Kafka, Event Hubs, Spark Structured Streaming. You do not use these. The SSE response streaming in the orchestrator is a different thing and is now named as such on the AMD, Apple, and Databricks variants.

## Project gaps and what to build

The three resume projects are from your degree and predate all of your professional work. They add no signal for these roles. Replace them over the next quarter with projects that each close several gaps at once.

| Project | Closes | Roles helped | Effort |
|---|---|---|---|
| **RAG evaluation harness**: ingest a public corpus into a vector store you can show (Chroma locally, Azure AI Search or OpenSearch hosted), build a LangGraph agent over it, evaluate with RAGAS or promptfoo, deploy on AWS or GCP with CI. Publish the eval report. | Public RAG evidence, eval tooling, second cloud | AMD, Apple, Mastercard | 2 to 3 weekends |
| **Fine-tune and operate a small open model**: LoRA on a 1B to 3B model with transformers, datasets, PEFT; track runs and register the model in MLflow; add Evidently drift checks on inference logs and a retraining trigger in GitHub Actions. | Fine-tuning, PyTorch, HF libs, drift, retraining | Apple, Mastercard, Databricks | 3 to 4 weekends |
| **Open-source the code-review agent pattern**: a generic GitHub Action or Azure DevOps extension with the schema-constrained output, comment fingerprinting, cost caps, and fail-open logic, stripped of SimCorp specifics. | OSS evidence, agents, developer tooling | Databricks, AMD | 2 weekends, plus employer approval |
| **Merged PRs to ecosystem projects**: MLflow (Databricks' own, and you have used it), promptflow, Microsoft Agent Framework, A2A samples. Docs and small bug fixes count. Aim for three merged. | OSS contributions | Databricks primarily | Ongoing, 1 evening a week |
| **Publish the well-being prototype or remove it.** The June 2026 repo is visible and undescribed. Either write a README and make it a Playground entry, or archive it. | Portfolio hygiene | All | 1 evening |

## Portfolio site gaps

- **The Azure AI Search RAG work is not on the site.** It is now on every variant. A work entry covering the automated ingestion and indexing pipelines, semantic configuration, hybrid search, and metadata-based indexing would back the resume up, and it is the kind of concrete detail an engineer-reviewer looks for.
- **Attribution conflicts.** The site's mobile payments RAG entry says role "Senior Software Engineer - MLOps" and client "SimCorp / Mobile Payments Enterprise". The resume puts that work at Tiger Analytics as Senior Analyst. The LLMOps entry lists client "SimCorp / Tiger Analytics". The About story says "as a Senior Software Engineer at SimCorp, I build RAG solutions with custom document indexing". Now that there is genuinely RAG work at both companies, separate them: one entry per project, each with the right employer. A recruiter comparing resume and site will notice.
- **"Conceptual" code samples.** The RAG and LLMOps entries show illustrative code (`rag_evaluator.py`, a workflow YAML) that is not from the real system. Label it clearly as illustrative or replace it with a real, sanitised snippet. Otherwise it reads as fabricated to an engineer.
- **No numbers on the orchestrator.** The code-review agent has four metrics. The orchestrator has none. Requests per day, agents onboarded, teams served, p95 latency, or time-to-onboard a new agent would all work.
- **Playground is a placeholder.** The RAG evaluation harness above would fill it with a live demo.
- **No link from work entries to code.** Where a public repo exists (Semantic IR, image segmentation, this site), link it. Where it cannot exist, say "internal system" explicitly.
- **No writing.** One technical post on the A2A orchestrator design or on running an unattended review agent safely would do more for Databricks and Apple than any project.
- **Location.** Nothing on the site or resume says you are targeting Singapore. The variants now say "open to relocation to Singapore"; the site should carry the same line.
- **Typo.** About page lists "PostreSQL".

## Resume-level gaps

- **Two pages.** The master resume and all variants run to two pages. After the additions of 2 September the variants fill roughly half of page 2. That is acceptable in Singapore and India. For US-headquartered companies a one-page version would be safer. Trimming is the next step once the content is signed off.
- **Titles.** "Senior Analyst" and "Analyst" read junior for a Senior AI Engineer application. The summaries compensate. Do not rename them.
- **Certifications.** None. The Databricks Machine Learning Associate cert is cheap and directly relevant to one role. AWS Machine Learning Specialty or Azure AI Engineer Associate (AI-102) would back the second-cloud and applied-AI claims.
- **LinkedIn headline.** Make sure it matches the tailored summary language: agents, RAG, LLMOps, platform.

## Suggested order of work

1. This week: fix the site attribution conflicts, add the Azure AI Search RAG entry, label the illustrative code, add orchestrator numbers, add the Singapore line. Apply to Mastercard and AMD with the current variants.
2. Next two to three weeks: build the RAG evaluation harness on AWS or GCP with a named evaluation tool. Update the master resume skills and projects, then apply to Apple if you still want to, knowing the language and years filters remain.
3. Following month: fine-tune project with drift and retraining, plus first merged OSS PRs, starting with MLflow. Then apply to Databricks with a materially stronger public footprint.
