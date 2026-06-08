"use client";

import { useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
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
    title: "Explorateur du Monde",
    tagline: "Les frontières s'effacent dans la conversation.",
    keywords: ["Interculturel", "Ouverture", "Monde"],
    besoin: "La distance, la langue et les différences culturelles limitent encore les occasions d'échanger avec des personnes vivant dans d'autres pays.",
    axes: ["Communiquer avec des personnes de cultures différentes", "Développer son ouverture au monde", "Créer du lien malgré les différences"],
    valoriser: ["Valoriser son ouverture internationale", "Démontrer sa capacité à échanger entre cultures", "Mettre en avant une expérience interculturelle"],
    accent: "#D90A5C",
  },
];

// Légère rotation + décalage par carte — même principe que SolutionThemes
const ROT  = [-2.4, 1.6, -1.4, 2, -1.8, 1.2, -2, 1.4, -1.6, 1.8, -1.2];
const OFFX = [-7, 6, -5, 7, -6, 5, -4, 6, -7, 5, -3];

export default function PasseportExperience() {
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
          <span>Passeport d&apos;Expérience Uvibes</span>
        </div>

        <h2 className="pp-title v-prompt">
          À votre collectif,<br />
          offrez le{" "}
          <em className="pp-title-em v-serif">Passeport d&apos;Expérience</em>
        </h2>

        <p className="pp-lead">
          Uvibes est la première solution qui permet non seulement de développer
          ses compétences relationnelles, mais aussi de les entraîner dans des échanges
          réels et d&apos;obtenir une reconnaissance de cet engagement.
        </p>

        {/* Triptyque — bulles vibrantes */}
        <div className="pp-trio">
          {(["Apprendre", "Pratiquer", "Être reconnu"] as const).map((label, i) => (
            <span key={label} className="pp-trio-group">
              <span
                className="pp-bubble"
                style={{ "--pb-color": ["#FD6E00", "#D90A5C", "#00AFDD"][i], animationDelay: `${i * 0.65}s` } as React.CSSProperties}
              >
                <span className="pp-bubble-num v-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="pp-bubble-label">{label}</span>
              </span>
              {i < 2 && (
                <span className="pp-trio-chevrons" aria-hidden="true">
                  <span style={{ animationDelay: "0s" }} />
                  <span style={{ animationDelay: "0.18s" }} />
                  <span style={{ animationDelay: "0.36s" }} />
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="pp-subline">
          Chaque passeport est adapté aux enjeux spécifiques de votre public.
        </p>
      </div>

      {/* ── Paquet de passeports ── */}
      <div className="pp-deck">
        {PASSEPORTS.map((p, i) => {
          const open = openId === p.id;
          return (
            <article
              key={p.id}
              className={`pp-card${open ? " pp-card--open" : ""}`}
              style={{
                "--pp-accent": p.accent,
                "--rot": `${ROT[i]}deg`,
                "--tx": `${OFFX[i]}px`,
              } as React.CSSProperties}
              onClick={() => toggle(p.id)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(p.id); }
              }}
            >
              {/* Bande de couleur — identité du passeport */}
              <div className="pp-card-band" aria-hidden="true" />

              {/* En-tête — toujours visible */}
              <div className="pp-card-header">
                <div className="pp-card-header-left">
                  <p className="pp-card-category">{p.category}</p>
                  <h3 className="pp-card-title">{p.title}</h3>
                  <p className="pp-card-tagline">{p.tagline}</p>
                  <div className="pp-card-keywords">
                    {p.keywords.map((kw) => (
                      <span key={kw} className="pp-card-kw">{kw}</span>
                    ))}
                  </div>
                </div>
                <div className="pp-card-header-right">
                  <span className="pp-card-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pp-card-toggle" aria-hidden="true" />
                </div>
              </div>

              {/* Contenu révélé */}
              <div className="pp-card-reveal">
                <div className="pp-card-reveal-inner">
                  <div className="pp-card-block">
                    <p className="pp-card-block-label">Le besoin</p>
                    <p className="pp-card-block-text">{p.besoin}</p>
                  </div>

                  <div className="pp-card-perf" aria-hidden="true" />

                  <div className="pp-card-block">
                    <p className="pp-card-block-label">Axes de développement</p>
                    <ul className="pp-card-list">
                      {p.axes.map((a) => (
                        <li key={a}><span className="pp-card-dot" aria-hidden="true" />{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pp-card-block">
                    <p className="pp-card-block-label">Que peut-on faire de ce passeport ?</p>
                    <ul className="pp-card-list">
                      {p.valoriser.map((v) => (
                        <li key={v}><span className="pp-card-dot" aria-hidden="true" />{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
