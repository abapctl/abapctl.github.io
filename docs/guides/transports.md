---
title: Transports
sidebar_position: 4
---

# Transports

Create, inspect, release, and delete transport requests directly from the terminal. Write commands accept `--dry-run` to validate inputs without making the SAP call.

## List and inspect

```bash
abapctl transport list              # your open requests
abapctl transport info ZCL_FOO      # which transport holds this object
abapctl transport get K9A123        # full detail with tasks and objects
```

`transport info` checks an object's transport requirements ("what request do I need to put this object on?"). `transport get` expands a request into its tasks and the objects each task carries.

## Create

```bash
abapctl transport create --description 'Refactor ZFINANCE posting logic'
abapctl transport create --description '...' --dry-run    # validate, no SAP call
```

The new transport number comes back in the output. Create runs client-side validation before the call, so `--dry-run` catches missing or malformed inputs early.

## Release

```bash
abapctl transport release K9A123 --dry-run   # preview
abapctl transport release K9A123             # release
```

Release is destructive (it moves the request out of the modifiable state), so it prompts for confirmation; pass `--yes` to skip the prompt after a reviewed `--dry-run`.

## Delete

A plain delete removes an empty (or otherwise deletable) request:

```bash
abapctl transport delete K9A123
abapctl transport delete K9A123 --dry-run    # preview
```

### Recursive cleanup

A transport that holds a stale lock on an object (for example, an object that was already deleted) can't be deleted while it still references that object. `--recursive` (`-r`) first removes the transport's objects via the ADT `removeobject` operation, then deletes the request:

```bash
abapctl transport delete K9A123 --recursive --dry-run   # lists the objects that would be removed
abapctl transport delete K9A123 --recursive --yes
```

Recursive delete fails fast: if removing any object fails, it aborts before deleting the request, so you never end up with a half-stripped transport. It refuses to touch a request that is already released.

## See also

- [Edit source](./edit-source.md): writes that land objects on a transport.
- [Object creation](./object-creation.md): `create` commands auto-select or take a `--transport`.
- [Working with AI agents](./ai-agents.md): the `--dry-run` / `--yes` pattern for destructive commands.
- [Command Reference](/docs/command-reference): all `transport` flags.
