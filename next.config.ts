import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost.com", "*.localhost.com"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "kaarwan.s3.amazonaws.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "server.specificfire.com" },
      { protocol: "https", hostname: "specificfire.s3.ap-south-1.amazonaws.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost.com" },
      { protocol: "http", hostname: "sfpl.localhost.com" },
      { protocol: "http", hostname: "connect.localhost.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
