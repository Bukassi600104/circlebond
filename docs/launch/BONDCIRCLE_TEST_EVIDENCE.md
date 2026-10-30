# BondCircle test evidence

Updated 30 October 2026 (Africa/Lagos). Integration: C:/Users/USER/Desktop/Bond Circle, codex/production-readiness. Baseline main c0b1f913caeeffee546f79e2804f2583f2963edd. This record separates current acceptance, preserved failures and external gates.

## Current source acceptance

Owner decision BC-050: preserve existing assigned amounts and split only the remaining target across unfilled places. Source `78e459d` plus adb619c implements this for Equal Gift/Support direct joins and approvals. Existing expected/confirmed amounts remain unchanged. Query/schema/generated SDK/lock are unchanged from `00750cd` by these policy source edits.

| Gate                                           | Actual result / scope                                                                                                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approved-policy actual database regression     | PASS 34/34, zero failures/skips, source `adb619c` with unchanged test blob 525a51b85d1e4f985f88187d551da15e1bdf50c4; native compile/configure PASS                                    |
| Non-author source/database review              | PASS, bounded; final place, four complete upgrade sequences, concurrency, lifecycle and database-time expiry independently inspected                                                  |
| Approved-policy unit regression                | PASS32/32 on corrected source and independent exact3b56d82 rerun; old007 RED24 PASS/8 FAIL retained                                                                                   |
| Complete local CI                              | PASS at exact3b56d82: format/lint/high-threshold audit/types/full npm test/explicit build all exit0;423 tests,0 failures/skips/cancellations                                          |
| Final artifact public/authenticated browser    | PASS39 public checks and7 named authenticated phases per browser, actual Edge and Chrome, exact3b56d82/buildRk5aHEWUVu4sxKLFjosoY; final non-author local source/evidence review PASS |
| Production/provider/device/recovery acceptance | BLOCKED; details below                                                                                                                                                                |

Actual database execution10:50:16.030–10:51:11.308UTC used fresh in-memory PGlite and local Data Connect, with notification delivery isolated. All four Gift/Support direct/approval upgrades fill nine places with [223,223,222,222,222,222,222,222,222] while creator assigned 1000/confirmed 700 remain unchanged. Existing zero/unequal amounts are preserved. Invalid amounts/over-target totals and stale/full/closed/revoked/expired/unpaid-draft cases reject safely. See [causal database evidence](AGENT_H_INVITATION_ALLOCATION_REGRESSION.md). These stored-capacity fixtures do not claim payment checkout occurred.

## Exact current local CI —3b56d82

All six persisted command statuses name exact3b56d820031e7234b32e87805248bde8f2441e35 and lock12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38. Format, lint, high-threshold audit and types exit0. Complete npm test ran11:01:41.331–11:04:41.484UTC:367 unit/integration+1 production-mode local Auth/SMTP+55 actual database=**423 PASS**, zero failed/skipped/cancelled. Its internal build passed42 static pages. The separate final build ran11:04:50.218–11:05:25.288UTC, exit0,42 pages; actual BUILD_ID **Rk5aHEWUVu4sxKLFjosoY**.

Before H service ownership,11:06:18.260UTC verification recorded clean tracked checkout, exact physical/committed lock equality and all ten owned ports closed. H browser acceptance on that artifact passes: public39/39 and all7 named authenticated phases; independent final local evidence review PASS. The earlier scripts-enabled clean install is reused at the unchanged lock; no fresh installation claim is made for3b56. Raw proof is CI tmp/launch-evidence/final-3b56d82 and the primary recovered copy. Independent final local evidence review PASS. This local synthetic artifact is not production-configured output.

The final non-author Ponytail reviewer independently read all six actual status records, lock/build bytes,423-test logs and the final immutable browser reports/screenshots. Verdict: **PASS for reviewed local source/evidence**; public launch remains **BLOCKED**. Hosted Linux/Node22 CI also passes for publishedabd2454 and an identical PR merge tree; see the verified hosted section below.

## Installation and environment

Scripts-enabled clean npm ci completed2026-10-30T00:23:29.9118764Z, exit0,1085 packages. The unchanged committed lock SHA256 is12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38. It is reused for subsequent source-only checks; no fresh installation is invented.

