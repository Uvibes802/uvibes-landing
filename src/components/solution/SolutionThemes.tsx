"use client";

import { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Lightbulb,
  Globe,
  Gamepad2,
  Flame,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GradientVibrationLine from "@/components/shared/GradientVibrationLine";
import "@/styles/solution/solutionThemes.css";

interface Theme {
  Icon: LucideIcon;
  title: string;
  desc: string;
  q1: string;
  q2: string;
  label: string;
  color: string;
}

const THEMES_FR: Theme[] = [
  {
    Icon: Sparkles,
    title: "Réflexions & loisirs",
    desc: "Discutez de vos passions, inspirations et moments de vie.",
    q1: "Quel personnage de film t'inspire ?",
    q2: "Quel hobby aimerais-tu commencer ?",
    label: "Conversation ouverte",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Expertise & formation",
    desc: "Partager des idées, apprendre et réfléchir ensemble.",
    q1: "Comment vois-tu le management du futur ?",
    q2: "Quelle compétence deviendra essentielle ?",
    label: "Discussion & réflexion",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Astuces & bons plans",
    desc: "S'inspirer de conseils pratiques et d'idées utiles au quotidien.",
    q1: "Des recettes de saison à partager ?",
    q2: "Une habitude qui te fait gagner du temps ?",
    label: "Partage d'expériences",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Événements & actualités",
    desc: "Échanger autour des tendances, cultures et événements.",
    q1: "La tradition préférée de votre territoire ?",
    q2: "Un événement qui t'a marqué récemment ?",
    label: "Échanges spontanés",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Jeux & mises en situation",
    desc: "Créer des interactions fun et dynamiques.",
    q1: "Trouvez 6 métiers commençant par M",
    q2: "Quelle équipe survivrait sur une île déserte ?",
    label: "Moments ludiques",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Débats",
    desc: "Confronter les points de vue avec intelligence.",
    q1: "Bienfaits et limites du progrès",
    q2: "Le télétravail est-il l'avenir ?",
    label: "Opinions & perspectives",
    color: "#FFB800",
  },
];

const THEMES_EN: Theme[] = [
  {
    Icon: Sparkles,
    title: "Musings & hobbies",
    desc: "Conversations about passions, inspirations and life moments.",
    q1: "Which movie character inspires you?",
    q2: "What hobby would you like to start?",
    label: "Open conversation",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Expertise & learning",
    desc: "Sharing ideas, learning and thinking together.",
    q1: "What will management look like in the future?",
    q2: "Which skill will become essential?",
    label: "Discussion & reflection",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Tips & tricks",
    desc: "Practical advice and useful everyday ideas.",
    q1: "Any seasonal recipes to share?",
    q2: "A habit that saves you time?",
    label: "Sharing experiences",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Events & current affairs",
    desc: "Talking about trends, cultures and events.",
    q1: "Your region's favorite tradition?",
    q2: "An event that struck you recently?",
    label: "Spontaneous exchanges",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Games & role play",
    desc: "Creating fun, dynamic interactions.",
    q1: "Name 6 jobs starting with the letter M",
    q2: "Which team would survive on a desert island?",
    label: "Playful moments",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Debates",
    desc: "Confronting viewpoints, intelligently.",
    q1: "The benefits and limits of progress",
    q2: "Is remote work the future?",
    label: "Opinions & perspectives",
    color: "#FFB800",
  },
];

const THEMES_ES: Theme[] = [
  {
    Icon: Sparkles,
    title: "Reflexiones y aficiones",
    desc: "Conversaciones sobre pasiones, inspiraciones y momentos de vida.",
    q1: "¿Qué personaje de película te inspira?",
    q2: "¿Qué afición te gustaría empezar?",
    label: "Conversación abierta",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Conocimiento y formación",
    desc: "Compartir ideas, aprender y reflexionar juntos.",
    q1: "¿Cómo imaginas la gestión de equipos del futuro?",
    q2: "¿Qué competencia se volverá esencial?",
    label: "Discusión y reflexión",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Trucos y buenos consejos",
    desc: "Consejos prácticos e ideas útiles para el día a día.",
    q1: "¿Alguna receta de temporada para compartir?",
    q2: "¿Un hábito que te ahorre tiempo?",
    label: "Compartir experiencias",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Eventos y actualidad",
    desc: "Hablar de tendencias, culturas y eventos.",
    q1: "¿La tradición favorita de tu región?",
    q2: "¿Un evento que te haya marcado recientemente?",
    label: "Intercambios espontáneos",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Juegos y simulaciones",
    desc: "Crear interacciones divertidas y dinámicas.",
    q1: "Encuentra 6 profesiones que empiecen por M",
    q2: "¿Qué equipo sobreviviría en una isla desierta?",
    label: "Momentos lúdicos",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Debates",
    desc: "Confrontar puntos de vista con inteligencia.",
    q1: "Beneficios y límites del progreso",
    q2: "¿El teletrabajo es el futuro?",
    label: "Opiniones y perspectivas",
    color: "#FFB800",
  },
];

const THEMES_DE: Theme[] = [
  {
    Icon: Sparkles,
    title: "Gedanken & Freizeit",
    desc: "Gespräche über Leidenschaften, Inspirationen und Lebensmomente.",
    q1: "Welche Filmfigur inspiriert dich?",
    q2: "Welches Hobby würdest du gerne anfangen?",
    label: "Offenes Gespräch",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Fachwissen & Weiterbildung",
    desc: "Ideen teilen, lernen und gemeinsam nachdenken.",
    q1: "Wie siehst du das Management der Zukunft?",
    q2: "Welche Kompetenz wird unverzichtbar?",
    label: "Diskussion & Reflexion",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Tipps & gute Ideen",
    desc: "Praktische Ratschläge und nützliche Alltagsideen.",
    q1: "Saisonale Rezepte zum Teilen?",
    q2: "Eine Gewohnheit, die dir Zeit spart?",
    label: "Erfahrungsaustausch",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Veranstaltungen & Aktuelles",
    desc: "Austausch über Trends, Kulturen und Ereignisse.",
    q1: "Die liebste Tradition deiner Region?",
    q2: "Ein Ereignis, das dich kürzlich beeindruckt hat?",
    label: "Spontaner Austausch",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Spiele & Rollenspiele",
    desc: "Spaßige und dynamische Interaktionen schaffen.",
    q1: "Finde 6 Berufe, die mit M beginnen",
    q2: "Welches Team würde auf einer einsamen Insel überleben?",
    label: "Spielerische Momente",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Debatten",
    desc: "Standpunkte intelligent gegenüberstellen.",
    q1: "Vorteile und Grenzen des Fortschritts",
    q2: "Ist Homeoffice die Zukunft?",
    label: "Meinungen & Perspektiven",
    color: "#FFB800",
  },
];

const THEMES_IT: Theme[] = [
  {
    Icon: Sparkles,
    title: "Riflessioni e hobby",
    desc: "Conversazioni su passioni, ispirazioni e momenti di vita.",
    q1: "Quale personaggio di un film ti ispira?",
    q2: "Quale hobby vorresti iniziare?",
    label: "Conversazione aperta",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Competenza e formazione",
    desc: "Condividere idee, imparare e riflettere insieme.",
    q1: "Come vedi il management del futuro?",
    q2: "Quale competenza diventerà essenziale?",
    label: "Discussione e riflessione",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Trucchi e consigli utili",
    desc: "Consigli pratici e idee utili per la vita quotidiana.",
    q1: "Ricette di stagione da condividere?",
    q2: "Un'abitudine che ti fa risparmiare tempo?",
    label: "Condivisione di esperienze",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Eventi e attualità",
    desc: "Parlare di tendenze, culture ed eventi.",
    q1: "La tradizione preferita del tuo territorio?",
    q2: "Un evento che ti ha colpito di recente?",
    label: "Scambi spontanei",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Giochi e simulazioni",
    desc: "Creare interazioni divertenti e dinamiche.",
    q1: "Trova 6 mestieri che iniziano con la M",
    q2: "Quale squadra sopravvivrebbe su un'isola deserta?",
    label: "Momenti ludici",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Dibattiti",
    desc: "Confrontare i punti di vista con intelligenza.",
    q1: "Benefici e limiti del progresso",
    q2: "Il telelavoro è il futuro?",
    label: "Opinioni e prospettive",
    color: "#FFB800",
  },
];

const THEMES_PT: Theme[] = [
  {
    Icon: Sparkles,
    title: "Reflexões e lazer",
    desc: "Conversas sobre paixões, inspirações e momentos de vida.",
    q1: "Que personagem de filme te inspira?",
    q2: "Que hobby gostarias de começar?",
    label: "Conversa aberta",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Conhecimento e formação",
    desc: "Partilhar ideias, aprender e refletir juntos.",
    q1: "Como vês a gestão do futuro?",
    q2: "Que competência se tornará essencial?",
    label: "Discussão e reflexão",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Truques e boas dicas",
    desc: "Conselhos práticos e ideias úteis do dia a dia.",
    q1: "Receitas de época para partilhar?",
    q2: "Um hábito que te poupa tempo?",
    label: "Partilha de experiências",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "Eventos e atualidade",
    desc: "Trocar ideias sobre tendências, culturas e eventos.",
    q1: "A tradição preferida do seu território?",
    q2: "Um evento que te marcou recentemente?",
    label: "Trocas espontâneas",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Jogos e simulações",
    desc: "Criar interações divertidas e dinâmicas.",
    q1: "Encontre 6 profissões que comecem por M",
    q2: "Que equipa sobreviveria numa ilha deserta?",
    label: "Momentos lúdicos",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Debates",
    desc: "Confrontar pontos de vista com inteligência.",
    q1: "Benefícios e limites do progresso",
    q2: "O teletrabalho é o futuro?",
    label: "Opiniões e perspetivas",
    color: "#FFB800",
  },
];

const THEMES_RU: Theme[] = [
  {
    Icon: Sparkles,
    title: "Размышления и хобби",
    desc: "Беседы о увлечениях, источниках вдохновения и жизненных моментах.",
    q1: "Какой персонаж фильма вас вдохновляет?",
    q2: "Какое хобби вы хотели бы начать?",
    label: "Открытый разговор",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "Экспертиза и обучение",
    desc: "Делиться идеями, учиться и размышлять вместе.",
    q1: "Каким вы видите менеджмент будущего?",
    q2: "Какой навык станет необходимым?",
    label: "Обсуждение и размышление",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "Советы и полезные идеи",
    desc: "Практические советы и полезные идеи на каждый день.",
    q1: "Есть сезонные рецепты для обмена?",
    q2: "Привычка, которая экономит время?",
    label: "Обмен опытом",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "События и новости",
    desc: "Обмен мнениями о тенденциях, культурах и событиях.",
    q1: "Любимая традиция вашего региона?",
    q2: "Событие, которое вас впечатлило недавно?",
    label: "Спонтанное общение",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "Игры и ролевые ситуации",
    desc: "Создавать весёлое и динамичное взаимодействие.",
    q1: "Назовите 6 профессий на букву М",
    q2: "Какая команда выжила бы на необитаемом острове?",
    label: "Игровые моменты",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "Дебаты",
    desc: "Сравнивать точки зрения с умом.",
    q1: "Преимущества и ограничения прогресса",
    q2: "Удалённая работа — это будущее?",
    label: "Мнения и взгляды",
    color: "#FFB800",
  },
];

const THEMES_ZH: Theme[] = [
  {
    Icon: Sparkles,
    title: "思考与爱好",
    desc: "围绕热情、灵感和生活时刻展开的对话。",
    q1: "哪个电影角色给你启发？",
    q2: "你想开始什么爱好？",
    label: "开放式对话",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "专业知识与培训",
    desc: "分享想法，共同学习和思考。",
    q1: "你如何看待未来的管理方式？",
    q2: "哪项技能将变得至关重要？",
    label: "讨论与思考",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "小贴士与实用建议",
    desc: "日常生活中的实用建议和好点子。",
    q1: "有季节性食谱可以分享吗？",
    q2: "一个能为你节省时间的习惯？",
    label: "经验分享",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "活动与时事",
    desc: "围绕趋势、文化和事件展开交流。",
    q1: "你所在地区最喜欢的传统？",
    q2: "最近让你印象深刻的一件事？",
    label: "即兴交流",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "游戏与情景互动",
    desc: "创造有趣而充满活力的互动。",
    q1: "找出6个以M开头的职业",
    q2: "哪个团队能在荒岛上生存下来？",
    label: "趣味时刻",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "辩论",
    desc: "理性地碰撞不同观点。",
    q1: "进步的益处与局限",
    q2: "远程办公是未来吗？",
    label: "观点与视角",
    color: "#FFB800",
  },
];

const THEMES_JA: Theme[] = [
  {
    Icon: Sparkles,
    title: "思考とホビー",
    desc: "情熱、インスピレーション、人生の瞬間についての会話。",
    q1: "あなたを刺激する映画のキャラクターは？",
    q2: "始めてみたいホビーは？",
    label: "オープンな会話",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "専門知識と学び",
    desc: "アイデアを共有し、一緒に学び、考える。",
    q1: "未来のマネジメントをどう見ていますか？",
    q2: "どのスキルが必須になるでしょうか？",
    label: "議論と考察",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "ヒントとお得な情報",
    desc: "日常で役立つ実用的なアドバイスやアイデア。",
    q1: "シェアしたい季節のレシピは？",
    q2: "時間を節約できる習慣は？",
    label: "経験のシェア",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "イベントと最新情報",
    desc: "トレンド、文化、イベントについて語り合う。",
    q1: "あなたの地域で好きな伝統は？",
    q2: "最近印象に残った出来事は？",
    label: "自由な交流",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "ゲームとシチュエーション",
    desc: "楽しくダイナミックなやりとりを生み出す。",
    q1: "Mで始まる職業を6つ見つけてください",
    q2: "無人島で生き残れるチームは？",
    label: "楽しいひととき",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "ディベート",
    desc: "知性をもって視点をぶつけ合う。",
    q1: "進歩の利点と限界",
    q2: "テレワークは未来の働き方か？",
    label: "意見と視点",
    color: "#FFB800",
  },
];

const THEMES_HI: Theme[] = [
  {
    Icon: Sparkles,
    title: "विचार और शौक",
    desc: "जुनून, प्रेरणाओं और जीवन के पलों के बारे में बातचीत।",
    q1: "कौन-सा फ़िल्मी किरदार आपको प्रेरित करता है?",
    q2: "आप कौन-सा शौक शुरू करना चाहेंगे?",
    label: "खुली बातचीत",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "विशेषज्ञता और प्रशिक्षण",
    desc: "विचार साझा करना, सीखना और साथ में सोचना।",
    q1: "आप भविष्य के प्रबंधन को कैसे देखते हैं?",
    q2: "कौन-सा कौशल अनिवार्य बन जाएगा?",
    label: "चर्चा और विचार",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "टिप्स और उपयोगी सुझाव",
    desc: "रोज़मर्रा के लिए व्यावहारिक सलाह और उपयोगी विचार।",
    q1: "साझा करने के लिए कोई मौसमी रेसिपी?",
    q2: "कोई आदत जो आपका समय बचाती है?",
    label: "अनुभव साझा करना",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "आयोजन और ताज़ा ख़बरें",
    desc: "रुझानों, संस्कृतियों और आयोजनों पर बातचीत।",
    q1: "आपके क्षेत्र की पसंदीदा परंपरा?",
    q2: "हाल ही में कोई याद रहने वाला आयोजन?",
    label: "स्वाभाविक संवाद",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "खेल और भूमिका-निर्वाह",
    desc: "मज़ेदार और गतिशील बातचीत बनाना।",
    q1: "M से शुरू होने वाले 6 पेशे खोजें",
    q2: "कौन-सी टीम एक वीरान द्वीप पर बच पाएगी?",
    label: "मज़ेदार पल",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "वाद-विवाद",
    desc: "विचारों को समझदारी से आमने-सामने रखना।",
    q1: "प्रगति के फ़ायदे और सीमाएं",
    q2: "क्या रिमोट वर्क भविष्य है?",
    label: "विचार और दृष्टिकोण",
    color: "#FFB800",
  },
];

const THEMES_AR: Theme[] = [
  {
    Icon: Sparkles,
    title: "تأملات وهوايات",
    desc: "نقاشات حول الشغف والإلهام ولحظات الحياة.",
    q1: "أي شخصية سينمائية تلهمك؟",
    q2: "أي هواية ترغب في بدئها؟",
    label: "حوار مفتوح",
    color: "#FFB800",
  },
  {
    Icon: GraduationCap,
    title: "الخبرة والتكوين",
    desc: "تبادل الأفكار، والتعلم، والتفكير معًا.",
    q1: "كيف ترى إدارة المستقبل؟",
    q2: "أي مهارة ستصبح أساسية؟",
    label: "نقاش وتفكير",
    color: "#FD6E00",
  },
  {
    Icon: Lightbulb,
    title: "نصائح وحلول مفيدة",
    desc: "نصائح عملية وأفكار مفيدة في الحياة اليومية.",
    q1: "هل لديك وصفات موسمية لمشاركتها؟",
    q2: "عادة توفّر عليك الوقت؟",
    label: "تبادل الخبرات",
    color: "#E6007E",
  },
  {
    Icon: Globe,
    title: "فعاليات وأخبار",
    desc: "تبادل الآراء حول الاتجاهات والثقافات والفعاليات.",
    q1: "التقليد المفضل في منطقتك؟",
    q2: "فعالية أثّرت فيك مؤخرًا؟",
    label: "تبادلات عفوية",
    color: "#D90A5C",
  },
  {
    Icon: Gamepad2,
    title: "ألعاب ومواقف تمثيلية",
    desc: "خلق تفاعلات ممتعة وحيوية.",
    q1: "اذكر 6 مهن تبدأ بحرف الميم",
    q2: "أي فريق سينجو في جزيرة مهجورة؟",
    label: "لحظات مرحة",
    color: "#FD6E00",
  },
  {
    Icon: Flame,
    title: "نقاشات",
    desc: "مواجهة الآراء بذكاء.",
    q1: "فوائد وحدود التقدم",
    q2: "هل العمل عن بُعد هو المستقبل؟",
    label: "آراء ووجهات نظر",
    color: "#FFB800",
  },
];

const STH_TXT: Record<string, { eyebrow: string; heading: React.ReactNode }> = {
  en: {
    eyebrow: "Topics",
    heading: <><span className="sth-heading-main">A whole universe<br /></span><span className="sth-heading-sub v-serif">of conversations.</span></>,
  },
  es: {
    eyebrow: "Temáticas",
    heading: <><span className="sth-heading-main">Un universo infinito<br /></span><span className="sth-heading-sub v-serif">de conversaciones.</span></>,
  },
  de: {
    eyebrow: "Themen",
    heading: <><span className="sth-heading-main">Ein ganzes Universum<br /></span><span className="sth-heading-sub v-serif">voller Gespräche.</span></>,
  },
  it: {
    eyebrow: "Temi",
    heading: <><span className="sth-heading-main">Un intero universo<br /></span><span className="sth-heading-sub v-serif">di conversazioni.</span></>,
  },
  pt: {
    eyebrow: "Temas",
    heading: <><span className="sth-heading-main">Um universo inteiro<br /></span><span className="sth-heading-sub v-serif">de conversas.</span></>,
  },
  ru: {
    eyebrow: "Темы",
    heading: <><span className="sth-heading-main">Целая вселенная<br /></span><span className="sth-heading-sub v-serif">бесед.</span></>,
  },
  zh: {
    eyebrow: "主题",
    heading: <><span className="sth-heading-main">一整个对话<br /></span><span className="sth-heading-sub v-serif">的宇宙。</span></>,
  },
  ja: {
    eyebrow: "テーマ",
    heading: <><span className="sth-heading-main">対話の<br /></span><span className="sth-heading-sub v-serif">ひとつの宇宙。</span></>,
  },
  hi: {
    eyebrow: "विषय",
    heading: <><span className="sth-heading-main">बातचीत का<br /></span><span className="sth-heading-sub v-serif">एक संपूर्ण ब्रह्मांड।</span></>,
  },
  ar: {
    eyebrow: "المواضيع",
    heading: <><span className="sth-heading-main">عالم كامل<br /></span><span className="sth-heading-sub v-serif">من الحوارات.</span></>,
  },
};

// Légère rotation + décalage par carte pour l'effet "paquet" empilé
const ROT = [-2.4, 1.6, -1.4, 2, -1.8, 1.2];
const OFFX = [-7, 6, -5, 7, -6, 5];

const THEMES_BY_LOCALE: Record<string, Theme[]> = {
  en: THEMES_EN, es: THEMES_ES, de: THEMES_DE, it: THEMES_IT, pt: THEMES_PT,
  ru: THEMES_RU, zh: THEMES_ZH, ja: THEMES_JA, hi: THEMES_HI, ar: THEMES_AR,
};

export default function SolutionThemes({ locale = "fr" }: { locale?: string }) {
  const THEMES = THEMES_BY_LOCALE[locale] ?? THEMES_FR;
  const sth = STH_TXT[locale];
  // Une seule carte ouverte à la fois — null = tas fermé, tous les titres visibles
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive((prev) => (prev === i ? null : i));

  return (
    <section id="themes" className="sth-section">
      {/* Fond — ondes de vibration épaisses (motif uvibes), derrière les cartes */}
      <div className="sth-waves" aria-hidden="true">
        <GradientVibrationLine id="sth-w1" width={1800} height={70} amplitude={32} freq={5} strokeWidth={24} speed={9} colorFrom="#FD6E00" colorTo="#E6007E" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w2" width={1800} height={70} amplitude={26} freq={7} strokeWidth={16} speed={13} colorFrom="#00AFDD" colorTo="#D90A5C" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w3" width={1800} height={70} amplitude={36} freq={4} strokeWidth={20} speed={11} colorFrom="#E6007E" colorTo="#FD6E00" style={{ width: "100%" }} />
        <GradientVibrationLine id="sth-w4" width={1800} height={70} amplitude={24} freq={6} strokeWidth={14} speed={15} colorFrom="#D90A5C" colorTo="#00AFDD" style={{ width: "100%" }} />
      </div>

      <div className="sth-header">
        <div className="sth-eyebrow-wrap">
          <span className="sth-eyebrow-dot" aria-hidden="true" />
          <span className="sth-eyebrow-text">{sth ? sth.eyebrow : "Thématiques"}</span>
        </div>
        <h2 className="sth-heading">
          {sth ? sth.heading : (
            <>
              <span className="sth-heading-main">Une infinité d&apos;univers<br /></span>
              <span className="sth-heading-sub v-serif">de conversations.</span>
            </>
          )}
        </h2>
      </div>

      <div className="sth-deck">
        {THEMES.map((theme, i) => {
          const { Icon } = theme;
          const open = active === i;
          return (
            <div
              key={theme.title}
              className={`sth-card${open ? " sth-card--open" : ""}`}
              style={{
                "--accent": theme.color,
                "--rot": `${ROT[i]}deg`,
                "--tx": `${OFFX[i]}px`,
                zIndex: open ? 50 : i + 1,
              } as React.CSSProperties}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              aria-expanded={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <div className="sth-card-header">
                <span className="sth-card-icon" aria-hidden="true">
                  <Icon size={23} strokeWidth={1.9} />
                </span>
                <h3 className="sth-card-title">{theme.title}</h3>
                <span className="sth-card-plus" aria-hidden="true" />
              </div>

              <div className="sth-card-reveal">
                <div className="sth-card-reveal-inner">
                  <p className="sth-card-desc">{theme.desc}</p>
                  <ul className="sth-card-questions">
                    <li><span className="sth-card-qdot" aria-hidden="true" />{theme.q1}</li>
                    <li><span className="sth-card-qdot" aria-hidden="true" />{theme.q2}</li>
                  </ul>
                  <span className="sth-card-label">{theme.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
