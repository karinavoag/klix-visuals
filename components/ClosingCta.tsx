"use client";

import { useRef } from "react";
import { Pressable } from "./Pressable";
import { useRequest } from "./SiteShell";

export function ClosingCta() {
  const { open } = useRequest();
  const ctaRef = useRef<HTMLElement>(null);

  return (
    <section className="bg-ground py-16 md:py-24">
      <div className="mx-auto max-w-[56ch] px-6 text-center">
        <h2 className="type-h2 mb-4 text-ink">Hab ich dich überzeugt?</h2>
        <p className="type-body mb-8 text-ink-soft">
          Dann lass uns zusammenarbeiten. Schreib mir einfach, worum es geht –
          Antwort unter 24 Stunden, und dann schauen wir, wie dein Projekt startet.
        </p>
        <Pressable
          ref={ctaRef}
          variant="primary"
          onClick={() => open(ctaRef.current)}
          ariaHasPopup
        >
          Projekt anfragen
        </Pressable>
      </div>
    </section>
  );
}
