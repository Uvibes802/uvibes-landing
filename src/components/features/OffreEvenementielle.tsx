"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { useDevisStatus } from "@/hooks/useDevisStatus";
import "@/styles/features/offreEvenementielle.css";

interface Point { label: string; detail: string; bonus?: boolean }

// Valeurs par défaut — surchargées par les réglages éditables en admin (clés oe-*).
const DEFAULTS = {
  titre: "Vibes Découverte",
  prixAccent: "à 480 €",
  subtitle: "Le moyen le plus simple pour tester Uvibes : un mois complet pour mobiliser votre collectif et mesurer l'impact.",
  prix: "480 €",
  prixNote: "sans engagement annuel",
  points: [
    { label: "Jusqu'à 500 vibes", detail: "pour créer des interactions riches et stimulantes au sein de votre collectif" },
    { label: "Une session sur mesure", detail: "autour du thème de votre choix, avec des questions élaborées spécifiquement pour votre organisation et ses enjeux" },
    { label: "3 campagnes d'enquêtes flash", detail: "jusqu'à 9 sondages personnalisés pour recueillir les informations dont vous avez besoin" },
    { label: "1 infographie dédiée", detail: "pour promouvoir facilement votre initiative et favoriser les inscriptions" },
    { label: "2 statistiques d'usage", detail: "pour mieux comprendre les dynamiques et l'engagement de votre collectif", bonus: true },
    { label: "2 heures d'accompagnement et d'assistance", detail: "offertes pour prendre la plateforme en main sereinement et lever toutes vos questions" },
  ] as Point[],
};

// Équivalent EN — les réglages admin (CMS, en français) ne sont pas appliqués sur la page anglaise.
const DEFAULTS_EN = {
  titre: "Vibes Discovery",
  prixAccent: "from €480",
  subtitle: "The simplest way to try Uvibes: a full month to mobilize your community and measure the impact, before any annual commitment.",
  prix: "480 €",
  prixNote: "no annual commitment",
  points: [
    { label: "Up to 500 vibes", detail: "interactive experiences to mobilize your community" },
    { label: "1 themed session", detail: "on the topic of your choice, tailored to your audience" },
    { label: "3 survey campaigns", detail: "3 custom surveys each, to gather what matters" },
    { label: "1 ready-to-use infographic", detail: "everything needed to make signing up easy for your members" },
    { label: "2 usage indicators", detail: "to track your community's engagement", bonus: true },
    { label: "2 hours of guidance and support", detail: "included — to get you up and running and answer all your questions" },
  ] as Point[],
};

// Équivalent ES — les réglages admin (CMS, en français) ne sont pas appliqués sur la page espagnole.
const DEFAULTS_ES = {
  titre: "Vibes Descubrimiento",
  prixAccent: "desde 480 €",
  subtitle: "La forma más sencilla de probar Uvibes: un mes completo para movilizar a tu colectivo y medir el impacto, antes de cualquier compromiso anual.",
  prix: "480 €",
  prixNote: "sin compromiso anual",
  points: [
    { label: "Hasta 500 vibes", detail: "experiencias interactivas para movilizar a tu colectivo" },
    { label: "1 sesión temática", detail: "sobre el tema que elijas, personalizada para tu público" },
    { label: "3 campañas de encuestas", detail: "3 encuestas personalizadas cada una, para recoger lo que importa" },
    { label: "1 infografía lista para usar", detail: "todo lo necesario para facilitar la inscripción de tus miembros" },
    { label: "2 indicadores de uso", detail: "para seguir el compromiso de tu comunidad", bonus: true },
    { label: "2 horas de acompañamiento y asistencia", detail: "incluidas, para empezar con buen pie y resolver todas tus dudas" },
  ] as Point[],
};

