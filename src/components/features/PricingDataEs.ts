// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresEs = [
  { name: "Experiencias interactivas (1 000 vibes)", type: "boolean" },
  { name: "Encuestas flash", type: "boolean" },
  { name: "Barómetro de bienestar", type: "boolean" },
  { name: "Estadísticas y panel de seguimiento", type: "boolean" },
  { name: "Logo de tu empresa", type: "boolean" },
  { name: "Kit de comunicación", type: "boolean" },
  { name: "Difusión de noticias internas", type: "boolean" },
  { name: "Networking (tarjetas de visita digitales)", type: "boolean" },
  { name: "Brainstorming (encuestas post-vibe)", type: "boolean" },
  { name: "Employer branding (invitados externos)", type: "boolean" },
  { name: "Soft skills (recorrido de entrenamiento) o mediateca", type: "boolean" },
];

export const plansEs = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "3 980 €",
    description: "Impulsa las interacciones y mantente al tanto del estado de ánimo de tu colectivo",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "5 980 €",
    description: "Impulsa la dinámica de tu colectivo con herramientas innovadoras",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "4 980 €",
    description: "Refuerza la visibilidad de tu marca y tu comunicación interna",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
