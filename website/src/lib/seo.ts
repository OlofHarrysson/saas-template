import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// TODO: Add image and twitter card?

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

    // Set base URL for all relative URLs
    metadataBase: new URL(baseUrl),

    // Open Graph
    openGraph: {
      title: openGraph?.title || title || siteConfig.name,
      description:
        openGraph?.description || description || siteConfig.description,
      siteName: siteConfig.name,
      url: baseUrl,
      locale: "en_US",
      type: "website",
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
    },

    // Canonical URL
    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),
  };
}
