import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#ede9e2] bg-grid-pattern pt-10 pb-8 sm:pt-14 sm:pb-10 md:pt-16 md:pb-12"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Specific Fire Protection Limited
            </p>
            <h1
              id="hero-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
            >
              Let&apos;s Make Fire Safe India.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              End-to-end fire safety — compliance, design, installation,
              maintenance, and intelligent IoT monitoring.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Get a Quote
              </Link>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-2 rounded-xl border border-black/5 bg-white/60 p-3 shadow-sm backdrop-blur-sm sm:mt-10 sm:gap-4 sm:p-4">
              <div className="text-center">
                <dt className="sr-only">Years of experience</dt>
                <dd className="text-xl font-bold text-primary sm:text-2xl">
                  10+
                </dd>
                <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
                  Years Experience
                </p>
              </div>
              <div className="border-x border-border text-center">
                <dt className="sr-only">Projects completed</dt>
                <dd className="text-xl font-bold text-primary sm:text-2xl">
                  150+
                </dd>
                <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
                  Projects
                </p>
              </div>
              <div className="text-center">
                <dt className="sr-only">Client retention rate</dt>
                <dd className="text-xl font-bold text-primary sm:text-2xl">
                  98%+
                </dd>
                <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
                  Retention Rate
                </p>
              </div>
            </dl>
          </div>

          <div className="relative order-1 overflow-hidden rounded-2xl lg:order-2">
            <Image
              src="/images/pages/home/hero-banner.png"
              alt="SFPL fire safety systems and engineered protection equipment"
              width={1000}
              height={1000}
              className="h-auto w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div
        className="mt-8 hidden w-full items-end justify-between gap-4 px-6 md:mt-10 md:flex md:px-12 lg:px-20"
        aria-hidden="true"
      >
        <div className="flex items-end gap-3 lg:gap-4">
          <Image
            src="/images/pages/home/fire-home.png"
            alt=""
            width={300}
            height={300}
            className="h-28 w-auto lg:h-36"
            sizes="180px"
          />
          <Image
            src="/images/pages/home/fire-man.png"
            alt=""
            width={300}
            height={300}
            className="h-24 w-auto lg:h-32"
            sizes="160px"
          />
        </div>
        <Image
          src="/images/pages/home/fire-tender.png"
          alt=""
          width={300}
          height={300}
          className="h-28 w-auto lg:h-36"
          sizes="200px"
        />
      </div>
    </section>
  );
}
