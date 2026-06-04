"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "@/styles/page/uvibes.css";

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
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, cursor: "grab", userSelect: "none" }}
      onMouseDown={onMouseDown}
    >
      <div className="uv-scatter-vid uv-scatter-vid--draggable">
        <video
          ref={videoRef}
          src={src}
          autoPlay muted loop playsInline
          onClick={togglePlay}
          className="uv-scatter-vid__el"
          title="Cliquer pour pause / reprendre"
        />
        <div className="uv-scatter-vid__label">{label || "Vidéo"}</div>

        {/* Coordonnées en direct */}
        <div className="uv-drag-coords">
          x: {Math.round(pos.x)} · y: {Math.round(pos.y)}
        </div>
      </div>
    </div>
  );
}
