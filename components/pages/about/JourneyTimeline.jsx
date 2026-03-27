"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CalendarDays } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function TimelineItem({ item, index, progress }) {
  const isEven = index % 2 === 0;
  const reduceMotion = useReducedMotion();
  const start = Math.max(0, index * 0.16);
  const end = Math.min(1, start + 0.35);
  const y = useTransform(progress, [start, end], [28, 0]);
  const opacity = useTransform(progress, [start, end], [0.35, 1]);
  const scale = useTransform(progress, [start, end], [0.98, 1]);

  return (
    <motion.div
      variants={itemVariants}
      style={reduceMotion ? undefined : { y, opacity, scale }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-0 sm:items-center"
    >
      <div
        className={`${
          isEven
            ? "sm:pr-12 sm:text-right sm:order-1"
            : "sm:pl-12 sm:text-left sm:order-2"
        }`}
      >
        <p className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-gray-200/90 select-none">
          {item.year}
        </p>
      </div>

      <div
        className={`relative ${
          isEven ? "sm:pl-12 sm:order-2" : "sm:pr-12 sm:order-1"
        }`}
      >
        <span
          className={`absolute -left-8 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-500 bg-white shadow-sm ${
            isEven ? "sm:-left-3" : "sm:-right-3 sm:left-auto"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-red-600" />
        </span>

        <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
          <div className="flex items-center mb-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-red-100 text-red-700 px-3 py-1 text-sm font-semibold">
              <CalendarDays className="h-4 w-4" />
              {item.year}
            </p>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneyTimeline({ timeline }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="relative max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-red-100" />
      <motion.div
        className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-red-400 via-red-600 to-red-500"
        style={{ scaleY: lineScale }}
      />

      <div className="space-y-5">
        {timeline.map((item, index) => (
          <TimelineItem
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}
