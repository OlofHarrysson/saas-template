import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import PlausibleProvider from "next-plausible";
import { siteConfig } from "@/config/site";
import { getSEOTags } from "@/lib/seo";

const font = Inter({ subsets: ["latin"] });

// Uses default values from siteConfig
export const metadata: Metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain={siteConfig.domain}
          trackOutboundLinks={siteConfig.analytics.plausible.trackOutboundLinks}
          hash={siteConfig.analytics.plausible.hash}
          enabled={process.env.NODE_ENV === "production"}
        />
      </head>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
