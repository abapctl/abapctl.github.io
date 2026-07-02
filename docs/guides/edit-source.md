---
title: Edit source
sidebar_position: 2
---

# Edit source

Modify objects with the full lock → write → unlock → activate cycle handled for you. If activation fails, the lock is released in a `finally` block so the object isn't left locked. See [How writes work](/docs/concepts/lock-write-activate) for the full lifecycle.

## Edit one object

The round trip is: download, edit locally, preview, commit.

```bash
abapctl source get ZCL_FOO > zcl_foo.clas.abap
# edit zcl_foo.clas.abap in your editor
abapctl source put ZCL_FOO --file zcl_foo.clas.abap --dry-run   # validate, no SAP write
abapctl source put ZCL_FOO --file zcl_foo.clas.abap             # commit
```

`source put` locks the object, writes the new source, unlocks, and activates, in that order. The `--dry-run` preview validates parameters and shows what would happen without touching SAP, the natural step to show a human (or an [agent's](./ai-agents.md) caller) before committing.

## Edit several objects at once

```bash
abapctl source push zcl_foo.clas.abap zif_bar.intf.abap zprog_baz.prog.abap
```

`source push` locks each object, writes, and unlocks sequentially, then activates everything in one batch at the end. The batch activation makes this the right tool for RAP stacks and other cases where activation order matters across objects.

## Skip activation

To save the source but leave the object inactive (for example, when you'll activate a group together later), pass `--no-activate`:

```bash
abapctl source put ZCL_FOO --file zcl_foo.clas.abap --no-activate
```

## Pretty-print

`source format` pretty-prints ABAP source read from stdin, using the system's pretty-printer settings. It's read-only: it formats text and prints the result, never writing to SAP.

```bash
cat zcl_foo.clas.abap | abapctl source format > zcl_foo.formatted.abap
```

Inspect or change the pretty-printer settings with `source format-settings`.

## A note on older backends

Some older backends do not retain a stateful ADT session across requests: a `LOCK` succeeds but the server never issues the context cookie that binds the follow-up write to the lock. abapctl detects this up front and fails write paths with a single clear `CAPABILITY_NOT_AVAILABLE` message instead of a cryptic `HTTP 423`. Reads are unaffected. See [Capabilities](/docs/concepts/capabilities).

## See also

- [How writes work](/docs/concepts/lock-write-activate): the lock/write/unlock/activate lifecycle in detail.
- [Read and navigate](./read-navigate.md): get the source you're about to edit.
- [Quality checks](./quality-checks.md): check syntax and ATC before and after a write.
- [Workspaces](./workspaces.md): manage edits across a whole package with conflict detection.
