import { prisma } from "@/lib/prisma";

export interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
  siteUrl?: string;
}

// Partenaires servis par la DB admin (table Partner) — plus de WordPress.
export async function fetchPartners(): Promise<PartnerLogo[]> {
  try {
    const partners = await prisma.partner.findMany({
      where: { actif: true },
      orderBy: { ordre: "asc" },
    });

    return partners.map((p, i) => ({
      id: i,
      src: p.logoUrl,
      alt: p.nom,
      siteUrl: p.siteUrl ?? undefined,
    }));
  } catch {
    return [];
  }
}
