"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import RotatingText from "./RotatingText";
import ProfileCard from "./ProfileCard";
import { LINKS } from "@/lib/links";

const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center px-6 overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Hyperspeed />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between md:gap-16">

          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.p
              {...fade(0.1)}
              className="mb-4 font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              <RotatingText
                texts={["Frontend Developer", "Solidity Engineer", "Open Source Contributor"]}
                rotationInterval={3200}
              />
            </motion.p>

            <motion.h1
              {...fade(0.2)}
              className="mb-5 text-[2.75rem] font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-[3.25rem]"
              style={{ color: "var(--fg)" }}
            >
              Khalid Nasiru
            </motion.h1>

            <motion.p
              {...fade(0.3)}
              className="mb-3 text-lg font-medium leading-snug tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              I ship DeFi protocols, smart contracts, and the interfaces that make them usable.
            </motion.p>

            <motion.p
              {...fade(0.35)}
              className="mb-8 max-w-md text-[0.9375rem] leading-[1.75]"
              style={{ color: "var(--fg-muted)" }}
            >
              Focused on production-quality code — from gas-optimized Solidity to
              pixel-precise React. I care about the full stack: architecture, UX, and
              on-chain correctness.
            </motion.p>

            <motion.div {...fade(0.45)} className="flex items-center gap-3 mb-9">
              <a
                href="#projects"
                className="text-sm font-medium px-5 py-2.5 transition-opacity"
                style={{ color: "var(--bg)", backgroundColor: "var(--accent)" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                Get in touch →
              </a>
            </motion.div>

            <motion.div {...fade(0.55)} className="flex items-center gap-4">
              {[
                { label: "GitHub", href: LINKS.github, external: true },
                { label: "Twitter", href: LINKS.twitter, external: true },
                { label: "Email", href: LINKS.email, external: false },
              ].map((link, i) => (
                <span key={link.label} className="flex items-center gap-4">
                  {i > 0 && (
                    <span className="text-xs select-none" style={{ color: "var(--border)" }}>/</span>
                  )}
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-mono text-[11px] transition-colors duration-200"
                    style={{ color: "var(--fg-subtle)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-subtle)")}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            {...fade(0.15)}
            className="shrink-0 self-center md:self-center w-[clamp(150px,20vw,210px)]"
          >
            <ProfileCard avatarUrl="/avatar.jpg" name="Khalid Nasiru" role="Solidity Engineer" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
