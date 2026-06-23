"use client";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/section/valuePillars.css";

const pillarsFr = [
  {
    id: "federer",
    num: "01",
    accentColor: "#F4621F",
    label: "01 · Pilier",
    title: "Fédérer",
    titleEt: "et",
    titleSuffix: "engager",
    body: "Créez un sentiment d'appartenance fort à votre organisation. Celui-ci naît rarement dans les réunions : il se construit au quotidien, à travers les échanges informels. Uvibes renforce l'identité collective et fédère autour d'une vision commune.",
    stat: "x4",
    statLabel: "d'engagement dans les organisations où le sentiment d'appartenance est fort",
  },
  {
    id: "piloter",
    num: "02",
    accentColor: "#E8196A",
    label: "02 · Pilier",
    title: "Piloter",
    titleEt: "et",
    titleSuffix: "décider",
    body: "Prenez les bonnes décisions au bon moment. Celles-ci naissent rarement de rapports de 40 pages : elles s'appuient sur des informations pertinentes, accessibles lorsque vous en avez besoin. Uvibes vous apporte la visibilité nécessaire pour agir efficacement.",
    stat: "< 5 min",
    statLabel: "pour connaître chaque semaine les dynamiques de votre collectif",
  },
];

const pillarsEn = [
  {
    id: "federer",
    num: "01",
    accentColor: "#F4621F",
    label: "01 · Pillar",
    title: "Unite",
    titleEt: "and",
    titleSuffix: "engage",
    body: "Build a real sense of belonging in your organization. It rarely happens in meetings — it's built day after day, through informal exchanges. Uvibes strengthens collective identity and rallies people around a shared vision.",
    stat: "x4",
    statLabel: "more engagement in organizations with a strong sense of belonging",
  },
  {
    id: "piloter",
    num: "02",
    accentColor: "#E8196A",
    label: "02 · Pillar",
    title: "Steer",
    titleEt: "and",
    titleSuffix: "decide",
    body: "Make the right call at the right time. Good decisions rarely come from 40-page reports — they rely on relevant information, available exactly when you need it. Uvibes gives you the visibility to act effectively.",
    stat: "< 5 min",
    statLabel: "a week to know exactly how your community is doing",
  },
];

const pillarsEs = [
  {
    id: "federer",
    num: "01",
    accentColor: "#F4621F",
    label: "01 · Pilar",
    title: "Unir",
    titleEt: "y",
    titleSuffix: "comprometer",
    body: "Crea un verdadero sentido de pertenencia en tu organización. Casi nunca nace en las reuniones: se construye día a día, a través de los intercambios informales. Uvibes refuerza la identidad colectiva y une a las personas alrededor de una visión común.",
    stat: "x4",
    statLabel: "más compromiso en las organizaciones con un fuerte sentido de pertenencia",
  },
  {
    id: "piloter",
    num: "02",
    accentColor: "#E8196A",
    label: "02 · Pilar",
    title: "Pilotar",
    titleEt: "y",
    titleSuffix: "decidir",
    body: "Toma las decisiones correctas en el momento adecuado. Casi nunca nacen de informes de 40 páginas: se apoyan en información relevante, disponible cuando la necesitas. Uvibes te da la visibilidad necesaria para actuar con eficacia.",
    stat: "< 5 min",
    statLabel: "a la semana para conocer las dinámicas reales de tu colectivo",
  },
];

const pillarsDe = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · Säule",
    title: "Vereinen", titleEt: "und", titleSuffix: "engagieren",
    body: "Schaffe ein echtes Zugehörigkeitsgefühl in deiner Organisation. Es entsteht selten in Meetings — es wird Tag für Tag durch informellen Austausch aufgebaut. Uvibes stärkt die kollektive Identität und vereint Menschen rund um eine gemeinsame Vision.",
    stat: "x4", statLabel: "mehr Engagement in Organisationen mit starkem Zugehörigkeitsgefühl",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · Säule",
    title: "Steuern", titleEt: "und", titleSuffix: "entscheiden",
    body: "Triff die richtigen Entscheidungen zur richtigen Zeit. Sie entstehen selten aus 40-seitigen Berichten — sie stützen sich auf relevante Informationen, verfügbar genau dann, wenn du sie brauchst. Uvibes gibt dir die nötige Transparenz, um wirksam zu handeln.",
    stat: "< 5 Min", statLabel: "pro Woche, um die Dynamik deines Kollektivs zu kennen",
  },
];

