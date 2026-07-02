---
title: Read and navigate
sidebar_position: 1
---

# Read and navigate

Pull source, metadata, and history for any object; search and browse; and jump around the code the way an IDE would, including compiler-authoritative completion. All read-only and safe to run freely.

## Read source

`source get` writes the object's source to stdout. Pipe it wherever you need it.

```bash
abapctl source get ZCL_FOO                          # main include
abapctl source get ZCL_FOO --include testclasses    # a specific class include
abapctl object info ZCL_FOO                          # metadata, includes, links
```

For a class, the plain `source get` returns the full source including method bodies. The class includes `definitions`, `implementations`, and `testclasses` are addressable with `--include`.

To pull an entire package at once, use a [workspace](./workspaces.md) instead of fetching object by object.

## Search and browse

```bash
abapctl object search 'ZCL_FOO*' --type CLAS        # name pattern, optional type/package filter
abapctl object tree ZFINANCE                         # browse objects in a package
abapctl object path ZCL_FOO                          # hierarchical path from root to object
abapctl object history ZCL_FOO                       # revision history
```

`object search` accepts wildcards and `--type` / `--package` filters. `object tree` browses a package's object hierarchy; `object path` shows where an object sits in the repository tree.

## Navigate code

These wrap the same ADT navigation endpoints Eclipse uses, taking a cursor position (`--line` / `--col`) into the object's source.

```bash
abapctl code definition ZCL_FOO --line 42 --col 18   # go to definition / implementation
abapctl code references ZCL_FOO --line 42 --col 18   # find all references (where-used)
abapctl code element-info ZCL_FOO --line 42 --col 18 # type, docs, components at cursor
abapctl code snippets ZCL_FOO --line 42 --col 18     # code context at each reference site
```

The cycle is: navigate to a definition, read the element info to understand it, then use references/snippets to assess impact before changing it.

## Compiler-authoritative completion

`code complete` calls SAP's `abapsource/codecompletion/proposal` endpoint, the same call Eclipse makes for its Ctrl+Space dropdown. The response is the compiler's view of valid identifiers at that cursor position, not a guess.

```bash
abapctl code complete ZCL_FOO --line 47 --col 47               # completions at cursor
abapctl code complete ZCL_FOO --line 47 --col 47 --kind method # filter by symbol kind
```

Two flags make this useful for AI agents:

- `--prefix <text>` splices draft text in at the cursor before asking the compiler, so you can validate an identifier an agent is about to emit (a hallucination guard).
- `--source <path>` validates an unsaved local buffer instead of the SAP-active source.

This endpoint works across releases, including older backends.

## See also

- [Edit source](./edit-source.md): once you've found and understood an object, change it.
- [Quality checks](./quality-checks.md): validate before and after edits.
- [Workspaces](./workspaces.md): read a whole package at once.
- [Command Reference](/docs/command-reference): every flag for `source`, `object`, and `code`.
