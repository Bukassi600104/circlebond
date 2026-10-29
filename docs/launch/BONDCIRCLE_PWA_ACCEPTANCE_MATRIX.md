# BondCircle PWA acceptance matrix

Session date: 29 October 2026 (Africa/Lagos). Agent E. The current deliverable is an installable web application; it is not a native Android or iOS binary.

## Implemented changes and evidence

- Parent offline-worker change `dd24cab` independently reviewed with the installed Ponytail review skill: bounded **PASS**. See [independent review](AGENT_E_REVIEW_PWA.md).
- Installation suggestions tolerate blocked local storage, recognize iPads using desktop-style identification, handle consumed/rejected install events and wait for a new browser event before retrying. A dismissed or accepted prompt no longer leaves an unusable banner.
- An installed-session event cancels delayed iOS help. Registration bypasses HTTP caching of the worker script, without forcing a page reload that could discard a form.
- Safari guidance includes Home Screen installation and the optional Open as Web App setting. Installation suggestions wait until invitation, onboarding and authentication entry flows finish; the service worker still registers during those flows.
- The suggestion is a nonmodal labelled region. Dismiss and Install controls have 44-pixel minimum targets in the existing styles. Existing brand assets, manifest start URL, safe-area layout and navigation remain unchanged. A later accessibility correction changes the manifest orientation to `any`; see the follow-up below.
- Nine new tests execute the actual installation component with controlled React hooks and browser APIs; six execute the actual worker; five existing source contracts remain. Final focused run: **20 tests passed, zero failed**.
- Targeted ESLint passed using the existing desktop checkout's complete configuration/dependencies. The first attempt loaded the unfinished isolated dependency installation and failed on missing `es-abstract/2024/IsArray`; that was a tooling failure, not a passing lint result. No dependency was added or replaced.
- Formatting and `git diff --check` passed. Full integrated TypeScript/build/browser journeys remain parent release gates. Agent E's implementation is **PENDING REVIEW** by a non-author.

The old source test's contiguous `navigator.serviceWorker.register` assertion was made whitespace-tolerant after Prettier split that expression across lines. It was renamed to describe source metadata accurately. Actual registration path/options are additionally asserted by the component runtime test; the production behavior was not changed to satisfy a regex.

## Acceptance matrix

| Requirement                                                                          | Evidence                                                                                                    | Status                        | Remaining acceptance                                                         |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| Manifest declares standalone display, root scope/start and permits both orientations | Existing manifest/root layout inspected; source contracts pass                                              | PASS for metadata contract    | Device installation and orientation behavior are separate                    |
| Public icon files match declared 192/512 dimensions                                  | Actual PNG header dimensions checked, including maskable 512 px                                             | PASS for dimensions           | Physical icon rendering and splash appearance                                |
| Restricted-storage recovery                                                          | Actual component test blocks storage reads/writes; instructions and dismissal still work                    | PASS for module behavior      | Browser/device privacy modes                                                 |
| Desktop-style iPad identification                                                    | Actual component test uses MacIntel plus touch points                                                       | PASS for module behavior      | Physical iPad Safari                                                         |
| Safari installation copy                                                             | Current Apple guidance checked; component renders Share/Home Screen/web-app instructions                    | PASS for copy/module behavior | Real iPhone Safari install                                                   |
| Android install-event handling                                                       | Actual component tests accept, dismiss, reject and retry with a new event                                   | PASS for module behavior      | Chrome's real install UI and standalone launch                               |
| Installed-session suggestion suppression                                             | Actual component test checks standalone mode and delayed-help cancellation                                  | PASS for module behavior      | Physical launch and app switching                                            |
| Invitation/authentication entry friction                                             | Component test keeps promotion hidden on invitation/sign-in and shows it after account navigation           | PASS for module behavior      | WhatsApp-to-join and installed-app links on devices                          |
| Actual service-worker install                                                        | Desktop Chromium, loopback fixture using actual worker/manifest/icons                                       | PASS for browser fixture      | Final Next.js candidate and production headers                               |
| Private cache boundary                                                               | Actual Chromium fixture navigates a synthetic private page and fetches an API; neither enters Cache Storage | PASS for browser fixture      | Integrated authenticated application                                         |
| Offline document fallback                                                            | Actual Chromium network loss shows generic fallback at original route; no private content replayed          | PASS for browser fixture      | Real devices and interrupted journeys                                        |
| API failure remains failure                                                          | Actual Chromium offline API fetch rejects; no successful fallback document                                  | PASS for browser fixture      | Integrated upload/payment failure journeys                                   |
| Retry after reconnect                                                                | Actual Chromium Retry reloads original URL after network restoration                                        | PASS for browser fixture      | Device app switching/recovery                                                |
| Worker update and stale-cache cleanup                                                | Synthetic next revision of actual worker activates; own v1/v2 removed, unrelated cache retained             | PASS for browser fixture      | Final deployed version update on returning devices                           |
| Offline fallback responsive layout                                                   | Actual Chromium at 390 px: document width 390, viewport 390                                                 | PASS for viewport fixture     | Physical phone safe areas and assistive technology                           |
| Safe-area and bottom-navigation source contracts                                     | Existing CSS/source tests pass                                                                              | PENDING REVIEW                | Integrated mobile layout/device check                                        |
| Unsent form state on request failure                                                 | Gift creation and receipt submission catch failures without resetting form fields or closing receipt upload | PENDING REVIEW                | Integrated fault-injection/slow-network browser test                         |
| Process termination or page-reload form recovery                                     | Sensitive unsent bank, beneficiary and receipt data is not persisted to public worker/local-storage caches  | BLOCKED                       | Device interruption test; do not promise recovery of unsaved sensitive files |
| Standalone authentication persistence and session expiration                         | Worker never caches auth responses; registration leaves session implementation intact                       | BLOCKED                       | Approved test identity, integrated candidate and devices                     |
| Real uploads, image picking and external-auth return                                 | No live provider operations performed                                                                       | BLOCKED                       | Staging Storage/auth access and physical devices                             |
| iPhone Safari, Add to Home Screen, installed PWA                                     | No physical device available                                                                                | BLOCKED                       | Owner/device execution and recorded results                                  |
| Android Chrome, install and installed PWA                                            | No physical device available                                                                                | BLOCKED                       | Owner/device execution and recorded results                                  |
| iPad/tablet Safari and rotation                                                      | Only identification/source checks, no physical tablet                                                       | BLOCKED                       | Tablet execution                                                             |
| VoiceOver/TalkBack                                                                   | No assistive-technology device execution                                                                    | BLOCKED                       | Actual screen-reader acceptance                                              |
| Final integrated PWA release                                                         | Module and browser-fixture evidence is insufficient alone                                                   | PENDING REVIEW                | Full CI, independent review, final candidate and device/provider gates       |

