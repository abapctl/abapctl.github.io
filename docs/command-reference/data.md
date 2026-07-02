---
title: "data: Preview data"
sidebar_position: 6
---

# data: Preview data

Design-time data preview against DDIC tables, CDS views, and freestyle ABAP SQL.

Related guides: [ddic-cds](/docs/guides/ddic-cds).

3 commands.

### abapctl data query

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Preview data from a DDIC table or view

| Option | Required | Description |
|---|---|---|
| `table` _(positional)_ | yes | table (object/name argument) |
| `--connection` | no | connection profile name |
| `--rows` | no | max rows to return |
| `--where` | no | SQL WHERE clause filter |

```bash
abapctl data query T000
```

### abapctl data cds

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Preview data from a CDS view

| Option | Required | Description |
|---|---|---|
| `view` _(positional)_ | yes | view (object/name argument) |
| `--connection` | no | connection profile name |
| `--rows` | no | max rows to return |

```bash
abapctl data cds I_CURRENCY
```

### abapctl data sql

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Run freestyle ABAP SQL

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--query` | no | SQL statement to execute |
| `--source` | no | file containing SQL statement |
| `--rows` | no | max rows to return |

```bash
abapctl data sql --source ./ZCL_FOO.clas.abap
```

