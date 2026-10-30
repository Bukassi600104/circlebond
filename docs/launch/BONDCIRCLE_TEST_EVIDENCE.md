# BondCircle test evidence

Started29 October2026; updated30 October2026 (Africa/Lagos). Integration branch: `codex/production-readiness`. This record is updated as checks finish; no historical counts imply current acceptance.

## Baseline and completed bounded checks

| Check                           | Actual result                              | Evidence / boundary                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository identity             | PASS                                       | Baseline local/GitHub main `c0b1f913caeeffee546f79e2804f2583f2963edd`, tree `d25b5b798b28aa70dabf74fbcc5252e5e85a77dc`; initially clean                                                                                                                                                                                                                                                                                 |
| Baseline unit/integration run   | FAIL                                       | A: 129 tests, 127 passed, 2 failed; stale native resolver source assertions assigned to G; this does not justify reverting correct authentication code                                                                                                                                                                                                                                                                  |
| Baseline formatting             | FAIL, corrected in bounded change          | A's formatted checkout full Prettier check passed; see AGENT_A_CI_EVIDENCE.md; integrated gate still required                                                                                                                                                                                                                                                                                                           |
| Deadline scheduler regression   | PASS for bounded change                    | B and independently F each ran 21 tests with no failures; three new tests execute actual transpiled route; remaining checks include source contracts                                                                                                                                                                                                                                                                    |
| Offline service worker          | PASS for bounded change                    | Parent: 6 actual-worker VM behavior tests and 5 existing PWA source tests passed (11 total); targeted ESLint passed. No physical installation result implied                                                                                                                                                                                                                                                            |
| Loopback SMTP fixture           | PASS for bounded transport compatibility   | Parent: one real Nodemailer-to-loopback-SMTP transport test passed; authentication E2E now uses production OTP delivery mode, not development-code exposure                                                                                                                                                                                                                                                             |
| Full final CI                   | PENDING REVIEW                             | Must run after integrations, including production build and both emulator suites                                                                                                                                                                                                                                                                                                                                        |
| Fresh dependency installation   | PENDING REVIEW                             | Old-lock scripts-enabled npmci completed exit0/1086packages; superseded. Final patched-lock clean npmci completed exit0:1085packages, scripts enabled,24minutes,2026-10-30T00:23:29.9118764Z; exact lock SHA12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38 unchanged. InstalledNext16.4.3/Sharp0.35.5/Nodemailer10.1.4/TypeScript5.9.3 verified; TEMP/bondcircle-final-rc-install-status.json and.log |
| Dependency vulnerability review | PASS for bounded high/critical remediation | Fresh original audit1critical/11high/8moderate; patched exact-lock production0critical/0high/8moderate and full0/0/15moderate; H independently inspected audit/integrity/compatibility. Final install/build and moderate residual assessment separate                                                                                                                                                                   |

## Current production, read-only

Command: `npm run verify:production -- --base-url https://www.bondcircles.com --storage-bucket bond-circle.firebasestorage.app`.

Actual exit status: 1. Six of eight checks passed:

- PASS: HTTPS canonical origin, configuration-health response, browser security headers, manifest/service worker assets, crawler metadata, absence of exposed development-only codes on checked pages.
- FAIL: published legal pages contain `pre-launch details required`.
- FAIL: configured production Storage bucket returns HTTP 404. B independently confirmed with two provider endpoints.

Health checks verify configuration, not successful database writes, backups, authorized storage operations or email delivery. No customer writes, payment, retention invocation or provider configuration change was performed.

## Browser evidence

Bundled Playwright used an existing installed desktop Chromium executable. Public live sign-in screenshots were captured at 390, 768 and 1280 CSS pixels. At each width `document.documentElement.scrollWidth === innerWidth`; horizontal overflow assertion passed.

Local captures: `tmp/launch-evidence/sign-in-live-before-{390,768,1280}.png`. These are desktop browser viewports, not physical phones/tablets. The initial in-app-browser attempt timed out; bundled headless-shell was absent, so the existing full Chromium executable was used successfully without downloading another browser.

Initial harness wall times included navigation, heading wait and screenshot I/O on a heavily stalled host. They are not product latency or Core Web Vitals benchmarks. Controlled-network journey measurements remain NOT STARTED.

## Acceptance environments

| Environment / provider journey                          | Status         | Needed                                                                                        |
| ------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| Physical iPhone Safari and installed PWA                | BLOCKED        | Actual device, approved staging/test identity, recorded install/auth/upload/recovery journey  |
| Physical Android Chrome and installed PWA               | BLOCKED        | Actual device, approved staging/test identity, recorded journey                               |
| Desktop browser complete authenticated journeys         | PENDING REVIEW | Integrated local/emulator candidate; public sign-in baseline is insufficient                  |
| Safari / VoiceOver                                      | BLOCKED        | Supported browser/device and assistive-technology test                                        |
| Staging storage / persistence / SMTP                    | BLOCKED        | Approved staging resources and credentials, no production credentials reused                  |
| Payment provider sandbox                                | BLOCKED        | Approved provider and sandbox configuration; pure mocks are not provider acceptance           |
| Database backup / restore and Vercel rollback rehearsal | BLOCKED        | Correct provider scope, approved isolated restore/rollback target and owner/operator evidence |

Full journey acceptance and final exact-commit evidence are pending. Source assertions, module tests, emulator tests and real provider/device tests are reported separately.

## Integrated correction checks — 30 October2026

- Shared contact/CAS/recovery/registration/security focused run:31 PASS, zero failures. Public-error/profile checks initially4 PASS; after legal-responder correction5 PASS. Account/legal/profile/public-error integration15 PASS. These execute actual transpiled source with isolated provider boundaries.
- Payment/UX/privacy integration:46 checks initially45 PASS/one fixture dependency failure; corrected legal session fixture then15/15 related checks PASS. Neither the fixture failure nor its correction is represented as a live provider defect.
- Web/native OTP/auth/OpenAPI integrated run:24 PASS, zero failures/skips, including consumed-proof409 with zero provider/profile access. G isolated correction43 focused checks PASS; scoped lint/typecheck PASS.
- H full integrated unit run before final fixture corrections:267 tests,263 PASS,4 FAIL, no skips. Failures were stale outage-copy/token-model assertions and two missing response-helper fixture dependencies. H corrected the two source assertions with parent review; parent corrected the two helper fixtures and reran17 relevant tests PASS. Final complete rerun remains required.
- Deadline offset concurrency defect was independently reproduced by A. Replaced offset with parameterized server-only SQL UUID cursor; combined schema/connector compile exited0 with metadata only and no error list. Three actual-module regressions PASS:501 eligible circles,401 with concurrent earlier closure, malformed nativeSQL rows fail closed. Real SQL/UUID/null-cursor E2E is added and pending H execution.
- H independently checked exact patched-lock audit/integrity and actual Nodemailer10 transport; E upload helper/five callers in a separate browser fixture passed9 checks. Both reviews retain finalCI/provider/device limits.

Raw transient logs/screenshots are ignored under tmp/launch-evidence and task-specific TEMP paths. Durable conclusions and command boundaries are in this file and linked review records. Do not attach raw OTPs, credentials, customer records or provider payloads.
