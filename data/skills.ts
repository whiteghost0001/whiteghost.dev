export interface Skill {
  name: string;
  category: "FRONTEND" | "BACKEND" | "BLOCKCHAIN" | "TOOLS";
  level: "Advanced" | "Intermediate" | "Working Knowledge";
  description: string;
  useCase: string;
  projects: string[];
}

export const SKILLS: Skill[] = [
  // FRONTEND
  {
    name: "React",
    category: "FRONTEND",
    level: "Advanced",
    description: "Declarative UI component architecture, custom hooks, state management, and performance optimization.",
    useCase: "Building reactive, high-performance web frontends and complex UI state workflows.",
    projects: ["Nexus Health Worker", "PayProof", "LuminaRail", "Kimana"],
  },
  {
    name: "Next.js",
    category: "FRONTEND",
    level: "Advanced",
    description: "App Router, Server Components, SSR/SSG rendering strategies, API routes, and build optimization.",
    useCase: "Architecting SEO-optimized, production-ready full-stack web applications.",
    projects: ["Nexus Health Worker", "PayProof", "PayGo", "LuminaRail"],
  },
  {
    name: "TypeScript",
    category: "FRONTEND",
    level: "Advanced",
    description: "Strict static typing, complex generics, type-safe API schemas, and robust developer tooling.",
    useCase: "Eliminating runtime type errors across frontend codebases and contract client ABIs.",
    projects: ["Nexus Health Worker", "PayProof", "LuminaRail", "PayGo", "NdiFi"],
  },
  {
    name: "JavaScript",
    category: "FRONTEND",
    level: "Advanced",
    description: "ES6+ syntax, asynchronous event-loop patterns, DOM manipulation, and promises.",
    useCase: "Core client-side logic execution and browser environment integration.",
    projects: ["Nexus Health Worker", "PayProof", "LuminaRail", "TROIT Logistics"],
  },
  {
    name: "Tailwind CSS",
    category: "FRONTEND",
    level: "Advanced",
    description: "Utility-first CSS framework, responsive design tokens, dark mode variables, and micro-animations.",
    useCase: "Rapidly implementing pixel-accurate, modern, themed user interfaces.",
    projects: ["Nexus Health Worker", "PayProof", "PayGo", "LuminaRail", "Kimana"],
  },
  {
    name: "shadcn/ui",
    category: "FRONTEND",
    level: "Intermediate",
    description: "Accessible Radix UI primitives with customizable Tailwind CSS styling.",
    useCase: "Building accessible modal dialogs, popovers, navigation menus, and command palettes.",
    projects: ["LuminaRail", "PayGo"],
  },

  // BACKEND
  {
    name: "Node.js",
    category: "BACKEND",
    level: "Intermediate",
    description: "Event-driven JavaScript runtime environment for backend APIs and serverless handlers.",
    useCase: "Building microservices, webhook receivers, and backend middleware.",
    projects: ["Nexus Health Worker", "TROIT Logistics"],
  },
  {
    name: "Express.js",
    category: "BACKEND",
    level: "Intermediate",
    description: "Minimalist web framework for Node.js routing and middleware implementation.",
    useCase: "Constructing RESTful API endpoints and authentication flow handlers.",
    projects: ["Nexus Health Worker"],
  },
  {
    name: "PostgreSQL",
    category: "BACKEND",
    level: "Working Knowledge",
    description: "Relational database management system with ACID compliance and SQL querying.",
    useCase: "Storing structured application data, user records, and transaction logs.",
    projects: ["Nexus Health Worker"],
  },
  {
    name: "REST APIs",
    category: "BACKEND",
    level: "Advanced",
    description: "Designing, consuming, and documenting HTTP RESTful endpoints and JSON payloads.",
    useCase: "Integrating third-party services, data APIs, and client-server communication.",
    projects: ["Nexus Health Worker", "TROIT Logistics", "Kimana"],
  },

  // BLOCKCHAIN
  {
    name: "Solidity",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Smart contract development for EVM blockchains, ERC standards, security patterns, and gas tuning.",
    useCase: "Writing decentralized financial logic, yield distribution vaults, and escrow contracts.",
    projects: ["PayGo", "NdiFi", "Basevia"],
  },
  {
    name: "Foundry",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Fast Ethereum development framework written in Rust. Forge unit testing, Anvil, and Cast.",
    useCase: "Comprehensive unit testing, fuzzing, and deploying EVM smart contracts.",
    projects: ["NdiFi", "PayGo"],
  },
  {
    name: "Rust",
    category: "BLOCKCHAIN",
    level: "Working Knowledge",
    description: "Systems programming language focused on safety, speed, and memory concurrency.",
    useCase: "Authoring Soroban smart contracts for the Stellar network.",
    projects: ["LuminaRail", "StellarPay"],
  },
  {
    name: "Stellar & Soroban",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Soroban Rust smart contract environment and Stellar cross-border settlement rails.",
    useCase: "Developing high-speed, low-cost financial infrastructure and USDC settlement logic.",
    projects: ["LuminaRail", "PayProof", "StellarPay"],
  },
  {
    name: "Stellar SDK",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "JavaScript/TypeScript SDK for querying Horizon servers, signing transactions, and managing trustlines.",
    useCase: "Interfacing frontend web apps directly with the Stellar decentralized ledger.",
    projects: ["LuminaRail", "PayProof", "StellarPay"],
  },
  {
    name: "Base",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Ethereum Layer 2 network providing scalable, low-cost smart contract execution.",
    useCase: "Deploying payment escrow contracts and remittance apps on Base L2.",
    projects: ["PayGo", "Basevia"],
  },
  {
    name: "Ethereum",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Decentralized EVM smart contract network and Web3 ecosystem primitives.",
    useCase: "Building decentralized vault protocols and Ethereum web interfaces.",
    projects: ["NdiFi", "PayGo"],
  },
  {
    name: "wagmi & viem",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "React Hooks for Ethereum and lightweight, modular TypeScript interface for EVM interactions.",
    useCase: "Connecting wallets, reading contract state, and broadcasting transactions seamlessly.",
    projects: ["NdiFi", "PayGo", "Basevia"],
  },
  {
    name: "RainbowKit",
    category: "BLOCKCHAIN",
    level: "Intermediate",
    description: "Polished Web3 wallet connection library supporting MetaMask, WalletConnect, and Coinbase Wallet.",
    useCase: "Providing intuitive wallet connection UX for dApps.",
    projects: ["PayGo", "NdiFi"],
  },

  // TOOLS
  {
    name: "Git & GitHub",
    category: "TOOLS",
    level: "Advanced",
    description: "Distributed version control system, branching strategies, PR reviews, and CI/CD pipelines.",
    useCase: "Managing source code repositories and collaborating on open-source projects.",
    projects: ["LuminaRail", "PayProof", "NdiFi", "PayGo", "Nexus Health Worker"],
  },
  {
    name: "Docker",
    category: "TOOLS",
    level: "Working Knowledge",
    description: "Containerization platform for packaging applications and runtime environments.",
    useCase: "Ensuring consistent execution environments between development and production.",
    projects: ["Nexus Health Worker"],
  },
  {
    name: "Linux",
    category: "TOOLS",
    level: "Intermediate",
    description: "Unix shell navigation, bash scripting, file permissions, and environment management.",
    useCase: "Command-line development work, deployment server administration, and task automation.",
    projects: ["Developer Workstation"],
  },
  {
    name: "Vercel",
    category: "TOOLS",
    level: "Advanced",
    description: "Cloud platform for static and serverless web deployment with automated preview builds.",
    useCase: "Deploying Next.js applications and edge function APIs.",
    projects: ["Nexus Health Worker", "PayProof", "LuminaRail", "Kimana", "TROIT Logistics"],
  },
];
