import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/section/valuePillars.css";

const pillars = [
  {
    id: "federer",
    dot: "var(--orange)",
    label: "01 / pilier",
    title: "Fédérer",
    titleEt: "et",
    titleSuffix: "engager",
    body: "Créer un sentiment d'appartenance fort à votre organisation. Vos membres se croisent chaque jour — Uvibes les fait se rencontrer.",
    stat: "+38%",
    statLabel: "de sentiment d'appartenance après 6 semaines",
  },
  {
    id: "piloter",
    dot: "var(--rose)",
    label: "02 / pilier",
    title: "Piloter",
    titleEt: "et",
    titleSuffix: "décider",
    body: "Accédez à des données en temps réel pour augmenter l'efficacité de vos actions. Pas un rapport de 40 pages — juste ce qu'il faut pour agir.",
    stat: "< 5 min",
    statLabel: "pour lire le pouls de votre collectif",
  },
];

export default function ValuePillars() {
  return (
    <section className="pillars-section">
      <div className="pillars-header">
        <p className="v-mono pillars-kicker">
          Uvibes, moteur d&apos;engagement et de performance dans votre organisation
        </p>
        <h2 className="pillars-title v-prompt">
          Un seul outil pour{" "}
          <strong style={{ color: "var(--orange)", fontWeight: 800 }}>renforcer votre collectif</strong>{" "}
          et{" "}
          <strong style={{ color: "var(--rose)", fontWeight: 800 }}>guider vos choix stratégiques</strong>.
        </h2>
      </div>

      <div className="pillars-grid">
        {pillars.map((p) => (
          <div key={p.id} className="pillar-card" style={{ "--p-dot": p.dot } as React.CSSProperties}>
            <div className="pillar-card-top">
              <span className="pillar-dot" aria-hidden="true" />
              <span className="v-mono pillar-label">{p.label}</span>
            </div>
            <h3 className="pillar-title v-prompt">
              {p.title}{" "}
              <span className="v-serif">{p.titleEt}</span>{" "}
              {p.titleSuffix}
            </h3>
            <p className="pillar-body">{p.body}</p>
            <div className="pillar-stat-row">
              <div className="pillar-stat v-prompt" style={{ color: p.dot }}>{p.stat}</div>
              <div className="pillar-stat-label">{p.statLabel}</div>
            </div>
            <div className="pillar-vibline" aria-hidden="true">
              <VibrationLine width={120} height={36} amplitude={8} freq={4}
                stroke={p.dot} strokeWidth={1.2} speed={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
