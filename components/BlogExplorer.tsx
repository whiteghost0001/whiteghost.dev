"use client";

import { useState } from "react";
import { BLOGS, BlogPost } from "@/data/blogs";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, X, ArrowRight } from "lucide-react";

export default function BlogExplorer() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="border-b border-[var(--border)] pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <BookOpen size={16} />
          <span>$ ls -la ~/blogs</span>
        </div>
        <span className="text-[10px] text-[var(--fg-subtle)] font-mono font-bold">{BLOGS.length} ARTICLES PUBLISHED</span>
      </div>

      {/* Blog Post List */}
      <div className="grid gap-5 sm:grid-cols-2">
        {BLOGS.map((post) => (
          <div
            key={post.id}
            className="group flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-md transition-all hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-2">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar size={12} className="text-[var(--accent)]" /> {post.date}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock size={12} className="text-amber-600 dark:text-amber-400" /> {post.readingTime}
                </span>
              </div>

              <h3 className="font-bold text-[var(--fg)] text-base mb-2 group-hover:text-[var(--accent)] transition-colors font-sans">
                {post.title}
              </h3>

              <p className="text-xs text-[var(--fg-muted)] font-sans leading-relaxed mb-4">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-purple-600 dark:text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActivePost(post)}
              className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs font-semibold text-[var(--accent)] hover:opacity-80 transition-colors"
            >
              <span>Read Full Article</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden font-sans text-[var(--fg)]"
            >
              {/* Reader Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-3.5 font-mono">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[var(--accent)]" />
                  <span className="font-bold text-[var(--fg)] text-xs sm:text-sm">ARTICLE_VIEWER</span>
                </div>
                <button
                  onClick={() => setActivePost(null)}
                  className="rounded-md p-1 text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)] transition-colors"
                  aria-label="Close article"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Reader Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--accent)] mb-2 font-bold">
                    <span>{activePost.category}</span> • <span>{activePost.date}</span> • <span>{activePost.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--fg)] leading-snug">{activePost.title}</h2>
                </div>

                <div className="space-y-4 text-[var(--fg-muted)] text-sm sm:text-base leading-relaxed border-t border-[var(--border)] pt-5">
                  {activePost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--border)] font-mono text-xs text-[var(--fg-subtle)] font-bold">
                  <span>Written by Khalid Nasiru • Full-Stack &amp; Web3 Engineer</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