// Équivalent DE/IT/PT/RU/ZH/JA/HI/AR — mêmes réglages, pas de CMS sur ces pages.
const DEFAULTS_DE = {
  titre: "Vibes Entdeckung",
  prixAccent: "ab 480 €",
  subtitle: "Der einfachste Weg, Uvibes zu testen: ein ganzer Monat, um Ihr Kollektiv zu mobilisieren und die Wirkung zu messen, vor jeder Jahresverpflichtung.",
  prix: "480 €",
  prixNote: "ohne Jahresverpflichtung",
  points: [
    { label: "Bis zu 500 Vibes", detail: "interaktive Erlebnisse, um Ihr Kollektiv zu mobilisieren" },
    { label: "1 thematische Sitzung", detail: "zum Thema Ihrer Wahl, angepasst an Ihr Publikum" },
    { label: "3 Umfragekampagnen", detail: "jeweils 3 individuelle Umfragen, um zu erfassen, was zählt" },
    { label: "1 schlüsselfertige Infografik", detail: "alles, um die Anmeldung Ihrer Mitglieder zu erleichtern" },
    { label: "2 Nutzungsindikatoren", detail: "um das Engagement Ihrer Community zu verfolgen", bonus: true },
    { label: "2 Stunden Begleitung und Unterstützung", detail: "inklusive, für einen reibungslosen Start und alle Ihre Fragen" },
  ] as Point[],
};

const DEFAULTS_IT = {
  titre: "Vibes Scoperta",
  prixAccent: "a partire da 480 €",
  subtitle: "Il modo più semplice per provare Uvibes: un mese intero per mobilitare la tua comunità e misurare l'impatto, prima di qualsiasi impegno annuale.",
  prix: "480 €",
  prixNote: "senza impegno annuale",
  points: [
    { label: "Fino a 500 vibe", detail: "esperienze interattive per mobilitare la tua comunità" },
    { label: "1 sessione a tema", detail: "sull'argomento che preferisci, personalizzata per il tuo pubblico" },
    { label: "3 campagne di sondaggi", detail: "3 sondaggi personalizzati ciascuna, per raccogliere ciò che conta" },
    { label: "1 infografica pronta all'uso", detail: "tutto il necessario per facilitare l'iscrizione dei tuoi membri" },
    { label: "2 indicatori di utilizzo", detail: "per monitorare l'impegno della tua comunità", bonus: true },
    { label: "2 ore di accompagnamento e assistenza", detail: "incluse, per partire col piede giusto e rispondere a ogni domanda" },
  ] as Point[],
};

const DEFAULTS_PT = {
  titre: "Vibes Descoberta",
  prixAccent: "a partir de 480 €",
  subtitle: "A forma mais simples de experimentar a Uvibes: um mês completo para mobilizar o seu coletivo e medir o impacto, antes de qualquer compromisso anual.",
  prix: "480 €",
  prixNote: "sem compromisso anual",
  points: [
    { label: "Até 500 vibes", detail: "experiências interativas para mobilizar o seu coletivo" },
    { label: "1 sessão temática", detail: "sobre o tema da sua escolha, personalizada para o seu público" },
    { label: "3 campanhas de inquéritos", detail: "3 inquéritos personalizados cada, para recolher o que importa" },
    { label: "1 infografia pronta a usar", detail: "tudo o que é preciso para facilitar a inscrição dos seus membros" },
    { label: "2 indicadores de utilização", detail: "para acompanhar o envolvimento da sua comunidade", bonus: true },
    { label: "2 horas de acompanhamento e assistência", detail: "incluídas, para começar bem e esclarecer todas as suas dúvidas" },
  ] as Point[],
};

const DEFAULTS_RU = {
  titre: "Vibes Знакомство",
  prixAccent: "от 480 €",
  subtitle: "Самый простой способ попробовать Uvibes: целый месяц, чтобы мобилизовать ваш коллектив и измерить эффект, прежде чем брать на себя годовые обязательства.",
  prix: "480 €",
  prixNote: "без годового обязательства",
  points: [
    { label: "До 500 vibes", detail: "интерактивные опыты для мобилизации вашего коллектива" },
    { label: "1 тематическая сессия", detail: "на выбранную вами тему, адаптированная для вашей аудитории" },
    { label: "3 кампании опросов", detail: "по 3 индивидуальных опроса каждая, чтобы собрать важное" },
    { label: "1 готовая инфографика", detail: "всё необходимое, чтобы упростить регистрацию ваших участников" },
    { label: "2 показателя использования", detail: "чтобы отслеживать вовлечённость вашего сообщества", bonus: true },
    { label: "2 часа сопровождения и поддержки", detail: "бесплатно — чтобы уверенно начать и ответить на все вопросы" },
  ] as Point[],
};

