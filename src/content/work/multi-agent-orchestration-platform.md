---
title: "Multi-Agent Orchestration Platform"
description: "Lead DevOps and secure infrastructure for a multi-agent orchestrator in UAT since March 2026, with contributions to planning, an MCP gateway and evaluation regression gates. Five agents onboarded."
summary: "One entry point for domain agents built by different teams. I led DevOps and secure cloud operations, and contributed to the agent logic."
contribution: "DevOps leadership; contributions to multi-agent planning, the MCP gateway, and evaluation regression gates."
outcome: "New agents connect through discovery, without an orchestrator redeploy."
visual: "orchestration"
status: "uat"
evidence: "Five agents onboarded."
role: "Senior Software Engineer - MLOps"
category: "professional"
tags: [".NET", "Azure OpenAI", "Agent2Agent (A2A)", "Azure Container Apps", "Bicep", "Azure DevOps"]
client: "SimCorp / Enterprise Team"
duration: "March 2026"
order: 3
facts:
  - label: "Protocol"
    value: "Agent2Agent (A2A)"
  - label: "Runtime"
    value: "Azure Container Apps"
  - label: "Environments"
    value: "DEV → STA → PRD"
  - label: "Identity"
    value: "Azure AD B2C"
---

## The Problem

The platform has been in user acceptance testing (UAT) since March 2026, with
five agents onboarded. It has not launched as a production service.

No single team can own every domain an end user might ask about, and no orchestrator can hardcode every team's logic either. The system needed to classify an incoming request and hand it to whichever domain agent actually owned that problem — agents built and deployed independently by other teams — without the orchestrator's code changing every time a team shipped a new agent or a new version of one.

## How it Works

**My part in the system.** I led DevOps for the orchestrator, from deployment and secure infrastructure to ongoing operations. Alongside that ownership, I contributed to multi-agent planning, an MCP gateway that makes internal APIs available through the orchestrator, and evaluations used as regression gates. The architecture below describes the wider system, not a claim of sole authorship.

**Routing and streaming.** The multi-agent orchestration system, built on the Microsoft Agent Framework (.NET, Azure OpenAI), classifies each end-user request and routes it to the right domain agent over the open Agent2Agent (A2A) protocol — the interoperability layer that lets agents built by separate teams, on separate stacks, talk to the orchestrator through one contract. A separate AG-UI streaming layer serves the client, so the user sees a live response stream regardless of which domain agent is doing the work underneath.

**Built for cross-team extensibility.** Domain agents plug in through dynamic discovery — polled agent-card endpoints or a central AI registry service — so a new team ships a new agent with zero changes to the orchestrator itself. Underneath that, a resilient dispatch layer keeps a bad or slow agent from taking down the whole system: LLM-proposed agent fallback when the first choice fails, circuit breakers, and retry-with-jitter on every downstream call.

**Multi-tenant, secure by default.** Azure AD B2C identity propagates end-to-end on every request — no service-identity impersonation standing in for the real caller — with per-tenant data isolation enforced throughout. Cross-service distributed tracing (OpenTelemetry / Azure Monitor) stitches one trace across the orchestrator and every downstream agent's own telemetry, so a single request stays debuggable across team boundaries.

**Infrastructure and delivery.** I led the DevOps work that deploys and operates the orchestrator on secure infrastructure designed for high availability. Bicep provisions the platform — autoscaled Azure Container Apps, Cosmos DB, Key Vault, and Cognitive Services — behind least-privilege managed identities, with Azure Front Door, Application Gateway with WAF, and VNets providing secure access and network boundaries. CI/CD runs multi-environment, approval-gated (DEV → STA → PRD) in Azure DevOps, with SAST/SCA scanning (SonarQube, Mend), automated post-deploy smoke/integration tests, and full build-to-resource traceability tagging for auditability.

## Results

Five domain agents have been onboarded to the orchestrator, which has been in
UAT since March 2026. Agents connect through discovery without an orchestrator
redeploy. The platform propagates tenant identity and a cross-service trace.

The DEV, STA and PRD stages describe the delivery architecture, not a production
launch. Production request volume, availability and latency outcomes are not
claimed here.
