// home-extras.jsx — Sections added to homepage per uvibes.fr spec
// - CollectifsSection  (ticker pills + detail panel — moved here from /solution)
// - FloatingMenu       (mobile bottom nav)
// All warm palette only: orange / rose / coral / peach. No dark.

// Defensive: A may not exist if loaded by La solution.html (direction-vibration not loaded there)
if (typeof A === "undefined") { window.A = {}; }

const COLLECTIFS = [
  {
    id: "culture",
    name: "Culture",
    subtitle: "Festivals, théâtres, médiathèques",
    color: "#FD6E00",
    soft: "#fff1e3",
    gains: [
      "Renforcer le lien équipe + bénévoles",
      "Capter les ressentis avant chaque saison",
      "Onboarder vite les renforts d'été",
    ],
    why: [
      "Format court compatible avec les pics d'activité",
      "Questions adaptées au vocabulaire culturel",
      "Pas d'app à installer pour les intermittents",
    ],
    flyers: ["Programmation 2026", "Bilan saison", "Onboarding équipe"],
  },
  {
    id: "enseignement",
    name: "Enseignement",
    subtitle: "Universités, écoles, campus",
    color: "#D90A5C",
    soft: "#ffe1ec",
    gains: [
      "Briser les silos entre filières",
      "Faciliter l'intégration des primo-entrants",
      "Détecter l'isolement étudiant en amont",
    ],
    why: [
      "Sessions buddy auto à la rentrée",
      "Anonymisation paramétrable pour la vie privée",
      "Compatible SSO universitaire (Shibboleth, Google)",
    ],
    flyers: ["Rentrée 2026", "Buddy programme", "Vie de campus"],
  },
  {
    id: "tourisme",
    name: "Tourisme",
    subtitle: "Offices, opérateurs, destinations",
    color: "#ff7a3a",
    soft: "#ffe6d5",
    gains: [
      "Souder les saisonniers en une semaine",
      "Croiser les retours d'expérience terrain",
      "Préparer les pics d'affluence sereinement",
    ],
    why: [
      "Démarre en 6 minutes sans formation IT",
      "Multi-langue FR / EN / ES par défaut",
      "Dashboard léger lisible sur mobile",
    ],
    flyers: ["Saison été", "Onboarding accueil", "Bilan visiteurs"],
  },
  {
    id: "reseaux-biz",
    name: "Réseaux Business",
    subtitle: "Clubs, réseaux pro, BNI",
    color: "#ff4d7a",
    soft: "#ffe0e9",
    gains: [
      "Multiplier les rencontres qualifiées 1:1",
      "Réveiller les membres dormants",
      "Mesurer la santé du réseau en live",
    ],
    why: [
      "Matching pondéré par secteur, taille, géo",
      "Cartes de visite numériques échangées en fin de call",
      "Relance auto des absents",
    ],
    flyers: ["Soirée mensuelle", "Cartographie", "Relance membres"],
  },
  {
    id: "adherents",
    name: "Adhérents",
    subtitle: "Associations à fort volume",
    color: "#FD6E00",
    soft: "#fff1e3",
    gains: [
      "Fidéliser les adhérents dispersés",
      "Donner la parole sans réunion-marathon",
      "Engager les nouveaux dès le mois 1",
    ],
    why: [
      "Pulse hebdo agrégé, lecture < 5 min",
      "Rituels mensuels sans logistique",
      "RGPD-compliant, données hébergées FR",
    ],
    flyers: ["AG annuelle", "Pulse mensuel", "Onboarding adhérent"],
  },
  {
    id: "entreprises",
    name: "Entreprises",
    subtitle: "Groupes, ETI, multi-sites",
    color: "#D90A5C",
    soft: "#ffe1ec",
    gains: [
      "Retisser le lien post-télétravail",
      "Connecter les sites sans déplacement",
      "Outiller les RH avec un signal qualitatif",
    ],
    why: [
      "SSO Microsoft / Google natif",
      "Hébergement EU, DPA fourni",
      "Personnalisable au branding interne",
    ],
    flyers: ["Onboarding semaine 1", "Pulse RH", "Inter-équipes"],
  },
  {
    id: "seniors",
    name: "Seniors",
    subtitle: "Mutuelles, EHPAD, clubs",
    color: "#ff9558",
    soft: "#ffe8d8",
    gains: [
      "Garder du lien hors temps formels",
      "Lutter contre l'isolement, sans technophilie",
      "Réactiver des cercles de proximité",
    ],
    why: [
      "Interface très simple, gros boutons",
      "Sessions courtes (2 min) à toute heure",
      "Pas de compte à créer",
    ],
    flyers: ["Café virtuel", "Rituels semaine", "Cercle proximité"],
  },
  {
    id: "echanges-pairs",
    name: "Échanges entre pairs",
    subtitle: "Collectifs métier, communautés CTO/CMO",
    color: "#ff4d7a",
    soft: "#ffe0e9",
    gains: [
      "Sortir du silo de son entreprise",
      "Tester ses convictions en off",
      "Élargir son réseau utile",
    ],
    why: [
      "Matching par fonction, secteur, ancienneté",
      "Confidentialité forte par défaut",
      "Aucune marketplace, zéro pitch déguisé",
    ],
    flyers: ["Cercle CTO", "Pair-coaching", "Retour d'expérience"],
  },
  {
    id: "international",
    name: "International",
    subtitle: "Diasporas, expat, alumni globaux",
    color: "#FD6E00",
    soft: "#fff1e3",
    gains: [
      "Connecter une diaspora éparpillée",
      "Faire vivre les alumni à distance",
      "Préserver une langue, une culture",
    ],
    why: [
      "Multi-langue FR / EN / ES",
      "Fuseaux horaires gérés intelligemment",
      "Tags langue / pays au matching",
    ],
    flyers: ["Alumni 2026", "Diaspora", "Mentorat global"],
  },
  {
    id: "sport",
    name: "Sport",
    subtitle: "Clubs, fédérations, équipes",
    color: "#D90A5C",
    soft: "#ffe1ec",
    gains: [
      "Souder un collectif inter-générationnel",
      "Mixer les catégories d'âge sans forcer",
      "Réveiller les bénévoles entre saisons",
    ],
    why: [
      "Questions partagées U15 → vétérans",
      "Format court compatible avec entraînements",
      "Branding club personnalisé",
    ],
    flyers: ["Reprise saison", "Vétérans / U15", "Bénévoles club"],
  },
  {
    id: "insertion-pro",
    name: "Insertion Pro",
    subtitle: "Missions locales, France Travail",
    color: "#ff7a3a",
    soft: "#ffe6d5",
    gains: [
      "Casser l'isolement des bénéficiaires",
      "Multiplier les ouvertures réseau",
      "Donner de la chaleur au parcours",
    ],
    why: [
      "Sans app à télécharger, lien web simple",
      "Accompagnement humain par les pairs",
      "Outils RGPD adaptés au secteur",
    ],
    flyers: ["Parcours 2026", "Mentorat pair", "Réseau emploi"],
  },
];

