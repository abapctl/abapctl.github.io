---
title: "package: Packages"
sidebar_position: 11
---

# package: Packages

Discover packages, check existence, and look up valid values for package fields.

Related guides: [read-navigate](/docs/guides/read-navigate).

3 commands.

### abapctl package list

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List custom (Z*/Y*) packages from the SAP system

| Option | Required | Description |
|---|---|---|
| `--connection` | no | connection profile name |
| `--prefix` | no | package name prefix(es) (repeatable) |

```bash
abapctl package list
```

### abapctl package exists

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Check if a package exists and show its metadata

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl package exists ZCL_FOO
```

### abapctl package lookup

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Look up valid values for package fields (transport layers, software components, etc.)

| Option | Required | Description |
|---|---|---|
| `type` _(positional)_ | yes | value help type |
| `--connection` | no | connection profile name |
| `--filter` | no | filter results by name pattern |

```bash
abapctl package lookup transportlayer
```

