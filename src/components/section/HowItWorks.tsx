"use client";

import Link from "next/link";
import React from "react";
import { useIntersectionOnce } from "@/hooks/useIntersectionOnce";
import VibrationLine from "@/components/shared/VibrationLine";
import "../../styles/section/howItWorks.css";

const STEPS_FR: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Choisissez vos <span className="how-kw">expériences</span> et thématiques d&apos;échange</>,
    body: <>Le paramétrage est réalisé en <span className="how-kw">quelques minutes</span>. Aucune <span className="how-kw">compétence technique</span> n&apos;est requise.</>,
    time: "Prêt en quelques minutes",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Deux membres.</span> Une conversation. <span className="how-kw">Six minutes.</span></>,
    body: <>Les membres se rencontrent <span className="how-kw">aléatoirement</span> lors d&apos;échanges vidéo individuels. Des <span className="how-kw">questions adaptées</span> viennent guider la conversation. À la fin, les participants peuvent échanger leurs <span className="how-kw">cartes de visite</span>.</>,
    time: "Une rencontre guidée, en vidéo",
  },
  {
    n: "03",
    color: "#F59E0B",
    title: <>Votre collectif <span className="how-kw">vous parle.</span> Écoutez-le.</>,
    body: <>À l&apos;issue des échanges, les participants répondent à de courtes <span className="how-kw">enquêtes personnalisées</span>. Vous recueillez retours, points de vue et <span className="how-kw">données utiles</span> pour mieux comprendre votre collectif.</>,
    time: "Des données en retour pour décider",
  },
];

const STEPS_EN: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Pick your <span className="how-kw">experiences</span> and conversation topics</>,
    body: <>Set up takes <span className="how-kw">a few minutes</span>. No <span className="how-kw">technical skills</span> required.</>,
    time: "Ready in minutes",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Two members.</span> One conversation. <span className="how-kw">Six minutes.</span></>,
    body: <>Members are matched <span className="how-kw">at random</span> for one-on-one video chats. <span className="how-kw">Tailored questions</span> guide the conversation. At the end, participants can swap their <span className="how-kw">contact cards</span>.</>,
    time: "A guided, face-to-face video meeting",
  },
  {
    n: "03",
    color: "#F59E0B",
    title: <>Your community <span className="how-kw">talks back.</span> Listen to it.</>,
    body: <>After each exchange, participants answer short <span className="how-kw">tailored surveys</span>. You gather feedback, perspectives and <span className="how-kw">useful data</span> to better understand your community.</>,
    time: "Data in return, to help you decide",
  },
];

const STEPS_ES: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01",
    color: "#FD6E00",
    title: <>Elige tus <span className="how-kw">experiencias</span> y temas de conversación</>,
    body: <>La configuración se hace en <span className="how-kw">unos minutos</span>. No requiere <span className="how-kw">conocimientos técnicos</span>.</>,
    time: "Listo en pocos minutos",
  },
  {
    n: "02",
    color: "#D90A5C",
    title: <><span className="how-kw">Dos miembros.</span> Una conversación. <span className="how-kw">Seis minutos.</span></>,
    body: <>Los miembros se encuentran <span className="how-kw">al azar</span> en videollamadas individuales. <span className="how-kw">Preguntas adaptadas</span> guían la conversación. Al final, los participantes pueden intercambiar su <span className="how-kw">tarjeta de contacto</span>.</>,
    time: "Un encuentro guiado, en vídeo",
  },
  {
    n: "03",
    color: "#F59E0B",
    title: <>Tu colectivo <span className="how-kw">te habla.</span> Escúchalo.</>,
    body: <>Al final de cada intercambio, los participantes responden a breves <span className="how-kw">encuestas personalizadas</span>. Así recoges opiniones, puntos de vista y <span className="how-kw">datos útiles</span> para entender mejor a tu colectivo.</>,
    time: "Datos a cambio, para decidir mejor",
  },
];

