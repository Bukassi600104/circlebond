import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { reviewContributionReceipt } from "@/server/repositories/contributions";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ circleId: string; receiptId: string }>;
  },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId, receiptId } = await context.params;
    const body = (await request.json()) as {
      decision?: string;
      rejectionReason?: string;
    };
    if (body.decision !== "approve" && body.decision !== "reject") {
      throw new Error("Choose approve or reject.");
    }
    if (body.decision === "reject" && !body.rejectionReason?.trim()) {
      throw new Error("A rejection reason is required.");
    }
    const result = await reviewContributionReceipt({
      circleId,
      receiptId,
      reviewerId: session.uid,
      decision: body.decision,
      rejectionReason: body.rejectionReason,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to review this receipt.",
      },
      { status: 400 },
    );
  }
}
