import type { Metadata } from "next";
import "@/app/auth.css";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BondCircle Terms of Service.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return <LegalDocumentPage documentType="terms" />;
}
