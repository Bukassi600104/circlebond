"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="foundation-page">
      <section className="foundation-card">
        <p className="foundation-kicker">BOND CIRCLE</p>
        <h1>Something went wrong</h1>
        <p>We could not load this page. Please try again.</p>
        <button className="foundation-link" onClick={() => reset()}>
          Try again →
        </button>
      </section>
    </main>
  );
}
