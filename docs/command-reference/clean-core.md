---
title: "clean-core: Assessment and remediation"
sidebar_position: 17
---

# clean-core: Assessment and remediation

ATC-driven Clean Core assessment, classification (A–D), reporting, fix preparation, and apply.

Related guides: [clean-core](/docs/guides/clean-core).

5 commands.

### abapctl clean-core assess

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Assess package or object for Clean Core compliance

| Option | Required | Description |
|---|---|---|
| `target` _(positional)_ | yes | target (object/name argument) |
| `--connection` | no | connection profile name |
| `--variant` | no | ATC check variant |
| `--force` | no | delete existing state and re-run assessment |

```bash
abapctl clean-core assess <target>
```

### abapctl clean-core report

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Regenerate SUMMARY.md from progress.json (local only, no SAP connection)

| Option | Required | Description |
|---|---|---|
| `target` _(positional)_ | yes | target (object/name argument) |

```bash
abapctl clean-core report <target>
```

### abapctl clean-core executive

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Generate executive summary from all assessed packages

_No parameters._

```bash
abapctl clean-core executive
```

### abapctl clean-core prep

<span class="ac-pill ac-pill--idemp">IDEMP</span>

Download source and prepare fix context for D/C objects

| Option | Required | Description |
|---|---|---|
| `target` _(positional)_ | yes | target (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl clean-core prep <target>
```

### abapctl clean-core apply

<span class="ac-pill ac-pill--destr">DESTR</span>

Push modified source from fix directory back to SAP: lock, write, unlock, activate

> prompts for confirmation; read-only with --dry-run

| Option | Required | Description |
|---|---|---|
| `target` _(positional)_ | yes | target (object/name argument) |
| `--connection` | no | connection profile name |
| `--dry-run` | no | list objects without writing to SAP |
| `--yes` | no | skip confirmation prompt |
| `--object` | no | apply fix for a single object only |

```bash
abapctl clean-core apply <target> --dry-run
```

