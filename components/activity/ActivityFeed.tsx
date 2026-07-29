"use client";

import { useState } from "react";
import {
  BadgeCheck,
  BellRing,
  CheckCircle2,
  CircleUserRound,
  Flag,
  Megaphone,
  MessageCircle,
  PackageCheck,
  ReceiptText,
  Send,
  Shirt,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { ActivityEvent } from "@/features/activity";
import type { ActivityFilter } from "@/server/communication/rules";

const dateTime = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

const filters: Array<{ id: ActivityFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "payments", label: "Payments" },
  { id: "comments", label: "Comments" },
  { id: "reminders", label: "Reminders" },
];

const icons: Record<ActivityEvent["type"], LucideIcon> = {
  circle_created: CheckCircle2,
  member_invited: Send,
  member_joined: Users,
  tier_selected: Shirt,
  receipt_submitted: ReceiptText,
  receipt_confirmed: BadgeCheck,
  receipt_rejected: XCircle,
  reminder_sent: BellRing,
  announcement_posted: Megaphone,
  comment_posted: MessageCircle,
  delivery_updated: PackageCheck,
  target_reached: Flag,
  circle_completed: CheckCircle2,
  circle_cancelled: XCircle,
};

function actor(event: ActivityEvent) {
  return event.actorName ?? "BondCircle";
}

function description(event: ActivityEvent) {
  switch (event.type) {
    case "circle_created":
      return `${actor(event)} created the circle.`;
    case "member_invited":
      return `${actor(event)} invited a member.`;
    case "member_joined":
      return `${actor(event)} joined the circle.`;
    case "tier_selected":
      return `${actor(event)} selected an Aso-Ebi tier.`;
    case "receipt_submitted":
      return `${actor(event)} submitted a payment receipt.`;
    case "receipt_confirmed":
      return `${actor(event)} confirmed a payment receipt.`;
    case "receipt_rejected":
      return `${actor(event)} rejected a payment receipt.`;
    case "reminder_sent":
      return `${actor(event)} sent a contribution reminder.`;
    case "announcement_posted":
      return `${actor(event)} posted an announcement.`;
    case "comment_posted":
      return `${actor(event)} added a comment.`;
    case "delivery_updated":
      return `${actor(event)} updated a delivery status.`;
    case "target_reached":
      return "The circle reached its target.";
    case "circle_completed":
      return `${actor(event)} completed the circle.`;
    case "circle_cancelled":
      return `${actor(event)} cancelled the circle.`;
  }
}

export function ActivityFeed({
  events,
  showCircleName = false,
}: {
  events: ActivityEvent[];
  showCircleName?: boolean;
}) {
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const visible = events.filter(
    (event) => filter === "all" || event.filter === filter,
  );

  return (
    <section className="bc-activity-feed" aria-label="Activity feed">
      <div className="bc-activity-filters" aria-label="Filter activity">
        {filters.map((item) => (
          <button
            type="button"
            key={item.id}
            className={filter === item.id ? "is-active" : ""}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length ? (
        <ol>
          {visible.map((event) => {
            const Icon = icons[event.type] ?? CircleUserRound;
            return (
              <li key={event.id}>
                <span className={`is-${event.filter}`}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <div>
                  <p>{description(event)}</p>
                  <small>
                    {showCircleName ? `${event.circleName} · ` : ""}
                    <time dateTime={event.createdAt}>
                      {dateTime.format(new Date(event.createdAt))}
                    </time>
                  </small>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="bc-communication-empty">
          <CircleUserRound size={22} aria-hidden="true" />
          <p>No activity matches this filter yet.</p>
        </div>
      )}
    </section>
  );
}
