import Link from "next/link";
import Image from "next/image";
import ManageCookiesLink from "./ManageCookiesLink";
import "../../styles/footer/footer.css";

const NAV_COLS_FR = [
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

// Mêmes cibles que la version FR (les pages légales restent en français) — labels traduits.
const NAV_COLS_EN = [
  {
    label: "Our solution",
    links: [
      { href: "/en/method", label: "Method" },
      { href: "/en/pricing", label: "Pricing" },
    ],
  },
  {
    label: "Our world",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/en/about", label: "About" },
    ],
  },
  {
    label: "Get in touch",
    links: [
      { href: "/en#contact", label: "Write to us" },
      { href: "/rendez-vous", label: "Book a call" },
    ],
  },
  {
    label: "Legal (FR)",
    links: [
      { href: "/mentions-legales", label: "Legal notice" },
      { href: "/conditions-d-utilisation", label: "Terms of use" },
      { href: "/politique-de-confidentialite", label: "Privacy policy" },
      { href: "/politique-cookies", label: "Cookies" },
    ],
  },
];

export default function Footer({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const NAV_COLS = locale === "en" ? NAV_COLS_EN : NAV_COLS_FR;
  const homeHref = locale === "en" ? "/en" : "/";

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
            <Link href={homeHref} aria-label={locale === "en" ? "Back to Uvibes home" : "Retour à l'accueil Uvibes"}>
              <Image
                src="/images/Logo%20VI%20blanc.png"
                alt="Uvibes"
                width={160}
                height={80}
                className="ft-logo"
              />
            </Link>
            <p className="ft-tagline v-serif">
              {locale === "en" ? "Switch on the right vibes." : "Activez les bonnes ondes."}
            </p>
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
                  {col.label === NAV_COLS[3].label && (
                    <li><ManageCookiesLink locale={locale} /></li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-divider" aria-hidden="true" />

        <div className="ft-bottom">
          <p className="v-mono ft-copy">© 2026 Uvibes</p>
          <p className="ft-slogan v-serif">
            {locale === "en" ? "The unexpected starts here." : "L'inattendu commence ici."}
          </p>
          <Link href="/admin/login" className="ft-admin-link" aria-label="Espace administration">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
