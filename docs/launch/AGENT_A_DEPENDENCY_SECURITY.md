# Dependency security remediation

Verified 30 October 2026 (Africa/Lagos). Implementation: **PENDING REVIEW**. No production deployment, real email delivery, payment, secret change or customer-data write occurred.

## Current evidence, not historical acceptance

The fresh production-only audit supplied by the parent reported **1 critical, 11 high and 8 moderate package findings**. Historical clean-audit claims no longer described the locked dependency tree. Counts below describe npm package findings, not incidents or individual advisories.

| Audit scope                                                      | Current critical | Current high | Current moderate | Result |
| ---------------------------------------------------------------- | ---------------- | ------------ | ---------------- | ------ |
| Exact updated lockfile, production dependencies                  | 0                | 0            | 8                | PASS   |
| Exact updated lockfile, complete development and production tree | 0                | 0            | 15               | PASS   |

Both final commands exited zero without an audit error: `npm audit --package-lock-only --omit=dev --audit-level=high --json` at `2026-10-29T23:44:53Z`, and `npm audit --package-lock-only --audit-level=high --json` at `2026-10-29T23:43:12Z`. Moderate findings remain visible in both reports; this is not a claim of zero vulnerabilities or complete security acceptance.

Audited lockfile SHA-256: `12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38`.

## Minimal changes

- Next.js `16.2.12` → `16.4.3`, with matching `eslint-config-next`. The [image-optimization advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw) applies to glibc Linux; Windows-only reachability arguments would not close it. [Next.js 16.4.3](https://github.com/vercel/next.js/releases/tag/v16.4.3) remains on the existing major.
- Sharp and its existing override `0.35.3` → [0.35.5](https://github.com/lovell/sharp/releases/tag/v0.35.5), addressing affected bundled image libraries.
- Nodemailer → [10.1.4](https://github.com/nodemailer/nodemailer/releases/tag/v10.1.4). [Version 10](https://github.com/nodemailer/nodemailer/releases/tag/v10.0.0) requires Node 20+, retains ES module/CommonJS support and supplies its own types. Removed the redundant `@types/nodemailer` dependency.
- Declared Node floor corrected to `22.19.0`, already required by the locked development `undici` branch. CI's Node 22 selection and the current Node 24 host satisfy it. Parent must synchronize the README/deployment prerequisites.
- Compatible transitive patch/minor updates address multipart parsing, signature verification, identifier generation, source maps, development HTTP parsing, MCP, schema validation and IP/proxy handling. Firebase Admin remains `13.6.0`; no Firebase major migration or backend replacement occurred.
- A single `@grpc/grpc-js: 1.14.5` override is necessary because even current upstream Firestore pins the vulnerable `~1.9.0` branch. [The patched gRPC release](https://github.com/grpc/grpc-node/releases/tag/@grpc%2Fgrpc-js@1.14.5) fixes the cited authentication issue. All locked gRPC copies now resolve to `1.14.5`.
- A scoped `get-uri → basic-ftp: 6.2.3` override closes the remaining high development-tool chain. Even current upstream `get-uri` still requests basic-ftp 5; a compatible range update cannot close it. [The version 6 behavior change](https://github.com/patrickjuchli/basic-ftp/releases/tag/v6.0.0) denies separate data-transfer hosts by default. [6.2.3](https://github.com/patrickjuchli/basic-ftp/releases/tag/v6.2.3) also fixes password/error handling. No BondCircle application flow uses FTP. Revisit this scoped override when upstream adopts the patched major; no real FTP/proxy integration was exercised.

No new application dependency, feature, price, database or provider was added. `npm audit fix --force` was not used. The two necessary overrides and native/SMTP changes require independent review and final regression checks.

## Verification and known integration work

Metadata updates used `npm update <affected packages> --package-lock-only --no-audit`, with task-local 30-second fetch timeout and one retry. The first offline-preferred resolution returned `ETARGET` from stale cached metadata; refreshing metadata with `--prefer-online` resolved the published version. No global npm configuration changed.

An integrity-checked Nodemailer 10.1.4 package was tested against the existing loopback-only SMTP sink. Exact recipient and delivered message content assertions passed; no mail left the machine. This was an isolated compatibility check, not a complete application-install or production-delivery result.

The real Nodemailer 10 bundled types exposed an existing caller error: `createTransport(smtpUrl, { connectionTimeout, ... })` passes transport options as message defaults. TypeScript correctly rejects it. The parent must move those timeout options beside `url` in the transport configuration and rerun typecheck and the production-mode OTP/SMTP regression. This required caller correction is **FAIL** until verified; it must not be hidden by restoring the old type package or weakening type checks.

An integrity-checked basic-ftp 6.2.3 package retains the `Client` methods used by `get-uri` (`access`, `lastMod`, `list`, `downloadTo`, `close`). An assert-based check confirmed those methods and the default denial of separate transfer hosts. This checks API compatibility and policy, not a real FTP transfer.

The previous lockfile's clean `npm ci --prefer-offline --no-audit` completed successfully: 1,086 packages, exit zero, scripts enabled, at `2026-10-29T23:27:23Z` after 32 minutes on this Windows host. It completed before a requested cancellation, so no process was stopped or cancellation claimed. That install is superseded by the security lockfile and **does not** satisfy the final release-candidate clean-install gate.

One final clean install against the updated lockfile, full format/lint/typecheck/build/unit/integration/emulator/browser checks, and non-author Ponytail review remain required after source integration freezes. Sharp's native image decode/re-encode and Next.js rendering must be retested using the actual new installed packages.

## Remaining moderate risk

The eight production findings derive from the existing `uuid`/Google/Firebase dependency chain. The advisory affects caller-supplied buffers in v3/v5/v6. BondCircle does not import `uuid`; inspected `teeny-request`, `gaxios` and Google GAX consumers call v4 without a buffer. This is a bounded reachability review, not proof about every possible SDK path. A forced Firebase Admin major upgrade was deliberately avoided.

Additional full-tree moderate findings concern development-tool dependencies, including OpenTelemetry, CSV/JSON processing and query-string parsing. Their upstream ranges prevent some compatible fixes. Preserve the raw reports and assess these in independent review; do not label the complete tree vulnerability-free or silently upgrade unrelated majors.

Raw local evidence: `TEMP/bondcircle-security-audit-final-production.json`, `TEMP/bondcircle-security-audit-final-full.json`, matching `*-status.json`, metadata update logs, and `TEMP/bondcircle-ci-clean-status.json`/`.log` for the superseded install. These local records must be retained with the release evidence before deleting or archiving the worktree. The central remediation ledger remains authoritative for release acceptance.
