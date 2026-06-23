"use client";

import Image from "next/image";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import { getVideoUrl } from "@/utils/videoUrl";
import "@/styles/solution/solutionHowItWorks.css";

interface Step {
  n: string;
  title: string;
  body: string;
  accent: string;
  video?: string;
  image?: string;
  tilt?: "left" | "right";
  videoPos?: string;
}

const STEPS_FR: Step[] = [
  {
    n: "01",
    title: "Engager votre collectif",
    body: "Les vibes : des expériences courtes et surprenantes, conçues pour encourager les échanges, faire circuler les bons plans et favoriser le partage d'expériences entre membres du collectif.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Maîtriser l'expérience",
    body: "Vous définissez les thématiques, le moment et la durée des interactions afin de créer des échanges parfaitement adaptés à votre organisation et à vos objectifs.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Comprendre votre collectif",
    body: "Les enquêtes flash : interrogez vos collectifs sur tous les sujets clés pour votre organisation et faites émerger une vision claire des besoins, attentes et ressentis du terrain.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Mesurer et piloter l'impact",
    body: "Accédez à un tableau de bord en temps réel pour suivre les usages, l'engagement et l'évolution de votre collectif, et piloter vos actions avec des données concrètes.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_EN: Step[] = [
  {
    n: "01",
    title: "Engage your community",
    body: "Short, surprising experiences designed to spark exchanges, pass on good tips and encourage members to share what they know.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Shape the experience",
    body: "You set the topics, timing and length of each interaction to create exchanges perfectly suited to your organization and your goals.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Understand your community",
    body: "Ask your community about every topic that matters to your organization, and get a clear picture of needs, expectations and feelings on the ground.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Measure and steer the impact",
    body: "Access a real-time dashboard to track usage, engagement and how your community evolves — and steer your actions with real data.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_ES: Step[] = [
  {
    n: "01",
    title: "Movilizar a tu colectivo",
    body: "Experiencias breves y sorprendentes, pensadas para fomentar el intercambio, hacer circular buenos consejos y favorecer que los miembros del colectivo compartan sus experiencias.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Controlar la experiencia",
    body: "Tú defines los temas, el momento y la duración de las interacciones para crear intercambios perfectamente adaptados a tu organización y a tus objetivos.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Comprender a tu colectivo",
    body: "Pregunta a tu comunidad sobre todos los temas clave para tu organización y obtén una visión clara de las necesidades, expectativas y percepciones del terreno.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Medir y pilotar el impacto",
    body: "Accede a un panel en tiempo real para seguir el uso, el compromiso y la evolución de tu colectivo, y pilotar tus acciones con datos concretos.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_DE: Step[] = [
  {
    n: "01",
    title: "Ihr Kollektiv engagieren",
    body: "Kurze, überraschende Erlebnisse, die den Austausch anregen, gute Tipps weitergeben und den Erfahrungsaustausch zwischen den Mitgliedern des Kollektivs fördern.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Die Erfahrung steuern",
    body: "Sie legen die Themen, den Zeitpunkt und die Dauer der Interaktionen fest, um Austausche zu schaffen, die perfekt auf Ihre Organisation und Ihre Ziele abgestimmt sind.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Ihr Kollektiv verstehen",
    body: "Befragen Sie Ihre Community zu allen für Ihre Organisation wichtigen Themen und gewinnen Sie ein klares Bild der Bedürfnisse, Erwartungen und Stimmungen vor Ort.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Die Wirkung messen und steuern",
    body: "Greifen Sie auf ein Echtzeit-Dashboard zu, um Nutzung, Engagement und die Entwicklung Ihres Kollektivs zu verfolgen, und steuern Sie Ihre Maßnahmen mit konkreten Daten.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_IT: Step[] = [
  {
    n: "01",
    title: "Coinvolgere la tua comunità",
    body: "Esperienze brevi e sorprendenti, pensate per stimolare gli scambi, far circolare buoni consigli e favorire la condivisione di esperienze tra i membri della comunità.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Gestire l'esperienza",
    body: "Tu definisci i temi, il momento e la durata delle interazioni per creare scambi perfettamente adatti alla tua organizzazione e ai tuoi obiettivi.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Comprendere la tua comunità",
    body: "Interroga la tua comunità su tutti i temi chiave per la tua organizzazione e ottieni una visione chiara dei bisogni, delle aspettative e delle percezioni sul campo.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Misurare e guidare l'impatto",
    body: "Accedi a una dashboard in tempo reale per monitorare l'utilizzo, l'impegno e l'evoluzione della tua comunità, e guida le tue azioni con dati concreti.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_PT: Step[] = [
  {
    n: "01",
    title: "Envolver o seu coletivo",
    body: "Experiências curtas e surpreendentes, pensadas para estimular a troca, fazer circular boas dicas e favorecer a partilha de experiências entre os membros do coletivo.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Controlar a experiência",
    body: "Você define os temas, o momento e a duração das interações para criar trocas perfeitamente adaptadas à sua organização e aos seus objetivos.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Compreender o seu coletivo",
    body: "Pergunte à sua comunidade sobre todos os temas-chave para a sua organização e obtenha uma visão clara das necessidades, expectativas e sensações no terreno.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Medir e pilotar o impacto",
    body: "Acesse um painel em tempo real para acompanhar o uso, o envolvimento e a evolução do seu coletivo, e pilotar as suas ações com dados concretos.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_RU: Step[] = [
  {
    n: "01",
    title: "Вовлечь ваш коллектив",
    body: "Короткие, неожиданные опыты, созданные для того, чтобы стимулировать общение, передавать полезные советы и способствовать обмену опытом между членами коллектива.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "Контролировать опыт",
    body: "Вы определяете темы, момент и продолжительность взаимодействий, чтобы создать общение, идеально подходящее вашей организации и вашим целям.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "Понять ваш коллектив",
    body: "Опросите вашу аудиторию по всем ключевым для вашей организации темам и получите чёткое представление о потребностях, ожиданиях и настроениях на местах.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "Измерять и управлять влиянием",
    body: "Получите доступ к панели в реальном времени для отслеживания использования, вовлечённости и развития вашего коллектива, и управляйте своими действиями на основе конкретных данных.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_ZH: Step[] = [
  {
    n: "01",
    title: "调动你的集体",
    body: "简短而出乎意料的体验，旨在激发交流、传递实用建议，并促进集体成员之间的经验分享。",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "掌控体验",
    body: "你来设定主题、时间和互动时长，从而创造完全契合你组织和目标的交流。",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "理解你的集体",
    body: "就所有对你组织重要的话题询问你的社群，从而清晰呈现一线的需求、期望和感受。",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "衡量并掌控影响",
    body: "访问实时仪表盘，跟踪使用情况、参与度以及你的集体的发展，并依据具体数据来掌控你的行动。",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_JA: Step[] = [
  {
    n: "01",
    title: "あなたのコレクティフを引き込む",
    body: "交流を促し、有益なヒントを広め、コレクティフのメンバー間の経験共有を促進するために設計された、短くも意外性のある体験。",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "体験をコントロールする",
    body: "あなたの組織と目標に完全に合った交流を生み出すために、テーマ、タイミング、やりとりの長さを自分で設定します。",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "あなたのコレクティフを理解する",
    body: "あなたの組織にとって重要なすべてのテーマについてコミュニティに問いかけ、現場のニーズ、期待、実感を明確に把握します。",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "インパクトを測定し、操る",
    body: "リアルタイムのダッシュボードにアクセスして利用状況、エンゲージメント、コレクティフの進展を追跡し、具体的なデータをもとにアクションを操ります。",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_HI: Step[] = [
  {
    n: "01",
    title: "अपने समूह को सक्रिय करें",
    body: "छोटे और चौंकाने वाले अनुभव, जो बातचीत को बढ़ावा देने, अच्छे सुझावों को फैलाने और समूह के सदस्यों के बीच अनुभव साझा करने को प्रोत्साहित करने के लिए डिज़ाइन किए गए हैं।",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "अनुभव को नियंत्रित करें",
    body: "आप विषय, समय और बातचीत की अवधि तय करते हैं, ताकि आपके संगठन और लक्ष्यों के अनुरूप बिल्कुल सटीक संवाद बनाया जा सके।",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "अपने समूह को समझें",
    body: "अपने संगठन के लिए सभी ज़रूरी विषयों पर अपने समुदाय से सवाल करें और ज़मीनी ज़रूरतों, अपेक्षाओं और भावनाओं की स्पष्ट तस्वीर पाएं।",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "प्रभाव को मापें और नियंत्रित करें",
    body: "उपयोग, सहभागिता और आपके समूह के विकास को ट्रैक करने के लिए रीयल-टाइम डैशबोर्ड एक्सेस करें, और ठोस डेटा के आधार पर अपनी कार्रवाइयों को नियंत्रित करें।",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const STEPS_AR: Step[] = [
  {
    n: "01",
    title: "تحفيز مجموعتك",
    body: "تجارب قصيرة ومفاجئة، صُممت لتحفيز التبادل، ونشر النصائح المفيدة، وتشجيع أعضاء المجموعة على تشارك خبراتهم.",
    accent: "#FD6E00",
    video: "Nadine-mobile.mp4",
    tilt: "left",
  },
  {
    n: "02",
    title: "التحكم في التجربة",
    body: "أنت من يحدد المواضيع والتوقيت ومدة التفاعلات لإنشاء تبادلات متوافقة تمامًا مع مؤسستك وأهدافك.",
    accent: "#E6007E",
  },
  {
    n: "03",
    title: "فهم مجموعتك",
    body: "اسأل مجتمعك عن جميع المواضيع الأساسية لمؤسستك واحصل على رؤية واضحة للحاجات والتوقعات والمشاعر على الأرض.",
    accent: "#FFB800",
  },
  {
    n: "04",
    title: "قياس الأثر وقيادته",
    body: "ادخل إلى لوحة تحكم في الوقت الفعلي لتتبع الاستخدام والالتزام وتطور مجموعتك، وقُد إجراءاتك بناءً على بيانات ملموسة.",
    accent: "#D90A5C",
    video: "Lisa-desktop.mp4",
    tilt: "right",
  },
];

const SHIW_TXT: Record<string, { eyebrow: string; title: React.ReactNode; subtitle: React.ReactNode; alt: string }> = {
  en: {
    eyebrow: "Process",
    title: <>A method in 4 steps<br />to{" "}<span className="shiw-title-accent v-serif">activate and steer your community</span></>,
    subtitle: "From sparking exchanges to measuring results: a complete method to strengthen your organization.",
    alt: "Uvibes dashboard — real-time tracking",
  },
  es: {
    eyebrow: "Proceso",
    title: <>Un método en 4 etapas<br />para{" "}<span className="shiw-title-accent v-serif">activar y pilotar tu colectivo</span></>,
    subtitle: <>De la activación de los intercambios a la medición de los resultados&nbsp;: un método completo para fortalecer tu organización.</>,
    alt: "Panel Uvibes — seguimiento en tiempo real",
  },
  de: {
    eyebrow: "Prozess",
    title: <>Eine Methode in 4 Schritten<br />um{" "}<span className="shiw-title-accent v-serif">Ihr Kollektiv zu aktivieren und zu steuern</span></>,
    subtitle: "Von der Anregung des Austauschs bis zur Erfolgsmessung: eine vollständige Methode zur Stärkung Ihrer Organisation.",
    alt: "Uvibes-Dashboard — Echtzeit-Tracking",
  },
  it: {
    eyebrow: "Processo",
    title: <>Un metodo in 4 fasi<br />per{" "}<span className="shiw-title-accent v-serif">attivare e guidare la tua comunità</span></>,
    subtitle: "Dall'attivazione degli scambi alla misurazione dei risultati: un metodo completo per rafforzare la tua organizzazione.",
    alt: "Dashboard Uvibes — monitoraggio in tempo reale",
  },
  pt: {
    eyebrow: "Processo",
    title: <>Um método em 4 etapas<br />para{" "}<span className="shiw-title-accent v-serif">ativar e pilotar o seu coletivo</span></>,
    subtitle: "Da ativação das trocas à medição dos resultados: um método completo para fortalecer a sua organização.",
    alt: "Painel Uvibes — acompanhamento em tempo real",
  },
  ru: {
    eyebrow: "Процесс",
    title: <>Метод из 4 шагов<br />чтобы{" "}<span className="shiw-title-accent v-serif">активировать и направлять ваш коллектив</span></>,
    subtitle: "От запуска общения до измерения результатов: полный метод для укрепления вашей организации.",
    alt: "Панель Uvibes — отслеживание в реальном времени",
  },
  zh: {
    eyebrow: "流程",
    title: <>四步法<br />帮助你{" "}<span className="shiw-title-accent v-serif">激活并掌控你的集体</span></>,
    subtitle: "从激发交流到衡量成果：一套完整的方法来加强你的组织。",
    alt: "Uvibes 仪表盘 — 实时追踪",
  },
  ja: {
    eyebrow: "プロセス",
    title: <>4つのステップによるメソッド<br />あなたの{" "}<span className="shiw-title-accent v-serif">コレクティフを活性化し、操る</span></>,
    subtitle: "交流の活性化から成果の測定まで：あなたの組織を強化するための完全なメソッド。",
    alt: "Uvibesダッシュボード — リアルタイム追跡",
  },
  hi: {
    eyebrow: "प्रक्रिया",
    title: <>4 चरणों में एक तरीका<br />अपने{" "}<span className="shiw-title-accent v-serif">समूह को सक्रिय और नियंत्रित करने के लिए</span></>,
    subtitle: "बातचीत को बढ़ावा देने से लेकर परिणामों को मापने तक: आपके संगठन को मज़बूत बनाने का एक पूरा तरीका।",
    alt: "Uvibes डैशबोर्ड — रीयल-टाइम ट्रैकिंग",
  },
  ar: {
    eyebrow: "العملية",
    title: <>منهجية من 4 خطوات<br />لـ{" "}<span className="shiw-title-accent v-serif">تحفيز وقيادة مجموعتك</span></>,
    subtitle: "من تحفيز التبادل إلى قياس النتائج: منهجية كاملة لتقوية مؤسستك.",
    alt: "لوحة تحكم Uvibes — تتبع في الوقت الفعلي",
  },
};

function StepContent({ step, index }: { step: Step; index: number }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`shiw-step-content${visible ? " shiw-step-content--visible" : ""}`}
      style={{ "--step-color": step.accent, "--step-delay": `${index * 100}ms` } as React.CSSProperties}
    >
      <h3 className="shiw-step-title">{step.title}</h3>
      <p className="shiw-step-body">{step.body}</p>
    </div>
  );
}

/* Vignette vidéo style polaroïd — légèrement inclinée, fondu au scroll */
function PolaroidVideo({ step, locale = "fr" }: { step: Step; locale?: string }) {
  const [ref, visible] = useIntersectionOnce<HTMLDivElement>({ threshold: 0.1 });
  const shiw = SHIW_TXT[locale];
  return (
    <div
      ref={ref}
      className={`shiw-polaroid shiw-polaroid--${step.tilt}${visible ? " shiw-polaroid--visible" : ""}`}
    >
      <div className={`shiw-polaroid-media${step.image ? " shiw-polaroid-media--img" : ""}`}>
        {step.image ? (
          <Image
            className="shiw-polaroid-img"
            src={step.image}
            alt={shiw ? shiw.alt : "Tableau de bord Uvibes — suivi en temps réel"}
            width={900}
            height={560}
          />
        ) : (
          <video
            className="shiw-polaroid-video"
            src={getVideoUrl(step.video!)}
            style={step.videoPos ? { objectPosition: step.videoPos } : undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>
    </div>
  );
}

const STEPS_BY_LOCALE: Record<string, Step[]> = {
  en: STEPS_EN, es: STEPS_ES, de: STEPS_DE, it: STEPS_IT, pt: STEPS_PT,
  ru: STEPS_RU, zh: STEPS_ZH, ja: STEPS_JA, hi: STEPS_HI, ar: STEPS_AR,
};

export default function SolutionHowItWorks({ locale = "fr" }: { locale?: string }) {
  const STEPS = STEPS_BY_LOCALE[locale] ?? STEPS_FR;
  const shiw = SHIW_TXT[locale];
  return (
    <section id="comment" className="shiw-section">
      <div className="shiw-xblob shiw-xblob--1" aria-hidden="true" />
      <div className="shiw-xblob shiw-xblob--2" aria-hidden="true" />
      <div className="shiw-inner">

        <header className="shiw-head">
          <p className="shiw-eyebrow v-mono">
            <span className="shiw-eyebrow-dot" aria-hidden="true" />
            {shiw ? shiw.eyebrow : "Processus"}
          </p>
          <h2 className="shiw-title v-prompt">
            {shiw ? shiw.title : (
              <>Une méthode en 4 étapes<br />pour{" "}<span className="shiw-title-accent v-serif">activer et piloter votre collectif</span></>
            )}
          </h2>
          <p className="shiw-subtitle">
            {shiw
              ? shiw.subtitle
              : <>De l&apos;activation des échanges à la mesure des résultats&nbsp;: une méthode complète pour renforcer votre organisation.</>}
          </p>
        </header>

        <div className="shiw-roadmap">
          {STEPS.map((step, i) => {
            const isTop = i % 2 === 0;
            return (
              <div
                key={step.n}
                className="shiw-hstep"
                style={{ "--step-color": step.accent } as React.CSSProperties}
              >
                {/* Slot haut : contenu (01,03) — sinon vidéo polaroïd si définie (04) */}
                <div className={`shiw-hstep-top${!isTop ? " shiw-hstep-slot--empty" : ""}`}>
                  {isTop
                    ? <StepContent step={step} index={i} />
                    : (step.video || step.image) && <PolaroidVideo step={step} locale={locale} />}
                </div>

                {/* Cercle numéroté — toujours au centre */}
                <div className="shiw-hstep-dot">
                  <span className="shiw-hstep-num">{step.n}</span>
                </div>

                {/* Slot bas : contenu (02,04) — sinon vidéo polaroïd si définie (01) */}
                <div className={`shiw-hstep-bottom${isTop ? " shiw-hstep-slot--empty" : ""}`}>
                  {!isTop
                    ? <StepContent step={step} index={i} />
                    : (step.video || step.image) && <PolaroidVideo step={step} locale={locale} />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
