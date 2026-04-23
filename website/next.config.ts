import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const DEV_DIST_DIR = ".next";
const LOCAL_BUILD_DIST_DIR = ".next-build";

const createNextConfig = (phase: string): NextConfig => ({
  // Keep local production builds separate so `next build` does not clobber a live
  // `next dev` cache, but use the default output dir on Vercel because its build
  // pipeline expects `.next`.
  distDir:
    phase === PHASE_DEVELOPMENT_SERVER
      ? DEV_DIST_DIR
      : process.env.VERCEL
        ? DEV_DIST_DIR
        : LOCAL_BUILD_DIST_DIR,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  // Add PostHog rewrites/proxy. Note: improve-now is a random string to avoid adblocks
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/improve-now/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/improve-now/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
});

export default createNextConfig;
