import type {
  ActivityFilter,
  ActivityType,
} from "@/server/communication/rules";

export type ActivityEvent = {
  id: string;
  circleId: string;
  circleName: string;
  circleType: string;
  type: ActivityType;
  actorId: string | null;
  actorName: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  filter: ActivityFilter;
};
