import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ConditionsUtilisation from "@/components/legal/conditionsUtilisation";

export const metadata: Metadata = buildMetadata("conditions-d-utilisation");

export default function ConditionsUtilisationPage() {
  return <ConditionsUtilisation />;
}
