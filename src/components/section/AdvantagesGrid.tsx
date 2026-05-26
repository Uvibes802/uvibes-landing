import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/section/advantagesGrid.css";

const ADVANTAGES = [
  {
    icon: "⚡",
    title: "Zéro friction",
    body: "Aucun téléchargement. Aucun compte à créer. Vos membres cliquent et échangent.",
    accent: "var(--orange)",
  },
  {
    icon: "🎯",
    title: "Algorithme de matching",
    body: "Chaque rencontre est pertinente. Le moteur analyse les profils pour éviter les doublons.",
    accent: "var(--rose)",
  },
  {
    icon: "📊",
    title: "Dashboard temps réel",
    body: "Taux d'engagement, connexions créées, satisfaction — vous pilotez avec des données.",
    accent: "var(--orange)",
  },
  {
    icon: "🔒",
    title: "Données hébergées en France",
    body: "Infrastructure RGPD-compliant. Vos données restent en Europe, souveraines.",
    accent: "var(--rose)",
  },
  {
    icon: "🧩",
    title: "Entièrement personnalisable",
    body: "Thématiques, durée, questionnaires, branding — l'expérience est la vôtre.",
    accent: "var(--orange)",
  },
  {
    icon: "🚀",
    title: "Déployé en 6 minutes",
    body: "Configurez, invitez, lancez. Sans IT, sans formation, sans prestataire.",
    accent: "var(--rose)",
  },
];

export default function AdvantagesGrid() {
  return (
    <section className="ag-section">
      <div className="ag-header">
        <p className="v-mono ag-eyebrow">Pourquoi Uvibes</p>
        <h2 className="ag-title v-prompt">
          Tout ce dont vous avez <span className="v-serif">besoin,</span>
          <br />
          <span className="ag-title-rose">rien de superflu.</span>
        </h2>
      </div>

      <div className="ag-grid">
        {ADVANTAGES.map((a, i) => (
          <div key={i} className="ag-card" style={{ "--ag-accent": a.accent } as React.CSSProperties}>
            <div className="ag-card-top">
              <span className="ag-icon" aria-hidden="true">{a.icon}</span>
              <div className="ag-wave" aria-hidden="true">
                <VibrationLine width={120} height={28} amplitude={8} freq={4} stroke={a.accent} strokeWidth={1} speed={18} />
              </div>
            </div>
            <h3 className="ag-card-title v-prompt">{a.title}</h3>
            <p className="ag-card-body">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
