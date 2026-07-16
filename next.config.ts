import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  // The thumbnail batch worker sets this so its Turbopack manifest never
  // shares the normal development server's .next cache.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
