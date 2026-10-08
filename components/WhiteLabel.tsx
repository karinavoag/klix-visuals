import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

export function WhiteLabel() {
  const points = [
    "direkte Kommunikation",
    "schnelle Abstimmungen",
    "bestehende Workflows können übernommen werden",
    "White Label",
    "langfristige Zusammenarbeit möglich",
  ];

  return (
    <section className={SECTION + " border-b border-line"}>
      <Reveal>
        <h2 className="type-h2 mb-6 max-w-[24ch]">Dein Designteam im Hintergrund.</h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="type-lead text-ink-dark mb-12 max-w-[48ch] leading-relaxed">
          White-Label Design Support für Agenturen, die zusätzliche kreative Kapazitäten brauchen –
          zuverlässig, flexibel und vollständig im Hintergrund.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 mb-10">
        {points.map((point, idx) => (
          <Reveal key={idx} delay={0.1 + idx * 0.03}>
            <div className="flex gap-3 items-start">
              <span className="text-brand font-semibold text-sm mt-1 flex-shrink-0">→</span>
              <p className="type-small text-ink-dark">{point}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-dark transition-colors"
        >
          White-Label Zusammenarbeit anfragen
        </a>
      </Reveal>
    </section>
  );
}
