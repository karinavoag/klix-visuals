import Image from "next/image";
import { Reveal } from "./Reveal";
import { Placeholder, PlaceholderFrame } from "./Placeholder";
import { services, process, testimonials, clients, work, about, sectors, company } from "@/content/site";

/* Abstands-Skala: Sections stehen auf 24 (6rem) mobil, 32 (8rem) ab md.
   Nur Werte aus der Reihe. Skill §7 Craft. */
const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="type-micro text-ink-soft">{eyebrow}</p>
      <h2 className="type-h2 mt-4 max-w-[24ch]">{title}</h2>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="arbeiten" className={SECTION}>
      <SectionHead eyebrow="Arbeiten" title="Ausgewählte Projekte" />

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.03}>
            {/* Bewusst nicht anfassbar: ein Element, das Druck-Feedback
                gibt und dann nichts tut, ist genau der Fehler aus dem
                Audit der alten Seite. Skill §16 Familiarity. */}
            <article className="flex flex-col gap-4">
              {item.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem]
                                shadow-[var(--shadow-card)]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24rem"
                    className="object-cover"
                  />
                </div>
              ) : (
                /* Kein erfundener Nachweis. Lieber eine sichtbare Luecke
                   als ein fremdes Motiv unter einem Kundennamen. */
                <PlaceholderFrame
                  label="PLATZHALTER: Projektbild fehlt"
                  className="aspect-[4/3] w-full"
                />
              )}
              <div className="flex flex-col gap-1">
                <h3 className="type-h3">{item.client}</h3>
                <p className="type-small text-ink-soft">{item.discipline}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="leistungen" className={SECTION}>
      <SectionHead eyebrow="Leistungen" title="Was ich übernehme" />

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.03}>
            <article className="flex h-full flex-col gap-4 border-t border-line pt-6">
              {service.image ? (
                /* Illustration der Leistung, kein Projektnachweis.
                   Die Mockups sind keinem Kunden zugeordnet und
                   werden auch nicht so beschriftet. */
                <div className="relative mb-2 aspect-[3/2] w-full overflow-hidden rounded-[1rem]
                                shadow-[var(--shadow-card)]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 36rem"
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderFrame
                  label="PLATZHALTER: Bild für diese Leistung fehlt"
                  className="mb-2 aspect-[3/2] w-full"
                />
              )}

              <h3 className="type-h3">{service.title}</h3>

              <p className="type-body text-ink-soft">{service.body}</p>

              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {service.items.map((item) => (
                  <li key={item} className="type-small text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/**
 * Fuer wen. NEU 22.09.2026.
 *
 * Die Logowand beantwortet "mit wem hat sie gearbeitet", nicht
 * "bin ich hier richtig". Dieser Abschnitt sortiert dieselben Kunden
 * nach Branche, damit ein Gastronom, ein Bautraeger und ein Importeur
 * sich selbst wiederfinden, ohne die Projektliste zu lesen.
 *
 * Als <dl>, weil es Paare aus Branche und zugehoerigen Kunden sind.
 * Kein Bild: der Abschnitt steht zwischen zwei bildstarken Bloecken
 * und soll dort ruhig sein.
 */
export function Sectors() {
  return (
    <section id="fuer-wen" className={SECTION}>
      <SectionHead eyebrow="Für wen" title="Wo ich zu Hause bin" />

      <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {sectors.map((sector, i) => (
          <Reveal key={sector.id} delay={i * 0.03}>
            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <dt className="type-h3">{sector.title}</dt>
              <dd>
                <p className="type-body text-ink-soft">{sector.body}</p>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function Process() {
  return (
    <section id="ablauf" className={SECTION}>
      <SectionHead eyebrow="Ablauf" title="In vier Schritten zum fertigen Projekt" />

      <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {process.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.03}>
            <li className="flex flex-col gap-3 border-t border-line pt-6">
              <span className="type-micro text-ink-soft">{step.step}</span>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body text-ink-soft">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className={SECTION}>
      <SectionHead eyebrow="Referenzen" title="Was Kunden sagen" />

      {/* Kein Auto-Slider. Skill §14: keine langsam laufenden
          Endlos-Bewegungen, die niemand ausgeloest hat. */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.03}>
            <figure className="flex h-full flex-col gap-6 rounded-[1rem] bg-surface p-6
                               shadow-[var(--shadow-card)]">
              <blockquote className="type-body">{t.quote}</blockquote>
              <figcaption className="mt-auto type-small text-ink-soft">
                {t.name}, {t.company}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="mx-auto max-w-[72rem] px-6 py-24 md:py-32">
      <Reveal>
        <p className="type-micro text-ink-soft">Kunden</p>
      </Reveal>

      <Reveal delay={0.04}>
        <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-10
                       sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <li key={client.name} className="flex h-8 items-center justify-center">
              {client.logo ? (
                /* Maske statt <img>: jedes Logo traegt sein Navy fest im
                   style-Block und waere auf dunklem Grund unsichtbar.
                   So folgt es currentColor und damit dem Theme. */
                <span
                  className="logo-mask h-8 w-full text-ink-soft"
                  style={{ ["--logo-src" as string]: `url(${client.logo})` }}
                  role="img"
                  aria-label={client.name}
                />
              ) : (
                /* Fuer Hilton Munich Airport und Kraemmel liegt kein SVG
                   vor. Ein fremdes Logo nachzubauen waere eine Marken-
                   verletzung, ein Platzhalterrahmen mitten in der Wand
                   waere ein Schaden. Der Schriftzug traegt denselben
                   Ton wie die Masken daneben und liest sich als
                   Entscheidung, nicht als Luecke. */
                <span className="type-small text-center text-ink-soft">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function About() {
  return (
    <section id="ueber-mich" className={SECTION}>
      <SectionHead eyebrow="Über mich" title={about.name} />

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <Reveal>
          {/* Quadrat mit abgerundeten Ecken statt Kreis, Radius 1rem
              wie bei allen anderen Bildflaechen der Seite. Bild und
              Rahmen haben dasselbe Seitenverhaeltnis, es gibt also
              keinen Ueberstand und object-position bliebe wirkungslos;
              der Ausschnitt sitzt im Bild selbst. */}
          {/* GEAENDERT 22.09.2026: auf Compact nimmt das Portrait die
              volle Spaltenbreite ein, genau wie die Zitatkacheln, die
              bis `md` ebenfalls einspaltig ueber die ganze Breite
              laufen. Vorher standen hier 10rem, das Bild sass klein
              und linksbuendig neben viel leerer Flaeche.
              Ab `md` gilt wieder 14rem, das ist die Breite der
              Rasterspalte `md:grid-cols-[14rem_1fr]`. */}
          <div className="relative mx-auto aspect-square w-full overflow-hidden
                          rounded-[1rem] shadow-[var(--shadow-card)] md:w-56">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              fill
              /* Auf Compact volle Spaltenbreite, ab md feste 14rem.
                 Mit dem alten festen "14rem" haette Next fuer das
                 Telefon eine zu kleine Datei ausgewaehlt und das Bild
                 waere unscharf gewesen. */
              sizes="(max-width: 767px) calc(100vw - 3rem), 14rem"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {about.paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <p className="type-body max-w-[56ch] text-ink-soft">{para}</p>
            </Reveal>
          ))}

          {/* Vier Eckdaten zum Ueberfliegen. Wer den Fliesstext nicht
              liest, findet hier trotzdem Sitz, Antwortzeit und
              Zusammenarbeitsform. Als <dl>, weil es Paare aus Merkmal
              und Wert sind und kein Fliesstext.
              Abstaende ausschliesslich aus der Skala: 8 / 4 / 24 / 32 / 16. */}
          <Reveal delay={about.paragraphs.length * 0.03}>
            <dl className="mt-2 grid max-w-[56ch] grid-cols-1 gap-4 border-t border-line
                           pt-6 sm:grid-cols-2 sm:gap-x-8">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="type-micro text-ink-soft">{fact.label}</dt>
                  <dd className="type-small text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[72rem] flex-col gap-8 px-6 py-16
                      md:flex-row md:items-end md:justify-between">
        <p className="type-micro text-ink-soft">{company.legal}</p>

        <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Rechtliches">
          <a href="/impressum" className="type-small text-ink-soft hover:text-ink">
            Impressum
          </a>
          <a href="/datenschutz" className="type-small text-ink-soft hover:text-ink">
            Datenschutz
          </a>
          <a href="/agb" className="type-small text-ink-soft hover:text-ink">
            AGB
          </a>
        </nav>
      </div>
    </footer>
  );
}
