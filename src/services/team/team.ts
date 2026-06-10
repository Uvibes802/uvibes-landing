import { useEffect, useState } from "react";
import logoUvibes from "../../../public/images/Logo VI blanc.png";
import type { TeamProps } from "@/types/team/teamProps";

// Équipe servie par la DB via /api/team (same-origin) — plus de fetch WordPress.
// `categorie` correspond à l'onglet (catégorie d'équipe).
export default function useTeamByTag(categorie: string) {
  const [team, setTeam] = useState<TeamProps[]>([]);

  useEffect(() => {
    if (!categorie) return;

    fetch(`/api/team?equipe=${encodeURIComponent(categorie)}`)
      .then((res) => res.json())
      .then((data: { name: string; position: string; image: string | null; team: string }[]) => {
        setTeam(
          (data ?? []).map((m) => ({
            name: m.name,
            position: m.position,
            image: m.image || logoUvibes,
            alt: `Photo de ${m.name}`,
            team: m.team,
          }))
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'équipe :", error);
        setTeam([]);
      });
  }, [categorie]);

  return team;
}
