import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  createPrivacyRequest,
  loadPrivacyRequests,
} from "@/server/repositories/account-privacy";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  try {
    const principal = await authenticatePrincipal(request);
    if (!principal)
      return Response.json(
        { error: "Authentication required." },
        { status: 401, headers },
      );
    return Response.json(
      { requests: await loadPrivacyRequests(principal.uid) },
      { headers },
    );
  } catch {
    return Response.json(
      { error: "Unable to load request status. Please retry." },
      { status: 503, headers },
    );
  }
}

export async function POST(request: Request) {
  try {
    const principal = await authenticatePrincipal(request);
    if (!principal)
      return Response.json(
        { error: "Authentication required." },
        { status: 401, headers },
      );
    try {
      await assertTrustedMutation(request, principal);
    } catch {
      return Response.json(
        { error: "Refresh and retry this secure request." },
        { status: 403, headers },
      );
    }
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid request body." },
        { status: 400, headers },
      );
    }
    const kind =
      body && typeof body === "object" && "kind" in body ? body.kind : null;
    if (kind !== "export" && kind !== "deletion")
      return Response.json(
        { error: "Choose an export or deletion request." },
        { status: 400, headers },
      );
    if (
      !(await enforceRateLimit(
        clientKey(request, `privacy-request:${principal.uid}`),
        5,
        60_000,
      ))
    )
      return Response.json(
        { error: "Please wait before trying again." },
        { status: 429, headers: { ...headers, "Retry-After": "60" } },
      );
    return Response.json(
      {
        request: await createPrivacyRequest(principal.uid, kind),
        message:
          "Request recorded. Your account remains active while it is reviewed.",
      },
      { status: 202, headers },
    );
  } catch {
    return Response.json(
      { error: "Unable to record your request. Refresh and try again." },
      { status: 503, headers },
    );
  }
}