Actual host: Node24.13.1/npm11.9.0/TemurinJRE21.0.11+10. Installed Next16.4.3, Sharp0.35.5, Nodemailer10.1.4, TypeScript5.9.3, FirebaseTools15.25.1. Exact-lock audit: zero critical/high,15 moderate full-tree findings including8 production-chain findings. See [dependency assessment](AGENT_A_DEPENDENCY_SECURITY.md); zero high/critical is not vulnerability-free.

Production-mode local builds use synthetic Firebase values and guarded loopback DNS/SMTP/Auth/Data Connect. They are not production-configured artifacts to promote. The distinct Linux/Node22 hosted result is now verified below; package counts and runtime versions are reported separately from Windows.

## Verified hosted GitHub CI

[Draft PR1](https://github.com/Bukassi600104/circlebond/pull/1) remains open/draft/unmerged; main remainsc0b1f913caeeffee546f79e2804f2583f2963edd. [Run34](https://github.com/Bukassi600104/circlebond/actions/runs/41048618241), required verify job124038838746, completes successfully for published headabd2454f63ac17dcbe7a9dffd166bdd9f474e037. Actual checkout is PR merge102dcdcf5b87f41deef964b479074f57e553be71; both commits have identical complete treef07d6b9dc3b2fa0af03231ba3664e86cb511779a. This is verified tree equivalence, not an assumption that Actions checks out the literal head.

Actual runner Ubuntu24.04.5/Node22.23.4/npm10.9.9/Temurin21.0.13+9. Scripts-enabled npm ci adds1105 packages/audits1107; high-threshold audit succeeds with15 moderate findings. Install, audit, lint, format, types and complete npm test all pass. The logs show367 unit/integration+1 local Auth/SMTP+55 actual database=**423 PASS**, zero failures/skips/cancellations, and42 static pages built. Independent Ponytail review reads the actual job/logs and verifies the merge/head tree identity. This is not deployment, genuine provider or physical-device acceptance.

Compact proof and decoded206901-byte log are preserved under tmp/launch-evidence/hosted-abd2454f-run41048618241/. Log SHA256:63fd2a4a1437900fd4511c365c1defc916991b508659e36f524364bd9fef7434. Later documentation-only commits require their own GitHub check; the PR checks show the latest exact head.

## Preserved causal and historical results

| Source / check                         | Actual result / correction                                                                                                                                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Baseline129 unit/integration           | 127 PASS/2 FAIL; stale native source-name expectations replaced with actual handler/auth regressions                                                                                                                       |
| Initial full integration               | Formatting/type/prerender/fixture failures retained and corrected, including real recovery Suspense and no altered health success behavior                                                                                 |
| 129f1e1 complete local CI              | 350 PASS =328 unit/integration+1 local Auth/SMTP+21 actual DB; all six commands PASS, buildRPkt0JpvTKX8H-5okJbgd                                                                                                           |
| 7e4b76c full test                      | FAIL at locked Firebase CLI configure before native HTTP readiness; prior unit result does not imply Auth/DB completion                                                                                                    |
| 4008ace complete local CI              | 354 PASS =332+1+21; all six commands PASS, buildC9BwsS1dP5v77CXiA9lsW; bounded test-only readiness correction                                                                                                              |
| c296297 complete local CI              | 357 PASS =335+1+21; all six commands PASS, buildLj4cseoIXmldPNwpBuEcd                                                                                                                                                      |
| c296/007 ordinary browser              | 39 public checks/24 layouts and7 named authenticated phases PASS; later007 assertions verify both ordinary creator/member 1000. Earlier c296 screenshots exposed omitted amount assertions; no upgrade acceptance inferred |
| Initial Equal allocation22 actual DB   | 2 PASS/20 outcome FAIL, including genuine capacity/use races and zero assigned shares                                                                                                                                      |
| 0339082 no-op guard prototype          | Initial22 cases:10 PASS/12 FAIL, including two invalid fixtures subsequently corrected; genuine duplicate-write counter/race defects remained. Replaced by single guarded actual writes                                    |
| c523/982 corrected guards              | 24 then27 ordinary/race/expiry/pending cases PASS; the additional upgrade case still FAIL until policy approval                                                                                                            |
| 00750cd complete npm test              | FAIL: build PASS,361 unit/integration=357 PASS/4 upgrade FAIL; no skips/cancellations, automatic Auth/DB stages not reached                                                                                                |
| 00750cd separate checks                | Format/lint/audit/types/build PASS; separate Auth1 PASS; separate DB49=47 PASS/2 FAIL                                                                                                                                      |
| 6f75f4a fixture-only DB follow-up      | 49=48 PASS/1 upgrade FAIL; positive fixture corrected to actual grandfathered active Custom Gift, with all existing assertions retained                                                                                    |
| Approved-policy tests on old982 helper | 34=28 PASS/6 FAIL, unchanged new-policy test blob                                                                                                                                                                          |
| Initial policy source `78e459d`        | 34=20 PASS/14 FAIL; group-size helper rejected final remaining place1                                                                                                                                                      |
| Corrected source `adb619c`             | Unchanged34 PASS/0 FAIL/0 SKIP; final place directly receives remaining target                                                                                                                                             |

Failures are not combined with separate runs into a passing pipeline. Detailed command statuses, UTC times, exact commits, lock hashes and fixture limits are in [Agent A CI](AGENT_A_FINAL_CI_EVIDENCE.md), [H browser](AGENT_H_BROWSER_ACCEPTANCE.md), [H database](AGENT_H_DATABASE_ACCEPTANCE.md), [allocation regression](AGENT_H_INVITATION_ALLOCATION_REGRESSION.md) and [independent review](BONDCIRCLE_FINAL_INDEPENDENT_REVIEW.md).

### Desktop checkout line endings

The post-closeout desktop format check initially exited1 with117 warnings caused by older physical CRLF files, while the clean CI checkout and committed files were LF. Both installed Prettier versions are3.6.2. Only128 tracked text files whose normalized bytes exactly equaled committed HEAD were restored to those exact LF bytes; binary or changed content was not overwritten. Refreshing index stat information produced no staged diff and clean status. The subsequent full desktop npm run format:check exited0. This changes no committed source/configuration/test/lock bytes and does not require a new application build. Raw proof: tmp/launch-evidence/publication/desktop-line-ending-materialization.json.

## Production read-only verification

Command: npm run verify:production -- --base-url https://www.bondcircles.com --storage-bucket bond-circle.firebasestorage.app. Fresh post-restart result: exit1,6/8 PASS.

- PASS: HTTPS canonical origin, configuration-health response, security headers, manifest/service worker assets, crawler metadata and no development-only codes on checked pages.
- FAIL: legal pages contain “pre-launch details required”.
- FAIL: configured Storage bucket returns HTTP404 on two provider endpoints. Thirteen inspected public client chunks confirm this bucket without printing configuration keys.

Health is configuration evidence, not hosted CRUD/delivery/recovery proof. Owning Vercel scope remains inaccessible, so live deployment SHA/configuration/rollback relationship is unverified. No authenticated production request/customer write/provider change was performed.

GitHub main now requires actual verify/app15368 with strict up-to-date checking and administrator enforcement; force pushes/deletion and auto-merge remain off. Fresh non-author API/workflow readback PASS. No main merge, deployment or manual test-merge attempt occurred; the hosted candidate result is verified in its own section.

## Acceptance environments and limitations

| Environment / journey                            | Status  | Required evidence                                                                                                                     |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Physical iPhone Safari/installed PWA             | BLOCKED | Actual install, standalone auth/invite/upload/app-switch/offline/update journey                                                       |
| Physical Android Chrome/installed PWA            | BLOCKED | Actual installation/session/sharing/upload/recovery journey                                                                           |
| Desktop Edge                                     | PASS    | Current exact3b56/buildRk5 public39 and7 authenticated phases; Actual Edge156.0.4314.50; phone/tablet layouts are viewport simulation |
| Desktop Chrome                                   | PASS    | Actual Google Chrome156.0.8078.49, exact3b56/Rk5,39 public/seven authenticated phases; non-author evidence PASS                       |
| Safari/VoiceOver/other real assistive technology | BLOCKED | Supported device/browser and operator testing                                                                                         |
| Genuine staging Storage/SMTP/persistence         | BLOCKED | Approved resources/credentials; upload/read/replace/delete, failures and recovery                                                     |
| Approved payment sandbox/webhooks/refunds        | BLOCKED | Provider approval, actual sandbox and reconciliation/refund operator; mocks are not provider acceptance                               |
| Backup/restore/compatible rollout/rollback       | BLOCKED | Recoverable backup and approved isolated rehearsal target/operator                                                                    |
| Legacy allocation/counter reconciliation         | BLOCKED | Authorized audit of historical overbooking/drift/invalid amounts; no production rewrite                                               |
| Dense individually-valid5MB image combinations   | BLOCKED | Approved transport resolution; current client rejects aggregate hosting overflow safely                                               |
| Legal/privacy/incident/notification operations   | BLOCKED | Identity/contacts/professional review, fulfillment and alert/retry/reconciliation evidence                                            |

Controlled browser lab budgets remain LCP≤2500ms, CLS≤0.1, interaction≤200ms and warm unauthenticated session APIp95≤800ms, under150ms added latency/1.6Mbpsdown/750kbpsup/4xCPU. Historical007 samples passed: sign-in1032/1084/1156ms, onboarding1076/1344/2228ms, CLS0.024387, interaction≤38.9ms,20-sample warm unauthenticatedp95=7.94ms; responsive image640px/24,062bytes. Small local lab samples are not fieldp75/INP or authenticated database latency. Current Rk5 lab samples also pass: sign-in1188/1220/1572ms, onboarding1144/1144/1104ms, maximum CLS0.024387, next-screen76.9/40.8/30.8ms,20-sample warm unauthenticated APIp95=23.22ms. Wrapper11:06:48–11:09:04UTC exits0 with public39/39 and7 named authenticated phases. Its8 authenticated-report entries include one delegated public-suite check. Both ordinary creator and joined member display1000 expected; invitation amount is omitted. H records CI clean and all ten ports closed after execution. No provider/device acceptance is inferred.

Actual separate Chrome acceptance: wrapper11:18:29.448–11:21:01.971UTC exit0, version156.0.8078.49, public39/39 and7 named authenticated phases. Sign-in LCP1328/1504/1208ms; onboarding1344/1328/1324ms; max CLS0.024387, interaction21ms, warm unauthenticated APIp95=10.22ms. Same budgets/fixtures/assertions, actual creator/member1000, no invitation amount. Immutable Chrome hashes match its handoff and original Edge hashes remain unchanged. Non-author reviewer viewed reports and three screenshots and accepted this separate evidence. Safe primary copy: tmp/launch-evidence/qa-h-3b56d82-chrome-browser-20261030T1121. Physical-device/provider gates remain open.

## Evidence custody and publication hygiene

Ignored raw proof stays under tmp/launch-evidence and specialist worktrees. Primary recovered bundles include qa-h-007-final-browser-20261030T1036, qa-h-owner-policy-db-20261030T1051 and qa-h-3b56d82-final-browser-20261030T1109. Do not publish raw OTPs, invitation tokens, credentials, provider payloads or customer records.

Publication scan10:55:09.912UTC at377ebcd covered baseline-to-HEAD and pending reports:242 files,233 text/9 binary, no unreadable files and no high-confidence private-key/GitHub/OAuth/full-JWT/live-key markers. Scope excludes ignored artifacts, prior history, unchanged baseline, image OCR and live-key validation. The pre-publication refresh at11:16:42.292UTC on4119b5d plus pending reports again covered242 files/233 text/9 binary with zero unreadable files or high-confidence markers; raw summary is tmp/launch-evidence/publication/hygiene-before-publication.json. Earlier PNG provenance/metadata checks remain separately documented. This is bounded hygiene, not complete secret certification.

Automatic approval review rejected recursive cleanup of node_modules.partial with reason “blocked by policy”. It remains untouched and excluded from commits; no workaround was attempted. No production deployment, real charge, production secret change, customer mutation, destructive migration, restore or public pilot occurred.
