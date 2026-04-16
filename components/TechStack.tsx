"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { label: "Blockchain", items: ["Solidity", "Foundry", "Wagmi", "RainbowKit", "Soroban"] },
  { label: "Tooling", items: ["Git", "GitHub", "Figma", "VS Code"] },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="px-6 py-28">
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
            Toolkit
          </p>
          <h2 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
            Tech Stack
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-12 sm:grid-cols-3"
        >
          {categories.map((cat) => (
            <div key={cat.label}>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.15em] mb-5"
                style={{ color: "var(--fg-subtle)" }}
              >
                {cat.label}
              </p>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
