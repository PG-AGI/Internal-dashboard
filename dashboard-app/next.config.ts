import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
