import Footer from "@/components/footer/Footer";
import JsonLd from "@/components/JsonLd";
import TeamSection from "@/components/section/TeamSection";
import HelloAssoDon from "@/components/uvibes/HelloAssoDon";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import "../../styles/page/uvibes.css";

export const metadata: Metadata = buildMetadata("uvibes");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description:
    "Uvibes est une innovation socio-digitale qui active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain.",
  foundingDate: "2022",
  sameAs: [
    "https://www.linkedin.com/company/uvibes",
    "https://www.instagram.com/uvibes_app",
  ],
};

const ETHICS = [
  {
    num: "01",
    title: "Respect & confidentialité",
    text: "Un service digital respectueux, pensé pour la qualité des discussions, l'inclusion et la protection des données de chaque membre.",
  },
  {
    num: "02",
    title: "Collaboration & écoute",
    text: "Une conduite de projet alignée avec nos valeurs — basée sur l'écoute active, la co-construction et la responsabilité collective.",
  },
  {
    num: "03",
    title: "Partenariats responsables",
    text: "Des partenaires choisis pour leur transparence, leur impact positif et leur engagement sociétal — pas pour leur seule notoriété.",
  },
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

      {/* ── Hero gradient (réutilise le hero maison, pas heroBanner) ── */}
      <section style={{
        background: "linear-gradient(135deg, #FD6E00 0%, #FF8530 12%, #FF6898 55%, #D90A5C 100%)",
        padding: "calc(var(--nav-height) + 4rem) clamp(1.5rem, 5vw, 3.5rem) 5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-roboto-mono), monospace", fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,.75)", textTransform: "uppercase", marginBottom: "1rem" }}>
            À propos d&apos;Uvibes
          </p>
          <h1 style={{ fontFamily: "var(--font-prompt), sans-serif", fontSize: "clamp(42px, 7vw, 96px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", margin: "0 0 1.5rem" }}>
            Qui donne vie<br />
            <span style={{ fontStyle: "italic", fontFamily: "var(--font-instrument), serif", fontWeight: 400 }}>
              à Uvibes&nbsp;?
            </span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "rgba(255,255,255,.88)", lineHeight: 1.6, margin: 0 }}>
            Découvrez les personnes et les idées qui font grandir Uvibes
          </p>
        </div>
        {/* Anneau déco */}
        <div aria-hidden="true" style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", border: "2px solid rgba(255,255,255,.15)", animation: "uvSpin 25s linear infinite", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -80, left: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,255,255,.1), transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      </section>

      {/* ── Intro ── */}
      <section className="uv-intro">
        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />La naissance de l&apos;idée</p>
            <h2 className="uv-intro-title">
              Et si on se<br />
              <span className="uv-intro-title-serif">parlait vraiment&nbsp;?</span>
            </h2>
            <p className="uv-intro-lead">
              La plus longue étude menée par Harvard montre que la qualité de nos relations est le premier facteur de bonheur.
            </p>
            <p className="uv-intro-body">
              Sur les réseaux sociaux, les algorithmes nous relient à ceux qui pensent comme nous. Dans la vraie vie, on reste entre groupes familiers — et petit à petit, on perd la richesse de la diversité humaine.
              <br /><br />
              Uvibes facilite ces rencontres inattendues, par un jeu de questions ouvertes et positives. Parce que c&apos;est en allant vers l&apos;inconnu que naissent les plus belles conversations.
            </p>
            <div className="uv-intro-values" style={{ marginTop: "2rem" }}>
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
      </section>

      {/* ── Équipe ── */}
      <section className="uv-team">
        <div className="uv-team-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Sa concrétisation</p>
            <h2 className="uv-section-title">L&apos;équipe derrière Uvibes</h2>
          </div>
          <TeamSection />
        </div>
      </section>

      {/* ── Photo équipe ── */}
      <div className="uv-team-photo">
        <Image
          src="/images/TeamUvibes.jpg"
          alt="L'équipe Uvibes réunie"
          fill
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
          loading="lazy"
        />
      </div>

      {/* ── Éthique ── */}
      <section className="uv-ethics">
        <div className="uv-ethics-inner">
          <div className="uv-section-header">
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Notre engagement</p>
            <h2 className="uv-section-title">Une éthique au cœur du projet</h2>
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
            <h3 className="uv-portage-title">Un modèle non lucratif</h3>
            <p className="uv-portage-text">
              Tous les bénéfices générés par Uvibes sont réinvestis dans le projet ou dans d&apos;autres initiatives portées par l&apos;association Éclatens — pour que la technologie serve vraiment les gens.
            </p>
            <HelloAssoDon />
          </div>
        </div>
      </section>

      {/* ── CTA rejoindre ── */}
      <section className="uv-cta">
        <div className="uv-cta-inner">
          <h2 className="uv-cta-title">Rejoignez l&apos;aventure Uvibes</h2>
          <p className="uv-cta-sub">
            Prenez part à une dynamique qui réinvente nos façons d&apos;interagir — en ouvrant notre esprit à des visions nouvelles.
          </p>
          <div className="uv-cta-btns">
            <a href="mailto:contact@uvibes.fr" className="uv-cta-btn uv-cta-btn--filled">
              Nous contacter
            </a>
            <a href="mailto:contact@uvibes.fr" className="uv-cta-btn">
              Devenir partenaire
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
