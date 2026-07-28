export const ASO_EBI_EVENT_TYPES = [
  "wedding",
  "burial",
  "birthday",
  "anniversary",
  "thanksgiving",
  "naming_ceremony",
  "religious_event",
  "other",
] as const;

export type AsoEbiEventType = (typeof ASO_EBI_EVENT_TYPES)[number];

export const ASO_EBI_FULFILMENT_STATUSES = [
  "invited",
  "joined",
  "tier_selected",
  "receipt_submitted",
  "awaiting_confirmation",
  "part_paid",
  "paid",
  "preparing",
  "ready_for_collection",
  "dispatched",
  "delivered",
  "collected",
  "cancelled",
] as const;

export type AsoEbiFulfilmentStatus =
  (typeof ASO_EBI_FULFILMENT_STATUSES)[number];

export type AsoEbiTierInput = {
  name: string;
  price: number;
  fabricDescription: string;
  appreciationGiftName?: string;
  availabilityNote?: string;
  deliveryDetails?: string;
};

const FULFILMENT_TRANSITIONS: Record<
  AsoEbiFulfilmentStatus,
  readonly AsoEbiFulfilmentStatus[]
> = {
  invited: ["joined", "cancelled"],
  joined: ["tier_selected", "cancelled"],
  tier_selected: ["receipt_submitted", "cancelled"],
  receipt_submitted: ["awaiting_confirmation", "cancelled"],
  awaiting_confirmation: ["part_paid", "paid", "cancelled"],
  part_paid: ["receipt_submitted", "paid", "cancelled"],
  paid: ["preparing", "ready_for_collection", "dispatched", "cancelled"],
  preparing: ["ready_for_collection", "dispatched", "cancelled"],
  ready_for_collection: ["collected", "dispatched", "cancelled"],
  dispatched: ["delivered", "cancelled"],
  delivered: ["collected"],
  collected: [],
  cancelled: [],
};

export function assertAsoEbiEventType(
  value: string,
): asserts value is AsoEbiEventType {
  if (!ASO_EBI_EVENT_TYPES.includes(value as AsoEbiEventType)) {
    throw new Error("Choose a valid Aso-Ebi event type.");
  }
}

export function assertAsoEbiTiers<T extends AsoEbiTierInput>(tiers: T[]): T[] {
  if (tiers.length < 1) throw new Error("Add at least one tier.");
  if (tiers.length > 20) throw new Error("A circle can have up to 20 tiers.");
  const names = new Set<string>();
  for (const tier of tiers) {
    const normalizedName = tier.name.trim().toLowerCase();
    if (
      !normalizedName ||
      tier.name.trim().length > 60 ||
      !Number.isInteger(tier.price) ||
      tier.price < 100 ||
      tier.price > 2_000_000_000 ||
      !tier.fabricDescription.trim() ||
      tier.fabricDescription.trim().length > 300
    ) {
      throw new Error(
        "Complete every tier with a valid tier name, price and fabric description.",
      );
    }
    if (names.has(normalizedName)) {
      throw new Error("Tier names must be unique within a circle.");
    }
    names.add(normalizedName);
  }
  return tiers;
}

export function assertFulfilmentTransition(
  current: AsoEbiFulfilmentStatus,
  next: AsoEbiFulfilmentStatus,
) {
  if (!FULFILMENT_TRANSITIONS[current]?.includes(next)) {
    throw new Error(`A member cannot move from ${current} to ${next}.`);
  }
  return next;
}
