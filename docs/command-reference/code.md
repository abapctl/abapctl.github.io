---
title: "code: Navigation and intelligence"
sidebar_position: 3
---

# code: Navigation and intelligence

IDE-grade navigation and compiler-authoritative completion: go to definition, element info, where-used, usage snippets, and code completion.

Related guides: [read-navigate](/docs/guides/read-navigate), [ai-agents](/docs/guides/ai-agents).

5 commands.

### abapctl code definition

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Navigate to definition of symbol at cursor position

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--line` | yes | line number (1-based) |
| `--col` | yes | column number (1-based) |
| `--connection` | no | connection profile name |
| `--end-col` | no | end column (defaults to --col) |
| `--implementation` | no | find implementation instead of definition |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl code definition ZCL_FOO
```

### abapctl code element-info

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get type, docs, and component info for symbol at cursor position

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--line` | yes | line number (1-based) |
| `--col` | yes | column number (1-based) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl code element-info ZCL_FOO
```

### abapctl code references

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Find all references (where-used list) for an object or symbol

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--line` | no | line number for position-specific lookup |
| `--col` | no | column number for position-specific lookup |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl code references ZCL_FOO
```

### abapctl code snippets

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show code context at each reference site

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--line` | no | line number for position-specific lookup |
| `--col` | no | column number for position-specific lookup |
| `--include` | no | class include type |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl code snippets ZCL_FOO
```

### abapctl code complete

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get valid completions at cursor position

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--line` | yes | line number (1-based) |
| `--col` | yes | column number (1-based) |
| `--connection` | no | connection profile name |
| `--include` | no | class include type |
| `--source` | no | use a local file as the source buffer instead of fetching from SAP |
| `--prefix` | no | splice this text at the cursor before querying (server filters by it) |
| `--kind` | no | filter results to a specific kind |
| `--max` | no | cap result count |
| `--adt-type` | no | ADT object type (e.g. PROG/P, DDLS/DF, CLAS/OC). Use when a name is shared by multiple object types |

```bash
abapctl code complete ZCL_FOO --source ./ZCL_FOO.clas.abap
```

