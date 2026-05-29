// Shared content + small utilities used by both directions.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Content (FR copy, sourced from brief + current site) ----------
const COPY = {
  brand: "Uvibes",
  tag: "L'inattendu commence ici",
  navItems: ["Bienvenue", "La solution", "À propos", "Blog"],
  hero: {
    eyebrow: "Application bien-être collectif · 2026",
    title: ["Activez la puissance", "de votre", "collectif"],
    titleEmph: 2, // index of word to emphasize (color)
    sub: "L'outil digital qui crée les bons échanges, au bon moment. Et si les conversations clés arrivaient enfin ?",
    body: "Uvibes fait circuler les bons plans, les expériences et les points de vue à travers des discussions courtes, humaines et engageantes.",
    ctaPrimary: "Découvrir l'application",
    ctaSecondary: "Étudions votre projet",
  },
  banner: {
    label: "En 2026, sur Uvibes",
    countSlot: true, // populated from WordPress on prod
    fillers: ["organisations", "rencontres provoquées", "minutes d'écoute", "vibrations partagées"],
  },
  pillars: {
    kicker: "Uvibes, moteur d'engagement et de performance dans votre organisation",
    title: "Un seul outil pour renforcer votre collectif et guider vos choix stratégiques",
    items: [
      {
        dot: "var(--orange)",
        title: "Fédérer et engager",
        body: "Créer un sentiment d'appartenance fort à votre organisation. Vos membres se croisent chaque jour — Uvibes les fait se rencontrer.",
        stat: "+38%",
        statLabel: "de sentiment d'appartenance après 6 semaines",
      },
      {
        dot: "var(--rose)",
        title: "Piloter et décider",
        body: "Accédez à des données en temps réel pour augmenter l'efficacité de vos actions. Pas un rapport de 40 pages — juste ce qu'il faut pour agir.",
        stat: "< 5 min",
        statLabel: "pour lire le pouls de votre collectif",
      },
    ],
  },
  enjeux: {
    title: "Chaque collectif a ses enjeux",
    sub: "DRH, dirigeants d'association, managers, équipes étudiantes, clubs sportifs, mairies — Uvibes s'adapte à votre vocabulaire et à vos rituels.",
    chips: [
      { tag: "Entreprise", q: "Comment retisser le lien après le télétravail ?" },
      { tag: "Université", q: "Comment briser l'isolement des nouveaux arrivants ?" },
      { tag: "Association", q: "Comment fidéliser des bénévoles dispersés ?" },
      { tag: "Sport", q: "Comment souder un collectif inter-générationnel ?" },
      { tag: "Seniors", q: "Comment garder du lien hors des temps formels ?" },
      { tag: "Mairie", q: "Comment écouter sans réunion-marathon ?" },
    ],
  },
  trustees: {
    title: "Ils avancent avec nous",
    logos: [
      { name: "Université de Perpignan", abbr: "UPVD" },
      { name: "Eklore", abbr: "Eklore." },
      { name: "Fête des voisins", abbr: "FDV" },
      { name: "Groupe MGEN", abbr: "MGEN" },
      { name: "INSA Toulouse", abbr: "INSA" },
      { name: "Ville de Montpellier", abbr: "Mtp" },
    ],
  },
  how: {
    eyebrow: "Comment ça fonctionne",
    title: "Trois étapes. Pas une de plus.",
    steps: [
      {
        n: "01",
        title: "Choisissez vos expériences et thématiques d'échange",
        body: "Le paramétrage est réalisé en quelques minutes. Aucune compétence technique n'est requise.",
        time: "≈ 6 min de setup",
      },
      {
        n: "02",
        title: "Votre collectif échange en vidéo, en one-to-one",
        body: "Les membres se rencontrent aléatoirement lors d'échanges vidéo individuels. Des questions adaptées à la thématique viennent guider la conversation. À la fin, les participants peuvent échanger leurs cartes de visite.",
        time: "2 à 3 min par échange",
      },
      {
        n: "03",
        title: "Recueillez des données stratégiques",
        body: "À l'issue des échanges, les participants répondent à de courtes enquêtes personnalisées. Vous recueillez retours, points de vue et données utiles pour mieux comprendre votre collectif.",
        time: "Dashboard temps réel",
      },
    ],
    cta: "Voir la solution en détail",
  },
  videos: {
    title: "Ils aiment l'expérience",
    sub: "Témoignages vidéo de membres d'organisations qui utilisent Uvibes.",
    items: [
      { name: "Isaline", role: "Étudiante M2", quote: "J'ai rencontré quelqu'un d'une autre filière en 3 minutes. On déjeune ensemble depuis." },
      { name: "Théo", role: "DRH groupe industriel", quote: "Mes managers se découvrent des points communs qu'on ne voit pas en réunion." },
      { name: "Alina", role: "Responsable asso", quote: "Mes bénévoles se sont enfin parlé, sans qu'on organise un événement." },
      { name: "Eva", role: "Vie étudiante", quote: "Des étudiants de cultures différentes ont échangé. Les barrières sont tombées." },
      { name: "Marc", role: "Coach sportif", quote: "Les nouveaux et les anciens du club se mélangent vraiment depuis Uvibes." },
      { name: "Sofia", role: "Coordinatrice seniors", quote: "Nos adhérents repartent avec des numéros, plus seulement avec un café." },
    ],
  },
  testimonials: [
    {
      quote: "Uvibes a créé une vraie dynamique dans notre équipe. En 10 minutes, des collègues qui se côtoyaient depuis des années ont découvert qu'ils avaient des passions communes.",
      name: "Marie-Claire D.",
      role: "Directrice des Ressources Humaines — Groupe industriel",
      stars: 5,
    },
    {
      quote: "Ce qui m'a surpris, c'est la facilité avec laquelle des étudiants de cultures très différentes ont pu échanger. Uvibes a vraiment brisé les barrières.",
      name: "Pr. Jean-Luc M.",
      role: "Responsable vie étudiante — Université",
      stars: 5,
    },
    {
      quote: "Nos adhérents se sentaient isolés. Depuis qu'on utilise Uvibes lors de nos événements, ils repartent avec de nouvelles rencontres et l'envie de revenir.",
      name: "Isabelle R.",
      role: "Coordinatrice — Association seniors",
      stars: 5,
    },
  ],
  advantages: {
    title: "Transformez le quotidien",
    sub: "Six bénéfices concrets ressentis dès les premières semaines.",
    items: [
      { title: "Optimisme", body: "Des échanges qui font du bien et donnent envie de revenir.", icon: "☀" },
      { title: "Flexibilité", body: "À votre rythme, selon vos envies et disponibilités.", icon: "✦" },
      { title: "Énergie", body: "Rechargez-vous au contact de personnes motivantes.", icon: "✺" },
      { title: "Pensée critique", body: "Des points de vue nouveaux, hors de votre silo habituel.", icon: "✷" },
      { title: "Adaptation", body: "Apprenez à vous sentir à l'aise avec de nouvelles personnes.", icon: "❉" },
      { title: "Bien-être", body: "Sentez-vous reconnu et ancré dans votre collectif.", icon: "❀" },
    ],
  },
  articles: {
    eyebrow: "Au journal Uvibes",
    title: "Nos articles mis en avant",
    items: [
      {
        cat: "Recherche",
        date: "12 mai 2026",
        readTime: "7 min",
        title: "Pourquoi 3 minutes suffisent à changer la perception d'un collègue",
        excerpt: "Une étude conjointe avec l'Université de Perpignan sur la chimie des micro-rencontres en milieu professionnel.",
      },
      {
        cat: "Terrain",
        date: "28 avril 2026",
        readTime: "4 min",
        title: "Eklore : comment 320 bénévoles ont retrouvé l'envie de se croiser",
        excerpt: "Retour d'expérience sur un déploiement Uvibes dans un réseau associatif éclaté sur cinq régions.",
      },
      {
        cat: "Méthode",
        date: "9 avril 2026",
        readTime: "6 min",
        title: "Les 12 questions qui débloquent (vraiment) une conversation",
        excerpt: "Notre catalogue de relances testées sur plus de 40 000 échanges. Spoiler : la météo n'y figure pas.",
      },
    ],
  },
  contact: {
    eyebrow: "Étudions votre projet",
    title: "Parlons de votre collectif",
    sub: "Quelques lignes suffisent. On vous répond sous 48h, sans script de vente.",
    fields: [
      { id: "nom", label: "Nom", required: true },
      { id: "prenom", label: "Prénom", required: true },
      { id: "email", label: "Email", required: true, type: "email" },
      { id: "org", label: "Organisation", required: false },
    ],
    consent1: "Je souhaite partager mes informations avec Uvibes",
    consent2: "Je m'inscris à la newsletter Uvibes",
  },
};

