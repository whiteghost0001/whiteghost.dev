"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Cpu, CheckCircle2 } from "lucide-react";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  "Loading kernel modules...",
  "Loading developer profile...",
  "Loading repository catalog...",
  "Loading interactive skills matrix...",
  "Initializing terminal shell...",
  "WHITEGHOST OS READY",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BOOT_STEPS.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 5;
        clearInterval(progressInterval);
        setTimeout(onComplete, 400);
        return 100;
      });
    }, 40);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const filled = Math.floor(progress / 5);
  const empty = 20 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);

  return (
    <div className="fixed inset-0 z-50 bg-[#040711] flex flex-col items-center justify-center p-6 font-mono text-slate-200 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#090e1c] p-6 shadow-2xl space-y-6 text-center"
      >
        <div className="flex items-center justify-center gap-3">
          <Monitor size={32} className="text-cyan-400 animate-pulse" />
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">WHITEGHOST OS</h2>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-cyan-300 font-bold flex items-center justify-center gap-2">
            <Cpu size={14} className="animate-spin text-emerald-400" />
            <span>{BOOT_STEPS[currentStep]}</span>
          </div>

          <div className="text-emerald-400 font-mono text-sm tracking-wider">
            [{bar}] {progress}%
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>OPERATOR: KHALID NASIRU</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> SECURE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
