"use client";

import Image from "next/image";
import { useRef } from "react";
import { Pressable } from "./Pressable";
import { Reveal } from "./Reveal";
import { useRequest } from "./SiteShell";
import { hero } from "@/content/site";

export function Hero() {
  const { open } = useRequest();
  const ctaRef = useRef<HTMLElement>(null);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/*
        Skill §12 "Dim to focus".
        62 Prozent Deckung ueber #141622. Damit ist der Kontrast nicht
        mehr von der Bildstelle abhaengig: selbst dort, wo das Foto
        rein weiss waere, bleiben 5.02:1 fuer weissen Text.
        Auf der alten Seite fehlte diese Ebene, dort war der Kontrast
        an keiner Stelle bestimmbar.
      */}
      <div
        className="absolute inset-0 -z-10 bg-[#141622]/[0.62]"
        aria-hidden
      />

      <div className="mx-auto max-w-[72rem] px-6 pt-40 pb-32 md:pt-48 md:pb-40">
        <Reveal>
          <p className="type-micro on-glass text-white/80">{hero.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="type-display on-glass mt-6 max-w-[20ch] text-white">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="type-lead on-glass mt-8 max-w-[46ch] text-white/90">
            {hero.lead}
          </p>
        </Reveal>

        {/*
          Skill §16 Simplicity: die wichtigste Aktion ist die
          offensichtlichste. Auf dem Hero ist sie die einzige helle
          Flaeche ueberhaupt, der zweite Weg steht als Text daneben.
        */}
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Pressable
              ref={ctaRef}
              variant="onDark"
              onClick={() => open(ctaRef.current)}
              ariaHasPopup
            >
              {hero.primary}
            </Pressable>

            <Pressable
              href="#betreuung"
              variant="quiet"
              className="!text-white/80 hover:!text-white"
            >
              {hero.secondary}
            </Pressable>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
