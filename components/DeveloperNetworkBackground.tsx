"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

interface DataStream {
  x: number;
  y: number;
  vy: number;
  text: string;
  opacity: number;
}

const DATA_TOKENS = ["0x1A", "NODE", "BLOCK", "TX", "RPC", "01001001", "DEPLOY", "SYNC", "WAGMI", "USDC", "SOL", "RUST"];

export default function DeveloperNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Detect theme class on html element
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Generate Nodes
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 50);
    let nodes: Node[] = [];
    let streams: DataStream[] = [];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1,
          baseX: x,
          baseY: y,
        });
      }

      // Generate Data Streams
      streams = [];
      const streamCount = Math.min(Math.floor(width / 200), 8);
      for (let i = 0; i < streamCount; i++) {
        streams.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: Math.random() * 0.5 + 0.2,
          text: DATA_TOKENS[Math.floor(Math.random() * DATA_TOKENS.length)],
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    initNodes();

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.015;
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fine Background Grid
      const gridSize = 48;
      ctx.lineWidth = 1;
      ctx.strokeStyle = isLight ? "rgba(215, 222, 231, 0.7)" : "rgba(30, 41, 59, 0.25)";
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Render Data Streams (Slow Vertical Floating Text)
      ctx.font = "10px monospace";
      for (const stream of streams) {
        ctx.fillStyle = isLight
          ? `rgba(2, 132, 199, ${stream.opacity * 1.6})`
          : `rgba(56, 189, 248, ${stream.opacity})`;
        ctx.fillText(stream.text, stream.x, stream.y);

        if (!prefersReducedMotion) {
          stream.y -= stream.vy;
          if (stream.y < -20) {
            stream.y = height + 20;
            stream.x = Math.random() * width;
            stream.text = DATA_TOKENS[Math.floor(Math.random() * DATA_TOKENS.length)];
          }
        }
      }

      // 3. Update & Draw Network Nodes and Links
      const nodeColor = isLight ? "rgba(6, 182, 212, 0.75)" : "rgba(56, 189, 248, 0.6)";
      const lineColor = isLight ? "6, 182, 212" : "16, 185, 129";
      const particleColor = isLight ? "rgba(59, 130, 246, 0.9)" : "rgba(56, 189, 248, 0.9)";

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse Repulsion / Parallax
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const angle = Math.atan2(dy, dx);
            const force = (120 - dist) / 120;
            node.x -= Math.cos(angle) * force * 1.5;
            node.y -= Math.sin(angle) * force * 1.5;
          }
        }

        // Draw Node Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect Nodes with Line Pulses
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const nx = other.x - node.x;
          const ny = other.y - node.y;
          const distance = Math.sqrt(nx * nx + ny * ny);

          if (distance < 140) {
            const alpha = (1 - distance / 140) * (isLight ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated pulse particle along connection line
            const pulseProgress = (pulseTime + i * 0.3) % 1;
            const px = node.x + nx * pulseProgress;
            const py = node.y + ny * pulseProgress;
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