A.Collectifs = function ({ anim }) {
  const [activeId, setActiveId] = useState("entreprises");
  const active = COLLECTIFS.find((c) => c.id === activeId) || COLLECTIFS[5];
  const on = anim !== "off";

  return (
    <section style={{ position: "relative", padding: "120px 0 100px", overflow: "hidden", background: "var(--cream)" }}>
      {/* soft gradient haze */}
      <div aria-hidden style={{
        position: "absolute", top: -120, right: -120, width: 540, height: 540, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(253,110,0,.28), transparent 70%)",
        filter: "blur(28px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: -180, left: -100, width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(217,10,92,.22), transparent 70%)",
        filter: "blur(30px)", pointerEvents: "none",
      }} />

      {/* header */}
      <div style={{ position: "relative", padding: "0 56px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 8, background: "linear-gradient(135deg, var(--orange), var(--rose))" }} />
              Pour qui ?
            </span>
            <h2 className="prompt" style={{ margin: "16px 0 14px", fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
              Chaque <span className="instrument" style={{
                fontStyle: "italic", fontWeight: 400,
                background: "linear-gradient(90deg, var(--orange), var(--rose))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", color: "transparent",
              }}>collectif</span><br />a ses enjeux.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 440, margin: 0 }}>
              Découvrez le vôtre. Onze contextes typiques — mais la vraie réponse vient toujours d'une conversation.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ticker pills (marquee, hover pause) */}
      <Reveal animLevel={anim} delay={120}>
        <div className="collectifs-ticker" style={{
          position: "relative", overflow: "hidden", marginBottom: 36,
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}>
          <div className="collectifs-track" style={{
            display: "flex", gap: 12, width: "max-content",
            animation: on ? "collectifs-scroll 60s linear infinite" : "none",
          }}>
            {[...COLLECTIFS, ...COLLECTIFS, ...COLLECTIFS].map((c, i) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={i}
                  onClick={() => setActiveId(c.id)}
                  style={{
                    flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "12px 20px 12px 16px", borderRadius: 999,
                    border: isActive ? "1.5px solid transparent" : "1px solid rgba(106,19,64,.15)",
                    background: isActive
                      ? "linear-gradient(135deg, var(--orange), var(--rose))"
                      : "rgba(255,255,255,.7)",
                    color: isActive ? "#fff" : "var(--ink)",
                    backdropFilter: "blur(8px)",
                    fontFamily: "inherit", fontSize: 14, fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap",
                    transition: "transform 240ms cubic-bezier(.2,.7,.2,1), box-shadow 240ms",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                    boxShadow: isActive ? "0 14px 28px -14px rgba(217,10,92,.45)" : "0 2px 6px -2px rgba(106,19,64,.1)",
                  }}
                >
                  <span style={{
                    width: 10, height: 10, borderRadius: 10,
                    background: isActive ? "#fff" : c.color,
                    boxShadow: isActive ? "none" : `0 0 0 4px ${c.color}22`,
                  }} />
                  {c.name}
                </button>
              );
            })}
          </div>
          <style>{`
            @keyframes collectifs-scroll { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
            .collectifs-ticker:hover .collectifs-track { animation-play-state: paused; }
          `}</style>
        </div>
      </Reveal>

      {/* detail panel */}
      <div style={{ position: "relative", padding: "0 56px" }}>
        <div key={activeId} style={{
          borderRadius: 32, overflow: "hidden",
          background: "var(--paper)", border: "1px solid rgba(106,19,64,.08)",
          boxShadow: "0 30px 60px -32px rgba(106,19,64,.18)",
          animation: "panel-in 500ms cubic-bezier(.2,.7,.2,1)",
        }}>
          {/* hero band — collectif color */}
          <div style={{
            position: "relative", padding: "44px 44px 36px", overflow: "hidden",
            background: `linear-gradient(135deg, ${active.color}, ${active.color}cc)`,
            color: "#fff",
          }}>
            {/* sparkles */}
            {on && Array.from({ length: 10 }).map((_, i) => (
              <span key={i} style={{
                position: "absolute",
                left: `${(i * 71 + 5) % 100}%`, top: `${(i * 47 + 10) % 100}%`,
                width: 3 + (i % 3), height: 3 + (i % 3), borderRadius: 999,
                background: "rgba(255,255,255,.55)",
                animation: `c-spark 6s ${i * 0.3}s ease-in-out infinite`,
                pointerEvents: "none",
              }} />
            ))}
            <style>{`
              @keyframes c-spark { 0%,100% { opacity: 0; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-10px) } }
              @keyframes panel-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>

            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 30, alignItems: "center" }} data-grid="2col">
              <div>
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,.2)", border: "1px solid rgba(255,255,255,.3)" }}>
                  Cas {String(COLLECTIFS.findIndex(c => c.id === activeId) + 1).padStart(2, "0")} / {COLLECTIFS.length}
                </span>
                <h3 className="prompt" style={{ margin: "18px 0 8px", fontSize: "clamp(40px, 4.6vw, 64px)", fontWeight: 700, letterSpacing: -1.5, lineHeight: 1 }}>
                  {active.name}
                </h3>
                <p className="instrument" style={{ margin: 0, fontStyle: "italic", fontSize: 22, lineHeight: 1.3, opacity: .95 }}>
                  {active.subtitle}
                </p>
              </div>
              {/* flyer stack */}
              <div className="hide-mobile" style={{ position: "relative", height: 200 }}>
                {active.flyers.map((f, i) => (
                  <div key={i} style={{
                    position: "absolute",
                    top: i * 18, left: 60 + i * 30,
                    width: 140, height: 180, borderRadius: 12,
                    background: "rgba(255,255,255,.95)",
                    boxShadow: "0 20px 40px -16px rgba(0,0,0,.25)",
                    transform: `rotate(${(i - 1) * 5}deg)`,
                    padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between",
                    color: active.color,
                  }}>
                    <div className="roboto-mono" style={{ fontSize: 9, letterSpacing: 1.4, opacity: .7 }}>
                      FLYER · 0{i + 1}
                    </div>
                    {/* placeholder graphic */}
                    <div style={{ flex: 1, marginTop: 10, borderRadius: 6,
                      background: `repeating-linear-gradient(135deg, ${active.color}22, ${active.color}22 6px, transparent 6px, transparent 12px)`,
                    }} />
                    <div className="prompt" style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.15, marginTop: 8 }}>
                      {f}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* body — 2 columns */}
          <div style={{ padding: 44, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50 }} data-grid="2col">
            <div>
              <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: active.color, marginBottom: 14 }}>
                → Ce que vous y gagnez
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {active.gains.map((g, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, lineHeight: 1.45, color: "var(--ink)" }}>
                    <span style={{
                      flexShrink: 0, marginTop: 6, width: 10, height: 10, borderRadius: 10,
                      background: active.color, boxShadow: `0 0 0 4px ${active.color}22`,
                    }} />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--ink-2)", marginBottom: 14 }}>
                → Pourquoi ça fonctionne
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {active.why.map((w, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, lineHeight: 1.45, color: "var(--ink-2)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <a href="La solution.html" style={{ textDecoration: "none" }}>
            <button style={{
              background: "linear-gradient(90deg, var(--orange), var(--rose))",
              color: "#fff", border: 0, padding: "16px 22px", borderRadius: 999,
              fontWeight: 600, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 16px 40px -14px rgba(217,10,92,.45)",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              Voir toutes les solutions par collectif
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </a>
          <span className="roboto-mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: 1 }}>
            · 11 contextes détaillés sur la page Solution
          </span>
        </div>
      </div>
    </section>
  );
};

// ── FloatingMenu — mobile bottom nav, always visible ─────────────────────
A.FloatingMenu = function () {
  const { isMobile } = useResponsive();
  if (!isMobile) return null;

  const path = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "";
  const items = [
    { label: "Accueil", href: "Bienvenue.html", active: path.toLowerCase().includes("bienvenue") || path === "",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" strokeLinejoin="round" />
        </svg>
      ) },
    { label: "Solution", href: "La solution.html", active: path.toLowerCase().includes("solution"),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        </svg>
      ) },
    { label: "À propos", href: "#", active: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      ) },
    { label: "Blog", href: "#", active: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 4h11l3 3v13H5z" strokeLinejoin="round" />
          <path d="M9 10h7M9 14h7M9 18h4" strokeLinecap="round" />
        </svg>
      ) },
  ];

  return (
    <nav aria-label="Navigation principale" style={{
      position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 70,
      padding: 6,
      borderRadius: 999,
      background: "rgba(255,255,255,.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(106,19,64,.12)",
      boxShadow: "0 20px 40px -16px rgba(106,19,64,.25)",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
    }}>
      {items.map((it, i) => (
        <a key={i} href={it.href} style={{
          textDecoration: "none",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
          padding: "8px 4px",
          borderRadius: 999,
          background: it.active ? "linear-gradient(135deg, var(--orange), var(--rose))" : "transparent",
          color: it.active ? "#fff" : "var(--ink)",
          fontSize: 10, fontWeight: 600, letterSpacing: .2,
          transition: "all 200ms cubic-bezier(.2,.7,.2,1)",
        }}>
          {it.icon}
          <span style={{ marginTop: 2 }}>{it.label}</span>
        </a>
      ))}
    </nav>
  );
};

// Also expose as a standalone for pages that don't load direction-vibration.jsx
window.FloatingMenu = A.FloatingMenu;
