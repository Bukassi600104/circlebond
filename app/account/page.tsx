import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { requireSession } from "@/server/auth";
import { loadDashboardCircles } from "@/server/repositories/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AccountPage() {
  const session = await requireSession();
  const displayName =
    session.name ?? session.email?.split("@")[0] ?? "BondCircle member";
  const circles = await loadDashboardCircles(session.uid);

  return <DashboardHome circles={circles} displayName={displayName} />;
}
