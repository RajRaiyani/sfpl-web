import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/shared/header";
import "./globals.css";
import Footer from "@/components/shared/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SFPL",
  description: "SFPL - Specific Fire Protection Limited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SFPL - Specific Fire Protection Limited</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="SFPL - Specific Fire Protection Limited"
        />
        <meta
          name="keywords"
          content="SFPL, Specific Fire Protection Limited, Fire Safety, Fire Protection, Fire Extinguishers, Fire Safety Solutions"
        />
        <meta name="author" content="SFPL" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/fave.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
