"use client";

import {
  BookOpen, Calendar, CalendarClock, ChevronDown,
  Compass, Eye, Gamepad2, GraduationCap, Lightbulb,
  MessageSquare, Sparkles, BarChart2, Library,
} from "lucide-react";
import { useState } from "react";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/funct/functOrganisation.css";
import OrgaCard from "../cards/orgaCard";

const THEMES = [
  { icon: Sparkles,     title: "Réflexions et loisirs",            desc: "Aspirations individuelles, séries TV, modèles de réussite, etc.", q1: "Quelle intrigue de film ou série vous a marqué.e ?", q2: "Qu'est-ce qui vous inspire le plus au quotidien ?" },
  { icon: GraduationCap,title: "Domaines d'expertise et formation", desc: "Réflexions autour de sujets professionnels et/ou pédagogiques",   q1: "Comment vois-tu le management du futur ?",            q2: "Have you ever innovated in your daily life ?" },
  { icon: Lightbulb,    title: "Astuces et bons plans",             desc: "Partage d'expériences et conseils pratiques",                     q1: "Des recettes de saison à partager ?",                 q2: "Vos conseils pour bien gérer son argent ?" },
  { icon: Calendar,     title: "Événements et actualités",          desc: "Octobre rose, cultures locales, Tour de France, etc.",            q1: "L'aspect le plus impressionnant du Tour de France ?", q2: "La tradition préférée de votre territoire ?" },
  { icon: Gamepad2,     title: "Jeux et mises en situation",        desc: "Challenges en équipe et jeux de rôle",                           q1: "Trouvez six métiers commençant par la lettre M",      q2: "Inventez une histoire en alternant une phrase chacun" },
  { icon: MessageSquare,title: "Débats",                            desc: "Mettre en commun différents points de vue",                      q1: "Bienfaits et limites du progrès",                    q2: "Influenceurs : stars ou imposteurs ?" },
];

const TIMING_ITEMS = [
  { label: "Matin", detail: "7h – 9h", tag: "Avant le travail" },
  { label: "Pause déjeuner", detail: "12h – 14h", tag: "Idéal collectif" },
  { label: "Après-midi", detail: "15h – 17h", tag: "Pic d'engagement" },
  { label: "Durée", detail: "6 à 20 min", tag: "Par échange" },
];

const VISION_ITEMS = [
  "Satisfaction et bien-être des membres",
  "Perception des initiatives collectives",
  "Idées d'amélioration et propositions",
  "Attentes et besoins non exprimés",
];

const RESOURCE_ITEMS = [
  { icon: Library,   label: "Bibliothèque de sujets", count: "200+" },
  { icon: BarChart2, label: "Tableaux de bord",       count: "Temps réel" },
  { icon: BookOpen,  label: "Guides & bonnes pratiques", count: "Inclus" },
];

const ACCORDIONS = [
  {
    num: "01",
    icon: Compass,
    title: "Les thématiques abordées par votre collectif",
    hasContent: true,
    content: "themes",
  },
  {
    num: "02",
    icon: CalendarClock,
    title: "Le moment et la durée des expériences interactives",
    hasContent: true,
    content: "timing",
  },
  {
    num: "03",
    icon: Eye,
    title: "Les sujets sur lesquels vous souhaitez obtenir la vision de votre collectif",
    hasContent: true,
    content: "vision",
  },
  {
    num: "04",
    icon: BookOpen,
    title: "Les ressources explorées par votre collectif",
    hasContent: true,
    content: "resources",
  },
];

export default function FunctOrganisation() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="fo-section">
      {/* Lignes de vibration fond */}
      <div className="fo-vlines" aria-hidden="true">
        <VibrationLine width={1600} height={60} amplitude={18} freq={5} stroke="rgba(253,110,0,.12)" strokeWidth={1.5} speed={18} />
        <VibrationLine width={1600} height={60} amplitude={12} freq={8} stroke="rgba(217,10,92,.09)" strokeWidth={1} speed={25} />
      </div>

      {/* Blob déco */}
      <div className="fo-blob fo-blob--a" aria-hidden="true" />
      <div className="fo-blob fo-blob--b" aria-hidden="true" />

      <div className="fo-inner">
        {/* Header */}
        <div className="fo-header">
          <span className="fo-eyebrow v-mono">
            <span className="fo-eyebrow-dot" aria-hidden="true" />
            Configuration
          </span>
          <h2 className="fo-title v-prompt">
            Comment ça marche<br />
            <span className="fo-title-accent v-serif">pour votre organisation&nbsp;?</span>
          </h2>
          <p className="fo-subtitle">
            Vous gardez le contrôle. Nous fournissons la plateforme,
            vous définissez le contenu.
          </p>
        </div>

        {/* Watermark "Vous définissez" */}
        <div className="fo-pill-label">
          <span className="fo-pill-dot" aria-hidden="true" />
          Vous définissez :
        </div>

        {/* Accordéons */}
        <div className="fo-accordions">
          {ACCORDIONS.map((acc, i) => {
            const Icon = acc.icon;
            const isOpen = open === i;
            return (
              <div key={i} className={`fo-accordion${isOpen ? " --open" : ""}`}>
                <button
                  className="fo-accordion-row"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="fo-acc-num v-prompt">{acc.num}</span>
                  <span className="fo-acc-icon-wrap" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className="fo-acc-title">{acc.title}</span>
                  <span className={`fo-acc-chevron${isOpen ? " --open" : ""}`} aria-hidden="true">
                    <ChevronDown size={20} />
                  </span>
                </button>

                {isOpen && (
                  <div className="fo-accordion-body">
                    {acc.content === "themes" && (
                      <>
                        <p className="fo-acc-desc">
                          Choisissez les univers conversationnels qui correspondent à votre collectif.
                          Chaque thématique est associée à des questions guidées conçues par nos experts.
                        </p>
                        <div className="fo-orga-grid">
                          {THEMES.map((t, j) => {
                            const TIcon = t.icon;
                            return (
                              <OrgaCard
                                key={j}
                                icone={<TIcon size="50%" />}
                                title={t.title}
                                description={t.desc}
                                content1={t.q1}
                                content2={t.q2}
                                cardIndex={j}
                              />
                            );
                          })}
                        </div>
                      </>
                    )}

                    {acc.content === "timing" && (
                      <div className="fo-timing-grid">
                        {TIMING_ITEMS.map((t, j) => (
                          <div key={j} className="fo-timing-card">
                            <span className="fo-timing-tag v-mono">{t.tag}</span>
                            <span className="fo-timing-label v-prompt">{t.label}</span>
                            <span className="fo-timing-detail">{t.detail}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {acc.content === "vision" && (
                      <div className="fo-vision-list">
                        {VISION_ITEMS.map((v, j) => (
                          <div key={j} className="fo-vision-item">
                            <svg className="fo-vision-check" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5" aria-hidden="true">
                              <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {acc.content === "resources" && (
                      <div className="fo-resources-grid">
                        {RESOURCE_ITEMS.map((r, j) => {
                          const RIcon = r.icon;
                          return (
                            <div key={j} className="fo-resource-card">
                              <span className="fo-resource-icon"><RIcon size={24} /></span>
                              <span className="fo-resource-count v-prompt">{r.count}</span>
                              <span className="fo-resource-label">{r.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
