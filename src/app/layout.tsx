import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Driven — Precision Speed Tracker",
  description:
    "Track your speed in real-time, record trips automatically, and review your driving history with precision GPS telemetry.",
  metadataBase: new URL("https://driven-app.com"),
  openGraph: {
    title: "Driven — Precision Speed Tracker",
    description:
      "Track your speed in real-time, record trips automatically, and review your driving history.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driven — Precision Speed Tracker",
    description:
      "Track your speed in real-time, record trips automatically, and review your driving history.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <head>
        <meta name="theme-color" content="#10141A" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
