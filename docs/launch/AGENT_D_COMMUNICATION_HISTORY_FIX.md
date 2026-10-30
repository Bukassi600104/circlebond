# Communication history correction

Status: PENDING REVIEW. Author: Agent D. Base: a1a12c7. Fresh non-author Ponytail review is required before acceptance.

## Verified defects and scope

The shared communication loader previously used the oldest 300 comments and newest 100 announcements as both the rendered history and action-target lookup. A later comment or older announcement could therefore exist but become unavailable for reply, deletion, editing or moderation. The Support detail query also relied on the connector default for update history.

The locked UX workflow explicitly permits members to comment on announcements and managers to moderate comments; it specifies no history truncation. Model-specific pricing permits multiple Support beneficiary updates according to entitlement and grandfathers existing features. This correction does not change those entitlements, the three product modes, pricing or the current approved 100-member maximum.

A new runtime regression also reproduced an existing connected defect: the same-discussion check compared a null parent against a non-null announcement for top-level comments. It now compares discussion IDs only when replying to an existing parent. Cross-discussion replies remain rejected.

## Changed files

- `server/repositories/communication.ts`: obtain membership/context before reading paginated history; use existing `readAllRows` for all announcements, comments and manager-only open reports before lookup; preserve soft-deleted placeholders and read-only/role/author boundaries.
- `server/repositories/support-circles.ts`: page the complete update history after the membership/type gate and retain all existing beneficiary/amount visibility rules.
- `dataconnect/bondcircle/communication-pages.gql`: additive server-only context/history queries. History pages have explicit 200-row limits, circle predicates, offsets and unique ID tie-breakers. Announcements exclude soft-deleted rows; comments retain deleted parents; reports include only open items.
- `tests/unit/communication-pagination-runtime.test.mjs`: eight real-module regressions using the actual shared pagination helper and communication rules with an injected connector.

The original operations remain available for rollback. The activity feed retains its existing explicit 200-record recent-event boundary and is not used as an action-target index. The Support write paths still use their existing nonempty-update check, which only needs existence; the displayed history now uses the complete paginated result.

## Verification performed

- `node --test tests/unit/communication-pagination-runtime.test.mjs tests/unit/repository-pages.test.mjs tests/unit/communication.test.mjs tests/unit/support-circle.test.mjs`: 21 PASS, 0 FAIL, exit 0.
- Runtime coverage includes 401 comments, 401 announcements, 201 reports, 401 Support updates; comment 301 reply/delete/moderate/report; newest and older-than-100 announcement edit/delete/comment; outsiders; member/manager separation; author-only deletion; deleted parent placeholders; cross-discussion rejection; archived writes; and missing/failed later pages returning no partial success or action mutation.
- `tsc --noEmit`: PASS, exit 0.
- Scoped ESLint: PASS, exit 0.
- Scoped Prettier: PASS after formatting.
- Cached Data Connect 3.4.16 native `build --config_dir=<local dataconnect>`: PASS, exit 0; no project ID, network deployment, SDK generation or schema migration.
- `git diff --check`: PASS, exit 0.

Initial focused test run had two failures: one exposed the top-level announcement-comment defect corrected above, and the other was an over-broad fixture assertion expecting a circleId on an existing per-comment reporter query. The fixture now validates that operation's actual comment/reporter parameters. No permission or business-rule assertions were removed.

## Remaining limits

Integrated database/browser/full CI verification is delegated to the parent and QA agent. No running emulator, dependency installation, application build or production network action was used here; the local connector compiler check is recorded above. Offset paging has deterministic ordering, but multiple queries are not a transactional snapshot during concurrent insertions/deletions; targeted mutations retain their existing transaction and role checks. Large histories now require proportionally more reads, as required to preserve the existing complete-history UI/action contract. No overall production or Ponytail approval is claimed by the author.
