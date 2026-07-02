---
title: "Going further: more agentic workflows"
sidebar_position: 4
---

# Going further: more agentic workflows

The three use cases cover a first slice of what an agent can do with abapctl: S/4HANA readiness quick fixes, Clean Core assessment and remediation, and test-driven development. They're examples, not the whole set. This page collects more abapctl-driven workflows worth exploring.

Each follows the same pattern: plain-language prompts to the agent, with abapctl as the engine. Each stands on its own, so pick whichever fits your needs.

| Topic | What you do |
|---|---|
| **CI/CD automation** | Generate pipeline quality gates that run on every commit, with no person in the loop: syntax, ATC, and unit checks consumed by exit code. |
| **Performance optimization** | Find and fix performance anti-patterns: nested loops, `SELECT` inside loops, missing indexes. |
| **Code documentation** | Generate technical and business-facing documentation from existing ABAP. |
| **Security & hardening** | Add authorization checks, handle secrets correctly, and harden custom code. |
| **Extensibility compliance** | Bring enhancements into line with the Clean Core extensibility tiers. |
| **Troubleshooting & debugging** | Diagnose runtime errors and short dumps with AI assistance. |
| **Change management & transport** | Govern change through transport requests and object locking. |
| **Code refactoring & modernization** | Rename, extract, and modernize with safe, evaluate-first refactoring. |
| **OData & RAP development** | Build RAP behavior definitions and publish OData services. |

## Applying this to your own landscape

Here are a few of these patterns spelled out, ready to adapt to any abapctl + agent setup:

### CI/CD quality gates

Drop these into your existing pipeline (your CI runner invokes abapctl directly, and the agent can generate the full pipeline for you):

```bash
abapctl check syntax $OBJECT --json
abapctl check atc $OBJECT --variant YOUR_VARIANT --json
abapctl check unit $OBJECT --json
```

Use exit codes to gate merges: `0` is pass, `1` is issues found, `2` is error.

### Clean Core remediation

Drive each step by asking the agent in plain English (it runs the underlying abapctl operations): assess the package, prep it and run the fix workflow, review the run for exemption candidates, then re-assess to confirm the level improved. See [Use Case 2](./clean-core.md) and [Clean Core skills](/docs/skills-agents/clean-core-skills).

### Multi-system workflows

Add multiple connections to `.abapctl.json`, then ask the agent to work across them by name (dev / qas / prd) for drift detection, cross-system comparison, and transport tracking.

### Explore the full command catalog

Ask the agent to surface what the engine can do: *"show me the abapctl command catalog with safety annotations"*, *"what guided abapctl recipes are available?"*, *"discover the ADT services this system exposes."* See the [Command reference](/docs/command-reference) for the complete catalog and [Working with AI agents](/docs/guides/ai-agents) for the integration contract.
