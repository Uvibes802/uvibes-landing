"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import "@/styles/solution/solutionStrategie.css";

// Contrairement à useIntersectionOnce (déclenché une seule fois), ce hook reste
// à jour à chaque passage dans/hors du viewport — nécessaire pour que le MacBook
// s'ouvre quand on arrive sur la section et se referme quand on la dépasse.
function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// Exemples de thématiques (verbatim) — défilent en ticker, pas en pastilles
const THEMES_FR = [
  "motivation et engagement",
  "équilibre vie professionnelle / vie personnelle",
  "sentiment d'appartenance",
  "qualité des relations au sein du collectif",
  "lien social et risque d'isolement",
  "besoins de formation",
  "usages numériques",
  "confiance en l'avenir",
  "culture d'entreprise et priorités stratégiques",
  "appréciation de la communication interne",
  "boîte à idées",
  "évaluation d'un projet, d'un événement ou d'une initiative",
];

const THEMES_EN = [
  "motivation and engagement",
  "work-life balance",
  "sense of belonging",
  "quality of relationships within the community",
  "social connection and risk of isolation",
  "training needs",
  "digital habits",
  "confidence in the future",
  "company culture and strategic priorities",
  "perception of internal communication",
  "suggestion box",
  "evaluation of a project, event or initiative",
];

const THEMES_ES = [
  "motivación y compromiso",
  "equilibrio entre vida profesional y personal",
  "sentido de pertenencia",
  "calidad de las relaciones dentro del colectivo",
  "vínculo social y riesgo de aislamiento",
  "necesidades de formación",
  "usos digitales",
  "confianza en el futuro",
  "cultura de empresa y prioridades estratégicas",
  "percepción de la comunicación interna",
  "buzón de ideas",
  "evaluación de un proyecto, evento o iniciativa",
];

const THEMES_DE = [
  "Motivation und Engagement",
  "Vereinbarkeit von Beruf und Privatleben",
  "Zugehörigkeitsgefühl",
  "Qualität der Beziehungen innerhalb des Kollektivs",
  "soziale Bindung und Isolationsrisiko",
  "Weiterbildungsbedarf",
  "digitale Nutzungsgewohnheiten",
  "Vertrauen in die Zukunft",
  "Unternehmenskultur und strategische Prioritäten",
  "Wahrnehmung der internen Kommunikation",
  "Ideenbriefkasten",
  "Bewertung eines Projekts, einer Veranstaltung oder einer Initiative",
];

const THEMES_IT = [
  "motivazione e impegno",
  "equilibrio vita professionale / vita personale",
  "senso di appartenenza",
  "qualità delle relazioni all'interno della comunità",
  "legame sociale e rischio di isolamento",
  "bisogni di formazione",
  "abitudini digitali",
  "fiducia nel futuro",
  "cultura aziendale e priorità strategiche",
  "percezione della comunicazione interna",
  "cassetta delle idee",
  "valutazione di un progetto, evento o iniziativa",
];

const THEMES_PT = [
  "motivação e compromisso",
  "equilíbrio entre vida profissional e pessoal",
  "sentido de pertença",
  "qualidade das relações dentro do coletivo",
  "vínculo social e risco de isolamento",
  "necessidades de formação",
  "hábitos digitais",
  "confiança no futuro",
  "cultura empresarial e prioridades estratégicas",
  "perceção da comunicação interna",
  "caixa de sugestões",
  "avaliação de um projeto, evento ou iniciativa",
];

const THEMES_RU = [
  "мотивация и вовлечённость",
  "баланс между работой и личной жизнью",
  "чувство принадлежности",
  "качество отношений внутри коллектива",
  "социальная связь и риск изоляции",
  "потребности в обучении",
  "цифровые привычки",
  "уверенность в будущем",
  "корпоративная культура и стратегические приоритеты",
  "восприятие внутренней коммуникации",
  "ящик предложений",
  "оценка проекта, события или инициативы",
];

const THEMES_ZH = [
  "动力与参与感",
  "工作与生活的平衡",
  "归属感",
  "集体内部关系的质量",
  "社会联系与孤立风险",
  "培训需求",
  "数字使用习惯",
  "对未来的信心",
  "企业文化与战略重点",
  "对内部沟通的评价",
  "意见箱",
  "对某个项目、活动或倡议的评估",
];

