"use client";

import AvantagesContent from "@/components/avantages/avantagesContent";
import AvantagesContentDesktop from "@/components/avantages/avantagesContentDesktop";
import { HeroBanner } from "@/components/banner/heroBanner";
import { PartnerBanner } from "@/components/banner/partnerBanner";
import Footer from "@/components/footer/Footer";
import FloatingMenu from "@/components/menu/Menu";
import { AppointmentSection } from "@/components/section/appointmentSection";
import Resize from "@/services/resize/resize";
import { getVideoUrl } from "@/utils/videoUrl";
import { Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PopupButton } from "react-calendly";
import "../../styles/features/PricingTable.css";
const mockupAvantages = "/images/MockupAvantage.png";

export default function Avantages() {
  const { isMobile, mounted } = Resize();
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    setRootElement(document.getElementById("root") || document.body);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <HeroBanner
        subtitle=""
        title={"Des\u00A0conversations\ndevenues\nstratégiques"}
        description="Transformez vos missions en actions concrètes et en données exploitables"
        image={mockupAvantages}
        alt="Fonctionnalités de l'application"
      />
      <nav>
        <FloatingMenu />
      </nav>
      <main id="top">
        {isMobile ? <AvantagesContent /> : <AvantagesContentDesktop />}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "70dvh" : "90vh",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"}
            src={getVideoUrl(
              isMobile
                ? "/videos/avantage-mobile.mp4"
                : "/videos/avantage-desktop.mp4",
            )}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {!isPlaying && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "var(--gradientColor)",
                borderRadius: "50%",
                width: "90px",
                height: "90px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 8px 32px rgba(253, 110, 0, 0.4)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(4px)",
              }}
              className="video-play-button"
            >
              <Play
                fill="white"
                color="white"
                size={45}
                style={{ marginLeft: "6px" }}
              />
            </div>
          )}
        </div>
        <div
          className="cta-buttons"
          style={{
            padding: "var(--section-padding-v) var(--section-padding-h)",
          }}
        >
          {rootElement && (
            <PopupButton
              url="https://calendly.com/uvibescommunication/30min"
              rootElement={rootElement}
              text="Prendre RDV"
              className="btn-cta secondary"
            />
          )}
          <Link href="/#contact" className="btn-cta primary">
            NOUS CONTACTER
          </Link>
        </div>
        <PartnerBanner />
        <AppointmentSection />
        <Footer />
      </main>
    </>
  );
}
