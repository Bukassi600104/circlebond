import { AuthShell } from "@/components/auth/AuthShell";
import { LegalAcceptanceForm } from "@/features/auth/components";
import { requireSession } from "@/server/auth";

export default async function LegalAcceptancePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  await requireSession();
  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/") && !next.startsWith("//") ? next : "/account";
  return (
    <AuthShell
      eyebrow="One final step"
      title="Review and accept"
      description="BondCircle records when you accept each policy."
    >
      <LegalAcceptanceForm nextPath={nextPath} />
    </AuthShell>
  );
}
