export interface Collectif {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  flyers: { src: string; alt: string }[];
  gains: string[];
  pourquoi: string[];
}

// Rotation des 6 couleurs Uvibes
const COLORS = [
  "#fd6e00", // orange
  "#d90a5c", // rose
  "#00AFDD", // bleu
  "#78c751", // vert
  "#feb000", // amber
  "#800080", // violet
];

export const collectifs: Collectif[] = [
  {
    id: "culture",
    name: "Culture",
    subtitle: "Cinémas, salles de spectacle, événements",
    color: COLORS[0],
    flyers: [
      { src: "/images/flyer/flyer-culture-1.webp", alt: "Affiche Uvibes — public culturel" },
      { src: "/images/flyer/flyer-culture-2.webp", alt: "Affiche Uvibes — spectateurs réunis" },
      { src: "/images/flyer/flyer-culture-3.webp", alt: "Affiche Uvibes — événement culturel" },
    ],
    gains: [
      "Une hausse de la fréquentation",
      "Des données continues sur les attentes et comportements des spectateurs",
    ],
    pourquoi: [
      "Vous activez les recommandations naturelles",
      "Vous augmentez l'impact émotionnel du film ou du spectacle",
      "Vous répondez aux envies des spectateurs solo",
    ],
  },
  {
    id: "enseignement",
    name: "Enseignement",
    subtitle: "Universités, écoles de commerce, grandes écoles",
    color: COLORS[1],
    flyers: [
      { src: "/images/flyer/flyer-etudiant-1.webp", alt: "Affiche Uvibes — étudiants" },
      { src: "/images/flyer/flyer-etudiant-2.webp", alt: "Affiche Uvibes — vie étudiante" },
      { src: "/images/flyer/flyer-crous.webp", alt: "Affiche Uvibes — résidence universitaire (Crous)" },
    ],
    gains: [
      "Une attractivité renforcée auprès des futurs étudiants",
      "Des données continues sur les attentes et comportements des étudiants",
    ],
    pourquoi: [
      "Vous créez des liens entre étudiants",
      "Vous facilitez leur insertion professionnelle",
      "Vous activez les recommandations naturelles",
    ],
  },
  {
    id: "tourisme",
    name: "Tourisme",
    subtitle: "Campings, villages vacances, sites touristiques",
    color: COLORS[2],
    flyers: [
      { src: "/images/flyer/flyer-camping-1.webp", alt: "Affiche Uvibes — vacanciers en camping" },
      { src: "/images/flyer/flyer-camping-2.webp", alt: "Affiche Uvibes — séjour en camping" },
    ],
    gains: [
      "Une hausse de la fréquentation",
      "Des données continues sur les attentes et comportements des vacanciers",
    ],
    pourquoi: [
      "Vous renforcez l'expérience émotionnelle vécue pendant le séjour",
      "Vous créez un attachement durable à votre lieu",
      "Vous captez davantage l'attention des adolescents et des jeunes publics",
    ],
  },
  {
    id: "reseaux-business",
    name: "Réseaux Business",
    subtitle: "Clubs d'entreprises, dirigeants, artisans, fédérations professionnelles",
    color: COLORS[3],
    flyers: [
      { src: "/images/flyer/flyer-medef.webp", alt: "Affiche Uvibes — Medef" },
      { src: "/images/flyer/flyer-artisan-1.webp", alt: "Affiche Uvibes — artisans" },
      { src: "/images/flyer/flyer-artisan-chambre-1.webp", alt: "Affiche Uvibes — chambre des métiers" },
    ],
    gains: [
      "Une participation plus active de vos membres",
      "Une vision continue des besoins, attentes et dynamiques du réseau",
    ],
    pourquoi: [
      "Vous activez la confiance entre les membres",
      "Vous lancez des échanges utiles, orientés business",
      "Sur un temps court, vous faites émerger des opportunités professionnelles",
    ],
  },
  {
    id: "adherents",
    name: "Adhérents & Sociétaires",
    subtitle: "Mutuelles, entreprises coopératives, associations",
    color: COLORS[4],
    flyers: [
      { src: "/images/flyer/flyer-societaire-1.webp", alt: "Affiche Uvibes — sociétaires mutuelle" },
      { src: "/images/flyer/flyer-societaire-2.webp", alt: "Affiche Uvibes — sociétaires banque" },
    ],
    gains: [
      "Un sentiment d'appartenance à votre organisation",
      "Une vision continue des besoins, attentes et dynamiques de votre collectif",
    ],
    pourquoi: [
      "Vous créez un lien affectif avec votre organisation",
      "Vous valorisez et stimulez l'engagement au sein du collectif",
    ],
  },
  {
    id: "entreprises",
    name: "Entreprises & Équipes",
    subtitle: "Entreprises en présentiel, télétravail, multi-sites",
    color: COLORS[5],
    flyers: [
      { src: "/images/flyer/flyer-entreprise-1.webp", alt: "Affiche Uvibes — équipes en entreprise" },
      { src: "/images/flyer/flyer-entreprise-2.webp", alt: "Affiche Uvibes — collaboration en entreprise" },
      { src: "/images/flyer/flyer-entreprise-3.webp", alt: "Affiche Uvibes — vie d'équipe" },
    ],
    gains: [
      "Un sentiment d'appartenance à votre organisation",
      "Davantage de recommandations et d'ambassadeurs internes",
      "Un engagement accru au sein de vos équipes",
      "Une vision continue des besoins, attentes et dynamiques de vos équipes",
    ],
    pourquoi: [
      "Vous générez des expériences positives associées à votre entreprise",
      "Vous diffusez naturellement votre culture d'entreprise",
      "Vous structurez des expériences courtes, utiles et maîtrisées dans le temps",
    ],
  },
  {
    id: "seniors",
    name: "Seniors",
    subtitle: "Caisses de retraites, associations, collectivités locales",
    color: COLORS[0],
    flyers: [
      { src: "/images/flyer/flyer-senior-1.webp", alt: "Affiche Uvibes — seniors qui se rencontrent" },
      { src: "/images/flyer/flyer-senior-2.webp", alt: "Affiche Uvibes — lien entre seniors" },
    ],
    gains: [
      "Un sentiment d'appartenance à votre caisse de retraite",
      "Une meilleure compréhension des besoins et attentes de vos assurés",
    ],
    pourquoi: [
      "Vous créez des liens entre assurés",
      "Vous valorisez le rôle et l'expérience de vos publics",
    ],
  },
  {
    id: "echanges-pairs",
    name: "Échanges entre pairs",
    subtitle: "Collectivités, hôpitaux, cliniques, associations — parents isolés, aidants, personnes en parcours de soin",
    color: COLORS[1],
    flyers: [
      { src: "/images/flyer/flyer-aidant-1.webp", alt: "Affiche Uvibes — aidants qui s'assemblent" },
      { src: "/images/flyer/flyer-aidant-2.webp", alt: "Affiche Uvibes — aidants soutenus" },
    ],
    gains: [
      "La création d'un collectif jusqu'ici inexistant",
      "Une vision continue des besoins, attentes et dynamiques de vos publics",
    ],
    pourquoi: [
      "Vous répondez à un besoin fort de partage et de soutien entre pairs",
      "Vous encouragez l'entraide et la solidarité au sein du collectif",
      "Vous proposez des expériences courtes, accessibles et faciles à intégrer au quotidien",
    ],
  },
  {
    id: "international",
    name: "International",
    subtitle: "Entreprises, établissements publics, collectivités et organisations internationales",
    color: COLORS[2],
    flyers: [
      { src: "/images/flyer/flyer-etudiant-international.webp", alt: "Affiche Uvibes — étudiants internationaux" },
    ],
    gains: [
      "La création de liens et d'un collectif au-delà des frontières",
      "Une vision continue des besoins, attentes et dynamiques de vos publics internationaux",
      "Le renforcement de la collaboration interculturelle et du sentiment d'appartenance",
    ],
    pourquoi: [
      "Vous reliez des gens qui n'auraient pas eu l'occasion d'échanger autrement",
      "Vous proposez des expériences courtes, multilingues et faciles à intégrer au quotidien",
    ],
  },
  {
    id: "sport",
    name: "Sport",
    subtitle: "Clubs sportifs, fédérations et organisateurs de compétitions",
    color: COLORS[3],
    flyers: [
      { src: "/images/flyer/flyer-rugby-supporter.webp", alt: "Affiche Uvibes — supporters de rugby" },
      { src: "/images/flyer/flyer-rugby-joueur.webp", alt: "Affiche Uvibes — joueurs de rugby" },
    ],
    gains: [
      "Une expérience spectateur plus différenciante et engageante",
      "Un renforcement du lien entre le club, les supporters, les joueurs et le territoire",
      "Une meilleure compréhension des attentes, usages et dynamiques de vos spectateurs",
    ],
    pourquoi: [
      "Vous amplifiez l'impact émotionnel vécu autour des matchs",
      "Vous proposez des expériences d'échanges auxquelles les joueurs peuvent prendre part",
    ],
  },
  {
    id: "insertion",
    name: "Insertion Professionnelle",
    subtitle: "France Travail, Missions Locales, Cap Emploi, APEC, AFPA, structures d'insertion",
    color: COLORS[4],
    flyers: [
      { src: "/images/flyer/flyer-france-travail-1.webp", alt: "Affiche Uvibes — France Travail, recruteurs" },
      { src: "/images/flyer/flyer-france-travail-2.webp", alt: "Affiche Uvibes — France Travail, chercheurs d'emploi" },
      { src: "/images/flyer/flyer-france-travail-3.webp", alt: "Affiche Uvibes — insertion professionnelle" },
    ],
    gains: [
      "Le développement des compétences relationnelles et comportementales",
      "Une meilleure mise en relation entre les candidats et les structures recruteuses",
      "Une valorisation des profils au-delà du CV et du parcours classique",
    ],
    pourquoi: [
      "Vous offrez un terrain d'entraînement concret et régulier pour développer les soft skills",
      "Vous organisez des entretiens professionnels qui permettent d'évaluer plus finement les compétences relationnelles",
    ],
  },
];
