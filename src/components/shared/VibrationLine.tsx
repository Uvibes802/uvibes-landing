interface VibrationLineProps {
  stroke?: string;
  strokeWidth?: number;
  amplitude?: number;
  freq?: number;
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

// Server Component — calculs purs, animations SMIL déclaratives (pas de JS runtime)
export default function VibrationLine({
  stroke = "currentColor",
  strokeWidth = 1.5,
  amplitude = 14,
  freq = 6,
  width = 600,
  height = 60,
  className,
  animated = true,
  speed = 16,
  style,
}: VibrationLineProps) {
  const steps = 80;

  const makePath = (phase: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const y = height / 2 + Math.sin((i / steps) * Math.PI * freq + phase) * amplitude;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return pts.join(" ");
  };

  const d0 = makePath(0);
  const d1 = makePath(Math.PI);
  const d2 = makePath(Math.PI * 2);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible", ...style }}
      aria-hidden="true"
    >
      <path
        d={d0}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        {animated && (
          <animate
            attributeName="d"
            dur={`${speed}s`}
            repeatCount="indefinite"
            values={`${d0}; ${d1}; ${d2}`}
          />
        )}
      </path>
    </svg>
  );
}