## Browser fixture details

Bundled Playwright used an existing installed Chromium-family browser; no browser download or paid service was started. A loopback-only server served the actual worker, manifest and public assets, plus explicitly synthetic private page/API markers. No Firebase identity or customer record was used.

The cached paths were exactly `/manifest.webmanifest`, `/brand/icon-192.png`, `/brand/icon-512.png`, `/brand/icon-maskable-512.png`, and `/offline.html`. After the synthetic next-worker activation, only the new BondCircle cache and an unrelated fixture cache remained. The harness awaited completed activation; an earlier installation-phase observation was not counted as a product failure.

Reproduction artifact: `tmp/pwa-browser-check.cjs` in Agent E's worktree. [Actual offline screenshot at 390 px](evidence/pwa-offline-390.png). This screenshot and the simulated viewport do not establish physical iPhone or Android acceptance.

The service worker deliberately provides a limited offline screen, not offline access to circles, receipts or contributions. It does not queue/replay financial actions, cache private records, confirm failed submissions, or persist invitation tokens. Existing failed form submissions retain their current in-memory/DOM input; full process termination recovery is not claimed.

## Device acceptance procedure

After the exact integrated candidate passes CI and approved staging is available, record browser/OS version, device, release commit and result for each step:

1. Open a WhatsApp invitation; authenticate/register, accept legal terms and join the intended circle without installation promotion interrupting the entry flow.
2. In iPhone Safari, use Share → Add to Home Screen, with Open as Web App enabled when offered. In Android Chrome, use the browser install flow. Confirm correct name/icon and standalone launch.
3. Relaunch, app-switch and return from Google/phone/email authentication. Confirm session restoration/expiration and invitation navigation.
4. Choose/upload a permitted image, disconnect during submission, verify a truthful failure and retained current form, reconnect and check server status before retrying.
5. Go offline during navigation; verify the generic fallback and Retry. Confirm another account cannot obtain cached private content.
6. Install a newer approved staging version; verify fresh public assets, no forced loss of the open form and expected standalone behavior, orientation, safe areas and bottom navigation.

No step above is marked PASS without actual execution.

## Primary references

- [Apple: turn a website into an app in Safari on iPad](https://support.apple.com/en-gb/guide/ipad/ipad8f1f7a29/ipados) explains Home Screen installation and the web-app option. Real Safari controls still need device verification.
- [Chrome team: custom installation experience](https://web.dev/articles/customize-install) documents consuming each deferred prompt once, observing installation and waiting for a new event after dismissal.

PWA IPHONE: **BLOCKED**. PWA ANDROID: **BLOCKED**. Engineering implementation: **PENDING REVIEW**. No production deployment or native application was created.

## 30 October follow-up: orientation and image request recovery

Independent QA identified the unnecessary portrait restriction and the conflict between 5 MB permitted image inputs and Vercel's 4.5 MB total request-body cap. The manifest now permits `orientation: "any"`; the new manifest runtime assertion and focused PWA suite passed 21 tests. The actual worker/offline fixture also fits 844 × 390 landscape, with a usable Retry link. This is desktop simulation; installed-device rotation remains BLOCKED.

All five image-upload callers now share measured multipart preparation before any request. Original 5 MB inputs remain permitted; full-resolution preparation preserves fields, alpha and orientation and fails without clearing selections when the aggregate cannot fit safely. Nine actual-browser transport tests passed. See [transport evidence and explicit remaining contract gap](AGENT_E_UPLOAD_TRANSPORT_EVIDENCE.md). Device/provider upload acceptance and the universal maximum-size multi-image contract remain open; no blanket PWA PASS is granted.
