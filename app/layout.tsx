import type { Metadata } from "next";
import { Zilla_Slab, Inter } from "next/font/google";
import "./globals.css";

const heading = Zilla_Slab({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading-loaded",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-loaded",
});

export const metadata: Metadata = {
  title: "SHIFF",
  description: "The story of the Pittsburgh Cocaine Seven. A scripted limited series.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "SHIFF",
    description: "The true story of the Pittsburgh Cocaine Seven.",
    images: ["/images/hero-celebration.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
