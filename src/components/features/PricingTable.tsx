"use client";

import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { useDevisStatus } from "@/hooks/useDevisStatus";
import OffreEvenementielle from "./OffreEvenementielle";

import "../../styles/features/PricingTable.css";
import { features, plans } from "./PricingData";
import { featuresEn, plansEn } from "./PricingDataEn";
import { featuresEs, plansEs } from "./PricingDataEs";
import { featuresDe, plansDe } from "./PricingDataDe";
import { featuresIt, plansIt } from "./PricingDataIt";
import { featuresPt, plansPt } from "./PricingDataPt";
import { featuresRu, plansRu } from "./PricingDataRu";
import { featuresZh, plansZh } from "./PricingDataZh";
import { featuresJa, plansJa } from "./PricingDataJa";
import { featuresHi, plansHi } from "./PricingDataHi";
import { featuresAr, plansAr } from "./PricingDataAr";

interface PlanTierApi { label: string; min: number; max: number | null; prixAnnuel: number; }
interface PlanApi { slug: string; tiers: PlanTierApi[]; }

// PricingData n'a pas de slug — on le déduit du nom pour relier aux tranches en base.
const SLUG_BY_NAME: Record<string, string> = {
  "VIBES CONNECTION": "vibes-connection",
  "VIBES BOOST": "vibes-boost",
  "VIBES PREMIUM": "vibes-premium",
};

// Ordre : Connection, Boost (populaire, au centre), Premium. Les 3 CTA mènent au devis.
const PLAN_META_FR = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Faire votre devis",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Le plus populaire",
    inherit: "vibes premium",
    cta: "Faire votre devis",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Faire votre devis",
  },
];

const PLAN_META_EN = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Get your quote",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Most popular",
    inherit: "vibes premium",
    cta: "Get your quote",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Get your quote",
  },
];

const PLAN_META_ES = [
  {
    accent: "var(--orange)",
    featured: false,
    badge: null,
    inherit: null,
    cta: "Solicitar presupuesto",
  },
  {
    accent: "var(--rose)",
    featured: true,
    badge: "Más popular",
    inherit: "vibes premium",
    cta: "Solicitar presupuesto",
  },
  {
    accent: "#FFB800",
    featured: false,
    badge: null,
    inherit: "vibes connection",
    cta: "Solicitar presupuesto",
  },
];

const PLAN_META_DE = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "Angebot anfragen" },
  { accent: "var(--rose)", featured: true, badge: "Am beliebtesten", inherit: "vibes premium", cta: "Angebot anfragen" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "Angebot anfragen" },
];

const PLAN_META_IT = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "Richiedi il tuo preventivo" },
  { accent: "var(--rose)", featured: true, badge: "Il più popolare", inherit: "vibes premium", cta: "Richiedi il tuo preventivo" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "Richiedi il tuo preventivo" },
];

const PLAN_META_PT = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "Pedir o seu orçamento" },
  { accent: "var(--rose)", featured: true, badge: "Mais popular", inherit: "vibes premium", cta: "Pedir o seu orçamento" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "Pedir o seu orçamento" },
];

const PLAN_META_RU = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "Получить смету" },
  { accent: "var(--rose)", featured: true, badge: "Самый популярный", inherit: "vibes premium", cta: "Получить смету" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "Получить смету" },
];

const PLAN_META_ZH = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "获取报价" },
  { accent: "var(--rose)", featured: true, badge: "最受欢迎", inherit: "vibes premium", cta: "获取报价" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "获取报价" },
];

const PLAN_META_JA = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "見積もりを依頼する" },
  { accent: "var(--rose)", featured: true, badge: "最も人気", inherit: "vibes premium", cta: "見積もりを依頼する" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "見積もりを依頼する" },
];

const PLAN_META_HI = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "अपना कोटेशन पाएं" },
  { accent: "var(--rose)", featured: true, badge: "सबसे लोकप्रिय", inherit: "vibes premium", cta: "अपना कोटेशन पाएं" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "अपना कोटेशन पाएं" },
];

const PLAN_META_AR = [
  { accent: "var(--orange)", featured: false, badge: null, inherit: null, cta: "اطلب عرض سعرك" },
  { accent: "var(--rose)", featured: true, badge: "الأكثر شيوعًا", inherit: "vibes premium", cta: "اطلب عرض سعرك" },
  { accent: "#FFB800", featured: false, badge: null, inherit: "vibes connection", cta: "اطلب عرض سعرك" },
];

