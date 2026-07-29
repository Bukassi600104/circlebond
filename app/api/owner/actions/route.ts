import { NextResponse } from "next/server";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  assertAdminPurpose,
  assertSuspensionReason,
} from "@/server/owner/rules";
import { readOwnerSession } from "@/server/owner/auth";
import {
  recordOwnerAudit,
  resolveReportedComment,
  revealReportedComment,
  revokeCompromisedInvite,
  suspendOwnerTarget,
} from "@/server/repositories/owner";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let actorId: string | null = null;
  let action = "invalid_admin_action";
  let targetType = "unknown";
  let targetId = "unknown";
  let purpose: unknown;
  try {
    await assertTrustedMutation(request);
    const ownerSession = await readOwnerSession();
    if (!ownerSession) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
    actorId = ownerSession.session.uid;
    const body = (await request.json()) as {
      action?: unknown;
      reportId?: unknown;
      userId?: unknown;
      invitationId?: unknown;
      reason?: unknown;
      purpose?: unknown;
    };
    action = typeof body.action === "string" ? body.action : action;
    purpose = body.purpose;
    assertAdminPurpose(purpose);

    if (action === "review_report") {
      targetType = "comment_report";
      targetId = String(body.reportId ?? "");
      const report = await revealReportedComment({
        actorId,
        reportId: targetId,
        purpose,
      });
      return NextResponse.json({ report });
    }
    if (action === "dismiss_report" || action === "hide_reported_comment") {
      targetType = "comment_report";
      targetId = String(body.reportId ?? "");
      await resolveReportedComment({
        actorId,
        reportId: targetId,
        action: action === "dismiss_report" ? "dismiss" : "hide_comment",
        purpose,
      });
      return NextResponse.json({ ok: true });
    }
    if (action === "suspend_user") {
      targetType = "user";
      targetId = String(body.userId ?? "");
      assertSuspensionReason(body.reason);
      await suspendOwnerTarget({
        actorId,
        userId: targetId,
        reason: body.reason,
        purpose,
      });
      return NextResponse.json({ ok: true });
    }
    if (action === "revoke_invite") {
      targetType = "invitation";
      targetId = String(body.invitationId ?? "");
      await revokeCompromisedInvite({
        actorId,
        invitationId: targetId,
        purpose,
      });
      return NextResponse.json({ ok: true });
    }
    throw new Error("Choose a valid administrative action.");
  } catch (error) {
    if (actorId) {
      await recordOwnerAudit({
        actorId,
        action,
        targetType,
        targetId,
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
          error instanceof Error
            ? error.message
            : "Unable to complete this administrative action.",
      },
      { status: 400 },
    );
  }
}
