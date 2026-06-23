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
import "../../../styles/page/uvibes.css";

export const metadata: Metadata = buildMetadata("uvibes", "de");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description: "Uvibes ist eine sozio-digitale Innovation, die positive Gespräche innerhalb von Kollektiven fördert, um die soziale Bindung, das Wohlbefinden und das menschliche Engagement zu stärken.",
  foundingDate: "2022",
  sameAs: ["https://www.linkedin.com/company/uvibes", "https://www.instagram.com/uvibes_app"],
};

const ETHICS = [
  { num: "01", title: "Verantwortungsvoller Service", text: "Ein respektvoller digitaler Dienst, der auf die Qualität der Gespräche, Inklusion und den Schutz der Daten ausgelegt ist." },
  { num: "02", title: "Engagiertes Projekt", text: "Projektentscheidungen im Einklang mit unseren Werten — basierend auf Zuhören, Zusammenarbeit und ökologischer Verantwortung." },
  { num: "03", title: "Dauerhafte Partnerschaften", text: "Verantwortungsvolle Partnerschaften, ausgewählt für ihre Transparenz, ihre positive Wirkung und ihr gesellschaftliches Engagement." },
];

const VALUES = [
  "Die Magie geteilter Geschichten",
  "Die Freude, persönliche Erfahrungen zu teilen",
  "Und der Reichtum neuer Perspektiven.",
];

