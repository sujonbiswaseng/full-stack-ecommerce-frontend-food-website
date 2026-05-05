import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    formats: ["image/avif", "image/webp"] as const,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],

  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
