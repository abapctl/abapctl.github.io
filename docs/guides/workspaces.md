---
title: Workspaces
sidebar_position: 5
---

# Workspaces

For sustained work on a package, sync it to a local directory the way you'd clone a git repo. A workspace tracks baseline checksums so abapctl can tell you what changed locally, what changed in SAP, and where the two conflict.

## Initialize

```bash
abapctl workspace init ZFINANCE
```

This discovers every object in `ZFINANCE`, downloads each one, and writes a manifest of baseline checksums. The SID comes from the active connection. Files land in a SID-aware layout:

```
abap/S4H/ZFINANCE/<object>.<type>.abap        # sources
abap/.manifests/S4H/ZFINANCE/                   # workspace manifest
```

Filenames follow the [ABAP File Formats](https://github.com/SAP/abap-file-formats) (AFF) convention used by abapGit and SAP's own tooling (for example `zcl_foo.clas.abap`, `zif_bar.intf.abap`), so a workspace is interoperable with the broader ABAP ecosystem.

## Day-to-day

All workspace commands take a `SID/PACKAGE` argument that names the workspace explicitly:

```bash
abapctl workspace status S4H/ZFINANCE     # overview: modified, missing, conflicting
abapctl workspace diff S4H/ZFINANCE        # unified diff against the SAP baseline
abapctl workspace push S4H/ZFINANCE        # upload local changes
abapctl workspace pull S4H/ZFINANCE        # download SAP-side changes
abapctl workspace refresh S4H/ZFINANCE     # discover objects added since init
```

- **`status`** with no argument gives an overview across all workspaces; with `SID/PACKAGE` it goes per-object.
- **`diff`** shows a unified diff of each modified file against its baseline.
- **`push`** runs the lock → write → unlock → activate cycle per object, with a circuit breaker for the batch. It is destructive.
- **`pull`** uses four-state conflict detection: if a file changed both locally and in SAP since the baseline, it's flagged rather than silently overwritten.
- **`refresh`** discovers objects added to the package since `init` and downloads them.

## Add, remove, and reset

```bash
abapctl workspace add S4H/ZFINANCE ZCL_NEW                       # start tracking objects
abapctl workspace remove S4H/ZFINANCE ZCL_OLD --delete --yes     # stop tracking (and delete local files)
abapctl workspace reset S4H/ZFINANCE                              # discard local changes, restore baseline
abapctl workspace reset S4H/ZFINANCE --sap                       # re-download from SAP
abapctl workspace list S4H/ZFINANCE                              # list tracked objects (manifest only)
```

## SID-aware safety

The directory structure and manifest both record the SID. A workspace initialized against `S4H` refuses to push against a different system, preventing the classic "I uploaded my dev changes to QA" mistake when you're juggling connections.

## See also

- [Edit source](./edit-source.md): the per-object write cycle workspaces reuse.
- [How writes work](/docs/concepts/lock-write-activate): the lock/write/activate lifecycle behind `push`.
- [Read and navigate](./read-navigate.md): single-object reads when you don't need a whole package.
- [Command Reference](/docs/command-reference): all `workspace` flags.
