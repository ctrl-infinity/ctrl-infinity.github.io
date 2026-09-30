---
title: "When an Agent Cannot Answer"
description: "Change identity, routing, and agent availability to explore a small dispatch policy. A local simulation, not a live AI system."
tags: ["Agent routing", "Failure handling", "System boundaries"]
type: "interactive"
component: "dispatch-lab"
order: 1
---

## The question

What should a system do when the expected agent cannot answer?

This small experiment makes the decision visible. Change one condition at a time
and compare the resulting route. Missing identity stops the request. An unknown
route calls for clarification. An unavailable primary agent can use a known
fallback, or make the failure explicit when none is available.

## What this deliberately leaves out

There is no model, network request, real tenant, or backend. The example does not
measure agent quality or reproduce the production platform's full retry,
discovery, and circuit-breaker behavior. It is a deterministic teaching model of
a few boundaries.

## Connect it to real work

The [multi-agent orchestration case study](/work/multi-agent-orchestration-platform)
describes the real platform, including tenant identity, discovery, tracing, and
delivery.
