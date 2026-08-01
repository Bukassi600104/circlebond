import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  createCircleDraft,
  transitionCircleState,
} from "@/server/circles/service";
import { calculateEqualSlotAllocations } from "@/server/circles/gift";
import { pricingFor, type PricingPlan } from "@/server/circles/engine";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  configureGiftCircle,
  setGiftMemberAllocation,
} from "@/server/repositories/gift-circles";
import { recordUploadOutcome } from "@/server/repositories/operational-events";
import { sanitizeUploadedImage } from "@/server/uploads/images";
import {
  CIRCLE_IMAGE_STORAGE_WARNING,
  circleImageStorageAvailable,
  saveCircleImage,
} from "@/server/uploads/circle-images";

export const runtime = "nodejs";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  let uploadAttempted = false;
  let metricCircleId: string | null = null;
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    if (
      !(await enforceRateLimit(
        clientKey(request, `circle-create:${session.uid}`),
        10,
        60 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Circle creation limit reached. Try again later." },
        { status: 429 },
      );
    }

    const form = await request.formData();
    const circleName = text(form, "circleName");
    const giftTitle = text(form, "giftTitle");
    const description = text(form, "description");
    const deadline = text(form, "deadline");
    const contributionMode = text(form, "contributionMode");
    const pricingPlan = text(form, "pricingPlan");
    const targetAmount = Number(text(form, "targetAmount"));
    const memberCapacity = Number(text(form, "memberCapacity"));
    const paymentBankName = text(form, "paymentBankName");
    const paymentAccountName = text(form, "paymentAccountName");
    const paymentAccountNumber = text(form, "paymentAccountNumber");
    const creatorAmount = Number(text(form, "creatorAmount") || "0");
    const image = form.get("giftImage");

    if (!circleName || !giftTitle || !description || !deadline) {
      throw new Error("Complete every required Gift Circle field.");
    }
    if (
      !Number.isInteger(targetAmount) ||
      targetAmount < 100 ||
      targetAmount > 2_000_000_000
    ) {
      throw new Error("Enter a valid target amount.");
    }
    if (!["equal", "custom"].includes(contributionMode)) {
      throw new Error("Choose a contribution mode.");
    }
    const pricing = pricingFor(pricingPlan);
    const selectedPricingPlan = pricingPlan as PricingPlan;
    if (
      !Number.isInteger(memberCapacity) ||
      memberCapacity < 2 ||
      memberCapacity > pricing.memberLimit
    ) {
      throw new Error(
        `${pricingPlan} supports between 2 and ${pricing.memberLimit} people.`,
      );
    }
    if (
      !paymentBankName ||
      paymentBankName.length > 80 ||
      !paymentAccountName ||
      paymentAccountName.length > 100 ||
      !/^\d{10}$/.test(paymentAccountNumber)
    ) {
      throw new Error(
        "Add a bank name, account name and valid 10-digit account number.",
      );
    }
    if (
      contributionMode === "custom" &&
      (!Number.isInteger(creatorAmount) ||
        creatorAmount < 0 ||
        creatorAmount > targetAmount)
    ) {
      throw new Error("Enter a valid contribution amount for yourself.");
    }
    const imageFile = image instanceof File && image.size > 0 ? image : null;
    const storageAvailable = imageFile
      ? await circleImageStorageAvailable()
      : false;
    const sanitized =
      imageFile && storageAvailable
        ? await sanitizeUploadedImage(
            imageFile,
            "Add a valid JPG, PNG or WebP gift image up to 5 MB.",
          )
        : null;
    uploadAttempted = Boolean(sanitized);

    const circle = await createCircleDraft(
      session.uid,
      {
        type: "gift",
        title: circleName,
        description,
        pricingPlan: selectedPricingPlan,
        memberLimit: memberCapacity,
        deadline,
        eventDate: null,
        visibility: "private",
        targetAmount,
      },
      firebaseCircleStore,
    );
    metricCircleId = circle.id;

    const imageStoragePath = sanitized
      ? `circles/${circle.id}/gift/gift.${sanitized.extension}`
      : "";
    if (sanitized) {
      await saveCircleImage(sanitized, imageStoragePath);
    }

    await configureGiftCircle({
      circleId: circle.id,
      actorId: session.uid,
      giftTitle,
      contributionMode,
      paymentBankName,
      paymentAccountName,
      paymentAccountNumber,
      imageUrl: sanitized ? `/api/circles/${circle.id}/gift-image` : "",
      imageStoragePath,
    });

    const equalSlotAmounts =
      contributionMode === "equal"
        ? calculateEqualSlotAllocations(targetAmount, memberCapacity)
        : [];
    const allocations =
      contributionMode === "equal"
        ? [{ memberId: session.uid, expectedAmount: equalSlotAmounts[0] }]
        : [{ memberId: session.uid, expectedAmount: creatorAmount }];
    for (const allocation of allocations) {
      await setGiftMemberAllocation({
        circleId: circle.id,
        memberId: allocation.memberId,
        expectedAmount: allocation.expectedAmount,
        contributionStatus:
          allocation.memberId === session.uid ? "joined" : "invited",
      });
    }

    await transitionCircleState(
      session.uid,
      circle.id,
      "published",
      firebaseCircleStore,
    );
    await transitionCircleState(
      session.uid,
      circle.id,
      "active",
      firebaseCircleStore,
    );
    if (uploadAttempted) {
      await recordUploadOutcome({
        kind: "gift_image",
        outcome: "succeeded",
        circleId: circle.id,
      });
    }
    return NextResponse.json(
      {
        circleId: circle.id,
        warning:
          imageFile && !storageAvailable
            ? CIRCLE_IMAGE_STORAGE_WARNING
            : undefined,
      },
      { status: 201 },
    );
  } catch (error) {
    if (uploadAttempted) {
      await recordUploadOutcome({
        kind: "gift_image",
        outcome: "failed",
        circleId: metricCircleId,
        error,
      });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create." },
      { status: 400 },
    );
  }
}
