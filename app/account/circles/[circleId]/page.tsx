import { notFound } from "next/navigation";
import { DashboardCircleCard } from "@/components/dashboard/DashboardCircleCard";
import { requireSession } from "@/server/auth";
import { loadDashboardCircles } from "@/server/repositories/dashboard";
import { GiftCircleView } from "@/components/gift-circles/GiftCircleView";
import { loadGiftCircle } from "@/server/repositories/gift-circles";
import { AsoEbiCircleView } from "@/components/aso-ebi/AsoEbiCircleView";
import { loadAsoEbiCircle } from "@/server/repositories/aso-ebi-circles";
import { SupportCircleView } from "@/components/support-circles/SupportCircleView";
import { loadSupportCircle } from "@/server/repositories/support-circles";

export default async function CircleOverviewPage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const session = await requireSession();
  const { circleId } = await params;
  const giftCircle = await loadGiftCircle(circleId, session.uid);
  if (giftCircle) {
    return <GiftCircleView circle={giftCircle} viewerId={session.uid} />;
  }
  const asoEbiCircle = await loadAsoEbiCircle(circleId, session.uid);
  if (asoEbiCircle) {
    return <AsoEbiCircleView circle={asoEbiCircle} viewerId={session.uid} />;
  }
  const supportCircle = await loadSupportCircle(circleId, session.uid);
  if (supportCircle) {
    return <SupportCircleView circle={supportCircle} viewerId={session.uid} />;
  }
  const circles = await loadDashboardCircles(session.uid);
  const circle = circles.find((item) => item.id === circleId);
  if (!circle) notFound();

  return (
    <section className="bc-dashboard-collection">
      <header>
        <div>
          <h1>{circle.name}</h1>
          <p>Circle overview</p>
        </div>
      </header>
      <DashboardCircleCard circle={circle} />
      <p className="bc-dashboard-phase-note">
        Membership, contribution and activity controls continue in their
        approved milestones.
      </p>
    </section>
  );
}
