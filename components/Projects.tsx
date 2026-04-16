"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import GlowCard from "./GlowCard";

const projects = [
  {
    name: "NdiFi",
    type: "DeFi Protocol",
    impact: "Engineered a non-custodial vault that automates yield distribution entirely on-chain — no admin keys, no off-chain cron jobs.",
    description:
      "Designed and deployed a Solidity vault system where users deposit ERC-20 assets and accrue yield through an on-chain accounting model. Reward distribution is triggered permissionlessly, staking logic is isolated in a separate contract to reduce attack surface, and the React frontend uses Wagmi hooks to abstract all contract interactions behind a clean UI.",
    tags: ["Solidity", "Foundry", "Wagmi", "React", "TypeScript"],
    github: "https://github.com/whiteghost0001",
    live: "#",
  },
  {
    name: "PayGo",
    type: "Web3 Billing",
    impact: "Replaced trust-based payment agreements with verifiable smart contract logic — escrow, milestones, and subscriptions without intermediaries.",
    description:
      "Built a billing protocol that handles recurring subscriptions, milestone-based escrow, and dispute resolution entirely in Solidity. Fund release is gated by on-chain conditions, not manual approval. Integrated RainbowKit for seamless wallet UX and Next.js for the client dashboard, keeping the interface simple while the contract handles the complexity.",
    tags: ["Solidity", "Next.js", "RainbowKit", "TypeScript"],
    github: "https://github.com/whiteghost0001",
    live: "#",
  },
  {
    name: "Basevia",
    type: "Payments on Base",
    impact: "Cut cross-border transfer costs by routing remittances through Base L2 — fast finality, low fees, simple UX.",
    description:
      "Remittance product deployed on Base that makes cross-border payments accessible without requiring users to understand L2 mechanics. The contract handles routing and settlement; the frontend exposes a minimal send flow. Focused on reducing friction at every step — from wallet connection to transaction confirmation.",
    tags: ["Base", "Solidity", "Next.js", "Tailwind CSS"],
    github: "https://github.com/whiteghost0001",
    live: "#",
  },
  {
    name: "StellarPay",
    type: "Stellar / Soroban",
    impact: "Brought programmable payment logic to the Stellar network using Soroban — enabling treasury management and conditional transfers at near-zero cost.",
    description:
      "Payment infrastructure built on Stellar's Soroban smart contract platform. Implements multi-sig treasury controls, programmable transfer conditions, and low-latency settlement optimized for emerging market corridors. Rust contract logic is paired with a React frontend using the Stellar SDK for transaction signing and submission.",
    tags: ["Soroban", "Rust", "Stellar SDK", "React"],
    github: "https://github.com/whiteghost0001",
    live: "#",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="px-6 py-32">
      <div className="mx-auto max-w-5xl" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--fg-subtle)" }}>
            Selected Work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
            <GlowCard>
              <div className="p-8">
              {/* Card header */}
              <div className="flex items-start justify-between gap-6 mb-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "var(--fg-subtle)" }}>
                    {project.type}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 shrink-0 pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 transition-colors duration-150"
                    style={{ border: "1px solid var(--border)", color: "var(--fg-muted)", background: "var(--bg)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                  >
                    GitHub <ArrowUpRight size={11} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 transition-opacity"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Live <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

              {/* Impact statement */}
              <p className="text-[0.9375rem] font-medium leading-[1.6] mb-4" style={{ color: "var(--fg)" }}>
                {project.impact}
              </p>

              {/* Description */}
              <p className="text-sm leading-[1.85] mb-6" style={{ color: "var(--fg-muted)", opacity: 0.85 }}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1"
                    style={{ color: "var(--fg-subtle)", background: "var(--bg)", border: "1px solid var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
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
