import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

export function ClosingCTA() {
  return (
    <section className={SECTION + " border-b border-line"}>
      <div className="max-w-[48ch]">
        <Reveal>
          <h2 className="type-h2 mb-6">Lass uns etwas entwickeln, das nicht nur gut aussieht.</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="type-lead text-ink-dark mb-10 leading-relaxed">
            Erzähl mir kurz von deinem Projekt und ich melde mich persönlich bei dir.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-dark transition-colors"
          >
            Projekt besprechen
          </a>
        </Reveal>
      </div>
    </section>
  );
}
