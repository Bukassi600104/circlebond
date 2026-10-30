# Independent browser acceptance evidence

All runs described here use synthetic loopback data and desktop Edge controlled through Playwright. Simulated phone/tablet viewports are not physical-device acceptance. Provider, Storage, physical iPhone/Android and real Safari acceptance remain **BLOCKED**.

## Final integrated local run: 3b56d82

Exact clean application/test commit:
`3b56d820031e7234b32e87805248bde8f2441e35`. Final local build:
`Rk5aHEWUVu4sxKLFjosoY`. The reviewed H scripts are byte-identical to this
checkout (auth Git blob `7da6962a626a7769d448fad0051b07a1def9da2a`, public
`b586ef2b7bb322943ed1bb926bd0b9e81e8c07de`). No assertions, budgets, source,
schema, SDK, lock or artifact were changed for this run.

**Actual results: public39/39 and all seven authenticated phases PASS. Bounded
independent acceptance: PASS. Overall public launch: BLOCKED.** The
authenticated JSON has eight PASS entries because its first delegates to the
separate public harness. Do not count that as an eighth authenticated journey.

All seven phases listed in the recorded007 run below were exercised again,
including valid pre-consent403/code/no-side-effect, real UI OTP/session and legal
continuation, saved pending-payment draft/reload without checkout, eligible Trial
publication, invitation→OTP/consent→join, exact member invitation POST400/GET403
and unchanged owner counts, profile persistence/self-scoped export, viewport
overflow checks, and logout401. Both actual member/creator rows display exactly
₦1,000 expected on the ordinary unupgraded3000/3 circle; the invitation amount is
omitted. H inspected the new member screenshot. This uses seeded synthetic Auth
accounts and does not claim UI registration, provider settlement or Storage bytes.

| Route      | Sample | LCP ms | CLS       | Controlled next-screen ms |
| ---------- | ------ | ------ | --------- | ------------------------- |
| Sign-in    | 1      | 1188   | 0.0001391 | NOT APPLICABLE            |
| Sign-in    | 2      | 1220   | 0.0001243 | NOT APPLICABLE            |
| Sign-in    | 3      | 1572   | 0.0001243 | NOT APPLICABLE            |
| Onboarding | 1      | 1144   | 0.0243870 | 76.9                      |
| Onboarding | 2      | 1144   | 0.0243870 | 40.8                      |
| Onboarding | 3      | 1104   | 0.0243870 | 30.8                      |

The original budgets/profile below are unchanged and all six samples pass.
Onboarding selected width640/encoded24062bytes in each. Warm **unauthenticated**
session401 p95 was23.22ms over20 samples. Public24 layouts pass and the external
request counter is zero. These remain controlled desktop Edge156.0.4314.50
measurements, not field or physical-device results. Authenticated loopback CSP,
temporary exact-origin Local Network Access, native browser Secure-cookie fetch,
and pre-OTP redirect-refresh fixtures are unchanged (12 modified documents,
one pre-OTP refresh, APIRequest401/browser200 diagnostic). They do not verify
production CSP, genuine Firebase-provider configuration or public permissions.

The ordinary CLI wrapper exited0, from 2026-10-30 11:06:48.169Z to11:09:04.906Z;
the browser report spans11:07:22.535Z–11:08:58.877Z. Next and emulators shut down,
all ten ports were confirmed closed, and tracked CI source remained clean. Exact
immutable reports are `public-browser/3b56d82-public-pass.json` and
`authenticated-browser/3b56d82-authenticated-pass.json` under CI
`tmp/launch-evidence/`. The wrapper result and
`h-browser-3b56d82-handoff.json` retain build/head/lock, report SHA256s and closed
ports. Safe copies with verified24 public/three authenticated screenshots are in
primary `tmp/launch-evidence/qa-h-3b56d82-final-browser-20261030T1109/`.
All previous failures and reports remain retained; no cleanup was performed.

