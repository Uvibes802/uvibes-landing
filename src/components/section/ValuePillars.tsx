"use client";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/section/valuePillars.css";

const pillarsFr = [
  {
    id: "federer",
    num: "01",
    accentColor: "#F4621F",
    label: "01 · Pilier",
    title: "Fédérer",
    titleEt: "et",
    titleSuffix: "engager",
    body: "Créez un sentiment d'appartenance fort à votre organisation. Celui-ci naît rarement dans les réunions : il se construit au quotidien, à travers les échanges informels. Uvibes renforce l'identité collective et fédère autour d'une vision commune.",
    stat: "x4",
    statLabel: "d'engagement dans les organisations où le sentiment d'appartenance est fort",
  },
  {
    id: "piloter",
    num: "02",
    accentColor: "#E8196A",
    label: "02 · Pilier",
    title: "Piloter",
    titleEt: "et",
    titleSuffix: "décider",
    body: "Prenez les bonnes décisions au bon moment. Celles-ci naissent rarement de rapports de 40 pages : elles s'appuient sur des informations pertinentes, accessibles lorsque vous en avez besoin. Uvibes vous apporte la visibilité nécessaire pour agir efficacement.",
    stat: "< 5 min",
    statLabel: "pour connaître chaque semaine les dynamiques de votre collectif",
  },
];

const pillarsEn = [
  {
    id: "federer",
    num: "01",
    accentColor: "#F4621F",
    label: "01 · Pillar",
    title: "Unite",
    titleEt: "and",
    titleSuffix: "engage",
    body: "Build a real sense of belonging in your organization. It rarely happens in meetings — it's built day after day, through informal exchanges. Uvibes strengthens collective identity and rallies people around a shared vision.",
    stat: "x4",
    statLabel: "more engagement in organizations with a strong sense of belonging",
  },
  {
    id: "piloter",
    num: "02",
    accentColor: "#E8196A",
    label: "02 · Pillar",
    title: "Steer",
    titleEt: "and",
    titleSuffix: "decide",
    body: "Make the right call at the right time. Good decisions rarely come from 40-page reports — they rely on relevant information, available exactly when you need it. Uvibes gives you the visibility to act effectively.",
    stat: "< 5 min",
    statLabel: "a week to know exactly how your community is doing",
  },
];

export default function ValuePillars({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const pillars = locale === "en" ? pillarsEn : pillarsFr;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`pillars-section${vis ? " pillars-visible" : ""}`} ref={ref}>

      <div className="pillars-header">
        <p className="pillars-kicker v-mono">
          <span className="pillars-kicker-dot" aria-hidden="true" />
          {locale === "en"
            ? "Uvibes, an engagement and performance engine for your organization"
            : <>Uvibes, moteur d&apos;engagement et de performance dans votre organisation</>}
        </p>
        <h2 className="pillars-title">
          {locale === "en" ? (
            <>
              One tool to{" "}
              <strong className="pillars-strong--gradient">strengthen your community</strong>
              {" "}and{" "}
              <strong className="pillars-strong--gradient">guide your strategic choices</strong>.
            </>
          ) : (
            <>
              Un seul outil pour{" "}
              <strong className="pillars-strong--gradient">renforcer votre collectif</strong>
              {" "}et{" "}
              <strong className="pillars-strong--gradient">guider vos choix stratégiques</strong>.
            </>
          )}
        </h2>
      </div>

      <div className="pillars-cards-wrap">
        {/* Lignes de vibration — partagées par les 2 cartes */}
        <div className="pillars-lines-bg" aria-hidden="true">
          <div className="pillars-vline pillars-vline--1">
            <GradientVibrationLine id="vl-pillar-1" strokeWidth={36} amplitude={22} speed={12} colorFrom="#F4621F" colorTo="#E8196A" />
          </div>
          <div className="pillars-vline pillars-vline--2">
            <GradientVibrationLine id="vl-pillar-2" strokeWidth={36} amplitude={18} speed={17} colorFrom="#E8196A" colorTo="#FD6E00" />
          </div>
        </div>

        <div className="pillars-grid">
        {pillars.map((p) => (
          <div
            key={p.id}
            className="pillar-card"
            style={{ "--p-accent": p.accentColor } as React.CSSProperties}
          >
            <span className="pillar-watermark" aria-hidden="true">{p.num}</span>

            <h3 className="pillar-title">
              {p.title}{" "}
              <span className="pillar-title-et v-serif">{p.titleEt}</span>{" "}
              {p.titleSuffix}
            </h3>

            <p className="pillar-body">{p.body}</p>

            <div className="pillar-stat-block">
              <hr className="pillar-hr" />
              <div className="pillar-stat-row">
                <span className="pillar-stat">{p.stat}</span>
                <span className="pillar-stat-label">{p.statLabel}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
