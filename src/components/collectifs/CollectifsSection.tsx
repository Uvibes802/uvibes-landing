"use client";

import { useState, useEffect } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import Image from "next/image";
import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import { collectifs as collectifsFr } from "@/data/collectifs/collectifsData";
import { collectifsEn } from "@/data/collectifs/collectifsDataEn";
import { collectifsEs } from "@/data/collectifs/collectifsDataEs";
import { collectifsDe } from "@/data/collectifs/collectifsDataDe";
import { collectifsIt } from "@/data/collectifs/collectifsDataIt";
import { collectifsPt } from "@/data/collectifs/collectifsDataPt";
import { collectifsRu } from "@/data/collectifs/collectifsDataRu";
import { collectifsZh } from "@/data/collectifs/collectifsDataZh";
import { collectifsJa } from "@/data/collectifs/collectifsDataJa";
import { collectifsHi } from "@/data/collectifs/collectifsDataHi";
import { collectifsAr } from "@/data/collectifs/collectifsDataAr";
import "@/styles/collectifs/collectifsSection.css";

interface CollectifsSectionProps {
  showCta?: boolean;
  locale?: string;
}

const COLLECTIFS_BY_LOCALE: Record<string, typeof collectifsFr> = {
  en: collectifsEn, es: collectifsEs, de: collectifsDe, it: collectifsIt, pt: collectifsPt,
  ru: collectifsRu, zh: collectifsZh, ja: collectifsJa, hi: collectifsHi, ar: collectifsAr,
};

