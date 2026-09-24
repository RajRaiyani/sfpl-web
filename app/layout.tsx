import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import "./globals.css";
import env from "@/config/env";
import { Toaster } from "react-hot-toast";
import ProviderContext from "@/components/context/provider.context";
import { GoogleAnalytics } from "@next/third-parties/google";
import ChatWidget from "@/components/shared/ChatWidget";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const DEFAULT_DESCRIPTION =
  "Specific Fire Protection Limited (SFPL) delivers end-to-end fire safety solutions across compliance, design, installation, maintenance, and IoT monitoring — Let's make fire safe India.";

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Specific Fire Protection Limited",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full-black.svg`,
  description: DEFAULT_DESCRIPTION,
  email: "contact@specificfire.com",
  telephone: "+91-9033050415",
  sameAs: [
    "https://www.linkedin.com/in/specific-fire/",
    "https://www.instagram.com/specificfire",
    "https://www.facebook.com/specific.fire",
    "https://www.youtube.com/@SPECIFIC_FIRE",
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress:
        "Office No. 2, Tower - 4, Shreeji Apartment, Mahatma Gandhi Road, Kandivali West",
      addressLocality: "Mumbai",
      postalCode: "400067",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "105, IIT Gandhinagar Research Park",
      addressLocality: "Gandhinagar",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} | Specific Fire Protection Limited`,
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
    "SFPL CONNECT",
    "IoT Fire Monitoring",
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
    title: `${SITE_NAME} | Specific Fire Protection Limited`,
    description: DEFAULT_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/images/pages/home/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "SFPL — Specific Fire Protection Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Specific Fire Protection Limited`,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/pages/home/hero-banner.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ProviderContext>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatWidget />
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
        {env.gaId ? <GoogleAnalytics gaId={env.gaId} /> : null}
      </body>
    </html>
  );
}
