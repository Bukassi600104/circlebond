import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import {
  loadContributionWorkspace,
  submitContributionReceipt,
} from "@/server/repositories/contributions";
import { recordUploadOutcome } from "@/server/repositories/operational-events";
import { clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { sanitizeUploadedImage } from "@/server/uploads/images";

export const runtime = "nodejs";

function publicReceipt<T extends { imageStoragePath: string }>(
  receipt: T,
): Omit<T, "imageStoragePath"> {
  const { imageStoragePath: _privatePath, ...visible } = receipt;
  void _privatePath;
  return visible;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const { circleId } = await context.params;
  const workspace = await loadContributionWorkspace(circleId, session.uid);
  if (!workspace) {
    return NextResponse.json({ error: "Circle not found." }, { status: 404 });
  }
  return NextResponse.json({
    ...workspace,
    receipts: workspace.receipts.map(publicReceipt),
    reviewQueue: workspace.reviewQueue.map(publicReceipt),
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  let uploadedPath: string | null = null;
  let uploadAttempted = false;
  let metricCircleId: string | null = null;
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId } = await context.params;
    if (
      !(await enforceRateLimit(
        clientKey(request, `receipt:${session.uid}:${circleId}`),
        8,
        15 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Too many receipt uploads. Try again shortly." },
        { status: 429 },
      );
    }
    metricCircleId = circleId;
    uploadAttempted = true;
    const form = await request.formData();
    const receiptImage = form.get("receiptImage");
    const amount = Number(String(form.get("amount") ?? ""));
    const note = String(form.get("note") ?? "").trim() || null;
    const replacementOfId =
      String(form.get("replacementOfId") ?? "").trim() || null;

    if (!(receiptImage instanceof File)) {
      throw new Error("Add a JPG, PNG or WebP receipt image up to 5 MB.");
    }
    const sanitized = await sanitizeUploadedImage(
      receiptImage,
      "Add a valid JPG, PNG or WebP receipt image up to 5 MB.",
    );

    const receiptId = randomUUID();
    uploadedPath = `receipts/${circleId}/${session.uid}/${receiptId}.${sanitized.extension}`;
    await getFirebaseAdminStorage()
      .bucket()
      .file(uploadedPath)
      .save(sanitized.bytes, {
        contentType: sanitized.contentType,
        resumable: false,
        metadata: {
          cacheControl: "private, no-store",
          metadata: { ownerId: session.uid, circleId, receiptId },
        },
      });

    const result = await submitContributionReceipt({
      receiptId,
      circleId,
      uploaderId: session.uid,
      amount,
      note,
      imageUrl: `/api/circles/${circleId}/receipts/${receiptId}/image`,
      imageStoragePath: uploadedPath,
      contentType: sanitized.contentType,
      replacementOfId,
    });
    await recordUploadOutcome({
      kind: "receipt",
      outcome: "succeeded",
      circleId,
    });
    return NextResponse.json({ receiptId, ...result }, { status: 201 });
  } catch (error) {
    if (uploadedPath) {
      await getFirebaseAdminStorage()
        .bucket()
        .file(uploadedPath)
        .delete({ ignoreNotFound: true })
        .catch(() => undefined);
    }
    if (uploadAttempted) {
      await recordUploadOutcome({
        kind: "receipt",
        outcome: "failed",
        circleId: metricCircleId,
        error,
      });
    }
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit this receipt.",
      },
      { status: 400 },
    );
  }
}
