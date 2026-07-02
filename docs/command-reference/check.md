---
title: "check: Quality checks"
sidebar_position: 7
---

# check: Quality checks

Syntax checks, ATC runs, the find → inspect → fix loop, ABAP Unit, CDS syntax, and ATC exemptions.

Related guides: [quality-checks](/docs/guides/quality-checks).

9 commands.

### abapctl check syntax

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Syntax-check ABAP source against SAP without writing it

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--source` | no | path to source file (omit to check active version) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check syntax ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl check atc

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Run single-object ATC check for Clean Core compliance

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--variant` | no | ATC check variant |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check atc ZCL_FOO
```

### abapctl check atc-inspect

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Inspect ATC findings' quickfix metadata (kinds, doc URLs, tags); read-only. To apply a fix, use `check atc-fix`.

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--variant` | yes | ATC check variant (required); see `check atc-variants` |
| `--connection` | no | connection profile name |
| `--filter` | no | filter findings by quickfix kind |
| `--max-verdicts` | no | maximum verdicts to retrieve (defaults to clean_core.max_verdicts) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check atc-inspect ZCL_FOO
```

### abapctl check atc-fix

<span class="ac-pill ac-pill--destr">DESTR</span>

Apply an ATC finding's quick fix (preview by default; --apply to write). For cursor-position fixes use `refactor quickfix`.

> read-only without --apply; --apply opts in to writing the fix (no --yes needed)

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--variant` | yes | ATC check variant (required); see `check atc-variants` |
| `--connection` | no | connection profile name |
| `--apply` | no | write the fix(es): bare = all non-conflicting, [index] = only the Nth listed fix |
| `--dry-run` | no | preview only (the default; accepted for symmetry with other write commands) |
| `--no-activate` | no | when applying, write source but do not activate |
| `--transport` | no | transport request to write against (overrides the lock default) |
| `--all` | no | bulk auto-quickfix across the worklist (not yet implemented) |
| `--max-verdicts` | no | maximum verdicts to retrieve (defaults to clean_core.max_verdicts) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check atc-fix ZCL_FOO --dry-run
```

### abapctl check unit

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Run ABAP Unit tests for a single object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--junit` | no | use async flow and output JUnit XML (requires the async ABAP Unit run; not on all stacks) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check unit ZCL_FOO
```

### abapctl check atc-variants

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List available ATC check variants

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |

```bash
abapctl check atc-variants
```

### abapctl check cds-syntax

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Syntax-check CDS DDL source against SAP

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--source` | no | path to source file (checks draft; omit to check active version) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl check cds-syntax ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl check atc-exempt-proposal

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get ATC exemption proposal for a finding

| Option | Required | Description |
|---|---|---|
| `markerId` _(positional)_ | yes | markerId (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl check atc-exempt-proposal MARKER_ID
```

### abapctl check atc-exempt

<span class="ac-pill ac-pill--write">WRITE</span>

Request an ATC exemption for a finding

| Option | Required | Description |
|---|---|---|
| `markerId` _(positional)_ | yes | markerId (object/name argument) |
| `--reason` | yes | exemption reason (FPOS or OTHR) |
| `--justification` | yes | justification text |
| `--connection` | no | connection profile name |
| `--approver` | no | approver username |

```bash
abapctl check atc-exempt MARKER_ID
```

