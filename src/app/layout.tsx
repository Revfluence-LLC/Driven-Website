import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { APP_STORE_ID, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Speedometer App & Free Online GPS Speedometer | Driven",
    template: "%s | Driven",
  },
  description:
    "Check your speed with a free online GPS speedometer, or get the Speedometer app for iPhone: HUD, speed alerts, automatic trip recording, and a 0–60 timer.",
  applicationName: "Driven",
  openGraph: {
    siteName: "Driven",
    title: "Speedometer App & Free Online GPS Speedometer",
    description:
      "Check your speed in MPH or km/h for free, or track every trip with the Speedometer app for iPhone.",
    type: "website",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedometer App & Free Online GPS Speedometer",
    description:
      "Check your speed in MPH or km/h for free, or track every trip with the Speedometer app for iPhone.",
  },
  itunes: { appId: APP_STORE_ID },
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
        <Analytics />
      </body>
    </html>
  );
}
