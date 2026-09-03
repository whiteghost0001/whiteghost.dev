"use client";

import { useState, useRef, useEffect } from "react";
import { SKILLS, Skill } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronRight, Sparkles, Cpu } from "lucide-react";

const CATEGORIES = ["ALL", "FRONTEND", "BLOCKCHAIN", "BACKEND", "TOOLS"] as const;

interface Node {
  id: string;
  name: string;
  category: Skill["category"];
  x: number;
  y: number;
  radius: number;
  angle: number;
  distance: number;
  speed: number;
  color: string;
  skill: Skill;
}

export default function SkillsUniverse() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("ALL");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(SKILLS[0]);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const filteredSkills = selectedCategory === "ALL"
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  // Initialize Canvas Node Graph Physics & Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 420);

    const centerX = width / 2;
    const centerY = height / 2;

    const categoryColors: Record<Skill["category"], string> = {
      FRONTEND: isLight ? "#0284c7" : "#38bdf8",
      BLOCKCHAIN: isLight ? "#7c3aed" : "#a855f7",
      BACKEND: isLight ? "#d97706" : "#f59e0b",
      TOOLS: isLight ? "#059669" : "#10b981",
    };

    // Construct orbital nodes around center
    const totalSkills = SKILLS.length;
    nodesRef.current = SKILLS.map((skill, idx) => {
      const angle = (idx / totalSkills) * Math.PI * 2;
      const distance = 100 + (idx % 3) * 55;
      const color = categoryColors[skill.category];
      return {
        id: skill.name,
        name: skill.name,
        category: skill.category,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: 18,
        angle,
        distance,
        speed: (idx % 2 === 0 ? 1 : -1) * (0.002 + (idx % 3) * 0.001),
        color,
        skill,
      };
    });

    let pulseStep = 0;

    const render = () => {
      pulseStep += 0.02;
      ctx.clearRect(0, 0, width, height);

      const cx = centerX + offsetRef.current.x;
      const cy = centerY + offsetRef.current.y;

      // 1. Draw Central Hub Node (KHALID / TECH STACK)
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "#FFFFFF" : "rgba(14, 22, 38, 0.95)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isLight ? "#06B6D4" : "#38bdf8";
      ctx.stroke();

      // Inner glowing core
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "#06B6D4" : "#38bdf8";
      ctx.fill();

      // Central Hub Label
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = isLight ? "#111827" : "#e2e8f0";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("KHALID / STACK", cx, cy + 46);

      // 2. Update Node Positions & Draw Connection Lines
      nodesRef.current.forEach((node) => {
        // Slow orbital drifting
        node.angle += node.speed;
        node.x = cx + Math.cos(node.angle) * node.distance;
        node.y = cy + Math.sin(node.angle) * node.distance;

        const isFilteredOut = selectedCategory !== "ALL" && node.category !== selectedCategory;
        const isHovered = hoveredSkillName === node.name;
        const isSelected = selectedSkill?.name === node.name;

        const alpha = isFilteredOut ? 0.15 : isHovered || isSelected ? 1 : 0.6;

        // Draw Line to Center Hub
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = isHovered || isSelected ? node.color : isLight ? `rgba(203, 213, 225, ${alpha})` : `rgba(51, 65, 85, ${alpha})`;
        ctx.lineWidth = isHovered || isSelected ? 2 : 1;
        ctx.stroke();

        // Particle pulse traveling along connection line
        if (!isFilteredOut) {
          const pulseProg = (pulseStep + node.distance * 0.01) % 1;
          const px = cx + (node.x - cx) * pulseProg;
          const py = cy + (node.y - cy) * pulseProg;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        // Draw Orbital Skill Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered || isSelected ? node.radius + 3 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? node.color : isLight ? "#FFFFFF" : "rgba(13, 20, 36, 0.9)";
        ctx.fill();
        ctx.lineWidth = isSelected || isHovered ? 2.5 : 1.5;
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Skill Label Text inside node
        ctx.font = "bold 9px monospace";
        ctx.fillStyle = isSelected ? (isLight ? "#FFFFFF" : "#090d16") : isLight ? "#111827" : "#f8fafc";
        ctx.fillText(node.name.slice(0, 8), node.x, node.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedCategory, selectedSkill, hoveredSkillName, isLight]);

  // Handle Canvas Interactivity (Hover & Click Node Selection)
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let foundHover: string | null = null;
    nodesRef.current.forEach((node) => {
      const dx = mx - node.x;
      const dy = my - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 5) {
        foundHover = node.name;
      }
    });

    setHoveredSkillName(foundHover);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    nodesRef.current.forEach((node) => {
      const dx = mx - node.x;
      const dy = my - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 5) {
        setSelectedSkill(node.skill);
      }
    });
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header Info & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-xs mb-1">
            <Layers size={15} />
            <span># INTERACTIVE_SKILLS_UNIVERSE</span>
          </div>
          <p className="text-xs text-[var(--fg-muted)] font-sans">
            Explore my technology orbital graph. Drag, hover, and inspect core modules.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--surface-elevated)] p-1 rounded-lg border border-[var(--border)]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)] shadow-sm font-bold"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Canvas Graph Overlay */}
      <div className="relative w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 text-[10px] text-[var(--fg-subtle)] font-mono flex items-center gap-2 z-10 pointer-events-none">
          <Cpu size={12} className="text-[var(--accent)] animate-pulse" />
          <span>GRAPH_PHYSICS :: ACTIVE</span>
        </div>

        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasMouseMove}
          onClick={handleCanvasClick}
          className="w-full h-[420px] cursor-pointer"
        />
      </div>

      {/* Skills Grid & Inspected Module Inspector Panel */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Skills Cards Grid */}
        <motion.div layout className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.name === skill.name;
              return (
                <motion.button
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`group flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--surface-hover)] shadow-lg ring-1 ring-[var(--accent)] scale-[1.02]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-[var(--fg)] text-sm group-hover:text-[var(--accent)] transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                        skill.category === "FRONTEND"
                          ? "text-[var(--accent)] bg-cyan-500/10 border-cyan-500/30"
                          : skill.category === "BLOCKCHAIN"
                          ? "text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/30"
                          : skill.category === "BACKEND"
                          ? "text-amber-600 dark:text-amber-300 bg-amber-500/10 border-amber-500/30"
                          : "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/30"
                      }`}
                    >
                      {skill.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[var(--fg-muted)] pt-2 border-t border-[var(--border)]">
                    <span className="font-mono text-[10px]">{skill.level}</span>
                    <span className="flex items-center gap-1 text-[var(--accent)] text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect <ChevronRight size={10} />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Selected Skill Detail Inspector Panel */}
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xl space-y-4 h-fit sticky top-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div>
                  <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-widest block font-bold">
                    INSPECTED_MODULE
                  </span>
                  <h3 className="text-lg font-bold text-[var(--fg)] flex items-center gap-2">
                    <span>{selectedSkill.name}</span>
                    <Sparkles size={14} className="text-[var(--accent)]" />
                  </h3>
                </div>
                <span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent-glow)] px-2.5 py-1 rounded border border-[var(--accent)]">
                  {selectedSkill.category}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-wider block font-bold mb-1">
                  DESCRIPTION
                </span>
                <p className="text-xs text-[var(--fg-muted)] font-sans leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-wider block font-bold mb-1">
                  PRACTICAL USE CASE
                </span>
                <p className="text-xs text-[var(--accent)] font-sans leading-relaxed bg-[var(--surface-elevated)] p-3 rounded-lg border border-[var(--border)] font-medium">
                  {selectedSkill.useCase}
                </p>
              </div>

              {selectedSkill.projects.length > 0 && (
                <div>
                  <span className="text-[10px] text-[var(--fg-subtle)] uppercase tracking-wider block font-bold mb-1.5">
                    ASSOCIATED REPOSITORIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="text-[11px] font-mono text-[var(--fg)] bg-[var(--surface-elevated)] px-2 py-0.5 rounded border border-[var(--border)] font-semibold"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
