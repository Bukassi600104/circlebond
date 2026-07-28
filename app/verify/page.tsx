import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { OtpVerificationForm } from "@/features/auth/components";

export default function VerifyPage() {
  return (
    <AuthShell
      eyebrow="Secure verification"
      title="Verify your account"
      description="Enter the six-digit code to continue."
      backHref="/sign-in"
    >
      <Suspense fallback={<p>Preparing verification…</p>}>
        <OtpVerificationForm />
      </Suspense>
    </AuthShell>
  );
}
