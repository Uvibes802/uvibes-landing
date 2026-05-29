// Server Component — ligne de vibration avec stroke dégradé (linearGradient SVG)
interface Props {
  width?: number;
  height?: number;
  amplitude?: number;
  freq?: number;
  strokeWidth?: number;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  id: string; // unique pour éviter les conflits entre plusieurs instances
  style?: React.CSSProperties;
}

function makePath(width: number, height: number, amplitude: number, freq: number, phase: number) {
  const steps = 80;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = height / 2 + Math.sin((i / steps) * Math.PI * freq + phase) * amplitude;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export default function GradientVibrationLine({
  width = 1800,
  height = 55,
  amplitude = 30,
  freq = 4,
  strokeWidth = 14,
  speed = 10,
  colorFrom = "#FD6E00",
  colorTo = "#D90A5C",
  id,
  style,
}: Props) {
  const d0 = makePath(width, height, amplitude, freq, 0);
  const d1 = makePath(width, height, amplitude, freq, Math.PI);
  const d2 = makePath(width, height, amplitude, freq, Math.PI * 2);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible", ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
      </defs>
      <path
        d={d0}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur={`${speed}s`}
          repeatCount="indefinite"
          values={`${d0}; ${d1}; ${d2}`}
        />
      </path>
    </svg>
  );
}
