import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Lab — Uvibes (dev only)",
  robots: { index: false, follow: false },
};

// ─── Importer les variantes en cours de test ici ───────────────────────────
// import HeroBannerV2 from "./HeroBannerV2";
// import CardStyleBento from "./CardStyleBento";
// ───────────────────────────────────────────────────────────────────────────

export default function UILabPage() {
  return (
    <main style={{ padding: "2rem", background: "#111", minHeight: "100vh" }}>
      <header style={{ marginBottom: "3rem", borderBottom: "1px solid #333", paddingBottom: "1rem" }}>
        <h1 style={{ color: "#fd6e00", fontFamily: "var(--text-font-bold)", fontSize: "1.5rem", margin: 0 }}>
          UI Lab
        </h1>
        <p style={{ color: "#666", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Page de développement — non indexée, non liée dans le menu
        </p>
      </header>

      {/* ─── Sections d'expérimentation ─────────────────────────────────── */}
      {/* Décommenter et ajouter les variantes à tester */}

      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          — Aucune expérience en cours —
        </h2>
        <p style={{ color: "#444", fontSize: "0.85rem" }}>
          Ajouter des composants dans <code style={{ color: "#fd6e00" }}>src/app/ui-lab/</code> et les importer ici.
        </p>
      </section>

      {/* Exemple d'utilisation :
      <Section label="Hero Banner">
        <HeroBannerV2 />
      </Section>
      */}
    </main>
  );
}

// Wrapper utilitaire — décommenter quand une expérience est ajoutée
// function Section({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <section style={{ marginBottom: "6rem" }}>
//       <h2 style={{
//         color: "#fd6e00",
//         fontSize: "0.75rem",
//         letterSpacing: "0.1em",
//         textTransform: "uppercase",
//         marginBottom: "1.5rem",
//         paddingBottom: "0.5rem",
//         borderBottom: "1px solid #222",
//       }}>
//         {label}
//       </h2>
//       {children}
//     </section>
//   );
// }