The non-author Ponytail skill reviewer `ponytail_final` independently read both
immutable reports, matched their SHA256s against the handoff, viewed the new
member/draft/settings screenshots and accepted this bounded result. It verified
the clean-source/closed-port record at11:10:31.957Z. That review explicitly
excludes provider, physical-device and production-policy acceptance.

Agent A's exact-source updated-lock CI separately records423 PASS
(367 unit/integration +1 Auth/SMTP +55 actual DB), zero failed/skipped/cancelled,
all six gates exit0 and the explicit final build. Its authoritative proof is
`tmp/launch-evidence/final-3b56d82/release-verification.json` in CI. The approved
upgrade policy's former failures are corrected and covered there; provider,
production infrastructure/recovery, legal and actual-device gates remain open.
This synthetic Firebase local build is not a promotable production artifact.

## Recorded invitation-fix run: build 00750cd

Frozen application/configuration/schema/SDK/lock source:
`00750cd316885f27e5a3f215f005971908f44f25`; local build:
`PD4mqlXuPDW5HzsyLaaCe`. Clean checkout
`6f75f4a5a25e2c1a15d883d962c6da1dfcbb30e3` differs only by an independently
reviewed positive database fixture. No application or build change was made for
the browser run. The ordinary guarded Firebase CLI wrapper ran from
2026-10-30 10:34:28.700Z to 10:36:45.743Z and exited zero. Desktop Edge was
`156.0.4314.50`.

**Bounded browser result: PASS. Overall release: BLOCKED.** Public39/39 passed,
including24 layouts and six unchanged controlled samples. All seven authenticated
journey phases passed. The authenticated JSON reports eight PASS entries because
its first entry delegates to the separate public harness; there are seven
authenticated phases.

The actual phases cover UI OTP/session and persisted legal consent; valid
pre-consent multipart403 with `LEGAL_ACCEPTANCE_REQUIRED` and no circle side
effect; Starter draft creation/reload without checkout; a separate eligible
Trial's automatic publication; invitation continuation through
Register/Sign-in/OTP/consent and joining; member invitation POST400/GET403,
unchanged owner counts and absent admin controls; persisted profile edits and
caller-scoped export; phone viewport overflow; and logout followed by session401.
Auth accounts were seeded in the emulator, so this is not UI registration.

The ordinary unupgraded Equal Gift target3000/capacity3 now visibly shows
**₦1,000 expected for both the joined member and retained creator**. Exact DOM
assertions locate their controlled display names after the real join. Invitation
input omits `expectedAmount`. Source trace: `GetGiftCircleDetail` returns stored
membership amounts, `server/repositories/gift-circles.ts` maps them without
recalculating, and `GiftCircleView` renders `money(member.expectedAmount)`. H
inspected the screenshot and confirmed the previous zero-share defect corrected.
QA assertions `271c7ea`/`60fa5af` were independently reviewed before execution.

| Route      | Sample | LCP ms | CLS       | Controlled next-screen ms |
| ---------- | ------ | ------ | --------- | ------------------------- |
| Sign-in    | 1      | 1032   | 0.0001391 | NOT APPLICABLE            |
| Sign-in    | 2      | 1084   | 0.0001243 | NOT APPLICABLE            |
| Sign-in    | 3      | 1156   | 0.0001243 | NOT APPLICABLE            |
| Onboarding | 1      | 1076   | 0.0243870 | 35.9                      |
| Onboarding | 2      | 1344   | 0.0243870 | 20.7                      |
| Onboarding | 3      | 2228   | 0.0243870 | 38.9                      |

Original budgets are unchanged: LCP2500ms, CLS0.1, controlled next-screen200ms,
warm unauthenticated API p95800ms. All six fresh390x844 samples used latency150ms,
1.6Mbps down,750kbps up and CPU4x. Onboarding selected width640 and encoded24062
bytes in all three samples. Warm **unauthenticated** session401 p95 was7.94ms over20
samples. These are not authenticated API, field or physical-device measurements.
Public contexts retained the original CSP, received no local-network permission,
and recorded zero blocked external requests.

