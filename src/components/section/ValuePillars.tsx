"use client";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/section/valuePillars.css";

const pillars = [
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
    body: "Accédez à des données en temps réel pour augmenter l'efficacité de vos actions. Pas un rapport de 40 pages, juste ce qu'il faut pour agir.",
    stat: "< 5 min",
    statLabel: "pour connaître chaque semaine les dynamiques de votre collectif",
  },
];

export default function ValuePillars() {
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`pillars-section${vis ? " pillars-visible" : ""}`} ref={ref}>

      <div className="pillars-header">
        <p className="pillars-kicker v-mono">
          <span className="pillars-kicker-dot" aria-hidden="true" />
          Uvibes, moteur d&apos;engagement et de performance dans votre organisation
        </p>
        <h2 className="pillars-title">
          Un seul outil pour{" "}
          <strong className="pillars-strong--gradient">renforcer votre collectif</strong>
          {" "}et{" "}
          <strong className="pillars-strong--gradient">guider vos choix stratégiques</strong>.
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
