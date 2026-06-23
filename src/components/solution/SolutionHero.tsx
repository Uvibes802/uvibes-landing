"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/solution/solutionHero.css";

const PARTICLES = [
  { color: "#FD6E00", size: 14, top: "12%", left: "6%",  anim: "particle-0", dur: "11s", del: "0s"   },
  { color: "#D90A5C", size: 22, top: "25%", right: "7%", anim: "particle-1", dur: "14s", del: "1.2s" },
  { color: "#FFE456", size: 8,  top: "55%", right:"14%", anim: "particle-2", dur: "16s", del: "0.4s" },
  { color: "#FD6E00", size: 32, top: "5%",  left: "45%", anim: "particle-0", dur: "18s", del: "2s"   },
  { color: "#D90A5C", size: 10, top: "70%", left: "4%",  anim: "particle-1", dur: "13s", del: "0.8s" },
  { color: "#FFB800", size: 18, top: "40%", left: "2%",  anim: "particle-2", dur: "12s", del: "1.6s" },
  { color: "#FD6E00", size: 6,  top: "8%",  right:"22%", anim: "particle-0", dur: "7s",  del: "3s"   },
  { color: "#fff",    size: 5,  top: "82%", right:"18%", anim: "particle-1", dur: "17s", del: "0.3s" },
  { color: "#FFB800", size: 12, bottom:"20%",left:"30%", anim: "particle-2", dur: "15s", del: "1s"   },
  { color: "#fff",    size: 40, top: "35%", right:"2%",  anim: "particle-0", dur: "22s", del: "2.5s", border: true },
  { color: "#FD6E00", size: 28, bottom:"15%",right:"5%", anim: "particle-1", dur: "20s", del: "0.6s", border: true },
  { color: "#D90A5C", size: 48, top: "60%", right:"3%",  anim: "particle-2", dur: "25s", del: "1.8s", border: true },
  { color: "#fff",    size: 20, top: "20%", left:"20%",  anim: "particle-0", dur: "9s",  del: "4s",   border: true },
  { color: "#FFE456", size: 8,  top: "48%", left:"18%",  anim: "particle-1", dur: "8s",  del: "0.1s"  },
];

const SH_TXT: Record<string, { ariaLabel: string; title: React.ReactNode; desc: React.ReactNode; cta: string; ctaHref: string }> = {
  en: {
    ariaLabel: "Solution overview",
    title: <>The method<br />for your<br /><span className="sh-title-accent">organization.</span></>,
    desc: "A structured method to build engagement, strengthen the sense of belonging, surface what your community really needs, and support your organization's growth over the long run.",
    cta: "Discover our pricing →",
    ctaHref: "/en/pricing",
  },
  es: {
    ariaLabel: "Presentación de la solución",
    title: <>El método<br />para tu<br /><span className="sh-title-accent">organización.</span></>,
    desc: <>Un método estructurado para desarrollar el compromiso,<br className="v-br-desktop" /> reforzar el sentido de pertenencia, revelar las necesidades de tu colectivo y acompañar de forma duradera la evolución de tu organización.</>,
    cta: "Descubrir nuestros precios →",
    ctaHref: "/es/pricing",
  },
  de: {
    ariaLabel: "Lösungsübersicht",
    title: <>Die Methode<br />für Ihre<br /><span className="sh-title-accent">Organisation.</span></>,
    desc: <>Eine strukturierte Methode, um Engagement aufzubauen,<br className="v-br-desktop" /> das Zugehörigkeitsgefühl zu stärken, die Bedürfnisse Ihres Kollektivs aufzudecken und die Entwicklung Ihrer Organisation langfristig zu begleiten.</>,
    cta: "Unsere Preise entdecken →",
    ctaHref: "/de/pricing",
  },
  it: {
    ariaLabel: "Presentazione della soluzione",
    title: <>Il metodo<br />per la tua<br /><span className="sh-title-accent">organizzazione.</span></>,
    desc: <>Un metodo strutturato per sviluppare l&apos;impegno,<br className="v-br-desktop" /> rafforzare il senso di appartenenza, rivelare i bisogni della tua comunità e accompagnare nel tempo l&apos;evoluzione della tua organizzazione.</>,
    cta: "Scopri i nostri prezzi →",
    ctaHref: "/it/pricing",
  },
  pt: {
    ariaLabel: "Apresentação da solução",
    title: <>O método<br />para a sua<br /><span className="sh-title-accent">organização.</span></>,
    desc: <>Um método estruturado para desenvolver o compromisso,<br className="v-br-desktop" /> reforçar o sentido de pertença, revelar as necessidades do seu coletivo e acompanhar de forma duradoura a evolução da sua organização.</>,
    cta: "Descobrir os nossos preços →",
    ctaHref: "/pt/pricing",
  },
  ru: {
    ariaLabel: "Обзор решения",
    title: <>Метод<br />для вашей<br /><span className="sh-title-accent">организации.</span></>,
    desc: <>Структурированный метод для развития вовлечённости,<br className="v-br-desktop" /> укрепления чувства принадлежности, выявления потребностей вашего коллектива и долгосрочного сопровождения развития вашей организации.</>,
    cta: "Узнать наши цены →",
    ctaHref: "/ru/pricing",
  },
  zh: {
    ariaLabel: "解决方案概览",
    title: <>专属于您<br />组织的<br /><span className="sh-title-accent">方法。</span></>,
    desc: "一套结构化的方法，用于培养参与感、增强归属感、揭示你的集体的真实需求，并长期支持你组织的发展。",
    cta: "了解我们的价格 →",
    ctaHref: "/zh/pricing",
  },
  ja: {
    ariaLabel: "ソリューション概要",
    title: <>あなたの組織<br />のための<br /><span className="sh-title-accent">メソッド。</span></>,
    desc: "エンゲージメントを育み、帰属意識を強化し、あなたのコレクティフの本当のニーズを明らかにし、組織の発展を長期的にサポートするための体系的なメソッドです。",
    cta: "料金を見る →",
    ctaHref: "/ja/pricing",
  },
  hi: {
    ariaLabel: "समाधान का अवलोकन",
    title: <>आपके संगठन<br />के लिए<br /><span className="sh-title-accent">तरीका।</span></>,
    desc: "एक संरचित तरीका जो सहभागिता बढ़ाने, अपनेपन की भावना को मज़बूत करने, आपके समूह की वास्तविक ज़रूरतों को सामने लाने, और आपके संगठन के विकास में लंबे समय तक साथ देने के लिए बनाया गया है।",
    cta: "हमारी कीमतें देखें →",
    ctaHref: "/hi/pricing",
  },
  ar: {
    ariaLabel: "عرض الحل",
    title: <>المنهجية<br />الخاصة<br /><span className="sh-title-accent">بمؤسستك.</span></>,
    desc: "منهجية منظمة لتنمية الالتزام، وتعزيز الشعور بالانتماء، والكشف عن الحاجات الحقيقية لمجموعتك، ومواكبة تطور مؤسستك على المدى الطويل.",
    cta: "اكتشف أسعارنا ←",
    ctaHref: "/ar/pricing",
  },
};

