import MaintenancePage from "@/app/maintenance/page";
import CookieConsent from "@/components/cookieConsent";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bienvenue sur Uvibes",
  description:
    //prettier-ignore
    "L’outil pour déclencher les conversations qui manquaient.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

async function getWordPressMaintenanceStatus(): Promise<boolean> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/acf/v3/pages/721`;
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    const maintenanceValue = data.acf?.maintenance_active;
    return (
      maintenanceValue === true ||
      maintenanceValue === "Vrai" ||
      (Array.isArray(maintenanceValue) && maintenanceValue.includes("Vrai"))
    );
  } catch (error) {
    console.error("Erreur de vérification de la maintenance :", error);
    return false;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = await getWordPressMaintenanceStatus();

  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
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
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname
              });
              console.log('Google Analytics initialized with denied consent');
            `,
          }}
        />
      </head>
      <body className={roboto.variable}>
        {isMaintenanceMode ? (
          <MaintenancePage />
        ) : (
          <>
            {children}
            <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
