import Image from "next/image";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-10 from-primary/5 via-background to-primary/10 bg-grid-pattern bg-[#ede9e2]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Let's Make Fire Safe India.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground">
              We are a team of fire safety experts who are dedicated to making
              India fire safe.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/services"
                className="group relative overflow-hidden rounded-lg bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl text-center"
              >
                <span className="relative z-10">Explore Services</span>
              </Link>
              <Link
                href="/contact"
                className="rounded-lg bg-white/50 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-primary shadow-sm transition-all backdrop-blur-md hover:scale-105 hover:shadow-md text-center"
              >
                Get a Quote
              </Link>
            </div>
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 rounded-lg bg-white/50 p-3 sm:p-4 shadow-sm backdrop-blur-md">
              <div className="text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  10+
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="border-x border-border text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  150+
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Projects
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  98%+
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/pages/home/hero-banner.png"
              alt="Fire Safety Equipment"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full mt-6 sm:mt-8 md:mt-10 justify-between px-4 sm:px-8 md:px-12 lg:px-20 items-baseline gap-4">
        <div className="flex gap-2 sm:gap-3 md:gap-4 items-baseline">
          <img
            src="/images/pages/home/fire-home.png"
            alt="Fire Safety Equipment"
            width={300}
            height={300}
            className="h-24 sm:h-32 md:h-36 lg:h-40 w-auto"
          />
          <img
            src="/images/pages/home/fire-man.png"
            alt="Fire Safety Equipment"
            width={300}
            height={300}
            className="h-20 sm:h-28 md:h-32 lg:h-32 w-auto"
          />
        </div>
        <img
          src="/images/pages/home/fire-tender.png"
          alt="Fire Safety Equipment"
          width={300}
          height={300}
          className="h-24 sm:h-32 md:h-36 lg:h-40 w-auto"
        />
      </div>
    </section>
  );
}
