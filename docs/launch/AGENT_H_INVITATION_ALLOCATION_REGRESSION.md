# Invitation allocation and transaction regression evidence

Agent H independently exercised the actual invitation repository and named Data
Connect operations against a fresh in-memory PGlite database. The only mocked
dependency was notification delivery. Authentication, payment-provider settlement,
Storage bytes and real devices are outside this test's acceptance scope.

## Scope and classification

- Equal Gift/Support allocation, approved upgrade policy and invitation guards:
  **PASS** within the verified local scope on integrated product `3b56d82`
  (approved helper `adb619c`). All 34 H database tests pass, followed by clean-lock
  integrated CI and exact-build browser regression; independent evidence review
  accepted these bounded results. The details are recorded below.
- The human owner approved preserving existing assigned and confirmed amounts
  while splitting the remaining target over unfilled places. The former policy
  decision blocker is resolved; external provider approval is separate.
- Overall public release: **BLOCKED**; this evidence does not replace production
  configuration, recovery, provider, legal or physical-device gates.

The source of the equal-share expectation is the existing Gift/Support creation
UI and creator allocation, `calculateEqualSlotAllocations`, and the existing
planned-capacity unit cases. Target 3000 with capacity 3 yields 1000 each; target
100 with capacity 3 yields 34, 33, 33. Invitation input still omits an amount for
these cases, matching the normal equal-mode workflow. The backend assigns it.

## Owner-approved upgrade correction

The same approved implementation and tests are integrated into exact commit
`3b56d820031e7234b32e87805248bde8f2441e35`. Agent A's updated-lock pipeline passed
all423 tests (367 unit/integration,1 Auth/SMTP,55 real DB) without exclusions,
failures or skips. H then exercised its exact final local build
`Rk5aHEWUVu4sxKLFjosoY`: public39/39 and all seven authenticated phases pass,
including actual ordinary member/creator1000 amounts with invitation amount
omitted. See `AGENT_H_BROWSER_ACCEPTANCE.md` for immutable reports and fixture
boundaries. The non-author Ponytail skill reviewer independently accepted the
source/database,423-test CI and exact-build browser evidence. External release
gates are unaffected by these local passes.

After the earlier upgrade failure, the owner explicitly chose to preserve
assigned/confirmed history and divide the remaining target among unfilled places.
The new QA commit `8a3b0a5` changes the former legacy-zero rejection expectation
because that old rule is superseded by this approval; it does not weaken circle
permissions, capacity, invitation-use, lifecycle or expiry assertions.

The exact test blob `525a51b85d1e4f985f88187d551da15e1bdf50c4` was exercised in
three preserved runs:

| Application source                                  | Result                   | Evidence directory                         |
| --------------------------------------------------- | ------------------------ | ------------------------------------------ |
| `9820dfb`, old helper / newly approved expectations | 28 PASS, 6 FAIL, 0 SKIP  | `tmp/h-invitation-owner-policy-red/`       |
| `78e459d`, initial policy implementation            | 20 PASS, 14 FAIL, 0 SKIP | `tmp/h-invitation-owner-policy-green/`     |
| `adb619c`, corrected final-place implementation     | 34 PASS, 0 FAIL, 0 SKIP  | `tmp/h-invitation-owner-policy-adb-green/` |

The second run exposed a real implementation defect: passing one remaining place
to `calculateEqualSlotAllocations` invokes its whole-circle pricing validation,
which rejects group size1. This broke ordinary final joins and the ninth new
upgrade member. Assertions were unchanged. The corrected helper validates the
original circle capacity and returns the remaining target directly for its final
place. The exact 34-case rerun on QA commit
`ac97d4042ec3043d938f5aa042f4ff363edcd256` (product `adb619c` plus unchanged test
commit) ran from 2026-10-30 10:50:16.030Z to 10:51:11.308Z. Native compile, parsed
JSON errors and actual configure all passed. Dependencies remain the reused older
desktop install; this is not a replacement for updated-lock CI.

Four upgrade tests exercise Gift/Support and direct/organizer-approved joining.
They represent an already-upgraded stored capacity3→10, without claiming payment
settlement. Creator assigned1000/confirmed700 remain unchanged after every actual
join. All nine unfilled places are filled with exactly
`[223,223,222,222,222,222,222,222,222]`; expected amounts sum to3000, memberCount
becomes10 and useCount9. Additional actual cases preserve zero/unequal assignments
and confirmed history, reject negative/over-target stored amounts without a join,
and prove that real database Int validation rejects malformed writes without
changing existing records. Malformed-read defensive logic is a separate module
test boundary, since malformed Int records cannot be inserted through this schema.

