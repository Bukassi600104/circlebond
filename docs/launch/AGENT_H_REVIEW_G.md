# Independent Ponytail review — API foundation

What this change does: Commit `28a7b621ecfd9ed8198b36cd51342f6f283a620d` hardens the existing versioned API and persists device registrations before reporting success. It fixes private-response caching, error disclosure, numeric validation, hidden totals and the shared OTP attempt budget while documenting actual endpoint coverage.

Reviewer: Agent H, who did not author G's implementation. Mechanism: the installed `ponytail-review` skill, Ponytail plugin 5.3.3.

## Current decision — PENDING REVIEW

No additional G-owned defect was found in the bounded handler/repository diff. Independently executed `node --test tests/unit/mobile-api-v1.test.mjs` in the G/E worktree: **17 tests passed, zero failures/skips**. These execute actual route and repository modules with controlled authentication, persistence and provider boundaries.

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

## Acceptance boundaries

The API remains a documented foundation with six implemented path families. Native creation/invitations/contributions/receipt/notification/lifecycle parity is explicitly unfinished; no native binary or push-delivery readiness is claimed. This separate future-native track must not delay web release by itself. Shared authentication, account privacy and backend defects do affect web release.

Verdict: fix shared finding 1 and complete combined connector/auth regression before acceptance.

Not checked: real push delivery, physical devices, approved staging auth/provider operations, production migration, final full CI and complete native mutation coverage.
