import { getVideoUrl } from "@/utils/videoUrl";
import Resize from "@/services/resize/resize";
import { ReactNode } from "react";

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

  const currentVideoSrc = isMobile ? videoSrcMobile : videoSrcDdesktop;

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
        src={getVideoUrl(currentVideoSrc)}
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
          boxShadow: `0px 0px 0 ${isMobile ? "8px" : "18px"} #00AFDD`,
        }}
      ></video>
    </div>
  );
}
