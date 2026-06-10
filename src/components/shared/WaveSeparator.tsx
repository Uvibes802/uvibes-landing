import "@/styles/shared/waveSeparator.css";

// Séparateur de section en vagues animées : 2 couches remplies depuis le haut
// jusqu'à une ligne de base étagée (la couche arrière fait fond plein → aucun trou),
// avec un vrai espace entre les deux vagues. `position` = "top" ou "bottom".
export default function WaveSeparator({
  position = "top",
  color,
  backColor,
}: {
  position?: "top" | "bottom";
  color?: string;      // couleur de la couche avant = couleur de la section révélée (pour harmoniser)
  backColor?: string;  // couche arrière (profondeur)
}) {
  const style = {
    ...(color ? { ["--wave-front" as string]: color } : {}),
    ...(backColor ? { ["--wave-back" as string]: backColor } : {}),
  } as React.CSSProperties;

  return (
    <div className={`wave-sep wave-sep--${position}`} aria-hidden="true" style={style}>
      {/* Couche 2 (arrière, ligne de base basse) — fond plein, vagues amples */}
      <svg className="wave-sep-layer wave-sep-layer--2" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 H1440 V87 C1290,57 1160,117 980,87 C820,57 690,117 520,87 C360,57 190,117 0,87 Z" />
      </svg>
      {/* Couche 1 (avant, ligne de base haute) — ondulations irrégulières, amples */}
      <svg className="wave-sep-layer wave-sep-layer--1" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 H1440 V32 C1330,62 1230,2 1060,32 C920,60 840,4 700,32 C560,62 440,2 300,32 C190,60 90,4 0,32 Z" />
      </svg>
    </div>
  );
}
