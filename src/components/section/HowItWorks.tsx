import "../../styles/section/howItWorks.css";

const steps = [
  {
    number: "01",
    color: "var(--mainColor)",
    title: "Votre collectif configure Uvibes",
    description:
      "En quelques minutes, votre organisation paramètre l'app et invite ses membres. Aucune compétence technique requise.",
  },
  {
    number: "02",
    color: "var(--blueUvibes)",
    title: "Une question vous met en relation",
    description:
      "L'app crée des paires inattendues à partir d'une question commune. Vous êtes mis en relation avec quelqu'un que vous n'auriez pas approché.",
  },
  {
    number: "03",
    color: "var(--greenUvibes)",
    title: "2-3 minutes d'échange vidéo",
    description:
      "Un échange court, guidé, positif. Pas de pression, pas de préparation — juste une vraie rencontre humaine.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <h2 className="title-h2-orange how-it-works-title">
        Comment ça marche&nbsp;?
      </h2>
      <div className="how-it-works-grid">
        {steps.map((step) => (
          <div key={step.number} className="how-it-works-step">
            <span className="step-number" style={{ color: step.color }}>
              {step.number}
            </span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc text-regular">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