Authenticated contexts retain the reviewed loopback-only document CSP adapter,
exact-origin temporary Local Network Access permission, native browser fetch for
Secure-cookie handling, and one pre-OTP Sign-in refresh after verified invitation
continuation. The diagnostic again recorded APIRequest401/browser200. There was
no Cookie/Bearer injection or production header change. Twelve documents and one
pre-OTP refresh are recorded. These fixtures do not accept production CSP,
provider operation or real public-browser permissions.

CI evidence: `tmp/launch-evidence/public-browser/007-public-pass.json`,
`tmp/launch-evidence/authenticated-browser/007-authenticated-pass.json` and
`tmp/launch-evidence/h-browser-wrapper-last.json`. Safe copies plus verified24
public/three authenticated screenshots are in primary
`tmp/launch-evidence/qa-h-007-final-browser-20261030T1036/`. Prior failures are
archived separately. Next/emulators stopped; all ten application/emulator ports
were confirmed closed and CI tracked source was clean. No cleanup was performed.

At this recorded source, four unit/integration cases and one real-DB upgrade
compatibility case still failed. The subsequent human decision preserves assigned
amounts and splits the remaining target over unfilled places; implementation and
fresh source-specific verification are required. This recorded browser pass does
not resolve those failures or production/provider/recovery/legal/device gates.
The synthetic Firebase build is not a promotable production artifact.

## First actual run: candidate 129f1e1

Date: 30 October 2026. Application commit `129f1e14b36cfe24edacaca276801d6b0ca543fe`, clean tracked CI checkout, completed updated-lock install, production-mode local build `RPkt0JpvTKX8H-5okJbgd`. The build contains synthetic Firebase emulator configuration and is not a promotable production artifact. Desktop Edge version `156.0.4314.50`.

Ordinary Firebase CLI started explicit local Auth/Data Connect emulators. One owned Next server ran on `127.0.0.1:3100`; both browser suites shared it. The public harness used the independently reviewed loopback-only guard from H commit `427894e`. No external browser HTTP request was observed. No provider transaction or Storage byte operation was performed.

**First-run result: FAIL.** Public suite: 35 PASS, 4 FAIL. The authenticated suite stopped at its first email-input selector before OTP submission; it did not exercise the remaining journey. Failed evidence is preserved and must not be replaced with a success claim.

- All 24 public layout checks passed across 390x844, 768x1024, 1280x900 and 844x390. Each checked horizontal overflow, one main landmark and one primary heading, and captured a screenshot.
- Three public failures and the authenticated failure were genuine fixture mismatches: Playwright's exact `getByLabel` matches label text including the required `*`, whereas the field's accessible textbox name correctly excludes its `aria-hidden` star. An actual DOM/browser probe found zero exact label matches and exactly one correctly named textbox. The correction uses exact role/name selectors; product labels remain unchanged.
- The native dialog prevents background focus: explicitly calling the registration display-name input's `focus()` kept focus inside the modal. During Tab navigation, BODY appeared only while `document.hasFocus()` was false, representing browser chrome. The corrected assertion permits browser chrome while still rejecting any focused background DOM control.
- A separate **confirmed product defect** remains in this run: Escape closes/unmounts the legal dialog but fails to restore focus to its trigger. After 150ms, the active element was BODY with `document.hasFocus()` true. The parent owns the product correction. The browser regression continues to require trigger focus restoration after Escape.

## Measured controlled lab samples

Predeclared budgets: LCP 2500ms, CLS 0.1, controlled next-screen latency 200ms, warm local unauthenticated API p95 800ms. Each public sample used a fresh 390x844 context, 150ms added latency, 1.6Mbps download, 750kbps upload and 4x CPU slowdown.

| Route      | Sample | LCP ms | CLS       | Controlled next-screen ms |
| ---------- | ------ | ------ | --------- | ------------------------- |
| Sign-in    | 1      | 1228   | 0.0001243 | NOT APPLICABLE            |
| Sign-in    | 2      | 1032   | 0.0001243 | NOT APPLICABLE            |
| Sign-in    | 3      | 980    | 0.0001243 | NOT APPLICABLE            |
| Onboarding | 1      | 2380   | 0.0243870 | 9.4                       |
| Onboarding | 2      | 2368   | 0.0243870 | 41.0                      |
| Onboarding | 3      | 2432   | 0.0243870 | 41.7                      |

