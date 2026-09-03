"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square, Maximize2, Shield } from "lucide-react";

interface OSWindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
  initialWidth?: string;
  initialHeight?: string;
}

export default function OSWindow({
  title,
  icon,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  children,
}: OSWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ duration: 0.2 }}
      onClick={onFocus}
      style={{ zIndex }}
      className={`fixed ${
        isMaximized
          ? "inset-2 md:inset-4"
          : "top-12 left-2 right-2 bottom-16 sm:top-14 sm:left-4 sm:right-4 md:top-20 md:left-1/2 md:-translate-x-1/2 md:w-[92vw] md:max-w-5xl md:h-[75vh]"
      } flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] shadow-2xl overflow-hidden backdrop-blur-xl transition-colors duration-200`}
    >
      {/* OS Window Titlebar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-3 sm:px-4 py-2 sm:py-2.5 select-none font-mono">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-2 sm:gap-1.5 py-1">
            <button
              onClick={onClose}
              className="flex h-3.5 w-3.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
              aria-label="Close window"
            >
              <X size={8} className="opacity-0 hover:opacity-100 text-slate-950 font-bold" />
            </button>
            <button
              onClick={onMinimize}
              className="flex h-3.5 w-3.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
              aria-label="Minimize window"
            >
              <Minus size={8} className="opacity-0 hover:opacity-100 text-slate-950 font-bold" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="flex h-3.5 w-3.5 sm:h-3 sm:w-3 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
              aria-label="Maximize window"
            >
              <Square size={6} className="opacity-0 hover:opacity-100 text-slate-950 font-bold" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[var(--fg)] pl-1 sm:pl-2 truncate">
            {icon || <Shield size={14} className="text-[var(--accent)] shrink-0" />}
            <span className="truncate">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[var(--fg-muted)] shrink-0">
          <span className="hidden sm:inline-block rounded bg-[var(--surface-hover)] px-2 py-0.5 border border-[var(--border)] font-bold text-[var(--accent)]">
            KHALID_OS :: SYS_APP
          </span>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 sm:p-1 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Toggle full window"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 text-[var(--fg)]">
        {children}
      </div>
    </motion.div>
  );
}
