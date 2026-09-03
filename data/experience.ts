export interface ExperienceItem {
  id: string;
  tag: string;
  role: string;
  type: "Freelance & Contract" | "Open Source & Protocol" | "Frontend Projects";
  period: string;
  location: string;
  description: string;
  focus: string[];
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-freelance",
    tag: "FE-WEB3-FREELANCE",
    role: "Freelance Web3 & Frontend Development",
    type: "Freelance & Contract",
    period: "2024 — Present",
    location: "Abuja, Nigeria",
    description: "Engineering production Web3 applications, smart-contract frontends, and client web interfaces with React, Next.js, and TypeScript.",
    focus: [
      "Web3 user interfaces & wallet connections",
      "Blockchain & smart-contract integrations",
      "React & Next.js production applications",
      "Open-source development & developer tooling",
    ],
    highlights: [
      "Engineered non-custodial DeFi yield vaults, milestone payment escrow systems, and Stellar settlement interfaces.",
      "Authored gas-optimized Solidity smart contracts verified with Foundry unit test suites and permissionless reward flows.",
      "Integrated Wagmi, Viem, RainbowKit, and Stellar SDK into responsive Next.js frontends with strict type safety.",
      "Delivered production-quality Web3 transaction user flows with real-time on-chain state updates and error handling.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Solidity", "Foundry", "Stellar SDK", "Soroban", "Wagmi", "Viem", "Tailwind CSS"],
  },
  {
    id: "exp-opensource",
    tag: "PROTOCOL-OPENSOURCE",
    role: "Open Source & Protocol Contributions",
    type: "Open Source & Protocol",
    period: "2024 — Present",
    location: "Remote / Open Source",
    description: "Designing open-source smart contract implementations, payment tools, and financial infrastructure.",
    focus: [
      "Stellar & Soroban Rust smart contract rails",
      "EVM smart contract security & invariant testing",
      "Payment verification & receipt generation tooling",
    ],
    highlights: [
      "Architected LuminaRail, a Stellar-native settlement protocol connecting local fiat rails with USDC liquidity.",
      "Built PayProof for cryptographic transaction verification and digital receipt generation on Stellar.",
      "Developed NdiFi yield vault smart contracts with invariant fuzzing tests in Foundry.",
      "Created PayGo smart contract escrow billing infrastructure deployed on Base L2.",
    ],
    technologies: ["Solidity", "Soroban", "Rust", "Stellar SDK", "Foundry", "Base L2", "TypeScript"],
  },
  {
    id: "exp-frontend",
    tag: "FRONTEND-WEB-APPS",
    role: "Frontend Engineering & Client Applications",
    type: "Frontend Projects",
    period: "2023 — 2024",
    location: "Nigeria",
    description: "Developing responsive web applications, component design systems, and API-driven web portals.",
    focus: [
      "Responsive component systems & design tokens",
      "Logistics & healthcare application frontends",
      "REST API integration & state management",
    ],
    highlights: [
      "Engineered Nexus Health Worker clinical healthcare frontend for patient management and appointment workflows.",
      "Built TROIT Logistics web application showcasing commercial fleet metrics and service tracking.",
      "Architected Kimana client web platform with animated component UI and smooth layout transitions.",
      "Optimized frontend rendering performance, asset delivery, and WCAG accessibility standards.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "REST APIs", "Git"],
  },
];
