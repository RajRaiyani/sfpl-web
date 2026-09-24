import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-white via-red-50/30 to-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">
          Page not found
        </p>
        <p
          className="select-none text-7xl font-black leading-none text-primary sm:text-8xl"
          aria-hidden
        >
          404
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          The page you are trying to reach does not exist or may have been
          moved. Continue exploring SFPL below.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Go to homepage
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Visit SFPL CONNECT
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
