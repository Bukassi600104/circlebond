"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  Activity,
  ArchiveRestore,
  Ban,
  BarChart3,
  CheckCircle2,
  Download,
  ExternalLink,
  FileWarning,
  BadgeDollarSign,
  HeartPulse,
  Link2Off,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type { loadOwnerOverview } from "@/server/repositories/owner";
import { formatMinorNaira } from "@/lib/circle-pricing";
import type {
  AdminPurpose,
  OperationalReport,
  SuspensionReason,
} from "@/server/owner/rules";

type Overview = NonNullable<Awaited<ReturnType<typeof loadOwnerOverview>>>;
type Section =
  | "overview"
  | "pricing"
  | "abuse"
  | "invitations"
  | "retention"
  | "reports"
  | "audit";

const sections: Array<{
  id: Section;
  label: string;
  icon: typeof BarChart3;
}> = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "pricing", label: "Pricing", icon: BadgeDollarSign },
  { id: "abuse", label: "Abuse reports", icon: ShieldAlert },
  { id: "invitations", label: "Invite safety", icon: Link2Off },
  { id: "retention", label: "Retention", icon: ArchiveRestore },
  { id: "reports", label: "Exports", icon: Download },
  { id: "audit", label: "Audit trail", icon: Activity },
];

const purposeLabels: Record<AdminPurpose, string> = {
  support: "Support investigation",
  fraud: "Fraud investigation",
  security: "Security investigation",
  legal: "Legal requirement",
};

const compactDate = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function label(value: string) {
  return value.replaceAll("_", " ");
}

