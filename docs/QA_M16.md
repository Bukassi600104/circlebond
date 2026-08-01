# Milestone 16 — Testing and Quality Assurance

Review date: 1 August 2026

## Automated release gate

The complete project gate passes locally:

- `npm test`
- production Next.js build
- 101 unit, integration, and rendered-production tests
- Firebase Authentication emulator E2E
- 8 Firebase circle-engine E2E scenarios
- lint and strict TypeScript checks

The rendered-production suite now checks the public home, onboarding,
authentication, verification, manifest, health endpoint, and unauthenticated
redirects for the account and all three circle creation entry points.

## Local smoke matrix

| Surface | Result |
| --- | --- |
| `/` | HTTP 200, non-empty BondCircle HTML |
| `/onboarding` | HTTP 200, supplied onboarding artwork rendered |
| `/sign-in` | HTTP 200, authentication screen rendered |
| `/register` | HTTP 200, registration screen rendered |
| `/verify` | HTTP 200, verification screen rendered |
| `/account` | HTTP 307 to sign-in when unauthenticated |
| `/account/create?type=gift` | HTTP 307 to sign-in when unauthenticated |
| `/account/create?type=aso-ebi` | HTTP 307 to sign-in when unauthenticated |
| `/account/create?type=support` | HTTP 307 to sign-in when unauthenticated |
| `/manifest.webmanifest` | HTTP 200, standalone PWA manifest |
| `/api/health` | HTTP 200, local Firebase/Data Connect health |

## Required owner/device checks before Milestone 16 closes

The following acceptance checks require the owner’s current devices and the
live production infrastructure: iPhone Safari, Android Chrome, desktop Chrome,
Safari, Edge, tablet layout, installed PWA mode, screen reader behavior,
offline/slow-network behavior, and production email/storage delivery. These
are intentionally not represented as passing based only on source inspection.

Record each result against the deployed URL before approving the Milestone 17
production release gate.
