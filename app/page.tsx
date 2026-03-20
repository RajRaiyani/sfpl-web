import Hero from "@/components/pages/home/hero";
import Services from "@/components/pages/home/services";
import Clients from "@/components/pages/home/clients";
import Vision from "@/components/pages/home/vision";
import "@/components/pages/home/style.css";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fire Safety Solutions | SFPL",
  description:
    "Let's Make Fire Safe India. End-to-end fire safety solutions across compliance, design, installation, and maintenance.",
  path: "/",
  image: "/images/pages/home/hero-banner.png",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Services />
      <Clients />
      {/* <Contact /> */}
    </>
  );
}
