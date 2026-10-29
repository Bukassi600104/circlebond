# Independent Ponytail review — offline navigation

What this change does: Parent commit `dd24cab8f09e21f7630c5abe98c010c91466943b` adds a generic offline page and uses it only when a same-origin document navigation fails. Installation assets stay available offline; private document and API responses are never stored by this worker.

Reviewer: Agent E, who did not author this change. Mechanism: installed `ponytail-review` skill, Ponytail plugin 5.3.3; this is an independent skill-based code review, not an external approval service.

## Decision

**PASS for the bounded offline-worker change.** No actionable defect found. This does not approve overall PWA installation or production readiness.

Read the complete diff, worker lifecycle, offline HTML, existing installation component, root layout, manifest, security/cache headers and relevant README boundaries. Reviewed this as a public multi-user application; each browser profile has its own origin-scoped cache, and no customer data belongs in that cache.

Independently ran `node --test tests/unit/pwa-offline.test.mjs tests/unit/pwa.test.mjs`: **11 passed, zero failed**. Six tests execute the actual worker with controlled network/cache APIs; five are existing source contracts, not device tests.

## Actual browser verification

Ran the actual worker, manifest and public assets in an isolated loopback fixture using installed desktop Chromium through bundled Playwright. The fixture served an explicitly synthetic private page and API response; it did not authenticate to Firebase or read customer data.

Verified:

- installation caches exactly the manifest, three public icons and generic offline page;
- navigating to a synthetic private account page and fetching an API response adds neither to Cache Storage;
- network loss produces the generic offline page at the original account URL, without replaying the private fixture;
- an offline API fetch fails instead of returning a successful offline document;
- the offline page fits a 390-pixel viewport without horizontal overflow;
- Retry reloads the original route after the network returns;
- a synthetic next worker revision activates and deletes obsolete BondCircle caches after lifecycle completion; and
- an unrelated origin cache survives cleanup.

Final browser run: **PASS**, exit 0. Cache contents after the synthetic update were `unrelated-fixture` and `bondcircle-shell-v3`. The test awaited worker activation; observing an installation cache before activation is not evidence of cleanup failure.

Local reproduction harness: `tmp/pwa-browser-check.cjs` in Agent E's worktree. Screenshot: [offline fallback at 390 pixels](evidence/pwa-offline-390.png). This is a desktop viewport simulation, not a physical phone.

## Limits

Physical iPhone/Android installation, standalone authentication, app switching, uploads, real invitation navigation and hosting deployment remain **BLOCKED** or pending the integrated candidate. No private record, payment, receipt or authentication response was cached or represented as submitted successfully. Agent E's separate installation-component changes require another non-author review.

Verdict: Ship this bounded change after integrated CI. Keep device and complete PWA acceptance open.

Not checked: real mobile devices, production session persistence, provider operations, or the final integrated application build.
