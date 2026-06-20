import type { Metadata } from "next";
import Link from "next/link";
import DevisFormStepper from "@/components/devis/DevisFormStepper";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Obtenir un devis — Uvibes",
  description: "Remplissez notre formulaire pour recevoir votre devis personnalisé Uvibes.",
  robots: { index: false },
};

export default async function DevisPage() {
  const setting = await prisma.cmsContent.findUnique({ where: { cle: "devis-disabled" } });
  const devisDisabled = setting?.valeur === "true";

  if (devisDisabled) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--orange)" }}>Demandes de devis temporairement suspendues</h1>
        <p style={{ color: "#6b4455", maxWidth: 480 }}>
          Nous n&apos;acceptons pas de nouvelles demandes de devis en ligne pour le moment.
          Contactez-nous directement, nous reviendrons vers vous rapidement.
        </p>
        <Link href="/rendez-vous" className="btn-brand">Prendre rendez-vous →</Link>
      </div>
    );
  }

  return <DevisFormStepper />;
}
