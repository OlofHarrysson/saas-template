import type { Metadata } from "next";
import { siteConfig } from "@/app/site-config";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrlRelative?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

export function getSEOTags({
  title,
  description,
  keywords,
  canonicalUrlRelative,
  openGraph,
}: SEOProps = {}): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || `https://${siteConfig.domain}`;

  return {
    // Basic SEO
    title: title || siteConfig.name,
    description: description || siteConfig.description,
    keywords: keywords || [siteConfig.name],
    applicationName: siteConfig.name,

    // Set base URL for all relative URLs
    metadataBase: new URL(baseUrl),

    // Open Graph
    openGraph: {
      title: openGraph?.title || siteConfig.name,
      description: openGraph?.description || siteConfig.description,
      siteName: siteConfig.name,
      url: baseUrl, // Only affects the render, not the link
      locale: "en_US",
      type: "website",
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
    },

    // If a canonical URL is given, we add it. The metadataBase will turn the relative URL into a fully qualified URL
    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),
  };
}
