"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { BrandLockup } from "@/components/layout";
import { Button } from "@/components/ui";
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
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = window.document
      .activeElement as HTMLElement | null;
    const previousOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function keyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="bc-legal-modal" onMouseDown={onClose}>
      <div
        className="bc-legal-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bc-legal-title"
        aria-describedby="bc-legal-summary"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <BrandLockup />
          <button
            ref={closeButton}
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
    </div>
  );
}
