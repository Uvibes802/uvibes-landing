import "@/styles/section/valuePillars.css";

const pillars = [
  {
    id: "federer",
    color: "var(--blueUvibes)",
    title: "Fédérer et engager",
    description:
      "Vos membres se croisent chaque jour — mais combien se parlent vraiment ? Uvibes crée des échanges guidés de 2-3 minutes qui transforment des visages familiers en personnes que l'on connaît.",
  },
  {
    id: "piloter",
    color: "var(--mainColor)",
    title: "Piloter et décider",
    description:
      "Chaque session génère des données sur l'engagement de votre collectif. Pas un rapport de 40 pages — juste ce qu'il faut pour agir au bon moment.",
  },
];

export default function ValuePillars() {
  return (
    <section className="value-pillars-section">
      <div className="value-pillars-header">
        <h2 className="value-pillars-title">
          Deux résultats. Un seul outil.
        </h2>
        <p className="value-pillars-subtitle">
          Pas une promesse vague — deux effets concrets que vos membres et vous ressentez dès les premières semaines.
        </p>
      </div>

      <div className="value-pillars-grid">
        {pillars.map((p) => (
          <div
            key={p.id}
            className="value-pillar"
            style={{ "--pillar-color": p.color } as React.CSSProperties}
          >
            <span className="value-pillar-dot" aria-hidden="true" />
            <h3 className="value-pillar-title">{p.title}</h3>
            <p className="value-pillar-desc">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
