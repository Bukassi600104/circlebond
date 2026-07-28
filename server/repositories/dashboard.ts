import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { logger } from "@/lib/logger";

export type DashboardCircle = {
  id: string;
  name: string;
  type: string;
  imageUrl: string | null;
  role: string;
  membershipStatus: string;
  memberCount: number;
  memberLimit: number;
  targetAmount: number | null;
  contributedAmount: number | null;
  progress: number | null;
  deadline: string | null;
  eventDate: string | null;
  status: string;
  createdAt: string;
  createdByCurrentUser: boolean;
};

type DashboardQueryData = {
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    user: { id: string };
    circle: {
      id: string;
      name: string;
      type: string;
      imageUrl?: string | null;
      targetAmount: number;
      contributedAmount: number;
      showTargetToMembers?: boolean;
      showConfirmedTotalToMembers?: boolean;
      memberCount: number;
      memberLimit: number;
      deadline?: string | null;
      eventDate?: string | null;
      status: string;
      createdAt: string;
      creator: { id: string };
    };
  }>;
};

export class DashboardDataError extends Error {
  constructor() {
    super("Your circles could not be loaded.");
    this.name = "DashboardDataError";
  }
}

export async function loadDashboardCircles(
  userId: string,
): Promise<DashboardCircle[]> {
  try {
    const response =
      await getBondCircleDataConnect().executeQuery<DashboardQueryData>(
        "GetDashboardCircles",
      );

    const membershipCounts = new Map<string, number>();
    for (const { circle, membershipStatus } of response.data
      .circleMemberships) {
      if (membershipStatus !== "joined") continue;
      membershipCounts.set(
        circle.id,
        (membershipCounts.get(circle.id) ?? 0) + 1,
      );
    }

    return response.data.circleMemberships
      .filter((membership) => membership.user.id === userId)
      .map(({ circle, membershipStatus, role }) => {
        const isManager = circle.creator.id === userId || role === "co_admin";
        const isSupportCircle = circle.type === "support";
        const canSeeTarget =
          !isSupportCircle || isManager || circle.showTargetToMembers !== false;
        const canSeeConfirmedTotal =
          !isSupportCircle ||
          isManager ||
          circle.showConfirmedTotalToMembers !== false;

        return {
          id: circle.id,
          name: circle.name,
          type: circle.type,
          imageUrl: circle.imageUrl ?? null,
          role,
          membershipStatus,
          memberCount: membershipCounts.get(circle.id) ?? circle.memberCount,
          memberLimit: circle.memberLimit,
          targetAmount: canSeeTarget ? circle.targetAmount : null,
          contributedAmount: canSeeConfirmedTotal
            ? circle.contributedAmount
            : null,
          progress:
            canSeeTarget && canSeeConfirmedTotal && circle.targetAmount > 0
              ? Math.min(
                  100,
                  Math.round(
                    (circle.contributedAmount / circle.targetAmount) * 100,
                  ),
                )
              : null,
          deadline: circle.deadline ?? null,
          eventDate: circle.eventDate ?? null,
          status: circle.status,
          createdAt: circle.createdAt,
          createdByCurrentUser: circle.creator.id === userId,
        };
      });
  } catch (error) {
    logger.error("dashboard_data_load_failed", {
      userId,
      error: error instanceof Error ? error.message : "unknown",
    });
    throw new DashboardDataError();
  }
}
