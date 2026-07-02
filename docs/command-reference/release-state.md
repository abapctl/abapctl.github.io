---
title: "release-state: API release state"
sidebar_position: 18
---

# release-state: API release state

Live CDS-view lookup of deprecated-API release state and successors. S/4 only.

Related guides: [clean-core](/docs/guides/clean-core).

1 command.

### abapctl release-state lookup

<span class="ac-pill ac-pill--read">READ</span> <span class="ac-pill ac-pill--idemp">IDEMP</span>

Look up release state and successors for an SAP API via the live CDS view I_APISWITHCLOUDDEVSUCCESSOR

| Option | Required | Description |
|---|---|---|
| `object` _(positional)_ | yes | object (object/name argument) |
| `--connection` | no | connection profile name |

```bash
abapctl release-state lookup ZCL_FOO
```

