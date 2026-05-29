// Direction A — "Vibration éditoriale"
// Anti-grid, formes fluides, magazine, cream warm.

const A = {};

A.Nav = function ({ scrolled }) {
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  useEffect(() => {if (!isMobile) setOpen(false);}, [isMobile]);
  return (
    <React.Fragment>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "12px 32px" : "20px 40px",
        transition: "all 400ms cubic-bezier(.2,.7,.2,1)",
        background: scrolled || open ? "rgba(243,237,227,.92)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: scrolled || open ? "1px solid rgba(26,23,21,.08)" : "1px solid transparent"
      }}>
        <a href="Bienvenue.html" style={{ textDecoration: "none" }}>
          <Logo />
        </a>
        {!isMobile &&
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {[
          { label: "Bienvenue", href: "Bienvenue.html", active: true },
          { label: "La solution", href: "La solution.html" },
          { label: "À propos", href: "#" },
          { label: "Blog", href: "#" }].
          map((it, i) =>
          <a key={i} href={it.href} style={{ textDecoration: "none", color: "var(--ink)", position: "relative" }}>
                {it.label}
                {it.active && <span style={{ position: "absolute", left: 0, right: 0, bottom: -6, height: 2, background: "var(--orange)" }} />}
              </a>
          )}
          </div>
        }
        {!isMobile ?
        <button style={{
          background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff", border: 0,
          padding: "11px 18px", borderRadius: 999, fontWeight: 600, fontSize: 14,
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: "0 14px 30px -10px rgba(217,10,92,.45)"
        }}>
            Essayer gratuitement
            <span style={{ width: 6, height: 6, borderRadius: 6, background: "#fff" }} />
          </button> :

        <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} style={{
          width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(217,10,92,.25)",
          background: open ? "linear-gradient(135deg, var(--orange), var(--rose))" : "rgba(250,246,239,.7)", color: open ? "#fff" : "var(--rose)",
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
      {/* mobile menu overlay */}
      {isMobile &&
      <div style={{
        position: "fixed", top: 72, left: 0, right: 0, bottom: 0, zIndex: 49,
        background: "var(--cream)", padding: "24px 20px 40px",
        transform: open ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 360ms cubic-bezier(.2,.7,.2,1)",
        display: "flex", flexDirection: "column", gap: 4
      }}>
          {[
        { label: "Bienvenue", href: "Bienvenue.html", active: true },
        { label: "La solution", href: "La solution.html" },
        { label: "À propos", href: "#" },
        { label: "Blog", href: "#" }].
        map((it, i) =>
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
          <button style={{
          marginTop: 28, padding: "18px 24px", borderRadius: 999, border: 0,
          background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff",
          fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: "0 18px 40px -14px rgba(217,10,92,.45)"
        }}>
            Essayer gratuitement
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </button>
        </div>
      }
    </React.Fragment>);

};

A.Hero = function ({ anim }) {
  const on = anim !== "off";
  return (
    <section style={{ position: "relative", paddingTop: 96, paddingBottom: 60, overflow: "hidden", minHeight: "calc(100vh - 0px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* ── Vivid mesh-gradient backdrop ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, #FFF1D6 0%, #FFD8B0 18%, #FFB8A8 38%, #FF98B8 58%, #FF77A8 78%, #FF5894 100%)"
      }}>
        {/* gradient blobs that drift — much more vivid */}
        <div style={{
          position: "absolute", width: 900, height: 900, top: -260, right: -240, borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,176,40,.95), rgba(255,140,20,0) 70%)",
          filter: "blur(24px)",
          animation: on ? "blob-drift-a 22s ease-in-out infinite" : "none"
        }} />
        <div style={{
          position: "absolute", width: 820, height: 820, top: 60, right: 80, borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(253,110,0,.85), rgba(253,110,0,0) 70%)",
          filter: "blur(28px)",
          animation: on ? "blob-drift-b 26s ease-in-out infinite" : "none"
        }} />
        <div style={{
          position: "absolute", width: 720, height: 720, top: 180, left: -180, borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,80,140,.85), rgba(255,80,140,0) 70%)",
          filter: "blur(30px)",
          animation: on ? "blob-drift-c 30s ease-in-out infinite" : "none"
        }} />
        <div style={{
          position: "absolute", width: 560, height: 560, bottom: -140, left: "30%", borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(217,10,92,.8), rgba(217,10,92,0) 70%)",
          filter: "blur(26px)",
          animation: on ? "blob-drift-d 34s ease-in-out infinite" : "none"
        }} />
        <div style={{
          position: "absolute", width: 600, height: 600, top: "40%", left: "42%", borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,200,90,.85), transparent 70%)",
          filter: "blur(32px)",
          animation: on ? "blob-drift-a 28s ease-in-out infinite reverse" : "none"
        }} />
        <div style={{
          position: "absolute", width: 420, height: 420, top: -80, left: "30%", borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,120,180,.75), transparent 70%)",
          filter: "blur(24px)",
          animation: on ? "blob-drift-c 24s ease-in-out infinite" : "none"
        }} />
        <div style={{
          position: "absolute", width: 380, height: 380, bottom: 100, right: 200, borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,160,80,.7), transparent 70%)",
          filter: "blur(22px)",
          animation: on ? "blob-drift-b 32s ease-in-out infinite reverse" : "none"
        }} />
        {/* grain overlay */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .12, mixBlendMode: "multiply" }}>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="1.6" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        {/* dotted grid faint */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px", opacity: .4,
          maskImage: "radial-gradient(ellipse at 60% 40%, #000 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 40%, #000 30%, transparent 70%)"
        }} />
        {/* layered sine waves */}
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .65 }}>
          <defs>
            <linearGradient id="wave-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FD6E00" stopOpacity="0" />
              <stop offset="40%" stopColor="#FFB040" stopOpacity=".95" />
              <stop offset="100%" stopColor="#D90A5C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-b" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D90A5C" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF4D7A" stopOpacity=".85" />
              <stop offset="100%" stopColor="#FD6E00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="none" stroke="url(#wave-a)" strokeWidth="1.8" strokeLinecap="round"
          d="M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300">
            {on && <animate attributeName="d" dur="9s" repeatCount="indefinite"
            values="M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300;
                      M-50 300 Q 200 400 400 300 T 800 300 T 1200 300 T 1650 300;
                      M-50 300 Q 200 200 400 300 T 800 300 T 1200 300 T 1650 300" />

            }
          </path>
          <path fill="none" stroke="url(#wave-b)" strokeWidth="1.4" strokeLinecap="round"
          d="M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360">
            {on && <animate attributeName="d" dur="11s" repeatCount="indefinite"
            values="M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360;
                      M-50 360 Q 250 440 500 360 T 1000 360 T 1500 360 T 1700 360;
                      M-50 360 Q 250 280 500 360 T 1000 360 T 1500 360 T 1700 360" />

            }
          </path>
          <path fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" strokeLinecap="round"
          d="M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420">
            {on && <animate attributeName="d" dur="14s" repeatCount="indefinite"
            values="M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420;
                      M-50 420 Q 180 480 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420;
                      M-50 420 Q 180 360 360 420 T 720 420 T 1080 420 T 1440 420 T 1700 420" />

            }
          </path>
        </svg>
        {/* floating particles */}
        {Array.from({ length: 14 }).map((_, i) => {
          const palette = ["#FD6E00", "#D90A5C", "#FFB040", "#FF5894", "#FF9558"];
          const c = palette[i % palette.length];
          const left = i * 53 % 100;
          const top = (i * 37 + 13) % 100;
          const size = 4 + i % 4 * 2;
          return (
            <div key={i} style={{
              position: "absolute", left: `${left}%`, top: `${top}%`,
              width: size, height: size, borderRadius: 999,
              background: c, opacity: .55,
              boxShadow: `0 0 12px ${c}aa`,
              animation: on ? `particle-${i % 3} ${10 + i % 6 * 2}s ease-in-out infinite` : "none",
              animationDelay: `${i * 0.4}s`
            }} />);

        })}
      </div>
      <style>{`
        @keyframes blob-drift-a { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-40px, 30px) scale(1.08) } }
        @keyframes blob-drift-b { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(50px, -20px) scale(.92) } }
        @keyframes blob-drift-c { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(60px, 40px) scale(1.12) } }
        @keyframes blob-drift-d { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-30px, -50px) scale(1.05) } }
        @keyframes particle-0 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-40px) } }
        @keyframes particle-1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(20px,-30px) } }
        @keyframes particle-2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-15px,25px) } }
      `}</style>

      {/* eyebrow */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 56px", display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span style={{ width: 28, height: 1, background: "var(--ink)" }} />
        <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{COPY.hero.eyebrow}</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(26,23,21,.08)" }}>
          <span style={{ width: 7, height: 7, borderRadius: 7, background: "#22c55e", boxShadow: on ? "0 0 0 4px rgba(34,197,94,.18)" : "none", animation: on ? "pulse 1.8s ease-in-out infinite" : "none" }} />
          <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>3 142 conversations en cours</span>
        </span>
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }`}</style>

      <div style={{ position: "relative", zIndex: 1, padding: "0 56px", display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 40, alignItems: "center" }} data-grid="2col">
        <div>
          <h1 style={{ margin: 0, fontFamily: "Prompt", fontWeight: 700, fontSize: "clamp(56px, 7.5vw, 116px)", lineHeight: .92, letterSpacing: -3 }}>
            <Reveal animLevel={anim} delay={0}>
              <span>Activez la</span>
            </Reveal>
            <Reveal animLevel={anim} delay={120}>
              <span style={{ display: "inline-block", position: "relative" }}>
                <span className="instrument" style={{ fontWeight: 400, fontStyle: "italic", letterSpacing: -2 }}>puissance</span>
                <svg viewBox="0 0 460 30" style={{ position: "absolute", left: -10, bottom: -6, width: "110%", height: 30 }}>
                  <path d="M5 22 Q 110 4 220 16 T 455 12" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              <span>de votre</span>
            </Reveal>
            <Reveal animLevel={anim} delay={240}>
              <span style={{ color: "var(--rose)" }}> collectif.</span>
            </Reveal>
          </h1>
          <Reveal animLevel={anim} delay={360}>
            <p style={{ marginTop: 28, maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)" }}>
              {COPY.hero.sub} <strong style={{ color: "var(--orange)", fontWeight: 700 }}>L'outil digital</strong> qui crée les bons échanges, <strong style={{ color: "var(--rose)", fontWeight: 700 }}>au bon moment</strong>.
            </p>
          </Reveal>
          <Reveal animLevel={anim} delay={460}>
            <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button style={{
                background: "linear-gradient(90deg, var(--orange), var(--rose))",
                color: "#fff", border: 0,
                padding: "16px 24px", borderRadius: 999, fontSize: 15, fontWeight: 600,
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: "0 18px 40px -14px rgba(217,10,92,.5)"
              }}>
                {COPY.hero.ctaPrimary}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button style={{
                background: "rgba(255,255,255,.55)", color: "var(--ink)", border: "1px solid rgba(26,23,21,.2)",
                padding: "16px 24px", borderRadius: 999, fontSize: 15, fontWeight: 500,
                backdropFilter: "blur(8px)"
              }}>
                {COPY.hero.ctaSecondary}
              </button>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={580}>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex" }}>
                {["#FD6E00", "#D90A5C", "#ff9558", "#ffadc7"].map((c, i) =>
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 32, background: c,
                  border: "2px solid var(--cream)", marginLeft: i ? -10 : 0
                }} />
                )}
              </div>
              <div className="roboto-mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>
                12 480 + utilisateurs<br />
                <span style={{ color: "var(--ink-3)" }}>en France & Belgique · 2026</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          {/* sound bar EQ visualizer to the left of phone */}
          <div className="hide-mobile" style={{ position: "absolute", left: -30, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "flex-end", gap: 4, height: 80, zIndex: 2 }}>
            {[0, 1, 2, 3, 4, 5].map((i) =>
            <div key={i} style={{
              width: 5, height: 14,
              background: i % 2 ? "var(--rose)" : "var(--orange)",
              borderRadius: 4,
              animation: on ? `eq 1.${i + 2}s ease-in-out infinite` : "none",
              animationDelay: `${i * .12}s`,
              transformOrigin: "bottom"
            }} />
            )}
            <style>{`@keyframes eq { 0%,100% { transform: scaleY(.4) } 50% { transform: scaleY(2.4) } }`}</style>
          </div>

          <AppMockup anim={anim} />
          {/* floating chips */}
          <Reveal animLevel={anim} delay={400}>
            <div style={{ position: "absolute", left: -10, top: 60, padding: "10px 14px", borderRadius: 999,
              background: "var(--paper)", boxShadow: "0 16px 40px -16px rgba(0,0,0,.25)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "#22c55e", boxShadow: "0 0 0 4px rgba(34,197,94,.18)" }} />
              <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>Léa, 28, RH · disponible</span>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={580}>
            <div style={{ position: "absolute", right: -20, bottom: 100, padding: 14, borderRadius: 18,
              background: "var(--rose)", color: "#fff", maxWidth: 200,
              boxShadow: "0 18px 40px -18px rgba(217,10,92,.6)", transform: "rotate(4deg)" }}>
              <div className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.4, opacity: .8 }}>NOUVELLE RENCONTRE</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 4, lineHeight: 1.3 }}>« On bosse au même étage depuis 3 ans. »</div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* big vibration line below hero */}
      <div style={{ position: "relative", zIndex: 1, marginTop: 80, paddingLeft: 56, paddingRight: 56, opacity: .8 }}>
        <VibrationLine stroke="var(--ink)" strokeWidth={1.2} amplitude={18} freq={12} width={1400} height={70} animated={anim !== "off"} speed={anim === "vibing" ? 14 : 28} />
      </div>
    </section>);

};

A.Banner = function ({ anim }) {
  const count = useCountUp(12480, 2200);
  const fillers = COPY.banner.fillers;
  const [phrase, setPhrase] = useState(0);
  useEffect(() => {
    if (anim === "off") return;
    const t = setInterval(() => setPhrase((p) => (p + 1) % fillers.length), 2400);
    return () => clearInterval(t);
  }, [anim]);
  return (
    <section style={{ position: "relative", padding: "60px 0", background: "linear-gradient(90deg, var(--orange) 0%, #ff4d7a 50%, var(--rose) 100%)", color: "#fff", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "0 56px", flexWrap: "wrap" }}>
        <span className="roboto-mono" style={{ fontSize: 13, letterSpacing: 2, color: "#fff", opacity: .9 }}>{COPY.banner.label.toUpperCase()}</span>
        <h2 className="prompt" style={{ margin: 0, fontWeight: 700, fontSize: "clamp(40px, 6vw, 84px)", letterSpacing: -2, lineHeight: 1, color: "#fff" }}>
          {count.toLocaleString("fr-FR")}
          <span style={{ color: "#fff", opacity: .85 }}>+</span>
        </h2>
        <span className="instrument" style={{ fontStyle: "italic", fontSize: "clamp(28px, 3.6vw, 52px)", color: "#fff", opacity: .95, transition: "opacity 300ms" }}>
          {fillers[phrase]}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: "#fff", animation: anim !== "off" ? "pulse 1.6s ease-in-out infinite" : "none" }} />
          <span className="roboto-mono" style={{ fontSize: 12, opacity: .85, color: "#fff" }}>live · synchronisé wordpress</span>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.4; transform:scale(.85) } }`}</style>
    </section>);

};