const STEPS_DE: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>Wähle deine <span className="how-kw">Erlebnisse</span> und Gesprächsthemen</>,
    body: <>Die Einrichtung dauert <span className="how-kw">wenige Minuten</span>. Keine <span className="how-kw">technischen Kenntnisse</span> erforderlich.</>,
    time: "Bereit in wenigen Minuten",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">Zwei Mitglieder.</span> Ein Gespräch. <span className="how-kw">Sechs Minuten.</span></>,
    body: <>Mitglieder werden <span className="how-kw">zufällig</span> für persönliche Video-Gespräche zusammengebracht. <span className="how-kw">Passende Fragen</span> leiten das Gespräch. Am Ende können die Teilnehmenden ihre <span className="how-kw">Kontaktkarten</span> austauschen.</>,
    time: "Ein geführtes Video-Treffen",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>Dein Kollektiv <span className="how-kw">spricht zu dir.</span> Hör zu.</>,
    body: <>Nach jedem Austausch beantworten die Teilnehmenden kurze <span className="how-kw">maßgeschneiderte Umfragen</span>. Du sammelst Feedback, Perspektiven und <span className="how-kw">nützliche Daten</span>, um dein Kollektiv besser zu verstehen.</>,
    time: "Daten als Entscheidungsgrundlage",
  },
];

const STEPS_IT: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>Scegli le tue <span className="how-kw">esperienze</span> e i temi di conversazione</>,
    body: <>La configurazione richiede <span className="how-kw">pochi minuti</span>. Nessuna <span className="how-kw">competenza tecnica</span> richiesta.</>,
    time: "Pronto in pochi minuti",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">Due membri.</span> Una conversazione. <span className="how-kw">Sei minuti.</span></>,
    body: <>I membri vengono associati <span className="how-kw">a caso</span> per videochiamate individuali. <span className="how-kw">Domande su misura</span> guidano la conversazione. Alla fine, i partecipanti possono scambiarsi il <span className="how-kw">biglietto da visita</span>.</>,
    time: "Un incontro video guidato",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>La tua comunità <span className="how-kw">ti parla.</span> Ascoltala.</>,
    body: <>Dopo ogni scambio, i partecipanti rispondono a brevi <span className="how-kw">sondaggi personalizzati</span>. Raccogli feedback, punti di vista e <span className="how-kw">dati utili</span> per comprendere meglio la tua comunità.</>,
    time: "Dati in cambio, per decidere meglio",
  },
];

const STEPS_PT: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>Escolhe as tuas <span className="how-kw">experiências</span> e temas de conversa</>,
    body: <>A configuração demora <span className="how-kw">alguns minutos</span>. Nenhuma <span className="how-kw">competência técnica</span> é necessária.</>,
    time: "Pronto em minutos",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">Dois membros.</span> Uma conversa. <span className="how-kw">Seis minutos.</span></>,
    body: <>Os membros são associados <span className="how-kw">aleatoriamente</span> para videochamadas individuais. <span className="how-kw">Perguntas adaptadas</span> guiam a conversa. No final, os participantes podem trocar o seu <span className="how-kw">cartão de contacto</span>.</>,
    time: "Um encontro de vídeo guiado",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>O teu coletivo <span className="how-kw">fala-te.</span> Escuta-o.</>,
    body: <>Após cada troca, os participantes respondem a breves <span className="how-kw">questionários personalizados</span>. Recolhes feedback, pontos de vista e <span className="how-kw">dados úteis</span> para compreender melhor o teu coletivo.</>,
    time: "Dados em troca, para decidir melhor",
  },
];

const STEPS_RU: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>Выберите свои <span className="how-kw">впечатления</span> и темы для разговора</>,
    body: <>Настройка занимает <span className="how-kw">несколько минут</span>. <span className="how-kw">Технические навыки</span> не требуются.</>,
    time: "Готово за несколько минут",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">Два участника.</span> Один разговор. <span className="how-kw">Шесть минут.</span></>,
    body: <>Участники случайным образом объединяются для <span className="how-kw">видеобесед один на один</span>. <span className="how-kw">Подобранные вопросы</span> направляют разговор. В конце участники могут обменяться <span className="how-kw">визитными карточками</span>.</>,
    time: "Направленная видеовстреча",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>Ваш коллектив <span className="how-kw">говорит вам.</span> Слушайте его.</>,
    body: <>После каждого обмена участники отвечают на короткие <span className="how-kw">персонализированные опросы</span>. Вы собираете отзывы, мнения и <span className="how-kw">полезные данные</span>, чтобы лучше понимать свой коллектив.</>,
    time: "Данные в ответ, чтобы решать",
  },
];

