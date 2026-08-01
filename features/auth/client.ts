"use client";

import {
  getRedirectResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithCustomToken,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import { getPreparedFirebaseAuth } from "@/lib/firebase/client";

let phoneConfirmation: ConfirmationResult | null = null;
const GOOGLE_REDIRECT_PENDING = "bondcircle-google-redirect-pending";

function withTimeout<T>(operation: Promise<T>, timeoutMs: number, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(message)), timeoutMs);
    }),
  ]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure session.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

export async function exchangeSession(user: User) {
  const [idToken, csrf] = await Promise.all([
    user.getIdToken(true),
    csrfToken(),
  ]);
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error("Unable to create a secure session.");
  const data = (await response.json()) as { needsLegalAcceptance?: boolean };
  await signOut(await getPreparedFirebaseAuth());
  return data;
}

function shouldUseGoogleRedirect() {
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = Boolean(
    (window.navigator as Navigator & { standalone?: boolean }).standalone,
  );
  const mobileUserAgent = /android|iphone|ipad|ipod/i.test(
    window.navigator.userAgent,
  );
  const ipadDesktopMode =
    window.navigator.platform === "MacIntel" &&
    window.navigator.maxTouchPoints > 1;
  return standalone || iosStandalone || mobileUserAgent || ipadDesktopMode;
}

export function hasPendingGoogleRedirect() {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(GOOGLE_REDIRECT_PENDING) === "true"
  );
}

export async function completeGoogleRedirect() {
  if (!hasPendingGoogleRedirect()) return null;
  try {
    return await withTimeout(
      (async () => {
        const result = await getRedirectResult(
          await getPreparedFirebaseAuth(),
        );
        if (!result) {
          throw new Error("Google sign-in did not return an account.");
        }
        return exchangeSession(result.user);
      })(),
      30_000,
      "Google sign-in timed out. Check your connection and try again.",
    );
  } finally {
    window.sessionStorage.removeItem(GOOGLE_REDIRECT_PENDING);
  }
}

export async function signInWithGoogle() {
  const auth = await getPreparedFirebaseAuth();
  const provider = new GoogleAuthProvider();
  if (
    shouldUseGoogleRedirect() &&
    auth.config.authDomain === window.location.host
  ) {
    window.sessionStorage.setItem(GOOGLE_REDIRECT_PENDING, "true");
    try {
      await signInWithRedirect(auth, provider);
      return { kind: "redirect" as const };
    } catch (error) {
      window.sessionStorage.removeItem(GOOGLE_REDIRECT_PENDING);
      throw error;
    }
  }

  const session = await withTimeout(
    (async () => {
      const result = await signInWithPopup(auth, provider);
      return exchangeSession(result.user);
    })(),
    30_000,
    "Google sign-in timed out. Check that pop-ups are allowed and try again.",
  );
  return { kind: "session" as const, session };
}

export async function startPhoneOtp(phone: string, containerId: string) {
  const auth = await getPreparedFirebaseAuth();
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
  phoneConfirmation = await signInWithPhoneNumber(auth, phone, verifier);
}

export async function confirmPhoneOtp(code: string) {
  if (!phoneConfirmation) throw new Error("Request a new phone code.");
  const result = await phoneConfirmation.confirm(code);
  phoneConfirmation = null;
  return exchangeSession(result.user);
}

export async function confirmEmailOtp(challengeId: string, code: string) {
  const response = await fetch("/api/auth/email-otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, code }),
  });
  const data = (await response.json()) as {
    customToken?: string;
    error?: string;
  };
  if (!response.ok || !data.customToken) {
    throw new Error(data.error ?? "The code could not be verified.");
  }
  const credential = await signInWithCustomToken(
    await getPreparedFirebaseAuth(),
    data.customToken,
  );
  return exchangeSession(credential.user);
}

export async function logoutSession() {
  const csrf = await csrfToken();
  const response = await fetch("/api/auth/session", {
    method: "DELETE",
    headers: { "X-CSRF-Token": csrf },
  });
  if (!response.ok) throw new Error("Unable to sign out.");
}

export async function recordLegalAcceptance(displayName?: string) {
  const csrf = await csrfToken();
  const response = await fetch("/api/auth/legal", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
    body: JSON.stringify({
      termsAccepted: true,
      privacyAccepted: true,
      displayName,
    }),
  });
  if (!response.ok) throw new Error("Unable to record policy acceptance.");
}
