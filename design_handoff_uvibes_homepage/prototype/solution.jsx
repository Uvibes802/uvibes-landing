// Page /solution — direction "Vibration éditoriale"
// 4 onglets sticky : Pour qui ? / Comment ça marche ? / Avantages / Nos offres

const SOLUTION = {
  hero: {
    eyebrow: "La solution Uvibes",
    title: ["La solution", "pour votre", "collectif"],
    sub: "Découvrez comment Uvibes s'adapte à votre contexte et choisissez l'offre qui vous correspond.",
    metric: { value: "12 480+", label: "membres actifs" },
    metric2: { value: "80+", label: "organisations" }
  },
  tabs: [
  { id: "pour-qui", label: "Pour qui ?", n: "01" },
  { id: "comment", label: "Comment ça marche ?", n: "02" },
  { id: "avantages", label: "Avantages", n: "03" },
  { id: "offres", label: "Nos offres", n: "04" }],


  // ── Tab 1 ──
  profiles: {
    categories: ["Tout", "Professionnel", "Éducation", "Communauté", "Sport"],
    items: [
    { name: "Étudiants", cat: ["Éducation"], desc: "Faciliter l'intégration sur le campus, briser les silos entre filières.",
      tag: "Université de Perpignan", icon: "🎓",
      bg: "linear-gradient(155deg, #FD6E00, #ffa15c)", fg: "#fff" },
    { name: "Entreprise", cat: ["Professionnel"], desc: "Retisser le lien post-télétravail, fédérer plusieurs sites.",
      tag: "Groupe industriel · 1200 col.", icon: "🏢",
      bg: "var(--ink)", fg: "var(--cream)" },
    { name: "Sport", cat: ["Sport", "Communauté"], desc: "Souder un collectif inter-générationnel autour du club.",
      tag: "Club rugby régional", icon: "🏉",
      bg: "linear-gradient(155deg, #D90A5C, #ff7eb1)", fg: "#fff" },
    { name: "Associations", cat: ["Communauté"], desc: "Fidéliser des bénévoles dispersés sur plusieurs antennes.",
      tag: "Eklore · 320 bénévoles", icon: "✸",
      bg: "var(--paper)", fg: "var(--ink)" },
    { name: "Seniors", cat: ["Communauté"], desc: "Garder du lien hors des temps formels, format doux et court.",
      tag: "MGEN solidarité", icon: "❀",
      bg: "var(--cream-3)", fg: "var(--ink)" },
    { name: "Loisirs", cat: ["Communauté"], desc: "Rapprocher les adhérents au sein de réseaux de clubs locaux.",
      tag: "Fête des voisins", icon: "✺",
      bg: "linear-gradient(155deg, #FD6E00, #D90A5C)", fg: "#fff" }]

  },

  // ── Tab 2 ──
  how: {
    steps: [
    { n: "01", title: "Paramétrez votre expérience", body: "Choisissez vos thématiques, votre durée d'échange, votre rythme. Quelques minutes suffisent.", time: "≈ 6 min" },
    { n: "02", title: "Vos membres se rencontrent en vidéo", body: "Des conversations one-to-one de 2 à 3 minutes, guidées par des questions adaptées à la thématique.", time: "2–3 min / échange" },
    { n: "03", title: "Recueillez des données utiles", body: "À l'issue de chaque échange, des micro-enquêtes alimentent votre dashboard. Pas de rapport de 40 pages.", time: "Dashboard live" }],

    features: [
    { icon: "🎯", title: "Matching intelligent", body: "Pondère par fréquence de rencontre, ancienneté, équipe ou tout critère que vous choisissez." },
    { icon: "💬", title: "Questions guidées", body: "Un catalogue de 200+ relances calibrées par thématique. Vous pouvez aussi ajouter les vôtres." },
    { icon: "📊", title: "Dashboard temps réel", body: "Pulse hebdo, sentiment, taux de participation, retours libres anonymisés." },
    { icon: "🔒", title: "RGPD & SSO", body: "Hébergement EU. SSO Microsoft/Google. Anonymisation paramétrable. DPA fourni." },
    { icon: "📅", title: "Calendrier flexible", body: "Session unique, série hebdo, déclencheur à l'arrivée d'un nouveau membre — vous décidez." },
    { icon: "🌍", title: "Multi-langue", body: "FR / EN / ES out of the box. Question banks traduites et adaptées." }]

  },

  // ── Tab 3 ──
  advantages: [
  { icon: "☀", title: "Optimisme", body: "Des échanges qui font du bien et donnent envie de revenir." },
  { icon: "✦", title: "Flexibilité", body: "À votre rythme, selon vos envies et disponibilités." },
  { icon: "✺", title: "Énergie", body: "Rechargez-vous au contact de personnes motivantes." },
  { icon: "✷", title: "Pensée critique", body: "Des points de vue nouveaux, hors de votre silo habituel." },
  { icon: "❉", title: "Adaptation", body: "Apprenez à vous sentir à l'aise avec de nouvelles personnes." },
  { icon: "❀", title: "Bien-être", body: "Sentez-vous reconnu et ancré dans votre collectif." }],


  // ── Tab 4 ──
  pricing: [
  {
    id: "decouverte",
    name: "Découverte",
    price: "Gratuit",
    period: "à vie",
    desc: "Pour tester Uvibes en équipe restreinte.",
    cta: "Démarrer maintenant",
    featured: false,
    features: [
    "Jusqu'à 25 membres",
    "1 thématique active",
    "Échanges illimités",
    "Dashboard basique",
    "Support communauté"],

    notIncluded: ["Personnalisation visuelle", "SSO", "Export données"]
  },
  {
    id: "essentiel",
    name: "Essentiel",
    price: "4,90€",
    period: "/ membre / mois",
    desc: "Pour les organisations qui veulent du fond, du suivi et un peu d'identité.",
    cta: "Parler à un conseiller",
    featured: true,
    badge: "Populaire",
    features: [
    "Membres illimités",
    "Thématiques illimitées",
    "Dashboard avancé + exports",
    "Personnalisation logo/couleurs",
    "Banque de questions étendue",
    "Support email · 24h"],

    notIncluded: ["SSO entreprise", "DPA dédié"]
  },
  {
    id: "organisation",
    name: "Organisation",
    price: "Sur devis",
    period: "",
    desc: "Pour les structures avec besoin de sécurité, intégration, accompagnement.",
    cta: "Planifier un appel",
    featured: false,
    features: [
    "Tout Essentiel +",
    "SSO Microsoft / Google",
    "Hébergement dédié EU",
    "DPA & audit sécurité",
    "Onboarding sur-mesure",
    "Customer Success dédié",
    "SLA 99,9%"],

    notIncluded: []
  }],


  partners: [
  { abbr: "UPVD" }, { abbr: "Eklore." }, { abbr: "FDV" }, { abbr: "MGEN" },
  { abbr: "INSA" }, { abbr: "Mtp" }, { abbr: "CNRS" }, { abbr: "AFEV" }]

};

