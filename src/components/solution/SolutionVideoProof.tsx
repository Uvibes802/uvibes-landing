"use client";

import "@/styles/solution/solutionVideoProof.css";

const VIDEOS = [
  {
    src: "https://d2a0jgcp77eoku.cloudfront.net/videos/%C3%A9tudiante.mp4",
    label: "Étudiante",
    context: "Université",
    quote: "En 3 minutes, j'ai rencontré quelqu'un que je n'aurais jamais croisé autrement.",
    color: "#FD6E00",
  },
  {
    src: "https://d2a0jgcp77eoku.cloudfront.net/videos/entreprise.mp4",
    label: "Salariée",
    context: "Entreprise",
    quote: "Uvibes m'a permis de mieux connaître mes collègues en quelques semaines.",
    color: "#D90A5C",
  },
  {
    src: "https://d2a0jgcp77eoku.cloudfront.net/videos/retrait%C3%A9e.mp4",
    label: "Retraitée",
    context: "Association",
    quote: "Ces conversations m'ont redonné le goût des échanges authentiques.",
    color: "#00AFDD",
  },
];

export default function SolutionVideoProof() {
  return (
    <section className="svp-section">
      <div className="svp-inner">
        <header className="svp-header">
          <p className="v-mono svp-eyebrow">
            <span className="svp-dot" aria-hidden="true" />
            Ils témoignent
          </p>
          <h2 className="svp-title v-prompt">
            Ça change{" "}
            <span className="v-serif svp-title-accent">quelque chose.</span>
          </h2>
        </header>

        <div className="svp-grid">
          {VIDEOS.map((v) => (
            <div key={v.src} className="svp-card" style={{ "--svp-color": v.color } as React.CSSProperties}>
              <div className="svp-video-wrap">
                <video
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="svp-video"
                />
                <div className="svp-video-overlay" aria-hidden="true" />
                <div className="svp-tag">
                  <span className="svp-tag-dot" aria-hidden="true" />
                  {v.context}
                </div>
              </div>
              <div className="svp-body">
                <p className="v-serif svp-quote">&ldquo;{v.quote}&rdquo;</p>
                <span className="v-mono svp-name">— {v.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
