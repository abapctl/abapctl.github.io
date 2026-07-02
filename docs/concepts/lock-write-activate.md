---
title: Lock → write → activate
sidebar_position: 3
---

# Lock → write → activate

Every write to SAP follows the same lifecycle. Understanding it is the core mental model for all of abapctl's write commands: `source put`, `source push`, the `create` family, `clean-core apply`, `workspace push`, and more.

## The lifecycle

ADT writes are not a single `PUT`. SAP requires you to lock an object, write to it under that lock, release the lock, and then activate the new version:

```
POST ?_action=LOCK     → lock handle
PUT  .../source/main   → write source under the lock handle
POST ?_action=UNLOCK   → release the lock
POST /activation       → activate the new version
```

abapctl runs this whole sequence for you. You call one command; it orchestrates the four steps.

```bash
abapctl source put ZCL_FOO --file zcl_foo.clas.abap
```

## The finally-guard

If activation (or any step) fails, the object must not be left locked. A dangling lock blocks everyone, including a later retry. abapctl releases the lock in a `finally` block, so:

- A failed activation still unlocks the object, so it is not left stuck behind a dangling lock.
- You can re-run the command to continue from the failure point.

The same guard underpins the delete lifecycle (`LOCK → DELETE → UNLOCK`, unlock in `finally`) and the `clean-core apply` loop (a failed fix rolls back via the lock-finally guard rather than leaving a stranded lock).

## Batch activation for RAP stacks

When you write several objects that depend on each other (a RAP stack, for example), activation *order* matters. Activating one object before its dependency exists fails. `source push` handles this: it locks each object, writes, and unlocks, then activates **everything in one batch**:

```bash
abapctl source push zcl_foo.clas.abap zif_bar.intf.abap zprog_baz.prog.abap
```

On systems that support it, the batch runs as a background activation run, so the server resolves the dependency order.

## `--no-activate`

To write the new source but leave the object **inactive**, pass `--no-activate`. The lock/write/unlock steps run; activation is skipped:

```bash
abapctl source put ZCL_FOO --file zcl_foo.clas.abap --no-activate
```

Useful when you want to stage several changes and activate them together later, or when an object is part of a stack that is not yet complete.

## `--dry-run` previews

`--dry-run` validates the parameters and shows what *would* happen without making the SAP call:

```bash
abapctl source put ZCL_FOO --file zcl_foo.clas.abap --dry-run
```

`--dry-run` is available on every write command: `source put`/`push`, all `create` commands, all `workspace` writes, `object delete`/`activate`, `transport create`/`release`/`delete`, `service publish`/`unpublish`, `bdef create`, and `clean-core apply`. The canonical safe pattern is: **dry-run → review → commit**. For destructive commands, a second call without `--dry-run` (and with `--yes` to skip the interactive prompt) commits the change. See [JSON & safety](./json-and-safety).

## Related concepts

- [JSON & safety](./json-and-safety): safety flags and the dry-run → approve → commit pattern.
- [Capabilities & gating](./capabilities): why some backends refuse writes entirely.
- [Architecture](./architecture): where the write lifecycle lives in the stack.
