# BondCircle API and native readiness

Assessment: 29 October2026; reconciled30 October2026. Implementation owner: Agent G. Code acceptance: **PENDING REVIEW**. Native client delivery is a separate track and does not block web release by itself.

## Verified source defects and corrections

- The push-token route returned success after logging, without persisting a token. It now awaits a server-only Data Connect upsert before acknowledging success; failures return a generic error. The additive `DeviceRegistration` table has one row per token hash, verified owner, FCM token, platform and update time. Registration reassigns shared-device ownership to the currently authenticated account. Removal is owner-scoped and supports one token or all of the caller's tokens. Neither logs nor responses include the token.
- Device mutations now use the same native authentication resolver as circle/profile reads, return suspension denial, require cookie CSRF through the verified principal, validate JSON/token/platform types and use a durable per-user request budget. An unverified Authorization header is not treated as authentication.
- Native routes returned raw exception messages and some logged exception objects. Unexpected failures now return fixed messages; logs use fixed event names. Private JSON responses use `Cache-Control: no-store` and predictable error codes. The separately owned OTP-request route must retain the shared production-mode security fix during integration.
- `/me` previously converted a Data Connect lookup failure into a synthetic active profile because the repository returned null on errors. It now propagates persistence failures to the generic error handler. A genuinely missing row can still bootstrap verified identity with null legal timestamps; that is not proof of accepted registration terms.
- Circle pagination previously accepted strings such as `2abc`, fractions and unsafe integers through `parseInt`. It now validates complete safe integers. Existing page size and sort order remain unchanged.
- Native OTP verification passed zero cookie attempts on every request. An IP-scoped limiter could be bypassed by changing addresses. Verification now also consumes a shared per-challenge five-attempt budget for the OTP lifetime, keyed only by the challenge fingerprint. The same key is coordinated with the web verifier so cookie replay or switching endpoints cannot reset the budget.
- Hidden Support totals were converted from null to zero in native summaries. Both list and detail now preserve null, retaining the repository's privacy decision and avoiding a false zero balance.
- The OpenAPI production host was `bondcircle.app`, and its staging host was not established by the project. The contract now uses `https://www.bondcircles.com`, retains the local Android emulator example and makes no invented staging claim. The already implemented detail route is documented. Existing named response/request models are retained for client generation.

## Contract and coverage

| Capability                                           | Current source contract                                                          | Acceptance                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Profile bootstrap/preferences read                   | `GET /api/v1/me`                                                                 | PENDING REVIEW; route behavior tested with controlled dependencies                                   |
| Email OTP request/exchange                           | `POST /api/v1/auth/email-otp/request`, `POST /api/v1/auth/email-otp/verify`      | PENDING REVIEW; real delivery remains BLOCKED until provider tests                                   |
| Circle listing/detail                                | `GET /api/v1/circles`, `GET /api/v1/circles/{id}`                                | PENDING REVIEW; membership scope and redaction exercised                                             |
| Device token register/remove                         | `POST` and `DELETE /api/v1/devices/push-token`                                   | PENDING REVIEW; schema compile/database/provider delivery are separate gates                         |
| Native circle creation/activation/upgrade            | No v1 mutation implemented                                                       | NOT STARTED; existing web repositories remain authoritative                                          |
| Native invitation acceptance/management              | No v1 mutation implemented                                                       | NOT STARTED; existing web invitation rules must be reused                                            |
| Native contributions/receipt submission/review       | No v1 contract implemented                                                       | NOT STARTED; existing private upload/review path remains authoritative                               |
| Native notifications/preferences/lifecycle mutations | No v1 contract implemented                                                       | NOT STARTED; reuse existing rules when approved                                                      |
| Account export/privacy requests                      | Existing authenticated web export and persisted intake endpoints now implemented | Bounded F review PASS; actual deletion fulfillment/operator policy BLOCKED; no native parity claimed |
| Native binary/app-store readiness                    | No Android/iOS client built in this stabilization                                | NOT APPLICABLE to web release; physical native acceptance NOT STARTED                                |

The six implemented path families in `docs/openapi.yaml` are the supported v1 foundation. The contract deliberately does not advertise absent endpoints as complete parity. Offset pagination is deterministic for an unchanged membership dataset; clients should restart after membership changes.

## Authentication, errors and permissions

