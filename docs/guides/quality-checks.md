---
title: Quality checks
sidebar_position: 3
---

# Quality checks

Run syntax, ATC, ABAP Unit, and CDS-DDL checks against the active version of an object or a draft buffer, and inspect or apply ATC quick fixes.

## Syntax, ATC, unit, CDS

```bash
abapctl check syntax ZCL_FOO
abapctl check atc ZCL_FOO --variant ABAP_CLOUD_READINESS
abapctl check unit ZCL_FOO
abapctl check cds-syntax I_MyView
```

- **`check syntax`** runs an ABAP syntax check. Pass `--source <path>` to check an unsaved draft buffer instead of the active version.
- **`check atc`** runs a single-object ATC re-check. `--variant` selects the check variant; `abapctl check atc-variants` lists the variants installed on your system.
- **`check unit`** runs the ABAP Unit tests for the object.
- **`check cds-syntax`** runs a CDS-DDL syntax check (active version, or a draft with `--source`).

To set a default ATC variant for the [Clean Core](./clean-core.md) workflow, edit `clean_core.atc_variant` in `.abapctl.json`.

## Inspect ATC quick-fix metadata

Every ATC worklist carries per-finding metadata that the plain `check atc` projection drops: a documentation URL, fix-availability flags (`manual` / `automatic` / `pseudo` / `ai`), and tags (referenced object name and type, successor hints). `check atc-inspect` is read-only and surfaces all of it:

```bash
abapctl check atc-inspect ZCL_FOO --json
```

Use this to decide which findings are worth fixing automatically before you apply anything.

## Apply an ATC quick fix

`check atc-fix` applies a finding's SAP-supplied quick fix. The loop is find → inspect → apply:

```bash
abapctl check atc ZCL_FOO          # 1. find findings
abapctl check atc-inspect ZCL_FOO  # 2. inspect fix availability
abapctl check atc-fix ZCL_FOO      # 3. preview the fix (default: no write)
```

By default `atc-fix` previews. To commit:

```bash
abapctl check atc-fix ZCL_FOO --apply           # apply the (non-conflicting) fix
abapctl check atc-fix ZCL_FOO --apply 2         # apply the 2nd listed fix
abapctl check atc-fix ZCL_FOO --apply --no-activate
abapctl check atc-fix ZCL_FOO --apply --transport K9A123
```

Under the hood, `atc-fix` resolves the finding's marker, fetches the quick-fix evaluation, applies the proposal's deltas, and runs the lock → write → unlock → activate cycle. Fixes whose ranges overlap are skipped on a bare `--apply`; use `--apply <N>` to override and pick one explicitly. This is distinct from `refactor quickfix`, which works from a cursor position against the quick-fix catalog. The bulk `--all` mode is reserved and not yet implemented.

ATC quick-fix apply is gated on older backends that don't support the write path.

## See also

- [Edit source](./edit-source.md): the write cycle that `atc-fix` reuses.
- [Clean Core](./clean-core.md): ATC at package scale, with the compliance-level loop.
- [Working with AI agents](./ai-agents.md): drive the find → inspect → apply loop with `--json`.
- [Command Reference](/docs/command-reference): all `check` flags.
