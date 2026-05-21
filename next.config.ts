import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "wp.uvibes.fr" }],
  },

  // Redirections permanentes des anciennes URLs vers /solution
  async redirects() {
    return [
      { source: "/avantages", destination: "/solution", permanent: true },
      { source: "/features",  destination: "/solution", permanent: true },
    ];
  },

  // Headers de sécurité envoyés sur toutes les routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },                                    // Anti-clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" },                          // Anti-MIME sniffing
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },         // Contrôle du header Referer
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, // Désactive APIs non utilisées
        ],
      },
    ];
  },
};

export default nextConfig;
