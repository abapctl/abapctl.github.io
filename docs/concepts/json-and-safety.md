---
title: JSON & safety
sidebar_position: 5
---

# JSON & safety

abapctl was built with agentic workflows in mind. That shaped its output contract: every command emits structured JSON, carries a safety annotation, and returns a meaningful exit code, so a script or an AI agent can plan, route, and react without screen scraping.

## Structured output everywhere

Every command supports `--json`. The structured result goes to **stdout**; human-readable progress prose stays on **stderr**, so a caller can pipe stdout straight into a parser:

```bash
abapctl check atc ZCL_FOO --json | jq '.findings[]'
```

Errors are structured too, and carry stable codes rather than free-form text. Examples:

| Code | Meaning |
|---|---|
| `SAP_AUTH_ERROR` | Authentication failed (bad credentials, expired session). |
| `SAP_HTTP_ERROR` | SAP returned an HTTP error for the request. |
| `SAP_CONNECTION_ERROR` | abapctl could not reach the SAP system. |
| `CAPABILITY_NOT_AVAILABLE` | The connected system does not support the requested operation. |

An agent branches on the code, not on a string match.

## Safety annotations

Every command is tagged with a safety classification. A planner uses these to decide what is safe to run unattended and what needs a human in the loop:

- **read-only**: the command only reads from SAP. Safe to run freely.
- **destructive**: the command can mutate SAP. It should be reviewed before it commits.
- **idempotent**: re-running produces the same result.

Run `abapctl tools list` to see the catalog with these flags, or `abapctl tools list --json` for the full machine-readable command catalog (schemas, descriptions, and safety flags) to drop into an agent's tool registry. See the [Command Reference](/docs/command-reference) for the rendered table.

## The dry-run → approve → commit pattern

Destructive commands support `--dry-run`. The canonical safe loop is:

1. Run the command with `--dry-run`. abapctl validates inputs and shows a preview, making **no** SAP write.
2. A human (or a higher-level policy) reviews the preview.
3. Run the command again without `--dry-run` to commit.

```bash
abapctl source put ZCL_FOO --file new.clas.abap --dry-run --json   # preview
# ...review the proposed change...
abapctl source put ZCL_FOO --file new.clas.abap --yes              # commit
```

Many destructive commands **prompt interactively** before committing unless you pass `--yes`, including `source put`/`push`, `object delete`, `transport release`/`delete`, `service unpublish`, `workspace push`, and `clean-core apply`. Others (the `create` family, `object activate`, `service publish`, `text-elements put`) do not prompt, so preview them with `--dry-run` first. Treat the `destructive` flag from `tools list --json` as the binding signal, and check a command's `--help` when in doubt. Use `--yes` only after a dry-run has been reviewed: it is the explicit signal that a human (or an agent acting on a human's approval) has consented.

## Exit codes

abapctl returns three exit codes a CI tool or agent can consume directly:

| Code | Meaning |
|---|---|
| `0` | Success. |
| `1` | Partial failure: a check found issues, or some objects in a batch failed. |
| `2` | Error: bad config, auth failure, SAP error, or unexpected exception. |

This makes abapctl a clean quality gate: a check command exits `1` when it finds findings, so a pipeline can stop the build on anything that is not clean.

## The agent contract in one loop

Putting it together (JSON output, stable codes, safety flags, dry-run, and a persisted session):

```bash
SESSION=$(mktemp)

# Read freely (READ commands).
abapctl object info ZCL_FOO --json --session-file $SESSION
abapctl check atc  ZCL_FOO --json --session-file $SESSION | jq '.findings[]'

# Propose a write (DESTR command), show the human, commit.
abapctl source put ZCL_FOO --file new.clas.abap --dry-run --json --session-file $SESSION
# ...human reviews...
abapctl source put ZCL_FOO --file new.clas.abap --yes --session-file $SESSION
```

For the full agent-integration guide, see [Working with AI agents](/docs/guides/ai-agents).

## Related concepts

- [Lock → write → activate](./lock-write-activate): what a write actually does, and what `--dry-run` previews.
- [Connections & sessions](./connections-sessions): `--session-file` and the CSRF flow.
- [Capabilities & gating](./capabilities): the `CAPABILITY_NOT_AVAILABLE` code.
