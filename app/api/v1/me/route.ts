import { NextResponse } from "next/server";
import { authenticateNativeRequest } from "@/server/auth/native";
import { fetchUserBootstrapProfile } from "@/server/repositories/users";

export const runtime = "nodejs";

/**
 * GET /api/v1/me — mobile bootstrap profile (docs/openapi.yaml UserProfileResponse).
 *
 * The uid always comes from the verified bearer token / session cookie,
 * never from client-supplied data.
 */
export async function GET(request: Request) {
  try {
    const outcome = await authenticateNativeRequest(request);
    if (outcome.state === "unauthenticated") {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }
    if (outcome.state === "suspended") {
      return NextResponse.json(
        { error: "Account suspended." },
        { status: 403 },
      );
    }
    const { principal } = outcome;

    const profile = await fetchUserBootstrapProfile(principal.uid);

    if (!profile) {
      // No persisted profile row yet (fresh sign-up or emulator mode):
      // fall back to verified Firebase Auth claims so native clients can bootstrap.
      return NextResponse.json(
        {
          user: {
            id: principal.uid,
            displayName: principal.decoded.name ?? "",
            email: principal.email ?? null,
            phone: principal.phone ?? null,
            profileImage: principal.decoded.picture ?? null,
            termsAcceptedAt: null,
            privacyAcceptedAt: null,
            accountStatus: "active",
            preferences: {
              emailNotifications: true,
              browserPushNotifications: false,
              commentNotifications: true,
              contributionReminders: true,
              circleUpdateNotifications: true,
              marketingCommunication: false,
            },
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        user: {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.email ?? principal.email ?? null,
          phone: profile.phone ?? principal.phone ?? null,
          profileImage: profile.profileImage ?? null,
          termsAcceptedAt: profile.termsAcceptedAt ?? null,
          privacyAcceptedAt: profile.privacyAcceptedAt ?? null,
          accountStatus:
            profile.accountStatus === "suspended" ? "suspended" : "active",
          preferences: {
            emailNotifications: profile.emailNotifications,
            browserPushNotifications: profile.browserPushNotifications,
            commentNotifications: profile.commentNotifications,
            contributionReminders: profile.contributionReminders,
            circleUpdateNotifications: profile.circleUpdateNotifications,
            marketingCommunication: profile.marketingCommunication,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/v1/me] Failed to load user profile:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve user profile.",
      },
      { status: 500 },
    );
  }
}
