import Link from "next/link";
import Image from "next/image";
import "../../styles/footer/footer.css";

const NAV_COLS = [
  {
    label: "Produit",
    links: [
      { href: "/solution", label: "La solution" },
      { href: "/solution#offres", label: "Tarifs" },
      { href: "/a-propos", label: "À propos" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "Ressources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/a-propos", label: "Cas clients" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    label: "Légal",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/conditions-dutilisation", label: "CGU" },
      { href: "/politique-de-confidentialite", label: "Confidentialité" },
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
            <Image
              src="/images/Logo%20VI%20blanc.png"
              alt="Uvibes"
              width={160}
              height={80}
              className="ft-logo"
            />
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
          <p className="v-mono ft-copy">© 2026 Uvibes · Made with love in Perpignan</p>
          <p className="ft-slogan v-serif">L&apos;inattendu commence ici.</p>
          <Link href="/admin/login" className="ft-admin-link" aria-label="Espace administration">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