All six samples met their applicable budgets. Warm unauthenticated `/api/auth/session` returned 401 in all 20 measured samples; p95 was 8.96ms. These small controlled local samples do not establish field p75, INP, authenticated API performance or physical-device performance.

Raw first-run reports are in the CI checkout's ignored `tmp/launch-evidence/public-browser/first-129f1e1-report.json` and `tmp/launch-evidence/authenticated-browser/first-129f1e1-report.json`. Screenshots and server logs remain beside them. Updated fixture execution and the independently reviewed product correction require fresh recorded results before this browser gate can pass.

Source preflight also corrected an unexecuted fixture assumption: the existing Gift creation handler automatically claims and publishes an eligible trial. The browser journey therefore saves/reloads a separate Starter draft without checkout, then creates an eligible Trial through its existing UI and asserts automatic activation before inviting a member. Both draft persistence and free activation outcomes remain required; no pricing or product rule is changed.

The pre-consent negative case sends a valid, no-image Starter multipart payload with valid CSRF, because the handler validates form data before the repository's persisted legal boundary. It requires HTTP403 with `LEGAL_ACCEPTANCE_REQUIRED` and unchanged empty caller circle lists before/after; a malformed JSON request would not test that boundary.

## Second actual run: candidate 4008ace

Application/test-tooling commit `4008acec7e66d6d3fb42b4e70079f4f7f0441c3d`, clean tracked CI checkout, production-mode local build `C9BwsS1dP5v77CXiA9lsW`, same Edge version and synthetic configuration. The reviewed CLI-only readiness preload ran before the original emulator configure method; no application or dependency files were changed for the browser run.

**Second-run result: FAIL.** Public suite: 37 PASS, 2 FAIL. The real dialog focus-restoration correction passed, including background inertness and Escape return to the opener. All 24 layouts and all six controlled samples passed; no external browser request was observed. The remaining public failures were exact `role=alert` selector ambiguity with Next's empty route announcer: the correct consent/error paragraphs were present. The fixture now targets the expected alert text and retains its behavioral assertions.

Measured sign-in LCP samples were 1352/1396/1224ms (CLS at most 0.0001392). Onboarding samples were 2428/2428/2272ms (CLS 0.0243870), with controlled next-screen times 21.9/49.9/39.4ms. Warm unauthenticated API p95 was 13.80ms across 20 samples. All predeclared budgets remained unchanged.

The authenticated suite submitted a genuine UI email OTP successfully (the local server recorded successful verification) but timed out before reaching the legal-acceptance page. Client exchange/session/navigation remained under diagnosis; no authenticated journey PASS is claimed. Subsequent diagnostic instrumentation records sanitized endpoint paths/statuses and visible error messages, excluding request/response bodies, token query strings, entered OTP values and verification screenshots.

The second reports are preserved as `second-4008ace-report.json` beside each original ignored report. The first 129f1e1 reports remain retained separately.

## Local Auth CSP diagnosis and fixture boundary

A third, auth-only diagnostic confirmed OTP request202/verify200, no observed Auth9099 request or session POST, and a visible Firebase network-request error. A separate no-token probe against the unchanged production-mode page confirmed a `connect-src` CSP rejection mentioning the explicit local Auth origin before any9099 request reached the network. The probe is retained as `csp-probe-4008ace.json`; the auth diagnostic is `third-4008ace-auth-diagnostic.json`.

The authenticated test fixture therefore adjusts only intercepted loopback document response headers, appending `http://127.0.0.1:9099` to the existing explicit `connect-src`. It preserves every other directive, rejects public/non-origin URLs and absent/duplicate/deny-all policies, disables redirect following in its document fetch, retains external-request blocking, and records original policy hashes. Application headers, global environment, source policy and public browser tests are unchanged. This fixture cannot establish production CSP or genuine Firebase-provider acceptance. No `bypassCSP` setting is used.

