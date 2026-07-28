import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireSession } from "@/server/auth";
import "../dashboard.css";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireSession();
  const displayName =
    session.name ?? session.email?.split("@")[0] ?? "BondCircle member";

  return <DashboardShell displayName={displayName}>{children}</DashboardShell>;
}
