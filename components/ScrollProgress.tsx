"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Cpu } from "lucide-react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.min(Math.round(latest * 100), 100));
    });
  }, [scrollYProgress]);

  // Generate ASCII block progress bar
  const totalBlocks = 8;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const asciiBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none font-mono">
      {/* Top Thin Glowing Progress Bar */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] origin-left"
        style={{ scaleX }}
      />

      {/* Floating System Progress Widget (Bottom Right, Non-Overlapping) */}
      <div className="hidden lg:flex items-center gap-2 fixed bottom-6 right-6 z-40 pointer-events-auto bg-[var(--surface)] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border)] text-[10px] text-[var(--fg)] shadow-2xl transition-colors duration-200">
        <Cpu size={13} className="text-[var(--accent)] animate-pulse" />
        <span className="text-[var(--fg-subtle)] font-bold">SYSTEM_PROGRESS:</span>
        <span className="text-emerald-600 dark:text-emerald-400 tracking-tighter font-mono">{asciiBar}</span>
        <span className="font-bold text-[var(--accent)] w-7 text-right">{percentage}%</span>
      </div>
    </div>
  );
}
