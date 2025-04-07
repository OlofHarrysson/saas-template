import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { siteConfig } from "@/app/site-config";
import { getSEOTags } from "@/lib/seo";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
      <body className={`${font.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "!rounded-md !p-4 !shadow-md",
            success: {
              className: "toast-success",
              duration: 4000,
            },
            error: {
              className: "toast-error",
              duration: 4000,
            },
          }}
        />
      </body>
    </html>
  );
}
