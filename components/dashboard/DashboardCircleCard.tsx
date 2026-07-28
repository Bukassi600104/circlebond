import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Gift, UserPlus, UsersRound } from "lucide-react";
import type { DashboardCircle } from "@/server/repositories/dashboard";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function readableType(type: string) {
  if (type === "aso-ebi") return "Aso-Ebi Circle";
  if (type === "support") return "Support Circle";
  return "Gift Circle";
}

function readableDate(value: string | null) {
  if (!value) return "No date set";
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function DashboardCircleCard({ circle }: { circle: DashboardCircle }) {
  const date = circle.eventDate ?? circle.deadline;
  const amountSummary =
    circle.contributedAmount !== null && circle.targetAmount !== null
      ? `${naira.format(circle.contributedAmount)} of ${naira.format(circle.targetAmount)}`
      : circle.contributedAmount !== null
        ? `${naira.format(circle.contributedAmount)} confirmed · target private`
        : circle.targetAmount !== null
          ? `Confirmed total private · goal ${naira.format(circle.targetAmount)}`
          : "Contribution totals are private";

  return (
    <article className="bc-dashboard-circle-card">
      <Link
        className="bc-dashboard-circle-card__image"
        href={`/account/circles/${circle.id}`}
        aria-label={`Open ${circle.name}`}
      >
        {circle.imageUrl ? (
          <Image
            src={circle.imageUrl}
            alt=""
            fill
            sizes="(max-width: 48rem) 5rem, 7rem"
            unoptimized
          />
        ) : (
          <Gift size={28} aria-hidden="true" />
        )}
      </Link>
      <div className="bc-dashboard-circle-card__body">
        <div className="bc-dashboard-circle-card__heading">
          <div>
            <span>{readableType(circle.type)}</span>
            <Link href={`/account/circles/${circle.id}`}>
              <h3>{circle.name}</h3>
            </Link>
          </div>
          <span className={`bc-dashboard-status is-${circle.status}`}>
            {circle.status}
          </span>
        </div>
        <div className="bc-dashboard-circle-card__meta">
          <span>
            <UsersRound size={14} aria-hidden="true" />
            {circle.memberCount} of {circle.memberLimit} members
          </span>
          <span>
            <CalendarDays size={14} aria-hidden="true" />
            {readableDate(date)}
          </span>
          <span className="bc-dashboard-role">{circle.role}</span>
        </div>
        <div className="bc-dashboard-circle-card__progress">
          <div>
            <span>{amountSummary}</span>
            {circle.progress !== null && <strong>{circle.progress}%</strong>}
          </div>
          {circle.progress !== null && (
            <span
              role="progressbar"
              aria-label={`${circle.name} contribution progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={circle.progress}
            >
              <i style={{ width: `${circle.progress}%` }} />
            </span>
          )}
        </div>
        {circle.createdByCurrentUser &&
          circle.memberCount < circle.memberLimit && (
            <Link
              className="bc-dashboard-circle-card__invite"
              href={`/account/circles/${circle.id}`}
            >
              <UserPlus size={14} aria-hidden="true" />
              Add people
            </Link>
          )}
      </div>
    </article>
  );
}
