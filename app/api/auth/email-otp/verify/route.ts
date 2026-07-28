import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import {
  OTP_ATTEMPTS_COOKIE,
  readOtpAttempts,
  sealOtpAttempts,
  verifyEmailOtp,
} from "@/server/auth/security";
import { recordAuthAudit } from "@/server/audit";
import {
  findPersistedUserByEmail,
  persistUserProfile,
} from "@/server/repositories/users";

export async function POST(request: Request) {
  try {
    const { challengeId, code } = (await request.json()) as {
      challengeId?: string;
      code?: string;
    };
    if (!challengeId || !/^\d{6}$/.test(code ?? "")) {
      throw new Error("Invalid verification request.");
    }
    const attemptsCookie = (await cookies()).get(OTP_ATTEMPTS_COOKIE)?.value;
    const attempts = readOtpAttempts(attemptsCookie, challengeId);
    const result = verifyEmailOtp(challengeId, code!, attempts);
    if (!result.ok) {
      const response = NextResponse.json(
        {
          error:
            result.reason === "expired"
              ? "This code has expired. Request a new one."
              : "That code is not valid. Try again.",
        },
        { status: 400 },
      );
      if (result.reason === "invalid" && result.nextAttempts < 5) {
        response.cookies.set(
          OTP_ATTEMPTS_COOKIE,
          sealOtpAttempts(result.challengeId, result.nextAttempts),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api/auth/email-otp",
            maxAge: 10 * 60,
          },
        );
      } else {
        response.cookies.set(OTP_ATTEMPTS_COOKIE, "", {
          httpOnly: true,
          sameSite: "strict",
          path: "/api/auth/email-otp",
          maxAge: 0,
        });
      }
      return response;
    }

    try {
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
          throw new Error("Verification failed.");
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
      recordAuthAudit({
        event:
          result.challenge.purpose === "recovery" ? "recovery" : "verification",
        outcome: "success",
        channel: "email",
        userId: user.uid,
      });
      const response = NextResponse.json({ customToken });
      response.cookies.set(OTP_ATTEMPTS_COOKIE, "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/api/auth/email-otp",
        maxAge: 0,
      });
      return response;
    } catch (error) {
      console.error("Email OTP accepted but authentication failed.", error);
      return NextResponse.json(
        {
          error:
            "Authentication service is temporarily unavailable. Your code was accepted; try again shortly.",
        },
        { status: 503 },
      );
    }
  } catch {
    recordAuthAudit({
      event: "verification",
      outcome: "failure",
      channel: "email",
    });
    return NextResponse.json(
      { error: "That code is invalid or has expired." },
      { status: 400 },
    );
  }
}
