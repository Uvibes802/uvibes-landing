import { Font } from "@react-pdf/renderer";

// Désactive la césure automatique (partagé par les générateurs PDF devis + facture).
Font.registerHyphenationCallback((w) => [w]);

// Palette de marque partagée par les documents PDF (devis, facture).
export const C = {
  ink: "#2A0E1E",        // texte principal (plum foncé)
  orange: "#FD6E00",
  rose: "#D90A5C",
  muted: "#8A6B78",      // texte secondaire
  line: "#ECD9E2",       // filets
  cardBg: "#FBF3F6",     // fond carte clair
  cardBgWarm: "#FFF6EC",
  dark: "#D90A5C",       // bloc prix (rose vif de marque)
  yellow: "#FFE456",     // mise en avant (total)
};

// Format monétaire FR partagé.
export const euro = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;
