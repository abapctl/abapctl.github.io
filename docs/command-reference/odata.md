---
title: "odata: OData runtime consumption"
sidebar_position: 19
---

# odata: OData runtime consumption

Consume published OData runtime services over the Gateway. The consumer's view, orthogonal to design-time `data` preview.

Related guides: [services-odata](/docs/guides/services-odata).

3 commands.

### abapctl odata list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List the live OData service catalog (V2 + V4)

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--filter` | no | filter services by name/title/description (case-insensitive) |
| `--v2-only` | no | list only V2 services (skip the V4 catalog) |
| `--v4-only` | no | list only V4 services (skip the V2 catalog) |

```bash
abapctl odata list
```

### abapctl odata metadata

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show a service's entity sets, keys, properties, and function imports

| Option | Required | Description |
|---|---|---|
| `service` _(positional)_ | yes | service (object/name argument) |
| `--connection` | no | connection profile name |
| `--raw` | no | print the raw $metadata XML verbatim |

```bash
abapctl odata metadata ZMY_SRV
```

### abapctl odata query

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Query an entity set (or read a single entity with --key)

| Option | Required | Description |
|---|---|---|
| `service` _(positional)_ | yes | service (object/name argument) |
| `entityset` _(positional)_ | yes | entityset (object/name argument) |
| `--connection` | no | connection profile name |
| `--filter` | no | OData $filter expression |
| `--select` | no | comma-separated $select fields |
| `--top` | no | max rows ($top) |
| `--skip` | no | rows to skip ($skip) |
| `--orderby` | no | comma-separated $orderby expression |
| `--expand` | no | comma-separated $expand navigation properties |
| `--count` | no | include the total count |
| `--key` | no | read a single entity by raw OData key, e.g. "SalesOrder='A 1',Item=10" |

```bash
abapctl odata query ZMY_SRV CurrencySet
```

