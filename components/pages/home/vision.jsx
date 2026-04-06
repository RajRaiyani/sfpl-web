import Image from "next/image";

export default function Vision() {
  return (
    <section className="w-full bg-white my-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl py-7">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
            <span className="text-red-600">Vision</span>
            <span className="text-gray-800 ml-2">& Mission</span>
            <span className="block h-1 w-16 bg-red-600 mt-2 rounded"></span>
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            <span className="font-semibold text-gray-900">Our vision: </span>
            To become India&apos;s most trusted and innovative fire safety
            company, ensuring every building is equipped with intelligent and
            reliable fire protection systems.
          </p>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            <span className="font-semibold text-gray-900">Our mission: </span>
            To deliver advanced, compliant, and end-to-end fire safety solutions
            that prevent fire incidents, protect lives, and support our
            commitment:{" "}
            <span className="font-semibold text-red-600">
              &ldquo;Let&apos;s Make Fire Safe India.&rdquo;
            </span>
          </p>
          <p className="text-gray-700 leading-relaxed">
            At SFPL, we don&apos;t just install systems—we engineer safety with
            our customers, partners, and stakeholders across India.
          </p>
        </div>
        <div className="flex-1 h-full w-full flex justify-center relative min-w-[320px]">
          <Image
            src="/images/pages/home/about-graphic.png"
            alt="Vision"
            width={500}
            height={500}
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
}
