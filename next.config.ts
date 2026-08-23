import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Smaller client graphs during HMR (icon packages are huge if imported as barrels).
  experimental: {
    optimizePackageImports: ["react-icons/hi2", "react-icons/hi", "react-icons/fa", "react-icons/si"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
