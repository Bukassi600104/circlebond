"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  HeartHandshake,
  ImagePlus,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import {
  CIRCLE_PRICING_PLANS,
  planForMemberCount,
  type CirclePricingPlan,
} from "@/lib/circle-pricing";

type Invite = { email: string; amount: string };

const supportTypes = [
  ["burial_support", "Burial support"],
  ["medical_support", "Medical support"],
  ["emergency_support", "Emergency support"],
  ["charity", "Charity"],
  ["community_support", "Community support"],
  ["family_support", "Family support"],
  ["other", "Other"],
] as const;

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

export function SupportCircleForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [invites, setInvites] = useState<Invite[]>([]);
  const [pricingPlan, setPricingPlan] = useState<CirclePricingPlan>("free");
  const [memberCapacity, setMemberCapacity] = useState("");
  const [capacityIssue, setCapacityIssue] = useState<number | null>(null);
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
      const response = await fetch("/api/circles/support", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        body: form,
      });
      const data = (await response.json()) as {
        circleId?: string;
        error?: string;
      };
      if (!response.ok || !data.circleId) {
        throw new Error(data.error ?? "Unable to create the Support Circle.");
      }
      router.push(`/account/circles/${data.circleId}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      setBusy(false);
    }
  }

  return (
    <section className="bc-gift-create bc-support-create">
      <header>
        <Link href="/account/create">
          <ArrowLeft size={15} aria-hidden="true" />
          Circle types
        </Link>
        <p>SUPPORT CIRCLE</p>
        <h1>Coordinate support with care</h1>
        <span>
          Bring trusted people together and keep voluntary support organized.
        </span>
      </header>

      <form onSubmit={submit}>
        <fieldset className="bc-gift-pricing">
          <legend>Choose your circle plan</legend>
          <p>The selected plan sets the maximum number of supporters.</p>
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

        <section className="bc-support-form-section">
          <header>
            <HeartHandshake size={19} aria-hidden="true" />
            <div>
              <h2>Support details</h2>
              <p>Use clear, respectful information for the invited group.</p>
            </div>
          </header>
          <div className="bc-gift-create__fields">
            <label>
              Support title
              <input name="supportTitle" required maxLength={80} />
            </label>
            <label>
              Support type
              <select name="supportType" required defaultValue="">
                <option value="" disabled>
                  Select support type
                </option>
                {supportTypes.map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Beneficiary name
              <input name="beneficiaryName" required maxLength={100} />
            </label>
            <label>
              Relationship to beneficiary
              <input
                name="beneficiaryRelationship"
                maxLength={100}
                placeholder="Optional where appropriate"
              />
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
              <textarea name="description" rows={4} required maxLength={800} />
            </label>
          </div>
          <label className="bc-gift-image">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Selected support preview" />
            ) : (
              <ImagePlus size={25} aria-hidden="true" />
            )}
            <span>
              <strong>Add supporting image</strong>
              <small>JPG, PNG or WebP · up to 5 MB</small>
            </span>
            <input
              name="supportingImage"
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
            <strong>Equal amounts</strong>
            <span>Balance the target across the planned member places.</span>
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
            <span>Set an expected amount for each invited supporter.</span>
          </label>
        </fieldset>

        <fieldset className="bc-support-privacy">
          <legend>
            <ShieldCheck size={18} aria-hidden="true" />
            Privacy controls
          </legend>
          <p>Choose what ordinary circle members are allowed to see.</p>
          <div>
            <label>
              <input
                type="checkbox"
                name="showBeneficiaryName"
                defaultChecked
              />
              <span>
                <strong>Show beneficiary name</strong>
                <small>Otherwise members see “Private beneficiary”.</small>
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                name="showTargetToMembers"
                defaultChecked
              />
              <span>
                <strong>Show target to members</strong>
                <small>The creator and co-admins always see it.</small>
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                name="showConfirmedTotalToMembers"
                defaultChecked
              />
              <span>
                <strong>Show confirmed total</strong>
                <small>Members can follow overall confirmed progress.</small>
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                name="hideIndividualAmounts"
                defaultChecked
              />
              <span>
                <strong>Hide individual amounts</strong>
                <small>Each member still sees their own records.</small>
              </span>
            </label>
            <label>
              <input type="checkbox" name="requireCreatorApproval" />
              <span>
                <strong>Require creator approval</strong>
                <small>New membership requests wait for approval.</small>
              </span>
            </label>
          </div>
        </fieldset>

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
              <h2>Invite supporters</h2>
              <p>Add people who already have a BondCircle account.</p>
            </div>
            <button
              type="button"
              disabled={!validCapacity || invites.length >= openSlots}
              onClick={() =>
                setInvites((current) => [...current, { email: "", amount: "" }])
              }
            >
              <Plus size={15} aria-hidden="true" />
              Add member
            </button>
          </header>
          {mode === "custom" ? (
            <label className="bc-gift-invites__creator">
              Your expected amount (₦)
              <input
                name="creatorAmount"
                type="number"
                min="0"
                step="1"
                required
              />
            </label>
          ) : null}
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
                              ? { ...item, email: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                  {mode === "custom" ? (
                    <label>
                      Expected amount (₦)
                      <input
                        type="number"
                        min="0"
                        step="1"
                        required
                        value={invite.amount}
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
                  ) : null}
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
                ? `${openSlots} supporter ${openSlots === 1 ? "place" : "places"} can be invited now or later.`
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
            {busy ? "Creating securely…" : "Create Support Circle"}
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
            aria-labelledby="support-plan-limit-title"
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
            <h2 id="support-plan-limit-title">
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
