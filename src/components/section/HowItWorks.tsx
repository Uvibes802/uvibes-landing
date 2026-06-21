"use client";

import Link from "next/link";
import React from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/section/howItWorks.css";

const STEPS_FR: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Choisissez vos <span className="how-kw">expériences</span> et thématiques d&apos;échange</>,
    body: <>Le paramétrage est réalisé en <span className="how-kw">quelques minutes</span>. Aucune <span className="how-kw">compétence technique</span> n&apos;est requise.</>,
    time: "Prêt en quelques minutes",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Deux membres.</span> Une conversation. <span className="how-kw">Six minutes.</span></>,
    body: <>Les membres se rencontrent <span className="how-kw">aléatoirement</span> lors d&apos;échanges vidéo individuels. Des <span className="how-kw">questions adaptées</span> viennent guider la conversation. À la fin, les participants peuvent échanger leurs <span className="how-kw">cartes de visite</span>.</>,
    time: "Une rencontre guidée, en vidéo",
  },
  {
    n: "03",
    color: "#F59E0B",
    title: <>Votre collectif <span className="how-kw">vous parle.</span> Écoutez-le.</>,
    body: <>À l&apos;issue des échanges, les participants répondent à de courtes <span className="how-kw">enquêtes personnalisées</span>. Vous recueillez retours, points de vue et <span className="how-kw">données utiles</span> pour mieux comprendre votre collectif.</>,
    time: "Des données en retour pour décider",
  },
];

const STEPS_EN: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Pick your <span className="how-kw">experiences</span> and conversation topics</>,
    body: <>Set up takes <span className="how-kw">a few minutes</span>. No <span className="how-kw">technical skills</span> required.</>,
    time: "Ready in minutes",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Two members.</span> One conversation. <span className="how-kw">Six minutes.</span></>,
    body: <>Members are matched <span className="how-kw">at random</span> for one-on-one video chats. <span className="how-kw">Tailored questions</span> guide the conversation. At the end, participants can swap their <span className="how-kw">contact cards</span>.</>,
    time: "A guided, face-to-face video meeting",
  },
  {
    n: "03",
    color: "#F59E0B",
    title: <>Your community <span className="how-kw">talks back.</span> Listen to it.</>,
    body: <>After each exchange, participants answer short <span className="how-kw">tailored surveys</span>. You gather feedback, perspectives and <span className="how-kw">useful data</span> to better understand your community.</>,
    time: "Data in return, to help you decide",
  },
];

export default function HowItWorks({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const STEPS = locale === "en" ? STEPS_EN : STEPS_FR;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });

  return (
    <section className={`how-section${vis ? " how-vis" : ""}`} ref={ref}>
      <div className="how-blob how-blob--1" aria-hidden="true" />
      <div className="how-blob how-blob--2" aria-hidden="true" />
      <div className="how-vlines" aria-hidden="true">
        <VibrationLine width={1400} height={70} amplitude={18} freq={5} stroke="rgba(253,110,0,.15)" strokeWidth={1.5} speed={18} />
        <VibrationLine width={1400} height={70} amplitude={12} freq={8} stroke="rgba(217,10,92,.1)" strokeWidth={1} speed={26} />
      </div>
      <div className="how-header">
        <p className="v-mono how-eyebrow">
          <span className="how-eyebrow-dot" aria-hidden="true" />
          {locale === "en" ? "How it works?" : "Comment ça fonctionne ?"}
        </p>
        <h2 className="how-title v-prompt">
          {locale === "en" ? (
            <>
              <span className="how-title-orange">Three</span>{" "}
              <span className="v-serif how-title-gradient">steps.</span>
              <br />
              <span className="how-title-rose">Nothing simpler.</span>
            </>
          ) : (
            <>
              <span className="how-title-orange">Trois</span>{" "}
              <span className="v-serif how-title-gradient">étapes.</span>
              <br />
              <span className="how-title-rose">Rien de plus simple.</span>
            </>
          )}
        </h2>
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
              <span className="v-mono how-time-text">{s.time}</span>
              <VibrationLine className="how-time-vib" width={150} height={10} amplitude={3} freq={7} stroke={s.color} strokeWidth={2} speed={9} />
            </div>
          </div>
        ))}
      </div>

      <div className="how-cta-wrap">
        <Link href={locale === "en" ? "/en/pricing" : "/tarifs"} className="btn-brand how-cta">
          {locale === "en" ? "Discover Uvibes plans" : "Découvrir nos offres Uvibes"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

    </section>
  );
}
