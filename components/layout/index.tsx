import type { ReactNode } from "react";
import Image from "next/image";
import {
  Activity,
  Bell,
  CircleUserRound,
  Home,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { IconButton } from "@/components/ui";

export function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  return (
    <div
      className={`bc-brand ${inverse ? "bc-brand--inverse" : ""}`}
      aria-label="BondCircle"
    >
      <Image
        className="bc-brand__mark"
        src="/brand/bond-circle-mark.png"
        alt=""
        width={512}
        height={512}
        priority
      />
      <Image
        className="bc-brand__wordmark"
        src="/brand/bond-circle-wordmark.png"
        alt=""
        width={900}
        height={200}
        priority
      />
    </div>
  );
}

export function NavigationBar() {
  const items = [
    { label: "Home", icon: Home, active: true },
    { label: "Circles", icon: UsersRound },
    { label: "Create", icon: Plus, create: true },
    { label: "Activity", icon: Activity },
    { label: "Profile", icon: CircleUserRound },
  ];

  return (
    <nav className="bc-bottom-nav" aria-label="Primary navigation">
      {items.map(({ active, create, icon: Icon, label }) => (
        <a
          href={`#${label.toLowerCase()}`}
          className={`${active ? "is-active" : ""} ${create ? "is-create" : ""}`}
          aria-current={active ? "page" : undefined}
          key={label}
        >
          <Icon size={create ? 24 : 20} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

export function TopToolbar({ title }: { title: string }) {
  return (
    <header className="bc-toolbar">
      <BrandLockup />
      <strong>{title}</strong>
      <div>
        <IconButton label="Search">
          <Search size={19} />
        </IconButton>
        <IconButton label="Notifications">
          <Bell size={19} />
        </IconButton>
      </div>
    </header>
  );
}

export function Sidebar() {
  return (
    <aside className="bc-sidebar">
      <BrandLockup inverse />
      <nav aria-label="Desktop navigation">
        <a className="is-active" href="#overview">
          <Home size={18} />
          Overview
        </a>
        <a href="#circles">
          <UsersRound size={18} />
          Circles
        </a>
        <a href="#activity">
          <Activity size={18} />
          Activity
        </a>
        <a href="#profile">
          <CircleUserRound size={18} />
          Profile
        </a>
      </nav>
    </aside>
  );
}

export function ComponentSection({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="bc-specimen-section">
      <header>
        <div>
          <p>COMPONENT SYSTEM</p>
          <h2>{title}</h2>
        </div>
        <span>{description}</span>
      </header>
      <div className="bc-specimen-grid">{children}</div>
    </section>
  );
}
