import type { Metadata } from "next";
import "@/app/auth.css";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How BondCircle handles personal information.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return <LegalDocumentPage documentType="privacy" />;
}
