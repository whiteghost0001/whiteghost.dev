"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function ContactTerminal() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] p-5 sm:p-6 font-mono text-xs text-[var(--terminal-fg)] shadow-xl transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-[var(--terminal-border)] pb-3 mb-4">
        <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
          <TerminalIcon size={16} />
          <span>$ ./contact.exe --recipient=&quot;{PROFILE.socials.emailDisplay}&quot;</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          STATUS :: ACTIVE
        </span>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-3 font-mono">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">MESSAGE_TRANSMITTED :: DELIVERED</div>
          <p className="text-xs text-[var(--terminal-fg)] font-sans max-w-md mx-auto">
            Thank you, <strong className="text-[var(--accent)]">{formData.name}</strong>. Your message has been logged. I will respond to <strong className="text-[var(--accent)]">{formData.email}</strong> as soon as possible.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", message: "" });
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#cbd5e1] dark:bg-slate-800 px-4 py-2 text-xs font-bold text-[var(--terminal-fg)] hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Send Another Packet
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              [1] SENDER_NAME:
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. whiteghost"
              className="w-full rounded-lg border border-[var(--terminal-border)] bg-[#cbd5e1]/40 dark:bg-slate-900/60 p-2.5 text-xs text-[var(--terminal-fg)] placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              [2] SENDER_EMAIL:
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. whiteghost@gmail.com"
              className="w-full rounded-lg border border-[var(--terminal-border)] bg-[#cbd5e1]/40 dark:bg-slate-900/60 p-2.5 text-xs text-[var(--terminal-fg)] placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              [3] TRANSMISSION_BODY:
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your engineering inquiry, project, or collaboration..."
              className="w-full rounded-lg border border-[var(--terminal-border)] bg-[#cbd5e1]/40 dark:bg-slate-900/60 p-2.5 text-xs text-[var(--terminal-fg)] placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isTransmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] p-3 text-xs font-bold text-slate-950 hover:opacity-90 transition-all shadow-md disabled:opacity-50"
          >
            {isTransmitting ? (
              <span>TRANSMITTING PACKET...</span>
            ) : (
              <>
                <Send size={14} />
                <span>TRANSMIT MESSAGE PACKET</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
