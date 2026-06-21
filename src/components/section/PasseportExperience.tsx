"use client";

import { useState } from "react";
import Image from "next/image";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { PASSEPORTS_EN } from "@/data/passeport/passeportExperienceEn";
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

export default function PasseportExperience({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const PASSEPORTS_LIST = locale === "en" ? PASSEPORTS_EN : PASSEPORTS;
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
          <span>{locale === "en" ? "To structure, develop and showcase your community" : "Pour structurer, développer et valoriser votre collectif"}</span>
        </div>

        <h2 className="pp-title v-prompt">
          {locale === "en" ? (
            <>Give your community<br />the{" "}<em className="pp-title-em v-serif">Experience Passport</em></>
          ) : (
            <>À votre collectif,<br />proposez le{" "}<em className="pp-title-em v-serif">Passeport d&apos;Expérience</em></>
          )}
        </h2>

        <p className="pp-lead">
          {locale === "en"
            ? "Uvibes is the first solution that lets people build relational skills, practice them in real exchanges, and get that commitment recognized."
            : "Uvibes est la première solution qui permet à la fois de développer ses compétences relationnelles, de les exercer dans des échanges réels et de faire reconnaître cet engagement."}
        </p>

        {/* Triptyque — étapes éditoriales */}
        <div className="pp-trio">
          {(
            locale === "en" ? [
              { verb: "Learn", sub: "from varied resources", color: "#FD6E00" },
              { verb: "Practice", sub: "an ongoing training ground", color: "#D90A5C" },
              { verb: "Showcase", sub: "a certificate to earn", color: "#00AFDD" },
            ] as const : [
              { verb: "Apprendre", sub: "des ressources variées", color: "#FD6E00" },
              { verb: "Pratiquer", sub: "un terrain d'entraînement continu", color: "#D90A5C" },
              { verb: "Valoriser", sub: "une attestation à gagner", color: "#00AFDD" },
            ] as const
          ).map((item, i) => (
            <span key={item.verb} className="pp-trio-group">
              <span className="pp-trio-step" style={{ "--ps-color": item.color } as React.CSSProperties}>
                <span className="pp-trio-verb">{item.verb}</span>
                <span className="pp-trio-sub">{item.sub}</span>
              </span>
              {i < 2 && (
                <span className="pp-trio-path" aria-hidden="true">
                  <svg viewBox="0 0 60 12" fill="none" preserveAspectRatio="none">
                    <path d="M0 6 Q15 1 30 6 Q45 11 60 6" stroke="url(#ppPathGrad)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                    <defs>
                      <linearGradient id="ppPathGrad" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#FD6E00" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#D90A5C" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="pp-trio-arrow-tip" />
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="pp-subline">
          {locale === "en"
            ? "Each passport is tailored to the specific challenges of your community."
            : "Chaque passeport est adapté aux enjeux spécifiques de votre collectif."}
        </p>
      </div>

      {/* ── Paquet de passeports ── */}
      <div className="pp-deck">
        {PASSEPORTS_LIST.map((p, i) => {
          const open = openId === p.id;
          const accent = PALETTE[i % PALETTE.length];
          return (
            <div
              key={p.id}
              className={`pp-card${open ? " pp-card--open" : ""}`}
              style={{ "--pp-accent": accent } as React.CSSProperties}
              onClick={() => toggle(p.id)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(p.id); }
              }}
            >
              {/* Affiche du passeport (diplôme) */}
              <div className="pp-card-media">
                <Image
                  src={`/images/passeport/${p.id}.webp`}
                  alt={locale === "en" ? `Experience Passport — ${p.title}` : `Passeport d'expérience — ${p.title}`}
                  width={360}
                  height={254}
                  className="pp-card-img"
                />
              </div>

              {/* En-tête — toujours visible */}
              <div className="pp-card-header">
                <div className="pp-card-header-left">
                  <p className="pp-card-category">{p.category}</p>
                  <h3 className="pp-card-title" style={{ color: accent }}>{p.title}</h3>
                  <p className="pp-card-tagline">{p.tagline}</p>
                </div>
                <div className="pp-card-header-right">
                  <div className="pp-card-toggle" aria-hidden="true" />
                </div>
              </div>

              {/* Contenu révélé */}
              <div className="pp-card-reveal">
                <div className="pp-card-reveal-inner">
                  <div className="pp-card-block">
                    <p className="pp-card-block-label">{locale === "en" ? "The need" : "Le besoin"}</p>
                    <p className="pp-card-block-text">{p.besoin}</p>
                  </div>

                  <div className="pp-card-perf" aria-hidden="true" />

                  <div className="pp-card-block">
                    <p className="pp-card-block-label">{locale === "en" ? "What can you do with this passport?" : "Que peut-on faire de ce passeport ?"}</p>
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
        })}
      </div>
    </section>
  );
}
