---
title: "transport: Transport requests"
sidebar_position: 12
---

# transport: Transport requests

Transport request lifecycle: check requirements, create, list, inspect, release, and delete.

Related guides: [transports](/docs/guides/transports).

6 commands.

### abapctl transport info

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Check transport requirements for an object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--package` | no | package name (devclass) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl transport info ZCL_FOO
```

### abapctl transport create

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new transport request

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `--description` | yes | transport description |
| `--connection` | no | connection profile name |
| `--ref` | no | reference object URI |
| `--package` | no | package name (devclass) |
| `--dry-run` | no | show parameters without creating |

```bash
abapctl transport create --dry-run
```

### abapctl transport list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List transport requests

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--user` | no | show transports for this user |
| `--status` | no | which requests to list |

```bash
abapctl transport list
```

### abapctl transport get

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get transport request details

| Option | Required | Description |
|---|---|---|
| `number` _(positional)_ | yes | number (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl transport get K9A123
```

### abapctl transport release

<span class="ac-pill ac-pill--destr">DESTR</span>

Release a transport request

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `number` _(positional)_ | yes | number (object/name argument) |
| `--connection` | no | connection profile name |
| `--yes` | no | skip confirmation prompt |
| `--ignore-locks` | no | release even if objects are locked |
| `--ignore-atc` | no | release even if ATC findings exist |
| `--dry-run` | no | show transport details without releasing |

```bash
abapctl transport release K9A123 --dry-run
```

### abapctl transport delete

<span class="ac-pill ac-pill--destr">DESTR</span>

Delete a transport request

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `number` _(positional)_ | yes | number (object/name argument) |
| `--connection` | no | connection profile name |
| `--yes` | no | skip confirmation prompt |
| `--recursive` | no | remove the transport's objects (stale locks) before deleting |
| `--dry-run` | no | show transport details without deleting |

```bash
abapctl transport delete K9A123 --dry-run
```

