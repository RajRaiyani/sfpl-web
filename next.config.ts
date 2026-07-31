import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost.com", "*.localhost.com"],
  images: {
    domains: [
      "localhost.com",
      "images.unsplash.com",
      "www.google.com",
      "kaarwan.s3.amazonaws.com",
      "via.placeholder.com",
      "localhost",
      "127.0.0.1",
      "sfpl.localhost.com",
      "connect.localhost.com",
      "server.specificfire.com",
    ],
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
