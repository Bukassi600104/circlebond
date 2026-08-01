import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Milestone 3 includes every locked authentication screen", async () => {
  const screens = [
    "app/page.tsx",
    "app/onboarding/page.tsx",
    "app/sign-in/page.tsx",
    "app/register/page.tsx",
    "app/verify/page.tsx",
    "app/auth/error/page.tsx",
    "app/account-recovery/page.tsx",
    "app/legal/terms/page.tsx",
    "app/legal/privacy/page.tsx",
  ];
  await Promise.all(screens.map((screen) => source(screen)));
});

test("OTP controls encode expiry, attempt limits, normalization, and rate limiting", async () => {
  const security = await source("server/auth/security.ts");
  assert.match(security, /OTP_TTL_MS = 10 \* 60 \* 1000/);
  assert.match(security, /OTP_MAX_ATTEMPTS = 5/);
  assert.match(security, /timingSafeEqual|createHash/);
  assert.match(security, /normalizeEmail/);
  assert.match(security, /normalizePhone/);
  assert.match(security, /enforceRateLimit/);
  assert.match(security, /aes-256-gcm/);
  assert.match(security, /OTP_ATTEMPTS_COOKIE/);
});

test("official logo assets replace the temporary reconstructed mark", async () => {
  const brand = await source("components/layout/index.tsx");
  assert.match(brand, /bond-circle-mark\.png/);
  assert.match(brand, /bond-circle-wordmark\.png/);
  assert.doesNotMatch(brand, /<i\s*\/>|<Gift/);
  await Promise.all([
    source("public/brand/bond-circle-mark.png"),
    source("public/brand/bond-circle-wordmark.png"),
    source("public/brand/favicon.png"),
  ]);
});

test("server sessions are HTTP-only, CSRF protected, revocable, and enforced", async () => {
  const session = await source("server/auth/index.ts");
  const route = await source("app/api/auth/session/route.ts");
  const request = await source("server/auth/request.ts");
  const account = await source("app/account/page.tsx");

  assert.match(session, /httpOnly: true/);
  assert.match(session, /sameSite: "strict"/);
  assert.match(session, /verifySessionCookie\(session, true\)/);
  assert.match(route, /revokeRefreshTokens/);
  assert.match(request, /x-csrf-token/);
  assert.match(request, /timingSafeEqual/);
  assert.match(account, /requireSession/);
});

test("registration records both legal timestamps and excludes prohibited fields", async () => {
  const schema = await source("dataconnect/schema/schema.gql");
  const registration = await source("features/auth/components.tsx");
  assert.match(schema, /termsAcceptedAt: Timestamp/);
  assert.match(schema, /privacyAcceptedAt: Timestamp/);
  assert.match(registration, /Display name/);
  assert.match(registration, /profile image \(optional\)/i);
  assert.doesNotMatch(
    registration,
    /gender|precise location|bank details|card details/i,
  );
});

test("login, logout, verification, and recovery audit events are defined", async () => {
  const audit = await source("server/audit/index.ts");
  for (const event of ["login", "logout", "verification", "recovery"]) {
    assert.match(audit, new RegExp(`"${event}"`));
  }
});

test("desktop authentication layout stays aligned within one viewport", async () => {
  const shell = await source("components/auth/AuthShell.tsx");
  const styles = await source("app/auth.css");

  assert.match(shell, /bc-auth-panel__brand/);
  assert.match(shell, /bc-auth-story__art/);
  assert.match(shell, /auth-community\.png/);
  await source("public/illustrations/auth-community.png");
  assert.match(styles, /\.bc-auth-page[\s\S]*height: 100svh/);
  assert.match(styles, /\.bc-auth-story[\s\S]*height: 100svh/);
  assert.match(styles, /\.bc-auth-panel[\s\S]*height: 100svh/);
  assert.match(styles, /\.bc-auth-panel[\s\S]*overflow-y: auto/);
});