- Native clients obtain a Firebase ID token through the approved Firebase Authentication flow and send `Authorization: Bearer <ID token>`. The custom token from OTP verification must first be exchanged with Firebase; it is not an API bearer token.
- ID-token verification includes revocation checks and persisted account suspension checks. User IDs always come from the verified principal. A presented invalid bearer token must not fall back to a valid cookie session.
- Cookie callers retain same-origin/CSRF requirements for mutations. Do not weaken this boundary to make a cross-origin browser prototype work.
- Error status contracts: 400 validation/expired OTP; 401 missing or invalid credentials; 403 suspension/CSRF refusal; 404 absent or inaccessible resource; 409 consumed OTP; 429 throttled request; 500 generic service failure. Shared response codes are `INVALID_REQUEST`, `AUTHENTICATION_REQUIRED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `RATE_LIMITED`, `INTERNAL_ERROR` and `REQUEST_FAILED`. Unknown provider messages, tokens and credentials are never error payloads.
- Creator/co-admin/member authorization stays in existing repositories. Circle reads return only membership-scoped records; hidden totals remain null. Native views must not treat organizer approval as independently verified bank settlement.
- Legal acceptance is a server requirement. Shared create/join repositories and protected pages now enforce persisted consent; acceptance/bootstrap routes remain accessible. Session recreation preserves recorded consent and display name. Strict consent, verified contact and claim-preservation regressions pass. No v1 creation endpoint bypasses these rules.

## Data and file strategy

Firebase Auth identifies the user; Data Connect is the authoritative relational store; Firebase Storage holds validated files. Money, catalogue versions, once-per-account trial use, activation history, entitlements, membership and receipt permissions remain server-controlled. Do not copy them into a native client or AppDeploy backend.

Before enabling token persistence in a deployed environment, review the additive schema/connector change, create the required production backup, compile the combined schema and verify a staging registration/read/remove/reassignment flow. No production schema deployment or migration was executed by Agent G. The new operations are `NO_ACCESS` to direct client SDK callers and are invoked only after server authentication. Generated SDK artifacts need coordinated regeneration only if clients use the new operations; this server calls the reviewed operation names directly.

Private receipt upload must continue through authenticated server validation, image decoding/re-encoding, limits and role checks. Retrieval uses short-lived viewer-bound authorization and no-store responses. Do not expose direct public receipt objects or cache them for offline use. Staging upload/replace/delete acceptance remains blocked by unavailable approved staging resources.

## Push, lifecycle and deep-link handoff

Token persistence alone is not push delivery. Before enabling delivery, configure approved FCM/APNs credentials, implement invalid-token cleanup, test rotation and shared-device reassignment, respect notification preferences and verify cross-user privacy on real devices. Wire `removeDeviceTokens(userId)` into the parent-owned account-deletion workflow before acceptance; exports should disclose device-registration metadata without exposing raw delivery credentials. Individual logout should remove the current device token when a future native client can supply it.

Use canonical HTTPS invitation URLs with browser fallback. A future native app needs approved Android package/iOS bundle IDs, signing identities, verified App Links/Universal Links associations, allowlisted post-authentication destinations, and secure refresh-token storage. Do not log invitation tokens or put push tokens in query strings. Test cold launch, existing session, new registration, app switching, revoked/expired links and installed/browser fallback.

React Native with Expo is a candidate for a later native client. That decision requires a separate build/signing/store/device plan; this work creates no native app and makes no APK/IPA claim. See `APPDEPLOY_FEASIBILITY_AND_NATIVE_HANDOFF.md` for the separate hosting assessment.

## Evidence and remaining gates

Final focused route/repository run: `node --test tests/unit/mobile-api-v1.test.mjs` — **17 tests PASS, zero failures**, including the shared challenge-budget regression. Tests transpile actual route/repository source and control external dependencies; they do not establish real Firebase, email, push-provider or device acceptance.

`mobile-auth-foundation.test.mjs` now executes six runtime checks. The initial isolated branch had five PASS/one FAIL against the old CSRF helper; after F integration and real verified-contact fixtures, all six pass. The original unsafe source assertions were not restored.

Local schema and all connector operations, including metadata-only device lookup, compiled with the cached native Data Connect toolkit (`dataconnect-emulator-3.4.16.exe --logtostderr build --config_dir=<worktree>/dataconnect`). Process exit was zero and parsed output `.errors` was null. No `--project_id`, deployed sources, credentials, schema migration or SDK generation was used. This is compiler evidence, not database persistence acceptance.

A device persistence/reassignment/owner-only deletion E2E scenario was added to the existing circle-engine suite, which the default runner already executes. It requires a loopback emulator host before any writes. It has not been run in G's checkout; the parent must run the combined emulator suite after schema integration. Additional memory-heavy local databases were avoided while payment and final CI checks shared this host.

The first scoped ESLint attempt was blocked by a missing file in A's still-running dependency install. A second check using the existing desktop config found one test variable violating Next's `no-assign-module-variable`; the variable was renamed. The final scoped ESLint check using the existing desktop config **PASS** with zero warnings/errors across all v1 routes, the two changed repositories, runtime test harness, two native unit files and circle-engine E2E file.

Initial partial-install typecheck was BLOCKED; after integration, G reran scoped ESLint and `tsc --noEmit --incremental false` successfully. G correction commit d593394 (integrated e3791dd) also passed43 focused API/auth/OTP/contract checks. The final updated-lock whole-application CI remains pending. No dependency or lockfile was changed by G.

Required before API acceptance: final focused tests, integrated lint/type/build, combined Data Connect compilation and isolated DB tests, account lifecycle cleanup, independent Ponytail review and staging/provider checks. Do not classify API/native readiness PASS based only on these unit tests.

## Reviewed contract correction — 30 October2026

H's first review correctly rejected missing lifecycle enum values and inaccurate OTP expiry/202 schemas. The correction preserves all nine backend lifecycle states in list/detail/OpenAPI, documents Unix-millisecond integer expiry and message-only throttled202, and applies private API response handling to the request route. Both verifiers reserve valid proof before account mutation/token issuance; consumed proof returns409 with zero Auth/profile access. Stable IP and shared address/challenge budgets, strict purpose/consent, merged custom claims and existing-mailbox verification are covered by actual-source tests. Parent's integrated24 OTP/auth/contract checks pass; final independent/integrated evidence remains in the central test/review records.

Supported native foundation remains the six documented path families, not complete web parity. Missing native mutations are a separate future delivery track. Token persistence is not push delivery; requests do not claim notification capability before provider/device acceptance.
