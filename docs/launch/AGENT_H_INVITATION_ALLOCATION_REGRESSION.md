# Invitation allocation and transaction regression evidence

Agent H independently exercised the actual invitation repository and named Data
Connect operations against a fresh in-memory PGlite database. The only mocked
dependency was notification delivery. Authentication, payment-provider settlement,
Storage bytes and real devices are outside this test's acceptance scope.

## Scope and classification

- Equal Gift/Support allocation and invitation transaction guards: **PASS** on
  product `c5236c6`, subject to independent review and updated-lock integrated CI.
- Capacity-upgrade contribution policy: **BLOCKED** on owner decision. The actual
  new-member journey currently fails after a stored capacity increase; its minimal
  compatibility regression is **FAIL**. No new allocation policy was invented.
- Overall public release: **BLOCKED**; this evidence does not replace production
  configuration, recovery, provider, legal or physical-device gates.

The source of the equal-share expectation is the existing Gift/Support creation
UI and creator allocation, `calculateEqualSlotAllocations`, and the existing
planned-capacity unit cases. Target 3000 with capacity 3 yields 1000 each; target
100 with capacity 3 yields 34, 33, 33. Invitation input still omits an amount for
these cases, matching the normal equal-mode workflow. The backend assigns it.

## Preserved actual runs

All evidence directories below are ignored local artifacts in the payments QA
worktree. Each retains `result.json`, `database-tests.tap`, `compile.log` and
`toolkit.log`. No earlier failed result was overwritten.

| Product source / test state                                                  | Actual result           | Evidence directory                             |
| ---------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------- |
| `c296297`, original 11 cases                                                 | 1 PASS, 10 FAIL         | `tmp/h-invitation-allocation-baseline/`        |
| `c296297`, corrected complete upsert fixtures / expanded 22 cases            | 2 PASS, 20 FAIL         | `tmp/h-invitation-allocation-baseline-v2/`     |
| `0339082`, unchanged 22-case blob `5f19e2474404522959b8a85fa67480d4b3bbf4dd` | 10 PASS, 12 FAIL        | `tmp/h-invitation-allocation-green-unchanged/` |
| `0339082`, corrected legacy/pending fixtures plus two causal expiry cases    | 12 PASS, 12 FAIL        | `tmp/h-invitation-expiry-red-033/`             |
| `c5236c6`, same 24-case assertions                                           | 24 PASS, 0 FAIL, 0 SKIP | `tmp/h-invitation-final-guards-green/`         |
| `c5236c6`, separate stored capacity-upgrade compatibility case               | 0 PASS, 1 FAIL          | `tmp/h-invitation-upgrade-policy-repro/`       |

The 24-case green run used QA commit
`9020b4a68d6a63c0a6fdb177da15e4dce05db8d3` (product `c5236c6` plus QA-only
`a373c96897f5804ea854b3031160abd123e027c2`), from
2026-10-30 10:01:37.297Z to 10:02:01.812Z. Both source compile and actual configure
passed. These are reused older desktop dependencies, **not** the final clean
updated-lock acceptance: Admin 13.6.0, Firebase Tools 15.25.1, TypeScript 5.9.3.

The original baseline had two invalid partial-circle-upsert setup failures; they
were corrected to complete fixture records before the 22-case red run. At
`0339082`, two further setup assumptions became invalid: a pending request could
no longer be created through the correctly guarded unpaid-draft request mutation,
and `not_required` was never the approved legacy activation status. The corrected
fixture directly seeds a historical pending acceptance and uses the actual schema
legacy status `grandfathered`. Rejection/legacy-success assertions are retained.

## Causal findings and corrected behavior

- The original repository saved equal invitee amounts as zero. Both direct and
  approved joins are now checked for exact balanced allocations, rounding and
  replacement of a removed member's remaining 34-unit slot without rewriting
  existing members. Custom Gift and custom Support amounts remain unchanged.
- Four barriers released two operations only after both real repository
  prechecks, immediately before actual database mutations. The original source
  committed both, including a one-use link/capacity-2 overrun. On `0339082`, both
  still committed while stored counters remained unchanged. On `c5236c6`, exactly
  one commits: two joined members, memberCount 2, one accepted user and useCount 1.
  This checks direct and organizer-approved joins at capacities 2 and 3.
- Stale completion, revocation and expiry are applied through actual database
  writes after repository prechecks. Each must reject without adding membership
  or consuming invitation use. Unpaid drafts may prepare invitations but may not
  gain members, including approval of a historical pending request. Active
  grandfathered circles retain valid joining.
- Each narrow expiry test takes T0 from actual mutation `respondedAt`, writes
  expiry T1 = T0 + 1 ms, then asserts T0 < T1 < T2 immediately before the actual
  SDK write. The `0339082` guards incorrectly admitted both joins (T2-T1 was
  50 ms direct, 18 ms approval). Transaction-time guards on `c5236c6` rejected
  both (T2-T1 was 34 ms direct, 13 ms approval). No sleeps or fabricated outcomes
  were used to establish that window.

## Unresolved upgrade compatibility

The separate real-repository test starts with target 3000, capacity 3 and the
existing creator share 1000. It represents an already-upgraded stored Standard
circle at capacity 10, then creates and accepts a normal invitation. This fixture
does **not** claim that a real provider payment or upgrade checkout occurred.
The compatibility assertion requires joining and unchanged prior shares without
choosing a new member amount. The operation fails with `ACTIVITY_NOT_ALLOWED`:
“Existing equal contributions need organizer review before more members can join.”

The approved upgrade requirements preserve existing amounts, while the allocation
policy after capacity changes is not defined. Owner selection and implementation
must precede final acceptance; neither test data nor an inferred policy may hide
the failure. The new browser assertion also requires the normal 3000/3 invitee
to display “₦1,000 expected”; the earlier seven browser phases did not assert
this amount and remain bounded historical evidence.

## Execution boundary and handoff

Native toolkit 3.4.16 compiled with `build --config_dir` and no project ID; JSON
`errors` was checked even when process exit was zero. PGlite was warmed with
`SELECT 1` before opening explicit loopback 5544, then local Data Connect 9499 was
configured. No ADC, production credentials, production source lookup or live
customer writes were used. Test teardown printed connection-reset messages as
owned emulator connections closed; these were retained. Both owned ports were
confirmed closed after the final repro. No dependency installation or application
build was performed by H during these runs.

Next gates: independent review, owner upgrade decision, updated SDK and clean-lock
integrated CI, then the exact new build's real browser journeys including the
equal-member amount assertion. Do not promote the previous build or infer a
production/provider/device pass from local database results.
