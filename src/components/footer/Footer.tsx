import Link from "next/link";
import Image from "next/image";
import "../../styles/footer/footer.css";

const NAV_COLS = [
  {
    label: "Notre solution",
    links: [
      { href: "/solution", label: "Méthode" },
      { href: "/tarifs", label: "Tarifs" },
    ],
  },
  {
    label: "Notre univers",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/a-propos", label: "À propos" },
    ],
  },
  {
    label: "Nous contacter",
    links: [
      { href: "/#contact", label: "Nous écrire" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
  {
    label: "Nos informations légales",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/conditions-d-utilisation", label: "CGU" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="ft-footer">
      {/* Blobs colorés — saturent la section */}
      <div className="ft-blobs" aria-hidden="true">
        <span className="ft-blob ft-blob--b" />
        <span className="ft-blob ft-blob--c" />
      </div>

      <div className="ft-inner">
        {/* Top — brand + nav côte à côte */}
        <div className="ft-top">
          <div className="ft-brand">
            <Link href="/" aria-label="Retour à l'accueil Uvibes">
              <Image
                src="/images/Logo%20VI%20blanc.png"
                alt="Uvibes"
                width={160}
                height={80}
                className="ft-logo"
              />
            </Link>
            <p className="ft-tagline v-serif">Activez les bonnes ondes.</p>
          </div>

          <div className="ft-nav">
            {NAV_COLS.map((col) => (
              <div key={col.label} className="ft-nav-col">
                <p className="v-mono ft-nav-label">{col.label}</p>
                <ul className="ft-nav-list">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="ft-nav-link">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-divider" aria-hidden="true" />

        <div className="ft-bottom">
          <p className="v-mono ft-copy">© 2026 Uvibes</p>
          <p className="ft-slogan v-serif">L&apos;inattendu commence ici.</p>
          <Link href="/admin/login" className="ft-admin-link" aria-label="Espace administration">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