Earlier rejected/failed results are retained. No live records, provider payments,
dependency installation or application build were used for these H runs. Safe
JSON/TAP copies are preserved in primary
`tmp/launch-evidence/qa-h-owner-policy-db-20261030T1051/`.

## Preserved actual runs

All evidence directories below are ignored local artifacts in the payments QA
worktree. Each retains `result.json`, `database-tests.tap`, `compile.log` and
`toolkit.log`. No earlier failed result was overwritten.
Safe result/TAP files, plus earlier bounded public/authenticated browser reports
and screenshots, were also copied without overwriting to primary
`tmp/launch-evidence/qa-h-recovered-c296-and-invitations-20261030T1003/`.

| Product source / test state                                                  | Actual result           | Evidence directory                                     |
| ---------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------ |
| `c296297`, original 11 cases                                                 | 1 PASS, 10 FAIL         | `tmp/h-invitation-allocation-baseline/`                |
| `c296297`, corrected complete upsert fixtures / expanded 22 cases            | 2 PASS, 20 FAIL         | `tmp/h-invitation-allocation-baseline-v2/`             |
| `0339082`, unchanged 22-case blob `5f19e2474404522959b8a85fa67480d4b3bbf4dd` | 10 PASS, 12 FAIL        | `tmp/h-invitation-allocation-green-unchanged/`         |
| `0339082`, corrected legacy/pending fixtures plus two causal expiry cases    | 12 PASS, 12 FAIL        | `tmp/h-invitation-expiry-red-033/`                     |
| `c5236c6`, same 24-case assertions                                           | 24 PASS, 0 FAIL, 0 SKIP | `tmp/h-invitation-final-guards-green/`                 |
| `c5236c6`, separate stored capacity-upgrade compatibility case               | 0 PASS, 1 FAIL          | `tmp/h-invitation-upgrade-policy-repro/`               |
| `c5236c6`, upgrade narrowed after review to observational amounts            | 0 PASS, 1 FAIL          | `tmp/h-invitation-upgrade-policy-repro-observational/` |

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

The final pending-request correction `9820dfb` was also exercised without
excluding the unresolved upgrade test. The full run at 2026-10-30
10:09:13.922Z–10:09:47.200Z yielded **27 PASS, 1 FAIL, 0 SKIP**, with compile and
configure passing. All original 24 cases plus three new pending-request stale
completion/revocation/expiry cases pass. The sole failure remains the upgrade
compatibility assertion below. Evidence is retained in
`tmp/h-invitation-pending-guard-final/` and its primary-directory copy.

The three new cases change actual state after repository prechecks and before
the SDK transaction, asserting no pending acceptance, no membership, unchanged
use count and no revoked-token resurrection. They do not claim to reproduce the
narrower concurrent revoke occurring after an internal transaction query and
before its write. That exact internal interleaving was not injectable through
the repository hook. Legitimate pending requests are exercised by the successful
approval allocation and concurrent-approval cases. The new conditional token
write was inspected separately; integrated CI and independent acceptance remain
pending.

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

## Historical upgrade blocker before the owner decision

The separate real-repository test starts with target 3000, capacity 3 and the
existing creator share 1000. It represents an already-upgraded stored Standard
circle at capacity 10, then creates and accepts a normal invitation. This fixture
does **not** claim that a real provider payment or upgrade checkout occurred.
The compatibility assertion requires joining and retaining prior membership;
before/after assigned amounts were observational while owner policy was pending.
The operation fails with `ACTIVITY_NOT_ALLOWED`:
“Existing equal contributions need organizer review before more members can join.”
The first prototype also asserted unchanged unpaid shares. Independent review
correctly identified that this would preselect one of the owner's policy options.
That assertion was removed; the observational rerun still rejects the join, with
before/after amounts both `[1000]`. Its original failed evidence remains intact.

The owner subsequently chose the preserving-assigned policy described above.
The historical failure was not hidden or replaced with an invented policy.
The new browser assertion also requires the normal 3000/3 invitee
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

Next gates: independent review, updated SDK and clean-lock
integrated CI, then the exact new build's real browser journeys including the
equal-member amount assertion. Do not promote the previous build or infer a
production/provider/device pass from local database results.