function Metric({
  icon: Icon,
  label: metricLabel,
  value,
  detail,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <article className="bc-owner-metric">
      <span>
        <Icon size={18} aria-hidden="true" />
      </span>
      <small>{metricLabel}</small>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function Distribution({
  title,
  values,
}: {
  title: string;
  values: Record<string, number>;
}) {
  const highest = Math.max(1, ...Object.values(values));
  return (
    <article className="bc-owner-panel">
      <h3>{title}</h3>
      <div className="bc-owner-bars">
        {Object.entries(values).map(([name, count]) => (
          <div key={name}>
            <span>
              <strong>{label(name)}</strong>
              <small>{count}</small>
            </span>
            <i
              style={
                {
                  "--owner-bar": `${(count / highest) * 100}%`,
                } as CSSProperties
              }
            />
          </div>
        ))}
        {!Object.keys(values).length ? <p>No data recorded yet.</p> : null}
      </div>
    </article>
  );
}

export function OwnerDashboard({ overview }: { overview: Overview }) {
  const [section, setSection] = useState<Section>("overview");
  const [purpose, setPurpose] = useState<AdminPurpose>("security");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState<
    | (Overview["reports"][number] & {
        comment: Overview["reports"][number]["comment"] & {
          body: string;
          createdAt: string;
        };
      })
    | null
  >(null);
  const [userQuery, setUserQuery] = useState("");
  const [foundUser, setFoundUser] = useState<{
    id: string;
    displayName: string;
    email: string | null;
    accountStatus: string;
    suspendedAt: string | null;
  } | null>(null);
  const [suspensionReason, setSuspensionReason] =
    useState<SuspensionReason>("abuse");
  const [confirmation, setConfirmation] = useState<
    | { kind: "suspend"; targetId: string; label: string }
    | { kind: "revoke"; targetId: string; label: string }
    | null
  >(null);

  const openReports = useMemo(
    () => overview.reports.filter((report) => report.status === "open"),
    [overview.reports],
  );

  async function ownerAction(
    body: Record<string, unknown>,
    key: string,
  ): Promise<Record<string, unknown>> {
    setBusy(key);
    setError("");
    setMessage("");
    try {
      const csrf = await csrfToken();
      const response = await fetch("/api/owner/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ ...body, purpose }),
      });
      const result = (await response.json()) as Record<string, unknown> & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(result.error ?? "Administrative action failed.");
      }
      return result;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      throw caught;
    } finally {
      setBusy("");
    }
  }

  async function reviewReport(reportId: string) {
    try {
      const result = await ownerAction(
        { action: "review_report", reportId },
        `review:${reportId}`,
      );
      setReview(result.report as typeof review);
    } catch {}
  }

  async function resolveReport(
    action: "dismiss_report" | "hide_reported_comment",
  ) {
    if (!review) return;
    try {
      await ownerAction(
        { action, reportId: review.id },
        `${action}:${review.id}`,
      );
      setMessage(
        action === "dismiss_report"
          ? "The report was dismissed and audited."
          : "The reported comment was hidden and the action was audited.",
      );
      setReview(null);
      window.location.reload();
    } catch {}
  }

  async function searchUser() {
    setBusy("user-search");
    setError("");
    setMessage("");
    try {
      const csrf = await csrfToken();
      const response = await fetch("/api/owner/user-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ identifier: userQuery, purpose }),
      });
      const result = (await response.json()) as {
        user: typeof foundUser;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? "Search failed.");
      setFoundUser(result.user);
      if (!result.user) setMessage("No exact user account match was found.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Search failed.");
    } finally {
      setBusy("");
    }
  }

  async function suspendUser(userId: string) {
    try {
      await ownerAction(
        {
          action: "suspend_user",
          userId,
          reason: suspensionReason,
        },
        `suspend:${userId}`,
      );
      setMessage("The account was suspended and active sessions were revoked.");
      setFoundUser((current) =>
        current ? { ...current, accountStatus: "suspended" } : current,
      );
      setReview(null);
    } catch {}
  }

  async function revokeInvite(invitationId: string) {
    try {
      await ownerAction(
        { action: "revoke_invite", invitationId },
        `invite:${invitationId}`,
      );
      setMessage("The compromised invitation was revoked.");
      window.location.reload();
    } catch {}
  }

  async function downloadReport(report: OperationalReport) {
    setBusy(`export:${report}`);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch("/api/owner/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ report, purpose }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Unable to export report.");
      }
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `bondcircle-${report}.csv`;
      anchor.click();
      URL.revokeObjectURL(href);
      setMessage("The approved operational report was exported and audited.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Export failed.");
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="bc-owner">
      <aside>
        <div>
          <small>SECURE CONSOLE</small>
          <h1>Platform operations</h1>
          <p>Aggregated health, safety and retention controls.</p>
        </div>
        <nav aria-label="Owner administration">
          {sections.map(({ id, label: sectionLabel, icon: Icon }) => (
            <button
              key={id}
              className={section === id ? "is-active" : ""}
              type="button"
              onClick={() => setSection(id)}
            >
              <Icon size={16} aria-hidden="true" />
              {sectionLabel}
              {id === "abuse" && openReports.length ? (
                <span>{openReports.length}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <label>
          Administrative purpose
          <select
            value={purpose}
            onChange={(event) => setPurpose(event.target.value as AdminPurpose)}
          >
            {Object.entries(purposeLabels).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </label>
        <p className="bc-owner-privacy">
          <ShieldCheck size={15} aria-hidden="true" />
          Private receipts and sensitive circle content are never exposed here.
          Purpose-limited access is audited.
        </p>
      </aside>

      <section className="bc-owner-workspace">
        <header>
          <div>
            <small>BONDCIRCLE OWNER OPERATIONS</small>
            <h2>{sections.find((item) => item.id === section)?.label}</h2>
          </div>
          <span>
            <i /> Production
          </span>
        </header>

        {message ? <p className="bc-owner-message">{message}</p> : null}
        {error ? (
          <p className="bc-owner-error" role="alert">
            {error}
          </p>
        ) : null}

        {section === "overview" ? (
          <>
            <div className="bc-owner-metrics">
              <Metric
                icon={Users}
                label="Users"
                value={overview.metrics.users}
                detail={`${overview.metrics.userStatuses.suspended ?? 0} suspended`}
              />
              <Metric
                icon={BarChart3}
                label="Circles"
                value={overview.metrics.circles}
                detail={`${overview.metrics.circleStatuses.active ?? 0} active`}
              />
              <Metric
                icon={ExternalLink}
                label="Invite acceptance"
                value={`${overview.metrics.invitationAcceptanceRate}%`}
                detail="Accepted invitation links"
              />
              <Metric
                icon={FileWarning}
                label="Upload failure"
                value={`${overview.metrics.uploadFailureRate}%`}
                detail="Recorded upload attempts"
              />
            </div>
            <div className="bc-owner-overview-grid">
              <Distribution
                title="Circle status"
                values={overview.metrics.circleStatuses}
              />
              <Distribution
                title="Circle types"
                values={overview.metrics.circleTypes}
              />
              <Distribution
                title="Pricing-plan usage"
                values={overview.metrics.pricingPlans}
              />
              <article className="bc-owner-panel bc-owner-health">
                <h3>System health</h3>
                {Object.entries({
                  Application: overview.health.application,
                  Firebase: overview.health.firebase,
                  "SQL Connect": overview.health.sqlConnect,
                  Storage: overview.health.storage,
                  "Retention job": overview.health.latestRetentionStatus,
                }).map(([name, status]) => (
                  <div key={name}>
                    <span>
                      <HeartPulse size={15} aria-hidden="true" />
                      {name}
                    </span>
                    <strong className={`is-${status}`}>{label(status)}</strong>
                  </div>
                ))}
              </article>
            </div>
          </>
        ) : null}

        {section === "pricing" ? (
          <div className="bc-owner-stack">
            <div className="bc-owner-metrics">
              <Metric
                icon={BadgeDollarSign}
                label="Recorded revenue"
                value={formatMinorNaira(overview.pricing.revenueMinor)}
                detail="Verified activation and upgrade payments only"
              />
              <Metric
                icon={CheckCircle2}
                label="Activations"
                value={overview.pricing.activationCount}
                detail={`${overview.pricing.upgradeCount} upgrades`}
              />
              <Metric
                icon={Users}
                label="Trial creators"
                value={overview.pricing.trialCreators}
                detail="One-time trial usage records"
              />
            </div>

            <article className="bc-owner-panel">
              <header>
                <div>
                  <h3>Active model-specific catalogue</h3>
                  <p>
                    Prices are shown in NGN. Contributors are never charged a
                    BondCircle platform fee.
                  </p>
                </div>
              </header>
              <div className="bc-owner-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Mode and tier</th>
                      <th>Price</th>
                      <th>Members</th>
                      <th>Co-admins</th>
                      <th>Mode limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.pricing.current.map((plan) => (
                      <tr key={plan.id}>
                        <td>
                          <strong>{label(plan.mode)}</strong>
                          <small>{label(plan.tier)}</small>
                        </td>
                        <td>{formatMinorNaira(plan.priceMinor)}</td>
                        <td>{plan.memberLimit}</td>
                        <td>{plan.coAdminLimit}</td>
                        <td>
                          {plan.mode === "aso-ebi"
                            ? `${plan.asoEbiTierLimit} tiers`
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="bc-owner-panel">
              <header>
                <div>
                  <h3>Historical activation ledger</h3>
                  <p>
                    Each row retains the exact historical amount. Later price
                    edits cannot reprice these records.
                  </p>
                </div>
              </header>
              <div className="bc-owner-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Activation</th>
                      <th>Mode and tier</th>
                      <th>Type</th>
                      <th>Paid</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.pricing.recentActivations.map((activation) => (
                      <tr key={activation.id}>
                        <td>{activation.id.slice(0, 10)}</td>
                        <td>
                          <strong>{label(activation.circleType)}</strong>
                          <small>{label(activation.tier)}</small>
                        </td>
                        <td>{label(activation.activationType)}</td>
                        <td>{formatMinorNaira(activation.pricePaidMinor)}</td>
                        <td>
                          <span
                            className={`bc-owner-status is-${activation.status}`}
                          >
                            {label(activation.status)}
                          </span>
                        </td>
                        <td>
                          {compactDate.format(new Date(activation.createdAt))}
                        </td>
                      </tr>
                    ))}
                    {!overview.pricing.recentActivations.length ? (
                      <tr>
                        <td colSpan={6}>No activations recorded yet.</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        ) : null}

        {section === "abuse" ? (
          <div className="bc-owner-stack">
            <article className="bc-owner-panel">
              <header>
                <div>
                  <h3>Reported comments</h3>
                  <p>
                    Comment text remains concealed until an approved-purpose
                    review is opened and audited.
                  </p>
                </div>
                <span>{openReports.length} open</span>
              </header>
              <div className="bc-owner-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Report</th>
                      <th>Circle</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {overview.reports.map((report) => (
                      <tr key={report.id}>
                        <td>
                          <strong>{report.id.slice(0, 8)}</strong>
                          <small>
                            {compactDate.format(new Date(report.createdAt))}
                          </small>
                        </td>
                        <td>
                          <strong>{report.circle.name}</strong>
                          <small>{label(report.circle.type)}</small>
                        </td>
                        <td>{label(report.reason)}</td>
                        <td>
                          <span
                            className={`bc-owner-status is-${report.status}`}
                          >
                            {label(report.status)}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            disabled={
                              report.status !== "open" ||
                              busy === `review:${report.id}`
                            }
                            onClick={() => void reviewReport(report.id)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!overview.reports.length ? (
                      <tr>
                        <td colSpan={5}>
                          No reported comments require review.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="bc-owner-panel">
              <h3>Account enforcement</h3>
              <p>
                Search only by exact verified email or Firebase user ID.
                Searches are purpose-limited and audited.
              </p>
              <div className="bc-owner-search">
                <input
                  aria-label="Exact user email or ID"
                  value={userQuery}
                  onChange={(event) => setUserQuery(event.target.value)}
                  placeholder="Exact email or user ID"
                />
                <button
                  type="button"
                  disabled={!userQuery.trim() || busy === "user-search"}
                  onClick={() => void searchUser()}
                >
                  <Search size={14} aria-hidden="true" /> Search
                </button>
              </div>
              {foundUser ? (
                <div className="bc-owner-user-result">
                  <div>
                    <strong>{foundUser.displayName}</strong>
                    <small>
                      {foundUser.email ?? "Email unavailable"} ·{" "}
                      {foundUser.accountStatus}
                    </small>
                  </div>
                  <select
                    aria-label="Suspension reason"
                    value={suspensionReason}
                    onChange={(event) =>
                      setSuspensionReason(
                        event.target.value as SuspensionReason,
                      )
                    }
                  >
                    <option value="abuse">Abuse</option>
                    <option value="fraud_risk">Fraud risk</option>
                    <option value="security_compromise">
                      Security compromise
                    </option>
                    <option value="legal_requirement">Legal requirement</option>
                  </select>
                  <button
                    className="is-danger"
                    type="button"
                    disabled={
                      foundUser.accountStatus === "suspended" ||
                      busy === `suspend:${foundUser.id}`
                    }
                    onClick={() =>
                      setConfirmation({
                        kind: "suspend",
                        targetId: foundUser.id,
                        label: foundUser.displayName,
                      })
                    }
                  >
                    <Ban size={14} aria-hidden="true" /> Suspend
                  </button>
                </div>
              ) : null}
            </article>
          </div>
        ) : null}

        {section === "invitations" ? (
          <article className="bc-owner-panel">
            <header>
              <div>
                <h3>Active invitation safety</h3>
                <p>
                  Tokens and recipient details are not displayed. Revocation
                  disables the server-side token hash immediately.
                </p>
              </div>
            </header>
            <div className="bc-owner-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Invitation</th>
                    <th>Circle</th>
                    <th>Usage</th>
                    <th>Expires</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {overview.invitations.map((invitation) => (
                    <tr key={invitation.id}>
                      <td>
                        <strong>{invitation.id.slice(0, 10)}</strong>
                        <small>{label(invitation.state)}</small>
                      </td>
                      <td>
                        <strong>{invitation.circle.name}</strong>
                        <small>{label(invitation.circle.type)}</small>
                      </td>
                      <td>
                        {invitation.useCount}/{invitation.maxUses}
                      </td>
                      <td>
                        {compactDate.format(new Date(invitation.expiresAt))}
                      </td>
                      <td>
                        <button
                          className="is-danger-outline"
                          type="button"
                          disabled={busy === `invite:${invitation.id}`}
                          onClick={() =>
                            setConfirmation({
                              kind: "revoke",
                              targetId: invitation.id,
                              label: invitation.circle.name,
                            })
                          }
                        >
                          <Link2Off size={14} aria-hidden="true" /> Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!overview.invitations.length ? (
                    <tr>
                      <td colSpan={5}>No active invitations require review.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>
        ) : null}

        {section === "retention" ? (
          <article className="bc-owner-panel">
            <header>
              <div>
                <h3>Retention-job status</h3>
                <p>
                  {overview.health.retentionPending} circles are inside an
                  active retention window.
                </p>
              </div>
              <span>{label(overview.health.latestRetentionStatus)}</span>
            </header>
            <div className="bc-owner-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Circle</th>
                    <th>Attempt</th>
                    <th>Files</th>
                    <th>Status</th>
                    <th>Started</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.retentionAttempts.map((attempt) => (
                    <tr key={attempt.id}>
                      <td>
                        <strong>{attempt.circle.id.slice(0, 10)}</strong>
                        <small>{label(attempt.circle.type)}</small>
                      </td>
                      <td>#{attempt.attemptNumber}</td>
                      <td>
                        {attempt.deletedFileCount} deleted ·{" "}
                        {attempt.skippedSharedFileCount} shared
                      </td>
                      <td>
                        <span
                          className={`bc-owner-status is-${attempt.status}`}
                        >
                          {label(attempt.status)}
                        </span>
                      </td>
                      <td>{compactDate.format(new Date(attempt.startedAt))}</td>
                    </tr>
                  ))}
                  {!overview.retentionAttempts.length ? (
                    <tr>
                      <td colSpan={5}>No retention attempts recorded yet.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>
        ) : null}

        {section === "reports" ? (
          <div className="bc-owner-export-grid">
            {(
              [
                [
                  "platform_summary",
                  "Platform summary",
                  "Circle type, status, plan, member count and lifecycle dates.",
                ],
                [
                  "abuse_operations",
                  "Abuse operations",
                  "Report IDs, reason categories, status and circle identifiers.",
                ],
                [
                  "retention_operations",
                  "Retention operations",
                  "Purge attempts, outcomes and non-sensitive file counts.",
                ],
              ] as const
            ).map(([report, title, description]) => (
              <article className="bc-owner-panel" key={report}>
                <span>
                  <Download size={18} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <button
                  type="button"
                  disabled={busy === `export:${report}`}
                  onClick={() => void downloadReport(report)}
                >
                  Export CSV
                </button>
              </article>
            ))}
          </div>
        ) : null}

        {section === "audit" ? (
          <article className="bc-owner-panel">
            <header>
              <div>
                <h3>Immutable administrative trail</h3>
                <p>
                  Action, purpose, target and outcome are retained. Sensitive
                  content is not copied into audit metadata.
                </p>
              </div>
            </header>
            <div className="bc-owner-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Target</th>
                    <th>Purpose</th>
                    <th>Outcome</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.auditTrail.map((event) => (
                    <tr key={event.id}>
                      <td>{label(event.action)}</td>
                      <td>
                        <strong>{event.targetType}</strong>
                        <small>{event.targetId.slice(0, 18)}</small>
                      </td>
                      <td>{label(event.purpose)}</td>
                      <td>
                        <span className={`bc-owner-status is-${event.outcome}`}>
                          {event.outcome}
                        </span>
                      </td>
                      <td>{compactDate.format(new Date(event.createdAt))}</td>
                    </tr>
                  ))}
                  {!overview.auditTrail.length ? (
                    <tr>
                      <td colSpan={5}>
                        No administrative actions recorded yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </article>
        ) : null}
      </section>

      {review ? (
        <div className="bc-owner-dialog" role="presentation">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="owner-review-title"
          >
            <button
              className="bc-owner-dialog-close"
              type="button"
              aria-label="Close review"
              onClick={() => setReview(null)}
            >
              <X size={16} aria-hidden="true" />
            </button>
            <small>AUDITED {purposeLabels[purpose].toUpperCase()}</small>
            <h2 id="owner-review-title">Reported comment review</h2>
            <dl>
              <div>
                <dt>Circle</dt>
                <dd>{review.circle.name}</dd>
              </div>
              <div>
                <dt>Reason</dt>
                <dd>{label(review.reason)}</dd>
              </div>
              <div>
                <dt>Author</dt>
                <dd>{review.comment.author.displayName}</dd>
              </div>
            </dl>
            <blockquote>{review.comment.body}</blockquote>
            <p>
              This comment was revealed only for the selected administrative
              purpose. Do not copy it into reports or notes.
            </p>
            <footer>
              <button
                type="button"
                disabled={Boolean(busy)}
                onClick={() => void resolveReport("dismiss_report")}
              >
                <CheckCircle2 size={14} aria-hidden="true" /> Dismiss report
              </button>
              <button
                className="is-danger"
                type="button"
                disabled={Boolean(busy)}
                onClick={() => void resolveReport("hide_reported_comment")}
              >
                Hide comment
              </button>
              <button
                className="is-danger-outline"
                type="button"
                disabled={
                  review.comment.author.accountStatus === "suspended" ||
                  Boolean(busy)
                }
                onClick={() =>
                  setConfirmation({
                    kind: "suspend",
                    targetId: review.comment.author.id,
                    label: review.comment.author.displayName,
                  })
                }
              >
                <Ban size={14} aria-hidden="true" /> Suspend author
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {confirmation ? (
        <div className="bc-owner-dialog" role="presentation">
          <section
            className="bc-owner-confirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="owner-confirm-title"
          >
            <h2 id="owner-confirm-title">
              {confirmation.kind === "suspend"
                ? "Suspend this account?"
                : "Revoke this invitation?"}
            </h2>
            <p>
              {confirmation.kind === "suspend"
                ? `This disables ${confirmation.label} in Firebase and revokes active sessions.`
                : `This immediately disables the invitation for ${confirmation.label}.`}
            </p>
            <footer>
              <button type="button" onClick={() => setConfirmation(null)}>
                Cancel
              </button>
              <button
                className="is-danger"
                type="button"
                onClick={() => {
                  const current = confirmation;
                  setConfirmation(null);
                  if (current.kind === "suspend") {
                    void suspendUser(current.targetId);
                  } else {
                    void revokeInvite(current.targetId);
                  }
                }}
              >
                {confirmation.kind === "suspend"
                  ? "Suspend account"
                  : "Revoke invitation"}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </main>
  );
}