const { useState, useEffect, useRef } = React;

// ── Nav ─────────────────────────────────────────────────────────────────
function SolutionNav({ scrolled }) {
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);
  const links = [
    { label: "Bienvenue", href: "Bienvenue.html" },
    { label: "La solution", href: "#", active: true },
    { label: "À propos", href: "#" },
    { label: "Blog", href: "#" },
  ];
  return (
    <React.Fragment>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "12px 32px" : "20px 40px",
        transition: "all 400ms cubic-bezier(.2,.7,.2,1)",
        background: scrolled || open ? "rgba(243,237,227,.92)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: scrolled || open ? "1px solid rgba(26,23,21,.08)" : "1px solid transparent",
        color: "var(--ink)"
      }}>
        <a href="Bienvenue.html" style={{ textDecoration: "none" }}>
          <Logo />
        </a>
        {!isMobile &&
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {links.map((it, i) =>
            <a key={i} href={it.href} style={{ textDecoration: "none", color: "var(--ink)", position: "relative" }}>
              {it.label}
              {it.active && <span style={{ position: "absolute", left: 0, right: 0, bottom: -6, height: 2, background: "var(--orange)" }} />}
            </a>
            )}
          </div>
        }
        {!isMobile ?
        <button className="btn btn-brand">
            Essayer gratuitement
            <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} />
          </button> :
        <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} style={{
          width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(26,23,21,.15)",
          background: open ? "var(--ink)" : "rgba(250,246,239,.7)", color: open ? "var(--paper)" : "var(--ink)",
          display: "grid", placeItems: "center", padding: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ?
            <React.Fragment><path d="M6 6l12 12" /><path d="M18 6L6 18" /></React.Fragment> :
            <React.Fragment><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></React.Fragment>
            }
            </svg>
          </button>
        }
      </nav>
      {isMobile &&
      <div style={{
        position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 59,
        background: "var(--cream)", padding: "24px 20px 40px",
        transform: open ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 360ms cubic-bezier(.2,.7,.2,1)",
        display: "flex", flexDirection: "column", gap: 4
      }}>
          {links.map((it, i) =>
        <a key={i} href={it.href} onClick={() => setOpen(false)} style={{
          textDecoration: "none", color: "var(--ink)", fontFamily: "Prompt", fontWeight: 700,
          fontSize: 32, letterSpacing: -1, padding: "14px 0",
          borderBottom: "1px dashed rgba(26,23,21,.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
              <span>{it.label}</span>
              {it.active && <span style={{ width: 10, height: 10, borderRadius: 10, background: "var(--orange)" }} />}
            </a>
        )}
          <button className="btn btn-gradient" style={{ marginTop: 28, padding: "18px 24px", justifyContent: "center", fontSize: 16 }}>
            Essayer gratuitement →
          </button>
        </div>
      }
    </React.Fragment>);

}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero({ anim }) {
  const on = anim !== "off";
  return (
    <section style={{
      position: "relative", paddingTop: 140, paddingBottom: 90,
      background: "var(--cream)",
      color: "var(--ink)", overflow: "hidden"
    }}>
      {/* large vibration line top */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, opacity: .45 }}>
        <VibrationLine width={1600} height={120} amplitude={28} freq={5} stroke="var(--orange)" strokeWidth={1.4} animated={on} speed={22} />
      </div>
      {/* gradient blob right */}
      <div aria-hidden style={{
        position: "absolute", top: -100, right: -200, width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(253,110,0,.45), transparent 70%)",
        filter: "blur(28px)",
        animation: on ? "hero-blob 24s ease-in-out infinite" : "none"
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: -120, left: "30%", width: 540, height: 540, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(217,10,92,.4), transparent 70%)",
        filter: "blur(24px)",
        animation: on ? "hero-blob-2 32s ease-in-out infinite" : "none"
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: -100, width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(253,110,0,.28), transparent 70%)",
        filter: "blur(22px)",
        animation: on ? "hero-blob 30s ease-in-out infinite" : "none"
      }} />
      <style>{`
        @keyframes hero-blob { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-40px,30px) scale(1.08) } }
        @keyframes hero-blob-2 { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,-40px) scale(.94) } }
      `}</style>

      <div style={{ position: "relative", padding: "0 56px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 50, alignItems: "center" }} data-grid="2col">
        <div>
          <Reveal animLevel={anim}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", borderRadius: 999, background: "rgba(250,246,239,.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(26,23,21,.1)", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "var(--orange)", boxShadow: on ? "0 0 0 4px rgba(253,110,0,.18)" : "none" }} />
              <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink-3)" }}>{SOLUTION.hero.eyebrow}</span>
            </div>
          </Reveal>
          <h1 className="prompt-display" style={{
            margin: 0, fontSize: "clamp(56px, 8vw, 132px)", lineHeight: .9
          }}>
            <Reveal animLevel={anim} delay={0}><span>La solution</span></Reveal>
            <Reveal animLevel={anim} delay={120}><span style={{ display: "block" }}>pour votre</span></Reveal>
            <Reveal animLevel={anim} delay={240}>
              <span style={{ display: "block", position: "relative" }}>
                <span className="instrument" style={{ fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.03em", background: "linear-gradient(90deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>collectif.</span>
                <svg viewBox="0 0 480 30" style={{ position: "absolute", left: -6, bottom: -2, width: "60%", height: 30, opacity: .8 }}>
                  <path d="M5 22 Q 110 4 220 16 T 455 12" fill="none" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </Reveal>
          </h1>
          <Reveal animLevel={anim} delay={360}>
            <p style={{ marginTop: 28, maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: "var(--ink-3)" }}>
              {SOLUTION.hero.sub}
            </p>
          </Reveal>
          <Reveal animLevel={anim} delay={460}>
            <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn btn-gradient" style={{ padding: "16px 24px", fontSize: 15 }}>
                Voir nos offres
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="btn" style={{ padding: "16px 24px", fontSize: 15, background: "rgba(250,246,239,.7)", color: "var(--ink)", border: "1.5px solid var(--ink)", backdropFilter: "blur(8px)" }}>
                Étudions votre projet
              </button>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={580}>
            <div style={{ marginTop: 48, display: "flex", gap: 40 }}>
              {[SOLUTION.hero.metric, SOLUTION.hero.metric2].map((m, i) =>
              <div key={i}>
                  <div className="prompt-display" style={{ fontSize: 40, lineHeight: 1, color: i === 0 ? "var(--orange)" : "var(--rose)" }}>{m.value}</div>
                  <div className="roboto-mono" style={{ marginTop: 6, fontSize: 11, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase" }}>{m.label}</div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Phone mockup with real Uvibes app screens */}
        <Reveal animLevel={anim} delay={300}>
          <div style={{ position: "relative", justifySelf: "center" }}>
            <AppMockup anim={anim} />
          </div>
        </Reveal>
      </div>

      {/* large vibration line bottom */}
      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, opacity: .35 }}>
        <VibrationLine width={1600} height={80} amplitude={16} freq={14} stroke="var(--rose)" strokeWidth={1} animated={on} speed={18} />
      </div>
    </section>);

}

// ── Sticky tabs ──────────────────────────────────────────────────────────
function StickyTabs({ active, setActive, anim }) {
  const [pinned, setPinned] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const sentinel = ref.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => {
      setPinned(!e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: [0, 1] });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);
  return (
    <React.Fragment>
      <div ref={ref} style={{ height: 1 }} />
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: pinned ? "rgba(243,237,227,.92)" : "var(--cream)",
        backdropFilter: pinned ? "blur(14px)" : "none",
        borderBottom: pinned ? "1px solid rgba(26,23,21,.08)" : "1px solid transparent",
        transition: "all 300ms ease"
      }}>
        <div style={{ display: "flex", padding: "0 56px", overflowX: "auto", gap: 4 }}>
          {SOLUTION.tabs.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  position: "relative", padding: "20px 18px", border: 0, background: "transparent",
                  color: isActive ? "var(--ink)" : "var(--ink-4)",
                  fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10,
                  transition: "color 250ms"
                }}>
                
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, opacity: .7 }}>{t.n}</span>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t.label}</span>
                {isActive &&
                <span style={{ position: "absolute", left: 12, right: 12, bottom: 0, height: 3, background: "var(--orange)", borderRadius: 3 }} />
                }
              </button>);

          })}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, paddingRight: 4 }}>
            <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase" }}>
              Section {SOLUTION.tabs.find((t) => t.id === active)?.n} / 04
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>);

}

