import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/site-config";

const publicPaths = ["", "/about", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: `https://${siteConfig.domain}${path}`,
  }));
}
