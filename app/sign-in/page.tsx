import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/features/auth/components";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/") && !next.startsWith("//") ? next : "/account";
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Use your verified email, phone number, or Google account."
    >
      <SignInForm nextPath={nextPath} />
    </AuthShell>
  );
}
