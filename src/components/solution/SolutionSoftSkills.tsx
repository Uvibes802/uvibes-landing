"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/solution/solutionSoftSkills.css";

/* Barres animées de la vignette "ressources" (podcast / vidéo) */
const WAVE_BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.45, 0.8, 0.5];
/* Jours du "terrain d'entraînement" — derniers = en cours */
const DAYS = [true, true, true, true, true, false, false];

export default function SolutionSoftSkills() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section id="soft-skills" className={`sss-section${vis ? " sss-vis" : ""}`} ref={ref}>
      {/* Ondes de vibration en fond — identité uvibes */}
      <div className="sss-waves" aria-hidden="true">
        <GradientVibrationLine id="sss-w1" width={1800} height={70} amplitude={30} freq={5} strokeWidth={20} speed={11} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="sss-w2" width={1800} height={70} amplitude={24} freq={7} strokeWidth={13} speed={15} colorFrom="#FFB800" colorTo="#D90A5C" style={{ width: "100%" }} />
      </div>

      <div className="sss-inner">
        <header className="sss-head">
          <p className="sss-eyebrow">
            <span className="sss-eyebrow-dot" aria-hidden="true" />
            Ce que Uvibes fait aussi d&apos;unique
          </p>
          <h2 className="sss-title v-prompt">
            Entraîner et valoriser<br />
            les <span className="sss-title-accent v-serif">soft skills.</span>
          </h2>
          <p className="sss-subtitle">
            Au-delà des rencontres, Uvibes devient un vrai parcours&nbsp;: on apprend,
            on s&apos;entraîne, et on repart avec une reconnaissance concrète.
          </p>
        </header>

        <div className="sss-rows">

          {/* ── 01 · Ressources (podcast / vidéo) ── */}
          <div className="sss-row" style={{ "--c": "#FD6E00" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-illu sss-illu--wave" aria-hidden="true">
                <span className="sss-play">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <div className="sss-wave">
                  {WAVE_BARS.map((h, i) => (
                    <span key={i} className="sss-wave-bar" style={{ "--h": h, animationDelay: `${i * 0.09}s` } as React.CSSProperties} />
                  ))}
                </div>
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">01</span>
              <h3 className="sss-row-title">Des ressources à disposition</h3>
              <p className="sss-row-body">
                Vidéos et podcasts pour comprendre, concrètement, comment progresser
                sur chaque soft skill.
              </p>
            </div>
          </div>

          {/* ── 02 · Terrain d'entraînement quotidien ── */}
          <div className="sss-row sss-row--reverse" style={{ "--c": "#E6007E" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-illu sss-illu--streak" aria-hidden="true">
                <div className="sss-days">
                  {DAYS.map((on, i) => (
                    <span key={i} className={`sss-day${on ? " sss-day--on" : ""}${i === 4 ? " sss-day--now" : ""}`} />
                  ))}
                </div>
                <div className="sss-pulse-line" />
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">02</span>
              <h3 className="sss-row-title">Un terrain d&apos;entraînement quotidien</h3>
              <p className="sss-row-body">
                Chaque échange est une occasion de pratiquer pour de vrai — écoute,
                prise de parole, ouverture — un peu chaque jour.
              </p>
            </div>
          </div>

          {/* ── 03 · Attestation / certificat ── */}
          <div className="sss-row" style={{ "--c": "#F59E0B" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-illu sss-illu--cert" aria-hidden="true">
                <div className="sss-doc">
                  <span className="sss-doc-line" />
                  <span className="sss-doc-line sss-doc-line--short" />
                  <span className="sss-doc-line sss-doc-line--shorter" />
                </div>
                <div className="sss-seal">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sss-seal-ribbon" />
                  <span className="sss-seal-ribbon sss-seal-ribbon--2" />
                </div>
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">03</span>
              <h3 className="sss-row-title">Une attestation pour se valoriser</h3>
              <p className="sss-row-body">
                Les utilisateurs obtiennent un certificat qui reconnaît leur entraînement
                et valorise leurs soft skills.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
