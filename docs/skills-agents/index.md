---
title: Skills & Agents
sidebar_position: 0
---

# Skills & Agents

abapctl is a deterministic primitive. AI agents add the reasoning. This section covers the skills and agents that turn the CLI into an agent-driven SAP development surface: what they are, how an agent discovers the command set, and how to install them.

## Why skills and agents on top of abapctl

abapctl gives you a stable, scriptable interface to SAP's ADT and OData APIs: every command produces machine-readable `--json`, carries a meaningful exit code, and is labeled for safety. That is the surface an AI agent needs to plan and act. But the CLI does no reasoning: it locks, writes, activates, and checks, and nothing more. The interesting SAP work (which deprecated API has a released successor, whether a rewrite preserves behavior, how to classify an ambiguous finding) requires reasoning that lives a layer above.

That is the central idea: **a deterministic primitive plus an agent that reasons over it.**

## The two-layer model

```
┌───────────────────────────────────────────────┐
│  AI agents     →  reasoning & orchestration     │   AI, reasoning, multi-step planning
├───────────────────────────────────────────────┤
│  abapctl       →  deterministic primitive       │   direct SAP calls, no reasoning
├───────────────────────────────────────────────┤
│  SAP system    (dev interfaces over HTTPS)      │
└───────────────────────────────────────────────┘
```

- **abapctl is the primitive.** It handles the deterministic interactions with SAP: auth, CSRF, lock/write/unlock/activate, retries, checks, transports. No AI tokens are consumed when you run it directly.
- **Agents build on top**, adding the reasoning and orchestration that deliver SAP use cases at scale.
- You can use the CLI **directly in scripts and pipelines**, *or* **let an agent drive it**. The contract is identical.

This separation is what keeps agent-driven SAP work affordable: most assessment and planning happens deterministically, and the AI model is reserved for the steps that genuinely need it. See [Working with AI agents](/docs/guides/ai-agents) for the integration contract in depth.

## The discovery contract: `tools list --json`

Any agent can drive abapctl without prior knowledge of its command set, because the CLI describes itself:

```bash
abapctl tools list --json
```

This returns the full command catalog: every command with its parameters (positional / required / optional), a description, and a safety annotation:

| Annotation | Meaning |
|---|---|
| `read-only` | Reads from SAP; safe to run without confirmation. |
| `destructive` | Writes to or deletes from SAP; requires explicit consent (`--yes`), preview first with `--dry-run`. |
| `idempotent` | Repeating the call has no additional effect. |

Drop that JSON into an agent's tool registry and it can plan workflows, route commands by read/write classification, and surface destructive operations for human review before execution, with no string matching and no screen scraping. The same four flags do most of the work on every call: `--json`, `--dry-run`, `--yes`, and `--session-file`. See [JSON output & the safety model](/docs/concepts/json-and-safety) for the full contract.

## How to install skills

A skill is a directory the agent auto-discovers: drop it into your project (or into the agent's global skills directory) and it is picked up on the next session, with no registration step. The skills ship with the [Clean Core kit](https://github.com/aws-for-sap/agentic-ai-guidance-for-SAP-use-cases/tree/main/clean-core) under `.kiro/skills/`; copy the relevant directory into your project root.

```bash
# Example: install a skill into a project
cp -r path/to/kit/.kiro/skills/<skill-name> <project>/.kiro/skills/
```

Each skill is plain Markdown: a `SKILL.md` (the mental model and decision aid) plus, optionally, reference and prompt files. Because skills are text, they evolve independently of the CLI binary.

## The skills

| Skill / agent | What it is | Covered in |
|---|---|---|
| **`sap-abap`** | The general-purpose skill for driving abapctl: intent→command map, flag reference, safety model, the "never assume a command exists" discipline. | [The sap-abap skill](./sap-abap-skill.md) |
| **`clean-core-assess`** | Skill. Runs ATC against a package and classifies each object A–D. Read-only. | [Clean Core skills](./clean-core-skills.md) |
| **`clean-core-prep`** | Skill. Downloads source, baselines, and enriched findings for C/D objects; resolves a transport. | [Clean Core skills](./clean-core-skills.md) |
| **`clean-core-fix`** | Skill. Orchestrator that spawns one remediator per object in parallel. | [Clean Core skills](./clean-core-skills.md) |
| **`clean-core-remediator`** | Subagent. Autonomous per-object remediation, gated with auto-rollback. | [Clean Core skills](./clean-core-skills.md) |
| **`clean-core-review`** | Skill. Narrative retrospective after a fix run; surfaces exemption candidates. | [Clean Core skills](./clean-core-skills.md) |

To see all of this end to end on a live system, see the [Agentic Use Cases](/docs/use-cases).
