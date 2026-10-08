import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

export function BusinessSection() {
  const points = [
    "6+ Jahre E-Commerce-Erfahrung",
    "Shopify-Erfahrung aus dem operativen Tagesgeschäft",
    "Design von der Idee bis zur Produktion",
    "Direkte Zusammenarbeit ohne Agentur-Umwege",
  ];

  return (
    <section className={SECTION + " border-b border-line"}>
      <Reveal>
        <h2 className="type-h2 mb-6 max-w-[24ch]">Design mit Business-Verständnis.</h2>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="type-lead text-ink-dark mb-12 max-w-[48ch] leading-relaxed">
          Ich komme nicht nur aus dem Design, sondern aus dem operativen E-Commerce. Deshalb denke
          ich bei einer Verpackung an Produktion und Verkauf – und bei einem Shopify Store an
          Nutzerführung und Conversion statt nur an Optik.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {points.map((point, idx) => (
          <Reveal key={idx} delay={0.1 + idx * 0.03}>
            <div className="flex flex-col gap-2 border-t border-line pt-6">
              <p className="type-small text-ink-dark leading-relaxed">{point}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
