"use client";

import Resize from "@/services/resize/resize";
import { getVideoUrl } from "@/utils/videoUrl";
import { useEffect, useRef, useState, ReactNode } from "react";

export default function VideoCard({
  videoSrcDdesktop,
  videoSrcMobile,
  title,
  paddingTop,
}: {
  videoSrcDdesktop: string;
  videoSrcMobile: string;
  title?: ReactNode;
  paddingTop?: string;
}) {
  const { isMobile } = Resize();
  const videoRef = useRef<HTMLVideoElement>(null);
  // Contrôle si la vidéo a été chargée — reste false tant qu'elle n'est pas visible
  const [isVisible, setIsVisible] = useState(false);

  const currentVideoSrc = isMobile ? videoSrcMobile : videoSrcDdesktop;

  // Intersection Observer : déclenche le chargement quand la vidéo entre dans le viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Plus besoin d'observer une fois chargée
        }
      },
      { rootMargin: "200px" } // Commence à charger 200px avant que la vidéo soit visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        padding: "var(--section-padding-v) var(--section-padding-h)",
        paddingTop: paddingTop ?? "var(--section-padding-v)",
        width: "100%",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <h2
        className="title-h2-orange"
        style={{ textAlign: "center", paddingBottom: "var(--section-padding-h)" }}
      >
        {title}
      </h2>
      <video
        ref={videoRef}
        src={isVisible ? getVideoUrl(currentVideoSrc) : undefined}
        muted
        autoPlay
        loop
        playsInline
        style={{
          width: "100%",
          maxWidth: isMobile ? "400px" : "1200px",
          justifySelf: "center",
          marginBottom: "var(--section-padding-h)",
          borderRadius: 8,
          boxShadow: `0px 0px 0 ${isMobile ? "4px" : "5px"} rgba(0, 175, 221, 0.55)`,
        }}
      />
    </div>
  );
}
