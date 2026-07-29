import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { assertSupportType } from "@/server/circles/support";
import {
  addCircleMember,
  createCircleDraft,
  transitionCircleState,
} from "@/server/circles/service";
import {
  calculateEqualSlotAllocations,
  validateCustomAllocations,
} from "@/server/circles/gift";
import { pricingFor, type PricingPlan } from "@/server/circles/engine";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  createInitialShareInvitation,
  resolveInitialInvitees,
  sendInitialInvitations,
} from "@/server/circles/initial-invitations";
import {
  configureSupportCircle,
  setSupportMemberAllocation,
} from "@/server/repositories/support-circles";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { recordUploadOutcome } from "@/server/repositories/operational-events";
import { sanitizeUploadedImage } from "@/server/uploads/images";

export const runtime = "nodejs";

type InviteInput = { email: string; amount?: number };

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
    const invites = JSON.parse(text(form, "invites") || "[]") as InviteInput[];

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
    if (!(supportingImage instanceof File)) {
      throw new Error("Add a JPG, PNG or WebP support image up to 5 MB.");
    }
    const sanitized = await sanitizeUploadedImage(
      supportingImage,
      "Add a valid JPG, PNG or WebP support image up to 5 MB.",
    );

    const invitees = await resolveInitialInvitees(invites, session.uid);
    const resolved = invitees.filter(
      (
        invite,
      ): invite is typeof invite & { user: NonNullable<typeof invite.user> } =>
        Boolean(invite.user),
    );
    if (invitees.length > memberCapacity - 1) {
      throw new Error(
        `This circle has ${memberCapacity - 1} supporter places besides yours.`,
      );
    }
    if (
      contributionMode === "custom" &&
      invitees.length !== memberCapacity - 1
    ) {
      throw new Error(
        "Custom amounts require every planned supporter before creation.",
      );
    }

    const circle = await createCircleDraft(
      session.uid,
      {
        type: "support",
        title: supportTitle,
        description,
        pricingPlan: pricingPlan as PricingPlan,
        memberLimit: memberCapacity,
        deadline,
        eventDate: null,
        visibility: "private",
        targetAmount,
      },
      firebaseCircleStore,
    );
    metricCircleId = circle.id;

    for (const invite of resolved) {
      await addCircleMember(
        session.uid,
        circle.id,
        invite.user.id,
        "member",
        firebaseCircleStore,
      );
    }

    const imageStoragePath = `circles/${circle.id}/support/support.${sanitized.extension}`;
    await getFirebaseAdminStorage()
      .bucket()
      .file(imageStoragePath)
      .save(sanitized.bytes, {
        contentType: sanitized.contentType,
        resumable: false,
        metadata: { cacheControl: "private, max-age=3600" },
      });

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
      imageUrl: `/api/circles/${circle.id}/support-image`,
      imageStoragePath,
    });

    const equalSlotAmounts =
      contributionMode === "equal"
        ? calculateEqualSlotAllocations(targetAmount, memberCapacity)
        : [];
    if (contributionMode === "custom") {
      validateCustomAllocations(targetAmount, [
        { memberId: session.uid, expectedAmount: creatorAmount },
        ...invitees.map((invite, index) => ({
          memberId: invite.user?.id ?? `pending:${index}`,
          expectedAmount: Number(invite.amount ?? 0),
        })),
      ]);
    }
    const allocations =
      contributionMode === "equal"
        ? [
            { memberId: session.uid, expectedAmount: equalSlotAmounts[0] },
            ...invitees.flatMap((invite, index) =>
              invite.user
                ? [
                    {
                      memberId: invite.user.id,
                      expectedAmount: equalSlotAmounts[index + 1],
                    },
                  ]
                : [],
            ),
          ]
        : [
            { memberId: session.uid, expectedAmount: creatorAmount },
            ...resolved.map(({ amount, user }) => ({
              memberId: user.id,
              expectedAmount: Number(amount ?? 0),
            })),
          ];
    for (const allocation of allocations) {
      await setSupportMemberAllocation({
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
    await sendInitialInvitations({
      circleId: circle.id,
      creatorId: session.uid,
      invitees,
      expectedAmountFor: (invitee, index) =>
        contributionMode === "equal"
          ? equalSlotAmounts[index + 1]
          : Number(invitee.amount ?? 0),
    });
    const { share, shareStatus } = await createInitialShareInvitation({
      circleId: circle.id,
      creatorId: session.uid,
      maxUses: memberCapacity - 1 - invitees.length,
      origin: new URL(request.url).origin,
    });

    await recordUploadOutcome({
      kind: "support_image",
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
        kind: "support_image",
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