const CS_TXT: Record<string, {
  eyebrow: string; title: React.ReactNode; descFn: (n: number) => React.ReactNode;
  pillsAria: string; caseLabel: string; enlargeFn: (alt: string) => string;
  gains: string; pourquoi: string; cta: string; methodHref: string; close: string;
}> = {
  en: {
    eyebrow: "Who's it for?",
    title: <>Every <span className="collectifs-title-serif">organization</span><br />has its own challenges.</>,
    descFn: (n) => `${n} sectors where Uvibes brings a sharper read of the field and a stronger engaged community.`,
    pillsAria: "Community selector",
    caseLabel: "Case",
    enlargeFn: (alt) => `Enlarge poster: ${alt}`,
    gains: "→ What you gain",
    pourquoi: "→ Why it works",
    cta: "Discover our method",
    methodHref: "/en/method",
    close: "Close",
  },
  es: {
    eyebrow: "¿Para quién?",
    title: <>Cada <span className="collectifs-title-serif">organización</span><br />tiene sus propios retos.</>,
    descFn: (n) => <>{n} sectores en los que Uvibes aporta una mejor lectura del terreno y un colectivo más comprometido.</>,
    pillsAria: "Selector de colectivo",
    caseLabel: "Caso",
    enlargeFn: (alt) => `Ampliar cartel: ${alt}`,
    gains: "→ Lo que ganas",
    pourquoi: "→ Por qué funciona",
    cta: "Descubrir nuestro método",
    methodHref: "/es/method",
    close: "Cerrar",
  },
  de: {
    eyebrow: "Für wen?",
    title: <>Jede <span className="collectifs-title-serif">Organisation</span><br />hat ihre eigenen Herausforderungen.</>,
    descFn: (n) => <>{n} Branchen, in denen Uvibes ein schärferes Bild der Lage und ein stärker engagiertes Kollektiv ermöglicht.</>,
    pillsAria: "Kollektiv-Auswahl",
    caseLabel: "Fall",
    enlargeFn: (alt) => `Plakat vergrößern: ${alt}`,
    gains: "→ Was du gewinnst",
    pourquoi: "→ Warum es funktioniert",
    cta: "Unsere Methode entdecken",
    methodHref: "/de/method",
    close: "Schließen",
  },
  it: {
    eyebrow: "Per chi?",
    title: <>Ogni <span className="collectifs-title-serif">organizzazione</span><br />ha le sue sfide.</>,
    descFn: (n) => <>{n} settori in cui Uvibes offre una lettura più precisa del terreno e una comunità più coinvolta.</>,
    pillsAria: "Selettore di comunità",
    caseLabel: "Caso",
    enlargeFn: (alt) => `Ingrandisci il poster: ${alt}`,
    gains: "→ Cosa ci guadagni",
    pourquoi: "→ Perché funziona",
    cta: "Scopri il nostro metodo",
    methodHref: "/it/method",
    close: "Chiudi",
  },
  pt: {
    eyebrow: "Para quem?",
    title: <>Cada <span className="collectifs-title-serif">organização</span><br />tem os seus próprios desafios.</>,
    descFn: (n) => <>{n} setores onde a Uvibes traz uma leitura mais precisa do terreno e um coletivo mais comprometido.</>,
    pillsAria: "Seletor de coletivo",
    caseLabel: "Caso",
    enlargeFn: (alt) => `Ampliar cartaz: ${alt}`,
    gains: "→ O que ganhas",
    pourquoi: "→ Porque funciona",
    cta: "Descobrir o nosso método",
    methodHref: "/pt/method",
    close: "Fechar",
  },
  ru: {
    eyebrow: "Для кого?",
    title: <>У каждой <span className="collectifs-title-serif">организации</span><br />свои вызовы.</>,
    descFn: (n) => <>{n} сфер, где Uvibes даёт более точное понимание ситуации и более вовлечённый коллектив.</>,
    pillsAria: "Выбор коллектива",
    caseLabel: "Случай",
    enlargeFn: (alt) => `Увеличить плакат: ${alt}`,
    gains: "→ Что вы получаете",
    pourquoi: "→ Почему это работает",
    cta: "Узнать наш метод",
    methodHref: "/ru/method",
    close: "Закрыть",
  },
  zh: {
    eyebrow: "适合谁？",
    title: <>每个<span className="collectifs-title-serif">组织</span><br />都有自己的挑战。</>,
    descFn: (n) => <>{n}个行业，Uvibes 在这些领域提供更精准的现场洞察和更投入的集体。</>,
    pillsAria: "集体选择器",
    caseLabel: "案例",
    enlargeFn: (alt) => `放大海报：${alt}`,
    gains: "→ 你将获得",
    pourquoi: "→ 为何有效",
    cta: "了解我们的方法",
    methodHref: "/zh/method",
    close: "关闭",
  },
  ja: {
    eyebrow: "どなたに向けて？",
    title: <>どの<span className="collectifs-title-serif">組織</span><br />にもそれぞれの課題があります。</>,
    descFn: (n) => <>{n}の分野で、Uvibesは現場をより的確に理解し、より積極的なコミュニティづくりを支えます。</>,
    pillsAria: "コミュニティ選択",
    caseLabel: "ケース",
    enlargeFn: (alt) => `ポスターを拡大：${alt}`,
    gains: "→ 得られるもの",
    pourquoi: "→ なぜ効果的か",
    cta: "私たちのメソッドを見る",
    methodHref: "/ja/method",
    close: "閉じる",
  },
  hi: {
    eyebrow: "किसके लिए?",
    title: <>हर <span className="collectifs-title-serif">संगठन</span><br />की अपनी चुनौतियां होती हैं।</>,
    descFn: (n) => <>{n} क्षेत्र जहां Uvibes ज़मीनी हकीकत की बेहतर समझ और एक अधिक सक्रिय समुदाय लाता है।</>,
    pillsAria: "समुदाय चयनकर्ता",
    caseLabel: "केस",
    enlargeFn: (alt) => `पोस्टर बड़ा करें: ${alt}`,
    gains: "→ आपको क्या मिलता है",
    pourquoi: "→ यह क्यों काम करता है",
    cta: "हमारा तरीका जानें",
    methodHref: "/hi/method",
    close: "बंद करें",
  },
  ar: {
    eyebrow: "لمن هذا؟",
    title: <>كل <span className="collectifs-title-serif">منظمة</span><br />لها تحدياتها الخاصة.</>,
    descFn: (n) => <>{n} قطاعًا يوفر فيها Uvibes فهمًا أدق للواقع ومجتمعًا أكثر تفاعلًا.</>,
    pillsAria: "محدد المجتمع",
    caseLabel: "حالة",
    enlargeFn: (alt) => `تكبير الملصق: ${alt}`,
    gains: "→ ما الذي تكسبه",
    pourquoi: "→ لماذا ينجح ذلك",
    cta: "اكتشف طريقتنا",
    methodHref: "/ar/method",
    close: "إغلاق",
  },
};

