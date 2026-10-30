# Independent Ponytail review — API foundation

What this change does: Commit `28a7b621ecfd9ed8198b36cd51342f6f283a620d` hardens the existing versioned API and persists device registrations before reporting success. It fixes private-response caching, error disclosure, numeric validation, hidden totals and the shared OTP attempt budget while documenting actual endpoint coverage.

Reviewer: Agent H, who did not author G's implementation. Mechanism: the installed `ponytail-review` skill, Ponytail plugin 5.3.3.

## Current decision — PASS for bounded code/contract review

Resubmitted implementation `e3791dd417bb522cbaa2a25d89afd6ce87921f82`, the parent's shared authentication corrections and replay fix `7e5957d2fd89215a96dcca43cc96f70d94f9ff05` close findings1–4 below. H independently inspected the integrated application source at `0ea2f2a` and reran the actual-handler/native/authentication/OpenAPI/contact/replay/deadline tests alongside two corrected historical source assertions: **72 PASS, zero failures/skips**. Dependencies were reused from the existing older installed tree; this is not an updated-lock clean-install or final-CI result.

Verified-contact normalization rejects unverified identities and strips unverified email on phone identities. OTP registration preserves unrelated claims; existing unverified mailboxes become verified only after a valid consumed challenge; address/IP/challenge budgets are shared across web/native endpoints. Single-use consumption now precedes account mutation and token minting. Expiry and throttled202 schemas match actual responses, all backend lifecycle states are retained, and native OTP-request responses use the private JSON helper. No new must-fix source defect was found in this resubmission.

The two H test-only corrections preserve their original protection: the outage-copy assertion now expects the explicit new-code recovery instruction and still requires503; the plaintext invitation-token prohibition is scoped to the Invitation model, retaining its mandatory hash while allowing the unrelated persisted device token. Initial broader primary unit evidence was **263 PASS / 4 FAIL / 0 skipped** out of267: those two stale assertions and two missing native `_response` fixture aliases. The parent owns the latter fixture corrections. Full-suite acceptance remains PENDING REVIEW until the complete rerun passes.

Subsequent independent local database acceptance at `957d19af` (application source `566d05b`) compiled the combined schema and passed all17 synthetic connector tests, including device reassignment/owner-only removal, privacy intake and concurrent rate budgets. See `AGENT_H_DATABASE_ACCEPTANCE.md` for exact evidence and boundaries. Final updated-lock CI, staging/provider checks, account lifecycle fulfillment and physical/native delivery remain separate gates. This scoped decision is not API/native or public-launch acceptance. Risk: medium, concentrated in these external/integration gates.

## Initial decision — FAIL (superseded by the resubmission above)

Independently executed `node --test tests/unit/mobile-api-v1.test.mjs` in the G/E worktree: **17 tests passed, zero failures/skips**. These execute actual route and repository modules with controlled authentication, persistence and provider boundaries. A subsequent source-to-schema check found the contract defects below; the earlier no-finding note is superseded.

Checked all changed API handlers, the shared private JSON helper, persisted device ownership/upsert/removal operations, bootstrap repository error propagation, OpenAPI models and error contracts, named callers and the explicit native endpoint gap inventory. Token data is not returned in logs or API payloads. Support totals remain null after repository redaction. Database writes are awaited before acknowledgement.

The new token table/operations are additive and `NO_ACCESS` to direct client SDK callers. Real connector registration/reassignment/delete tests and the full combined schema build remain required on the exact integrated commit. A source/compiler claim from the author is not an independent database result.

## Shared authentication finding — FAIL until corrected

1. **Unverified email claims are treated as verified contacts** (`server/auth/index.ts`, `server/auth/native.ts`, `app/api/invitations/[token]/respond/route.ts`).
   - **What this is:** Both web and native APIs trust Firebase identity claims, and named invitations match the session email/phone against the intended recipient.
   - **Problem:** The shared resolvers do not inspect `email_verified` or require a bound phone. A local proof using the actual modules accepted a token with `email_verified:false` and no phone in session creation, session reading and both bearer resolvers. The invitation responder then passes that unverified email to contact matching. A Firebase deployment enabling Email/Password as documented can issue such identities without proof of mailbox ownership.
   - **Fix:** Enforce a shared verified-contact rule and ensure an unverified email cannot authorize a named invitation, including when a verified phone allows the session. Keep bootstrap/acceptance flows working for genuinely verified identities.
   - **If we skip it:** Possession of an invitation link plus an unverified address can defeat its named-contact boundary.

