# BondCircle model-specific pricing and activation

## Commercial boundary

BondCircle charges a creator once to activate and publish one circle. Members,
contributors and invitees are never charged a BondCircle platform fee. The
application does not hold, pool, escrow or deduct a percentage from circle
contributions.

All monetary values are stored as integer NGN minor units. For example,
`150000` means ₦1,500.

## Approved catalogue

| Circle  |                               Trial | Starter / 10 | Standard / 30 | Premium / 100 |
| ------- | ----------------------------------: | -----------: | ------------: | ------------: |
| Gift    |         Once per creator, 3 members |       ₦1,500 |        ₦3,500 |        ₦7,500 |
| Aso-Ebi | Once per creator, 3 members, 1 tier |       ₦3,500 |        ₦7,500 |       ₦15,000 |
| Support |         Once per creator, 3 members |       ₦1,000 |        ₦2,500 |        ₦5,000 |

The exact catalogue, inclusions, exclusions and machine-readable entitlements
live in `lib/circle-pricing.ts`. Server authorization is centralized in
`server/pricing/entitlements.ts`; UI state is not an authorization boundary.

## Lifecycle

1. The creator chooses Gift, Aso-Ebi or Support.
2. The creator enters circle details and explicitly selects a plan.
3. The server stores a free draft with its versioned pricing-definition ID.
4. The creator may configure the draft and prepare invitations.
5. A one-time trial is claimed transactionally, or the creator starts secure
   paid activation.
6. Only a verified activation publishes the circle.

Paid drafts are never published when a provider is absent or a payment is
pending or failed. Contribution receipts cannot activate a circle.

## Trial enforcement

`CreatorTrialUsage` is keyed by creator identity. Claim and publish occur in a
single transaction. Deleting, cancelling or archiving the trial circle does
not remove the usage record. Concurrent claims fail closed.

## Historical prices and upgrades

Every activation stores the circle type, tier, exact plan-definition ID, list
price, amount due, amount paid, currency, provider reference and timestamps.
An active circle may only move to a higher plan in the same mode. The upgrade
credit is the historical list price of the latest successful activation; the
target is the currently effective target-plan price. Data and activity remain
on the same circle.

## Payment-provider boundary

`server/pricing/provider.ts` is the only checkout-provider boundary. No
production provider is enabled at present. This is intentional: provider
selection, credentials, webhook signatures, refunds and reconciliation are a
business and operational decision. Until configured, requests return
`PAYMENT_PROVIDER_UNAVAILABLE`, keep the circle as a safe draft, charge
nothing, and never present success.

A provider integration must:

- use the generated activation UUID as its idempotency/metadata key;
- return only an HTTPS hosted checkout URL;
- verify signed server-to-server callbacks before completing an activation;
- compare currency and amount with the stored pending activation;
- make callbacks idempotent and reject replay or cross-circle references;
- record failures without leaking provider or payment secrets;
- call the repository completion transaction only after verification.

## Existing-circle migration

Existing rows are mapped to `pricingModelVersion = legacy_universal_v1` and
`activationStatus = grandfathered` by schema defaults. Their stored capacity
is retained, all previously available features remain usable, and completed or
archived circles remain read-only. New circles use `model_specific_v1`.

The migration is additive. Do not rewrite historic `activationPrice` values,
delete old records, or infer that an old contribution receipt was a platform
payment. Before production schema deployment, take a PostgreSQL backup; after
deployment, compare circle counts by type/status/legacy version and exercise a
grandfathered circle before enabling new traffic.

## Error contract

Pricing routes return stable codes including:

- `PLAN_UPGRADE_REQUIRED`
- `MEMBER_LIMIT_REACHED`
- `CO_ADMIN_LIMIT_REACHED`
- `ASO_EBI_TIER_LIMIT_REACHED`
- `FEATURE_NOT_INCLUDED`
- `TRIAL_ALREADY_USED`
- `INVALID_PLAN_UPGRADE`
- `ACTIVATION_REQUIRED`
- `PAYMENT_PROVIDER_UNAVAILABLE`

## Privacy-safe analytics

Allowed events cover catalogue views, plan selection, trial eligibility,
checkout start/outcome, activation, upgrade and limits. Never include receipt
content, email/phone, beneficiary details, private comments, bank details or
individual contribution amounts.
