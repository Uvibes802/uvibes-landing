// Page /solution — redesign "scroll narratif" : Pourquoi → Comment → Combien.
// Sections (solution-sections.jsx) : ProofBar / ForWho / HowItWorks / Themes / Features / Pricing.

const { useState, useEffect, useRef } = React;

const HERO = {
  eyebrow: "La solution Uvibes",
  title: ["La solution", "pour votre", "collectif."],
  sub: "Découvrez comment Uvibes s'adapte à votre contexte et choisissez l'offre qui vous correspond.",
  stats: [
    { value: "3 500", label: "membres" },
    { value: "11", label: "collectifs" },
    { value: "4.9/5", label: "satisfaction" },
  ],
};

const ANCHORS = [
  { id: "pour-qui", label: "Pour qui" },
  { id: "comment", label: "Comment ça marche" },
  { id: "themes", label: "Thématiques" },
  { id: "fonctionnalites", label: "Fonctionnalités" },
  { id: "offres", label: "Nos offres" },
];

const PARTNERS = [
  { abbr: "UPVD" }, { abbr: "Eklore." }, { abbr: "FDV" }, { abbr: "MGEN" },
  { abbr: "INSA" }, { abbr: "Mtp" }, { abbr: "CNRS" }, { abbr: "AFEV" },
];

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
        color: "var(--ink)",
      }}>
        <a href="Bienvenue.html" style={{ textDecoration: "none" }}><Logo /></a>
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
          <button className="btn btn-brand">Essayer gratuitement<span style={{ width: 6, height: 6, borderRadius: 6, background: "var(--orange)" }} /></button> :
          <button onClick={() => setOpen(o => !o)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} style={{
            width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(217,10,92,.25)",
            background: open ? "linear-gradient(135deg, var(--orange), var(--rose))" : "rgba(250,246,239,.7)", color: open ? "#fff" : "var(--rose)",
            display: "grid", placeItems: "center", padding: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ?
                <React.Fragment><path d="M6 6l12 12" /><path d="M18 6L6 18" /></React.Fragment> :
                <React.Fragment><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></React.Fragment>}
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
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map((it, i) =>
            <a key={i} href={it.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", color: "var(--ink)", fontFamily: "Prompt", fontWeight: 700,
              fontSize: 32, letterSpacing: -1, padding: "14px 0",
              borderBottom: "1px dashed rgba(26,23,21,.15)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span>{it.label}</span>
              {it.active && <span style={{ width: 10, height: 10, borderRadius: 10, background: "var(--orange)" }} />}
            </a>
          )}
          <button className="btn btn-gradient" style={{ marginTop: 28, padding: "18px 24px", justifyContent: "center", fontSize: 16 }}>Essayer gratuitement →</button>
        </div>
      }
    </React.Fragment>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero({ anim }) {
  const on = anim !== "off";
  return (
    <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, background: "var(--cream)", color: "var(--ink)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, opacity: .42 }}>
        <VibrationLine width={1600} height={120} amplitude={28} freq={5} stroke="var(--orange)" strokeWidth={1.4} animated={on} speed={22} />
      </div>
      <div aria-hidden style={{ position: "absolute", top: -100, right: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.45), transparent 70%)", filter: "blur(28px)", animation: on ? "hero-blob 24s ease-in-out infinite" : "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: -120, left: "30%", width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(217,10,92,.4), transparent 70%)", filter: "blur(24px)", animation: on ? "hero-blob-2 32s ease-in-out infinite" : "none" }} />
      <style>{`
        @keyframes hero-blob { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-40px,30px) scale(1.08) } }
        @keyframes hero-blob-2 { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,-40px) scale(.94) } }
      `}</style>

      <div style={{ position: "relative", padding: "0 56px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 50, alignItems: "center" }} data-grid="2col">
        <div>
          <Reveal animLevel={anim}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px", borderRadius: 999, background: "rgba(250,246,239,.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(26,23,21,.1)", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "var(--orange)", boxShadow: on ? "0 0 0 4px rgba(253,110,0,.18)" : "none" }} />
              <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink-3)" }}>{HERO.eyebrow}</span>
            </div>
          </Reveal>
          <h1 className="prompt-display" style={{ margin: 0, fontSize: "clamp(56px, 8vw, 132px)", lineHeight: .9 }}>
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
            <p style={{ marginTop: 28, maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: "var(--ink-3)" }}>{HERO.sub}</p>
          </Reveal>
          <Reveal animLevel={anim} delay={460}>
            <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#pour-qui" className="btn btn-gradient" style={{ padding: "16px 24px", fontSize: 15, textDecoration: "none" }}>
                Explorer la solution
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="#offres" className="btn" style={{ padding: "16px 24px", fontSize: 15, textDecoration: "none", background: "rgba(250,246,239,.7)", color: "var(--ink)", border: "1.5px solid var(--ink)", backdropFilter: "blur(8px)" }}>
                Voir les offres
              </a>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={580}>
            <div style={{ marginTop: 46, display: "flex", gap: 36, flexWrap: "wrap" }}>
              {HERO.stats.map((m, i) =>
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <div className="prompt-display" style={{ fontSize: 34, lineHeight: 1, color: i === 1 ? "var(--rose)" : "var(--orange)" }}>{m.value}</div>
                  <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.2, color: "var(--ink-4)", textTransform: "uppercase" }}>{m.label}</div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal animLevel={anim} delay={300}>
          <div style={{ position: "relative", justifySelf: "center" }}><AppMockup anim={anim} /></div>
        </Reveal>
      </div>

      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, opacity: .32 }}>
        <VibrationLine width={1600} height={80} amplitude={16} freq={14} stroke="var(--rose)" strokeWidth={1} animated={on} speed={18} />
      </div>
    </section>
  );
}

