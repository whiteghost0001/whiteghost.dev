import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whiteghost-dev.vercel.app"),
  title: "Khalid Nasiru | Full-Stack Developer & Blockchain Engineer",
  description:
    "Khalid Nasiru is a full-stack developer and blockchain engineer building web applications, Web3 products, smart contracts and open-source software.",
  keywords: [
    "Khalid Nasiru",
    "whiteghost",
    "Full-Stack Developer",
    "Blockchain Engineer",
    "Web3 Engineer",
    "Solidity",
    "Soroban",
    "Stellar",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Khalid Nasiru", url: "https://whiteghost-dev.vercel.app" }],
  openGraph: {
    title: "Khalid Nasiru | Full-Stack Developer & Blockchain Engineer",
    description:
      "Khalid Nasiru is a full-stack developer and blockchain engineer building web applications, Web3 products, smart contracts and open-source software.",
    url: "https://whiteghost-dev.vercel.app",
    siteName: "Khalid Nasiru Workstation",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Khalid Nasiru Workstation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Nasiru | Full-Stack Developer & Blockchain Engineer",
    description:
      "Khalid Nasiru is a full-stack developer and blockchain engineer building web applications, Web3 products, smart contracts and open-source software.",
    creator: "@whiteghost002",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-[var(--bg)] text-[var(--fg)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


