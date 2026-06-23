"use client";

import type { FormData } from "@/types/form/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../../styles/form/formContact.css";

// Catégories alignées sur les Passeports d'Expérience (cf. PasseportExperience)
const CATEGORIES_FR = [
  "Insertion professionnelle",
  "Enseignement",
  "Business",
  "Échanges entre pairs",
  "Adhérents & Sociétaires",
  "Seniors",
  "Clubs sportifs",
  "Cinémas, théâtres & lieux culturels",
  "Campings & villages vacances",
  "Entreprises & Équipes",
  "International",
];

const CATEGORIES_EN = [
  "Career support",
  "Education",
  "Business",
  "Peer support",
  "Members & policyholders",
  "Seniors",
  "Sports clubs",
  "Cinemas, theatres & cultural venues",
  "Campsites & holiday resorts",
  "Companies & teams",
  "International",
];

const CATEGORIES_ES = [
  "Inserción laboral",
  "Educación",
  "Negocios",
  "Apoyo entre pares",
  "Socios y mutualistas",
  "Personas mayores",
  "Clubes deportivos",
  "Cines, teatros y espacios culturales",
  "Campings y complejos vacacionales",
  "Empresas y equipos",
  "Internacional",
];

const CATEGORIES_DE = [
  "Berufseinstieg",
  "Bildung",
  "Wirtschaft",
  "Peer-Support",
  "Mitglieder & Versicherte",
  "Senioren",
  "Sportvereine",
  "Kinos, Theater & Kulturstätten",
  "Campingplätze & Ferienanlagen",
  "Unternehmen & Teams",
  "International",
];

const CATEGORIES_IT = [
  "Inserimento lavorativo",
  "Istruzione",
  "Business",
  "Supporto tra pari",
  "Soci e mutualisti",
  "Senior",
  "Club sportivi",
  "Cinema, teatri e luoghi culturali",
  "Campeggi e villaggi vacanze",
  "Aziende e team",
  "Internazionale",
];

const CATEGORIES_PT = [
  "Inserção profissional",
  "Educação",
  "Negócios",
  "Apoio entre pares",
  "Associados e mutualistas",
  "Seniores",
  "Clubes desportivos",
  "Cinemas, teatros e espaços culturais",
  "Campings e aldeamentos turísticos",
  "Empresas e equipas",
  "Internacional",
];

const CATEGORIES_RU = [
  "Профессиональная интеграция",
  "Образование",
  "Бизнес",
  "Поддержка между сверстниками",
  "Члены и страхователи",
  "Пожилые люди",
  "Спортивные клубы",
  "Кинотеатры, театры и культурные площадки",
  "Кемпинги и курортные посёлки",
  "Компании и команды",
  "Международный",
];

const CATEGORIES_ZH = [
  "就业帮扶",
  "教育",
  "商业",
  "同伴支持",
  "会员与互助会员",
  "老年人",
  "体育俱乐部",
  "电影院、剧院与文化场所",
  "露营地与度假村",
  "企业与团队",
  "国际",
];

const CATEGORIES_JA = [
  "就職支援",
  "教育",
  "ビジネス",
  "ピアサポート",
  "会員・共済組合員",
  "シニア",
  "スポーツクラブ",
  "映画館・劇場・文化施設",
  "キャンプ場・リゾート村",
  "企業・チーム",
  "インターナショナル",
];

const CATEGORIES_HI = [
  "व्यावसायिक एकीकरण",
  "शिक्षा",
  "बिज़नेस",
  "साथियों का सहयोग",
  "सदस्य और बीमित सदस्य",
  "वरिष्ठ नागरिक",
  "स्पोर्ट्स क्लब",
  "सिनेमाघर, थिएटर और सांस्कृतिक स्थल",
  "कैम्पसाइट और हॉलिडे विलेज",
  "कंपनियाँ और टीमें",
  "अंतरराष्ट्रीय",
];

