"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, HandHeart, PartyPopper, UsersRound } from "lucide-react";
import { BrandLockup } from "@/components/layout";
import { Button } from "@/components/ui";

const pages = [
  {
    title: "Group gifts, made simple",
    text: "Bring people together around one meaningful gift.",
    icon: Gift,
  },
  {
    title: "Organize Aso-Ebi",
    text: "Coordinate tiers, contributions and delivery in one circle.",
    icon: PartyPopper,
  },
  {
    title: "Support that feels human",
    text: "Gather a trusted community around life’s important moments.",
    icon: HandHeart,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const item = pages[page];
  const Icon = item.icon;

  function finish() {
    localStorage.setItem("bc-onboarding-complete", "true");
    router.push("/sign-in");
  }

  return (
    <main className="bc-onboarding">
      <header>
        <BrandLockup />
        <button type="button" onClick={finish}>
          Skip
        </button>
      </header>
      <section>
        <div className="bc-onboarding__art" aria-hidden="true">
          <UsersRound />
          <Icon />
        </div>
        <p className="bc-auth-eyebrow">Together, every step</p>
        <h1>{item.title}</h1>
        <p>{item.text}</p>
        <div
          className="bc-onboarding__dots"
          aria-label={`Page ${page + 1} of 3`}
        >
          {pages.map((entry, index) => (
            <span
              key={entry.title}
              className={index === page ? "active" : ""}
            />
          ))}
        </div>
      </section>
      <footer>
        {page > 0 && (
          <Button variant="ghost" onClick={() => setPage(page - 1)}>
            Back
          </Button>
        )}
        <Button
          onClick={() =>
            page === pages.length - 1 ? finish() : setPage(page + 1)
          }
        >
          {page === pages.length - 1 ? "Get started" : "Next"}
        </Button>
      </footer>
    </main>
  );
}
