// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresPt = [
  { name: "Experiências interativas (1 000 vibes)", type: "boolean" },
  { name: "Inquéritos flash", type: "boolean" },
  { name: "Barómetro do bem-estar", type: "boolean" },
  { name: "Estatísticas e painel de acompanhamento", type: "boolean" },
  { name: "Logótipo da sua empresa", type: "boolean" },
  { name: "Kit de comunicação", type: "boolean" },
  { name: "Difusão de notícias internas", type: "boolean" },
  { name: "Networking (cartões de visita digitais)", type: "boolean" },
  { name: "Brainstorming (inquéritos pós-vibe)", type: "boolean" },
  { name: "Employer branding (convidados externos)", type: "boolean" },
  { name: "Soft skills (percurso de treino) ou mediateca", type: "boolean" },
];

export const plansPt = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "3 980 €",
    description: "Estimule as interações e mantenha-se a par do estado de espírito do seu coletivo",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "5 980 €",
    description: "Impulsione a dinâmica do seu coletivo com ferramentas inovadoras",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "4 980 €",
    description: "Reforce a visibilidade da sua marca e a sua comunicação interna",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
