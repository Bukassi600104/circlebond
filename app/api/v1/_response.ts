import { NextResponse } from "next/server";

const ERROR_CODES: Record<number, string> = {
  400: "INVALID_REQUEST",
  401: "AUTHENTICATION_REQUIRED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  429: "RATE_LIMITED",
  500: "INTERNAL_ERROR",
};

export function apiJson(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  const payload =
    body && typeof body === "object" && "error" in body
      ? { code: ERROR_CODES[init.status ?? 500] ?? "REQUEST_FAILED", ...body }
      : body;
  return NextResponse.json(payload, { ...init, headers });
}
