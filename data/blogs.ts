export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: "Web3" | "Blockchain" | "Frontend" | "Architecture" | "Open Source";
  readingTime: string;
  summary: string;
  tags: string[];
  content: string[];
}

export const BLOGS: BlogPost[] = [
  {
    id: "web3-frontend-architecture",
    title: "Architecting Type-Safe Web3 Frontends with Next.js & Viem",
    slug: "web3-frontend-architecture",
    date: "2026-02-15",
    category: "Web3",
    readingTime: "6 min read",
    summary: "How to structure production React applications for reliable smart contract interactions, transaction indexing, and wallet state management.",
    tags: ["Next.js", "TypeScript", "Viem", "Wagmi", "Web3 UX"],
    content: [
      "Building production-grade Web3 frontends requires going far beyond simple wallet connection buttons. In decentralized applications, the frontend acts as the primary safety boundary between users and immutable smart contracts.",
      "Key pattern 1: Strict Type Invariance from Contract ABI to UI. By deriving TypeScript types directly from Solidity ABIs using Viem's `abitype`, we prevent runtime parameter mismatches before transactions are ever broadcast.",
      "Key pattern 2: Optimistic UI Updates with On-Chain Fallbacks. Users expect instant visual feedback. We update local UI state immediately while subscribing to block confirmations in the background, gracefully handling reorgs or transaction reverts.",
      "Key pattern 3: Resilient RPC Failovers. Public RPC nodes often experience rate-limiting or latency spikes. Configuring round-robin fallback providers ensures dApp availability even during high network congestion.",
    ],
  },
  {
    id: "soroban-stellar-smart-contracts",
    title: "Building Low-Cost Settlement Rails with Soroban Rust Smart Contracts",
    slug: "soroban-stellar-smart-contracts",
    date: "2026-01-20",
    category: "Blockchain",
    readingTime: "8 min read",
    summary: "A practical guide to developing Soroban smart contracts in Rust for fast, sub-cent financial settlement on the Stellar network.",
    tags: ["Stellar", "Soroban", "Rust", "FinTech", "Smart Contracts"],
    content: [
      "The Stellar network's smart contract platform, Soroban, provides a WebAssembly execution environment designed specifically for scalable financial applications.",
      "Unlike EVM gas models, Soroban enforces explicit state footprinting. Contracts declare read/write keys in transaction preflights, allowing concurrent ledger execution without lock contention.",
      "In LuminaRail, we utilized Soroban to route local fiat settlement tokens directly into USDC pools on Stellar, executing cross-border payments in under 5 seconds with fees averaging less than $0.001.",
    ],
  },
  {
    id: "evm-vault-security-foundry",
    title: "Testing EVM Yield Vaults with Foundry Fuzzing & Invariants",
    slug: "evm-vault-security-foundry",
    date: "2025-11-10",
    category: "Architecture",
    readingTime: "7 min read",
    summary: "Preventing common DeFi vulnerabilities in Solidity contracts using Foundry unit testing, symbolic fuzzing, and invariant checks.",
    tags: ["Solidity", "Foundry", "Security", "DeFi", "Testing"],
    content: [
      "Smart contract bugs are irreversible. Standard unit tests only cover expected execution paths, leaving edge-case arithmetic and state manipulation vulnerable.",
      "In NdiFi, we used Foundry invariant testing to enforce global security properties across thousands of randomly generated transaction sequences.",
      "Example invariant: `totalVaultShares * sharePrice >= contractTotalBalance`. If any sequence of stakes, rewards, or withdrawals violates this condition, Foundry immediately outputs a minimal reproducible trace.",
    ],
  },
  {
    id: "responsive-design-systems-tailwind",
    title: "Building Component-Driven Systems with Tailwind CSS v4 & Radix UI",
    slug: "responsive-design-systems-tailwind",
    date: "2025-09-05",
    category: "Frontend",
    readingTime: "5 min read",
    summary: "Best practices for building dark-mode-first, accessible design systems using utility CSS and unstyled headless components.",
    tags: ["Tailwind CSS", "React", "Radix UI", "Accessibility", "Design Systems"],
    content: [
      "A developer portfolio or application interface should feel like a cohesive digital product rather than a random collection of styled boxes.",
      "By establishing semantic CSS variables (`--bg`, `--surface`, `--accent`, `--border`), we create theme-aware designs that scale across light and dark modes effortlessly.",
      "Combining Radix UI headless accessibility primitives (dialogs, popovers, navigation menus) with Tailwind's utility classes ensures full keyboard control and ARIA compliance out of the box.",
    ],
  },
];
