"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { PASSEPORTS_EN } from "@/data/passeport/passeportExperienceEn";
import { PASSEPORTS_ES } from "@/data/passeport/passeportExperienceEs";
import { PASSEPORTS_DE } from "@/data/passeport/passeportExperienceDe";
import { PASSEPORTS_IT } from "@/data/passeport/passeportExperienceIt";
import { PASSEPORTS_PT } from "@/data/passeport/passeportExperiencePt";
import { PASSEPORTS_RU } from "@/data/passeport/passeportExperienceRu";
import { PASSEPORTS_ZH } from "@/data/passeport/passeportExperienceZh";
import { PASSEPORTS_JA } from "@/data/passeport/passeportExperienceJa";
import { PASSEPORTS_HI } from "@/data/passeport/passeportExperienceHi";
import { PASSEPORTS_AR } from "@/data/passeport/passeportExperienceAr";
import "@/styles/section/passeportExperience.css";

interface Passeport {
  id: string;
  category: string;
  title: string;
  tagline: string;
  keywords: string[];
  besoin: string;
  axes: string[];
  valoriser: string[];
  accent: string;
}

const PASSEPORTS: Passeport[] = [
  {
    id: "insertion",
    category: "Insertion professionnelle",
    title: "Compétences relationnelles pour l'emploi",
    tagline: "Démontrer ce que le CV ne dit pas.",
    keywords: ["Aisance", "Réseau", "Confiance"],
    besoin: "Un demandeur d'emploi doit aujourd'hui démontrer bien plus que ses compétences techniques. Les recruteurs recherchent des candidats capables de communiquer, collaborer, créer du lien.",
    axes: ["Communiquer efficacement", "Gagner en aisance relationnelle", "Créer du lien rapidement", "Gérer les conflits et tensions"],
    valoriser: ["Valoriser sa démarche sur LinkedIn", "L'ajouter à son CV", "L'évoquer en entretien"],
    accent: "#FD6E00",
  },
  {
    id: "enseignement",
    category: "Enseignement",
    title: "Réseau & Réussite Étudiante",
    tagline: "Construire son réseau dès les études.",
    keywords: ["Réseau", "Employabilité", "Collaboration"],
    besoin: "Les étudiants doivent apprendre à créer leur réseau, collaborer avec les autres et développer leur employabilité dès leurs études.",
    axes: ["Communiquer efficacement", "Gagner en aisance relationnelle", "Créer du lien rapidement", "Gérer les conflits et tensions"],
    valoriser: ["Valoriser son engagement sur LinkedIn", "Renforcer son portfolio étudiant", "Préparer ses candidatures de stage ou d'alternance"],
    accent: "#D90A5C",
  },
  {
    id: "business",
    category: "Business",
    title: "Relation Client & Développement d'Activité",
    tagline: "La confiance, ça se cultive.",
    keywords: ["Client", "Réseau", "Crédibilité"],
    besoin: "Notre activité repose largement sur notre capacité à créer la confiance, fidéliser nos clients et développer notre réseau professionnel.",
    axes: ["Relation client", "Développement de son réseau professionnel", "Gestion des situations délicates"],
    valoriser: ["Développer son réseau local", "Renforcer sa crédibilité auprès de ses partenaires", "Démontrer son engagement"],
    accent: "#1a1a2e",
  },
  {
    id: "echanges-pairs",
    category: "Échanges entre pairs",
    title: "Soutien & Partage entre pairs",
    tagline: "Ensemble, on traverse mieux.",
    keywords: ["Soutien", "Solidarité", "Équilibre"],
    besoin: "Les personnes traversant des épreuves de vie exceptionnelles sont souvent confrontées à l'isolement, à la charge mentale et au manque d'espaces d'échange.",
    axes: ["Préserver son équilibre personnel", "Savoir demander de l'aide", "Développer son réseau de soutien"],
    valoriser: ["Valoriser son engagement personnel", "Conserver une trace de son parcours", "Renforcer son sentiment d'appartenance"],
    accent: "#D90A5C",
  },
  {
    id: "adherents",
    category: "Adhérents & Sociétaires",
    title: "Lien Social & Ouverture aux Autres",
    tagline: "Appartenir, c'est aussi se rencontrer.",
    keywords: ["Lien", "Engagement", "Communauté"],
    besoin: "Au-delà des services qu'ils utilisent, les adhérents et sociétaires ont besoin de se sentir pleinement membres d'une communauté.",
    axes: ["Créer du lien facilement", "Aisance relationnelle", "Engagement, entraide et solidarité"],
    valoriser: ["Valoriser son engagement dans une démarche collective", "Prendre conscience des compétences développées", "Conserver une trace de son expérience"],
    accent: "#feb000",
  },
  {
    id: "seniors",
    category: "Seniors",
    title: "Vie Sociale Active",
    tagline: "Le lien social, c'est la santé.",
    keywords: ["Lien", "Vitalité", "Transmission"],
    besoin: "Le maintien du lien social est un facteur essentiel de qualité de vie, de stimulation cognitive et de bien-être à mesure que l'on avance en âge.",
    axes: ["Maintenir sa vie sociale", "Créer de nouvelles relations", "Transmettre son expérience", "Préserver son dynamisme relationnel"],
    valoriser: ["Valoriser son engagement social", "Conserver le souvenir d'une expérience enrichissante", "Reconnaître sa contribution au collectif"],
    accent: "#78c751",
  },
  {
    id: "sport",
    category: "Clubs sportifs",
    title: "Esprit d'Équipe",
    tagline: "Gagner ensemble commence par se connaître.",
    keywords: ["Cohésion", "Leadership", "Fair-play"],
    besoin: "La réussite sportive repose autant sur la qualité des relations humaines que sur les performances individuelles.",
    axes: ["Esprit d'équipe", "Communication", "Leadership positif", "Respect et fair-play"],
    valoriser: ["Valoriser son engagement dans le club", "Reconnaître les compétences relationnelles développées", "Mettre en avant sa capacité à coopérer"],
    accent: "#00AFDD",
  },
  {
    id: "culture",
    category: "Cinémas, théâtres & lieux culturels",
    title: "Regards Croisés",
    tagline: "L'art devient conversation.",
    keywords: ["Curiosité", "Dialogue", "Émotions"],
    besoin: "Les œuvres culturelles prennent une nouvelle dimension lorsqu'elles deviennent un prétexte à l'échange, à la réflexion et à la rencontre.",
    axes: ["Explorer les émotions suscitées par l'art", "Exprimer ce qu'une œuvre fait naître en soi", "Développer son esprit critique"],
    valoriser: ["Valoriser son ouverture d'esprit et sa curiosité culturelle", "Mettre en avant sa capacité à dialoguer", "Garder une trace des rencontres culturelles vécues"],
    accent: "#800080",
  },
  {
    id: "tourisme",
    category: "Campings & villages vacances",
    title: "Rencontres & Convivialité",
    tagline: "Des vacances qui laissent une trace.",
    keywords: ["Convivialité", "Rencontre", "Souvenir"],
    besoin: "Les vacances sont un moment privilégié pour rencontrer de nouvelles personnes, partager des expériences et créer des souvenirs durables.",
    axes: ["Créer du lien rapidement", "Partager son histoire", "Développer sa curiosité"],
    valoriser: ["Garder un souvenir tangible de son expérience", "Valoriser sa participation à la vie du lieu", "Prolonger l'esprit de convivialité"],
    accent: "#00AFDD",
  },
  {
    id: "entreprises",
    category: "Entreprises & Équipes",
    title: "Collaboration & Intelligence Relationnelle",
    tagline: "Les soft skills, ça s'entraîne.",
    keywords: ["Collaboration", "Intelligence", "Carrière"],
    besoin: "Les compétences relationnelles sont essentielles pour réussir professionnellement, mais elles ne se développent réellement qu'en les pratiquant.",
    axes: ["Communiquer efficacement", "Gagner en aisance relationnelle", "Créer du lien rapidement", "Gérer les conflits et tensions"],
    valoriser: ["Mettre en avant son engagement en entretien annuel", "L'ajouter à son CV et valoriser sur LinkedIn", "Renforcer sa confiance dans ses interactions"],
    accent: "#FD6E00",
  },
  {
    id: "international",
    category: "International",
    title: "Explorateurs du Monde",
    tagline: "Les frontières s'effacent dans la conversation.",
    keywords: ["Interculturel", "Ouverture", "Monde"],
    besoin: "La distance, la langue et les différences culturelles limitent encore les occasions d'échanger avec des personnes vivant dans d'autres pays.",
    axes: ["Communiquer avec des personnes de cultures différentes", "Développer son ouverture au monde", "Créer du lien malgré les différences"],
    valoriser: ["Valoriser son ouverture internationale", "Démontrer sa capacité à échanger entre cultures", "Mettre en avant une expérience interculturelle"],
    accent: "#D90A5C",
  },
  {
    id: "lieu-de-vie",
    category: "Lieu de vie",
    title: "Attestation lieu de vie",
    tagline: "Habiter, c'est aussi créer du lien.",
    keywords: ["Voisinage", "Appartenance", "Lien social"],
    besoin: "Les lieux de vie sont un endroit privilégié pour développer des compétences humaines et relationnelles qui s'acquièrent rarement dans les parcours académiques ou professionnels traditionnels.",
    axes: ["Créer du lien avec ses voisins", "Développer son sentiment d'appartenance", "Participer à la vie du collectif"],
    valoriser: ["Valoriser son engagement citoyen sur un CV ou un profil professionnel", "Mettre en avant ses compétences relationnelles", "Attester de sa participation active à la vie de son lieu de vie", "Conserver une reconnaissance concrète de sa contribution au collectif"],
    accent: "#800080",
  },
  {
    id: "sante",
    category: "Santé et médico-social",
    title: "Reconnaissance",
    tagline: "Chaque expérience compte et mérite d'être reconnue.",
    keywords: ["Parcours de soin", "Reconnaissance", "Lien"],
    besoin: "Au cours de leur parcours de soin, les patients vivent de nombreuses expériences, développent des connaissances et créent des liens qui méritent d'être reconnus et valorisés.",
    axes: ["Échanger avec des personnes en situation similaire", "Préserver son équilibre personnel", "Créer du lien tout au long du parcours de soin"],
    valoriser: ["Valoriser les expériences et les démarches positives réalisées.", "Conserver une trace des rencontres, échanges et moments marquants vécus.", "Reconnaître son engagement et sa contribution au sein du collectif."],
    accent: "#00AFDD",
  },
];

