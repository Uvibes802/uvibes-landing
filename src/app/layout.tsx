import CookieConsent from "@/components/cookieConsent";
import Menu from "@/components/menu/Menu";
import HtmlLangSync from "@/components/shared/HtmlLangSync";
import RevealObserver from "@/components/shared/RevealObserver";
import MaintenanceWrapper from "@/components/maintenance/MaintenanceWrapper";
import GARouteTracker from "@/components/analytics/GARouteTracker";
import { getMaintenanceStatus } from "@/lib/maintenanceState";
import { OG_IMAGE_DEFAULT, PAGE_SEO, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { Pacifico, Prompt, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const prompt = Prompt({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-prompt",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

// Police d'accent — script ronde et joueuse (mots en italique, grands chiffres)
const accentFont = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.fr.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.fr.description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": SITE_URL,
      "en-US": `${SITE_URL}${PAGE_SEO.home.en?.path ?? "/en"}`,
    },
  },
  openGraph: {
    title: PAGE_SEO.home.fr.title,
    description: PAGE_SEO.home.fr.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [{ url: OG_IMAGE_DEFAULT, width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = getMaintenanceStatus();
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <html lang="fr">
      <head>
        {/* Google Analytics — chargé uniquement si l'ID est défini (sinon rien) */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                  });
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${prompt.variable} ${robotoMono.variable} ${accentFont.variable}`}>
        {/* Lien d'évitement clavier — masqué jusqu'au focus (accessibilité) */}
        <a href="#main-content" className="skip-link">Aller au contenu</a>
        {/* Menu et CookieConsent se masquent eux-mêmes sur /admin & /devis (garde-fou client usePathname) */}
        <HtmlLangSync />
        <Menu />
        <RevealObserver />
        {/* Cible du lien d'évitement (span sans boîte → aucun impact de mise en page) */}
        <span id="main-content" tabIndex={-1} />
        <MaintenanceWrapper isMaintenanceMode={isMaintenanceMode}>
            {children}
            <CookieConsent />
            <GARouteTracker />
        </MaintenanceWrapper>
      </body>
    </html>
  );
}