/* Fonctionnalités « nouvelles » vs le plan hérité (Connection) — pour la mise en avant */
const FRESH: Record<number, (i: number) => boolean> = {
  0: () => true,                    // Connection — base, tout est "frais"
  1: (i) => i >= 7,                 // Boost — hérite de Premium (0-6), ajoute 7 à 10
  2: (i) => i >= 4 && i < 7,        // Premium — hérite de Connection (0-3), ajoute 4 à 6
};

const PT_TXT: Record<string, {
  eyebrow: string; title: React.ReactNode; subtitle: string;
  vatNote: string; seeTiers: string; hideTiers: string; contact: string;
  everythingInFn: (label: string) => string; included: string; intlLocale: string; overageNote: string;
}> = {
  en: {
    eyebrow: "Pricing",
    title: <>Our Vibes{" "}<span className="pt-title-serif v-serif">plans.</span></>,
    subtitle: "Find the plan that fits your community.",
    vatNote: "Excl. VAT / year",
    seeTiers: "See pricing by size",
    hideTiers: "Hide pricing by size",
    contact: "Contact us",
    everythingInFn: (label) => `Everything in ${label} :`,
    included: "What's included",
    intlLocale: "en-US",
    overageNote: "These 3 plans include a one-year commitment. Beyond the volume included in your subscription, each additional bracket of 1,000 interactive experiences per month is billed at €110 excl. VAT.",
  },
  es: {
    eyebrow: "Tarificación",
    title: <>Nuestros planes{" "}<span className="pt-title-serif v-serif">Vibes.</span></>,
    subtitle: "Elige el plan adaptado a tu colectivo.",
    vatNote: "Precio sin IVA / año",
    seeTiers: "Ver precios por tamaño",
    hideTiers: "Ocultar precios por tamaño",
    contact: "Contáctanos",
    everythingInFn: (label) => `Todo ${label} :`,
    included: "Qué incluye",
    intlLocale: "es-ES",
    overageNote: "Estos 3 planes incluyen un compromiso de un año. Más allá del volumen incluido en tu suscripción, cada tramo adicional de 1 000 experiencias interactivas al mes se factura a 110 € sin IVA.",
  },
  de: {
    eyebrow: "Preise",
    title: <>Unsere Vibes{" "}<span className="pt-title-serif v-serif">Pläne.</span></>,
    subtitle: "Finden Sie den Plan, der zu Ihrem Kollektiv passt.",
    vatNote: "Netto / Jahr",
    seeTiers: "Preise nach Größe anzeigen",
    hideTiers: "Preise nach Größe ausblenden",
    contact: "Kontaktieren Sie uns",
    everythingInFn: (label) => `Alles aus ${label}:`,
    included: "Was ist enthalten",
    intlLocale: "de-DE",
    overageNote: "Diese 3 Pläne beinhalten eine einjährige Verpflichtung. Über das im Abonnement enthaltene Volumen hinaus wird jede zusätzliche Stufe von 1.000 interaktiven Erlebnissen pro Monat mit 110 € netto berechnet.",
  },
  it: {
    eyebrow: "Prezzi",
    title: <>I nostri piani{" "}<span className="pt-title-serif v-serif">Vibes.</span></>,
    subtitle: "Trova il piano adatto alla tua comunità.",
    vatNote: "IVA escl. / anno",
    seeTiers: "Vedi i prezzi per dimensione",
    hideTiers: "Nascondi i prezzi per dimensione",
    contact: "Contattaci",
    everythingInFn: (label) => `Tutto ${label}:`,
    included: "Cosa è incluso",
    intlLocale: "it-IT",
    overageNote: "Questi 3 piani includono un impegno di un anno. Oltre al volume incluso nell'abbonamento, ogni fascia aggiuntiva di 1.000 esperienze interattive al mese viene fatturata a 110 € + IVA.",
  },
  pt: {
    eyebrow: "Preços",
    title: <>Os nossos planos{" "}<span className="pt-title-serif v-serif">Vibes.</span></>,
    subtitle: "Encontre o plano adaptado ao seu coletivo.",
    vatNote: "Sem IVA / ano",
    seeTiers: "Ver preços por dimensão",
    hideTiers: "Ocultar preços por dimensão",
    contact: "Contacte-nos",
    everythingInFn: (label) => `Tudo de ${label}:`,
    included: "O que está incluído",
    intlLocale: "pt-PT",
    overageNote: "Estes 3 planos incluem um compromisso de um ano. Além do volume incluído na assinatura, cada faixa adicional de 1 000 experiências interativas por mês é faturada a 110 € sem IVA.",
  },
  ru: {
    eyebrow: "Тарифы",
    title: <>Наши тарифы{" "}<span className="pt-title-serif v-serif">Vibes.</span></>,
    subtitle: "Найдите тариф, подходящий вашему коллективу.",
    vatNote: "Без НДС / в год",
    seeTiers: "Смотреть цены по размеру",
    hideTiers: "Скрыть цены по размеру",
    contact: "Связаться с нами",
    everythingInFn: (label) => `Всё из ${label}:`,
    included: "Что входит",
    intlLocale: "ru-RU",
    overageNote: "Эти 3 тарифа предполагают обязательство на один год. Сверх объёма, включённого в подписку, каждый дополнительный пакет из 1 000 интерактивных опытов в месяц оплачивается по 110 € без НДС.",
  },
  zh: {
    eyebrow: "价格",
    title: <>我们的{" "}<span className="pt-title-serif v-serif">Vibes 方案。</span></>,
    subtitle: "找到适合你的集体的方案。",
    vatNote: "不含税 / 每年",
    seeTiers: "查看按规模定价",
    hideTiers: "隐藏按规模定价",
    contact: "联系我们",
    everythingInFn: (label) => `包含${label}的所有内容：`,
    included: "包含内容",
    intlLocale: "zh-CN",
    overageNote: "这三种方案均包含一年的合约期。超出订阅包含的额度后，每增加1000次互动体验/月将按110欧元（不含税）计费。",
  },
  ja: {
    eyebrow: "料金",
    title: <>私たちの{" "}<span className="pt-title-serif v-serif">Vibesプラン。</span></>,
    subtitle: "あなたのコレクティフに合ったプランを見つけてください。",
    vatNote: "税抜 / 年",
    seeTiers: "規模別の料金を見る",
    hideTiers: "規模別の料金を隠す",
    contact: "お問い合わせ",
    everythingInFn: (label) => `${label}のすべて：`,
    included: "含まれるもの",
    intlLocale: "ja-JP",
    overageNote: "この3つのプランには1年間の契約が含まれます。サブスクリプションに含まれる利用量を超えた場合、月あたり1,000件の追加インタラクティブ体験ごとに110ユーロ（税抜）が課金されます。",
  },
  hi: {
    eyebrow: "मूल्य निर्धारण",
    title: <>हमारी{" "}<span className="pt-title-serif v-serif">Vibes योजनाएं।</span></>,
    subtitle: "अपने समूह के लिए उपयुक्त योजना खोजें।",
    vatNote: "टैक्स के बिना / प्रति वर्ष",
    seeTiers: "आकार के अनुसार कीमतें देखें",
    hideTiers: "आकार के अनुसार कीमतें छिपाएं",
    contact: "हमसे संपर्क करें",
    everythingInFn: (label) => `${label} में सब कुछ:`,
    included: "इसमें क्या शामिल है",
    intlLocale: "hi-IN",
    overageNote: "इन तीनों योजनाओं में एक साल की प्रतिबद्धता शामिल है। सदस्यता में शामिल मात्रा से अधिक होने पर, हर महीने अतिरिक्त 1,000 इंटरैक्टिव अनुभवों के हर स्लैब के लिए 110 € (बिना टैक्स) शुल्क लिया जाएगा।",
  },
  ar: {
    eyebrow: "التسعير",
    title: <>خططنا{" "}<span className="pt-title-serif v-serif">Vibes.</span></>,
    subtitle: "اعثر على الخطة المناسبة لمجموعتك.",
    vatNote: "غير شامل الضريبة / سنويًا",
    seeTiers: "عرض الأسعار حسب الحجم",
    hideTiers: "إخفاء الأسعار حسب الحجم",
    contact: "تواصل معنا",
    everythingInFn: (label) => `كل ما في ${label}:`,
    included: "ما الذي يشمله",
    intlLocale: "ar-SA",
    overageNote: "تشمل هذه الخطط الثلاث التزامًا لمدة سنة واحدة. وبعد تجاوز الحجم المشمول في الاشتراك، يتم احتساب 110 يورو غير شامل الضريبة عن كل دفعة إضافية من 1000 تجربة تفاعلية شهريًا.",
  },
};

