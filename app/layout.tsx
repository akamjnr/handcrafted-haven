import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://handcrafted-haven.vercel.app"),

  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },

  description:
    "Discover unique handcrafted treasures from talented artisans. Shop handmade jewelry, decor, art prints and skincare.",

  keywords: [
    "handmade marketplace",
    "artisan products",
    "local crafts",
    "handcrafted gifts",
    "sustainable shopping",
    "custom handmade items",
  ],

  openGraph: {
    title: "Handcrafted Haven",
    description:
      "Discover unique handcrafted treasures from talented artisans.",
    url: "https://handcrafted-haven.vercel.app",
    siteName: "Handcrafted Haven",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Haven",
    description:
      "Discover unique handcrafted treasures from talented artisans.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}