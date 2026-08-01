"use client";

import {
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { LegalModal } from "@/components/legal/LegalModal";
import type { LegalDocumentType } from "@/components/legal/legalDocuments";
import {
  CountryPhoneInput,
  EmailInput,
  TextInput,
  UploadField,
} from "@/components/forms";
import {
  completeGoogleRedirect,
  confirmEmailOtp,
  confirmPhoneOtp,
  hasPendingGoogleRedirect,
  logoutSession,
  recordLegalAcceptance,
  signInWithGoogle,
  startPhoneOtp,
} from "./client";

type Channel = "email" | "phone";

function safeNextPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

function friendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("popup-closed")) return "Google sign-in was cancelled.";
  if (message.includes("popup-blocked")) {
    return "Google sign-in was blocked by the browser. Allow pop-ups and try again.";
  }
  if (message.includes("operation-not-allowed")) {
    return "Google sign-in is not enabled for this BondCircle project yet.";
  }
  if (message.includes("Google sign-in timed out")) {
    return "Google sign-in took too long. Check your connection and try again.";
  }
  if (message.includes("too-many-requests")) {
    return "Too many attempts. Please wait and try again.";
  }
  if (message.includes("invalid-phone")) {
    return "Enter a valid phone number with its country code.";
  }
  return message || "Something went wrong. Please try again.";
}

function ChannelTabs({
  channel,
  onChange,
}: {
  channel: Channel;
  onChange: (channel: Channel) => void;
}) {
  return (
    <div className="bc-auth-tabs" role="tablist" aria-label="Contact method">
      <button
        type="button"
        role="tab"
        aria-selected={channel === "email"}
        onClick={() => onChange("email")}
      >
        Email
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={channel === "phone"}
        onClick={() => onChange("phone")}
      >
        Phone
      </button>
    </div>
  );
}

async function requestEmailOtp(input: Record<string, unknown>) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20_000);
  let response: Response;
  try {
    response = await fetch("/api/auth/email-otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Email request timed out. Check your connection and try again.",
      );
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
  const data = (await response.json()) as {
    challengeId?: string;
    developmentCode?: string;
    expiresAt?: number;
    error?: string;
  };
  if (!response.ok || !data.challengeId) {
    throw new Error(data.error ?? "Unable to send a verification code.");
  }
  if (data.developmentCode) {
    sessionStorage.setItem(
      `bc-development-code:${data.challengeId}`,
      data.developmentCode,
    );
  }
  const expiresAt = data.expiresAt ?? Date.now() + 10 * 60 * 1000;
  sessionStorage.setItem(
    `bc-otp-request:${data.challengeId}`,
    JSON.stringify(input),
  );
  sessionStorage.setItem(
    `bc-otp-expiry:${data.challengeId}`,
    String(expiresAt),
  );
  return {
    challengeId: data.challengeId,
    developmentCode: data.developmentCode ?? "",
    expiresAt,
  };
}

function useGoogleAuthentication(nextPath: string) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  const continueAfterGoogle = useCallback(
    (session: { needsLegalAcceptance?: boolean }) => {
      window.location.replace(
        session.needsLegalAcceptance
          ? `/legal/accept?next=${encodeURIComponent(nextPath)}`
          : nextPath,
      );
    },
    [nextPath],
  );

  useEffect(() => {
    if (!hasPendingGoogleRedirect()) return;
    let active = true;
    void Promise.resolve()
      .then(() => {
        if (active) setGoogleLoading(true);
        return completeGoogleRedirect();
      })
      .then((session) => {
        if (active && session) continueAfterGoogle(session);
      })
      .catch((caught) => {
        if (active) setGoogleError(friendlyError(caught));
      })
      .finally(() => {
        if (active) setGoogleLoading(false);
      });
    return () => {
      active = false;
    };
  }, [continueAfterGoogle]);

  async function google() {
    setGoogleError("");
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.kind === "session") continueAfterGoogle(result.session);
    } catch (caught) {
      setGoogleError(friendlyError(caught));
    } finally {
      setGoogleLoading(false);
    }
  }

  return {
    clearGoogleError: () => setGoogleError(""),
    google,
    googleError,
    googleLoading,
  };
}

