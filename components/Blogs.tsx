"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlogExplorer from "./BlogExplorer";

export default function Blogs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blogs" className="px-6 py-24 border-t relative" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              $ ls -la ~/blogs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: "var(--fg)" }}>
              Engineering Articles &amp; Writing
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
          </div>

          <BlogExplorer />
        </motion.div>
      </div>
    </section>
  );
}