A.Pillars = function ({ anim }) {
  return (
    <section style={{ padding: "140px 56px", position: "relative" }}>
      <div style={{ maxWidth: 820, marginBottom: 60 }}>
        <Reveal animLevel={anim}>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>{COPY.pillars.kicker}</span>
        </Reveal>
        <Reveal animLevel={anim} delay={120}>
          <h2 className="prompt" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4.4vw, 64px)", fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.05 }}>
            Un seul outil pour <strong style={{ color: "var(--orange)", fontWeight: 800 }}>renforcer votre collectif</strong> et <strong style={{ color: "var(--rose)", fontWeight: 800 }}>guider vos choix stratégiques</strong>.
          </h2>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} data-grid="2col">
        {COPY.pillars.items.map((p, i) =>
        <Reveal key={i} animLevel={anim} delay={i * 140}>
            <div style={{
            position: "relative", padding: 36, borderRadius: 28,
            background: "var(--paper)", border: "1px solid rgba(26,23,21,.08)",
            overflow: "hidden", minHeight: 360
          }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ width: 14, height: 14, borderRadius: 14, background: p.dot, boxShadow: `0 0 0 5px ${p.dot}22` }} />
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink-2)" }}>0{i + 1} / pilier</span>
              </div>
              <h3 className="prompt" style={{ margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: -1, lineHeight: 1 }}>
                {p.title.split(" et ")[0]} <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>et</span> {p.title.split(" et ")[1]}
              </h3>
              <p style={{ marginTop: 18, color: "var(--ink-2)", fontSize: 16, lineHeight: 1.55, maxWidth: 460 }}>{p.body}</p>
              <div style={{ marginTop: 28, display: "flex", alignItems: "flex-end", gap: 16, paddingTop: 24, borderTop: "1px dashed rgba(26,23,21,.15)" }}>
                <div className="prompt" style={{ fontSize: 56, fontWeight: 800, color: p.dot, lineHeight: 1, letterSpacing: -2 }}>{p.stat}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", paddingBottom: 8, maxWidth: 180 }}>{p.statLabel}</div>
              </div>
              {/* sparkle vibration */}
              <div style={{ position: "absolute", right: 24, top: 24, opacity: .35 }}>
                <VibrationLine width={120} height={36} amplitude={8} freq={4} stroke={p.dot} strokeWidth={1.2} animated={anim !== "off"} speed={20} />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

};

