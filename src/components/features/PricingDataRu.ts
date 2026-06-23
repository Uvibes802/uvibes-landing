// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresRu = [
  { name: "Интерактивные опыты (1000 vibes)", type: "boolean" },
  { name: "Блиц-опросы", type: "boolean" },
  { name: "Барометр благополучия", type: "boolean" },
  { name: "Статистика и панель отслеживания", type: "boolean" },
  { name: "Логотип вашей компании", type: "boolean" },
  { name: "Коммуникационный набор", type: "boolean" },
  { name: "Распространение внутренних новостей", type: "boolean" },
  { name: "Networking (цифровые визитные карточки)", type: "boolean" },
  { name: "Брейнсторминг (опросы после vibe)", type: "boolean" },
  { name: "Employer branding (внешние гости)", type: "boolean" },
  { name: "Soft skills (путь тренировки) или медиатека", type: "boolean" },
];

export const plansRu = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "3 980 €",
    description: "Стимулируйте взаимодействие и будьте в курсе настроения вашего коллектива",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "5 980 €",
    description: "Придайте динамику вашему коллективу с помощью инновационных инструментов",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "4 980 €",
    description: "Усилите видимость вашего бренда и внутреннюю коммуникацию",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
