"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import GlowCard from "./GlowCard";

interface LiveProduct {
  name: string;
  role: string;
  url: string;
  displayUrl: string;
  description: string;
  highlights: string[];
  tech: string[];
}

const liveProducts: LiveProduct[] = [
  {
    name: "TROIT Logistics",
    role: "Frontend Engineer",
    url: "https://troit-logistics.vercel.app/#services",
    displayUrl: "troit-logistics.vercel.app",
    description:
      "Production web interface for a logistics company showcasing services, fleet capabilities, shipment tracking UI, and enterprise contact workflows.",
    highlights: [
      "Responsive service sections and dynamic service modal interactions",
      "Pixel-precise design implementation focused on user conversion",
      "Optimized layout assets, typography, and fast page load times",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Kimana",
    role: "Frontend Engineer",
    url: "https://kimana-frontend.vercel.app/",
    displayUrl: "kimana-frontend.vercel.app",
    description:
      "Modern client-facing web application built with emphasis on aesthetic polish, fluid transitions, and component reusability.",
    highlights: [
      "Built interactive component architecture with modern UI patterns",
      "Smooth layout transitions and cross-browser responsive design",
      "Clean client state management and performance optimizations",
    ],
    tech: ["React", "Next.js", "TypeScript", "Framer Motion"],
  },
  {
    name: "Nexus Health",
    role: "Frontend Engineer",
    url: "https://mynexushealth.online/",
    displayUrl: "mynexushealth.online",
    description:
      "Healthcare platform application designed for patient interaction, medical service information, and appointment booking flows.",
    highlights: [
      "Designed patient-facing portal views and service booking components",
      "Accessible form design and cross-device optimization",
      "Implemented clean navigation structure and fast rendering",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
];

export default function LiveProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="live-products" className="px-6 py-28 border-t relative" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
            Production Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
            Live Products
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="text-base" style={{ color: "var(--fg-muted)" }}>
            Real interfaces I&apos;ve helped design and build — demonstrating production frontend engineering experience on live web products.
          </p>
        </motion.div>

        {/* Live Products Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {liveProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full flex flex-col"
            >
              <GlowCard className="h-full">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    {/* Visual Card Top / Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md"
                        style={{
                          background: "var(--accent-glow)",
                          color: "var(--accent)",
                          border: "1px solid var(--accent)",
                        }}
                      >
                        {product.role}
                      </span>

                      <div className="flex items-center gap-1 text-xs font-mono" style={{ color: "var(--fg-subtle)" }}>
                        <Globe size={13} />
                        <span className="truncate max-w-[120px]">{product.displayUrl}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: "var(--fg)" }}>
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                      {product.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {product.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--fg-muted)" }}>
                          <span className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "var(--accent)" }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      {product.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded"
                          style={{
                            color: "var(--fg-subtle)",
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* View Live Link CTA */}
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-md transition-colors"
                      style={{
                        background: "var(--fg)",
                        color: "var(--bg)",
                      }}
                    >
                      <span>View Live</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
