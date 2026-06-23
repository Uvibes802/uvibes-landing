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

export const metadata: Metadata = buildMetadata("uvibes", "zh");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uvibes",
  url: SITE_URL,
  logo: `${SITE_URL}/images/Logo UVIBES.png`,
  description: "Uvibes 是一项社会数字创新，致力于在集体内部促进积极的对话，以增强社会联系、幸福感和人文投入。",
  foundingDate: "2022",
  sameAs: ["https://www.linkedin.com/company/uvibes", "https://www.instagram.com/uvibes_app"],
};

const ETHICS = [
  { num: "01", title: "负责任的服务", text: "一项尊重用户的数字服务，专注于对话质量、包容性和数据隐私。" },
  { num: "02", title: "用心经营的项目", text: "项目决策与我们的价值观保持一致——基于倾听、协作和环境责任。" },
  { num: "03", title: "持久的合作关系", text: "因其透明度、积极影响和社会责任而被选择的负责任合作关系。" },
];

const VALUES = [
  "分享故事的魔力",
  "分享个人经历的快乐",
  "以及新视角带来的丰富性。",
];

export default function AboutZh() {
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
            是谁赋予<br />
            <em className="uv-hero-em">Uvibes 生命？</em>
          </h1>
          <p className="uv-hero-sub">
            认识推动 Uvibes 成长的人和理念
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
      <WhyName locale="zh" />

      {/* ── Intro ── */}
      <section className="uv-intro">
        {/* Citation Harvard — dans un écrin doux, cohérent avec la section « sens du nom » */}
        <div className="uv-intro-statement-card">
          <span className="uv-intro-statement-glow" aria-hidden="true" />
          <p className="uv-intro-statement">
          <span className="uv-intro-quote-mark" aria-hidden="true">&ldquo;</span>
          哈佛大学进行的最长时间研究发现，我们人际关系的质量是
          <em className="uv-em-orange">幸福感最强的预测因素</em>{" "}
          <span className="uv-intro-statement-cite">（Vaillant，2002年）</span>。
          </p>
        </div>

        <div className="uv-intro-inner">
          <div>
            <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />想法诞生的地方</p>
            <h2 className="uv-intro-title">
              如果我们<br />
              <em className="uv-serif-accent">真正交流，会怎样？</em>
            </h2>
            <p className="uv-intro-body">
              在传统社交网络上，算法把我们和想法相似的人连接在一起。而在现实生活中，我们却停留在熟悉的圈子里，评论多于真正的交谈，渐渐地……我们失去了人类多样性的丰富性。
            </p>
            {/* Chez Uvibes, nous croyons à — phrase filée, sans liste ni numéros */}
            <p className="uv-thread">
              <span className="uv-thread-eyebrow">在 Uvibes，我们相信&nbsp;：&nbsp;</span>
              {VALUES.map((v, i) => (
                <span key={v}>
                  <span className="uv-thread-text">{v}</span>
                  {i < VALUES.length - 1 && <span className="uv-thread-sep" aria-hidden="true" />}
                </span>
              ))}
            </p>
            <p className="uv-intro-body">
              在大学、企业或任何其他集体中，许多人想要这样建立联系，却不敢迈出第一步。
              <br /><br />
              Uvibes 通过一套开放而积极的问题，让这些意想不到的相遇成为可能。因为正是迈向<em className="uv-em-rose">未知</em>，才会诞生最<em className="uv-em-orange">美好</em>的对话。
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
            <GradientVibrationLine id="uv-tw1-zh" width={1800} height={70} amplitude={30} freq={5} strokeWidth={22} speed={10} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw2-zh" width={1800} height={70} amplitude={24} freq={7} strokeWidth={15} speed={14} colorFrom="#fff" colorTo="#FFE456" style={{ width: "100%" }} />
            <GradientVibrationLine id="uv-tw3-zh" width={1800} height={70} amplitude={34} freq={4} strokeWidth={18} speed={12} colorFrom="#FFE456" colorTo="#fff" style={{ width: "100%" }} />
          </div>
          <div className="uv-team-inner">
            <div className="uv-section-header">
              <p className="uv-eyebrow uv-team-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />焕发生机</p>
              <h2 className="uv-section-title uv-team-title"><em className="uv-serif-accent uv-serif-accent--yellow">Uvibes</em> 背后的团队</h2>
            </div>
            <TeamSection locale="zh" />
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
              <p className="uv-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />我们的承诺</p>
              <h2 className="uv-section-title">以<em className="uv-serif-grad">道德</em>为核心的方法</h2>
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
            前往我们博客中的 <Link href="/blog" className="uv-ethics-blog-link">&ldquo;Uvibes&rdquo;</Link> 板块，
            了解更多关于我们的道德原则以及我们如何将其付诸实践。
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
          <p className="uv-eyebrow uv-don-eyebrow"><span className="uv-eyebrow-dot" aria-hidden="true" />谁在领导这个项目</p>
          <h2 className="uv-join-title uv-don-title">
            支持一个{" "}
            <em className="uv-serif-accent uv-serif-accent--yellow v-serif">非营利模式</em>
          </h2>
          <p className="uv-join-sub uv-don-sub">
            Uvibes 由 Eclat&apos;Ens 协会管理。所有产生的收入都会重新投入到
            该项目或协会推动的其他举措中。
          </p>

          <div className="uv-don-badge">
            <span className="uv-don-badge-label">由以下机构推动的项目</span>
            <Image src="/images/LogoEclatens.png" alt="Éclatens 协会标志" width={300} height={132} className="uv-don-logo" />
          </div>

          <div className="uv-don-actions">
            <HelloAssoDon locale="zh" />
            <Link href="mailto:contact@uvibes.fr" className="uv-join-btn uv-join-btn--outline">
              成为合作伙伴
            </Link>
          </div>
        </div>

        {/* VibrationLine déco */}
        <div className="uv-join-vib" aria-hidden="true">
          <VibrationLine width={1800} height={50} amplitude={22} freq={6} stroke="rgba(255,255,255,.22)" strokeWidth={2} speed={14} />
          <VibrationLine width={1800} height={50} amplitude={14} freq={10} stroke="rgba(255,255,255,.14)" strokeWidth={1.2} speed={20} />
        </div>
      </section>

      <Footer locale="zh" />
      </div>
    </main>
  );
}
