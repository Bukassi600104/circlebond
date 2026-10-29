import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";

export type PrivacyRequest = {
  id: string;
  kind: "export" | "deletion";
  status: string;
  createdAt: string;
  updatedAt: string;
};

const collections = [
  "memberships",
  "receipts",
  "comments",
  "announcements",
  "supportUpdates",
  "notifications",
  "activations",
  "authEvents",
] as const;
type Collection = (typeof collections)[number];
type ExportPage = { user?: Record<string, unknown> } & Record<
  Collection,
  Array<Record<string, unknown>>
>;

export class AccountExportLimitError extends Error {
  constructor() {
    super(
      "This export needs assisted processing. Submit a data export request below.",
    );
  }
}

export async function exportAccountData(userId: string) {
  // shortcut: exports above 4 MB or 10,000 related records need assistance; stream files if larger exports become common.
  const records: Record<Collection, Array<Record<string, unknown>>> = {
    memberships: [],
    receipts: [],
    comments: [],
    announcements: [],
    supportUpdates: [],
    notifications: [],
    activations: [],
    authEvents: [],
  };
  let profile: Record<string, unknown> | undefined;
  let recordCount = 0;
  const requests = await loadPrivacyRequests(userId);
  const generatedAt = new Date().toISOString();
  for (let offset = 0; offset <= 10_000; offset += 100) {
    const response = await getBondCircleDataConnect().executeQuery<
      ExportPage,
      { userId: string; offset: number }
    >("GetAccountExportPage", { userId, offset });
    if (!response.data.user || response.data.user.id !== userId)
      throw new Error("Account unavailable.");
    profile ??= response.data.user;
    let more = false;
    for (const name of collections) {
      const page = response.data[name];
      if (!Array.isArray(page)) throw new Error("Account export unavailable.");
      recordCount += page.length;
      if (recordCount > 10_000) throw new AccountExportLimitError();
      records[name].push(...page);
      more ||= page.length === 100;
    }
    const document = {
      format: "bondcircle-account-v1",
      generatedAt,
      profile,
      ...records,
      privacyRequests: requests,
      excluded: [
        "Authentication credentials, device tokens, invitation tokens and private storage paths",
        "Receipt image binaries and other participants' personal records",
      ],
    };
    if (Buffer.byteLength(JSON.stringify(document), "utf8") > 4_000_000)
      throw new AccountExportLimitError();
    if (!more) return document;
  }
  throw new AccountExportLimitError();
}

export async function loadPrivacyRequests(userId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { accountPrivacyRequests: PrivacyRequest[] },
    { userId: string }
  >("GetAccountPrivacyRequests", { userId });
  return response.data.accountPrivacyRequests;
}

export async function createPrivacyRequest(
  userId: string,
  kind: "export" | "deletion",
) {
  if (kind !== "export" && kind !== "deletion")
    throw new Error("Invalid request kind.");
  const existing = (await loadPrivacyRequests(userId)).find(
    (request) => request.kind === kind,
  );
  if (existing) return existing;
  try {
    await getBondCircleDataConnect().executeMutation(
      "CreateAccountPrivacyRequest",
      { id: `${userId}:${kind}`, userId, kind },
    );
  } catch (error) {
    const concurrent = (await loadPrivacyRequests(userId)).find(
      (request) => request.kind === kind,
    );
    if (concurrent) return concurrent;
    throw error;
  }
  const created = (await loadPrivacyRequests(userId)).find(
    (request) => request.kind === kind,
  );
  if (!created) throw new Error("Privacy request could not be confirmed.");
  return created;
}

export type OwnerPrivacyRequest = PrivacyRequest & {
  user: {
    id: string;
    displayName: string;
    email?: string | null;
    phone?: string | null;
  };
};

export async function loadOwnerPrivacyRequests(offset: number) {
  const response = await getBondCircleDataConnect().executeQuery<
    { accountPrivacyRequests: OwnerPrivacyRequest[] },
    { offset: number }
  >("GetOwnerPrivacyRequests", { offset });
  return response.data.accountPrivacyRequests;
}

export async function acknowledgePrivacyRequest(id: string, actorId: string) {
  await getBondCircleDataConnect().executeMutation(
    "AcknowledgeAccountPrivacyRequest",
    { id, actorId },
  );
}