export default function AboutDe() {
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
          <h1 className="uv-hero-title v-prompt">
            Wer gibt<br />
            <em className="uv-hero-em">Uvibes Leben?</em>
          </h1>
          <p className="uv-hero-sub">
            Lernen Sie die Menschen und Ideen kennen, die das Wachstum von Uvibes vorantreiben
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
      <WhyName locale="de" />

      {/* ── Intro ── */}
      <section className="uv-intro">
        {/* Citation Harvard — dans un écrin doux, cohérent avec la section « sens du nom » */}
        <div className="uv-intro-statement-card">
          <span className="uv-intro-statement-glow" aria-hidden="true" />
          <p className="uv-intro-statement">
          <span className="uv-intro-quote-mark" aria-hidden="true">&ldquo;</span>
          Die längste von Harvard durchgeführte Studie ergab, dass die Qualität unserer Beziehungen
          der <em className="uv-em-orange">stärkste Prädiktor für Glück</em>{" "}
          ist <span className="uv-intro-statement-cite">(Vaillant, 2002)</span>.
          </p>
        </div>

        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Wo die Idee entstand</p>
            <h2 className="uv-intro-title">
              Was, wenn wir<br />
              <em className="uv-serif-accent">wirklich miteinander sprächen?</em>
            </h2>
            <p className="uv-intro-body">
              In klassischen sozialen Netzwerken verbinden uns Algorithmen mit Menschen, die wie wir denken. Im echten Leben bleiben wir in vertrauten Kreisen, kommentieren mehr, als wir wirklich sprechen, und verlieren so nach und nach … den Reichtum menschlicher Vielfalt.
            </p>
            {/* Chez Uvibes, nous croyons à — phrase filée, sans liste ni numéros */}
            <p className="uv-thread">
              <span className="uv-thread-eyebrow">Bei Uvibes glauben wir an&nbsp;:&nbsp;</span>
              {VALUES.map((v, i) => (
                <span key={v}>
                  <span className="uv-thread-text">{v}</span>
                  {i < VALUES.length - 1 && <span className="uv-thread-sep" aria-hidden="true" />}
                </span>
              ))}
            </p>
            <p className="uv-intro-body">
              An einer Universität, in einem Unternehmen oder in jedem anderen Kollektiv würden viele Menschen sich gerne so verbinden, trauen sich aber nicht.
              <br /><br />
              Uvibes macht diese unerwarteten Begegnungen möglich, durch ein Spiel aus offenen und positiven Fragen. Denn erst wenn man einen Schritt ins <em className="uv-em-rose">Unbekannte</em> wagt, entstehen die schönsten <em className="uv-em-orange">Gespräche</em>.
            </p>
          </div>
          {/* Vidéo témoignage — Delphine */}
          <div className="uv-intro-media">
            <video src={getVideoUrl("Delphine-desktop.mp4")} autoPlay muted loop playsInline className="uv-intro-media__el" />
          </div>
        </div>
      </section>

      {/* ── Équipe — sur fond dégradé (même gradient que le hero), encadrée par 2 vagues ── */}
      <div className="uv-team-gradient-wrap" style={{ background: "linear-gradient(145deg, #FF5894 0%, #FF7A60 30%, #FFB040 60%, #FD6E00 85%, #D90A5C 100%)", position: "relative", overflow: "hidden" }}>
        <WaveSeparator position="top" color="#FFF6EC" />

        <section className="uv-team uv-team--on-gradient">
          {/* Ondes de vibration animées en fond */}
          <div className="uv-waves" aria-hidden="true">
            <GradientVibrationLine id="uv-tw1-de" width={1800} height={70} amplitude={30} freq={5} strokeWidth={22} speed={10} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw2-de" width={1800} height={70} amplitude={24} freq={7} strokeWidth={15} speed={14} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw3-de" width={1800} height={70} amplitude={34} freq={4} strokeWidth={18} speed={12} colorFrom="#FFE456" colorTo="#fff" style={{ width: "100%" }} />
          </div>
          <div className="uv-team-inner">
            <div className="uv-section-header">
              <p className="uv-eyebrow uv-team-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Wird lebendig</p>
              <h2 className="uv-section-title uv-team-title">Das Team hinter <em className="uv-serif-accent uv-serif-accent--yellow">Uvibes</em></h2>
            </div>
            <TeamSection locale="de" />
          </div>
        </section>

        {/* Couleur calée sur le fond réel de la section suivante à cette profondeur de page (plus rosé que le haut) */}
        <WaveSeparator position="bottom" color="#FFEFF6" backColor="#FFD9E8" />
      </div>

      {/* ── Éthique ── */}
      <section className="uv-ethics">
        <div className="uv-ethics-inner">
          <div className="uv-ethics-header">
            <div className="uv-ethics-header__text">
              <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Unser Engagement</p>
              <h2 className="uv-section-title">Ein <em className="uv-serif-grad">ethischer</em> Ansatz im Zentrum</h2>
            </div>
            <div className="uv-ethics-polaroid">
              <video src={getVideoUrl("Colette-desktop.mp4")} autoPlay muted loop playsInline className="uv-ethics-polaroid__img" />
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

          <p className="uv-ethics-blog-note">
            Entdecken Sie den Abschnitt <Link href="/blog" className="uv-ethics-blog-link">&ldquo;Uvibes&rdquo;</Link> unseres Blogs,
            um mehr über unsere ethischen Grundsätze und ihre Umsetzung zu erfahren.
          </p>

          {/* Vidéo Pierre — déplacée sous les 3 cartes */}
          <div className="uv-team-vid-wrap">
            <video src={getVideoUrl("Pierre-desktop.mp4")} autoPlay muted loop playsInline className="uv-team-vid-el" />
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
          <p className="uv-eyebrow uv-don-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Wer das Projekt leitet</p>
          <h2 className="uv-join-title uv-don-title">
            Unterstützen Sie ein{" "}
            <em className="uv-serif-accent uv-serif-accent--yellow v-serif">gemeinnütziges Modell</em>
          </h2>
          <p className="uv-join-sub uv-don-sub">
            Uvibes wird vom Verein Eclat&apos;Ens verwaltet. Alle erzielten Einnahmen werden in das
            Projekt oder in andere vom Verein getragene Initiativen reinvestiert.
          </p>

          <div className="uv-don-badge">
            <span className="uv-don-badge-label">Ein Projekt getragen von</span>
            <Image src="/images/LogoEclatens.png" alt="Logo des Vereins Éclatens" width={300} height={132} className="uv-don-logo" />
          </div>

          <div className="uv-don-actions">
            <HelloAssoDon locale="de" />
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              Partner werden
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(255,255,255,.22)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(255,255,255,.14)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer locale="de" />
      </div>
    </main>
  );
}
