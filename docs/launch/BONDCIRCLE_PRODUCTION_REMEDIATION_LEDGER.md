# BondCircle production remediation ledger

Started: 29 October 2026 (Africa/Lagos). Baseline: `c0b1f913caeeffee546f79e2804f2583f2963edd`.
Integration branch: `codex/production-readiness`. Production promotion, live customer writes, paid services and destructive migrations require explicit owner approval.

This is the central execution record. Historical milestone documents describe earlier evidence; current acceptance requires fresh verification. Status vocabulary: PASS, FAIL, BLOCKED, PENDING REVIEW, NOT STARTED, NOT APPLICABLE.

## Execution and dependency graph

Discovery → isolated implementation → automated checks → independent Ponytail skill review → corrections/retest → integration → full CI/browser checks → exact-commit release candidate → staging/provider/device acceptance → owner production approval.

Four concurrency slots include the parent. Roles A–H are scheduled with at most three specialist agents concurrently; independent review never approves its own author's work. Ponytail is an installed skill (`ponytail-review/SKILL.md`, plugin 5.3.3), invoked by a separate review agent, not a separate external approval service.

| ID     | Priority / severity | Task / affected files                                | Owner                 | Dependencies                             | Status      | Evidence / tests                                                                              | Reviewer decision                                | Remaining risk / next action                                       |
| ------ | ------------------- | ---------------------------------------------------- | --------------------- | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| BC-001 | P0 / release        | Repository identity and isolation                    | Parent                | None                                     | PASS        | Clean baseline; local/GitHub main commit and tree match; one checkout; no other active agents | Identity verified by parent, not code acceptance | Keep source work isolated; production relationship still to verify |
| BC-002 | P0 / release        | CI failure; workflow, package/lock, tests            | A                     | BC-001                                   | NOT STARTED | Historical failed commit supplied; logs/local reproduction required                           | NOT STARTED                                      | Inspect actual failed run and reproduce before fixing              |
| BC-003 | P0 / infrastructure | Firebase, Storage, persistence, recovery, jobs       | B                     | BC-001                                   | NOT STARTED | Historical 404/billing/backup claims unverified today                                         | NOT STARTED                                      | Read-only production probes; no production writes                  |
| BC-004 | P0 / financial      | Activation provider, pricing, payments               | C                     | BC-001; approved catalogue               | NOT STARTED | docs/MODEL_SPECIFIC_PRICING.md is authoritative over universal pricing                        | NOT STARTED                                      | Provider approval/configuration and live charges remain gated      |
| BC-005 | P1 / usability      | Complete UX/accessibility journeys and bounded fixes | D                     | BC-001                                   | NOT STARTED | Design system and locked scope; current screens to inspect                                    | NOT STARTED                                      | Device/browser checks required                                     |
| BC-006 | P0 / mobile         | Manifest, service worker, installation/offline       | E                     | BC-001                                   | NOT STARTED | app/manifest.ts; public/sw.js; components/pwa                                                 | NOT STARTED                                      | Physical iPhone/Android availability unverified                    |
| BC-007 | P0 / security       | Auth, authorization, privacy, dependency audit       | F                     | BC-001                                   | NOT STARTED | Historical security review is not current proof                                               | NOT STARTED                                      | Cross-user and production OTP checks required                      |
| BC-008 | P1 / API            | Native API contract, tokens, domain, coverage        | G                     | BC-001; BC-004/007 for shared changes    | NOT STARTED | docs/openapi.yaml; app/api/v1; server/auth/native.ts                                          | NOT STARTED                                      | No duplicate backend/native rewrite                                |
| BC-009 | P0 / acceptance     | Independent QA, performance, acceptance matrix       | H                     | Initial baseline; all integrated changes | NOT STARTED | Existing tests must be rerun; real-device results separate                                    | NOT STARTED                                      | Never infer device/provider acceptance from unit tests             |
| BC-010 | P1 / feasibility    | AppDeploy assessment/native handoff                  | Parent                | Tool capability evidence; BC-008         | NOT STARTED | Read-only capability assessment only                                                          | NOT STARTED                                      | No deployment or duplicate database authorized                     |
| BC-011 | P0 / review         | Independent Ponytail review cycle                    | Independent reviewer  | Each substantial tested change           | NOT STARTED | Installed review skill discovered and read                                                    | NOT STARTED                                      | No author self-approval                                            |
| BC-012 | P0 / release        | Exact-commit RC and final launch gate                | Parent + H + reviewer | BC-002–011                               | NOT STARTED | No release readiness claimed                                                                  | NOT STARTED                                      | Production approval required                                       |

## Owner decision register

| Decision                                          | Blocks                                                 | Needed to unblock                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Payment provider and refund/reconciliation policy | Live payment acceptance                                | Explicit provider approval, sandbox access, approved refund policy; real charges require separate authorization |
| Infrastructure billing and staging access         | Storage/recovery/provider acceptance where unavailable | Verify current access first; owner authorizes any paid resource creation                                        |
| Legal identity/support/privacy/incident contacts  | Public legal and operations acceptance                 | Confirm final identity/contact details and professional legal review; do not invent them                        |
| Current iPhone and Android devices                | Installed PWA acceptance                               | Real-device execution and recorded results                                                                      |
| Production promotion                              | Public launch                                          | Approve exact reviewed/tested release commit and deployment only after open gates close                         |

## Evidence records

Required synchronized records: architecture/security audit, UX audit, PWA acceptance matrix, payment integration report, API/native readiness, AppDeploy feasibility/native handoff, test evidence, Ponytail review log and final launch readiness, all in this directory. Agents supply evidence in their owned worktree; parent integrates and updates this ledger.

## Execution log

- Baseline repository/branch/worktree and active-agent checks completed. No existing user modifications found. Created integration branch; no deployment or production mutation performed.
- Read current deployment, QA, production runbook, post-launch, closeout, pricing and security records. Current source catalogue preserves mode-specific pricing; historical operational claims remain subject to verification.
- Roles A/B/C activated concurrently in managed worktrees on the baseline. A owns CI and a separate baseline formatting-only commit; B owns infrastructure/jobs; C owns pricing/provider and pricing-only Data Connect operations. D/E/F/G/H are queued as slots become available.
- Managed worktree registration was delayed, then completed; no agent edited until final paths were confirmed. Parent integration remains in the desktop checkout.
- B confirmed current production Storage HTTP 404 with two independent provider endpoints. `/api/health` reports configuration, not successful storage/database operations. Deadline route exists but is not scheduled.
- A reproduced the required formatting gate failing locally. Historical GitHub run `32796170692`, job `97647810109`, exists; retained job logs now return 404 and do not establish an exact historical root cause.
- Connected Vercel default account and available team expose no BondCircle project/domain alias. Current production Git SHA relationship remains BLOCKED pending access to the owning Vercel scope; no deployment inferred from historical documentation.
- AppDeploy current tools assessed read-only; separate prototype deferred. See APPDEPLOY_FEASIBILITY_AND_NATIVE_HANDOFF.md. No application deployed or account configuration changed.
