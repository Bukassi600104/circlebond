import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Inbox, X } from "lucide-react";
import { Button, IconButton } from "@/components/ui";

export function Modal({
  children,
  description,
  open = true,
  title,
}: {
  children: ReactNode;
  description?: string;
  open?: boolean;
  title: string;
}) {
  if (!open) return null;
  return (
    <div className="bc-overlay bc-overlay--inline">
      <section
        className="bc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
      >
        <div className="bc-modal__header">
          <div>
            <h3 id="modal-title">{title}</h3>
            {description && <p id="modal-description">{description}</p>}
          </div>
          <IconButton label="Close dialog">
            <X size={20} />
          </IconButton>
        </div>
        {children}
      </section>
    </div>
  );
}

export function BottomSheet({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="bc-bottom-sheet" aria-labelledby="sheet-title">
      <span className="bc-bottom-sheet__handle" aria-hidden="true" />
      <h3 id="sheet-title">{title}</h3>
      {children}
    </section>
  );
}

export function ConfirmationDialog({
  body,
  confirmLabel,
  title,
}: {
  body: string;
  confirmLabel: string;
  title: string;
}) {
  return (
    <section className="bc-confirmation" role="alertdialog" aria-label={title}>
      <span className="bc-confirmation__icon">
        <AlertCircle size={24} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
      <div>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">{confirmLabel}</Button>
      </div>
    </section>
  );
}

export function Toast({
  children,
  kind = "success",
}: {
  children: ReactNode;
  kind?: "success" | "error";
}) {
  const Icon = kind === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div className={`bc-toast bc-toast--${kind}`} role="status">
      <Icon size={19} aria-hidden="true" />
      <span>{children}</span>
      <IconButton label="Dismiss notification">
        <X size={18} />
      </IconButton>
    </div>
  );
}

export function EmptyState({
  action,
  message,
  title,
}: {
  action: string;
  message: string;
  title: string;
}) {
  return (
    <section className="bc-state">
      <span className="bc-state__art" aria-hidden="true">
        <Inbox size={32} />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      <Button>{action}</Button>
    </section>
  );
}

export function ErrorState({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  return (
    <section className="bc-state bc-state--error" role="alert">
      <span className="bc-state__art" aria-hidden="true">
        <AlertCircle size={32} />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      <Button variant="secondary">Try again</Button>
      <a href="#support">Contact support</a>
    </section>
  );
}
