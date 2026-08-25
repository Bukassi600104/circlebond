import { NextResponse } from "next/server";
import { authenticateNativeRequest } from "@/server/auth/native";
import { loadDashboardCircles } from "@/server/repositories/dashboard";

export const runtime = "nodejs";

type ApiCircleType = "GIFT" | "ASO_EBI" | "SUPPORT";
type ApiCircleStatus = "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "ARCHIVED";
type ApiCircleRole = "creator" | "co_admin" | "member";

// Stored circle types are lowercase ("gift" | "aso-ebi" | "support").
const CIRCLE_TYPE_BY_SOURCE: Record<string, ApiCircleType> = {
  gift: "GIFT",
  "aso-ebi": "ASO_EBI",
  aso_ebi: "ASO_EBI",
  support: "SUPPORT",
};

const CIRCLE_STATUS_VALUES = new Set([
  "draft",
  "active",
  "completed",
  "cancelled",
  "archived",
]);

function circleTypeEnum(sourceType: string): ApiCircleType {
  return (
    CIRCLE_TYPE_BY_SOURCE[sourceType?.toLowerCase() ?? ""] ??
    (sourceType.toUpperCase().replace(/-/g, "_") as ApiCircleType)
  );
}

function circleStatusEnum(sourceStatus: string): ApiCircleStatus {
  const key = sourceStatus?.toLowerCase();
  return (
    CIRCLE_STATUS_VALUES.has(key)
      ? key.toUpperCase()
      : sourceStatus?.toUpperCase() || "DRAFT"
  ) as ApiCircleStatus;
}

function circleRoleEnum(
  membershipRole: string,
  createdByCurrentUser: boolean,
): ApiCircleRole {
  if (createdByCurrentUser) return "creator";
  if (membershipRole === "co_admin") return "co_admin";
  return "member";
}

/**
 * GET /api/v1/circles/:id — a single circle where the caller is
 * creator/co_admin/member (docs/openapi.yaml CircleDetailResponse). The circle
 * is resolved through the same repository as the list route, so support-circle
 * privacy redaction (amounts hidden for non-managers) applies identically and
 * unknown ids / non-memberships yield 404.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const outcome = await authenticateNativeRequest(request);
    if (outcome.state === "unauthenticated") {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }
    if (outcome.state === "suspended") {
      return NextResponse.json({ error: "Account suspended." }, { status: 403 });
    }

    const { id } = await context.params;
    const memberships = await loadDashboardCircles(outcome.principal.uid);
    const circle = memberships.find((item) => item.id === id);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        circle: {
          id: circle.id,
          name: circle.name,
          type: circleTypeEnum(circle.type),
          imageUrl: circle.imageUrl ?? null,
          targetAmount: circle.targetAmount ?? null,
          currentAmount: circle.contributedAmount ?? 0,
          memberCount: circle.memberCount,
          memberLimit: circle.memberLimit,
          status: circleStatusEnum(circle.status),
          deadline: circle.deadline ?? null,
          role: circleRoleEnum(circle.role, circle.createdByCurrentUser),
          createdAt: circle.createdAt,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/v1/circles] Failed to load circle:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve circle.",
      },
      { status: 500 },
    );
  }
}
