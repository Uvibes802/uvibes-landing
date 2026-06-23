"use client";

import { getVideoUrl } from "@/utils/videoUrl";
import { FeaturesData } from "@/data/features/featuresData";
import { Check, CirclePlay, PauseCircle } from "lucide-react";
import { useRef, useState } from "react";
import "../../styles/cards/FeaturesCard.css";

const FEATURES_FR = [
  {
    n: "01",
    eyebrow: "Pour votre collectif",
    accent: "orange" as const,
    title: "Le voyage conversationnel",
    points: [
      "Des échanges vidéo one-to-one, guidés par des questions.",
      "Sur un nombre infini de sujets.",
      "Pendant un temps court, de 6 à 10 minutes.",
    ],
  },
  {
    n: "02",
    eyebrow: "Pour vous",
    accent: "rose" as const,
    title: "La connaissance approfondie de votre organisation",
    points: [
      "Un éclairage nouveau sur les dynamiques individuelles et collectives.",
      "La possibilité de recueillir régulièrement des avis sur les sujets de votre choix.",
      "L'émergence de nouvelles réflexions et propositions.",
    ],
  },
  {
    n: "03",
    eyebrow: "Pour tous",
    accent: "orange" as const,
    title: "Le parcours d'entraînement aux compétences relationnelles",
    points: [
      "Une cité des savoirs incluant vidéos, podcasts et articles.",
      "Plus de 5h d'entraînement en autonomie.",
      "Avec une attestation à la fin.",
    ],
  },
];

const FEATURES_EN = [
  {
    n: "01",
    eyebrow: "For your community",
    accent: "orange" as const,
    title: "The conversational journey",
    points: [
      "One-to-one video exchanges, guided by questions.",
      "On an endless range of topics.",
      "In a short window, from 6 to 10 minutes.",
    ],
  },
  {
    n: "02",
    eyebrow: "For you",
    accent: "rose" as const,
    title: "A deep understanding of your organization",
    points: [
      "Fresh insight into individual and collective dynamics.",
      "The ability to regularly gather opinions on the topics you choose.",
      "New ideas and proposals emerging naturally.",
    ],
  },
  {
    n: "03",
    eyebrow: "For everyone",
    accent: "orange" as const,
    title: "A training path for relational skills",
    points: [
      "A knowledge hub with videos, podcasts and articles.",
      "Over 5 hours of self-paced training.",
      "With a certificate at the end.",
    ],
  },
];

const FEATURES_ES = [
  {
    n: "01",
    eyebrow: "Para tu colectivo",
    accent: "orange" as const,
    title: "El viaje conversacional",
    points: [
      "Intercambios de vídeo uno a uno, guiados por preguntas.",
      "Sobre un número infinito de temas.",
      "Durante un tiempo breve, de 6 a 10 minutos.",
    ],
  },
  {
    n: "02",
    eyebrow: "Para ti",
    accent: "rose" as const,
    title: "El conocimiento profundo de tu organización",
    points: [
      "Una nueva mirada sobre las dinámicas individuales y colectivas.",
      "La posibilidad de recoger periódicamente opiniones sobre los temas que elijas.",
      "La aparición de nuevas reflexiones y propuestas.",
    ],
  },
  {
    n: "03",
    eyebrow: "Para todos",
    accent: "orange" as const,
    title: "El recorrido de entrenamiento en competencias relacionales",
    points: [
      "Una ciudad del conocimiento con vídeos, podcasts y artículos.",
      "Más de 5 horas de entrenamiento autónomo.",
      "Con un certificado al final.",
    ],
  },
];

