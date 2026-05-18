import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "wp.uvibes.fr" }],
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
