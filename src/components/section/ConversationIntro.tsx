"use client";

import { getVideoUrl } from "@/utils/videoUrl";
import { useEffect, useRef, useState } from "react";
import "@/styles/section/conversationIntro.css";

const VIDEOS: { file: string; name: string; format: "portrait" | "landscape"; local?: boolean }[] = [
  { file: "/videos/lisa-et-celine.mp4", name: "Lisa et Céline", format: "portrait", local: true },
];

const PARTICLES = [
  "ci-p--1","ci-p--2","ci-p--3","ci-p--4","ci-p--5","ci-p--6","ci-p--7",
  "ci-p--8","ci-p--9","ci-p--10","ci-p--11","ci-p--12","ci-p--13","ci-p--14",
];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`ci-reveal${visible ? " --in" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function kw(i: number, text: string) {
  return (
    <strong className="ci-kw" style={{
      "--kw-i": i,
      "--kw-color": i % 2 === 0 ? "var(--orange)" : "var(--rose)",
    } as React.CSSProperties}>{text}</strong>
  );
}

/* ── Mockup téléphone ── */
function PhoneMockup({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <div className="ci-phone-wrap">
      <div className="ci-phone-halo" aria-hidden="true" />
      <div className="ci-phone">
        <div className="ci-phone-screen">
          <video className="ci-phone-video" src={video.local ? video.file : getVideoUrl(video.file)} autoPlay muted loop playsInline />
        </div>
        <div className="ci-phone-bottom"><span className="ci-phone-bar" /></div>
      </div>
    </div>
  );
}

/* ── Mockup MacBook ── */
function MacMockup({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <div className="ci-mac-wrap">
      <div className="ci-mac-halo" aria-hidden="true" />
      <div className="ci-mac">
        {/* Écran */}
        <div className="ci-mac-lid">
          <div className="ci-mac-notch" aria-hidden="true" />
          <div className="ci-mac-display">
            <video className="ci-mac-video" src={getVideoUrl(video.file)} autoPlay muted loop playsInline />
          </div>
        </div>
        {/* Corps */}
        <div className="ci-mac-hinge" aria-hidden="true" />
        <div className="ci-mac-body" aria-hidden="true">
          <div className="ci-mac-keyboard" />
          <div className="ci-mac-trackpad" />
        </div>
        <div className="ci-mac-foot" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function ConversationIntro({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [video, setVideo] = useState(VIDEOS[0]);

  useEffect(() => {
    setVideo(VIDEOS[Math.floor(Math.random() * VIDEOS.length)]);
  }, []);

  return (
    <section className="ci-section">
      <div className="ci-blob ci-blob--a" aria-hidden="true" />
      <div className="ci-blob ci-blob--b" aria-hidden="true" />
      <div className="ci-blob ci-blob--c" aria-hidden="true" />
      <div className="ci-blob ci-blob--d" aria-hidden="true" />
      {PARTICLES.map((cls, i) => (
        <div key={i} className={`ci-p ${cls}`} aria-hidden="true" />
      ))}

      <div className="ci-inner">

        <Reveal>
          <div className="ci-eyebrow">
            <span className="ci-eyebrow-dot" aria-hidden="true" />
            <span className="v-mono ci-eyebrow-text">
              {locale === "en"
                ? "The power of an organization lies in the quality of the relationships it creates."
                : <>Le pouvoir d&apos;une organisation réside dans la qualité des relations qu&apos;elle crée.</>}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="ci-title v-prompt">
            {locale === "en" ? (
              <>
                <span className="ci-t1">What if the </span>
                <span className="ci-t2">conversations</span>
                <br /><span className="ci-t3">that matter </span>
                <span className="ci-t4">finally</span>
                <br /><span className="v-serif ci-title-enfin">happened?</span>
              </>
            ) : (
              <>
                <span className="ci-t1">Et si les </span>
                <span className="ci-t2">conversations</span>
                <br /><span className="ci-t3">clés </span>
                <span className="ci-t4">arrivaient</span>
                <br /><span className="v-serif ci-title-enfin">enfin&nbsp;?</span>
              </>
            )}
          </h2>
        </Reveal>

        <div className="ci-content">

          <Reveal delay={140} className="ci-phone-reveal">
            {video.format === "landscape"
              ? <MacMockup video={video} />
              : <PhoneMockup video={video} />
            }
          </Reveal>

          <Reveal delay={220} className="ci-body-reveal">
            <div className="ci-body">
              {locale === "en" ? (
                <>
                  <p>Uvibes gets the good stuff moving — {kw(0,"tips")}, {kw(1,"experiences")} and {kw(2,"perspectives")} — through short, human, engaging conversations.</p>
                  <p>In plenty of communities, we hesitate to start the conversation — and we underestimate what simple {kw(6,"peer-to-peer exchanges")} can do.</p>
                  <p>Uvibes makes the {kw(7,"right conversations")} happen, between the {kw(8,"right people")}, at the {kw(9,"right time")}. Your organization becomes more {kw(10,"connected")}, more {kw(11,"fluid")} and more {kw(12,"effective")}.</p>
                </>
              ) : (
                <>
                  <p>Uvibes fait circuler les {kw(0,"bons plans")}, les {kw(1,"expériences")} et les {kw(2,"points de vue")} à travers des discussions courtes, humaines et engageantes.</p>
                  <p>Dans de nombreux collectifs, nous n&apos;osons pas toujours engager la conversation et sous-estimons souvent les bénéfices de simples {kw(6,"échanges entre pairs")}.</p>
                  <p>Uvibes facilite les {kw(7,"bonnes conversations")}, entre les {kw(8,"bonnes personnes")}, au {kw(9,"bon moment")}. Votre organisation devient ainsi plus {kw(10,"en lien")}, plus {kw(11,"fluide")} et plus {kw(12,"efficace")}.</p>
                </>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
