# BondCircle payment integration

Evidence date: 29 October 2026 (Africa/Lagos). Baseline: `c0b1f91`.
Engineering: bounded H independent review PASS after creator-control CSRF correction; final integrated CI PENDING REVIEW. Live provider acceptance: BLOCKED.

## Current evidence and boundary

The baseline provider returned `null`; paid drafts could not activate. The approved
mode-specific catalogue in `docs/MODEL_SPECIFIC_PRICING.md` supersedes historical
universal prices. No prices, trial allowances or grandfathered entitlements change.

A Paystack **test-only** adapter now supports hosted checkout, signed raw-body
HMAC-SHA512 notifications and authenticated server verification. It uses the
activation UUID as the deterministic provider reference and binds verification to
the stored exact NGN minor-unit amount, creator, circle, reference and test domain.
Browser return URLs do not activate circles. Contributors' receipt evidence is
unrelated to the platform activation payment.

The adapter requires explicit `ACTIVATION_PAYMENT_PROVIDER=paystack_test`, an
`sk_test_` server secret and either local loopback Auth/Data Connect emulators or
an explicitly matched staging Firebase project. It rejects the production
`bond-circle` project, Vercel production and live keys. Production remains closed
until the owner approves the provider and a separately reviewed live configuration.
No provider account or payment credentials were configured during this work.

## Persistence and failure handling

The additive `CirclePaymentCheckout` table has one primary key per circle. The
attempt and lock are committed before contacting Paystack. Concurrent checkout
starts cannot create competing payable attempts; successful retries reuse the
stored checkout URL. A network timeout preserves the attempt and reference instead
of creating a second charge. If the provider accepted initialization but its URL
was lost before persistence, verify that reference; if it remains unresolvable,
an operator must reconcile it before permitting another attempt. No automatic
blind retry or invented success is used.

Settlement removes the matching checkout lock and applies guarded updates in one
database transaction. Repeated/concurrent settlement cannot publish twice. A paid
activation cannot reopen a closed circle or activate a changed draft plan. Upgrades
require the preceding successful plan, matching target and increasing member
capacity. An old payment cannot downgrade a newer plan. Starting or failing an
upgrade preserves the active plan. Verified failed attempts release the
checkout lock. Abandoned checkouts retain the original checkout and reference;
abandonment does not establish terminal failure. Pending/processing/unknown
states never activate a circle.

Refund/dispute notifications create an operational reconciliation signal.
Reversed transactions require reconciliation and never silently downgrade a
circle. Issuing refunds, financial reconciliation policy, alert routing and live
provider sign-off remain owner/provider gates. No refund endpoint is enabled.

Creators can supply a checkout email when they registered by phone. Account email
is preferred when available; an email is not fabricated. The verification control
calls the protected server verification endpoint and refreshes only after verified
success. Test checkout availability does not represent a production payment launch.

## API and rollout

- `POST /api/circles/{circleId}/activation`: creator checkout, session CSRF/origin
  controls or the existing verified native principal boundary.
- `POST /api/circles/{circleId}/upgrade`: creator-only same-mode upgrade.
- `POST /api/circles/{circleId}/activation/verify`: creator-only provider verification.
- `POST /api/payments/paystack/webhook`: bounded raw body, constant-time signature
  comparison, then independent provider transaction verification.

The new schema and connector must be reviewed, backed up and deployed **before**
enabling the test adapter against an isolated staging project. No production
migration, SDK deployment, charge, refund or public deployment was performed.
Only server `NO_ACCESS` operations read checkout records; checkout URLs must not
be logged or included in telemetry. Unknown pricing failures now return the
route's public fallback text instead of internal exception messages.

## Verification

