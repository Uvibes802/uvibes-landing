// Direction B — "Kinetic Vibes"
// Magazine cover energy, kinetic type, sticker/tape collage, mosaic.

const B = {};

const tape = (color, rotate = -2) => ({
  position: "absolute", padding: "4px 12px",
  background: color, color: "var(--ink)",
  fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: 1.4,
  textTransform: "uppercase", transform: `rotate(${rotate}deg)`,
  boxShadow: "0 6px 18px -8px rgba(0,0,0,.35)",
});

B.Nav = function({ scrolled }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px",
      background: scrolled ? "var(--ink)" : "transparent",
      color: scrolled ? "var(--paper)" : "var(--ink)",
      transition: "all 350ms ease",
    }}>
      <Logo color="currentColor" />
      <div style={{
        display: "flex", gap: 4, padding: 4, borderRadius: 999,
        background: scrolled ? "rgba(255,255,255,.08)" : "rgba(26,23,21,.08)",
        backdropFilter: "blur(8px)", border: scrolled ? "1px solid rgba(255,255,255,.1)" : "1px solid rgba(26,23,21,.1)",
      }}>
        {COPY.navItems.map((it, i) => (
          <a key={i} href="#" style={{
            textDecoration: "none", padding: "8px 14px", fontSize: 13, fontWeight: 600,
            borderRadius: 999, color: "currentColor",
            background: i === 0 ? "var(--orange)" : "transparent",
            color: i === 0 ? "#fff" : "currentColor",
          }}>{it}</a>
        ))}
      </div>
      <button style={{
        background: "var(--rose)", color: "#fff", border: 0,
        padding: "12px 18px", borderRadius: 4, fontWeight: 700, fontSize: 13,
        textTransform: "uppercase", letterSpacing: 1, transform: "rotate(-1deg)",
        boxShadow: "4px 4px 0 var(--ink)",
      }}>Essayer ↗</button>
    </nav>
  );
};

