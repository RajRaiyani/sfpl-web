"use client";

import { motion } from "motion/react";
import { Plug, Cpu, Cloud, LayoutDashboard } from "lucide-react";

function StepItem({ icon: Icon, step, index, title, isLast, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="flex gap-5"
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-200">
          <Icon className="w-5 h-5 text-white" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-2" />}
      </div>
      <div className="pb-6">
        <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
          Step {step}
        </p>
        <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed text-justify">
          {children}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSteps() {
  return (
    <div className="space-y-6">
      <StepItem icon={Plug} step="- 1" index={0} title="Connect Your Sensors">
        Connect pressure, water level, temperature, voltage, current, flow, or
        other compatible sensors to the SFPL{" "}
        <strong className="text-primary">CONNECT</strong> device.
      </StepItem>
      <StepItem icon={Cpu} step="- 2" index={1} title="Collect & Transmit Data">
        The SFPL <strong className="text-primary">CONNECT</strong> IoT device
        continuously monitors all connected inputs and securely transmits
        real-time data to the SFPL Cloud over reliable communication networks.
      </StepItem>
      <StepItem icon={Cloud} step="- 3" index={2} title="Process & Analyze">
        The SFPL Cloud receives, calibrates, processes and securely stores every
        data point. Intelligent rules, custom calibration and configurable alert
        thresholds ensure accurate monitoring and timely notifications.
      </StepItem>
      <StepItem
        icon={LayoutDashboard}
        step="- 4"
        index={3}
        title="Monitor from Anywhere"
        isLast
      >
        Access live dashboards, device status, alerts, reports, analytics and
        map views through the SFPL{" "}
        <strong className="text-primary">CONNECT</strong> web portal or mobile
        device—anytime, anywhere.
      </StepItem>
    </div>
  );
}
