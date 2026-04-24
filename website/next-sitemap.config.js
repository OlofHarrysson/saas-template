/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://yourdomain.com", // TODO: Add your domain
  generateRobotsTxt: true,
  exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"],
  // Must match next.config.ts: local builds use .next-build, Vercel uses .next.
  sourceDir: process.env.VERCEL ? ".next" : ".next-build",
};

export default config;