const DEFAULTS_ZH = {
  titre: "Vibes 体验版",
  prixAccent: "480 € 起",
  subtitle: "试用 Uvibes 最简单的方式：整整一个月来调动你的集体并衡量效果，无需任何年度承诺。",
  prix: "480 €",
  prixNote: "无需年度承诺",
  points: [
    { label: "最多500次vibes", detail: "用于调动你的集体的互动体验" },
    { label: "1次主题会议", detail: "围绕你选择的主题，为你的受众量身定制" },
    { label: "3次调查活动", detail: "每次包含3个定制调查，收集真正重要的信息" },
    { label: "1份现成的信息图", detail: "助力你的成员轻松完成注册的一切所需" },
    { label: "2项使用指标", detail: "用于追踪你社群的参与度", bonus: true },
    { label: "2小时陪伴与协助", detail: "免费提供，助你顺利上手并解答所有疑问" },
  ] as Point[],
};

const DEFAULTS_JA = {
  titre: "Vibes ディスカバリー",
  prixAccent: "480€から",
  subtitle: "Uvibesを試す最も簡単な方法：年間契約の前に、丸1ヶ月であなたのコレクティフを動かし、その効果を測定できます。",
  prix: "480 €",
  prixNote: "年間契約なし",
  points: [
    { label: "最大500回のvibes", detail: "あなたのコレクティフを動かすインタラクティブな体験" },
    { label: "1回のテーマ別セッション", detail: "あなたが選んだテーマで、対象者に合わせてカスタマイズ" },
    { label: "3回の調査キャンペーン", detail: "それぞれカスタム調査3件で、重要なことを収集" },
    { label: "1つの完成済みインフォグラフィック", detail: "メンバーの登録を簡単にするために必要なすべて" },
    { label: "2つの利用指標", detail: "コミュニティのエンゲージメントを追跡するために", bonus: true },
    { label: "2時間の伴走サポート", detail: "無料提供。スムーズな立ち上げとあらゆる疑問の解消を支援" },
  ] as Point[],
};

const DEFAULTS_HI = {
  titre: "Vibes डिस्कवरी",
  prixAccent: "480 € से",
  subtitle: "Uvibes को आज़माने का सबसे आसान तरीका: किसी भी वार्षिक प्रतिबद्धता से पहले, अपने समूह को सक्रिय करने और प्रभाव मापने के लिए एक पूरा महीना।",
  prix: "480 €",
  prixNote: "बिना वार्षिक प्रतिबद्धता के",
  points: [
    { label: "500 वाइब्स तक", detail: "अपने समूह को सक्रिय करने के लिए इंटरैक्टिव अनुभव" },
    { label: "1 थीम आधारित सत्र", detail: "आपकी पसंद के विषय पर, आपके दर्शकों के अनुसार अनुकूलित" },
    { label: "3 सर्वेक्षण अभियान", detail: "प्रत्येक में 3 कस्टम सर्वेक्षण, जो ज़रूरी है उसे इकट्ठा करने के लिए" },
    { label: "1 तैयार इन्फोग्राफिक", detail: "आपके सदस्यों के पंजीकरण को आसान बनाने के लिए सब कुछ" },
    { label: "2 उपयोग संकेतक", detail: "आपके समुदाय की सहभागिता को ट्रैक करने के लिए", bonus: true },
    { label: "2 घंटे का मार्गदर्शन और सहायता", detail: "नि:शुल्क — सहज शुरुआत और आपके सभी सवालों के जवाब के लिए" },
  ] as Point[],
};

