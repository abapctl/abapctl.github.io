---
title: Services and OData
sidebar_position: 8
---

# Services and OData

Manage the lifecycle of OData service bindings (V2 and V4) and consume published OData runtime services. These are two different layers: design-time service-binding management over ADT, and runtime consumption over the Gateway.

## Design-time vs. runtime

- **Service bindings** are design-time ADT artifacts. Publishing a binding activates a service endpoint on the Gateway. `service publish` / `unpublish` / `binding-details` operate here.
- **OData runtime consumption** (`odata list` / `metadata` / `query`) is the consumer's view: exactly what a Fiori app sees when it calls `/sap/opu/odata`. This is orthogonal to ADT `data` preview, which is the [design-time data view](./ddic-cds.md#data-preview-design-time).

## Service bindings

```bash
abapctl service binding-details ZUI_FOO_O2          # protocol, published state, service def, OData URL
abapctl service publish ZUI_FOO_O2                  # publish (auto-detects V2/V4 from the binding)
abapctl service publish ZUI_FOO_O2 --protocol v4    # force a protocol
abapctl service unpublish ZUI_FOO_O2
```

With `--protocol` omitted, abapctl reads the binding and routes to the V2 or V4 publish endpoint by its declared version. `--protocol v4` is gated on backends that advertise OData V4 support; on a backend without it you get a clean capability message rather than a raw error.

### Verify a published binding actually serves data

`service test` closes the publish loop: it confirms a published binding is reachable and returns rows.

```bash
abapctl service test ZUI_FOO_O2                       # resolve → $metadata → smoke-query first entity set
abapctl service test ZUI_FOO_O2 --rows 5
abapctl service test ZUI_FOO_O2 --runtime-url /sap/opu/odata/sap/ZFOO_SRV
```

It resolves the binding to its runtime URL (overridable with `--runtime-url`), fetches `$metadata`, and smoke-queries the first entity set. A pass means published + metadata reachable + query succeeds (zero rows still passes). Exit codes: `0` ok, `1` not published, `2` not found or a resolve/metadata/query failure. For V4 bindings that aren't catalog-resolvable, supply `--runtime-url` explicitly.

## Consume OData runtime services

These commands hit the Gateway directly, the same paths a Fiori front end uses.

```bash
abapctl odata list                                  # the live V2 + V4 catalog
abapctl odata list -f sflight --v2-only             # filter by name/title/description
abapctl odata metadata ZFOO_SRV                     # entity sets, keys, properties, function imports
abapctl odata metadata ZFOO_SRV --raw               # the $metadata XML verbatim
```

`odata list` discovers both the V2 and V4 catalogs. If one catalog is unavailable it degrades to a warning and returns the other; only when both are unavailable does it report a capability error.

Query an entity set:

```bash
abapctl odata query ZFOO_SRV SflightSet --top 10 --select Carrid,Connid
abapctl odata query ZFOO_SRV SflightSet --filter "Carrid eq 'AA'" --orderby Connid --count
abapctl odata query ZFOO_SRV SflightSet --key "Carrid='AA',Connid='0017'"   # single-entity read
```

The query builder handles OData's percent-encoding rules and the V2/V4 divergence (`$inlinecount` vs `$count`, bare `search=` vs `$search="..."`). `--key` reads a single entity and allows `--select` / `--expand` but rejects collection-only options. Responses from both protocols are normalized into a uniform `{rows, count?}` shape, and SAP errors come back with actionable hints (which transaction to check). `<service>` is resolved from the live catalog by technical name, or pass a full `/sap/opu/odata...` path verbatim.

## See also

- [DDIC and CDS](./ddic-cds.md): design-time data preview and the CDS views behind services.
- [Behavior definitions and RAP](./bdef-rap.md): RAP stacks whose bindings you publish here.
- [Object creation](./object-creation.md): `create service-binding` and `create service-definition`.
- [Command Reference](/docs/command-reference): all `service` and `odata` flags.
