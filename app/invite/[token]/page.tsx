import type { Metadata } from "next";
import {
  ExpiredInvitation,
  InvalidInvitation,
  InvitationDetails,
} from "@/components/invitations/InvitationDetails";
import { invitationMatchesUser } from "@/server/invitations/rules";
import { requireSession } from "@/server/auth";
import { loadInvitationByToken } from "@/server/repositories/invitations";

export const metadata: Metadata = {
  title: "Circle invitation",
  robots: { index: false, follow: false },
};

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const session = await requireSession(`/invite/${encodeURIComponent(token)}`);
  const invitation = await loadInvitationByToken(token);
  if (!invitation) return <InvalidInvitation />;

  const matches = invitationMatchesUser(invitation, {
    email: session.email ?? null,
    phone: session.phone_number ?? null,
  });
  if (!matches) return <InvalidInvitation />;

  if (
    invitation.effectiveState === "expired" ||
    invitation.effectiveState === "revoked"
  ) {
    return (
      <ExpiredInvitation circleName={invitation.circle.name} token={token} />
    );
  }

  const ownResponse = invitation.acceptances.find(
    (acceptance) => acceptance.user.id === session.uid,
  );
  if (
    !ownResponse &&
    ["accepted", "declined"].includes(invitation.effectiveState)
  ) {
    return <InvalidInvitation />;
  }

  return (
    <InvitationDetails
      token={token}
      invitation={{
        circleId: invitation.circle.id,
        circleName: invitation.circle.name,
        circleType: invitation.circle.type,
        circleDescription: invitation.circle.description,
        circleImageUrl: invitation.circle.imageUrl ?? null,
        creatorName: invitation.circle.creator.displayName,
        inviterName: invitation.invitedBy.displayName,
        recipientName: invitation.recipientName ?? null,
        expiresAt: invitation.expiresAt,
        memberCount: invitation.circle.memberCount,
        memberLimit: invitation.circle.memberLimit,
        requireApproval:
          invitation.requireApproval ||
          invitation.circle.requireCreatorApproval,
        state: ownResponse?.status ?? invitation.state,
      }}
    />
  );
}
