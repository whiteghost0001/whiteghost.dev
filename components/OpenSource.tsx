"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const repos = [
  {
    repo: "wagmi-dev/wagmi",
    description: "TypeScript type fixes and documentation improvements for the most widely used React hooks library for Ethereum.",
    href: "https://github.com/wagmi-dev/wagmi",
  },
  {
    repo: "shadcn-ui/ui",
    description: "Identified and helped resolve component accessibility issues affecting keyboard navigation and screen reader support.",
    href: "https://github.com/shadcn-ui/ui",
  },
  {
    repo: "drips-network/app",
    description: "Frontend integration work and smart contract interaction patterns for a decentralized open-source funding protocol on Ethereum.",
    href: "https://github.com/drips-network/app",
  },
  {
    repo: "rainbow-me/rainbowkit",
    description: "Bug reports and documentation clarifications improving wallet connection UX across EVM-compatible chains.",
    href: "https://github.com/rainbow-me/rainbowkit",
  },
  {
    repo: "foundry-rs/foundry",
    description: "Documentation contributions covering Forge test patterns and gas snapshot workflows for Solidity developers.",
    href: "https://github.com/foundry-rs/foundry",
  },
  {
    repo: "stellar/js-stellar-sdk",
    description: "Clarified Soroban contract invocation examples and corrected TypeScript types in the official Stellar JS SDK.",
    href: "https://github.com/stellar/js-stellar-sdk",
  },
  {
    repo: "OpenZeppelin/openzeppelin-contracts",
    description: "Reviewed and flagged edge cases in ERC-4626 vault implementation documentation during audit preparation.",
    href: "https://github.com/OpenZeppelin/openzeppelin-contracts",
  },
  {
    repo: "wevm/viem",
    description: "Contributed type-level improvements and usage examples for low-level Ethereum client interactions.",
    href: "https://github.com/wevm/viem",
  },
];

export default function OpenSource() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="oss" className="px-6 py-32">
      <div className="mx-auto max-w-5xl" ref={ref}>

        {/* Heading + summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 grid gap-8 md:grid-cols-[1fr_2fr]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--fg-subtle)" }}>
              Community
            </p>
            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
              Open Source
            </h2>
          </div>
          <p className="text-[0.9375rem] leading-[1.8] self-end" style={{ color: "var(--fg-muted)" }}>
            I contribute to the tools I rely on — from Ethereum client libraries and
            wallet SDKs to smart contract frameworks and UI primitives. Most contributions
            are documentation, type correctness, and edge-case fixes: the unglamorous work
            that keeps ecosystems healthy.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--border)" }}>
          {repos.map((item, i) => (
            <motion.a
              key={item.repo}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col justify-between gap-8 p-6"
              style={{ background: "var(--bg)" }}
            >
              <div className="space-y-2.5">
                <p
                  className="font-mono text-[11px] leading-snug transition-colors duration-150"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {item.repo}
                </p>
                <p className="text-sm leading-[1.7]" style={{ color: "var(--fg-subtle)" }}>
                  {item.description}
                </p>
              </div>
              <ArrowUpRight
                size={13}
                className="self-end transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "var(--fg-subtle)" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
