import { CircleCommunication } from "@/components/communication/CircleCommunication";
import { loadCircleCommunication } from "@/server/repositories/communication";

export async function CircleCommunicationSection({
  circleId,
  viewerId,
}: {
  circleId: string;
  viewerId: string;
}) {
  const workspace = await loadCircleCommunication(circleId, viewerId);
  if (!workspace) return null;
  return <CircleCommunication workspace={workspace} />;
}
