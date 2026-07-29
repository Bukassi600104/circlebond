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

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function isValidImage(bytes: Uint8Array, contentType: string) {
  if (contentType === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (contentType === "image/png") {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    );
  }
  return (
    contentType === "image/webp" &&
    new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
  );
}

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
    metricCircleId = circleId;
    uploadAttempted = true;
    const form = await request.formData();
    const receiptImage = form.get("receiptImage");
    const amount = Number(String(form.get("amount") ?? ""));
    const note = String(form.get("note") ?? "").trim() || null;
    const replacementOfId =
      String(form.get("replacementOfId") ?? "").trim() || null;

    if (
      !(receiptImage instanceof File) ||
      receiptImage.size < 1 ||
      receiptImage.size > 5_000_000 ||
      !allowedTypes.has(receiptImage.type)
    ) {
      throw new Error("Add a JPG, PNG or WebP receipt image up to 5 MB.");
    }
    const bytes = new Uint8Array(await receiptImage.arrayBuffer());
    if (!isValidImage(bytes, receiptImage.type)) {
      throw new Error("The selected receipt is not a valid image.");
    }

    const receiptId = randomUUID();
    const extension =
      receiptImage.type === "image/png"
        ? "png"
        : receiptImage.type === "image/webp"
          ? "webp"
          : "jpg";
    uploadedPath = `receipts/${circleId}/${session.uid}/${receiptId}.${extension}`;
    await getFirebaseAdminStorage()
      .bucket()
      .file(uploadedPath)
      .save(Buffer.from(bytes), {
        contentType: receiptImage.type,
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
      contentType: receiptImage.type,
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
