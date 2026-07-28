"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ImagePlus,
  Plus,
  Shirt,
  Trash2,
  X,
} from "lucide-react";
import {
  CIRCLE_PRICING_PLANS,
  planForMemberCount,
  type CirclePricingPlan,
} from "@/lib/circle-pricing";

type Invite = { email: string };
type TierDraft = {
  id: string;
  name: string;
  price: string;
  fabricDescription: string;
  appreciationGiftName: string;
  availabilityNote: string;
  deliveryDetails: string;
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const eventTypes = [
  ["wedding", "Wedding"],
  ["burial", "Burial"],
  ["birthday", "Birthday"],
  ["anniversary", "Anniversary"],
  ["thanksgiving", "Thanksgiving"],
  ["naming_ceremony", "Naming ceremony"],
  ["religious_event", "Religious event"],
  ["other", "Other"],
] as const;

function newTier(): TierDraft {
  return {
    id: crypto.randomUUID(),
    name: "",
    price: "",
    fabricDescription: "",
    appreciationGiftName: "",
    availabilityNote: "",
    deliveryDetails: "",
  };
}

function planLabel(plan: CirclePricingPlan) {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

export function AsoEbiCircleForm() {
  const router = useRouter();
  const [pricingPlan, setPricingPlan] = useState<CirclePricingPlan>("free");
  const [memberCapacity, setMemberCapacity] = useState("");
  const [capacityIssue, setCapacityIssue] = useState<number | null>(null);
  const [tiers, setTiers] = useState<TierDraft[]>(() => [newTier()]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const selectedPlan = CIRCLE_PRICING_PLANS[pricingPlan];
  const capacityNumber = Number(memberCapacity);
  const validCapacity =
    Number.isInteger(capacityNumber) &&
    capacityNumber >= 2 &&
    capacityNumber <= selectedPlan.memberLimit;
  const openSlots = validCapacity ? capacityNumber - 1 : 0;

  function updateTier(id: string, changes: Partial<TierDraft>) {
    setTiers((current) =>
      current.map((tier) => (tier.id === id ? { ...tier, ...changes } : tier)),
    );
  }

  function selectPlan(plan: CirclePricingPlan) {
    setPricingPlan(plan);
    const limit = CIRCLE_PRICING_PLANS[plan].memberLimit;
    if (capacityNumber > limit) {
      setMemberCapacity(String(limit));
      setInvites((current) => current.slice(0, limit - 1));
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const form = new FormData(event.currentTarget);
      form.set(
        "tiers",
        JSON.stringify(
          tiers.map((tier) => ({
            ...tier,
            price: Number(tier.price),
          })),
        ),
      );
      form.set("invites", JSON.stringify(invites));
      const csrf = await csrfToken();
      const response = await fetch("/api/circles/aso-ebi", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: form,
      });
      const data = (await response.json()) as {
        circleId?: string;
        error?: string;
      };
      if (!response.ok || !data.circleId) {
        throw new Error(data.error ?? "Unable to create the Aso-Ebi Circle.");
      }
      router.push(`/account/circles/${data.circleId}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      setBusy(false);
    }
  }

  return (
    <section className="bc-gift-create bc-aso-create">
      <header>
        <Link href="/account/create">
          <ArrowLeft size={15} aria-hidden="true" />
          Circle types
        </Link>
        <p>ASO-EBI CIRCLE</p>
        <h1>Coordinate attire for any event</h1>
        <span>
          Set the event, create the fabric options and keep fulfilment clear.
        </span>
      </header>

      <form onSubmit={submit}>
        <fieldset className="bc-gift-pricing">
          <legend>Choose your circle plan</legend>
          <p>The selected plan sets the maximum number of members.</p>
          <div>
            {(
              Object.entries(CIRCLE_PRICING_PLANS) as Array<
                [
                  CirclePricingPlan,
                  (typeof CIRCLE_PRICING_PLANS)[CirclePricingPlan],
                ]
              >
            ).map(([plan, details]) => (
              <label
                className={pricingPlan === plan ? "is-selected" : ""}
                key={plan}
              >
                <input
                  type="radio"
                  name="pricingPlan"
                  value={plan}
                  checked={pricingPlan === plan}
                  onChange={() => selectPlan(plan)}
                />
                <span>
                  <strong>{planLabel(plan)}</strong>
                  {pricingPlan === plan ? (
                    <Check size={13} aria-label="Selected plan" />
                  ) : null}
                </span>
                <b>
                  {details.activationPrice
                    ? naira.format(details.activationPrice)
                    : "Free"}
                </b>
                <small>Up to {details.memberLimit} members</small>
              </label>
            ))}
          </div>
        </fieldset>

        <section className="bc-aso-section">
          <header>
            <Shirt size={18} aria-hidden="true" />
            <div>
              <h2>Event details</h2>
              <p>Aso-Ebi is available for every approved event type.</p>
            </div>
          </header>
          <div className="bc-gift-create__fields">
            <label>
              Event title
              <input name="eventTitle" required maxLength={80} />
            </label>
            <label>
              Event type
              <select name="eventType" required defaultValue="">
                <option value="" disabled>
                  Select event type
                </option>
                {eventTypes.map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Event date
              <input name="eventDate" type="date" required />
            </label>
            <label>
              Organizer name
              <input name="organizerName" required maxLength={100} />
            </label>
            <label>
              Number of people
              <input
                name="memberCapacity"
                type="number"
                min="2"
                max={selectedPlan.memberLimit}
                step="1"
                required
                placeholder={`2–${selectedPlan.memberLimit}`}
                value={memberCapacity}
                onChange={(event) => {
                  setMemberCapacity(event.target.value);
                  if (!event.target.value) return;
                  const requested = Number(event.target.value);
                  if (
                    Number.isInteger(requested) &&
                    requested > selectedPlan.memberLimit
                  ) {
                    setCapacityIssue(requested);
                    return;
                  }
                  if (Number.isInteger(requested) && requested >= 2) {
                    setInvites((current) => current.slice(0, requested - 1));
                  }
                }}
              />
              <small>
                {planLabel(pricingPlan)} supports up to{" "}
                {selectedPlan.memberLimit} people, including you.
              </small>
            </label>
            <label className="bc-gift-create__wide">
              Description
              <textarea name="description" required rows={3} maxLength={500} />
            </label>
          </div>
          <label className="bc-gift-image">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Selected fabric preview" />
            ) : (
              <ImagePlus size={25} aria-hidden="true" />
            )}
            <span>
              <strong>Add the main fabric image</strong>
              <small>JPG, PNG or WebP · up to 5 MB</small>
            </span>
            <input
              name="fabricImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (preview) URL.revokeObjectURL(preview);
                setPreview(file ? URL.createObjectURL(file) : "");
              }}
            />
          </label>
        </section>

        <section className="bc-aso-section bc-aso-tiers">
          <header>
            <div>
              <h2>Tier configuration</h2>
              <p>
                At least one tier is required. Add as many custom options as
                this event needs.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setTiers((current) =>
                  current.length < 20 ? [...current, newTier()] : current,
                )
              }
              disabled={tiers.length >= 20}
            >
              <Plus size={15} aria-hidden="true" />
              Add another tier
            </button>
          </header>
          <div>
            {tiers.map((tier, index) => (
              <article key={tier.id}>
                <header>
                  <span>Tier {index + 1}</span>
                  {tiers.length > 1 ? (
                    <button
                      type="button"
                      aria-label={`Remove tier ${index + 1}`}
                      onClick={() =>
                        setTiers((current) =>
                          current.filter((item) => item.id !== tier.id),
                        )
                      }
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  ) : null}
                </header>
                <div>
                  <label>
                    Tier name
                    <input
                      required
                      maxLength={60}
                      value={tier.name}
                      onChange={(event) =>
                        updateTier(tier.id, { name: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    Price (₦)
                    <input
                      type="number"
                      min="100"
                      step="1"
                      required
                      value={tier.price}
                      onChange={(event) =>
                        updateTier(tier.id, { price: event.target.value })
                      }
                    />
                  </label>
                  <label className="bc-gift-create__wide">
                    Fabric description
                    <textarea
                      required
                      rows={2}
                      maxLength={300}
                      value={tier.fabricDescription}
                      onChange={(event) =>
                        updateTier(tier.id, {
                          fabricDescription: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Appreciation gift name
                    <input
                      maxLength={80}
                      value={tier.appreciationGiftName}
                      onChange={(event) =>
                        updateTier(tier.id, {
                          appreciationGiftName: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    Quantity or availability note
                    <input
                      maxLength={120}
                      value={tier.availabilityNote}
                      onChange={(event) =>
                        updateTier(tier.id, {
                          availabilityNote: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="bc-gift-create__wide">
                    Delivery or collection details
                    <input
                      maxLength={200}
                      value={tier.deliveryDetails}
                      onChange={(event) =>
                        updateTier(tier.id, {
                          deliveryDetails: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label className="bc-aso-file">
                    Tier fabric image (optional)
                    <input
                      name={`tierFabricImage:${tier.id}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                    />
                  </label>
                  <label className="bc-aso-file">
                    Appreciation gift image (optional)
                    <input
                      name={`tierGiftImage:${tier.id}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                    />
                  </label>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bc-gift-payment-setup">
          <header>
            <div>
              <h2>Payment account</h2>
              <p>
                Members pay this account directly. BondCircle does not hold
                contribution money.
              </p>
            </div>
          </header>
          <div>
            <label>
              Bank name
              <input name="paymentBankName" required maxLength={80} />
            </label>
            <label>
              Account name
              <input name="paymentAccountName" required maxLength={100} />
            </label>
            <label>
              Account number
              <input
                name="paymentAccountNumber"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10 digits"
              />
            </label>
          </div>
        </section>

        <section className="bc-gift-invites">
          <header>
            <div>
              <h2>Invite members</h2>
              <p>Members choose their tier after joining.</p>
            </div>
            <button
              type="button"
              disabled={!validCapacity || invites.length >= openSlots}
              onClick={() =>
                setInvites((current) => [...current, { email: "" }])
              }
            >
              <Plus size={15} aria-hidden="true" />
              Add member
            </button>
          </header>
          {invites.length ? (
            <div className="bc-gift-invites__list">
              {invites.map((invite, index) => (
                <div key={index}>
                  <label>
                    Member email
                    <input
                      type="email"
                      required
                      value={invite.email}
                      onChange={(event) =>
                        setInvites((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? { email: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                  <button
                    type="button"
                    aria-label={`Remove member ${index + 1}`}
                    onClick={() =>
                      setInvites((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="bc-gift-invites__empty">
              {validCapacity
                ? `${openSlots} member ${openSlots === 1 ? "place" : "places"} can be invited now or later.`
                : "Choose the number of people before adding members."}
            </p>
          )}
        </section>

        {error ? (
          <p className="bc-gift-create__error" role="alert">
            {error}
          </p>
        ) : null}
        <footer>
          <Link href="/account">Cancel</Link>
          <button type="submit" disabled={busy}>
            {busy ? "Creating securely…" : "Create Aso-Ebi Circle"}
          </button>
        </footer>
      </form>

      {capacityIssue !== null ? (
        <div
          className="bc-tier-modal"
          role="presentation"
          onMouseDown={() => setCapacityIssue(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="aso-tier-limit-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close plan notice"
              onClick={() => setCapacityIssue(null)}
            >
              <X size={16} aria-hidden="true" />
            </button>
            <span>PLAN LIMIT</span>
            <h2 id="aso-tier-limit-title">
              {planLabel(pricingPlan)} supports up to {selectedPlan.memberLimit}{" "}
              members
            </h2>
            <p>
              You entered {capacityIssue}. Choose a larger plan to keep that
              circle size.
            </p>
            <footer>
              <button
                type="button"
                onClick={() => {
                  setMemberCapacity(String(selectedPlan.memberLimit));
                  setInvites((current) =>
                    current.slice(0, selectedPlan.memberLimit - 1),
                  );
                  setCapacityIssue(null);
                }}
              >
                Use {selectedPlan.memberLimit}
              </button>
              {capacityIssue <= 100 ? (
                <button
                  type="button"
                  onClick={() => {
                    setPricingPlan(planForMemberCount(capacityIssue));
                    setCapacityIssue(null);
                  }}
                >
                  Upgrade to {planLabel(planForMemberCount(capacityIssue))}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              ) : null}
            </footer>
          </section>
        </div>
      ) : null}
    </section>
  );
}
