import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/shared/header";
import "./globals.css";
import Footer from "@/components/shared/footer";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/shared/CustomCursor";
import ProviderContext from "@/components/context/provider.context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://specificfire.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SFPL",
    template: "%s | SFPL",
  },
  description: "SFPL - Specific Fire Protection Limited",
  keywords: [
    "SFPL",
    "Specific Fire Protection Limited",
    "Fire Safety",
    "Fire Protection",
    "Fire Extinguishers",
    "Fire Safety Solutions",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fave.svg",
  },
  openGraph: {
    type: "website",
    siteName: "SFPL",
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
    images: ["/logo-full-black.svg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
    </html>
  );
}
