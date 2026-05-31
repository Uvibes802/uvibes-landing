import VibrationLine from "@/components/shared/VibrationLine";
import "@/styles/solution/proofBar.css";

const items = [
  {
    stat: "93 %",
    label: "des salariés non engagés en France",
    source: "Gallup, 2025",
  },
  {
    stat: "41 %",
    label: "des étudiants présentent des symptômes dépressifs",
    source: "Université Bordeaux, 2024",
  },
  {
    stat: "−38 %",
    label: "de risque de démence avec une vie sociale active",
    source: "Rush University, 2025",
  },
];

export default function SolutionProofBar() {
  return (
    <section className="proof-bar">
      <div className="proof-bar__bg" aria-hidden="true">
        <VibrationLine
          width={1800}
          height={300}
          amplitude={48}
          freq={5}
          stroke="var(--orange)"
          strokeWidth={1.2}
          speed={26}
        />
      </div>

      <div className="proof-bar__grid">
        {items.map((item, i) => (
          <div key={i} className="proof-bar__item">
            <span className="proof-bar__stat v-prompt">{item.stat}</span>
            <p className="proof-bar__label">{item.label}</p>
            <span className="proof-bar__source v-mono">{item.source}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
