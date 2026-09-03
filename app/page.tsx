"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import PortfolioOS from "@/components/PortfolioOS";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import LiveProducts from "@/components/LiveProducts";
import OpenSource from "@/components/OpenSource";
import Capabilities from "@/components/Capabilities";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [isOSOpen, setIsOSOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent-glow)] flex flex-col font-mono">
      {/* Scroll Progress & Custom Cursor */}
      <ScrollProgress />
      <CustomCursor />
      {/* Boot Screen Layer */}
      {booting && <BootScreen onComplete={() => setBooting(false)} />}

      {/* Global Interactive OS Overlay */}
      <PortfolioOS isOpen={isOSOpen} onCloseOS={() => setIsOSOpen(false)} />

      {/* Global CMD+K Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenOS={() => setIsOSOpen(true)}
      />

      {/* Main Workstation Web Layout */}
      <Navbar
        onOpenOS={() => setIsOSOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />

      <main className="flex-1">
        <Hero onOpenOS={() => setIsOSOpen(true)} />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <LiveProducts />
        <OpenSource />
        <Capabilities />
        <Blogs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}


