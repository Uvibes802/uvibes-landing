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
        ],
      },
    ];
  },
};

export default nextConfig;