A.Enjeux = function ({ anim }) {
  const on = anim !== "off";
  // Each enjeu has its own color identity + an "answer" Uvibes brings.
  const enjeux = [
  { tag: "Entreprise", q: "Comment retisser le lien après le télétravail ?",
    bg: "linear-gradient(135deg, #FD6E00, #ff9558)", fg: "#fff",
    answer: "Des micro-rencontres hebdo entre services, sans réunion forcée.",
    stat: "+38% lien inter-équipes" },
  { tag: "Université", q: "Comment briser l'isolement des nouveaux arrivants ?",
    bg: "linear-gradient(135deg, #D90A5C, #ff5e9c)", fg: "#fff",
    answer: "Buddy aléatoire pré-configuré dès la rentrée, en 3 minutes vidéo.",
    stat: "92% de matchs aboutis" },
  { tag: "Association", q: "Comment fidéliser des bénévoles dispersés ?",
    bg: "linear-gradient(135deg, #ff9558, #D90A5C)", fg: "#fff",
    answer: "Rituels mensuels qui font sentir le collectif, même à distance.",
    stat: "×2 rétention 6 mois" },
  { tag: "Sport", q: "Comment souder un collectif inter-générationnel ?",
    bg: "linear-gradient(135deg, #FD6E00 0%, #D90A5C 100%)", fg: "#fff",
    answer: "Questions partagées qui valent autant pour les U15 que les vétérans.",
    stat: "+47% de mixité d'âge" },
  { tag: "Seniors", q: "Comment garder du lien hors des temps formels ?",
    bg: "var(--paper)", fg: "var(--ink)",
    answer: "Sessions douces, courtes, sans interface compliquée à apprendre.",
    stat: "0 ligne d'aide téléphonique" },
  { tag: "Mairie", q: "Comment écouter sans réunion-marathon ?",
    bg: "var(--cream-3)", fg: "var(--ink)",
    answer: "Pulse hebdo agrégé, lisible sur mobile en moins de 5 minutes.",
    stat: "12× plus de retours qualitatifs" }];

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setActive((a) => (a + 1) % enjeux.length), 3400);
    return () => clearInterval(t);
  }, [on, enjeux.length]);
  const a = enjeux[active];

  return (
    <section style={{ padding: "0 0", position: "relative", overflow: "hidden", background: "var(--cream-2)" }}>
      {/* wave divider top */}
      <svg viewBox="0 0 1600 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80, background: "var(--cream)" }}>
        <path d="M0 80 Q 200 20 400 50 T 800 50 T 1200 50 T 1600 50 L 1600 80 Z" fill="var(--cream-2)" />
      </svg>

      <div style={{ padding: "80px 56px 100px", position: "relative" }}>
        {/* big background word */}
        <div className="prompt" aria-hidden style={{
          position: "absolute", left: -20, top: 40, fontSize: "22vw", fontWeight: 800,
          letterSpacing: -16, lineHeight: 1, color: "rgba(26,23,21,.04)", pointerEvents: "none",
          textTransform: "uppercase"
        }}>enjeux</div>

        {/* header */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, flexWrap: "wrap", gap: 30 }}>
          <Reveal animLevel={anim}>
            <div>
              <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--ink-2)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 8, background: "linear-gradient(135deg, var(--orange), var(--rose))" }} />
                05 / enjeux
              </span>
              <h2 className="prompt" style={{ margin: "16px 0 22px", fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
                Chaque <span className="instrument" style={{
                  fontStyle: "italic", fontWeight: 400,
                  background: "linear-gradient(90deg, var(--orange), var(--rose))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", color: "transparent"
                }}>collectif</span><br />
                a ses enjeux.
              </h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 440 }}>{COPY.enjeux.sub}</p>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={150}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => setActive((a) => (a - 1 + enjeux.length) % enjeux.length)} style={{
                width: 44, height: 44, borderRadius: 999, border: "1.5px solid var(--ink)", background: "transparent", display: "grid", placeItems: "center"
              }} aria-label="précédent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </button>
              <div className="roboto-mono" style={{ fontSize: 12, letterSpacing: 1.4, color: "var(--ink-2)" }}>
                {String(active + 1).padStart(2, "0")} / {String(enjeux.length).padStart(2, "0")}
              </div>
              <button onClick={() => setActive((a) => (a + 1) % enjeux.length)} style={{
                width: 44, height: 44, borderRadius: 999, border: 0, background: "linear-gradient(135deg, var(--orange), var(--rose))", color: "#fff", display: "grid", placeItems: "center"
              }} aria-label="suivant">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* main grid: left answer card + right chips grid */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1.4fr", gap: 28, alignItems: "stretch" }} data-grid="2col">
          {/* LEFT — active answer card with morphing gradient */}
          <Reveal animLevel={anim}>
            <div style={{
              position: "relative", padding: 40, borderRadius: 32,
              background: a.bg, color: a.fg,
              minHeight: 520, overflow: "hidden",
              boxShadow: "0 30px 60px -28px rgba(0,0,0,.35)",
              transition: "background 800ms cubic-bezier(.2,.7,.2,1), color 600ms",
              display: "flex", flexDirection: "column"
            }}>
              {/* moving sparkles inside the card */}
              {on && Array.from({ length: 12 }).map((_, i) =>
              <span key={i} style={{
                position: "absolute",
                left: `${i * 71 % 100}%`, top: `${(i * 47 + 10) % 100}%`,
                width: 3 + i % 3, height: 3 + i % 3, borderRadius: 999,
                background: "rgba(255,255,255,.45)",
                animation: `e-spark 6s ${i * 0.3}s ease-in-out infinite`,
                pointerEvents: "none"
              }} />
              )}
              <style>{`@keyframes e-spark { 0%,100% { opacity: 0; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-12px) } }`}</style>

              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", padding: "5px 10px", borderRadius: 999, background: a.fg === "#fff" ? "rgba(255,255,255,.18)" : "rgba(26,23,21,.1)", border: `1px solid ${a.fg === "#fff" ? "rgba(255,255,255,.22)" : "rgba(26,23,21,.15)"}` }}>
                  Cas {String(active + 1).padStart(2, "0")} · {a.tag}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {enjeux.map((_, i) =>
                  <span key={i} style={{
                    width: i === active ? 22 : 6, height: 6, borderRadius: 999,
                    background: a.fg === "#fff" ? i === active ? "#fff" : "rgba(255,255,255,.4)" : i === active ? "var(--ink)" : "rgba(26,23,21,.3)",
                    transition: "all 400ms"
                  }} />
                  )}
                </div>
              </div>

              <div style={{ position: "relative", marginTop: 36, flexGrow: 1 }}>
                <div className="instrument" style={{ fontStyle: "italic", fontSize: 24, lineHeight: 1.25, opacity: .85 }}>
                  La question
                </div>
                <h3 className="prompt" style={{ margin: "10px 0 0", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.12 }}>
                  « {a.q} »
                </h3>
              </div>

              <div style={{ position: "relative", marginTop: 32 }}>
                <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, opacity: .75, textTransform: "uppercase", marginBottom: 8 }}>
                  → Ce qu'Uvibes apporte
                </div>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45, fontWeight: 500 }}>{a.answer}</p>
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px dashed ${a.fg === "#fff" ? "rgba(255,255,255,.35)" : "rgba(26,23,21,.25)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div className="prompt" style={{ fontWeight: 800, fontSize: 28, letterSpacing: -0.5 }}>{a.stat}</div>
                  <button style={{
                    padding: "10px 16px", borderRadius: 999, border: 0,
                    background: a.fg === "#fff" ? "rgba(255,255,255,.18)" : "var(--ink)",
                    color: a.fg === "#fff" ? "#fff" : "var(--paper)",
                    fontWeight: 600, fontSize: 13,
                    backdropFilter: "blur(8px)"
                  }}>Voir ce cas d'usage →</button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — chip grid, each its own color */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignContent: "stretch" }} data-grid="2col">
            {enjeux.map((c, i) => {
              const isActive = i === active;
              return (
                <Reveal key={i} animLevel={anim} delay={i * 70}>
                  <button onClick={() => setActive(i)} style={{
                    position: "relative", width: "100%", textAlign: "left",
                    padding: "22px 22px 18px", borderRadius: 22, minHeight: 144,
                    background: isActive ? c.bg : "var(--paper)",
                    color: isActive ? c.fg : "var(--ink)",
                    border: isActive ? "1px solid transparent" : "1px solid rgba(26,23,21,.1)",
                    transition: "all 500ms cubic-bezier(.2,.7,.2,1)",
                    transform: isActive ? "translateY(-4px) scale(1.015)" : "translateY(0)",
                    boxShadow: isActive ? "0 20px 50px -20px rgba(0,0,0,.4)" : "0 4px 10px -8px rgba(0,0,0,.08)",
                    cursor: "pointer", overflow: "hidden"
                  }}>
                    {/* highlight wave for active */}
                    {isActive && on &&
                    <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .25, pointerEvents: "none" }}>
                        <path fill="none" stroke={c.fg === "#fff" ? "#fff" : "var(--ink)"} strokeWidth="1" d="M0 60 Q 75 30 150 60 T 300 60">
                          <animate attributeName="d" dur="3.5s" repeatCount="indefinite"
                        values="M0 60 Q 75 30 150 60 T 300 60; M0 60 Q 75 90 150 60 T 300 60; M0 60 Q 75 30 150 60 T 300 60" />
                        </path>
                      </svg>
                    }
                    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", opacity: .8 }}>
                        Cas {String(i + 1).padStart(2, "0")} · {c.tag}
                      </span>
                      <span style={{
                        width: 10, height: 10, borderRadius: 999,
                        background: isActive ? c.fg === "#fff" ? "#fff" : "var(--ink)" : c.bg.includes("gradient") ? "var(--orange)" : c.bg.startsWith("var") ? c.bg : c.bg.split(",")[0].replace("linear-gradient(135deg", "").trim(),
                        boxShadow: isActive ? `0 0 0 4px ${c.fg === "#fff" ? "rgba(255,255,255,.25)" : "rgba(26,23,21,.15)"}` : "none",
                        transition: "all 300ms"
                      }} />
                    </div>
                    <div style={{ position: "relative", fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>
                      {c.q}
                    </div>
                    {isActive &&
                    <div style={{ position: "absolute", right: 16, bottom: 14, opacity: .7 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                      </div>
                    }
                  </button>
                </Reveal>);

            })}
          </div>
        </div>

        {/* CTA row */}
        <Reveal animLevel={anim} delay={300}>
          <div style={{ marginTop: 36, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(90deg, var(--orange), var(--rose))",
              color: "#fff", border: 0, padding: "16px 22px", borderRadius: 999,
              fontWeight: 600, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 16px 40px -14px rgba(217,10,92,.45)"
            }}>
              Trouvez votre cas d'usage
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
            <span className="roboto-mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: 1 }}>
              · ou laissez la rotation décider pour vous
            </span>
          </div>
        </Reveal>
      </div>

      {/* wave divider bottom */}
      <svg viewBox="0 0 1600 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80, background: "var(--cream)" }}>
        <path d="M0 0 Q 200 60 400 30 T 800 30 T 1200 30 T 1600 30 L 1600 0 Z" fill="var(--cream-2)" />
      </svg>
    </section>);

};

A.Trustees = function ({ anim }) {
  const logos = COPY.trustees.logos;
  return (
    <section style={{ padding: "120px 0 130px", background: "linear-gradient(180deg, var(--cream) 0%, #FFE8D0 100%)", position: "relative", overflow: "hidden" }}>
      {/* deco blobs */}
      <div aria-hidden style={{ position: "absolute", top: -100, right: -120, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.25), transparent 70%)", filter: "blur(28px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: -140, left: -100, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,80,140,.22), transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

      {/* heading */}
      <div style={{ position: "relative", padding: "0 56px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, gap: 30, flexWrap: "wrap" }}>
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 8, background: "linear-gradient(135deg, var(--orange), var(--rose))" }} />
              Nos partenaires
            </span>
            <h2 className="prompt" style={{ margin: "16px 0 12px", fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
              <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>Ils avancent</span><br />
              avec nous.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 440, margin: 0 }}>
              Plus de 80 organisations — universités, entreprises, associations, collectivités — utilisent Uvibes pour faire vibrer leur collectif.
            </p>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={120}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <div className="prompt" style={{ fontSize: "clamp(72px, 8vw, 120px)", fontWeight: 800, lineHeight: 1, letterSpacing: -3, background: "linear-gradient(135deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>80+</div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 1.6, color: "var(--ink-2)", textTransform: "uppercase" }}>organisations partenaires</span>
          </div>
        </Reveal>
      </div>

      {/* Big partner grid */}
      <div style={{ padding: "0 56px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }} data-grid="3col">
        {logos.map((l, i) => {
          const tints = [
            { bg: "linear-gradient(135deg, #FFF6EC, #FFE5CC)", border: "rgba(253,110,0,.18)", dot: "var(--orange)" },
            { bg: "linear-gradient(135deg, #FFEDF3, #FFD5E3)", border: "rgba(217,10,92,.18)", dot: "var(--rose)" },
            { bg: "linear-gradient(135deg, #FFEFD8, #FFD8B0)", border: "rgba(255,150,80,.22)", dot: "#FF9558" },
            { bg: "linear-gradient(135deg, #FFE8EE, #FFC2D2)", border: "rgba(255,77,122,.22)", dot: "var(--rose-light)" },
            { bg: "linear-gradient(135deg, #FFF1D6, #FFCC9A)", border: "rgba(255,176,40,.25)", dot: "#FFB040" },
            { bg: "linear-gradient(135deg, #FFE0EC, #FFB8D4)", border: "rgba(217,10,92,.2)", dot: "var(--rose-bright)" },
          ];
          const t = tints[i % tints.length];
          return (
            <Reveal key={i} animLevel={anim} delay={i * 80}>
              <div style={{
                position: "relative", padding: "44px 36px", borderRadius: 28,
                background: t.bg, border: `1.5px solid ${t.border}`,
                minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between",
                transition: "transform 360ms cubic-bezier(.2,.7,.2,1), box-shadow 360ms",
                overflow: "hidden",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 50px -20px rgba(217,10,92,.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                {/* corner badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, color: "var(--ink-2)", textTransform: "uppercase" }}>
                    Partenaire · 0{i + 1}
                  </span>
                  <span style={{ width: 10, height: 10, borderRadius: 10, background: t.dot, boxShadow: `0 0 0 5px ${t.dot}22` }} />
                </div>
                {/* logo lettermark */}
                <div className="prompt" style={{
                  fontSize: 48, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1,
                  background: `linear-gradient(135deg, ${t.dot}, var(--rose))`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  marginTop: 12
                }}>
                  {l.abbr}
                </div>
                {/* full name */}
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${t.border}` }}>
                  <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>{l.name}</div>
                </div>
                {/* decorative wave */}
                <div style={{ position: "absolute", bottom: -10, right: -10, opacity: .25 }}>
                  <VibrationLine width={140} height={48} amplitude={10} freq={4} stroke={t.dot} strokeWidth={1.4} animated={anim !== "off"} speed={22} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* marquee under for variety */}
      <div style={{ marginTop: 24, opacity: .8 }}>
        <LogosMarquee logos={[...logos, ...logos]} speed={45} />
      </div>
    </section>);

};

A.How = function ({ anim }) {
  return (
    <section style={{ padding: "140px 56px", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 80, flexWrap: "wrap", gap: 30 }}>
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase" }}>{COPY.how.eyebrow}</span>
            <h2 className="prompt" style={{ margin: "16px 0 0", fontSize: "clamp(48px, 6vw, 96px)", fontWeight: 700, letterSpacing: -2.5, lineHeight: .95 }}>
              Trois <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>étapes.</span><br />
              <span style={{ color: "var(--rose)" }}>Pas une de plus.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={200}>
          <button style={{
            background: "linear-gradient(90deg, var(--orange), var(--rose))",
            color: "#fff", border: 0,
            padding: "18px 26px", borderRadius: 999, fontWeight: 600, fontSize: 15,
            boxShadow: "0 16px 40px -12px rgba(217,10,92,.45)"
          }}>{COPY.how.cta} →</button>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, position: "relative" }} data-grid="3col">
        {/* connecting wavy line */}
        <svg style={{ position: "absolute", top: 60, left: "8%", right: "8%", width: "84%", height: 40, zIndex: 0, opacity: .55 }} viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 20 Q 150 -10 300 20 T 600 20 T 900 20 T 1200 20" fill="none" stroke="var(--rose)" strokeWidth="2" strokeDasharray="4 6" />
        </svg>
        {COPY.how.steps.map((s, i) =>
        <Reveal key={i} animLevel={anim} delay={i * 150}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
              width: 100, height: 100, borderRadius: 100, background: "var(--paper)",
              border: "1.5px solid var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 28, position: "relative"
            }}>
                <span className="prompt" style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>{s.n}</span>
                <span style={{
                position: "absolute", inset: -8, border: "1px dashed var(--rose)", borderRadius: 999,
                animation: "spin-slow 40s linear infinite", opacity: .5
              }} />
              </div>
              <style>{`@keyframes spin-slow { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
              <h3 className="prompt" style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1.15, maxWidth: 320 }}>{s.title}</h3>
              <p style={{ marginTop: 12, color: "var(--ink-2)", fontSize: 15, lineHeight: 1.55, maxWidth: 360 }}>{s.body}</p>
              <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "var(--cream-2)" }}>
                <span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} />
                <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{s.time}</span>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

};

A.Videos = function ({ anim }) {
  const items = COPY.videos.items;
  const [featured, setFeatured] = useRotatingFeature(items, anim === "off" ? 9999 : 3600, anim === "off");
  return (
    <section style={{ padding: "120px 56px 140px", background: "linear-gradient(160deg, #ffeadc 0%, #ffd0e0 50%, #ffbbd0 100%)", position: "relative", overflow: "hidden", color: "rgb(221, 53, 140)" }}>
      <div style={{ position: "absolute", top: 30, right: -20, opacity: .35 }}>
        <VibrationLine width={900} height={140} amplitude={50} freq={5} stroke="var(--rose)" strokeWidth={1.2} animated={anim !== "off"} speed={20} />
      </div>
      {/* gradient blobs */}
      <div aria-hidden style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.55), transparent 70%)", filter: "blur(28px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: -120, left: -80, width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(217,10,92,.5), transparent 70%)", filter: "blur(28px)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 30, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Stars n={5} color="var(--orange)" size={18} />
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 1.4, opacity: .7 }}>4.9 / 5 · 312 avis</span>
          </div>
          <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(48px, 6vw, 92px)", fontWeight: 700, letterSpacing: -2.5, lineHeight: .95 }}>
            Ils <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>aiment</span><br />
            l'expérience.
          </h2>
        </div>
        <p style={{ maxWidth: 360, fontSize: 16, lineHeight: 1.55, opacity: .8 }}>{COPY.videos.sub}</p>
      </div>

      {/* asymmetric video grid with one big featured */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 18, gridAutoRows: "minmax(220px, auto)" }} data-grid="3col">
        {items.map((it, i) => {
          const isFeatured = i === featured;
          return (
            <div key={i} style={{
              gridColumn: isFeatured ? "span 1" : "span 1",
              gridRow: isFeatured ? "span 2" : "span 1",
              transition: "all 600ms cubic-bezier(.2,.7,.2,1)"
            }}>
              <VideoTile item={it} idx={i} playing={isFeatured} onClick={() => setFeatured(i)} />
              {isFeatured &&
              <div className="instrument" style={{
                marginTop: 14, fontStyle: "italic", fontSize: 22, lineHeight: 1.35, maxWidth: 460,
                color: "var(--ink)", opacity: .92
              }}>
                  « {it.quote} »
                </div>
              }
            </div>);

        })}
      </div>

      {/* written testimonials row — restylé : cartes magazine en gradient */}
      <div style={{ marginTop: 90, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, gap: 20, flexWrap: "wrap" }}>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: "linear-gradient(135deg, var(--orange), var(--rose))" }} />
            Paroles de membres
          </span>
          <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-2)" }}>312 avis vérifiés</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 22, alignItems: "stretch" }} data-grid="3col">
          {COPY.testimonials.map((t, i) => {
            const themes = [
              { bg: "linear-gradient(150deg, #FFB040 0%, #FD6E00 50%, #FF4D7A 100%)", fg: "#fff", border: "transparent", quoteColor: "rgba(255,255,255,.9)", star: "#FFE56B" },
              { bg: "linear-gradient(150deg, #FFFBF4 0%, #FFEDF3 100%)", fg: "var(--ink)", border: "rgba(217,10,92,.18)", quoteColor: "var(--rose)", star: "var(--orange)" },
              { bg: "linear-gradient(150deg, #FFE3B0 0%, #FFC1C1 50%, #FFA0D0 100%)", fg: "var(--ink)", border: "rgba(217,10,92,.12)", quoteColor: "var(--rose-deep)", star: "var(--orange)" }
            ];
            const th = themes[i % themes.length];
            const initials = t.name.split(" ").map(n => n[0]).slice(0, 2).join("");
            return (
              <Reveal key={i} animLevel={anim} delay={i * 140}>
                <div style={{
                  position: "relative", padding: "32px 30px 28px", borderRadius: 28,
                  background: th.bg, color: th.fg,
                  border: th.border !== "transparent" ? `1.5px solid ${th.border}` : "none",
                  height: "100%", display: "flex", flexDirection: "column",
                  boxShadow: i === 0 ? "0 30px 60px -24px rgba(217,10,92,.4)" : "0 18px 40px -22px rgba(217,10,92,.18)",
                  overflow: "hidden",
                  transform: i === 1 ? "translateY(20px)" : "translateY(0)",
                  transition: "transform 400ms cubic-bezier(.2,.7,.2,1)"
                }}>
                  {/* big quote glyph */}
                  <div className="instrument" aria-hidden style={{
                    position: "absolute", top: -20, right: 16, fontSize: 180, lineHeight: 1, fontStyle: "italic",
                    color: th.quoteColor, opacity: i === 0 ? .2 : .12, pointerEvents: "none", fontWeight: 400
                  }}>"</div>

                  {/* sparkles for the featured one */}
                  {i === 0 && anim !== "off" && Array.from({ length: 8 }).map((_, j) => (
                    <span key={j} style={{
                      position: "absolute",
                      left: `${(j * 71 + 8) % 100}%`, top: `${(j * 47 + 20) % 100}%`,
                      width: 3 + j % 3, height: 3 + j % 3, borderRadius: 999,
                      background: "rgba(255,255,255,.65)",
                      animation: `t-spark 5s ${j * 0.4}s ease-in-out infinite`,
                      pointerEvents: "none"
                    }} />
                  ))}
                  <style>{`@keyframes t-spark { 0%,100% { opacity: 0; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-8px) } }`}</style>

                  {/* stars */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 999, background: i === 0 ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.7)", backdropFilter: "blur(6px)", border: i === 0 ? "1px solid rgba(255,255,255,.3)" : "1px solid rgba(217,10,92,.15)", alignSelf: "flex-start" }}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={th.star} stroke="none">
                        <path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z" />
                      </svg>
                    ))}
                    <span className="roboto-mono" style={{ marginLeft: 4, fontSize: 10, letterSpacing: 1, color: i === 0 ? "rgba(255,255,255,.9)" : "var(--ink-2)" }}>5.0</span>
                  </div>

                  {/* quote */}
                  <p className="instrument" style={{
                    position: "relative", marginTop: 22, marginBottom: 0,
                    fontSize: i === 0 ? 24 : 19, lineHeight: 1.35,
                    fontStyle: "italic", fontWeight: 400, fontFamily: "Instrument Serif, serif",
                    color: th.fg, flexGrow: 1
                  }}>
                    « {t.quote} »
                  </p>

                  {/* author */}
                  <div style={{ marginTop: 26, paddingTop: 20, borderTop: `1px ${i === 0 ? "solid rgba(255,255,255,.25)" : "dashed rgba(217,10,92,.2)"}`, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 999,
                      background: i === 0 ? "rgba(255,255,255,.95)" : "linear-gradient(135deg, var(--orange), var(--rose))",
                      color: i === 0 ? "var(--rose)" : "#fff",
                      display: "grid", placeItems: "center",
                      fontFamily: "Prompt", fontWeight: 700, fontSize: 16, letterSpacing: -.5,
                      flexShrink: 0,
                      boxShadow: "0 8px 16px -8px rgba(0,0,0,.2)"
                    }}>
                      {initials}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="prompt" style={{ fontWeight: 700, fontSize: 15, letterSpacing: -.3, color: th.fg }}>{t.name}</div>
                      <div className="roboto-mono" style={{ fontSize: 10, marginTop: 2, opacity: i === 0 ? .85 : .7, color: th.fg, lineHeight: 1.4 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>);

};

A.Advantages = function ({ anim }) {
  return (
    <section style={{ padding: "140px 56px", position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "flex-start", marginBottom: 60 }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>Pourquoi Uvibes</span>
            <h2 className="prompt" style={{ margin: "16px 0 0", fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
              Tout ce dont vous avez <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>besoin,</span><br />
              <span style={{ color: "var(--rose)" }}>rien de superflu.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={120}>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", marginTop: 16, maxWidth: 560 }}>
            {COPY.advantages.sub} Dans de nombreux collectifs, nous n'osons pas toujours engager la conversation et sous-estimons souvent les bénéfices de <strong style={{ color: "var(--orange)", fontWeight: 700 }}>simples échanges entre pairs</strong>.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid rgba(26,23,21,.12)", borderRadius: 28, overflow: "hidden", background: "var(--paper)" }} data-grid="3col">
        {COPY.advantages.items.map((a, i) => {
          const row = Math.floor(i / 3);
          const col = i % 3;
          return (
            <Reveal key={i} animLevel={anim} delay={i * 80}>
              <div style={{
                padding: 32, minHeight: 220,
                borderRight: col < 2 ? "1px dashed rgba(26,23,21,.12)" : "none",
                borderBottom: row < 1 ? "1px dashed rgba(26,23,21,.12)" : "none",
                position: "relative"
              }}>
                <div style={{ fontSize: 32, color: i % 2 === 0 ? "var(--orange)" : "var(--rose)", marginBottom: 14, fontFamily: "Prompt" }}>{a.icon}</div>
                <h3 className="prompt" style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{a.title}</h3>
                <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{a.body}</p>
                <span className="roboto-mono" style={{ position: "absolute", top: 20, right: 24, fontSize: 11, color: "var(--ink-3)" }}>0{i + 1}</span>
              </div>
            </Reveal>);

        })}
      </div>
    </section>);

};

A.Articles = function ({ anim }) {
  return (
    <section style={{ padding: "120px 56px 140px", background: "var(--cream-2)", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, flexWrap: "wrap", gap: 20 }}>
        <div>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--ink-2)", textTransform: "uppercase" }}>{COPY.articles.eyebrow}</span>
          <h2 className="prompt" style={{ margin: "16px 0 0", fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            Nos articles <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>mis en avant.</span>
          </h2>
        </div>
        <a style={{ textDecoration: "underline", textDecorationThickness: 1, textUnderlineOffset: 4, fontWeight: 500 }}>Tous les articles →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 24 }} data-grid="3col">
        {COPY.articles.items.map((a, i) =>
        <Reveal key={i} animLevel={anim} delay={i * 120}>
            <article style={{
            background: "var(--paper)", borderRadius: 24, overflow: "hidden",
            border: "1px solid rgba(26,23,21,.08)", display: "flex", flexDirection: "column",
            transition: "transform 400ms cubic-bezier(.2,.7,.2,1)"
          }}>
              <div style={{
              aspectRatio: i === 0 ? "16/10" : "4/3",
              background: i === 0 ?
              "linear-gradient(135deg, var(--orange), var(--rose))" :
              i === 1 ?
              "linear-gradient(135deg, #ff9558, #ff5e9c)" :
              "linear-gradient(135deg, #ffc8a8, #ffadc7)",
              position: "relative", overflow: "hidden"
            }}>
                <div style={{ position: "absolute", inset: 0, opacity: .5 }}>
                  <VibrationLine width={500} height={300} amplitude={30} freq={i + 4} stroke={"#fff"} strokeWidth={1.2} animated={anim !== "off"} speed={20 + i * 4} />
                </div>
                <div style={{ position: "absolute", top: 18, left: 18, padding: "5px 10px", borderRadius: 999,
                background: "rgba(255,255,255,.85)", color: "var(--ink)", fontFamily: "Roboto Mono, monospace", fontSize: 10, letterSpacing: 1.4, textTransform: "uppercase" }}>
                  {a.cat}
                </div>
              </div>
              <div style={{ padding: 24, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <div className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-3)", display: "flex", gap: 12 }}>
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.readTime} de lecture</span>
                </div>
                <h3 className="prompt" style={{ margin: "12px 0 8px", fontSize: i === 0 ? 28 : 20, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15 }}>{a.title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, marginTop: 4, flexGrow: 1 }}>{a.excerpt}</p>
                <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, fontWeight: 500, fontSize: 14, color: "var(--rose)" }}>
                  Lire l'article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>);

};

A.Contact = function ({ anim }) {
  return (
    <section id="contact" style={{ padding: "140px 56px", position: "relative", overflow: "hidden" }}>
      {/* big organic shape */}
      <svg width="720" height="720" viewBox="0 0 720 720" style={{ position: "absolute", left: -200, bottom: -200, opacity: .9 }}>
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FD6E00" stopOpacity=".22" />
            <stop offset="100%" stopColor="#D90A5C" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <path fill="url(#cg)" d="M360 60 C 560 60 660 240 660 380 C 660 560 480 660 320 660 C 160 660 60 520 60 340 C 60 200 200 60 360 60Z" />
      </svg>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "flex-start" }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>{COPY.contact.eyebrow}</span>
            <h2 className="prompt" style={{ margin: "16px 0 0", fontSize: "clamp(44px, 5.4vw, 80px)", fontWeight: 700, letterSpacing: -2.5, lineHeight: .95 }}>
              Parlons de votre <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>collectif.</span>
            </h2>
            <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 460 }}>{COPY.contact.sub}</p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
              { k: "Email", v: "bonjour@uvibes.fr" },
              { k: "Téléphone", v: "+33 (0)4 11 22 33 44" },
              { k: "Adresse", v: "Perpignan, France · Bruxelles, Belgique" }].
              map((row, i) =>
              <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 12, borderBottom: "1px dashed rgba(26,23,21,.18)" }}>
                  <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: 1.4, textTransform: "uppercase", width: 100 }}>{row.k}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{row.v}</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal animLevel={anim} delay={150}>
          <form onSubmit={(e) => e.preventDefault()} style={{
            padding: 36, borderRadius: 28, background: "var(--paper)",
            border: "1px solid rgba(26,23,21,.1)",
            boxShadow: "0 30px 60px -30px rgba(0,0,0,.2)"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} data-grid="2col">
              {COPY.contact.fields.map((f) =>
              <label key={f.id} style={{ display: "block", gridColumn: f.id === "email" || f.id === "org" ? "span 2" : "span 1" }}>
                  <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-3)", textTransform: "uppercase" }}>
                    {f.label}{f.required && <span style={{ color: "var(--rose)" }}> *</span>}
                  </span>
                  <input type={f.type || "text"} required={f.required} style={{
                  display: "block", width: "100%", marginTop: 6, padding: "12px 0", border: 0, borderBottom: "1.5px solid var(--ink)",
                  background: "transparent", fontFamily: "inherit", fontSize: 16, color: "var(--ink)", outline: "none"
                }} />
                </label>
              )}
            </div>
            <label style={{ display: "block", marginBottom: 16 }}>
              <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-3)", textTransform: "uppercase" }}>Message *</span>
              <textarea rows={4} style={{
                display: "block", width: "100%", marginTop: 6, padding: "12px 0", border: 0, borderBottom: "1.5px solid var(--ink)",
                background: "transparent", fontFamily: "inherit", fontSize: 16, color: "var(--ink)", outline: "none", resize: "none"
              }} />
            </label>
            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 16, fontSize: 13, color: "var(--ink-2)" }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 2 }} /> {COPY.contact.consent1}
            </label>
            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 8, fontSize: 13, color: "var(--ink-2)" }}>
              <input type="checkbox" style={{ marginTop: 2 }} /> {COPY.contact.consent2}
            </label>
            <button style={{
              marginTop: 26, width: "100%", padding: "18px 24px", border: 0, borderRadius: 999,
              background: "linear-gradient(90deg, var(--orange), var(--rose))", color: "#fff", fontWeight: 600, fontSize: 16,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 16px 40px -12px rgba(217,10,92,.45)"
            }}>
              Envoyer le message
              <span style={{ width: 7, height: 7, borderRadius: 7, background: "#fff" }} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>);

};

