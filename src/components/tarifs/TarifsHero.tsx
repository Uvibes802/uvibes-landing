"use client";

import Link from "next/link";
import VibrationLine from "@/components/shared/VibrationLine";
import { useDevisStatus } from "@/hooks/useDevisStatus";
import "@/styles/tarifs/tarifsHero.css";

// Particules flottantes (déco) — mêmes teintes que la page Méthode
type Particle = {
  c: string; s: number; anim: string; dur: string; del: string;
  top?: string; bottom?: string; left?: string; right?: string; border?: boolean;
};
const PARTICLES: Particle[] = [
  { c: "#FFE456", s: 14, top: "16%", left: "8%",  anim: "th-p-0", dur: "11s", del: "0s" },
  { c: "#fff",    s: 8,  top: "28%", right: "12%", anim: "th-p-1", dur: "14s", del: "1.2s" },
  { c: "#FFB0A0", s: 22, top: "62%", left: "6%",  anim: "th-p-2", dur: "16s", del: "0.4s", border: true },
  { c: "#fff",    s: 6,  top: "12%", right: "26%", anim: "th-p-0", dur: "9s",  del: "2s" },
  { c: "#FFE456", s: 10, top: "70%", right: "16%", anim: "th-p-1", dur: "13s", del: "0.8s" },
  { c: "#fff",    s: 30, top: "40%", left: "3%",   anim: "th-p-2", dur: "20s", del: "1.6s", border: true },
  { c: "#fff",    s: 18, bottom: "22%", right: "8%", anim: "th-p-0", dur: "17s", del: "0.3s", border: true },
  { c: "#FFE456", s: 7,  top: "48%", right: "30%", anim: "th-p-1", dur: "8s",  del: "0.1s" },
];

const TH_TXT: Record<string, {
  ariaLabel: string; title: React.ReactNode; desc: React.ReactNode;
  quote: string; contact: string;
}> = {
  en: {
    ariaLabel: "Uvibes pricing and plans",
    title: <>Plans built for your needs<br />and <span className="th-title-accent v-serif">zero surprises.</span></>,
    desc: "Three annual plans to deploy Uvibes for the long run, plus a 30-day trial offer to test it with no commitment.",
    quote: "Get your quote →",
    contact: "Contact us →",
  },
  es: {
    ariaLabel: "Precios y planes Uvibes",
    title: <>Planes adaptados a tu necesidad<br />y <span className="th-title-accent v-serif">sin sorpresas.</span></>,
    desc: <>Tres planes anuales para implantar Uvibes a largo plazo,<br className="v-br-desktop" /> además de una oferta de descubrimiento de 30&nbsp;días para probarlo sin compromiso.</>,
    quote: "Solicitar presupuesto →",
    contact: "Contáctanos →",
  },
  de: {
    ariaLabel: "Uvibes Preise und Pläne",
    title: <>Pläne, die auf Ihre Bedürfnisse zugeschnitten sind<br />und <span className="th-title-accent v-serif">ohne Überraschungen.</span></>,
    desc: <>Drei Jahrespläne, um Uvibes langfristig einzusetzen,<br className="v-br-desktop" /> plus ein 30-tägiges Testangebot, um es unverbindlich auszuprobieren.</>,
    quote: "Angebot anfragen →",
    contact: "Kontaktieren Sie uns →",
  },
  it: {
    ariaLabel: "Prezzi e piani Uvibes",
    title: <>Piani su misura per le tue esigenze<br />e <span className="th-title-accent v-serif">senza sorprese.</span></>,
    desc: <>Tre piani annuali per implementare Uvibes nel tempo,<br className="v-br-desktop" /> oltre a un&apos;offerta di scoperta di 30 giorni per provarlo senza impegno.</>,
    quote: "Richiedi il tuo preventivo →",
    contact: "Contattaci →",
  },
  pt: {
    ariaLabel: "Preços e planos Uvibes",
    title: <>Planos adaptados às suas necessidades<br />e <span className="th-title-accent v-serif">sem surpresas.</span></>,
    desc: <>Três planos anuais para implementar a Uvibes a longo prazo,<br className="v-br-desktop" /> além de uma oferta de descoberta de 30 dias para experimentar sem compromisso.</>,
    quote: "Pedir o seu orçamento →",
    contact: "Contacte-nos →",
  },
  ru: {
    ariaLabel: "Цены и тарифы Uvibes",
    title: <>Тарифы, созданные под ваши потребности<br />и <span className="th-title-accent v-serif">без неожиданностей.</span></>,
    desc: <>Три годовых тарифа для долгосрочного внедрения Uvibes,<br className="v-br-desktop" /> а также 30-дневное пробное предложение, чтобы попробовать без обязательств.</>,
    quote: "Получить смету →",
    contact: "Связаться с нами →",
  },
  zh: {
    ariaLabel: "Uvibes 价格与方案",
    title: <>专为你的需求打造的方案<br />且<span className="th-title-accent v-serif">绝无意外。</span></>,
    desc: "三种年度方案，助你长期部署 Uvibes，外加30天免费试用，无任何承诺即可体验。",
    quote: "获取报价 →",
    contact: "联系我们 →",
  },
  ja: {
    ariaLabel: "Uvibesの料金とプラン",
    title: <>あなたのニーズに合わせたプラン<br />そして<span className="th-title-accent v-serif">サプライズなし。</span></>,
    desc: "Uvibesを長期的に導入するための3つの年間プランと、無料で試せる30日間のお試しプランをご用意。",
    quote: "見積もりを依頼する →",
    contact: "お問い合わせ →",
  },
  hi: {
    ariaLabel: "Uvibes की कीमतें और योजनाएं",
    title: <>आपकी ज़रूरतों के लिए बनी योजनाएं<br />और <span className="th-title-accent v-serif">कोई आश्चर्य नहीं।</span></>,
    desc: "Uvibes को लंबे समय तक अपनाने के लिए तीन वार्षिक योजनाएं, साथ ही बिना किसी प्रतिबद्धता के आज़माने के लिए 30 दिनों की ट्रायल पेशकश।",
    quote: "अपना कोटेशन पाएं →",
    contact: "हमसे संपर्क करें →",
  },
  ar: {
    ariaLabel: "أسعار وخطط Uvibes",
    title: <>خطط مصممة خصيصًا لحاجتك<br />و<span className="th-title-accent v-serif">بدون أي مفاجآت.</span></>,
    desc: "ثلاث خطط سنوية لاعتماد Uvibes على المدى الطويل، بالإضافة إلى عرض تجريبي لمدة 30 يومًا لتجربتها دون أي التزام.",
    quote: "اطلب عرض سعرك ←",
    contact: "تواصل معنا ←",
  },
};

