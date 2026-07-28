"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandLockup } from "@/components/layout";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const target =
      localStorage.getItem("bc-onboarding-complete") === "true"
        ? "/sign-in"
        : "/onboarding";
    const timer = window.setTimeout(() => router.replace(target), 1800);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="bc-splash">
      <Link href="/onboarding" aria-label="Continue to BondCircle onboarding">
        <BrandLockup inverse />
        <p>Together for life&apos;s important moments</p>
        <span className="bc-splash__loader" aria-label="Loading" />
      </Link>
    </main>
  );
}
