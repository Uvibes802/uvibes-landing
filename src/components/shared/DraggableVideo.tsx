"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  src: string;
  label?: string;
  initialX?: number;
  initialY?: number;
}

export default function DraggableVideo({ src, label, initialX = 60, initialY = 140 }: Props) {
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
      }}
      onMouseDown={onMouseDown}
    >
      <div style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        width: 300,
        boxShadow: "0 12px 40px rgba(0,0,0,.22), 0 4px 12px rgba(0,0,0,.12)",
        border: "2px solid rgba(255,255,255,.85)",
      }}>
        <video
          ref={videoRef}
          src={src}
          autoPlay muted loop playsInline
          onClick={togglePlay}
          style={{ display: "block", width: "100%", cursor: "pointer" }}
          title="Cliquer pour pause / reprendre"
        />

        {/* Label overlay bas */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "0.65rem 1rem",
          background: "linear-gradient(to top, rgba(0,0,0,.65), transparent)",
          color: "#fff",
          fontSize: 12,
          letterSpacing: "0.06em",
          fontFamily: "monospace",
        }}>
          {label || "Vidéo"}
        </div>

        {/* Indicateur de coordonnées */}
        <div style={{
          position: "absolute",
          top: 8, left: 8,
          background: "rgba(0,0,0,.72)",
          backdropFilter: "blur(6px)",
          borderRadius: 8,
          padding: "4px 10px",
          color: "#FFE456",
          fontSize: 11,
          fontFamily: "monospace",
          letterSpacing: "0.04em",
          pointerEvents: "none",
          lineHeight: 1.5,
        }}>
          x: {Math.round(pos.x)}<br />
          y: {Math.round(pos.y)}
        </div>
      </div>
    </div>
  );
}
