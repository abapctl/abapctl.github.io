---
title: Clean Core
sidebar_position: 10
---

# Clean Core

Classify a package against the SAP Clean Core compliance levels, prepare per-object fix context, drive the fix with an AI agent, and apply the result.

SAP Clean Core decouples custom extensions from SAP standard code so S/4HANA upgrades stay safe. Custom code that depends on internal or non-released SAP APIs creates upgrade risk; the Clean Core Extensibility whitepaper defines four compliance levels that quantify it. abapctl runs the assessment, prepares the fix context, and applies the fixes; the fix step itself is where an AI agent does the work and abapctl acts as the live SAP-side oracle.

For driving the loop with an agent, see [Skills & Agents](/docs/skills-agents) and [Working with AI agents](./ai-agents.md). To walk it end to end, see the [Clean Core use case](/docs/use-cases/clean-core).

## 1. Assess

```bash
abapctl clean-core assess ZFINANCE -c s4h
```

Discovers every object in the package, runs ATC under the configured Clean Core variant (`clean_core.atc_variant`, default `CLEAN_CORE`), and classifies each object:

| Level | ATC result | What it means | Action |
|---|---|---|---|
| **A** | No findings | Fully compliant with Clean Core | Cloud-ready, no action needed |
| **B** | Info only | Uses documented extension points | Acceptable, low upgrade risk |
| **C** | Warnings | Uses internal or undocumented APIs | Conditionally clean. Verify before upgrades. |
| **D** | Errors | Non-released APIs, modifications, or blocked patterns | Requires remediation |

Output goes to `clean-core/{SID}/{PACKAGE}/`:

- `reports/SUMMARY.md`: per-object table with level and finding count
- `reports/<OBJECT>_atc.md`: per-object Markdown report
- `state/discovery.json`: full object inventory
- `state/progress.json`: resumable checkpoint
- `state/<OBJECT>_findings.json`: raw structured findings

The run is idempotent and resumable. Re-running picks up where it left off; pass `--force` to start fresh. Exit code `0` means clean (A/B), `1` means findings exist (C/D), `2` means error. For a cross-package roll-up:

```bash
abapctl clean-core executive
```

## 2. Prep

```bash
abapctl clean-core prep S4H/ZFINANCE
```

For each D and C object, downloads the source plus per-finding fix context. Output lands under `clean-core/{SID}/{PACKAGE}/fix-context/`:

- `<obj>.<type>.abap`: editable source (abapGit/AFF naming)
- `.context/<obj>.findings.json`: structured findings (line, message, deprecated API, suggested successor, doc URL)
- `.context/<obj>.context.md`: human-readable fix brief

## 3. Fix (AI agent loop)

*Example flow. Adapt to your agent's capabilities.*

For each priority-1 finding on a Level D object, the agent searches for a released-API replacement using three sources, stopping at the first hit:

1. **ATC tags on the finding.** Every ATC finding ships per-finding metadata (`refObjectName`, `refObjectType`, `Successors:` info). When the SAP system has already classified the deprecated API and its successor, that data is right there in the finding.
2. **SAP Cloudification Library reference JSONs.** Run `abapctl reference update` once, and `objectReleaseInfoLatest.json` + `objectClassifications_SAP.json` land under `.abapctl/reference/sap-api-reference/`. These cover the broad catalog of deprecated APIs and their cloud-ready successors.
3. **Live CDS view query.** When the first two are inconclusive, `abapctl release-state lookup <api>` queries `I_APISWITHCLOUDDEVSUCCESSOR` on the connected SAP system directly. Always current to whatever release the target system is on.

When the agent reports the object as clean, the human reviews the diff, then runs apply.

## 4. Apply

```bash
abapctl clean-core apply S4H/ZFINANCE --dry-run    # preview every write
abapctl clean-core apply S4H/ZFINANCE              # commit
```

Locks each object, uploads the fixed source, unlocks, and activates. On failure the lock-finally guard releases the lock rather than leaving the object stuck, and you re-run to continue from the failure point.

## See also

- [Skills & Agents](/docs/skills-agents) and [Working with AI agents](./ai-agents.md): drive the fix loop.
- [Clean Core use case](/docs/use-cases/clean-core): a worked example that runs this loop end to end.
- [Quality checks](./quality-checks.md): the ATC mechanics underneath assessment.
