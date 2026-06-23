"use client";

import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import VibrationLine from "@/components/shared/VibrationLine";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/uvibes/whyName.css";

// Petites particules flottantes — déco animée
const PARTS = Array.from({ length: 9 });

const WN_TXT: Record<string, {
  eyebrow: string; title: React.ReactNode; lead: React.ReactNode;
  uNote: React.ReactNode; vibesWord: string; vibesNote: React.ReactNode;
  punch: React.ReactNode; closing: React.ReactNode;
}> = {
  en: {
    eyebrow: "What's in the name",
    title: <>Why <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes brings out the richness of human exchange within communities, sparking <em className="uv-em-orange">unexpected encounters</em>.</>,
    uNote: <>you — the one living the experience</>,
    vibesWord: "vibrations",
    vibesNote: <>those waves that arise when you connect, even with a stranger</>,
    punch: <>Uvibes — the good waves that bind a <em className="uv-em-rose">collective</em> together.</>,
    closing: (
      <>Every encounter is a chance to <em className="uv-em-rose">(re)discover</em>{" "}
      someone in your community — where wonder is created and conversations come alive.</>
    ),
  },
  es: {
    eyebrow: "El sentido del nombre",
    title: <>¿Por qué <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes saca a la luz la riqueza de los intercambios humanos dentro de los colectivos, dando lugar a <em className="uv-em-orange">encuentros inesperados</em>.</>,
    uNote: <>tú — quien vive la experiencia</>,
    vibesWord: "vibraciones",
    vibesNote: <>esas ondas que surgen al conectar, incluso con un desconocido</>,
    punch: <>Uvibes — las buenas ondas que unen a un <em className="uv-em-rose">colectivo</em>.</>,
    closing: (
      <>Cada encuentro es una oportunidad para <em className="uv-em-rose">(re)descubrir</em>{" "}
      a alguien de tu colectivo — ahí nace el asombro y las conversaciones cobran vida.</>
    ),
  },
  de: {
    eyebrow: "Was im Namen steckt",
    title: <>Warum <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes bringt den Reichtum menschlicher Begegnungen innerhalb von Kollektiven zum Vorschein und lässt <em className="uv-em-orange">unerwartete Begegnungen</em> entstehen.</>,
    uNote: <>Sie — die die Erfahrung erleben</>,
    vibesWord: "Schwingungen",
    vibesNote: <>jene Wellen, die beim Verbinden entstehen, selbst mit Fremden</>,
    punch: <>Uvibes — die guten Schwingungen, die ein <em className="uv-em-rose">Kollektiv</em> verbinden.</>,
    closing: (
      <>Jede Begegnung ist eine Chance, jemanden aus Ihrem Kollektiv <em className="uv-em-rose">(wieder) zu entdecken</em>{" "}
      — dort entsteht Staunen, und Gespräche werden lebendig.</>
    ),
  },
  it: {
    eyebrow: "Il senso del nome",
    title: <>Perché <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes fa emergere la ricchezza degli scambi umani all&apos;interno delle comunità, facendo nascere <em className="uv-em-orange">incontri inaspettati</em>.</>,
    uNote: <>tu — chi vive l&apos;esperienza</>,
    vibesWord: "vibrazioni",
    vibesNote: <>quelle onde che nascono connettendosi, anche con uno sconosciuto</>,
    punch: <>Uvibes — le buone onde che uniscono un <em className="uv-em-rose">collettivo</em>.</>,
    closing: (
      <>Ogni incontro è un&apos;occasione per <em className="uv-em-rose">(ri)scoprire</em>{" "}
      qualcuno della tua comunità — è lì che nasce lo stupore e le conversazioni prendono vita.</>
    ),
  },
  pt: {
    eyebrow: "O sentido do nome",
    title: <>Porquê <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>A Uvibes revela a riqueza das trocas humanas dentro dos coletivos, dando origem a <em className="uv-em-orange">encontros inesperados</em>.</>,
    uNote: <>você — quem vive a experiência</>,
    vibesWord: "vibrações",
    vibesNote: <>essas ondas que surgem ao conectar, mesmo com um desconhecido</>,
    punch: <>Uvibes — as boas ondas que unem um <em className="uv-em-rose">coletivo</em>.</>,
    closing: (
      <>Cada encontro é uma oportunidade para <em className="uv-em-rose">(re)descobrir</em>{" "}
      alguém do seu coletivo — é aí que nasce o encantamento e as conversas ganham vida.</>
    ),
  },
  ru: {
    eyebrow: "Смысл имени",
    title: <>Почему <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes раскрывает богатство человеческого общения внутри коллективов, порождая <em className="uv-em-orange">неожиданные встречи</em>.</>,
    uNote: <>ты — тот, кто проживает этот опыт</>,
    vibesWord: "вибрации",
    vibesNote: <>те волны, что рождаются при связи, даже с незнакомцем</>,
    punch: <>Uvibes — добрые волны, что связывают <em className="uv-em-rose">коллектив</em>.</>,
    closing: (
      <>Каждая встреча — это шанс <em className="uv-em-rose">(пере)открыть</em>{" "}
      кого-то из вашего коллектива — там рождается удивление, и разговоры обретают жизнь.</>
    ),
  },
  zh: {
    eyebrow: "名字的含义",
    title: <>为什么叫 <em className="uv-serif-grad">Uvibes</em>？</>,
    lead: <>Uvibes 唤醒集体内部人际交流的丰富性，催生<em className="uv-em-orange">意想不到的相遇</em>。</>,
    uNote: <>你 —— 经历这一切的人</>,
    vibesWord: "振动",
    vibesNote: <>与人相连时升起的波动，即便对方仍是陌生人</>,
    punch: <>Uvibes —— 连接<em className="uv-em-rose">集体</em>的良好振动。</>,
    closing: (
      <>每一次相遇，都是<em className="uv-em-rose">（重新）发现</em>{" "}
      你集体中某个人的机会——惊喜由此而生，对话由此鲜活。</>
    ),
  },
  ja: {
    eyebrow: "名前の意味",
    title: <>なぜ<em className="uv-serif-grad">Uvibes</em>なのか？</>,
    lead: <>Uvibesはコレクティフの中にある人と人との交流の豊かさを引き出し、<em className="uv-em-orange">予想外の出会い</em>を生み出します。</>,
    uNote: <>あなた —— 体験を生きる人</>,
    vibesWord: "振動",
    vibesNote: <>誰かとつながるとき生まれる波、まだ見知らぬ相手でも</>,
    punch: <>Uvibes —— <em className="uv-em-rose">集団</em>をつなぐ良い波。</>,
    closing: (
      <>すべての出会いは、あなたのコレクティフの誰かを<em className="uv-em-rose">（再）発見する</em>{" "}
      チャンスです——そこに驚きが生まれ、対話が息づきます。</>
    ),
  },
  hi: {
    eyebrow: "नाम का अर्थ",
    title: <>क्यों <em className="uv-serif-grad">Uvibes</em>?</>,
    lead: <>Uvibes समूहों के भीतर मानवीय आदान-प्रदान की समृद्धि को सामने लाता है, और <em className="uv-em-orange">अप्रत्याशित मुलाकातों</em> को जन्म देता है।</>,
    uNote: <>आप — जो अनुभव जीते हैं</>,
    vibesWord: "कंपन",
    vibesNote: <>वे तरंगें जो जुड़ने पर उभरती हैं, अजनबी से भी</>,
    punch: <>Uvibes — अच्छी तरंगें जो एक <em className="uv-em-rose">समूह</em> को जोड़ती हैं।</>,
    closing: (
      <>हर मुलाकात आपके समूह के किसी व्यक्ति को <em className="uv-em-rose">(फिर से) जानने</em>{" "}
      का मौका है — वहीं अचंभा पैदा होता है और बातचीत जीवंत हो उठती है।</>
    ),
  },
  ar: {
    eyebrow: "معنى الاسم",
    title: <>لماذا <em className="uv-serif-grad">Uvibes</em>؟</>,
    lead: <>تُظهر Uvibes ثراء التبادلات الإنسانية داخل المجموعات، وتُولّد <em className="uv-em-orange">لقاءات غير متوقعة</em>.</>,
    uNote: <>أنت — من يعيش هذه التجربة</>,
    vibesWord: "اهتزازات",
    vibesNote: <>تلك الموجات التي تنشأ عند التواصل، حتى مع غريب</>,
    punch: <>Uvibes — الموجات الطيبة التي تربط <em className="uv-em-rose">المجموعة</em>.</>,
    closing: (
      <>كل لقاء هو فرصة <em className="uv-em-rose">لإعادة اكتشاف</em>{" "}
      شخص من مجموعتك — هناك يولد الانبهار، وتنبض الأحاديث بالحياة.</>
    ),
  },
};

