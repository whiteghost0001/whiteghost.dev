"use client";

import { useState, useEffect } from "react";
import { EXPERIENCE } from "@/data/experience";
import { GitCommit, Calendar, MapPin, CheckCircle2, ChevronRight, Layers, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperienceGitLog() {
  const [gitStatus, setGitStatus] = useState("Fetching commit history...");

  useEffect(() => {
    const timer1 = setTimeout(() => setGitStatus("Loading verified contributions..."), 400);
    const timer2 = setTimeout(() => setGitStatus("Rendering Git timeline..."), 800);
    const timer3 = setTimeout(() => setGitStatus("VERIFIED ENTRIES LOADED"), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="space-y-6 font-mono">
      {/* Git Command Log Header */}
      <div className="border-b border-[var(--border)] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
          <GitCommit size={16} className="text-emerald-500 animate-pulse" />
          <span>$ git log --stat --oneline --author=&quot;Khalid Nasiru&quot;</span>
        </div>
        <span className="text-[10px] text-[var(--fg-muted)] font-mono flex items-center gap-1.5 font-semibold">
          <Activity size={12} className="text-[var(--accent)] animate-spin" />
          {gitStatus}
        </span>
      </div>

      {/* Animated Vertical Glowing Git Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8">
        {/* Glowing Vertical Line */}
        <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-purple-500 opacity-60 shadow-[0_0_10px_rgba(6,182,212,0.4)]" />

        {EXPERIENCE.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Timeline Commit Dot */}
            <div className="absolute -left-6 sm:-left-8 top-5 h-3.5 w-3.5 rounded-full border-2 border-emerald-500 bg-[var(--surface)] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 shadow-md space-y-4 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-300 group">
              {/* Entry Tag & Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {item.tag}
                  </span>
                  <span className="text-sm font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {item.role}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--fg-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-[var(--accent)]" /> {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-emerald-600 dark:text-emerald-400" /> {item.location}
                  </span>
                </div>
              </div>

              {/* Role Description */}
              <p className="text-sm text-[var(--fg-muted)] font-sans leading-relaxed">
                {item.description}
              </p>

              {/* Core Focus Items */}
              <div className="space-y-1.5 font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-subtle)] font-bold block mb-1">
                  ENGINEERING_FOCUS:
                </span>
                <div className="grid gap-1.5 sm:grid-cols-2 text-xs text-[var(--fg)] font-mono">
                  {item.focus.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[var(--accent)] font-bold">&gt;</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2 font-sans pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-subtle)] font-bold block">
                  DELIVERABLE_HIGHLIGHTS:
                </span>
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[var(--fg-muted)]">
                    <ChevronRight size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--fg-subtle)] font-bold block mb-2">
                  STACK_TAGS:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[var(--surface-elevated)] px-2 py-0.5 font-semibold text-[var(--accent)] border border-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-[11px] text-[var(--fg-muted)] font-mono">
                <span className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
                  <Layers size={13} /> {item.type}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> VERIFIED_RECORD
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
