export function WhiteLabel() {
  const points = [
    'direkte Kommunikation',
    'schnelle Abstimmungen',
    'bestehende Workflows können übernommen werden',
    'White Label',
    'langfristige Zusammenarbeit möglich',
  ];

  return (
    <section className="mx-auto max-w-[72rem] px-6 py-24 md:py-32 border-b border-line">
      <h2 className="type-h2 mb-8">Dein Designteam im Hintergrund.</h2>
      <p className="type-lead mb-12 max-w-[48ch] text-ink-dark">
        White-Label Design Support für Agenturen, die zusätzliche kreative Kapazitäten brauchen – zuverlässig, flexibel und vollständig im Hintergrund.
      </p>
      <div className="space-y-3 mb-10">
        {points.map((point, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <span className="text-brand font-semibold mt-0.5">•</span>
            <p className="text-sm text-ink-dark">{point}</p>
          </div>
        ))}
      </div>
      <a
        href="#contact"
        className="inline-block px-8 py-4 bg-brand text-white font-semibold rounded-sm hover:bg-brand-dark transition-colors"
      >
        White-Label Zusammenarbeit anfragen
      </a>
    </section>
  );
}