const pillarsIt = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · Pilastro",
    title: "Unire", titleEt: "e", titleSuffix: "coinvolgere",
    body: "Crea un vero senso di appartenenza nella tua organizzazione. Raramente nasce nelle riunioni: si costruisce giorno dopo giorno, attraverso gli scambi informali. Uvibes rafforza l'identità collettiva e unisce le persone attorno a una visione comune.",
    stat: "x4", statLabel: "più coinvolgimento nelle organizzazioni con un forte senso di appartenenza",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · Pilastro",
    title: "Pilotare", titleEt: "e", titleSuffix: "decidere",
    body: "Prendi le decisioni giuste al momento giusto. Raramente nascono da report di 40 pagine: si basano su informazioni pertinenti, disponibili quando ne hai bisogno. Uvibes ti offre la visibilità necessaria per agire con efficacia.",
    stat: "< 5 min", statLabel: "a settimana per conoscere le dinamiche reali della tua comunità",
  },
];

const pillarsPt = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · Pilar",
    title: "Unir", titleEt: "e", titleSuffix: "comprometer",
    body: "Cria um verdadeiro sentido de pertença na tua organização. Raramente nasce nas reuniões: constrói-se dia após dia, através das trocas informais. A Uvibes reforça a identidade coletiva e une as pessoas em torno de uma visão comum.",
    stat: "x4", statLabel: "mais compromisso nas organizações com um forte sentido de pertença",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · Pilar",
    title: "Pilotar", titleEt: "e", titleSuffix: "decidir",
    body: "Toma as decisões certas no momento certo. Raramente nascem de relatórios de 40 páginas: apoiam-se em informação relevante, disponível quando precisas dela. A Uvibes dá-te a visibilidade necessária para agir com eficácia.",
    stat: "< 5 min", statLabel: "por semana para conheceres as dinâmicas reais do teu coletivo",
  },
];

const pillarsRu = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · Опора",
    title: "Объединять", titleEt: "и", titleSuffix: "вовлекать",
    body: "Создайте настоящее чувство принадлежности в вашей организации. Оно редко рождается на собраниях — оно строится день за днём, через неформальное общение. Uvibes укрепляет коллективную идентичность и объединяет людей вокруг общего видения.",
    stat: "x4", statLabel: "больше вовлечённости в организациях с сильным чувством принадлежности",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · Опора",
    title: "Управлять", titleEt: "и", titleSuffix: "решать",
    body: "Принимайте верные решения в нужный момент. Они редко рождаются из 40-страничных отчётов — они основаны на релевантной информации, доступной именно тогда, когда она нужна. Uvibes даёт вам необходимую видимость для эффективных действий.",
    stat: "< 5 мин", statLabel: "в неделю, чтобы знать реальную динамику вашего коллектива",
  },
];

const pillarsZh = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · 支柱",
    title: "凝聚", titleEt: "与", titleSuffix: "投入",
    body: "在你的组织中建立真正的归属感。它很少诞生于会议室——而是通过日常的非正式交流，一点一滴建立起来。Uvibes 强化集体认同感，让人们围绕共同愿景团结在一起。",
    stat: "x4", statLabel: "在归属感强的组织中，参与度提升的倍数",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · 支柱",
    title: "掌控", titleEt: "与", titleSuffix: "决策",
    body: "在合适的时机做出正确的决策。它们很少来自40页的报告——而是依靠在你需要时就能获取的相关信息。Uvibes 为你提供有效行动所需的洞察力。",
    stat: "< 5 分钟", statLabel: "每周即可了解你的集体的真实动态",
  },
];

const pillarsJa = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · 柱",
    title: "団結", titleEt: "し", titleSuffix: "巻き込む",
    body: "あなたの組織に本当の帰属意識を生み出します。それは会議室で生まれることは少なく、日々のちょっとしたやり取りの中で育まれます。Uvibesは集団としての一体感を強め、共通のビジョンのもとに人々を結びつけます。",
    stat: "x4", statLabel: "帰属意識の強い組織でのエンゲージメントの伸び",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · 柱",
    title: "舵を取り", titleEt: "、", titleSuffix: "決断する",
    body: "適切なタイミングで正しい決断を。それは40ページの報告書から生まれることは稀で、必要なときに手に入る適切な情報に基づいています。Uvibesは効果的に行動するための見通しを提供します。",
    stat: "5分未満", statLabel: "で毎週、あなたの集団の本当の動きがわかります",
  },
];

