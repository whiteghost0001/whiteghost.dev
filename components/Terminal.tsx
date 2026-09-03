"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROFILE } from "@/data/profile";
import { SKILLS } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import { EXPERIENCE } from "@/data/experience";
import { BLOGS } from "@/data/blogs";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";

interface TerminalProps {
  onOpenApp?: (appId: string) => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export default function TerminalComponent({ onOpenApp }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: "init",
      command: "welcome",
      output: (
        <div className="space-y-1 text-[var(--terminal-fg)]">
          <div className="text-[var(--accent)] font-bold">khalid@whiteghost PORTFOLIO SHELL [v1.0.0]</div>
          <div>Type <span className="text-amber-600 dark:text-yellow-300 font-bold">help</span> to view available executable commands.</div>
        </div>
      ),
    },
  ]);
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const validCmds = ["help", "whoami", "about", "skills", "experience", "projects", "blogs", "resume", "contact", "github", "ls", "pwd", "date", "clear", "neofetch", "matrix", "sudo", "coffee", "status"];
      const match = validCmds.find((c) => c.startsWith(input.toLowerCase().trim()));
      if (match) setInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistoryList.length === 0) return;
      const nextIdx = historyIndex < cmdHistoryList.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistoryList((prev) => [...prev, input]);
    setHistoryIndex(-1);

    let outNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outNode = (
          <div className="space-y-1.5 text-[var(--terminal-fg)]">
            <div className="text-[var(--accent)] font-bold">Available Commands &amp; Utilities:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">whoami</span> - Profile overview</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">about</span> - Detailed about info</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">skills</span> - List technical skills</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">projects</span> - View all projects</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">experience</span> - Verified log</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">blogs</span> - Read articles</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">resume</span> - Open CV resume</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">contact</span> - Open contact form</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">github</span> - Open GitHub profile</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">neofetch</span> - System info fetch</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">status</span> - Kernel status check</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">coffee</span> - Brew developer coffee</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">matrix</span> - Digital rain state</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">sudo</span> - Root privileges</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">ls / pwd / date</span> - Shell utils</div>
              <div><span className="text-amber-600 dark:text-yellow-300 font-bold">clear</span> - Clear screen</div>
            </div>
          </div>
        );
        break;

      case "neofetch":
        outNode = (
          <div className="p-3 bg-[#cbd5e1] dark:bg-[#060a14] rounded-lg border border-[var(--terminal-border)] text-xs font-mono space-y-1 text-[var(--terminal-fg)]">
            <div className="text-[var(--accent)] font-bold">WHITEGHOST OS v1.0.0</div>
            <div className="text-slate-500">----------------------</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">OS:</span> Portfolio Workstation OS</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Operator:</span> Khalid Nasiru</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Kernel:</span> whiteghost.dev</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Uptime:</span> 99.99%</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Stack:</span> React 19 / Next.js 16 / TypeScript / Web3</div>
            <div><span className="text-emerald-600 dark:text-emerald-400 font-bold">Location:</span> Abuja, Nigeria</div>
          </div>
        );
        break;

      case "status":
        outNode = (
          <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono space-y-1 font-semibold">
            <div>[OK] Kernel status: ONLINE</div>
            <div>[OK] On-chain RPC providers: CONNECTED</div>
            <div>[OK] Local fiat &amp; Stellar liquidity rails: ACTIVE</div>
            <div>[OK] Developer availability: OPEN FOR OPPORTUNITIES</div>
          </div>
        );
        break;

      case "coffee":
        outNode = (
          <div className="text-amber-600 dark:text-amber-300 text-xs font-mono font-bold">
            ☕ Brewing fresh developer espresso... 100% caffeine injected. Ready to code.
          </div>
        );
        break;

      case "matrix":
        outNode = (
          <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-widest animate-pulse">
            01001001 01001110 01010100 01000101 01010010 01000001 01000011 01010100 01001001 01010110 01000101
          </div>
        );
        break;

      case "sudo":
        outNode = (
          <div className="text-rose-600 dark:text-rose-400 text-xs font-mono font-semibold">
            khalid is not in the sudoers file. This incident will be reported. 🔒
          </div>
        );
        break;

      case "whoami":
      case "about":
        outNode = (
          <div className="space-y-1 text-[var(--terminal-fg)]">
            <div><span className="text-[var(--accent)] font-bold">{PROFILE.name}</span> — {PROFILE.role}</div>
            <div className="text-slate-600 dark:text-slate-400">{PROFILE.statement}</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Location: {PROFILE.location}</div>
          </div>
        );
        if (onOpenApp) onOpenApp("about");
        break;

      case "skills":
        outNode = (
          <div className="space-y-1 text-[var(--terminal-fg)]">
            <div className="text-[var(--accent)] font-bold font-mono">Technical Skills ({SKILLS.length} modules):</div>
            <div className="flex flex-wrap gap-1 text-xs">
              {SKILLS.map((s) => (
                <span key={s.name} className="px-1.5 py-0.5 bg-[#cbd5e1] dark:bg-slate-800 text-[var(--accent)] rounded font-mono font-bold">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        );
        if (onOpenApp) onOpenApp("skills");
        break;

      case "projects":
      case "ls":
        outNode = (
          <div className="space-y-1.5 text-[var(--terminal-fg)] font-mono">
            <div className="text-[var(--accent)] font-bold">Selected Repositories &amp; Products:</div>
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex justify-between text-xs border-b border-[var(--terminal-border)] pb-1">
                <span className="font-bold">{p.name}</span>
                <span className="text-[var(--accent)] font-semibold">{p.category}</span>
              </div>
            ))}
          </div>
        );
        if (onOpenApp) onOpenApp("projects");
        break;

      case "experience":
        outNode = (
          <div className="space-y-2 text-[var(--terminal-fg)] font-mono">
            <div className="text-[var(--accent)] font-bold">Verified Experience Log:</div>
            {EXPERIENCE.map((exp) => (
              <div key={exp.id} className="text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">[{exp.tag}]</span> - <span className="font-bold">{exp.role}</span> ({exp.period})
              </div>
            ))}
          </div>
        );
        if (onOpenApp) onOpenApp("experience");
        break;

      case "blogs":
        outNode = (
          <div className="space-y-1 text-[var(--terminal-fg)] font-mono">
            <div className="text-[var(--accent)] font-bold">Engineering Articles:</div>
            {BLOGS.map((b) => (
              <div key={b.id} className="text-xs">
                <span className="text-amber-600 dark:text-amber-300 font-semibold">{b.title}</span> ({b.date})
              </div>
            ))}
          </div>
        );
        if (onOpenApp) onOpenApp("blogs");
        break;

      case "resume":
        outNode = (
          <div className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
            Opening Resume application and serving CV PDF (/cv.pdf)...
          </div>
        );
        if (onOpenApp) onOpenApp("resume");
        break;

      case "contact":
        outNode = (
          <div className="text-[var(--accent)] text-xs font-mono font-semibold">
            Opening Contact Form application... Email: {PROFILE.socials.emailDisplay}
          </div>
        );
        if (onOpenApp) onOpenApp("contact");
        break;

      case "github":
        outNode = (
          <div className="text-[var(--accent)] text-xs font-mono font-semibold">
            Opening GitHub profile: {PROFILE.socials.github}
          </div>
        );
        window.open(PROFILE.socials.github, "_blank");
        break;

      case "pwd":
        outNode = <div className="text-[var(--terminal-fg)] text-xs font-mono">/home/khalid/whiteghost.dev</div>;
        break;

      case "date":
        outNode = <div className="text-[var(--terminal-fg)] text-xs font-mono">{new Date().toString()}</div>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        outNode = (
          <div className="text-rose-600 dark:text-rose-400 text-xs font-mono font-semibold">
            bash: command not found: {trimmed}. Type <span className="text-amber-600 dark:text-yellow-300 font-bold">help</span> for valid commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: input,
        output: outNode,
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] p-4 font-mono text-xs text-[var(--terminal-fg)] shadow-xl transition-colors duration-200">
      <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] pb-2 mb-3 text-[var(--accent)] font-bold">
        <TerminalIcon size={16} />
        <span>khalid@whiteghost:~$</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">khalid@whiteghost</span>:~$ <span className="text-[var(--terminal-fg)]">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="mt-3 flex items-center gap-2 border-t border-[var(--terminal-border)] pt-3">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">khalid@whiteghost:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'projects', 'skills'..."
          className="flex-1 bg-transparent text-[var(--terminal-fg)] placeholder:text-slate-400 focus:outline-none font-mono font-medium"
          autoFocus
        />
        <button type="submit" className="text-slate-400 hover:text-[var(--terminal-fg)] transition-colors" aria-label="Submit command">
          <CornerDownLeft size={14} />
        </button>
      </form>
    </div>
  );
}
