---
title: DDIC and CDS
sidebar_position: 7
---

# DDIC and CDS

Read deep DDIC metadata, navigate CDS intelligence, and preview data, all read-only.

## DDIC deep metadata

Each `ddic` command fetches the parsed metadata for one object type:

```bash
abapctl ddic table SFLIGHT              # table definition with parsed DDL fields
abapctl ddic structure ZS_FOO           # structure metadata and source
abapctl ddic view ZV_FOO                # DDIC view metadata
abapctl ddic table-settings SFLIGHT     # technical settings
abapctl ddic data-element ZDE_STATUS    # data element metadata
abapctl ddic domain ZDO_STATUS          # domain metadata
abapctl ddic table-type ZTT_FOO         # table type metadata
abapctl ddic lock-object EZFOO           # lock object metadata
abapctl ddic type-group ZTG_FOO         # type group metadata and source
```

`ddic table` parses the DDL into structured fields (key flag, name, type, not-null). Each command runs a discovery check, so on a backend that lacks an endpoint you get a clear capability message rather than a raw error. See [Capabilities](/docs/concepts/capabilities). Several of these (tables, data elements, domains, structures) require a NetWeaver 7.51+ / S/4HANA backend.

## CDS intelligence

```bash
abapctl cds annotations                       # download the CDS annotation definitions (DSL text)
abapctl cds element-info I_Currency            # recursive DDIC element-info tree for an entity
abapctl cds repository-access I_Currency       # resolve an entity to its DDL source reference
abapctl cds test-dependencies I_Currency       # CDS test double dependency tree
```

`cds annotations` downloads the full annotation-definition DSL (a large CDATA block), useful as ground truth for what annotations exist. `cds element-info` returns a recursive field tree with properties (key flag, data element, data type, length) and annotations. `cds repository-access` maps a CDS entity name to its underlying DDL source object. `cds test-dependencies` lists the dependencies needed for CDS test doubles.

## Data preview (design-time)

The `data` commands preview rows the way the ADT data-preview tool does, the **design-time** view, distinct from runtime [OData consumption](./services-odata.md).

```bash
abapctl data query SFLIGHT --rows 5                      # preview a DDIC table or view
abapctl data cds I_Currency --rows 3                     # preview a CDS view
abapctl data sql 'SELECT carrid, connid FROM sflight'    # freestyle ABAP SQL
```

`data query` takes an optional WHERE clause; all three return column-oriented results. The data-preview endpoints require a NetWeaver 7.51+ / S/4HANA backend.

## See also

- [Object creation](./object-creation.md): create the tables, structures, domains, and data elements you read here.
- [Services and OData](./services-odata.md): the runtime counterpart to design-time data preview.
- [Behavior definitions and RAP](./bdef-rap.md): for RAP-stack objects built on CDS.
- [Command Reference](/docs/command-reference): all `ddic`, `cds`, and `data` flags.
