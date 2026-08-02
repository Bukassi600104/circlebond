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
import { CircleCommunicationSection } from "@/components/communication/CircleCommunicationSection";
import { CircleLifecyclePanel } from "@/components/lifecycle/CircleLifecyclePanel";
import { loadCircleLifecycle } from "@/server/repositories/lifecycle";
import { loadCirclePricingState } from "@/server/repositories/pricing";
import {
  CIRCLE_PRICING_TIERS,
  PAID_CIRCLE_PRICING_TIERS,
  formatMinorNaira,
  isCirclePricingPlan,
  pricingForCircle,
} from "@/lib/circle-pricing";
import { CircleActivationPanel } from "@/components/pricing/CircleActivationPanel";
import { CircleUpgradePanel } from "@/components/pricing/CircleUpgradePanel";
import {
  entitlementContextForStoredCircle,
  upgradePriceMinor,
} from "@/server/pricing";

export default async function CircleOverviewPage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const session = await requireSession();
  const { circleId } = await params;
  const lifecycle = await loadCircleLifecycle(circleId, session.uid);
  if (!lifecycle) notFound();
  const pricing = await loadCirclePricingState(circleId);
  const activationPanel =
    pricing && pricing.creatorId === session.uid ? (
      <CircleActivationPanel
        circleId={circleId}
        planLabel={pricing.pricingPlan.replace("-", " ")}
        priceLabel={formatMinorNaira(pricing.activationPriceMinor)}
        status={pricing.activationStatus}
      />
    ) : null;
  const lastSuccessfulActivation = pricing?.activations.find(
    ({ status }) => status === "succeeded",
  );
  const currentPricingPlan =
    pricing && isCirclePricingPlan(pricing.pricingPlan)
      ? pricing.pricingPlan
      : null;
  const upgradeOptions =
    pricing &&
    pricing.creatorId === session.uid &&
    pricing.activationStatus === "active" &&
    currentPricingPlan &&
    lastSuccessfulActivation
      ? PAID_CIRCLE_PRICING_TIERS.filter(
          (plan) =>
            CIRCLE_PRICING_TIERS.indexOf(plan) >
            CIRCLE_PRICING_TIERS.indexOf(currentPricingPlan),
        ).map((plan) => {
          const definition = pricingForCircle(pricing.type, plan);
          return {
            plan,
            priceLabel: formatMinorNaira(
              upgradePriceMinor(
                entitlementContextForStoredCircle({
                  type: pricing.type,
                  pricingPlan: currentPricingPlan,
                  pricingModelVersion: pricing.pricingModelVersion,
                  memberLimit: pricing.memberLimit,
                }),
                plan,
                lastSuccessfulActivation.listPriceMinor,
              ),
            ),
            memberLimit: definition.memberLimit,
            coAdminLimit: definition.coAdminLimit,
          };
        })
      : [];
  const upgradePanel = (
    <CircleUpgradePanel circleId={circleId} options={upgradeOptions} />
  );
  const giftCircle = await loadGiftCircle(circleId, session.uid);
  if (giftCircle) {
    return (
      <>
        {activationPanel}
        {upgradePanel}
        <GiftCircleView circle={giftCircle} viewerId={session.uid} />
        <CircleLifecyclePanel summary={lifecycle} />
        <CircleCommunicationSection
          circleId={circleId}
          viewerId={session.uid}
        />
      </>
    );
  }
  const asoEbiCircle = await loadAsoEbiCircle(circleId, session.uid);
  if (asoEbiCircle) {
    return (
      <>
        {activationPanel}
        {upgradePanel}
        <AsoEbiCircleView circle={asoEbiCircle} viewerId={session.uid} />
        <CircleLifecyclePanel summary={lifecycle} />
        <CircleCommunicationSection
          circleId={circleId}
          viewerId={session.uid}
        />
      </>
    );
  }
  const supportCircle = await loadSupportCircle(circleId, session.uid);
  if (supportCircle) {
    return (
      <>
        {activationPanel}
        {upgradePanel}
        <SupportCircleView circle={supportCircle} viewerId={session.uid} />
        <CircleLifecyclePanel summary={lifecycle} />
        <CircleCommunicationSection
          circleId={circleId}
          viewerId={session.uid}
        />
      </>
    );
  }
  const circles = await loadDashboardCircles(session.uid);
  const circle = circles.find((item) => item.id === circleId);
  if (!circle) notFound();

  return (
    <section className="bc-dashboard-collection">
      {activationPanel}
      {upgradePanel}
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
