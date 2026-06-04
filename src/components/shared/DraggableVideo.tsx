"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  src: string;
  label?: string;
  initialX?: number;
  initialY?: number;
}

export default function DraggableVideo({ src, label, initialX = 40, initialY = 120 }: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const togglePlay = () => {
    if (dragging.current) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); } else { v.pause(); }
  };

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        cursor: "grab",
        userSelect: "none",
        filter: "drop-shadow(0 8px 28px rgba(0,0,0,.22))",
      }}
      onMouseDown={onMouseDown}
    >
      <div style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "2px solid rgba(255,255,255,.8)",
        background: "#1a0a06",
        width: 200,
        position: "relative",
      }}>
        {/* Drag handle bar */}
        <div style={{
          height: 28,
          background: "rgba(0,0,0,.55)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          cursor: "grab",
        }}>
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: 12, letterSpacing: "0.12em", fontFamily: "monospace" }}>
            ⠿ {label || "Vidéo"}
          </span>
        </div>
        <video
          ref={videoRef}
          src={src}
          autoPlay muted loop playsInline
          onClick={togglePlay}
          style={{ display: "block", width: "100%", cursor: "pointer" }}
          title="Cliquer pour pause / reprendre"
        />
      </div>
    </div>
  );
}
