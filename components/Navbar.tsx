"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Download, Monitor, Command } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { LINKS } from "@/lib/links";

interface NavbarProps {
  onOpenOS?: () => void;
  onOpenPalette?: () => void;
}

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenOS, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(href);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? "py-2.5 shadow-md backdrop-blur-md" : "py-3.5"
      }`}
      style={{
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 94%, transparent)"
          : "color-mix(in srgb, var(--bg) 70%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="font-mono text-sm sm:text-base font-bold tracking-tight transition-colors duration-200 shrink-0"
          style={{ color: "var(--fg)" }}
        >
          whiteghost<span style={{ color: "var(--accent)" }}>.dev</span>
        </a>

        {/* Desktop Nav Center & Right Action Cluster */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Navigation Links */}
          <nav className="flex items-center gap-0.5 rounded-full p-1 border border-[var(--border)] bg-[var(--surface-elevated)]" aria-label="Main navigation">
            {links.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="relative px-2.5 py-1 text-xs font-medium tracking-wide transition-colors duration-150 rounded-md font-mono"
                  style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md shadow-sm"
                      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="w-px h-4 opacity-30" style={{ backgroundColor: "var(--fg-muted)" }} />

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {/* OS Launcher Button */}
            {onOpenOS && (
              <button
                onClick={onOpenOS}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all duration-200 bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)] hover:opacity-90 shadow-sm hover:scale-[1.02] active:scale-95"
              >
                <Monitor size={13} />
                <span>INITIALIZE OS</span>
              </button>
            )}

            {/* CMD+K Command Palette Launcher */}
            {onOpenPalette && (
              <button
                onClick={onOpenPalette}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors border shadow-sm hover:bg-[var(--surface-hover)]"
                style={{ color: "var(--fg-muted)", borderColor: "var(--border)", background: "var(--surface)" }}
                aria-label="Open command palette"
              >
                <Command size={12} />
                <span className="text-[10px] font-bold">K</span>
              </button>
            )}

            {/* Download CV Quicklink */}
            <a
              href="/cv.pdf"
              download="Whiteghost-CV.pdf"
              aria-label="Download CV"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono shadow-sm"
              style={{ color: "var(--fg)", border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <Download size={13} aria-hidden="true" style={{ color: "var(--accent)" }} />
              <span>CV</span>
            </a>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {onOpenOS && (
            <button
              onClick={onOpenOS}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)] shadow-sm"
            >
              <Monitor size={12} /> OS
            </button>
          )}
          <ThemeToggle />
          <button
            className="p-2 rounded-lg transition-colors shadow-sm"
            style={{ color: "var(--fg)", border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-6 py-5 gap-3">
              {links.map(({ label, href }) => {
                const isActive = active === href;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className="flex items-center justify-between py-2 text-sm font-medium transition-colors font-mono"
                    style={{ color: isActive ? "var(--accent)" : "var(--fg)" }}
                  >
                    <span>{label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />}
                  </a>
                );
              })}
              <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "var(--border)" }}>
                <a
                  href="/cv.pdf"
                  download="Whiteghost-CV.pdf"
                  aria-label="Download CV"
                  className="flex items-center justify-between py-2 text-sm font-medium font-mono"
                  style={{ color: "var(--accent)" }}
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} aria-hidden="true" />
                    <span>Download CV</span>
                  </span>
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center justify-between py-2 text-sm font-medium font-mono"
                  style={{ color: "var(--fg-muted)" }}
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