// ── Sticky anchor nav (scroll-spy) ──────────────────────────────────────
function AnchorNav() {
  const [active, setActive] = useState(ANCHORS[0].id);
  const [pinned, setPinned] = useState(false);
  const sentinel = useRef(null);

  useEffect(() => {
    const s = sentinel.current;
    if (s) {
      const io = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: [0, 1] });
      io.observe(s);
      return () => io.disconnect();
    }
  }, []);

  useEffect(() => {
    const secs = ANCHORS.map(a => document.getElementById(a.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <div ref={sentinel} style={{ height: 1 }} />
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: pinned ? "rgba(243,237,227,.94)" : "var(--cream)",
        backdropFilter: pinned ? "blur(14px)" : "none",
        borderBottom: pinned ? "1px solid rgba(26,23,21,.08)" : "1px solid transparent",
        transition: "all 300ms ease",
      }}>
        <div style={{ display: "flex", padding: "0 56px", overflowX: "auto", gap: 4, scrollbarWidth: "none" }} className="anchor-row">
          {ANCHORS.map((a, i) => {
            const isA = a.id === active;
            return (
              <a key={a.id} href={"#" + a.id} onClick={(e) => go(e, a.id)} style={{
                position: "relative", padding: "16px 16px", textDecoration: "none", whiteSpace: "nowrap",
                color: isA ? "var(--ink)" : "var(--ink-4)", display: "flex", alignItems: "center", gap: 9, transition: "color 250ms",
              }}>
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.2, opacity: .7 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{a.label}</span>
                {isA && <span style={{ position: "absolute", left: 12, right: 12, bottom: 0, height: 3, background: "var(--orange)", borderRadius: 3 }} />}
              </a>
            );
          })}
        </div>
      </div>
      <style>{`.anchor-row::-webkit-scrollbar { display: none; }`}</style>
    </React.Fragment>
  );
}

// ── Partner marquee ─────────────────────────────────────────────────────
function PartnerCarousel() {
  return (
    <section style={{ background: "var(--cream-2)", padding: "60px 0", borderTop: "1px solid rgba(26,23,21,.06)" }}>
      <div style={{ padding: "0 56px", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 26 }}>
        <h3 className="prompt" style={{ margin: 0, fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em" }}>
          <span className="instrument" style={{ fontStyle: "italic" }}>Ils nous</span> font confiance
        </h3>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.6, color: "var(--ink-4)", textTransform: "uppercase" }}>+ 80 organisations</span>
      </div>
      <LogosMarquee logos={PARTNERS} speed={50} />
    </section>
  );
}

