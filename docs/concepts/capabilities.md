---
title: Capabilities & gating
sidebar_position: 4
---

# Capabilities & gating

Not every SAP system exposes the same ADT operations. Endpoints vary by release, by stack (ECC vs S/4HANA), and by what is installed and authorized. abapctl adapts to this at runtime rather than assuming a fixed feature set.

## Runtime capability discovery

When a command needs a feature that is not universal, abapctl checks what the connected system advertises. SAP publishes its available endpoints at `/sap/bc/adt/discovery`, an AtomPub service document listing every ADT service the system supports. abapctl reads it and looks for the relevant capability term (transport management, data preview, background activation runs, and so on).

You can inspect this directly:

```bash
abapctl discover                 # what this system supports
abapctl tools coverage           # registry coverage against the live discovery
```

## `CAPABILITY_NOT_AVAILABLE`

When you ask for an operation the connected system does not support, abapctl fails fast with a structured error, `CAPABILITY_NOT_AVAILABLE`, instead of a cryptic SAP HTTP code. `--json` surfaces it so callers can branch on it deterministically.

A feature missing on one system does not break unrelated commands. Reads that *are* supported keep working normally.

## The write-gate on older backends

The most common gate is around writes. Some **older NetWeaver 7.5x-class backends** do not retain a stateful ADT session across requests: a `LOCK` succeeds, but the server never issues the `sap-contextid` cookie that binds a follow-up write to the lock-holding context. Without it, every `PUT`/`DELETE` would fail with a cryptic `HTTP 423 invalid lock handle`.

abapctl detects this condition up front and fails **all write paths** with a single, clear message instead:

```
CAPABILITY_NOT_AVAILABLE: This SAP system does not support write operations through the ADT API
```

The gated write paths are: `source put`/`push`, `create … --source`, `object delete`, `text-elements put`, `workspace push`, `clean-core apply`, and `run`.

**Read operations work normally** on these systems. `source get`, `object search`/`info`, `system info`, ATC, and navigation are all unaffected. For *changes* on such a system, use SAPGUI (SE38/SE80/SE24). This is a backend limitation, not an abapctl bug.

## Framing by system kind

Capabilities track the *kind* of system, not a specific instance:

- **Older NetWeaver 7.5x-class backends**: full read coverage; writes may be gated (the write-gate above); some modern endpoints (background activation, data preview, and certain release-state views) are absent.
- **Modern S/4HANA systems**: the broadest coverage, including write operations, background activation runs for RAP stacks, and the cloud-readiness / Clean Core toolchain.

You do not need to know which bucket your system falls in. abapctl discovers the answer and either runs the operation or returns `CAPABILITY_NOT_AVAILABLE`.

## Related concepts

- [Lock → write → activate](./lock-write-activate): the write lifecycle the write-gate protects.
- [JSON & safety](./json-and-safety): how `CAPABILITY_NOT_AVAILABLE` and other codes reach a caller.
- [Architecture](./architecture): the SAP client and capability layer.
