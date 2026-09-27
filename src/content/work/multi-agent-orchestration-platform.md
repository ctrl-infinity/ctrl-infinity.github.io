---
title: "Multi-Agent Orchestration Platform"
description: "Built the production orchestrator that classifies and routes end-user requests to independently built domain agents over the open Agent2Agent (A2A) protocol — zero-code-change extensibility for new teams, multi-tenant security, and full ownership of the cloud infrastructure and CI/CD behind it."
summary: "One entry point for domain agents built by different teams. I owned the orchestrator, cloud infrastructure, and delivery pipeline."
contribution: "Orchestration, infrastructure, tenant identity, and CI/CD."
outcome: "New agents connect through discovery, without an orchestrator redeploy."
visual: "orchestration"
status: "production"
role: "Senior Software Engineer - MLOps"
category: "professional"
tags: [".NET", "Azure OpenAI", "Agent2Agent (A2A)", "Azure Container Apps", "Bicep", "Azure DevOps"]
client: "SimCorp / Enterprise Team"
duration: "2026"
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

No single team can own every domain an end user might ask about, and no orchestrator can hardcode every team's logic either. The system needed to classify an incoming request and hand it to whichever domain agent actually owned that problem — agents built and deployed independently by other teams — without the orchestrator's code changing every time a team shipped a new agent or a new version of one.

## How it Works

**Routing and streaming.** A production multi-agent orchestration system, built on the Microsoft Agent Framework (.NET, Azure OpenAI), classifies each end-user request and routes it to the right domain agent over the open Agent2Agent (A2A) protocol — the interoperability layer that lets agents built by separate teams, on separate stacks, talk to the orchestrator through one contract. A separate AG-UI streaming layer serves the client, so the user sees a live response stream regardless of which domain agent is doing the work underneath.

**Built for cross-team extensibility.** Domain agents plug in through dynamic discovery — polled agent-card endpoints or a central AI registry service — so a new team ships a new agent with zero changes to the orchestrator itself. Underneath that, a resilient dispatch layer keeps a bad or slow agent from taking down the whole system: LLM-proposed agent fallback when the first choice fails, circuit breakers, and retry-with-jitter on every downstream call.

**Multi-tenant, secure by default.** Azure AD B2C identity propagates end-to-end on every request — no service-identity impersonation standing in for the real caller — with per-tenant data isolation enforced throughout. Cross-service distributed tracing (OpenTelemetry / Azure Monitor) stitches one trace across the orchestrator and every downstream agent's own telemetry, so a single request stays debuggable across team boundaries.

**Infrastructure and delivery.** Bicep provisions the platform — autoscaled Azure Container Apps, Cosmos DB, Key Vault, and Cognitive Services — behind least-privilege managed identities, with the shared Azure Front Door + Application Gateway edge layer fronting the service for public ingress. CI/CD runs multi-environment, approval-gated (DEV → STA → PRD) in Azure DevOps, with SAST/SCA scanning (SonarQube, Mend), automated post-deploy smoke/integration tests, and full build-to-resource traceability tagging for auditability.

## Results

The orchestrator is the live entry point for cross-team agent requests today: new domain agents onboard through discovery alone, with no orchestrator redeploy, and every request carries real tenant identity and a single trace from the edge through to whichever agent served it.
