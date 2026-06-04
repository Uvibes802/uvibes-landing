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
  const [rotation] = useState(() => (Math.random() * 6 - 3).toFixed(1));
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
        transform: `rotate(${rotation}deg)`,
        transition: "box-shadow 0.2s ease",
      }}
      onMouseDown={onMouseDown}
    >
      <div style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        width: 200,
        boxShadow: "0 8px 32px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1)",
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
        {/* Label overlay */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "0.6rem 0.85rem",
          background: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
          color: "#fff",
          fontSize: 12,
          letterSpacing: "0.06em",
          fontFamily: "var(--font-roboto-mono, monospace)",
        }}>
          {label || "Vidéo"}
        </div>
      </div>
    </div>
  );
}
