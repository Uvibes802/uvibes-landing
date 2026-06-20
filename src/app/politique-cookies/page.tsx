import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CookiesPolicy from "@/components/legal/cookies";

export const metadata: Metadata = buildMetadata("politique-cookies");

export default function PolitiqueCookiesPage() {
  return <CookiesPolicy />;
}