const CATEGORIES_AR = [
  "الإدماج المهني",
  "التعليم",
  "الأعمال",
  "الدعم بين الأقران",
  "الأعضاء والمؤمَّن لهم",
  "كبار السن",
  "النوادي الرياضية",
  "دور السينما والمسارح والفضاءات الثقافية",
  "المخيمات والقرى السياحية",
  "الشركات والفرق",
  "دولي",
];

const FC_TXT: Record<string, {
  required: string; lastname: string; lastnamePh: string; firstname: string; firstnamePh: string;
  emailPh: string; organisation: string; organisationPh: string; messagePh: string; share: string;
  newsletterTitle: string; newsletterSub: React.ReactNode; topicsLabel: string;
  sending: string; send: string; success: string; error: string;
}> = {
  en: {
    required: "Required",
    lastname: "Last name", lastnamePh: "Smith",
    firstname: "First name", firstnamePh: "Mary",
    emailPh: "you@organization.com",
    organisation: "Organization", organisationPh: "Your organization's name",
    messagePh: "Tell us about your community and your goals...",
    share: "I agree to share my information with Uvibes and be contacted back.",
    newsletterTitle: "📬 Get our best ideas in our newsletter",
    newsletterSub: "News relevant to your organization, real user stories, soft-skills tips — 1 email a month, zero spam.",
    topicsLabel: "Which topics interest you?",
    sending: "Sending…", send: "Send",
    success: "Message sent! We'll get back to you within 48h.",
    error: "Something went wrong, please try again.",
  },
  es: {
    required: "Obligatorio",
    lastname: "Apellido", lastnamePh: "García",
    firstname: "Nombre", firstnamePh: "María",
    emailPh: "tu@organizacion.com",
    organisation: "Organización", organisationPh: "Nombre de tu organización",
    messagePh: "Cuéntanos sobre tu colectivo y tus objetivos...",
    share: "Acepto compartir mis datos con Uvibes y que me contacten.",
    newsletterTitle: "📬 Recibe nuestras mejores ideas en la newsletter",
    newsletterSub: "Noticias relevantes para tu organización, casos reales de usuarios, consejos de soft skills — 1 email al mes, cero spam.",
    topicsLabel: "¿Qué temas te interesan?",
    sending: "Enviando…", send: "Enviar",
    success: "¡Mensaje enviado! Te responderemos en menos de 48h.",
    error: "Ha ocurrido un error, inténtalo de nuevo.",
  },
  de: {
    required: "Pflichtfeld",
    lastname: "Nachname", lastnamePh: "Schmidt",
    firstname: "Vorname", firstnamePh: "Maria",
    emailPh: "du@organisation.de",
    organisation: "Organisation", organisationPh: "Name Ihrer Organisation",
    messagePh: "Erzählen Sie uns von Ihrem Kollektiv und Ihren Zielen...",
    share: "Ich bin damit einverstanden, meine Daten mit Uvibes zu teilen und kontaktiert zu werden.",
    newsletterTitle: "📬 Erhalten Sie unsere besten Ideen im Newsletter",
    newsletterSub: "Neuigkeiten für Ihre Organisation, echte Nutzererfahrungen, Soft-Skills-Tipps — 1 E-Mail pro Monat, kein Spam.",
    topicsLabel: "Welche Themen interessieren Sie?",
    sending: "Wird gesendet…", send: "Senden",
    success: "Nachricht gesendet! Wir melden uns innerhalb von 48 Stunden.",
    error: "Etwas ist schiefgelaufen, bitte versuchen Sie es erneut.",
  },
  it: {
    required: "Obbligatorio",
    lastname: "Cognome", lastnamePh: "Rossi",
    firstname: "Nome", firstnamePh: "Maria",
    emailPh: "tu@organizzazione.it",
    organisation: "Organizzazione", organisationPh: "Nome della tua organizzazione",
    messagePh: "Raccontaci della tua comunità e dei tuoi obiettivi...",
    share: "Accetto di condividere i miei dati con Uvibes ed essere ricontattato/a.",
    newsletterTitle: "📬 Ricevi le nostre migliori idee con la newsletter",
    newsletterSub: "Notizie rilevanti per la tua organizzazione, storie reali di utenti, consigli sulle soft skills — 1 email al mese, zero spam.",
    topicsLabel: "Quali argomenti ti interessano?",
    sending: "Invio in corso…", send: "Invia",
    success: "Messaggio inviato! Ti risponderemo entro 48 ore.",
    error: "Si è verificato un errore, riprova.",
  },
  pt: {
    required: "Obrigatório",
    lastname: "Sobrenome", lastnamePh: "Silva",
    firstname: "Nome", firstnamePh: "Maria",
    emailPh: "voce@organizacao.pt",
    organisation: "Organização", organisationPh: "Nome da sua organização",
    messagePh: "Conte-nos sobre o seu coletivo e os seus objetivos...",
    share: "Aceito partilhar os meus dados com a Uvibes e ser contactado(a).",
    newsletterTitle: "📬 Receba as nossas melhores ideias na newsletter",
    newsletterSub: "Notícias relevantes para a sua organização, casos reais de utilizadores, dicas de soft skills — 1 email por mês, zero spam.",
    topicsLabel: "Que temas lhe interessam?",
    sending: "A enviar…", send: "Enviar",
    success: "Mensagem enviada! Responderemos em até 48h.",
    error: "Ocorreu um erro, tente novamente.",
  },
  ru: {
    required: "Обязательно",
    lastname: "Фамилия", lastnamePh: "Иванова",
    firstname: "Имя", firstnamePh: "Мария",
    emailPh: "vy@organizatsiya.ru",
    organisation: "Организация", organisationPh: "Название вашей организации",
    messagePh: "Расскажите о вашем коллективе и ваших целях...",
    share: "Я согласен(на) поделиться своими данными с Uvibes и получить ответ.",
    newsletterTitle: "📬 Получайте наши лучшие идеи в рассылке",
    newsletterSub: "Новости, важные для вашей организации, реальные истории пользователей, советы по soft skills — 1 письмо в месяц, без спама.",
    topicsLabel: "Какие темы вас интересуют?",
    sending: "Отправка…", send: "Отправить",
    success: "Сообщение отправлено! Мы ответим вам в течение 48 часов.",
    error: "Произошла ошибка, попробуйте снова.",
  },
  zh: {
    required: "必填",
    lastname: "姓", lastnamePh: "王",
    firstname: "名", firstnamePh: "丽",
    emailPh: "you@organization.com",
    organisation: "机构", organisationPh: "你的机构名称",
    messagePh: "告诉我们你的集体和你的目标……",
    share: "我同意与 Uvibes 分享我的信息并接受回复联系。",
    newsletterTitle: "📬 通过新闻通讯获取我们的精彩想法",
    newsletterSub: "与你的机构相关的资讯、真实用户故事、软技能小贴士——每月一封邮件，绝不打扰。",
    topicsLabel: "你对哪些主题感兴趣？",
    sending: "发送中…", send: "发送",
    success: "消息已发送！我们将在48小时内回复你。",
    error: "出现错误，请重试。",
  },
  ja: {
    required: "必須",
    lastname: "姓", lastnamePh: "山田",
    firstname: "名", firstnamePh: "花子",
    emailPh: "you@organization.com",
    organisation: "団体名", organisationPh: "あなたの団体名",
    messagePh: "あなたのコレクティフと目標について教えてください…",
    share: "Uvibesと情報を共有し、連絡を受けることに同意します。",
    newsletterTitle: "📬 ニュースレターでベストアイデアを受け取る",
    newsletterSub: "あなたの団体に関連するニュース、実際のユーザー体験談、ソフトスキルのヒント — 月1回のメール、スパムなし。",
    topicsLabel: "どのトピックに興味がありますか？",
    sending: "送信中…", send: "送信",
    success: "メッセージを送信しました！48時間以内にご返信します。",
    error: "エラーが発生しました。再度お試しください。",
  },
  hi: {
    required: "आवश्यक",
    lastname: "उपनाम", lastnamePh: "शर्मा",
    firstname: "पहला नाम", firstnamePh: "मारिया",
    emailPh: "aap@sangathan.com",
    organisation: "संगठन", organisationPh: "आपके संगठन का नाम",
    messagePh: "हमें अपने समूह और अपने लक्ष्यों के बारे में बताएं...",
    share: "मैं Uvibes के साथ अपनी जानकारी साझा करने और संपर्क किए जाने के लिए सहमत हूं।",
    newsletterTitle: "📬 हमारे न्यूज़लेटर में हमारे बेहतरीन विचार पाएं",
    newsletterSub: "आपके संगठन से जुड़ी खबरें, असली उपयोगकर्ताओं की कहानियाँ, सॉफ्ट स्किल्स के सुझाव — महीने में 1 ईमेल, बिल्कुल स्पैम नहीं।",
    topicsLabel: "आपको कौन से विषय रुचिकर लगते हैं?",
    sending: "भेजा जा रहा है…", send: "भेजें",
    success: "संदेश भेज दिया गया! हम 48 घंटों के भीतर आपसे संपर्क करेंगे।",
    error: "कुछ गलत हो गया, कृपया फिर से प्रयास करें।",
  },
  ar: {
    required: "مطلوب",
    lastname: "اسم العائلة", lastnamePh: "بن علي",
    firstname: "الاسم الأول", firstnamePh: "مريم",
    emailPh: "you@organization.com",
    organisation: "المؤسسة", organisationPh: "اسم مؤسستك",
    messagePh: "أخبرنا عن مجموعتك وأهدافك...",
    share: "أوافق على مشاركة معلوماتي مع Uvibes وأن يتم التواصل معي.",
    newsletterTitle: "📬 احصل على أفضل أفكارنا في النشرة الإخبارية",
    newsletterSub: "أخبار تهم مؤسستك، قصص حقيقية من المستخدمين، نصائح في المهارات اللينة — رسالة واحدة شهريًا، بدون أي إزعاج.",
    topicsLabel: "ما المواضيع التي تهمك؟",
    sending: "جارٍ الإرسال…", send: "إرسال",
    success: "تم إرسال الرسالة! سنرد عليك في غضون 48 ساعة.",
    error: "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
  },
};

