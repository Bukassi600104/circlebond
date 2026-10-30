# Retention pagination correction

30 October 2026. Implementer: Agent F. Base: `689099b` on isolated `codex/retention-pagination`. **PENDING REVIEW**: implementation evidence is not independent acceptance.

The previous retention loader used default-limited related lists before deleting every sensitive record. A runtime reproduction with 102 receipt rows from one user deleted receipts 1–100 plus the membership's latest pointer 102, then purged all receipt metadata; private file 101 was orphaned. Invitation acceptances and legacy membership/tier paths were also truncated. The new regression suite failed eight cases against the original repository, including the missing file, invitation limit and premature success on later-page failure.

## Change

- `server/repositories/retention.ts` reads eligibility/latest attempt separately, then fully enumerates receipts, invitation IDs, membership receipt pointers and tier image paths in deterministic 100-row pages. An exact full page requires another read; there is no aggregate truncation limit. Every page and every private path is loaded/validated before the first file or invitation acceptance deletion. A missing collection or later query failure records a failed attempt with the existing six-hour retry; sensitive metadata remains.
- New `dataconnect/bondcircle/retention-pagination.gql` contains three server-only `NO_ACCESS` read operations. Stable receipt/invitation/tier IDs and membership user IDs determine ordering. Existing operations, tables, audit history, retry rules and purge mutations remain compatible.
- External storage-reference lookup filters out the purged circle before applying its one-row existence limit. Previously, two same-circle receipt references could conceal another circle's third reference. Deduplication, private-path validation, shared-file preservation, ignore-missing deletion and post-delete existence checks remain in place.
- Tests execute the actual transpiled retention repository with isolated dependencies. A separate guarded loopback-only connector test seeds synthetic 102-receipt/102-invitation data, injects a second-page outage, retries, checks final cleanup and checks the external-reference query. Storage is explicitly a fake in this database test.

## Verification

- Original-source regression: 9 tests run, 1 passed and 8 failed as expected before the implementation.
- `node --test tests/unit/retention-pagination-runtime.test.mjs tests/unit/retention.test.mjs`: **14 PASS, 0 failed**, exit 0. Includes all 102 receipt files and invitation acceptances, 500 legacy membership pointers, later tier images, second-page receipt/invitation failure, omitted collection, unsafe later path, hidden external reference, storage failure and active-circle exclusion.
- Cached native Data Connect toolkit 3.4.16: `--logtostderr build --config_dir=dataconnect`, exit 0; compiler JSON contains metadata and no errors. Local checkout sources only; no project/deployed-source lookup, SDK generation or migration.
- Scoped ESLint on the repository and both new test files, with `--max-warnings=0`: **PASS**, exit 0. Whole-checkout `tsc --noEmit --incremental false`: **PASS**, exit 0. Scoped Prettier check: **PASS**. The new database test has been syntax-checked but **not run** by the implementer; no emulator was started. Independent QA must run `tests/e2e/retention-pagination.test.mjs` against a disposable loopback Data Connect instance, followed by integrated release checks.

## Remaining gates and risks

Independent Ponytail review, actual local connector execution and final integrated CI remain required. This correction retains the existing eligibility/attempt admission behavior; it does not introduce a distributed purge lock or change lifecycle permissions. Concurrent out-of-band administrative writes/deletions during terminal-circle enumeration are not exercised by the unit fixtures. Hosted job time/resource limits and production Storage deletion/recovery require staging evidence. Previously orphaned files cannot be reconstructed from already-deleted receipt metadata by this prospective fix; any inventory/reconciliation requires a separately reviewed, owner-authorized operation.

No production network access, customer-data mutation, live Storage deletion, secret change, deployment, paid resource, dependency install or emulator was used. Application and connector operations must be promoted together only through the existing human release gate.
