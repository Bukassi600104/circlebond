# Milestone 18 — Post-launch verification

This is the operational record for BondCircle's post-launch verification. It
contains no credentials, OTPs, invitation tokens, private receipts, personal
contact details, or bank information.

## Current gate status

Milestone 18 is **in progress**. It must not be marked complete until the
Milestone 17 provider gates are closed and the live critical journeys pass on
real production infrastructure.

Live automated verification on 1 August 2026 passed:

- HTTPS canonical origin and redirect;
- production Firebase and Data Connect configuration health;
- browser security headers;
- installable standalone PWA manifest and service worker;
- crawler metadata and private-route exclusions; and
- absence of development-only codes and placeholders on authentication pages.

The same verification identified two release blockers:

- the published legal documents still contain draft/pre-launch identity and
  contact placeholders; and
- the configured Firebase production Storage bucket returns `404`, so
  production file-upload acceptance cannot pass.

These are provider/owner gates, not conditions that application code may hide
or replace with invented data.

## Critical-defect register

| Defect                                                       | Root cause                                                                                                                                                                 | Resolution                                                                                                                                                                                                                                                                  | Verification                                                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Mobile sign-in and registration feel shifted and uncontained | Mobile authentication constrained the form width but did not constrain the full panel or provide an app-like surface; desktop heading scale carried into the phone layout. | Bound the mobile panel to a centred 34rem frame, added safe-area padding, a compact card surface, responsive heading scale and horizontal overflow protection.                                                                                                              | Unit regression, type, lint, production build and live phone-width visual check after deployment. |
| Empty Gift Circle profile slots do nothing                   | The rendered slot was a disabled-aware button with no click handler.                                                                                                       | Connect every creator-accessible empty slot to the existing secure invitation manager. The same manager supports named email/phone invitations, open links, native sharing, WhatsApp and email, while preserving capacity, expiry, approval, CSRF and server authorization. | Unit regression plus authenticated live creator check after deployment.                           |

## First-launch monitoring

Review these signals daily during the early-launch window and record only
aggregated results in the private operations log:

| Signal                                              | Source                                                                                          | Action threshold                                                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Registration completion and authentication failures | Owner dashboard authentication outcomes, Resend delivery events and structured application logs | Investigate sustained delivery failures, timeout growth or a material completion drop.                    |
| Circle creation and completion                      | Owner dashboard circle type/status distributions                                                | Investigate failed creations, an unexpected mode imbalance or circles unable to complete.                 |
| Invitation acceptance                               | Owner dashboard invitation acceptance rate and active invitation states                         | Check expiry, capacity, registration return paths and suspicious creation volume.                         |
| Receipt submission and upload failures              | Owner dashboard upload failure rate and review/activity records                                 | Respond to any storage outage; inspect repeated safe upload rejections without exposing receipt contents. |
| Notification delivery                               | Owner dashboard email outcomes and provider delivery logs                                       | Investigate failed critical notifications and repeated reminders.                                         |
| Page performance and error rate                     | Vercel Web Analytics, Speed Insights, Observability and `/api/health`                           | Investigate degraded Core Web Vitals, elevated 5xx responses or degraded health.                          |
| Retention and backups                               | Owner retention panel, daily retention job, private backup/restore record                       | Escalate every retry alert, missed run, failed purge or unverified backup.                                |
| User-reported confusion and abuse                   | Support record, report queue and owner abuse panel                                              | Resolve critical workflow confusion and safety reports before Version 1.1 work.                           |

## Live acceptance sequence

After the two release blockers are closed and this exact commit is deployed:

1. Run `npm run verify:production -- --base-url https://www.bondcircles.com --storage-bucket <approved-bucket>`.
2. On current iPhone Safari and Android Chrome, verify sign-in, registration,
   Google authentication, email OTP, PWA installation and standalone launch.
3. Create one Gift, Aso-Ebi and Support Circle using production persistence.
4. From an empty Gift Circle profile slot, open the invitation manager and
   verify named email, open link, copy, native share and WhatsApp options.
5. Accept the invitation from a second account and confirm the intended circle,
   capacity and permission rules.
6. Upload, review and replace a receipt; confirm privacy and aggregated totals.
7. Verify critical notification delivery and deep links.
8. Complete and archive a circle, confirm read-only behavior, and observe the
   retention record without running a destructive purge early.
9. Record the backup restore rehearsal and Vercel rollback rehearsal in the
   private release record.
10. Review early-launch metrics for a stable observation window and close every
    critical defect before declaring Version 1.1 eligible.

## Completion rule

Code completion, a successful deployment, or an empty error dashboard alone is
not Milestone 18 completion. The gate closes only when all live checks above are
recorded, production Storage works, final legal/incident details are published,
backup and rollback rehearsals are recorded, and no critical defect remains.

# Pricing and activation verification

- Confirm every Gift, Aso-Ebi and Support pricing card shows the approved
  mode-specific prices, capacity, co-admin count, inclusions and exclusions.
- Claim one free three-member trial, then confirm a second trial fails with
  `TRIAL_ALREADY_USED`, including concurrent attempts.
- Confirm a paid circle stays a draft until a verified activation transaction.
- Confirm an absent provider returns `PAYMENT_PROVIDER_UNAVAILABLE` and does
  not create a success, charge, or publish action.
- Confirm Starter/Standard/Premium member, co-admin and Aso-Ebi tier limits at
  the API boundary, not only in the browser.
- Confirm Support approval/hidden-amount/public-progress gates and Gift custom
  contribution gates reject tampered requests.
- Confirm same-mode upgrade difference uses the historical successful
  activation as credit, preserves data, and rejects downgrades.
- Confirm owner pricing totals contain only verified activation/upgrade
  payments and never contribution receipts.
- Confirm a grandfathered circle retains its prior capacity and functionality.
- Confirm no contributor or invitee sees an activation charge.
