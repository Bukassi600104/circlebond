# Independent browser acceptance evidence

All runs described here use synthetic loopback data and desktop Edge controlled through Playwright. Simulated phone/tablet viewports are not physical-device acceptance. Provider, Storage, physical iPhone/Android and real Safari acceptance remain **BLOCKED**.

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
