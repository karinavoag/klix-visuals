import { clients } from "@/content/site";
import Image from "next/image";
import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

export function SocialProof() {
  return (
    <section className={SECTION + " border-b border-line"}>
      <Reveal>
        <p className="type-micro text-ink-soft text-center mb-12">
          Projekte für Marken und Unternehmen wie
        </p>
      </Reveal>

      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {clients.map((client, i) => (
          <Reveal key={client.name} delay={i * 0.02}>
            {client.logo ? (
              <div
                className="relative h-10 w-28 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                  style={{
                    filter: "brightness(0.9) saturate(0.5) hue-rotate(220deg)",
                  }}
                />
              </div>
            ) : (
              <div className="text-xs font-semibold text-ink-soft opacity-60 hover:opacity-100 transition-opacity">
                {client.name}
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
