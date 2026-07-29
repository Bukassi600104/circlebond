"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Clipboard, Link2, Share2 } from "lucide-react";

export type CircleCreationShareView = {
  id: string;
  link: string;
  shareMessage: string;
};

export type CircleCreationShareStatus = "ready" | "full" | "unavailable";

export function CircleCreationSuccess({
  circleId,
  share,
  shareStatus,
}: {
  circleId: string;
  share: CircleCreationShareView | null;
  shareStatus: CircleCreationShareStatus;
}) {
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  async function copy(kind: "link" | "message") {
    if (!share) return;
    try {
      if (kind === "link") {
        await navigator.clipboard.writeText(share.link);
      } else {
        await navigator.clipboard.writeText(share.shareMessage);
      }
      setCopied(kind);
      setError("");
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setError("Copying was blocked. Select the link above to copy it.");
    }
  }

  async function shareNative() {
    if (!share) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "BondCircle invitation",
          text: share.shareMessage,
        });
      } else {
        await navigator.clipboard.writeText(share.shareMessage);
        setCopied("message");
      }
      setError("");
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError")
        return;
      setError("Sharing did not open. You can copy the invitation instead.");
    }
  }

  return (
    <div className="bc-creation-success" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="circle-created-title"
      >
        <span className="bc-creation-success__icon">
          <CheckCircle2 size={24} aria-hidden="true" />
        </span>
        <p>CIRCLE READY</p>
        <h2 id="circle-created-title">Your circle has been created</h2>
        {share ? (
          <>
            <span>
              Share this secure, seven-day invitation for the remaining circle
              places.
            </span>
            <label>
              Join link
              <input
                readOnly
                value={share.link}
                aria-label="Circle join link"
              />
            </label>
            <div className="bc-creation-success__actions">
              <button type="button" onClick={() => void copy("link")}>
                {copied === "link" ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Link2 size={14} aria-hidden="true" />
                )}
                {copied === "link" ? "Link copied" : "Copy link"}
              </button>
              <button type="button" onClick={() => void copy("message")}>
                {copied === "message" ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Clipboard size={14} aria-hidden="true" />
                )}
                {copied === "message" ? "Invite copied" : "Copy invitation"}
              </button>
              <button type="button" onClick={() => void shareNative()}>
                <Share2 size={14} aria-hidden="true" />
                Share
              </button>
            </div>
          </>
        ) : shareStatus === "unavailable" ? (
          <span>
            Your circle is safe and ready, but the share link could not be
            prepared just now. Open the circle to create or manage invitations.
          </span>
        ) : (
          <span>
            Every place is already assigned to a named invite. You can manage
            those invitations inside the circle.
          </span>
        )}
        {error ? <small role="alert">{error}</small> : null}
        <Link href={`/account/circles/${circleId}`}>Open circle</Link>
      </section>
    </div>
  );
}