const STEPS_ZH: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>选择你的<span className="how-kw">体验</span>与对话主题</>,
    body: <>设置仅需<span className="how-kw">几分钟</span>。无需<span className="how-kw">任何技术能力</span>。</>,
    time: "几分钟内即可上线",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">两位成员。</span>一场对话。<span className="how-kw">六分钟。</span></>,
    body: <>成员将被<span className="how-kw">随机匹配</span>进行一对一视频交流。<span className="how-kw">量身定制的问题</span>引导整个对话。结束时，参与者可以交换<span className="how-kw">名片</span>。</>,
    time: "一场有引导的视频会面",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>你的集体在<span className="how-kw">向你诉说。</span>倾听它。</>,
    body: <>每次交流结束后，参与者会回答简短的<span className="how-kw">个性化调查</span>。你将收集反馈、观点与<span className="how-kw">有用的数据</span>，从而更好地了解你的集体。</>,
    time: "数据反馈，助你决策",
  },
];

const STEPS_JA: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <><span className="how-kw">体験</span>と話すテーマを選びましょう</>,
    body: <>設定にかかる時間は<span className="how-kw">数分</span>。<span className="how-kw">技術的なスキル</span>は一切不要です。</>,
    time: "数分で準備完了",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">2人のメンバー。</span>1つの会話。<span className="how-kw">6分間。</span></>,
    body: <>メンバーは<span className="how-kw">ランダム</span>に組み合わされ、1対1のビデオ通話を行います。<span className="how-kw">用意された質問</span>が会話を導きます。最後に、参加者は<span className="how-kw">名刺</span>を交換できます。</>,
    time: "ガイド付きビデオでの出会い",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>あなたのコミュニティが<span className="how-kw">語りかけます。</span>耳を傾けましょう。</>,
    body: <>各交流の後、参加者は短い<span className="how-kw">カスタムアンケート</span>に答えます。フィードバック、視点、そして<span className="how-kw">有用なデータ</span>を集めて、コミュニティをより深く理解できます。</>,
    time: "データが意思決定を後押し",
  },
];

const STEPS_HI: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>अपने <span className="how-kw">अनुभव</span> और बातचीत के विषय चुनें</>,
    body: <>सेटअप में केवल <span className="how-kw">कुछ मिनट</span> लगते हैं। किसी <span className="how-kw">तकनीकी कौशल</span> की आवश्यकता नहीं।</>,
    time: "मिनटों में तैयार",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">दो सदस्य।</span> एक बातचीत। <span className="how-kw">छह मिनट।</span></>,
    body: <>सदस्यों को <span className="how-kw">यादृच्छिक रूप से</span> एक-एक वीडियो बातचीत के लिए जोड़ा जाता है। <span className="how-kw">तैयार किए गए सवाल</span> बातचीत को दिशा देते हैं। अंत में, प्रतिभागी अपने <span className="how-kw">कॉन्टैक्ट कार्ड</span> साझा कर सकते हैं।</>,
    time: "एक निर्देशित वीडियो मुलाकात",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>आपका समुदाय <span className="how-kw">आपसे बात करता है।</span> इसे सुनें।</>,
    body: <>हर बातचीत के बाद, प्रतिभागी छोटे <span className="how-kw">कस्टम सर्वे</span> का जवाब देते हैं। आप प्रतिक्रिया, नज़रिए और <span className="how-kw">उपयोगी डेटा</span> इकट्ठा करते हैं ताकि अपने समुदाय को बेहतर समझ सकें।</>,
    time: "बेहतर फैसलों के लिए डेटा",
  },
];

