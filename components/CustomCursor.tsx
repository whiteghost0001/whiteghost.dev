"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasTouch || prefersReducedMotion) {
      setTimeout(() => setIsTouchDevice(true), 0);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden font-mono select-none">
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
        animate={{
          x: position.x - (isHovered ? 20 : 12),
          y: position.y - (isHovered ? 20 : 12),
          width: isHovered ? 40 : 24,
          height: isHovered ? 40 : 24,
          backgroundColor: isHovered ? "rgba(56, 189, 248, 0.12)" : "rgba(56, 189, 248, 0)",
          borderColor: isHovered ? "rgba(16, 185, 129, 0.8)" : "rgba(56, 189, 248, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(56,189,248,0.9)]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? "#10b981" : "#38bdf8",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />
    </div>
  );
}
