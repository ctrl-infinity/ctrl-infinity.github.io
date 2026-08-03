---
title: "Enterprise Mobile Payments RAG Engine"
description: "Built a Python-based Retrieval-Augmented Generation (RAG) application with a custom document index for a mobile payments use case, improving information retrieval accuracy by 20% and reducing latency by 60% via API load balancing and prompt flow orchestration."
role: "Senior Software Engineer - MLOps"
category: "professional"
tags: ["Python", "RAG", "Azure ML SDK", "Prompt Flow", "Docker", "Kubernetes", "API Load Balancing"]
client: "SimCorp / Mobile Payments Enterprise"
duration: "2024"
order: 3
metrics:
  - label: "Retrieval Accuracy"
    value: "+20%"
  - label: "Response Latency"
    value: "-60%"
  - label: "Orchestration"
    value: "Prompt Flow"
  - label: "Deployment"
    value: "Azure ML / K8s"
---

## The Problem

Engineering and technical support teams at a major mobile payments service struggled with fragmented technical documentation and API schemas. Keyword-based searches were failing to resolve complex integration queries, leading to high latency in resolving customer support cases and inconsistent answer accuracy across teams.

## Solution Architecture

To address retrieval accuracy and latency bottlenecks, I designed and delivered an end-to-end Python Retrieval-Augmented Generation (RAG) system with custom indexing and API orchestration:

1. **Custom Document Indexing:** Implemented domain-aware document chunking and indexing optimized for financial API specs, message payloads, and integration guides.
2. **Prompt Flow Orchestration:** Standardized LLM prompt flows to decouple retrieval, context assembly, and answer synthesis into observable execution nodes.
3. **API Load Balancing:** Built an intelligent load-balancing proxy across model endpoints to prevent rate-limiting under peak traffic loads and cut response latency.
4. **Production LLMOps:** Containerized the solution with Docker and deployed scalable inference endpoints on Kubernetes and Azure ML SDK infrastructure.

## Technical Implementation

Below is a conceptual representation of the custom retrieval pipeline and prompt flow evaluator:

```python
# rag_evaluator.py — Custom document indexing & prompt evaluation
from azure.ai.ml import MLClient
from promptflow.core import Flow

class RAGPipelineEvaluator:
    def __init__(self, azure_config: dict):
        self.ml_client = MLClient.from_config(azure_config)
        self.flow = Flow.load(source="./prompt_flows/rag_payments")

    def run_evaluation(self, test_dataset_path: str):
        """Runs batch evaluation on RAG document retrieval accuracy."""
        results = self.flow.test(inputs={"data": test_dataset_path})
        accuracy_score = results.get_metric("retrieval_accuracy")
        print(f"Evaluated Retrieval Accuracy: {accuracy_score:.2f}%")
        return results

    def deploy_endpoint(self, endpoint_name: str):
        """Deploys prompt flow to Azure ML managed endpoint."""
        self.ml_client.online_endpoints.begin_create_or_update(
            name=endpoint_name,
            location="eastus"
        )
```

## Results & Impact

* **+20% Accuracy Improvement:** Custom indexing and context rankers significantly reduced hallucination and improved answer precision.
* **-60% Latency Reduction:** API load balancing and optimized vector search lowered query response times from seconds to sub-second ranges.
* **Enterprise Standardization:** Provided a scalable blueprint for deploying secure, compliant RAG applications across financial service domain boundaries.
