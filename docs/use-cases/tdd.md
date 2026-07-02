---
title: "Use Case 3: Test-Driven Development"
sidebar_position: 3
---

# Use Case 3: Test-Driven Development (TDD)

The first two use cases fixed existing code. This one is about writing new code where nothing ships without tests. Instead of writing tests after the fact, you'll let the agent drive test-driven development: write the test first, confirm it fails, implement until it passes, then refactor with the tests in place as a safety net.

## Overview

Here you'll build **new** code, correctly, from the first line. ABAP Unit has always made TDD possible; with abapctl the write-test → make-it-pass → refactor cycle becomes something an agent can drive end to end. You describe the behavior you want, and the agent writes the test first, pushes it, runs it and confirms it fails (**red**), writes the implementation, confirms it passes (**green**), then refactors and re-runs.

This is the same write → push → `check unit` discipline the Clean Core remediator used to gate its fixes, but here you're driving it, on new code.

```
RED                      GREEN                  REFACTOR
write a failing test  →  make it pass        →  improve the code  ─┐
        ↑                                                          │ next behavior
        └──────────────────────────────────────────────────────────┘
```

## The example: a payment validator

You'll build `ZCL_PAYMENT_VALIDATOR`, a class with a method that rejects payments where the amount is zero. It's small enough to build in one sitting and rich enough to show the full cycle. ABAP Unit tests live in a class's `testclasses` include and follow a standard shape:

```abap
CLASS ltcl_payment_validator DEFINITION FINAL FOR TESTING
  DURATION SHORT RISK LEVEL HARMLESS.
  PRIVATE SECTION.
    DATA cut TYPE REF TO zcl_payment_validator.   "class under test
    METHODS setup.
    METHODS rejects_zero_amount     FOR TESTING.
    METHODS accepts_positive_amount FOR TESTING.
ENDCLASS.

CLASS ltcl_payment_validator IMPLEMENTATION.
  METHOD setup.
    cut = NEW #( ).
  ENDMETHOD.

  METHOD rejects_zero_amount.
    " Given a zero amount, When validating, Then it is rejected
    cl_abap_unit_assert=>assert_false( cut->is_valid( amount = 0 ) ).
  ENDMETHOD.

  METHOD accepts_positive_amount.
    " Given a positive amount, When validating, Then it is accepted
    cl_abap_unit_assert=>assert_true( cut->is_valid( amount = 100 ) ).
  ENDMETHOD.
ENDCLASS.
```

## The red-green-refactor loop

### Step 1: Create the (empty) class

> Create a new class ZCL_PAYMENT_VALIDATOR in package ZFIN under transport \<NR> with a public instance method IS_VALID that takes an importing parameter AMOUNT (a currency amount, packed with 2 decimals) and returns a boolean. Leave the method body empty for now, since we're doing TDD and the test comes first.

The agent runs `abapctl create class …` to scaffold the class with the method signature but no logic yet.

### Step 2: RED, write the test first and watch it fail

> Write an ABAP Unit test class for ZCL_PAYMENT_VALIDATOR following TDD. Add a test that asserts IS_VALID returns false when AMOUNT is zero, and one that asserts it returns true for a positive amount. Push the test into the testclasses include under transport \<NR> (preview with a dry run first), then run the tests. The positive-amount test should FAIL because the method has no logic yet.

The agent syntax-checks the test, pushes it into the `testclasses` include, and runs `abapctl check unit ZCL_PAYMENT_VALIDATOR`. The positive-amount test fails, and that failure is **intentional**: it shows the test actually exercises the behavior. A test that can't fail tests nothing. This red step is what separates TDD from writing tests afterward.

:::info Watch for a false pass
You might notice the zero-amount test **passes** even though the method is empty. That's a classic TDD trap: an empty `IS_VALID` returns the type's default, `abap_false`, which happens to match what the zero-amount test asserts. It passes by coincidence, not because the code works. The positive-amount test is the one that genuinely fails and drives the implementation. A good agent will call this out rather than report a hollow green, so always include at least one case whose expected value is *not* the default.
:::

### Step 3: GREEN, implement until it passes

> Implement IS_VALID in ZCL_PAYMENT_VALIDATOR so the tests pass: return false when AMOUNT is zero, true otherwise. Push the implementation under transport \<NR> after a dry-run, then run the unit tests again and confirm they're green.

The agent writes the implementation, pushes it, and re-runs the tests. They pass. You have closed the first red-green loop on the live system.

### Step 4: Extend the spec, red again then green

> New requirement: IS_VALID should also reject negative amounts. Add a test for that first and run it (it should fail), then update the implementation to make it pass, push under transport \<NR>, and re-run all tests until everything is green.

Each new behavior follows the same rhythm: a failing test that captures the requirement, then the smallest change that satisfies it.

### Step 5: REFACTOR, improve the code behind the tests

> Refactor IS_VALID for readability (for example, guard clauses instead of nested IFs) without changing behavior. Push under transport \<NR>, then run the unit tests to confirm they're still green after the refactor.

If the tests stay green, the refactor preserved behavior. If one goes red, the agent has caught a regression right away, which is exactly what the safety net is for.

### Step 6: Test doubles and boundary cases

Extend the validator test-first so a payment is also invalid when its tax makes it too expensive. The tax comes from the shared `ZIF_TAX_CALCULATOR` interface, so inject a test double you control instead of the real calculator.

> Extend ZCL_PAYMENT_VALIDATOR in package ZFIN, transport \<NR>, test-first:
> 1. First read the ZIF_TAX_CALCULATOR interface so we use its real method.
> 2. Generate a test double ZCL_TAX_MOCK that implements ZIF_TAX_CALCULATOR with a configurable return value for its calculate method.
> 3. Have IS_VALID take a ZIF_TAX_CALCULATOR (injected, defaulting to a real one), and add a rule: a payment is invalid if its calculated tax exceeds the amount.
> 4. Write the test first using the mock (red), then implement the smallest change to pass (green), re-running all tests each time.
> Preview every push with a dry run, and show me the final test list.

The first line matters: asking the agent to **read the interface first** keeps it grounded in the method that actually exists (`calculate`), rather than assuming one that doesn't. Injecting a double you control is how you test logic that depends on another object without calling the real one.

> Add boundary-value tests for IS_VALID: zero, the smallest positive amount, a very large amount, and an initial/unset reference. Run them and fix any that reveal a gap in the implementation.

## Key takeaways

1. The agent drives the full write-test → make-it-pass → refactor loop from plain language: test first, then implementation.
2. The **red** step is essential: a test that fails before the code exists is one that actually tests something.
3. Tests are pushed into the `testclasses` include and run with `check unit` against the live system, the same gate the Clean Core remediator uses.
4. Green tests make refactoring safe: a regression turns a test red immediately.
5. Test doubles isolate dependencies; boundary-value tests catch the edge cases.

→ That completes the three core use cases. Explore the optional [More agentic workflows](./going-further.md), or revisit the [Quality checks guide](/docs/guides/quality-checks) for the underlying mechanics.
