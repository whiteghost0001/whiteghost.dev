"use client";

import { useState, useEffect } from "react";
import { Copy, Check, FileCode, Terminal as TerminalIcon } from "lucide-react";

const CODE_LINES = [
  `import { Developer } from "@khalid/universe";`,
  `import { Web3, Frontend } from "@engineering/stack";`,
  ``,
  `export const engineer = new Developer({`,
  `  name: "Khalid Nasiru",`,
  `  handle: "@whiteghost",`,
  `  role: "Full-Stack & Blockchain Engineer",`,
  `  location: "Abuja, Nigeria",`,
  `  skills: ["React", "Next.js", "Solidity", "Stellar", "TypeScript"],`,
  `  status: "Available for engineering opportunities",`,
  `});`,
  ``,
  `await engineer.deployProduct({`,
  `  target: "Mainnet / Production",`,
  `  quality: "Production-grade",`,
  `});`,
];

export default function CodeEditor() {
  const [copied, setCopied] = useState(false);
  const [visibleLineCount, setVisibleLineCount] = useState(1);

  useEffect(() => {
    if (visibleLineCount < CODE_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLineCount((prev) => prev + 1);
      }, 140);
      return () => clearTimeout(timer);
    }
  }, [visibleLineCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_LINES.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] shadow-xl font-mono text-xs text-[var(--terminal-fg)] transition-colors duration-200">
      {/* Editor Titlebar */}
      <div className="flex items-center justify-between border-b border-[var(--terminal-border)] bg-[#e2e8f0] dark:bg-[#0f1422] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-1.5 rounded-md bg-[#cbd5e1] dark:bg-[#161c2e] px-2.5 py-1 text-[11px] text-cyan-700 dark:text-cyan-300 font-bold">
            <FileCode size={13} className="text-cyan-600 dark:text-cyan-400" />
            <span>portfolio.tsx</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono">TypeScript / React 19</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded bg-[#cbd5e1] dark:bg-slate-800/80 px-2 py-1 text-[11px] text-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-bold"
            aria-label="Copy code snippet"
          >
            {copied ? <Check size={13} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="overflow-x-auto p-4 sm:p-5 leading-relaxed">
        {CODE_LINES.slice(0, visibleLineCount).map((line, idx) => {
          const lineNum = String(idx + 1).padStart(2, "0");
          return (
            <div key={idx} className="flex items-start gap-4">
              <span className="w-6 shrink-0 select-none text-right text-slate-400 dark:text-slate-600 font-mono text-[11px]">
                {lineNum}
              </span>
              <div className="whitespace-pre">
                {line.startsWith("import") ? (
                  <span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">import</span>{" "}
                    <span className="text-amber-600 dark:text-amber-300 font-medium">
                      {line.slice(line.indexOf("{"), line.indexOf("}") + 1)}
                    </span>{" "}
                    <span className="text-purple-600 dark:text-purple-400">from</span>{" "}
                    <span className="text-emerald-700 dark:text-emerald-300">{line.slice(line.indexOf('"'))}</span>
                  </span>
                ) : line.startsWith("export const") ? (
                  <span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">export const</span>{" "}
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold">engineer</span> ={" "}
                    <span className="text-purple-600 dark:text-purple-400">new</span>{" "}
                    <span className="text-amber-600 dark:text-yellow-300 font-semibold">Developer</span>(&#123;
                  </span>
                ) : line.includes(":") ? (
                  <span>
                    &nbsp;&nbsp;<span className="text-cyan-700 dark:text-cyan-400 font-semibold">{line.slice(0, line.indexOf(":"))}</span>:{" "}
                    <span className="text-emerald-700 dark:text-emerald-300">{line.slice(line.indexOf(":") + 1)}</span>
                  </span>
                ) : line.startsWith("await") ? (
                  <span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">await</span>{" "}
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold">engineer</span>.
                    <span className="text-amber-600 dark:text-yellow-300 font-semibold">deployProduct</span>(&#123;
                  </span>
                ) : (
                  <span className="text-[var(--terminal-fg)]">{line}</span>
                )}
              </div>
            </div>
          );
        })}

        {visibleLineCount === CODE_LINES.length && (
          <div className="mt-2 flex items-center gap-2 pt-2 text-[11px] text-emerald-600 dark:text-emerald-400/80 border-t border-[var(--terminal-border)]">
            <TerminalIcon size={12} className="animate-pulse text-emerald-600 dark:text-emerald-400" />
            <span>Compilation target: Web3 Mainnet. System state: READY.</span>
          </div>
        )}
      </div>
    </div>
  );
}
