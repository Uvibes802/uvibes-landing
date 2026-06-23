// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresAr = [
  { name: "تجارب تفاعلية (1000 vibe)", type: "boolean" },
  { name: "استبيانات سريعة", type: "boolean" },
  { name: "مقياس الرفاه", type: "boolean" },
  { name: "إحصاءات ولوحة تتبع", type: "boolean" },
  { name: "شعار شركتك", type: "boolean" },
  { name: "حقيبة تواصل", type: "boolean" },
  { name: "نشر الأخبار الداخلية", type: "boolean" },
  { name: "التواصل المهني (بطاقات زيارة رقمية)", type: "boolean" },
  { name: "العصف الذهني (استبيانات بعد الـ vibe)", type: "boolean" },
  { name: "العلامة التجارية لصاحب العمل (ضيوف خارجيون)", type: "boolean" },
  { name: "المهارات اللينة (مسار تدريب) أو مكتبة الوسائط", type: "boolean" },
];

export const plansAr = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "3,980 €",
    description: "حفّز التفاعلات وكن على دراية بحالة مجموعتك",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "5,980 €",
    description: "عزّز ديناميكية مجموعتك بأدوات مبتكرة",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "4,980 €",
    description: "عزّز ظهور علامتك التجارية وتواصلك الداخلي",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
