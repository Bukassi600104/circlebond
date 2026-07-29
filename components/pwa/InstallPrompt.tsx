"use client";

import { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import Image from "next/image";

type InstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<InstallChoice>;
}

const DISMISSED_AT_KEY = "bondcircle-install-dismissed-at";
const DISMISSAL_COOLDOWN = 7 * 24 * 60 * 60 * 1000;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean(
      (window.navigator as Navigator & { standalone?: boolean }).standalone,
    )
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function wasRecentlyDismissed() {
  const dismissedAt = Number(window.localStorage.getItem(DISMISSED_AT_KEY));
  return Number.isFinite(dismissedAt)
    ? Date.now() - dismissedAt < DISMISSAL_COOLDOWN
    : false;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Installation remains optional; a registration failure must not block
        // authentication or dashboard use.
      });
    }

    if (isStandalone() || wasRecentlyDismissed()) return;

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    let iosTimer: number | undefined;
    if (isIos()) {
      iosTimer = window.setTimeout(() => {
        setShowIosHelp(true);
        setVisible(true);
      }, 1200);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      if (iosTimer) window.clearTimeout(iosTimer);
    };
  }, []);

  function dismiss() {
    window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    setVisible(false);
  }

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  }

  if (!visible) return null;

  return (
    <aside
      className="bc-install-prompt"
      aria-label="Install BondCircle"
      role="dialog"
    >
      <button
        className="bc-install-prompt__close"
        type="button"
        aria-label="Dismiss install suggestion"
        onClick={dismiss}
      >
        <X size={16} aria-hidden="true" />
      </button>
      <Image src="/brand/icon-192.png" alt="" width={42} height={42} />
      <div>
        <strong>Install BondCircle</strong>
        {showIosHelp ? (
          <p>
            Tap <Share2 size={14} aria-hidden="true" /> Share, then{" "}
            <b>Add to Home Screen</b>.
          </p>
        ) : (
          <p>Use BondCircle full-screen from your phone.</p>
        )}
      </div>
      {deferredPrompt ? (
        <button
          className="bc-install-prompt__action"
          type="button"
          onClick={install}
        >
          <Download size={15} aria-hidden="true" />
          Install
        </button>
      ) : null}
    </aside>
  );
}