const STEPS_AR: { n: string; color: string; title: React.ReactNode; body: React.ReactNode; time: string }[] = [
  {
    n: "01", color: "#FD6E00",
    title: <>اختر <span className="how-kw">تجاربك</span> ومواضيع المحادثة</>,
    body: <>يستغرق الإعداد <span className="how-kw">بضع دقائق</span> فقط. لا حاجة لأي <span className="how-kw">مهارات تقنية</span>.</>,
    time: "جاهز في دقائق",
  },
  {
    n: "02", color: "#D90A5C",
    title: <><span className="how-kw">عضوان.</span> محادثة واحدة. <span className="how-kw">ست دقائق.</span></>,
    body: <>يتم ربط الأعضاء <span className="how-kw">بشكل عشوائي</span> في محادثات فيديو فردية. <span className="how-kw">أسئلة مخصصة</span> توجّه المحادثة. في النهاية، يمكن للمشاركين تبادل <span className="how-kw">بطاقات التواصل</span>.</>,
    time: "لقاء فيديو موجَّه",
  },
  {
    n: "03", color: "#F59E0B",
    title: <>مجتمعك <span className="how-kw">يتحدث إليك.</span> استمع إليه.</>,
    body: <>بعد كل محادثة، يجيب المشاركون على <span className="how-kw">استبيانات قصيرة مخصصة</span>. تجمع ملاحظات وآراء و<span className="how-kw">بيانات مفيدة</span> لفهم مجتمعك بشكل أفضل.</>,
    time: "بيانات تساعدك على اتخاذ القرار",
  },
];

const HOW_TXT: Record<string, { eyebrow: string; title: React.ReactNode; cta: string; ctaHref: string }> = {
  en: {
    eyebrow: "How it works?",
    title: <><span className="how-title-orange">Three</span>{" "}<span className="v-serif how-title-gradient">steps.</span><br /><span className="how-title-rose">Nothing simpler.</span></>,
    cta: "Discover Uvibes plans",
    ctaHref: "/en/pricing",
  },
  es: {
    eyebrow: "¿Cómo funciona?",
    title: <><span className="how-title-orange">Tres</span>{" "}<span className="v-serif how-title-gradient">pasos.</span><br /><span className="how-title-rose">Nada más simple.</span></>,
    cta: "Descubrir las ofertas Uvibes",
    ctaHref: "/es/pricing",
  },
  de: {
    eyebrow: "Wie es funktioniert?",
    title: <><span className="how-title-orange">Drei</span>{" "}<span className="v-serif how-title-gradient">Schritte.</span><br /><span className="how-title-rose">Nichts einfacher.</span></>,
    cta: "Uvibes-Pakete entdecken",
    ctaHref: "/de/pricing",
  },
  it: {
    eyebrow: "Come funziona?",
    title: <><span className="how-title-orange">Tre</span>{" "}<span className="v-serif how-title-gradient">passi.</span><br /><span className="how-title-rose">Niente di più semplice.</span></>,
    cta: "Scoprire le offerte Uvibes",
    ctaHref: "/it/pricing",
  },
  pt: {
    eyebrow: "Como funciona?",
    title: <><span className="how-title-orange">Três</span>{" "}<span className="v-serif how-title-gradient">passos.</span><br /><span className="how-title-rose">Nada mais simples.</span></>,
    cta: "Descobrir as ofertas Uvibes",
    ctaHref: "/pt/pricing",
  },
  ru: {
    eyebrow: "Как это работает?",
    title: <><span className="how-title-orange">Три</span>{" "}<span className="v-serif how-title-gradient">шага.</span><br /><span className="how-title-rose">Проще не бывает.</span></>,
    cta: "Узнать тарифы Uvibes",
    ctaHref: "/ru/pricing",
  },
  zh: {
    eyebrow: "如何运作？",
    title: <><span className="how-title-orange">三个</span>{" "}<span className="v-serif how-title-gradient">步骤。</span><br /><span className="how-title-rose">再简单不过。</span></>,
    cta: "了解 Uvibes 套餐",
    ctaHref: "/zh/pricing",
  },
  ja: {
    eyebrow: "どのように機能する？",
    title: <><span className="how-title-orange">3つの</span>{" "}<span className="v-serif how-title-gradient">ステップ。</span><br /><span className="how-title-rose">これ以上シンプルなものはありません。</span></>,
    cta: "Uvibesプランを見る",
    ctaHref: "/ja/pricing",
  },
  hi: {
    eyebrow: "यह कैसे काम करता है?",
    title: <><span className="how-title-orange">तीन</span>{" "}<span className="v-serif how-title-gradient">चरण।</span><br /><span className="how-title-rose">इससे आसान कुछ नहीं।</span></>,
    cta: "Uvibes योजनाएं देखें",
    ctaHref: "/hi/pricing",
  },
  ar: {
    eyebrow: "كيف يعمل؟",
    title: <><span className="how-title-orange">ثلاث</span>{" "}<span className="v-serif how-title-gradient">خطوات.</span><br /><span className="how-title-rose">لا شيء أبسط من ذلك.</span></>,
    cta: "اكتشف باقات Uvibes",
    ctaHref: "/ar/pricing",
  },
};

