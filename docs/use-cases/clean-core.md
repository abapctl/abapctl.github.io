---
title: "Use Case 2: Clean Core Assessment & Remediation"
sidebar_position: 2
---

# Use Case 2: Clean Core Assessment & Remediation

Quick fixes clear the simple findings. What's left is more demanding: objects calling APIs that have a released successor, but only if someone researches the replacement, confirms it behaves the same, rewrites the code, and checks nothing regressed. Doing that by hand across a whole package doesn't scale. This is exactly the work an agent is good at.

## Overview

This is the big one. You'll drive a pre-installed kit of skills plus an autonomous **remediator subagent** through the full Clean Core workflow (assess → prep → fix → review). Where Use Case 1 had the agent apply mechanical fixes, here it drives a packaged, governed workflow for work that needs reasoning: finding a released-API successor, checking it behaves the same, rewriting the code, and gating the change so a fix that would worsen the object's Clean Core level is rolled back automatically.

You'll **assess the whole package** to see the landscape, then **pick one object and have the agent fix it**, watching the agent's full loop on that single object. A closing note shows how the same workflow fixes an entire package in parallel.

The kit separates deterministic work (done by abapctl, no AI tokens) from reasoning work (handed to the agent), which is what makes it affordable at scale. The components are documented in full at [Clean Core skills](/docs/skills-agents/clean-core-skills).

```
Assess the package  →  Pick one object  →  Find the released successor
  →  Check it behaves the same  →  Rewrite + gate (roll back if worse)  →  Re-assess (C → A)
```

## The kit: four skills and one subagent

| Component | Role | Writes to SAP? |
|---|---|---|
| `sap-abap` skill | The abapctl command reference every other skill and the agent consult | No |
| `clean-core-assess` skill | Run ATC under the Clean Core variant (default `CLEAN_CORE`), classify each object A–D | No (read-only) |
| `clean-core-prep` skill | Download source, baselines, enriched findings for C/D objects; resolve a transport | No (downloads only) |
| `clean-core-fix` skill | Spawn one `clean-core-remediator` agent per object, in parallel batches | Yes (via the agents) |
| `clean-core-remediator` subagent | Per-object worker in a sealed context: cascade, probe, apply, gate, rollback | Yes (gated) |
| `clean-core-review` skill | Read every result, write a retrospective, surface exemption candidates | No (read-only) |

## Step 1: Assess the package

> Assess Clean Core compliance for package ZFIN on the dev connection. Discover every object, classify each into Clean Core levels A to D, and give me the level distribution plus the objects that need remediation.

The `clean-core-assess` skill runs `abapctl clean-core assess ZFIN -c dev` under the `CLEAN_CORE` variant, classifies each object by its worst finding, and writes a `SUMMARY.md`:

```
Package: ZFIN | System: S4H/100
Objects: 25

Levels:
  A (clean):      18 objects
  B (pragmatic):  1 objects
  C (plan):       3 objects
  D (blocked):    3 objects
```

Assess is read-only and safe to repeat.

## Step 2: Pick an object and see why it's flagged

> Show me the Clean Core finding on ZCL_FIN_DOC_READER and the relevant source. What makes it Level C, and is there a released successor for what it uses?

```
ZCL_FIN_DOC_READER: Level C (1 finding)
  [P2] Reading from DDIC database tables is not recommended (successor available)
       SELECT ... FROM bkpf   (line 33)

release-state lookup BKPF -> BKPF itself: not released for cloud use
                          -> successor: I_JOURNALENTRY (category O, released CDS view)
```

The class reads the standard table `BKPF` directly: fine today, but not cloud-ready, because `BKPF` itself isn't released for cloud use. SAP publishes a released CDS view, `I_JOURNALENTRY`, that exposes the same data. Swapping the `SELECT` to read from it is the fix, the kind of reasoned change the agent handles.

## Step 3: Trigger the agent to fix the object

Preview first:

> Run the Clean Core fix workflow on ZCL_FIN_DOC_READER under transport \<NR>, but dry-run first: show me which finding it would fix, the successor it would use, and the exact code change. Don't write anything yet.

When the preview looks right, let it run:

> Apply it. Run the remediator on ZCL_FIN_DOC_READER, push under transport \<NR>, and show me the outcome.

The `clean-core-fix` skill spawns a `clean-core-remediator` agent scoped to your one object. The agent works the finding through a fixed, safety-first loop.

