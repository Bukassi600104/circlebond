import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { assertReminderRecipients } from "@/server/notifications/rules";
import { sendContributionReminders } from "@/server/repositories/notifications";
import { pricingErrorResponse } from "@/server/pricing/http";

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId } = await context.params;
    const body = (await request.json()) as { recipientIds?: unknown };
    const result = await sendContributionReminders({
      circleId,
      actorId: session.uid,
      recipientIds: assertReminderRecipients(body.recipientIds),
    });
    return NextResponse.json(result);
  } catch (error) {
    return pricingErrorResponse(error, "Unable to send reminders.");
  }
}
