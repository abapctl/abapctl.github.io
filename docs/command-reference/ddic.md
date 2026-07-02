---
title: "ddic: DDIC deep metadata"
sidebar_position: 10
---

# ddic: DDIC deep metadata

Read-only deep metadata for tables, structures, domains, data elements, table types, lock objects, type groups, and views.

Related guides: [ddic-cds](/docs/guides/ddic-cds).

9 commands.

### abapctl ddic table-settings

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get table technical settings

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic table-settings ZCL_FOO
```

### abapctl ddic data-element

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get data element metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic data-element ZCL_FOO
```

### abapctl ddic domain

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get domain metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic domain ZCL_FOO
```

### abapctl ddic table-type

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get table type metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic table-type ZCL_FOO
```

### abapctl ddic lock-object

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get lock object metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic lock-object ZCL_FOO
```

### abapctl ddic type-group

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get type group metadata and source

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic type-group ZCL_FOO
```

### abapctl ddic structure

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get structure metadata and source

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic structure ZCL_FOO
```

### abapctl ddic table

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get table definition with metadata, source, and parsed fields

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic table ZCL_FOO
```

### abapctl ddic view

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get DDIC view metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl ddic view ZCL_FOO
```

