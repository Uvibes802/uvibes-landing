"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionSoftSkills.css";

// ── Médias hébergés sur CloudFront (fournis par la tutrice) ───────────────
// Laisser vide tant que l'URL n'est pas connue → un placeholder propre s'affiche.
// Vidéo : remplacer par getVideoUrl("nom-du-reel.mp4") une fois en ligne.
const REEL_SRC = "";    // TODO reel 9:16 (CloudFront)
const PODCAST_SRC = ""; // TODO épisode podcast .mp3 (CloudFront)

/* Barres de l'onde du podcast */
const WAVE_BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.45, 0.8, 0.5, 0.7, 0.3];

const SSS_TXT: Record<string, {
  eyebrow: React.ReactNode; title: React.ReactNode; subtitle: React.ReactNode;
  pausePodcast: string; listenPodcast: string;
  row1Title: string; row1Body: React.ReactNode; row1VideoAria: string;
  row2Title: React.ReactNode; row2Body: React.ReactNode; row2VideoAria: string;
  row3Title: React.ReactNode; row3Body: string; certifAlt: string;
}> = {
  en: {
    eyebrow: "Something else Uvibes does uniquely",
    title: <>Train and showcase<br />your <span className="sss-title-accent v-serif">soft skills.</span></>,
    subtitle: <>Beyond the encounters themselves, Uvibes becomes a real development path:<br />you learn, you practice, and your commitment gets concretely recognized.</>,
    pausePodcast: "Pause the podcast",
    listenPodcast: "Listen to the podcast",
    row1Title: "Resources at your fingertips",
    row1Body: "Videos, podcasts and articles to understand, step by step, how to grow each soft skill.",
    row1VideoAria: "Uvibes video preview",
    row2Title: "An ongoing training ground",
    row2Body: "Real-life situations to build and strengthen relational skills.",
    row2VideoAria: "Preview of a real Uvibes conversation",
    row3Title: "Recognition for your commitment",
    row3Body: "A certificate that recognizes the journey completed.",
    certifAlt: "Uvibes training certificate — Lou's example",
  },
  es: {
    eyebrow: <>Otra cosa que Uvibes hace de forma única</>,
    title: <>Entrenar y valorizar<br />las <span className="sss-title-accent v-serif">soft skills.</span></>,
    subtitle: <>Más allá de los encuentros, Uvibes se convierte en un verdadero recorrido de desarrollo&nbsp;:<br />aprendes, practicas y obtienes un reconocimiento concreto de tu compromiso.</>,
    pausePodcast: "Pausar el podcast",
    listenPodcast: "Escuchar el podcast",
    row1Title: "Recursos a tu disposición",
    row1Body: <>Vídeos, podcasts y artículos para comprender, paso a paso, cómo progresar en cada soft skill.</>,
    row1VideoAria: "Vista previa del vídeo Uvibes",
    row2Title: <>Un terreno de entrenamiento continuo</>,
    row2Body: <>Situaciones reales para desarrollar y reforzar las competencias relacionales.</>,
    row2VideoAria: "Vista previa de una conversación Uvibes real",
    row3Title: <>Un reconocimiento del compromiso</>,
    row3Body: "Un certificado que reconoce el recorrido realizado.",
    certifAlt: "Certificado de entrenamiento Uvibes — ejemplo de Lou",
  },
  de: {
    eyebrow: "Etwas, das Uvibes ebenfalls einzigartig macht",
    title: <>Soft Skills trainieren<br />und <span className="sss-title-accent v-serif">sichtbar machen.</span></>,
    subtitle: <>Über die Begegnungen hinaus wird Uvibes zu einem echten Entwicklungsweg:<br />man lernt, übt sich – und das Engagement wird konkret anerkannt.</>,
    pausePodcast: "Podcast pausieren",
    listenPodcast: "Podcast anhören",
    row1Title: "Ressourcen zur Verfügung",
    row1Body: "Videos, Podcasts und Artikel, um Schritt für Schritt zu verstehen, wie man jede Soft Skill weiterentwickelt.",
    row1VideoAria: "Uvibes Video-Vorschau",
    row2Title: "Ein kontinuierliches Trainingsfeld",
    row2Body: "Reale Situationen, um Beziehungskompetenzen aufzubauen und zu stärken.",
    row2VideoAria: "Vorschau eines echten Uvibes-Gesprächs",
    row3Title: "Anerkennung des Engagements",
    row3Body: "Ein Zertifikat, das den zurückgelegten Weg anerkennt.",
    certifAlt: "Uvibes-Trainingszertifikat — Beispiel von Lou",
  },
  it: {
    eyebrow: "Un'altra cosa che Uvibes fa in modo unico",
    title: <>Allenare e valorizzare<br />le <span className="sss-title-accent v-serif">soft skills.</span></>,
    subtitle: <>Oltre agli incontri, Uvibes diventa un vero percorso di sviluppo:<br />si imparano cose nuove, si pratica e si ottiene un riconoscimento concreto del proprio impegno.</>,
    pausePodcast: "Metti in pausa il podcast",
    listenPodcast: "Ascolta il podcast",
    row1Title: "Risorse a disposizione",
    row1Body: "Video, podcast e articoli per capire, passo dopo passo, come progredire su ogni soft skill.",
    row1VideoAria: "Anteprima video Uvibes",
    row2Title: "Un terreno di allenamento continuo",
    row2Body: "Situazioni reali per sviluppare e rafforzare le competenze relazionali.",
    row2VideoAria: "Anteprima di una conversazione Uvibes reale",
    row3Title: "Un riconoscimento dell'impegno",
    row3Body: "Un attestato che riconosce il percorso compiuto.",
    certifAlt: "Attestato di formazione Uvibes — esempio di Lou",
  },
  pt: {
    eyebrow: "Outra coisa que a Uvibes faz de forma única",
    title: <>Treinar e valorizar<br />as <span className="sss-title-accent v-serif">soft skills.</span></>,
    subtitle: <>Além dos encontros, a Uvibes torna-se um verdadeiro percurso de desenvolvimento:<br />aprende-se, pratica-se e obtém-se um reconhecimento concreto do compromisso.</>,
    pausePodcast: "Pausar o podcast",
    listenPodcast: "Ouvir o podcast",
    row1Title: "Recursos à disposição",
    row1Body: "Vídeos, podcasts e artigos para compreender, passo a passo, como progredir em cada soft skill.",
    row1VideoAria: "Pré-visualização do vídeo Uvibes",
    row2Title: "Um terreno de treino contínuo",
    row2Body: "Situações reais para desenvolver e reforçar as competências relacionais.",
    row2VideoAria: "Pré-visualização de uma conversa Uvibes real",
    row3Title: "Um reconhecimento do compromisso",
    row3Body: "Um certificado que reconhece o percurso realizado.",
    certifAlt: "Certificado de formação Uvibes — exemplo de Lou",
  },
  ru: {
    eyebrow: "Ещё кое-что уникальное, что делает Uvibes",
    title: <>Тренировать и продвигать<br />свои <span className="sss-title-accent v-serif">soft skills.</span></>,
    subtitle: <>Помимо самих встреч, Uvibes становится настоящим путём развития:<br />вы учитесь, практикуетесь и получаете конкретное признание своей вовлечённости.</>,
    pausePodcast: "Поставить подкаст на паузу",
    listenPodcast: "Слушать подкаст",
    row1Title: "Доступные ресурсы",
    row1Body: "Видео, подкасты и статьи, чтобы шаг за шагом понять, как развивать каждый soft skill.",
    row1VideoAria: "Видео-превью Uvibes",
    row2Title: "Постоянная тренировочная площадка",
    row2Body: "Реальные ситуации для развития и укрепления коммуникативных навыков.",
    row2VideoAria: "Превью настоящего разговора Uvibes",
    row3Title: "Признание вовлечённости",
    row3Body: "Сертификат, который подтверждает пройденный путь.",
    certifAlt: "Сертификат обучения Uvibes — пример Лу",
  },
  zh: {
    eyebrow: "Uvibes 的另一个独特之处",
    title: <>训练并展现<br />你的 <span className="sss-title-accent v-serif">软技能。</span></>,
    subtitle: <>除了交流本身，Uvibes 还成为一条真正的成长之路：<br />你在学习、在实践，你的投入也会获得切实的认可。</>,
    pausePodcast: "暂停播客",
    listenPodcast: "收听播客",
    row1Title: "随手可得的资源",
    row1Body: "视频、播客和文章，帮助你一步步理解如何提升每一项软技能。",
    row1VideoAria: "Uvibes 视频预览",
    row2Title: "持续的训练场",
    row2Body: "真实场景帮助你建立并强化人际能力。",
    row2VideoAria: "一次真实 Uvibes 对话的预览",
    row3Title: "对你投入的认可",
    row3Body: "一份认可你所完成历程的证书。",
    certifAlt: "Uvibes 培训证书 — Lou 的示例",
  },
  ja: {
    eyebrow: "Uvibesがもたらすもう一つの独自性",
    title: <>ソフトスキルを<br /><span className="sss-title-accent v-serif">鍛え、見せる。</span></>,
    subtitle: <>出会いそのものを超えて、Uvibesは本物の成長プロセスになります：<br />学び、実践し、その取り組みは具体的に認められます。</>,
    pausePodcast: "ポッドキャストを一時停止",
    listenPodcast: "ポッドキャストを聴く",
    row1Title: "手元にあるリソース",
    row1Body: "各ソフトスキルをどう伸ばすかを一歩ずつ理解できる、動画・ポッドキャスト・記事。",
    row1VideoAria: "Uvibes動画プレビュー",
    row2Title: "継続的な実践の場",
    row2Body: "対人スキルを育み、強化するためのリアルな状況。",
    row2VideoAria: "実際のUvibesの会話のプレビュー",
    row3Title: "取り組みの承認",
    row3Body: "歩んできた道のりを認める証明書。",
    certifAlt: "Uvibesトレーニング証明書 — Louの例",
  },
  hi: {
    eyebrow: "Uvibes जो एक और अनूठा काम करता है",
    title: <>अपने <span className="sss-title-accent v-serif">सॉफ्ट स्किल्स</span><br />को प्रशिक्षित करें और उजागर करें।</>,
    subtitle: <>मुलाकातों से परे, Uvibes एक सच्चा विकास का सफर बन जाता है:<br />आप सीखते हैं, अभ्यास करते हैं, और आपकी सहभागिता को ठोस रूप से मान्यता मिलती है।</>,
    pausePodcast: "पॉडकास्ट रोकें",
    listenPodcast: "पॉडकास्ट सुनें",
    row1Title: "उपलब्ध संसाधन",
    row1Body: "वीडियो, पॉडकास्ट और लेख, जो आपको हर सॉफ्ट स्किल में आगे बढ़ने का तरीका चरण दर चरण समझाते हैं।",
    row1VideoAria: "Uvibes वीडियो पूर्वावलोकन",
    row2Title: "एक निरंतर प्रशिक्षण मैदान",
    row2Body: "संबंध-कौशलों को विकसित करने और मज़बूत करने के लिए वास्तविक स्थितियाँ।",
    row2VideoAria: "एक असली Uvibes बातचीत का पूर्वावलोकन",
    row3Title: "सहभागिता की मान्यता",
    row3Body: "एक प्रमाणपत्र जो तय किए गए सफर को मान्यता देता है।",
    certifAlt: "Uvibes प्रशिक्षण प्रमाणपत्र — लू का उदाहरण",
  },
  ar: {
    eyebrow: "شيء آخر تقدمه Uvibes بشكل فريد",
    title: <>درّب وأظهر<br />مهاراتك <span className="sss-title-accent v-serif">اللينة.</span></>,
    subtitle: <>إلى جانب اللقاءات نفسها، تتحول Uvibes إلى مسار تطور حقيقي:<br />تتعلم، تتدرب، ويُعترف بالتزامك بشكل ملموس.</>,
    pausePodcast: "إيقاف البودكاست مؤقتًا",
    listenPodcast: "استمع إلى البودكاست",
    row1Title: "موارد في متناول يدك",
    row1Body: "فيديوهات وبودكاست ومقالات لفهم، خطوة بخطوة، كيفية تطوير كل مهارة لينة.",
    row1VideoAria: "معاينة فيديو Uvibes",
    row2Title: "ميدان تدريب مستمر",
    row2Body: "مواقف حقيقية لبناء وتعزيز المهارات العلائقية.",
    row2VideoAria: "معاينة لمحادثة Uvibes حقيقية",
    row3Title: "الاعتراف بالالتزام",
    row3Body: "شهادة تعترف بالمسار المُنجَز.",
    certifAlt: "شهادة تدريب Uvibes — مثال لو",
  },
};

