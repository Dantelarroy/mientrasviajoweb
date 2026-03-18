/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MientrasViajo",
  description:
    "Un finde en la naturaleza para mujeres que quieren reconectar. 15-17 de Mayo.",
  metadataBase: new URL("https://www.mientrasviajo.com"),
  icons: {
    icon: "/favicon.png?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.png?v=2",
  },
  openGraph: {
    title: "MientrasViajo",
    description:
      "Un finde en la naturaleza para mujeres que quieren reconectar. 15-17 de Mayo.",
    type: "website",
    images: [{ url: "/assets/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MientrasViajo",
    description:
      "Un finde en la naturaleza para mujeres que quieren reconectar. 15-17 de Mayo.",
    images: ["/assets/logo.png"],
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
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;900&family=Dancing+Script:wght@700&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