const FEATURES_DE = [
  {
    n: "01",
    eyebrow: "Für Ihr Kollektiv",
    accent: "orange" as const,
    title: "Die Gesprächsreise",
    points: [
      "Eins-zu-eins-Videogespräche, geleitet durch Fragen.",
      "Zu einer unendlichen Anzahl von Themen.",
      "In kurzer Zeit, 6 bis 10 Minuten.",
    ],
  },
  {
    n: "02",
    eyebrow: "Für Sie",
    accent: "rose" as const,
    title: "Das vertiefte Verständnis Ihrer Organisation",
    points: [
      "Ein neuer Blick auf individuelle und kollektive Dynamiken.",
      "Die Möglichkeit, regelmäßig Meinungen zu von Ihnen gewählten Themen einzuholen.",
      "Das Entstehen neuer Überlegungen und Vorschläge.",
    ],
  },
  {
    n: "03",
    eyebrow: "Für alle",
    accent: "orange" as const,
    title: "Der Trainingsweg für Beziehungskompetenzen",
    points: [
      "Eine Wissensstadt mit Videos, Podcasts und Artikeln.",
      "Mehr als 5 Stunden selbstständiges Training.",
      "Mit einem Zertifikat am Ende.",
    ],
  },
];

const FEATURES_IT = [
  {
    n: "01",
    eyebrow: "Per la tua comunità",
    accent: "orange" as const,
    title: "Il viaggio conversazionale",
    points: [
      "Scambi video uno a uno, guidati da domande.",
      "Su un numero infinito di temi.",
      "In un breve lasso di tempo, da 6 a 10 minuti.",
    ],
  },
  {
    n: "02",
    eyebrow: "Per te",
    accent: "rose" as const,
    title: "La conoscenza approfondita della tua organizzazione",
    points: [
      "Una nuova prospettiva sulle dinamiche individuali e collettive.",
      "La possibilità di raccogliere regolarmente opinioni sui temi che scegli.",
      "L'emergere di nuove riflessioni e proposte.",
    ],
  },
  {
    n: "03",
    eyebrow: "Per tutti",
    accent: "orange" as const,
    title: "Il percorso di allenamento alle competenze relazionali",
    points: [
      "Una città del sapere con video, podcast e articoli.",
      "Più di 5 ore di allenamento autonomo.",
      "Con un attestato finale.",
    ],
  },
];

const FEATURES_PT = [
  {
    n: "01",
    eyebrow: "Para o seu coletivo",
    accent: "orange" as const,
    title: "A viagem conversacional",
    points: [
      "Trocas em vídeo um a um, guiadas por perguntas.",
      "Sobre um número infinito de temas.",
      "Durante um curto período, de 6 a 10 minutos.",
    ],
  },
  {
    n: "02",
    eyebrow: "Para si",
    accent: "rose" as const,
    title: "O conhecimento profundo da sua organização",
    points: [
      "Um novo olhar sobre as dinâmicas individuais e coletivas.",
      "A possibilidade de recolher regularmente opiniões sobre os temas da sua escolha.",
      "O surgimento de novas reflexões e propostas.",
    ],
  },
  {
    n: "03",
    eyebrow: "Para todos",
    accent: "orange" as const,
    title: "O percurso de treino em competências relacionais",
    points: [
      "Uma cidade do conhecimento com vídeos, podcasts e artigos.",
      "Mais de 5 horas de treino autónomo.",
      "Com um certificado no final.",
    ],
  },
];

const FEATURES_RU = [
  {
    n: "01",
    eyebrow: "Для вашего коллектива",
    accent: "orange" as const,
    title: "Разговорное путешествие",
    points: [
      "Видеообщение один на один, направляемое вопросами.",
      "На бесконечное число тем.",
      "За короткое время, от 6 до 10 минут.",
    ],
  },
  {
    n: "02",
    eyebrow: "Для вас",
    accent: "rose" as const,
    title: "Глубокое понимание вашей организации",
    points: [
      "Новый взгляд на индивидуальную и коллективную динамику.",
      "Возможность регулярно собирать мнения по выбранным вами темам.",
      "Появление новых идей и предложений.",
    ],
  },
  {
    n: "03",
    eyebrow: "Для всех",
    accent: "orange" as const,
    title: "Путь тренировки коммуникативных навыков",
    points: [
      "Город знаний с видео, подкастами и статьями.",
      "Более 5 часов самостоятельной тренировки.",
      "С сертификатом в конце.",
    ],
  },
];