B.Hero = function({ anim }) {
  return (
    <section style={{ position: "relative", paddingTop: 100, paddingBottom: 40, overflow: "hidden", background: "var(--cream)" }}>
      {/* edition strip header */}
      <div style={{
        display: "flex", justifyContent: "space-between", padding: "14px 24px",
        borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)",
        fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        margin: "0 24px",
      }}>
        <span>Édition n°06</span>
        <span>· vibes magazine ·</span>
        <span>{COPY.tag}</span>
        <span>26.05.2026</span>
      </div>

      {/* Big poster title */}
      <div style={{ padding: "60px 24px 30px", position: "relative" }}>
        <h1 className="prompt" style={{
          margin: 0, fontSize: "clamp(72px, 13vw, 240px)", fontWeight: 900,
          lineHeight: .82, letterSpacing: -8, textTransform: "uppercase",
        }}>
          <Reveal animLevel={anim}>
            <span>ACTIVEZ</span>
          </Reveal>
          <Reveal animLevel={anim} delay={100}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <span style={{ color: "var(--orange)" }}>LA PUISSANCE</span>
              <span style={{
                fontSize: "0.18em", textTransform: "none",
                fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400,
                letterSpacing: -1, maxWidth: 280, lineHeight: 1.2, color: "var(--ink-2)",
              }}>
                de toutes ces personnes qui se côtoient sans se parler.
              </span>
            </div>
          </Reveal>
          <Reveal animLevel={anim} delay={200}>
            <span>DE VOTRE <span style={{ color: "var(--rose)" }}>COLLECTIF.</span></span>
          </Reveal>
        </h1>
      </div>

      {/* mid row with vinyl/disc + ctas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 32, alignItems: "flex-end", padding: "20px 24px 0" }}>
        <Reveal animLevel={anim} delay={300}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 320 }}>
              Et si les <strong style={{ color: "var(--orange)", fontWeight: 800 }}>conversations clés</strong> arrivaient enfin ? Uvibes fait circuler les <strong style={{ color: "var(--rose)", fontWeight: 800 }}>bons plans</strong>, les expériences et les points de vue.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={{
                background: "var(--ink)", color: "var(--paper)", border: 0,
                padding: "16px 22px", borderRadius: 4, fontWeight: 700, fontSize: 14,
                textTransform: "uppercase", letterSpacing: 1.4,
                boxShadow: "6px 6px 0 var(--orange)",
              }}>{COPY.hero.ctaPrimary} ↗</button>
              <button style={{
                background: "transparent", color: "var(--ink)", border: "2px solid var(--ink)",
                padding: "14px 22px", borderRadius: 4, fontWeight: 700, fontSize: 14,
                textTransform: "uppercase", letterSpacing: 1.4,
              }}>{COPY.hero.ctaSecondary}</button>
            </div>
          </div>
        </Reveal>

        {/* vinyl */}
        <Reveal animLevel={anim} delay={150}>
          <div style={{ position: "relative", justifySelf: "center" }}>
            <div style={{
              width: 360, height: 360, borderRadius: "50%",
              background: "radial-gradient(circle, #1a1715 25%, #2a2422 26%, #1a1715 27%, #2a2422 28%, #1a1715 100%)",
              position: "relative", animation: anim !== "off" ? "spin 22s linear infinite" : "none",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,.5)",
            }}>
              <div style={{
                position: "absolute", inset: 100, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--orange), var(--rose))",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                fontFamily: "Prompt", fontWeight: 900, fontSize: 26, letterSpacing: -1,
              }}>UV</div>
              <div style={{ position: "absolute", inset: "50%", width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: 8, background: "var(--cream)" }} />
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0) } to { transform: rotate(360deg) } }`}</style>
            <div style={tape("var(--orange)", -8)} >NEW · SIDE A</div>
          </div>
        </Reveal>

        <Reveal animLevel={anim} delay={400}>
          <div style={{ position: "relative" }}>
            <div style={{
              padding: 24, background: "var(--ink)", color: "var(--paper)",
              borderRadius: 4, transform: "rotate(2deg)",
              boxShadow: "8px 8px 0 var(--rose)",
            }}>
              <div className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, opacity: .6 }}>LIVE · 02:14</div>
              <div className="instrument" style={{ fontStyle: "italic", fontSize: 22, marginTop: 8, lineHeight: 1.25 }}>
                « On bosse au même étage depuis 3 ans. »
              </div>
              <div className="roboto-mono" style={{ fontSize: 11, marginTop: 14, opacity: .7 }}>— Léa, RH · Toulouse</div>
              <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
                {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, background: i <= 2 ? "var(--orange)" : "rgba(255,255,255,.2)" }} />)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee strip */}
      <div style={{
        marginTop: 60, padding: "18px 0", background: "var(--orange)", color: "#fff",
        borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", gap: 40, whiteSpace: "nowrap",
          animation: anim !== "off" ? "kmarq 32s linear infinite" : "none", width: "max-content",
        }} className="prompt">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 40, fontSize: 28, fontWeight: 800, letterSpacing: -0.5, textTransform: "uppercase" }}>
              Activez les bonnes ondes
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "#fff" }} />
              Vibez ensemble
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "#fff" }} />
              Rencontres provoquées
              <span style={{ width: 8, height: 8, borderRadius: 8, background: "#fff" }} />
            </span>
          ))}
        </div>
        <style>{`@keyframes kmarq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>
    </section>
  );
};

