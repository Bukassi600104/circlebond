import Link from "next/link";
import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Gift,
  HeartHandshake,
  MailPlus,
  Shirt,
  UserRoundCheck,
} from "lucide-react";
import type { DashboardCircle } from "@/server/repositories/dashboard";
import { DashboardCircleCard } from "./DashboardCircleCard";

const creationChoices = [
  {
    href: "/account/create?type=gift",
    title: "Create Gift Circle",
    description: "Make group gifting easy and transparent.",
    icon: Gift,
    className: "is-gift",
  },
  {
    href: "/account/create?type=aso-ebi",
    title: "Create Aso-Ebi Circle",
    description: "Coordinate fabric tiers, payment and delivery.",
    icon: Shirt,
    className: "is-aso-ebi",
  },
  {
    href: "/account/create?type=support",
    title: "Create Support Circle",
    description: "Bring trusted people together around a need.",
    icon: HeartHandshake,
    className: "is-support",
  },
];

export function DashboardEmptyState({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  return (
    <div className="bc-dashboard-empty">
      <span aria-hidden="true">
        <Gift size={18} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

function CircleGroup({
  circles,
  emptyMessage,
  href,
  title,
}: {
  circles: DashboardCircle[];
  emptyMessage: string;
  href: string;
  title: string;
}) {
  return (
    <section className="bc-dashboard-section">
      <header>
        <h2>{title}</h2>
        <Link href={href}>
          View all <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </header>
      {circles.length > 0 ? (
        <div className="bc-dashboard-circle-list">
          {circles.slice(0, 3).map((circle) => (
            <DashboardCircleCard circle={circle} key={circle.id} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          title={`No ${title.toLowerCase()} yet`}
          message={emptyMessage}
        />
      )}
    </section>
  );
}

export function DashboardHome({
  circles,
  displayName,
}: {
  circles: DashboardCircle[];
  displayName: string;
}) {
  const firstName = displayName.split(/\s+/)[0];
  const created = circles.filter((circle) => circle.createdByCurrentUser);
  const joined = circles.filter(
    (circle) =>
      !circle.createdByCurrentUser &&
      !["invited", "pending"].includes(circle.membershipStatus),
  );
  const invitations = circles.filter((circle) =>
    ["invited", "pending"].includes(circle.membershipStatus),
  );
  const completed = circles.filter((circle) => circle.status === "completed");
  const archived = circles.filter((circle) => circle.status === "archived");

  const summaries = [
    {
      href: "/account/created",
      label: "Created by me",
      value: created.length,
      icon: Gift,
    },
    {
      href: "/account/joined",
      label: "Joined circles",
      value: joined.length,
      icon: UserRoundCheck,
    },
    {
      href: "/account/invitations",
      label: "Pending invitations",
      value: invitations.length,
      icon: MailPlus,
    },
    {
      href: "/account/completed",
      label: "Completed circles",
      value: completed.length,
      icon: CheckCircle2,
    },
    {
      href: "/account/archived",
      label: "Archived circles",
      value: archived.length,
      icon: Archive,
    },
  ];

  return (
    <>
      <section className="bc-dashboard-hero">
        <div>
          <p>Good to see you, {firstName} 👋</p>
          <h1>Build bonds. Celebrate together.</h1>
          <span>
            Start a new circle or check in on the people counting on you.
          </span>
        </div>
      </section>

      <section className="bc-dashboard-create" aria-labelledby="create-heading">
        <header>
          <div>
            <p>START SOMETHING MEANINGFUL</p>
            <h2 id="create-heading">Create a circle</h2>
          </div>
        </header>
        <div>
          {creationChoices.map(
            ({ className, description, href, icon: Icon, title }) => (
              <Link className={className} href={href} key={href}>
                <span>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <strong>{title}</strong>
                <p>{description}</p>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ),
          )}
        </div>
      </section>

      <nav className="bc-dashboard-summaries" aria-label="Circle summaries">
        {summaries.map(({ href, icon: Icon, label, value }) => (
          <Link href={href} key={href}>
            <span>
              <Icon size={17} aria-hidden="true" />
            </span>
            <strong>{value}</strong>
            <small>{label}</small>
          </Link>
        ))}
      </nav>

      <div className="bc-dashboard-groups">
        <CircleGroup
          title="Created by me"
          href="/account/created"
          circles={created}
          emptyMessage="Create your first circle when the moment is right."
        />
        <CircleGroup
          title="Joined circles"
          href="/account/joined"
          circles={joined}
          emptyMessage="Circles you join will appear here."
        />
        <CircleGroup
          title="Pending invitations"
          href="/account/invitations"
          circles={invitations}
          emptyMessage="You have no invitations waiting for a response."
        />
        <CircleGroup
          title="Completed circles"
          href="/account/completed"
          circles={completed}
          emptyMessage="Completed celebrations will be kept here."
        />
        <CircleGroup
          title="Archived circles"
          href="/account/archived"
          circles={archived}
          emptyMessage="Archived circles will remain available here."
        />
      </div>
    </>
  );
}
