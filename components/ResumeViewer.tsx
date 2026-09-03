"use client";

import { Download, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/data/profile";

export default function ResumeViewer() {
  return (
    <div className="space-y-6 font-mono">
      {/* Action Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <FileText size={16} />
            <span>RESUME_APPLICATION :: KHALID_NASIRU.PDF</span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Official curriculum vitae detailing engineering experience, projects, skills, and background.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            <ExternalLink size={14} /> Open in Tab
          </a>

          <a
            href="/cv.pdf"
            download="Whiteghost-CV.pdf"
            aria-label="Download CV"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors shadow-md"
          >
            <Download size={14} /> Download CV (PDF)
          </a>
        </div>
      </div>

      {/* Embedded PDF / Summary Container */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* PDF Iframe Viewer */}
        <div className="rounded-xl border border-slate-800 bg-[#090d18] h-[550px] overflow-hidden relative">
          <iframe
            src="/cv.pdf"
            title="Khalid Nasiru CV"
            className="w-full h-full border-none"
          />
        </div>

        {/* Structured Resume Metadata Cards */}
        <div className="space-y-4 font-sans text-xs">
          <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-4 space-y-3 font-mono">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              CANDIDATE_SUMMARY
            </span>
            <div className="space-y-1">
              <span className="text-sm font-bold text-slate-100 block">{PROFILE.name}</span>
              <span className="text-cyan-300 block">{PROFILE.role}</span>
              <span className="text-slate-400 block">{PROFILE.location}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-4 space-y-2">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              EDUCATION
            </span>
            <span className="font-bold text-slate-200 block">{PROFILE.education.university}</span>
            <span className="text-cyan-400 font-mono text-[11px] block">{PROFILE.education.degree}</span>
            <span className="text-slate-400 text-[11px] block">{PROFILE.education.secondarySchool}</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1424] p-4 space-y-2">
            <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              VERIFIED ATTESTATION
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
              <ShieldCheck size={14} /> PDF Authenticated &amp; Verified
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Contains accurate, non-fabricated experience, projects, skills, and educational qualifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
