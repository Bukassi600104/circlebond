import { readOwnerSession } from "@/server/owner/auth";
import {
  assertAdminPurpose,
  assertOperationalReport,
} from "@/server/owner/rules";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  createOperationalReport,
  recordOwnerAudit,
} from "@/server/repositories/owner";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let actorId: string | null = null;
  let purpose: unknown;
  let report = "invalid_report";
  try {
    await assertTrustedMutation(request);
    const ownerSession = await readOwnerSession();
    if (!ownerSession) {
      return Response.json({ error: "Not authorized." }, { status: 403 });
    }
    actorId = ownerSession.session.uid;
    const body = (await request.json()) as {
      report?: unknown;
      purpose?: unknown;
    };
    purpose = body.purpose;
    report = typeof body.report === "string" ? body.report : report;
    assertAdminPurpose(purpose);
    assertOperationalReport(body.report);
    const csv = await createOperationalReport({
      actorId: ownerSession.session.uid,
      report: body.report,
      purpose,
    });
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bondcircle-${body.report}.csv"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (actorId) {
      await recordOwnerAudit({
        actorId,
        action: "operational_report_exported",
        targetType: "operational_report",
        targetId: report,
        purpose:
          typeof purpose === "string" &&
          ["support", "fraud", "security", "legal"].includes(purpose)
            ? (purpose as "support" | "fraud" | "security" | "legal")
            : "security",
        outcome: "failed",
        metadata: { reasonCode: "validation_or_operation_failed" },
      }).catch(() => undefined);
    }
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to export this report.",
      },
      { status: 400 },
    );
  }
}
