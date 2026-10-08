import { clients } from "@/content/site";
import Image from "next/image";
import { Reveal } from "./Reveal";

const SECTION = "mx-auto max-w-[72rem] px-6 py-24 md:py-32";

export function SocialProof() {
  const featured = clients.slice(0, 4);

  return (
    <section className={SECTION + " border-b border-line"}>
      <Reveal>
        <p className="type-micro text-ink-soft text-center mb-12">
          Projekte für Marken und Unternehmen wie
        </p>
      </Reveal>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {featured.map((client, i) => (
          <Reveal key={client.name} delay={i * 0.05}>
            {client.logo ? (
              <div className="relative h-12 w-32 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="text-sm font-semibold text-ink-dark">{client.name}</div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
