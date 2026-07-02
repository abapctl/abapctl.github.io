---
title: "object: Browse and manage objects"
sidebar_position: 2
---

# object: Browse and manage objects

Inspect, search, browse, activate, and delete existing ABAP objects.

Related guides: [read-navigate](/docs/guides/read-navigate).

9 commands.

### abapctl object info

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show metadata for an ABAP object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl object info ZCL_FOO
```

### abapctl object tree

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Browse objects in a package

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl object tree ZFINANCE
```

### abapctl object types

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List creatable ABAP object types

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl object types
```

### abapctl object inactive

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List inactive objects in the SAP system

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl object inactive
```

### abapctl object delete

<span class="ac-pill ac-pill--destr">DESTR</span>

Delete an ABAP object from the SAP system

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--yes` | no | skip confirmation prompt |
| `--dry-run` | no | show what would be deleted without deleting |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl object delete ZCL_FOO --dry-run
```

### abapctl object history

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show revision history for an ABAP object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl object history ZCL_FOO
```

### abapctl object search

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Search for ABAP objects by name pattern

| Option | Required | Description |
|---|---|---|
| `query` _(positional)_ | yes | query (object/name argument) |
| `--connection` | no | connection profile name |
| `--type` | no | filter by object type (e.g. CLAS, PROG, TABL) |
| `--package` | no | filter by package name |
| `--max-results` | no | maximum number of results (default 50) |

```bash
abapctl object search ZCL_*
```

### abapctl object activate

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Activate one or more ABAP objects (batch for multiple)

> single uses sync, multiple uses batch activation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `objects` _(positional)_ | yes | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--dry-run` | no | show what would be activated without activating |
| `--continue-on-error` | no | activate each object individually, continuing past failures (multi-object only; trades the atomic batch for partial progress with no dependency reordering; auto-enabled on systems without batch activation, e.g. ECC) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl object activate ZCL_FOO ZCL_BAR --dry-run
```

### abapctl object path

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show the hierarchical path from root to an object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl object path ZCL_FOO
```

