import { apiJson } from "@/app/api/v1/_response";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import {
  authChallengeFingerprint,
  consumeAuthChallenge,
  enforceRateLimit,
  OTP_MAX_ATTEMPTS,
  OTP_TTL_MS,
  verifyEmailOtp,
} from "@/server/auth/security";
import { clientKey } from "@/server/auth/request";
import { recordAuthAudit } from "@/server/audit";
import {
  findPersistedUserByEmail,
  persistUserProfile,
} from "@/server/repositories/users";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (
      !(await enforceRateLimit(
        clientKey(request, "otp-verify"),
        300,
        15 * 60_000,
      ))
    ) {
      return apiJson(
        { error: "Too many verification requests. Try again shortly." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }
    const body: unknown = await request.json().catch(() => null);
    const { challengeId, code } = (body ?? {}) as Record<string, unknown>;

    if (
      typeof challengeId !== "string" ||
      !challengeId ||
      challengeId.length > 16384 ||
      typeof code !== "string" ||
      !/^\d{6}$/.test(code)
    ) {
      return apiJson(
        { error: "Invalid verification request." },
        { status: 400 },
      );
    }

    if (
      !(await enforceRateLimit(
        clientKey(
          request,
          `otp-verify:${authChallengeFingerprint(challengeId)}`,
        ),
        5,
        15 * 60_000,
      ))
    ) {
      return apiJson(
        { error: "Verification attempts exhausted. Try again later." },
        { status: 429 },
      );
    }

    if (
      !(await enforceRateLimit(
        `otp-challenge:${authChallengeFingerprint(challengeId)}`,
        OTP_MAX_ATTEMPTS,
        OTP_TTL_MS,
      ))
    ) {
      return apiJson(
        { error: "Verification attempts exhausted. Request a new code." },
        { status: 429 },
      );
    }

    // The shared challenge budget survives IP changes and cookie replay.
    const result = verifyEmailOtp(challengeId, code, 0);
    if (!result.ok) {
      return apiJson(
        {
          error:
            result.reason === "expired"
              ? "This code has expired. Request a new one."
              : "That code is not valid. Try again.",
        },
        { status: 400 },
      );
    }

    if (!(await consumeAuthChallenge(challengeId))) {
      return apiJson(
        { error: "That code has already been used. Request a new one." },
        { status: 409 },
      );
    }

    const auth = getFirebaseAdminAuth();
    let user;
    try {
      user = await auth.getUserByEmail(result.challenge.email);
    } catch (lookupError) {
      const isMissingUser =
        typeof lookupError === "object" &&
        lookupError !== null &&
        "code" in lookupError &&
        lookupError.code === "auth/user-not-found";
      if (!isMissingUser) throw lookupError;

      const persisted =
        process.env.FIREBASE_AUTH_EMULATOR_HOST &&
        result.challenge.purpose !== "register"
          ? await findPersistedUserByEmail(result.challenge.email)
          : null;

      if (
        result.challenge.purpose !== "register" &&
        !persisted &&
        !process.env.FIREBASE_AUTH_EMULATOR_HOST
      ) {
        return apiJson(
          { error: "User account not found. Please register." },
          { status: 404 },
        );
      }

      user = await auth.createUser({
        ...(persisted ? { uid: persisted.id } : {}),
        email: result.challenge.email,
        emailVerified: true,
        displayName:
          result.challenge.displayName ??
          persisted?.displayName ??
          result.challenge.email.split("@")[0],
      });

      if (persisted?.termsAcceptedAt && persisted.privacyAcceptedAt) {
        await auth.setCustomUserClaims(user.uid, {
          ...user.customClaims,
          termsAcceptedAt: persisted.termsAcceptedAt,
          privacyAcceptedAt: persisted.privacyAcceptedAt,
        });
      }
    }

    if (result.challenge.purpose === "register") {
      await auth.updateUser(user.uid, {
        displayName: result.challenge.displayName,
        emailVerified: true,
      });
      await auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        termsAcceptedAt: result.challenge.termsAcceptedAt,
        privacyAcceptedAt: result.challenge.privacyAcceptedAt,
      });
      await persistUserProfile({
        id: user.uid,
        displayName: result.challenge.displayName!,
        email: result.challenge.email,
        termsAcceptedAt: result.challenge.termsAcceptedAt,
        privacyAcceptedAt: result.challenge.privacyAcceptedAt,
      });
    } else if (!user.emailVerified) {
      await auth.updateUser(user.uid, { emailVerified: true });
    }

    const customToken = await auth.createCustomToken(user.uid);

    recordAuthAudit({
      userId: user.uid,
      event: result.challenge.purpose === "register" ? "verification" : "login",
      outcome: "success",
      channel: "email",
    });

    return apiJson({ customToken, uid: user.uid }, { status: 200 });
  } catch {
    recordAuthAudit({
      event: "verification",
      outcome: "failure",
      channel: "email",
    });
    return apiJson(
      {
        error:
          "Authentication service is temporarily unavailable. Request a new code and try again.",
      },
      { status: 500 },
    );
  }
}
