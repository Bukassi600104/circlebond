"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Archive,
  Bell,
  CheckCircle2,
  CircleUserRound,
  Gift,
  Home,
  LayoutDashboard,
  MailPlus,
  Plus,
  Settings,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { BrandLockup } from "@/components/layout";

const desktopNavigation = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/created", label: "Created by me", icon: Gift },
  {
    href: "/account/joined",
    label: "Joined circles",
    icon: UserRoundCheck,
  },
  {
    href: "/account/invitations",
    label: "Pending invitations",
    icon: MailPlus,
  },
  { href: "/account/completed", label: "Completed", icon: CheckCircle2 },
  { href: "/account/archived", label: "Archived", icon: Archive },
  { href: "/account/activity", label: "Activity", icon: Activity },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/profile", label: "Profile", icon: CircleUserRound },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

const mobileNavigation = [
  { href: "/account", label: "Home", icon: Home },
  { href: "/account/circles", label: "Circles", icon: UsersRound },
  { href: "/account/create", label: "Create", icon: Plus, create: true },
  { href: "/account/activity", label: "Activity", icon: Activity },
  { href: "/account/profile", label: "Profile", icon: CircleUserRound },
];

function isCurrent(pathname: string, href: string) {
  return href === "/account" ? pathname === href : pathname.startsWith(href);
}

export function DashboardShell({
  children,
  displayName,
}: {
  children: ReactNode;
  displayName: string;
}) {
  const pathname = usePathname();
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bc-dashboard-shell">
      <aside className="bc-dashboard-sidebar">
        <Link href="/account" aria-label="BondCircle dashboard">
          <BrandLockup />
        </Link>
        <nav aria-label="Desktop navigation">
          {desktopNavigation.map(({ href, icon: Icon, label }) => {
            const current = isCurrent(pathname, href);
            return (
              <Link
                href={href}
                className={current ? "is-active" : undefined}
                aria-current={current ? "page" : undefined}
                key={href}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <Link className="bc-dashboard-sidebar__profile" href="/account/profile">
          <span aria-hidden="true">{initials}</span>
          <span>
            <strong>{displayName}</strong>
            <small>View profile</small>
          </span>
        </Link>
      </aside>

      <div className="bc-dashboard-workspace">
        <header className="bc-dashboard-topbar">
          <Link
            className="bc-dashboard-topbar__brand"
            href="/account"
            aria-label="BondCircle home"
          >
            <BrandLockup />
          </Link>
          <div className="bc-dashboard-topbar__welcome">
            <span>Welcome,</span>
            <strong>{displayName}</strong>
          </div>
          <div className="bc-dashboard-topbar__actions">
            <Link href="/account/notifications" aria-label="Notifications">
              <Bell size={19} aria-hidden="true" />
            </Link>
            <Link href="/account/profile" aria-label="Profile">
              <span aria-hidden="true">{initials}</span>
            </Link>
          </div>
        </header>
        <main className="bc-dashboard-main">{children}</main>
      </div>

      <nav className="bc-dashboard-bottom-nav" aria-label="Mobile navigation">
        {mobileNavigation.map(({ create, href, icon: Icon, label }) => {
          const current = isCurrent(pathname, href);
          return (
            <Link
              href={href}
              className={`${current ? "is-active" : ""} ${
                create ? "is-create" : ""
              }`}
              aria-current={current ? "page" : undefined}
              key={href}
            >
              <Icon size={create ? 22 : 19} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
