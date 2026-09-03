"use client";

import { PROFILE } from "@/data/profile";
import { Activity, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t font-mono" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-mono text-sm font-bold tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              whiteghost<span style={{ color: "var(--accent)" }}>.dev</span>
            </a>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              <Activity size={10} className="animate-pulse text-emerald-500" />
              SYSTEM_STATUS :: ONLINE
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
            style={{ color: "var(--fg-subtle)" }}
          >
            GitHub
          </a>
          <a
            href={PROFILE.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--fg)]"
            style={{ color: "var(--fg-subtle)" }}
          >
            X / Twitter
          </a>
          <a
            href={PROFILE.socials.email}
            className="transition-colors hover:text-[var(--fg)]"
            style={{ color: "var(--fg-subtle)" }}
          >
            Email
          </a>
          <a
            href="/cv.pdf"
            download="Whiteghost-CV.pdf"
            className="transition-colors hover:text-[var(--accent)] text-[var(--accent)] font-bold flex items-center gap-1"
          >
            <ShieldCheck size={13} /> Download CV
          </a>
        </div>

        <p className="text-xs font-mono" style={{ color: "var(--fg-subtle)" }}>
          &copy; {new Date().getFullYear()} Khalid Nasiru. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
