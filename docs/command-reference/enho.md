---
title: "enho: Enhancement implementations"
sidebar_position: 15
---

# enho: Enhancement implementations

Source-level read of enhancement implementations (ENHO) on a base object, plus a system- or package-scoped inventory.

Related guides: [read-navigate](/docs/guides/read-navigate), [clean-core](/docs/guides/clean-core).

2 commands.

### abapctl enho on

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List enhancement implementations active on the given base object (programs, FUGRs, classes)

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |
| `--adt-type` | no | ADT object type (e.g. PROG/P, CLAS/OC). Auto-discovered if omitted |
| `--include` | no | class include type (only valid for CLAS/OC) |
| `--no-decode` | no | return base64-encoded source instead of decoded UTF-8 |

```bash
abapctl enho on ZCL_FOO
```

### abapctl enho list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List enhancement implementations on the system, optionally filtered by type, package, or customer-only

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--type` | no | enhancement type filter (source-code=ENHO/XHH, badi-impl=ENHO/XHB, enhancement=ENHO/XH, enhancement-spot=ENHS/XS, badi-spot=ENHS/XSB). When omitted, aggregates the 3 enhancement-implementation types (excludes spots; use --type enhancement-spot or --type badi-spot to opt in). |
| `--customer-only` | no | filter to customer-authored ENHOs (Z*/Y* prefix queries; namespaced customers like /ACME/* require --package or downstream JSON filtering) |
| `--package` | no | filter by package name |
| `--max-results` | no | maximum results per search bucket (default 200, NOT a total cap) |

```bash
abapctl enho list
```

