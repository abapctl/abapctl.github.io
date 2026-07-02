---
title: Overview
sidebar_position: 1
---

# Overview

`abapctl` is a standalone binary that automates SAP development workflows. It connects your terminal, your scripts, and your AI agents directly to **SAP's development interfaces (ADT) over HTTPS**. Think of it as ABAP development in batch (headless) mode: optimized for AI agents and usable by humans from the terminal.

It works with any ADT-enabled SAP system, both **ECC** and **S/4HANA**.

## The two-layer model

abapctl is deliberately a *primitive*. It performs deterministic interactions with SAP and does no reasoning of its own. Reasoning and orchestration live one layer up, in scripts, pipelines, or AI agents.

```
┌─────────────────────────────────────────────┐
│  AI agent        →  reasoning & orchestration │   ← reasoning, multi-step planning
├─────────────────────────────────────────────┤
│  abapctl         →  deterministic primitive   │   ← direct SAP calls, no reasoning
├─────────────────────────────────────────────┤
│  SAP system (dev interfaces over HTTPS)        │
└─────────────────────────────────────────────┘
```

- **abapctl is the primitive.** It handles the deterministic, mechanical interactions with SAP: read source, run a check, lock/write/activate, manage a transport.
- **The layer above adds reasoning.** A script enforces a quality gate; an AI agent plans a multi-step remediation; a CI pipeline blocks a release. The reasoning lives there, not in abapctl.

Drive abapctl from the terminal, from a CI/CD pipeline, or from an AI agent. The same commands serve all three.

## Who it's for

- **Developers in a terminal** who want SAP development without Eclipse: read, navigate, edit, check, and transport ABAP from the command line.
- **AI agents** that need a deterministic SAP-side oracle. Every command supports `--json` with stable error codes and a safety annotation (read-only / destructive / idempotent), so an agent can plan and route without screen scraping.
- **CI/CD pipelines** that need stable commands, structured JSON output, and exit codes a build tool can consume, to run syntax, ATC, and unit checks on every commit.

## What it covers at a glance

- **Read & navigate**: source download, object metadata, search, package browsing, go-to-definition, where-used, compiler-authoritative code completion.
- **Edit**: the full lock → write → unlock → activate cycle (handled for you), single- and multi-file upload, pretty printing.
- **Quality checks**: syntax, ATC (with quick-fix metadata), ABAP Unit, CDS-DDL syntax.
- **Transports**: create, inspect, list, release, delete.
- **Object creation**: 21 object types (classes, programs, function groups, DDIC, CDS, services, and more).
- **Workspaces**: sync an entire package to local files, like `git clone` for SAP.
- **Clean Core**: assess a package against the A–D maturity model and drive the remediation loop.
- **OData runtime**: consume published OData services the way a Fiori app sees them.

For the complete catalog with safety flags, see the [Command Reference](/docs/command-reference).

## ECC vs S/4HANA

abapctl works with any ADT-enabled backend. The available operations depend on what the connected system exposes. abapctl discovers this at runtime and degrades gracefully on systems that lack a capability. Reads work everywhere; some write paths are gated on older backends. See [Capabilities & gating](/docs/concepts/capabilities).

## Next steps

1. [Install the binary](./install)
2. [Configure a connection](./configure)
3. [Run your first commands](./quickstart)
