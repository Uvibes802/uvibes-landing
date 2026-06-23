// Traduction créative de PricingData.ts — mêmes prix et mêmes valeurs booléennes.
export const featuresIt = [
  { name: "Esperienze interattive (1.000 vibe)", type: "boolean" },
  { name: "Sondaggi flash", type: "boolean" },
  { name: "Barometro del benessere", type: "boolean" },
  { name: "Statistiche e dashboard di monitoraggio", type: "boolean" },
  { name: "Logo della tua azienda", type: "boolean" },
  { name: "Kit di comunicazione", type: "boolean" },
  { name: "Diffusione di notizie interne", type: "boolean" },
  { name: "Networking (biglietti da visita digitali)", type: "boolean" },
  { name: "Brainstorming (sondaggi post-vibe)", type: "boolean" },
  { name: "Employer branding (ospiti esterni)", type: "boolean" },
  { name: "Soft skills (percorso di allenamento) o mediateca", type: "boolean" },
];

export const plansIt = [
  {
    name: "VIBES CONNECTION",
    color: "var(--mainColor)",
    price: "3.980 €",
    description: "Stimola le interazioni e resta aggiornato sull'umore della tua comunità",
    values: [true, true, true, true, false, false, false, false, false, false, false],
  },
  {
    name: "VIBES BOOST",
    color: "var(--pinkUvibes)",
    price: "5.980 €",
    description: "Dai slancio alla dinamica della tua comunità con strumenti innovativi",
    values: [true, true, true, true, true, true, true, true, true, true, true],
  },
  {
    name: "VIBES PREMIUM",
    color: "var(--yellowUvibes)",
    price: "4.980 €",
    description: "Rafforza la visibilità del tuo marchio e la tua comunicazione interna",
    values: [true, true, true, true, true, true, true, false, false, false, false],
  },
];