// ---------- Vibration SVG (signature brand motif) ----------
function VibrationLine({ stroke = "var(--ink)", strokeWidth = 1.5, amplitude = 14, freq = 6, width = 600, height = 60, className, animated = true, speed = 16 }) {
  // a tasteful single-line sine-ish path
  const pts = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = height / 2 + Math.sin((i / steps) * Math.PI * freq) * amplitude;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const d = pts.join(" ");
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
        {animated && (
          <animate attributeName="d" dur={`${speed}s`} repeatCount="indefinite"
            values={[
              pts.map((p, i) => {
                const x = (i / steps) * width;
                const y = height / 2 + Math.sin((i / steps) * Math.PI * freq) * amplitude;
                return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
              }).join(" "),
              pts.map((p, i) => {
                const x = (i / steps) * width;
                const y = height / 2 + Math.sin((i / steps) * Math.PI * freq + Math.PI) * amplitude;
                return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
              }).join(" "),
              pts.map((p, i) => {
                const x = (i / steps) * width;
                const y = height / 2 + Math.sin((i / steps) * Math.PI * freq + Math.PI * 2) * amplitude;
                return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
              }).join(" "),
            ].join("; ")}
          />
        )}
      </path>
    </svg>
  );
}

// ---------- Logo (text-based, can't recreate their actual mark) ----------
function Logo({ color = "var(--ink)", size = 22 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="ug" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--orange)" />
            <stop offset="100%" stopColor="var(--rose)" />
          </linearGradient>
        </defs>
        <path d="M6 6 V18 a10 10 0 0 0 20 0 V6" fill="none" stroke="url(#ug)" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="prompt" style={{ color, fontWeight: 800, fontSize: size, letterSpacing: -0.5 }}>uvibes</span>
    </div>
  );
}

