import "server-only";

import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { firebaseCircleStore } from "@/server/repositories/circles";
import { transitionCircleState } from "@/server/circles/service";
import type { CircleState, CircleType } from "@/server/circles/engine";
import {
  assertCompletionType,
  type CompletionType,
} from "@/server/retention/rules";
import { safelyEmitNotification } from "@/server/repositories/notifications";

export type CircleLifecycleSummary = {
  id: string;
  name: string;
  type: CircleType;
  status: CircleState;
  completionType: CompletionType | null;
  memberCount: number;
  pricingPlan: string;
  createdAt: string;
  completedAt: string | null;
  retentionDueAt: string | null;
  archiveAt: string | null;
  purgeAt: string | null;
  creatorId: string;
  viewerIsCreator: boolean;
  timeline: Array<{
    id: string;
    eventType: string;
    createdAt: string;
    actorName: string | null;
  }>;
};

type LifecycleQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    status: string;
    completionType?: string | null;
    memberCount: number;
    pricingPlan: string;
    createdAt: string;
    completedAt?: string | null;
    retentionDueAt?: string | null;
    archiveAt?: string | null;
    purgeAt?: string | null;
    creator: { id: string };
  };
  circleMemberships: Array<{ user: { id: string } }>;
  activityLogs: Array<{
    id: string;
    eventType: string;
    createdAt: string;
    actor?: { id: string; displayName: string } | null;
  }>;
};

export async function loadCircleLifecycle(
  circleId: string,
  viewerId: string,
): Promise<CircleLifecycleSummary | null> {
  const response = await getBondCircleDataConnect().executeQuery<
    LifecycleQuery,
    { circleId: string }
  >("GetCircleLifecycleSummary", { circleId });
  const circle = response.data.circle;
  if (
    !circle ||
    !response.data.circleMemberships.some(
      (membership) => membership.user.id === viewerId,
    )
  ) {
    return null;
  }
  return {
    id: circle.id,
    name: circle.name,
    type: circle.type as CircleType,
    status: circle.status as CircleState,
    completionType: (circle.completionType as CompletionType | null) ?? null,
    memberCount: circle.memberCount,
    pricingPlan: circle.pricingPlan,
    createdAt: circle.createdAt,
    completedAt: circle.completedAt ?? null,
    retentionDueAt: circle.retentionDueAt ?? null,
    archiveAt: circle.archiveAt ?? null,
    purgeAt: circle.purgeAt ?? null,
    creatorId: circle.creator.id,
    viewerIsCreator: circle.creator.id === viewerId,
    timeline: response.data.activityLogs.map((event) => ({
      id: event.id,
      eventType: event.eventType,
      createdAt: event.createdAt,
      actorName: event.actor?.displayName ?? null,
    })),
  };
}

export async function completeCircle(input: {
  circleId: string;
  actorId: string;
  completionType: unknown;
}) {
  const circle = await firebaseCircleStore.findById(input.circleId);
  if (!circle) throw new Error("Circle not found.");
  if (circle.creatorId !== input.actorId) {
    throw new Error("Only the circle creator can complete this circle.");
  }
  assertCompletionType(circle.type, input.completionType);
  const paths: Partial<Record<CircleState, CircleState>> = {
    published: "active",
    active: "target_reached",
    target_reached: "fulfilment",
    fulfilment: "completed",
  };
  let status = circle.status;
  while (paths[status]) {
    const updated = await transitionCircleState(
      input.actorId,
      input.circleId,
      paths[status] as CircleState,
      firebaseCircleStore,
    );
    status = updated.status;
  }
  if (status !== "completed") {
    throw new Error("This circle cannot be completed from its current state.");
  }
  await getBondCircleDataConnect().executeMutation(
    "SetCircleCompletionTypeWithAudit",
    {
      circleId: input.circleId,
      actorId: input.actorId,
      completionType: input.completionType,
      updatedAt: new Date().toISOString(),
    },
  );
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "circle_completed",
    entityId: input.circleId,
    actorId: input.actorId,
  });
}

export async function archiveCircle(circleId: string, actorId: string) {
  const circle = await firebaseCircleStore.findById(circleId);
  if (!circle) throw new Error("Circle not found.");
  if (circle.creatorId !== actorId) {
    throw new Error("Only the circle creator can archive this circle.");
  }
  if (!["completed", "cancelled"].includes(circle.status)) {
    throw new Error("Complete or cancel the circle before archiving it.");
  }
  await transitionCircleState(
    actorId,
    circleId,
    "archived",
    firebaseCircleStore,
  );
}

export async function cancelCircle(circleId: string, actorId: string) {
  const circle = await firebaseCircleStore.findById(circleId);
  if (!circle) throw new Error("Circle not found.");
  if (circle.creatorId !== actorId) {
    throw new Error("Only the circle creator can cancel this circle.");
  }
  await transitionCircleState(
    actorId,
    circleId,
    "cancelled",
    firebaseCircleStore,
  );
  await safelyEmitNotification({
    circleId,
    type: "circle_cancelled",
    entityId: circleId,
    actorId,
  });
}
