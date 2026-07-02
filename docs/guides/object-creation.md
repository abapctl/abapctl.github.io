---
title: Object creation
sidebar_position: 6
---

# Object creation

The `create` command family covers 21 ABAP object types. Each command runs a validate → transport check / auto-select → create workflow, with a package-specific creation path. All `create` commands accept `--dry-run`.

## The basic pattern

Create a shell object, optionally with content and activation in one shot.

```bash
abapctl create class ZCL_FOO --description 'Posting helper' --package ZFINANCE
abapctl create interface ZIF_BAR --package ZFINANCE
abapctl create program ZPROG_BAZ --package ZFINANCE
```

When the package requires a transport, the workflow auto-selects a suitable open request; pass `--transport K9A123` to pin a specific one. Use `--dry-run` to validate parameters and preview without writing.

## One-shot create from a source file

Most source-bearing and XML-bodied types accept `--source <path>` to create the shell, write the body, and activate in a single command. 14 of the 21 types support it, across two channels:

- **Source-bearing (ABAP/CDS text):** `program`, `interface`, `include`, `function-module`, `function-group-include`, `ddl-source`, `service-definition`, `access-control`, `metadata-extension`.
- **XML-bodied DDIC:** `message-class`, `auth-field`, `auth-object`, `domain`, `data-element`.

```bash
abapctl create program ZPROG_BAZ --package ZFINANCE --source zprog_baz.prog.abap
abapctl create ddl-source ZI_FOO --package ZFINANCE --source zi_foo.ddls.asddls
abapctl create program ZPROG_BAZ --package ZFINANCE --source zprog_baz.prog.abap --no-activate
```

`function-module` and `function-group-include` additionally require `--group <name>` (the parent function group must already exist). If activation fails, the shell is left behind so you can clean it up with `object delete`. For DDIC types, `--source` is mutually exclusive with the typed flags below.

## Typed flags for domains and data elements

`domain` and `data-element` can be built from explicit flags instead of a raw XML body.

```bash
# Domain with a fixed-value list
abapctl create domain ZDO_STATUS --package ZFINANCE \
  --data-type CHAR --length 1 \
  --fixed-value 'A::Active' --fixed-value 'I::Inactive'

# Domain backed by a value table
abapctl create domain ZDO_BUKRS --package ZFINANCE \
  --data-type CHAR --length 4 --value-table T001

# Data element typed by a domain
abapctl create data-element ZDE_STATUS --package ZFINANCE \
  --type domain --domain ZDO_STATUS --label-short Status --label-long 'Posting status'

# Data element with a predefined ABAP type
abapctl create data-element ZDE_AMOUNT --package ZFINANCE \
  --type predefinedAbapType --data-type CURR --length 15 --decimals 2
```

`--fixed-value` uses an explicit-empty-segment grammar: `A` (low only), `1:10:` (low+high), `A::Active` (low+text), `1:10:R` (full). `--value-table` and `--fixed-value` are mutually exclusive. For data elements, the type kind is inferred from `--domain` or `--data-type` if `--type` is omitted. Domains and data elements are capability-gated on older backends.

## Multi-include create for classes and function groups

`create class` and `create function-group` accept repeated `--source` flags; the filename suffix dispatches each file to the right slot or member, all written under one master lock with a single activation at the end.

Class slots:

```bash
abapctl create class ZCL_FOO --package ZFINANCE \
  --source zcl_foo.clas.abap \
  --source zcl_foo.clas.definitions.abap \
  --source zcl_foo.clas.implementations.abap \
  --source zcl_foo.clas.macros.abap \
  --source zcl_foo.clas.testclasses.abap
```

`{name}.clas.abap` is the main slot; the rest map to the definitions / implementations / macros / testclasses includes. If you pass a single `--source` whose filename doesn't match the pattern, abapctl treats it as the main source and warns.

Function-group members:

```bash
abapctl create function-group ZFG_FOO --package ZFINANCE \
  --source zfg_foo.fugr.abap \
  --source zfg_foo.fugr.z_do_thing.func.abap \
  --source zfg_foo.fugr.f01.reps.abap
```

`{name}.fugr.abap` is the TOP include; `*.func.abap` is a function module; `*.reps.abap` is a function-group include. Names are validated before any HTTP call (strict filename pattern, name-prefix match, no duplicate slots, required main for multi-source classes).

## See also

- [Edit source](./edit-source.md): change an object after creating it.
- [DDIC and CDS](./ddic-cds.md): read back the metadata of DDIC objects you create.
- [Transports](./transports.md): how `create` selects or pins a transport.
- [Command Reference](/docs/command-reference): every `create` subcommand and its flags.
