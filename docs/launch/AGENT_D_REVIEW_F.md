# Independent Ponytail review — security boundaries

What this change does: Commit `62e9f2c404808b9361fd7c5df262b3b09d7757d6` removes header-only CSRF trust, prevents production development OTP delivery/exposure, enforces minimum production signing-key lengths and sanitizes notification failure logs. It preserves verified Bearer clients and explicit local development behavior.

Reviewer: Agent D, who did not author these changes. Mechanism: installed `ponytail-review` skill, Ponytail plugin 5.3.3, applied to the diff, connected callers, implementations and test evidence. This is not an external approval service.

## Decision

**PASS** for this bounded implementation. No actionable defect found in the changed behavior. Overall security and public-launch acceptance remain open.

Independently ran `node --test tests/unit/security-boundaries-runtime.test.mjs tests/unit/security-hardening.test.mjs tests/unit/notifications.test.mjs`: **25 tests passed, zero failures**, exit 0. Thirteen new module-level tests exercise actual transpiled implementations with explicit dependencies; remaining source assertions are not provider or database acceptance.

Reviewed mutation callers across the web and v1 routes. Cookie callers still require origin and CSRF; only an already verified Bearer principal bypasses browser checks. Both OTP request routes gate development-code output by runtime independently of the sender. Production transport requires explicit production configuration, and the sender no longer logs email/code values. Signing-key guards measure UTF-8 bytes, preserve local defaults and reject an explicitly weak private key rather than silently falling back. Notification failures retain status/reason codes without raw provider messages.

## Boundaries and follow-up

- Parent must update the production-runtime Auth E2E fixture: its former `developmentCode` flow is incompatible with the security requirement. A local SMTP sink must also account for production email-domain validation; `.test` addresses are intentionally rejected in production.
- The separately confirmed legal-acceptance bypass, rate-limit race, missing account privacy workflows and legacy API error disclosure are outside this diff and remain assigned in the central ledger.
- Provider SMTP, Storage, cross-user persistence, physical devices, dependency audit, final integrated CI and exact-commit review have not passed through this bounded review.

Verdict: Ship this bounded change after integrated CI. No overall production-readiness approval is granted.

Not checked: real provider delivery, deployed secret configuration/entropy, physical devices or a complete historical secret scan.
