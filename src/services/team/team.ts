import { useEffect, useState } from "react";
import { sanitizePlainText } from "@/services/blog/sanitize";
import logoUvibes from "../../../public/images/Logo VI blanc.png";
import type { TeamProps } from "@/types/team/teamProps";

export default function useTeamByTag(slug: string) {
  const [team, setTeam] = useState<TeamProps[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!slug) return;

    fetch(`${apiUrl}/wp-json/wp/v2/tags?slug=${slug}`)
      .then((res) => res.json())
      .then((tags) => {
        const tagId = tags[0]?.id;
        if (!tagId) {
          setTeam([]);
          return;
        }

        return fetch(`${apiUrl}/wp-json/wp/v2/posts?tags=${tagId}&_embed`)
          .then((res) => res.json())
          .then((data) => {
            const mappedTeam = data.map(
              (item: {
                title: { rendered: string };
                content: { rendered: string };
                slug: string;
                _embedded?: {
                  "wp:featuredmedia"?: { source_url?: string }[];
                };
              }) => {
                const image =
                  item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  logoUvibes;

                return {
                  name: sanitizePlainText(item.title.rendered),
                  position: sanitizePlainText(item.content.rendered),
                  image,
                  alt: `Photo de ${sanitizePlainText(item.title.rendered)}`,
                  team: slug,
                };
              }
            );
            setTeam(mappedTeam);
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'équipe :", error);
        setTeam([]);
      });
  }, [slug]);

  return team;
}
