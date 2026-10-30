# Independent payment UUID binding review

Date: 30 October 2026. Reviewer: Agent H, applying the installed Ponytail review skill as a non-author. Reviewed commit: `42334ffb0353170090f3183584b5139c681b1778`.

**Decision: PASS for this bounded correction.** Payment-provider configuration, genuine sandbox delivery, refund/reconciliation operations and production payment acceptance remain **BLOCKED**. This review authorizes no charge or deployment.

## Source review

Inspected the exact provider and webhook diff, complete `server/pricing/paystack.ts`, `server/pricing/settlement.ts`, `app/api/payments/paystack/webhook/route.ts`, and both changed unit suites.

- Canonical dashed and compact hexadecimal database UUIDs represent the same activation/circle identity. Normalization applies only to validated UUID identities; arbitrary strings, extra separators, incomplete identifiers and trailing data are rejected.
- The verified provider transaction must still return the **exact persisted `providerReference`**, including its original spelling. An equivalent normalized identifier cannot substitute a newly constructed reference. The embedded UUID must also match the persisted activation identity.
- Metadata binds activation and circle UUID identities; creator identity, integer amount, NGN currency and test-domain checks remain mandatory. Checkout rejects invalid activation/circle identifiers before network access.
- A signed success notification yields only a validated activation identifier. Settlement loads its stored attempt and verifies that attempt's stored provider reference server-side. The notification cannot manufacture a successful transaction.
- Existing settlement state guards and database completion calls remain unchanged. Previously completed attempts are idempotent; failed, pending, abandoned, reversed and concurrently completed cases retain their tested behavior. Production/live-key restrictions and raw-byte signature validation are unchanged.

No must-fix finding remains in this patch.

## Independently executed evidence

Ran in the clean CI worktree at the exact reviewed commit, using its completed updated-lock dependency installation:

```text
node --test --test-reporter=tap tests/unit/paystack.test.mjs tests/unit/payment-settlement.test.mjs
24 tests: 24 PASS, 0 FAIL, 0 skipped; exit 0.
```

Also imported the actual provider module in an independent in-memory assertion matrix: 256 combinations of dashed/compact/case-varied activation and circle UUID identities were accepted; 18 malformed identifiers or exact persisted-reference violations were rejected. This is supplementary assertion evidence, not 274 additional test-suite cases. No provider network call was made.

The focused suites exercise actual provider/settlement/webhook modules with controlled provider/repository dependencies. They do not replace the integrated database suite, final exact-candidate CI, a real approved Paystack sandbox, operational reconciliation, or browser acceptance. Those gates must keep their separate evidence and classifications.
