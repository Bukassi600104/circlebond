# Milestone 17 — Production release and incident runbook

This runbook is the repeatable release record for BondCircle. It deliberately
does not contain credentials, private keys, raw invitation tokens, OTPs, user
data, or bank details.

## Release identity

- Canonical production origin: `https://www.bondcircles.com`
- Application host: Vercel
- Authentication, relational persistence and file storage: Google Firebase
- Transactional email: Resend through the configured SMTP transport
- Scheduled retention endpoint: `/api/jobs/retention`, daily at 03:00 UTC

Record the Git commit, Vercel deployment ID, release operator, verification
time and previous known-good deployment in the private release ticket before
promoting a deployment.

## Required production configuration

The exact values remain in the provider secret stores. Verify the names and
Production scope against `.env.production.example`; never copy secret values
into this document or a ticket. Preview must use separate credentials where a
provider supports them. No Firebase emulator variables may be present.

Web Analytics and Speed Insights are code-ready but explicitly disabled by
default. Enable `NEXT_PUBLIC_ENABLE_ANALYTICS` or
`NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS` only after the corresponding Vercel
project feature is enabled and the final Privacy Notice has been reviewed.
Telemetry strips query strings, fragments, invitation tokens and dynamic user
or circle identifiers before transmission.

## Pre-release gate

1. Run `npm ci`, `npm run format:check`, `npm run lint`,
   `npm run typecheck`, and `npm test` from a clean checkout.
2. Deploy a Preview and complete the Milestone 16 device/accessibility matrix.
3. Confirm Firebase Auth providers and authorized domains, Data Connect,
   production Storage, Resend delivery, the owner dashboard and the retention
   cron from the correct provider team accounts.
4. Confirm the final Terms, Privacy Notice, pricing, support route, privacy
   choices and incident contacts. Draft or placeholder legal text blocks the
   release.
5. Promote the exact verified deployment; do not trigger a fresh rebuild.
6. Run:

   ```powershell
   npm run verify:production -- --base-url https://www.bondcircles.com --storage-bucket bond-circle.firebasestorage.app
   ```

7. Complete authenticated smoke tests for registration, email OTP, Google and
   phone sign-in, account recovery, all three circle types, invitations,
   uploads, notifications, account export/deletion and owner controls.

## Database and file backup

Before a schema migration, create a provider-managed Cloud SQL backup or
export for the Firebase Data Connect database and record its immutable
identifier in the private release ticket. Confirm the backup completed and
perform a restore rehearsal into a non-production project at least quarterly.

Cloud Storage lifecycle/retention configuration and any required object
versioning must be reviewed in Firebase/Google Cloud. Never treat the local
emulator or a developer machine as a production backup. Retention deletion is
destructive and must run only after the database backup has completed.

## Rollback

1. In Vercel, promote the recorded previous known-good deployment to the
   production domains.
2. Do not reverse a destructive database migration. Prefer forward-compatible
   schema changes and a correcting forward migration.
3. If the release wrote incompatible data, stop affected writes, preserve
   evidence, restore into an isolated project, validate, and follow the
   approved recovery decision before touching production.
4. Re-run `npm run verify:production` and the affected authenticated smoke
   tests after rollback.
5. Record start/end time, decision maker, deployment IDs, data impact and
   follow-up actions.

Rollback is not accepted as tested merely because the Vercel button exists. A
non-production promotion-and-restore exercise must be recorded before the
Milestone 17 acceptance gate closes.

## Monitoring and incident response

- Vercel Observability and structured application logs provide server error,
  route, health and retention signals. The error hook records only an error
  name/digest, HTTP method and normalized framework route—not messages, stacks
  or raw request URLs.
- Alert on elevated 5xx rate, degraded `/api/health`, OTP delivery failure,
  Storage errors, retention retry alerts and authentication abuse signals.
- Never paste production secrets or personal data into chat, email or public
  issue trackers.
- For a suspected credential leak, revoke and rotate at the provider first,
  update Vercel secrets, redeploy, invalidate affected sessions and assess
  notification obligations.
- For suspected personal-data exposure, preserve logs, limit access, identify
  affected data/users and follow the approved NDPA/NDPC response process.

The named incident commander, backup owner, privacy/DPO contact, legal entity,
registered address, public support email, escalation telephone number and
provider-account recovery contacts **must be supplied by the owner** and kept
in the private operations record. They are release blockers and must not be
invented in source control.