const FEATURES_ZH = [
  {
    n: "01",
    eyebrow: "为你的集体",
    accent: "orange" as const,
    title: "对话之旅",
    points: [
      "一对一的视频交流，由问题引导。",
      "涉及无穷无尽的话题。",
      "时长短暂，6到10分钟。",
    ],
  },
  {
    n: "02",
    eyebrow: "为你",
    accent: "rose" as const,
    title: "对你组织的深入了解",
    points: [
      "对个体和集体动态的全新洞察。",
      "可以就你选择的话题定期收集意见。",
      "新想法和新提议的不断涌现。",
    ],
  },
  {
    n: "03",
    eyebrow: "为所有人",
    accent: "orange" as const,
    title: "人际能力训练之路",
    points: [
      "一座包含视频、播客和文章的知识之城。",
      "超过5小时的自主训练。",
      "结束时获得证书。",
    ],
  },
];

const FEATURES_JA = [
  {
    n: "01",
    eyebrow: "あなたのコレクティフのために",
    accent: "orange" as const,
    title: "対話の旅",
    points: [
      "質問に導かれた1対1のビデオ交流。",
      "無限のトピックについて。",
      "6分から10分という短い時間で。",
    ],
  },
  {
    n: "02",
    eyebrow: "あなたのために",
    accent: "rose" as const,
    title: "あなたの組織への深い理解",
    points: [
      "個人および集団のダイナミクスへの新たな視点。",
      "あなたが選んだテーマについて定期的に意見を集める可能性。",
      "新たな考察や提案の出現。",
    ],
  },
  {
    n: "03",
    eyebrow: "すべての人のために",
    accent: "orange" as const,
    title: "対人スキルを鍛える道のり",
    points: [
      "動画、ポッドキャスト、記事を含む知のシティ。",
      "5時間以上の自主トレーニング。",
      "最後に証明書が発行されます。",
    ],
  },
];

const FEATURES_HI = [
  {
    n: "01",
    eyebrow: "आपके समूह के लिए",
    accent: "orange" as const,
    title: "बातचीत की यात्रा",
    points: [
      "सवालों द्वारा निर्देशित वन-टू-वन वीडियो बातचीत।",
      "अनगिनत विषयों पर।",
      "6 से 10 मिनट के छोटे समय में।",
    ],
  },
  {
    n: "02",
    eyebrow: "आपके लिए",
    accent: "rose" as const,
    title: "आपके संगठन की गहरी समझ",
    points: [
      "व्यक्तिगत और सामूहिक गतिशीलता पर एक नई रोशनी।",
      "अपनी पसंद के विषयों पर नियमित रूप से विचार जुटाने की संभावना।",
      "नए विचारों और सुझावों का उभरना।",
    ],
  },
  {
    n: "03",
    eyebrow: "सभी के लिए",
    accent: "orange" as const,
    title: "संबंध-कौशल प्रशिक्षण का सफर",
    points: [
      "वीडियो, पॉडकास्ट और लेखों से भरा एक ज्ञान-नगर।",
      "5 घंटे से अधिक की स्व-गति प्रशिक्षण।",
      "अंत में एक प्रमाणपत्र के साथ।",
    ],
  },
];

