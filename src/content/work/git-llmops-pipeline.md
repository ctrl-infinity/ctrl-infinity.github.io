---
title: "Standardized Git-Based LLMOps Pipeline"
description: "Established a company-wide, Git-based LLMOps workflow in Azure ML SDK for prompt flow experimentation, automated evaluation, and repeatable deployment across Docker, Kubernetes, and Azure ML endpoints."
role: "Senior Analyst - MLE"
category: "professional"
tags: ["Azure ML SDK", "LLMOps", "Git", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
client: "SimCorp / Tiger Analytics"
duration: "2024"
order: 4
metrics:
  - label: "Practice"
    value: "Git-based LLMOps"
  - label: "Platform"
    value: "Azure ML SDK"
  - label: "Containers"
    value: "Docker / K8s"
  - label: "CI/CD"
    value: "GitHub Actions"
---

## The Problem

Prompt engineering and model evaluation were happening in ad-hoc, unversioned environments. Data science teams struggled to track prompt iterations, compare evaluation metrics systematically, and promote validated flows to production endpoints without manual intervention.

## Solution Architecture

I established a standardized, enterprise-wide LLMOps pipeline grounded in Git workflow principles and Azure ML SDK automation:

1. **Version-Controlled Prompt Flow:** Treated prompts and DAG pipelines as code stored in Git repositories with strict pull-request reviews.
2. **Automated Evaluation Pipelines:** Integrated Azure ML SDK evaluation jobs into GitHub Actions CI/CD to compute precision, recall, and safety metrics on every pull request.
3. **Infrastructure as Code:** Provisioned Azure ML workspaces, compute targets, and Kubernetes endpoints using reproducible IaC patterns.
4. **Automated Deployment:** Enabled zero-downtime deployment to Azure ML managed endpoints upon merging validated flows into main branches.

## Technical Implementation

```yaml
# .github/workflows/llmops-pipeline.yml
name: LLMOps Evaluation & Deployment

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  evaluate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Run Azure ML Evaluation
        run: |
          pip install azure-ai-ml promptflow
          python scripts/run_eval.py --config config/prod_eval.json

      - name: Deploy to Azure ML Endpoint
        if: github.ref == 'refs/heads/main'
        run: |
          az ml online-endpoint update --name rag-payments-endpoint --file azure/endpoint.yml
```

## Results & Impact

* **Repeatable Delivery:** Reduced prompt deployment cycles from days of manual setup to automated PR merges.
* **Traceability:** Created a full audit trail linking every production LLM response to its specific Git commit, prompt template, and evaluation score.
* **Cross-Team Adoption:** Adopted as the foundational LLMOps standard across multiple enterprise engineering units.
