import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true" || !!process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/Prakriti" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
