export interface Profile {
  name: string;
  handle: string;
  role: string;
  secondaryRole: string;
  statement: string;
  location: string;
  stateOfOrigin: string;
  education: {
    university: string;
    degree: string;
    secondarySchool: string;
  };
  socials: {
    github: string;
    twitter: string;
    email: string;
    emailDisplay: string;
    portfolio: string;
  };
  status: {
    kernelVersion: string;
    online: boolean;
    availableForHire: boolean;
    message: string;
  };
  loadedModules: string[];
}

export const PROFILE: Profile = {
  name: "Khalid Nasiru",
  handle: "whiteghost",
  role: "Full-Stack Developer & Blockchain Engineer",
  secondaryRole: "Web3 Engineer & Frontend Specialist",
  statement: "Building high-performance web applications, blockchain products, smart-contract systems, and open-source software.",
  location: "Abuja, Nigeria",
  stateOfOrigin: "Kaduna State, Nigeria",
  education: {
    university: "Kaduna State University",
    degree: "B.Sc. Business Administration",
    secondarySchool: "Arewa Model School",
  },
  socials: {
    github: "https://github.com/whiteghost0001",
    twitter: "https://x.com/whiteghost002",
    email: "mailto:bigkaytwo@gmail.com",
    emailDisplay: "bigkaytwo@gmail.com",
    portfolio: "https://whiteghost-dev.vercel.app/",
  },
  status: {
    kernelVersion: "v1.0.0",
    online: true,
    availableForHire: true,
    message: "Available for engineering opportunities & collaborations",
  },
  loadedModules: [
    "NEXT.JS",
    "REACT",
    "TYPESCRIPT",
    "NODE.JS",
    "SOLIDITY",
    "RUST",
    "STELLAR",
    "BASE",
  ],
};
