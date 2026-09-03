"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, GitPullRequest } from "lucide-react";

const repos = [
  {
    repo: "wagmi-dev/wagmi",
    title: "wagmi",
    category: "Ethereum React Hooks",
    description: "TypeScript type fixes and documentation improvements for the premier React hooks library for Ethereum.",
    href: "https://github.com/wagmi-dev/wagmi",
  },
  {
    repo: "shadcn-ui/ui",
    title: "shadcn/ui",
    category: "UI Components",
    description: "Identified and resolved component accessibility issues affecting keyboard navigation and screen reader support.",
    href: "https://github.com/shadcn-ui/ui",
  },
  {
    repo: "drips-network/app",
    title: "Drips Protocol",
    category: "Web3 Funding",
    description: "Frontend integration work and smart contract interaction patterns for a decentralized funding protocol on Ethereum.",
    href: "https://github.com/drips-network/app",
  },
  {
    repo: "rainbow-me/rainbowkit",
    title: "RainbowKit",
    category: "Wallet Connection",
    description: "Bug reports and documentation clarifications improving wallet connection UX across EVM-compatible chains.",
    href: "https://github.com/rainbow-me/rainbowkit",
  },
  {
    repo: "foundry-rs/foundry",
    title: "Foundry",
    category: "Smart Contract Toolchain",
    description: "Documentation contributions covering Forge test patterns and gas snapshot workflows for Solidity developers.",
    href: "https://github.com/foundry-rs/foundry",
  },
  {
    repo: "stellar/js-stellar-sdk",
    title: "Stellar SDK",
    category: "Stellar JS SDK",
    description: "Clarified Soroban contract invocation examples and corrected TypeScript types in the official Stellar JS SDK.",
    href: "https://github.com/stellar/js-stellar-sdk",
  },
  {
    repo: "OpenZeppelin/openzeppelin-contracts",
    title: "OpenZeppelin",
    category: "Contract Standards",
    description: "Reviewed and flagged edge cases in ERC-4626 vault implementation documentation during audit preparation.",
    href: "https://github.com/OpenZeppelin/openzeppelin-contracts",
  },
  {
    repo: "wevm/viem",
    title: "viem",
    category: "TypeScript Ethereum Primitives",
    description: "Contributed type-level improvements and usage examples for low-level Ethereum client interactions.",
    href: "https://github.com/wevm/viem",
  },
];

export default function OpenSource() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="oss" className="px-6 py-28 border-t relative" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
            Contributions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
            Open Source
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="text-lg font-medium mb-3" style={{ color: "var(--fg)" }}>
            I don&apos;t just build with open source — I contribute to it.
          </p>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            I actively contribute to core web3 libraries, wallet SDKs, smart contract standards, and frontend tooling.
            Focusing on type safety, documentation precision, accessibility, and edge-case fixes that strengthen ecosystems.
          </p>
        </motion.div>

        {/* Contributions Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {repos.map((item, i) => (
            <motion.div
              key={item.repo}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="h-full flex flex-col"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full flex flex-col justify-between p-6 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded" style={{ background: "var(--accent-glow)", color: "var(--accent)" }}>
                      {item.category}
                    </span>
                    <GitPullRequest size={14} className="shrink-0 transition-transform group-hover:scale-110" style={{ color: "var(--fg-subtle)" }} />
                  </div>

                  <h3 className="text-base font-bold mb-1 transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
                    {item.title}
                  </h3>

                  <p className="font-mono text-[11px] mb-3 truncate" style={{ color: "var(--fg-subtle)" }}>
                    {item.repo}
                  </p>

                  <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-mono font-medium" style={{ borderColor: "var(--border)", color: "var(--fg-subtle)" }}>
                  <span>View Repository</span>
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

