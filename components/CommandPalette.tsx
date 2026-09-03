"use client";

import { useEffect, useState } from "react";
import { Search, Monitor, Terminal, FileText, FolderGit2, Layers, User, Mail, X } from "lucide-react";
import { PROFILE } from "@/data/profile";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOS: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenOS }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery("");
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "os",
      label: "INITIALIZE PORTFOLIO OS",
      category: "SYSTEM",
      icon: <Monitor size={16} className="text-[var(--accent)]" />,
      run: () => {
        onClose();
        onOpenOS();
      },
    },
    {
      id: "cv",
      label: "Download CV (PDF)",
      category: "RESUME",
      icon: <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />,
      run: () => {
        onClose();
        window.open("/cv.pdf", "_blank");
      },
    },
    {
      id: "work",
      label: "View Projects & Repositories",
      category: "NAVIGATION",
      icon: <FolderGit2 size={16} className="text-purple-600 dark:text-purple-400" />,
      run: () => {
        onClose();
        document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "skills",
      label: "Explore Skills Matrix",
      category: "NAVIGATION",
      icon: <Layers size={16} className="text-amber-600 dark:text-amber-400" />,
      run: () => {
        onClose();
        document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "about",
      label: "System Profile & About",
      category: "NAVIGATION",
      icon: <User size={16} className="text-[var(--accent)]" />,
      run: () => {
        onClose();
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "contact",
      label: "Contact Khalid Nasiru",
      category: "NAVIGATION",
      icon: <Mail size={16} className="text-emerald-600 dark:text-emerald-400" />,
      run: () => {
        onClose();
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      category: "EXTERNAL",
      icon: <Terminal size={16} className="text-[var(--fg-muted)]" />,
      run: () => {
        onClose();
        window.open(PROFILE.socials.github, "_blank");
      },
    },
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md font-mono select-none">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden text-[var(--fg)] transition-colors duration-200">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3">
          <Search size={18} className="text-[var(--accent)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search action..."
            className="flex-1 bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none font-mono"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Close command palette"
          >
            <X size={16} />
          </button>
        </div>

        {/* Actions List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((action) => (
              <button
                key={action.id}
                onClick={action.run}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-hover)] text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <span className="text-xs font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {action.label}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface-elevated)] text-[var(--fg-muted)] group-hover:text-[var(--fg)] border border-[var(--border)]">
                  {action.category}
                </span>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-[var(--fg-subtle)]">No matching commands found.</div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-[10px] text-[var(--fg-subtle)] font-bold">
          <span>NAVIGATION: UP/DOWN</span>
          <span>SELECT: ENTER</span>
          <span>CLOSE: ESC</span>
        </div>
      </div>
    </div>
  );
}
