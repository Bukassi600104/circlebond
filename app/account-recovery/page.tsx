import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { RecoveryForm } from "@/features/auth/components";

export default function AccountRecoveryPage() {
  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Return to your circle"
      description="We’ll send a verification code. The response is the same whether or not an account exists."
      backHref="/sign-in"
    >
      <Suspense fallback={<p>Preparing recovery…</p>}>
        <RecoveryForm />
      </Suspense>
    </AuthShell>
  );
}
