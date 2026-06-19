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
      { src: "/images/affiche/culture/cinema-1.webp", alt: "Affiche Uvibes — public de cinéma" },
      { src: "/images/affiche/culture/spectacle-1.webp", alt: "Affiche Uvibes — spectateurs réunis" },
      { src: "/images/affiche/culture/spectacle-avignon.webp", alt: "Affiche Uvibes — événement culturel" },
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
      { src: "/images/affiche/enseignement/etudiant.webp", alt: "Affiche Uvibes — étudiants" },
      { src: "/images/affiche/enseignement/jpo.webp", alt: "Affiche Uvibes — journée portes ouvertes" },
      { src: "/images/affiche/enseignement/bon-plan.webp", alt: "Affiche Uvibes — vie étudiante" },
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
      { src: "/images/affiche/tourisme/camping-1.webp", alt: "Affiche Uvibes — vacanciers en camping" },
      { src: "/images/affiche/tourisme/camoing-2.webp", alt: "Affiche Uvibes — séjour en camping" },
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
      { src: "/images/affiche/reseaux-business/medef.webp", alt: "Affiche Uvibes — réseau business" },
      { src: "/images/affiche/reseaux-business/artisan-1.webp", alt: "Affiche Uvibes — artisans" },
      { src: "/images/affiche/reseaux-business/artisan-2.webp", alt: "Affiche Uvibes — fédérations professionnelles" },
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
      { src: "/images/affiche/adherents/mutuelle-1.webp", alt: "Affiche Uvibes — adhérents mutuelle" },
      { src: "/images/affiche/adherents/banque-1.webp", alt: "Affiche Uvibes — sociétaires" },
      { src: "/images/affiche/adherents/mutuelle-2.webp", alt: "Affiche Uvibes — collectif mutualiste" },
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
      { src: "/images/affiche/entreprises/equipe.webp", alt: "Affiche Uvibes — équipes en entreprise" },
      { src: "/images/affiche/entreprises/equipe-2.webp", alt: "Affiche Uvibes — collaboration en entreprise" },
      { src: "/images/affiche/entreprises/procedure.webp", alt: "Affiche Uvibes — vie d'équipe" },
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
      { src: "/images/affiche/seniors/senior-1.webp", alt: "Affiche Uvibes — seniors qui se rencontrent" },
      { src: "/images/affiche/seniors/senior-2.webp", alt: "Affiche Uvibes — lien entre seniors" },
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
      { src: "/images/affiche/echanges-pairs/aidant-1.webp", alt: "Affiche Uvibes — échanges entre pairs" },
      { src: "/images/affiche/echanges-pairs/aidant-2.webp", alt: "Affiche Uvibes — soutien entre pairs" },
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
      { src: "/images/affiche/international/ineternation.webp", alt: "Affiche Uvibes — international" },
      { src: "/images/affiche/international/international-2.webp", alt: "Affiche Uvibes — échanges interculturels" },
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
      { src: "/images/affiche/sport/joueur.webp", alt: "Affiche Uvibes — clubs sportifs" },
      { src: "/images/affiche/sport/supporter.webp", alt: "Affiche Uvibes — esprit d'équipe" },
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
      { src: "/images/affiche/insertion/chercheur-1.webp", alt: "Affiche Uvibes — insertion professionnelle" },
      { src: "/images/affiche/insertion/chercheur-2.webp", alt: "Affiche Uvibes — recherche d'emploi" },
      { src: "/images/affiche/insertion/recruteur.webp", alt: "Affiche Uvibes — compétences relationnelles emploi" },
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
  {
    id: "lieu-de-vie",
    name: "Lieu de vie",
    subtitle: "Résidences étudiantes, hôtels, résidences seniors, bailleurs sociaux, sociétés de gestion immobilière, coopératives d'habitat et autres gestionnaires de lieu de vie",
    color: COLORS[5],
    flyers: [
      { src: "/images/affiche/lieu-de-vie/crous.webp", alt: "Affiche Uvibes — résidence étudiante" },
      { src: "/images/affiche/lieu-de-vie/voisin.webp", alt: "Affiche Uvibes — relations de voisinage" },
    ],
    gains: [
      "Une hausse de l'attractivité et la valeur perçue de vos lieux de vie",
      "Des données continues sur les attentes et besoins et usages de vos résidents",
    ],
    pourquoi: [
      "Vous créez un sentiment d'appartenance et un attachement durable au lieu de vie",
      "Vous mettez en place des actions concrètes pour encourager des relations de voisinage positives et harmonieuses",
      "Vous répondez à une aspiration forte : améliorer le lien social",
    ],
  },
  {
    id: "sante",
    name: "Santé et médico-social",
    subtitle: "Hôpitaux, cliniques, Ehpad, maisons de santé, Instituts médico-éducatifs, Associations de patients, Centres de rééducation et de soins de suite",
    color: COLORS[2],
    // TODO affiches Santé dédiées — placeholders « aidant » (contexte soin) en attendant
    flyers: [
      { src: "/images/affiche/echanges-pairs/aidant-1.webp", alt: "Affiche Uvibes — patients et proches" },
      { src: "/images/affiche/echanges-pairs/aidant-2.webp", alt: "Affiche Uvibes — soutien entre pairs en santé" },
    ],
    gains: [
      "Une expérience plus agréable pour les patients et leurs proches pendant les temps d'attente, sans sollicitation supplémentaire de vos équipes.",
      "Une image d'établissement moderne, innovant et attentif au bien-être de ses usagers.",
      "une meilleure compréhension des attentes, usages et dynamiques de vos usagers et de leurs accompagnants",
    ],
    pourquoi: [
      "Vous permettez à des personnes vivant des situations similaires d'échanger et de se soutenir mutuellement.",
      "Vous transformez les temps d'attente en moments de dialogue, de partage et de lien social.",
      "Vous soutenez les aidants familiaux qui accompagnent un proche dans son parcours de soins.",
    ],
  },
];
