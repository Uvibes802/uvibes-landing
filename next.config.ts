import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { hostname: "wp.uvibes.fr" },
      { hostname: "*.cloudfront.net" },
      { hostname: "secure.gravatar.com" },
    ],
  },

  // Redirections permanentes des anciennes URLs vers /solution
  async redirects() {
    return [
      { source: "/avantages", destination: "/solution", permanent: true },
      { source: "/features",  destination: "/solution", permanent: true },
      // Pages renommées (slugs plus clairs / SEO) — 301 pour préserver le référencement
      { source: "/uvibes", destination: "/a-propos", permanent: true },
      { source: "/mention-legale", destination: "/mentions-legales", permanent: true },
      { source: "/conditions-dutilisation", destination: "/conditions-d-utilisation", permanent: true },
      { source: "/rdv", destination: "/rendez-vous", permanent: true },
    ];
  },

  // Headers de sécurité envoyés sur toutes les routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },                              // Anti-clickjacking (autorise nos propres iframes, ex. aperçu PDF)
          { key: "X-Content-Type-Options", value: "nosniff" },                          // Anti-MIME sniffing
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },         // Contrôle du header Referer
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, // Désactive APIs non utilisées
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }, // Force HTTPS (ignoré en local http)
          // CSP en mode report-only : ne bloque rien, remonte les violations en console.
          // Une fois les rapports propres, basculer la clé en "Content-Security-Policy".
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "img-src 'self' data: https://wp.uvibes.fr https://*.cloudfront.net https://secure.gravatar.com https://www.google-analytics.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://wp.uvibes.fr https://www.google-analytics.com https://*.google-analytics.com",
              "media-src 'self' https://*.cloudfront.net https://wp.uvibes.fr",
              "frame-src 'self' https://calendly.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