## Fourth actual run and restart recovery

The reviewed d7d9061 fixture ran against the same clean 4008ace application/build. Persistent wrapper evidence records start `2026-10-30T02:57:36.7729635Z`, completion `03:01:03.9165602Z`, exit1. Its saved results survived the later app restart and were reread before any services resumed.

**Result: FAIL.** Public checks: 38 PASS, 1 FAIL. All public behavioral assertions and 24 layout checks passed, including legal-dialog focus restoration, correctly scoped consent/error alerts, invitation/recovery continuation and unauthenticated redirects. Onboarding lab sample3 measured LCP2540ms against the unchanged 2500ms budget. This is a real recorded budget failure; it is not waived by earlier passing samples.

The six LCP values were sign-in1360/1352/1260ms and onboarding2456/2428/2540ms. Onboarding CLS remained0.0243870 and controlled next-screen times were50.5/27.2/47.9ms. Warm unauthenticated API p95 was36.07ms over20 samples. Raw reports are retained as `fourth-4008ace-report.json` in both evidence directories.

The authenticated suite remained FAIL at phase1: OTP request202 and verification200, followed by an actual local9099 custom-token request failing `net::ERR_FAILED`; no session/legal continuation was reached. The exact-origin CSP fixture modified one authenticated document and recorded the original policy SHA256. This later transport/browser-policy failure remains under diagnosis; no CORS, permission or product root cause is asserted without console/preflight evidence. H commit05470a3 adds independently reviewed, sanitized policy-reason diagnostics without changing permissions or assertions.

## Actual image attribution before responsive correction

A targeted browser probe on4008ace confirmed viewport390px at DPR1, rendered image width358.797px, natural dimensions1280x853, empty `sizes`, and actual `currentSrc` selecting `w=1920`. The largest-contentful-paint element was that image. Its encoded resource body was67238bytes. The exact evidence is `public-browser/lcp-attribution-4008ace.json`.

This attribution probe was unthrottled and ran separately from the controlled budget suite; its timings are not substituted for the recorded budget results. A first20s cold-start readiness timeout produced no page measurement and was retained as fixture-readiness evidence. The subsequent probe recorded Next ready in3.8s and completed successfully. All ten application/emulator ports were confirmed closed at handoff to Agent A for the responsive-image build. Actual new image selection, transfer size, budgets and authenticated journeys still require fresh evidence.

## Local Network Access causal evidence

The auth-only probe on candidate `c296297bc6a3ac79e99b47e75274684c17da286d`, build `Lj4cseoIXmldPNwpBuEcd`, captured Edge's actual reason: the custom-token fetch was blocked because permission to access the loopback address space was denied. OTP request/verification still returned202/200, and no session POST occurred. This diagnostic remains FAIL, preserved as `authenticated-browser/c296-network-diagnostic.json`.

Installed Playwright's implementation supports `context.grantPermissions(["local-network-access"], { origin })`. The fixture grants it only to the validated loopback application origin in its two temporary authenticated contexts. External requests remain blocked; the public suite receives neither this grant nor an adjusted CSP. No browser flag, global permission, production header or application policy is changed. Permission/CSP/provider acceptance for real public users remains outside this local fixture; only actual completed journeys can pass its bounded functional gate.

## Responsive candidate public acceptance

The public suite on clean c296297/build Lj4cseoIXmldPNwpBuEcd passed **39/39**, including all24 layouts, functional/keyboard/error/continuation checks, six unchanged controlled lab samples and the warm unauthenticated API budget. Its original production CSP and ungranted public contexts remained intact. The independent reviewer read the persistent report and inspected portrait/landscape screenshots. Raw evidence is `public-browser/c296-public-pass.json`.

