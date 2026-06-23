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

export const metadata: Metadata = buildMetadata("uvibes", "es");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description: "Uvibes es una innovación sociodigital que impulsa conversaciones positivas dentro de los colectivos para fortalecer el vínculo social, el bienestar y el compromiso humano.",
  foundingDate: "2022",
  sameAs: ["https://www.linkedin.com/company/uvibes", "https://www.instagram.com/uvibes_app"],
};

const ETHICS = [
  { num: "01", title: "Servicio responsable", text: "Un servicio digital respetuoso, pensado para la calidad de las conversaciones, la inclusión y la privacidad de los datos." },
  { num: "02", title: "Proyecto comprometido", text: "Decisiones de proyecto alineadas con nuestros valores — basadas en la escucha, la colaboración y la responsabilidad medioambiental." },
  { num: "03", title: "Alianzas duraderas", text: "Alianzas responsables, elegidas por su transparencia, su impacto positivo y su compromiso con la sociedad." },
];

const VALUES = [
  "La magia de las historias compartidas",
  "La alegría de compartir experiencias personales",
  "Y la riqueza de las nuevas perspectivas.",
];

export default function AboutEs() {
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
            ¿Quién le da<br />
            <em className="uv-hero-em">vida a Uvibes?</em>
          </h1>
          <p className="uv-hero-sub">
            Conoce a las personas y las ideas detrás del crecimiento de Uvibes
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
      <WhyName locale="es" />

      {/* ── Intro ── */}
      <section className="uv-intro">
        {/* Citation Harvard — dans un écrin doux, cohérent avec la section « sens du nom » */}
        <div className="uv-intro-statement-card">
          <span className="uv-intro-statement-glow" aria-hidden="true" />
          <p className="uv-intro-statement">
          <span className="uv-intro-quote-mark" aria-hidden="true">&ldquo;</span>
          El estudio más largo realizado por Harvard descubrió que la calidad de nuestras relaciones
          es el <em className="uv-em-orange">predictor más fuerte de la felicidad</em>{" "}
          <span className="uv-intro-statement-cite">(Vaillant, 2002)</span>.
          </p>
        </div>

        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Dónde nació la idea</p>
            <h2 className="uv-intro-title">
              ¿Y si<br />
              <em className="uv-serif-accent">realmente nos habláramos?</em>
            </h2>
            <p className="uv-intro-body">
              En las redes sociales tradicionales, los algoritmos nos conectan con personas que piensan como nosotros. En la vida real, nos quedamos en círculos conocidos, comentamos más de lo que realmente hablamos y, poco a poco&hellip; perdemos la riqueza de la diversidad humana.
            </p>
            {/* Chez Uvibes, nous croyons à — phrase filée, sans liste ni numéros */}
            <p className="uv-thread">
              <span className="uv-thread-eyebrow">En Uvibes, creemos en&nbsp;:&nbsp;</span>
              {VALUES.map((v, i) => (
                <span key={v}>
                  <span className="uv-thread-text">{v}</span>
                  {i < VALUES.length - 1 && <span className="uv-thread-sep" aria-hidden="true" />}
                </span>
              ))}
            </p>
            <p className="uv-intro-body">
              En una universidad, una empresa o cualquier otro colectivo, muchas personas querrían conectar así, pero no se atreven.
              <br /><br />
              Uvibes hace posibles estos encuentros inesperados, mediante un juego de preguntas abiertas y positivas. Porque es dando un paso hacia lo <em className="uv-em-rose">desconocido</em> que nacen las conversaciones más <em className="uv-em-orange">bonitas</em>.
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
            <GradientVibrationLine id="uv-tw1-es" width={1800} height={70} amplitude={30} freq={5} strokeWidth={22} speed={10} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw2-es" width={1800} height={70} amplitude={24} freq={7} strokeWidth={15} speed={14} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw3-es" width={1800} height={70} amplitude={34} freq={4} strokeWidth={18} speed={12} colorFrom="#FFE456" colorTo="#fff" style={{ width: "100%" }} />
          </div>
          <div className="uv-team-inner">
            <div className="uv-section-header">
              <p className="uv-eyebrow uv-team-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Cobra vida</p>
              <h2 className="uv-section-title uv-team-title">El equipo detrás de <em className="uv-serif-accent uv-serif-accent--yellow">Uvibes</em></h2>
            </div>
            <TeamSection locale="es" />
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
              <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Nuestro compromiso</p>
              <h2 className="uv-section-title">Un enfoque <em className="uv-serif-grad">ético</em> en el centro</h2>
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
            Explora la sección <Link href="/blog" className="uv-ethics-blog-link">&ldquo;Uvibes&rdquo;</Link> de nuestro blog
            para saber más sobre nuestros principios éticos y cómo los ponemos en práctica.
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
          <p className="uv-eyebrow uv-don-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Quién dirige el proyecto</p>
          <h2 className="uv-join-title uv-don-title">
            Apoya un{" "}
            <em className="uv-serif-accent uv-serif-accent--yellow v-serif">modelo sin fines de lucro</em>
          </h2>
          <p className="uv-join-sub uv-don-sub">
            Uvibes está gestionado por la asociación Eclat&apos;Ens. Todos los ingresos generados se
            reinvierten en el proyecto o en otras iniciativas impulsadas por la asociación.
          </p>

          <div className="uv-don-badge">
            <span className="uv-don-badge-label">Un proyecto impulsado por</span>
            <Image src="/images/LogoEclatens.png" alt="Logo de la asociación Éclatens" width={300} height={132} className="uv-don-logo" />
          </div>

          <div className="uv-don-actions">
            <HelloAssoDon locale="es" />
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              Convertirse en socio
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(255,255,255,.22)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(255,255,255,.14)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer locale="es" />
      </div>
    </main>
  );
}
