import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/owner/OwnerDashboard";
import { requireOwnerSession } from "@/server/owner/auth";
import { loadOwnerOverview } from "@/server/repositories/owner";

export const metadata: Metadata = {
  title: "Owner Administration",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OwnerPage() {
  const { session } = await requireOwnerSession();
  const overview = await loadOwnerOverview(session.uid);
  if (!overview) return null;
  return <OwnerDashboard overview={overview} />;
}
