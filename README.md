# BondCircle

[![CI](https://github.com/Bukassi600104/circlebond/actions/workflows/ci.yml/badge.svg)](https://github.com/Bukassi600104/circlebond/actions/workflows/ci.yml)

BondCircle is a responsive web application for creating trusted circles around gifts, Aso-Ebi events, and community or family support. It coordinates membership, contribution expectations, payment evidence, updates, and fulfilment without holding users’ money.

## Delivery status

The product is being delivered against an approved 18-milestone production plan. Milestones 1–16 are implemented and verified. The Milestone 17–18 implementation is published on `main`; operational acceptance and post-launch verification remain in progress:

- Firebase-only application foundation
- Design system and responsive component library
- Email, phone, and Google authentication
- Secure sessions, OTP verification, legal acceptance, and account onboarding
- Dashboard and multi-circle navigation
- Shared circle lifecycle and tier-controlled capacity
- Gift, Aso-Ebi, and Support Circles
- Secure invitations, creator approval, revocation, and multi-circle membership
- Private receipt upload, partial contributions, review, replacement, and audit history
- Official announcements, moderated comments and replies, and immutable activity feeds
- In-app notifications, critical transactional email, preferences, muted circles, protected reminders, and deadline scheduling
- Creator-controlled completion and cancellation, read-only archives, visible 30-day retention countdowns, reference-aware private file deletion, retryable scheduled purges, and minimal audit-safe historical records
- Separate owner administration with aggregate platform health, purpose-limited abuse review, account suspension, compromised-invite revocation, approved operational exports, upload telemetry, and an immutable administrative audit trail
- Security hardening, dependency review, private-upload controls, CSRF/origin enforcement, durable abuse controls, and browser security headers
- Automated production builds, unit/integration/rendered-page coverage, Firebase Auth and Data Connect emulator E2E, lint, formatting, strict TypeScript, and the documented device QA matrix

The web application has a live Vercel deployment for production-environment testing. Formal production readiness still requires the provider-side and acceptance gates in Milestones 17–18; the live URL is not a substitute for those checks. The exact source/deployment evidence and remaining gates are tracked in [the Milestones 17–18 closeout ledger](docs/RELEASE_CLOSEOUT_M17_M18.md), with procedures in [the production runbook](docs/PRODUCTION_RUNBOOK_M17.md) and live checks in [the post-launch verification plan](docs/POST_LAUNCH_VERIFICATION_M18.md). Neither milestone may be marked complete until production Storage, final legal/incident details, backup/rollback exercises and live authenticated smoke tests pass.

## Technology

- Next.js 16 App Router and React 19
- Strict TypeScript
- Firebase Authentication and Admin SDK
- Firebase Data Connect with PostgreSQL
- Firebase Cloud Storage and local emulators
- Nodemailer-compatible SMTP for production OTP and critical notification delivery
- Node’s native test runner, ESLint, Prettier, and GitHub Actions

## Architecture

```text
Browser
  ├─ Next.js server-rendered screens and client interactions
  ├─ Firebase Auth for Google and phone verification
  └─ Secure HTTP-only application session
        ├─ Next.js route handlers
        ├─ Firebase Admin
        ├─ Firebase Data Connect → PostgreSQL
        └─ Firebase Cloud Storage
```

Important boundaries:

- BondCircle tracks contributions; it does not receive or hold contribution funds.
- Invitation tokens are cryptographically random. Only token hashes are persisted.
- Circle access is authenticated and membership-scoped.
- Sensitive Support Circle totals and member amounts are redacted server-side.
- Administrative state changes are written to immutable audit records.

## Local development

Requirements:

- Node.js 22.13 or newer
- Java 21 for Firebase emulators
- A Firebase project, or the checked-in local emulator topology

```bash
npm ci
copy .env.development.example .env.local
npm run dev
```

The development command starts the required Firebase emulators and the Next.js application. The app is available at `http://127.0.0.1:3000`.

Do not commit `.env.local`, Firebase service-account files, private keys, or SMTP credentials.

## Environment configuration

Use the reviewed templates:

- `.env.development.example`
- `.env.staging.example`
- `.env.production.example`

Production requires:

- Firebase web application values
- Firebase Admin credentials
- Firebase Data Connect location, service, and connector IDs
- A strong `AUTH_CHALLENGE_SECRET`
- Production SMTP configuration for email OTP delivery
- A strong `CRON_SECRET` for the authenticated retention purge job

See [Firebase setup](docs/FIREBASE_SETUP.md) and [deployment guidance](docs/DEPLOYMENT.md).

## Verification

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run verify:production
```

`npm test` includes:

- Optimized production build
- Unit and integration coverage
- Authentication E2E against Firebase emulators
- Firebase Data Connect E2E for circle lifecycle, all three circle types, invitations, receipts, and activity logging

GitHub Actions executes the same quality gates on pushes to `main` and pull requests.

## Deployment

The application is designed for Vercel hosting with Firebase providing authentication, relational persistence, and file storage. Before a production deployment:

1. Deploy the reviewed Firebase Data Connect schema and connector.
2. Configure Firebase Authentication providers and authorized domains.
3. Create and secure the production Storage bucket.
4. Configure every production environment variable in Vercel.
5. Configure production SMTP delivery.
6. run the full verification suite.
7. Verify `/api/health`, authentication, invitations, uploads, and database persistence on the deployed domain.

The detailed checklist is in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), with operational backup, rollback, monitoring, and incident procedures in [docs/PRODUCTION_RUNBOOK_M17.md](docs/PRODUCTION_RUNBOOK_M17.md).

## Product documentation

The approved product, UX, engineering, design-system, screen, launch-scope, and milestone documents are stored at the repository root. They are the source of truth for implementation order and acceptance.

## Security and contributions

Read [SECURITY.md](SECURITY.md) before reporting a vulnerability and [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.

This is a private product codebase unless the repository owner explicitly assigns another license.
