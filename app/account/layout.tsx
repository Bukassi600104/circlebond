import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireSession } from "@/server/auth";
import { loadNotificationWorkspace } from "@/server/repositories/notifications";
import "../dashboard.css";
import "../communication.css";
import "../notifications.css";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireSession();
  const displayName =
    session.name ?? session.email?.split("@")[0] ?? "BondCircle member";
  const { unreadCount } = await loadNotificationWorkspace(session.uid);

  return (
    <DashboardShell displayName={displayName} unreadCount={unreadCount}>
      {children}
    </DashboardShell>
  );
}