const CATEGORIES_BY_LOCALE: Record<string, string[]> = {
  en: CATEGORIES_EN,
  es: CATEGORIES_ES,
  de: CATEGORIES_DE,
  it: CATEGORIES_IT,
  pt: CATEGORIES_PT,
  ru: CATEGORIES_RU,
  zh: CATEGORIES_ZH,
  ja: CATEGORIES_JA,
  hi: CATEGORIES_HI,
  ar: CATEGORIES_AR,
};

export default function FormContact({ locale = "fr" }: { locale?: string }) {
  const CATEGORIES = CATEGORIES_BY_LOCALE[locale] ?? CATEGORIES_FR;
  const fc = locale !== "fr" ? FC_TXT[locale] : undefined;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // Les catégories ne s'affichent que si la newsletter est cochée → formulaire plus court
  const wantsNewsletter = watch("newsletter");
  const selectedCategories = watch("categories") || [];

  function toggleCategory(c: string) {
    const next = selectedCategories.includes(c)
      ? selectedCategories.filter((x) => x !== c)
      : [...selectedCategories, c];
    setValue("categories", next);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);
    try {
      const response = await fetch("api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
      console.error("Erreur lors de l'envoi de l'email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="fc-form" onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Nom + Prénom */}
      <div className="fco-row">
        <div className="fc-field">
          <label className="fc-label" htmlFor="lastname">{fc ? fc.lastname : "Nom"}</label>
          <input
            id="lastname"
            className={`fc-input${errors.lastname ? " --error" : ""}`}
            placeholder={fc ? fc.lastnamePh : "Dupont"}
            {...register("lastname", { required: fc ? fc.required : "Requis" })}
          />
          {errors.lastname && <span className="fc-error">{errors.lastname.message}</span>}
        </div>
        <div className="fc-field">
          <label className="fc-label" htmlFor="firstname">{fc ? fc.firstname : "Prénom"}</label>
          <input
            id="firstname"
            className={`fc-input${errors.firstname ? " --error" : ""}`}
            placeholder={fc ? fc.firstnamePh : "Marie"}
            {...register("firstname", { required: fc ? fc.required : "Requis" })}
          />
          {errors.firstname && <span className="fc-error">{errors.firstname.message}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`fc-input${errors.email ? " --error" : ""}`}
          placeholder={fc ? fc.emailPh : "vous@organisation.fr"}
          {...register("email", { required: fc ? fc.required : "Requis" })}
        />
        {errors.email && <span className="fc-error">{errors.email.message}</span>}
      </div>

      {/* Organisation */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="organisation">{fc ? fc.organisation : "Organisation"}</label>
        <input
          id="organisation"
          className="fc-input"
          placeholder={fc ? fc.organisationPh : "Nom de votre structure"}
          {...register("organisation")}
        />
      </div>

      {/* Message */}
      <div className="fc-field">
        <label className="fc-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          className={`fc-input fc-textarea${errors.message ? " --error" : ""}`}
          placeholder={fc ? fc.messagePh : "Décrivez votre collectif et vos objectifs..."}
          {...register("message", { required: fc ? fc.required : "Requis" })}
        />
        {errors.message && <span className="fc-error">{errors.message.message}</span>}
      </div>

      {/* Checkboxes */}
      <div className="fc-checks">
        <label className="fc-check-label">
          <input type="checkbox" required {...register("share")} />
          <span>{fc ? fc.share : "Je souhaite partager mes informations avec Uvibes et être recontacté.e"}</span>
        </label>
      </div>

      {/* Newsletter — encart mis en avant + choix des catégories de contenu */}
      <div className="fc-newsletter-block">
        <label className="fc-newsletter">
          <input type="checkbox" {...register("newsletter")} />
          <span className="fc-newsletter-body">
            <span className="fc-newsletter-title">{fc ? fc.newsletterTitle : "📬 Recevoir nos meilleures idées avec la newsletter"}</span>
            <span className="fc-newsletter-sub">
              {fc ? fc.newsletterSub : <>Actualités intéressant votre organisation, retours d&apos;expérience d&apos;utilisateurs, astuces soft skills – 1 email par mois, zéro spam.</>}
            </span>
          </span>
        </label>
        {wantsNewsletter && (
          <div className="fc-newsletter-cat">
            <span className="fc-label">{fc ? fc.topicsLabel : "Quelles catégories vous intéressent ?"}</span>
            <div className="fc-cat-tags">
              {CATEGORIES.map((c) => {
                const active = selectedCategories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    className={`fc-cat-tag${active ? " --active" : ""}`}
                    aria-pressed={active}
                    onClick={() => toggleCategory(c)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bouton */}
      <button type="submit" className="fc-submit" disabled={isSubmitting}>
        {isSubmitting ? (fc ? fc.sending : "Envoi en cours…") : (fc ? fc.send : "Envoyer")}
        {!isSubmitting && <span className="fc-submit-dot" aria-hidden="true" />}
      </button>

      {submitSuccess && (
        <p className="fc-success">{fc ? fc.success : "Message envoyé ! On revient vers vous sous 48h."}</p>
      )}
      {submitError && (
        <p className="fc-error-global">{fc ? fc.error : "Une erreur est survenue, veuillez réessayer."}</p>
      )}
    </form>
  );
}
