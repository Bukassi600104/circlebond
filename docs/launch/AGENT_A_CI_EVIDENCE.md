# Agent A — CI and repository evidence

Verified: 29 October 2026 (Africa/Lagos). Baseline: `c0b1f913caeeffee546f79e2804f2583f2963edd`.
Branch: `codex/launch-ci`. Code acceptance: PENDING REVIEW by an independent Ponytail reviewer.

## Confirmed baseline failures

- [GitHub CI run 32796170692](https://github.com/Bukassi600104/circlebond/actions/runs/32796170692), job `97647810109`, is FAIL for the baseline commit. The authenticated log download returns `404 BlobNotFound`; step summaries are empty. The historical failing command cannot be reconstructed from those expired logs.
- Fresh `npm run format:check` in the desktop source checkout failed. Ten tracked files require actual formatting changes; additional warnings in that checkout include CRLF differences under `core.autocrlf=true`. The parent ledger was also checked because it was already present there.
- Fresh `node --test --test-reporter=spec tests/unit/*.test.mjs tests/integration/*.test.mjs` in the isolated worktree: **129 tests, 127 passed, 2 failed**, 0 skipped/cancelled, 31,996 ms. Both failures assert the old `authenticatePrincipal` source name although the current routes use `authenticateNativeRequest`:
  - `tests/unit/mobile-api-v1.test.mjs`: “Phase 1: /api/v1 endpoints provide mobile parity with authorization & redaction”.
  - `tests/unit/mobile-auth-foundation.test.mjs`: “BC-MOB-001: /api/v1/me route is exposed and returns user profile & preferences”.
- Those test files are assigned to Agent G for behavioral auth/API coverage. No production authentication behavior was reverted and no assertion was weakened to obtain a green result.

## Changes and checks

Formatting-only commit: `e7dc4d3752b2e80b1e0cd8695e0b55c0dcfdd7c0` (10 files; 47 insertions, 21 deletions). Prettier changed layout only in native route/auth files and two source-assertion test files. The full worktree Prettier check subsequently passed, as did `git diff --check`.

The tracked-file formatting command initially returned exit 2 only because `git ls-files` quoted Unicode specification filenames. A subsequent ordinary `prettier --check .` passed. The ignored specification files were not edited. Prettier was invoked through the already installed desktop dependency while the clean worktree install ran; this is not evidence that `npm ci` finished.

CI now explicitly selects Temurin Java 21. The [current Ubuntu 24.04 runner image](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md#java) defaults to Java 17; [Firebase CLI's emulator Java check](https://github.com/firebase/firebase-tools/blob/main/src/emulator/commandUtils.ts) requires Java 21. This is a verified configuration mismatch today, not a claim about the expired historical run's cause. The job has a 30-minute bound and read-only repository permissions. Existing lint, formatting, typecheck and complete `npm test` gates remain intact.

Focused checks of the updated workflow: Prettier PASS; `git diff --check` PASS. GitHub has not run this unpublished branch. Required branch-protection configuration was not modified or claimed verified.

## Install and remaining verification

`npm ci` was started from the clean isolated checkout using Node `v24.13.1` and npm `11.9.0`. It was still running at handoff (tool process session `82676`); the parent must capture its final exit/result. Registry metadata requests took approximately 283–398 seconds before package extraction progressed. Deprecation warnings alone are not a vulnerability assessment or an install failure. The lockfile was not changed.

The earlier desktop-source lint run was deliberately stopped to reduce host contention; it has no passing result. Full lint/typecheck/build/rendered tests and Auth/Data Connect emulator E2E are assigned to the parent's final integrated CI run after Agent G's test fixes. No emulator dataset or port was used by Agent A. Portable Java is available at the desktop source's `.tools/temurin-jre21/jdk-21.0.11+10-jre`; CI selects its own Java 21 installation.

Production dependency-audit acceptance remains with Agent F and final CI. No real environment files or service-account/private-key files were found in the tracked filename inventory; only the four documented environment templates were tracked. This filename check is not a comprehensive secret scan.

## Production relationship

The [GitHub Vercel status](https://vercel.com/bond-circle/circlebond/H9WBdHwjC4dVmW1T2HwexZ6E5pBt) for the baseline SHA reports success. It references team slug `bond-circle`, project `circlebond`, deployment `H9WBdHwjC4dVmW1T2HwexZ6E5pBt`. It does **not** prove that `www.bondcircles.com` currently serves that build. Alias lookup in the default connected Vercel scope returned no matches; the parent is reconciling production access separately. No deployment, push, provider change, production data write or charge occurred.

Overall CI acceptance remains FAIL until the two confirmed baseline test failures are fixed and the exact integrated release candidate passes all required gates and independent review.

## Final security-lock clean install — 30 October 2026

**PASS**: `npm ci --prefer-offline --no-audit` completed with exit code 0 at `2026-10-30T00:23:29.9118764Z`, adding 1,085 packages in 24 minutes. Lifecycle scripts were enabled. Task-local fetch timeout was 30 seconds with one retry; global npm settings were unchanged. The isolated worktree had a real `node_modules` directory, not a junction to the desktop checkout. No competing install ran.

The lockfile SHA-256 before and after installation was `12cb493a8918761ed4c9af7ac7c8f93b42786953efe394f14d19baf16ccb5e38`. Installed package metadata independently confirmed Next.js `16.4.3`, matching `eslint-config-next`, Sharp `0.35.5`, Nodemailer `10.1.4` and TypeScript `5.9.3`. The earlier successful old-lock install is superseded.

Persisted raw evidence: `TEMP/bondcircle-final-rc-install-status.json` and `TEMP/bondcircle-final-rc-install.log`. The status records the exact command, exit code, completion timestamp, enabled scripts and lock hash. Preserve these files before worktree cleanup.

The `--no-audit` install flag did not waive the separate audit gate. The exact-lock production/full-tree audits and remaining moderate findings are documented in `AGENT_A_DEPENDENCY_SECURITY.md`; both audit commands exited zero at the high-severity threshold, with zero critical/high findings. This install result alone does not accept the final application build, native image processing, SMTP provider, browser journeys or launch. Those integrated checks belong to independent Agent H and the central ledger.