const PLANS_BY_LOCALE: Record<string, typeof plans> = {
  en: plansEn, es: plansEs, de: plansDe, it: plansIt, pt: plansPt,
  ru: plansRu, zh: plansZh, ja: plansJa, hi: plansHi, ar: plansAr,
};
const FEATURES_BY_LOCALE: Record<string, typeof features> = {
  en: featuresEn, es: featuresEs, de: featuresDe, it: featuresIt, pt: featuresPt,
  ru: featuresRu, zh: featuresZh, ja: featuresJa, hi: featuresHi, ar: featuresAr,
};
const PLAN_META_BY_LOCALE: Record<string, typeof PLAN_META_FR> = {
  en: PLAN_META_EN, es: PLAN_META_ES, de: PLAN_META_DE, it: PLAN_META_IT, pt: PLAN_META_PT,
  ru: PLAN_META_RU, zh: PLAN_META_ZH, ja: PLAN_META_JA, hi: PLAN_META_HI, ar: PLAN_META_AR,
};

export default function PricingTable({ locale = "fr" }: { locale?: string }) {
  // Prix de référence : statiques (tableau validé par la tutrice), cf. PricingData.ts
  const mergedPlans = PLANS_BY_LOCALE[locale] ?? plans;
  const FEATURES_LIST = FEATURES_BY_LOCALE[locale] ?? features;
  const PLAN_META = PLAN_META_BY_LOCALE[locale] ?? PLAN_META_FR;
  const pt = PT_TXT[locale];

  // Tranches de tarification (4 tranches éditables en admin) — affichées au dépli
  const [apiPlans, setApiPlans] = useState<PlanApi[]>([]);
  const [openTiers, setOpenTiers] = useState<string | null>(null);
  // « Ce qui est inclus » repliable : ouvert d'office en desktop (via CSS), replié
  // en mobile pour éviter des cartes interminables ; ce state ne pilote que le mobile.
  const [openIncluded, setOpenIncluded] = useState<Record<string, boolean>>({});
  const { devisEnabled } = useDevisStatus();
  useEffect(() => {
    fetch("/api/plans").then((r) => r.json()).then(setApiPlans).catch(() => {});
  }, []);

  return (
    <section
      className="pt-section"
      id="offres"
      style={{ scrollMarginTop: 70 }}
    >
      {/* Fond — ondes de vibration animées (motif uvibes), derrière les cartes */}
      <div className="pt-waves" aria-hidden="true">
        <GradientVibrationLine id="pt-w1" width={1800} height={70} amplitude={32} freq={5} strokeWidth={24} speed={10} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="pt-w2" width={1800} height={70} amplitude={26} freq={7} strokeWidth={16} speed={14} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="pt-w3" width={1800} height={70} amplitude={36} freq={4} strokeWidth={20} speed={12} colorFrom="#E6007E" colorTo="#FD6E00" style={{ width: "100%" }} />
      </div>

      {/* Mêmes cartes premium sur tous les écrans (empilées en mobile) */}
      <div className="pt-desktop-only">
        {/* Header */}
        <div className="pt-head">
          <span className="pt-eyebrow v-mono">
            <span className="pt-eyebrow-dot" aria-hidden="true" />
            {pt ? pt.eyebrow : "Tarification"}
          </span>
          <h2 className="pt-title v-prompt">
            {pt ? pt.title : (
              <>Nos offres{" "}<span className="pt-title-serif v-serif">Vibes.</span></>
            )}
          </h2>
          <p className="pt-subtitle">
            {pt ? pt.subtitle : "Choisissez le plan adapté à votre collectif."}
          </p>
        </div>

        {/* Grille 3 cards */}
        <div className="pt-grid">
          {mergedPlans.map((plan, pi) => {
            const meta = PLAN_META[pi];
            const f = meta.featured;
            const freshFn = FRESH[pi];

            return (
              <div
                key={plan.name}
                className={`pt-card${f ? " pt-card--featured" : ""}`}
                style={{ "--pt-accent": meta.accent } as React.CSSProperties}
              >
                {/* Liseré haut featured */}
                {f && <div className="pt-card-stripe" aria-hidden="true" />}
                {/* Glow déco featured */}
                {f && <div className="pt-card-glow" aria-hidden="true" />}

                {/* Header card */}
                <div className="pt-card-top">
                  <span className="pt-card-square" aria-hidden="true" />
                  {meta.badge && (
                    <span className={`pt-card-badge v-mono${f ? " --featured" : ""}`}>
                      {meta.badge}
                    </span>
                  )}
                </div>

                <h3 className="pt-card-name v-prompt">{plan.name}</h3>
                <p className="pt-card-desc">{plan.description}</p>

                {/* Prix */}
                <div className="pt-card-price">
                  <span className="pt-card-price-value v-prompt">{plan.price}</span>
                  <span className="v-mono pt-card-price-note">{pt ? pt.vatNote : "Prix HT / an"}</span>
                </div>

                {/* Tarif selon la taille — 4 tranches éditables en admin */}
                {(() => {
                  const slug = SLUG_BY_NAME[plan.name];
                  const tiers = apiPlans.find((ap) => ap.slug === slug)?.tiers ?? [];
                  if (!tiers.length) return null;
                  const open = openTiers === slug;
                  return (
                    <div className="pt-card-tiers">
                      <button
                        type="button"
                        className="pt-card-tiers-toggle"
                        aria-expanded={open}
                        onClick={() => setOpenTiers(open ? null : slug)}
                      >
                        {pt
                          ? (open ? pt.hideTiers : pt.seeTiers)
                          : (open ? "Masquer les tarifs par taille" : "Voir les tarifs par taille")}
                        <ChevronDown size={13} className="pt-card-tiers-toggle-arrow" aria-hidden="true" />
                      </button>
                      {open && (
                        <ul className="pt-card-tiers-list">
                          {tiers.map((t) => (
                            <li key={t.label}>
                              <span>{t.label}</span>
                              <span>{t.prixAnnuel.toLocaleString(pt ? pt.intlLocale : "fr-FR")} €</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })()}

                {/* CTA — les 3 offres mènent au devis (masqué si désactivé par l'admin) */}
                <div className="pt-card-cta-wrap">
                  {devisEnabled ? (
                    <Link href="/devis" className="pt-card-cta">
                      {meta.cta}
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link href="/rendez-vous" className="pt-card-cta">
                      {pt ? pt.contact : "Nous contacter"}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>

                {/* « Ce qui est inclus » — repliable (desktop ouvert via CSS, mobile au clic) */}
                {(() => {
                  const inclOpen = openIncluded[plan.name] ?? false;
                  return (
                <div className={`pt-card-included${inclOpen ? " --open" : ""}`}>
                  {/* Label héritage = bouton de dépli sur mobile */}
                  <button
                    type="button"
                    className={`pt-card-inherit-label v-mono${f ? " --featured" : ""}`}
                    aria-expanded={inclOpen}
                    onClick={() => setOpenIncluded((s) => ({ ...s, [plan.name]: !inclOpen }))}
                  >
                    <span>{meta.inherit
                      ? (pt ? pt.everythingInFn(meta.inherit) : `Tout ${meta.inherit} :`)
                      : (pt ? pt.included : "Ce qui est inclus")}</span>
                    <ChevronDown size={14} className="pt-card-incl-arrow" aria-hidden="true" />
                  </button>

                  {/* Liste features */}
                  <ul className="pt-card-list">
                    {FEATURES_LIST.map((feat, fi) => {
                      const included = plan.values[fi] ?? false;
                      const fresh = meta.inherit ? freshFn(fi) : included;
                      return (
                        <li
                          key={fi}
                          className={`pt-card-feat${!included ? " --off" : ""}${fresh && included ? " --fresh" : ""}`}
                        >
                          <span className="pt-card-feat-icon">
                            {included
                              ? <Check size={15} strokeWidth={2.6} />
                              : <X size={15} strokeWidth={1.8} />
                            }
                          </span>
                          <span>{feat.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                  );
                })()}
              </div>
            );
          })}
        </div>

        {/* Note commune aux 3 offres annuelles — engagement + dépassement de volume */}
        <p className="pt-overage-note">
          {pt
            ? pt.overageNote
            : "Ces 3 offres incluent un engagement d'un an. Au-delà du volume inclus dans l'abonnement, chaque tranche additionnelle de 1 000 expériences interactives par mois sera facturée 110 € HT."}
        </p>
      </div>

      {/* 4ème offre — événementielle, présentée dans la même section que les 3 offres annuelles */}
      <OffreEvenementielle locale={locale} />
    </section>
  );
}