// Palette chaude alignée sur la section « Thématiques » — aucune couleur sombre ni violette
const PALETTE = ["#FD6E00", "#E6007E", "#D90A5C", "#FFB800"];

// Légère rotation par carte (effet paquet) — cycle de 6 valeurs
const ROT = [-2.2, 1.6, -1.2, 2, -1.6, 1.2];

type PassportItem =
  | Passeport
  | (typeof PASSEPORTS_EN)[number]
  | (typeof PASSEPORTS_ES)[number]
  | (typeof PASSEPORTS_DE)[number]
  | (typeof PASSEPORTS_IT)[number]
  | (typeof PASSEPORTS_PT)[number]
  | (typeof PASSEPORTS_RU)[number]
  | (typeof PASSEPORTS_ZH)[number]
  | (typeof PASSEPORTS_JA)[number]
  | (typeof PASSEPORTS_HI)[number]
  | (typeof PASSEPORTS_AR)[number];

const PASSEPORTS_BY_LOCALE: Record<string, PassportItem[]> = {
  en: PASSEPORTS_EN,
  es: PASSEPORTS_ES,
  de: PASSEPORTS_DE,
  it: PASSEPORTS_IT,
  pt: PASSEPORTS_PT,
  ru: PASSEPORTS_RU,
  zh: PASSEPORTS_ZH,
  ja: PASSEPORTS_JA,
  hi: PASSEPORTS_HI,
  ar: PASSEPORTS_AR,
};