const FEATURES_AR = [
  {
    n: "01",
    eyebrow: "لمجموعتك",
    accent: "orange" as const,
    title: "رحلة الحوار",
    points: [
      "تبادلات فيديو فردية، موجَّهة بأسئلة.",
      "حول عدد لا متناهٍ من المواضيع.",
      "خلال وقت قصير، من 6 إلى 10 دقائق.",
    ],
  },
  {
    n: "02",
    eyebrow: "لك",
    accent: "rose" as const,
    title: "معرفة عميقة بمؤسستك",
    points: [
      "رؤية جديدة للديناميكيات الفردية والجماعية.",
      "إمكانية جمع الآراء بانتظام حول المواضيع التي تختارها.",
      "ظهور أفكار ومقترحات جديدة.",
    ],
  },
  {
    n: "03",
    eyebrow: "للجميع",
    accent: "orange" as const,
    title: "مسار تدريب المهارات العلائقية",
    points: [
      "مدينة معرفة تضم فيديوهات وبودكاست ومقالات.",
      "أكثر من 5 ساعات من التدريب الذاتي.",
      "مع شهادة في النهاية.",
    ],
  },
];

const FC_AUDIO_TXT: Record<string, { pause: string; play: string }> = {
  en: { pause: "Pause", play: "Play" },
  es: { pause: "Pausar", play: "Reproducir" },
  de: { pause: "Pausieren", play: "Abspielen" },
  it: { pause: "Pausa", play: "Riproduci" },
  pt: { pause: "Pausar", play: "Reproduzir" },
  ru: { pause: "Пауза", play: "Воспроизвести" },
  zh: { pause: "暂停", play: "播放" },
  ja: { pause: "一時停止", play: "再生" },
  hi: { pause: "रोकें", play: "चलाएं" },
  ar: { pause: "إيقاف مؤقت", play: "تشغيل" },
};

// Légende affichée sous chaque vidéo témoignage (mêmes personnes quelle que
// soit la langue — ce sont des attributions réelles).
const VIDEO_CAPTIONS = [
  "Colette, Pyrénées-Orientales",
  "Atanase Périfan, fondateur de la Fête des voisins",
  "Lisa, étudiante à l'Université de Perpignan",
];

function FeatureRow({
  feature,
  videoSrc,
  index,
  caption,
  locale = "fr",
}: {
  feature: typeof FEATURES_FR[0];
  videoSrc: string;
  index: number;
  caption?: string;
  locale?: string;
}) {
  const fcAudio = FC_AUDIO_TXT[locale];
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverse = index % 2 === 1;

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };
  const handlePause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className={`fc-row fc-row--${feature.accent}${reverse ? " fc-row--reverse" : ""}`}>
      {/* Filigrane numéro */}
      <span className="fc-watermark" aria-hidden="true">{feature.n}</span>

      {/* Texte */}
      <div className="fc-text">
        <h3 className="fc-title v-prompt">{feature.title}</h3>
        <ul className="fc-list">
          {feature.points.map((p, i) => (
            <li key={i} className="fc-item">
              <span className="fc-chip" aria-hidden="true">
                <Check size={13} strokeWidth={2.6} />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visuel vidéo circulaire */}
      <div className="fc-visual">
        <div className="fc-halo" aria-hidden="true" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="fc-ripple" style={{ animationDelay: `${i * 1.3}s` }} aria-hidden="true" />
        ))}
        <div
          className={`fc-circle fc-circle--clickable`}
          onClick={playing ? handlePause : handlePlay}
          role="button"
          tabIndex={0}
          aria-label={playing ? (fcAudio ? fcAudio.pause : "Mettre en pause") : `${fcAudio ? fcAudio.play : "Lire"} : ${feature.title}`}
          onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") { if (playing) { handlePause(); } else { handlePlay(); } } }}
        >
          <video
            ref={videoRef}
            className={`fc-video${playing ? " --playing" : ""}`}
            src={getVideoUrl(videoSrc)}
            playsInline
            onPause={() => setPlaying(false)}
          />
          {!playing ? (
            <CirclePlay className="fc-play-icon" aria-hidden="true" />
          ) : (
            <PauseCircle className="fc-play-icon fc-pause-icon" aria-hidden="true" />
          )}
        </div>
        {caption && <p className="fc-caption">{caption}</p>}
      </div>
    </div>
  );
}

