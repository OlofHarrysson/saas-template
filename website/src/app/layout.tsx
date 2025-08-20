import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { siteConfig } from "@/app/site-config";
import { getSEOTags } from "@/lib/seo";
import "./globals.css";

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
