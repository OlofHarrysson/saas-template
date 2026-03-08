/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://yourdomain.com", // TODO: Add your domain
  generateRobotsTxt: true,
  exclude: ["/twitter-image.*", "/opengraph-image.*", "/icon.*"],
  sourceDir: ".next-build",
};

export default config;
