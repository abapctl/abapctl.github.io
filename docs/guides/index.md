---
title: Guides
sidebar_position: 0
---

# Guides

Task-oriented walkthroughs for getting work done with abapctl. Each guide expands a single workflow into runnable examples. For a specific command, see the [Command Reference](/docs/command-reference); for the model behind the tool, start with [Architecture](/docs/concepts/architecture).

New to abapctl? Configure a connection first. See [Getting Started → Configure](/docs/getting-started/configure).

## Everyday development

- **[Read and navigate](./read-navigate.md)**: pull source and metadata, search, browse a package, jump to definitions and references, and use compiler-authoritative code completion.
- **[Edit source](./edit-source.md)**: `source put` / `source push`, the lock → write → unlock → activate cycle, `--dry-run`, `--no-activate`, and pretty-printing.
- **[Quality checks](./quality-checks.md)**: syntax, ATC, ABAP Unit, and CDS-DDL checks, plus ATC quick-fix inspection and apply.
- **[Transports](./transports.md)**: list, inspect, create, release, and delete transport requests, including recursive cleanup.

## Working with packages and objects

- **[Workspaces](./workspaces.md)**: sync an entire SAP package to a local directory the way you would clone a git repo, with conflict detection and SID-aware safety.
- **[Object creation](./object-creation.md)**: the `create` command family, one-shot create+activate from a source file, and multi-include create for classes and function groups.

## DDIC, CDS, and services

- **[DDIC and CDS](./ddic-cds.md)**: deep DDIC metadata, CDS intelligence (annotations, element info, repository access), and data preview.
- **[Services and OData](./services-odata.md)**: publish/test service bindings (V2 and V4) and consume published OData runtime services.
- **[Behavior definitions and RAP](./bdef-rap.md)**: read/create BDEFs, batch activation for RAP stacks, and enhancement implementation (ENHO) inventory.

## Assessment and automation

- **[Clean Core](./clean-core.md)**: the assess → prep → fix → apply remediation loop against the Clean Core compliance levels.
- **[Working with AI agents](./ai-agents.md)**: the `tools list --json` contract, the four key agent flags, and the read → propose → approve → commit loop.
