/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { createPageMetadata, homepageDescription, homepageTitle } from "./lib/site";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: homepageTitle,
    description: homepageDescription,
    path: "/",
  }),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.png?v=2",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4846A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;900&family=Dancing+Script:wght@700&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
