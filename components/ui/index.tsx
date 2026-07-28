import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Crown,
  Gift,
  Truck,
} from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  children,
  className,
  loading = false,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={cx("bc-button", `bc-button--${variant}`, className)}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="bc-spinner" aria-hidden="true" />}
      <span>{loading ? "Please wait" : children}</span>
    </button>
  );
}

export function IconButton({
  label,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      className={cx("bc-icon-button", className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("bc-card", className)} {...props} />;
}

type Status =
  | "draft"
  | "active"
  | "pending"
  | "invited"
  | "joined"
  | "receipt-submitted"
  | "awaiting-review"
  | "part-paid"
  | "paid"
  | "completed"
  | "archived"
  | "rejected"
  | "cancelled"
  | "delivered";

const statusLabels: Record<Status, string> = {
  draft: "Draft",
  active: "Active",
  pending: "Pending",
  invited: "Invited",
  joined: "Joined",
  "receipt-submitted": "Receipt submitted",
  "awaiting-review": "Awaiting review",
  "part-paid": "Part-paid",
  paid: "Paid",
  completed: "Completed",
  archived: "Archived",
  rejected: "Rejected",
  cancelled: "Cancelled",
  delivered: "Delivered",
};

export function StatusBadge({ status }: { status: Status }) {
  const positive = ["active", "joined", "paid", "completed"].includes(status);
  const caution = [
    "pending",
    "receipt-submitted",
    "awaiting-review",
    "part-paid",
  ].includes(status);
  const negative = ["rejected", "cancelled"].includes(status);
  const Icon = positive
    ? Check
    : status === "delivered"
      ? Truck
      : caution
        ? Clock3
        : null;

  return (
    <span
      className={cx(
        "bc-status",
        positive && "bc-status--positive",
        caution && "bc-status--caution",
        negative && "bc-status--negative",
        status === "delivered" && "bc-status--info",
      )}
    >
      {Icon && <Icon size={12} aria-hidden="true" />}
      {statusLabels[status]}
    </span>
  );
}

export function MemberAvatar({
  initials,
  name,
  role,
  src,
  size = "medium",
}: {
  initials: string;
  name: string;
  role?: "creator" | "co-admin" | "member";
  src?: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    <span className={cx("bc-avatar-wrap", `bc-avatar-wrap--${size}`)}>
      <span
        className="bc-avatar"
        role="img"
        aria-label={`${name}${role ? `, ${role}` : ""}`}
        style={src ? { backgroundImage: `url(${src})` } : undefined}
      >
        {!src && initials}
      </span>
      {role === "creator" && (
        <span className="bc-avatar-role" aria-label="Creator">
          <Crown size={11} aria-hidden="true" />
        </span>
      )}
    </span>
  );
}

export function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="bc-progress">
      <div className="bc-progress__labels">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div
        className="bc-progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

export function ProgressRing({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div
      className="bc-progress-ring"
      style={{ "--progress": `${safeValue * 3.6}deg` } as React.CSSProperties}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <span>{safeValue}%</span>
    </div>
  );
}

export function CircleCard({
  name,
  type,
  amount,
  target,
  progress,
  status,
}: {
  name: string;
  type: string;
  amount: string;
  target: string;
  progress: number;
  status: "active" | "completed";
}) {
  return (
    <Card className="bc-circle-card">
      <div className="bc-circle-card__icon" aria-hidden="true">
        <Gift size={22} />
      </div>
      <div className="bc-circle-card__body">
        <div className="bc-circle-card__title">
          <div>
            <strong>{name}</strong>
            <span>{type}</span>
          </div>
          <StatusBadge status={status} />
        </div>
        <ProgressBar label={`${amount} of ${target}`} value={progress} />
      </div>
      <ChevronRight size={18} aria-hidden="true" />
    </Card>
  );
}

export function TierCard({
  amount,
  gift,
  name,
  selected = false,
}: {
  amount: string;
  gift: string;
  name: string;
  selected?: boolean;
}) {
  return (
    <button
      className={cx("bc-tier-card", selected && "bc-tier-card--selected")}
      aria-pressed={selected}
    >
      {selected && <span className="bc-tier-card__flag">Most popular</span>}
      <span>{name}</span>
      <strong>{amount}</strong>
      <span>{gift}</span>
      <span className="bc-tier-card__select" aria-hidden="true">
        {selected && <Check size={14} />}
      </span>
    </button>
  );
}

export function Tabs({ active, items }: { active: string; items: string[] }) {
  return (
    <div className="bc-tabs" role="tablist" aria-label="Content sections">
      {items.map((item) => (
        <button
          type="button"
          role="tab"
          aria-selected={item === active}
          className={item === active ? "is-active" : undefined}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function NotificationItem({
  title,
  detail,
  unread = false,
}: {
  title: string;
  detail: string;
  unread?: boolean;
}) {
  return (
    <article className={cx("bc-feed-item", unread && "is-unread")}>
      <span className="bc-feed-item__icon" aria-hidden="true">
        <Bell size={17} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      {unread && <span className="bc-unread-dot" aria-label="Unread" />}
    </article>
  );
}

export function ActivityItem({
  detail,
  title,
}: {
  detail: string;
  title: string;
}) {
  return (
    <article className="bc-feed-item">
      <span className="bc-feed-item__icon bc-feed-item__icon--mint">
        <Check size={17} aria-hidden="true" />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
    </article>
  );
}

export function Comment({
  author,
  children,
  time,
}: {
  author: string;
  children: ReactNode;
  time: string;
}) {
  return (
    <article className="bc-comment">
      <MemberAvatar initials={author.slice(0, 2).toUpperCase()} name={author} />
      <div>
        <div className="bc-comment__meta">
          <strong>{author}</strong>
          <span>{time}</span>
        </div>
        <p>{children}</p>
      </div>
    </article>
  );
}

export function AnnouncementCard({
  body,
  pinned = false,
  title,
}: {
  body: string;
  pinned?: boolean;
  title: string;
}) {
  return (
    <Card className="bc-announcement">
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
      {pinned && <span className="bc-announcement__pin">Pinned</span>}
    </Card>
  );
}

export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bc-skeleton" aria-label="Loading content" role="status">
      <span className="bc-skeleton__avatar" />
      <div>
        {Array.from({ length: lines }, (_, index) => (
          <span key={index} style={{ width: `${100 - index * 16}%` }} />
        ))}
      </div>
    </div>
  );
}
