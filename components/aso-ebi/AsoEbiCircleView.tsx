"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  Check,
  Gift,
  MapPin,
  PackageCheck,
  Shirt,
  Truck,
  Users,
} from "lucide-react";
import type {
  AsoEbiCircleDetail,
  AsoEbiMember,
} from "@/server/repositories/aso-ebi-circles";
import { InvitationManager } from "@/components/invitations/InvitationManager";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const nextDeliveryStatuses: Record<string, string[]> = {
  paid: ["preparing", "ready_for_collection", "dispatched"],
  preparing: ["ready_for_collection", "dispatched"],
  ready_for_collection: ["collected", "dispatched"],
  dispatched: ["delivered"],
  delivered: ["collected"],
};

function label(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function MemberAvatar({ member }: { member: AsoEbiMember }) {
  return member.profileImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={member.profileImage} alt="" />
  ) : (
    <span>{member.displayName.charAt(0).toUpperCase()}</span>
  );
}

export function AsoEbiCircleView({
  circle,
  viewerId,
}: {
  circle: AsoEbiCircleDetail;
  viewerId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const viewer = circle.members.find((member) => member.id === viewerId);
  const canManage =
    circle.creatorId === viewerId || viewer?.role === "co_admin";

  async function selectTier(tierId: string) {
    setBusy(`tier:${tierId}`);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(`/api/circles/${circle.id}/aso-ebi/tier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ tierId }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Unable to select tier.");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function updateDelivery(memberId: string, status: string) {
    setBusy(`member:${memberId}`);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(
        `/api/circles/${circle.id}/aso-ebi/fulfilment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify({ memberId, status }),
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to update delivery status.");
      }
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  return (
    <section className="bc-aso-view">
      <Link href="/account">
        <ArrowLeft size={15} aria-hidden="true" />
        Dashboard
      </Link>

      <header className="bc-aso-hero">
        {circle.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={circle.imageUrl} alt="" />
        ) : null}
        <div>
          <span>ASO-EBI CIRCLE · {label(circle.eventType)}</span>
          <h1>{circle.name}</h1>
          <p>{circle.description}</p>
          <dl>
            <div>
              <dt>
                <CalendarDays size={14} aria-hidden="true" /> Event date
              </dt>
              <dd>
                {circle.eventDate
                  ? dateFormat.format(new Date(`${circle.eventDate}T12:00:00`))
                  : "Not set"}
              </dd>
            </div>
            <div>
              <dt>
                <Users size={14} aria-hidden="true" /> Organizer
              </dt>
              <dd>{circle.organizerName}</dd>
            </div>
          </dl>
        </div>
      </header>

      {error ? (
        <p className="bc-gift-create__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="bc-aso-view__layout">
        <main>
          <section className="bc-aso-tier-picker">
            <header>
              <div>
                <span>CHOOSE YOUR OPTION</span>
                <h2>Fabric tiers</h2>
              </div>
              <small>{circle.tiers.length} available</small>
            </header>
            <div>
              {circle.tiers.map((tier) => {
                const selected = viewer?.selectedTier?.id === tier.id;
                return (
                  <article
                    className={selected ? "is-selected" : ""}
                    key={tier.id}
                  >
                    <div className="bc-aso-tier-card__media">
                      {(tier.fabricImageUrl ?? circle.imageUrl) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={tier.fabricImageUrl ?? circle.imageUrl ?? ""}
                          alt=""
                        />
                      ) : (
                        <Shirt size={28} aria-hidden="true" />
                      )}
                      {selected ? (
                        <span>
                          <Check size={13} aria-hidden="true" /> Selected
                        </span>
                      ) : null}
                    </div>
                    <div className="bc-aso-tier-card__body">
                      <h3>{tier.name}</h3>
                      <strong>{naira.format(tier.price)}</strong>
                      <p>{tier.fabricDescription}</p>
                      {tier.availabilityNote ? (
                        <small>{tier.availabilityNote}</small>
                      ) : null}
                      {tier.deliveryDetails ? (
                        <div>
                          <MapPin size={13} aria-hidden="true" />
                          {tier.deliveryDetails}
                        </div>
                      ) : null}
                      {tier.appreciationGiftName ? (
                        <aside>
                          {tier.appreciationGiftImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={tier.appreciationGiftImageUrl} alt="" />
                          ) : (
                            <Gift size={18} aria-hidden="true" />
                          )}
                          <span>
                            <small>Appreciation gift</small>
                            <b>{tier.appreciationGiftName}</b>
                          </span>
                        </aside>
                      ) : null}
                      <button
                        type="button"
                        disabled={selected || Boolean(busy)}
                        onClick={() => selectTier(tier.id)}
                      >
                        {busy === `tier:${tier.id}`
                          ? "Selecting…"
                          : selected
                            ? "Your selected tier"
                            : "Choose this tier"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="bc-aso-members">
            <header>
              <div>
                <span>
                  {circle.members.length}/{circle.memberLimit}
                </span>
                <h2>Member status</h2>
              </div>
              <div className="bc-circle-member-actions">
                <small>
                  {
                    circle.members.filter((member) => member.selectedTier)
                      .length
                  }{" "}
                  tier selections
                </small>
                {canManage ? (
                  <InvitationManager
                    circleId={circle.id}
                    openSlots={circle.memberLimit - circle.members.length}
                  />
                ) : null}
              </div>
            </header>
            <div>
              {circle.members.map((member) => {
                const choices =
                  nextDeliveryStatuses[member.fulfilmentStatus] ?? [];
                return (
                  <article key={member.id}>
                    <div className="bc-aso-member__avatar">
                      <MemberAvatar member={member} />
                    </div>
                    <div>
                      <strong>
                        {member.displayName}
                        {member.id === viewerId ? " (You)" : ""}
                      </strong>
                      <small>
                        {member.selectedTier
                          ? `${member.selectedTier.name} · ${naira.format(member.expectedAmount)}`
                          : "Tier not selected"}
                      </small>
                    </div>
                    <span className={`is-${member.fulfilmentStatus}`}>
                      {label(member.fulfilmentStatus)}
                    </span>
                    {canManage && choices.length ? (
                      <label>
                        <span>Update delivery status</span>
                        <select
                          aria-label={`Update delivery status for ${member.displayName}`}
                          defaultValue=""
                          disabled={Boolean(busy)}
                          onChange={(event) => {
                            if (event.target.value) {
                              void updateDelivery(
                                member.id,
                                event.target.value,
                              );
                            }
                          }}
                        >
                          <option value="" disabled>
                            Update
                          </option>
                          {choices.map((status) => (
                            <option value={status} key={status}>
                              {label(status)}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </main>

        <aside className="bc-aso-sidebar">
          <section>
            <header>
              <Banknote size={17} aria-hidden="true" />
              <div>
                <small>PAY CONTRIBUTIONS TO</small>
                <h2>Payment account</h2>
              </div>
            </header>
            {circle.paymentAccountNumber ? (
              <dl>
                <div>
                  <dt>Bank</dt>
                  <dd>{circle.paymentBankName}</dd>
                </div>
                <div>
                  <dt>Account name</dt>
                  <dd>{circle.paymentAccountName}</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd>{circle.paymentAccountNumber}</dd>
                </div>
              </dl>
            ) : (
              <p>Payment account details have not been added.</p>
            )}
            <footer>BondCircle does not hold or process this money.</footer>
          </section>

          <section className="bc-aso-delivery-summary">
            <header>
              <Truck size={17} aria-hidden="true" />
              <h2>Fulfilment</h2>
            </header>
            <div>
              <span>
                <PackageCheck size={16} aria-hidden="true" />
                Delivered or collected
              </span>
              <strong>
                {
                  circle.members.filter((member) =>
                    ["delivered", "collected"].includes(
                      member.fulfilmentStatus,
                    ),
                  ).length
                }
                /{circle.members.length}
              </strong>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
