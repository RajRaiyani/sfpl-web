"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Home, Search } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function NotFound() {
  const cardRef = useRef(null);
  const ringOneRef = useRef(null);
  const ringTwoRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9 }
    );

    gsap.to(ringOneRef.current, {
      rotation: 360,
      duration: 16,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ringTwoRef.current, {
      rotation: -360,
      duration: 22,
      repeat: -1,
      ease: "none",
    });

    gsap.to([ringOneRef.current, ringTwoRef.current], {
      y: "+=12",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.25,
    });
  }, []);

  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-gradient-to-b from-white via-red-50/30 to-white px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute left-[10%] top-[10%] h-44 w-44 rounded-full bg-red-200/40 blur-3xl"
          animate={{ x: [0, 20, -12, 0], y: [0, -14, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[8%] right-[12%] h-56 w-56 rounded-full bg-red-300/35 blur-3xl"
          animate={{ x: [0, -24, 8, 0], y: [0, 18, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-14">
        <div className="relative flex items-center justify-center">
          <div
            ref={ringOneRef}
            className="absolute h-56 w-56 rounded-full border border-dashed border-red-300/80"
          />
          <div
            ref={ringTwoRef}
            className="absolute h-72 w-72 rounded-full border border-red-200/70"
          />
          <motion.h1
            className="select-none text-[7rem] font-black leading-none text-red-600 drop-shadow-sm sm:text-[8.5rem]"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          >
            404
          </motion.h1>
        </div>

        <div
          ref={cardRef}
          className="w-full max-w-xl rounded-3xl border border-red-100 bg-white/90 p-7 shadow-xl shadow-red-100/50 backdrop-blur sm:p-9"
        >
          <motion.p
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600"
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <Search className="h-3.5 w-3.5" />
            Page not found
          </motion.p>

          <motion.h2
            className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Looks like this route got lost in transit.
          </motion.h2>

          <motion.p
            className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            The page you are trying to reach does not exist or may have been
            moved. Use one of the options below to continue exploring SFPL.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700"
            >
              <Home className="h-4 w-4" />
              Go to homepage
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Visit SFPL Connect
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
