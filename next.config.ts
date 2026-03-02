import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using webpack (not Turbopack) via --webpack flag in dev script
  // so @tailwindcss/postcss can scan source files and generate
  // all Tailwind v4 utility classes properly.
};

export default nextConfig;
