import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node-appwrite"],
};

// Proxy Plausible analytics script to avoid ad-blockers
// Serves from /assets/js/client.js instead of /proxy/js/script.js for better stealth
export default withPlausibleProxy({
  subdirectory: "assets",
  scriptName: "client",
})(nextConfig);
