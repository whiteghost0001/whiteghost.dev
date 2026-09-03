"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Download, MapPin, Monitor, Cpu, ShieldCheck, CheckCircle2, Activity } from "lucide-react";
import CodeEditor from "./CodeEditor";
import DeveloperNetworkBackground from "./DeveloperNetworkBackground";
import { PROFILE } from "@/data/profile";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] as const },
});

interface HeroProps {
  onOpenOS?: () => void;
}

export default function Hero({ onOpenOS }: HeroProps) {
  // 1. Mouse Position for 3D Tilt Parallax
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 2. Sequential Loaded Modules Animation
  const [loadedCount, setLoadedCount] = useState(0);
  const isSystemReady = loadedCount >= PROFILE.loadedModules.length;

  useEffect(() => {
    if (loadedCount < PROFILE.loadedModules.length) {
      const timer = setTimeout(() => {
        setLoadedCount((prev) => prev + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[94vh] flex-col justify-center px-6 overflow-hidden pt-28 pb-16 font-mono"
    >
      {/* Interactive Developer Network Canvas Background */}
      <DeveloperNetworkBackground />

      {/* Hero Ambient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Animated System Status & Location Bar */}
        <motion.div {...fade(0.05)} className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-bold bg-[var(--surface)] text-emerald-600 dark:text-emerald-300 border border-[var(--border)] shadow-md overflow-hidden">
            {/* Scanning Line Sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-[shimmer_2s_infinite]" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity size={13} className="text-emerald-500 dark:text-emerald-400 animate-pulse" />
            <span>SYSTEM.KERNEL :: v1.0.0 ONLINE</span>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-medium backdrop-blur-md shadow-sm"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
            }}
          >
            <MapPin size={13} style={{ color: "var(--accent)" }} />
            <span>Based in Abuja, Nigeria</span>
          </div>
        </motion.div>

        {/* Main Hero Grid Layout */}
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_360px] lg:items-start">
          {/* Left Column: Headlines, Bio, Module Booting & CTAs */}
          <div>
            <motion.h1
              {...fade(0.15)}
              className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl md:text-6xl font-sans leading-[1.08] mb-3 text-[var(--fg)]"
            >
              KHALID NASIRU<span style={{ color: "var(--accent)" }}>.</span>
            </motion.h1>

            <motion.div {...fade(0.2)} className="text-[var(--accent)] font-bold text-sm sm:text-lg mb-5 flex items-center gap-2">
              <Cpu size={18} className="text-[var(--accent)] animate-pulse shrink-0" />
              <span>Full-Stack Developer &amp; Blockchain Engineer</span>
            </motion.div>

            {/* Mobile-Only Photo Card */}
            <motion.div {...fade(0.22)} className="mb-6 lg:hidden max-w-[260px] xs:max-w-[280px] mx-auto sm:mx-0">
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-purple-500/30 blur-md opacity-60 pointer-events-none" />
                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
                  <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface-elevated)] border-b border-[var(--border)] text-[11px] font-mono">
                    <span className="text-[var(--accent)] font-bold flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      KHALID_NASIRU.IMG
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">VERIFIED</span>
                  </div>
                  <div className="relative aspect-square w-full bg-slate-950">
                    <Image
                      src="/images/khalid-nasiru.jpg"
                      alt="Khalid Nasiru — Full-Stack Developer and Blockchain Engineer"
                      fill
                      sizes="(max-width: 768px) 280px, 350px"
                      priority
                      unoptimized
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="px-3 py-2 bg-[var(--surface-elevated)] border-t border-[var(--border)] text-center text-xs font-mono">
                    <span className="font-bold text-[var(--fg)]">KHALID NASIRU</span>
                    <span className="text-[11px] text-[var(--accent)] block">Abuja, Nigeria</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.p
              {...fade(0.25)}
              className="text-sm sm:text-lg font-sans font-normal leading-relaxed mb-6 max-w-xl text-[var(--fg-muted)]"
            >
              Building web applications, blockchain products, smart-contract systems, and open-source software.
            </motion.p>

            {/* Loaded Technology Modules Sequential Reveal */}
            <motion.div {...fade(0.3)} className="mb-6 sm:mb-8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--fg-subtle)] uppercase tracking-widest block font-bold">
                  {isSystemReady ? "LOADED_MODULES :: SYSTEM READY" : "LOADING_MODULES..."}
                </span>
                {isSystemReady && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    <CheckCircle2 size={12} /> ALL MODULES OK
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {PROFILE.loadedModules.slice(0, loadedCount).map((mod) => (
                  <motion.span
                    key={mod}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded bg-[var(--surface-elevated)] px-2.5 py-0.5 font-bold text-[var(--accent)] border border-[var(--border)] shadow-sm flex items-center gap-1"
                  >
                    <span>{mod}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-[9px]">OK</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div {...fade(0.35)} className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 mb-8 w-full">
              {onOpenOS && (
                <button
                  onClick={onOpenOS}
                  className="xs:col-span-2 group relative inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-xs font-bold transition-all duration-200 shadow-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:opacity-95 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95"
                >
                  <Monitor size={16} />
                  <span>INITIALIZE PORTFOLIO OS</span>
                </button>
              )}

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                }}
              >
                <span>View Projects</span>
                <ArrowDownRight size={15} aria-hidden="true" />
              </a>

              <a
                href="/cv.pdf"
                download="Whiteghost-CV.pdf"
                aria-label="Download CV"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-sm"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                }}
              >
                <Download size={15} aria-hidden="true" />
                <span>Download CV</span>
              </a>

              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="xs:col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:bg-[var(--surface-hover)] shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                }}
              >
                <span>GitHub</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Mouse Tilt Photo Card & Code Editor */}
          <div className="space-y-6">
            {/* Desktop Photo Card with Interactive 3D Parallax Tilt */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              {...fade(0.3)}
              className="hidden lg:block w-full max-w-[350px] mx-auto perspective-1000"
            >
              <div className="relative group">
                {/* Ambient Background Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-purple-500/20 blur-xl opacity-50 group-hover:opacity-90 transition duration-500 pointer-events-none" />

                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xl transition-all duration-300 ease-out group-hover:scale-[1.015] group-hover:border-[var(--accent)]">
                  {/* Photo Card Top Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-elevated)] border-b border-[var(--border)] text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>KHALID_NASIRU.IMG</span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <ShieldCheck size={11} />
                      VERIFIED
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                    <Image
                      src="/images/khalid-nasiru.jpg"
                      alt="Khalid Nasiru — Full-Stack Developer and Blockchain Engineer"
                      fill
                      sizes="(max-width: 768px) 320px, 350px"
                      priority
                      unoptimized
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>

                  {/* Photo Card Bottom Bar */}
                  <div className="px-4 py-3 bg-[var(--surface-elevated)] border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
                    <div>
                      <p className="font-bold text-[var(--fg)]">KHALID NASIRU</p>
                      <p className="text-[11px] text-[var(--accent)]">Full-Stack &amp; Blockchain Eng.</p>
                    </div>
                    <div className="text-right text-[11px] text-[var(--fg-muted)]">
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">Abuja, Nigeria</p>
                      <p className="text-[10px] text-[var(--fg-subtle)]">Kaduna State Univ.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Code Editor Widget */}
            <motion.div {...fade(0.35)} className="w-full">
              <CodeEditor />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
