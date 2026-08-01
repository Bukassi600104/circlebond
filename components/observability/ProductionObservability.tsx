"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function normalizedPath(pathname: string) {
  if (pathname === "/verify" || pathname.startsWith("/verify/")) {
    return "/verify";
  }
  if (pathname.startsWith("/invite/")) return "/invite/[token]";

  return pathname
    .replace(/^\/account\/circles\/[^/]+/, "/account/circles/[circleId]")
    .replace(/^\/owner\/users\/[^/]+/, "/owner/users/[userId]")
    .replace(/\/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, "/[resourceId]");
}

export function sanitizeTelemetryUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl, window.location.origin);
    url.pathname = normalizedPath(url.pathname);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return window.location.origin;
  }
}

function sanitizeEvent<T extends { url: string }>(event: T): T {
  return { ...event, url: sanitizeTelemetryUrl(event.url) };
}

export function ProductionObservability() {
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
  const speedInsightsEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === "true";

  return (
    <>
      {analyticsEnabled ? (
        <Analytics
          beforeSend={(event: BeforeSendEvent) => sanitizeEvent(event)}
        />
      ) : null}
      {speedInsightsEnabled ? (
        <SpeedInsights beforeSend={(event) => sanitizeEvent(event)} />
      ) : null}
    </>
  );
}