// ── Tab 1 — Pour qui ? ───────────────────────────────────────────────────
function TabPourQui({ anim }) {
  const [filter, setFilter] = useState("Tout");
  const filtered = filter === "Tout" ?
  SOLUTION.profiles.items :
  SOLUTION.profiles.items.filter((p) => p.cat.includes(filter));
  return (
    <div style={{ padding: "80px 56px 100px" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>01 / pour qui</span>
            <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px, 5vw, 76px)", lineHeight: .95 }}>
              Un outil <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" }}>caméléon</span><br />
              pour chaque collectif.
            </h2>
            <p style={{ marginTop: 18, fontSize: 17, color: "var(--ink-3)", lineHeight: 1.55, maxWidth: 540 }}>
              Uvibes s'adapte au vocabulaire, aux rituels et au rythme de votre organisation. Six contextes typiques, mais la vraie réponse vient toujours d'une conversation.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal animLevel={anim} delay={100}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32, paddingTop: 24, borderTop: "1px dashed rgba(26,23,21,.18)" }}>
          {SOLUTION.profiles.categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: "10px 18px", borderRadius: 999, border: 0,
                background: isActive ? "var(--ink)" : "transparent",
                color: isActive ? "var(--cream)" : "var(--ink)",
                fontWeight: 500, fontSize: 13,
                border: isActive ? "1px solid var(--ink)" : "1px solid rgba(26,23,21,.15)",
                transition: "all 240ms"
              }}>{cat}</button>);

          })}
          <span className="roboto-mono" style={{ marginLeft: "auto", alignSelf: "center", fontSize: 11, color: "var(--ink-4)", letterSpacing: 1.4, textTransform: "uppercase" }}>
            {filtered.length} profil{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </Reveal>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} data-grid="3col">
        {filtered.map((p, i) =>
        <Reveal key={p.name} animLevel={anim} delay={i * 70}>
            <ProfileCard p={p} idx={i} anim={anim} />
          </Reveal>
        )}
      </div>
    </div>);

}

