import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { assertSupportType } from "@/server/circles/support";
import {
  createCircleDraft,
  transitionCircleState,
} from "@/server/circles/service";
import { calculateEqualSlotAllocations } from "@/server/circles/gift";
import { pricingFor, type PricingPlan } from "@/server/circles/engine";
import { assertEntitlement } from "@/server/pricing";
import { pricingErrorResponse } from "@/server/pricing/http";
import { claimTrialAndPublishCircle } from "@/server/repositories/pricing";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  configureSupportCircle,
  setSupportMemberAllocation,
} from "@/server/repositories/support-circles";
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

function checked(form: FormData, key: string) {
  return form.get(key) === "on";
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
    const supportTitle = text(form, "supportTitle");
    const supportType = text(form, "supportType");
    const beneficiaryName = text(form, "beneficiaryName");
    const beneficiaryRelationship =
      text(form, "beneficiaryRelationship") || null;
    const targetAmount = Number(text(form, "targetAmount"));
    const deadline = text(form, "deadline");
    const description = text(form, "description");
    const contributionMode = text(form, "contributionMode");
    const pricingPlan = text(form, "pricingPlan");
    const memberCapacity = Number(text(form, "memberCapacity"));
    const paymentBankName = text(form, "paymentBankName");
    const paymentAccountName = text(form, "paymentAccountName");
    const paymentAccountNumber = text(form, "paymentAccountNumber");
    const creatorAmount = Number(text(form, "creatorAmount") || "0");
    const supportingImage = form.get("supportingImage");

    if (
      !supportTitle ||
      supportTitle.length > 80 ||
      !beneficiaryName ||
      beneficiaryName.length > 100 ||
      !deadline ||
      !description ||
      description.length > 800
    ) {
      throw new Error("Complete every required Support Circle field.");
    }
    assertSupportType(supportType);
    if (
      !Number.isInteger(targetAmount) ||
      targetAmount < 100 ||
      targetAmount > 2_000_000_000
    ) {
      throw new Error("Enter a valid support target.");
    }
    if (!["equal", "custom"].includes(contributionMode)) {
      throw new Error("Choose a contribution mode.");
    }
    const pricing = pricingFor("support", pricingPlan);
    const selectedPricingPlan = pricingPlan as PricingPlan;
    if (contributionMode === "custom") {
      assertEntitlement(
        { mode: "support", plan: selectedPricingPlan },
        "custom_contributions",
      );
    }
    if (checked(form, "requireCreatorApproval")) {
      assertEntitlement(
        { mode: "support", plan: selectedPricingPlan },
        "support_approval_required_membership",
      );
    }
    if (checked(form, "hideIndividualAmounts")) {
      assertEntitlement(
        { mode: "support", plan: selectedPricingPlan },
        "support_hidden_individual_amounts",
      );
    }
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
      throw new Error("Enter a valid expected amount for yourself.");
    }
    const imageFile =
      supportingImage instanceof File && supportingImage.size > 0
        ? supportingImage
        : null;
    const storageAvailable = imageFile
      ? await circleImageStorageAvailable()
      : false;
    const sanitized =
      imageFile && storageAvailable
        ? await sanitizeUploadedImage(
            imageFile,
            "Add a valid JPG, PNG or WebP support image up to 5 MB.",
          )
        : null;
    uploadAttempted = Boolean(sanitized);

    const circle = await createCircleDraft(
      session.uid,
      {
        type: "support",
        title: supportTitle,
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
      ? `circles/${circle.id}/support/support.${sanitized.extension}`
      : "";
    if (sanitized) {
      await saveCircleImage(sanitized, imageStoragePath);
    }

    await configureSupportCircle({
      circleId: circle.id,
      actorId: session.uid,
      supportType,
      beneficiaryName,
      beneficiaryRelationship,
      contributionMode,
      showBeneficiaryName: checked(form, "showBeneficiaryName"),
      showTargetToMembers: checked(form, "showTargetToMembers"),
      showConfirmedTotalToMembers: checked(form, "showConfirmedTotalToMembers"),
      hideIndividualAmounts: checked(form, "hideIndividualAmounts"),
      requireCreatorApproval: checked(form, "requireCreatorApproval"),
      paymentBankName,
      paymentAccountName,
      paymentAccountNumber,
      imageUrl: sanitized ? `/api/circles/${circle.id}/support-image` : "",
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
      await setSupportMemberAllocation({
        circleId: circle.id,
        memberId: allocation.memberId,
        expectedAmount: allocation.expectedAmount,
        contributionStatus:
          allocation.memberId === session.uid ? "joined" : "invited",
      });
    }

    if (selectedPricingPlan === "trial") {
      await claimTrialAndPublishCircle({
        creatorId: session.uid,
        circleId: circle.id,
        circleType: "support",
        planDefinitionId: pricing.id,
      });
      await transitionCircleState(
        session.uid,
        circle.id,
        "active",
        firebaseCircleStore,
      );
    }
    if (uploadAttempted) {
      await recordUploadOutcome({
        kind: "support_image",
        outcome: "succeeded",
        circleId: circle.id,
      });
    }
    return NextResponse.json(
      {
        circleId: circle.id,
        activationStatus:
          selectedPricingPlan === "trial" ? "active" : "pending_payment",
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
        kind: "support_image",
        outcome: "failed",
        circleId: metricCircleId,
        error,
      });
    }
    return pricingErrorResponse(error, "Unable to create the Support Circle.");
  }
}
