import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.shaped.ai",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["langchain", "@langchain/core", "@langchain/anthropic"],
  },
  // Webpack config for when using --webpack flag
  webpack: (config, { isServer }) => {
    // Resolve symlinks for npm link packages
    config.resolve.symlinks = true;
    return config;
  },
  // Turbopack config (default in Next.js 16)
  // Turbopack handles symlinks automatically, empty config silences the warning
  turbopack: {},
  transpilePackages: ["@shaped.ai/client"],
};

export default nextConfig;
