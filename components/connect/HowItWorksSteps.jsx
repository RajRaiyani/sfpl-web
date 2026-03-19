"use client";

import { motion } from "motion/react";
import { Plug, Cpu, Cloud, LayoutDashboard } from "lucide-react";

const steps = [
  {
    icon: Plug,
    step: "01",
    title: "Connect your sensors",
    desc: "Attach any sensors — pressure, level, temperature, flow, and more — to the input pins of the SFPL Connect device. Supports single or multi-unit deployments.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Device reads & transmits",
    desc: "The compact IoT device continuously reads all connected pins simultaneously and securely transmits the data to the SFPL cloud in real time.",
  },
  {
    icon: Cloud,
    step: "03",
    title: "Cloud processes & stores",
    desc: "The SFPL cloud ingests, calibrates, and stores every reading. Custom calibration and per-pin alert thresholds are applied automatically.",
  },
  {
    icon: LayoutDashboard,
    step: "04",
    title: "Monitor from anywhere",
    desc: "Access live dashboards, map views, alerts, and analytics through the SFPL admin portal on any device — browser or mobile.",
  },
];

export default function HowItWorksSteps() {
  return (
    <div className="space-y-6">
      {steps.map(({ icon: Icon, step, title, desc }, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
          className="flex gap-5"
        >
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-200">
              <Icon className="w-5 h-5 text-white" />
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-gray-200 mt-2" />
            )}
          </div>
          <div className="pb-6">
            <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
              Step {step}
            </p>
            <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
