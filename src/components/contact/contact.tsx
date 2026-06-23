import "../../styles/contact/contact.css";
import VibrationLine from "@/components/shared/VibrationLine";
import WaveSeparator from "@/components/shared/WaveSeparator";
import FormContact from "../form/formContact";

const CT_TXT: Record<string, { eyebrow: string; line1: string; serif: string; sub: React.ReactNode }> = {
  en: {
    eyebrow: "Let's talk about your project",
    line1: "Your project deserves",
    serif: "a real conversation.",
    sub: "A few lines are enough. Tell us what brings you to Uvibes and the questions you have about your project — we'll get back to you personally.",
  },
  es: {
    eyebrow: "Hablemos de tu proyecto",
    line1: "Tu proyecto merece",
    serif: "una conversación de verdad.",
    sub: <>Unas pocas líneas bastan. Cuéntanos qué te trae a Uvibes y las preguntas que tienes sobre tu proyecto&nbsp;:<br className="ct-br-desktop" /> te responderemos de forma personalizada.</>,
  },
  de: {
    eyebrow: "Lass uns über dein Projekt sprechen",
    line1: "Dein Projekt verdient",
    serif: "ein echtes Gespräch.",
    sub: <>Ein paar Zeilen reichen. Erzähl uns, was dich zu Uvibes führt und welche Fragen du zu deinem Projekt hast&nbsp;:<br className="ct-br-desktop" /> wir antworten dir persönlich.</>,
  },
  it: {
    eyebrow: "Parliamo del tuo progetto",
    line1: "Il tuo progetto merita",
    serif: "una vera conversazione.",
    sub: <>Bastano poche righe. Raccontaci cosa ti porta a Uvibes e le domande che hai sul tuo progetto&nbsp;:<br className="ct-br-desktop" /> ti risponderemo in modo personalizzato.</>,
  },
  pt: {
    eyebrow: "Vamos falar sobre o seu projeto",
    line1: "O seu projeto merece",
    serif: "uma conversa de verdade.",
    sub: <>Bastam algumas linhas. Diga-nos o que o traz à Uvibes e as perguntas que tem sobre o seu projeto&nbsp;:<br className="ct-br-desktop" /> responderemos de forma personalizada.</>,
  },
  ru: {
    eyebrow: "Поговорим о вашем проекте",
    line1: "Ваш проект заслуживает",
    serif: "настоящего разговора.",
    sub: <>Достаточно нескольких строк. Расскажите, что привело вас к Uvibes, и какие вопросы у вас есть по поводу вашего проекта&nbsp;:<br className="ct-br-desktop" /> мы ответим вам лично.</>,
  },
  zh: {
    eyebrow: "聊聊你的项目",
    line1: "你的项目值得",
    serif: "一次真正的对话。",
    sub: <>几行字就足够了。告诉我们是什么让你来到 Uvibes，以及你对项目有哪些疑问&nbsp;：<br className="ct-br-desktop" />我们会亲自回复你。</>,
  },
  ja: {
    eyebrow: "あなたのプロジェクトについて話しましょう",
    line1: "あなたのプロジェクトには",
    serif: "本当の対話がふさわしい。",
    sub: <>数行で十分です。Uvibesに興味を持ったきっかけと、プロジェクトについての質問を教えてください&nbsp;：<br className="ct-br-desktop" />個別にご返信いたします。</>,
  },
  hi: {
    eyebrow: "आइए आपकी परियोजना पर बात करें",
    line1: "आपकी परियोजना के लिए ज़रूरी है",
    serif: "एक सच्ची बातचीत।",
    sub: <>कुछ पंक्तियाँ ही काफी हैं। बताएं कि आपको Uvibes तक क्या लाया और आपकी परियोजना के बारे में आपके क्या सवाल हैं&nbsp;:<br className="ct-br-desktop" /> हम आपको व्यक्तिगत रूप से जवाब देंगे।</>,
  },
  ar: {
    eyebrow: "لنتحدث عن مشروعك",
    line1: "مشروعك يستحق",
    serif: "محادثة حقيقية.",
    sub: <>تكفي بضعة أسطر. أخبرنا بما يجلبك إلى Uvibes والأسئلة التي تشغل بالك حول مشروعك&nbsp;:<br className="ct-br-desktop" /> سنرد عليك بشكل شخصي.</>,
  },
};

export default function Contact({ locale = "fr" }: { locale?: string }) {
  const ct = locale !== "fr" ? CT_TXT[locale] : undefined;
  return (
    <section className="ct-section" id="contact">
      {/* Séparateur wavy animé (2 couches, sans trou) */}
      <WaveSeparator position="top" />
      {/* Blobs identiques au hero */}
      <div className="ct-blob ct-blob--a" aria-hidden="true" />
      <div className="ct-blob ct-blob--b" aria-hidden="true" />
      <div className="ct-blob ct-blob--c" aria-hidden="true" />
      <div className="ct-blob ct-blob--d" aria-hidden="true" />

      <div className="ct-inner">
        {/* Colonne gauche */}
        <div className="ct-left">
          <p className="ct-eyebrow v-mono">{ct ? ct.eyebrow : "Étudions votre projet"}</p>
          <h2 className="ct-title">
            {ct ? (
              <>
                <span className="v-prompt">{ct.line1}</span>
                <br />
                <span className="ct-underline-wrap">
                  <span className="v-serif ct-title-serif">{ct.serif}</span>
                  <span className="ct-vline-under" aria-hidden="true">
                    <VibrationLine width={500} height={20} amplitude={6} freq={5} stroke="rgba(255,255,255,.6)" strokeWidth={3} speed={5} style={{ width: "100%" }} />
                  </span>
                </span>
              </>
            ) : (
              <>
                <span className="v-prompt">Votre projet mérite</span>
                <br />
                <span className="ct-underline-wrap">
                  <span className="v-serif ct-title-serif">une vraie conversation.</span>
                  <span className="ct-vline-under" aria-hidden="true">
                    <VibrationLine width={500} height={20} amplitude={6} freq={5} stroke="rgba(255,255,255,.6)" strokeWidth={3} speed={5} style={{ width: "100%" }} />
                  </span>
                </span>
              </>
            )}
          </h2>
          <p className="ct-sub">
            {ct ? ct.sub : <>Quelques lignes suffisent. Dites-nous ce qui vous amène vers Uvibes et les questions que vous vous posez pour votre projet&nbsp;:<br className="ct-br-desktop" /> nous vous répondrons de façon personnalisée.</>}
          </p>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="ct-right">
          {/* Sonar dans le fond, derrière la carte */}
          <div className="ct-sonar" aria-hidden="true">
            <span className="ct-ripple" style={{ animationDelay: "0s"   }} />
            <span className="ct-ripple" style={{ animationDelay: "1.1s" }} />
            <span className="ct-ripple" style={{ animationDelay: "2.2s" }} />
            <span className="ct-ripple" style={{ animationDelay: "3.3s" }} />
            <span className="ct-sonar-dot" />
          </div>
          <div className="ct-form-card">
            <FormContact locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
