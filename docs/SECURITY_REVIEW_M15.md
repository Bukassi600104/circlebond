# Milestone 15 Security Review

Review date: 29 July 2026  
Scope: BondCircle web/PWA, Firebase Authentication, Firebase Data Connect,
Firebase Storage, Vercel runtime, Resend delivery paths.

## Outcome

No unresolved critical or high-severity application or production dependency
finding remains after the controls in this milestone. The release gate still
requires the automated suites, Firebase schema deployment, and production smoke
verification described below.

## Threat model and controls

| Surface                   | Control and evidence                                                                                                                                                                                                                                                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication            | Firebase Admin verifies ID tokens and creates revocable, eight-hour HTTP-only sessions. Email OTP challenges use AES-256-GCM, constant-time comparison, ten-minute expiry, five attempts, durable throttling, and a database-enforced single-use record. Authentication failures return generic messages.                                                |
| Session and CSRF          | Session cookies are `HttpOnly`, `Secure` in production, and `SameSite=Strict`. Mutations require a matching CSRF cookie/header, valid same-origin `Origin`/host, and same-site Fetch Metadata.                                                                                                                                                           |
| Roles and IDOR            | Repository functions load membership before returning circle data. Creator, co-admin, and member capabilities are tested separately. Missing membership or receipt permission returns 404 for private resources so object existence is not disclosed.                                                                                                    |
| Invitations               | Tokens are random, only SHA-256 hashes are stored, expiry/use-count/revocation are enforced, and creation is durably rate limited per creator and circle.                                                                                                                                                                                                |
| Uploads                   | Only JPEG, PNG, and WebP are accepted. Sharp decodes and re-encodes each file, verifies the decoded format against MIME, rejects malformed/disguised files, strips metadata, caps input pixels and bytes, and produces safe UUID/internal filenames. Raster re-encoding is the supported content-sanitization step; executable formats are never stored. |
| Private receipts          | Firebase Storage denies direct client reads and writes. Receipt paths are server-only. API URLs are HMAC signed, viewer/resource/circle bound, expire after five minutes, recheck membership, return `no-store`, and cannot be reused by another account.                                                                                                |
| XSS and browser isolation | React escapes user content; no `dangerouslySetInnerHTML` is used. Production CSP denies objects, framing, foreign forms, and unapproved origins. HSTS, COOP, CORP, nosniff, referrer, and permissions policies are set.                                                                                                                                  |
| Abuse prevention          | Durable database-backed windows cover login, OTP issuance and verification, circle creation/upload, invitation creation, receipt upload, and comments. Existing report, moderation, suspension, and owner audit workflows remain enforced.                                                                                                               |
| Database                  | Client SDK operations are limited to authenticated self-profile actions. All privileged `NO_ACCESS` operations are called through authenticated server repositories that perform membership/role checks.                                                                                                                                                 |
| Secrets and logging       | Real environment files, service accounts, PEM files, Firebase local state, and Vercel metadata are git-ignored. Secret scans found only documented placeholders. OTP codes, invitation tokens, session cookies, and private storage paths are not logged. Audit records use reason codes and identifiers rather than secrets.                            |
| Privacy                   | Legal acceptance timestamps, notification preferences, account deletion, retention/purge, visibility, and member amount controls are implemented and covered by earlier milestone tests.                                                                                                                                                                 |

## Dependency review

`npm audit --omit=dev --audit-level=high` initially found high findings in
Next.js/PostCSS/Sharp. Next.js was patched to 16.2.12, Sharp to 0.35.3, and
patched PostCSS/Sharp versions are enforced across the tree. The post-fix audit
contains no critical/high finding.

Eight moderate transitive advisories remain after updating `protobufjs` to its
patched release:

- `uuid` below 11.1.1 inside Firebase/Google libraries: the affected
  buffer-taking v3/v5/v6 APIs are not called by BondCircle.

Forcing the Firebase Admin 14 major during this release would add more
production risk. These moderate, non-reachable findings are recorded for
upstream monitoring and do not violate the approved no-critical/high gate.

## Release evidence required

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- unit and integration suites, including `security-hardening.test.mjs`
- authentication and circle-engine emulator suites
- Firebase Data Connect schema/connector deploy
- production health, authentication, role/IDOR, expired private URL, and upload
  smoke checks
