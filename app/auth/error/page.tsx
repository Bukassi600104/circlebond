import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";

export default function AuthenticationErrorPage() {
  return (
    <AuthShell
      eyebrow="Authentication error"
      title="We couldn’t verify that"
      description="Your account remains secure. Try the step again or request a fresh code."
      backHref="/sign-in"
    >
      <div className="bc-auth-state" role="alert">
        <AlertTriangle aria-hidden="true" />
        <p>No account details have been changed.</p>
      </div>
      <Link className="bc-button bc-button--primary" href="/sign-in">
        Return to sign in
      </Link>
    </AuthShell>
  );
}
