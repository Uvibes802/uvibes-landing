"use client";

import { TestimonyCardProps } from "@/components/cards/testimonyCard";
import { useEffect, useState } from "react";
import { sanitizeText } from "../blog/sanitize";

export type Testimony = {
  id: number;
  title: { rendered: string };
  acf: {
    auteur_temoignage: string;
    role_et_entreprise_temoignage: string;
  };
};

const FALLBACK_TESTIMONIES: TestimonyCardProps[] = [
  {
    id: 1,
    testimony: "Uvibes a créé une vraie dynamique dans notre équipe. En 10 minutes, des collègues qui se côtoyaient depuis des années ont découvert qu'ils avaient des passions communes.",
    auteur_temoignage: "Marie-Claire D.",
    role_et_entreprise_temoignage: "Directrice des Ressources Humaines — Groupe industriel",
  },
  {
    id: 2,
    testimony: "Ce qui m'a surpris, c'est la facilité avec laquelle des étudiants de cultures très différentes ont pu échanger. Uvibes a vraiment brisé les barrières.",
    auteur_temoignage: "Pr. Jean-Luc M.",
    role_et_entreprise_temoignage: "Responsable vie étudiante — Université",
  },
  {
    id: 3,
    testimony: "Nos adhérents se sentaient isolés. Depuis qu'on utilise Uvibes lors de nos événements, ils repartent avec de nouvelles rencontres et l'envie de revenir.",
    auteur_temoignage: "Isabelle R.",
    role_et_entreprise_temoignage: "Coordinatrice — Association seniors",
  },
];

export default function FetchTestimony() {
  const [testimonies, setTestimonies] = useState<TestimonyCardProps[]>(FALLBACK_TESTIMONIES);

  useEffect(() => {
    const fetchTestimony = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) return;
        const data = await res.json();
        if (!data || data.length === 0) return;
        const processed = data.map((t: Testimony) => ({
          id: t.id,
          testimony: sanitizeText(t.title.rendered),
          auteur_temoignage: sanitizeText(t.acf?.auteur_temoignage ?? ""),
          role_et_entreprise_temoignage: sanitizeText(t.acf?.role_et_entreprise_temoignage ?? ""),
        }));
        setTestimonies(processed);
      } catch {
        // Garde les fallback
      }
    };
    fetchTestimony();
  }, []);

  return testimonies;
}
