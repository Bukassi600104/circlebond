import { NextResponse } from "next/server";
import { assertTrustedMutation } from "@/server/auth/request";
import { readOwnerSession } from "@/server/owner/auth";
import { assertAdminPurpose } from "@/server/owner/rules";
import { recordOwnerAudit, searchOwnerUser } from "@/server/repositories/owner";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let actorId: string | null = null;
  let purpose: unknown;
  try {
    await assertTrustedMutation(request);
    const ownerSession = await readOwnerSession();
    if (!ownerSession) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
    actorId = ownerSession.session.uid;
    const body = (await request.json()) as {
      identifier?: unknown;
      purpose?: unknown;
    };
    purpose = body.purpose;
    assertAdminPurpose(purpose);
    const identifier = String(body.identifier ?? "").trim();
    const user = await searchOwnerUser(identifier);
    await recordOwnerAudit({
      actorId: ownerSession.session.uid,
      action: "user_account_lookup",
      targetType: "user",
      targetId: user?.id ?? "not_found",
      purpose,
      outcome: "succeeded",
      metadata: { found: Boolean(user) },
    });
    return NextResponse.json({ user });
  } catch (error) {
    if (actorId) {
      await recordOwnerAudit({
        actorId,
        action: "user_account_lookup",
        targetType: "user",
        targetId: "not_found",
        purpose:
          typeof purpose === "string" &&
          ["support", "fraud", "security", "legal"].includes(purpose)
            ? (purpose as "support" | "fraud" | "security" | "legal")
            : "security",
        outcome: "failed",
        metadata: { reasonCode: "validation_or_operation_failed" },
      }).catch(() => undefined);
    }
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to search users.",
      },
      { status: 400 },
    );
  }
}
