import type { StaticImageData } from "next/image";

export type HeroBannerProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string | StaticImageData;
  alt: string;
  className?: string;
};
