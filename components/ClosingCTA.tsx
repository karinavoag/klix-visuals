export function ClosingCTA() {
  return (
    <section className="mx-auto max-w-[72rem] px-6 py-24 md:py-32 bg-ink border-b border-ink-soft text-center text-white">
      <h2 className="type-h2 mb-6 text-white">
        Lass uns etwas entwickeln, das nicht nur gut aussieht.
      </h2>
      <p className="type-lead mb-10 max-w-[48ch] mx-auto text-on-brand">
        Erzähl mir kurz von deinem Projekt und ich melde mich persönlich bei dir.
      </p>
      <a
        href="#contact"
        className="inline-block px-8 py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-dark transition-colors"
      >
        Projekt besprechen
      </a>
    </section>
  );
}