// ---------- Phone mock placeholder ----------
function PhoneMock({ tilt = -6, glow = false }) {
  return (
    <div style={{ position: "relative", transform: `rotate(${tilt}deg)`, transition: "transform 600ms cubic-bezier(.2,.7,.2,1)" }}>
      {glow && <div style={{ position: "absolute", inset: -40, background: "radial-gradient(closest-side, rgba(253,110,0,.35), transparent 70%)", filter: "blur(10px)" }} />}
      <div style={{
        position: "relative", width: 270, height: 560, borderRadius: 42,
        background: "linear-gradient(180deg, var(--rose-deep, #8a0a3f), var(--rose))",
        boxShadow: "0 30px 60px -20px rgba(217,10,92,.45), 0 0 0 8px rgba(255,255,255,.18) inset, 0 0 0 1px rgba(255,255,255,.25)",
        padding: 12,
      }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 100, height: 26, background: "linear-gradient(90deg, var(--rose-deep,#8a0a3f), var(--rose))", borderRadius: 14, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.15)" }} />
        <div style={{
          width: "100%", height: "100%", borderRadius: 30, overflow: "hidden",
          background: "linear-gradient(160deg, var(--orange) 0%, #ff9558 35%, var(--rose) 100%)",
          position: "relative",
        }}>
          {/* faux call UI */}
          <div style={{ position: "absolute", top: 56, left: 0, right: 0, textAlign: "center", color: "#fff", fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: 1, opacity: .85 }}>
            EN CONVERSATION · 02:14
          </div>
          <div style={{ position: "absolute", top: 90, left: 16, right: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ aspectRatio: "3/4", borderRadius: 18, background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)", display: "flex", alignItems: "flex-end", padding: 10, color: "#fff", fontSize: 11, fontWeight: 600 }}>Léa</div>
            <div style={{ aspectRatio: "3/4", borderRadius: 18, background: "rgba(0,0,0,.25)", border: "1px solid rgba(255,255,255,.2)", display: "flex", alignItems: "flex-end", padding: 10, color: "#fff", fontSize: 11, fontWeight: 600 }}>Vous</div>
          </div>
          <div style={{ position: "absolute", bottom: 96, left: 18, right: 18, padding: 14, background: "rgba(255,255,255,.92)", borderRadius: 18, color: "var(--ink)", fontSize: 13, lineHeight: 1.4 }}>
            <div style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, color: "var(--rose)", marginBottom: 4, letterSpacing: 1 }}>QUESTION 02</div>
            <div style={{ fontWeight: 600 }}>Quelle est la dernière chose qui t'a fait rire au travail ?</div>
          </div>
          <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)" }} />
            <div style={{ width: 48, height: 48, borderRadius: 24, background: "var(--rose)", boxShadow: "0 8px 24px rgba(217,10,92,.5)" }} />
            <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- A reusable "video tile" placeholder that rotates faces / quotes ----------
