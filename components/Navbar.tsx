"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#oss" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 97%, transparent)"
          : "color-mix(in srgb, var(--bg) 55%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">

        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-mono text-sm font-medium transition-colors duration-200"
          style={{ color: "var(--fg)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--fg)")}
        >
          whiteghost<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {links.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={e => handleNav(e, href)}
                  className="relative px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-150"
                  style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "var(--fg)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "var(--fg-muted)"; }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ backgroundColor: "var(--accent)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="w-px h-3.5 mx-2 opacity-20" style={{ backgroundColor: "var(--fg-muted)" }} />
          <ThemeToggle />
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-1 transition-colors"
            style={{ color: "var(--fg-muted)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map(({ label, href }) => {
                const isActive = active === href;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={e => handleNav(e, href)}
                      className="flex items-center gap-2.5 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                    >
                      {isActive && (
                        <span className="h-px w-3 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                      )}
                      {!isActive && <span className="w-3 shrink-0" />}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
