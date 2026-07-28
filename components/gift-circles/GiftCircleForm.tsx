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
  Trash2,
  X,
} from "lucide-react";
import {
  CIRCLE_PRICING_PLANS,
  planForMemberCount,
  type CirclePricingPlan,
} from "@/lib/circle-pricing";

type Invite = { email: string; amount: string };

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function planLabel(plan: CirclePricingPlan) {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

export function GiftCircleForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [pricingPlan, setPricingPlan] = useState<CirclePricingPlan>("free");
  const [memberCapacity, setMemberCapacity] = useState("");
  const [capacityIssue, setCapacityIssue] = useState<number | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const selectedTier = CIRCLE_PRICING_PLANS[pricingPlan];
  const capacityNumber = Number(memberCapacity);
  const validCapacity =
    Number.isInteger(capacityNumber) &&
    capacityNumber >= 2 &&
    capacityNumber <= selectedTier.memberLimit;
  const openSlots = validCapacity ? capacityNumber - 1 : 0;

  function addInvite() {
    if (!validCapacity || invites.length >= openSlots) return;
    setInvites((current) => [...current, { email: "", amount: "" }]);
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
        "invites",
        JSON.stringify(
          invites.map((invite) => ({
            email: invite.email,
            amount: Number(invite.amount || "0"),
          })),
        ),
      );
      const csrf = await csrfToken();
      const response = await fetch("/api/circles/gift", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: form,
      });
      const data = (await response.json()) as {
        circleId?: string;
        error?: string;
      };
      if (!response.ok || !data.circleId) {
        throw new Error(data.error ?? "Unable to create the Gift Circle.");
      }
      router.push(`/account/circles/${data.circleId}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      setBusy(false);
    }
  }

  return (
    <section className="bc-gift-create">
      <header>
        <Link href="/account/create">
          <ArrowLeft size={15} aria-hidden="true" />
          Circle types
        </Link>
        <p>GIFT CIRCLE</p>
        <h1>Create a shared gift</h1>
        <span>
          Set the goal, invite your people and decide how to split it.
        </span>
      </header>

      <form onSubmit={submit}>
        <fieldset className="bc-gift-pricing">
          <legend>Choose your circle tier</legend>
          <p>The selected tier sets the maximum circle size.</p>
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
                  {pricingPlan === plan && (
                    <Check size={13} aria-label="Selected tier" />
                  )}
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

        <div className="bc-gift-create__fields">
          <label>
            Circle name
            <input name="circleName" required maxLength={80} />
          </label>
          <label>
            Gift title
            <input name="giftTitle" required maxLength={80} />
          </label>
          <label>
            Target amount (₦)
            <input
              name="targetAmount"
              type="number"
              min="100"
              max="2000000000"
              step="1"
              required
            />
          </label>
          <label>
            Deadline
            <input name="deadline" type="date" required />
          </label>
          <label>
            Number of people
            <input
              name="memberCapacity"
              type="number"
              min="2"
              max={selectedTier.memberLimit}
              step="1"
              required
              placeholder={`2–${selectedTier.memberLimit}`}
              value={memberCapacity}
              onChange={(event) => {
                setMemberCapacity(event.target.value);
                if (!event.target.value) return;
                const requested = Number(event.target.value);
                if (
                  Number.isInteger(requested) &&
                  requested > selectedTier.memberLimit
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
              {planLabel(pricingPlan)} supports up to {selectedTier.memberLimit}{" "}
              people, including you.
              {validCapacity
                ? ` ${openSlots} member ${openSlots === 1 ? "place" : "places"} available.`
                : ""}
            </small>
          </label>
          <label className="bc-gift-create__wide">
            Description or note
            <textarea name="description" rows={3} required maxLength={500} />
          </label>
        </div>

        <fieldset className="bc-gift-mode">
          <legend>Contribution mode</legend>
          <label className={mode === "equal" ? "is-selected" : ""}>
            <input
              type="radio"
              name="contributionMode"
              value="equal"
              checked={mode === "equal"}
              onChange={() => setMode("equal")}
            />
            <strong>Equal split</strong>
            <span>Everyone receives an automatically balanced share.</span>
          </label>
          <label className={mode === "custom" ? "is-selected" : ""}>
            <input
              type="radio"
              name="contributionMode"
              value="custom"
              checked={mode === "custom"}
              onChange={() => setMode("custom")}
            />
            <strong>Custom amounts</strong>
            <span>Set the exact amount expected from each member.</span>
          </label>
        </fieldset>

        <section className="bc-gift-payment-setup">
          <header>
            <div>
              <h2>Payment account</h2>
              <p>
                Members pay this account directly. BondCircle never holds the
                contribution money.
              </p>
            </div>
          </header>
          <div>
            <label>
              Bank name
              <input
                name="paymentBankName"
                required
                maxLength={80}
                autoComplete="organization"
              />
            </label>
            <label>
              Account name
              <input
                name="paymentAccountName"
                required
                maxLength={100}
                autoComplete="name"
              />
            </label>
            <label>
              Account number
              <input
                name="paymentAccountNumber"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                autoComplete="off"
                placeholder="10 digits"
              />
            </label>
          </div>
        </section>

        <label className="bc-gift-image">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Selected gift preview" />
          ) : (
            <ImagePlus size={25} aria-hidden="true" />
          )}
          <span>
            <strong>Add gift image</strong>
            <small>JPG, PNG or WebP · up to 5 MB</small>
          </span>
          <input
            name="giftImage"
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

        <section className="bc-gift-invites">
          <header>
            <div>
              <h2>Invite members</h2>
              <p>Add people who already have a BondCircle account.</p>
            </div>
            <button
              type="button"
              onClick={addInvite}
              disabled={!validCapacity || invites.length >= openSlots}
            >
              <Plus size={15} aria-hidden="true" />
              Add member
            </button>
          </header>
          {mode === "custom" && (
            <label className="bc-gift-invites__creator">
              Your contribution (₦)
              <input
                name="creatorAmount"
                type="number"
                min="0"
                step="1"
                required
              />
            </label>
          )}
          {invites.length === 0 ? (
            <p className="bc-gift-invites__empty">
              {validCapacity
                ? `You can create the circle now and fill its ${openSlots} open member ${
                    openSlots === 1 ? "slot" : "slots"
                  } later.`
                : "Choose the number of people before adding members."}
            </p>
          ) : (
            <div className="bc-gift-invites__list">
              {invites.map((invite, index) => (
                <div key={index}>
                  <label>
                    Member email
                    <input
                      type="email"
                      value={invite.email}
                      required
                      onChange={(event) =>
                        setInvites((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, email: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                  {mode === "custom" && (
                    <label>
                      Amount (₦)
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={invite.amount}
                        required
                        onChange={(event) =>
                          setInvites((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, amount: event.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </label>
                  )}
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
          )}
          {mode === "custom" &&
            validCapacity &&
            invites.length !== openSlots && (
              <p className="bc-gift-invites__note">
                Custom split requires an email and amount for all {openSlots}{" "}
                other member slots before creation.
              </p>
            )}
        </section>

        {error && (
          <p className="bc-gift-create__error" role="alert">
            {error}
          </p>
        )}
        <footer>
          <Link href="/account">Cancel</Link>
          <button type="submit" disabled={busy}>
            {busy ? "Creating securely…" : "Create Gift Circle"}
          </button>
        </footer>
      </form>
      {capacityIssue !== null && (
        <div
          className="bc-tier-modal"
          role="presentation"
          onMouseDown={() => setCapacityIssue(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="tier-limit-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close tier notice"
              onClick={() => setCapacityIssue(null)}
            >
              <X size={16} aria-hidden="true" />
            </button>
            <span>TIER LIMIT</span>
            <h2 id="tier-limit-title">
              {planLabel(pricingPlan)} supports up to {selectedTier.memberLimit}{" "}
              members
            </h2>
            <p>
              You entered {capacityIssue}. Choose a larger tier to keep that
              circle size.
            </p>
            <footer>
              <button
                type="button"
                onClick={() => {
                  setMemberCapacity(String(selectedTier.memberLimit));
                  setInvites((current) =>
                    current.slice(0, selectedTier.memberLimit - 1),
                  );
                  setCapacityIssue(null);
                }}
              >
                Use {selectedTier.memberLimit}
              </button>
              {capacityIssue <= 100 && (
                <button
                  type="button"
                  onClick={() => {
                    const nextPlan = planForMemberCount(capacityIssue);
                    setPricingPlan(nextPlan);
                    setCapacityIssue(null);
                  }}
                >
                  Upgrade to {planLabel(planForMemberCount(capacityIssue))}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              )}
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
