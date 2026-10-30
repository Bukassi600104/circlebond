# AppDeploy feasibility and native handoff

Assessment: 29 October 2026; pricing refreshed30 October2026. Recommendation: **DEFER** a separate prototype. **DO NOT USE** AppDeploy as a replacement for the existing production deployment.

## Evidence

- Inspected the connected AppDeploy MCP 2.11.0 capability instructions using `get_deploy_instructions` for a frontend-only React/Vite app. This was a read-only request; no application, deployment, database or secret was created.
- Supported template choices reported by the tool are `html-static`, `react-vite` and `nextjs-static`; architecture choices are frontend-only and frontend+backend. The React SPA guidance uses relative navigation or HashRouter.
- The existing application depends on Next.js server rendering, server-only Firebase Admin repositories, HTTP-only web sessions, route handlers and Data Connect. A static template is not evidence that those runtime requirements can be hosted unchanged.
- Account capability inspection reported a free plan. No credits were consumed by building or deploying an app. The [published pricing](https://appdeploy.ai/pricing), rechecked30 October2026, lists Free and Plus: standard USD20/month or USD200/year before applicable regional/tax differences. Free has100 daily/400 weekly/1000 monthly shared credits and built-in authentication for up to5 users; Plus has1000/5000/20000 shared credits and usage-based user charges. Hosting, deployments, storage and background activity consume account-wide credits; top-ups and optional automatic purchases are paid features. This account remains Free; no purchase or automatic top-up was authorized. Prototype costs must include continued Vercel/Firebase/API operation; no workload estimate was fabricated.
- No inspected tool offers native APK/IPA generation. An installable hosted web application does not establish native build capability.

## Why defer

The immediate deliverable is the existing web application and PWA. A second frontend would add authentication, cross-origin and invitation-routing work while production Storage, payment-provider approval and real-device acceptance remain open. It would not resolve those dependencies. No proof of concept was built or deployed.

## Conditions for a future staging-only experiment

1. Establish an approved staging deployment and disposable test accounts using the existing backend architecture. Do not reuse production service-account credentials or create a duplicate authoritative database.
2. Use a frontend-only shell. All pricing, eligibility, receipt permissions and membership transitions remain server-authorized by the versioned BondCircle API.
3. Verify Firebase ID-token exchange and refresh. Browser requests must obey an explicit staging-origin policy; do not loosen production CSRF or cookie protections for the prototype.
4. Test invitation/deep-link routing against the hosting route strategy, sign-in redirects, safe token storage, upload authorization and logout. Do not copy pricing/permission decisions into client code.
5. Compare the same organizer/member journey, mobile performance and recovery behavior with the existing PWA. Proceed only if a documented benefit exceeds the added maintenance and provider costs.
6. Obtain owner authorization before publishing any public prototype or using paid capacity. Confirm source export, operational limits, support, branding and hosting terms with the provider.

## Native handoff

The authoritative endpoint and gap inventory is [API/native readiness](BONDCIRCLE_API_NATIVE_READINESS.md). A future React Native/Expo client must use the same Firebase identities, versioned API, Data Connect data, pricing and server permission checks.

- Native clients send verified Firebase ID tokens to the API; they must not embed server credentials or reuse browser session/CSRF assumptions. Store refresh credentials through platform secure storage and revoke sessions appropriately.
- Preserve canonical HTTPS invitation links on `www.bondcircles.com`. Configure Android App Links and iOS Universal Links only after application IDs, signing identities and ownership associations are approved. Keep browser fallback and post-authentication destination validation.
- Upload receipt bytes through authenticated server validation. Keep private receipts behind viewer-bound authorization; do not turn Storage objects into public URLs for client convenience.
- Push registration must persist ownership, platform, token, timestamps and revocation state; acknowledging without persistence is not delivery readiness. Resolve provider delivery, token refresh, logout/account deletion and invalid-token cleanup before enabling push.
- Expo is a candidate, not a committed stack or an implementation started here. [Expo linking guidance](https://docs.expo.dev/linking/into-your-app/) recommends platform links for most applications. [Expo push setup](https://docs.expo.dev/push-notifications/push-notifications-setup/) requires platform credentials and device testing; iOS credentials require an Apple Developer account. These are separate owner/provider gates.
- Native signing, store accounts, privacy disclosures, device installation, background behavior, camera/file compatibility and release builds require their own acceptance. Native development does not block this web stabilization effort.

## Acceptance

Capability assessment: PENDING REVIEW. Prototype comparison and cross-origin implementation: NOT APPLICABLE to the current approved web stabilization scope. Native binaries: NOT STARTED. Production migration: NOT APPLICABLE (explicitly prohibited).
