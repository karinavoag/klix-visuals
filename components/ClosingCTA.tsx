import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-32 md:py-40";

export function ClosingCTA() {
  return (
    <section className={SECTION + " border-b border-line"}>
      <div className="max-w-[56ch]">
        <Reveal>
          <h2 className="type-h1 mb-8">Lass uns etwas entwickeln, das nicht nur gut aussieht.</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="type-lead text-ink-dark mb-12 leading-relaxed">
            Erzähl mir kurz von deinem Projekt und ich melde mich persönlich bei dir.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-dark active:bg-brand-darker transition-all duration-200"
          >
            Projekt besprechen
          </a>
        </Reveal>
      </div>
    </section>
  );
}