// Une révélation : grande lettre/mot → connecteur animé → sens
function Reveal({ big, word, note, wave }: {
  big: string; word: React.ReactNode; note: React.ReactNode; wave?: boolean;
}) {
  return (
    <div className={`uvn-rev${wave ? " uvn-rev--wave" : ""}`}>
      <span className="uvn-rev-big v-serif">
        {big}
        {wave && (
          <span className="uvn-rev-line" aria-hidden="true">
            <GradientVibrationLine
              id="uvn-vibes-wave"
              width={260} height={40} amplitude={9} freq={6}
              strokeWidth={3} speed={5}
              colorFrom="#FD6E00" colorTo="#E6007E"
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        )}
      </span>
      <span className="uvn-rev-arrow" aria-hidden="true">
        <span className="uvn-rev-arrow-dot" />
        <span className="uvn-rev-arrow-dot" />
        <span className="uvn-rev-arrow-dot" />
      </span>
      <span className="uvn-rev-mean">
        <span className="uvn-rev-word v-serif">{word}</span>
        <span className="uvn-rev-note">{note}</span>
      </span>
    </div>
  );
}

export default function WhyName({ locale = "fr" }: { locale?: string }) {
  const wn = locale !== "fr" ? WN_TXT[locale] : undefined;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`uvn-section${vis ? " uvn-vis" : ""}`} ref={ref}>
      {/* Particules flottantes */}
      <div className="uvn-particles" aria-hidden="true">
        {PARTS.map((_, i) => (
          <span
            key={i}
            className={`uvn-p uvn-p--${i % 3}`}
            style={{
              left: `${(i * 41 + 7) % 100}%`,
              top: `${(i * 53 + 11) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="uvn-inner">
        {/* En-tête centré */}
        <div className="uvn-head">
          <p className="uv-eyebrow uvn-eyebrow">
            <span className="uv-eyebrow-dot" aria-hidden="true" />
            {wn ? wn.eyebrow : "Le sens du nom"}
          </p>
          <h2 className="uv-section-title uvn-title">
            {wn ? wn.title : (
              <>Pourquoi <em className="uv-serif-grad">Uvibes</em>&nbsp;?</>
            )}
          </h2>
          <p className="uvn-lead">
            {wn ? wn.lead : (
              <>Uvibes active la richesse des échanges humains au sein des collectifs, en y faisant naître des <em className="uv-em-orange">rencontres inattendues</em>.</>
            )}
          </p>
        </div>

        {/* Décodage du nom — deux révélations animées + punchline */}
        <div className="uvn-decode">
          <span className="uvn-decode-glow" aria-hidden="true" />

          <Reveal
            big="U"
            word="You"
            note={wn ? wn.uNote : <>toi — celui qui vit l&apos;expérience</>}
          />
          <Reveal
            big="Vibes"
            wave
            word={wn ? wn.vibesWord : "vibrations"}
            note={wn ? wn.vibesNote : <>ces ondes qui naissent quand on se connecte, même à un inconnu</>}
          />

          <p className="uvn-punch v-serif">
            {wn ? wn.punch : (
              <>Uvibes, ce sont les bonnes ondes qui relient un <em className="uv-em-rose">collectif</em>.</>
            )}
          </p>
        </div>

        {/* Médias — paire de polaroïds vidéo centrée */}
        <div className="uvn-media">
          <div className="uvn-polaroid uvn-polaroid--a">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Nadine-mobile.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Nadine</span>
          </div>
          <div className="uvn-polaroid uvn-polaroid--b">
            <div className="uvn-polaroid-media">
              <video src={getVideoUrl("Isaline-desktop.mp4")} autoPlay muted loop playsInline />
            </div>
            <span className="uvn-polaroid-cap v-serif">Isaline</span>
          </div>
        </div>

        {/* Phrase de clôture centrée */}
        <p className="uvn-closing">
          {wn ? wn.closing : (
            <>Chaque rencontre est une aventure pour <em className="uv-em-rose">(re)découvrir</em>{" "}
            quelqu&apos;un de son collectif — l&apos;émerveillement se crée, les conversations prennent vie.</>
          )}
        </p>
      </div>

      {/* Ligne de vibration bas de section */}
      <div className="uvn-vib" aria-hidden="true">
        <VibrationLine width={1800} height={50} amplitude={18} freq={8} stroke="rgba(253,110,0,.22)" strokeWidth={1.5} speed={16} />
        <VibrationLine width={1800} height={50} amplitude={11} freq={13} stroke="rgba(217,10,92,.14)" strokeWidth={1} speed={22} />
      </div>
    </section>
  );
}
