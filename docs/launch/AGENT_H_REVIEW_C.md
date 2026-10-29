# Independent Ponytail review — payment integration

What this change does: Commit `89e66c423264e67800f8ebdf1893b590fc102588` adds an explicitly isolated Paystack test adapter, signed webhook verification and database-guarded activation/upgrade settlement. Production payment configuration remains disabled.

Reviewer: Agent H, who did not author the implementation. Mechanism: the installed `ponytail-review` skill, Ponytail plugin 5.3.3. This is an independent code review using that skill, not an external approval service.

## Initial decision — FAIL

### Must fix

1. **Creator activation, upgrade and verification controls omit CSRF** (`components/pricing/CircleActivationPanel.tsx`, `components/pricing/CircleUpgradePanel.tsx`, `components/pricing/VerifyActivationPayment.tsx`, and their mutation routes).
   - **What this is:** Creators start trial/paid activation, request an upgrade and ask the server to verify a payment after returning from checkout or an interrupted connection.
   - **Problem:** All three components send session-cookie POSTs without `X-CSRF-Token`, while the endpoints correctly require a matching token. Normal browser users are rejected before the intended action runs.
   - **Fix:** Reuse the existing `/api/auth/csrf` helper for all three controls, and test actual callbacks and request order, including failure to obtain a token.
   - **If we skip it:** The core creator actions and recovery control cannot work. The verification defect also leaves creators dependent on a webhook or operator after an uncertain checkout.

Parent notified; implementation correction and independent retest are pending. The first review identified verification; inspection by the parent expanded the same root cause to the other two panels. H's earlier assumption that they already obtained CSRF was incorrect and has been corrected here. No test or production behavior was weakened for this review.

## Correction and current bounded review — PASS

The parent, a separate implementation author, corrected all three controls in `5a9898e`. They reuse the existing exported `csrfToken` helper and send its value in the mutation header. Failed token acquisition prevents the action POST. H inspected the correction, helper and actual callback tests and independently ran:

- `node --test tests/unit/pricing-csrf.test.mjs`: **6 passed, zero failures/skips**.
- The payment/catalogue/settlement command below after the correction: **28 passed, zero failures/skips**.

Finding 1 is closed for this bounded code review. No additional actionable defect was found in the inspected C-owned implementation. This is not payment-system, production-provider, database-migration or overall launch acceptance; the exact integrated database/full-CI gates and the external limits below remain open.

## Checked evidence

- Independently reran `node --test tests/unit/paystack.test.mjs tests/unit/payment-settlement.test.mjs tests/unit/model-specific-pricing.test.mjs`: **28 tests passed, zero failures/skips**.
- Read all changed server/provider/settlement/webhook/checkout code, both payment panels, their caller routes, the approved mode-specific pricing addendum, the repository functions, additive schema, transaction guards and test fixtures.
- Traced exact NGN minor-unit, provider-reference, activation, creator and circle binding; test-domain/key restrictions; raw-body signatures; hosted URL validation; pending/abandoned/failure behavior; historical upgrade credit; durable checkout locks; conditional settlement; replay and stale-plan protection.
- Checked the upstream [transaction API](https://paystack.com/docs/api/transaction/), [metadata examples](https://paystack.com/docs/payments/metadata/), [transaction statuses](https://paystack.com/docs/payments/verify-payments/) and [webhook signature requirements](https://paystack.com/docs/payments/webhooks/). The metadata guide supports the object-shaped examples used here; no metadata-format defect is claimed from the API table alone.
- The author reports four selected real emulator tests and local compiler/type/lint checks. H has not yet independently rerun those database tests; the combined exact-commit emulator gate remains required.

## Acceptance limits

No real provider checkout, webhook delivery, refund or financial charge was performed. Provider selection, sandbox access, business/refund/reconciliation approval, alert routing, production credentials and live enablement remain BLOCKED. An uncertain initialization intentionally retains its lock/reference; operator reconciliation is required when the checkout URL cannot be recovered. Refund/dispute events currently create an operational signal, not an automatic refund or entitlement change.

Expected load: concurrent organizers, webhooks and creator retries sharing the same backend. Source transaction guards and module tests are evidence for this boundary; final combined database/concurrency tests and integrated CI are still required.

Verdict: Ship this bounded correction after the integrated database and CI gates.

Not checked: actual provider integration, production migration, full integrated CI, physical devices and operator recovery rehearsal.
