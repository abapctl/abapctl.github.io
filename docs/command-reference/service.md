---
title: "service: Service binding lifecycle"
sidebar_position: 9
---

# service: Service binding lifecycle

Publish, unpublish, inspect, and smoke-test OData service bindings (V2 and V4).

Related guides: [services-odata](/docs/guides/services-odata).

4 commands.

### abapctl service publish

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Publish a service binding to make it available as OData service

> read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |
| `--protocol` | no | OData protocol (auto-detected from the binding when omitted) |
| `--dry-run` | no | show what would be published without publishing |

```bash
abapctl service publish ZCL_FOO --dry-run
```

### abapctl service unpublish

<span class="ac-pill ac-pill--destr">DESTR</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Unpublish a service binding

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |
| `--yes` | no | skip confirmation prompt |
| `--protocol` | no | OData protocol (auto-detected from the binding when omitted) |
| `--dry-run` | no | show what would be unpublished without unpublishing |

```bash
abapctl service unpublish ZCL_FOO --dry-run
```

### abapctl service binding-details

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Show a service binding: protocol version, published state, service definition, OData URL

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl service binding-details ZCL_FOO
```

### abapctl service test

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Verify a published binding actually serves data: resolve runtime URL, fetch metadata, smoke-query

| Option | Required | Description |
|---|---|---|
| `binding` _(positional)_ | yes | binding (object/name argument) |
| `--connection` | no | connection profile name |
| `--runtime-url` | no | explicit OData runtime URL (skips auto-resolution) |
| `--protocol` | no | override the binding protocol |
| `--rows` | no | rows to smoke-query ($top) |

```bash
abapctl service test <binding>
```

