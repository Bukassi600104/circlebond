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
    const memberships: DashboardQueryData["circleMemberships"] = [];
    let offset = 0;
    for (;;) {
      const response: { data: DashboardQueryData } =
        await getBondCircleDataConnect().executeQuery<
          DashboardQueryData,
          { userId: string; offset: number }
        >("GetDashboardCirclesForUser", { userId, offset });
      memberships.push(...response.data.circleMemberships);
      if (response.data.circleMemberships.length < 200) break;
      offset += response.data.circleMemberships.length;
    }

    return memberships
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
          memberCount: circle.memberCount,
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
  } catch {
    logger.error("dashboard_data_load_failed", {
      userId,
      reasonCode: "DASHBOARD_DATA_UNAVAILABLE",
    });
    throw new DashboardDataError();
  }
}
