---
title: "bdef: Behavior definitions"
sidebar_position: 14
---

# bdef: Behavior definitions

Read and create RAP behavior definitions and list assigned BO interfaces.

Related guides: [bdef-rap](/docs/guides/bdef-rap).

3 commands.

### abapctl bdef get

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Get behavior definition metadata and source

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl bdef get ZCL_FOO
```

### abapctl bdef create

<span class="ac-pill ac-pill--write">WRITE</span>

Create a new behavior definition

> read-only with --dry-run; validates and resolves transport without creating

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--package` | yes | package name |
| `--connection` | no | connection profile name |
| `--description` | no | object description |
| `--implementation-type` | no | managed or unmanaged |
| `--file` | no | read BDEF source from file |
| `--transport` | no | transport request number |
| `--dry-run` | no | validate and resolve transport without creating |

```bash
abapctl bdef create ZCL_FOO --dry-run
```

### abapctl bdef listinterfaces

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

List the BO interfaces assigned to a behavior definition

| Option | Required | Description |
|---|---|---|
| `name` _(positional)_ | yes | name (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl bdef listinterfaces ZCL_FOO
```

