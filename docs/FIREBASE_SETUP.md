# BondCircle Firebase setup

BondCircle uses Firebase Authentication, Firebase SQL Connect, and Cloud Storage for Firebase.

## Current development project

- Firebase project: `bond-circle`
- Web app: `BondCircle Web`
- SQL Connect service: `bondcircle-service`
- Connector: `bondcircle`
- Cloud SQL database: `bondcircle-sql:bondcircle`
- Region: `europe-west2`
- Storage during development: Firebase Storage Emulator

The SQL Connect service uses Firebase's 90-day no-cost Cloud SQL trial. Firebase requires the Blaze plan to create a new production Storage bucket, so that external resource is deferred to the production-infrastructure gate in Milestone 17.

## Local setup

1. Copy `.env.development.example` to `.env.local`.
2. Enter the Firebase Web App values; never commit `.env.local`.
3. Run `npm install`.
4. Run `npm run firebase:sdk` after connector changes.
5. Run `npm run firebase:emulators` for local Firebase services.

The committed `storage.rules` file starts deny-by-default. Later milestones will add narrow, tested access for avatars, circle images, and private payment proofs.

## Verification

```text
npm run format:check
npm run lint
npm run typecheck
npm test
npm run firebase:sdk
npx firebase dataconnect:sql:diff --project bond-circle
```

The SQL diff must report that the live database matches the SQL Connect schema exactly.
