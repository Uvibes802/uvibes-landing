export type FlyerCategory = "Sport" | "Professionnel" | "Étudiant" | "Aidants" | "Loisirs" | "Associations";

export interface Flyer {
  id: number;
  src: string;
  alt: string;
  category: FlyerCategory;
  label: string;
}

export const flyers: Flyer[] = [
  {
    id: 1,
    src: "/images/flyer/flyer-etudiant-campus.jpg",
    alt: "Étudiants sur un campus utilisant Uvibes",
    category: "Étudiant",
    label: "Étudiants",
  },
  {
    id: 2,
    src: "/images/flyer/flyer-etudiant-expert.jpg",
    alt: "Étudiants en classe connectés via Uvibes",
    category: "Étudiant",
    label: "Étudiants",
  },
  {
    id: 3,
    src: "/images/flyer/flyer-universite.jpg",
    alt: "Étudiants internationaux connectés par Uvibes",
    category: "Étudiant",
    label: "Universités",
  },
  {
    id: 4,
    src: "/images/flyer/flyer-recrutement.jpg",
    alt: "Recrutement via Uvibes — une vraie rencontre",
    category: "Professionnel",
    label: "Recruteurs / RH",
  },
  {
    id: 5,
    src: "/images/flyer/flyer-emploi-chercheur.jpg",
    alt: "Chercheurs d'emploi qui avancent ensemble avec Uvibes",
    category: "Professionnel",
    label: "Chercheurs d'emploi",
  },
  {
    id: 6,
    src: "/images/flyer/flyer-collaboration.jpg",
    alt: "Collègues qui collaborent mieux grâce à Uvibes",
    category: "Professionnel",
    label: "Équipes en entreprise",
  },
  {
    id: 7,
    src: "/images/flyer/flyer-artisan-reseau.jpg",
    alt: "Artisan qui développe son réseau avec Uvibes",
    category: "Professionnel",
    label: "Artisans & indépendants",
  },
  {
    id: 8,
    src: "/images/flyer/flyer-artisan-ville.jpg",
    alt: "Artisans locaux connectés par Uvibes",
    category: "Professionnel",
    label: "Artisans & indépendants",
  },
  {
    id: 9,
    src: "/images/flyer/flyer-rugby-senior.jpg",
    alt: "Fan de rugby senior utilisant Uvibes à la mi-temps",
    category: "Sport",
    label: "Supporters",
  },
  {
    id: 10,
    src: "/images/flyer/flyer-rugby-jeune.jpg",
    alt: "Fan de rugby utilisant Uvibes pour débattre du match",
    category: "Sport",
    label: "Supporters",
  },
  {
    id: 11,
    src: "/images/flyer/flyer-rugby-usap.jpg",
    alt: "Supporter USAP utilisant Uvibes à la mi-temps",
    category: "Sport",
    label: "Supporters",
  },
  {
    id: 12,
    src: "/images/flyer/flyer-aidants-puzzle.jpg",
    alt: "Aidants qui s'assemblent grâce à Uvibes",
    category: "Aidants",
    label: "Aidants",
  },
  {
    id: 13,
    src: "/images/flyer/flyer-aidants-seul.jpg",
    alt: "Aidants soutenus par la communauté Uvibes",
    category: "Aidants",
    label: "Aidants",
  },
  {
    id: 14,
    src: "/images/flyer/flyer-association.jpg",
    alt: "Association valorisée par Uvibes",
    category: "Associations",
    label: "Associations",
  },
  {
    id: 15,
    src: "/images/flyer/flyer-senior.jpg",
    alt: "Seniors qui font de belles rencontres avec Uvibes",
    category: "Associations",
    label: "Seniors",
  },
  {
    id: 16,
    src: "/images/flyer/flyer-cinema.jpg",
    alt: "Spectateurs de cinéma qui continuent la conversation avec Uvibes",
    category: "Loisirs",
    label: "Cinéma",
  },
  {
    id: 17,
    src: "/images/flyer/flyer-theatre.jpg",
    alt: "Spectateurs de théâtre connectés à l'artiste via Uvibes",
    category: "Loisirs",
    label: "Spectacles",
  },
  {
    id: 18,
    src: "/images/flyer/flyer-camping.jpg",
    alt: "Vacanciers en camping connectés par Uvibes",
    category: "Loisirs",
    label: "Camping & tourisme",
  },
];

export const flyerCategories: FlyerCategory[] = [
  "Étudiant",
  "Professionnel",
  "Sport",
  "Aidants",
  "Associations",
  "Loisirs",
];
