import Footer from "@/components/footer/Footer";
import { getVideoUrl } from "@/utils/videoUrl";
import JsonLd from "@/components/JsonLd";
import TeamSection from "@/components/section/TeamSection";
import WhyName from "@/components/uvibes/WhyName";
import HelloAssoDon from "@/components/uvibes/HelloAssoDon";
import VibrationLine from "@/components/shared/VibrationLine";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WaveSeparator from "@/components/shared/WaveSeparator";
import "../../styles/page/uvibes.css";

export const metadata: Metadata = buildMetadata("uvibes");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description: "Uvibes est une innovation socio-digitale qui active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain.",
  foundingDate: "2022",
  sameAs: ["https://www.linkedin.com/company/uvibes", "https://www.instagram.com/uvibes_app"],
};

const ETHICS = [
  { num: "01", title: "Respect & confidentialité", text: "Un service digital respectueux, pensé pour la qualité des discussions, l'inclusion et la protection des données de chaque membre." },
  { num: "02", title: "Collaboration & écoute", text: "Une conduite de projet alignée avec nos valeurs — basée sur l'écoute active, la co-construction et la responsabilité collective." },
  { num: "03", title: "Partenariats responsables", text: "Des partenaires choisis pour leur transparence, leur impact positif et leur engagement sociétal — pas pour leur seule notoriété." },
];

const VALUES = [
  "La magie des témoignages partagés",
  "La richesse des expériences personnelles",
  "La force des visions nouvelles et inattendues",
];

