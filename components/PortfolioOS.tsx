"use client";

import { useState, useEffect } from "react";
import OSWindow from "./OSWindow";
import AboutSystem from "./AboutSystem";
import SkillsUniverse from "./SkillsUniverse";
import ExperienceGitLog from "./ExperienceGitLog";
import ProjectsExplorer from "./ProjectsExplorer";
import BlogExplorer from "./BlogExplorer";
import ContactTerminal from "./ContactTerminal";
import ResumeViewer from "./ResumeViewer";
import TerminalComponent from "./Terminal";
import {
  User,
  Layers,
  GitCommit,
  FolderGit2,
  BookOpen,
  Mail,
  FileText,
  Terminal,
  Monitor,
  X,
} from "lucide-react";

import BootScreen from "./BootScreen";

interface AppState {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface PortfolioOSProps {
  isOpen: boolean;
  onCloseOS: () => void;
}

export default function PortfolioOS({ isOpen, onCloseOS }: PortfolioOSProps) {
  const [isBooting, setIsBooting] = useState(true);
  const [topZ, setTopZ] = useState(10);
  const [apps, setApps] = useState<Record<string, AppState>>({
    about: { id: "about", title: "About.system", icon: <User size={15} />, isOpen: true, isMinimized: false, zIndex: 1 },
    projects: { id: "projects", title: "Projects Explorer", icon: <FolderGit2 size={15} />, isOpen: false, isMinimized: false, zIndex: 2 },
    skills: { id: "skills", title: "Skills Matrix", icon: <Layers size={15} />, isOpen: false, isMinimized: false, zIndex: 3 },
    experience: { id: "experience", title: "Git Commit Log", icon: <GitCommit size={15} />, isOpen: false, isMinimized: false, zIndex: 4 },
    blogs: { id: "blogs", title: "Blog Explorer", icon: <BookOpen size={15} />, isOpen: false, isMinimized: false, zIndex: 5 },
    resume: { id: "resume", title: "Resume App", icon: <FileText size={15} />, isOpen: false, isMinimized: false, zIndex: 6 },
    contact: { id: "contact", title: "Contact Terminal", icon: <Mail size={15} />, isOpen: false, isMinimized: false, zIndex: 7 },
    terminal: { id: "terminal", title: "Workstation CLI", icon: <Terminal size={15} />, isOpen: false, isMinimized: false, zIndex: 8 },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseOS();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCloseOS]);

  if (!isOpen) return null;

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  const focusApp = (appId: string) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const closeApp = (appId: string) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false,
      },
    }));
  };

  const toggleMinimizeApp = (appId: string) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: !prev[appId].isMinimized,
      },
    }));
  };

  return (
    <div className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden font-mono select-none text-[var(--fg)] transition-colors duration-200">
      {/* OS Desktop Topbar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-xs text-[var(--fg-muted)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[var(--accent)]">
            <Monitor size={16} />
            <span>KHALID_OS v1.0.0</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-[var(--fg-subtle)]">|</span>
          <span className="hidden sm:inline-block text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">STATUS: ONLINE</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-[11px] text-[var(--fg-subtle)]">Press ESC or click exit to return to web layout</span>
          <button
            onClick={onCloseOS}
            className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
          >
            <X size={14} /> Exit OS
          </button>
        </div>
      </div>

      {/* OS Desktop Workspace Area */}
      <div className="relative flex-1 w-full overflow-hidden p-2 sm:p-4">
        {/* Render App Windows */}
        <OSWindow
          id="about"
          title="About.system"
          icon={<User size={15} className="text-[var(--accent)]" />}
          isOpen={apps.about.isOpen}
          isMinimized={apps.about.isMinimized}
          onClose={() => closeApp("about")}
          onMinimize={() => toggleMinimizeApp("about")}
          onFocus={() => focusApp("about")}
          zIndex={apps.about.zIndex}
        >
          <AboutSystem />
        </OSWindow>

        <OSWindow
          id="projects"
          title="Projects Explorer"
          icon={<FolderGit2 size={15} className="text-emerald-600 dark:text-emerald-400" />}
          isOpen={apps.projects.isOpen}
          isMinimized={apps.projects.isMinimized}
          onClose={() => closeApp("projects")}
          onMinimize={() => toggleMinimizeApp("projects")}
          onFocus={() => focusApp("projects")}
          zIndex={apps.projects.zIndex}
        >
          <ProjectsExplorer />
        </OSWindow>

        <OSWindow
          id="skills"
          title="Skills Matrix"
          icon={<Layers size={15} className="text-purple-600 dark:text-purple-400" />}
          isOpen={apps.skills.isOpen}
          isMinimized={apps.skills.isMinimized}
          onClose={() => closeApp("skills")}
          onMinimize={() => toggleMinimizeApp("skills")}
          onFocus={() => focusApp("skills")}
          zIndex={apps.skills.zIndex}
        >
          <SkillsUniverse />
        </OSWindow>

        <OSWindow
          id="experience"
          title="Git Commit Log"
          icon={<GitCommit size={15} className="text-amber-600 dark:text-amber-400" />}
          isOpen={apps.experience.isOpen}
          isMinimized={apps.experience.isMinimized}
          onClose={() => closeApp("experience")}
          onMinimize={() => toggleMinimizeApp("experience")}
          onFocus={() => focusApp("experience")}
          zIndex={apps.experience.zIndex}
        >
          <ExperienceGitLog />
        </OSWindow>

        <OSWindow
          id="blogs"
          title="Blog Explorer"
          icon={<BookOpen size={15} className="text-[var(--accent)]" />}
          isOpen={apps.blogs.isOpen}
          isMinimized={apps.blogs.isMinimized}
          onClose={() => closeApp("blogs")}
          onMinimize={() => toggleMinimizeApp("blogs")}
          onFocus={() => focusApp("blogs")}
          zIndex={apps.blogs.zIndex}
        >
          <BlogExplorer />
        </OSWindow>

        <OSWindow
          id="resume"
          title="Resume App"
          icon={<FileText size={15} className="text-emerald-600 dark:text-emerald-400" />}
          isOpen={apps.resume.isOpen}
          isMinimized={apps.resume.isMinimized}
          onClose={() => closeApp("resume")}
          onMinimize={() => toggleMinimizeApp("resume")}
          onFocus={() => focusApp("resume")}
          zIndex={apps.resume.zIndex}
        >
          <ResumeViewer />
        </OSWindow>

        <OSWindow
          id="contact"
          title="Contact Terminal"
          icon={<Mail size={15} className="text-purple-600 dark:text-purple-400" />}
          isOpen={apps.contact.isOpen}
          isMinimized={apps.contact.isMinimized}
          onClose={() => closeApp("contact")}
          onMinimize={() => toggleMinimizeApp("contact")}
          onFocus={() => focusApp("contact")}
          zIndex={apps.contact.zIndex}
        >
          <ContactTerminal />
        </OSWindow>

        <OSWindow
          id="terminal"
          title="Workstation CLI"
          icon={<Terminal size={15} className="text-emerald-600 dark:text-emerald-400" />}
          isOpen={apps.terminal.isOpen}
          isMinimized={apps.terminal.isMinimized}
          onClose={() => closeApp("terminal")}
          onMinimize={() => toggleMinimizeApp("terminal")}
          onFocus={() => focusApp("terminal")}
          zIndex={apps.terminal.zIndex}
        >
          <TerminalComponent onOpenApp={focusApp} />
        </OSWindow>
      </div>

      {/* OS Taskbar Dock (Bottom) */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 flex items-center justify-center gap-2 overflow-x-auto select-none">
        {Object.values(apps).map((app) => {
          const isActive = app.isOpen && !app.isMinimized;
          return (
            <button
              key={app.id}
              onClick={() => {
                if (!app.isOpen) {
                  focusApp(app.id);
                } else if (app.isMinimized) {
                  focusApp(app.id);
                } else {
                  toggleMinimizeApp(app.id);
                }
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)] shadow-md font-bold"
                  : app.isOpen
                  ? "bg-[var(--surface-hover)] text-[var(--fg)] border border-[var(--border)]"
                  : "bg-[var(--surface)] text-[var(--fg-muted)] border border-[var(--border)] hover:text-[var(--fg)]"
              }`}
            >
              {app.icon}
              <span className="hidden sm:inline-block">{app.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
