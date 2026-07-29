"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const target =
      localStorage.getItem("bc-onboarding-complete") === "true"
        ? "/account"
        : "/onboarding";
    const timer = window.setTimeout(() => router.replace(target), 2400);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <main className="bc-splash">
      <Link href="/onboarding" aria-label="Continue to BondCircle onboarding">
        <div className="bc-splash__stage" aria-hidden="true">
          <span className="bc-splash__orbit bc-splash__orbit--one" />
          <span className="bc-splash__orbit bc-splash__orbit--two" />
          <span className="bc-splash__spark bc-splash__spark--coral" />
          <span className="bc-splash__spark bc-splash__spark--gold" />
          <span className="bc-splash__spark bc-splash__spark--green" />
          <div className="bc-splash__mark">
            <Image
              src="/brand/bond-circle-mark.png"
              alt=""
              width={512}
              height={512}
              priority
            />
          </div>
        </div>
        <Image
          className="bc-splash__wordmark"
          src="/brand/bond-circle-wordmark.png"
          alt="BondCircle"
          width={900}
          height={200}
          priority
        />
        <p>Making life&apos;s important moments feel closer.</p>
        <div className="bc-splash__promise" aria-label="Our promise">
          <span>Celebrate</span>
          <i aria-hidden="true" />
          <span>Support</span>
          <i aria-hidden="true" />
          <span>Together</span>
        </div>
        <span className="bc-splash__loader" aria-label="Opening BondCircle">
          <span />
        </span>
      </Link>
    </main>
  );
}