| Check                                       | Current result                                                                                                                                             |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paystack boundary tests                     | PASS: 8 tests for raw signatures, exact binding, test-only configuration, hosted URLs, safe errors and provider states                                     |
| Actual settlement/webhook runtime tests     | PASS: 11 tests for non-success/abandoned states, replay/concurrency handling, target pricing, forged/oversized requests and durable reconciliation signals |
| Existing model-specific pricing tests       | PASS: 9 tests for catalogue, allowances, trials, historical credit and grandfathering; combined unit/runtime total 28/28                                   |
| Data Connect local schema/operation compile | PASS: cached toolkit 3.4.16, JSON errors null; no deployed-source lookup or SDK regeneration                                                               |
| Emulator transaction regression             | PASS: 4 selected tests; three payment scenarios plus the existing partial-payment receipt test                                                             |
| Type checking                               | PASS: tsc --noEmit, including payment routes/components                                                                                                    |
| Scoped lint and formatting                  | PASS: scoped lint/format; final changed-test checks before commit                                                                                          |
| Integrated clean install/full build/full CI | PENDING REVIEW: parent integration gate                                                                                                                    |
| Independent Ponytail review                 | PASS for bounded adapter/settlement/control changes; H28+6 regressions, AGENT_H_REVIEW_C.md; final integrated acceptance pending                           |
| Real Paystack test checkout/webhook/refund  | BLOCKED: approved sandbox account, test credentials and publicly reachable staging webhook unavailable                                                     |
| Live financial transactions                 | BLOCKED: explicit provider/policy/production approval required                                                                                             |

Commands/evidence:

- `node --test tests/unit/paystack.test.mjs tests/unit/payment-settlement.test.mjs tests/unit/model-specific-pricing.test.mjs`: 28 pass, zero failures/skips.
- Cached Data Connect toolkit `build --config_dir=<worktree>/dataconnect`: no errors.
  Passing `--project_id` asks the toolkit to fetch deployed sources and required
  unavailable ADC; it was removed for the local-only check. A zero process exit
  alone was never treated as validation; the JSON error list was checked.
- With `DATA_CONNECT_EMULATOR_HOST=127.0.0.1:9499`,
  `node --test --test-name-pattern=payment tests/e2e/circle-engine.test.mjs`:
  4 pass, zero failures.
- `node node_modules/typescript/bin/tsc --noEmit`: exit zero.
- Changed payment files checked with the installed ESLint/Prettier commands.

Unit tests mock Paystack HTTP and repository boundaries while executing the actual
settlement/webhook source through the shared TypeScript test loader. Emulator
tests use synthetic records and the real connector transactions. Neither is a
real provider payment. Independent review is recorded separately. The helper reuses Agent G's
shared `tests/helpers/typescript-module.mjs`.

The first CLI emulator attempt failed during `/emulator/configure`; no tests ran.
The isolated native toolkit server and local PGlite server were then started
separately and allowed to become ready. A real local PostgreSQL `SELECT 1`
succeeded before transaction testing. One test fixture initially used an invalid
partial bulk upsert; it was corrected to use the existing cancellation mutation,
retaining the assertion that a payment cannot reopen the circle. The final rerun
passed. No production database was used.

Raw local logs remain ignored under `tmp/payment-*`; this report is the durable
review record. Author checks reused the original checkout's installed dependencies
through an ignored junction after stopping a duplicate install. Agent A/parent
own clean-install and full integrated CI proof.

## Provider requirements verified from primary sources

- [Initialize and verify transactions](https://paystack.com/docs/api/transaction/):
  customer email, currency subunits and unique references; server verification.
- [Verify payments](https://paystack.com/docs/payments/verify-payments/): transaction
  states and avoiding repeated delivery of value.
- [Webhooks](https://paystack.com/docs/payments/webhooks/): raw-payload HMAC-SHA512
  signature, signed deliveries and retries when HTTP 200 is not returned.
- [API keys](https://paystack.com/docs/developer-tools/api-keys/): distinct test and
  live credentials; server secret keys must remain private.

These sources establish integration requirements, not approval of BondCircle's
business account, legal identity, payment service contract or refund policy.
