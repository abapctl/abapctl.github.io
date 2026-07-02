---
title: Behavior definitions and RAP
sidebar_position: 9
---

# Behavior definitions and RAP

Read and create behavior definitions (BDEF), activate RAP stacks in the right order, and inspect enhancement implementations (ENHO).

## Behavior definitions

```bash
abapctl bdef get ZI_FOO                              # metadata and source
abapctl bdef listinterfaces ZI_FOO                   # BO interfaces assigned to the BDEF
abapctl bdef create ZI_FOO --package ZFINANCE --implementation-type managed
```

`bdef create` scaffolds from a `managed` or `unmanaged` template and accepts `--dry-run`. For `bdef listinterfaces`, assigned BO interfaces are rare, so an empty list is normal; a backend without the endpoint returns an empty list gracefully.

## Activating a RAP stack

A RAP stack (CDS interface view, projection, behavior definition, behavior implementation class, service definition, service binding) has activation-order dependencies. Push the whole set in one batch so abapctl activates them together:

```bash
abapctl source push \
  zi_foo.ddls.asddls \
  zi_foo.bdef.asbdef \
  zbp_i_foo.clas.abap \
  zc_foo.ddls.asddls \
  zc_foo.bdef.asbdef
```

`source push` writes each object, then runs a single batch activation at the end, which resolves activation order across the stack. See [Edit source](./edit-source.md) for the write cycle and [Services and OData](./services-odata.md) for publishing the resulting binding. (Batch background activation is available on S/4HANA-class backends.)

## Enhancement implementations (ENHO)

ENHO commands inspect enhancement implementations, useful when assessing an ECC-to-S/4HANA migration where custom enhancements sit on SAP standard code.

```bash
abapctl enho on ZCL_SAP_STANDARD     # each ENHO's decoded ABAP source, position, and switch state on a base object
abapctl enho list --customer-only    # system-wide / package-scoped ENHO inventory
abapctl enho list --package ZFINANCE
```

`enho list` is a system-wide or package-scoped inventory with friendly type names; `--customer-only` filters to customer enhancements and `--package` scopes the search. The ECC vs. S/4HANA wire-format differences are handled internally.

## See also

- [Edit source](./edit-source.md): `source push` and batch activation.
- [Services and OData](./services-odata.md): publish and test the RAP service binding.
- [DDIC and CDS](./ddic-cds.md): the CDS views a RAP stack is built on.
- [Clean Core](./clean-core.md): assess custom enhancements for upgrade safety.
