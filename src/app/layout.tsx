import CookieConsent from "@/components/cookieConsent";
import MaintenanceWrapper from "@/components/maintenance/MaintenanceWrapper";
import { getMaintenanceStatus } from "@/lib/maintenanceState";
import { OG_IMAGE_DEFAULT, PAGE_SEO, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      fr: SITE_URL,
    },
  },
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = getMaintenanceStatus();

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
        <MaintenanceWrapper isMaintenanceMode={isMaintenanceMode}>
            {children}
            <CookieConsent />
        </MaintenanceWrapper>
      </body>
    </html>
  );
}
