import {
  assertActivityAllowed,
  assertCircleType,
  assertPermission,
  pricingFor,
  transitionCircle,
  type CirclePermission,
  type CircleRole,
  type CircleState,
  type CircleType,
  type PricingPlan,
} from "./engine.ts";
import { retentionDueAt } from "../retention/rules.ts";
import { PRICING_MODEL_VERSION } from "../../lib/circle-pricing.ts";
import {
  PricingRuleError,
  assertCoAdminCapacity,
  assertMemberCapacity,
  entitlementContextForStoredCircle,
  type CircleEntitlementContext,
} from "../pricing/entitlements.ts";

export type CircleRecord = {
  id: string;
  creatorId: string;
  type: CircleType;
  title: string;
  description: string;
  pricingPlan: PricingPlan | "free" | "legacy";
  memberLimit: number;
  activationPrice: number;
  activationPriceMinor: number;
  pricingModelVersion: string;
  pricingPlanDefinitionId: string | null;
  activationStatus: string;
  activatedAt: string | null;
  deadline: string | null;
  eventDate: string | null;
  status: CircleState;
  visibility: string;
  targetAmount: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  retentionDueAt: string | null;
  archiveAt: string | null;
  purgeAt: string | null;
};

export type CreateCircleDraftInput = {
  type: string;
  title: string;
  description: string;
  pricingPlan: PricingPlan;
  deadline: string | null;
  eventDate: string | null;
  visibility: string;
  targetAmount: number;
  memberLimit?: number;
};

export type UpdateCircleDraftInput = Partial<
  Pick<
    CircleRecord,
    | "title"
    | "description"
    | "pricingPlan"
    | "deadline"
    | "eventDate"
    | "visibility"
    | "targetAmount"
  >
>;

export interface CircleStore {
  createDraft(
    circle: Omit<CircleRecord, "id" | "creatorId">,
    creatorId: string,
  ): Promise<CircleRecord>;
  findById(circleId: string): Promise<CircleRecord | null>;
  roleFor(circleId: string, userId: string): Promise<CircleRole | null>;
  updateConfiguration(
    circle: CircleRecord,
    actorId: string,
    changes: UpdateCircleDraftInput &
      Pick<
        CircleRecord,
        | "memberLimit"
        | "activationPrice"
        | "activationPriceMinor"
        | "pricingPlanDefinitionId"
        | "activationStatus"
        | "updatedAt"
      >,
    auditAction: "draft_updated" | "configuration_updated",
  ): Promise<CircleRecord>;
  transition(
    circle: CircleRecord,
    actorId: string,
    nextStatus: CircleState,
    timestamps: Pick<
      CircleRecord,
      "updatedAt" | "completedAt" | "archiveAt" | "purgeAt" | "retentionDueAt"
    >,
  ): Promise<CircleRecord>;
  memberCount(circleId: string): Promise<number>;
  coAdminCount(circleId: string): Promise<number>;
  addMember(
    circle: CircleRecord,
    actorId: string,
    memberId: string,
    role: Exclude<CircleRole, "creator">,
  ): Promise<void>;
}

function now() {
  return new Date().toISOString();
}

function requireCircle(circle: CircleRecord | null): CircleRecord {
  if (!circle) throw new Error("Circle not found.");
  return circle;
}

function entitlementContextFor(circle: CircleRecord): CircleEntitlementContext {
  return entitlementContextForStoredCircle(circle);
}

async function roleForActor(
  store: CircleStore,
  circle: CircleRecord,
  actorId: string,
) {
  if (circle.creatorId === actorId) return "creator";
  const role = await store.roleFor(circle.id, actorId);
  if (!role) throw new Error("Circle membership not found.");
  return role;
}

export async function createCircleDraft(
  creatorId: string,
  input: CreateCircleDraftInput,
  store: CircleStore,
) {
  assertCircleType(input.type);
  const pricing = pricingFor(input.type, input.pricingPlan);
  const requestedMemberLimit = input.memberLimit ?? pricing.memberLimit;
  const timestamp = now();
  const title = input.title.trim();
  if (!title) throw new Error("Circle title is required.");
  if (input.targetAmount < 0) {
    throw new Error("Target amount cannot be negative.");
  }
  if (
    !Number.isInteger(requestedMemberLimit) ||
    requestedMemberLimit < 1 ||
    requestedMemberLimit > pricing.memberLimit
  ) {
    throw new Error(
      `The ${input.pricingPlan} pricing plan supports up to ${pricing.memberLimit} members.`,
    );
  }

  return store.createDraft(
    {
      ...input,
      type: input.type,
      title,
      status: "draft",
      memberLimit: requestedMemberLimit,
      // Keep the old whole-Naira field during migration for existing readers.
      // New activation and historical records use integer minor units.
      activationPrice: pricing.priceMinor / 100,
      activationPriceMinor: pricing.priceMinor,
      pricingModelVersion: PRICING_MODEL_VERSION,
      pricingPlanDefinitionId: pricing.id,
      activationStatus:
        input.pricingPlan === "trial"
          ? "pending_trial_claim"
          : "pending_payment",
      activatedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      completedAt: null,
      retentionDueAt: null,
      archiveAt: null,
      purgeAt: null,
    },
    creatorId,
  );
}