const THEMES_JA = [
  "モチベーションとエンゲージメント",
  "ワークライフバランス",
  "帰属意識",
  "コレクティフ内の関係の質",
  "社会的つながりと孤立のリスク",
  "研修ニーズ",
  "デジタル利用の実態",
  "未来への信頼",
  "企業文化と戦略的優先事項",
  "社内コミュニケーションの評価",
  "アイデアボックス",
  "プロジェクト、イベント、または取り組みの評価",
];

const THEMES_HI = [
  "प्रेरणा और सहभागिता",
  "कार्य-जीवन संतुलन",
  "अपनेपन की भावना",
  "समूह के भीतर रिश्तों की गुणवत्ता",
  "सामाजिक जुड़ाव और अलगाव का जोखिम",
  "प्रशिक्षण की ज़रूरतें",
  "डिजिटल उपयोग की आदतें",
  "भविष्य में विश्वास",
  "संगठन की संस्कृति और रणनीतिक प्राथमिकताएं",
  "आंतरिक संचार की धारणा",
  "सुझाव पेटी",
  "किसी परियोजना, आयोजन या पहल का आकलन",
];

const THEMES_AR = [
  "الدافعية والالتزام",
  "التوازن بين الحياة المهنية والشخصية",
  "الشعور بالانتماء",
  "جودة العلاقات داخل المجموعة",
  "الرابط الاجتماعي وخطر العزلة",
  "احتياجات التدريب",
  "عادات الاستخدام الرقمي",
  "الثقة في المستقبل",
  "ثقافة المؤسسة والأولويات الاستراتيجية",
  "تقييم التواصل الداخلي",
  "صندوق الأفكار",
  "تقييم مشروع أو فعالية أو مبادرة",
];

