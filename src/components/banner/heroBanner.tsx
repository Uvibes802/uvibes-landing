import Image from "next/image";
import Link from "next/link";
import AppMockup from "@/components/shared/AppMockup";
import "../../styles/banner/heroBanner.css";
import type { HeroBannerProps } from "../../types/banner/heroBanner";

const Logo_uVibesDesktop = "/images/Logo UVIBES.png";
const Logo_uVibes = "/images/Logo VI blanc.png";

export function HeroBanner({
  title,
  subtitle,
  description,
  image,
  alt,
  className,
  showCta = false,
  useAppMockup = false,
}: HeroBannerProps) {
  return (
    <header className={`hero-banner-wrapper ${className || ""}`}>
      {/* Blobs déco (fond crème pour features-hero) */}
      {useAppMockup && (
        <div className="hero-banner-blobs" aria-hidden="true">
          <div className="hero-banner-blob hero-banner-blob--a" />
          <div className="hero-banner-blob hero-banner-blob--b" />
          <div className="hero-banner-blob hero-banner-blob--c" />
        </div>
      )}

      <div className="hero-banner-container">
        <div className="hero-banner-header-top">
          <Link href="/" passHref>
            <Image
              src={Logo_uVibes}
              alt="Logo uVibes"
              width={80}
              height={80}
              className="logo_mobile"
              style={{ height: "auto" }}
            />
            <Image
              src={Logo_uVibesDesktop}
              alt="Logo uVibes desktop"
              width={400}
              height={100}
              className="logo_desktop"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <div className="hero-banner-body">
          <section className="hero-banner-content">
            <h2 className="title-text">{subtitle}</h2>
            <h1 className="title-h1">{title}</h1>
            <p className="title-text-light">{description}</p>
            {showCta && (
              <div className="hero-cta">
                <Link href="/avantages" className="hero-cta-primary">
                  Découvrir l&apos;application
                </Link>
                <Link href="/#contact" className="hero-cta-secondary">
                  Nous contacter
                </Link>
              </div>
            )}
          </section>

          {useAppMockup ? (
            <div className="hero-banner-image-container desktop-only">
              <AppMockup />
            </div>
          ) : (
            <>
              <figure className="hero-banner-image-container desktop-only">
                <Image
                  src={image}
                  alt={alt}
                  className="hero-banner-image-desktop"
                  width={1000}
                  height={1000}
                  priority
                />
              </figure>
              <figure className="hero-banner-image-container hero-mobile-only">
                <Image
                  src={image}
                  alt={alt}
                  className="hero-banner-image"
                  width={400}
                  height={300}
                  priority
                />
              </figure>
            </>
          )}
        </div>
      </div>

      {!useAppMockup && (
        <figure>
          <Image
            src="/images/Vibration-right.svg"
            alt={alt}
            className="hero-vibration-right"
            width={1000}
            height={1100}
            priority
          />
        </figure>
      )}
    </header>
  );
}
