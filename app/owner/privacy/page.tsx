import Link from "next/link";
import { requireOwnerSession } from "@/server/owner/auth";
import { loadOwnerPrivacyRequests } from "@/server/repositories/account-privacy";
import { recordOwnerAudit } from "@/server/repositories/owner";
import { PrivacyRequestQueue } from "@/components/owner/PrivacyRequestQueue";
import { notFound } from "next/navigation";
import "../../dashboard.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Privacy requests",
  robots: { index: false, follow: false },
};

export default async function PrivacyRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { session } = await requireOwnerSession();
  const { offset: text = "0" } = await searchParams;
  if (!/^\d{1,7}$/.test(text) || Number(text) % 100 !== 0) notFound();
  const offset = Number(text);
  const requests = await loadOwnerPrivacyRequests(offset);
  await recordOwnerAudit({
    actorId: session.uid,
    action: "privacy_request_queue_viewed",
    targetType: "account_privacy_request",
    targetId: "queue",
    purpose: "legal",
    outcome: "succeeded",
    metadata: {},
  });
  return (
    <main className="bc-dashboard-info-page">
      <Link href="/owner">← Owner dashboard</Link>
      <h1>Privacy requests</h1>
      <p>
        Identity checks, data scope, lawful retention exceptions and fulfillment
        require the approved privacy operator. Acknowledging review does not
        erase an account or mark a request fulfilled.
      </p>
      <PrivacyRequestQueue requests={requests} />
      <nav aria-label="Privacy request pages">
        {offset > 0 && (
          <Link href={`/owner/privacy?offset=${offset - 100}`}>
            Previous page
          </Link>
        )}
        {requests.length === 100 && (
          <Link href={`/owner/privacy?offset=${offset + 100}`}>Next page</Link>
        )}
      </nav>
    </main>
  );
}
