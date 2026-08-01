import type { MetadataRoute } from "next";

const origin = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.bondcircles.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/onboarding", priority: 0.8 },
    { path: "/sign-in", priority: 0.7 },
    { path: "/register", priority: 0.7 },
    { path: "/legal/terms", priority: 0.4 },
    { path: "/legal/privacy", priority: 0.4 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${origin}${path}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority,
  }));
}