function ProfileCard({ p, idx, anim }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", padding: 26, borderRadius: 24,
        background: p.bg, color: p.fg,
        minHeight: 340, overflow: "hidden",
        transition: "transform 500ms cubic-bezier(.2,.7,.2,1), box-shadow 500ms",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? "0 30px 60px -28px rgba(0,0,0,.4)" : "0 12px 30px -20px rgba(0,0,0,.2)",
        cursor: "pointer", display: "flex", flexDirection: "column"
      }}>
      
      {/* deco vibration in corner */}
      <div style={{ position: "absolute", top: 14, right: 14, opacity: .35 }}>
        <VibrationLine width={100} height={32} amplitude={6} freq={5} stroke={p.fg} strokeWidth={1} animated={anim !== "off"} speed={14 + idx} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", opacity: .85, padding: "5px 10px", borderRadius: 999, background: p.fg === "#fff" || p.fg === "var(--cream)" ? "rgba(255,255,255,.18)" : "rgba(26,23,21,.08)", border: `1px solid ${p.fg === "#fff" || p.fg === "var(--cream)" ? "rgba(255,255,255,.22)" : "rgba(26,23,21,.15)"}` }}>
          Profil 0{idx + 1}
        </span>
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
        <h3 className="prompt" style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
          {p.name}
        </h3>
        <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, opacity: .92, maxWidth: 280 }}>{p.desc}</p>
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${p.fg === "#fff" || p.fg === "var(--cream)" ? "rgba(255,255,255,.35)" : "rgba(26,23,21,.22)"}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="roboto-mono" style={{ fontSize: 11, opacity: .8, letterSpacing: 1 }}>{p.tag}</span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: 13,
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 280ms"
          }}>Voir le cas →</span>
        </div>
      </div>
    </div>);

}

