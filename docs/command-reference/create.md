---
title: "create: Create new objects"
sidebar_position: 13
---

# create: Create new objects

Create new ABAP objects. Most types accept `--source <path>` for a one-shot create + body + activate; some carry typed flags. Each runs validate → transport check/auto-select → create.

Related guides: [object-creation](/docs/guides/object-creation).

21 commands.

### abapctl create class

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new ABAP class

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to source file (repeat for multi-include; filename suffix selects slot) |
| `--no-activate` | no | skip activation after writing sources |

```bash
abapctl create class ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create function-group

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new function group

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to source file (repeat for multi-include; filename suffix selects slot) |
| `--no-activate` | no | skip activation after writing sources |

```bash
abapctl create function-group ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create annotation-definition

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new CDS annotation definition

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |

```bash
abapctl create annotation-definition ZCL_FOO --dry-run
```

### abapctl create table

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new database table

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to DDL source file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create table ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create structure

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new DDIC structure

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to DDL source file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create structure ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create data-element

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new data element (DTEL)

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to raw XML body file (mutually exclusive with typed flags) |
| `--type` | no | type kind: 'domain' or 'predefinedAbapType' (inferred from --domain or --data-type if omitted) |
| `--domain` | no | reference an existing domain (mutually exclusive with --data-type) |
| `--data-type` | no | ABAP predefined data type (CHAR, NUMC, INT4, DEC, etc.) |
| `--length` | no | field length (required with --data-type) |
| `--decimals` | no | decimal places (numeric data types only) |
| `--label-short` | no | short label (max 10 chars) |
| `--label-medium` | no | medium label (max 20 chars) |
| `--label-long` | no | long label (max 40 chars) |
| `--label-heading` | no | column heading (max 55 chars) |
| `--search-help` | no | search help reference |
| `--search-help-parameter` | no | search help parameter |
| `--set-get-parameter` | no | SPA/GPA parameter |
| `--no-activate` | no | skip activation after writing properties |

```bash
abapctl create data-element ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create domain

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new domain (DOMA)

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to raw XML body file (mutually exclusive with typed flags) |
| `--data-type` | no | ABAP data type (CHAR, NUMC, DEC, etc.) |
| `--length` | no | field length |
| `--decimals` | no | decimal places (numeric types only) |
| `--lowercase` | no | allow lowercase values |
| `--conversion-exit` | no | conversion exit function (e.g. ALPHA) |
| `--value-table` | no | check table reference |
| `--fixed-value` | no | fixed value: low \| low:high: \| low::text \| low:high:text (repeatable) |
| `--no-activate` | no | skip activation after writing properties |

```bash
abapctl create domain ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create program

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new ABAP program

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create program ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create interface

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new ABAP interface

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create interface ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create include

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new include program

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create include ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create ddl-source

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new CDS DDL source

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create ddl-source ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create service-definition

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new service definition

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create service-definition ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create access-control

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new CDS access control

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create access-control ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create metadata-extension

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new CDS metadata extension

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create metadata-extension ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create function-module

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new function module

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--group` | yes | function group name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create function-module ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create function-group-include

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new function group include

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--group` | yes | function group name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create function-group-include ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create message-class

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new message class

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create message-class ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create auth-field

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new authorization field

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create auth-field ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create auth-object

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new authorization object

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--description` | yes | object description (required by SAP) |
| `--connection` | no | connection profile name |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |
| `--source` | no | path to body file (writes after shell create, then activates) |
| `--no-activate` | no | skip activation after writing the source |

```bash
abapctl create auth-object ZCL_FOO --source ./ZCL_FOO.clas.abap
```

### abapctl create service-binding

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new service binding

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--service` | yes | service definition name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--transport` | no | transport request number |
| `--protocol` | no | OData protocol for the binding (default v2) |
| `--binding-category` | no | binding category: ui or webapi (default by protocol) |
| `--no-activate` | no | skip activation after creating the binding (leaves it inactive and not publishable until activated) |
| `--dry-run` | no | validate and resolve transport without creating |

```bash
abapctl create service-binding ZCL_FOO --dry-run
```

### abapctl create package

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new SAP package

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--description` | yes | package description |
| `--swcomp` | yes | software component |
| `--transport-layer` | yes | transport layer |
| `--connection` | no | connection profile name |
| `--package-type` | no | package type (development\|structure\|main) |
| `--super-package` | no | parent package |
| `--transport` | no | transport request number |
| `--record-changes` | no | record changes in transport (auto-detected from transport layer) |
| `--dry-run` | no | validate and resolve transport without creating |

```bash
abapctl create package ZCL_FOO --dry-run
```

