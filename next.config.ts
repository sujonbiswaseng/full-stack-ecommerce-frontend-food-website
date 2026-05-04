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

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
    ]
  },
};

export default nextConfig;
