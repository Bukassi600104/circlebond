import Link from "next/link";
import { BrandLockup } from "@/components/layout";
import {
  legalDocuments,
  type LegalDocumentType,
} from "@/components/legal/legalDocuments";

export function LegalDocumentPage({
  documentType,
}: {
  documentType: LegalDocumentType;
}) {
  const content = legalDocuments[documentType];

  return (
    <main className="bc-legal-page">
      <Link href="/" aria-label="Return to BondCircle home">
        <BrandLockup />
      </Link>
      <article>
        <p className="bc-auth-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="bc-legal-page__summary">{content.summary}</p>
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>
                    {bullet.startsWith("https://") ? (
                      <a href={bullet} target="_blank" rel="noreferrer">
                        {bullet}
                      </a>
                    ) : (
                      bullet
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <footer>
          <Link href="/register">Return to registration</Link>
        </footer>
      </article>
    </main>
  );
}
