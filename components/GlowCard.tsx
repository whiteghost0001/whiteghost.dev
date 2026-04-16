"use client";

import { useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glow-card ${className}`}
      data-hovered={hovered ? "true" : "false"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="glow-card-inner">{children}</div>
    </div>
  );
}
