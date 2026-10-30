# Independent Ponytail review — dependencies and upload transport

30 October 2026 (Africa/Lagos). Reviewer: Agent H, independent of Agents A and E. Actual invocation: installed `ponytail:ponytail-review` skill, full review mode; no external Ponytail service or fabricated approval.

| Reviewed implementation                                                 | Bounded decision | Acceptance boundary                                                                                                                                                                                |
| ----------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A dependency security commit `d3f41a2b2dddd14b52381630286f1d3c8b2d3570` | PASS             | Source/lockfile/audit-evidence review and isolated SMTP/FTP compatibility checks. Final updated-lock install, integrated CI and production-platform acceptance remain PENDING REVIEW.              |
| E upload/orientation commit `ac8f1b3ef7fcbbcbd1ed5ada53f8e46f9a94a79e`  | PASS             | Measured multipart preparation, five callers, negative recovery paths and unrestricted manifest orientation. Universal dense-image transport, physical devices and staging Storage remain BLOCKED. |

These decisions authorize engineering integration within the existing task. They do not constitute a web, security, payment, PWA or overall public-launch PASS. No product source was authored by this reviewer in either reviewed change.

## A — dependency evidence and compatibility

Independently read the complete package/lockfile changes, connected SMTP callers, raw audit reports and their completion records. The exact committed lockfile SHA-256 is `12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38`, matching the audited artifact. Root dependency and development-dependency declarations match `package.json`. Next and its ESLint configuration both resolve `16.4.3`; Sharp resolves `0.35.5`; Nodemailer resolves `10.1.4` with redundant external types removed. All locked gRPC copies resolve `1.14.5`, and the scoped get-uri dependency resolves basic-ftp `6.2.3`. No unexpected registry host or new backend/provider appeared.

The retained raw reports show genuine exit-zero high-severity-threshold audits: production at `2026-10-29T23:44:53Z` has **0 critical, 0 high, 8 moderate**; full tree at `2026-10-29T23:43:12Z` has **0 critical, 0 high, 15 moderate**. H inspected these artifacts; H did not rerun a fresh network audit. Do not translate this into zero vulnerabilities. Existing raw evidence remains `TEMP/bondcircle-security-audit-final-{production,full}.json` and matching `*-status.json`.

Independent bounded command: `node tmp/h-dependency-check.mjs`, Node `v24.13.1`, exit zero. The ignored reviewer script checks the existing package archives against integrity values in the exact committed lockfile, loads the actual new packages, and verifies:

- The current parent-tree `server/auth/email.ts` runs in production mode through **actual Nodemailer 10.1.4** into the loopback-only SMTP sink. Recipient and content assertions pass without printing the synthetic code. URL and all three timeout options are asserted on the actual transport configuration.
- The basic-ftp 6 client retains every method used by get-uri and denies separate transfer hosts by default. No FTP server, proxy or transfer was contacted.
- Both current parent-tree SMTP modules compile against Nodemailer 10 bundled declarations with **zero TypeScript diagnostics**. The parent has corrected the former URL-plus-message-defaults misuse; that correction was uncommitted parent code at review time and must be included in the integrated candidate.