const STEPS_BY_LOCALE: Record<string, typeof STEPS_FR> = {
  en: STEPS_EN, es: STEPS_ES, de: STEPS_DE, it: STEPS_IT, pt: STEPS_PT,
  ru: STEPS_RU, zh: STEPS_ZH, ja: STEPS_JA, hi: STEPS_HI, ar: STEPS_AR,
};

export default function HowItWorks({ locale = "fr" }: { locale?: string }) {
  const STEPS = STEPS_BY_LOCALE[locale] ?? STEPS_FR;
  const how = locale !== "fr" ? HOW_TXT[locale] : undefined;
  const [ref, vis] = useIntersectionOnce<HTMLElement>({ threshold: 0.08 });

  return (
    <section className={`how-section${vis ? " how-vis" : ""}`} ref={ref}>
      <div className="how-blob how-blob--1" aria-hidden="true" />
      <div className="how-blob how-blob--2" aria-hidden="true" />
      <div className="how-vlines" aria-hidden="true">
        <VibrationLine width={1400} height={70} amplitude={18} freq={5} stroke="rgba(253,110,0,.15)" strokeWidth={1.5} speed={18} />
        <VibrationLine width={1400} height={70} amplitude={12} freq={8} stroke="rgba(217,10,92,.1)" strokeWidth={1} speed={26} />
      </div>
      <div className="how-header">
        <p className="v-mono how-eyebrow">
          <span className="how-eyebrow-dot" aria-hidden="true" />
          {how ? how.eyebrow : "Comment ça fonctionne ?"}
        </p>
        <h2 className="how-title v-prompt">
          {how ? how.title : (
            <>
              <span className="how-title-orange">Trois</span>{" "}
              <span className="v-serif how-title-gradient">étapes.</span>
              <br />
              <span className="how-title-rose">Rien de plus simple.</span>
            </>
          )}
        </h2>
      </div>

      <div className="how-grid">
        <div className="how-connector" aria-hidden="true">
          <VibrationLine
            width={1200} height={40}
            amplitude={14} freq={4}
            stroke="var(--rose)" strokeWidth={2}
            speed={6}
            style={{ width: "100%", opacity: 0.6 }}
          />
        </div>

        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`how-step how-step--${i + 1}`}
            style={{ "--step-color": s.color } as React.CSSProperties}
          >
            <div className="how-circle-wrap">
              <div className="how-circle v-prompt">{s.n}</div>
              <span className="how-circle-ring" aria-hidden="true" />
            </div>
            <h3 className="how-step-title v-prompt">{s.title}</h3>
            <p className="how-step-body">{s.body}</p>
            <div className="how-time-badge">
              <span className="v-mono how-time-text">{s.time}</span>
              <VibrationLine className="how-time-vib" width={150} height={10} amplitude={3} freq={7} stroke={s.color} strokeWidth={2} speed={9} />
            </div>
          </div>
        ))}
      </div>

      <div className="how-cta-wrap">
        <Link href={how ? how.ctaHref : "/tarifs"} className="btn-brand how-cta">
          {how ? how.cta : "Découvrir nos offres Uvibes"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

    </section>
  );
}
