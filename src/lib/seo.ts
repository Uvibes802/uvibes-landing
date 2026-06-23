import type { Metadata } from "next";

export const SITE_URL = "https://uvibes.fr";
export const SITE_NAME = "Uvibes";
export const OG_IMAGE_DEFAULT = "/images/uvibes-section.png";

type LangSeo = { title: string; description: string; path: string };
// fr est toujours présent ; chaque langue supplémentaire (en, es, de…) est ajoutée
// au fur et à mesure que sa page existe — aucun autre changement de type nécessaire.
type PageSeoConfig = { fr: LangSeo } & Partial<Record<string, LangSeo>>;

// Codes BCP47 pour les hreflang + OpenGraph locale, par code de langue du site.
const BCP47: Record<string, string> = {
  fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE", it: "it-IT",
  pt: "pt-PT", zh: "zh-CN", ja: "ja-JP", ar: "ar-SA", ru: "ru-RU", hi: "hi-IN",
};
const OG_LOCALE: Record<string, string> = {
  fr: "fr_FR", en: "en_US", es: "es_ES", de: "de_DE", it: "it_IT",
  pt: "pt_PT", zh: "zh_CN", ja: "ja_JP", ar: "ar_SA", ru: "ru_RU", hi: "hi_IN",
};

// Chaque entrée porte le FR (toujours présent) et, si la page a un équivalent
// anglais publié, le EN — ce qui permet d'émettre les hreflang dans les deux sens.
export const PAGE_SEO: Record<string, PageSeoConfig> = {
  home: {
    fr: {
      title: "Application bien-être collectif et lien social | Uvibes",
      description:
        "Uvibes active les conversations positives au sein des collectifs pour renforcer le lien social, le bien-être et l'engagement humain. Essayez gratuitement.",
      path: "/",
    },
    en: {
      title: "Bring Your Community to Life — Connection App | Uvibes",
      description:
        "Uvibes sparks real conversations inside organizations to build belonging, wellbeing and human connection. See why collectives can't stop talking about it.",
      path: "/en",
    },
    es: {
      title: "Da vida a tu colectivo — App de conexión social | Uvibes",
      description:
        "Uvibes despierta conversaciones reales dentro de las organizaciones para fortalecer el sentido de pertenencia, el bienestar y la conexión humana. Descubre por qué los colectivos no dejan de hablar de ello.",
      path: "/es",
    },
    de: {
      title: "Bring dein Kollektiv zum Leben — Verbindungs-App | Uvibes",
      description:
        "Uvibes weckt echte Gespräche in Organisationen, um Zugehörigkeit, Wohlbefinden und menschliche Verbindung zu stärken. Entdecke, warum Kollektive nicht aufhören können, darüber zu sprechen.",
      path: "/de",
    },
    it: {
      title: "Dai vita alla tua comunità — App di connessione | Uvibes",
      description:
        "Uvibes accende conversazioni reali all'interno delle organizzazioni per rafforzare il senso di appartenenza, il benessere e la connessione umana. Scopri perché i collettivi non smettono di parlarne.",
      path: "/it",
    },
    pt: {
      title: "Dê vida ao seu coletivo — App de conexão social | Uvibes",
      description:
        "A Uvibes desperta conversas reais dentro das organizações para fortalecer o sentido de pertença, o bem-estar e a conexão humana. Descubra por que os coletivos não conseguem parar de falar sobre isso.",
      path: "/pt",
    },
    ru: {
      title: "Оживите свой коллектив — приложение для общения | Uvibes",
      description:
        "Uvibes пробуждает настоящие разговоры внутри организаций, укрепляя чувство принадлежности, благополучие и человеческую связь. Узнайте, почему коллективы не могут перестать об этом говорить.",
      path: "/ru",
    },
    zh: {
      title: "唤醒你的集体活力 — 连接应用 | Uvibes",
      description:
        "Uvibes 在组织内激发真实的对话，增强归属感、幸福感与人际联系。了解为何集体对它欲罢不能。",
      path: "/zh",
    },
    ja: {
      title: "コミュニティに命を吹き込む — つながりアプリ | Uvibes",
      description:
        "Uvibesは組織内でリアルな会話を生み出し、帰属意識・ウェルビーイング・人とのつながりを高めます。コミュニティが夢中になる理由をご覧ください。",
      path: "/ja",
    },
    hi: {
      title: "अपने समुदाय में जान डालें — कनेक्शन ऐप | Uvibes",
      description:
        "Uvibes संगठनों के भीतर सच्ची बातचीत को जन्म देता है, जिससे अपनापन, बेहतरी और मानवीय जुड़ाव मजबूत होता है। जानें कि समुदाय इसकी चर्चा करना क्यों नहीं छोड़ पाते।",
      path: "/hi",
    },
    ar: {
      title: "أبعث الحياة في مجتمعك — تطبيق التواصل | Uvibes",
      description:
        "يُحيي Uvibes محادثات حقيقية داخل المنظمات لتعزيز الانتماء والرفاهية والتواصل الإنساني. اكتشف لماذا لا تستطيع المجتمعات التوقف عن الحديث عنه.",
      path: "/ar",
    },
  },
  uvibes: {
    fr: {
      title: "Innovation socio-digitale à impact collectif | Uvibes",
      description:
        "Uvibes est une association à impact sociétal portée par une équipe engagée. Découvrez notre histoire, notre mission et nos valeurs éthiques.",
      path: "/a-propos",
    },
    en: {
      title: "Who's Behind Uvibes — Our Story & Team | Uvibes",
      description:
        "Meet the people and the idea powering Uvibes — a non-profit-driven project on a mission to make real conversation a habit again.",
      path: "/en/about",
    },
    es: {
      title: "Quién está detrás de Uvibes — Historia y equipo | Uvibes",
      description:
        "Conoce a las personas y la idea que impulsan Uvibes, un proyecto sin fines de lucro con la misión de devolverle a la conversación real su lugar en el día a día.",
      path: "/es/about",
    },
    de: {
      title: "Wer hinter Uvibes steckt — Geschichte & Team | Uvibes",
      description:
        "Lerne die Menschen und die Idee hinter Uvibes kennen — ein gemeinnütziges Projekt mit der Mission, dem echten Gespräch wieder seinen Platz im Alltag zu geben.",
      path: "/de/about",
    },
    it: {
      title: "Chi c'è dietro Uvibes — Storia e team | Uvibes",
      description:
        "Scopri le persone e l'idea dietro Uvibes, un progetto senza scopo di lucro con la missione di restituire alla conversazione vera il suo posto nella vita quotidiana.",
      path: "/it/about",
    },
    pt: {
      title: "Quem está por trás da Uvibes — História e equipa | Uvibes",
      description:
        "Conheça as pessoas e a ideia por detrás da Uvibes, um projeto sem fins lucrativos com a missão de devolver à conversa real o seu lugar no dia a dia.",
      path: "/pt/about",
    },
    ru: {
      title: "Кто стоит за Uvibes — История и команда | Uvibes",
      description:
        "Познакомьтесь с людьми и идеей, стоящей за Uvibes — некоммерческим проектом, миссия которого — вернуть настоящему разговору его место в повседневной жизни.",
      path: "/ru/about",
    },
    zh: {
      title: "Uvibes 背后的故事与团队 | Uvibes",
      description:
        "认识 Uvibes 背后的人与理念——一个非营利项目，致力于让真实的对话重新回到日常生活之中。",
      path: "/zh/about",
    },
    ja: {
      title: "Uvibesを支える人々 — ストーリーとチーム | Uvibes",
      description:
        "Uvibesを支える人々とアイデアをご紹介します。非営利団体として、本当の会話を日常に取り戻すことを使命としています。",
      path: "/ja/about",
    },
    hi: {
      title: "Uvibes के पीछे कौन है — हमारी कहानी और टीम | Uvibes",
      description:
        "Uvibes के पीछे के लोगों और विचार से मिलें — एक गैर-लाभकारी परियोजना, जिसका मिशन है असली बातचीत को रोज़मर्रा की ज़िंदगी में फिर से जगह देना।",
      path: "/hi/about",
    },
    ar: {
      title: "من وراء Uvibes — قصتنا وفريقنا | Uvibes",
      description:
        "تعرّف على الأشخاص والفكرة وراء Uvibes، مشروع غير ربحي مهمته إعادة المحادثة الحقيقية إلى مكانها في الحياة اليومية.",
      path: "/ar/about",
    },
  },
  blog: {
    fr: {
      title: "Ressources sur lien social, soft skills et collectifs | Uvibes",
      description:
        "Articles, conseils et inspirations sur le bien-être au travail, la cohésion d'équipe et les interactions sociales positives au sein des collectifs.",
      path: "/blog",
    },
  },
  solution: {
    fr: {
      title: "La méthode Uvibes — Pour qui, comment ça marche | Uvibes",
      description:
        "Découvrez la méthode Uvibes et comment elle s'adapte à votre contexte : étudiants, entreprises, aidants, sportifs… Étapes, thématiques et fonctionnalités détaillées.",
      path: "/solution",
    },
    en: {
      title: "The Uvibes Method — How It Works | Uvibes",
      description:
        "From icebreaker to insight: see exactly how Uvibes turns short, guided conversations into real engagement, data and recognition for any organization.",
      path: "/en/method",
    },
    es: {
      title: "El método Uvibes — Cómo funciona | Uvibes",
      description:
        "De la primera pregunta al impacto real: descubre cómo Uvibes transforma conversaciones breves y guiadas en compromiso, datos y reconocimiento para cualquier organización.",
      path: "/es/method",
    },
    de: {
      title: "Die Uvibes-Methode — So funktioniert's | Uvibes",
      description:
        "Vom Eisbrecher zur Erkenntnis: Erfahre, wie Uvibes kurze, geführte Gespräche in echtes Engagement, Daten und Anerkennung für jede Organisation verwandelt.",
      path: "/de/method",
    },
    it: {
      title: "Il metodo Uvibes — Come funziona | Uvibes",
      description:
        "Dal primo scambio all'impatto reale: scopri come Uvibes trasforma brevi conversazioni guidate in coinvolgimento, dati e riconoscimento per qualsiasi organizzazione.",
      path: "/it/method",
    },
    pt: {
      title: "O método Uvibes — Como funciona | Uvibes",
      description:
        "Da primeira pergunta ao impacto real: descubra como a Uvibes transforma conversas breves e guiadas em compromisso, dados e reconhecimento para qualquer organização.",
      path: "/pt/method",
    },
    ru: {
      title: "Метод Uvibes — Как это работает | Uvibes",
      description:
        "От первого вопроса до реального эффекта: узнайте, как Uvibes превращает короткие, направленные беседы в вовлечённость, данные и признание для любой организации.",
      path: "/ru/method",
    },
    zh: {
      title: "Uvibes 方法 — 运作原理 | Uvibes",
      description:
        "从破冰话题到真实影响：了解 Uvibes 如何将简短的引导式对话转化为参与度、数据和对任何组织的认可。",
      path: "/zh/method",
    },
    ja: {
      title: "Uvibesメソッド — 仕組みについて | Uvibes",
      description:
        "アイスブレイクから本当の効果まで：Uvibesが短く導かれた会話を、組織のエンゲージメント・データ・評価へと変える仕組みをご紹介します。",
      path: "/ja/method",
    },
    hi: {
      title: "Uvibes तरीका — यह कैसे काम करता है | Uvibes",
      description:
        "पहले सवाल से असली असर तक: जानें कि Uvibes छोटी, निर्देशित बातचीत को किसी भी संगठन के लिए सहभागिता, डेटा और पहचान में कैसे बदलता है।",
      path: "/hi/method",
    },
    ar: {
      title: "طريقة Uvibes — كيف تعمل | Uvibes",
      description:
        "من سؤال بسيط إلى تأثير حقيقي: اكتشف كيف يحوّل Uvibes المحادثات القصيرة الموجَّهة إلى تفاعل وبيانات وتقدير لأي منظمة.",
      path: "/ar/method",
    },
  },
  tarifs: {
    fr: {
      title: "Tarifs & offres Uvibes — Connection, Premium, Boost | Uvibes",
      description:
        "Comparez les offres Uvibes (Connection, Premium, Boost) et Vibes Découverte (30 jours pour tester, sans engagement). Choisissez le plan adapté à votre collectif et demandez votre devis.",
      path: "/tarifs",
    },
    en: {
      title: "Pricing & Plans — Connection, Premium, Boost | Uvibes",
      description:
        "Compare Uvibes plans (Connection, Premium, Boost) and the 30-day trial. Find the right fit for your community and request your quote in minutes.",
      path: "/en/pricing",
    },
    es: {
      title: "Precios y planes — Connection, Premium, Boost | Uvibes",
      description:
        "Compara los planes Uvibes (Connection, Premium, Boost) y la prueba de 30 días. Encuentra el plan ideal para tu colectivo y solicita tu presupuesto en minutos.",
      path: "/es/pricing",
    },
    de: {
      title: "Preise & Pakete — Connection, Premium, Boost | Uvibes",
      description:
        "Vergleiche die Uvibes-Pakete (Connection, Premium, Boost) und das 30-tägige Testangebot. Finde die passende Lösung für dein Kollektiv und fordere dein Angebot in Minuten an.",
      path: "/de/pricing",
    },
    it: {
      title: "Prezzi e piani — Connection, Premium, Boost | Uvibes",
      description:
        "Confronta i piani Uvibes (Connection, Premium, Boost) e la prova di 30 giorni. Trova la soluzione giusta per la tua comunità e richiedi il tuo preventivo in pochi minuti.",
      path: "/it/pricing",
    },
    pt: {
      title: "Preços e planos — Connection, Premium, Boost | Uvibes",
      description:
        "Compare os planos Uvibes (Connection, Premium, Boost) e a oferta de teste de 30 dias. Encontre o plano certo para o seu coletivo e peça o seu orçamento em minutos.",
      path: "/pt/pricing",
    },
    ru: {
      title: "Цены и тарифы — Connection, Premium, Boost | Uvibes",
      description:
        "Сравните тарифы Uvibes (Connection, Premium, Boost) и 30-дневный пробный период. Найдите подходящий вариант для своего коллектива и запросите расчёт за несколько минут.",
      path: "/ru/pricing",
    },
    zh: {
      title: "价格与套餐 — Connection、Premium、Boost | Uvibes",
      description:
        "比较 Uvibes 套餐（Connection、Premium、Boost）及 30 天试用方案。为你的集体找到合适的方案，几分钟内即可获取报价。",
      path: "/zh/pricing",
    },
    ja: {
      title: "料金とプラン — Connection、Premium、Boost | Uvibes",
      description:
        "Uvibesのプラン（Connection、Premium、Boost）と30日間の体験オファーを比較。あなたのコミュニティに合うプランを見つけ、数分で見積もりを依頼できます。",
      path: "/ja/pricing",
    },
    hi: {
      title: "मूल्य और योजनाएं — Connection, Premium, Boost | Uvibes",
      description:
        "Uvibes की योजनाओं (Connection, Premium, Boost) और 30-दिन के ट्रायल ऑफर की तुलना करें। अपने समुदाय के लिए सही योजना खोजें और मिनटों में अपना कोटेशन प्राप्त करें।",
      path: "/hi/pricing",
    },
    ar: {
      title: "الأسعار والباقات — Connection و Premium و Boost | Uvibes",
      description:
        "قارن باقات Uvibes (Connection و Premium و Boost) والعرض التجريبي لمدة 30 يومًا. اعثر على الباقة المناسبة لمجتمعك واطلب عرض السعر في دقائق.",
      path: "/ar/pricing",
    },
  },
  "mentions-legales": {
    fr: {
      title: "Mentions légales | Uvibes",
      description: "Mentions légales du site Uvibes : éditeur, hébergeur et informations légales.",
      path: "/mentions-legales",
    },
  },
  "conditions-d-utilisation": {
    fr: {
      title: "Conditions générales d'utilisation | Uvibes",
      description: "Conditions générales d'utilisation du site et des services Uvibes.",
      path: "/conditions-d-utilisation",
    },
  },
  "politique-de-confidentialite": {
    fr: {
      title: "Politique de confidentialité | Uvibes",
      description: "Politique de confidentialité et protection des données personnelles sur Uvibes.",
      path: "/politique-de-confidentialite",
    },
  },
  "politique-cookies": {
    fr: {
      title: "Politique de cookies | Uvibes",
      description: "Politique de gestion des cookies utilisés sur le site Uvibes.",
      path: "/politique-cookies",
    },
  },
};