Onboarding now selected `w=640` at the same rendered358.797px width. Its encoded body was24062bytes versus67238bytes in the old attribution, with actual image LCP1244/1296/1216ms. CLS remained0.0243870 and controlled next-screen times were37.1/39.6/25.7ms. Sign-in LCP1092/1112/1244ms and unauthenticated API p9512.72ms also met their original budgets. These remain controlled desktop-browser samples, not physical-device or field performance acceptance.

The authenticated run progressed through actual local custom-token/lookup/refresh requests and session creation, allHTTP200, and rendered the protected legal-acceptance page. It then failed when Playwright's separate APIRequest transport returned401 for an authenticated read. Installed Playwright source confirms its secure-cookie exception recognizes localhost names but excludes127.0.0.1; the browser's protected page had already passed `requireSession()`. That APIRequest failure remains preserved as `c296-after-permission.json`.

Session/CSRF-dependent HTTP assertions now use actual same-origin browser `fetch` and native `FormData`, allowing the browser to handle its own HttpOnly/Secure cookies and Origin. The fixture injects no Cookie/Authorization header and changes no cookie policy. It returns actual HTTP status/JSON to the unchanged assertions and records one read-only APIRequest/browser comparison without cookie values. Direct emulator account seeding remains a separate Node request using synthetic local test credentials. All authenticated status, consent403/code/no-side-effect, role and logout401 outcomes remain required.

The next actual c296 run confirmed the comparison: APIRequest401 versus browser fetch200. Its complete first phase passed, including real UI OTP exchange/session, protected consent continuation, valid pre-consent multipart403 with the required code/no circle side effect, and acceptance continuation to creation. Phase2 stopped before submission because an unscoped name selector matched both the head description meta and the form textarea. The fixture now scopes fields to the unique form containing the real Create Gift Circle button; all payload and status/state assertions remain. That failure is retained as `c296-browser-cookie-pass-draft-failure.json`.

The role phase also requires the exact existing web contracts: member invitation POST400 and GET403, unchanged owner invitation count, and no member invitation-manager control. It cannot pass on an unrelated401/429/500 response. No product status contract is changed.

The next run passed phases1–2, including actual Starter draft creation, pending-payment state, reload persistence and screenshot. Phase3 stopped before any trial request because its immediate post-navigation form count was zero. The account section and layout load asynchronously through session/profile/notification queries; the source has no trial-eligibility gate replacing the Gift form. The fixture now records the create URL/type and initial count, awaits that unique real form's visibility within30s, then still requires count1 and the correct radio/submission/state results. There is no arbitrary sleep or test retry. The prior failure is retained as `c296-draft-pass-trial-failure.json`.

With bounded form readiness, actual phases1–3 passed, including eligible Trial publication and invitation creation. The member phase stopped before its OTP request: the helper clicked Register→Sign in and immediately filled an Email field common to both pages, allowing it to target the departing form. The fixture now explicitly awaits the Sign-in URL with the unchanged invitation continuation and its unique Continue control before filling. This is navigation readiness, not an OTP-request retry or outcome waiver. The failure is retained as `c296-trial-pass-member-failure.json`; diagnostics record only whether the sign-in email field is nonempty, never its value or entered OTP.

After navigation readiness was fixed, the member's OTP request/verification returned202/200, but its redirected document still enforced the original CSP. A no-token targeted probe confirmed Playwright intercepted the invitation307 only: the final Register200 lacked the local Auth addition. A direct reload of the already verified Sign-in URL produced an intercepted200 with the exact permitted Auth origin and no additional CSP errors. Evidence is `redirect-csp-probe-c296.json`; installed Playwright routing documentation also specifies first-URL-only redirect interception.

The invitation branch therefore performs one explicit pre-OTP Sign-in document refresh solely to apply the existing local CSP fixture. It requires the correct Sign-in URL/continuation and visible control before refresh, HTTP200 with the exact Auth origin in `connect-src` afterward, and unchanged URL/continuation afterward. No email has been entered or OTP requested at this point, so no request is caught/retried. The real invitation→Register→Sign-in navigation remains exercised, and production CSP, external blocking and authentication assertions remain unchanged.
