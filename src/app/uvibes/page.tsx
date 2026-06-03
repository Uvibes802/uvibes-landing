import Footer from "@/components/footer/Footer";
import { getVideoUrl } from "@/utils/videoUrl";
import JsonLd from "@/components/JsonLd";
import TeamSection from "@/components/section/TeamSection";
import HelloAssoDon from "@/components/uvibes/HelloAssoDon";
import VibrationLine from "@/components/shared/VibrationLine";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <div className="uv-page">
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
      </section>

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
              Sur les réseaux sociaux, les algorithmes nous relient à ceux qui pensent comme nous. Dans la vraie vie, on reste entre groupes familiers — et petit à petit, on perd la richesse de la diversité humaine.
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
          <div>
            <div className="uv-intro-stats">
              <div className="uv-stat-card">
                <span className="uv-stat-num">+38%</span>
                <span className="uv-stat-label">de sentiment d&apos;appartenance après 6 semaines</span>
              </div>
              <div className="uv-stat-card">
                <span className="uv-stat-num">4.9/5</span>
                <span className="uv-stat-label">score de satisfaction moyen des membres</span>
              </div>
              <div className="uv-stat-card">
                <span className="uv-stat-num">3 min</span>
                <span className="uv-stat-label">pour une conversation qui change vraiment quelque chose</span>
              </div>
              <div className="uv-stat-card">
                <span className="uv-stat-num">2022</span>
                <span className="uv-stat-label">création à Perpignan, déjà présents dans toute la France</span>
              </div>
            </div>
          </div>
        </div>

        {/* VibrationLine séparateur */}
        <div className="uv-sep-vib" aria-hidden="true">
          <GradientVibrationLine id="uv-vib-1" width={1800} height={45} amplitude={28} freq={5} strokeWidth={10} speed={11} colorFrom="#FD6E00" colorTo="#D90A5C" style={{ width: "100%" }} />
          <GradientVibrationLine id="uv-vib-2" width={1800} height={45} amplitude={18} freq={8} strokeWidth={6} speed={16} colorFrom="#D90A5C" colorTo="#FD6E00" style={{ width: "100%" }} />
        </div>
      </section>

      {/* ── Équipe ── */}
      <section className="uv-team">
        <div className="uv-team-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Sa concrétisation</p>
            <h2 className="uv-section-title">L&apos;équipe derrière <em className="uv-serif-accent">Uvibes</em></h2>
          </div>
          <TeamSection />
        </div>
      </section>

      {/* ── Photo équipe ── */}
      <div className="uv-team-photo">
        <Image src="/images/TeamUvibes.jpg" alt="L'équipe Uvibes réunie" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} loading="lazy" />
        <div className="uv-team-photo-overlay" aria-hidden="true" />
      </div>

      {/* ── Vidéos témoignages ── */}
      <section className="uv-videos">
        <div className="uv-videos-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Ils le vivent</p>
            <h2 className="uv-section-title">La solution <em className="uv-serif-accent">en action</em></h2>
          </div>
          <div className="uv-videos-grid">
            {[
              { file: "Isaline-desktop.mp4", name: "Isaline", role: "Étudiante" },
              { file: "Lisa-desktop.mp4",    name: "Lisa",    role: "Professionnelle RH" },
              { file: "Delphine-desktop.mp4",name: "Delphine",role: "Responsable collectif" },
            ].map((v) => (
              <div key={v.name} className="uv-video-card">
                <video
                  className="uv-video-el"
                  src={getVideoUrl(v.file)}
                  autoPlay muted loop playsInline
                />
                <div className="uv-video-info">
                  <span className="uv-video-name">{v.name}</span>
                  <span className="uv-video-role">{v.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Éthique ── */}
      <section className="uv-ethics">
        <div className="uv-ethics-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Notre engagement</p>
            <h2 className="uv-section-title">Une <em className="uv-serif-accent">éthique</em> au cœur du projet</h2>
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
        </div>
      </section>

      {/* ── Portage Éclatens ── */}
      <section className="uv-portage">
        <div className="uv-portage-inner">
          <p className="uv-eyebrow" style={{ justifyContent: "center" }}><span className="uv-eyebrow-dot" aria-hidden="true" />Le portage du projet</p>
          <div className="uv-portage-card">
            <Image src="/images/LogoEclatens.png" alt="Logo Éclatens" width={180} height={80} className="uv-portage-logo" />
            <h3 className="uv-portage-title">Un modèle <em className="uv-em-orange">non lucratif</em></h3>
            <p className="uv-portage-text">
              Tous les bénéfices générés par Uvibes sont réinvestis dans le projet ou dans d&apos;autres initiatives portées par l&apos;association Éclatens — pour que la technologie serve vraiment les gens.
            </p>
            <HelloAssoDon />
          </div>
        </div>
      </section>

      {/* ── CTA rejoindre — nouvelle version sobre sur paper ── */}
      <section className="uv-join">
        <div className="uv-join-inner">
          <div className="uv-join-text">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Ensemble</p>
            <h2 className="uv-join-title">
              Rejoignez<br />
              l&apos;<em className="uv-serif-accent">aventure</em> Uvibes
            </h2>
            <p className="uv-join-sub">
              Prenez part à une dynamique qui réinvente nos façons d&apos;interagir — en ouvrant notre esprit à des visions nouvelles.
            </p>
          </div>
          <div className="uv-join-actions">
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--primary">
              Nous contacter
            </Link>
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              Devenir partenaire
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(253,110,0,.18)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(217,10,92,.12)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
