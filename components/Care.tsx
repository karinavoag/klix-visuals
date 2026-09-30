"use client";

import { useRef } from "react";
import { Pressable } from "./Pressable";
import { Reveal } from "./Reveal";
import { useRequest } from "./SiteShell";
import { care } from "@/content/site";

/**
 * Betreuung. NEU 22.09.2026.
 *
 * Der Grund fuer den Relaunch. Die alte Seite verkauft ausschliesslich
 * Einzelprojekte; der planbare Umsatz kommt aber aus monatlichen
 * Pauschalen, und die kamen nirgends vor.
 *
 * Eigene Datei statt in Sections.tsx, weil dieser Abschnitt als
 * einziger der Seite den Anfrage-Dialog oeffnet und dafuer eine
 * Client-Komponente sein muss. Sections.tsx bleibt dadurch eine
 * reine Server-Komponente.
 *
 * Skill §16 Simplicity: es gibt weiterhin genau eine gefuellte Flaeche
 * pro Bildschirm. Die drei Pakete tragen keine eigenen Buttons, sonst
 * stuenden drei gleichwertige CTAs nebeneinander und die Hierarchie
 * waere aufgehoben. Der eine Weg steht unter den Karten.
 *
 * Der Preis steht bewusst gross und ungerundet als erstes im Kopf der
 * Karte. Er ist der Grund, warum es diesen Abschnitt gibt: er filtert
 * die Anfragen unter 150 EUR heraus, die heute den Kalender fuellen.
 */
export function Care() {
  const { open } = useRequest();
  const ctaRef = useRef<HTMLElement>(null);

  return (
    <section id="betreuung" className="mx-auto max-w-[72rem] px-6 py-24 md:py-32">
      <Reveal>
        <p className="type-micro text-ink-soft">{care.eyebrow}</p>
        <h2 className="type-h2 mt-4 max-w-[24ch]">{care.title}</h2>
      </Reveal>

      <Reveal delay={0.04}>
        <p className="type-lead mt-8 max-w-[52ch] text-ink-soft">{care.lead}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {care.packages.map((paket, i) => (
          <Reveal key={paket.id} delay={i * 0.03}>
            <article
              className="flex h-full flex-col gap-6 rounded-[1rem] bg-surface p-6
                         shadow-[var(--shadow-card)]"
            >
              <header className="flex flex-col gap-2">
                <p className="type-micro text-ink-soft">{paket.name}</p>
                <p className="type-h3">{paket.price}</p>
                <p className="type-small text-ink-soft">{paket.unit}</p>
              </header>

              <p className="type-small text-ink">{paket.forWhom}</p>

              <ul className="flex flex-col gap-3 border-t border-line pt-6">
                {paket.items.map((item) => (
                  <li key={item} className="type-small text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8
                        md:flex-row md:items-start md:justify-between">
          {/* Die Bedingungen stehen vor dem Klick, nicht im Angebot
              danach. Wer sie erst im PDF liest, fuehlt sich gefangen.
              Skill §16: "no surprises". */}
          <ul className="flex max-w-[52ch] flex-col gap-2">
            {care.terms.map((term) => (
              <li key={term} className="type-small text-ink-soft">
                {term}
              </li>
            ))}
          </ul>

          <Pressable
            ref={ctaRef}
            variant="primary"
            onClick={() => open(ctaRef.current, care.cta)}
            ariaHasPopup
            className="shrink-0"
          >
            {care.cta}
          </Pressable>
        </div>
      </Reveal>
    </section>
  );
}