A.Footer = function () {
  return (
    <footer style={{ background: "linear-gradient(135deg, var(--orange) 0%, #ff4d7a 55%, var(--rose) 100%)", color: "#fff", padding: "80px 56px 40px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: -120, right: -120, width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,255,255,.25), transparent 70%)", filter: "blur(28px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: -140, left: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255,150,200,.4), transparent 70%)", filter: "blur(32px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .2, pointerEvents: "none" }}>
        <VibrationLine width={1600} height={400} amplitude={120} freq={3} stroke="#fff" strokeWidth={1.5} animated={false} />
      </div>
      <div style={{ position: "relative" }}>
        <div className="prompt" style={{ fontSize: "clamp(60px, 10vw, 180px)", fontWeight: 800, letterSpacing: -6, lineHeight: 1 }}>
          uvibes<span style={{ color: "rgba(255,255,255,.7)" }}>.</span>
        </div>
        <div className="instrument" style={{ fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", marginTop: -8, marginLeft: 8, opacity: .9 }}>
          Activez les bonnes ondes.
        </div>
        <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 30, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 30 }} data-grid="auto">
          <div>
            <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, opacity: .6, textTransform: "uppercase" }}>Newsletter</div>
            <p style={{ marginTop: 6, fontSize: 14, opacity: .8, maxWidth: 380 }}>Une fois par mois : un terrain, une donnée, une question à se poser.</p>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <input placeholder="vous@orga.fr" style={{ flex: 1, padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,.35)", background: "rgba(255,255,255,.12)", color: "#fff" }} />
              <button style={{ padding: "10px 18px", borderRadius: 999, border: 0, background: "#fff", color: "var(--rose)", fontWeight: 700 }}>S'inscrire</button>
            </div>
          </div>
          <div>
            <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, opacity: .6, textTransform: "uppercase", marginBottom: 12 }}>Produit</div>
            {["La solution", "Tarifs", "Sécurité", "Changelog"].map((s) => <div key={s} style={{ fontSize: 14, opacity: .85, padding: "4px 0" }}>{s}</div>)}
          </div>
          <div>
            <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, opacity: .6, textTransform: "uppercase", marginBottom: 12 }}>Ressources</div>
            {["Blog", "Cas clients", "Memento MOOC", "Presse"].map((s) => <div key={s} style={{ fontSize: 14, opacity: .85, padding: "4px 0" }}>{s}</div>)}
          </div>
          <div>
            <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, opacity: .6, textTransform: "uppercase", marginBottom: 12 }}>Légal</div>
            {["Mentions légales", "CGU", "Confidentialité", "Cookies"].map((s) => <div key={s} style={{ fontSize: 14, opacity: .85, padding: "4px 0" }}>{s}</div>)}
          </div>
        </div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 20, fontSize: 12, opacity: .6 }}>
          <span>© 2026 Uvibes · Made with love in Perpignan</span>
          <span>L'inattendu commence ici.</span>
        </div>
      </div>
    </footer>);

};

window.A = A;