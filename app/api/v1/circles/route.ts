import { NextResponse } from "next/server";
import { authenticateNativeRequest } from "@/server/auth/native";
import {
  loadDashboardCircles,
  type DashboardCircle,
} from "@/server/repositories/dashboard";

export const runtime = "nodejs";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

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

function parseLimit(raw: string | null): number | null {
  if (raw === null || raw.trim() === "") return DEFAULT_LIMIT;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return Math.min(parsed, MAX_LIMIT);
}

/** Simple opaque offset cursor per the v1 contract ("0", "20", ...). */
function parseCursorOffset(raw: string | null): number | null {
  if (raw === null || raw.trim() === "") return 0;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

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

/** Newest first with a deterministic tie-break so offset pagination is stable. */
function compareForPagination(a: DashboardCircle, b: DashboardCircle): number {
  const timeA = Date.parse(a.createdAt);
  const timeB = Date.parse(b.createdAt);
  if (!Number.isNaN(timeA) && !Number.isNaN(timeB) && timeA !== timeB) {
    return timeB - timeA;
  }
  if (Number.isNaN(timeA) !== Number.isNaN(timeB)) {
    return Number.isNaN(timeA) ? 1 : -1;
  }
  return a.id.localeCompare(b.id);
}

/**
 * GET /api/v1/circles — circles where the caller is creator/co_admin/member
 * (docs/openapi.yaml CircleListResponse). Privacy redaction for support
 * circles is applied inside loadDashboardCircles.
 */
export async function GET(request: Request) {
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

    const url = new URL(request.url);
    const limit = parseLimit(url.searchParams.get("limit"));
    const offset = parseCursorOffset(url.searchParams.get("cursor"));
    if (limit === null) {
      return NextResponse.json(
        { error: "limit must be a positive integer." },
        { status: 400 },
      );
    }
    if (offset === null) {
      return NextResponse.json(
        { error: "cursor must be a non-negative integer offset." },
        { status: 400 },
      );
    }

    const memberships = await loadDashboardCircles(outcome.principal.uid);
    const sorted = [...memberships].sort(compareForPagination);

    const page = sorted.slice(offset, offset + limit);
    const nextOffset = offset + limit;

    return NextResponse.json(
      {
        circles: page.map((circle) => ({
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
        })),
        ...(nextOffset < sorted.length
          ? { nextCursor: String(nextOffset) }
          : {}),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/v1/circles] Failed to list circles:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve circles.",
      },
      { status: 500 },
    );
  }
}
