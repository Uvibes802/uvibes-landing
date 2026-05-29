import "../../styles/cards/orgaCard.css";
import type { OrgaCardProps } from "../../types/cards/orgaCards";

const ACCENT_PAIRS = [
  ["#FD6E00", "#FF8530"],
  ["#D90A5C", "#FF4D7A"],
  ["#00AFDD", "#0095C0"],
  ["#78c751", "#5aaa36"],
  ["#FD6E00", "#D90A5C"],
  ["#FF9558", "#FD6E00"],
];

export default function OrgaCard({ title, description, content1, content2, icone, cardIndex = 0 }: OrgaCardProps) {
  const [c1, c2] = ACCENT_PAIRS[cardIndex % ACCENT_PAIRS.length];
  const numLabel = String(cardIndex + 1).padStart(2, "0");

  return (
    <div className="orga-card" style={{ "--oc-c1": c1, "--oc-c2": c2 } as React.CSSProperties}>
      {/* Numéro watermark */}
      <span className="orga-card-num v-prompt" aria-hidden="true">{numLabel}</span>

      {/* Header icône + titre */}
      <div className="orga-card-header">
        <div className="orga-card-icon">{icone}</div>
        <h4 className="orga-card-title">{title}</h4>
      </div>

      {/* Description */}
      {description && (
        <p className="orga-card-desc">{description}</p>
      )}

      {/* Questions — bulles */}
      <div className="orga-card-qs">
        <div className="orga-card-q">
          <span className="orga-card-q-label v-mono">Q1</span>
          <p className="orga-card-q-text">{content1}</p>
        </div>
        <div className="orga-card-q">
          <span className="orga-card-q-label v-mono">Q2</span>
          <p className="orga-card-q-text">{content2}</p>
        </div>
      </div>
    </div>
  );
}
