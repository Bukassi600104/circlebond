"use client";

import { X } from "lucide-react";
import { BrandLockup } from "@/components/layout";
import { Button } from "@/components/ui";
import { DialogOverlay } from "@/components/ui/DialogOverlay";
import {
  legalDocuments,
  type LegalDocumentType,
} from "@/components/legal/legalDocuments";

export function LegalModal({
  documentType,
  onAgree,
  onClose,
}: {
  documentType: LegalDocumentType;
  onAgree: () => void;
  onClose: () => void;
}) {
  const content = legalDocuments[documentType];

  return (
    <DialogOverlay
      className="bc-legal-modal"
      labelledBy="bc-legal-title"
      describedBy="bc-legal-summary"
      onClose={onClose}
    >
      <div
        className="bc-legal-modal__dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <BrandLockup />
          <button
            className="bc-icon-button"
            type="button"
            aria-label="Close"
            title="Close"
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <article>
          <p className="bc-auth-eyebrow">{content.eyebrow}</p>
          <h2 id="bc-legal-title">{content.title}</h2>
          <p id="bc-legal-summary" className="bc-legal-modal__summary">
            {content.summary}
          </p>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
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
              )}
            </section>
          ))}
        </article>
        <footer>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={onAgree}>
            {content.action}
          </Button>
        </footer>
      </div>
    </DialogOverlay>
  );
}
