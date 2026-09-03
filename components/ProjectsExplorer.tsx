"use client";

import { useState, useEffect } from "react";
import { PROJECTS, Project } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Code, Activity } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<"ALL" | "WEB3" | "LIVE_PRODUCTS" | "FRONTEND">("ALL");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scanStatus, setScanStatus] = useState("Scanning repositories...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanStatus(`Repository catalog synchronized (${PROJECTS.length} verified builds)`);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "WEB3") return !p.isLiveProduct;
    if (filter === "LIVE_PRODUCTS") return p.isLiveProduct;
    if (filter === "FRONTEND") return p.techStack.includes("React") || p.techStack.includes("Next.js");
    return true;
  });

  return (
    <div className="space-y-6 font-mono">
      {/* Header & Scanning Animation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
            <FolderGit2 size={16} />
            <span>$ ls -la ~/projects</span>
          </div>
          <p className="text-xs text-[var(--fg-muted)] font-mono flex items-center gap-1.5 font-medium">
            <Activity size={12} className="text-[var(--accent)] animate-spin" />
            {scanStatus}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--surface-elevated)] p-1 rounded-lg border border-[var(--border)] text-xs">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-2.5 py-1 font-semibold rounded-md transition-colors ${
              filter === "ALL"
                ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)] shadow-sm font-bold"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            ALL ({PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter("WEB3")}
            className={`px-2.5 py-1 font-semibold rounded-md transition-colors ${
              filter === "WEB3"
                ? "bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/40 font-bold"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            WEB3 &amp; CONTRACTS
          </button>
          <button
            onClick={() => setFilter("LIVE_PRODUCTS")}
            className={`px-2.5 py-1 font-semibold rounded-md transition-colors ${
              filter === "LIVE_PRODUCTS"
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 font-bold"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            LIVE PRODUCTS
          </button>
          <button
            onClick={() => setFilter("FRONTEND")}
            className={`px-2.5 py-1 font-semibold rounded-md transition-colors ${
              filter === "FRONTEND"
                ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 font-bold"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            FRONTEND
          </button>
        </div>
      </div>

      {/* Animated Projects Grid */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-md transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Border Scan Sweep Line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-[var(--fg)] text-base group-hover:text-[var(--accent)] transition-colors">
                      {proj.name}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      proj.isLiveProduct
                        ? "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30"
                        : "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/30"
                    }`}
                  >
                    {proj.isLiveProduct ? "LIVE PRODUCT" : "WEB3 / ON-CHAIN"}
                  </span>
                </div>

                <p className="text-xs text-[var(--fg-muted)] font-sans leading-relaxed mb-4">
                  {proj.shortDescription}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-[var(--fg)] bg-[var(--surface-elevated)] px-2 py-0.5 rounded border border-[var(--border)] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="text-[10px] font-mono text-[var(--fg-subtle)] bg-[var(--surface-elevated)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                      +{proj.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs">
                <button
                  onClick={() => setActiveProject(proj)}
                  className="font-bold text-[var(--accent)] hover:opacity-80 transition-colors flex items-center gap-1 group/btn"
                >
                  <span>Inspect Repo</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </button>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                      aria-label={`${proj.name} GitHub Repository`}
                    >
                      <GithubIcon size={15} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-[var(--accent)] hover:opacity-80 transition-colors"
                      aria-label={`${proj.name} Live Demo`}
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
