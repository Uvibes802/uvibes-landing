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

const CAT_LABELS_ES: Record<string, string> = {
  "Équipe projet": "Equipo del proyecto",
  "Comité d'expertise": "Comité de expertos",
  "Architectes du code": "Arquitectos del código",
};

const CAT_LABELS_DE: Record<string, string> = {
  "Équipe projet": "Projektteam",
  "Comité d'expertise": "Expertengremium",
  "Architectes du code": "Code-Architekten",
};

const CAT_LABELS_IT: Record<string, string> = {
  "Équipe projet": "Team del progetto",
  "Comité d'expertise": "Comitato di esperti",
  "Architectes du code": "Architetti del codice",
};

const CAT_LABELS_PT: Record<string, string> = {
  "Équipe projet": "Equipa do projeto",
  "Comité d'expertise": "Comité de especialistas",
  "Architectes du code": "Arquitetos do código",
};

const CAT_LABELS_RU: Record<string, string> = {
  "Équipe projet": "Команда проекта",
  "Comité d'expertise": "Экспертный совет",
  "Architectes du code": "Архитекторы кода",
};

const CAT_LABELS_ZH: Record<string, string> = {
  "Équipe projet": "项目团队",
  "Comité d'expertise": "专家委员会",
  "Architectes du code": "代码架构师",
};

const CAT_LABELS_JA: Record<string, string> = {
  "Équipe projet": "プロジェクトチーム",
  "Comité d'expertise": "専門委員会",
  "Architectes du code": "コードアーキテクト",
};

const CAT_LABELS_HI: Record<string, string> = {
  "Équipe projet": "प्रोजेक्ट टीम",
  "Comité d'expertise": "विशेषज्ञ समिति",
  "Architectes du code": "कोड आर्किटेक्ट",
};

const CAT_LABELS_AR: Record<string, string> = {
  "Équipe projet": "فريق المشروع",
  "Comité d'expertise": "لجنة الخبراء",
  "Architectes du code": "مهندسو الشيفرة البرمجية",
};

const CAT_LABELS_BY_LOCALE: Record<string, Record<string, string>> = {
  en: CAT_LABELS_EN, es: CAT_LABELS_ES, de: CAT_LABELS_DE, it: CAT_LABELS_IT, pt: CAT_LABELS_PT,
  ru: CAT_LABELS_RU, zh: CAT_LABELS_ZH, ja: CAT_LABELS_JA, hi: CAT_LABELS_HI, ar: CAT_LABELS_AR,
};

const TS_EMPTY_TXT: Record<string, string> = {
  en: "Data is being updated",
  es: "Datos en proceso de actualización",
  de: "Daten werden aktualisiert",
  it: "Dati in fase di aggiornamento",
  pt: "Dados em atualização",
  ru: "Данные обновляются",
  zh: "数据正在更新中",
  ja: "データを更新中です",
  hi: "डेटा अपडेट किया जा रहा है",
  ar: "البيانات قيد التحديث",
};

export default function TeamSection({ locale = "fr" }: { locale?: string }) {
  // Onglets dynamiques : pilotés depuis l'admin (clé CMS "team-categories")
  const [cats, setCats] = useState<string[]>(DEFAULT_CATS);
  const [activeButton, setActiveButton] = useState(DEFAULT_CATS[0]);
  const team: TeamProps[] = useTeamByTag(activeButton);

  // Carrousel forcé en mobile (même avec peu de membres) → la section prend moins de place
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
  const catLabels = CAT_LABELS_BY_LOCALE[locale];
  const tabs = cats.map((c) => ({ label: catLabels ? (catLabels[c] ?? c) : c, slug: c }));
  const useCarousel = team.length > 4 || (isMobile && team.length > 1);

  const renderMembers = () => {
    if (useCarousel) {
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
          {TS_EMPTY_TXT[locale] ?? "Données en cours de mise à jour"}
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
      <div className={`uvibes-teamSection-members ${useCarousel ? 'is-carousel' : ''}`}>
        {renderMembers()}
      </div>
    </section>
  );
}