B.Banner = function({ anim }) {
  const count = useCountUp(12480, 2400);
  const [phrase, setPhrase] = useState(0);
  const fillers = COPY.banner.fillers;
  useEffect(() => {
    if (anim === "off") return;
    const t = setInterval(() => setPhrase(p => (p + 1) % fillers.length), 2200);
    return () => clearInterval(t);
  }, [anim]);
  return (
    <section style={{ background: "var(--cream)", padding: "60px 24px", borderBottom: "1px solid var(--ink)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 30, alignItems: "center" }}>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", background: "var(--ink)", color: "var(--paper)", padding: "8px 14px", borderRadius: 4 }}>
          {COPY.banner.label}
        </span>
        <div className="prompt" style={{ fontSize: "clamp(56px, 9vw, 140px)", fontWeight: 900, letterSpacing: -5, lineHeight: 1, textAlign: "center" }}>
          <span style={{ color: "var(--ink)" }}>{count.toLocaleString("fr-FR")}</span>
          <span style={{ color: "var(--orange)" }}>+</span>
          <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, fontSize: ".42em", marginLeft: 18, color: "var(--rose)" }}>
            {fillers[phrase]}
          </span>
        </div>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", textAlign: "right", color: "var(--ink-3)" }}>
          source · wordpress<br/>maj 26.05.26
        </span>
      </div>
    </section>
  );
};

