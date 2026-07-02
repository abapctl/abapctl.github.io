---
title: Quickstart
sidebar_position: 4
---

# Quickstart

A five-minute first run. This assumes you have [installed the binary](./install) and [configured a connection](./configure).

## 1. Confirm connectivity

```bash
abapctl system-check
```

`system-check` validates your connection and access. If it passes, you are talking to SAP.

## 2. Read an object

Pull metadata and then the source for a class:

```bash
abapctl object info ZCL_FOO            # metadata, includes, links
abapctl source get ZCL_FOO            # full source, written to stdout
```

`source get` writes to stdout, so pipe it where you need it:

```bash
abapctl source get ZCL_FOO > zcl_foo.clas.abap
```

## 3. Run quality checks

Check syntax and run an ATC variant against the active version:

```bash
abapctl check syntax ZCL_FOO
abapctl check atc ZCL_FOO --variant CLEAN_CORE
```

`abapctl check atc-variants` lists the variants available on your system; pass one with `--variant` (`-v`). ATC exits `0` when clean, `1` when findings exist, and `2` on error, so it slots straight into a pipeline.

## 4. Use JSON for scripting or agents

Every command supports `--json` for stable, machine-readable output:

```bash
abapctl check atc ZCL_FOO --json | jq '.findings[]'
```

## Where to go next

- [Guides](/docs/guides): task-oriented walkthroughs (editing, transports, workspaces).
- [Working with AI agents](/docs/guides/ai-agents): drive abapctl from an AI agent.
- [Clean Core](/docs/guides/clean-core): assess and remediate a package.
- [Concepts: lock → write → activate](/docs/concepts/lock-write-activate): the mental model behind every write command.
- [Command Reference](/docs/command-reference): the full catalog with safety flags.
