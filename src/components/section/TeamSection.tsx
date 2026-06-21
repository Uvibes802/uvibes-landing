"use client";

import useTeamByTag from "@/services/team/team";
import type { TeamProps } from "@/types/team/teamProps";
import { useEffect, useState } from "react";
import "../../styles/section/TeamSection.css";
import TeamCards from "../cards/teamCards";

// Swiper imports
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Catégories par défaut si l'API ne répond pas (slug = valeur exacte de TeamMember.equipe)
const DEFAULT_CATS = ["Équipe projet", "Comité d'expertise", "Architectes du code"];

// Libellés affichés en anglais — le slug (valeur DB TeamMember.equipe) reste en français.
const CAT_LABELS_EN: Record<string, string> = {
  "Équipe projet": "Project team",
  "Comité d'expertise": "Advisory board",
  "Architectes du code": "Code architects",
};

export default function TeamSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  // Onglets dynamiques : pilotés depuis l'admin (clé CMS "team-categories")
  const [cats, setCats] = useState<string[]>(DEFAULT_CATS);
  const [activeButton, setActiveButton] = useState(DEFAULT_CATS[0]);
  const team: TeamProps[] = useTeamByTag(activeButton);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        try {
          const parsed = JSON.parse(s["team-categories"]);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCats(parsed);
            setActiveButton(parsed[0]);
          }
        } catch { /* garde les défauts */ }
      })
      .catch(() => {});
  }, []);

  // Le slug (utilisé pour filtrer en base) reste la valeur FR — seul le libellé affiché change.
  const tabs = cats.map((c) => ({ label: locale === "en" ? (CAT_LABELS_EN[c] ?? c) : c, slug: c }));

  const renderMembers = () => {
    if (team.length > 4) {
      return (
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={"auto"}
          centeredSlides={true}
          navigation={true}
          pagination={{ clickable: true }}
          className="team-swiper"
        >
          {team.map((member) => (
            <SwiperSlide key={member.name} style={{ width: 'auto' }}>
              <TeamCards
                image={member.image}
                alt={member.alt}
                name={member.name}
                position={member.position}
                team={member.team}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    if (team.length === 0) {
      return (
        <div className="team-empty-state">
          <span className="team-empty-state__icon">🔄</span>
          {locale === "en" ? "Data is being updated" : "Données en cours de mise à jour"}
        </div>
      );
    }
    return team.map((member) => (
      <TeamCards
        key={member.name}
        image={member.image}
        alt={member.alt}
        name={member.name}
        position={member.position}
        team={member.team}
      />
    ));
  };

  return (
    <section className="uvibes-teamSection-container">
      <div className="uvibes-teamSection-button">
        <div
          className="uvibes-button-slider"
          style={{
            left: `${
              (tabs.findIndex((tab) => tab.slug === activeButton) * 100) /
              tabs.length
            }%`,
            width: `${100 / tabs.length}%`,
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            className={`uvibes-button ${
              activeButton === tab.slug ? "active" : ""
            }`}
            onClick={() => setActiveButton(tab.slug)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`uvibes-teamSection-members ${team.length > 4 ? 'is-carousel' : ''}`}>
        {renderMembers()}
      </div>
    </section>
  );
}