B.Pillars = function({ anim }) {
  return (
    <section style={{ padding: "120px 24px", background: "var(--paper)", borderBottom: "1px solid var(--ink)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
        <Reveal animLevel={anim}>
          <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 900, letterSpacing: -2.5, lineHeight: .95, textTransform: "uppercase" }}>
            Deux<br/>résultats.<br/>Un seul <span style={{ color: "var(--orange)" }}>outil.</span>
          </h2>
        </Reveal>
        <Reveal animLevel={anim} delay={120}>
          <p style={{ marginTop: 12, fontSize: 19, color: "var(--ink-2)", lineHeight: 1.5, maxWidth: 460 }}>
            {COPY.pillars.kicker.charAt(0).toUpperCase() + COPY.pillars.kicker.slice(1)} —
            <span className="instrument" style={{ fontStyle: "italic", color: "var(--rose)" }}> deux effets concrets</span> ressentis dès les premières semaines.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "2px solid var(--ink)" }}>
        {COPY.pillars.items.map((p, i) => (
          <Reveal key={i} animLevel={anim} delay={i * 150}>
            <div style={{
              position: "relative", padding: 40, minHeight: 420,
              background: i === 0 ? "var(--orange)" : "var(--rose)", color: "#fff",
              borderRight: i === 0 ? "2px solid var(--ink)" : "none",
              overflow: "hidden",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>0{i+1} / pilier</span>
                <span className="prompt" style={{ fontSize: 26, fontWeight: 900 }}>{i === 0 ? "♥" : "✦"}</span>
              </div>
              <h3 className="prompt" style={{ margin: "60px 0 0", fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 900, letterSpacing: -2, lineHeight: .95, textTransform: "uppercase" }}>
                {p.title.split(" et ")[0]}<br/>
                <span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", textTransform: "none", letterSpacing: -1 }}>et</span> {p.title.split(" et ")[1]}.
              </h3>
              <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.5, maxWidth: 380, opacity: .95 }}>{p.body}</p>
              <div style={{ position: "absolute", bottom: 32, left: 40, right: 40, display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.4)", paddingTop: 20 }}>
                <div>
                  <div className="prompt" style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>{p.stat}</div>
                  <div style={{ fontSize: 12, opacity: .9, marginTop: 4, maxWidth: 220 }}>{p.statLabel}</div>
                </div>
                <span style={{ fontFamily: "Prompt", fontSize: 80, fontWeight: 900, opacity: .25, letterSpacing: -4 }}>0{i+1}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

B.Enjeux = function({ anim }) {
  return (
    <section style={{ padding: "120px 24px", background: "var(--ink)", color: "var(--paper)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 30, flexWrap: "wrap" }}>
        <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(48px, 6.5vw, 100px)", fontWeight: 900, letterSpacing: -3, lineHeight: .9, textTransform: "uppercase" }}>
          Chaque collectif<br/>a ses <span style={{ color: "var(--orange)" }}>enjeux.</span>
        </h2>
        <p style={{ maxWidth: 360, fontSize: 16, opacity: .8, lineHeight: 1.5 }}>{COPY.enjeux.sub}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, gridAutoRows: "minmax(180px, auto)" }}>
        {COPY.enjeux.chips.map((c, i) => {
          // ransom-note style: vary col-span and bg
          const spans = [3, 3, 2, 2, 2, 6];
          const bgs = ["var(--orange)", "transparent", "var(--rose)", "transparent", "var(--paper)", "transparent"];
          const colors = ["#fff", "var(--paper)", "#fff", "var(--paper)", "var(--ink)", "var(--paper)"];
          const borders = ["none", "1px solid rgba(255,255,255,.2)", "none", "1px solid rgba(255,255,255,.2)", "none", "1px solid rgba(255,255,255,.2)"];
          return (
            <Reveal key={i} animLevel={anim} delay={i * 80}>
              <div style={{
                gridColumn: `span ${spans[i]}`, padding: 28,
                background: bgs[i], color: colors[i], border: borders[i],
                minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: .8 }}>
                  N°0{i+1} · {c.tag}
                </div>
                <div className="prompt" style={{ fontSize: i === 5 ? 40 : 26, fontWeight: 700, lineHeight: 1.1, letterSpacing: -0.5 }}>
                  {c.q}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

B.Trustees = function({ anim }) {
  return (
    <section style={{ background: "var(--rose)", color: "#fff", padding: "60px 0 50px", overflow: "hidden", borderBottom: "1px solid var(--ink)" }}>
      <div style={{ padding: "0 24px", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 30 }}>
        <h3 className="prompt" style={{ margin: 0, fontWeight: 900, fontSize: 32, letterSpacing: -1, textTransform: "uppercase" }}>
          Ils <span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", textTransform: "none", letterSpacing: -0.5 }}>avancent</span> avec nous
        </h3>
        <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, opacity: .9, textTransform: "uppercase" }}>+ 80 orgas · 12k membres</span>
      </div>
      <LogosMarquee logos={COPY.trustees.logos} speed={50} mode="solid" />
    </section>
  );
};

B.How = function({ anim }) {
  return (
    <section style={{ padding: "120px 24px", background: "var(--cream)", borderBottom: "1px solid var(--ink)" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 60, flexWrap: "wrap" }}>
          <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 2, background: "var(--ink)", color: "var(--paper)", padding: "6px 12px", borderRadius: 4, textTransform: "uppercase" }}>{COPY.how.eyebrow}</span>
          <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(48px, 7vw, 120px)", fontWeight: 900, letterSpacing: -4, lineHeight: .9, textTransform: "uppercase" }}>
            Trois <span style={{ color: "var(--orange)" }}>étapes.</span>
            <span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: -2, textTransform: "none", color: "var(--rose)" }}> pas une de plus.</span>
          </h2>
        </div>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {COPY.how.steps.map((s, i) => (
          <Reveal key={i} animLevel={anim} delay={i * 100}>
            <div style={{
              display: "grid", gridTemplateColumns: "160px 1fr 1fr auto", gap: 32,
              padding: "32px 0", borderTop: "1px solid var(--ink)",
              alignItems: "flex-start",
              borderBottom: i === COPY.how.steps.length - 1 ? "1px solid var(--ink)" : "none",
            }}>
              <div className="prompt" style={{ fontSize: 88, fontWeight: 900, letterSpacing: -4, lineHeight: .9, color: i === 0 ? "var(--orange)" : i === 1 ? "var(--rose)" : "var(--ink)" }}>{s.n}</div>
              <h3 className="prompt" style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.15, textTransform: "uppercase" }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 460 }}>{s.body}</p>
              <div className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, padding: "8px 12px", border: "1px solid var(--ink)", borderRadius: 4, textTransform: "uppercase", whiteSpace: "nowrap" }}>{s.time}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button style={{
          background: "var(--ink)", color: "var(--paper)", border: 0,
          padding: "18px 28px", borderRadius: 4, fontWeight: 800, fontSize: 14,
          textTransform: "uppercase", letterSpacing: 1.4, boxShadow: "6px 6px 0 var(--orange)",
        }}>{COPY.how.cta} ↗</button>
      </div>
    </section>
  );
};

B.Videos = function({ anim }) {
  const items = COPY.videos.items;
  const [order, setOrder] = useState(items.map((_, i) => i));
  // periodically shuffle: rotate one-by-one for the kinetic feel
  useEffect(() => {
    if (anim === "off") return;
    const t = setInterval(() => {
      setOrder(o => {
        const next = [...o];
        next.push(next.shift());
        return next;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [anim]);
  return (
    <section style={{ padding: "120px 24px", background: "var(--paper)", borderBottom: "1px solid var(--ink)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Stars n={5} color="var(--orange)" size={20} />
            <span className="roboto-mono" style={{ fontSize: 12, letterSpacing: 1.4 }}>4.9 · 312 retours terrain</span>
          </div>
          <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(48px, 7vw, 120px)", fontWeight: 900, letterSpacing: -4, lineHeight: .9, textTransform: "uppercase" }}>
            ils <span style={{ color: "var(--rose)" }}>aiment</span><br/>l'<span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", textTransform: "none" }}>expérience.</span>
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={tape("var(--orange)", -4)}>{items.length} vidéos</span>
          <span style={{ ...tape("var(--rose)", 3), color: "#fff" }}>rotation auto</span>
        </div>
      </div>

      {/* mosaic — bricks with reordering */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12, gridAutoRows: 130,
      }}>
        {order.map((origIdx, slotIdx) => {
          const it = items[origIdx];
          const sizes = [
            { col: "span 5", row: "span 3" },
            { col: "span 4", row: "span 2" },
            { col: "span 3", row: "span 2" },
            { col: "span 3", row: "span 2" },
            { col: "span 4", row: "span 2" },
            { col: "span 5", row: "span 2" },
          ];
          const s = sizes[slotIdx];
          return (
            <div key={origIdx} style={{
              gridColumn: s.col, gridRow: s.row,
              transition: "all 800ms cubic-bezier(.2,.7,.2,1)",
            }}>
              <VideoTile item={it} idx={origIdx} playing={slotIdx === 0} />
            </div>
          );
        })}
      </div>

      {/* testimonials as 3-col cut paper */}
      <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {COPY.testimonials.map((t, i) => (
          <Reveal key={i} animLevel={anim} delay={i * 120}>
            <div style={{
              position: "relative", padding: 28,
              background: i === 1 ? "var(--ink)" : "var(--cream-2)",
              color: i === 1 ? "var(--paper)" : "var(--ink)",
              transform: `rotate(${i === 0 ? -1.5 : i === 1 ? 1 : -0.5}deg)`,
              boxShadow: i === 1 ? "8px 8px 0 var(--orange)" : "6px 6px 0 var(--ink)",
            }}>
              <Stars n={t.stars} color={i === 1 ? "var(--orange)" : "var(--rose)"} size={14} />
              <p className="instrument" style={{ fontStyle: "italic", marginTop: 14, fontSize: 19, lineHeight: 1.35 }}>« {t.quote} »</p>
              <div style={{ marginTop: 18, paddingTop: 12, borderTop: i === 1 ? "1px solid rgba(255,255,255,.2)" : "1px solid rgba(26,23,21,.2)" }}>
                <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "Prompt" }}>{t.name}</div>
                <div className="roboto-mono" style={{ fontSize: 10, opacity: .7, marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }}>{t.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

B.Advantages = function({ anim }) {
  const colors = ["var(--orange)", "var(--ink)", "var(--rose)", "var(--cream-3)", "var(--ink)", "var(--orange)"];
  const fg = ["#fff", "var(--paper)", "#fff", "var(--ink)", "var(--paper)", "#fff"];
  return (
    <section style={{ padding: "120px 24px", background: "var(--cream)", borderBottom: "1px solid var(--ink)" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 30, flexWrap: "wrap" }}>
          <h2 className="prompt" style={{ margin: 0, fontSize: "clamp(48px, 7vw, 120px)", fontWeight: 900, letterSpacing: -4, lineHeight: .9, textTransform: "uppercase" }}>
            Transformez<br/>le <span style={{ color: "var(--orange)" }}>quotidien.</span>
          </h2>
          <p style={{ maxWidth: 400, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.5 }}>
            Six bénéfices ressentis dès les premières semaines —
            <span className="instrument" style={{ fontStyle: "italic", color: "var(--rose)" }}> pas des promesses, des effets</span>.
          </p>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, gridAutoRows: 200 }}>
        {COPY.advantages.items.map((a, i) => {
          const spans = [3, 2, 2, 2, 3, 0];
          // last fills remaining
          const span = spans[i] || (i === 5 ? 2 : 2);
          return (
            <Reveal key={i} animLevel={anim} delay={i * 80}>
              <div style={{
                gridColumn: `span ${span}`,
                padding: 24, background: colors[i], color: fg[i],
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                transition: "transform 300ms",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-2px,-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translate(0,0)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", opacity: .85 }}>n°0{i+1}</span>
                  <span style={{ fontSize: 32 }}>{a.icon}</span>
                </div>
                <div>
                  <h3 className="prompt" style={{ margin: 0, fontSize: 30, fontWeight: 900, letterSpacing: -1, textTransform: "uppercase" }}>{a.title}</h3>
                  <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.5, opacity: .9 }}>{a.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

B.Articles = function({ anim }) {
  return (
    <section style={{ padding: "120px 24px", background: "var(--paper)", borderBottom: "1px solid var(--ink)" }}>
      <Reveal animLevel={anim}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 50, gap: 20, flexWrap: "wrap" }}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, background: "var(--ink)", color: "var(--paper)", padding: "6px 12px", borderRadius: 4, textTransform: "uppercase" }}>{COPY.articles.eyebrow}</span>
            <h2 className="prompt" style={{ margin: "20px 0 0", fontSize: "clamp(40px, 6vw, 96px)", fontWeight: 900, letterSpacing: -3.5, lineHeight: .9, textTransform: "uppercase" }}>
              Articles<br/><span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: -1, textTransform: "none", color: "var(--rose)" }}>mis en avant</span>
            </h2>
          </div>
          <a style={{ textDecoration: "none", padding: "12px 18px", border: "2px solid var(--ink)", borderRadius: 4, fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1.4 }}>Voir le blog ↗</a>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "2px solid var(--ink)" }}>
        {COPY.articles.items.map((a, i) => (
          <Reveal key={i} animLevel={anim} delay={i * 120}>
            <article style={{
              padding: 28, background: i === 1 ? "var(--cream)" : "var(--paper)",
              borderRight: i < 2 ? "2px solid var(--ink)" : "none",
              minHeight: 460, display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 1.4, padding: "4px 10px", background: i === 0 ? "var(--orange)" : i === 1 ? "var(--rose)" : "var(--ink)", color: "#fff", textTransform: "uppercase" }}>{a.cat}</span>
                <span className="roboto-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: 1.4 }}>{a.readTime}</span>
              </div>
              <h3 className="prompt" style={{ margin: "28px 0 0", fontSize: 28, fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, textTransform: "uppercase" }}>{a.title}</h3>
              <p style={{ marginTop: 14, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, flexGrow: 1 }}>{a.excerpt}</p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed var(--ink-3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="roboto-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{a.date}</span>
                <span style={{ fontFamily: "Prompt", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: i === 0 ? "var(--orange)" : i === 1 ? "var(--rose)" : "var(--ink)" }}>Lire ↗</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

B.Contact = function({ anim }) {
  return (
    <section id="contact" style={{ padding: "120px 24px", background: "var(--ink)", color: "var(--paper)", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--ink)" }}>
      {/* huge backdrop word */}
      <div className="prompt" style={{
        position: "absolute", left: -20, bottom: -40, fontSize: "30vw", fontWeight: 900,
        letterSpacing: -16, lineHeight: 1, color: "rgba(255,255,255,.04)", pointerEvents: "none",
        textTransform: "uppercase",
      }}>PARLONS</div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60 }}>
        <Reveal animLevel={anim}>
          <div>
            <span className="roboto-mono" style={{ fontSize: 11, letterSpacing: 2, background: "var(--orange)", color: "#fff", padding: "6px 12px", borderRadius: 4, textTransform: "uppercase" }}>{COPY.contact.eyebrow}</span>
            <h2 className="prompt" style={{ margin: "20px 0 0", fontSize: "clamp(48px, 7vw, 120px)", fontWeight: 900, letterSpacing: -4, lineHeight: .88, textTransform: "uppercase" }}>
              Parlons de<br/>votre <span style={{ color: "var(--orange)" }}>collectif.</span>
            </h2>
            <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.5, opacity: .85, maxWidth: 460 }}>{COPY.contact.sub}</p>
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="prompt" style={{ fontSize: 26, fontWeight: 800 }}>bonjour@uvibes.fr</div>
              <div className="roboto-mono" style={{ fontSize: 13, opacity: .7 }}>+33 (0)4 11 22 33 44</div>
              <div className="roboto-mono" style={{ fontSize: 13, opacity: .7 }}>Perpignan, France · Bruxelles, Belgique</div>
            </div>
          </div>
        </Reveal>
        <Reveal animLevel={anim} delay={150}>
          <form onSubmit={(e) => e.preventDefault()} style={{
            background: "var(--paper)", color: "var(--ink)", padding: 36,
            boxShadow: "12px 12px 0 var(--orange)", border: "2px solid var(--cream)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {COPY.contact.fields.map(f => (
                <label key={f.id} style={{ gridColumn: f.id === "email" || f.id === "org" ? "span 2" : "span 1" }}>
                  <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--ink-3)" }}>
                    {f.label}{f.required && " *"}
                  </span>
                  <input type={f.type || "text"} required={f.required} style={{
                    display: "block", width: "100%", padding: "10px 12px", marginTop: 4,
                    border: "2px solid var(--ink)", borderRadius: 0,
                    background: "var(--cream)", fontFamily: "inherit", fontSize: 15, outline: "none",
                  }} />
                </label>
              ))}
            </div>
            <label style={{ display: "block", marginTop: 16 }}>
              <span className="roboto-mono" style={{ fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "var(--ink-3)" }}>Message *</span>
              <textarea rows={4} style={{
                display: "block", width: "100%", padding: "10px 12px", marginTop: 4,
                border: "2px solid var(--ink)", borderRadius: 0,
                background: "var(--cream)", fontFamily: "inherit", fontSize: 15, outline: "none", resize: "none",
              }} />
            </label>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 18, fontSize: 13 }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 3 }} />
              {COPY.contact.consent1}
            </label>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 8, fontSize: 13 }}>
              <input type="checkbox" style={{ marginTop: 3 }} />
              {COPY.contact.consent2}
            </label>
            <button style={{
              marginTop: 26, width: "100%", padding: "18px", background: "var(--ink)", color: "var(--paper)",
              border: 0, fontWeight: 800, fontSize: 15, textTransform: "uppercase", letterSpacing: 1.4,
            }}>Envoyer ↗</button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

B.Footer = function() {
  return (
    <footer style={{ background: "var(--orange)", color: "var(--ink)", padding: "60px 24px 30px" }}>
      <div className="prompt" style={{ fontSize: "clamp(80px, 16vw, 280px)", fontWeight: 900, letterSpacing: -10, lineHeight: .85, textTransform: "uppercase" }}>
        UVIBES<span style={{ color: "var(--rose)" }}>.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20, flexWrap: "wrap", gap: 30 }}>
        <span className="instrument" style={{ fontStyle: "italic", fontSize: 32 }}>Activez les bonnes ondes.</span>
        <div style={{ display: "flex", gap: 28, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          {["Mentions légales", "CGU", "Confidentialité", "Cookies"].map(s => <span key={s}>{s}</span>)}
        </div>
      </div>
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: "1.5px solid var(--ink)", display: "flex", justifyContent: "space-between", fontFamily: "Roboto Mono, monospace", fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase" }}>
        <span>© 2026 Uvibes · Made with vibes in Perpignan</span>
        <span>L'inattendu commence ici.</span>
      </div>
    </footer>
  );
};

window.B = B;
