import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import type { DashboardCircle } from "@/server/repositories/dashboard";
import { DashboardCircleCard } from "./DashboardCircleCard";
import { DashboardEmptyState } from "./DashboardHome";

export function CircleCollection({
  circles,
  description,
  title,
}: {
  circles: DashboardCircle[];
  description: string;
  title: string;
}) {
  return (
    <section className="bc-dashboard-collection">
      <header>
        <div>
          <Link href="/account">
            <ArrowLeft size={15} aria-hidden="true" />
            Dashboard
          </Link>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link className="bc-dashboard-compact-button" href="/account/create">
          <Plus size={16} aria-hidden="true" /> Create circle
        </Link>
      </header>
      {circles.length > 0 ? (
        <div className="bc-dashboard-circle-grid">
          {circles.map((circle) => (
            <DashboardCircleCard circle={circle} key={circle.id} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          title={`No ${title.toLowerCase()} yet`}
          message={description}
        />
      )}
    </section>
  );
}