export default function Uvibes() {
  return (
    <main className="uv-page">
      <JsonLd data={organizationJsonLd} />

      {/* ── Hero Uvibes ── */}
      <section className="uv-hero">
        <div className="uv-hero-blob uv-hero-blob--a" aria-hidden="true" />
        <div className="uv-hero-blob uv-hero-blob--b" aria-hidden="true" />
        <div className="uv-hero-blob uv-hero-blob--c" aria-hidden="true" />
        <div className="uv-hero-blob uv-hero-blob--d" aria-hidden="true" />
        {/* Lignes flottantes — style différent des autres pages */}
        <div className="uv-hero-lines" aria-hidden="true">
          <span className="uvl uvl--1" />
          <span className="uvl uvl--2" />
          <span className="uvl uvl--3" />
          <span className="uvl uvl--4" />
          <span className="uvl uvl--5" />
        </div>
        {/* Particules rondes + carrés */}
        <div className="uv-hero-pars" aria-hidden="true">
          <span className="uvp uvp--1" />
          <span className="uvp uvp--2" />
          <span className="uvp uvp--3" />
          <span className="uvp uvp--4" />
          <span className="uvp uvp--5" />
          <span className="uvp uvp--6" />
        </div>

        <div className="uv-hero-inner">
          <p className="uv-hero-eyebrow">À propos d&apos;Uvibes</p>
          <h1 className="uv-hero-title v-prompt">
            Qui donne vie<br />
            <em className="uv-hero-em">à Uvibes&nbsp;?</em>
          </h1>
          <p className="uv-hero-sub">
            Découvrez les personnes et les idées qui font grandir Uvibes
          </p>
        </div>

        {/* VibrationLine bas du hero */}
        <div className="uv-hero-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={18} freq={9} stroke="rgba(255,255,255,.3)" strokeWidth={1.5} speed={16} />
          <VibrationLine width={1800} height={50} amplitude={11} freq={14} stroke="rgba(255,255,255,.18)" strokeWidth={1} speed={22} />
        </div>
        {/* Couche avant accordée au fond chaud de la page (uv-page) sous le hero */}
        <WaveSeparator position="bottom" color="#FFF6EC" />
      </section>

      {/* ── Pourquoi « Uvibes » ? ── */}
      <WhyName />

      {/* ── Intro ── */}
      <section className="uv-intro">
        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />La naissance de l&apos;idée</p>
            <h2 className="uv-intro-title">
              Et si on se<br />
              <em className="uv-serif-accent">parlait vraiment&nbsp;?</em>
            </h2>
            <p className="uv-intro-lead">
              La plus longue étude menée par Harvard montre que la qualité de nos relations est le <em className="uv-em-orange">premier facteur de bonheur</em>.
            </p>
            <p className="uv-intro-body">
              Sur les réseaux sociaux, les algorithmes nous relient à ceux qui pensent comme nous. Dans la vraie vie, on reste entre groupes familiers et, petit à petit, on perd la richesse de la diversité humaine.
              <br /><br />
              Uvibes facilite ces rencontres inattendues, par un jeu de questions ouvertes et positives. Parce que c&apos;est en allant vers l&apos;<em className="uv-em-rose">inconnu</em> que naissent les plus <em className="uv-em-orange">belles conversations</em>.
            </p>
            <div className="uv-intro-values">
              {VALUES.map((v) => (
                <div key={v} className="uv-value-item">
                  <span className="uv-value-icon" aria-hidden="true" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Vidéo témoignage — Delphine */}
          <div className="uv-intro-media">
            <video src={getVideoUrl("Delphine-desktop.mp4")} autoPlay muted loop playsInline className="uv-intro-media__el" />
            <div className="uv-intro-media__label">Delphine · Responsable collectif</div>
          </div>
        </div>
      </section>

      {/* ── Équipe ── */}
      <section className="uv-team">
        {/* Ondes de vibration animées en fond */}
        <div className="uv-waves" aria-hidden="true">
          <GradientVibrationLine id="uv-tw1" width={1800} height={70} amplitude={30} freq={5} strokeWidth={22} speed={10} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
          <GradientVibrationLine id="uv-tw2" width={1800} height={70} amplitude={24} freq={7} strokeWidth={15} speed={14} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
          <GradientVibrationLine id="uv-tw3" width={1800} height={70} amplitude={34} freq={4} strokeWidth={18} speed={12} colorFrom="#E6007E" colorTo="#FD6E00" style={{ width: "100%" }} />
        </div>
        <div className="uv-team-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Sa concrétisation</p>
            <h2 className="uv-section-title uv-section-title--magenta">L&apos;équipe derrière <em className="uv-serif-grad">Uvibes</em></h2>
          </div>
          <TeamSection />
        </div>
      </section>

      {/* ── Éthique ── */}
      <section className="uv-ethics">
        <div className="uv-ethics-inner">
          <div className="uv-ethics-header">
            <div className="uv-ethics-header__text">
              <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Notre engagement</p>
              <h2 className="uv-section-title">Une <em className="uv-serif-grad">éthique</em> au cœur du projet</h2>
            </div>
            <div className="uv-ethics-polaroid">
              <video src={getVideoUrl("Isaline-desktop.mp4")} autoPlay muted loop playsInline className="uv-ethics-polaroid__img" />
            </div>
          </div>
          <div className="uv-ethics-grid">
            {ETHICS.map((e) => (
              <div key={e.num} className="uv-ethics-card">
                <span className="uv-ethics-num">{e.num}</span>
                <h3 className="uv-ethics-card-title">{e.title}</h3>
                <p className="uv-ethics-card-text">{e.text}</p>
              </div>
            ))}
          </div>

          {/* Vidéo Lisa — déplacée sous les 3 cartes */}
          <div className="uv-team-vid-wrap">
            <video src={getVideoUrl("Lisa-desktop.mp4")} autoPlay muted loop playsInline className="uv-team-vid-el" />
            <div className="uv-team-vid-label">Lisa · Professionnelle RH</div>
          </div>
        </div>
      </section>

      {/* Wrapper Don + Footer seamless (sur le dégradé) */}
      <div style={{ background: "linear-gradient(160deg, #FD6E00 0%, #FF6030 18%, #FF6098 45%, #E6007E 70%, #D90A5C 100%)", position: "relative", overflow: "hidden" }}>

      {/* Couche avant accordée au fond de la page au-dessus de la section don */}
      <WaveSeparator position="top" color="#FFF4EC" />

      {/* ── Soutien / Don — projet à but non lucratif porté par Éclatens ── */}
      <section className="uv-don" style={{ background: "transparent" }}>
        <div className="uv-don-inner">
          <p className="uv-eyebrow uv-don-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Le portage du projet</p>
          <h2 className="uv-join-title uv-don-title">
            Soutenez un projet{" "}
            <em className="uv-serif-accent uv-serif-accent--yellow">à but non lucratif</em>
          </h2>
          <p className="uv-join-sub uv-don-sub">
            Uvibes est porté par l&apos;association Éclatens. Tous les bénéfices sont réinvestis
            dans le projet ou dans d&apos;autres initiatives solidaires, pour que la technologie
            serve vraiment les gens.
          </p>

          <div className="uv-don-badge">
            <span className="uv-don-badge-label">Un projet porté par</span>
            <Image src="/images/LogoEclatens.png" alt="Logo de l'association Éclatens" width={300} height={132} className="uv-don-logo" />
          </div>

          <div className="uv-don-actions">
            <HelloAssoDon />
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              Devenir partenaire
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(255,255,255,.22)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(255,255,255,.14)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
