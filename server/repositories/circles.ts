import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import type {
  CircleRecord,
  CircleStore,
  UpdateCircleDraftInput,
} from "@/server/circles/service";
import type {
  CircleRole,
  CircleState,
  CircleType,
  PricingPlan,
} from "@/server/circles/engine";

type CircleEngineQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    description: string;
    targetAmount: number;
    pricingPlan: string;
    memberLimit: number;
    activationPrice: number;
    deadline?: string | null;
    eventDate?: string | null;
    status: string;
    visibility: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null;
    retentionDueAt?: string | null;
    archiveAt?: string | null;
    purgeAt?: string | null;
    creator: { id: string };
  };
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    user: { id: string };
  }>;
};

function mapCircle(
  circle: NonNullable<CircleEngineQuery["circle"]>,
): CircleRecord {
  return {
    id: circle.id,
    creatorId: circle.creator.id,
    type: circle.type as CircleType,
    title: circle.name,
    description: circle.description,
    pricingPlan: circle.pricingPlan as PricingPlan,
    memberLimit: circle.memberLimit,
    activationPrice: circle.activationPrice,
    deadline: circle.deadline ?? null,
    eventDate: circle.eventDate ?? null,
    status: circle.status as CircleState,
    visibility: circle.visibility,
    targetAmount: circle.targetAmount,
    createdAt: circle.createdAt,
    updatedAt: circle.updatedAt,
    completedAt: circle.completedAt ?? null,
    retentionDueAt: circle.retentionDueAt ?? null,
    archiveAt: circle.archiveAt ?? null,
    purgeAt: circle.purgeAt ?? null,
  };
}

async function loadRecord(circleId: string) {
  return getBondCircleDataConnect().executeQuery<
    CircleEngineQuery,
    { circleId: string }
  >("GetCircleEngineRecord", { circleId });
}

export class FirebaseCircleStore implements CircleStore {
  async createDraft(
    circle: Omit<CircleRecord, "id" | "creatorId">,
    creatorId: string,
  ) {
    const response = await getBondCircleDataConnect().executeMutation<
      { circle_insert: { id: string } },
      {
        creatorId: string;
        name: string;
        type: string;
        description: string;
        targetAmount: number;
        pricingPlan: string;
        memberLimit: number;
        activationPrice: number;
        deadline: string | null;
        eventDate: string | null;
        visibility: string;
        createdAt: string;
        updatedAt: string;
      }
    >("CreateCircleDraft", {
      creatorId,
      name: circle.title,
      type: circle.type,
      description: circle.description,
      targetAmount: circle.targetAmount,
      pricingPlan: circle.pricingPlan,
      memberLimit: circle.memberLimit,
      activationPrice: circle.activationPrice,
      deadline: circle.deadline,
      eventDate: circle.eventDate,
      visibility: circle.visibility,
      createdAt: circle.createdAt,
      updatedAt: circle.updatedAt,
    });

    return {
      ...circle,
      id: response.data.circle_insert.id,
      creatorId,
    };
  }

  async findById(circleId: string) {
    const response = await loadRecord(circleId);
    return response.data.circle ? mapCircle(response.data.circle) : null;
  }

  async roleFor(circleId: string, userId: string) {
    const response = await loadRecord(circleId);
    const role = response.data.circleMemberships.find(
      (membership) =>
        membership.user.id === userId &&
        membership.membershipStatus === "joined",
    )?.role;
    return (role as CircleRole | undefined) ?? null;
  }

  async updateConfiguration(
    circle: CircleRecord,
    actorId: string,
    changes: UpdateCircleDraftInput &
      Pick<CircleRecord, "memberLimit" | "activationPrice" | "updatedAt">,
    auditAction: "draft_updated" | "configuration_updated",
  ) {
    const updated = { ...circle, ...changes };
    await getBondCircleDataConnect().executeMutation(
      "UpdateCircleConfigurationWithAudit",
      {
        circleId: circle.id,
        actorId,
        action: auditAction,
        status: circle.status,
        name: updated.title,
        description: updated.description,
        targetAmount: updated.targetAmount,
        pricingPlan: updated.pricingPlan,
        memberLimit: updated.memberLimit,
        activationPrice: updated.activationPrice,
        deadline: updated.deadline,
        eventDate: updated.eventDate,
        visibility: updated.visibility,
        updatedAt: updated.updatedAt,
        materialChanges: JSON.stringify(changes),
      },
    );
    return updated;
  }

  async transition(
    circle: CircleRecord,
    actorId: string,
    nextStatus: CircleState,
    timestamps: Pick<
      CircleRecord,
      "updatedAt" | "completedAt" | "retentionDueAt" | "archiveAt" | "purgeAt"
    >,
  ) {
    await getBondCircleDataConnect().executeMutation(
      "TransitionCircleWithAudit",
      {
        circleId: circle.id,
        actorId,
        fromStatus: circle.status,
        toStatus: nextStatus,
        ...timestamps,
      },
    );
    return { ...circle, status: nextStatus, ...timestamps };
  }

  async memberCount(circleId: string) {
    const response = await loadRecord(circleId);
    return response.data.circleMemberships.filter(
      (membership) => membership.membershipStatus === "joined",
    ).length;
  }

  async addMember(
    circle: CircleRecord,
    actorId: string,
    memberId: string,
    role: "co_admin" | "member",
  ) {
    await getBondCircleDataConnect().executeMutation(
      "AddCircleMemberWithAudit",
      {
        circleId: circle.id,
        actorId,
        memberId,
        role,
        createdAt: new Date().toISOString(),
      },
    );
  }
}

export const firebaseCircleStore = new FirebaseCircleStore();
