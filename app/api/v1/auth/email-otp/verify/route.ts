import { NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import {
  authChallengeFingerprint,
  consumeAuthChallenge,
  enforceRateLimit,
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
    const { challengeId, code } = (await request.json()) as {
      challengeId?: string;
      code?: string;
    };

    if (!challengeId || !/^\d{6}$/.test(code ?? "")) {
      return NextResponse.json(
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
      return NextResponse.json(
        { error: "Verification attempts exhausted. Try again later." },
        { status: 429 },
      );
    }

    // For mobile requests, verify without relying on browser cookies
    const result = verifyEmailOtp(challengeId, code!, 0);
    if (!result.ok) {
      return NextResponse.json(
        {
          error:
            result.reason === "expired"
              ? "This code has expired. Request a new one."
              : "That code is not valid. Try again.",
        },
        { status: 400 },
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
        return NextResponse.json(
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
    }

    const customToken = await auth.createCustomToken(user.uid);
    if (!(await consumeAuthChallenge(challengeId))) {
      return NextResponse.json(
        { error: "That code has already been used. Request a new one." },
        { status: 409 },
      );
    }

    recordAuthAudit({
      userId: user.uid,
      event: result.challenge.purpose === "register" ? "verification" : "login",
      outcome: "success",
      channel: "email",
    });

    return NextResponse.json({ customToken, uid: user.uid }, { status: 200 });
  } catch (error) {
    recordAuthAudit({
      event: "verification",
      outcome: "failure",
      channel: "email",
    });
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Authentication service is temporarily unavailable.",
      },
      { status: 500 },
    );
  }
}
