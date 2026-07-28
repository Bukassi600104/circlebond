import { LoadingSkeleton } from "@/components/ui";

export default function AccountLoading() {
  return (
    <main className="bc-dashboard-loading" aria-label="Loading your dashboard">
      <span />
      <span />
      <div>
        <LoadingSkeleton lines={3} />
        <LoadingSkeleton lines={3} />
        <LoadingSkeleton lines={3} />
      </div>
    </main>
  );
}
