import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
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
  configureGiftCircle,
  findUserByEmail,
  setGiftMemberAllocation,
} from "@/server/repositories/gift-circles";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";

export const runtime = "nodejs";

type InviteInput = { email: string; amount?: number };

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function validImageBytes(bytes: Uint8Array, type: string) {
  if (type === "image/png") {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e;
  }
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8;
  if (type === "image/webp") {
    return new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF";
  }
  return false;
}

export async function POST(request: Request) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
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
    const invites = JSON.parse(text(form, "invites") || "[]") as InviteInput[];

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
    if (!(image instanceof File) || image.size < 1 || image.size > 5_000_000) {
      throw new Error("Add a JPG, PNG or WebP gift image up to 5 MB.");
    }
    const bytes = new Uint8Array(await image.arrayBuffer());
    if (!validImageBytes(bytes, image.type)) {
      throw new Error("The selected gift image is not valid.");
    }

    const uniqueInvites = [
      ...new Map(
        invites
          .filter((invite) => invite.email.trim())
          .map((invite) => [
            invite.email.trim().toLowerCase(),
            { ...invite, email: invite.email.trim().toLowerCase() },
          ]),
      ).values(),
    ];
    const resolved = [];
    for (const invite of uniqueInvites) {
      const user = await findUserByEmail(invite.email);
      if (!user) {
        throw new Error(
          `${invite.email} does not have a BondCircle account yet.`,
        );
      }
      if (user.id !== session.uid) resolved.push({ ...invite, user });
    }
    if (resolved.length > memberCapacity - 1) {
      throw new Error(
        `This circle has ${memberCapacity - 1} member slots besides yours.`,
      );
    }
    if (
      contributionMode === "custom" &&
      resolved.length !== memberCapacity - 1
    ) {
      throw new Error(
        "Custom split requires every planned member and amount before creation.",
      );
    }

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

    for (const invite of resolved) {
      await addCircleMember(
        session.uid,
        circle.id,
        invite.user.id,
        "member",
        firebaseCircleStore,
      );
    }

    const extension =
      image.type === "image/png"
        ? "png"
        : image.type === "image/webp"
          ? "webp"
          : "jpg";
    const imageStoragePath = `circles/${circle.id}/gift/gift.${extension}`;
    await getFirebaseAdminStorage()
      .bucket()
      .file(imageStoragePath)
      .save(Buffer.from(bytes), {
        contentType: image.type,
        resumable: false,
        metadata: { cacheControl: "private, max-age=3600" },
      });

    await configureGiftCircle({
      circleId: circle.id,
      actorId: session.uid,
      giftTitle,
      contributionMode,
      paymentBankName,
      paymentAccountName,
      paymentAccountNumber,
      imageUrl: `/api/circles/${circle.id}/gift-image`,
      imageStoragePath,
    });

    const memberIds = [session.uid, ...resolved.map(({ user }) => user.id)];
    const equalSlotAmounts =
      contributionMode === "equal"
        ? calculateEqualSlotAllocations(targetAmount, memberCapacity)
        : [];
    const allocations =
      contributionMode === "equal"
        ? memberIds.map((memberId, index) => ({
            memberId,
            expectedAmount: equalSlotAmounts[index],
          }))
        : validateCustomAllocations(targetAmount, [
            { memberId: session.uid, expectedAmount: creatorAmount },
            ...resolved.map(({ amount, user }) => ({
              memberId: user.id,
              expectedAmount: Number(amount ?? 0),
            })),
          ]);
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

    return NextResponse.json({ circleId: circle.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create." },
      { status: 400 },
    );
  }
}
