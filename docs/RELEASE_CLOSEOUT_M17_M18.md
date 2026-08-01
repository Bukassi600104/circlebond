# Milestones 17–18 release closeout

Review date: 1 August 2026

This is the public, credential-free release ledger for the BondCircle production
deployment and post-launch verification gates. It distinguishes implementation
and publication from external-provider and owner acceptance so the repository
never presents an incomplete launch as finished.

## Published release evidence

| Evidence                              | Verified value                                | Status                        |
| ------------------------------------- | --------------------------------------------- | ----------------------------- |
| Canonical source repository           | `https://github.com/Bukassi600104/circlebond` | Verified                      |
| Release branch                        | `main`                                        | Verified                      |
| Remote release commit                 | `87f6170da1504f38cc52fd53b839456fd8175e10`    | Verified on `origin/main`     |
| Milestone 17 implementation commit    | `1f84ec3`                                     | Published on `main`           |
| Milestone 18 implementation commit    | `87f6170`                                     | Published on `main`           |
| Canonical production origin           | `https://www.bondcircles.com`                 | Live over HTTPS               |
| Recorded Vercel production deployment | `GR84PGhLeYHpK5UNyyHuiQoQeGyx`                | Deployment succeeded          |
| Firebase project                      | `bond-circle`                                 | Active                        |
| Firebase web application              | `BondCircle Web`                              | Active                        |
| Data Connect service                  | `bondcircle-service`, `europe-west2`          | Active                        |
| Data Connect database                 | `bondcircle-sql` / `bondcircle`               | Runnable                      |
| Production telemetry                  | Vercel Web Analytics and Speed Insights       | Enabled with URL sanitisation |

The repository was clean and `HEAD`, `origin/main`, and GitHub's remote `main`
reference all resolved to the same release commit when this record was created.

## Automated gates

The checked-in release gate covers formatting, lint, strict TypeScript, the
production Next.js build, unit/integration/rendered-page tests, Firebase Auth
emulator E2E, Data Connect circle-engine E2E, HTTPS redirects, health,
production configuration, browser security headers, PWA assets, crawler
metadata, absence of development credentials, final legal text, and the
production Storage bucket.

The complete local gate and the production verifier must be rerun against the
release commit after every provider-side change. A previous pass is evidence,
not permission to skip the final run.

## One Google billing dependency

The `bond-circle` project currently has no active linked Cloud Billing account.
That single provider dependency blocks two Milestone 17 checks:

1. Firebase cannot provision `bond-circle.firebasestorage.app` or deploy its
   reviewed rules.
2. The Firebase Data Connect Cloud SQL no-cost trial rejects managed on-demand
   backups, and automated backups are unavailable in the current trial state.

After the owner activates and links the `BOND CIRCLE` billing account, the
release operator must:

1. provision the default Firebase Storage bucket in `europe-west2`;
2. deploy `storage.rules` and verify an authorised upload/read/delete flow;
3. create a provider-managed Cloud SQL backup and record its immutable ID;
4. rehearse restore into a non-production target;
5. rerun `npm run verify:production -- --base-url
https://www.bondcircles.com --storage-bucket
bond-circle.firebasestorage.app`.

## Owner acceptance still required

These items cannot be inferred or self-approved by source code and therefore
remain acceptance gates until the owner supplies or records them:

- final legal entity or trading-name status, registration number if any,
  complete registered/contact address, public support email, privacy/DPO
  contact, minimum user age, effective date, complaint timetable and dispute
  venue;
- named incident commander, backup owner and provider-account recovery
  contacts in the private operations record;
- authenticated live smoke results for registration, production OTP, Google
  and phone sign-in, all three circle types, invitations, notifications,
  account export/deletion and owner controls;
- current-device PWA, iPhone Safari and Android Chrome sign-off; and
- a recorded non-production Vercel rollback-and-restore rehearsal.

The owner has supplied partial public identity details, but the legal gate must
not be closed until the remaining details are confirmed and the final text is
approved. No registration status, email address, minimum age, DPO identity or
legal venue may be invented.

## Completion rule

Milestone 17 implementation and publication are complete. Milestone 17
operational acceptance and Milestone 18 post-launch acceptance remain open
until the Google billing dependency and every owner acceptance item above are
closed with evidence. Only then may the 18-milestone goal be marked achieved.
