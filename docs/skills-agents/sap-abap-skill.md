---
title: The sap-abap skill
sidebar_position: 1
---

# The `sap-abap` skill

`sap-abap` is the general-purpose skill for driving abapctl. It is the thing you load into an agent so that, when a user mentions SAP, ABAP, ATC, transports, CDS, RAP, OData, or any of the development primitives abapctl covers, the agent knows *which* command fits the intent, *how* to call it safely, and *what* to do with the result.

It is not a wrapper or a code layer; it is **a Markdown mental model**. The skill is two files: `SKILL.md` (the decision aid you keep loaded) and `reference.md` (the flag catalog and non-obvious behaviors you consult when picking flags).

## What it gives an agent

- **A mental model** of what abapctl is and where it sits (the deterministic primitive under the agent's reasoning).
- **An intent→command map**: a scannable table from "what the user wants" to "which command does it", covering browse/understand, read source, run checks, preview data, consume OData, refactor, write/activate, create, transport, workspace, Clean Core, system.
- **A safety model**: every command pre-classified read-only / mutating / destructive, plus the rules for `--dry-run`, `--yes`, transports, and dual-mode refactoring (evaluate-first, execute-only-with-an-action-flag).
- **A failure decoder**: common symptoms (401/403, HTTP 423 lock, `CAPABILITY_NOT_AVAILABLE`) mapped to cause and fix.
- **The non-obvious rules** that otherwise cost an agent cycles. For example: `source get` with no `--include` returns the full global class including method bodies (and writing a global `IMPLEMENTATION` into the `implementations` include breaks activation), positions are 1-based, and `text-elements put` requires `--category` and does not auto-activate.

## The core principle: never assume a command exists

The most important instruction in the skill is that **the skill is a map, not the territory.** The CLI evolves (new command groups, new flags) and any static skill file can lag. So before acting, the agent grounds itself in the live contract on the machine it is running on:

> 1. **`abapctl tools list --json`** is the authoritative machine-readable contract: every command, its parameters, and its `readOnly` / `destructive` / `idempotent` annotations. **Run this first** to discover the real command set and to decide safety. Treat the `destructive` flag as binding regardless of what the skill says.
> 2. **`abapctl <group> --help`** and **`abapctl <group> <cmd> --help`** give exact flags, choices, and defaults when you need detail beyond the contract.
> 3. Only then consult the skill's tables as a shortcut for *which* command fits an intent.

The corollary: **do not invent command names, flags, or values from memory or from the skill alone.** If a command or flag is not in `tools list --json` / `--help` on this system, it does not exist there, so adapt rather than guess. If `tools list` shows a command the skill doesn't mention, trust `tools list`. The live contract always wins.

## How an agent uses it

A typical loop the skill encodes:

1. Discover and ground: `tools list --json`, then `--help` for detail.
2. **Understand before changing** with `code definition`, `code element-info`, `code references` to map impact.
3. **Round-trip source**: `source get` → edit → `check syntax --source` → `source put` → re-check, always previewing destructive writes with `--dry-run` and only passing `--yes` after a human approves.
4. **Read exit codes as signal**: `0` clean, `1` partial (findings exist, diffs present, treat as *data*, not a crash), `2` hard error (auth/config/SAP fault, so stop and surface `error.code`).

The skill also reminds agents to pass `-c <connection>` and `--json` on every call, to persist a `--session-file` to save login round-trips, and to probe capability (`discover` / `tools coverage`) before assuming a feature exists on a given system. See [Capabilities & gating](/docs/concepts/capabilities) for why that matters.

## Installing it

The skill ships with the [Clean Core kit](https://github.com/aws-for-sap/agentic-ai-guidance-for-SAP-use-cases/tree/main/clean-core) under `.kiro/skills/sap-abap/`. Copy that directory into your project and the agent auto-discovers it on the next session. It is also a dependency of the rest of the kit: the [`clean-core-remediator`](./clean-core-skills.md) subagent lists it as a resource, so every per-object worker reads the same abapctl reference before guessing a flag.