const PP_CARD_TXT: Record<string, { altFn: (title: string) => string; need: string; whatFor: string }> = {
  en: { altFn: (t) => `Experience Passport — ${t}`, need: "The need", whatFor: "What can you do with this passport?" },
  es: { altFn: (t) => `Pasaporte de experiencia — ${t}`, need: "La necesidad", whatFor: "¿Qué puedes hacer con este pasaporte?" },
  de: { altFn: (t) => `Erfahrungspass — ${t}`, need: "Der Bedarf", whatFor: "Was kann man mit diesem Pass tun?" },
  it: { altFn: (t) => `Passaporto dell'esperienza — ${t}`, need: "Il bisogno", whatFor: "Cosa si può fare con questo passaporto?" },
  pt: { altFn: (t) => `Passaporte de experiência — ${t}`, need: "A necessidade", whatFor: "O que pode fazer com este passaporte?" },
  ru: { altFn: (t) => `Паспорт опыта — ${t}`, need: "Потребность", whatFor: "Что можно сделать с этим паспортом?" },
  zh: { altFn: (t) => `经验护照 — ${t}`, need: "需求", whatFor: "这本护照能做什么？" },
  ja: { altFn: (t) => `経験パスポート — ${t}`, need: "ニーズ", whatFor: "このパスポートで何ができる？" },
  hi: { altFn: (t) => `अनुभव पासपोर्ट — ${t}`, need: "ज़रूरत", whatFor: "इस पासपोर्ट से क्या किया जा सकता है?" },
  ar: { altFn: (t) => `جواز سفر الخبرة — ${t}`, need: "الحاجة", whatFor: "بماذا يمكن أن يفيد هذا الجواز؟" },
};

