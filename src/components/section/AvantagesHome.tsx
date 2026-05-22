import Link from "next/link";
import "@/styles/section/avantagesHome.css";

const spheres = [
  {
    id: "entreprise",
    label: "Entreprises & équipes",
    intro: "Dans le monde du travail, Uvibes stimule le bien-être individuel pour renforcer la performance collective.",
    color: "var(--mainColor)",
    stat: "93%",
    statDetail: "des salariés non engagés ou activement désengagés",
    statSource: "Gallup, 2025",
    benefits: [
      { title: "Performance", desc: "Stimuler la réflexion et susciter l'adhésion collective" },
      { title: "Lien d'appartenance", desc: "Renforcer le lien affectif entre l'entreprise et ses équipes" },
      { title: "RSE", desc: "Satisfaire le besoin relationnel et alléger la gestion émotionnelle" },
    ],
  },
  {
    id: "enseignement",
    label: "Établissements d'enseignement",
    intro: "Dans la sphère éducative, Uvibes améliore la sociabilité des apprenants.",
    color: "var(--secondaryColor)",
    stat: "41%",
    statDetail: "des étudiants présentent des symptômes dépressifs",
    statSource: "Université Bordeaux, 2024",
    benefits: [
      { title: "Santé mentale", desc: "Échanges bienveillants entre élèves, élimination du cyberharcèlement" },
      { title: "Soft skills", desc: "Premier espace d'entraînement continu aux compétences interpersonnelles" },
      { title: "Appartenance", desc: "Renforcer le lien alumni, initier des mentorats enrichissants" },
    ],
  },
  {
    id: "collectif",
    label: "Collectifs & associations",
    intro: "Dans la sphère du prendre soin, Uvibes est une nouvelle respiration.",
    color: "var(--blueUvibes)",
    stat: "38%",
    statDetail: "de risque de démence en moins grâce à une vie sociale active",
    statSource: "Rush University, 2025",
    benefits: [
      { title: "Lien social", desc: "Rompre l'isolement et stimuler les capacités cognitives" },
      { title: "Épanouissement", desc: "Renforcer la confiance en soi et en son entourage" },
      { title: "Transmission", desc: "Créer des communautés d'entraide entre pairs" },
    ],
  },
];

export default function AvantagesHome({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="avantages-home-section">
      <div className="avantages-home-header">
        <h2 className="title-h2-orange">Ce qu&apos;Uvibes apporte à votre organisation</h2>
        <p className="avantages-home-subtitle">
          Des résultats concrets, mesurés — quel que soit votre collectif.
        </p>
      </div>

      <div className="avantages-home-grid">
        {spheres.map((s) => (
          <article
            key={s.id}
            className="avantage-card"
            style={{ "--av-color": s.color } as React.CSSProperties}
          >
            <header className="avantage-card-header">
              <span className="avantage-card-label">{s.label}</span>
              <p className="avantage-card-intro">{s.intro}</p>
            </header>

            <div className="avantage-card-stat">
              <span className="avantage-card-stat-num">{s.stat}</span>
              <div className="avantage-card-stat-text">
                <p className="avantage-card-stat-detail">{s.statDetail}</p>
                <p className="avantage-card-stat-source">{s.statSource}</p>
              </div>
            </div>

            <ul className="avantage-card-benefits">
              {s.benefits.map((b, i) => (
                <li key={i} className="avantage-card-benefit">
                  <span className="avantage-benefit-title">{b.title}</span>
                  <span className="avantage-benefit-desc">{b.desc}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {showCta && (
        <div className="avantages-home-cta">
          <Link href="/solution" className="btn-cta primary">
            Découvrir la solution
          </Link>
        </div>
      )}
    </section>
  );
}
