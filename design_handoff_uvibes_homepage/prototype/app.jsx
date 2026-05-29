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
