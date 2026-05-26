import Link from "next/link";
import "../../styles/section/howItWorks.css";

const STEPS = [
  {
    n: "01",
    title: "Choisissez vos expériences et thématiques d'échange",
    body: "Le paramétrage est réalisé en quelques minutes. Aucune compétence technique n'est requise.",
    time: "≈ 6 min de setup",
  },
  {
    n: "02",
    title: "Votre collectif échange en vidéo, en one-to-one",
    body: "Les membres se rencontrent aléatoirement lors d'échanges vidéo individuels. Des questions adaptées viennent guider la conversation. À la fin, les participants peuvent échanger leurs cartes de visite.",
    time: "2 à 3 min par échange",
  },
  {
    n: "03",
    title: "Recueillez des données stratégiques",
    body: "À l'issue des échanges, les participants répondent à de courtes enquêtes personnalisées. Vous recueillez retours, points de vue et données utiles pour mieux comprendre votre collectif.",
    time: "Dashboard temps réel",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-header">
        <div>
          <p className="v-mono how-eyebrow">Comment ça fonctionne</p>
          <h2 className="how-title v-prompt">
            Trois <span className="v-serif">étapes.</span>
            <br />
            <span className="how-title-rose">Pas une de plus.</span>
          </h2>
        </div>
        <Link href="/solution" className="btn-brand how-cta">
          Voir la solution en détail →
        </Link>
      </div>

      <div className="how-grid">
        <svg className="how-connector" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 20 Q 150 -10 300 20 T 600 20 T 900 20 T 1200 20"
            fill="none" stroke="var(--rose)" strokeWidth="2" strokeDasharray="4 6"
          />
        </svg>

        {STEPS.map((s) => (
          <div key={s.n} className="how-step">
            <div className="how-circle-wrap">
              <div className="how-circle v-prompt">{s.n}</div>
              <span className="how-circle-ring" aria-hidden="true" />
            </div>
            <h3 className="how-step-title v-prompt">{s.title}</h3>
            <p className="how-step-body">{s.body}</p>
            <div className="how-time-badge">
              <span className="how-time-dot" aria-hidden="true" />
              <span className="v-mono how-time-text">{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
