---
title: "source: Download and upload source"
sidebar_position: 5
---

# source: Download and upload source

Read and write ABAP source. Uploads run the lock → write → unlock → activate lifecycle.

Related guides: [edit-source](/docs/guides/edit-source).

5 commands.

### abapctl source get

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Download ABAP source code

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, FUGR/FF). Use when a name is shared by multiple object types |

```bash
abapctl source get ZCL_FOO
```

### abapctl source put

<span class="ac-pill ac-pill--destr">DESTR</span>

Upload ABAP source code (lock → write → unlock → activate)

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--file` | yes | path to source file |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, FUGR/FF). Use when a name is shared by multiple object types |
| `--transport` | no | transport request number |
| `--yes` | no | skip confirmation prompt |
| `--no-activate` | no | skip activation after write |
| `--dry-run` | no | show what would be uploaded without writing |

```bash
abapctl source put ZCL_FOO --dry-run
```

### abapctl source push

<span class="ac-pill ac-pill--destr">DESTR</span>

Upload multiple ABAP source files (sequential lock → write → unlock, batch activate)

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `objects` _(positional)_ | yes | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--dir` | no | directory containing `<OBJNAME>`.abap files |
| `--transport` | no | transport request number |
| `--yes` | no | skip confirmation prompt |
| `--no-activate` | no | skip activation after write |
| `--dry-run` | no | show what would be pushed without writing |

```bash
abapctl source push ZCL_FOO ZCL_BAR --dry-run
```

### abapctl source format

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Pretty-print ABAP source from stdin

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl source format
```

### abapctl source format-settings

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Get or set pretty printer settings

> read-only without --style or --indentation

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--style` | no | set style (toLower, toUpper, keywordUpper, keywordLower, keywordAuto, none) |
| `--indentation` | no | set indentation (true/false) |

```bash
abapctl source format-settings
```

