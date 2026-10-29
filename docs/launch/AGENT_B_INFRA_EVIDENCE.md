# Agent B — infrastructure evidence

Date: 29 October 2026 (Africa/Lagos). Source baseline: `c0b1f913caeeffee546f79e2804f2583f2963edd`. Implementation acceptance: PENDING REVIEW. No production deployment, infrastructure provisioning, customer writes, migration, purge or real email was performed.

## Current provider evidence

Read-only HTTPS probes at approximately 21:39 UTC / 22:39 Africa/Lagos:

| Check                                                                           | Current result                                                                              | Acceptance                                                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `https://www.bondcircles.com/api/health`                                        | HTTP 200; application `ok`, Firebase and SQL Connect `configured`                           | PASS for configuration presence only; this route does not test network connectivity or database/storage operations |
| `https://firebasestorage.googleapis.com/v0/b/bond-circle.firebasestorage.app/o` | HTTP 404, `Not Found`                                                                       | FAIL: historical storage blocker persists                                                                          |
| `https://storage.googleapis.com/storage/v1/b/bond-circle.firebasestorage.app`   | HTTP 404; `The specified bucket does not exist`, reason `notFound`                          | FAIL: configured bucket is unavailable                                                                             |
| Storage upload/read/replace/delete and cross-user access                        | Cannot execute against unavailable bucket; production writes are not authorized             | BLOCKED                                                                                                            |
| Managed backup and isolated restore rehearsal                                   | No current immutable backup ID or successful restore evidence available in repository       | BLOCKED; historical documents are not current proof                                                                |
| Staging CRUD/concurrency/migration compatibility                                | No verified separate staging project or approved staging credentials supplied to this agent | BLOCKED; no production substitute used                                                                             |

Checked-in topology remains Firebase project `bond-circle`, Data Connect service `bondcircle-service`, `europe-west2`, Cloud SQL instance `bondcircle-sql`, database `bondcircle`, connector `bondcircle`. These are configuration facts, not proof of live resource health. No Firebase MCP tools were available in this task. Existing CLI login discovery did not provide usable provider evidence during the task; no credential values were printed.

The current [Firebase Storage billing requirements](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024) require Blaze/linked billing. This supports a provider dependency; it does **not** establish the project's current billing state. Owner/provider verification and approval are needed before enabling a paid plan or provisioning a bucket.

## Implemented correction

Confirmed defect: `/api/jobs/notifications/deadlines` exists and enforces `CRON_SECRET`, but the baseline `vercel.json` schedules only retention. Members who do not open the app have no configured background deadline invocation.

- Added a daily deadline schedule at 08:00 UTC / 09:00 Africa/Lagos, preserving the existing 03:00 UTC retention job.
- Added the static `deadline_notification_job_failed` error signal without logging provider exception text or customer data.
- Updated deployment/runbook instructions and the existing cron configuration expectation.
- Added runtime tests of the actual transpiled route with repository/response/logger stubs: absent, incorrect and unconfigured secrets cannot run processing; authorized processing returns its actual result; thrown failures return generic HTTP 500 and emit only the static signal.

The schedule is compatible with the current [Vercel daily Hobby limit](https://vercel.com/docs/cron-jobs/usage-and-pricing). Hobby execution can occur within the scheduled hour. [Vercel does not automatically retry failed invocations](https://vercel.com/docs/cron-jobs/manage-cron-jobs); operators must monitor missed/failed invocations and authorize a rerun after fixing the cause. No schedule is active until the owner approves deployment. Existing database notification deduplication prevents duplicate in-app notifications per recipient/deadline; SMTP delivery remains separately recorded and needs staging/provider acceptance.

## Test evidence

- `node --test tests/unit/deadline-job.test.mjs tests/unit/notifications.test.mjs tests/unit/retention.test.mjs`: PASS, 14 tests, 0 failures.
- After deployment/runbook documentation updates, the same tests plus `tests/unit/production-readiness.test.mjs`: PASS, 21 tests, 0 failures.
- Targeted Prettier write completed for changed source, tests, configuration and operational documentation. Targeted lint/typecheck completion is recorded in the parent integration evidence if the local host cannot complete it before handoff.
- No emulator ports or production customer data were used. Dependencies were reused through an ignored worktree `node_modules` junction to the existing checkout.

## Remaining requirements and handoff

| Requirement                                                        | Acceptance     | Unblock action                                                                                                                                                                         |
| ------------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Real storage operations and private access rules                   | BLOCKED        | Owner confirms billing/provider access, authorizes bucket provisioning/rules deployment, then test with staging identities and objects                                                 |
| Data recovery                                                      | BLOCKED        | Authorized operator creates/references completed backup ID, restores into isolated target, compares counts and representative entities, records elapsed recovery and rollback exercise |
| Daily production invocation and actual OTP/critical email delivery | BLOCKED        | Approved deployment and provider delivery access; inspect invocation, masked delivery records and failure alerts                                                                       |
| Independent implementation acceptance                              | PENDING REVIEW | Separate Ponytail reviewer inspects diff and evidence, then integrated CI                                                                                                              |

Security follow-up for Agent F: existing `server/repositories/notifications.ts` logs and stores raw `error.message` from SMTP failures. Provider errors can contain customer addresses or operational details. This implementation's new failure log deliberately contains neither; a shared logging-policy correction belongs to the security owner.

Existing deadline candidate query is bounded to 200 circles and the job processes serially. Production-like duration/load acceptance remains unverified; pagination/durable delivery retry should be assessed against measured pilot volume rather than inferred from this small code change.

Skipped: live writes, paid provisioning, destructive migrations, backup/restore execution and provider emails. Risk: production Storage remains unavailable; code and local test success do not close infrastructure launch gates.
