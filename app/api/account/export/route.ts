import { authenticatePrincipal } from "@/server/auth";
import { clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  exportAccountData,
  AccountExportLimitError,
} from "@/server/repositories/account-privacy";

export const runtime = "nodejs";
const headers = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
};

export async function GET(request: Request) {
  try {
    const principal = await authenticatePrincipal(request);
    if (!principal)
      return Response.json(
        { error: "Authentication required." },
        { status: 401, headers },
      );
    if (
      !(await enforceRateLimit(
        clientKey(request, `account-export:${principal.uid}`),
        3,
        60_000,
      ))
    )
      return Response.json(
        { error: "Please wait before downloading again." },
        { status: 429, headers: { ...headers, "Retry-After": "60" } },
      );
    return Response.json(await exportAccountData(principal.uid), {
      headers: {
        ...headers,
        "Content-Disposition": 'attachment; filename="bondcircle-account.json"',
      },
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof AccountExportLimitError
            ? error.message
            : "Unable to prepare your export. Please try again.",
      },
      { status: error instanceof AccountExportLimitError ? 413 : 503, headers },
    );
  }
}
