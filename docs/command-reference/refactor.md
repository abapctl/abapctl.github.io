---
title: "refactor: Refactoring and quick fixes"
sidebar_position: 4
---

# refactor: Refactoring and quick fixes

Evaluate and apply refactorings: quick fixes, rename, extract method, and move-to-package. Apply operations write.

Related guides: [edit-source](/docs/guides/edit-source).

4 commands.

### abapctl refactor quickfix

<span class="ac-pill ac-pill--destr">DESTR</span>

Evaluate/apply quick fixes at a cursor position (rename, extract, convert). For an ATC finding's fix, use `check atc-fix`.

> read-only without --apply; flag opts in to execution (no --yes needed)

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--line` | yes | line number (1-based) |
| `--col` | yes | column number (1-based) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--apply` | no | apply the Nth quick fix (1-based) |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl refactor quickfix ZCL_FOO
```

### abapctl refactor rename

<span class="ac-pill ac-pill--destr">DESTR</span>

Rename a symbol across the codebase

> read-only without --new-name; flag opts in to execution (no --yes needed)

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--line` | yes | line number (1-based) |
| `--col` | yes | column number (1-based) |
| `--connection` | no | connection profile name |
| `--end-col` | no | end column (defaults to --col) |
| `--include` | no | class include type |
| `--new-name` | no | new name for the symbol (triggers preview + execute) |
| `--transport` | no | transport request number |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl refactor rename ZCL_FOO
```

### abapctl refactor extract-method

<span class="ac-pill ac-pill--destr">DESTR</span>

Extract a code range into a new method

> read-only without --name; flag opts in to execution (no --yes needed)

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--start-line` | yes | start line number (1-based) |
| `--start-col` | yes | start column number (1-based) |
| `--end-line` | yes | end line number (1-based) |
| `--end-col` | yes | end column number (1-based) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--name` | no | method name (triggers preview + execute) |
| `--transport` | no | transport request number |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl refactor extract-method ZCL_FOO
```

### abapctl refactor move

<span class="ac-pill ac-pill--destr">DESTR</span>

Move one or more objects to a different package

> read-only without --package; flag opts in to execution (no --yes needed)

| Option | Required | Description |
|---|---|---|
| `objects` _(positional)_ | yes | objects (object/name argument) |
| `--connection` | no | connection profile name |
| `--package` | no | target package (triggers preview + execute) |
| `--transport` | no | transport request number |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl refactor move ZCL_FOO ZCL_BAR
```

