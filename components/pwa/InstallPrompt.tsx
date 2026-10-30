"use client";

import { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  return (
    /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1)
  );
}

function wasRecentlyDismissed() {
  try {
    const elapsed =
      Date.now() - Number(window.localStorage.getItem(DISMISSED_AT_KEY));
    return elapsed >= 0 && elapsed < DISMISSAL_COOLDOWN;
  } catch {
    return false;
  }
}

export function InstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .catch(() => {
          // Installation remains optional; a registration failure must not block
          // authentication or dashboard use.
        });
    }

    if (isStandalone() || wasRecentlyDismissed()) return;

    let iosTimer: number | undefined;
    const onInstallPrompt = (event: Event) => {
      if (wasRecentlyDismissed() || isStandalone()) return;
      event.preventDefault();
      if (iosTimer) window.clearTimeout(iosTimer);
      setShowIosHelp(false);
      setMessage("");
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      if (iosTimer) window.clearTimeout(iosTimer);
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

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
    try {
      window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    } catch {
      // A restricted browser must still allow dismissal for this page.
    }
    setVisible(false);
    setDeferredPrompt(null);
  }

  async function install() {
    if (!deferredPrompt) return;
    const prompt = deferredPrompt;
    setDeferredPrompt(null);
    setInstalling(true);
    setMessage("");
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "dismissed") dismiss();
      else setVisible(false);
    } catch {
      setMessage(
        "Installation could not start. Use your browser’s install menu, or try again when Install is available.",
      );
    } finally {
      setInstalling(false);
    }
  }

  if (
    !visible ||
    pathname?.startsWith("/invite/") ||
    [
      "/",
      "/onboarding",
      "/sign-in",
      "/register",
      "/verify",
      "/account-recovery",
      "/legal/accept",
    ].includes(pathname ?? "")
  )
    return null;

  return (
    <aside
      className="bc-install-prompt"
      aria-label="Install BondCircle"
      role="region"
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
            In Safari, tap <Share2 size={14} aria-hidden="true" /> Share, then{" "}
            <b>Add to Home Screen</b> (under More if needed). Leave{" "}
            <b>Open as Web App</b> on if shown, then tap Add.
          </p>
        ) : (
          <p>Use BondCircle full-screen from your phone.</p>
        )}
        {message ? <p role="status">{message}</p> : null}
      </div>
      {deferredPrompt || installing ? (
        <button
          className="bc-install-prompt__action"
          type="button"
          onClick={install}
          disabled={installing}
        >
          <Download size={15} aria-hidden="true" />
          {installing ? "Opening…" : "Install"}
        </button>
      ) : null}
    </aside>
  );
}