const pillarsHi = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · आधार",
    title: "एकजुट करना", titleEt: "और", titleSuffix: "जोड़ना",
    body: "अपने संगठन में अपनेपन की सच्ची भावना बनाएं। यह शायद ही कभी बैठकों में पैदा होती है — यह रोज़ाना, अनौपचारिक बातचीत के ज़रिए बनती है। Uvibes सामूहिक पहचान को मज़बूत करता है और लोगों को एक साझा दृष्टि के इर्द-गिर्द जोड़ता है।",
    stat: "x4", statLabel: "मज़बूत अपनेपन वाले संगठनों में अधिक सहभागिता",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · आधार",
    title: "दिशा देना", titleEt: "और", titleSuffix: "निर्णय लेना",
    body: "सही समय पर सही फैसले लें। ये शायद ही कभी 40 पन्नों की रिपोर्टों से निकलते हैं — ये उस ज़रूरी जानकारी पर आधारित होते हैं जो ज़रूरत पड़ने पर उपलब्ध हो। Uvibes आपको असरदार तरीके से काम करने के लिए ज़रूरी जानकारी देता है।",
    stat: "< 5 मिनट", statLabel: "हफ्ते में, अपने समुदाय की असली गतिविधियों को जानने के लिए",
  },
];

const pillarsAr = [
  {
    id: "federer", num: "01", accentColor: "#F4621F", label: "01 · ركيزة",
    title: "التوحيد", titleEt: "و", titleSuffix: "التحفيز",
    body: "اخلق إحساسًا حقيقيًا بالانتماء في منظمتك. نادرًا ما يولد هذا في الاجتماعات — بل يُبنى يومًا بعد يوم من خلال التبادلات غير الرسمية. يعزّز Uvibes الهوية الجماعية ويوحّد الأشخاص حول رؤية مشتركة.",
    stat: "×4", statLabel: "تفاعل أكبر في المنظمات ذات إحساس قوي بالانتماء",
  },
  {
    id: "piloter", num: "02", accentColor: "#E8196A", label: "02 · ركيزة",
    title: "القيادة", titleEt: "و", titleSuffix: "اتخاذ القرار",
    body: "اتخذ القرارات الصحيحة في الوقت المناسب. نادرًا ما تنبع من تقارير من 40 صفحة — بل تعتمد على معلومات ذات صلة، متاحة عندما تحتاجها. يمنحك Uvibes الرؤية اللازمة للتصرف بفعالية.",
    stat: "< 5 دقائق", statLabel: "أسبوعيًا لمعرفة الديناميكيات الحقيقية لمجتمعك",
  },
];

const PILLARS_HEADER: Record<string, { kicker: React.ReactNode; title: React.ReactNode }> = {
  en: {
    kicker: "Uvibes, an engagement and performance engine for your organization",
    title: (
      <>
        One tool to{" "}
        <strong className="pillars-strong--gradient">strengthen your community</strong>
        {" "}and{" "}
        <strong className="pillars-strong--gradient">guide your strategic choices</strong>.
      </>
    ),
  },
  es: {
    kicker: <>Uvibes, motor de compromiso y rendimiento para tu organización</>,
    title: (
      <>
        Una sola herramienta para{" "}
        <strong className="pillars-strong--gradient">fortalecer tu colectivo</strong>
        {" "}y{" "}
        <strong className="pillars-strong--gradient">guiar tus decisiones estratégicas</strong>.
      </>
    ),
  },
  de: {
    kicker: <>Uvibes, ein Motor für Engagement und Leistung in deiner Organisation</>,
    title: (
      <>
        Ein einziges Werkzeug, um dein{" "}
        <strong className="pillars-strong--gradient">Kollektiv zu stärken</strong>
        {" "}und deine{" "}
        <strong className="pillars-strong--gradient">strategischen Entscheidungen zu lenken</strong>.
      </>
    ),
  },
  it: {
    kicker: <>Uvibes, un motore di coinvolgimento e performance per la tua organizzazione</>,
    title: (
      <>
        Un unico strumento per{" "}
        <strong className="pillars-strong--gradient">rafforzare la tua comunità</strong>
        {" "}e{" "}
        <strong className="pillars-strong--gradient">guidare le tue scelte strategiche</strong>.
      </>
    ),
  },
  pt: {
    kicker: <>Uvibes, um motor de compromisso e desempenho para a tua organização</>,
    title: (
      <>
        Uma única ferramenta para{" "}
        <strong className="pillars-strong--gradient">fortalecer o teu coletivo</strong>
        {" "}e{" "}
        <strong className="pillars-strong--gradient">guiar as tuas decisões estratégicas</strong>.
      </>
    ),
  },
  ru: {
    kicker: <>Uvibes — двигатель вовлечённости и эффективности для вашей организации</>,
    title: (
      <>
        Единый инструмент, чтобы{" "}
        <strong className="pillars-strong--gradient">укрепить ваш коллектив</strong>
        {" "}и{" "}
        <strong className="pillars-strong--gradient">направлять ваши стратегические решения</strong>.
      </>
    ),
  },
  zh: {
    kicker: <>Uvibes，助力你的组织提升参与度与绩效</>,
    title: (
      <>
        一个工具，帮你
        <strong className="pillars-strong--gradient">增强集体凝聚力</strong>
        并
        <strong className="pillars-strong--gradient">指导战略决策</strong>。
      </>
    ),
  },
  ja: {
    kicker: <>Uvibes、組織のエンゲージメントとパフォーマンスを高めるエンジン</>,
    title: (
      <>
        <strong className="pillars-strong--gradient">コミュニティを強化</strong>
        し、
        <strong className="pillars-strong--gradient">戦略的な意思決定を導く</strong>
        、たった一つのツール。
      </>
    ),
  },
  hi: {
    kicker: <>Uvibes, आपके संगठन के लिए सहभागिता और प्रदर्शन का इंजन</>,
    title: (
      <>
        एक ही टूल जो आपके{" "}
        <strong className="pillars-strong--gradient">समुदाय को मज़बूत बनाए</strong>
        {" "}और आपके{" "}
        <strong className="pillars-strong--gradient">रणनीतिक फैसलों को दिशा दे</strong>।
      </>
    ),
  },
  ar: {
    kicker: <>Uvibes، محرك للتفاعل والأداء في منظمتك</>,
    title: (
      <>
        أداة واحدة لـ{" "}
        <strong className="pillars-strong--gradient">تقوية مجتمعك</strong>
        {" "}و{" "}
        <strong className="pillars-strong--gradient">توجيه قراراتك الاستراتيجية</strong>.
      </>
    ),
  },
};

