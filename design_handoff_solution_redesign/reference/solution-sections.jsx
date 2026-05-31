// solution-sections.jsx — Scroll-based narrative sections for /solution
// Pourquoi → Comment → Combien. Uses the Uvibes vibration vocabulary.
// Components exported to window for solution.jsx to compose.

const { useState, useEffect, useRef } = React;

// ── Icon set (lucide-style line icons) ──────────────────────────────────
const ICONS = {
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M16.2 7.8l-2.1 6.4-6.4 2.1 2.1-6.4z',
  clock: null, // custom below
  eye: null,
  book: null,
  sparkles: null,
  cap: null,
  bulb: null,
  calendar: null,
  gamepad: null,
  message: null,
};
function Icon({ name, size = 24, stroke = "currentColor", sw = 1.9 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "compass": return (<svg {...common}><circle cx="12" cy="12" r="9.5" /><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9" /></svg>);
    case "clock": return (<svg {...common}><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3.5 2" /></svg>);
    case "eye": return (<svg {...common}><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></svg>);
    case "book": return (<svg {...common}><path d="M12 6c-1.6-1.1-4.2-2-8-2v14c3.8 0 6.4.9 8 2 1.6-1.1 4.2-2 8-2V4c-3.8 0-6.4.9-8 2z" /><path d="M12 6v14" /></svg>);
    case "sparkles": return (<svg {...common}><path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7z" /><path d="M18.5 15l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" /></svg>);
    case "cap": return (<svg {...common}><path d="M22 9.2 12 5 2 9.2l10 4.2 10-4.2z" /><path d="M6 11.1v4.7c0 1.1 2.7 2.7 6 2.7s6-1.6 6-2.7v-4.7" /></svg>);
    case "bulb": return (<svg {...common}><path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.8 10.6c.8.7 1.3 1.5 1.3 2.4h5c0-.9.5-1.7 1.3-2.4A6 6 0 0 0 12 3z" /></svg>);
    case "calendar": return (<svg {...common}><rect x="3" y="4.5" width="18" height="16.5" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></svg>);
    case "gamepad": return (<svg {...common}><path d="M7 11h3.5M8.75 9.25v3.5M15 11h.01M18 12.5h.01" /><rect x="2.5" y="6" width="19" height="12" rx="5" /></svg>);
    case "message": return (<svg {...common}><path d="M21 14.5a2 2 0 0 1-2 2H8l-4 4v-15a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /></svg>);
    case "check": return (<svg {...common} strokeWidth="2.6"><path d="M4 12l5 5L20 6" /></svg>);
    case "x": return (<svg {...common}><path d="M6 6l12 12M18 6L6 18" /></svg>);
    case "arrow": return (<svg {...common}><path d="M5 12h14M13 5l7 7-7 7" /></svg>);
    default: return null;
  }
}

// ── Shared section header ───────────────────────────────────────────────
function SectionHead({ eyebrow, dot = "var(--orange)", children, sub, align = "left", maxSub = 600 }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 820 : "none", margin: align === "center" ? "0 auto" : 0 }}>
      <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span style={{ width: 8, height: 8, borderRadius: 8, background: dot, boxShadow: `0 0 0 4px ${dot === "var(--orange)" ? "rgba(253,110,0,.16)" : "rgba(217,10,92,.16)"}` }} />
        {eyebrow}
      </span>
      <h2 className="prompt-display" style={{ margin: "18px 0 0", fontSize: "clamp(38px, 4.8vw, 72px)", lineHeight: .95 }}>
        {children}
      </h2>
      {sub &&
        <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: maxSub, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
          {sub}
        </p>
      }
    </div>
  );
}

const SerifAccent = ({ children }) => (
  <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em", background: "linear-gradient(90deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>{children}</span>
);

// ════════════════════════════════════════════════════════════════════════
// 2 · PROOF BAR
// ════════════════════════════════════════════════════════════════════════
const PROOF = [
  { value: "93 %", label: "des salariés non engagés en France", source: "Gallup, 2025" },
  { value: "41 %", label: "des étudiants présentent des symptômes dépressifs", source: "Université Bordeaux, 2024" },
  { value: "−38 %", label: "de risque de démence avec une vie sociale active", source: "Rush University, 2025" },
];
function SolutionProofBar({ anim }) {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #3a0a22 0%, var(--ink) 55%, #5a1038 100%)",
      color: "#fff", padding: "clamp(48px, 6vw, 84px) 56px",
    }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: .18, pointerEvents: "none" }}>
        <VibrationLine width={1800} height={300} amplitude={48} freq={5} stroke="var(--orange)" strokeWidth={1.2} animated={anim !== "off"} speed={26} />
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }} data-grid="3col">
        {PROOF.map((p, i) =>
          <Reveal key={i} animLevel={anim} delay={i * 110}>
            <div style={{
              padding: "8px clamp(20px, 3vw, 48px)",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,.14)" : "none",
              height: "100%",
            }}>
              <div className="prompt-display" style={{
                fontSize: "clamp(46px, 6vw, 82px)", lineHeight: 1,
                background: "linear-gradient(120deg, var(--orange), #ff5e8e)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{p.value}</div>
              <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.45, color: "rgba(255,255,255,.78)", maxWidth: 320 }}>{p.label}</p>
              <div className="roboto-mono" style={{ marginTop: 16, fontSize: 11, letterSpacing: 1.4, color: "rgba(255,255,255,.42)", textTransform: "uppercase" }}>{p.source}</div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 3 · POUR QUI  (ForWho)
// ════════════════════════════════════════════════════════════════════════
const FORWHO = [
  {
    badge: "Entreprises", accent: "var(--orange)", glow: "rgba(253,110,0,.14)",
    intro: "Stimule le bien-être individuel pour renforcer la performance collective.",
    stat: { value: "93 %", desc: "des salariés non engagés ou activement désengagés", source: "Gallup, 2025" },
    benefits: [
      { t: "Performance", d: "Stimuler la réflexion et susciter l'adhésion collective." },
      { t: "Lien d'appartenance", d: "Renforcer le lien affectif entre l'entreprise et ses équipes." },
      { t: "RSE", d: "Satisfaire le besoin relationnel et alléger la gestion émotionnelle." },
    ],
  },
  {
    badge: "Enseignement", accent: "var(--rose)", glow: "rgba(217,10,92,.14)",
    intro: "Améliore la sociabilité des apprenants et renforce le lien de la communauté.",
    stat: { value: "41 %", desc: "des étudiants présentent des symptômes dépressifs", source: "Université Bordeaux, 2024" },
    benefits: [
      { t: "Santé mentale", d: "Échanges bienveillants, élimination du cyberharcèlement." },
      { t: "Soft skills", d: "Premier espace d'entraînement aux compétences interpersonnelles." },
      { t: "Appartenance", d: "Renforcer le lien alumni, initier des mentorats enrichissants." },
    ],
  },
  {
    badge: "Collectifs", accent: "var(--blueUvibes)", glow: "rgba(0,175,221,.14)",
    intro: "Une nouvelle respiration pour les organisations du prendre soin.",
    stat: { value: "−38 %", desc: "de risque de démence grâce à une vie sociale active", source: "Rush University, 2025" },
    benefits: [
      { t: "Lien social", d: "Rompre l'isolement et stimuler les capacités cognitives." },
      { t: "Épanouissement", d: "Renforcer la confiance en soi et en son entourage." },
      { t: "Transmission", d: "Créer des communautés d'entraide entre pairs." },
    ],
  },
];
function ForWhoCard({ c, anim }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--paper)", borderRadius: 22,
        borderTop: `4px solid ${c.accent}`,
        boxShadow: hover ? `0 30px 60px -26px ${c.glow.replace(",.14", ",.5")}, 0 0 0 1px rgba(106,19,64,.06)` : "0 14px 34px -22px rgba(106,19,64,.22), 0 0 0 1px rgba(106,19,64,.06)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 460ms cubic-bezier(.2,.7,.2,1), box-shadow 460ms",
        padding: "30px 28px 32px", display: "flex", flexDirection: "column", height: "100%",
      }}>
      <div aria-hidden style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(closest-side, ${c.glow}, transparent 70%)`, pointerEvents: "none", opacity: hover ? 1 : .6, transition: "opacity 460ms" }} />
      <span className="roboto-mono" style={{ position: "relative", alignSelf: "flex-start", fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: c.accent, padding: "6px 12px", borderRadius: 999, border: `1px solid ${c.accent}`, background: c.glow }}>
        {c.badge}
      </span>
      <p style={{ position: "relative", margin: "20px 0 0", fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)" }}>{c.intro}</p>

      <div style={{ position: "relative", marginTop: 24, paddingTop: 22, borderTop: "1px dashed rgba(106,19,64,.16)" }}>
        <div className="prompt-display" style={{ fontSize: "clamp(50px, 5.4vw, 78px)", lineHeight: .9, color: c.accent }}>{c.stat.value}</div>
        <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.4, color: "var(--ink-3)" }}>{c.stat.desc}</p>
        <div className="roboto-mono" style={{ marginTop: 6, fontSize: 10.5, letterSpacing: 1.2, color: "var(--ink-4)", textTransform: "uppercase" }}>{c.stat.source}</div>
      </div>

      <ul style={{ position: "relative", margin: "26px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
        {c.benefits.map((b, i) =>
          <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ flexShrink: 0, marginTop: 2, width: 22, height: 22, borderRadius: 999, background: c.glow, color: c.accent, display: "grid", placeItems: "center" }}>
              <Icon name="check" size={13} stroke={c.accent} />
            </span>
            <span>
              <span className="prompt" style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", color: "var(--ink)" }}>{b.t}</span>
              <span style={{ display: "block", marginTop: 3, fontSize: 13.5, lineHeight: 1.45, color: "var(--ink-3)" }}>{b.d}</span>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
function SolutionForWho({ anim }) {
  return (
    <section id="pour-qui" data-screen-label="Pour qui" style={{ padding: "clamp(70px, 8vw, 110px) 56px", background: "var(--cream)", scrollMarginTop: 70 }}>
      <Reveal animLevel={anim}>
        <div style={{ marginBottom: 48 }}>
          <SectionHead eyebrow="Pour qui ?" align="center"
            sub="Des résultats concrets, mesurés — quel que soit votre collectif.">
            Uvibes s'adapte<br />à votre <SerifAccent>contexte.</SerifAccent>
          </SectionHead>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }} data-grid="3col">
        {FORWHO.map((c, i) =>
          <Reveal key={i} animLevel={anim} delay={i * 100}>
            <ForWhoCard c={c} anim={anim} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 4 · COMMENT ÇA MARCHE  (HowItWorks — vertical timeline)
// ════════════════════════════════════════════════════════════════════════
const STEPS = [
  { n: "01", icon: "compass", title: "Les thématiques de votre collectif", body: "Choisissez parmi 6 familles de sujets. Chaque thématique est associée à des questions guidées.", tag: "200+ sujets en bibliothèque" },
  { n: "02", icon: "clock", title: "Le moment et la durée des échanges", body: "Matin (7h–9h), pause déjeuner (12h–14h) ou après-midi (15h–17h). Chaque échange dure entre 6 et 20 minutes.", tag: "Pic d'engagement : après-midi" },
  { n: "03", icon: "eye", title: "Les sujets sur lesquels obtenir la vision de votre collectif", body: "Satisfaction et bien-être, perception des initiatives, idées d'amélioration, attentes non exprimées.", tag: "Tableaux de bord temps réel" },
  { n: "04", icon: "book", title: "Les ressources explorées par votre collectif", body: "Bibliothèque de 200+ sujets, tableaux de bord, guides & bonnes pratiques — tout inclus.", tag: "Inclus dans tous les plans" },
];
function StepRow({ s, i, anim }) {
  const last = i === STEPS.length - 1;
  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "72px 1fr", gap: "clamp(18px, 3vw, 40px)", paddingBottom: last ? 0 : 44 }}>
      {/* rail */}
      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        {!last &&
          <div aria-hidden style={{ position: "absolute", top: 64, bottom: -44, width: 2, background: "linear-gradient(to bottom, var(--orange), var(--rose))", opacity: .5 }} />
        }
        <div style={{
          position: "relative", zIndex: 1, width: 64, height: 64, borderRadius: 999, flexShrink: 0,
          background: "linear-gradient(135deg, var(--orange), var(--rose))", color: "#fff",
          display: "grid", placeItems: "center",
          boxShadow: "0 16px 34px -16px rgba(217,10,92,.5)",
        }}>
          <Icon name={s.icon} size={26} stroke="#fff" sw={1.8} />
        </div>
      </div>
      {/* content */}
      <div style={{ position: "relative", paddingTop: 2 }}>
        <span className="prompt-display" aria-hidden style={{
          position: "absolute", top: "-22px", left: "-6px", fontSize: "clamp(70px, 9vw, 116px)", lineHeight: 1,
          color: "var(--ink)", opacity: .07, pointerEvents: "none", zIndex: 0,
        }}>{s.n}</span>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, color: "var(--rose)", textTransform: "uppercase" }}>Étape {s.n}</div>
          <h3 className="prompt" style={{ margin: "10px 0 0", fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", maxWidth: 560 }}>{s.title}</h3>
          <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: 600 }}>{s.body}</p>
          <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "var(--cream-2)", border: "1px solid rgba(106,19,64,.1)" }}>
            <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} />
            <span className="roboto-mono" style={{ fontSize: 11.5, letterSpacing: .6, color: "var(--ink-2)" }}>{s.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function SolutionHowItWorks({ anim }) {
  return (
    <section id="comment" data-screen-label="Comment ça marche" style={{ padding: "clamp(70px, 8vw, 110px) 56px", background: "var(--paper)", scrollMarginTop: 70 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "clamp(36px, 6vw, 80px)", alignItems: "start" }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div style={{ position: "sticky", top: 96 }} className="howit-sticky">
            <SectionHead eyebrow="Configuration" dot="var(--orange)"
              sub="Vous gardez le contrôle. Nous fournissons la plateforme, vous définissez le contenu.">
              Comment ça marche<br />pour votre <SerifAccent>organisation ?</SerifAccent>
            </SectionHead>
            <div className="roboto-mono" style={{ marginTop: 30, fontSize: 12, letterSpacing: 1.6, color: "var(--ink-4)", textTransform: "uppercase" }}>Vous définissez :</div>
          </div>
        </Reveal>
        <div>
          {STEPS.map((s, i) =>
            <Reveal key={i} animLevel={anim} delay={i * 90}>
              <StepRow s={s} i={i} anim={anim} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 5 · THÉMATIQUES  (Themes)
// ════════════════════════════════════════════════════════════════════════
const THEMES = [
  { icon: "sparkles", title: "Réflexions & loisirs", desc: "Aspirations individuelles, séries TV, modèles de réussite.", q: "Quel personnage de film t'inspire ?" },
  { icon: "cap", title: "Expertise & formation", desc: "Réflexions autour de sujets professionnels et pédagogiques.", q: "Comment vois-tu le management du futur ?" },
  { icon: "bulb", title: "Astuces & bons plans", desc: "Partage d'expériences et conseils pratiques.", q: "Des recettes de saison à partager ?" },
  { icon: "calendar", title: "Événements & actualités", desc: "Octobre rose, cultures locales, Tour de France.", q: "La tradition préférée de votre territoire ?" },
  { icon: "gamepad", title: "Jeux & mises en situation", desc: "Challenges en équipe et jeux de rôle.", q: "Trouvez 6 métiers commençant par M" },
  { icon: "message", title: "Débats", desc: "Mettre en commun différents points de vue.", q: "Bienfaits et limites du progrès" },
];
function ThemeCard({ t, anim }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--paper)", borderRadius: 18, padding: 26,
        border: "1px solid rgba(106,19,64,.09)",
        boxShadow: hover ? "0 24px 48px -26px rgba(217,10,92,.3)" : "0 4px 14px -10px rgba(106,19,64,.18)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 420ms cubic-bezier(.2,.7,.2,1), box-shadow 420ms",
        display: "flex", flexDirection: "column", height: "100%",
      }}>
      <span style={{
        width: 46, height: 46, borderRadius: 13, display: "grid", placeItems: "center",
        background: "linear-gradient(135deg, rgba(253,110,0,.14), rgba(217,10,92,.14))",
        color: "var(--rose)",
        transform: hover ? "scale(1.08) rotate(-3deg)" : "scale(1)",
        transition: "transform 420ms cubic-bezier(.2,.7,.2,1)",
      }}>
        <Icon name={t.icon} size={23} stroke="var(--rose)" />
      </span>
      <h3 className="prompt" style={{ margin: "18px 0 0", fontSize: 21, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)" }}>{t.title}</h3>
      <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-3)" }}>{t.desc}</p>
      <div style={{ marginTop: "auto", paddingTop: 18 }}>
        <div className="instrument" style={{ fontStyle: "italic", fontSize: 17, lineHeight: 1.35, color: "var(--rose)", paddingTop: 16, borderTop: "1px dashed rgba(106,19,64,.16)" }}>
          « {t.q} »
        </div>
      </div>
    </div>
  );
}
function SolutionThemes({ anim }) {
  return (
    <section id="themes" data-screen-label="Thématiques" style={{ padding: "clamp(70px, 8vw, 110px) 56px", background: "var(--cream)", scrollMarginTop: 70 }}>
      <Reveal animLevel={anim}>
        <div style={{ marginBottom: 48 }}>
          <SectionHead eyebrow="Thématiques" align="center">
            6 univers de conversation<br />pour votre <SerifAccent>collectif.</SerifAccent>
          </SectionHead>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }} data-grid="3col">
        {THEMES.map((t, i) =>
          <Reveal key={i} animLevel={anim} delay={i * 70}>
            <ThemeCard t={t} anim={anim} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 6 · FONCTIONNALITÉS  (Features — alternating)
// ════════════════════════════════════════════════════════════════════════
const FEATURES = [
  {
    n: "01", eyebrow: "Pour votre collectif", title: "Un voyage conversationnel",
    points: [
      "Des échanges vidéo one-to-one, guidés par des questions adaptées à chaque thématique.",
      "200+ sujets prêts à l'emploi — ou les vôtres, en quelques clics.",
      "Des rencontres courtes, de 6 à 20 minutes, qui s'intègrent dans la journée.",
    ],
    media: "Voyage conversationnel",
  },
  {
    n: "02", eyebrow: "Pour vous", title: "Une connaissance approfondie de votre organisation",
    points: [
      "Des tableaux de bord en temps réel : satisfaction, bien-être, engagement.",
      "La perception des initiatives collectives, mesurée à la source.",
      "Les attentes et besoins non exprimés, enfin rendus visibles.",
    ],
    media: "Tableau de bord live",
  },
  {
    n: "03", eyebrow: "Pour tous", title: "Un parcours d'entraînement aux compétences relationnelles",
    points: [
      "Un premier espace d'entraînement aux compétences interpersonnelles.",
      "Des échanges bienveillants qui renforcent la confiance en soi.",
      "Une habitude qui se cultive, échange après échange.",
    ],
    media: "Parcours soft skills",
  },
];
function FeatureMedia({ accent, label, anim }) {
  const on = anim !== "off";
  return (
    <div style={{ position: "relative", display: "grid", placeItems: "center", padding: 10 }}>
      {on && [0, 1, 2].map(i =>
        <span key={i} aria-hidden style={{
          position: "absolute", width: 340, height: 340, borderRadius: "50%", maxWidth: "78vw", maxHeight: "78vw",
          border: `1.5px solid ${accent === "orange" ? "rgba(253,110,0,.4)" : "rgba(217,10,92,.4)"}`,
          animation: `feat-ripple 4.5s ${i * 1.3}s ease-out infinite`, opacity: 0, pointerEvents: "none",
        }} />
      )}
      <style>{`@keyframes feat-ripple { 0% { transform: scale(.7); opacity: .8 } 80% { opacity: 0 } 100% { transform: scale(1.25); opacity: 0 } }`}</style>
      <div style={{
        position: "relative", width: 340, height: 340, maxWidth: "76vw", maxHeight: "76vw", borderRadius: "50%", overflow: "hidden",
        background: `repeating-linear-gradient(135deg, ${accent === "orange" ? "rgba(253,110,0,.1)" : "rgba(217,10,92,.1)"} 0 14px, transparent 14px 28px), radial-gradient(circle at 50% 38%, rgba(255,255,255,.7), var(--cream-2))`,
        border: `1.5px solid ${accent === "orange" ? "rgba(253,110,0,.32)" : "rgba(217,10,92,.32)"}`,
        boxShadow: `0 30px 60px -28px ${accent === "orange" ? "rgba(253,110,0,.4)" : "rgba(217,10,92,.4)"}`,
        display: "grid", placeItems: "center", textAlign: "center", padding: 30,
      }}>
        <div>
          <div className="roboto-mono" style={{ fontSize: 10.5, letterSpacing: 1.6, color: `var(--${accent === "orange" ? "orange" : "rose"})`, textTransform: "uppercase" }}>vidéo · placeholder</div>
          <div className="prompt" style={{ marginTop: 10, fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink-2)", lineHeight: 1.15 }}>{label}</div>
        </div>
      </div>
    </div>
  );
}
function FeatureRow({ f, i, anim }) {
  const reverse = i % 2 === 1;
  const accent = i % 2 === 0 ? "orange" : "rose";
  const bg = i % 2 === 0 ? "var(--paper)" : "var(--cream)";
  return (
    <div style={{ position: "relative", background: bg, padding: "clamp(54px, 6vw, 86px) 56px", overflow: "hidden" }}>
      <span className="prompt-display" aria-hidden style={{
        position: "absolute", top: 10, [reverse ? "right" : "left"]: 24,
        fontSize: "clamp(120px, 18vw, 260px)", lineHeight: 1, color: "var(--ink)", opacity: .05, pointerEvents: "none", zIndex: 0,
      }}>{f.n}</span>
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "clamp(36px, 6vw, 80px)", alignItems: "center" }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div style={{ order: reverse ? 2 : 1 }}>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: `var(--${accent})`, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: `var(--${accent})` }} />
              {f.eyebrow}
            </span>
            <h3 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}>{f.title}</h3>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {f.points.map((p, k) =>
                <li key={k} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 480 }}>
                  <span style={{ flexShrink: 0, marginTop: 1, width: 22, height: 22, borderRadius: 999, background: accent === "orange" ? "rgba(253,110,0,.14)" : "rgba(217,10,92,.14)", display: "grid", placeItems: "center" }}>
                    <Icon name="check" size={13} stroke={`var(--${accent})`} />
                  </span>
                  <span>{p}</span>
                </li>
              )}
            </ul>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={120}>
          <div style={{ order: reverse ? 1 : 2, justifySelf: "center" }}>
            <FeatureMedia accent={accent} label={f.media} anim={anim} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
function SolutionFeatures({ anim }) {
  return (
    <section id="fonctionnalites" data-screen-label="Fonctionnalités" style={{ scrollMarginTop: 70 }}>
      <div style={{ padding: "clamp(70px, 8vw, 100px) 56px clamp(20px, 3vw, 40px)", background: "var(--paper)", textAlign: "center" }}>
        <Reveal animLevel={anim}>
          <SectionHead eyebrow="Fonctionnalités" align="center"
            sub="Trois regards sur une même expérience — pour votre collectif, pour vous, pour chacun.">
            Ce qu'Uvibes change,<br /><SerifAccent>concrètement.</SerifAccent>
          </SectionHead>
        </Reveal>
      </div>
      {FEATURES.map((f, i) =>
        <FeatureRow key={i} f={f} i={i} anim={anim} />
      )}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 7 · NOS OFFRES  (Pricing — 3 cards)
// ════════════════════════════════════════════════════════════════════════
const PLAN_FEATURES = [
  "Expériences interactives (1 000 vibes)",
  "Sondages",
  "Baromètre bien-être",
  "Statistiques & pilotage",
  "Logo de votre entreprise",
  "Kit de communication",
  "Actualités internes",
  "Networking — cartes de visite digitales",
  "Brainstorming — enquêtes post vibes",
  "Employer branding — invités extérieurs",
  "Soft skills — parcours ou médiathèque",
];
const PLANS = [
  {
    name: "Vibes Connection", accent: "var(--orange)", featured: false,
    desc: "Favorisez les interactions et suivez l'état d'esprit de votre collectif.",
    inherit: null, includes: 4, cta: "Démarrer",
  },
  {
    name: "Vibes Premium", accent: "#FFE456", featured: true, badge: "Le plus populaire",
    desc: "Renforcez la visibilité de votre marque et l'efficacité de votre communication interne.",
    inherit: "Connection", includes: 6, cta: "Choisir Premium",
  },
  {
    name: "Vibes Boost", accent: "var(--rose)", featured: false, badge: "Tout inclus",
    desc: "Boostez la dynamique de votre collectif avec des outils de travail innovants.",
    inherit: "Premium", includes: 11, cta: "Contacter l'équipe",
  },
];
function PricingCard2({ plan, anim }) {
  const f = plan.featured;
  const ink = f ? "#fff" : "var(--ink)";
  const sub = f ? "rgba(255,255,255,.62)" : "var(--ink-3)";
  const incColor = f ? "#FFE456" : "#16a34a";
  return (
    <div style={{
      position: "relative", overflow: "hidden", borderRadius: 24, padding: "32px 28px 32px",
      background: f ? "linear-gradient(160deg, #3a0a22, var(--ink) 70%)" : "var(--paper)",
      color: ink,
      border: f ? "1px solid rgba(255,255,255,.12)" : "1px solid rgba(106,19,64,.09)",
      boxShadow: f ? "0 40px 80px -32px rgba(217,10,92,.55)" : "0 16px 38px -24px rgba(106,19,64,.22)",
      transform: f ? "translateY(-14px)" : "none",
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      {f &&
        <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--orange), var(--rose))" }} />
      }
      {f &&
        <div aria-hidden style={{ position: "absolute", top: -70, right: -70, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.3), transparent 70%)", pointerEvents: "none" }} />
      }
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 26 }}>
        <span style={{ width: 12, height: 12, borderRadius: 4, background: plan.accent, boxShadow: f ? "0 0 0 4px rgba(255,228,86,.2)" : "none" }} />
        {plan.badge &&
          <span className="roboto-mono" style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", padding: "5px 11px", borderRadius: 999,
            background: f ? "linear-gradient(90deg, var(--orange), var(--rose))" : "var(--cream-2)",
            color: f ? "#fff" : "var(--ink-3)", border: f ? "none" : "1px solid rgba(106,19,64,.12)",
          }}>{plan.badge}</span>
        }
      </div>
      <h3 className="prompt-display" style={{ position: "relative", margin: "20px 0 0", fontSize: 34, color: ink }}>{plan.name}</h3>
      <p style={{ position: "relative", margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.5, color: sub, minHeight: 64 }}>{plan.desc}</p>

      <div style={{ position: "relative", marginTop: 18, paddingTop: 18, borderTop: f ? "1px solid rgba(255,255,255,.14)" : "1px dashed rgba(106,19,64,.16)", display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="prompt" style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", color: ink }}>Sur devis</span>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1, color: sub, textTransform: "uppercase" }}>· adapté à votre taille</span>
      </div>

      <button className="btn" style={{
        position: "relative", marginTop: 22, width: "100%", justifyContent: "center", padding: "15px 18px", fontSize: 15,
        background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff",
        boxShadow: f ? "0 16px 38px -14px rgba(253,110,0,.6)" : "0 12px 30px -14px rgba(217,10,92,.4)",
      }}>
        {plan.cta} <Icon name="arrow" size={16} stroke="#fff" />
      </button>

      {plan.inherit &&
        <div className="roboto-mono" style={{ position: "relative", marginTop: 22, marginBottom: 2, fontSize: 11, letterSpacing: 1, color: f ? "#FFE456" : "var(--rose)", textTransform: "uppercase" }}>
          Tout {plan.inherit}, et&nbsp;:
        </div>
      }
      {!plan.inherit &&
        <div className="roboto-mono" style={{ position: "relative", marginTop: 22, marginBottom: 2, fontSize: 11, letterSpacing: 1, color: sub, textTransform: "uppercase" }}>
          Ce qui est inclus
        </div>
      }
      <ul style={{ position: "relative", margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11, flexGrow: 1 }}>
        {PLAN_FEATURES.map((feat, i) => {
          const inc = i < plan.includes;
          const fresh = plan.inherit ?
            (plan.name === "Vibes Premium" ? i >= 4 && i < 6 : i >= 6) :
            inc;
          return (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, lineHeight: 1.4,
              color: inc ? (f ? (fresh ? "#fff" : "rgba(255,255,255,.7)") : "var(--ink-2)") : (f ? "rgba(255,255,255,.32)" : "var(--ink-4)") }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon name={inc ? "check" : "x"} size={15} stroke={inc ? incColor : (f ? "rgba(255,255,255,.32)" : "var(--ink-4)")} sw={inc ? 2.6 : 1.8} />
              </span>
              <span style={{ textDecoration: inc ? "none" : "line-through", fontWeight: fresh ? 600 : 400 }}>{feat}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function SolutionPricing({ anim }) {
  return (
    <section id="offres" data-screen-label="Nos offres" style={{ padding: "clamp(70px, 8vw, 110px) 56px", background: "var(--cream)", scrollMarginTop: 70 }}>
      <Reveal animLevel={anim}>
        <div style={{ marginBottom: 52 }}>
          <SectionHead eyebrow="Tarification" align="center"
            sub="Choisissez le plan adapté à votre collectif. Tous les plans incluent les expériences interactives.">
            Nos offres <SerifAccent>Vibes.</SerifAccent>
          </SectionHead>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, alignItems: "stretch", maxWidth: 1140, margin: "0 auto" }} data-grid="3col">
        {PLANS.map((plan, i) =>
          <Reveal key={i} animLevel={anim} delay={i * 110}>
            <PricingCard2 plan={plan} anim={anim} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

Object.assign(window, {
  Icon, SectionHead, SerifAccent,
  SolutionProofBar, SolutionForWho, SolutionHowItWorks,
  SolutionThemes, SolutionFeatures, SolutionPricing,
});
