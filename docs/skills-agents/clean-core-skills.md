---
title: Clean Core skills
sidebar_position: 2
---

# Clean Core skills & the remediator subagent

Clean Core remediation is the flagship agent workflow: assess a package against SAP's A–D maturity model, prepare per-object fix context, fix the objects with an autonomous agent, and validate. abapctl does the deterministic work (no AI tokens); the agent is invoked only where reasoning is genuinely required, such as researching a released-API successor, proving it behaves the same, and rewriting the code.

The kit is **four skills plus one subagent**. Each skill loads on demand when you describe its step in plain language.

## The kit

| Component | Type | What it does | Writes to SAP? |
|---|---|---|---|
| **`clean-core-assess`** | Skill | Runs ATC against a package under the Clean Core variant (default `CLEAN_CORE`), classifies each object A–D, writes a `SUMMARY.md`. First step of the workflow. | No (**read-only**) |
| **`clean-core-prep`** | Skill | Downloads source, baseline copies, and enriched findings for C/D objects. Resolves a transport (flag, reuse, or prompt). Stages the workspace. Pure orchestration, with no successor lookups and no fix planning. | Downloads only; **never creates a transport on its own** |
| **`clean-core-fix`** | Skill | Orchestrator. Spawns one `clean-core-remediator` agent **per object in parallel batches (default 3, max 4)**, aggregates results, circuit-breaks on persistent failures, writes a run summary. Makes **no SAP decisions** itself. | Yes, via the remediator agents |
| **`clean-core-remediator`** | **Subagent** | Autonomous **per-object** worker in a sealed context: cascade for a released successor → probe compatibility → apply a minimum-diameter rewrite → push → gate with syntax + ATC (+ unit) → **roll back automatically on any regression**. | Yes (write + gated) |
| **`clean-core-review`** | Skill | Narrative retrospective after a fix run. Reads every per-object result, groups by outcome and category, surfaces cross-object patterns and **exemption candidates** (findings with no code-level fix). | No (read-only) |

The `sap-abap` skill ([see here](./sap-abap-skill.md)) underpins all of them: it is the abapctl reference that each skill and the remediator consult before picking a flag.

## The remediator's discipline

The `clean-core-remediator` subagent is the only component that writes to the live system, so its standard is strict:

> **Correctness, not fix-count: a wrong fix is worse than no fix.**

Per finding it runs *understand → cascade → probe → apply or defer*; after every finding terminates it does *push → gate → roll back on failure → write result*. The reasoning (does a released successor exist? is it truly equivalent? does the rewrite preserve behavior?) is the agent's call, made per finding. The discipline around the decision is non-negotiable, because that machinery protects the live system: one push, one gate, roll back on any regression, minimum-diameter edits. When a fix is not provably safe and behavior-equivalent, the agent defers it (`needs_review`) rather than inventing one.

It is tightly sandboxed: an allow-list of abapctl read/research commands plus `source put` and the check commands, an explicit deny-list (`abapctl source push`, `git push`, `rm -rf`), and write access scoped to the `clean-core/` working tree only.

## The workflow: Assess → Prepare → Fix → Validate

You interact in natural language. The deterministic assessment is fast (a package of ~140 objects classified in roughly ten seconds in one run) and consumes no AI tokens, reserving the model for the fix step where reasoning is needed.

### Assess

> Assess Clean Core compliance for package ZFINANCE on the s4h connection

Runs ATC against every object, classifies each into Level A–D, and produces a summary with the level distribution, top findings by priority, and the most-referenced legacy APIs (with known successors when available).

Output: `clean-core/<SID>/<PACKAGE>/reports/SUMMARY.md`

### Prepare

> Prepare ZFINANCE for Clean Core remediation

Downloads source and baseline copies for C and D objects, enriches findings with known released successors from SAP's catalog, and **prompts you for a transport number; it never creates one on its own.** Outputs a prep summary showing how many findings already have a known successor versus residuals the remediator will research live.

### Fix

> Run clean-core-fix on S4H/ZFINANCE

Spawns one remediator per object in parallel batches. Each remediator works autonomously: reads findings, cascades for a released successor, probes parameter and semantic compatibility, writes the replacement, pushes under your transport, and gates with syntax + ATC. **If the gate fails, it rolls back automatically.** You see per-object status as each completes.

- **Circuit-breaker:** the fix skill circuit-breaks after **3 consecutive SAP-unreachable failures.**
- **Resumable:** you can resume at any time; completed objects are skipped.

### Validate

Re-run the assessment to confirm remediated objects have moved out of Level D, and track the distribution over time. The `clean-core-review` skill writes the retrospective and flags exemption candidates for human triage.

## Prerequisites

- An agent runtime with subagents enabled (the fix skill spawns remediators in parallel, which needs the subagent feature turned on).
- The Clean Core skills, the remediator agent, and the reference knowledge base present in your project directory.
- `abapctl` on PATH and configured for your SAP system (`abapctl init`).

## Extensibility

This kit remediates **unreleased API usage**, one of several Clean Core violation types. Others (direct table writes, implicit enhancements, modifications) need different remediation patterns. The skills-and-agent architecture is designed to be extended: build your own skills for other violation types.

## Where to go next

- The CLI commands behind these skills (`clean-core assess / prep / apply / report`): [Clean Core guide](/docs/guides/clean-core).
- A worked, end-to-end run on a live system: [Use Case 2: Clean Core Assessment & Remediation](/docs/use-cases/clean-core).