const STR_TXT: Record<string, {
  eyebrow: string; title: React.ReactNode;
  flashTitle: string; flashBody: React.ReactNode; themesLabel: string;
  baroTitle: string; baroBody: React.ReactNode;
  pilotageTitle: React.ReactNode; pilotageBody: React.ReactNode; statLabel: React.ReactNode; alt: string;
}> = {
  en: {
    eyebrow: "Strategy",
    title: <>Get <em className="str-title-accent v-serif">unique data</em><br />to better understand your community</>,
    flashTitle: "Flash surveys",
    flashBody: "Turn every participation into a source of insight. Short, customizable surveys gather anonymized data on the topics that matter to your organization, giving you a sharper read on your community's expectations and dynamics.",
    themesLabel: "Example topics",
    baroTitle: "The wellbeing barometer",
    baroBody: "Collect wellbeing ratings from your community after every experience. Anonymized, aggregated data lets you track how it evolves over time and measure the real impact of the actions you take.",
    pilotageTitle: "Experience tracking data",
    pilotageBody: "Access more than 20 tracking indicators to steer your program effectively. See sign-ups, participation rate, re-engagement rate and many other key metrics in real time.",
    statLabel: <>indicators tracked<br />in real time</>,
    alt: "Uvibes dashboard — real-time tracking",
  },
  es: {
    eyebrow: "Estrategia",
    title: <>Accede a <em className="str-title-accent v-serif">datos inéditos</em><br />para comprender mejor a tu colectivo</>,
    flashTitle: "Encuestas flash",
    flashBody: "Convierte cada participación en una fuente de información. Gracias a encuestas breves y personalizables, recoges datos anonimizados sobre los temas que importan a tu organización y obtienes una mejor comprensión de las expectativas y dinámicas de tu colectivo.",
    themesLabel: "Ejemplos de temáticas",
    baroTitle: "El barómetro de bienestar",
    baroBody: "Recoge la valoración del bienestar de tu colectivo después de cada experiencia. Estas valoraciones anonimizadas y agregadas te permiten seguir su evolución en el tiempo y objetivar el impacto de las acciones realizadas.",
    pilotageTitle: <>Los datos de pilotaje de la experiencia</>,
    pilotageBody: "Accede a más de 20 indicadores de seguimiento para pilotar eficazmente tu programa. Visualiza en tiempo real el número de inscritos, la tasa de participación, la tasa de reengagement y muchos otros indicadores clave.",
    statLabel: <>indicadores seguidos<br />en tiempo real</>,
    alt: "Panel Uvibes — seguimiento en tiempo real",
  },
  de: {
    eyebrow: "Strategie",
    title: <>Erhalten Sie <em className="str-title-accent v-serif">einzigartige Daten</em><br />um Ihr Kollektiv besser zu verstehen</>,
    flashTitle: "Blitzumfragen",
    flashBody: "Verwandeln Sie jede Teilnahme in eine Quelle wertvoller Erkenntnisse. Kurze, anpassbare Umfragen sammeln anonymisierte Daten zu den Themen, die für Ihre Organisation zählen, und geben Ihnen ein klareres Bild der Erwartungen und Dynamiken Ihres Kollektivs.",
    themesLabel: "Beispielthemen",
    baroTitle: "Das Wohlbefindens-Barometer",
    baroBody: "Erfassen Sie nach jeder Erfahrung die Wohlbefindens-Bewertung Ihres Kollektivs. Anonymisierte, aggregierte Daten ermöglichen es Ihnen, die Entwicklung über die Zeit zu verfolgen und die tatsächliche Wirkung Ihrer Maßnahmen zu messen.",
    pilotageTitle: "Daten zur Erfahrungssteuerung",
    pilotageBody: "Greifen Sie auf mehr als 20 Tracking-Indikatoren zu, um Ihr Programm effektiv zu steuern. Sehen Sie Anmeldungen, Teilnahmequote, Reaktivierungsquote und viele weitere wichtige Kennzahlen in Echtzeit.",
    statLabel: <>Indikatoren in Echtzeit<br />verfolgt</>,
    alt: "Uvibes-Dashboard — Echtzeit-Tracking",
  },
  it: {
    eyebrow: "Strategia",
    title: <>Ottieni <em className="str-title-accent v-serif">dati inediti</em><br />per comprendere meglio la tua comunità</>,
    flashTitle: "Sondaggi flash",
    flashBody: "Trasforma ogni partecipazione in una fonte di insight. Grazie a sondaggi brevi e personalizzabili, raccogli dati anonimizzati sui temi importanti per la tua organizzazione e ottieni una comprensione più chiara delle aspettative e delle dinamiche della tua comunità.",
    themesLabel: "Esempi di temi",
    baroTitle: "Il barometro del benessere",
    baroBody: "Raccogli la valutazione del benessere della tua comunità dopo ogni esperienza. Dati anonimizzati e aggregati ti permettono di seguirne l'evoluzione nel tempo e di misurare l'impatto reale delle azioni svolte.",
    pilotageTitle: "I dati di gestione dell'esperienza",
    pilotageBody: "Accedi a oltre 20 indicatori di monitoraggio per gestire efficacemente il tuo programma. Visualizza in tempo reale il numero di iscritti, il tasso di partecipazione, il tasso di re-engagement e molti altri indicatori chiave.",
    statLabel: <>indicatori monitorati<br />in tempo reale</>,
    alt: "Dashboard Uvibes — monitoraggio in tempo reale",
  },
  pt: {
    eyebrow: "Estratégia",
    title: <>Tenha acesso a <em className="str-title-accent v-serif">dados inéditos</em><br />para compreender melhor o seu coletivo</>,
    flashTitle: "Inquéritos flash",
    flashBody: "Transforme cada participação numa fonte de informação. Com inquéritos curtos e personalizáveis, recolha dados anonimizados sobre os temas que importam para a sua organização e obtenha uma melhor compreensão das expectativas e dinâmicas do seu coletivo.",
    themesLabel: "Exemplos de temas",
    baroTitle: "O barómetro do bem-estar",
    baroBody: "Recolha a avaliação do bem-estar do seu coletivo após cada experiência. Dados anonimizados e agregados permitem acompanhar a sua evolução ao longo do tempo e medir o impacto real das ações realizadas.",
    pilotageTitle: "Os dados de pilotagem da experiência",
    pilotageBody: "Acesse mais de 20 indicadores de acompanhamento para pilotar eficazmente o seu programa. Visualize em tempo real o número de inscritos, a taxa de participação, a taxa de reengajamento e muitos outros indicadores-chave.",
    statLabel: <>indicadores acompanhados<br />em tempo real</>,
    alt: "Painel Uvibes — acompanhamento em tempo real",
  },
  ru: {
    eyebrow: "Стратегия",
    title: <>Получите <em className="str-title-accent v-serif">уникальные данные</em><br />чтобы лучше понять ваш коллектив</>,
    flashTitle: "Блиц-опросы",
    flashBody: "Превратите каждое участие в источник аналитики. Короткие, настраиваемые опросы собирают анонимные данные по темам, важным для вашей организации, и дают более чёткое понимание ожиданий и динамики вашего коллектива.",
    themesLabel: "Примеры тем",
    baroTitle: "Барометр благополучия",
    baroBody: "Собирайте оценки благополучия вашего коллектива после каждого опыта. Анонимные, агрегированные данные позволяют отслеживать их изменение во времени и измерять реальное влияние принимаемых мер.",
    pilotageTitle: "Данные для управления опытом",
    pilotageBody: "Получите доступ к более чем 20 показателям отслеживания для эффективного управления вашей программой. Смотрите в реальном времени количество регистраций, уровень участия, уровень повторного вовлечения и многие другие ключевые метрики.",
    statLabel: <>показателей отслеживается<br />в реальном времени</>,
    alt: "Панель Uvibes — отслеживание в реальном времени",
  },
  zh: {
    eyebrow: "战略",
    title: <>获取 <em className="str-title-accent v-serif">独家数据</em><br />更好地了解你的集体</>,
    flashTitle: "快速调查",
    flashBody: "把每一次参与都转化为洞察的来源。通过简短、可定制的调查，收集与你组织相关话题的匿名数据，从而更清楚地了解你的集体的期望和动态。",
    themesLabel: "主题示例",
    baroTitle: "幸福感晴雨表",
    baroBody: "在每次体验后收集你的集体的幸福感评分。匿名汇总的数据让你能够追踪其随时间的变化，并衡量所采取行动的实际影响。",
    pilotageTitle: "体验管理数据",
    pilotageBody: "访问20多项追踪指标，有效管理你的项目。实时查看报名人数、参与率、重新参与率以及许多其他关键指标。",
    statLabel: <>项指标<br />实时追踪</>,
    alt: "Uvibes 仪表盘 — 实时追踪",
  },
  ja: {
    eyebrow: "戦略",
    title: <><em className="str-title-accent v-serif">独自のデータ</em>を入手し<br />あなたのコレクティフをより深く理解する</>,
    flashTitle: "フラッシュ調査",
    flashBody: "すべての参加をインサイトの源に変えます。短くカスタマイズ可能な調査によって、あなたの組織にとって重要なテーマに関する匿名データを収集し、コレクティフの期待やダイナミクスをより明確に把握できます。",
    themesLabel: "テーマの例",
    baroTitle: "ウェルビーイング・バロメーター",
    baroBody: "各体験の後にコレクティフのウェルビーイング評価を収集します。匿名化・集計されたデータにより、時間の経過とともにその変化を追跡し、実施した取り組みの実際の効果を測定できます。",
    pilotageTitle: "体験運営データ",
    pilotageBody: "20以上の追跡指標にアクセスして、プログラムを効果的に運営できます。登録者数、参加率、再エンゲージメント率など、多くの重要な指標をリアルタイムで確認できます。",
    statLabel: <>件の指標を<br />リアルタイムで追跡</>,
    alt: "Uvibesダッシュボード — リアルタイム追跡",
  },
  hi: {
    eyebrow: "रणनीति",
    title: <><em className="str-title-accent v-serif">अनूठा डेटा</em> पाएं<br />अपने समूह को बेहतर ढंग से समझने के लिए</>,
    flashTitle: "त्वरित सर्वेक्षण",
    flashBody: "हर सहभागिता को जानकारी के स्रोत में बदलें। छोटे, अनुकूलन योग्य सर्वेक्षणों के माध्यम से, अपने संगठन के लिए महत्वपूर्ण विषयों पर अनाम डेटा एकत्र करें और अपने समूह की अपेक्षाओं और गतिशीलता की बेहतर समझ पाएं।",
    themesLabel: "विषयों के उदाहरण",
    baroTitle: "कल्याण बैरोमीटर",
    baroBody: "हर अनुभव के बाद अपने समूह के कल्याण की रेटिंग एकत्र करें। अनाम, समग्र डेटा आपको समय के साथ इसके बदलाव को ट्रैक करने और की गई कार्रवाइयों के वास्तविक प्रभाव को मापने में मदद करता है।",
    pilotageTitle: "अनुभव प्रबंधन डेटा",
    pilotageBody: "अपने कार्यक्रम को प्रभावी ढंग से चलाने के लिए 20 से अधिक ट्रैकिंग संकेतकों तक पहुंच पाएं। पंजीकरण, सहभागिता दर, पुनः-सहभागिता दर और कई अन्य महत्वपूर्ण मेट्रिक्स को रीयल-टाइम में देखें।",
    statLabel: <>संकेतक रीयल-टाइम में<br />ट्रैक किए गए</>,
    alt: "Uvibes डैशबोर्ड — रीयल-टाइम ट्रैकिंग",
  },
  ar: {
    eyebrow: "الاستراتيجية",
    title: <>احصل على <em className="str-title-accent v-serif">بيانات فريدة</em><br />لفهم مجموعتك بشكل أفضل</>,
    flashTitle: "استبيانات سريعة",
    flashBody: "حوّل كل مشاركة إلى مصدر للرؤى. من خلال استبيانات قصيرة وقابلة للتخصيص، اجمع بيانات مجهولة المصدر حول المواضيع المهمة لمؤسستك، واحصل على فهم أوضح لتوقعات وديناميكيات مجموعتك.",
    themesLabel: "أمثلة على المواضيع",
    baroTitle: "مقياس الرفاه",
    baroBody: "اجمع تقييمات الرفاه لمجموعتك بعد كل تجربة. تتيح لك البيانات المجهولة والمجمّعة تتبع تطورها عبر الزمن وقياس الأثر الحقيقي للإجراءات المتخذة.",
    pilotageTitle: "بيانات قيادة التجربة",
    pilotageBody: "احصل على أكثر من 20 مؤشر تتبع لقيادة برنامجك بفعالية. اعرض في الوقت الفعلي عدد المسجلين، ومعدل المشاركة، ومعدل إعادة التفاعل، وغيرها من المؤشرات الأساسية.",
    statLabel: <>مؤشرًا يُتابع<br />في الوقت الفعلي</>,
    alt: "لوحة تحكم Uvibes — تتبع في الوقت الفعلي",
  },
};

