"use client";

import { useEffect, useRef } from "react";

const BG_LIGHT = "#fff5f0";
const BG_DARK = "#0d0d0d";
const COLORS_LIGHT = ["#FD6E00", "#e05500", "#D90A5C", "#ff8822", "#c4004f", "#ff5500", "#aa0044"];
const COLORS_DARK = ["#cc44ff", "#aa22ee", "#dd66ff", "#9900cc", "#bb55ee", "#e088ff", "#7711bb"];

interface Wave {
  yBase: number;
  amp: number;
  freq: number;
  phase: number;
  speed: number;
  lineWidth: number;
}

export default function HeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const waves: Wave[] = Array.from({ length: 14 }, (_, i) => ({
      yBase: 60 + i * 26,
      amp: 18 + Math.random() * 28,
      freq: 0.0045 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      speed: (Math.random() < 0.5 ? 1 : -1) * (0.5 + Math.random() * 0.5),
      lineWidth: 1.2 + Math.random() * 1.2,
    }));

    let t = 0;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    const draw = () => {
      const dark = isDark();
      const colors = dark ? COLORS_DARK : COLORS_LIGHT;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = dark ? BG_DARK : BG_LIGHT;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      t += 0.012;

      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];
        ctx.globalAlpha = 0.55 + 0.35 * Math.sin(t * 0.3 + i);
        ctx.beginPath();
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = w.lineWidth;

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            w.yBase +
            Math.sin(x * w.freq + t * w.speed * 60 + w.phase) * w.amp +
            Math.sin(x * w.freq * 1.7 + t * w.speed * 40 + w.phase * 1.3) * (w.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}
