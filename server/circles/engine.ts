export const CIRCLE_TYPES = ["gift", "aso-ebi", "support"] as const;
export type CircleType = (typeof CIRCLE_TYPES)[number];

export const CIRCLE_STATES = [
  "draft",
  "published",
  "active",
  "target_reached",
  "fulfilment",
  "completed",
  "cancelled",
  "archived",
  "purged",
] as const;
export type CircleState = (typeof CIRCLE_STATES)[number];

export const PRICING_PLANS = CIRCLE_PRICING_PLANS;
export type PricingPlan = CirclePricingPlan;

export type CircleRole = "creator" | "co_admin" | "member";
export type CirclePermission =
  | "publish"
  | "complete"
  | "cancel"
  | "archive"
  | "purge"
  | "edit_configuration"
  | "manage_members"
  | "record_activity";

const FORWARD_TRANSITIONS: Record<CircleState, readonly CircleState[]> = {
  draft: ["published", "cancelled"],
  published: ["active", "cancelled"],
  active: ["target_reached", "cancelled"],
  target_reached: ["fulfilment", "cancelled"],
  fulfilment: ["completed", "cancelled"],
  completed: ["archived"],
  cancelled: ["archived"],
  archived: ["purged"],
  purged: [],
};

const ROLE_PERMISSIONS: Record<CircleRole, readonly CirclePermission[]> = {
  creator: [
    "publish",
    "complete",
    "cancel",
    "archive",
    "purge",
    "edit_configuration",
    "manage_members",
    "record_activity",
  ],
  co_admin: ["manage_members", "record_activity"],
  member: ["record_activity"],
};

export class CircleRuleError extends Error {
  readonly code:
    | "INVALID_CIRCLE_TYPE"
    | "INVALID_PRICING_PLAN"
    | "INVALID_STATE_TRANSITION"
    | "PERMISSION_DENIED"
    | "MEMBER_LIMIT_REACHED"
    | "ACTIVITY_NOT_ALLOWED";

  constructor(
    message: string,
    code:
      | "INVALID_CIRCLE_TYPE"
      | "INVALID_PRICING_PLAN"
      | "INVALID_STATE_TRANSITION"
      | "PERMISSION_DENIED"
      | "MEMBER_LIMIT_REACHED"
      | "ACTIVITY_NOT_ALLOWED",
  ) {
    super(message);
    this.name = "CircleRuleError";
    this.code = code;
  }
}

export function assertCircleType(value: string): asserts value is CircleType {
  if (!CIRCLE_TYPES.includes(value as CircleType)) {
    throw new CircleRuleError(
      "Unsupported circle type.",
      "INVALID_CIRCLE_TYPE",
    );
  }
}

export function pricingFor(plan: string) {
  if (!(plan in PRICING_PLANS)) {
    throw new CircleRuleError(
      "Unsupported pricing plan.",
      "INVALID_PRICING_PLAN",
    );
  }
  return PRICING_PLANS[plan as PricingPlan];
}

export function transitionCircle(
  current: CircleState,
  next: CircleState,
): CircleState {
  if (!FORWARD_TRANSITIONS[current].includes(next)) {
    throw new CircleRuleError(
      `Invalid circle state transition from ${current} to ${next}.`,
      "INVALID_STATE_TRANSITION",
    );
  }
  return next;
}

export function assertPermission(
  role: CircleRole,
  permission: CirclePermission,
) {
  if (!ROLE_PERMISSIONS[role].includes(permission)) {
    throw new CircleRuleError(
      `${role} does not have permission to ${permission}.`,
      "PERMISSION_DENIED",
    );
  }
}

export function assertMemberLimit(
  plan: PricingPlan,
  currentMembers: number,
  additions = 1,
) {
  const { memberLimit } = pricingFor(plan);
  if (additions < 0 || currentMembers + additions > memberLimit) {
    throw new CircleRuleError(
      `The ${plan} pricing plan member limit is ${memberLimit}.`,
      "MEMBER_LIMIT_REACHED",
    );
  }
}

export function getActivationCharge(plan: PricingPlan, payer: CircleRole) {
  if (payer !== "creator") return 0;
  return pricingFor(plan).activationPrice;
}

export function assertActivityAllowed(status: CircleState) {
  if (status === "cancelled" || status === "purged") {
    throw new CircleRuleError(
      `A ${status} circle cannot accept new activity.`,
      "ACTIVITY_NOT_ALLOWED",
    );
  }
}
import {
  CIRCLE_PRICING_PLANS,
  type CirclePricingPlan,
} from "../../lib/circle-pricing.ts";
