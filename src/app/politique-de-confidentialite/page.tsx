import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Confidentialite from "@/components/legal/confidentialite";

export const metadata: Metadata = buildMetadata("politique-de-confidentialite");

export default function PolitiqueConfidentialite() {
  return <Confidentialite />;
}
