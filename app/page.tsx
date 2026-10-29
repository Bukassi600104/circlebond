"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    let returning = false;
    try {
      returning = localStorage.getItem("bc-onboarding-complete") === "true";
    } catch {
      // Browsers may disable storage; first-use navigation must still work.
    }
    const target = returning ? "/account" : "/onboarding";
    const delay =
      returning || window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : 3200;
    const timer = window.setTimeout(() => router.replace(target), delay);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="bc-splash">
      <Link href="/onboarding" aria-label="Continue to BondCircle onboarding">
        <div className="bc-splash__assembly">
          <span className="bc-splash__ring-glow" aria-hidden="true" />
          <span className="bc-splash__ring" aria-hidden="true" />
          <span
            className="bc-splash__particle bc-splash__particle--coral"
            aria-hidden="true"
          />
          <span
            className="bc-splash__particle bc-splash__particle--gold"
            aria-hidden="true"
          />
          <span
            className="bc-splash__particle bc-splash__particle--green"
            aria-hidden="true"
          />
          <Image
            className="bc-splash__logo"
            src="/brand/bond-circle-mark.png"
            alt="BondCircle"
            width={512}
            height={512}
            priority
          />
        </div>
      </Link>
    </main>
  );
}
