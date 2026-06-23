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

export const metadata: Metadata = buildMetadata("uvibes", "ru");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description: "Uvibes — это социально-цифровая инновация, которая способствует позитивному общению внутри коллективов для укрепления социальных связей, благополучия и человеческой вовлечённости.",
  foundingDate: "2022",
  sameAs: ["https://www.linkedin.com/company/uvibes", "https://www.instagram.com/uvibes_app"],
};

const ETHICS = [
  { num: "01", title: "Ответственный сервис", text: "Уважительный цифровой сервис, созданный с заботой о качестве общения, инклюзивности и конфиденциальности данных." },
  { num: "02", title: "Осознанный проект", text: "Решения по проекту, соответствующие нашим ценностям — основанные на внимании, сотрудничестве и экологической ответственности." },
  { num: "03", title: "Долгосрочные партнёрства", text: "Ответственные партнёрства, выбранные за их прозрачность, положительное влияние и приверженность обществу." },
];

const VALUES = [
  "Магия общих историй",
  "Радость делиться личным опытом",
  "И богатство новых взглядов.",
];

export default function AboutRu() {
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
            Кто дарит<br />
            <em className="uv-hero-em">жизнь Uvibes?</em>
          </h1>
          <p className="uv-hero-sub">
            Познакомьтесь с людьми и идеями, которые движут развитием Uvibes
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
      <WhyName locale="ru" />

      {/* ── Intro ── */}
      <section className="uv-intro">
        {/* Citation Harvard — dans un écrin doux, cohérent avec la section « sens du nom » */}
        <div className="uv-intro-statement-card">
          <span className="uv-intro-statement-glow" aria-hidden="true" />
          <p className="uv-intro-statement">
          <span className="uv-intro-quote-mark" aria-hidden="true">&ldquo;</span>
          Самое продолжительное исследование, проведённое Гарвардом, показало, что качество наших отношений
          является <em className="uv-em-orange">самым сильным предиктором счастья</em>{" "}
          <span className="uv-intro-statement-cite">(Vaillant, 2002)</span>.
          </p>
        </div>

        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Где родилась идея</p>
            <h2 className="uv-intro-title">
              Что, если бы мы<br />
              <em className="uv-serif-accent">по-настоящему разговаривали?</em>
            </h2>
            <p className="uv-intro-body">
              В традиционных социальных сетях алгоритмы соединяют нас с людьми, которые думают так же, как мы. В реальной жизни мы остаёмся в привычных кругах, комментируем больше, чем действительно разговариваем, и постепенно… теряем богатство человеческого разнообразия.
            </p>
            {/* Chez Uvibes, nous croyons à — phrase filée, sans liste ni numéros */}
            <p className="uv-thread">
              <span className="uv-thread-eyebrow">В Uvibes мы верим в&nbsp;:&nbsp;</span>
              {VALUES.map((v, i) => (
                <span key={v}>
                  <span className="uv-thread-text">{v}</span>
                  {i < VALUES.length - 1 && <span className="uv-thread-sep" aria-hidden="true" />}
                </span>
              ))}
            </p>
            <p className="uv-intro-body">
              В университете, компании или любом другом коллективе многие люди хотели бы общаться именно так, но не решаются.
              <br /><br />
              Uvibes делает такие неожиданные встречи возможными благодаря игре открытых и позитивных вопросов. Ведь именно сделав шаг в <em className="uv-em-rose">неизвестное</em>, рождаются самые <em className="uv-em-orange">красивые</em> разговоры.
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
            <GradientVibrationLine id="uv-tw1-ru" width={1800} height={70} amplitude={30} freq={5} strokeWidth={22} speed={10} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw2-ru" width={1800} height={70} amplitude={24} freq={7} strokeWidth={15} speed={14} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw3-ru" width={1800} height={70} amplitude={34} freq={4} strokeWidth={18} speed={12} colorFrom="#FFE456" colorTo="#fff" style={{ width: "100%" }} />
          </div>
          <div className="uv-team-inner">
            <div className="uv-section-header">
              <p className="uv-eyebrow uv-team-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Оживает</p>
              <h2 className="uv-section-title uv-team-title">Команда, стоящая за <em className="uv-serif-accent uv-serif-accent--yellow">Uvibes</em></h2>
            </div>
            <TeamSection locale="ru" />
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
              <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Наша приверженность</p>
              <h2 className="uv-section-title">В основе — <em className="uv-serif-grad">этичный</em> подход</h2>
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
            Изучите раздел <Link href="/blog" className="uv-ethics-blog-link">&ldquo;Uvibes&rdquo;</Link> нашего блога,
            чтобы узнать больше о наших этических принципах и о том, как мы применяем их на практике.
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
          <p className="uv-eyebrow uv-don-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />Кто руководит проектом</p>
          <h2 className="uv-join-title uv-don-title">
            Поддержите{" "}
            <em className="uv-serif-accent uv-serif-accent--yellow v-serif">некоммерческую модель</em>
          </h2>
          <p className="uv-join-sub uv-don-sub">
            Uvibes управляется ассоциацией Eclat&apos;Ens. Весь полученный доход реинвестируется
            в проект или в другие инициативы, продвигаемые ассоциацией.
          </p>

          <div className="uv-don-badge">
            <span className="uv-don-badge-label">Проект, реализуемый</span>
            <Image src="/images/LogoEclatens.png" alt="Логотип ассоциации Éclatens" width={300} height={132} className="uv-don-logo" />
          </div>

          <div className="uv-don-actions">
            <HelloAssoDon locale="ru" />
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              Стать партнёром
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(255,255,255,.22)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(255,255,255,.14)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer locale="ru" />
      </div>
    </main>
  );
}
