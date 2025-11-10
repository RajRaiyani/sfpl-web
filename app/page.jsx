import Hero from "@/components/pages/home/hero";
import Services from "@/components/pages/home/services";
import Clients from "@/components/pages/home/clients";
import Vision from "@/components/pages/home/vision";
import "@/components/pages/home/style.css";
import Contact from "@/components/pages/home/contact";

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
