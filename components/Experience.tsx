"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    period: "2024 — Present",
    role: "Freelance Frontend & Web3 Developer",
    company: "Independent",
    description:
      "Building DeFi products, smart contracts, and web applications for clients. Focused on clean architecture, gas-efficient contracts, and production-quality interfaces.",
  },
  {
    period: "2023 — 2024",
    role: "Frontend Developer",
    company: "Contract",
    description:
      "Developed responsive web interfaces using React and Next.js. Collaborated with design teams to ship pixel-accurate, performant UIs.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-5xl" ref={ref}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.18em] mb-3"
            style={{ color: "var(--fg-subtle)" }}
          >
            Background
          </p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid gap-4 md:grid-cols-[200px_1fr]"
            >
              {/* Left — period + company */}
              <div className="space-y-1 pt-0.5">
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  {item.period}
                </p>
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "var(--accent)" }}
                >
                  {item.company}
                </p>
              </div>

              {/* Right — role + description */}
              <div className="space-y-2">
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--fg)" }}
                >
                  {item.role}
                </h3>
                <p
                  className="text-[0.9375rem] leading-[1.8]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
