import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Mention from "@/components/legal/mention";

export const metadata: Metadata = buildMetadata("mentions-legales");

export default function MentionLegal() {
  return <Mention />;
}