// ── Final CTA ───────────────────────────────────────────────────────────
function FinalCTA({ anim }) {
  const on = anim !== "off";
  return (
    <section style={{ position: "relative", padding: "120px 56px", background: "var(--cream-2)", color: "var(--ink)", overflow: "hidden", borderTop: "1px solid rgba(26,23,21,.06)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: .5, pointerEvents: "none" }}>
        <VibrationLine width={1800} height={400} amplitude={70} freq={4} stroke="var(--orange)" strokeWidth={1.5} animated={on} speed={20} />
      </div>
      <div aria-hidden style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(217,10,92,.32), transparent 70%)", filter: "blur(28px)", animation: on ? "cta-blob 26s ease-in-out infinite" : "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: -120, left: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(253,110,0,.35), transparent 70%)", filter: "blur(28px)", animation: on ? "cta-blob 30s ease-in-out infinite reverse" : "none" }} />
      <style>{`@keyframes cta-blob { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,30px) scale(1.1) } }`}</style>

      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80, alignItems: "center" }} data-grid="2col">
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, color: "var(--rose)", textTransform: "uppercase" }}>Prêt à vibrer ?</span>
            <h2 className="prompt-display" style={{ margin: "16px 0 0", fontSize: "clamp(48px, 6.4vw, 108px)", lineHeight: .9 }}>
              Étudions<br />votre <span className="instrument" style={{ fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.03em", background: "linear-gradient(90deg, var(--orange), var(--rose))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>projet.</span>
            </h2>
            <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.55, color: "var(--ink-3)", maxWidth: 540 }}>
              30 minutes pour parler de votre collectif, comprendre ce qui coince, et voir comment Uvibes peut aider — sans script de vente.
            </p>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={150}>
          <div style={{ position: "relative" }}>
            <div style={{ padding: 30, background: "var(--paper)", color: "var(--ink)", borderRadius: 28, boxShadow: "0 30px 60px -30px rgba(26,23,21,.25)", border: "1px solid rgba(26,23,21,.08)" }}>
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
              <button className="btn btn-gradient" style={{ width: "100%", justifyContent: "center", marginTop: 22, padding: "16px 18px" }}>Réserver mon créneau →</button>
              <div className="roboto-mono" style={{ marginTop: 14, fontSize: 11, color: "var(--ink-4)", letterSpacing: 1, textAlign: "center", textTransform: "uppercase" }}>ou écrivez à bonjour@uvibes.fr</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────
function SolutionFooter() {
  return (
    <footer style={{ background: "var(--cream-3)", color: "var(--ink)", padding: "60px 56px 30px", borderTop: "1px solid rgba(26,23,21,.1)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 30, paddingBottom: 30, borderBottom: "1px solid rgba(26,23,21,.18)" }} data-grid="auto">
        <div>
          <Logo color="var(--ink)" />
          <p className="instrument" style={{ fontStyle: "italic", marginTop: 14, fontSize: 22, color: "var(--ink-3)" }}>L'inattendu commence ici.</p>
        </div>
        {[
          { h: "Produit", items: ["La solution", "Tarifs", "Sécurité", "Changelog"] },
          { h: "Ressources", items: ["Blog", "Cas clients", "Memento MOOC", "Presse"] },
          { h: "Légal", items: ["Mentions légales", "CGU", "Confidentialité", "Cookies"] },
        ].map((col) =>
          <div key={col.h}>
            <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 12 }}>{col.h}</div>
            {col.items.map((s) => <div key={s} style={{ fontSize: 14, color: "var(--ink-2)", padding: "4px 0" }}>{s}</div>)}
          </div>
        )}
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-4)", flexWrap: "wrap", gap: 8 }}>
        <span>© 2026 Uvibes · Made with love in Perpignan</span>
        <span>L'inattendu commence ici.</span>
      </div>
    </footer>
  );
}

// ── App ─────────────────────────────────────────────────────────────────
const DEFAULTS = JSON.parse(document.getElementById("tweak-defaults").textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, ""));

function SolutionApp() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const FloatingMenu = typeof window !== "undefined" ? window.FloatingMenu : null;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const anim = tweaks.animation;

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <SolutionNav scrolled={scrolled} />
      <main data-screen-label="La solution">
        <Hero anim={anim} />
        <SolutionProofBar anim={anim} />
        <AnchorNav />
        <SolutionForWho anim={anim} />
        <SolutionHowItWorks anim={anim} />
        <SolutionThemes anim={anim} />
        <SolutionFeatures anim={anim} />
        <SolutionPricing anim={anim} />
        <PartnerCarousel />
        <FinalCTA anim={anim} />
      </main>
      <SolutionFooter />
      {FloatingMenu && <FloatingMenu />}

      <TweaksPanel title="Tweaks · La solution">
        <TweakSection label="Animation">
          <TweakRadio
            label="Niveau d'animation"
            value={tweaks.animation}
            onChange={(v) => setTweak("animation", v)}
            options={[
              { value: "off", label: "Off" },
              { value: "soft", label: "Soft" },
              { value: "vibing", label: "Vibing" },
            ]} />
        </TweakSection>
        <TweakSection label="Navigation">
          <TweakSelect
            label="Aller à la section"
            value={tweaks.jumpTo || "pour-qui"}
            onChange={(v) => { setTweak("jumpTo", v); jump(v); }}
            options={ANCHORS.map((a, i) => ({ value: a.id, label: `${String(i + 1).padStart(2, "0")} · ${a.label}` }))} />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SolutionApp />);
