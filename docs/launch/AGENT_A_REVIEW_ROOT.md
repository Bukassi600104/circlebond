# Independent Ponytail review — shared root corrections

What this change does: `65155110286b11f4e5e75eccae79818f976b765e` strengthens verified-contact authentication, OTP budgets, consent validation, recovery continuation and public error handling. Follow-ups `7e5957d` and `e3791dd` address OTP replay ordering and expand scheduled deadline processing.

Reviewer: Agent A, a non-author of these product changes, using the actual installed Ponytail 5.3.3 review skill. Date: 30 October 2026 (Africa/Lagos). This review does not approve Agent A's own dependency or CI changes; Agent H independently reviews those.

## Must fix

2. **A concurrent circle completion skips another circle's deadline reminder** (`server/repositories/notifications.ts`, `dataconnect/bondcircle/queries.gql`). Classification: **FAIL** at `7e5957d`/`e3791dd`.
   - What this is: The job requests 200 active deadline candidates at a time, ordered by ID, and uses the number already processed as its next offset.
   - Problem: The eligible query result changes when a creator completes a circle. In a 401-circle execution of the actual repository function, completing the first circle during the first page left 400 eligible circles and a reported 400 processed, but eligible `circle-0200` was never visited. A circle whose deadline is today can miss the daily reminder entirely.
   - Fix: Traverse with a stable keyset cursor instead of an offset into the changing eligible set. Keep the 501-circle regression and add the concurrent-removal case.
   - If skipped: Successful job counts can conceal missing reminders during ordinary concurrent circle activity.

## Review cycle and resolved finding

1. **A consumed registration OTP still changed the account before rejection.** Classification: **FAIL** at `6515511`, then **PASS** for the bounded correction in web `7e5957d` and native `e3791dd`.
   - The exact original web handler returned 409 only after `updateUser`, `setCustomUserClaims`, `persistUserProfile` and `createCustomToken`. Replaying a spent registration proof could restore stale profile or consent values despite its rejection.
   - The parent moved atomic challenge consumption before provider access or account/token mutation and changed post-reservation failure copy to require a new code. An independent rerun of both new replay regressions returned 409 with zero provider access and zero profile writes.

## Verification evidence

- Read exact committed source, connected authentication paths, query/schema operations, notification delivery, recovery/navigation and error handling. The new limiter uses a database compare-and-set update, preserves recent legacy attempts and fails closed on corrupt/unavailable state. Its eight-retry contention limit is explicitly documented in code.
- Independently executed the six focused security test files from a small immutable Git snapshot of `6515511`: **35 passed, zero failed/skipped/cancelled**, 20,860.715 ms. These include contact verification, suspension, named-invite contact boundaries, CSRF, OTP production configuration, receipt privacy, consent and rate-limit behavior.
- Independently reran exact follow-up handlers/tests: **3 passed, zero failed/skipped/cancelled**, 7,530.714 ms: web/native spent-OTP rejection plus the stable-dataset 501-circle deadline case.
- Added a separate local concurrency reproduction against the actual committed deadline processor: **1 failed as expected**, showing one still-eligible circle skipped after concurrent removal. This is a new regression case, not a weakened or replaced existing test.

The snapshot tests redirect only TypeScript and Sharp imports to the already installed desktop libraries. TypeScript executes the committed production modules with controlled dependencies; this is module-level verification. The Sharp error-redaction check uses the existing library and does not validate the newly patched native codecs. No build, emulator, production data, actual device or external email was used for this review.

Local raw evidence is retained under `TEMP/bondcircle-security-review-1793318718095/`: `review-tests.json`, `review-followup-tests.json`, and `deadline-concurrency-repro-result.json`, with the reproduction at `tests/unit/deadline-concurrency-repro.test.mjs`. Keep these records before cleanup. The parent owns central-ledger integration.

Verdict: fix finding 2 before accepting this combined change.

Not checked: final integrated build/dependency install, real Data Connect CAS concurrency, production schema deployment, browser/device authentication, SMTP provider delivery or complete native API acceptance. Those remain separate release gates; this review does not declare the product production-ready.
