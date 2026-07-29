import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { requireOwnerSession } from "@/server/owner/auth";
import "./owner.css";

export default async function OwnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { owner } = await requireOwnerSession();
  return (
    <div className="bc-owner-shell">
      <header className="bc-owner-topbar">
        <Link href="/owner" aria-label="BondCircle owner administration">
          <Image
            src="/brand/bond-circle-primary.png"
            alt="BondCircle"
            width={184}
            height={54}
            priority
          />
        </Link>
        <div>
          <span>OWNER ADMINISTRATION</span>
          <strong>{owner.user.displayName}</strong>
          <Link href="/account">Return to member app</Link>
        </div>
      </header>
      {children}
    </div>
  );
}