This predates G's diff but is connected security scope and was escalated to the parent. No production account was created or changed. The proof is an ignored local script, `tmp/h-contact-proof.mjs`, with explicit Firebase/DB stubs and synthetic values.

The parent added a shared verified-contact rule to the desktop integration source. H authored and independently executed `tests/unit/verified-contact.test.mjs`: **4 passed, zero failures/skips**. Actual session creation/restoration and both bearer resolvers now reject an unverified email without a phone; verified email/phone-only paths remain usable; an unverified email on a phone-authenticated identity cannot match a named email invitation; suspension remains enforced. Session profile persistence caller normalization and the exact integrated auth/API suite remain required. The correction is not yet a final release-commit acceptance.

F's header-only CSRF correction and the parent's atomic limiter are additional integration dependencies. G's obsolete source assertions were replaced with behavior tests rather than weakening authentication to satisfy old names. The exact integrated auth/API suite must pass before closing this review.

## Contract and request findings — must fix

2. **Normal circle states are outside the declared API enum** (`app/api/v1/circles/route.ts`, `app/api/v1/circles/[id]/route.ts`, `docs/openapi.yaml`).
   - **What this is:** The native list/detail routes expose the existing circle lifecycle.
   - **Problem:** They emit `PUBLISHED`, `TARGET_REACHED` and `FULFILMENT`, but their types and `CircleSummary.status` schema declare only five other states. A newly published circle can fail a strict generated client's response parser.
   - **Fix:** Preserve the actual backend states and document/type all emitted lifecycle values, with actual-handler response checks against the parsed schema.
   - **If we skip it:** Common legitimate circles break the advertised contract.

3. **OTP202 schema disagrees with issued and throttled responses** (`docs/openapi.yaml`, `app/api/v1/auth/email-otp/request/route.ts`).
   - **What this is:** Clients request a challenge and use its expiration when one is issued.
   - **Problem:** The handler emits integer Unix milliseconds, while the schema says string. It deliberately returns only a generic message when throttled, while the schema requires challenge ID and expiry on every202.
   - **Fix:** Document integer expiry and optional challenge fields with clear throttling semantics; never invent a delivered code or challenge to satisfy a schema.
   - **If we skip it:** Valid responses fail client parsing or encourage false delivery assumptions.

4. **Unknown OTP purposes are accepted** (`app/api/auth/email-otp/request/route.ts`, `app/api/v1/auth/email-otp/request/route.ts`).
   - **What this is:** The approved purposes are registration, sign-in and recovery.
   - **Problem:** The handler tests truthiness only, so an unsupported purpose produces a202 and calls delivery rather than rejecting malformed input.
   - **Fix:** Validate the complete allowed-purpose enum before challenge generation/delivery.
   - **If we skip it:** The public input contract is unenforced and malformed requests can trigger email work.

H added `tests/unit/openapi-contract.test.mjs` to the desktop integration source. Its first run reproduced **four failures** for lifecycle enum, expiry type, throttled response requirements and unsupported purpose, using actual handlers and controlled external dependencies. No actual email was sent. Corrections and independent retest are pending.

## Acceptance boundaries

The API remains a documented foundation with six implemented path families. Native creation/invitations/contributions/receipt/notification/lifecycle parity is explicitly unfinished; no native binary or push-delivery readiness is claimed. This separate future-native track must not delay web release by itself. Shared authentication, account privacy and backend defects do affect web release.

Original verdict: close findings1–4 and complete combined connector/auth regression before acceptance. Findings1–4 are now closed at bounded code/contract review; combined database and final release gates remain open.

Not checked: real push delivery, physical devices, approved staging auth/provider operations, production migration, final full CI and complete native mutation coverage.
