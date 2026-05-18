"use client";

import { sanitizeText } from "@/services/blog/sanitize";
import { HeroBanner } from "./heroBanner";

interface HeroContentProps {
  title: string;
  description: string;
  image: string;
}

export default function HeroContent({ title, description, image }: HeroContentProps) {
  return (
    <HeroBanner
      subtitle=""
      title={sanitizeText(title)}
      description={sanitizeText(description)}
      image={image}
      alt="visuel application"
      className="home-hero"
    />
  );
}