const FC_INTRO_TXT: Record<string, { eyebrow: string; title: React.ReactNode; sub: React.ReactNode }> = {
  en: {
    eyebrow: "Results",
    title: <>The real change brought by{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "Real, high-impact feedback from the field.",
  },
  es: {
    eyebrow: "Resultados",
    title: <>Los cambios concretos que aporta{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: <>Testimonios reales con un fuerte impacto positivo.</>,
  },
  de: {
    eyebrow: "Ergebnisse",
    title: <>Der konkrete Wandel durch{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "Echte Erfahrungsberichte mit starker positiver Wirkung.",
  },
  it: {
    eyebrow: "Risultati",
    title: <>I cambiamenti concreti portati da{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "Testimonianze reali con un forte impatto positivo.",
  },
  pt: {
    eyebrow: "Resultados",
    title: <>As mudanças concretas trazidas pela{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "Testemunhos reais com um forte impacto positivo.",
  },
  ru: {
    eyebrow: "Результаты",
    title: <>Реальные изменения, которые приносит{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "Реальные отзывы с сильным положительным эффектом.",
  },
  zh: {
    eyebrow: "成果",
    title: <><span className="fc-intro-serif v-serif">Uvibes</span> 带来的切实改变</>,
    sub: "具有强烈正向影响的真实反馈。",
  },
  ja: {
    eyebrow: "成果",
    title: <><span className="fc-intro-serif v-serif">Uvibes</span>がもたらす本当の変化</>,
    sub: "強いポジティブな効果を持つ実際の体験談。",
  },
  hi: {
    eyebrow: "परिणाम",
    title: <><span className="fc-intro-serif v-serif">Uvibes</span> द्वारा लाया गया असली बदलाव</>,
    sub: "ज़मीनी स्तर से मिली असली और सकारात्मक प्रतिक्रियाएं।",
  },
  ar: {
    eyebrow: "النتائج",
    title: <>التغيير الحقيقي الذي تجلبه{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>,
    sub: "شهادات حقيقية ذات أثر إيجابي قوي.",
  },
};

const FEATURES_BY_LOCALE: Record<string, typeof FEATURES_FR> = {
  en: FEATURES_EN, es: FEATURES_ES, de: FEATURES_DE, it: FEATURES_IT, pt: FEATURES_PT,
  ru: FEATURES_RU, zh: FEATURES_ZH, ja: FEATURES_JA, hi: FEATURES_HI, ar: FEATURES_AR,
};

export function FeaturesCard({ locale = "fr" }: { locale?: string }) {
  const FEATURES = FEATURES_BY_LOCALE[locale] ?? FEATURES_FR;
  const fcIntro = FC_INTRO_TXT[locale];
  return (
    <section className="fc-section" id="fonctionnalites" style={{ scrollMarginTop: 70 }}>
      {/* Intro centré */}
      <div className="fc-intro">
        <span className="fc-intro-eyebrow v-mono">
          <span className="fc-intro-dot" aria-hidden="true" />
          {fcIntro ? fcIntro.eyebrow : "Résultats"}
        </span>
        <h2 className="fc-intro-title v-prompt">
          {fcIntro ? fcIntro.title : (
            <>Les transformations apportées par{" "}<span className="fc-intro-serif v-serif">Uvibes</span></>
          )}
        </h2>
        <p className="fc-intro-sub">
          {fcIntro ? fcIntro.sub : <>Des retours d&apos;expérience à fort impact positif.</>}
        </p>
      </div>

      {/* 3 rangées */}
      {FEATURES.map((f, i) => (
        <FeatureRow
          key={i}
          feature={f}
          videoSrc={FeaturesData[i]?.video ?? ""}
          index={i}
          caption={VIDEO_CAPTIONS[i]}
          locale={locale}
        />
      ))}
    </section>
  );
}
