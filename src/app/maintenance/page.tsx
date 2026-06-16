import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Maintenance - uvibes",
  description: "Notre site est actuellement en cours de maintenance.",
};

export default function MaintenancePage() {
  return (
    <main
      className="container-orange"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <h1 className="title-h1" style={{ textAlign: "center" }}>
          Nous revenons <br />
          très vite !
        </h1>

        <p
          className="text-white"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            fontSize: "1.2rem",
            lineHeight: "1.6",
          }}
        >
          Nous effectuons actuellement une mise à jour de notre plateforme pour
          vous offrir une expérience toujours plus fluide.
          <br />
          <br />
          Merci de votre patience, l&apos;équipe uvibes fait au plus vite !
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "12px 24px",
              backgroundColor: "white",
              color: "var(--mainColor)",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "var(--title-font)",
            }}
          >
            Rafraîchir la page
          </Link>
          <a
            href="mailto:contact@uvibes.fr"
            style={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "var(--title-font)",
            }}
          >
            Nous contacter
          </a>
        </div>
      </div>
    </main>
  );
}