test("mobile authentication is centered inside an app-like bounded frame", async () => {
  const styles = await source("app/auth.css");
  const mobileRules = styles.slice(
    styles.indexOf("@media (max-width: 55.99rem)"),
    styles.indexOf("@media (min-width: 56rem)"),
  );

  assert.match(mobileRules, /\.bc-auth-panel[\s\S]*max-width:\s*34rem/);
  assert.match(mobileRules, /\.bc-auth-panel[\s\S]*margin-inline:\s*auto/);
  assert.match(
    mobileRules,
    /\.bc-auth-card[\s\S]*border-radius:[\s\S]*background:\s*var\(--color-white\)/,
  );
  assert.match(mobileRules, /\.bc-auth-card h2[\s\S]*clamp\(/);
  assert.match(
    mobileRules,
    /\.bc-auth-card input:not\(\[type="checkbox"\]\):not\(\[type="file"\]\)[\s\S]*font-size:\s*16px/,
  );
  assert.match(mobileRules, /overflow-x:\s*clip/);
});

test("phone authentication supplies a country selector and normalized E.164 value", async () => {
  const registration = await source("features/auth/components.tsx");
  const forms = await source("components/forms/index.tsx");

  assert.match(registration, /CountryPhoneInput/);
  assert.match(forms, /react-phone-number-input/);
  assert.match(forms, /defaultCountry="NG"/);
});

test("email OTP delivery is honest and validates before challenge creation", async () => {
  const registration = await source("features/auth/components.tsx");
  const route = await source("app/api/auth/email-otp/request/route.ts");
  const security = await source("server/auth/security.ts");

  assert.match(registration, /No email was sent\s+in this local preview/);
  assert.match(route, /sendEmailOtp/);
  assert.match(security, /validateEmailAddress/);
  assert.match(security, /resolveMx/);
});

test("registration legal review uses an in-place modal and preserves form state", async () => {
  const registration = await source("features/auth/components.tsx");
  const legal = await source("components/legal/LegalModal.tsx");
  const styles = await source("app/auth.css");

  assert.match(registration, /LegalModal/);
  assert.match(registration, /setLegalDocument/);
  assert.match(registration, /onAgree/);
  assert.doesNotMatch(registration, /href="\/legal\/(terms|privacy)"/);
  assert.match(legal, /role="dialog"/);
  assert.match(legal, /aria-modal="true"/);
  assert.match(legal, /bc-legal-modal__dialog/);
  assert.match(styles, /\.bc-legal-modal[\s\S]*backdrop-filter: blur/);
  assert.match(
    styles,
    /\.bc-legal-modal__dialog[\s\S]*height: min\(78svh, 42rem\)/,
  );
  assert.match(
    styles,
    /\.bc-legal-modal \.bc-button[\s\S]*min-height: 2\.25rem/,
  );
  assert.match(
    styles,
    /\.bc-legal-modal__dialog > article[\s\S]*padding: var\(--space-4\) var\(--space-6\)/,
  );
  assert.doesNotMatch(styles, /--space-5/);
});

test("registration density and illustration scale match the desktop composition", async () => {
  const styles = await source("app/auth.css");

  assert.match(styles, /bc-auth-story__art img[\s\S]*44rem/);
  assert.match(
    styles,
    /bc-auth-page--registration \.bc-auth-check[\s\S]*min-height: 0/,
  );
  assert.match(
    styles,
    /bc-auth-page--registration \.bc-upload label[\s\S]*min-height: 4rem/,
  );
});

test("valid OTPs never surface backend outages as invalid codes", async () => {
  const verifyRoute = await source("app/api/auth/email-otp/verify/route.ts");
  const developmentRunner = await source("scripts/run-development.mjs");
  const packageJson = await source("package.json");

  assert.match(
    verifyRoute,
    /Authentication service is temporarily unavailable/,
  );
  assert.match(verifyRoute, /status: 503/);
  assert.match(developmentRunner, /emulators:start/);
  assert.match(developmentRunner, /waitForPort/);
  assert.match(packageJson, /scripts\/run-development\.mjs/);
});

test("local sign-in restores an emulator user from persisted Firebase data", async () => {
  const verifyRoute = await source("app/api/auth/email-otp/verify/route.ts");
  const userRepository = await source("server/repositories/users.ts");
  const operations = await source("dataconnect/bondcircle/queries.gql");

  assert.match(verifyRoute, /FIREBASE_AUTH_EMULATOR_HOST/);
  assert.match(verifyRoute, /findPersistedUserByEmail/);
  assert.match(verifyRoute, /uid: persisted\.id/);
  assert.match(
    verifyRoute,
    /!persisted\s*&&\s*!process\.env\.FIREBASE_AUTH_EMULATOR_HOST/,
  );
  assert.match(userRepository, /findPersistedUserByEmail/);
  assert.match(
    operations,
    /query FindUserByEmail[\s\S]*termsAcceptedAt[\s\S]*privacyAcceptedAt/,
  );
});

test("email OTP verification resends in place, counts down, and submits on digit six", async () => {
  const components = await source("features/auth/components.tsx");
  const requestRoute = await source("app/api/auth/email-otp/request/route.ts");
  const styles = await source("app/auth.css");
  const otpComponent = components.slice(
    components.indexOf("export function OtpVerificationForm"),
    components.indexOf("export function RecoveryForm"),
  );

  assert.match(requestRoute, /expiresAt: challenge\.expiresAt/);
  assert.match(otpComponent, /Code expires in/);
  assert.match(otpComponent, /async function resend/);
  assert.match(otpComponent, /setActiveChallengeId/);
  assert.match(otpComponent, /Request a new code/);
  assert.doesNotMatch(
    otpComponent,
    /<Link[^>]*>[\s\S]*Request a new code[\s\S]*<\/Link>/,
  );
  assert.match(otpComponent, /nextDigits\.every\(Boolean\)/);
  assert.match(otpComponent, /Verifying code/);
  assert.doesNotMatch(otpComponent, /Verify &amp; continue/);
  assert.match(otpComponent, /window\.location\.replace/);
  assert.match(styles, /\.bc-auth-story__copy\s*\{[\s\S]*text-align:\s*center/);
});

test("authentication provider requests cannot leave the sign-in form spinning forever", async () => {
  const client = await source("features/auth/client.ts");
  const components = await source("features/auth/components.tsx");
  const email = await source("server/auth/email.ts");

  assert.match(client, /signInWithPopup/);
  assert.match(client, /Promise\.race/);
  assert.match(client, /Google sign-in timed out/);
  assert.match(components, /AbortController/);
  assert.match(components, /Email request timed out/);
  assert.match(email, /connectionTimeout/);
  assert.match(email, /greetingTimeout/);
  assert.match(email, /socketTimeout/);
});

test("mobile Google sign-in redirects through the production origin and reports its own loading state", async () => {
  const client = await source("features/auth/client.ts");
  const components = await source("features/auth/components.tsx");
  const firebaseClient = await source("lib/firebase/client.ts");
  const nextConfig = await source("next.config.ts");

  assert.match(client, /signInWithRedirect/);
  assert.match(client, /getRedirectResult/);
  assert.match(client, /display-mode:\s*standalone/);
  assert.match(client, /sessionStorage/);
  assert.match(firebaseClient, /window\.location\.host/);
  assert.match(nextConfig, /\/__\/auth\/:path\*/);
  assert.match(components, /loading=\{contactLoading\}/);
  assert.match(components, /loading=\{googleLoading\}/);
});

test("Google redirects retain state, finish within a bound, and leave the Firebase helper frameable", async () => {
  const client = await source("features/auth/client.ts");
  const firebaseClient = await source("lib/firebase/client.ts");
  const nextConfig = await source("next.config.ts");

  assert.match(firebaseClient, /browserSessionPersistence/);
  assert.match(firebaseClient, /getPreparedFirebaseAuth/);
  assert.doesNotMatch(firebaseClient, /inMemoryPersistence/);
  assert.match(
    client,
    /withTimeout\([\s\S]*getRedirectResult[\s\S]*Google sign-in timed out/,
  );
  assert.match(nextConfig, /\/__\/auth\/:path\*/);
  assert.match(nextConfig, /\(\?!__\/auth\)/);
  assert.match(nextConfig, /X-Frame-Options[\s\S]*DENY/);
  assert.doesNotMatch(
    nextConfig,
    /source:\s*"\/__\/auth\/:path\*"[\s\S]{0,80}headers:/,
  );
});

test("registration offers Google sign-up through the same secure completion flow", async () => {
  const components = await source("features/auth/components.tsx");
  const registration = components.slice(
    components.indexOf("export function RegistrationForm"),
    components.indexOf("export function OtpVerificationForm"),
  );

  assert.match(registration, /useGoogleAuthentication/);
  assert.match(registration, /Sign up with Google/);
  assert.match(registration, /googleLoading/);
  assert.match(registration, /disabled=\{loading\}/);
});

test("email OTP inputs stay inside the mobile viewport without iOS focus zoom", async () => {
  const componentStyles = await source("app/components.css");
  const authStyles = await source("app/auth.css");
  const smallScreenRules = authStyles.slice(
    authStyles.indexOf("@media (max-width: 24rem)"),
  );

  assert.match(
    componentStyles,
    /\.bc-otp input\s*\{[\s\S]*font-size:\s*16px[\s\S]*max-width:\s*100%/,
  );
  assert.match(smallScreenRules, /\.bc-otp input\s*\{[\s\S]*min-width:\s*0/);
  assert.doesNotMatch(smallScreenRules, /min-width:\s*2\.5rem/);
});

test("Firebase Admin stays on the Vercel-compatible dependency line", async () => {
  const packageJson = JSON.parse(await source("package.json"));

  assert.equal(packageJson.dependencies["firebase-admin"], "13.6.0");
});

test("onboarding uses the supplied artwork and keeps its composition centered", async () => {
  const onboarding = await source("app/onboarding/page.tsx");
  const styles = await source("app/auth.css");

  assert.match(onboarding, /\/images\/onboarding\/group-gifts\.jpg/);
  assert.match(onboarding, /\/images\/onboarding\/aso-ebi\.jpg/);
  assert.match(onboarding, /\/images\/onboarding\/support\.jpg/);
  assert.match(styles, /\.bc-onboarding header[\s\S]*position:\s*relative/);
  assert.match(
    styles,
    /\.bc-onboarding header > button[\s\S]*position:\s*absolute[\s\S]*right:\s*0/,
  );
  assert.match(
    styles,
    /\.bc-onboarding section[\s\S]*text-align:\s*center[\s\S]*justify-items:\s*center/,
  );
  assert.match(
    styles,
    /\.bc-onboarding footer[\s\S]*justify-content:\s*center/,
  );
});
