// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresEn = [
  { name: "Interactive experiences (1,000 vibes)", type: "boolean" },
  { name: "Surveys", type: "boolean" },
  { name: "Wellbeing barometer", type: "boolean" },
  { name: "Stats & tracking dashboard", type: "boolean" },
  { name: "Your company logo", type: "boolean" },
  { name: "Communication kit", type: "boolean" },
  { name: "Internal news", type: "boolean" },
  { name: "Networking (digital business cards)", type: "boolean" },
  { name: "Brainstorming (post-vibe surveys)", type: "boolean" },
  { name: "Employer branding (outside guests)", type: "boolean" },
  { name: "Soft skills (training path) or media library", type: "boolean" },
];

export const plansEn = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "€3,980",
    description: "Spark interactions and keep a pulse on your community's mood",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "€5,980",
    description: "Boost your community's momentum with innovative tools",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "€4,980",
    description: "Strengthen your brand's visibility and your internal communication",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