export default function SolutionHero({ locale = "fr" }: { locale?: string }) {
  const sh = locale !== "fr" ? SH_TXT[locale] : undefined;
  return (
    <section className="sh-section" aria-label={sh ? sh.ariaLabel : "Présentation de la solution"}>
      {/* Grille de points */}
      <div className="sh-dot-grid" aria-hidden="true" />

      {/* Blobs */}
      <div className="sh-blobs" aria-hidden="true">
        {["a","b","c","d","e","f"].map(l => (
          <div key={l} className={`sh-blob sh-blob--${l}`} />
        ))}
      </div>

      {/* Particules flottantes */}
      <div className="sh-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`sh-particle`}
            style={{
              width: p.size, height: p.size,
              top: p.top, left: (p as {left?: string}).left,
              right: (p as {right?: string}).right,
              bottom: (p as {bottom?: string}).bottom,
              background: (p as {border?: boolean}).border ? "transparent" : p.color,
              border: (p as {border?: boolean}).border ? `1.5px solid ${p.color.replace("#fff", "rgba(255,255,255,.45)").replace("#FD6E00", "rgba(253,110,0,.45)").replace("#D90A5C", "rgba(217,10,92,.45)")}` : "none",
              borderRadius: "50%",
              opacity: (p as {border?: boolean}).border ? 0.55 : 0.6,
              animationName: p.anim,
              animationDuration: p.dur,
              animationDelay: p.del,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* VibrationLine bas de section */}
      <div className="sh-vib" aria-hidden="true">
        <VibrationLine width={1800} height={55} amplitude={22} freq={8} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={55} amplitude={14} freq={12} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
      </div>

      <div className="sh-inner">
        {/* Texte */}
        <div className="sh-content">
          <h1 className="sh-title v-prompt">
            {sh ? sh.title : (
              <>La méthode<br />pour votre<br /><span className="sh-title-accent">organisation.</span></>
            )}
          </h1>
          <p className="sh-desc">
            {sh
              ? sh.desc
              : <>Une méthode structurée pour développer l&apos;engagement,<br className="v-br-desktop" /> renforcer le sentiment d&apos;appartenance, révéler les besoins de votre collectif et accompagner durablement l&apos;évolution de votre organisation.</>}
          </p>
          <div className="sh-ctas">
            <Link href={sh ? sh.ctaHref : "/tarifs"} className="btn-brand btn-brand--white sh-cta-primary">
              {sh ? sh.cta : "Découvrir nos tarifs →"}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
