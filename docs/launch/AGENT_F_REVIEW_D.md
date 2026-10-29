# Independent Ponytail review — UX and account privacy

What this change does: Commit `1534d1203d2016db676afe0b35770eecf91b8a55` replaces sign-out-only settings with account export and persisted privacy-request intake, adds an audited owner review queue, and enforces persisted policy acceptance before circle creation or joining. It also improves profile editing, returning-user navigation and native dialog behavior.

Review date: 30 October 2026 (Africa/Lagos). Reviewer: Agent F, who did not author D's implementation. Mechanism: the installed `ponytail-review` skill, plugin 5.3.3; no external approval service is implied.

## Initial decision — `1534d12`

**FAIL** pending the export-boundary correction and related registration caller fixes below. All 50 selected tests passed, but they do not cover these cases. No product code was changed by this reviewer.

## Must fix

1. **Export limits do not match the implemented contract** (`server/repositories/account-privacy.ts:51,63,79`).
   - **What this is:** The exporter promises explicit assisted processing above 10,000 records or 4 MB, while paginating eight self-scoped collections.
   - **Problem:** The loop caps the offset of each collection rather than the combined record count. An independent probe of the actual transpiled repository returned 10,400 records from eight collections of 1,300 rows, only 137,146 bytes. Conversely, exactly 10,000 rows in one collection threw `AccountExportLimitError` because the final empty sentinel page was never fetched.
   - **Fix:** Enforce the combined collection count and permit the final sentinel page at offset 10,000. Add regressions for exactly 10,000 records, 10,001 records, and several collections whose combined count exceeds the limit.
   - **If we skip it:** The advertised safety boundary is false and an eligible exact-limit export is unnecessarily refused. Review remains FAIL for this confirmed new-code defect.

2. **Registration still accepts non-boolean policy consent** (`app/api/auth/email-otp/request/route.ts:43`; `app/api/v1/auth/email-otp/request/route.ts:50`).
   - **What this is:** D correctly requires literal `true` in `/api/auth/legal`, but the existing registration OTP callers also create acceptance timestamps.
   - **Problem:** Both registration callers still use truthiness. A registration body with `termsAccepted: "false"` and `privacyAccepted: "false"` passes that check and receives accepted timestamps in its challenge. The new persisted gate then treats those timestamps as acceptance after verification.
   - **Fix:** Apply strict boolean validation to both registration request paths and set timestamps only for literal `true`. Add actual-handler negative tests for strings, numbers and missing values; valid registration must still work.
   - **If we skip it:** The claimed registration consent contract remains incomplete. This is an inherited caller gap, not introduced by D's diff; the parent must integrate its coordinated correction before accepting the complete legal journey.

3. **Re-registration can clear unrelated Firebase claims** (`app/api/auth/email-otp/verify/route.ts:124`; `app/api/v1/auth/email-otp/verify/route.ts:114`).
   - **What this is:** D's explicit policy-acceptance endpoint merges existing custom claims correctly. The registration verification paths also write policy claims for an existing Firebase user.
   - **Problem:** Those existing paths pass only the two policy timestamps to `setCustomUserClaims`. Re-registering an existing email therefore replaces its unrelated custom claims instead of retaining them.
   - **Fix:** Merge the current verified user's existing custom claims in both registration paths, as D already does in `/api/auth/legal`, with runtime regressions for an existing unrelated claim.
   - **If we skip it:** A normal account action can discard existing claim data. This is another inherited integration dependency; it is not evidence that D's new merge implementation failed.

## Checks completed

Read D's full diff, connected account/settings/profile and authentication callers, shared circle and invitation admission, privacy repository, additive schema/queries, owner access/audit path, tests, UX audit and locked product requirements. Reviewed the actual 390px settings and legal-dialog component-preview PNGs. They are clearly identified as stubbed component previews; they do not prove full application, production fonts, authenticated journeys or physical-device behavior.

Independently ran:

`node --test tests/unit/account-privacy-runtime.test.mjs tests/unit/legal-acceptance-runtime.test.mjs tests/unit/authentication.test.mjs tests/unit/invitations.test.mjs tests/unit/dashboard.test.mjs tests/unit/component-library.test.mjs`

Result: **50 tests passed, zero failures**, exit 0. Fifteen tests exercise actual modules/components with isolated dependencies; many older tests are source-contract checks. The independent export boundary probe used the actual repository with deterministic query fixtures, without production access or source modification.

Within the inspected implementation:

