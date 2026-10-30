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
      ...Object.fromEntries(
        Object.entries(profile).filter(([, value]) => value !== undefined),
      ),
    });
  } catch (error) {
    logger.warn("user_profile_sync_deferred", {
      userId: profile.id,
      reasonCode: "PERSISTENCE_UNAVAILABLE",
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
  } catch {
    logger.warn("auth_audit_sync_deferred", {
      event: input.event,
      reasonCode: "PERSISTENCE_UNAVAILABLE",
    });
  }
}

export async function fetchUserBootstrapProfile(userId: string) {
  if (
    process.env.FIREBASE_AUTH_EMULATOR_HOST &&
    !process.env.DATA_CONNECT_EMULATOR_HOST
  ) {
    return null;
  }
  try {
    const dataConnect = getBondCircleDataConnect();
    const response = await dataConnect.executeQuery<
      {
        user?: {
          id: string;
          displayName: string;
          email?: string | null;
          phone?: string | null;
          profileImage?: string | null;
          termsAcceptedAt?: string | null;
          privacyAcceptedAt?: string | null;
          accountStatus?: string;
          emailNotifications: boolean;
          browserPushNotifications: boolean;
          commentNotifications: boolean;
          contributionReminders: boolean;
          circleUpdateNotifications: boolean;
          marketingCommunication: boolean;
        };
      },
      { userId: string }
    >("GetUserBootstrapProfile", { userId });
    return response.data.user ?? null;
  } catch (error) {
    logger.warn("bootstrap_profile_fetch_failed", { userId });
    throw error;
  }
}

export async function updatePersistedDisplayName(
  userId: string,
  displayName: string,
) {
  if (
    process.env.FIREBASE_AUTH_EMULATOR_HOST &&
    !process.env.DATA_CONNECT_EMULATOR_HOST
  ) {
    logger.info("emulator_display_name_updated", { userId });
    return;
  }
  try {
    const dataConnect = getBondCircleDataConnect();
    await dataConnect.upsert("User", {
      id: userId,
      displayName,
    });
  } catch (error) {
    logger.warn("display_name_update_failed", {
      userId,
      reasonCode: "PERSISTENCE_UNAVAILABLE",
    });
    throw error;
  }
}