export function SignInForm({ nextPath = "/account" }: { nextPath?: string }) {
  const router = useRouter();
  const [channel, setChannel] = useState<Channel>("email");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const { clearGoogleError, google, googleError, googleLoading } =
    useGoogleAuthentication(nextPath);
  const loading = contactLoading || googleLoading;

  function changeChannel(nextChannel: Channel) {
    setChannel(nextChannel);
    setContact("");
    setError("");
    clearGoogleError();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    clearGoogleError();
    setContactLoading(true);
    try {
      if (channel === "email") {
        const challenge = await requestEmailOtp({
          email: contact,
          purpose: "sign-in",
        });
        router.push(
          `/verify?channel=email&purpose=sign-in&challenge=${encodeURIComponent(challenge.challengeId)}&destination=${encodeURIComponent(contact)}&next=${encodeURIComponent(nextPath)}`,
        );
      } else {
        await startPhoneOtp(contact, "recaptcha-sign-in");
        router.push(
          `/verify?channel=phone&purpose=sign-in&destination=${encodeURIComponent(contact)}&next=${encodeURIComponent(nextPath)}`,
        );
      }
    } catch (caught) {
      setError(friendlyError(caught));
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <>
      <ChannelTabs channel={channel} onChange={changeChannel} />
      <form className="bc-auth-form" onSubmit={submit}>
        {channel === "email" ? (
          <EmailInput
            id="sign-in-email"
            label="Email address"
            placeholder="you@example.com"
            required
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        ) : (
          <CountryPhoneInput
            id="sign-in-phone"
            label="Phone number"
            required
            value={contact}
            onChange={setContact}
          />
        )}
        {(error || googleError) && (
          <p className="bc-auth-error" role="alert">
            {error || googleError}
          </p>
        )}
        <Button type="submit" loading={contactLoading} disabled={loading}>
          Continue
        </Button>
        <Link
          className="bc-auth-text-link"
          href={`/account-recovery?next=${encodeURIComponent(nextPath)}`}
        >
          Recover account
        </Link>
      </form>
      <div className="bc-auth-divider">
        <span>or</span>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="bc-google-button"
        onClick={google}
        disabled={loading}
        loading={googleLoading}
      >
        <b aria-hidden="true">G</b> Continue with Google
      </Button>
      <p className="bc-auth-switch">
        Don&apos;t have an account?{" "}
        <Link href={`/register?next=${encodeURIComponent(nextPath)}`}>
          Create one
        </Link>
      </p>
      <div id="recaptcha-sign-in" />
    </>
  );
}

export function RegistrationForm({
  nextPath = "/account",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [channel, setChannel] = useState<Channel>("email");
  const [displayName, setDisplayName] = useState("");
  const [contact, setContact] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [legalDocument, setLegalDocument] = useState<LegalDocumentType | null>(
    null,
  );
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const { clearGoogleError, google, googleError, googleLoading } =
    useGoogleAuthentication(nextPath);
  const loading = formLoading || googleLoading;
  const closeLegalDocument = useCallback(() => setLegalDocument(null), []);

  function changeChannel(nextChannel: Channel) {
    setChannel(nextChannel);
    setContact("");
    setError("");
    clearGoogleError();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    clearGoogleError();
    if (!termsAccepted || !privacyAccepted) {
      setError("Accept the Terms and Privacy Policy to continue.");
      return;
    }
    setFormLoading(true);
    try {
      const registration = {
        displayName,
        termsAccepted: true,
        privacyAccepted: true,
      };
      if (channel === "email") {
        const challenge = await requestEmailOtp({
          ...registration,
          email: contact,
          purpose: "register",
        });
        router.push(
          `/verify?channel=email&purpose=register&challenge=${encodeURIComponent(challenge.challengeId)}&destination=${encodeURIComponent(contact)}&next=${encodeURIComponent(nextPath)}`,
        );
      } else {
        sessionStorage.setItem(
          "bc-phone-registration",
          JSON.stringify(registration),
        );
        await startPhoneOtp(contact, "recaptcha-register");
        router.push(
          `/verify?channel=phone&purpose=register&destination=${encodeURIComponent(contact)}&next=${encodeURIComponent(nextPath)}`,
        );
      }
    } catch (caught) {
      setError(friendlyError(caught));
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <form className="bc-auth-form bc-registration-form" onSubmit={submit}>
      <TextInput
        id="display-name"
        label="Display name"
        autoComplete="name"
        placeholder="How people will know you"
        required
        minLength={2}
        maxLength={80}
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <ChannelTabs channel={channel} onChange={changeChannel} />
      {channel === "email" ? (
        <EmailInput
          id="register-email"
          label="Email address"
          placeholder="you@example.com"
          required
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      ) : (
        <CountryPhoneInput
          id="register-phone"
          label="Phone number"
          required
          value={contact}
          onChange={setContact}
        />
      )}
      <UploadField
        id="profile-image"
        label="Add profile image (optional)"
        helper="JPG or PNG, up to 5 MB. Upload is completed after verification."
      />
      <div className="bc-auth-check">
        <input
          id="terms-accepted"
          type="checkbox"
          checked={termsAccepted}
          onChange={(event) => setTermsAccepted(event.target.checked)}
        />
        <span>
          <label htmlFor="terms-accepted">I agree to the</label>{" "}
          <button
            type="button"
            className="bc-legal-trigger"
            onClick={() => setLegalDocument("terms")}
          >
            Terms of Service
          </button>
          .
        </span>
      </div>
      <div className="bc-auth-check">
        <input
          id="privacy-accepted"
          type="checkbox"
          checked={privacyAccepted}
          onChange={(event) => setPrivacyAccepted(event.target.checked)}
        />
        <span>
          <label htmlFor="privacy-accepted">I acknowledge the</label>{" "}
          <button
            type="button"
            className="bc-legal-trigger"
            onClick={() => setLegalDocument("privacy")}
          >
            Privacy Policy
          </button>
          .
        </span>
      </div>
      {(error || googleError) && (
        <p className="bc-auth-error" role="alert">
          {error || googleError}
        </p>
      )}
      <Button type="submit" loading={formLoading} disabled={loading}>
        Create account
      </Button>
      <div className="bc-auth-divider">
        <span>or</span>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="bc-google-button"
        onClick={google}
        disabled={loading}
        loading={googleLoading}
      >
        <b aria-hidden="true">G</b> Sign up with Google
      </Button>
      <p className="bc-auth-switch">
        Already have an account?{" "}
        <Link href={`/sign-in?next=${encodeURIComponent(nextPath)}`}>
          Sign in
        </Link>
      </p>
      <div id="recaptcha-register" />
      {legalDocument && (
        <LegalModal
          documentType={legalDocument}
          onClose={closeLegalDocument}
          onAgree={() => {
            if (legalDocument === "terms") setTermsAccepted(true);
            else setPrivacyAccepted(true);
            closeLegalDocument();
          }}
        />
      )}
    </form>
  );
}

export function OtpVerificationForm() {
  const router = useRouter();
  const params = useSearchParams();
  const channel = params.get("channel") === "phone" ? "phone" : "email";
  const purpose = params.get("purpose") ?? "sign-in";
  const nextPath = safeNextPath(params.get("next"));
  const initialChallengeId = params.get("challenge") ?? "";
  const destination = params.get("destination") ?? "your contact";
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [developmentCode, setDevelopmentCode] = useState("");
  const [activeChallengeId, setActiveChallengeId] =
    useState(initialChallengeId);
  const [expiresAt, setExpiresAt] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [resendSeconds, setResendSeconds] = useState(30);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const digitsRef = useRef<string[]>(Array(6).fill(""));
  const verifying = useRef(false);

  useEffect(() => {
    if (activeChallengeId) {
      const timer = window.setTimeout(() => {
        setDevelopmentCode(
          sessionStorage.getItem(`bc-development-code:${activeChallengeId}`) ??
            "",
        );
        const storedExpiry = Number(
          sessionStorage.getItem(`bc-otp-expiry:${activeChallengeId}`),
        );
        const nextExpiry =
          storedExpiry > Date.now()
            ? storedExpiry
            : Date.now() + 10 * 60 * 1000;
        setExpiresAt(nextExpiry);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [activeChallengeId]);

  useEffect(() => {
    if (!expiresAt) return;
    function updateCountdown() {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      setResendSeconds(Math.max(0, remaining - (10 * 60 - 30)));
    }
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt]);

  function formatCountdown(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  function change(index: number, event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    const nextDigits = digitsRef.current.map((digit, position) =>
      position === index ? value : digit,
    );
    digitsRef.current = nextDigits;
    setDigits(nextDigits);
    if (value && index < 5) inputs.current[index + 1]?.focus();
    if (value && nextDigits.every(Boolean)) {
      void verifyCode(nextDigits.join(""));
    }
  }

  function keyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function paste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length !== 6) return;
    event.preventDefault();
    const nextDigits = pasted.split("");
    digitsRef.current = nextDigits;
    setDigits(nextDigits);
    inputs.current[5]?.focus();
    void verifyCode(pasted);
  }

  async function verifyCode(code: string) {
    if (verifying.current || !/^\d{6}$/.test(code) || secondsLeft <= 0) return;
    verifying.current = true;
    setError("");
    setLoading(true);
    try {
      let session;
      if (channel === "phone") {
        session = await confirmPhoneOtp(code);
        if (purpose === "register") {
          const registration = JSON.parse(
            sessionStorage.getItem("bc-phone-registration") ?? "{}",
          ) as { displayName?: string };
          await recordLegalAcceptance(registration.displayName);
          sessionStorage.removeItem("bc-phone-registration");
          session = { needsLegalAcceptance: false };
        }
      } else {
        session = await confirmEmailOtp(activeChallengeId, code);
      }
      window.location.replace(
        session.needsLegalAcceptance
          ? `/legal/accept?next=${encodeURIComponent(nextPath)}`
          : nextPath,
      );
    } catch (caught) {
      setError(friendlyError(caught));
      const emptyDigits = Array(6).fill("");
      digitsRef.current = emptyDigits;
      setDigits(emptyDigits);
      inputs.current[0]?.focus();
    } finally {
      verifying.current = false;
      setLoading(false);
    }
  }

  async function resend() {
    if (
      channel !== "email" ||
      loading ||
      resendSeconds > 0 ||
      !activeChallengeId
    ) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const stored = sessionStorage.getItem(
        `bc-otp-request:${activeChallengeId}`,
      );
      const requestInput = stored
        ? (JSON.parse(stored) as Record<string, unknown>)
        : { email: destination, purpose };
      const next = await requestEmailOtp(requestInput);
      setActiveChallengeId(next.challengeId);
      setDevelopmentCode(next.developmentCode);
      setExpiresAt(next.expiresAt);
      const emptyDigits = Array(6).fill("");
      digitsRef.current = emptyDigits;
      setDigits(emptyDigits);
      const query = new URLSearchParams({
        channel,
        purpose,
        challenge: next.challengeId,
        destination,
        next: nextPath,
      });
      router.replace(`/verify?${query.toString()}`);
      inputs.current[0]?.focus();
    } catch (caught) {
      setError(friendlyError(caught));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bc-auth-form">
      {developmentCode ? (
        <div className="bc-verify-destination bc-verify-destination--local">
          <ShieldCheck size={19} aria-hidden="true" />
          <span>
            Local preview for <strong>{destination}</strong>. No email was sent
            in this local preview.
          </span>
        </div>
      ) : (
        <div className="bc-verify-destination">
          <ShieldCheck size={19} aria-hidden="true" />
          Code sent to <strong>{destination}</strong>
        </div>
      )}
      <fieldset className="bc-otp">
        <legend>Six-digit verification code</legend>
        <div>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              aria-label={`Digit ${index + 1} of 6`}
              autoFocus={index === 0}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              disabled={loading || secondsLeft <= 0}
              onChange={(event) => change(index, event)}
              onKeyDown={(event) => keyDown(index, event)}
              onPaste={paste}
            />
          ))}
        </div>
      </fieldset>
      {developmentCode && (
        <p className="bc-development-code">
          Local development code: <strong>{developmentCode}</strong>
        </p>
      )}
      {error && (
        <p className="bc-auth-error" role="alert">
          {error}
        </p>
      )}
      {loading && (
        <p className="bc-auth-processing" role="status" aria-live="polite">
          <span aria-hidden="true" />
          Verifying code…
        </p>
      )}
      <p className="bc-auth-help">
        {secondsLeft > 0
          ? `Code expires in ${formatCountdown(secondsLeft)}.`
          : "Code expired. Request a new one."}{" "}
        Five incorrect attempts invalidate the code.
      </p>
      <button
        type="button"
        className="bc-auth-text-link bc-auth-resend"
        onClick={resend}
        disabled={channel !== "email" || loading || resendSeconds > 0}
      >
        {resendSeconds > 0
          ? `Request a new code in ${formatCountdown(resendSeconds)}`
          : "Request a new code"}
      </button>
    </div>
  );
}

export function RecoveryForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const challenge = await requestEmailOtp({
        email,
        purpose: "recovery",
      });
      router.push(
        `/verify?channel=email&purpose=recovery&challenge=${encodeURIComponent(challenge.challengeId)}&destination=${encodeURIComponent(email)}`,
      );
    } catch (caught) {
      setError(friendlyError(caught));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="bc-auth-form" onSubmit={submit}>
      <EmailInput
        id="recovery-email"
        label="Email address"
        placeholder="you@example.com"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      {error && (
        <p className="bc-auth-error" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Send recovery code
      </Button>
      <Link className="bc-auth-text-link" href="/sign-in">
        Back to sign in
      </Link>
    </form>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setLoading(true);
    setError("");
    try {
      await logoutSession();
      router.replace("/sign-in");
      router.refresh();
    } catch (caught) {
      setError(friendlyError(caught));
      setLoading(false);
    }
  }

  return (
    <>
      <Button variant="secondary" loading={loading} onClick={logout}>
        Log out
      </Button>
      {error && (
        <p className="bc-auth-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

export function AccountVerified({ displayName }: { displayName: string }) {
  return (
    <div className="bc-account-verified">
      <CheckCircle2 size={34} aria-hidden="true" />
      <div>
        <strong>Account verified</strong>
        <p>{displayName}, your secure session is active.</p>
      </div>
    </div>
  );
}

export function LegalAcceptanceForm({
  nextPath = "/account",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [legalDocument, setLegalDocument] = useState<LegalDocumentType | null>(
    null,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const closeLegalDocument = useCallback(() => setLegalDocument(null), []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!terms || !privacy) {
      setError("Accept both policies to continue.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await recordLegalAcceptance();
      router.replace(nextPath);
      router.refresh();
    } catch (caught) {
      setError(friendlyError(caught));
      setLoading(false);
    }
  }

  return (
    <form className="bc-auth-form" onSubmit={submit}>
      <div className="bc-auth-check">
        <input
          id="existing-terms-accepted"
          type="checkbox"
          checked={terms}
          onChange={(event) => setTerms(event.target.checked)}
        />
        <span>
          <label htmlFor="existing-terms-accepted">I agree to the</label>{" "}
          <button
            type="button"
            className="bc-legal-trigger"
            onClick={() => setLegalDocument("terms")}
          >
            Terms of Service
          </button>
          .
        </span>
      </div>
      <div className="bc-auth-check">
        <input
          id="existing-privacy-accepted"
          type="checkbox"
          checked={privacy}
          onChange={(event) => setPrivacy(event.target.checked)}
        />
        <span>
          <label htmlFor="existing-privacy-accepted">I acknowledge the</label>{" "}
          <button
            type="button"
            className="bc-legal-trigger"
            onClick={() => setLegalDocument("privacy")}
          >
            Privacy Policy
          </button>
          .
        </span>
      </div>
      {error && (
        <p className="bc-auth-error" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" loading={loading}>
        Accept &amp; continue
      </Button>
      {legalDocument && (
        <LegalModal
          documentType={legalDocument}
          onClose={closeLegalDocument}
          onAgree={() => {
            if (legalDocument === "terms") setTerms(true);
            else setPrivacy(true);
            closeLegalDocument();
          }}
        />
      )}
    </form>
  );
}
