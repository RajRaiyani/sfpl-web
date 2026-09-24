import Image from "next/image";

export default function Vision() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="w-full bg-white py-14 sm:py-16 md:py-20"
    >
      <div className="container mx-auto flex flex-col items-center gap-10 px-4 md:flex-row md:gap-12 lg:gap-16">
        <div className="max-w-xl flex-1 py-2 md:py-4">
          <h2
            id="vision-heading"
            className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl"
          >
            <span className="text-primary">Vision</span>
            <span className="ml-2 text-gray-800">&amp; Mission</span>
            <span className="mt-2 block h-1 w-16 rounded bg-primary" />
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            <span className="font-semibold text-gray-900">Our vision: </span>
            To become India&apos;s most trusted and innovative fire safety
            company, ensuring every building is equipped with intelligent and
            reliable fire protection systems.
          </p>
          <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            <span className="font-semibold text-gray-900">Our mission: </span>
            To deliver advanced, compliant and end-to-end fire safety solutions
            that prevent fire incidents, protect lives and support our
            commitment:{" "}
            <span className="font-semibold text-primary">
              &ldquo;Let&apos;s Make Fire Safe India.&rdquo;
            </span>
          </p>
          <p className="leading-relaxed text-gray-700">
            At SFPL, we don&apos;t just install systems—we engineer safety in
            collaboration with our customers, partners and stakeholders across
            India.
          </p>
        </div>
        <div className="relative flex w-full flex-1 justify-center">
          <Image
            src="/images/pages/home/about-graphic.png"
            alt="Illustration of SFPL vision for intelligent fire protection across India"
            width={500}
            height={500}
            className="h-auto w-full max-w-md object-contain"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
