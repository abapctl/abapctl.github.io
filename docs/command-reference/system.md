---
title: "system & monitor: System facts and diagnostics"
sidebar_position: 20
---

# system & monitor: System facts and diagnostics

SAP system facts (kernel/DB/OS), installed software components, and runtime diagnostics (dumps, syslog, jobs, monitoring feeds). The `monitor` family is grouped here.

6 commands.

### abapctl system info

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show SAP system facts: kernel, database, OS, release (GET /sap/bc/adt/system/information; works on every release including older NetWeaver)

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl system info
```

### abapctl system components

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List installed software components with release / support-package / patch level (GET /sap/bc/adt/system/components; works on every release including older NetWeaver)

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--filter` | no | case-insensitive substring filter over component name + description |

```bash
abapctl system components
```

### abapctl monitor list-feeds

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List the monitoring feeds this system exposes (SAP titles, verbatim)

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl monitor list-feeds
```

### abapctl monitor dumps

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List ABAP runtime-error dumps, or show one dump by its id (from the list)

| Option | Required | Description |
|---|---|---|
| `id` _(positional)_ | no | id (object/name argument) |
| `--connection` | no | connection profile name |
| `--from` | no | lower bound: ISO date/datetime or SAP YYYYMMDD[HHMMSS] (list mode) |
| `--to` | no | upper bound: ISO date/datetime or SAP YYYYMMDD[HHMMSS] (list mode) |

```bash
abapctl monitor dumps <id>
```

### abapctl monitor syslog

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Read the SM21 ABAP system log for a time window (executes ABAP via classrun)

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--from` | no | lower bound: ISO date/datetime or SAP YYYYMMDD[HHMMSS] (default: today) |
| `--to` | no | upper bound: ISO date/datetime or SAP YYYYMMDD[HHMMSS] (default: today) |
| `--limit` | no | max entries (newest first) |
| `--user` | no | filter by SAP user (applied client-side) |

```bash
abapctl monitor syslog
```

### abapctl monitor jobs

<span class="ac-pill ac-pill--idemp">IDEMP</span>

List background jobs (SM37), show a run's steps, or read its log (--log executes ABAP)

> read-only without --log (list/step-detail via data sql); --log executes ABAP via classrun

| Option | Required | Description |
|---|---|---|
| `jobname` _(positional)_ | no | jobname (object/name argument) |
| `jobcount` _(positional)_ | no | jobcount (object/name argument) |
| `--connection` | no | connection profile name |
| `--name` | no | filter by job name ('*' wildcard); list mode |
| `--user` | no | filter by the job's header user (TBTCO authcknam, the scheduling/run-as user, not the per-step user); list mode |
| `--status` | no | filter by status; list mode |
| `--from` | no | jobs started on/after this date (ISO or YYYYMMDD); list mode |
| `--to` | no | jobs started on/before this date; list mode |
| `--limit` | no | max jobs (newest first) |
| `--log` | no | read the job log for `<jobname>` `<jobcount>` (executes ABAP via classrun) |

```bash
abapctl monitor jobs <jobname> <jobcount>
```

