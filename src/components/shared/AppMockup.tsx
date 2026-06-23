"use client";

import Image from "next/image";
import { MessageCircle, Sparkles, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import "@/styles/shared/appMockup.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const RINGS = [0, 1, 2, 3];

// `recent` est en 2 lignes fixes (<br />) plutôt qu'au retour automatique :
// le retour naturel dépendait de la largeur du chip à chaque breakpoint et
// donnait une forme différente en mobile qu'en desktop.
const APM_TXT: Record<string, { alt: string; habit: string; person: string; recent: React.ReactNode }> = {
  en: {
    alt: "Uvibes app interface",
    habit: "A daily habit you enjoy?",
    person: "Someone who inspires you?",
    recent: <>What&apos;s something that<br />struck you recently?</>,
  },
  es: {
    alt: "Interfaz de la aplicación Uvibes",
    habit: "¿Un hábito que te gusta cada día?",
    person: "¿Alguien que te inspire?",
    recent: <>¿Qué te ha marcado<br />últimamente?</>,
  },
  de: {
    alt: "Uvibes-App-Oberfläche",
    habit: "Eine tägliche Gewohnheit, die du magst?",
    person: "Jemand, der dich inspiriert?",
    recent: <>Was hat dich zuletzt<br />beeindruckt?</>,
  },
  it: {
    alt: "Interfaccia dell'app Uvibes",
    habit: "Un'abitudine quotidiana che ti piace?",
    person: "Qualcuno che ti inspira?",
    recent: <>Cosa ti ha colpito<br />di recente?</>,
  },
  pt: {
    alt: "Interface da aplicação Uvibes",
    habit: "Um hábito diário que gostas?",
    person: "Alguém que te inspira?",
    recent: <>O que te marcou<br />recentemente?</>,
  },
  ru: {
    alt: "Интерфейс приложения Uvibes",
    habit: "Привычка, которая вам нравится?",
    person: "Кто вас вдохновляет?",
    recent: <>Что вас впечатлило<br />недавно?</>,
  },
  zh: {
    alt: "Uvibes 应用界面",
    habit: "一个你喜欢的日常习惯？",
    person: "一个启发你的人？",
    recent: <>最近让你<br />印象深刻的事？</>,
  },
  ja: {
    alt: "Uvibesアプリの画面",
    habit: "毎日楽しんでいる習慣は？",
    person: "あなたを刺激する人は？",
    recent: <>最近心に残った<br />ことは？</>,
  },
  hi: {
    alt: "Uvibes ऐप इंटरफ़ेस",
    habit: "एक रोज़ाना की पसंदीदा आदत?",
    person: "कोई जो आपको प्रेरित करता है?",
    recent: <>हाल में आपको<br />क्या प्रभावित किया?</>,
  },
  ar: {
    alt: "واجهة تطبيق Uvibes",
    habit: "عادة يومية تحبها؟",
    person: "شخص يلهمك؟",
    recent: <>ما الذي أثّر فيك<br />مؤخرًا؟</>,
  },
};

export default function AppMockup({ locale = "fr" }: { locale?: string }) {
  const reduced = useReducedMotion();
  const apm = APM_TXT[locale];

  return (
    <div className={`apm-wrap${reduced ? " --no-motion" : ""}`}>
      {/* Couche 1 — Halo gradient */}
      <div className="apm-halo" aria-hidden="true" />

      {/* Couche 2 — Rings de vibration */}
      <div className="apm-rings" aria-hidden="true">
        {RINGS.map((i) => (
          <span key={i} className="apm-ring" style={{ animationDelay: `${i}s` } as React.CSSProperties} />
        ))}
      </div>

      {/* Couche 3 — Image */}
      <div className="apm-img-wrap">
        <Image
          src="/images/freepik__background__26732.png"
          alt={apm ? apm.alt : "Interface de l'application Uvibes"}
          width={460}
          height={690}
          priority
          className="apm-img"
        />
      </div>

      {/* Couche 4 — Chips flottantes (desktop uniquement) */}
      <div className="apm-chip apm-chip--left" aria-hidden="true">
        <span className="apm-chip-text">{apm ? apm.habit : "Une habitude qui vous plaît au quotidien ?"}</span>
      </div>

      <div className="apm-chip apm-chip--top-right" aria-hidden="true">
        <span className="apm-chip-hello">{apm ? apm.person : "Une personne qui vous inspire ?"}</span>
      </div>

      <div className="apm-chip apm-chip--bottom-right" aria-hidden="true">
        <span className="apm-chip-quote">{apm ? apm.recent : <>Qu&apos;est-ce qui vous a marqué<br />récemment ?</>}</span>
      </div>

      {/* Icônes « vibes » flottantes — visibles sur mobile (remplacent les questions) */}
      <div className="apm-icons" aria-hidden="true">
        <span className="apm-icon apm-icon--1"><MessageCircle size={20} strokeWidth={2.4} /></span>
        <span className="apm-icon apm-icon--2"><Sparkles size={20} strokeWidth={2.4} /></span>
        <span className="apm-icon apm-icon--3"><Heart size={20} strokeWidth={2.4} /></span>
      </div>
    </div>
  );
}