// ── Tab 2 — Comment ça marche ? ─────────────────────────────────────────
function TabComment({ anim }) {
  return (
    <div style={{ padding: "80px 56px 100px" }}>
      {/* Sub-section 1 : Fonctionnement */}
      <Reveal animLevel={anim}>
        <div style={{ marginBottom: 60 }}>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase" }}>02 / fonctionnement</span>
          <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: .95 }}>
            Trois <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" }}>étapes,</span><br />
            pas une de plus.
          </h2>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, position: "relative", marginBottom: 100 }} data-grid="3col">
        {/* connector */}
        <svg style={{ position: "absolute", top: 50, left: "10%", right: "10%", width: "80%", height: 40, opacity: .55, zIndex: 0 }} viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 20 Q 200 -10 400 20 T 800 20 T 1200 20" fill="none" stroke="var(--rose)" strokeWidth="2" strokeDasharray="4 6" />
        </svg>
        {SOLUTION.how.steps.map((s, i) =>
        <Reveal key={i} animLevel={anim} delay={i * 140}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
              width: 100, height: 100, borderRadius: 100, background: "var(--paper)",
              border: "1.5px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 26, position: "relative"
            }}>
                <span className="prompt-display" style={{ fontSize: 38, color: "var(--ink)" }}>{s.n}</span>
                {anim !== "off" &&
              <span style={{
                position: "absolute", inset: -8, border: "1px dashed var(--rose)", borderRadius: 999,
                animation: "ring-spin 40s linear infinite", opacity: .5
              }} />
              }
              </div>
              <h3 className="prompt" style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 320 }}>{s.title}</h3>
              <p style={{ marginTop: 12, color: "var(--ink-3)", fontSize: 15, lineHeight: 1.55, maxWidth: 360 }}>{s.body}</p>
              <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "var(--cream-2)" }}>
                <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} />
                <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{s.time}</span>
              </div>
            </div>
          </Reveal>
        )}
        <style>{`@keyframes ring-spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
      </div>

      {/* Sub-section 2 : Fonctionnalités */}
      <Reveal animLevel={anim}>
        <div style={{ marginBottom: 32, paddingTop: 50, borderTop: "1px dashed rgba(26,23,21,.18)" }}>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>02 / fonctionnalités</span>
          <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1 }}>
            Ce que vous trouverez<br />
            <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" }}>dans la boîte.</span>
          </h2>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(26,23,21,.12)", borderRadius: 28, overflow: "hidden", background: "var(--paper)" }} data-grid="3col">
        {SOLUTION.how.features.map((f, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <Reveal key={i} animLevel={anim} delay={i * 60}>
              <div style={{
                padding: 28, minHeight: 220,
                borderRight: col < 2 ? "1px dashed rgba(26,23,21,.12)" : "none",
                borderBottom: row < 1 ? "1px dashed rgba(26,23,21,.12)" : "none",
                position: "relative"
              }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 className="prompt" style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>{f.title}</h3>
                <p style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 14, lineHeight: 1.55 }}>{f.body}</p>
                <span className="roboto-mono" style={{ position: "absolute", top: 16, right: 20, fontSize: 11, color: "var(--ink-4)" }}>0{i + 1}</span>
              </div>
            </Reveal>);

        })}
      </div>
    </div>);

}

// ── Tab 3 — Avantages ────────────────────────────────────────────────────
function TabAvantages({ anim }) {
  const on = anim !== "off";
  return (
    <div style={{ padding: "80px 56px 100px" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "flex-start", marginBottom: 50 }}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>03 / avantages</span>
            <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(44px, 5.4vw, 84px)", lineHeight: .92 }}>
              Six effets,<br />
              ressentis <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" }}>vite.</span>
            </h2>
          </div>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-3)", marginTop: 18, maxWidth: 560 }}>
            Dans la plupart des collectifs, nous n'osons pas toujours engager la conversation et sous-estimons les bénéfices de <strong style={{ color: "var(--orange)", fontWeight: 700 }}>simples échanges entre pairs</strong>. Voici ce qui change, semaine après semaine.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(26,23,21,.15)", borderRadius: 28, overflow: "hidden", background: "var(--paper)" }} data-grid="3col">
        {SOLUTION.advantages.map((a, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <Reveal key={i} animLevel={anim} delay={i * 80}>
              <div style={{
                padding: 32, minHeight: 240, position: "relative", overflow: "hidden",
                borderRight: col < 2 ? "1px dashed rgba(26,23,21,.15)" : "none",
                borderBottom: row < 1 ? "1px dashed rgba(26,23,21,.15)" : "none"
              }}>
                <div style={{ fontSize: 32, color: i % 2 === 0 ? "var(--orange)" : "var(--rose)", marginBottom: 18, fontFamily: "Prompt" }}>{a.icon}</div>
                <h3 className="prompt" style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>{a.title}</h3>
                <p style={{ marginTop: 10, color: "var(--ink-3)", fontSize: 14, lineHeight: 1.55, maxWidth: 280 }}>{a.body}</p>
                <span className="roboto-mono" style={{ position: "absolute", top: 22, right: 26, fontSize: 11, color: "var(--ink-4)" }}>0{i + 1}</span>
                {/* corner vibration */}
                <div style={{ position: "absolute", bottom: 16, right: 16, opacity: .4 }}>
                  <VibrationLine width={90} height={28} amplitude={6} freq={4} stroke={i % 2 === 0 ? "var(--orange)" : "var(--rose)"} strokeWidth={1.2} animated={on} speed={14 + i * 2} />
                </div>
              </div>
            </Reveal>);

        })}
      </div>
    </div>);

}

// ── Tab 4 — Nos offres ───────────────────────────────────────────────────
function TabOffres({ anim }) {
  return (
    <div style={{ padding: "80px 56px 100px" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 30, flexWrap: "wrap" }}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase" }}>04 / nos offres</span>
            <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(44px, 5.4vw, 84px)", lineHeight: .92 }}>
              Trois formules,<br />
              <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em" }}>zéro engagement</span> caché.
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "6px 14px", borderRadius: 999, background: "var(--cream-2)", border: "1px solid rgba(26,23,21,.12)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: "#22c55e" }} />
            <span className="roboto-mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: 1 }}>14 jours d'essai sur Essentiel · sans CB</span>
          </div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, alignItems: "stretch" }} data-grid="3col">
        {SOLUTION.pricing.map((plan, i) =>
        <Reveal key={plan.id} animLevel={anim} delay={i * 120}>
            <PricingCard plan={plan} anim={anim} />
          </Reveal>
        )}
      </div>

      {/* Comparatif court */}
      <Reveal animLevel={anim} delay={400}>
        <div style={{ marginTop: 60, padding: 26, background: "var(--paper)", border: "1px solid rgba(26,23,21,.1)", borderRadius: 24, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 auto", minWidth: 280 }}>
            <h3 className="prompt" style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Pas sûr·e ? On vous guide.
            </h3>
            <p style={{ marginTop: 8, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>
              15 minutes pour comprendre votre contexte, et on vous recommande la formule la plus adaptée. Pas de discours commercial.
            </p>
          </div>
          <button className="btn btn-gradient" style={{ padding: "14px 22px" }}>
            Réserver un créneau →
          </button>
        </div>
      </Reveal>
    </div>);

}

function PricingCard({ plan, anim }) {
  const featured = plan.featured;
  return (
    <div style={{
      position: "relative", padding: 32, borderRadius: 28,
      background: "var(--paper)",
      color: "var(--ink)",
      border: featured ? "1.5px solid var(--orange)" : "1px solid rgba(26,23,21,.1)",
      boxShadow: featured ? "0 30px 60px -28px rgba(217,10,92,.35)" : "0 12px 30px -20px rgba(0,0,0,.15)",
      display: "flex", flexDirection: "column", minHeight: 580,
      transform: featured ? "translateY(-12px)" : "none",
      overflow: "hidden"
    }}>
      {featured &&
      <React.Fragment>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, var(--orange), var(--rose))" }} />
          {/* glow */}
          <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.28), transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
          {/* corner deco vibration */}
          <div style={{ position: "absolute", top: 24, right: 24, opacity: .35 }}>
            <VibrationLine width={120} height={36} amplitude={8} freq={4} stroke="var(--rose)" strokeWidth={1.2} animated={anim !== "off"} speed={16} />
          </div>
        </React.Fragment>
      }
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", color: featured ? "var(--rose)" : "var(--ink-4)" }}>
          {featured ? "Recommandé" : "Plan"}
        </span>
        {plan.badge &&
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", padding: "5px 10px", borderRadius: 999, background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff" }}>
            {plan.badge}
          </span>
        }
      </div>
      <h3 className="prompt-display" style={{ margin: "20px 0 0", fontSize: 40, position: "relative" }}>
        {plan.name}
      </h3>
      <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 6, position: "relative" }}>
        <span className="prompt" style={{
          fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1,
          color: featured ? "transparent" : "var(--ink)",
          background: featured ? "linear-gradient(90deg, var(--orange), var(--rose))" : "none",
          WebkitBackgroundClip: featured ? "text" : "initial",
          backgroundClip: featured ? "text" : "initial",
          WebkitTextFillColor: featured ? "transparent" : "initial"
        }}>
          {plan.price}
        </span>
        {plan.period &&
        <span style={{ fontSize: 14, color: "var(--ink-3)" }}>{plan.period}</span>
        }
      </div>
      <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: 320, position: "relative" }}>{plan.desc}</p>

      <button className="btn" style={{
        marginTop: 22,
        background: featured ? "linear-gradient(90deg, var(--orange), var(--rose))" : "var(--ink)",
        color: featured ? "#fff" : "var(--cream)",
        padding: "14px 18px", justifyContent: "center", width: "100%",
        boxShadow: featured ? "0 14px 36px -14px rgba(217,10,92,.45)" : "none",
        position: "relative"
      }}>
        {plan.cta} →
      </button>

      <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px dashed rgba(26,23,21,.18)", flexGrow: 1, position: "relative" }}>
        <div className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 14 }}>
          Ce qui est inclus
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {plan.features.map((f, i) =>
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, color: "var(--ink-2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={featured ? "var(--orange)" : "var(--ink)"} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{f}</span>
            </li>
          )}
          {plan.notIncluded && plan.notIncluded.map((f, i) =>
          <li key={"x" + i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, color: "var(--ink-4)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
              <span style={{ textDecoration: "line-through" }}>{f}</span>
            </li>
          )}
        </ul>
      </div>
    </div>);

}

// ── Partner marquee ──────────────────────────────────────────────────────
function PartnerCarousel({ anim }) {
  return (
    <section style={{ background: "var(--cream-2)", padding: "60px 0", borderTop: "1px solid rgba(26,23,21,.06)" }}>
      <div style={{ padding: "0 56px", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
        <h3 className="prompt" style={{ margin: 0, fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em" }}>
          <span className="instrument" style={{ fontStyle: "italic" }}>Ils nous</span> font confiance
        </h3>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, color: "var(--ink-4)", textTransform: "uppercase" }}>+ 80 organisations</span>
      </div>
      <LogosMarquee logos={SOLUTION.partners} speed={50} />
    </section>);

}

// ── Final CTA dark ──────────────────────────────────────────────────────
function FinalCTA({ anim }) {
  const on = anim !== "off";
  return (
    <section style={{ position: "relative", padding: "120px 56px", background: "var(--cream-2)", color: "var(--ink)", overflow: "hidden", borderTop: "1px solid rgba(26,23,21,.06)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5, pointerEvents: "none" }}>
        <VibrationLine width={1800} height={400} amplitude={70} freq={4} stroke="var(--orange)" strokeWidth={1.5} animated={on} speed={20} />
      </div>
      <div aria-hidden style={{
        position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(217,10,92,.32), transparent 70%)",
        filter: "blur(28px)",
        animation: on ? "cta-blob 26s ease-in-out infinite" : "none"
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: -120, left: -80, width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(253,110,0,.35), transparent 70%)",
        filter: "blur(28px)",
        animation: on ? "cta-blob 30s ease-in-out infinite reverse" : "none"
      }} />
      <style>{`@keyframes cta-blob { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,30px) scale(1.1) } }`}</style>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "center" }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>Prêt à vibrer ?</span>
            <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(48px, 6.4vw, 108px)", lineHeight: .9 }}>
              Étudions<br />
              votre <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em", background: "linear-gradient(90deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>projet.</span>
            </h2>
            <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: 540 }}>
              30 minutes pour parler de votre collectif, comprendre ce qui coince, et voir comment Uvibes peut aider — sans script de vente.
            </p>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={150}>
          <div style={{ position: "relative" }}>
            <div style={{
              padding: 30, background: "var(--paper)", color: "var(--ink)",
              borderRadius: 28, boxShadow: "0 30px 60px -30px rgba(26,23,21,.25)",
              border: "1px solid rgba(26,23,21,.08)"
            }}>
              <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, color: "var(--rose)", textTransform: "uppercase" }}>Calendly · 30 min</div>
              <h3 className="prompt" style={{ margin: "10px 0 0", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em" }}>Parler à un conseiller</h3>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["Pas de présentation commerciale", "On regarde vos enjeux ensemble", "Démo seulement si pertinent"].map((t, i) =>
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "var(--ink-3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2.5"><path d="M4 12l5 5L20 6" strokeLinecap="round" /></svg>
                    {t}
                  </li>
                )}
              </ul>
              <button className="btn btn-gradient" style={{ width: "100%", justifyContent: "center", marginTop: 22, padding: "16px 18px" }}>
                Réserver mon créneau →
              </button>
              <div className="roboto-mono" style={{ marginTop: 14, fontSize: 11, color: "var(--ink-4)", letterSpacing: 1, textAlign: "center", textTransform: "uppercase" }}>
                ou écrivez à bonjour@uvibes.fr
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ── Footer (compact, raccord avec home) ─────────────────────────────────
function SolutionFooter() {
  return (
    <footer style={{ background: "var(--cream-3)", color: "var(--ink)", padding: "60px 56px 30px", borderTop: "1px solid rgba(26,23,21,.1)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 30, paddingBottom: 30, borderBottom: "1px solid rgba(26,23,21,.18)" }} data-grid="auto">
        <div>
          <Logo color="var(--ink)" />
          <p className="instrument" style={{ fontStyle: "italic", marginTop: 14, fontSize: 22, color: "var(--ink-3)" }}>L'inattendu commence ici.</p>
        </div>
        <div>
          <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 12 }}>Produit</div>
          {["La solution", "Tarifs", "Sécurité", "Changelog"].map((s) => <div key={s} style={{ fontSize: 14, color: "var(--ink-2)", padding: "4px 0" }}>{s}</div>)}
        </div>
        <div>
          <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 12 }}>Ressources</div>
          {["Blog", "Cas clients", "Memento MOOC", "Presse"].map((s) => <div key={s} style={{ fontSize: 14, color: "var(--ink-2)", padding: "4px 0" }}>{s}</div>)}
        </div>
        <div>
          <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 12 }}>Légal</div>
          {["Mentions légales", "CGU", "Confidentialité", "Cookies"].map((s) => <div key={s} style={{ fontSize: 14, color: "var(--ink-2)", padding: "4px 0" }}>{s}</div>)}
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-4)" }}>
        <span>© 2026 Uvibes · Made with love in Perpignan</span>
        <span>L'inattendu commence ici.</span>
      </div>
    </footer>);

}

// ── Tweaks defaults ─────────────────────────────────────────────────────
const DEFAULTS = JSON.parse(document.getElementById("tweak-defaults").textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, ""));

function SolutionApp() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(tweaks.activeTab || "pour-qui");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {setTweak("activeTab", active);}, [active]);

  const anim = tweaks.animation;

  let TabPanel;
  switch (active) {
    case "comment":TabPanel = TabComment;break;
    case "avantages":TabPanel = TabAvantages;break;
    case "offres":TabPanel = TabOffres;break;
    default:TabPanel = TabPourQui;
  }

  return (
    <React.Fragment>
      <SolutionNav scrolled={scrolled} />
      <main data-screen-label="La solution">
        <Hero anim={anim} />
        <StickyTabs active={active} setActive={setActive} anim={anim} />
        <div style={{ background: "var(--cream)", minHeight: 600 }}>
          {/* key forces remount → re-trigger reveals */}
          <div key={active}>
            <TabPanel anim={anim} />
          </div>
        </div>
        <PartnerCarousel anim={anim} />
        <FinalCTA anim={anim} />
      </main>
      <SolutionFooter />

      <TweaksPanel title="Tweaks · La solution">
        <TweakSection label="Animation">
          <TweakRadio
            label="Niveau d'animation"
            value={tweaks.animation}
            onChange={(v) => setTweak("animation", v)}
            options={[
            { value: "off", label: "Off" },
            { value: "soft", label: "Soft" },
            { value: "vibing", label: "Vibing" }]
            } />
          
        </TweakSection>
        <TweakSection label="Onglet">
          <TweakSelect
            label="Aperçu onglet"
            value={active}
            onChange={(v) => setActive(v)}
            options={SOLUTION.tabs.map((t) => ({ value: t.id, label: `${t.n} · ${t.label}` }))} />
          
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<SolutionApp />);