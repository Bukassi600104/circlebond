import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Gift,
  HeartHandshake,
  Shirt,
} from "lucide-react";

const choices = [
  {
    type: "gift",
    title: "Gift Circle",
    description: "Coordinate a shared gift and track contributions.",
    icon: Gift,
  },
  {
    type: "aso-ebi",
    title: "Aso-Ebi Circle",
    description: "Organise fabric tiers, members, payments and delivery.",
    icon: Shirt,
  },
  {
    type: "support",
    title: "Support Circle",
    description: "Bring trusted people together around a shared need.",
    icon: HeartHandshake,
  },
];

export function CreateCircleChoices({ selected }: { selected?: string }) {
  return (
    <section className="bc-dashboard-collection">
      <header>
        <div>
          <Link href="/account">
            <ArrowLeft size={15} aria-hidden="true" />
            Dashboard
          </Link>
          <h1>Create a circle</h1>
          <p>Choose the circle that matches what you are organising.</p>
        </div>
      </header>
      <div className="bc-dashboard-choice-grid">
        {choices.map(({ description, icon: Icon, title, type }) => (
          <article
            className={selected === type ? "is-selected" : ""}
            key={type}
          >
            <span>
              <Icon size={25} aria-hidden="true" />
            </span>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link href={`/account/create?type=${type}`}>
              {selected === type ? "Selected" : "Choose"}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      {selected ? (
        <p className="bc-dashboard-phase-note">
          The {choices.find((choice) => choice.type === selected)?.title} setup
          flow begins in its approved implementation milestone.
        </p>
      ) : null}
    </section>
  );
}
