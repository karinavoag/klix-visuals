export function SocialProof() {
  const clients = [
    'Hilton Munich Airport',
    'Herzog Bar',
    'Bambi Bar',
    'OriginX',
  ];

  return (
    <section className="mx-auto max-w-[72rem] px-6 py-24 md:py-32 border-b border-line text-center">
      <p className="type-micro text-ink-soft mb-8">Projekte für Marken und Unternehmen wie</p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
        {clients.map((client) => (
          <div key={client} className="text-sm font-semibold text-ink-dark">
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}
