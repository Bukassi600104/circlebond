# Independent local database acceptance

30 October 2026 (Africa/Lagos). Reviewer/operator: Agent H, independent of payment/API/privacy/rate/deadline implementation authors. Actual installed Ponytail review workflow. **PASS** for the bounded combined-schema and synthetic local connector scenarios below; final updated-lock CI and production/staging acceptance remain separate.

Exact tested commit: `957d19af1aa9513bd2d32fb266ffb3519d9a6270` on `codex/qa-database`. Application source is parent commit `566d05bddebfc8aa1fb656e3d6c435786db6638a`, plus H's test-only assertion corrections and review documents. Dependencies were reused from the older desktop installation. This does not claim a clean install or runtime acceptance of the updated dependency lock.

## Actual execution

- Cached native Data Connect toolkit3.4.16 compiled the complete local schema/operations: process exit0 and parsed JSON `errors:null`. `--config_dir` pointed only at this checkout. No `--project_id`, deployed-source lookup, SDK regeneration or production migration was used.
- Started a fresh in-memory PGlite instance through the existing Firebase tooling, awaited `getDb()` and verified `SELECT1` before configuring the native server. PostgreSQL listened on `127.0.0.1:5544`; Data Connect listened on `127.0.0.1:9499`. Existing occupied ports would have caused refusal, not replacement. No Auth/Storage emulator or application build was started.
- Ran `node --test --test-concurrency=1 --test-reporter=tap tests/e2e/circle-engine.test.mjs tests/e2e/account-privacy.test.mjs tests/e2e/rate-limit.test.mjs` with explicit `DATA_CONNECT_EMULATOR_HOST=127.0.0.1:9499`. Each suite checks loopback targeting before initialization. File-level execution was sequential; concurrency scenarios inside the tests remained concurrent.
- **17 tests PASS, 0 failed, 0 skipped; process exit0.** The run started `2026-10-30T00:21:59Z` and completed `2026-10-30T00:23:25Z`.

| Verified scenario group            | Result                                                                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Once-per-account trial concurrency | Exactly one simultaneous first-circle claim succeeds; losing circle remains draft                                                                             |
| Activation/upgrade persistence     | Exact historical prices, concurrent checkout lock, failed upgrade preserving active plan, cancelled draft cannot reopen                                       |
| All three approved modes           | Gift allocation/member ring, event-neutral Aso-Ebi tiers/selection/fulfilment, Support privacy/pledges/updates/completion persist                             |
| Lifecycle and owner records        | Atomic draft/membership/transition/audit behavior; owner telemetry; archive/purge retains audit record                                                        |
| Invitations                        | Secure link records, approval, revocation and multi-circle membership persist                                                                                 |
| Receipts                           | Partial-payment accumulation, rejection, replacement and audit persist                                                                                        |
| Device registrations               | Real connector writes, shared-device owner reassignment and owner-only removal work                                                                           |
| Privacy                            | Export remains self-scoped; persisted privacy intake preserves shared records                                                                                 |
| Deadline SQL cursor                | Real nullable initial cursor and UUID ordering work; closing an earlier circle does not lose later rows                                                       |
| Rate-limit CAS                     | Twelve parallel requests allow exactly the configured budget of three; persisted attempts match; legacy attempts remain enforced during bucket initialization |

Owned toolkit/database processes were stopped. Independent socket checks confirm ports9499 and5544 are closed. Two PostgreSQL gateway `ECONNRESET` messages appeared during shutdown after the successful test process exited; no test assertion failed and neither server remains running.

## Evidence and limits

Ignored local evidence in the tested payments worktree: `tmp/h-database-suite.mjs` and `tmp/h-database-evidence/{compile.log,toolkit.log,database-tests.tap,result.json}`. The tracked tree stayed clean during execution. Preserve these local records with the release evidence; do not commit raw query/debug data.

These tests exercise real local connector transactions and synthetic data. Receipt/image paths are persistence evidence, not a real Storage upload/download/replace/delete test. Payment records are synthetic state transitions, not a Paystack charge or provider sandbox call. Privacy intake is not completed legal erasure. Local purge touches only this disposable database. Production backup/restore, migration compatibility against actual legacy data, provider delivery, hosted concurrency, staging Storage, real devices and final updated-dependency runtime checks remain BLOCKED or PENDING REVIEW as recorded in the central ledger. Risk: medium until those gates close.

No production credentials, customer data, real charge, production data mutation, paid resource or deployment was used.
