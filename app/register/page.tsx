import { AuthShell } from "@/components/auth/AuthShell";
import { RegistrationForm } from "@/features/auth/components";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/") && !next.startsWith("//") ? next : "/account";
  return (
    <AuthShell
      eyebrow="Create your account"
      title="Let’s get you started"
      description="One verified contact method is required. We only collect what BondCircle needs."
      backHref={`/sign-in?next=${encodeURIComponent(nextPath)}`}
      variant="registration"
    >
      <RegistrationForm nextPath={nextPath} />
    </AuthShell>
  );
}
