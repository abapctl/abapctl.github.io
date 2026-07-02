---
title: Agentic Use Cases
sidebar_position: 0
---

# Agentic use cases

abapctl is built to be driven by an AI agent. You state a goal in plain language ("make this code cloud-ready", "build a validator with tests"), and the agent works out the steps, runs the right abapctl commands against a live SAP system, and shows you the results. You express the goal; you review and approve.

The three use cases below are worked examples of that model, ordered so the agent takes on a little more autonomy each time: from a single deterministic fix, to a governed remediation workflow, to building new code test-first. They're a sample, not a limit. The same pattern (plain-language intent, abapctl as the engine, human review before writes) applies to any SAP development task the [command reference](/docs/command-reference) covers. For more, see [more agentic workflows](./going-further.md).

## How it works

You talk to your AI agent in plain English. Behind the scenes it uses **abapctl** as its hands on the SAP system: abapctl does the mechanical work (connecting to SAP, reading and writing code, running checks, managing transports), while the agent decides what to do and reads the results. This is the [two-layer model](/docs/skills-agents) in action: a deterministic primitive under an agent that reasons.

Any agent that can run a CLI and read JSON works. The agent discovers what abapctl can do from `abapctl tools list --json`, and the safety annotations on every command tell it what's safe to run freely and what needs review first. See [Working with AI agents](/docs/guides/ai-agents) for the integration contract.

## The three use cases

| # | Use case | The question it answers | What you get |
|---|---|---|---|
| **1** | [S/4HANA Readiness & Quick Fixes](./readiness.md) | "Will this code run on S/4HANA?" | Find the blockers and let the agent apply the known fixes |
| **2** | [Clean Core Assessment & Remediation](./clean-core.md) | "Is it cloud-ready, and will it stay clean?" | Hand the agent an object and watch it research, fix, and prove the change safe |
| **3** | [Test-Driven Development (TDD)](./tdd.md) | "How do I build new code that works?" | Build new code test-first, with the agent writing the tests and the code |

Each example uses illustrative object names in a finance package (`ZFIN`), a placeholder connection (`dev`), and a transport `<NR>`. Substitute your own. Where an example writes to SAP, it previews the change with `--dry-run` first.

## The safety model

abapctl was built for agentic workflows, so safety is part of the engine. That's why an agent can act on a live SAP system without surprises:

- **Every command is labeled** read-only, mutating, or destructive. The agent runs reads freely and pauses for confirmation before writes.
- **`--dry-run` previews writes**: validate and see what would change, touching nothing on SAP.
- **Structured output everywhere** (`--json`) so the agent reads results instead of screen-scraping.
- **Audit trail**: writes are tracked in SAP's change log, and every call is logged locally under `.abapctl/logs/`.
- **Credentials stay out of source**: passwords come from an environment variable or a secrets manager, never the config file.

See [JSON output & the safety model](/docs/concepts/json-and-safety) for the full contract.

Start with **[Use Case 1: S/4HANA Readiness & Quick Fixes](./readiness.md)**.
