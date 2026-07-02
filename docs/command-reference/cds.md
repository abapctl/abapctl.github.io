---
title: "cds: CDS intelligence"
sidebar_position: 8
---

# cds: CDS intelligence

CDS annotation definitions, DDIC element-info trees, entity → DDL resolution, and test-double dependencies.

Related guides: [ddic-cds](/docs/guides/ddic-cds).

4 commands.

### abapctl cds annotations

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get CDS annotation definitions

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl cds annotations
```

### abapctl cds element-info

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get DDIC element info for a CDS entity

| Option | Required | Description |
|---|---|---|
| `entity` _(positional)_ | yes | entity (object/name argument) |
| `--connection` | no | connection profile name |
| `--follow-associations` | no | resolve association targets |
| `--no-extension-views` | no | exclude extension views |
| `--no-secondary-objects` | no | exclude secondary objects |

```bash
abapctl cds element-info I_CURRENCY
```

### abapctl cds repository-access

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get DDL repository access info for a CDS entity

| Option | Required | Description |
|---|---|---|
| `entity` _(positional)_ | yes | entity (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl cds repository-access I_CURRENCY
```

### abapctl cds test-dependencies

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get CDS test double dependencies for a CDS entity

| Option | Required | Description |
|---|---|---|
| `entity` _(positional)_ | yes | entity (object/name argument) |
| `--connection` | no | connection profile name |
| `--level` | no | dependency level: hierarchy or unit |
| `--associations` | no | include modeled associations |

```bash
abapctl cds test-dependencies I_CURRENCY
```

