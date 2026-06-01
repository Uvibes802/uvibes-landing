import Link from "next/link";
import "../../styles/footer/footer.css";

const NAV_COLS = [
  {
    label: "Produit",
    links: [
      { href: "/solution", label: "La solution" },
      { href: "/solution#offres", label: "Tarifs" },
      { href: "/uvibes", label: "À propos" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "Ressources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/uvibes", label: "Cas clients" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    label: "Légal",
    links: [
      { href: "/mention-legale", label: "Mentions légales" },
      { href: "/conditions-dutilisation", label: "CGU" },
      { href: "/politique-de-confidentialite", label: "Confidentialité" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="ft-footer">
      <svg className="ft-curve" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 Q 360 0 720 60 T 1440 60" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        <path d="M0 90 Q 360 30 720 90 T 1440 90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>

      <div className="ft-inner">
        {/* Top — brand + nav côte à côte */}
        <div className="ft-top">
          <div className="ft-brand">
            <span className="ft-wordmark v-prompt">uvibes.</span>
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
          <Link href="/admin/crm/login" className="ft-admin-link" aria-label="Espace administration">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