const DEFAULTS_AR = {
  titre: "Vibes الاستكشاف",
  prixAccent: "ابتداءً من 480 €",
  subtitle: "أبسط طريقة لتجربة Uvibes: شهر كامل لتحفيز مجموعتك وقياس الأثر، قبل أي التزام سنوي.",
  prix: "480 €",
  prixNote: "بدون التزام سنوي",
  points: [
    { label: "حتى 500 vibe", detail: "تجارب تفاعلية لتحفيز مجموعتك" },
    { label: "جلسة موضوعية واحدة", detail: "حول الموضوع الذي تختاره، مخصصة لجمهورك" },
    { label: "3 حملات استبيانات", detail: "3 استبيانات مخصصة في كل حملة، لجمع ما يهم" },
    { label: "إنفوغرافيك جاهز للاستخدام", detail: "كل ما يلزم لتسهيل تسجيل أعضائك" },
    { label: "مؤشرا استخدام", detail: "لتتبع تفاعل مجتمعك", bonus: true },
    { label: "ساعتان من المرافقة والدعم", detail: "مجانًا، لبداية سلسة وللإجابة عن كل أسئلتك" },
  ] as Point[],
};

// Sous-titre sur une seule ligne (wrap naturel). On colle juste
// "avant tout engagement annuel" avec des espaces insécables.
function subtitleOneLine(text: string): string {
  const glued = text
    .replace(/avant tout engagement annuel/gi, (m) => m.replace(/ /g, "\u00A0"))
    .replace(/before any annual commitment/gi, (m) => m.replace(/ /g, "\u00A0"))
    .replace(/antes de cualquier compromiso anual/gi, (m) => m.replace(/ /g, "\u00A0"))
    .replace(/vor jeder Jahresverpflichtung/gi, (m) => m.replace(/ /g, "\u00A0"))
    .replace(/prima di qualsiasi impegno annuale/gi, (m) => m.replace(/ /g, "\u00A0"))
    .replace(/antes de qualquer compromisso anual/gi, (m) => m.replace(/ /g, "\u00A0"));
  return glued;
}

// "label | détail | bonus" (1 par ligne) → tableau de points
function parsePoints(raw: string): Point[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean).map((line) => {
    const [label = "", detail = "", flag = ""] = line.split("|").map((s) => s.trim());
    return { label, detail, bonus: flag.toLowerCase() === "bonus" };
  });
}

const OE_TXT: Record<string, { pill: string; getQuote: string; contact: string; contactHref: string }> = {
  en: { pill: "Discovery offer · 30 days", getQuote: "Get your quote →", contact: "Contact us", contactHref: "/en#contact" },
  es: { pill: "Oferta de descubrimiento · 30 días", getQuote: "Solicitar presupuesto →", contact: "Contáctanos", contactHref: "/es#contact" },
  de: { pill: "Entdeckungsangebot · 30 Tage", getQuote: "Angebot anfragen →", contact: "Kontaktieren Sie uns", contactHref: "/de#contact" },
  it: { pill: "Offerta di scoperta · 30 giorni", getQuote: "Richiedi il tuo preventivo →", contact: "Contattaci", contactHref: "/it#contact" },
  pt: { pill: "Oferta de descoberta · 30 dias", getQuote: "Pedir o seu orçamento →", contact: "Contacte-nos", contactHref: "/pt#contact" },
  ru: { pill: "Предложение для знакомства · 30 дней", getQuote: "Получить смету →", contact: "Связаться с нами", contactHref: "/ru#contact" },
  zh: { pill: "体验优惠 · 30天", getQuote: "获取报价 →", contact: "联系我们", contactHref: "/zh#contact" },
  ja: { pill: "ディスカバリーオファー・30日間", getQuote: "見積もりを依頼する →", contact: "お問い合わせ", contactHref: "/ja#contact" },
  hi: { pill: "डिस्कवरी ऑफर · 30 दिन", getQuote: "अपना कोटेशन पाएं →", contact: "हमसे संपर्क करें", contactHref: "/hi#contact" },
  ar: { pill: "عرض استكشافي · 30 يومًا", getQuote: "اطلب عرض سعرك →", contact: "تواصل معنا", contactHref: "/ar#contact" },
};

const DEFAULTS_BY_LOCALE: Record<string, typeof DEFAULTS> = {
  en: DEFAULTS_EN, es: DEFAULTS_ES, de: DEFAULTS_DE, it: DEFAULTS_IT, pt: DEFAULTS_PT,
  ru: DEFAULTS_RU, zh: DEFAULTS_ZH, ja: DEFAULTS_JA, hi: DEFAULTS_HI, ar: DEFAULTS_AR,
};

