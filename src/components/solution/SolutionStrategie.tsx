"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionStrategie.css";

// Exemples de thématiques (verbatim) — défilent en ticker, pas en pastilles
const THEMES = [
  "motivation et engagement",
  "équilibre vie professionnelle / vie personnelle",
  "sentiment d'appartenance",
  "qualité des relations au sein du collectif",
  "lien social et risque d'isolement",
  "besoins de formation",
  "usages numériques",
  "confiance en l'avenir",
  "culture d'entreprise et priorités stratégiques",
  "appréciation de la communication interne",
  "boîte à idées",
  "évaluation d'un projet, d'un événement ou d'une initiative",
];

export default function SolutionStrategie() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });

  return (
    <section id="strategie" className={`str-section${vis ? " str-vis" : ""}`} ref={ref}>
      <div className="str-inner">
        <header className="str-head">
          <p className="str-eyebrow">
            <span className="str-eyebrow-dot" aria-hidden="true" />
            Stratégie
          </p>
          <h2 className="str-title v-prompt">
            Disposez de <em className="str-title-accent v-serif">données inédites</em>
            <br />pour mieux comprendre votre collectif
          </h2>
        </header>

        <div className="str-bento">
          {/* 01 — Les enquêtes flash (bloc vedette, plus grand) */}
          <article className="str-card str-card--flash">
            <span className="str-numeral v-serif" aria-hidden="true">01</span>
            <h3 className="str-card-title">Les enquêtes flash</h3>
            <p className="str-card-body">
              Transformez chaque participation en source d&apos;insights. Grâce à de courtes
              enquêtes personnalisables, recueillez des données anonymisées sur les sujets qui
              comptent pour votre organisation et disposez d&apos;une meilleure compréhension des
              attentes et des dynamiques de votre collectif.
            </p>
            <p className="str-themes-label">Exemples de thématiques</p>
            {/* Ticker défilant — pas de pastilles, juste une ligne éditoriale en mouvement */}
            <div className="str-ticker" role="list" aria-label="Exemples de thématiques">
              <div className="str-ticker-track">
                {[...THEMES, ...THEMES].map((t, i) => (
                  <span key={i} className="str-ticker-item" role="listitem">
                    {t}
                    <span className="str-ticker-sep" aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* 02 — Le baromètre bien-être */}
          <article className="str-card str-card--barometre">
            <span className="str-numeral v-serif" aria-hidden="true">02</span>
            <h3 className="str-card-title">Le baromètre bien-être</h3>
            <p className="str-card-body">
              Recueillez l&apos;évaluation du bien-être de votre collectif à chaque expérience.
              Ces évaluations anonymisées et agrégées vous permettent de suivre son évolution dans
              le temps et d&apos;objectiver l&apos;impact des actions menées.
            </p>
            {/* Sparkline ascendante — écho du motif "vibration" de la marque, pas un bar-chart générique */}
            <svg className="str-spark" viewBox="0 0 220 64" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="strSparkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E6007E" />
                  <stop offset="100%" stopColor="#FD6E00" />
                </linearGradient>
              </defs>
              <path
                className="str-spark-path"
                d="M2,52 C20,50 28,44 40,42 C55,40 60,34 76,30 C92,26 96,38 112,32 C128,26 134,14 150,16 C166,18 172,10 188,8 C198,6.5 204,5 218,4"
                stroke="url(#strSparkGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle className="str-spark-dot" cx="218" cy="4" r="4.5" fill="#FD6E00" />
            </svg>
          </article>

          {/* 03 — Les données de pilotage de l'expérience */}
          <article className="str-card str-card--pilotage">
            <span className="str-numeral v-serif" aria-hidden="true">03</span>
            <h3 className="str-card-title">Les données de pilotage de l&apos;expérience</h3>
            <p className="str-card-body">
              Accédez à plus de 20 indicateurs de suivi pour piloter efficacement votre programme.
              Visualisez en temps réel le nombre d&apos;inscrits, le taux de participation, le taux
              de réengagement et de nombreux autres indicateurs clés.
            </p>
            <div className="str-stat">
              <span className="str-stat-num v-serif">20+</span>
              <span className="str-stat-label">indicateurs suivis<br />en temps réel</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