function PassportCard({
  p, i, open, toggle, locale,
}: { p: PassportItem; i: number; open: boolean; toggle: (id: string) => void; locale: string }) {
  const cardTxt = PP_CARD_TXT[locale];
  const accent = PALETTE[i % PALETTE.length];
  return (
    <div
      className={`pp-card${open ? " pp-card--open" : ""}`}
      data-pp-id={p.id}
      style={{ "--pp-accent": accent, "--pp-rot": `${ROT[i % ROT.length]}deg` } as React.CSSProperties}
      onClick={(e) => { e.stopPropagation(); toggle(p.id); }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(p.id); }
      }}
    >
      <div className="pp-card-front">
        {/* Affiche du passeport (diplôme) */}
        <div className="pp-card-media">
          <Image
            src={`/images/passeport/${p.id}.webp`}
            alt={cardTxt ? cardTxt.altFn(p.title) : `Passeport d'expérience — ${p.title}`}
            width={360}
            height={254}
            className="pp-card-img"
          />
        </div>

        {/* En-tête — toujours visible */}
        <div className="pp-card-header">
          <div className="pp-card-header-left">
            <p className="pp-card-category">{p.title}</p>
            <h3 className="pp-card-title" style={{ color: accent }}>{p.category}</h3>
            <p className="pp-card-tagline">{p.tagline}</p>
          </div>
          <div className="pp-card-header-right">
            <div className="pp-card-toggle" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Contenu révélé — horizontal sur desktop, vertical en mobile (cf. CSS) */}
      <div className="pp-card-reveal">
        <div className="pp-card-reveal-inner">
          <div className="pp-card-block">
            <p className="pp-card-block-label">{cardTxt ? cardTxt.need : "Le besoin"}</p>
            <p className="pp-card-block-text">{p.besoin}</p>
          </div>

          <div className="pp-card-perf" aria-hidden="true" />

          <div className="pp-card-block">
            <p className="pp-card-block-label">{cardTxt ? cardTxt.whatFor : "Que peut-on faire de ce passeport ?"}</p>
            <ul className="pp-card-list">
              {p.valoriser.map((v) => (
                <li key={v}><span className="pp-card-dot" aria-hidden="true" />{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Carousel unique, défilable manuellement (glisser à la souris/au doigt, flèches,
// molette/trackpad) — au rythme de l'utilisateur, sans défilement automatique.
function PassportCarousel({
  items, openId, toggle, locale,
}: {
  items: PassportItem[]; openId: string | null; toggle: (id: string) => void; locale: string;
}) {
  const navTxt: Record<string, { prev: string; next: string }> = {
    en: { prev: "Previous", next: "Next" },
    es: { prev: "Anterior", next: "Siguiente" },
    de: { prev: "Zurück", next: "Weiter" },
    it: { prev: "Precedente", next: "Successivo" },
    pt: { prev: "Anterior", next: "Seguinte" },
    ru: { prev: "Назад", next: "Далее" },
    zh: { prev: "上一个", next: "下一个" },
    ja: { prev: "前へ", next: "次へ" },
    hi: { prev: "पिछला", next: "अगला" },
    ar: { prev: "السابق", next: "التالي" },
  };
  const nav = navTxt[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft < 4);
    setAtEnd(max <= 0 || el.scrollLeft > max - 4);
  };

  useEffect(() => { updateProgress(); }, [items.length]);

  // La carte ouverte se centre dans le carousel pour bien lire le contenu déplié
  useEffect(() => {
    if (!openId) return;
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-pp-id="${openId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [openId]);

  const scrollByPage = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * trackRef.current.clientWidth * 0.7, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    const d = dragRef.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => { dragRef.current.down = false; };
  // Si on vient de glisser, on bloque le clic (sinon ça ouvrirait la carte relâchée sous le doigt)
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) { e.stopPropagation(); dragRef.current.moved = false; }
  };

  return (
    <div className="pp-carousel">
      <button
        type="button"
        className="pp-nav-btn pp-nav-btn--prev"
        onClick={() => scrollByPage(-1)}
        disabled={atStart}
        aria-label={nav ? nav.prev : "Précédent"}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        className="pp-track"
        ref={trackRef}
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {items.map((p, i) => (
          <PassportCard key={p.id} p={p} i={i} open={openId === p.id} toggle={toggle} locale={locale} />
        ))}
      </div>

      <button
        type="button"
        className="pp-nav-btn pp-nav-btn--next"
        onClick={() => scrollByPage(1)}
        disabled={atEnd}
        aria-label={nav ? nav.next : "Suivant"}
      >
        <ChevronRight size={20} />
      </button>

      <div className="pp-progress" aria-hidden="true">
        <div className="pp-progress-fill" style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }} />
      </div>
    </div>
  );
}

const PP_HEADER_TXT: Record<string, {
  eyebrow: string; title: React.ReactNode; lead: string;
  trio: { verb: string; sub: string; color: string }[]; subline: string;
}> = {
  en: {
    eyebrow: "To structure, develop and showcase your community",
    title: <>Give your community<br />the{" "}<em className="pp-title-em v-serif">Experience Passport</em></>,
    lead: "Uvibes is the first solution that lets people build relational skills, practice them in real exchanges, and get that commitment recognized.",
    trio: [
      { verb: "Learn", sub: "from varied resources", color: "#FD6E00" },
      { verb: "Practice", sub: "an ongoing training ground", color: "#D90A5C" },
      { verb: "Showcase", sub: "a certificate to earn", color: "#00AFDD" },
    ],
    subline: "Each passport is tailored to the specific challenges of your community.",
  },
  es: {
    eyebrow: "Para estructurar, desarrollar y valorizar tu colectivo",
    title: <>Ofrece a tu colectivo<br />el{" "}<em className="pp-title-em v-serif">Pasaporte de Experiencia</em></>,
    lead: "Uvibes es la primera solución que permite a la vez desarrollar competencias relacionales, ponerlas en práctica en intercambios reales y conseguir que ese compromiso sea reconocido.",
    trio: [
      { verb: "Aprender", sub: "con recursos variados", color: "#FD6E00" },
      { verb: "Practicar", sub: "un terreno de entrenamiento continuo", color: "#D90A5C" },
      { verb: "Valorizar", sub: "un certificado por conseguir", color: "#00AFDD" },
    ],
    subline: "Cada pasaporte se adapta a los retos específicos de tu colectivo.",
  },
  de: {
    eyebrow: "Um Ihr Kollektiv zu strukturieren, zu entwickeln und sichtbar zu machen",
    title: <>Bieten Sie Ihrem Kollektiv<br />den{" "}<em className="pp-title-em v-serif">Erfahrungspass</em></>,
    lead: "Uvibes ist die erste Lösung, die es ermöglicht, Beziehungskompetenzen zu entwickeln, sie in echten Austauschen zu üben und dieses Engagement anerkennen zu lassen.",
    trio: [
      { verb: "Lernen", sub: "mit vielfältigen Ressourcen", color: "#FD6E00" },
      { verb: "Üben", sub: "ein kontinuierliches Trainingsfeld", color: "#D90A5C" },
      { verb: "Sichtbar machen", sub: "ein zu erlangendes Zertifikat", color: "#00AFDD" },
    ],
    subline: "Jeder Pass ist auf die spezifischen Herausforderungen Ihres Kollektivs zugeschnitten.",
  },
  it: {
    eyebrow: "Per strutturare, sviluppare e valorizzare la tua comunità",
    title: <>Offri alla tua comunità<br />il{" "}<em className="pp-title-em v-serif">Passaporto dell&apos;Esperienza</em></>,
    lead: "Uvibes è la prima soluzione che permette di sviluppare competenze relazionali, metterle in pratica in scambi reali e farsi riconoscere questo impegno.",
    trio: [
      { verb: "Imparare", sub: "con risorse variegate", color: "#FD6E00" },
      { verb: "Praticare", sub: "un terreno di allenamento continuo", color: "#D90A5C" },
      { verb: "Valorizzare", sub: "un attestato da conquistare", color: "#00AFDD" },
    ],
    subline: "Ogni passaporto è adattato alle sfide specifiche della tua comunità.",
  },
  pt: {
    eyebrow: "Para estruturar, desenvolver e valorizar o seu coletivo",
    title: <>Ofereça ao seu coletivo<br />o{" "}<em className="pp-title-em v-serif">Passaporte de Experiência</em></>,
    lead: "A Uvibes é a primeira solução que permite desenvolver competências relacionais, praticá-las em trocas reais e obter reconhecimento por esse compromisso.",
    trio: [
      { verb: "Aprender", sub: "com recursos variados", color: "#FD6E00" },
      { verb: "Praticar", sub: "um terreno de treino contínuo", color: "#D90A5C" },
      { verb: "Valorizar", sub: "um certificado a conquistar", color: "#00AFDD" },
    ],
    subline: "Cada passaporte é adaptado aos desafios específicos do seu coletivo.",
  },
  ru: {
    eyebrow: "Чтобы структурировать, развивать и продвигать ваш коллектив",
    title: <>Предложите вашему коллективу<br />{" "}<em className="pp-title-em v-serif">Паспорт опыта</em></>,
    lead: "Uvibes — первое решение, которое позволяет развивать коммуникативные навыки, применять их в реальном общении и получать признание за эту вовлечённость.",
    trio: [
      { verb: "Учиться", sub: "на разнообразных ресурсах", color: "#FD6E00" },
      { verb: "Практиковать", sub: "постоянная тренировочная площадка", color: "#D90A5C" },
      { verb: "Продвигать", sub: "сертификат, который можно получить", color: "#00AFDD" },
    ],
    subline: "Каждый паспорт адаптирован к конкретным задачам вашего коллектива.",
  },
  zh: {
    eyebrow: "构建、发展并展现你的集体",
    title: <>为你的集体<br />提供{" "}<em className="pp-title-em v-serif">经验护照</em></>,
    lead: "Uvibes 是首个能够同时发展人际能力、在真实交流中践行并获得认可的解决方案。",
    trio: [
      { verb: "学习", sub: "借助多样的资源", color: "#FD6E00" },
      { verb: "实践", sub: "持续的训练场", color: "#D90A5C" },
      { verb: "展现", sub: "可获得的证书", color: "#00AFDD" },
    ],
    subline: "每本护照都根据你的集体的具体挑战量身定制。",
  },
  ja: {
    eyebrow: "あなたのコレクティフを構築し、発展させ、価値を高めるために",
    title: <>あなたのコレクティフに<br />{" "}<em className="pp-title-em v-serif">経験パスポート</em>を</>,
    lead: "Uvibesは、対人スキルを発展させ、実際の交流の中で実践し、その取り組みを認めてもらうことを同時に可能にする初めてのソリューションです。",
    trio: [
      { verb: "学ぶ", sub: "多様なリソースで", color: "#FD6E00" },
      { verb: "実践する", sub: "継続的な実践の場", color: "#D90A5C" },
      { verb: "見せる", sub: "獲得できる証明書", color: "#00AFDD" },
    ],
    subline: "各パスポートは、あなたのコレクティフ特有の課題に合わせて調整されています。",
  },
  hi: {
    eyebrow: "अपने समूह को संरचित करने, विकसित करने और उजागर करने के लिए",
    title: <>अपने समूह को दें<br />{" "}<em className="pp-title-em v-serif">अनुभव पासपोर्ट</em></>,
    lead: "Uvibes पहला समाधान है जो एक साथ संबंध-कौशल विकसित करने, उन्हें वास्तविक संवाद में अपनाने, और इस सहभागिता को मान्यता दिलाने में मदद करता है।",
    trio: [
      { verb: "सीखें", sub: "विविध संसाधनों के साथ", color: "#FD6E00" },
      { verb: "अभ्यास करें", sub: "एक निरंतर प्रशिक्षण मैदान", color: "#D90A5C" },
      { verb: "उजागर करें", sub: "एक प्रमाणपत्र जो हासिल करना है", color: "#00AFDD" },
    ],
    subline: "हर पासपोर्ट आपके समूह की विशेष चुनौतियों के अनुसार बनाया गया है।",
  },
  ar: {
    eyebrow: "لتنظيم وتطوير وإبراز قيمة مجموعتك",
    title: <>قدّم لمجموعتك<br />{" "}<em className="pp-title-em v-serif">جواز سفر الخبرة</em></>,
    lead: "Uvibes هو أول حل يتيح تطوير المهارات العلائقية، وممارستها في تبادلات حقيقية، والحصول على الاعتراف بهذا الالتزام.",
    trio: [
      { verb: "التعلم", sub: "عبر موارد متنوعة", color: "#FD6E00" },
      { verb: "الممارسة", sub: "ميدان تدريب مستمر", color: "#D90A5C" },
      { verb: "الإبراز", sub: "شهادة يمكن الحصول عليها", color: "#00AFDD" },
    ],
    subline: "كل جواز سفر مصمم خصيصًا للتحديات الخاصة بمجموعتك.",
  },
};

export default function PasseportExperience({ locale = "fr" }: { locale?: string }) {
  const PASSEPORTS_LIST = PASSEPORTS_BY_LOCALE[locale] ?? PASSEPORTS;
  const ppHeader = locale !== "fr" ? PP_HEADER_TXT[locale] : undefined;
  const [openId, setOpenId] = useState<string | null>(null);
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.06 });

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className={`pp-section${vis ? " pp-vis" : ""}`} ref={ref}>
      {/* Ondes de fond — identité Uvibes */}
      <div className="pp-waves" aria-hidden="true">
        <GradientVibrationLine id="pp-w1" width={1800} height={70} amplitude={26} freq={5} strokeWidth={18} speed={12} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="pp-w2" width={1800} height={70} amplitude={20} freq={7} strokeWidth={12} speed={16} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
      </div>

      {/* ── En-tête ── */}
      <div className="pp-header">
        <div className="pp-eyebrow">
          <span className="pp-eyebrow-mark" aria-hidden="true" />
          <span>{ppHeader ? ppHeader.eyebrow : "Pour structurer, développer et valoriser votre collectif"}</span>
        </div>

        <h2 className="pp-title v-prompt">
          {ppHeader ? ppHeader.title : (
            <>À votre collectif,<br />proposez le{" "}<em className="pp-title-em v-serif">Passeport d&apos;Expérience</em></>
          )}
        </h2>

        <p className="pp-lead">
          {ppHeader
            ? ppHeader.lead
            : "Uvibes est la première solution qui permet à la fois de développer ses compétences relationnelles, de les exercer dans des échanges réels et de faire reconnaître cet engagement."}
        </p>

        {/* Triptyque — le parcours posé sur la « vibe » (onde signature uvibes) :
            3 jalons reliés par la vibration plutôt que des cartes génériques. */}
        <div className="pp-trio">
          <div className="pp-trio-thread" aria-hidden="true">
            <GradientVibrationLine
              id="pp-trio-wave"
              width={900}
              height={40}
              amplitude={8}
              freq={7}
              strokeWidth={2.5}
              speed={11}
              colorFrom="#FD6E00"
              colorTo="#E6007E"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="pp-trio-steps">
            {(
              ppHeader ? ppHeader.trio : [
                { verb: "Apprendre", sub: "des ressources variées" },
                { verb: "Pratiquer", sub: "un terrain d'entraînement continu" },
                { verb: "Valoriser", sub: "une attestation à gagner" },
              ]
            ).map((item) => (
              <div key={item.verb} className="pp-trio-step">
                <span className="pp-trio-dot" aria-hidden="true" />
                <span className="pp-trio-verb">{item.verb}</span>
                <span className="pp-trio-sub">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="pp-subline">
          {ppHeader ? ppHeader.subline : "Chaque passeport est adapté aux enjeux spécifiques de votre collectif."}
        </p>
      </div>

      {/* ── Paquet de passeports — un seul carousel, défilement manuel ── */}
      <PassportCarousel items={PASSEPORTS_LIST} openId={openId} toggle={toggle} locale={locale} />
    </section>
  );
}
