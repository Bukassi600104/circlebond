import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { validateEmailAddress } from "@/server/auth/security";
import { addCircleMember } from "@/server/circles/service";
import { calculateEqualSlotAllocations } from "@/server/circles/gift";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  findUserByEmail,
  loadGiftCircle,
  setGiftMemberAllocation,
} from "@/server/repositories/gift-circles";

export const runtime = "nodejs";

type InviteInput = { email?: string; amount?: number };

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
    const circle = await loadGiftCircle(circleId, session.uid);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found." }, { status: 404 });
    }
    if (circle.creatorId !== session.uid) {
      return NextResponse.json(
        { error: "Only the creator can invite members." },
        { status: 403 },
      );
    }

    const body = (await request.json()) as { invites?: InviteInput[] };
    const requested = body.invites ?? [];
    if (!requested.length) throw new Error("Add at least one member email.");

    const uniqueEmails = [
      ...new Set(
        await Promise.all(
          requested.map(({ email }) =>
            validateEmailAddress(String(email ?? ""), { checkDomain: false }),
          ),
        ),
      ),
    ];
    const amountByEmail = new Map(
      requested.map(({ email, amount }) => [
        String(email ?? "")
          .trim()
          .toLowerCase(),
        Number(amount ?? 0),
      ]),
    );
    const existingIds = new Set(circle.members.map(({ id }) => id));
    const resolved = [];
    for (const email of uniqueEmails) {
      const user = await findUserByEmail(email);
      if (!user) {
        throw new Error(`${email} does not have a BondCircle account yet.`);
      }
      if (!existingIds.has(user.id)) resolved.push({ email, user });
    }

    const available = circle.memberLimit - circle.members.length;
    if (resolved.length > available) {
      throw new Error(
        `Only ${available} open member ${available === 1 ? "slot remains" : "slots remain"}.`,
      );
    }
    if (!resolved.length) {
      return NextResponse.json({ added: 0 });
    }

    const equalAmounts =
      circle.contributionMode === "equal"
        ? calculateEqualSlotAllocations(circle.targetAmount, circle.memberLimit)
        : [];
    for (const [index, { email, user }] of resolved.entries()) {
      const expectedAmount =
        circle.contributionMode === "equal"
          ? equalAmounts[circle.members.length + index]
          : amountByEmail.get(email);
      if (!Number.isInteger(expectedAmount) || Number(expectedAmount) < 0) {
        throw new Error("Enter a valid custom amount for every new member.");
      }
      await addCircleMember(
        session.uid,
        circle.id,
        user.id,
        "member",
        firebaseCircleStore,
      );
      await setGiftMemberAllocation({
        circleId: circle.id,
        memberId: user.id,
        expectedAmount: Number(expectedAmount),
        contributionStatus: "invited",
      });
    }

    return NextResponse.json({ added: resolved.length });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to invite members.",
      },
      { status: 400 },
    );
  }
}
