---
title: Working with AI agents
sidebar_position: 11
---

# Working with AI agents

abapctl is built to be driven by an AI agent. Every command is headless, JSON-first, annotated with safety metadata, and previewable, so an agent can read freely, propose writes, and let a human approve before anything commits.

## The integration contract

The contract is `abapctl tools list --json`. It returns the full command catalog with parameter schemas, descriptions, and safety flags (read-only / destructive / idempotent). Drop that JSON into your agent's tool registry and it can plan, route, and reason about every abapctl command.

```bash
abapctl tools list --json
```

A ready-made skill ships with the Clean Core kit and can be copied into your project; see [Skills & Agents](/docs/skills-agents).

## Four flags do most of the work

| Flag | Purpose |
|---|---|
| `--json` | Stable, machine-readable output on stdout (progress prose stays on stderr). Errors carry codes like `SAP_AUTH_ERROR`, `SAP_HTTP_ERROR`, and `CAPABILITY_NOT_AVAILABLE`. |
| `--dry-run` | Preview destructive commands without writing to SAP. The agent presents the preview; the human approves; a second call without `--dry-run` commits. |
| `--yes` | Skip the interactive confirmation prompt on destructive commands. Use after a human has approved the dry-run preview. |
| `--session-file <path>` | Reuse one SAP login across many calls. Saves ~8s per command on slow-login systems. Stale sessions auto-recover. |

For the stdout/stderr split and the error-code contract, see [JSON and safety](/docs/concepts/json-and-safety).

## The typical agent loop

Read freely, propose a write, show the human the dry-run, then commit:

```bash
SESSION=$(mktemp)

# Read freely.
abapctl object info ZCL_FOO --json --session-file $SESSION
abapctl check atc ZCL_FOO --json --session-file $SESSION | jq '.findings[]'

# Propose a write, show the human, commit.
abapctl source put ZCL_FOO --file new.clas.abap --dry-run --json --session-file $SESSION
# ...human reviews the proposed change...
abapctl source put ZCL_FOO --file new.clas.abap --yes --session-file $SESSION
```

`--dry-run` works on `source put`, `source push`, all `workspace` writes, all `create` commands, transport release/delete, object delete/activate, service publish/unpublish, `clean-core apply`, and `bdef create`. The full catalog with safety flags is in the [Command Reference](/docs/command-reference).

## See also

- [Skills & Agents](/docs/skills-agents): the bundled skill and how agents discover abapctl.
- [JSON and safety](/docs/concepts/json-and-safety): the output and error-code contract.
- [Clean Core](./clean-core.md): an agent-driven remediation loop end to end.
- [Command Reference](/docs/command-reference): every command with READ / DESTR / IDEMP annotations.
