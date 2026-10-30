# Current integrated CI evidence — Agent A

Date: 30 October 2026. Exact tested source: `3b56d820031e7234b32e87805248bde8f2441e35`, clean isolated branch `codex/final-approved-allocation-candidate`. **AUTOMATED LOCAL CI — PASS. INDEPENDENT LOCAL-CI EVIDENCE REVIEW — PASS.** Ponytail_final independently checked the six saved command proofs, actual 423-test summaries, source/lock equality, artifact and handoff snapshot. H's browser acceptance remains a separate gate. This supersedes the historical failed 00750cd candidate after explicit owner approval and implementation of the allocation policy; all original failed results remain preserved.

No production deployment, real charge, live-provider transaction, customer-data mutation or destructive production migration was performed.

## Required checks on one frozen candidate

| Command                      | Actual result                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| npm run format:check         | PASS, exit 0                                                                                                               |
| npm run lint                 | PASS, exit 0; zero allowed warnings                                                                                        |
| npm audit --audit-level=high | PASS, exit 0; zero critical/high, 15 moderate findings                                                                     |
| npm run typecheck            | PASS, exit 0                                                                                                               |
| npm test                     | PASS, exit 0: 367 unit/integration + 1 local SMTP/Auth + 55 actual local DB tests = 423; zero failures/skips/cancellations |
| npm run build                | PASS, exit 0; final build ID `Rk5aHEWUVu4sxKLFjosoY`                                                                       |

The complete npm test command ran its build, unit/integration, authentication and database stages successfully in one invocation. No failed case was removed, skipped or replaced with a successful status. Both its internal build and the separate final build rendered 42 static pages. npm test ran from `2026-10-30T11:01:41.3319465Z` to `11:04:41.4836632Z`; the separate final build completed at `11:05:25.2877971Z`.

At `2026-10-30T11:06:18.260Z`, the checkout was clean, the physical lock matched its committed bytes, and ports 9099/9399/9499/5432/5544/3099/3100/4000/4400/4500 were closed. H then received the new build and owns services for final browser verification. The source and artifact remain frozen during that run. The closed-port statement applies to the handoff timestamp.

## Owner-approved allocation correction

The owner approved preserving every existing assigned and confirmed amount, then splitting only the remaining target across unfilled places for new members. The shared Gift/Support helper implements this policy without rewriting existing members. A fully assigned target permits a new zero share; a final single place receives the entire remaining target. Invalid negative/noninteger/over-target amounts, stale joined counts and invalid capacity still fail before writes. Pricing and entitlement rules were not changed.

The same approved-policy unit bytes failed on old 00750cd (24 passes, 8 failures) and passed all 32 focused cases on the corrected helper. These cases use the actual Gift allocator and cover direct/approval joins, legacy zero/unequal assignments, preserved confirmed history, full target conservation and all nine new places after a 3→10 upgrade: [223,223,222,222,222,222,222,222,222]. Independent Ponytail review reran all 32 at integrated 3b56d82 successfully. H independently verified all 34 actual DB allocation/race/expiry/pending/upgrade cases before integration; the complete fresh DB runner above includes them and passes all 55 tests.

The earlier last-place defect was corrected rather than bypassed: the pricing capacity validator requires at least two planned members, so the single remaining place is handled after validating the original capacity. The existing positive invitation fixture now uses legitimate grandfathered legacy defaults, Custom Gift amounts and actual draft→published→active transitions, with persisted precondition assertions. Its original invitation/approval/revocation/multi-circle assertions and unpaid-draft rejection tests remain intact. No successful payment was fabricated to activate that fixture.

## Installation, contract and test environment

The patched-lock clean npm ci completed at `2026-10-30T00:23:29.9118764Z` with exit 0, lifecycle scripts enabled and 1,085 packages. No reinstall or dependency modification was needed for this candidate. Physical and committed lock SHA-256 are `12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38`. The security audit is an explicit separate gate, rather than inferred from the install's --no-audit flag.

Actual host: Node 24.13.1, npm 11.9.0 and Temurin JRE 21.0.11+10. Installed versions include Next/eslint-config-next 16.4.3, Sharp 0.35.5, Nodemailer 10.1.4, TypeScript 5.9.3 and Firebase Tools 15.25.1. Linux/Node 22 GitHub Actions was not executed locally. Fifteen moderate full-tree findings, including eight in the production chain from the exact-lock production audit, remain assessed in AGENT_A_DEPENDENCY_SECURITY.md. A zero-vulnerability claim is not made.

Schema, connector queries, generated SDK and lock are unchanged from 00750cd; no new SDK generation or migration was needed for the approved allocation policy. The current SDK contract was generated twice locally earlier, with all 15 raw hashes identical. Private NO_ACCESS invitation update aliases return actual update counts; runtime/package files and function/variable signatures are unchanged. Strict generated-declaration checking with skipLibCheck=false and application type checking passed. The declaration command emitted no output, so its exit-0 status JSON is the evidence. Ponytail_final independently accepted the generation/type/tree proof. Stale f7ffc53 was not integrated; da6e7d5 supplies the current generated contract.

The artifact is a production-mode **LOCAL** build with synthetic Firebase public values and guarded loopback DNS/SMTP/Auth/Data Connect fixtures. No production env file or credentials were copied. It is not a promotable production-configured artifact. Real local SMTP/Auth, transactional persistence and Sharp decoding are tested; controlled payment mocks and emulator records do not establish Paystack sandbox/live acceptance.

Firebase Tools emitted deprecation messages and connection resets during successful emulator shutdown. All command wrappers returned their actual status; the six final exit codes are 0. The CLI readiness guard remains bounded to the strict loopback setup endpoint and preserves the original configure call; it does not retry tests or suppress failures.

## Evidence and remaining gates

Current proof in the CI worktree: `tmp/launch-evidence/final-3b56d82/`, containing six command logs/status JSON files, candidate.json, release-verification.json and this summary. Every status records exact HEAD, lock hash, exit code, UTC timing and Java path. Clean-install proof remains in TEMP/bondcircle-final-rc-install-status.json and its log.

Historical final-00750cd, invitation-positive-fixture, owner-approved-allocation-unit and earlier evidence bundles remain separate and unchanged. Earlier passing 357/354/350 totals do not describe this candidate. The current complete count is 423. No worktree cleanup/archive is authorized.

H's final authenticated/public browser results, physical iPhone/Android installation, actual Storage operations, external SMTP/payment configuration, data recovery, legal/operational decisions and production promotion remain separate acceptance gates in the central ledger. Passing local CI does not establish overall public-launch readiness.
