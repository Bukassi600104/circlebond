import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Activity, Bell, CircleUserRound, Settings } from "lucide-react";
import { CircleCollection } from "@/components/dashboard/CircleCollection";
import { CreateCircleChoices } from "@/components/dashboard/CreateCircleChoices";
import { GiftCircleForm } from "@/components/gift-circles/GiftCircleForm";
import { AsoEbiCircleForm } from "@/components/aso-ebi/AsoEbiCircleForm";
import { SupportCircleForm } from "@/components/support-circles/SupportCircleForm";
import { LogoutButton } from "@/features/auth/components";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { requireSession } from "@/server/auth";
import { loadDashboardCircles } from "@/server/repositories/dashboard";
import { loadUserActivity } from "@/server/repositories/communication";
import { loadNotificationWorkspace } from "@/server/repositories/notifications";

const collectionSections = {
  circles: {
    title: "All circles",
    description: "Every circle you created, joined or were invited to.",
    filter: () => true,
  },
  created: {
    title: "Created by me",
    description: "Circles where you are the creator.",
    filter: (circle: { createdByCurrentUser: boolean }) =>
      circle.createdByCurrentUser,
  },
  joined: {
    title: "Joined circles",
    description: "Circles you joined as a member.",
    filter: (circle: {
      createdByCurrentUser: boolean;
      membershipStatus: string;
    }) =>
      !circle.createdByCurrentUser &&
      !["invited", "pending"].includes(circle.membershipStatus),
  },
  invitations: {
    title: "Pending invitations",
    description: "Invitations waiting for your response.",
    filter: (circle: { membershipStatus: string }) =>
      ["invited", "pending"].includes(circle.membershipStatus),
  },
  completed: {
    title: "Completed circles",
    description: "Celebrations and support circles that reached completion.",
    filter: (circle: { status: string }) => circle.status === "completed",
  },
  archived: {
    title: "Archived circles",
    description: "Older circles retained for your records.",
    filter: (circle: { status: string }) => circle.status === "archived",
  },
};

const informationalSections = {
  activity: {
    title: "Activity",
    description: "Circle activity will appear here as it happens.",
    icon: Activity,
  },
  notifications: {
    title: "Notifications",
    description: "You have no unread notifications.",
    icon: Bell,
  },
  profile: {
    title: "Profile",
    description: "Your verified BondCircle account.",
    icon: CircleUserRound,
  },
  settings: {
    title: "Settings",
    description: "Manage account access and preferences.",
    icon: Settings,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const item =
    collectionSections[section as keyof typeof collectionSections] ??
    informationalSections[section as keyof typeof informationalSections];
  return { title: item?.title ?? "Account" };
}

export default async function AccountSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await requireSession();
  const { section } = await params;

  if (section === "create") {
    const { type } = await searchParams;
    if (type === "gift") return <GiftCircleForm />;
    if (type === "aso-ebi") return <AsoEbiCircleForm />;
    if (type === "support") return <SupportCircleForm />;
    return <CreateCircleChoices selected={type} />;
  }

  const collection =
    collectionSections[section as keyof typeof collectionSections];
  if (collection) {
    const circles = await loadDashboardCircles(session.uid);
    return (
      <CircleCollection
        title={collection.title}
        description={collection.description}
        circles={circles.filter(collection.filter)}
      />
    );
  }

  if (section === "activity") {
    const events = await loadUserActivity(session.uid);
    return (
      <section className="bc-dashboard-activity">
        <header>
          <Link href="/account">← Dashboard</Link>
          <h1>Activity</h1>
          <p>
            Verified system events across every circle you belong to. Members
            cannot edit this timeline.
          </p>
        </header>
        <ActivityFeed events={events} showCircleName />
      </section>
    );
  }

  if (section === "notifications") {
    const workspace = await loadNotificationWorkspace(session.uid);
    return <NotificationCenter workspace={workspace} />;
  }

  const information =
    informationalSections[section as keyof typeof informationalSections];
  if (!information) notFound();
  const Icon = information.icon;

  return (
    <section className="bc-dashboard-info-page">
      <Link href="/account">← Dashboard</Link>
      <span>
        <Icon size={24} aria-hidden="true" />
      </span>
      <h1>{information.title}</h1>
      <p>{information.description}</p>
      {section === "profile" && (
        <dl>
          <div>
            <dt>Display name</dt>
            <dd>{session.name ?? "BondCircle member"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{session.email ?? "Not added"}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{session.phone_number ?? "Not added"}</dd>
          </div>
        </dl>
      )}
      {section === "settings" && <LogoutButton />}
    </section>
  );
}