export default function SolutionSoftSkills({ locale = "fr" }: { locale?: string }) {
  const sss = SSS_TXT[locale];
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Un seul média à la fois : lancer l'un met l'autre en pause automatiquement.
  const togglePodcast = () => {
    const a = audioRef.current;
    if (!a || !PODCAST_SRC) return;
    if (a.paused) {
      videoRef.current?.pause();
      setVideoPlaying(false);
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v || !REEL_SRC) return;
    if (v.paused) {
      audioRef.current?.pause();
      setPlaying(false);
      v.play();
      setVideoPlaying(true);
    } else {
      v.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <section id="soft-skills" className={`sss-section${vis ? " sss-vis" : ""}`} ref={ref}>
      {/* Ondes de vibration en fond — identité uvibes */}
      <div className="sss-waves" aria-hidden="true">
        <GradientVibrationLine id="sss-w1" width={1800} height={70} amplitude={30} freq={5} strokeWidth={20} speed={11} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="sss-w2" width={1800} height={70} amplitude={24} freq={7} strokeWidth={13} speed={15} colorFrom="#FFB800" colorTo="#D90A5C" style={{ width: "100%" }} />
      </div>

      <div className="sss-inner">
        <header className="sss-head">
          <p className="sss-eyebrow">
            <span className="sss-eyebrow-dot" aria-hidden="true" />
            {sss ? sss.eyebrow : <>Innovation</>}
          </p>
          <h2 className="sss-title v-prompt">
            {sss ? sss.title : (
              <>Entraîner et valoriser<br />les <span className="sss-title-accent v-serif">soft skills.</span></>
            )}
          </h2>
          <p className="sss-subtitle">
            {sss ? sss.subtitle : (
              <>Au-delà des rencontres, Uvibes propose un parcours de développement personnel et professionnel&nbsp;:<br />on apprend, on s&apos;exerce et on obtient une reconnaissance de son engagement.</>
            )}
          </p>
        </header>

        <div className="sss-rows">

          {/* ── 01 · Ressources — vidéo (reel) + podcast côte à côte ── */}
          <div className="sss-row" style={{ "--c": "#FD6E00" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <div className="sss-resources">
                <div
                  className={`sss-video-frame sss-video-frame--mini${REEL_SRC ? " sss-video-frame--clickable" : ""}`}
                  onClick={REEL_SRC ? toggleVideo : undefined}
                  role={REEL_SRC ? "button" : undefined}
                  tabIndex={REEL_SRC ? 0 : undefined}
                  aria-label={REEL_SRC ? (sss ? sss.row1VideoAria : "Aperçu vidéo Uvibes") : undefined}
                >
                  {REEL_SRC ? (
                    <>
                      <video
                        ref={videoRef}
                        className="sss-video"
                        src={REEL_SRC}
                        muted
                        loop
                        playsInline
                        onPause={() => setVideoPlaying(false)}
                      />
                      {!videoPlaying ? (
                        <span className="sss-video-ph-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      ) : (
                        <span className="sss-video-ph-play sss-video-ph-play--pause" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="sss-video-ph" aria-hidden="true">
                      <span className="sss-video-ph-play">
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </div>
                  )}
                </div>
                <div className={`sss-podcast${playing ? " is-playing" : ""}`}>
                  <div className="sss-podcast-discwrap">
                    <span className="sss-podcast-halo" aria-hidden="true" />
                    <span className="sss-podcast-halo sss-podcast-halo--2" aria-hidden="true" />
                    <button
                      type="button"
                      className="sss-podcast-disc"
                      onClick={togglePodcast}
                      aria-pressed={playing}
                      aria-label={playing ? (sss ? sss.pausePodcast : "Mettre le podcast en pause") : (sss ? sss.listenPodcast : "Écouter le podcast")}
                    >
                      {playing ? (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </button>
                  </div>
                  <div className="sss-podcast-wave" aria-hidden="true">
                    {WAVE_BARS.map((h, i) => (
                      <span key={i} className="sss-podcast-bar" style={{ "--h": h, animationDelay: `${i * 0.08}s` } as React.CSSProperties} />
                    ))}
                  </div>
                  {PODCAST_SRC && (
                    <audio ref={audioRef} src={PODCAST_SRC} onEnded={() => setPlaying(false)} preload="none" />
                  )}
                </div>
              </div>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">01</span>
              <h3 className="sss-row-title">{sss ? sss.row1Title : "Des ressources à disposition"}</h3>
              <p className="sss-row-body">
                {sss
                  ? sss.row1Body
                  : <>Des vidéos, podcasts et articles pour comprendre, pas à pas, comment progresser sur chaque soft skill.</>}
              </p>
            </div>
          </div>

          {/* ── 02 · Terrain d'entraînement — vidéo polaroïd d'un vibe réel ── */}
          <div className="sss-row sss-row--reverse" style={{ "--c": "#E6007E" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <figure className="sss-vibe-polaroid">
                <video
                  className="sss-vibe-video"
                  src={getVideoUrl("arjun-mobile.mp4")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={sss ? sss.row2VideoAria : "Aperçu d'un échange Uvibes en conditions réelles"}
                />
              </figure>
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">02</span>
              <h3 className="sss-row-title">{sss ? sss.row2Title : <>Un terrain d&apos;entraînement continu</>}</h3>
              <p className="sss-row-body">
                {sss
                  ? sss.row2Body
                  : <>Des mises en situation réelles pour développer et renforcer ses compétences relationnelles.</>}
              </p>
            </div>
          </div>

          {/* ── 03 · Attestation ── */}
          <div className="sss-row" style={{ "--c": "#F59E0B" } as React.CSSProperties}>
            <div className="sss-illu-col">
              <Image
                src="/images/attestation-lou.png"
                alt={sss ? sss.certifAlt : "Attestation d'entraînement Uvibes — exemple Lou"}
                width={260}
                height={184}
                className="sss-attestation-img"
              />
            </div>
            <div className="sss-text-col">
              <span className="sss-num v-mono">03</span>
              <h3 className="sss-row-title">{sss ? sss.row3Title : <>Une valorisation de l&apos;engagement</>}</h3>
              <p className="sss-row-body">
                {sss ? sss.row3Body : "Une attestation qui reconnaît le parcours réalisé."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
