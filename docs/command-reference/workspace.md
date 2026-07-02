---
title: "workspace: Local ↔ SAP sync"
sidebar_position: 16
---

# workspace: Local ↔ SAP sync

Bidirectional sync between local files and SAP objects, like git clone. SID-aligned layout, manifest tracking, conflict detection.

Related guides: [workspaces](/docs/guides/workspaces).

10 commands.

### abapctl workspace init

<span class="ac-pill ac-pill--write">WRITE</span>

Create workspace: discover objects, download sources, write manifest

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `--connection` | no | connection profile name |
| `--source-dir` | no | source file subdirectory name |
| `--transport` | no | default transport for push operations |
| `--filter` | no | only include objects matching name pattern |
| `--type` | no | only include object types, comma-separated |
| `--recursive` | no | recurse into sub-packages |
| `--depth` | no | sub-package recursion depth (implies --recursive) |
| `--no-download` | no | create manifest only, then pull later |
| `--concurrency` | no | parallel download limit (default: 5) |
| `--force` | no | re-initialize if workspace already exists |
| `--dry-run` | no | show discovery results without downloading or writing |

```bash
abapctl workspace init ZFINANCE --dry-run
```

### abapctl workspace status

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show sync state (overview or detailed)

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | no | package (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl workspace status ZFINANCE
```

### abapctl workspace list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List tracked objects (reads manifest only)

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | no | package (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl workspace list ZFINANCE
```

### abapctl workspace pull

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Download/refresh sources from SAP

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `objects` _(positional)_ | no | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--force` | no | overwrite local changes even if modified |
| `--dry-run` | no | show sync plan without downloading |

```bash
abapctl workspace pull ZFINANCE ZCL_FOO ZCL_BAR --dry-run
```

### abapctl workspace push

<span class="ac-pill ac-pill--destr">DESTR</span>

Upload local changes to SAP and activate

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `objects` _(positional)_ | no | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--yes` | no | skip confirmation prompt |
| `--force` | no | skip conflict detection |
| `--no-activate` | no | upload without activating |
| `--transport` | no | override transport for this push |
| `--dry-run` | no | show what would be pushed |

```bash
abapctl workspace push ZFINANCE ZCL_FOO ZCL_BAR --dry-run
```

### abapctl workspace diff

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show local changes vs SAP baseline

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `object` _(positional)_ | no | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--sap` | no | diff against live SAP source |
| `--name-only` | no | list changed files only |

```bash
abapctl workspace diff ZFINANCE ZCL_FOO
```

### abapctl workspace add

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Add objects to an existing workspace

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `objects` _(positional)_ | yes | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--concurrency` | no | parallel download limit (default: 5) |
| `--dry-run` | no | show what would be added without downloading |

```bash
abapctl workspace add ZFINANCE ZCL_FOO ZCL_BAR --dry-run
```

### abapctl workspace remove

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Stop tracking objects

> --delete requires --yes for file removal; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `objects` _(positional)_ | yes | objects (object/name argument) |
| `--yes` | no | skip confirmation prompt |
| `--delete` | no | also delete local source files (requires --yes) |
| `--dry-run` | no | show what would be removed without removing |
| `--connection` | no | connection profile name |

```bash
abapctl workspace remove ZFINANCE ZCL_FOO ZCL_BAR --dry-run
```

### abapctl workspace reset

<span class="ac-pill ac-pill--destr">DESTR</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Discard local changes, restore baseline

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `objects` _(positional)_ | no | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--yes` | no | skip confirmation prompt |
| `--sap` | no | re-download from SAP instead of stored baseline |
| `--dry-run` | no | show what would be reset without writing files |

```bash
abapctl workspace reset ZFINANCE ZCL_FOO ZCL_BAR --dry-run
```

### abapctl workspace refresh

<span class="ac-pill ac-pill--write">WRITE</span>

Discover and download new objects not yet in workspace

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `package` _(positional)_ | yes | package (object/name argument) |
| `--connection` | no | connection profile name |
| `--recursive` | no | recurse into sub-packages |
| `--depth` | no | sub-package recursion depth (implies --recursive) |
| `--filter` | no | only include objects matching name pattern |
| `--type` | no | only include object types, comma-separated |
| `--concurrency` | no | parallel download limit (default: 5) |
| `--force` | no | skip SID affinity validation |
| `--dry-run` | no | show what would be added without downloading |

```bash
abapctl workspace refresh ZFINANCE --dry-run
```

