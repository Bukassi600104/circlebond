import type { MetadataRoute } from "next";

const origin = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.bondcircles.com"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/onboarding",
        "/sign-in",
        "/register",
        "/legal/terms",
        "/legal/privacy",
      ],
      disallow: [
        "/account/",
        "/owner/",
        "/api/",
        "/verify",
        "/invite/",
        "/legal/accept",
      ],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
