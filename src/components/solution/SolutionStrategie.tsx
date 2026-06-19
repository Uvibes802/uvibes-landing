"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/solution/solutionStrategie.css";

// Exemples de thématiques (verbatim) — rendus en nuage de pastilles
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

// Petit baromètre animé (hauteurs relatives) — illustratif
const GAUGE = [0.45, 0.6, 0.55, 0.72, 0.68, 0.83, 0.78, 0.9];

export default function SolutionStrategie() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });

  return (
    <section id="strategie" className={`str-section${vis ? " str-vis" : ""}`} ref={ref}>
      {/* Ondes de vibration — identité Uvibes */}
      <div className="str-waves" aria-hidden="true">
        <GradientVibrationLine id="str-w1" width={1800} height={70} amplitude={28} freq={5} strokeWidth={18} speed={12} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="str-w2" width={1800} height={70} amplitude={22} freq={7} strokeWidth={12} speed={16} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
      </div>

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
          {/* 01 — Les enquêtes flash (carte vedette, plus grande) */}
          <article className="str-card str-card--flash">
            <div className="str-card-top">
              <span className="str-flash-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" /></svg>
              </span>
              <span className="str-num">01</span>
            </div>
            <h3 className="str-card-title">Les enquêtes flash</h3>
            <p className="str-card-body">
              Transformez chaque participation en source d&apos;insights. Grâce à de courtes
              enquêtes personnalisables, recueillez des données anonymisées sur les sujets qui
              comptent pour votre organisation et disposez d&apos;une meilleure compréhension des
              attentes et des dynamiques de votre collectif.
            </p>
            <p className="str-themes-label">Exemples de thématiques</p>
            <ul className="str-chips">
              {THEMES.map((t, i) => (
                <li key={t} className="str-chip" style={{ "--ci": i } as React.CSSProperties}>{t}</li>
              ))}
            </ul>
          </article>

          {/* 02 — Le baromètre bien-être */}
          <article className="str-card str-card--barometre">
            <div className="str-card-top">
              <span className="str-num">02</span>
            </div>
            <h3 className="str-card-title">Le baromètre bien-être</h3>
            <p className="str-card-body">
              Recueillez l&apos;évaluation du bien-être de votre collectif à chaque expérience.
              Ces évaluations anonymisées et agrégées vous permettent de suivre son évolution dans
              le temps et d&apos;objectiver l&apos;impact des actions menées.
            </p>
            <div className="str-gauge" aria-hidden="true">
              {GAUGE.map((h, i) => (
                <span key={i} className="str-gauge-bar" style={{ "--h": h, "--gi": i } as React.CSSProperties} />
              ))}
            </div>
          </article>

          {/* 03 — Les données de pilotage de l'expérience */}
          <article className="str-card str-card--pilotage">
            <div className="str-card-top">
              <span className="str-num">03</span>
            </div>
            <h3 className="str-card-title">Les données de pilotage de l&apos;expérience</h3>
            <p className="str-card-body">
              Accédez à plus de 20 indicateurs de suivi pour piloter efficacement votre programme.
              Visualisez en temps réel le nombre d&apos;inscrits, le taux de participation, le taux
              de réengagement et de nombreux autres indicateurs clés.
            </p>
            <div className="str-stat">
              <span className="str-stat-num">20+</span>
              <span className="str-stat-label">indicateurs suivis en temps réel</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
