---
title: "Use Case 1: S/4HANA Readiness & Quick Fixes"
sidebar_position: 1
---

# Use Case 1: S/4HANA Readiness & Quick Fixes

The first question before an S/4HANA conversion is a simple one: will this code run on S/4HANA? Before any re-architecting, there's a set of mechanical, well-understood fixes (deprecated calls with a known replacement) that SAP can apply for you. Here you'll have the agent find them and apply them.

## Overview

The ABAP Test Cockpit (ATC) has a dedicated **S/4HANA readiness** check variant (`S4HANA_READINESS`) that flags code which won't work after an S/4HANA conversion. For many of those findings, SAP ships a **deterministic quick fix**: a known, mechanical replacement that needs no reasoning. Here you'll have the agent run the readiness check, preview the available fixes, apply the one you want, and verify the object improved.

The exact variant name can vary by release (year-stamped variants such as `S4HANA_READINESS_2025` also ship). Run `abapctl check atc-variants` to see what's installed on your system.

There's no dedicated "readiness skill" for this, and that's intentional. This use case shows the **engine layer** of the agentic model: the agent drives a single deterministic abapctl command. [Use Case 2](./clean-core.md) shows the contrast: a packaged set of skills and an agent for work that needs reasoning. Here, no reasoning is required. SAP names the fix, and you apply it.

```
Run the readiness check  →  Preview the quick fixes  →  Apply the chosen fix  →  Re-run the check
   (check atc)               (check atc-fix, dry-run)     (check atc-fix --apply N)  (findings cleared)
```

## The agentic flow: read ATC → apply fix → activate

Every step runs **inside the agent chat** as a plain-language prompt. The agent picks and runs the right abapctl commands, reads their JSON, and reports back.

### Step 1: Read the ATC findings

> Run the S4HANA_READINESS ATC check on the report ZFIN_POSTING_REPORT and summarize the findings: how many there are, their priority, and which ones have a quick fix available.

You'll see findings similar to:

```
ATC check: 2 finding(s), level D, NOT ok
[P1] DB Operation SELECT found (BSEG, see Note(s):0002431747)
[P3] SELECT ... for (former) cluster table BSEG without ORDER BY found
```

`BSEG` is the standard accounting line-item table, which changed structure in S/4HANA, so its access patterns need adjusting. Both findings point at the same `SELECT`, and SAP ships a quick fix for each. (Read this readiness result by its **findings and priority**, not as a Clean Core A–D level: that A–D model belongs to the `CLEAN_CORE` variant in Use Case 2.)

### Step 2: Preview the fixes (dry run)

> On ZFIN_POSTING_REPORT, show me the available S/4HANA readiness quick fixes and what each one would change. Don't write anything yet.

The agent runs the equivalent of `abapctl check atc-fix ZFIN_POSTING_REPORT -v S4HANA_READINESS` (no `--apply`, so read-only). It lists each fix, numbered, with the change it would make:

```
Available ATC fixes for ZFIN_POSTING_REPORT:

  [1] line 28  Replace SELECT from table BSEG by API Call
      conflict: pick one with --apply <N>
  [2] line 28  Append ORDER BY PRIMARY KEY to the SELECT statement
      conflict: pick one with --apply <N>
```

Both fixes target the **same** `SELECT` on line 28, so they conflict, and you can't apply both. Fix `[1]` is the real readiness fix: it replaces the direct table read with the released API call SAP proposes for this pattern, so the code no longer reads the changed table structure directly.

### Step 3: Apply the fix and activate

Because the two fixes conflict, you choose fix `[1]` by its number:

> Apply the first S/4HANA readiness quick fix to ZFIN_POSTING_REPORT under transport \<NR>. Then re-run the S4HANA_READINESS check and tell me the findings before and after.

The agent runs `abapctl check atc-fix ZFIN_POSTING_REPORT -v S4HANA_READINESS --apply 1 --transport <NR>`, which **locks the object, writes the fix, unlocks, and activates.** The re-run is your proof:

```
[1] line 28  Replace SELECT from table BSEG by API Call   applied
1 applied (transport <NR>).

ATC check: 0 finding(s), ok
```

The report went from **two readiness findings to zero**: the direct `SELECT FROM bseg` now goes through the released API SAP proposes, so the readiness check no longer flags it as a conversion problem.

## Why this is safe

`check atc-fix` previews by default and writes only when you add `--apply`. A bare `--apply` applies only fixes that don't conflict; when fixes conflict (like these two on the same line), you choose one with `--apply <N>`, so the tool won't apply conflicting fixes on its own. Every write goes through your transport, so it's tracked and auditable. This is the same preview-then-commit habit the [safety model](/docs/concepts/json-and-safety) enforces everywhere.

## Key takeaways

1. Some ATC findings carry a deterministic, SAP-defined quick fix, with no reasoning needed.
2. There's no readiness skill: the agent drives one deterministic command (`check atc-fix`). That's the **engine layer** of the agentic model.
3. The command previews by default and writes only with `--apply`; conflicting fixes are picked by number.
4. You verify every fix by re-running the check; findings dropping to zero is your confirmation.
5. Findings that need a released-API search or an equivalence check are **not** quick fixes. Those are the job of the Clean Core remediator agent next.

→ Continue to **[Use Case 2: Clean Core Assessment & Remediation](./clean-core.md)**. For the commands behind this use case, see the [Quality checks guide](/docs/guides/quality-checks).
