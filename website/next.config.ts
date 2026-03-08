import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const DEV_DIST_DIR = ".next";
const BUILD_DIST_DIR = ".next-build";

const createNextConfig = (phase: string): NextConfig => ({
  // Keep production builds separate so `next build` does not clobber a live `next dev` cache.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? DEV_DIST_DIR : BUILD_DIST_DIR,
  // Add PostHog rewrites/proxy. Note: improve-now is a random string to avoid adblocks
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
