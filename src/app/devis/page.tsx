import type { Metadata } from "next";
import DevisFormStepper from "@/components/devis/DevisFormStepper";

export const metadata: Metadata = {
  title: "Obtenir un devis — Uvibes",
  description: "Remplissez notre formulaire pour recevoir votre devis personnalisé Uvibes.",
  robots: { index: false },
};

export default function DevisPage() {
  return <DevisFormStepper />;
}