- Export queries bind every collection to the authenticated UID; caller-supplied user identifiers are ignored. Queries omit device/invitation tokens, credentials, storage paths, other participants' records and receipt image binaries. Responses are private/no-store attachments and provider errors are generic. Pagination runs until all collections finish, subject to finding 1.
- Privacy intake validates kind, authenticates the user, checks CSRF for session callers, uses a deterministic per-user/kind primary key, confirms persisted state and returns the concurrent winner after a conflicting insert. Failed database work is not reported as successful.
- Deletion intake leaves accounts, circle memberships, receipts, trial usage and token registrations intact. Both UI and API describe a pending review rather than falsely claiming erasure.
- The owner queue requires existing owner access. Acknowledgment and its audit insert share a Data Connect transaction, and missing references are checked. No exposed operation marks a request fulfilled.
- Persisted active-account acceptance is checked in account navigation and shared circle creation/membership/admission. Missing, incomplete, suspended or unavailable records fail closed. The explicit policy endpoint requires literal booleans, strict persistence and merged claims.
- Native `dialog.showModal()` supplies browser modal isolation; callbacks and cleanup retain existing layouts. Native focus/device/assistive-technology acceptance remains a separate browser/device gate.
- Returning or reduced-motion users skip the decorative splash delay; denied local storage cannot stop onboarding navigation. Profile editing reuses the existing endpoint and refreshes current names. Its final authenticated persistence/error behavior depends on the parent's shared repository changes.

## Explicit limits and integration dependencies

- The parent's verified-contact normalization is a known shared-auth dependency. It predates D and is not duplicated here as a D-introduced finding. The parent is also coordinating atomic rate limits and general error hygiene.
- D's Data Connect privacy E2E depends on G's token operations and must run on the integrated schema under H. This review did not run a duplicate emulator or claim database/provider acceptance.
- Additive migration review, backup, staging deployment and actual cross-user persistence remain required. No migration or live customer operation was performed.
- Actual erasure/export-image fulfillment, identity-verification procedure, responsible operator, response timetable and lawful retention exceptions remain BLOCKED pending owner/professional policy approval. Intake implementation does not close that operational obligation.
- Real iPhone/Android PWA, Safari, assistive technology, full authenticated browser flows and provider operations are not accepted by these component screenshots or unit tests.

Verdict: Fix 1 and integrate/retest 2–3 before code acceptance. Keep operational privacy fulfillment and real-device/provider acceptance BLOCKED.

Not checked: production data, actual privacy fulfillment/erasure, live migrations, provider delivery, complete authenticated browser journeys or physical devices.

## Correction review — `f89cb103877f5dd835c0f1c22182a3ae9486f7d3`

Date: 30 October 2026. Agent F independently reviewed the parent's correction; the reviewer authored neither D's product code nor this correction.

**PASS for finding 1 and the bounded export correction.** The repository now counts records across all eight related collections, rejects counts above 10,000 before returning an export, and permits the final empty sentinel page at offset 10,000. The existing 4 MB, ownership, private-response and failure safeguards remain. No additional product defect was found in this two-file correction.

Independently ran `node --test tests/unit/account-privacy-runtime.test.mjs`: **9 tests passed, zero failures**, exit 0. This includes the original self-scope, privacy intake/concurrency, owner authorization and error cases plus the two added export-limit regressions. Independent probes of the actual transpiled repository additionally returned 9,999 and exactly 10,000 records and rejected 10,001 with `AccountExportLimitError`. The prior 10,400-record multi-collection defect is rejected by the focused regression.

Findings 2–3 remain **PENDING REVIEW of the shared authentication integration**. The parent reports strict consent validation in both primary request routes and claim preservation in the primary web verifier; native verifier integration was still pending at this review. Those primary changes are outside this isolated correction's source tree and have not been approved by this review. They must be tested and independently reviewed against the final integrated commit; the inherited callers in this isolated branch do not establish resolution.

This closes the confirmed D-owned export defect. It does not grant complete legal-journey, operational privacy-fulfillment, database/provider, real-device or public-launch acceptance. D's full integration remains PENDING REVIEW until those applicable shared checks are reconciled; actual policy/operator fulfillment and provider/device gates remain BLOCKED as documented above.

Verdict: Ship the corrected export implementation through the normal integration gate. Keep inherited authentication findings open until independently verified in the shared release candidate.

Not checked in this closure: shared primary authentication corrections, integrated Data Connect E2E, live customer data, migrations, physical devices or actual privacy fulfillment/erasure.
