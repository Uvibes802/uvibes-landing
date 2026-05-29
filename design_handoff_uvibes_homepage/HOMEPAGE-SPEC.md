# Page d'accueil Uvibes — Spécification complète (reproduction à l'identique)

> **À LIRE D'ABORD — directive pour Claude Code**
>
> Ce document contient le **code source réel et complet** de la page d'accueil telle qu'elle apparaît dans le prototype validé. Le but : que l'intégration soit **strictement identique** — mêmes couleurs, mêmes espacements, **mêmes animations**.
>
> **Règles impératives :**
> 1. **Ne réinterprète pas.** Reproduis les valeurs exactes (couleurs hex, px, gradients, durées d'animation, easings). Ne « simplifie » pas, n'« améliore » pas.
> 2. Le **chemin le plus fiable** : les fichiers dans `../prototype/` (`Bienvenue.html`, `shared.jsx`, `direction-vibration.jsx`, `home-extras.jsx`, `app.jsx`) sont la **source de vérité absolue**. Le stack du proto est React + Babel inline. Si ton codebase est React, tu peux porter les composants quasi tels quels.
> 3. **Toutes les @keyframes** sont listées en §2 — elles sont indispensables, ne les omets pas.
> 4. Toutes les couleurs passent par les **tokens CSS** de §1.
>
> Le proto utilise un seul « style » : **direction « Vibration éditoriale »** (composants préfixés `A.`). Le sélecteur de direction Kinetic et le niveau d'animation sont des outils internes — pour l'intégration finale, garde **Vibration** + animation **« vibing »** (toutes animations actives).

---

## Ordre de rendu des sections (exact)

```
<Nav />                 ← fixe en haut, burger sur mobile
<main>
  <Hero />              ← plein écran, gradient riche
  <Banner />            ← bandeau compteur live (gradient orange→rose)
  <Pillars />           ← 2 cartes piliers
  <Collectifs />        ← « Pour qui ? » ticker pills + panneau détail
  <Trustees />          ← PARTENAIRES (grille agrandie + marquee)
  <How />               ← 3 étapes
  <Videos />            ← « Ils aiment l'expérience » : grille vidéo + TÉMOIGNAGES
  <Articles />          ← 3 articles
  <Contact />           ← formulaire
</main>
<Footer />              ← gradient orange→rose
```

> ⚠️ `A.Enjeux` et `A.FloatingMenu` existent dans le code mais **ne sont PAS rendus** (Enjeux remplacé par Collectifs ; FloatingMenu supprimé sur demande client). Ne les intègre pas.

---

## 1 · Design tokens (`:root`) + CSS de base

Copie ce bloc tel quel dans ta feuille globale.

```css
:root {
      --orange: #FD6E00;
      --orange-light: #FF9558;
      --orange-bright: #FFB07A;
      --rose: #D90A5C;
      --rose-light: #FF4D7A;
      --rose-bright: #FF77A0;
      --coral: #FF6B5C;
      --peach: #FFD5B8;
      --pink-soft: #FFDDE6;
      --cream: #FFF6EC;            /* brighter cream */
      --cream-2: #FFEFE0;
      --cream-3: #FFE5CC;
      --ink: #4A1530;              /* vivid wine — readable but bright */
      --ink-2: #7A2050;            /* mid rose-wine for body */
      --ink-3: #B0507E;            /* muted but warmer */
      --ink-4: #E0AEC4;
      --rose-deep: #B5083F;
      --paper: #FFFBF4;
      --warm-glow: linear-gradient(135deg, #FD6E00 0%, #ff4d7a 50%, #D90A5C 100%);
      --warm-glow-soft: linear-gradient(135deg, #ffc8a8 0%, #ffadc7 100%);
      --vivid-mesh: linear-gradient(135deg, #FFE3B0 0%, #FFC7A0 25%, #FFA0B0 55%, #FF7AA8 80%, #FF4D7A 100%);
    }
    /* Responsive overrides */
    @media (max-width: 1280px) {
      main section { padding-left: 40px !important; padding-right: 40px !important; }
    }
    @media (max-width: 1024px) {
      main section { padding-left: 32px !important; padding-right: 32px !important; padding-top: 80px !important; padding-bottom: 80px !important; }
      [data-grid="2col"], [data-grid="3col"] { grid-template-columns: 1fr 1fr !important; }
      h1 { font-size: clamp(48px, 8vw, 84px) !important; }
      h2 { font-size: clamp(36px, 5.5vw, 60px) !important; }
    }
    @media (max-width: 768px) {
      main section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 60px !important; padding-bottom: 60px !important; }
      nav { padding-left: 16px !important; padding-right: 16px !important; padding-top: 12px !important; padding-bottom: 12px !important; }
      [data-grid="2col"], [data-grid="3col"], [data-grid="auto"] { grid-template-columns: 1fr !important; gap: 18px !important; }
      [data-grid-rows="span"] { grid-row: auto !important; }
      [data-hide-mobile="true"] { display: none !important; }
      h1 { font-size: clamp(40px, 11vw, 68px) !important; letter-spacing: -0.03em !important; line-height: 1 !important; }
      h2 { font-size: clamp(32px, 8vw, 52px) !important; letter-spacing: -0.025em !important; line-height: 1.02 !important; }
      h3 { font-size: 22px !important; }
      .hide-mobile { display: none !important; }
      /* mobile spacing rhythm */
      main section { margin: 0 !important; }
      body { padding-bottom: 0 !important; } /* no floating menu */
    }
    @media (max-width: 480px) {
      main section { padding-left: 16px !important; padding-right: 16px !important; padding-top: 52px !important; padding-bottom: 52px !important; }
      h1 { font-size: 44px !important; }
      h2 { font-size: 32px !important; }
      .roboto-mono { font-size: 11px !important; }
    }
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: 'Roboto', system-ui, sans-serif;
      background: var(--cream);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
    }
    img { max-width: 100%; display: block; }
    button { font: inherit; cursor: pointer; }
    a { color: inherit; }
    .roboto-mono { font-family: 'Roboto Mono', monospace; }
    .prompt { font-family: 'Prompt', sans-serif; }
    .instrument { font-family: 'Instrument Serif', serif; }
    ::selection { background: var(--orange); color: var(--paper); }
```

**Polices Google** (dans le `<head>`) :
```html
<link href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&family=Roboto+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

- **Prompt** → titres (classe `.prompt`)
- **Instrument Serif** italic → accents éditoriaux (classe `.instrument`)
- **Roboto** → corps de texte (défaut body)
- **Roboto Mono** → eyebrows / labels / méta (classe `.roboto-mono`)

---

## 2 · TOUTES les @keyframes (indispensables)

Ces animations sont déclarées inline dans les composants du proto. Regroupe-les dans ta feuille globale — chacune est utilisée, ne pas omettre.

```css
/* ── Hero : blobs gradient qui dérivent ── */
@keyframes blob-drift-a { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-40px, 30px) scale(1.08) } }
@keyframes blob-drift-b { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(50px, -20px) scale(.92) } }
@keyframes blob-drift-c { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(60px, 40px) scale(1.12) } }
@keyframes blob-drift-d { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(-30px, -50px) scale(1.05) } }

