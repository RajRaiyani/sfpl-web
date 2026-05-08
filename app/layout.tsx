import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import "./globals.css";
import env from "@/config/env";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/shared/CustomCursor";
import ProviderContext from "@/components/context/provider.context";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";
const SITE_NAME = "SFPL";
const DEFAULT_DESCRIPTION =
  "SFPL - Specific Fire Protection Limited - Let's make fire safe India.";
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Specific Fire Protection Limited",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full-black.svg`,
  description: DEFAULT_DESCRIPTION,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "SFPL",
    "Specific Fire",
    "Specific Fire Protection",
    "Specific Fire Protection Limited",
    "Fire Safety",
    "Fire Protection",
    "Fire Extinguishers",
    "Fire Safety Solutions",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/fave.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/logo-full-black.svg",
        width: 1200,
        height: 630,
        alt: "SFPL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo-full-black.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <ProviderContext>
          <CustomCursor />
          <Header />
          {children}
          <Footer />

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ProviderContext>
      </body>
      <GoogleAnalytics gaId={env.gaId || ""} />
    </html>
  );
}
