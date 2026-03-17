import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escapada Vol I | Mientras Viajo",
  description:
    "Viaje con mujeres, viaje para re-conectar, viaje para disfrutar y trabajar la creatividad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
