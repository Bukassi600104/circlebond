import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  assertAsoEbiEventType,
  assertAsoEbiTiers,
  type AsoEbiTierInput,
} from "@/server/circles/aso-ebi";
import {
  createCircleDraft,
  transitionCircleState,
} from "@/server/circles/service";
import { pricingFor, type PricingPlan } from "@/server/circles/engine";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  configureAsoEbiCircle,
  createAsoEbiTier,
} from "@/server/repositories/aso-ebi-circles";
import { recordUploadOutcome } from "@/server/repositories/operational-events";
import { sanitizeUploadedImage } from "@/server/uploads/images";
import {
  CIRCLE_IMAGE_STORAGE_WARNING,
  circleImageStorageAvailable,
  saveCircleImage,
} from "@/server/uploads/circle-images";

export const runtime = "nodejs";

type TierInput = AsoEbiTierInput & {
  id: string;
  appreciationGiftName?: string;
  availabilityNote?: string;
  deliveryDetails?: string;
};

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function optionalFile(form: FormData, key: string) {
  const value = form.get(key);
  return value instanceof File && value.size > 0 ? value : null;
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
    const eventTitle = text(form, "eventTitle");
    const eventType = text(form, "eventType");
    const eventDate = text(form, "eventDate");
    const organizerName = text(form, "organizerName");
    const description = text(form, "description");
    const pricingPlan = text(form, "pricingPlan");
    const memberCapacity = Number(text(form, "memberCapacity"));
    const paymentBankName = text(form, "paymentBankName");
    const paymentAccountName = text(form, "paymentAccountName");
    const paymentAccountNumber = text(form, "paymentAccountNumber");
    const fabricImage = form.get("fabricImage");
    const tiers = assertAsoEbiTiers(
      JSON.parse(text(form, "tiers") || "[]") as TierInput[],
    );

    if (
      !eventTitle ||
      eventTitle.length > 80 ||
      !eventDate ||
      !organizerName ||
      organizerName.length > 100 ||
      !description ||
      description.length > 500
    ) {
      throw new Error("Complete every required Aso-Ebi event field.");
    }
    assertAsoEbiEventType(eventType);
    const pricing = pricingFor(pricingPlan);
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
    for (const tier of tiers) {
      if (!/^[0-9a-f-]{36}$/i.test(tier.id)) {
        throw new Error("A tier identifier is invalid.");
      }
      for (const value of [
        tier.appreciationGiftName,
        tier.availabilityNote,
        tier.deliveryDetails,
      ]) {
        if ((value ?? "").length > 200) {
          throw new Error("A tier detail is too long.");
        }
      }
    }
    const mainImageFile =
      fabricImage instanceof File && fabricImage.size > 0 ? fabricImage : null;
    const hasTierImage = tiers.some(
      (tier) =>
        Boolean(optionalFile(form, `tierFabricImage:${tier.id}`)) ||
        Boolean(optionalFile(form, `tierGiftImage:${tier.id}`)),
    );
    const hasAnyImage = Boolean(mainImageFile) || hasTierImage;
    const storageAvailable = hasAnyImage
      ? await circleImageStorageAvailable()
      : false;
    uploadAttempted = hasAnyImage && storageAvailable;
    const sanitizedMainImage =
      mainImageFile && storageAvailable
        ? await sanitizeUploadedImage(
            mainImageFile,
            "Add a valid JPG, PNG or WebP main fabric image up to 5 MB.",
          )
        : null;

    const circle = await createCircleDraft(
      session.uid,
      {
        type: "aso-ebi",
        title: eventTitle,
        description,
        pricingPlan: pricingPlan as PricingPlan,
        memberLimit: memberCapacity,
        deadline: null,
        eventDate,
        visibility: "private",
        targetAmount: 0,
      },
      firebaseCircleStore,
    );
    metricCircleId = circle.id;

    const mainPath = sanitizedMainImage
      ? `circles/${circle.id}/aso-ebi/event.${sanitizedMainImage.extension}`
      : "";
    if (sanitizedMainImage) {
      await saveCircleImage(sanitizedMainImage, mainPath);
    }
    await configureAsoEbiCircle({
      circleId: circle.id,
      actorId: session.uid,
      eventType,
      organizerName,
      paymentBankName,
      paymentAccountName,
      paymentAccountNumber,
      imageUrl: sanitizedMainImage
        ? `/api/circles/${circle.id}/aso-ebi-image?asset=event`
        : "",
      imageStoragePath: mainPath,
    });

    for (const [index, tier] of tiers.entries()) {
      const tierId = randomUUID().replaceAll("-", "");
      const tierFabric = storageAvailable
        ? optionalFile(form, `tierFabricImage:${tier.id}`)
        : null;
      const tierGift = storageAvailable
        ? optionalFile(form, `tierGiftImage:${tier.id}`)
        : null;
      const sanitizedTierFabric = tierFabric
        ? await sanitizeUploadedImage(tierFabric)
        : null;
      const sanitizedTierGift = tierGift
        ? await sanitizeUploadedImage(tierGift)
        : null;
      const fabricPath = tierFabric
        ? `circles/${circle.id}/aso-ebi/tiers/${tierId}/fabric.${sanitizedTierFabric!.extension}`
        : null;
      const giftPath = tierGift
        ? `circles/${circle.id}/aso-ebi/tiers/${tierId}/gift.${sanitizedTierGift!.extension}`
        : null;
      if (sanitizedTierFabric && fabricPath) {
        await saveCircleImage(sanitizedTierFabric, fabricPath);
      }
      if (sanitizedTierGift && giftPath) {
        await saveCircleImage(sanitizedTierGift, giftPath);
      }
      await createAsoEbiTier({
        tierId,
        circleId: circle.id,
        name: tier.name.trim(),
        price: tier.price,
        fabricDescription: tier.fabricDescription.trim(),
        fabricImageUrl: fabricPath
          ? `/api/circles/${circle.id}/aso-ebi-image?asset=fabric&tierId=${tierId}`
          : null,
        fabricImageStoragePath: fabricPath,
        appreciationGiftName: tier.appreciationGiftName?.trim() || null,
        appreciationGiftImageUrl: giftPath
          ? `/api/circles/${circle.id}/aso-ebi-image?asset=gift&tierId=${tierId}`
          : null,
        appreciationGiftImageStoragePath: giftPath,
        availabilityNote: tier.availabilityNote?.trim() || null,
        deliveryDetails: tier.deliveryDetails?.trim() || null,
        sortOrder: index,
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
        kind: "aso_ebi_image",
        outcome: "succeeded",
        circleId: circle.id,
      });
    }
    return NextResponse.json(
      {
        circleId: circle.id,
        warning:
          hasAnyImage && !storageAvailable
            ? CIRCLE_IMAGE_STORAGE_WARNING
            : undefined,
      },
      { status: 201 },
    );
  } catch (error) {
    if (uploadAttempted) {
      await recordUploadOutcome({
        kind: "aso_ebi_image",
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