/* ── Hero : particules flottantes ── */
@keyframes particle-0 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-40px) } }
@keyframes particle-1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(20px,-30px) } }
@keyframes particle-2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-15px,25px) } }

/* ── Hero (eyebrow live dot) + Banner : pulse ── */
@keyframes pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.4; transform:scale(.85) } }

/* ── Hero : égaliseur audio (barres EQ) ── */
@keyframes eq { 0%,100% { transform: scaleY(.4) } 50% { transform: scaleY(2.4) } }

/* ── AppMockup : ondes concentriques + halo + flottement ── */
@keyframes am-ripple { 0% { transform: scale(.55); opacity:.9; border-width:2px } 80% { opacity:0 } 100% { transform: scale(2.1); opacity:0; border-width:.5px } }
@keyframes am-glow { 0%,100% { transform: scale(1); opacity:.9 } 50% { transform: scale(1.08); opacity:1 } }
@keyframes am-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }

/* ── LogosMarquee : défilement infini ── */
@keyframes marquee-left { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
@keyframes marquee-right { from { transform: translateX(-33.33%) } to { transform: translateX(0) } }

/* ── How : badge numéro qui tourne ── */
@keyframes spin-slow { from { transform: rotate(0) } to { transform: rotate(360deg) } }

/* ── Témoignages : sparkles carte vedette ── */
@keyframes t-spark { 0%,100% { opacity:0; transform: translateY(0) } 50% { opacity:1; transform: translateY(-8px) } }

/* ── Collectifs : sparkles panneau actif (si utilisé) ── */
@keyframes e-spark { 0%,100% { opacity:0; transform: translateY(0) } 50% { opacity:1; transform: translateY(-12px) } }
```

> **Le motif « vibration » (ondes SVG)** n'est pas une keyframe CSS mais un `<animate>` SVG sur l'attribut `d` — voir le composant `VibrationLine` en §3. C'est la signature visuelle de la marque, présente dans presque toutes les sections.

---

## 3 · Primitives d'animation & helpers (verbatim)

Ces fonctions sont partagées par toutes les sections. Reproduis-les exactement.

### 3.1 `Reveal` — apparition au scroll (IntersectionObserver)
```jsx
function Reveal({ children, delay = 0, y = 24, animLevel = "vibing" }
```

### 3.2 `VibrationLine` — onde SVG animée (signature marque)
```jsx
function VibrationLine({ stroke = "var(--ink)", strokeWidth = 1.5, amplitude = 14, freq = 6, width = 600, height = 60, className, animated = true, speed = 16 }
```

### 3.3 `AppMockup` — mockup app + ondes + halo + chips flottants
```jsx
function AppMockup({ anim = "vibing", showRipples = true, showChips = true, scale = 1 }
```

### 3.4 `LogosMarquee` — bandeau logos défilant
```jsx
function LogosMarquee({ logos, dir = "left", speed = 40, mode = "ghost" }
```

### 3.5 `VideoTile` — tuile vidéo témoignage
```jsx
function VideoTile({ item, idx, tone = "warm", playing = false, onClick }
```

### 3.6 `Stars` — rangée d'étoiles
```jsx
function Stars({ n = 5, color = "var(--orange)", size = 14 }
```

### 3.7 `Logo` — logotype
```jsx
function Logo({ color = "var(--ink)", size = 22 }
```

### 3.8 Hooks
```jsx
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

function useRotatingFeature(items, interval = 3200, paused = false) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval, paused]);
  return [idx, setIdx];
}

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
```

---

## 4 · Composants de section (verbatim)

> Chaque composant reçoit `anim` (`"vibing"` | `"soft"` | `"off"`). En prod, passe `"vibing"`. Les helpers `COPY`, `Reveal`, `VibrationLine`, etc. proviennent de §3 et des données `COPY` (§5).

### 4.1 Nav
```jsx
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
```

### 4.2 Hero
```jsx
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
```

### 4.3 Banner (compteur live)
```jsx
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
```

### 4.4 Pillars
```jsx
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
```

### 4.5 Collectifs (« Pour qui ? »)
Données :
```jsx
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
```
Composant :
```jsx
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
```

### 4.6 Trustees — PARTENAIRES
```jsx
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
```

### 4.7 How (3 étapes)
```jsx
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
```

### 4.8 Videos + TÉMOIGNAGES
```jsx
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
```

### 4.9 Articles
```jsx
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
```

### 4.10 Contact
```jsx
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
```

### 4.11 Footer
```jsx
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
```

---

## 5 · Données de contenu (`COPY`)

Tout le texte FR est centralisé dans l'objet `COPY` de `../prototype/shared.jsx` (lignes ~6–210). Reprends-le tel quel — il contient `hero`, `banner`, `pillars`, `trustees`, `how`, `videos`, `testimonials`, `articles`, `contact`. Les données `COLLECTIFS` (section 4.5) sont dans `home-extras.jsx`.

---

## 6 · Orchestration (`App`)

```jsx
// App entrypoint — orchestrates the two directions and Tweaks.

const DEFAULTS = JSON.parse(document.getElementById("tweak-defaults").textContent.replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, ""));

function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const dir = tweaks.direction;
  const D = dir === "kinetic" ? B : A;
  const anim = tweaks.animation;

  // direction-specific body background
  useEffect(() => {
    document.body.style.background = dir === "kinetic" ? "var(--cream)" : "var(--cream)";
  }, [dir]);

  return (
    <React.Fragment>
      <D.Nav scrolled={scrolled} />

      <main data-screen-label={`Bienvenue · ${dir === "kinetic" ? "Kinetic Vibes" : "Vibration éditoriale"}`}>
        <D.Hero anim={anim} />
        <D.Banner anim={anim} />
        <D.Pillars anim={anim} />
        {D.Collectifs ? <D.Collectifs anim={anim} /> : <D.Enjeux anim={anim} />}
        <D.Trustees anim={anim} />
        <D.How anim={anim} />
        <D.Videos anim={anim} />
        <D.Articles anim={anim} />
        <D.Contact anim={anim} />
      </main>

      <D.Footer />

      <TweaksPanel title="Tweaks · Uvibes">
        <TweakSection label="Direction">
          <TweakRadio
            label="Style général"
            value={tweaks.direction}
            onChange={(v) => setTweak("direction", v)}
            options={[
              { value: "vibration", label: "Vibration" },
              { value: "kinetic", label: "Kinetic" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Animation">
          <TweakRadio
            label="Niveau d'animation"
            value={tweaks.animation}
            onChange={(v) => setTweak("animation", v)}
            options={[
              { value: "off", label: "Off" },
              { value: "soft", label: "Soft" },
              { value: "vibing", label: "Vibing" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

## 7 · Checklist de fidélité

- [ ] Tous les tokens de §1 présents (palette vive, pas de brun foncé)
- [ ] Toutes les @keyframes de §2 présentes
- [ ] `VibrationLine` rend bien des ondes SVG **animées** (`<animate>` sur `d`)
- [ ] Hero : `min-height:100vh`, 7 blobs gradient animés, 14 particules, 3 ondes, grain, EQ bars
- [ ] AppMockup : ondes concentriques + halo pulsant + flottement + 3 chips
- [ ] Banner : compteur animé (`useCountUp`) + phrase qui tourne
- [ ] Collectifs : pills défilantes + panneau détail qui change
- [ ] Partenaires : 6 cartes tints alternés + stat 80+ + marquee dessous
- [ ] Témoignages : 3 cartes asymétriques (vedette gradient + sparkles, blanche décalée, pêche)
- [ ] How : badges numéro avec anneau `spin-slow` + ligne d'onde pointillée
- [ ] Reveal au scroll sur tous les blocs
- [ ] Responsive : breakpoints 1280/1024/768/480 (dans §1), pas de menu en bas
