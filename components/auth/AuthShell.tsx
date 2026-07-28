import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@/components/layout";

export function AuthShell({
  children,
  eyebrow,
  title,
  description,
  backHref,
  variant = "default",
}: {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  variant?: "default" | "registration";
}) {
  return (
    <main className={`bc-auth-page bc-auth-page--${variant}`}>
      <aside className="bc-auth-story" aria-label="BondCircle introduction">
        <div className="bc-auth-story__art" aria-hidden="true">
          <Image
            src="/illustrations/auth-community.png"
            alt=""
            width={1536}
            height={1024}
            priority
          />
        </div>
        <div className="bc-auth-story__copy">
          <span className="bc-auth-story__motif" aria-hidden="true">
            ● ● ●
          </span>
          <h1>Stronger together, for every moment.</h1>
          <p>
            Create, join and manage circles for gifts, events and support — all
            in one place.
          </p>
        </div>
      </aside>
      <section className="bc-auth-panel">
        <div className="bc-auth-panel__top">
          {backHref && (
            <Link href={backHref} className="bc-auth-back">
              ← Back
            </Link>
          )}
          <div className="bc-auth-panel__brand">
            <BrandLockup />
          </div>
        </div>
        <div className="bc-auth-card">
          {eyebrow && <p className="bc-auth-eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {description && <p className="bc-auth-description">{description}</p>}
          {children}
        </div>
      </section>
    </main>
  );
}
