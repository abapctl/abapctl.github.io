---
title: "text-elements: Translatable text"
sidebar_position: 21
---

# text-elements: Translatable text

Read and write translatable text resources (symbols, selections, headings) for source-bearing objects.

Related guides: [edit-source](/docs/guides/edit-source).

2 commands.

### abapctl text-elements get

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Read text elements from an ABAP source-bearing object

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--category` | no | text-element category |
| `--adt-type` | no | ADT object type (e.g. PROG/P, CLAS/OC, FUGR/F). Use when a name is shared by multiple object types |

```bash
abapctl text-elements get ZCL_FOO
```

### abapctl text-elements put

<span class="ac-pill ac-pill--destr">DESTR</span>

Write text elements to an ABAP source-bearing object (lock → PUT → unlock; --activate opt-in)

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--category` | yes | text-element category |
| `--file` | yes | path to text-elements body file (key=value plaintext) |
| `--connection` | no | connection profile name |
| `--adt-type` | no | ADT object type (e.g., PROG/P, CLAS/OC, FUGR/F) |
| `--transport` | no | transport request number |
| `--activate` | no | activate the parent object after writing (opt-in; not required for text-elements) |
| `--dry-run` | no | show what would be uploaded without writing |

```bash
abapctl text-elements put ZCL_FOO --dry-run
```

