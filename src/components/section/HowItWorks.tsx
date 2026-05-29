"use client";

import Link from "next/link";
import React from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/section/howItWorks.css";

const STEPS: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Choisissez vos <span className="how-kw">expériences</span> et thématiques d&apos;échange</>,
    body: <>Le paramétrage est réalisé en <span className="how-kw">quelques minutes</span>. Aucune <span className="how-kw">compétence technique</span> n&apos;est requise.</>,
    time: "≈ 6 min de setup",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Deux membres.</span> Une conversation. <span className="how-kw">Trois minutes.</span></>,
    body: <>Les membres se rencontrent <span className="how-kw">aléatoirement</span> lors d&apos;échanges vidéo individuels. Des <span className="how-kw">questions adaptées</span> viennent guider la conversation. À la fin, les participants peuvent échanger leurs <span className="how-kw">cartes de visite</span>.</>,
    time: "2 à 3 min par échange",
  },
  {
    n: "03",
    color: "#00AFDD",
    title: <>Votre collectif <span className="how-kw">vous parle.</span> Écoutez-le.</>,
    body: <>À l&apos;issue des échanges, les participants répondent à de courtes <span className="how-kw">enquêtes personnalisées</span>. Vous recueillez retours, points de vue et <span className="how-kw">données utiles</span> pour mieux comprendre votre collectif.</>,
    time: "Dashboard temps réel",
  },
];

export default function HowItWorks() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });

  return (
    <section className={`how-section${vis ? " how-vis" : ""}`} ref={ref}>
      <div className="how-vlines" aria-hidden="true">
        <VibrationLine width={1400} height={70} amplitude={18} freq={5} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} speed={18} />
        <VibrationLine width={1400} height={70} amplitude={12} freq={8} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={26} />
      </div>
      <div className="how-header">
        <div>
          <p className="v-mono how-eyebrow">Comment ça fonctionne</p>
          <h2 className="how-title v-prompt">
            <span className="how-title-orange">Trois</span>{" "}
            <span className="v-serif how-title-gradient">étapes.</span>
            <br />
            <span className="how-title-rose">Pas une de plus.</span>
          </h2>
        </div>
        <Link href="/solution" className="btn-brand how-cta">
          Voir la solution en détail →
        </Link>
      </div>

      <div className="how-grid">
        <div className="how-connector" aria-hidden="true">
          <VibrationLine
            width={1200} height={40}
            amplitude={14} freq={4}
            stroke="var(--rose)" strokeWidth={2}
            speed={6}
            style={{ width: "100%", opacity: 0.6 }}
          />
        </div>

        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`how-step how-step--${i + 1}`}
            style={{ "--step-color": s.color } as React.CSSProperties}
          >
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