function VideoTile({ item, idx, tone = "warm", playing = false, onClick }) {
  const palettes = [
    ["#FD6E00", "#ffb37a"],
    ["#D90A5C", "#ff7eb1"],
    ["#FD6E00", "#D90A5C"],
    ["#ffadc7", "#ffc8a8"],
    ["#D90A5C", "#FD6E00"],
    ["#ff9558", "#ff5e9c"],
  ];
  const p = palettes[idx % palettes.length];
  const initials = item.name.split(" ").map(s => s[0]).join("").slice(0, 2);
  return (
    <button onClick={onClick} style={{
      position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 22,
      background: `linear-gradient(155deg, ${p[0]}, ${p[1]})`,
      border: "none", padding: 0, overflow: "hidden", cursor: "pointer",
      color: "#fff", textAlign: "left",
      boxShadow: playing ? `0 24px 60px -20px ${p[0]}` : "0 12px 30px -16px rgba(0,0,0,.35)",
      transition: "transform 500ms cubic-bezier(.2,.7,.2,1), box-shadow 500ms",
      transform: playing ? "translateY(-6px) scale(1.02)" : "none",
    }}>
      {/* big initials */}
      <div className="prompt" style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "8vw", fontWeight: 800, opacity: .25, letterSpacing: -4,
      }}>{initials}</div>
      {/* play badge */}
      <div style={{
        position: "absolute", top: 14, left: 14, padding: "5px 10px", borderRadius: 999,
        background: "rgba(255,255,255,.25)", backdropFilter: "blur(6px)",
        fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: 1.4,
      }}>{playing ? "▶ NOW" : "▶ 02:43"}</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16,
        background: "linear-gradient(180deg, transparent, rgba(106,19,64,.55))" }}>
        <div style={{ fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: 1.4, opacity: .85, textTransform: "uppercase" }}>{item.role}</div>
        <div className="prompt" style={{ fontWeight: 700, fontSize: 20, marginTop: 2 }}>{item.name}</div>
      </div>
    </button>
  );
}

