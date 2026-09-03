"use client";

import { useState, useEffect } from "react";
import { PROFILE } from "@/data/profile";
import Image from "next/image";
import { User, Cpu, ShieldCheck, MapPin, GraduationCap, Sparkles, Terminal, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSystem() {
  const [typedWhoami, setTypedWhoami] = useState("");
  const [typedMission, setTypedMission] = useState("");
  const [whoamiDone, setWhoamiDone] = useState(false);

  const targetWhoami = "whoami";
  const targetMission = "cat mission.txt";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= targetWhoami.length) {
        setTypedWhoami(targetWhoami.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setWhoamiDone(true);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!whoamiDone) return;
    let j = 0;
    const timer = setInterval(() => {
      if (j <= targetMission.length) {
        setTypedMission(targetMission.slice(0, j));
        j++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [whoamiDone]);

  return (
    <div className="space-y-8 font-mono">
      {/* System Operator Status Header Card with Laser Scan Line Sweep */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 shadow-xl relative overflow-hidden group">
        {/* Animated Laser Scanning Line Sweep */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-[shimmer_3s_infinite]" />

        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Terminal size={120} className="text-[var(--accent)]" />
        </div>

        <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs">
            <Cpu size={16} className="animate-pulse text-[var(--accent)]" />
            <span>OPERATOR_SYSTEM_PROFILE :: ID-8842</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            KERNEL_ONLINE
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Operator Photo Badge */}
          <div className="shrink-0 relative overflow-hidden rounded-xl border border-[var(--border)] bg-slate-950 w-24 h-24 sm:w-28 sm:h-28 shadow-lg">
            <Image
              src="/images/khalid-nasiru.jpg"
              alt="Khalid Nasiru — Full-Stack Developer and Blockchain Engineer"
              width={150}
              height={150}
              unoptimized
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 flex-1">
            <div>
              <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-semibold mb-1">
                OPERATOR
              </span>
              <span className="text-sm font-bold text-[var(--fg)]">{PROFILE.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-semibold mb-1">
                ROLE
              </span>
              <span className="text-sm font-bold text-[var(--accent)]">FULL_STACK_DEVELOPER</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-semibold mb-1">
                FOCUS
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-300">BLOCKCHAIN / WEB3</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-semibold mb-1">
                LOCATION
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{PROFILE.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Command Output Section with Animated Typing */}
      <div className="space-y-6 font-sans">
        <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] p-5 shadow-md">
          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2 font-bold">
            <span className="text-slate-500 font-normal">khalid@workstation</span>:~$ <span>{typedWhoami}</span>
            {typedWhoami.length < targetWhoami.length && (
              <span className="inline-block h-3.5 w-1.5 bg-emerald-500 animate-pulse" />
            )}
          </div>
          {whoamiDone && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <p className="text-[var(--terminal-fg)] text-sm sm:text-base leading-relaxed">
                I&apos;m <strong className="font-semibold text-[var(--fg)]">Khalid Nasiru</strong>, a full-stack developer and blockchain engineer focused on building modern web applications, decentralized products, smart-contract systems, and open-source software.
              </p>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed mt-3">
                My work spans frontend engineering, backend/API integration, blockchain applications, smart contracts, Web3 interfaces, and open-source development.
              </p>
            </motion.div>
          )}
        </div>

        <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] p-5 shadow-md">
          <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2 font-bold">
            <span className="text-slate-500 font-normal">khalid@workstation</span>:~$ <span>{typedMission}</span>
            {typedMission.length < targetMission.length && whoamiDone && (
              <span className="inline-block h-3.5 w-1.5 bg-emerald-500 animate-pulse" />
            )}
          </div>
          {typedMission.length === targetMission.length && (
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5 text-sm text-[var(--terminal-fg)] font-mono">
              <li className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500 shrink-0" />
                <span>Build useful products that solve real problems.</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[var(--accent)] shrink-0" />
                <span>Bridge reliable backend and on-chain systems with intuitive user experiences.</span>
              </li>
              <li className="flex items-center gap-2">
                <User size={14} className="text-purple-500 shrink-0" />
                <span>Contribute to open-source software and developer ecosystems.</span>
              </li>
              <li className="flex items-center gap-2">
                <Cpu size={14} className="text-emerald-500 shrink-0" />
                <span>Keep learning and improving as an engineer.</span>
              </li>
            </motion.ul>
          )}
        </div>

        {/* Qualitative Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 font-mono">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all hover:border-[var(--accent)]">
            <span className="block text-[11px] text-[var(--fg-muted)] font-semibold">PROJECTS</span>
            <span className="text-sm font-bold text-[var(--accent)] mt-1 block">Web Applications + Web3</span>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all hover:border-purple-500">
            <span className="block text-[11px] text-[var(--fg-muted)] font-semibold">OPEN SOURCE</span>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 mt-1 block">Active Contributor</span>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all hover:border-emerald-500">
            <span className="block text-[11px] text-[var(--fg-muted)] font-semibold">FOCUS</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">Blockchain &amp; Full-Stack</span>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all hover:border-amber-500">
            <span className="block text-[11px] text-[var(--fg-muted)] font-semibold">BUILD STYLE</span>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-1 block">Product Focused</span>
          </div>
        </div>

        {/* Education & Background Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 font-sans shadow-md"
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4 font-mono text-xs">
            <h3 className="uppercase tracking-wider text-[var(--fg)] font-bold flex items-center gap-2">
              <GraduationCap size={15} className="text-[var(--accent)]" />
              EDUCATION_MODULE :: VERIFIED
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 size={12} /> STATUS: LOADED
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-3.5 hover:border-[var(--accent)] transition-colors">
              <GraduationCap size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-mono text-[var(--fg-muted)]">University Education</span>
                <span className="font-semibold text-[var(--fg)] text-sm">{PROFILE.education.university}</span>
                <span className="block text-xs text-[var(--accent)] font-mono mt-0.5">{PROFILE.education.degree}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-3.5 hover:border-purple-500 transition-colors">
              <BookOpen size={18} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-mono text-[var(--fg-muted)]">Secondary Education</span>
                <span className="font-semibold text-[var(--fg)] text-sm">{PROFILE.education.secondarySchool}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-3.5 hover:border-emerald-500 transition-colors">
              <MapPin size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-mono text-[var(--fg-muted)]">Location &amp; Origin</span>
                <span className="font-semibold text-[var(--fg)] text-sm">{PROFILE.location}</span>
                <span className="block text-xs text-[var(--fg-subtle)] font-mono mt-0.5">Origin: {PROFILE.stateOfOrigin}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
