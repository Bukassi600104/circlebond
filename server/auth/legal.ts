import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";

export class LegalAcceptanceError extends Error {
  readonly code = "LEGAL_ACCEPTANCE_REQUIRED";
  readonly status = 403;
  constructor() {
    super("Review and accept the Terms and Privacy Notice before continuing.");
  }
}

export async function loadLegalAcceptance(userId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      user?: {
        termsAcceptedAt?: string | null;
        privacyAcceptedAt?: string | null;
        accountStatus: string;
        displayName?: string;
      };
    },
    { userId: string }
  >("GetUserBootstrapProfile", { userId });
  return response.data.user ?? null;
}

export async function loadAcceptedLegalProfile(userId: string) {
  const user = await loadLegalAcceptance(userId);
  return user?.accountStatus === "active" &&
    user.termsAcceptedAt &&
    user.privacyAcceptedAt
    ? user
    : null;
}

export async function assertLegalAcceptance(userId: string) {
  const profile = await loadAcceptedLegalProfile(userId);
  if (!profile) throw new LegalAcceptanceError();
  return profile;
}
