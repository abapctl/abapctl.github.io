---
title: "Standalone & config"
sidebar_position: 1
---

# Standalone & config

Top-level commands plus the `config` group for managing local connection profiles. These set up the CLI, probe a system, and run ad-hoc ABAP.

Related guides: [ai-agents](/docs/guides/ai-agents).

11 commands.

### abapctl init

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Create or extend .abapctl.json config (interactive in a TTY, template-write otherwise)

| Option | Required | Description |
|---|---|---|
| `--force` | no | overwrite existing config without prompting |
| `--template` | no | skip prompts and write the placeholder template |

```bash
abapctl init
```

### abapctl system-check

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Validate SAP connectivity, authentication, and write access

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | no | object to check |
| `--connection` | no | connection profile name |
| `--connection-only` | no | check TCP connectivity + authentication only |
| `--read` | no | check object resolution (requires object argument) |
| `--write` | no | check lock/unlock access (requires object argument) |

`--read` and `--write` are checks against a specific object, so each needs the `object` argument. Without an object, `system-check` verifies connectivity and authentication only.

```bash
abapctl system-check                       # connectivity + auth
abapctl system-check ZCL_FOO --read        # also resolve the object
abapctl system-check ZCL_FOO --write       # also test lock/unlock access
```

### abapctl run

<span class="ac-pill ac-pill--write">WRITE</span>

Execute ABAP statements on SAP and return text output

> executes user-provided ABAP; payload may modify system state

| Option | Required | Description |
|---|---|---|
| `--source` | yes | path to file containing ABAP statements |
| `--connection` | no | connection profile name |

```bash
abapctl run --source ./ZCL_FOO.clas.abap
```

### abapctl tools list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List all commands with tool annotations (readOnly, destructive, idempotent)

_No parameters._

```bash
abapctl tools list
```

### abapctl tools coverage

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Probe /sap/bc/adt/discovery on the active connection and report registry coverage by workspace

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--category` | no | filter to a single workspace and emit unimplemented hrefs |
| `--unimplemented-only` | no | emit only the unimplemented list (suppress workspace breakdown) |

```bash
abapctl tools coverage
```

### abapctl discover

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Discover SAP system capabilities and available ADT services

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--raw` | no | show all discovered ADT services (not just mapped capabilities) |

```bash
abapctl discover
```

### abapctl recipes

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List workflow recipes, structured guides for multi-step SAP tasks

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | no | recipe name (omit to list all) |
| `--tags` | no | filter by comma-separated tags |

```bash
abapctl recipes ZCL_FOO
```

### abapctl completion

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Print shell completion script (bash, zsh, fish)

> prints a shell completion script; no SAP connection

| Option | Required | Description |
|---|---|---|
| `shell` _(positional)_ | yes | shell: bash, zsh, or fish |

```bash
abapctl completion <shell>
```

### abapctl config show

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Display current configuration

_No parameters._

```bash
abapctl config show
```

### abapctl config set-connection

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Switch the active SAP connection

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |

```bash
abapctl config set-connection ZCL_FOO
```

### abapctl config add-connection

<span class="ac-pill ac-pill--write">WRITE</span>

Interactively add a new SAP connection to .abapctl.json

> requires interactive terminal; non-TTY and --json exit 2

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | no | name (object/name argument) |

```bash
abapctl config add-connection ZCL_FOO
```

