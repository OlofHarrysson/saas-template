import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSEOTags } from "@/lib/seo";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const font = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Uses default values from siteConfig
export const metadata: Metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${font.variable} ${font.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
