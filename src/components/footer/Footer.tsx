import Link from "next/link";
import "../../styles/footer/footer.css";

const NAV_COLS = [
  {
    label: "Produit",
    links: [
      { href: "/solution", label: "La solution" },
      { href: "/solution#offres", label: "Nos offres" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "Entreprise",
    links: [
      { href: "/uvibes", label: "À propos" },
      { href: "/#contact", label: "Contact" },
      { href: "https://app.uvibes.fr/welcome", label: "Connexion" },
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
      <div className="ft-top">
        {/* Wordmark géant */}
        <div className="ft-brand">
          <span className="ft-wordmark v-prompt">uvibes.</span>
          <p className="ft-tagline v-serif">Activez la puissance de votre collectif.</p>
        </div>

        {/* Colonnes de nav */}
        <div className="ft-nav">
          {NAV_COLS.map((col) => (
            <div key={col.label} className="ft-nav-col">
              <p className="v-mono ft-nav-label">{col.label}</p>
              <ul className="ft-nav-list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="ft-nav-link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bas de footer */}
      <div className="ft-bottom">
        <p className="v-mono ft-copy">© {new Date().getFullYear()} Uvibes — Tous droits réservés</p>

        <div className="ft-socials">
          <Link href="https://www.linkedin.com/company/uvibes" className="ft-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </Link>
          <Link href="https://www.instagram.com/uvibesofficiel/" className="ft-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
