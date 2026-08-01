import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { logger } from "@/lib/logger";

type UserProfile = {
  id: string;
  displayName: string;
  phone?: string | null;
  email?: string | null;
  profileImage?: string | null;
  termsAcceptedAt?: string | null;
  privacyAcceptedAt?: string | null;
};

export async function findPersistedUserByEmail(email: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      users: Array<{
        id: string;
        displayName: string;
        email?: string | null;
        termsAcceptedAt?: string | null;
        privacyAcceptedAt?: string | null;
      }>;
    },
    { email: string }
  >("FindUserByEmail", { email: email.trim().toLowerCase() });
  return response.data.users[0] ?? null;
}

export async function persistUserProfile(
  profile: UserProfile,
  options: { strict?: boolean } = {},
) {
  if (
    process.env.FIREBASE_AUTH_EMULATOR_HOST &&
    !process.env.DATA_CONNECT_EMULATOR_HOST
  ) {
    logger.info("emulator_user_profile_verified", { userId: profile.id });
    return;
  }
  try {
    const dataConnect = getBondCircleDataConnect();
    await dataConnect.upsert("User", {
      id: profile.id,
      displayName: profile.displayName,
      phone: profile.phone ?? null,
      email: profile.email ?? null,
      profileImage: profile.profileImage ?? null,
      termsAcceptedAt: profile.termsAcceptedAt ?? null,
      privacyAcceptedAt: profile.privacyAcceptedAt ?? null,
    });
  } catch (error) {
    logger.warn("user_profile_sync_deferred", {
      userId: profile.id,
      error: error instanceof Error ? error.message : "unknown",
    });
    if (options.strict) throw error;
  }
}

export async function persistAuthAudit(input: {
  userId?: string;
  event: string;
  channel?: string;
  outcome: string;
}) {
  if (
    process.env.FIREBASE_AUTH_EMULATOR_HOST &&
    !process.env.DATA_CONNECT_EMULATOR_HOST
  ) {
    return;
  }
  try {
    const dataConnect = getBondCircleDataConnect();
    await dataConnect.insert("AuthAuditEvent", {
      userId: input.userId ?? null,
      event: input.event,
      channel: input.channel ?? null,
      outcome: input.outcome,
    });
  } catch (error) {
    logger.warn("auth_audit_sync_deferred", {
      event: input.event,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}
