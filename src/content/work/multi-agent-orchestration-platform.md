---
title: "Multi-Agent Orchestration Platform"
description: "Led DevOps and secure cloud operations for a production multi-agent orchestrator, and contributed to multi-agent planning, an MCP gateway for internal APIs, and evaluation regression gates."
role: "Senior Software Engineer, AI Platform"
category: "professional"
tags: [".NET", "Azure OpenAI", "Agent2Agent (A2A)", "Azure Container Apps", "Bicep", "Azure DevOps"]
client: "SimCorp / Enterprise Team"
duration: "2026"
order: 1
metrics:
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

## My Role

I led DevOps for the orchestrator, from deployment and CI/CD to secure infrastructure designed for high availability. My scope included Azure Front Door, Application Gateway with WAF, VNets, and the platform's cloud resources.

I also contributed to the orchestrator's agent logic: multi-agent planning, an MCP gateway for internal APIs accessed through the orchestrator, and evaluations used as a regression gate. The platform was a team effort; my end-to-end ownership was its DevOps.

## How it Works

**Routing and streaming.** A production multi-agent orchestration system, built on the Microsoft Agent Framework (.NET, Azure OpenAI), classifies each end-user request and routes it to the right domain agent over the open Agent2Agent (A2A) protocol — the interoperability layer that lets agents built by separate teams, on separate stacks, talk to the orchestrator through one contract. A separate AG-UI streaming layer serves the client, so the user sees a live response stream regardless of which domain agent is doing the work underneath.

**Built for cross-team extensibility.** Domain agents plug in through dynamic discovery — polled agent-card endpoints or a central AI registry service — so a new team ships a new agent with zero changes to the orchestrator itself. Underneath that, a resilient dispatch layer keeps a bad or slow agent from taking down the whole system: LLM-proposed agent fallback when the first choice fails, circuit breakers, and retry-with-jitter on every downstream call.

**Multi-tenant, secure by default.** Azure AD B2C identity propagates end-to-end on every request — no service-identity impersonation standing in for the real caller — with per-tenant data isolation enforced throughout. Cross-service distributed tracing (OpenTelemetry / Azure Monitor) stitches one trace across the orchestrator and every downstream agent's own telemetry, so a single request stays debuggable across team boundaries.

**Infrastructure and delivery.** I led the platform's DevOps, including Bicep-provisioned Azure Container Apps, Cosmos DB, Key Vault, and Cognitive Services behind least-privilege managed identities. Azure Front Door, Application Gateway with WAF, and VNets support secure deployment designed for high availability. CI/CD runs multi-environment, approval-gated (DEV → STA → PRD) in Azure DevOps, with SAST/SCA scanning (SonarQube, Mend), automated post-deploy smoke/integration tests, and full build-to-resource traceability tagging for auditability.

## Results

The orchestrator is the live entry point for cross-team agent requests today: new domain agents onboard through discovery alone, with no orchestrator redeploy, and every request carries real tenant identity and a single trace from the edge through to whichever agent served it.
