"use client";

import { useEffect, useState } from "react";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Layers, Sparkles, Copy, Check } from "lucide-react";
import GithubIcon from "./GithubIcon";

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyRepo = () => {
    if (project.githubUrl) {
      navigator.clipboard.writeText(project.githubUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden font-mono text-[var(--fg)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Cpu size={18} className="text-[var(--accent)]" />
            <span className="font-bold text-[var(--fg)] text-sm sm:text-base">{project.name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)]">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)] transition-colors"
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 font-sans">
          {/* Status & Quick Links */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-elevated)] p-4 rounded-xl border border-[var(--border)] font-mono text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--fg-muted)] font-semibold">STATUS:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{project.status}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {project.githubUrl && (
                <>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] text-[var(--fg)] hover:opacity-90 border border-[var(--border)] transition-colors text-xs font-bold"
                  >
                    <GithubIcon size={14} /> Open GitHub
                  </a>
                  <button
                    onClick={handleCopyRepo}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors text-xs font-semibold"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? "Copied URL!" : "Copy Repo URL"}</span>
                  </button>
                </>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors text-xs shadow-sm"
                >
                  <ExternalLink size={14} /> Open Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Role & Contribution */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 font-mono text-xs shadow-sm">
            <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-bold mb-1">
              ENGINEERING ROLE &amp; CONTRIBUTION
            </span>
            <span className="font-bold text-[var(--accent)]">
              {project.role || "Full-Stack Developer & Blockchain Engineer — Architecture & Implementation"}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)] mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" /> OVERVIEW &amp; DESCRIPTION
            </h4>
            <p className="text-[var(--fg)] text-sm leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
              <h5 className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                <ShieldAlert size={14} /> PROBLEM
              </h5>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{project.problem}</p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <h5 className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> SOLUTION
              </h5>
              <p className="text-xs text-[var(--fg-muted)] leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)] mb-2.5">
              KEY SYSTEM FEATURES
            </h4>
            <div className="space-y-2">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--fg-muted)] font-sans">
                  <CheckCircle2 size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Highlights */}
          {project.architectureHighlights && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)] mb-2.5 flex items-center gap-2">
                <Layers size={14} className="text-purple-600 dark:text-purple-400" /> ARCHITECTURE HIGHLIGHTS
              </h4>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 space-y-2">
                {project.architectureHighlights.map((arch, i) => (
                  <div key={i} className="text-xs font-mono text-[var(--accent)] flex items-start gap-2 font-bold">
                    <span className="text-[var(--fg-subtle)] font-normal">[{i + 1}]</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)] mb-2">
              TECHNOLOGY STACK
            </h4>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-[var(--surface-elevated)] px-2.5 py-1 text-[var(--accent)] border border-[var(--border)] font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
