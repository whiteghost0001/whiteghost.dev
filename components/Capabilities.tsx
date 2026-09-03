"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout, ShieldCheck, Landmark, Cpu, Check } from "lucide-react";
import GlowCard from "./GlowCard";

interface Capability {
  title: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  skills: string[];
}

const capabilities: Capability[] = [
  {
    title: "Web3 Frontends",
    icon: Layout,
    tagline: "High-performance React & Next.js interfaces built for Web3 UX.",
    description:
      "Crafting responsive web applications with Wagmi, Viem, and RainbowKit. Abstracting complex contract state into seamless user flows.",
    skills: ["React", "Next.js", "TypeScript", "Wagmi & Viem", "Wallet Integrations", "Dashboards"],
  },
  {
    title: "Smart Contracts",
    icon: ShieldCheck,
    tagline: "Gas-optimized, secure smart contract architecture in Solidity.",
    description:
      "Designing EVM and Soroban contract systems verified with Foundry. Writing robust test coverage, invariant tests, and deployment scripts.",
    skills: ["Solidity", "Foundry", "Unit & Invariant Testing", "Soroban", "Deployment Scripts", "Contract Architecture"],
  },
  {
    title: "DeFi & Payments",
    icon: Landmark,
    tagline: "On-chain financial mechanics, escrow logic, and settlement rails.",
    description:
      "Building non-custodial yield vaults, milestone escrow protocols, recurring billing logic, and instant payment receipt verification systems.",
    skills: ["Staking Vaults", "Lending Mechanics", "Escrow Protocols", "Payment Verification", "Settlement Systems"],
  },
  {
    title: "Blockchain Infrastructure",
    icon: Cpu,
    tagline: "API integration, RPC data pipelines, and protocol interfaces.",
    description:
      "Connecting frontends with indexed blockchain data, subgraph services, RPC providers, and custom event listeners for high reliability.",
    skills: ["Blockchain APIs", "Indexers & Subgraphs", "RPC Infrastructure", "Event Listeners", "Protocol Interfaces"],
  },
];

export default function Capabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="capabilities" className="px-6 py-28 border-t relative" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
            How I Build
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
            Capabilities
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="text-base" style={{ color: "var(--fg-muted)" }}>
            Core technical domains and architectural capabilities I bring to products and engineering teams.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <GlowCard className="h-full">
                  <div className="p-8 sm:p-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-3.5 mb-5">
                        <div
                          className="flex items-center justify-center h-12 w-12 rounded-xl"
                          style={{
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                            {cap.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm font-semibold mb-3" style={{ color: "var(--fg)" }}>
                        {cap.tagline}
                      </p>

                      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                        {cap.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                      <p className="font-mono text-[11px] uppercase tracking-wider mb-3 font-semibold" style={{ color: "var(--fg-subtle)" }}>
                        Key Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md"
                            style={{
                              color: "var(--fg)",
                              background: "var(--bg)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <Check size={12} style={{ color: "var(--accent)" }} />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