[Nodemailer 10 release notes](https://github.com/nodemailer/nodemailer/releases/tag/v10.0.0) confirm Node 20+, bundled TypeScript migration and URL/object transport behavior. The declared Node `22.19.0` floor satisfies the actual intended 64-bit Windows/Linux runtime dependencies, including undici's floor. [basic-ftp 6](https://github.com/patrickjuchli/basic-ftp/releases/tag/v6.0.0) documents the intentional security default change. Its override remains limited to the existing get-uri chain; no application FTP functionality was found.

The production moderate chain originates in the [uuid buffer-bounds advisory](https://github.com/uuidjs/uuid/security/advisories/GHSA-w5hq-g745-h8pq), affecting v3/v5/v6 with caller-supplied output buffers. Independently inspected installed gaxios and teeny-request consumers call v4 without a buffer; application source does not import uuid. This supports bounded risk treatment while avoiding an untested Firebase Admin major upgrade. It does not prove every possible SDK path unreachable. Development-only moderate parsing/telemetry findings remain recorded in A's authoritative dependency report and raw audit. No new must-fix defect was found in this bounded patch review.

Not checked: final clean install on the new lock, complete application types/lint/build/tests, new Sharp native decoding on the final install, Linux/Vercel rendering, real SMTP credentials/delivery, all gRPC consumers and real FTP/proxy integrations. The older successful clean install belongs to a superseded lock and cannot close these gates. Risk: **medium**, due to native/runtime changes and the documented remaining moderate findings.

## E — upload transport, callers and orientation

Read `lib/image-upload.ts`, all five changed submit handlers, unchanged authoritative Sharp validation, tests and evidence. The selected original allowance stays **5,000,000 bytes / 25 million pixels**. Small images stay byte-identical; only an oversized complete multipart body triggers fixed-quality, full-resolution WebP preparation. Fields, duplicate fields and selected-file state are retained. The exact measured Blob and original case-sensitive Content-Type header are sent together. Server MIME/decode/metadata validation, authorization and private storage remain authoritative. Preparation failure occurs before CSRF retrieval or upload and uses existing error states.

Independently extracted the exact committed helper, browser tests and five callers into ignored `tmp/h-review-upload/`; primary product files were not changed. Command: `node --test --test-reporter=tap tmp/h-review-upload/tests/browser/image-upload.test.mjs`, with bundled Playwright available through `NODE_PATH` and `BONDCIRCLE_BROWSER_EXECUTABLE` set to existing desktop Edge. **9 tests PASS, 0 failed, 0 skipped**, exit zero.

- Native browser decoding/Canvas/FormData/Request checks confirm 4,913,387-byte PNG → **2,323,458-byte complete multipart**; the sample multiple-image request shrinks from **4,881,137 to 4,027,740 bytes**. Sent byte counts match measured byte counts.
- Small-file bytes, duplicate strings, tier JSON, dimensions and alpha are preserved. A real JPEG padded to exactly **5,000,000 bytes** retains EXIF-correct 60 × 90 orientation after preparation. VP8, VP8X-alpha and VP8L fixtures decode correctly.
- Malformed, oversized, MIME-mismatched, SVG, HEIC and excessive-pixel inputs fail. The five actual submit functions make zero CSRF/upload requests on preparation failure and retain their form selections.
- An unfit dense five-image aggregate fails explicitly without mutating originals. No file is dropped, success invented or more aggressive quality reduction introduced.

Independently inspected the generated before/after synthetic detail screenshot: the sample text remains readable. This is one controlled example, not an OCR guarantee or approval of every receipt. Actual manifest execution from the reviewed commit returns `orientation: any`, `display: standalone`, `name: BondCircle`, closing the unnecessary portrait-only restriction at source level. E's reported landscape worker fixture remains author evidence; H did not rerun that fixture in this review.

The first reviewer browser launch failed before any test assertion because Playwright's default Chromium executable was absent. Rerunning the unchanged fixture with existing Edge produced the nine passes above. No browser, dependency, build, emulator or paid resource was installed. H's separate public-browser harness now accepts the same explicit existing-executable setting.

Not checked: integrated application browser journeys, final dependency-tree CI, genuine Storage upload/retrieval/replacement/deletion, Safari encoder behavior, physical iPhone/Android, low-memory devices, interrupted real transfers and every dense maximum-size image collection. The remaining aggregate limit is **BLOCKED** pending an approved transport strategy and staging/security verification, as E's report states; this patch does not silently reduce the 5 MB input allowance or claim universal transport support. Risk: **medium**, concentrated in browser memory/encoder variation and that explicit transport limitation.

No production deployment, live data operation, real financial transaction or external email occurred.
