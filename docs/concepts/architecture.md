---
title: Architecture
sidebar_position: 1
---

# Architecture

abapctl is a thin, deterministic layer over SAP's ADT REST API. It has no opinion about *what* you should do. It does exactly what you ask, captures the result, and returns structured output.

![abapctl architecture: a reasoning layer (you, a script, a CI pipeline, or an AI agent) drives abapctl, whose CLI, Workflow, Capabilities, and SAP Client layers call the SAP system over HTTPS](/img/architecture.svg)

## Layered design

abapctl is organized as four layers (shown above), each with a single responsibility:

- **CLI**: parses arguments and flags, resolves the connection, formats output (human-readable or `--json`).
- **Workflow Engine**: orchestrations that chain several SAP operations into one logical task: assess, prep-fix, apply-fix, syntax-check, atc-check, unit-test, delete, create.
- **Capabilities**: individual ADT operations (read source, lock, write, activate, run ATC, manage transports, navigate, refactor, preview data, and so on). Each maps to one or more ADT endpoints.
- **SAP Client**: the single HTTP client. It manages CSRF tokens, the cookie jar, stateful sessions, retry with exponential backoff, and a circuit breaker. **All SAP HTTP traffic goes through it**; business logic never makes a raw request.

The boundaries are enforced: the CLI calls workflows, workflows call capabilities, capabilities call the SAP client. This keeps the deterministic SAP-facing behavior in one place, isolated from presentation concerns.

## The two-layer "primitive + reasoning" model

abapctl is deliberately a **deterministic primitive**, and it draws a hard line between mechanical work and reasoning (the top two bands of the diagram above).

abapctl handles everything that does **not** require reasoning: connecting to SAP, reading source, initiating ATC checks and compiling results, parsing violations, running an assessment and producing structured reports. The reasoning layer above (a script, a CI pipeline, or an AI agent) supplies ambiguous classification, API research, parameter mapping, and code generation.

The benefit: most assessment and planning work happens **deterministically, without consuming a single AI token**. AI is reserved for the steps that require reasoning.

## Auditability

Commands run as direct calls to your SAP system under the configured user, so writes are attributed to that user in SAP's own change log rather than to a shared service account. abapctl also writes a local log of its invocations under `.abapctl/logs/`, which helps when reviewing what a command did.

The `.abapctl/` directory is tool-internal (like `.git/`) and holds reference data, logs, and an optional persisted session.

## Related concepts

- [Connections & sessions](./connections-sessions): how abapctl authenticates and reuses logins.
- [Lock → write → activate](./lock-write-activate): the write lifecycle.
- [Capabilities & gating](./capabilities): how abapctl adapts to what a system supports.
- [JSON & safety](./json-and-safety): the agent contract.