/**
 * Construit les métadonnées d'une page. `locale` détermine quelle langue de
 * l'entrée est utilisée comme contenu principal ; les hreflang couvrent
 * automatiquement toutes les langues que possède l'entrée (fr + celles publiées).
 */
// hreflang d'une page : une entrée par langue publiée + x-default → version FR.
// x-default indique à Google quelle version servir aux internautes dont la langue
// n'est couverte par aucune autre balise (bonne pratique i18n ; sinon Google choisit seul).
export function hreflangFor(page: keyof typeof PAGE_SEO): Record<string, string> {
  const entry = PAGE_SEO[page];
  const languages: Record<string, string> = {};
  for (const [loc, val] of Object.entries(entry)) {
    if (val && BCP47[loc]) languages[BCP47[loc]] = `${SITE_URL}${val.path}`;
  }
  languages["x-default"] = `${SITE_URL}${entry.fr.path}`;
  return languages;
}

export function buildMetadata(page: keyof typeof PAGE_SEO, locale: string = "fr"): Metadata {
  const entry = PAGE_SEO[page];
  const data = (locale !== "fr" && entry[locale]) || entry.fr;
  const url = `${SITE_URL}${data.path}`;

  const languages = hreflangFor(page);

  return {
    title: { absolute: data.title },
    description: data.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? "fr_FR",
      type: "website",
      images: [
        {
          url: OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${data.title}`,
        },
      ],
    },
  };
}
