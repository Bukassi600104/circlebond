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
  addCircleMember,
  createCircleDraft,
  transitionCircleState,
} from "@/server/circles/service";
import { pricingFor, type PricingPlan } from "@/server/circles/engine";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  createInitialShareInvitation,
  resolveInitialInvitees,
  sendInitialInvitations,
} from "@/server/circles/initial-invitations";
import {
  configureAsoEbiCircle,
  createAsoEbiTier,
} from "@/server/repositories/aso-ebi-circles";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { recordUploadOutcome } from "@/server/repositories/operational-events";
import {
  sanitizeUploadedImage,
  type SanitizedImage,
} from "@/server/uploads/images";

export const runtime = "nodejs";

type TierInput = AsoEbiTierInput & {
  id: string;
  appreciationGiftName?: string;
  availabilityNote?: string;
  deliveryDetails?: string;
};
type InviteInput = { email: string };

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

async function saveImage(image: SanitizedImage, storagePath: string) {
  await getFirebaseAdminStorage()
    .bucket()
    .file(storagePath)
    .save(image.bytes, {
      contentType: image.contentType,
      resumable: false,
      metadata: { cacheControl: "private, max-age=3600" },
    });
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
    const invites = JSON.parse(text(form, "invites") || "[]") as InviteInput[];

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
    uploadAttempted = true;
    if (!(fabricImage instanceof File) || fabricImage.size < 1) {
      throw new Error("Add the main fabric image.");
    }
    const sanitizedMainImage = await sanitizeUploadedImage(
      fabricImage,
      "Add a valid JPG, PNG or WebP main fabric image up to 5 MB.",
    );
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

    const invitees = await resolveInitialInvitees(invites, session.uid);
    if (invitees.length > memberCapacity - 1) {
      throw new Error(
        `This circle has ${memberCapacity - 1} member places besides yours.`,
      );
    }
    const resolvedMembers = invitees.flatMap((invite) =>
      invite.user ? [invite.user] : [],
    );

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

    for (const user of resolvedMembers) {
      await addCircleMember(
        session.uid,
        circle.id,
        user.id,
        "member",
        firebaseCircleStore,
      );
    }

    const mainPath = `circles/${circle.id}/aso-ebi/event.${sanitizedMainImage.extension}`;
    await saveImage(sanitizedMainImage, mainPath);
    await configureAsoEbiCircle({
      circleId: circle.id,
      actorId: session.uid,
      eventType,
      organizerName,
      paymentBankName,
      paymentAccountName,
      paymentAccountNumber,
      imageUrl: `/api/circles/${circle.id}/aso-ebi-image?asset=event`,
      imageStoragePath: mainPath,
    });

    for (const [index, tier] of tiers.entries()) {
      const tierId = randomUUID().replaceAll("-", "");
      const tierFabric = optionalFile(form, `tierFabricImage:${tier.id}`);
      const tierGift = optionalFile(form, `tierGiftImage:${tier.id}`);
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
        await saveImage(sanitizedTierFabric, fabricPath);
      }
      if (sanitizedTierGift && giftPath) {
        await saveImage(sanitizedTierGift, giftPath);
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
    await sendInitialInvitations({
      circleId: circle.id,
      creatorId: session.uid,
      invitees,
    });
    const { share, shareStatus } = await createInitialShareInvitation({
      circleId: circle.id,
      creatorId: session.uid,
      maxUses: memberCapacity - 1 - invitees.length,
      origin: new URL(request.url).origin,
    });

    await recordUploadOutcome({
      kind: "aso_ebi_image",
      outcome: "succeeded",
      circleId: circle.id,
    });
    return NextResponse.json(
      { circleId: circle.id, share, shareStatus },
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
