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
