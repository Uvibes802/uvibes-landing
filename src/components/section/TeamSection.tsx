"use client";

import useTeamByTag from "@/services/team/team";
import type { TeamProps } from "@/types/team/teamProps";
import { useState } from "react";
import "../../styles/section/TeamSection.css";
import TeamCards from "../cards/teamCards";

// Swiper imports
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function TeamSection() {
  const tabs = [
    { label: "Equipe projet", slug: "equipe-projet" },
    { label: "Comité d'expertise", slug: "comite-expertise" },
    { label: "Architectes du code", slug: "les-architectes-du-code" },
  ];

  const [activeButton, setActiveButton] = useState(tabs[0].slug);
  const team: TeamProps[] = useTeamByTag(activeButton);

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