export default function CollectifsSection({ showCta = false, locale = "fr" }: CollectifsSectionProps) {
  const collectifs = COLLECTIFS_BY_LOCALE[locale] ?? collectifsFr;
  const cs = locale !== "fr" ? CS_TXT[locale] : undefined;
  const [activeId, setActiveId] = useState(collectifs[0].id);
  const [isLocked, setIsLocked] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const active = collectifs.find((c) => c.id === activeId)!;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.07 });

  // Fermeture de l'affiche en grand à la touche Échap + blocage du scroll
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    if (isLocked) return;
    const t = setInterval(() => {
      setActiveId((curr) => {
        const idx = collectifs.findIndex((c) => c.id === curr);
        return collectifs[(idx + 1) % collectifs.length].id;
      });
    }, 3500);
    return () => clearInterval(t);
  }, [isLocked, collectifs]);

  return (
    <section className={`collectifs-section${vis ? " c-vis" : ""}`} ref={ref}>
      <div className="cs-blob cs-blob--1" aria-hidden="true" />
      <div className="cs-blob cs-blob--2" aria-hidden="true" />
      <div className="collectifs-inner">
        <div className="collectifs-header">
          <div className="collectifs-header-left">
            <span className="collectifs-eyebrow">
              <span className="collectifs-eyebrow-dot" aria-hidden="true" />
              {cs ? cs.eyebrow : "Pour qui ?"}
            </span>
            <h2 className="collectifs-title">
              {cs ? cs.title : (
                <>Chaque{" "}<span className="collectifs-title-serif">organisation</span><br />a ses enjeux.</>
              )}
            </h2>
            <p className="collectifs-desc">
              {cs
                ? cs.descFn(collectifs.length)
                : <>{collectifs.length} secteurs d&apos;activité auxquels Uvibes apporte une meilleure compréhension du terrain et un engagement renforcé de son collectif.</>}
            </p>
          </div>
        </div>

        {/* ── Ticker de pills cliquables ── */}
        <div className="collectifs-pills-ticker" aria-label={cs ? cs.pillsAria : "Sélecteur de collectif"}>
          <div className="collectifs-pills-track">
            {collectifs.map((c) => (
              <button
                key={c.id}
                className={`collectif-pill-btn${activeId === c.id ? " --active" : ""}`}
                style={{ "--c-color": c.color } as React.CSSProperties}
                onClick={() => { setIsLocked(true); setActiveId(c.id); }}
                aria-pressed={activeId === c.id}
              >
                <span className="collectif-pill-dot" aria-hidden="true" />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Déco gauche/droite du panneau ── */}
        <div className="collectifs-deco collectifs-deco--left" aria-hidden="true">
          <span className="coll-deco-ring coll-deco-ring--1" />
          <span className="coll-deco-ring coll-deco-ring--2" />
          <span className="coll-deco-dot" />
        </div>
        <div className="collectifs-deco collectifs-deco--right" aria-hidden="true">
          <span className="coll-deco-ring coll-deco-ring--3" />
          <span className="coll-deco-dot coll-deco-dot--2" />
          <span className="coll-deco-cross" />
        </div>

        {/* ── Panneau détail + lignes derrière ── */}
        <div className="collectifs-panel-wrapper">
          {/* Lignes vibration pleine largeur derrière la carte */}
          <div className="collectifs-panel-vlines" aria-hidden="true">
            <VibrationLine width={1600} height={60} amplitude={24} freq={4} stroke="rgba(244,98,31,.32)" strokeWidth={2}   speed={13} />
            <VibrationLine width={1600} height={60} amplitude={14} freq={7} stroke="rgba(217,10,92,.22)"  strokeWidth={1.2} speed={19} />
            <VibrationLine width={1600} height={60} amplitude={32} freq={3} stroke="rgba(244,98,31,.18)"  strokeWidth={2.5} speed={9}  />
            <VibrationLine width={1600} height={60} amplitude={10} freq={10} stroke="rgba(217,10,92,.18)" strokeWidth={1}   speed={25} />
            <VibrationLine width={1600} height={60} amplitude={20} freq={5} stroke="rgba(0,175,221,.15)"  strokeWidth={1.5} speed={17} />
            <VibrationLine width={1600} height={60} amplitude={28} freq={6} stroke="rgba(244,98,31,.12)"  strokeWidth={3}   speed={11} />
          </div>

          {/* Particules déco */}
          <div className="collectifs-particles" aria-hidden="true">
            <span className="cp cp--1" /><span className="cp cp--2" /><span className="cp cp--3" />
            <span className="cp cp--4" /><span className="cp cp--5" /><span className="cp cp--6" />
            <span className="cp cp--7" /><span className="cp cp--8" />
          </div>

          <div className="collectifs-panel" key={activeId} style={{ "--c-color": active.color } as React.CSSProperties}>
          <div className="collectif-panel-hero">
            {/* Particules animées */}
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="collectif-panel-sparkle"
                aria-hidden="true"
                style={{
                  left: `${(i * 71 + 5) % 100}%`,
                  top: `${(i * 47 + 10) % 100}%`,
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                } as React.CSSProperties}
              />
            ))}
            <div className="collectif-panel-meta">
              <span className="collectif-panel-tag">
                {cs ? cs.caseLabel : "Cas"} {String(collectifs.findIndex(c => c.id === activeId) + 1).padStart(2, "0")} / {collectifs.length}
              </span>
              <h3 className="collectif-panel-title">{active.name}</h3>
              <p className="collectif-panel-subtitle">{active.subtitle}</p>
            </div>
            <div className="collectif-panel-flyers">
              {active.flyers.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className="collectif-panel-flyer-wrap"
                  onClick={() => { setIsLocked(true); setLightbox(f); }}
                  aria-label={cs ? cs.enlargeFn(f.alt) : `Agrandir l'affiche : ${f.alt}`}
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={160}
                    height={225}
                    className="collectif-panel-flyer-img"
                  />
                  <span className="collectif-panel-flyer-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="collectif-panel-body">
            <div className="collectif-panel-col collectif-panel-col--gains">
              <div className="collectif-panel-col-title">{cs ? cs.gains : "→ Ce que vous y gagnez"}</div>
              <ul className="collectif-panel-list collectif-panel-list--gains">
                {active.gains.map((g, i) => (
                  <li key={i}>
                    <span className="collectif-panel-bullet" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="collectif-panel-col collectif-panel-col--pourquoi">
              <div className="collectif-panel-col-title">{cs ? cs.pourquoi : "→ Pourquoi ça fonctionne"}</div>
              <ul className="collectif-panel-list collectif-panel-list--pourquoi">
                {active.pourquoi.map((p, i) => (
                  <li key={i}>
                    <svg className="collectif-panel-check" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="2.5" aria-hidden="true">
                      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>{/* fin collectifs-panel */}
        </div>{/* fin collectifs-panel-wrapper */}

        {showCta && (
          <div className="collectifs-cta">
            <Link href={cs ? cs.methodHref : "/solution"} className="btn-cta primary collectifs-cta-btn">
              {cs ? cs.cta : "Découvrir notre méthode"}
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox — affiche en grand */}
      {lightbox && (
        <div
          className="cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button type="button" className="cs-lightbox-close" aria-label={cs ? cs.close : "Fermer"} onClick={() => setLightbox(null)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <figure className="cs-lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={900}
              height={1270}
              className="cs-lightbox-img"
            />
          </figure>
        </div>
      )}
    </section>
  );
}