const PILLARS_BY_LOCALE: Record<string, typeof pillarsFr> = {
  en: pillarsEn, es: pillarsEs, de: pillarsDe, it: pillarsIt, pt: pillarsPt,
  ru: pillarsRu, zh: pillarsZh, ja: pillarsJa, hi: pillarsHi, ar: pillarsAr,
};

export default function ValuePillars({ locale = "fr" }: { locale?: string }) {
  const pillars = PILLARS_BY_LOCALE[locale] ?? pillarsFr;
  const header = locale !== "fr" ? PILLARS_HEADER[locale] : undefined;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.12 });

  return (
    <section className={`pillars-section${vis ? " pillars-visible" : ""}`} ref={ref}>

      <div className="pillars-header">
        <p className="pillars-kicker v-mono">
          <span className="pillars-kicker-dot" aria-hidden="true" />
          {header ? header.kicker : <>Uvibes, moteur d&apos;engagement et de performance dans votre organisation</>}
        </p>
        <h2 className="pillars-title">
          {header ? header.title : (
            <>
              Un seul outil pour{" "}
              <strong className="pillars-strong--gradient">renforcer votre collectif</strong>
              {" "}et{" "}
              <strong className="pillars-strong--gradient">guider vos choix stratégiques</strong>.
            </>
          )}
        </h2>
      </div>

      <div className="pillars-cards-wrap">
        {/* Lignes de vibration — partagées par les 2 cartes */}
        <div className="pillars-lines-bg" aria-hidden="true">
          <div className="pillars-vline pillars-vline--1">
            <GradientVibrationLine id="vl-pillar-1" strokeWidth={36} amplitude={22} speed={12} colorFrom="#F4621F" colorTo="#E8196A" />
          </div>
          <div className="pillars-vline pillars-vline--2">
            <GradientVibrationLine id="vl-pillar-2" strokeWidth={36} amplitude={18} speed={17} colorFrom="#E8196A" colorTo="#FD6E00" />
          </div>
        </div>

        <div className="pillars-grid">
        {pillars.map((p) => (
          <div
            key={p.id}
            className="pillar-card"
            style={{ "--p-accent": p.accentColor } as React.CSSProperties}
          >
            <span className="pillar-watermark" aria-hidden="true">{p.num}</span>

            <h3 className="pillar-title">
              {p.title}{" "}
              <span className="pillar-title-et v-serif">{p.titleEt}</span>{" "}
              {p.titleSuffix}
            </h3>

            <p className="pillar-body">{p.body}</p>

            <div className="pillar-stat-block">
              <hr className="pillar-hr" />
              <div className="pillar-stat-row">
                <span className="pillar-stat">{p.stat}</span>
                <span className="pillar-stat-label">{p.statLabel}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
