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

// Petits morceaux de texte par langue — pour étendre facilement à de nouvelles langues
// sans dupliquer toute la structure JSX (titre découpé en 3 segments colorés + citation).
const CI_TXT: Record<string, {
  eyebrow: React.ReactNode;
  t1: string; t2: string; t3: string; t4: string; enfin: React.ReactNode;
  body: React.ReactNode;
}> = {
  en: {
    eyebrow: "The strength of an organization rests on its relationships.",
    t1: "What if the ", t2: "conversations", t3: "that matter ", t4: "finally", enfin: "happened?",
    body: (
      <>
        <p>Uvibes gets the good stuff moving — {kw(0,"tips")}, {kw(1,"experiences")} and {kw(2,"perspectives")} — through short, human, engaging conversations.</p>
        <p>In plenty of communities, we hesitate to start the conversation — and we underestimate what simple {kw(6,"peer-to-peer exchanges")} can do.</p>
        <p>Uvibes makes the {kw(7,"right conversations")} happen, between the {kw(8,"right people")}, at the {kw(9,"right time")}. Your organization becomes more {kw(10,"connected")}, more {kw(11,"fluid")} and more {kw(12,"effective")}.</p>
      </>
    ),
  },
  es: {
    eyebrow: <>La fuerza de una organización se basa en sus relaciones.</>,
    t1: "¿Y si las ", t2: "conversaciones", t3: "que cuentan ", t4: "ocurrieran", enfin: <>al fin&nbsp;?</>,
    body: (
      <>
        <p>Uvibes pone en circulación lo que realmente importa — {kw(0,"buenos consejos")}, {kw(1,"experiencias")} y {kw(2,"puntos de vista")} — a través de conversaciones breves, humanas y cercanas.</p>
        <p>En muchos colectivos, no siempre nos atrevemos a iniciar la conversación, y subestimamos lo que pueden aportar simples {kw(6,"intercambios entre pares")}.</p>
        <p>Uvibes facilita las {kw(7,"conversaciones adecuadas")}, entre las {kw(8,"personas adecuadas")}, en el {kw(9,"momento adecuado")}. Tu organización se vuelve más {kw(10,"conectada")}, más {kw(11,"fluida")} y más {kw(12,"eficaz")}.</p>
      </>
    ),
  },
  de: {
    eyebrow: <>Die Stärke einer Organisation beruht auf ihren Beziehungen.</>,
    t1: "Was wäre, wenn die ", t2: "Gespräche", t3: "die zählen, ", t4: "endlich", enfin: "stattfänden?",
    body: (
      <>
        <p>Uvibes bringt das Wichtige in Bewegung — {kw(0,"Tipps")}, {kw(1,"Erfahrungen")} und {kw(2,"Perspektiven")} — durch kurze, menschliche, einnehmende Gespräche.</p>
        <p>In vielen Kollektiven zögern wir, das Gespräch zu beginnen — und unterschätzen, was einfache {kw(6,"Peer-to-Peer-Austausche")} bewirken können.</p>
        <p>Uvibes ermöglicht die {kw(7,"richtigen Gespräche")}, zwischen den {kw(8,"richtigen Menschen")}, zur {kw(9,"richtigen Zeit")}. Deine Organisation wird {kw(10,"verbundener")}, {kw(11,"flüssiger")} und {kw(12,"effektiver")}.</p>
      </>
    ),
  },
  it: {
    eyebrow: <>La forza di un&apos;organizzazione si basa sulle sue relazioni.</>,
    t1: "E se le ", t2: "conversazioni", t3: "che contano ", t4: "accadessero", enfin: "finalmente?",
    body: (
      <>
        <p>Uvibes mette in circolazione ciò che conta davvero — {kw(0,"consigli utili")}, {kw(1,"esperienze")} e {kw(2,"punti di vista")} — attraverso conversazioni brevi, umane e coinvolgenti.</p>
        <p>In molte comunità, non osiamo sempre avviare la conversazione, e sottovalutiamo ciò che possono offrire semplici {kw(6,"scambi tra pari")}.</p>
        <p>Uvibes rende possibili le {kw(7,"conversazioni giuste")}, tra le {kw(8,"persone giuste")}, al {kw(9,"momento giusto")}. La tua organizzazione diventa più {kw(10,"connessa")}, più {kw(11,"fluida")} e più {kw(12,"efficace")}.</p>
      </>
    ),
  },
  pt: {
    eyebrow: <>A força de uma organização baseia-se nas suas relações.</>,
    t1: "E se as ", t2: "conversas", t3: "que contam ", t4: "finalmente", enfin: "acontecessem?",
    body: (
      <>
        <p>A Uvibes põe em circulação o que realmente importa — {kw(0,"boas dicas")}, {kw(1,"experiências")} e {kw(2,"pontos de vista")} — através de conversas breves, humanas e envolventes.</p>
        <p>Em muitos coletivos, nem sempre nos atrevemos a iniciar a conversa, e subestimamos o que simples {kw(6,"trocas entre pares")} podem trazer.</p>
        <p>A Uvibes torna possíveis as {kw(7,"conversas certas")}, entre as {kw(8,"pessoas certas")}, no {kw(9,"momento certo")}. A tua organização torna-se mais {kw(10,"conectada")}, mais {kw(11,"fluida")} e mais {kw(12,"eficaz")}.</p>
      </>
    ),
  },
  ru: {
    eyebrow: <>Сила организации основывается на её отношениях.</>,
    t1: "А что, если ", t2: "разговоры", t3: "которые важны, ", t4: "наконец", enfin: "случились?",
    body: (
      <>
        <p>Uvibes приводит в движение то, что действительно важно — {kw(0,"советы")}, {kw(1,"опыт")} и {kw(2,"взгляды")} — через короткие, человечные, увлекательные беседы.</p>
        <p>Во многих коллективах мы не всегда решаемся начать разговор и недооцениваем, что могут дать простые {kw(6,"обмены между коллегами")}.</p>
        <p>Uvibes делает возможными {kw(7,"нужные разговоры")} между {kw(8,"нужными людьми")} в {kw(9,"нужный момент")}. Ваша организация становится более {kw(10,"связанной")}, более {kw(11,"гибкой")} и более {kw(12,"эффективной")}.</p>
      </>
    ),
  },
  zh: {
    eyebrow: <>组织的力量基于其关系。</>,
    t1: "如果", t2: "真正重要的对话", t3: "能够", t4: "终于", enfin: "发生，会怎样？",
    body: (
      <>
        <p>Uvibes让真正重要的东西流动起来——{kw(0,"好建议")}、{kw(1,"经验")}和{kw(2,"观点")}——通过简短、真实、有温度的对话。</p>
        <p>在许多集体中，我们并不总是敢于开启对话——也常常低估简单的{kw(6,"同伴间交流")}所能带来的价值。</p>
        <p>Uvibes让{kw(7,"合适的对话")}在{kw(8,"合适的人")}之间、于{kw(9,"合适的时机")}发生。你的组织将变得更{kw(10,"紧密")}、更{kw(11,"顺畅")}、更{kw(12,"高效")}。</p>
      </>
    ),
  },
  ja: {
    eyebrow: <>組織の強さは、その関係性に基づいています。</>,
    t1: "もし、", t2: "本当に大切な会話", t3: "が", t4: "ついに", enfin: "実現したら？",
    body: (
      <>
        <p>Uvibesは、{kw(0,"ちょっとしたヒント")}、{kw(1,"経験")}、{kw(2,"視点")}など、本当に大切なものを循環させます——短く、人間味があり、心に響く会話を通じて。</p>
        <p>多くのコミュニティでは、会話を始めることに躊躇しがちです——そして、シンプルな{kw(6,"ピアツーピアの交流")}が持つ力を過小評価しています。</p>
        <p>Uvibesは、{kw(7,"適切な会話")}を、{kw(8,"適切な人々")}の間で、{kw(9,"適切なタイミング")}に実現します。あなたの組織はより{kw(10,"つながり")}、より{kw(11,"スムーズ")}に、より{kw(12,"効果的")}になります。</p>
      </>
    ),
  },
  hi: {
    eyebrow: <>किसी संगठन की ताक़त उसके रिश्तों पर निर्भर करती है।</>,
    t1: "क्या हो अगर ", t2: "ज़रूरी बातचीत", t3: "आख़िरकार ", t4: "हो", enfin: "जाए?",
    body: (
      <>
        <p>Uvibes उन चीज़ों को आगे बढ़ाता है जो वास्तव में मायने रखती हैं — {kw(0,"अच्छी सलाह")}, {kw(1,"अनुभव")} और {kw(2,"नज़रिए")} — छोटी, मानवीय और दिलचस्प बातचीत के ज़रिए।</p>
        <p>कई समुदायों में, हम बातचीत शुरू करने में हिचकिचाते हैं — और साधारण {kw(6,"साथियों के बीच आदान-प्रदान")} की ताक़त को कम आंकते हैं।</p>
        <p>Uvibes सही {kw(7,"बातचीत")} को सही {kw(8,"लोगों")} के बीच, सही {kw(9,"समय")} पर संभव बनाता है। आपका संगठन अधिक {kw(10,"जुड़ा हुआ")}, अधिक {kw(11,"सहज")} और अधिक {kw(12,"प्रभावी")} बन जाता है।</p>
      </>
    ),
  },
  ar: {
    eyebrow: <>تقوم قوة المنظمة على علاقاتها.</>,
    t1: "ماذا لو ", t2: "المحادثات", t3: "المهمة ", t4: "حدثت", enfin: "أخيرًا؟",
    body: (
      <>
        <p>يُحرّك Uvibes ما يهم فعلًا — {kw(0,"نصائح مفيدة")}، {kw(1,"تجارب")} و{kw(2,"وجهات نظر")} — من خلال محادثات قصيرة وإنسانية وجذابة.</p>
        <p>في كثير من المجتمعات، لا نجرؤ دائمًا على بدء المحادثة — ونقلّل من شأن ما يمكن أن تقدّمه {kw(6,"التبادلات بين الأفراد")} البسيطة.</p>
        <p>يجعل Uvibes {kw(7,"المحادثات المناسبة")} تحدث بين {kw(8,"الأشخاص المناسبين")} في {kw(9,"الوقت المناسب")}. تصبح منظمتك أكثر {kw(10,"تواصلًا")}، وأكثر {kw(11,"سلاسة")} وأكثر {kw(12,"فعالية")}.</p>
      </>
    ),
  },
};

export default function ConversationIntro({ locale = "fr" }: { locale?: string }) {
  const [video, setVideo] = useState(VIDEOS[0]);
  const ci = locale !== "fr" ? CI_TXT[locale] : undefined;

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
              {ci ? ci.eyebrow : <>La force d&apos;une organisation repose sur ses relations.</>}
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="ci-title v-prompt">
            {ci ? (
              <>
                <span className="ci-t1">{ci.t1}</span>
                <span className="ci-t2">{ci.t2}</span>
                <br /><span className="ci-t3">{ci.t3}</span>
                <span className="ci-t4">{ci.t4}</span>
                <br /><span className="v-serif ci-title-enfin">{ci.enfin}</span>
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
              {ci ? ci.body : (
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