export async function updateCircleDraft(
  actorId: string,
  circleId: string,
  changes: UpdateCircleDraftInput,
  store: CircleStore,
) {
  const circle = requireCircle(await store.findById(circleId));
  const role = await roleForActor(store, circle, actorId);
  assertPermission(role, "edit_configuration");
  if (circle.status !== "draft") {
    throw new Error("Only a draft circle can be resumed and edited.");
  }

  const pricing = pricingFor(
    circle.type,
    changes.pricingPlan ?? circle.pricingPlan,
  );
  return store.updateConfiguration(
    circle,
    actorId,
    {
      ...changes,
      memberLimit: pricing.memberLimit,
      activationPrice: pricing.priceMinor / 100,
      activationPriceMinor: pricing.priceMinor,
      pricingPlanDefinitionId: pricing.id,
      activationStatus:
        (changes.pricingPlan ?? circle.pricingPlan) === "trial"
          ? "pending_trial_claim"
          : "pending_payment",
      updatedAt: now(),
    },
    "draft_updated",
  );
}

export async function updateCircleConfiguration(
  actorId: string,
  circleId: string,
  changes: UpdateCircleDraftInput,
  store: CircleStore,
) {
  const circle = requireCircle(await store.findById(circleId));
  const role = await roleForActor(store, circle, actorId);
  assertPermission(role, "edit_configuration");
  assertActivityAllowed(circle.status);
  if (circle.status === "archived" || circle.status === "completed") {
    throw new Error(`A ${circle.status} circle configuration is locked.`);
  }
  if (changes.pricingPlan && changes.pricingPlan !== circle.pricingPlan) {
    throw new PricingRuleError(
      "Use the secured upgrade flow to change an active circle plan.",
      "ACTIVATION_REQUIRED",
    );
  }

  if (circle.pricingModelVersion !== PRICING_MODEL_VERSION) {
    return store.updateConfiguration(
      circle,
      actorId,
      {
        ...changes,
        memberLimit: circle.memberLimit,
        activationPrice: circle.activationPrice,
        activationPriceMinor: circle.activationPriceMinor,
        pricingPlanDefinitionId: circle.pricingPlanDefinitionId,
        activationStatus: circle.activationStatus,
        updatedAt: now(),
      },
      circle.status === "draft" ? "draft_updated" : "configuration_updated",
    );
  }

  const pricing = pricingFor(circle.type, circle.pricingPlan);
  const memberCount = await store.memberCount(circle.id);
  assertMemberCapacity(entitlementContextFor(circle), memberCount, 0);
  return store.updateConfiguration(
    circle,
    actorId,
    {
      ...changes,
      memberLimit: pricing.memberLimit,
      activationPrice: pricing.priceMinor / 100,
      activationPriceMinor: pricing.priceMinor,
      pricingPlanDefinitionId: pricing.id,
      activationStatus: circle.activationStatus,
      updatedAt: now(),
    },
    circle.status === "draft" ? "draft_updated" : "configuration_updated",
  );
}

function transitionPermission(nextStatus: CircleState): CirclePermission {
  if (nextStatus === "published") return "publish";
  if (nextStatus === "completed") return "complete";
  if (nextStatus === "cancelled") return "cancel";
  if (nextStatus === "archived") return "archive";
  if (nextStatus === "purged") return "purge";
  return "publish";
}

export async function transitionCircleState(
  actorId: string,
  circleId: string,
  nextStatus: CircleState,
  store: CircleStore,
) {
  const circle = requireCircle(await store.findById(circleId));
  const role = await roleForActor(store, circle, actorId);
  assertPermission(role, transitionPermission(nextStatus));
  transitionCircle(circle.status, nextStatus);

  const timestamp = now();
  return store.transition(circle, actorId, nextStatus, {
    updatedAt: timestamp,
    completedAt: nextStatus === "completed" ? timestamp : circle.completedAt,
    retentionDueAt:
      nextStatus === "completed" || nextStatus === "cancelled"
        ? retentionDueAt(new Date(timestamp))
        : circle.retentionDueAt,
    archiveAt: nextStatus === "archived" ? timestamp : circle.archiveAt,
    purgeAt: nextStatus === "purged" ? timestamp : circle.purgeAt,
  });
}

export async function addCircleMember(
  actorId: string,
  circleId: string,
  memberId: string,
  role: Exclude<CircleRole, "creator">,
  store: CircleStore,
) {
  const circle = requireCircle(await store.findById(circleId));
  const actorRole = await roleForActor(store, circle, actorId);
  assertPermission(actorRole, "manage_members");
  assertActivityAllowed(circle.status);
  const currentMembers = await store.memberCount(circle.id);
  const entitlementContext = entitlementContextFor(circle);
  assertMemberCapacity(entitlementContext, currentMembers, 1);
  if (role === "co_admin") {
    const currentCoAdmins = await store.coAdminCount(circle.id);
    assertCoAdminCapacity(entitlementContext, currentCoAdmins, 1);
  }
  await store.addMember(circle, actorId, memberId, role);
}
