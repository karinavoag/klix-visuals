export function BusinessSection() {
  const points = [
    '6+ Jahre E-Commerce-Erfahrung',
    'Shopify-Erfahrung aus dem operativen Tagesgeschäft',
    'Design von der Idee bis zur Produktion',
    'Direkte Zusammenarbeit ohne Agentur-Umwege',
  ];

  return (
    <section className="mx-auto max-w-[72rem] px-6 py-24 md:py-32 bg-brand-paper border-b border-line">
      <h2 className="type-h2 mb-8">Design mit Business-Verständnis.</h2>
      <p className="type-lead mb-12 max-w-[48ch] text-ink-dark">
        Ich komme nicht nur aus dem Design, sondern aus dem operativen E-Commerce. Deshalb denke ich bei einer Verpackung an Produktion und Verkauf – und bei einem Shopify Store an Nutzerführung und Conversion statt nur an Optik.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, idx) => (
          <div key={idx} className="p-4 bg-white rounded-sm">
            <p className="text-sm text-ink-dark">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