// ---------- Rotating logos marquee ----------
function LogosMarquee({ logos, dir = "left", speed = 40, mode = "ghost" }) {
  const dup = [...logos, ...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
      <div style={{
        display: "flex", gap: 56, alignItems: "center",
        animation: `marquee-${dir} ${speed}s linear infinite`,
        width: "max-content",
      }}>
        {dup.map((l, i) => (
          <div key={i} className="prompt" style={{
            fontSize: 28, fontWeight: 600, letterSpacing: -0.5,
            color: mode === "ghost" ? "var(--ink-3)" : "var(--ink)",
            opacity: mode === "ghost" ? 0.55 : 1,
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 18,
          }}>
            {l.abbr}
            <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-left { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @keyframes marquee-right { from { transform: translateX(-33.33%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}

// ---------- Hook: rotating video gallery (auto-cycles which tile is featured) ----------
function useRotatingFeature(items, interval = 3200, paused = false) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval, paused]);
  return [idx, setIdx];
}

// ---------- Animated counter ----------
function useCountUp(target, duration = 1800, start = 0) {
  const [v, setV] = useState(start);
  useEffect(() => {
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(start + (target - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return v;
}

// ---------- Reveal on scroll ----------
function Reveal({ children, delay = 0, y = 24, animLevel = "vibing" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    if (animLevel === "off") { setV(true); return; }
    const el = ref.current;
    if (!el) { setV(true); return; }
    // Fallback: always reveal after a short delay regardless of IO support
    const fallback = setTimeout(() => setV(true), 900);
    let io;
    try {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setV(true); io.disconnect(); clearTimeout(fallback); }
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      io.observe(el);
    } catch (e) {
      setV(true);
    }
    // also reveal immediately if already in viewport at mount
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setV(true);
    });
    return () => { clearTimeout(fallback); if (io) io.disconnect(); };
  }, [animLevel]);
  const dur = animLevel === "off" ? "0ms" : animLevel === "soft" ? "700ms" : "900ms";
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity ${dur} ${delay}ms cubic-bezier(.2,.7,.2,1), transform ${dur} ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      willChange: "opacity, transform",
    }}>{children}</div>
  );
}

// ---------- Stars row ----------
function Stars({ n = 5, color = "var(--orange)", size = 14 }) {
  return (
    <div style={{ display: "inline-flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? color : "transparent"} stroke={color} strokeWidth={i < n ? 0 : 1.5}>
          <path d="M12 2.5l2.9 6.2 6.6.9-4.9 4.7 1.3 6.7L12 17.8 6.1 21l1.3-6.7-4.9-4.7 6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

// ---------- Hook: responsive breakpoints ----------
function useResponsive() {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return { isMobile: false, isTablet: false, w: 1440 };
    const w = window.innerWidth;
    return { isMobile: w < 768, isTablet: w < 1024, w };
  });
  useEffect(() => {
    const on = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 768, isTablet: w < 1024, w });
    };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return bp;
}

// ---------- AppMockup: real Uvibes app screens, tastefully framed ----------
function AppMockup({ anim = "vibing", showRipples = true, showChips = true, scale = 1 }) {
  const on = anim !== "off";
  const { isMobile } = useResponsive();
  const size = isMobile ? 280 * scale : 460 * scale;
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", maxWidth: size }}>
      {/* concentric vibration ripples behind */}
      {showRipples && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              position: "absolute",
              width: size * 0.75, height: size * 0.75, borderRadius: "50%",
              border: "1.5px solid",
              borderColor: i % 2 === 0 ? "rgba(253,110,0,.55)" : "rgba(217,10,92,.5)",
              animation: on ? `am-ripple 4s ${i * 1}s ease-out infinite` : "none",
              opacity: 0,
            }} />
          ))}
          <style>{`
            @keyframes am-ripple {
              0% { transform: scale(.55); opacity: .9; border-width: 2px; }
              80% { opacity: 0; }
              100% { transform: scale(2.1); opacity: 0; border-width: .5px; }
            }
          `}</style>
        </div>
      )}
      {/* glow halo */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(253,110,0,.32), rgba(217,10,92,.18) 60%, transparent 80%)",
        filter: "blur(28px)",
        animation: on ? "am-glow 5s ease-in-out infinite" : "none",
        pointerEvents: "none",
      }} />
      <style>{`@keyframes am-glow { 0%,100% { transform: scale(1); opacity: .9 } 50% { transform: scale(1.08); opacity: 1 } }`}</style>

      {/* the actual mockup image */}
      <img
        src="assets/mockup-home.webp"
        alt="Aperçu de l'app Uvibes"
        style={{
          position: "relative", zIndex: 2, width: size, height: "auto",
          filter: "drop-shadow(0 30px 50px rgba(26,23,21,.18))",
          animation: on ? "am-float 7s ease-in-out infinite" : "none",
        }}
      />
      <style>{`@keyframes am-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }`}</style>

      {/* floating chips around — only on desktop to avoid clutter */}
      {showChips && !isMobile && (
        <React.Fragment>
          <div style={{ position: "absolute", left: "-8%", top: "32%", zIndex: 3, padding: "10px 14px", borderRadius: 999, background: "var(--paper)", color: "var(--ink)", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 18px 40px -16px rgba(26,23,21,.25)", border: "1px solid rgba(26,23,21,.06)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: "#22c55e", boxShadow: on ? "0 0 0 4px rgba(34,197,94,.18)" : "none" }} />
            <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>3 142 conversations live</span>
          </div>
          <div style={{ position: "absolute", right: "-6%", top: "8%", zIndex: 3, padding: "10px 14px", borderRadius: 14, background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff", boxShadow: "0 18px 40px -14px rgba(217,10,92,.55)", transform: "rotate(4deg)" }}>
            <div className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.4, opacity: .9 }}>+ 17 VIBES</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>Bonjour Thomas 👋</div>
          </div>
          <div style={{ position: "absolute", right: "-4%", bottom: "12%", zIndex: 3, padding: "10px 14px", borderRadius: 14, background: "var(--paper)", color: "var(--ink-2)", boxShadow: "0 18px 40px -16px rgba(26,23,21,.2)", border: "1px solid rgba(26,23,21,.06)", maxWidth: 200, transform: "rotate(-3deg)" }}>
            <div className="roboto-mono" style={{ fontSize: 10, color: "var(--rose)", letterSpacing: 1.4 }}>EN COURS · 04:59</div>
            <div className="instrument" style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.25, marginTop: 4, color: "var(--ink-2)" }}>« Un personnage de film qui t'inspire ? »</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Object.assign(window, {
  COPY, VibrationLine, Logo, PhoneMock, VideoTile, LogosMarquee,
  useRotatingFeature, useCountUp, Reveal, Stars, useResponsive, AppMockup,
});
