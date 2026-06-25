import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "www.google.com",
      "kaarwan.s3.amazonaws.com",
      "via.placeholder.com",
      "localhost",
      "127.0.0.1",
      "server.specificfire.com",
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
