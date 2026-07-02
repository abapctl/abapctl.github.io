---
title: Introduction
slug: /
sidebar_position: 0
---

# abapctl

`abapctl` is a standalone binary that automates SAP development workflows. It connects your terminal, your scripts, and your AI agents directly to SAP's development interfaces over HTTPS. It is optimized for AI agents and usable by humans from the terminal, and works with any ADT-enabled SAP system (ECC, S/4HANA).

![abapctl connects over HTTPS to a SAP system by two paths: the ADT REST API under /sap/bc/adt for design-time work (objects, checks, transports), and the OData runtime under /sap/opu/odata for read-only queries of published services. Connection details come from .abapctl.json.](/img/connection.svg)

abapctl reaches SAP two ways: the **ADT REST API** (`/sap/bc/adt/…`) for design-time work (read and write objects, run checks, manage transports), and the **OData runtime** (`/sap/opu/odata/…`) for read-only queries of published services. Every command runs as a direct call to your SAP system, with each call captured both in your SAP audit trail and in a local log under `.abapctl/logs/`.

## Where to go next

- **New here?** Start with [Getting Started → Overview](./getting-started/overview.md), then [Install](./getting-started/install.md) and [Configure](./getting-started/configure.md).
- **Want to understand the model?** Read [Concepts → Architecture](./concepts/architecture.md) and [How writes work](./concepts/lock-write-activate.md).
- **Looking for a task?** The [Guides](./guides/index.md) are organized by what you want to do.
- **Need a specific command?** The [Command Reference](./command-reference/index.md) lists every command with its safety annotations.
- **Driving abapctl with an agent?** See [Working with AI agents](./guides/ai-agents.md) and [Skills & Agents](./skills-agents/index.md).
- **Want worked examples?** The [Agentic Use Cases](/docs/use-cases) walk three agent-driven workflows end to end.

## What makes it different

- **Headless and JSON-first.** Every command supports `--json` with consistent error codes, so scripts and agents parse responses instead of scraping screens.
- **Safety built in.** Commands are annotated `READ` / `DESTR` / `IDEMP`; destructive writes prompt interactively unless you pass `--yes`, and support `--dry-run` previews.
- **No Eclipse required.** Source, checks, transports, DDIC, CDS, RAP, OData, and Clean Core, all from the command line.
- **One dependency-light binary.** Self-contained per platform; bundles its own runtime.
