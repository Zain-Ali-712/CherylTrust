
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using webpack (not Turbopack) via --webpack flag in dev script
  // so @tailwindcss/postcss can scan source files and generate
  // all Tailwind v4 utility classes properly.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