const THEMES_BY_LOCALE: Record<string, string[]> = {
  en: THEMES_EN, es: THEMES_ES, de: THEMES_DE, it: THEMES_IT, pt: THEMES_PT,
  ru: THEMES_RU, zh: THEMES_ZH, ja: THEMES_JA, hi: THEMES_HI, ar: THEMES_AR,
};

// Jauge demi-cercle — rayon 90, donc demi-circonférence ≈ 282.7
const GAUGE_LEN = 282.7;
const GAUGE_PCT = 0.87; // 87 % — écho du score moyen de bien-être affiché

export default function SolutionStrategie({ locale = "fr" }: { locale?: string }) {
  const THEMES = THEMES_BY_LOCALE[locale] ?? THEMES_FR;
  const str = STR_TXT[locale];
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });
  const [baroRef, baroInView] = useInView<HTMLDivElement>(0.5);
  const [macRef, macInView] = useInView<HTMLDivElement>(0.35);

  return (
    <section id="strategie" className={`str-section${vis ? " str-vis" : ""}`} ref={ref}>
      <div className="str-inner">
        <header className="str-head">
          <p className="str-eyebrow">
            <span className="str-eyebrow-dot" aria-hidden="true" />
            {str ? str.eyebrow : "Stratégie"}
          </p>
          <h2 className="str-title v-prompt">
            {str ? str.title : (
              <>Disposez de <em className="str-title-accent v-serif">données inédites</em><br />pour mieux comprendre votre collectif</>
            )}
          </h2>
        </header>

        <div className="str-bento">
          {/* 01 — Les enquêtes flash (bloc vedette, plus grand) */}
          <article className="str-card str-card--flash">
            <h3 className="str-card-title">{str ? str.flashTitle : "Les enquêtes flash"}</h3>
            <p className="str-card-body">
              {str
                ? str.flashBody
                : <>Transformez chaque participation en source d&apos;insights. Grâce à de courtes enquêtes personnalisables, recueillez des données anonymisées sur les sujets qui comptent pour votre organisation et disposez d&apos;une meilleure compréhension des attentes et des dynamiques de votre collectif.</>}
            </p>
            <p className="str-themes-label">{str ? str.themesLabel : "Exemples de thématiques"}</p>
            {/* Ruban horizontal qui défile les thématiques en rotation */}
            <div className="str-ribbon" role="list" aria-label={str ? str.themesLabel : "Exemples de thématiques"}>
              <div className="str-ribbon-track">
                {[...THEMES, ...THEMES].map((t, i) => (
                  <span key={i} className="str-ribbon-item" role="listitem">{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* 02 — Le baromètre bien-être (titre déplacé en notification, cf. carte 03) */}
          <article className="str-card str-card--barometre" ref={baroRef}>
            <p className="str-card-body">
              {str
                ? str.baroBody
                : <>Recueillez l&apos;évaluation du bien-être de votre collectif à chaque expérience. Ces évaluations anonymisées et agrégées vous permettent de suivre son évolution dans le temps et d&apos;objectiver l&apos;impact des actions menées.</>}
            </p>
            {/* Jauge demi-cercle dans un mockup iPhone — se remplit quand la carte entre dans le viewport */}
            <div className="str-iphone">
              <span className="str-iphone-notch" aria-hidden="true" />
              <div className="str-iphone-screen">
                <div className={`str-gauge${baroInView ? " str-gauge--filled" : ""}`}>
                  <svg className="str-gauge-svg" viewBox="0 0 200 110" aria-hidden="true">
                    <defs>
                      <linearGradient id="strGaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#E6007E" />
                        <stop offset="100%" stopColor="#FD6E00" />
                      </linearGradient>
                    </defs>
                    <path className="str-gauge-track" d="M10,100 A90,90 0 0 1 190,100" strokeWidth="14" strokeLinecap="round" />
                    <path
                      className="str-gauge-fill"
                      d="M10,100 A90,90 0 0 1 190,100"
                      stroke="url(#strGaugeGrad)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={GAUGE_LEN}
                      strokeDashoffset={baroInView ? GAUGE_LEN * (1 - GAUGE_PCT) : GAUGE_LEN}
                    />
                  </svg>
                  <div className="str-gauge-readout">
                    <span className="str-gauge-num v-serif">87%</span>
                    <span className="str-gauge-label">{str ? str.baroTitle : "Bien-être moyen ressenti"}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* 03 — Les données de pilotage de l'expérience */}
          <article className="str-card str-card--pilotage">
            <h3 className="str-card-title">{str ? str.pilotageTitle : <>Les données de pilotage de l&apos;expérience</>}</h3>
            <p className="str-card-body">
              {str
                ? str.pilotageBody
                : <>Accédez à plus de 20 indicateurs de suivi pour piloter efficacement votre programme. Visualisez en temps réel le nombre d&apos;inscrits, le taux de participation, le taux de réengagement et de nombreux autres indicateurs clés.</>}
            </p>
            <div className="str-stat">
              <span className="str-stat-num v-serif">20+</span>
              <span className="str-stat-label">{str ? str.statLabel : <>indicateurs suivis<br />en temps réel</>}</span>
            </div>
            {/* Mockup MacBook — le couvercle s'ouvre quand la carte entre dans le viewport
                et se referme quand on la dépasse (cf. useInView, répétable) */}
            <div className={`str-macbook${macInView ? " str-macbook--open" : ""}`} ref={macRef}>
              <div className="str-macbook-lid">
                <div className="str-macbook-screen">
                  <Image
                    src="/images/dashboard/dashboard-1.webp"
                    alt={str ? str.alt : "Tableau de bord Uvibes — suivi en temps réel"}
                    width={900}
                    height={511}
                    className="str-dashboard-img"
                  />
                </div>
              </div>
              <div className="str-macbook-base" aria-hidden="true">
                <div className="str-macbook-notch" />
              </div>
              {/* Notification flottante — reprend le chiffre clé du pilotage */}
              <div className="str-baro-toast" aria-hidden="true">
                <span className="str-baro-toast-num v-serif">20+</span>
                <span className="str-baro-toast-text">{str ? str.statLabel : <>indicateurs suivis<br />en temps réel</>}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
