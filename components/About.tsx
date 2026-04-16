"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p
              className="font-mono text-xs uppercase tracking-[0.18em] mb-3"
              style={{ color: "var(--fg-subtle)" }}
            >
              About
            </p>
            <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
              Who I am
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[0.9375rem] leading-[1.85]" style={{ color: "var(--fg-muted)" }}>
              I&apos;m Whiteghost — a frontend developer and Solidity engineer focused on
              building clean, useful, and well-structured digital products.
            </p>
            <p className="text-[0.9375rem] leading-[1.85]" style={{ color: "var(--fg-muted)" }}>
              I work at the intersection of interface design and on-chain engineering.
              Whether it&apos;s a DeFi protocol, a billing system, or a content platform,
              I care about the details that make software feel intentional.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                ["Location", "Remote"],
                ["Focus", "Web3 + Frontend"],
                ["Status", "Open to work"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
