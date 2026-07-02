---
title: Command Reference
sidebar_position: 0
---

# Command Reference

This reference mirrors the machine-readable catalog emitted by `abapctl tools list --json`, the same catalog an AI agent reads to discover what the CLI can do. Every command, parameter, and safety annotation on these pages is generated from that catalog, so it matches the binary it was generated from. Run `abapctl tools list --json` against your own build for the definitive list.

The commands are grouped into families by what they act on. Run `abapctl --help` to list them, or `abapctl <family> --help` for a family.

## Safety annotations

Each command shows one or more badges so you can see what it does before running it. `tools list --json` reports three booleans for every command (`readOnly`, `destructive`, `idempotent`); the first three badges map directly to those, and WRITE covers the remaining case.

| Badge | Meaning |
|---|---|
| <span class="ac-pill ac-pill--read">READ</span> | **Read-only** (`readOnly: true`). Makes no changes to the SAP system. Safe to run freely. |
| <span class="ac-pill ac-pill--idemp">IDEMP</span> | **Idempotent** (`idempotent: true`). Running it again with the same inputs yields the same end state. |
| <span class="ac-pill ac-pill--destr">DESTR</span> | **Destructive** (`destructive: true`). Mutates the SAP system (or local state) and may not be reversible. Most support `--dry-run` to preview, and `--yes` to skip the confirmation prompt. |
| <span class="ac-pill ac-pill--write">WRITE</span> | **Write.** Changes SAP but is not flagged destructive or idempotent (none of the three booleans is set), for example `create`, `transport create`, and `run`. Most support `--dry-run`. |

A command may carry more than one badge. Read-only commands are also idempotent (READ + IDEMP), and some destructive commands are idempotent (for example `service unpublish` is DESTR + IDEMP).

See [JSON output and safety annotations](/docs/concepts/json-and-safety) for how agents consume these flags.

## Global options

Every command accepts these global options:

| Option | Description |
|---|---|
| `--verbose` | Enable debug-level output. |
| `--log-file [path]` | Write a log to file (auto-generates a path if no argument is given). |
| `--json` | Output results as structured JSON. Available on all commands. |
| `--session-file <path>` | Reuse a SAP session across invocations (persists CSRF token + cookies). |
| `--connection <name>` (`-c`) | Select the SAP connection profile to use for the call. |

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success. |
| `1` | Partial failure. A check found issues, or some objects failed. |
| `2` | Error. Bad config, auth failure, SAP error, or unexpected exception. |

## Command families

| Family | Summary |
|---|---|
| [Standalone & config](./standalone.md) | Top-level commands plus the `config` group for managing local connection profiles. |
| [object: Browse and manage objects](./object.md) | Inspect, search, browse, activate, and delete existing ABAP objects. |
| [code: Navigation and intelligence](./code.md) | Go to definition, element info, where-used, usage snippets, and compiler-authoritative completion. |
| [refactor: Refactoring and quick fixes](./refactor.md) | Quick fixes, rename, extract method, and move-to-package. |
| [source: Download and upload source](./source.md) | Read and write ABAP source through the lock → write → unlock → activate lifecycle. |
| [data: Preview data](./data.md) | Design-time data preview against DDIC tables, CDS views, and freestyle ABAP SQL. |
| [check: Quality checks](./check.md) | Syntax checks, ATC runs, the find → inspect → fix loop, ABAP Unit, and exemptions. |
| [cds: CDS intelligence](./cds.md) | Annotation definitions, element-info trees, entity → DDL resolution, and test dependencies. |
| [service: Service binding lifecycle](./service.md) | Publish, unpublish, inspect, and smoke-test OData service bindings (V2 and V4). |
| [ddic: DDIC deep metadata](./ddic.md) | Read-only deep metadata for tables, structures, domains, data elements, and more. |
| [package: Packages](./package.md) | Discover packages, check existence, and look up valid field values. |
| [transport: Transport requests](./transport.md) | Check requirements, create, list, inspect, release, and delete transport requests. |
| [create: Create new objects](./create.md) | Create new ABAP objects via `--source` or typed flags, with transport auto-selection. |
| [bdef: Behavior definitions](./bdef.md) | Read and create RAP behavior definitions and list assigned BO interfaces. |
| [enho: Enhancement implementations](./enho.md) | Source-level read of ENHO on a base object, plus a scoped inventory. |
| [workspace: Local ↔ SAP sync](./workspace.md) | Bidirectional sync between local files and SAP objects, like git clone. |
| [clean-core: Assessment and remediation](./clean-core.md) | ATC-driven Clean Core assessment, classification, reporting, prep, and apply. |
| [release-state: API release state](./release-state.md) | Live CDS-view lookup of deprecated-API release state and successors. |
| [odata: OData runtime consumption](./odata.md) | Consume published OData runtime services over the Gateway. |
| [system & monitor: System facts and diagnostics](./system.md) | System facts (kernel/DB/OS), software components, and runtime diagnostics. |
| [text-elements: Translatable text](./text-elements.md) | Read and write translatable symbols, selections, and headings. |
| [reference: SAP API reference data](./reference.md) | Manage the locally cached SAP API reference data. |