export default function TarifsHero({ locale = "fr" }: { locale?: string }) {
  const { devisEnabled } = useDevisStatus();
  const th = locale !== "fr" ? TH_TXT[locale] : undefined;
  return (
    <section className="th-section" aria-label={th ? th.ariaLabel : "Tarifs et offres Uvibes"}>
      {/* Décor animé (même esprit que la page Méthode) : blobs doux + particules */}
      <div className="th-blobs" aria-hidden="true">
        <span className="th-blob th-blob--a" />
        <span className="th-blob th-blob--b" />
        <span className="th-blob th-blob--c" />
        <span className="th-blob th-blob--d" />
        <span className="th-blob th-blob--e" />
      </div>
      <div className="th-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="th-particle"
            style={{
              width: p.s, height: p.s,
              top: p.top, left: p.left, right: p.right, bottom: p.bottom,
              background: p.border ? "transparent" : p.c,
              border: p.border ? `1.5px solid ${p.c}` : "none",
              animationName: p.anim,
              animationDuration: p.dur,
              animationDelay: p.del,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="th-vib" aria-hidden="true">
        <VibrationLine width={1800} height={55} amplitude={22} freq={8} stroke="rgba(255,255,255,.32)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={55} amplitude={14} freq={12} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
      </div>

      <div className="th-inner">
        <h1 className="th-title v-prompt">
          {th ? th.title : (
            <>Des offres adaptées à votre besoin<br />et <span className="th-title-accent v-serif">sans surprise.</span></>
          )}
        </h1>
        <p className="th-desc">
          {th
            ? th.desc
            : <>Trois formules annuelles pour déployer Uvibes dans la durée,<br className="v-br-desktop" /> et une offre découverte de 30&nbsp;jours pour l&apos;essayer sans engagement.</>}
        </p>

        <div className="th-ctas">
          {devisEnabled ? (
            <Link href="/devis" className="btn-brand th-cta-primary">
              {th ? th.quote : "Faire votre devis →"}
            </Link>
          ) : (
            <Link href="/rendez-vous" className="btn-brand th-cta-primary">
              {th ? th.contact : "Nous contacter →"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