1. **Understand** the flagged call: what `SELECT ... FROM bkpf` reads, and who uses the result.
2. **Cascade for a released successor** (first hit wins): the successor on the finding → a live `release-state lookup` (here `BKPF → I_JOURNALENTRY`) → only as a last resort, its own researched candidate (held to a higher bar, always flagged for review).
3. **Probe** the successor for compatibility. For a table-to-CDS read swap it runs a mandatory **semantic-drift check**, because matching columns are not enough: a CDS view may silently filter by client, validity, or authorization and return different rows.
4. **Apply** a minimum-diameter rewrite: change the `SELECT` to read from `I_JOURNALENTRY` with field names mapped, and nothing else (no wrappers, no unrelated cleanup, `AUTHORITY-CHECK` preserved).
5. **Push and gate:** `check syntax`, then `check atc`, then any unit tests. The gate passes only if the object's Clean Core level does not regress. If it did, the agent **rolls back to the baseline automatically.** One push, one gate, one rollback, no retry.

Its guiding rule is **correctness, not fix-count: a wrong fix is worse than no fix.** If a fix isn't safe and behavior-equivalent, the agent defers it for human review rather than guess. You'll see a one-line outcome:

```
ZCL_FIN_DOC_READER: success (fixed=1, needs_review=0, failed=0) C->A
```

Ask how it convinced itself the swap was safe and it shows its evidence:

- **Row equivalence:** it ran the original `SELECT FROM bkpf` and the new `SELECT FROM i_journalentry` side by side over a few company-code/year combinations and compared the result sets, confirming they return the same rows.
- **A regression test:** it authored a small ABAP Unit test that pins the migrated read's expected result and shipped it in the transport, so the equivalence is checked automatically from now on.
- **A semantic-drift note:** it flags that `I_JOURNALENTRY` enforces an authorization check (`@AccessControl.authorizationCheck`) that the raw table read did not. That is the intended cloud-ready behavior, but the agent surfaces it so you know a caller relying on the unchecked read would now see authority filtering.

This is the difference between a quick fix and a reasoned one: the agent doesn't just make ATC happy, it gathers evidence (row comparison plus a regression test) that the rewritten code still does the same thing.

## Step 4: Verify the fix

> Re-run the Clean Core assessment on ZCL_FIN_DOC_READER and show me its level now, and the source the agent wrote.

ZCL_FIN_DOC_READER comes back **Level A**: the cloud blocker is gone, and you can see exactly what the agent changed. Every write went through your transport, so the change is tracked and auditable.

## Scaling up: a whole package in parallel

You fixed one object so you could watch the agent work. The same workflow fixes an **entire package at once**. The fix skill spawns one remediator per object, in parallel batches (**default 3, max 4**), each in its own sealed context. The run is **resumable** (completed objects are skipped) and **circuit-breaks** after 3 consecutive SAP-unreachable failures.

```
[12/25] ZCL_FIN_DOC_READER:   success (fixed=1, needs_review=0, failed=0) C->A
[13/25] ZFIN_POSTING_REPORT:  partial (fixed=2, needs_review=2, failed=0) C->C
[14/25] ZFIN_PERIOD_CLOSE:    needs_review (fixed=0, needs_review=2) D->D
```

After a package run, the `clean-core-review` skill writes a retrospective (`RETRO.md`): the outcome breakdown, the before/after level distribution, fixes worth a human glance, and **exemption candidates** (findings with no code-level fix). The Level D objects above are a good example: they write directly to standard tables (`BKPF`, `LFA1`), and because a CDS view is read-only there's no successor to swap to, so the agent correctly defers them for a human to exempt or redesign rather than inventing a fix.

## Key takeaways

1. Clean Core remediation is a packaged workflow (four skills plus a remediator subagent) you drive entirely in plain language.
2. Deterministic work (assess, prep) runs as plain abapctl commands with no AI cost; reasoning (successor research, equivalence) is reserved for the agent.
3. You watched the agent fix one object end to end: cascade to the released successor, gather evidence it is equivalent, rewrite the `SELECT`, gate the change, report `C->A`.
4. The remediator's standard is **correctness over fix-count**: it gates every write on the Clean Core level, rolls back automatically on regression, and defers anything it cannot prove safe.
5. The same workflow scales to a whole package: one remediator per object, in parallel, with a review step that surfaces exemption candidates.

→ Continue to **[Use Case 3: Test-Driven Development](./tdd.md)**. For the components in depth see [Clean Core skills](/docs/skills-agents/clean-core-skills); for the CLI commands see the [Clean Core guide](/docs/guides/clean-core).