export default function OffreEvenementielle({ locale = "fr" }: { locale?: string }) {
  const [ref, vis] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.08 });
  const [open, setOpen] = useState(false);
  const [c, setC] = useState(DEFAULTS_BY_LOCALE[locale] ?? DEFAULTS);
  const oe = OE_TXT[locale];
  const { devisEnabled } = useDevisStatus();
  // Compteur animé du prix (count-up quand la carte s'ouvre)
  const [animPrice, setAnimPrice] = useState(0);

  useEffect(() => {
    // Réglages admin = contenu CMS en français uniquement → pas appliqués sur les pages traduites.
    if (locale !== "fr") return;
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        setC({
          titre: s["oe-titre"] || DEFAULTS.titre,
          prixAccent: s["oe-prix-accent"] || DEFAULTS.prixAccent,
          subtitle: s["oe-subtitle"] || DEFAULTS.subtitle,
          prix: s["oe-prix"] || DEFAULTS.prix,
          prixNote: s["oe-prix-note"] || DEFAULTS.prixNote,
          points: s["oe-points"] ? parsePoints(s["oe-points"]) : DEFAULTS.points,
        });
      })
      .catch(() => {});
  }, [locale]);

  // Count-up du chiffre à l'ouverture (0 → prix), easing cubic-out
  useEffect(() => {
    if (!open) { setAnimPrice(0); return; }
    const target = parseInt((c.prix.match(/\d[\d\s]*/)?.[0] ?? "0").replace(/\s/g, ""), 10);
    if (!target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setAnimPrice(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, c.prix]);

  // Suffixe du prix (ex. " €") conservé depuis la valeur CMS
  const prixSuffix = c.prix.replace(/\d[\d\s]*/, "").trim();

  return (
    <div
      className={`oe-section oe-compact${vis ? " oe-vis" : ""}${open ? " oe-open" : ""}`}
      ref={ref}
      id="offre-evenementielle"
    >
      {/* Fond déco */}
      <div className="oe-bg-stripe" aria-hidden="true" />

      <div className="oe-inner">
        {/* Barre compacte cliquable — le prix accroche dès l'état replié */}
        <button className="oe-bar" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span className="oe-eyebrow-pill">
            {(oe ? oe.pill : "Offre découverte · 30 jours").split("·").map((part, i) => (
              <span key={i} className="oe-pill-line">{part.trim()}</span>
            ))}
          </span>
          <span className="oe-bar-title v-prompt">
            {c.titre}{" "}
            <span className="oe-title-accent v-serif">{c.prixAccent}</span>
          </span>
          <span className="oe-bar-arrow" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </button>

        {/* Contenu repliable */}
        <div className="oe-reveal">
          <div className="oe-reveal-inner">
            <p className="oe-subtitle">{subtitleOneLine(c.subtitle)}</p>

            {/* Prix — chiffre animé (count-up) */}
            <div className="oe-price">
              <span className="oe-price-value v-prompt">
                {animPrice.toLocaleString("fr-FR")}{prixSuffix ? ` ${prixSuffix}` : ""}
              </span>
              <span className="oe-price-note">{c.prixNote}</span>
            </div>

            {/* Ce qui est inclus — points simples (apparition échelonnée) */}
            <ul className="oe-points">
              {c.points.map((item, i) => (
                <li
                  key={item.label}
                  className={`oe-point${item.bonus ? " oe-point--bonus" : ""}`}
                  style={{ "--oe-i": i } as React.CSSProperties}
                >
                  <span className="oe-point-check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.8} />
                  </span>
                  <span className="oe-point-text">
                    <strong>{item.label}</strong>
                    {item.bonus && <span className="oe-point-bonus-tag">bonus</span>}
                    <span className="oe-point-detail"> — {item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="oe-cta-block">
              <div className="oe-ctas">
                {devisEnabled && (
                  <Link href="/devis" className="btn-brand oe-cta-primary">
                    {oe ? oe.getQuote : "Faire un devis →"}
                  </Link>
                )}
                <Link href={oe ? oe.contactHref : "/#contact"} className="oe-cta-ghost">
                  {oe ? oe.contact : "Nous contacter"}
                </Link>
              </div>
            </div>
          </div>{/* oe-reveal-inner */}
        </div>{/* oe-reveal */}
      </div>
    </div>
  );
}
