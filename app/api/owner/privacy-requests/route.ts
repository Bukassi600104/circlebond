import { readOwnerSession } from "@/server/owner/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { acknowledgePrivacyRequest } from "@/server/repositories/account-privacy";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };

export async function POST(request: Request) {
  try {
    await assertTrustedMutation(request);
    const owner = await readOwnerSession();
    if (!owner)
      return Response.json(
        { error: "Not authorized." },
        { status: 403, headers },
      );
    const body: unknown = await request.json();
    const id =
      body && typeof body === "object" && "id" in body ? body.id : null;
    if (
      typeof id !== "string" ||
      id.length > 160 ||
      !/^.+:(export|deletion)$/.test(id)
    )
      return Response.json(
        { error: "Invalid request reference." },
        { status: 400, headers },
      );
    await acknowledgePrivacyRequest(id, owner.session.uid);
    return Response.json({ status: "processing" }, { headers });
  } catch {
    return Response.json(
      { error: "Unable to acknowledge this request." },
      { status: 400, headers },
    );
  }
}
