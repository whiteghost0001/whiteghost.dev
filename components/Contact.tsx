"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ContactTerminal from "./ContactTerminal";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="px-6 py-24 border-t relative" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-2" style={{ color: "var(--accent)" }}>
              $ ./contact.exe
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans" style={{ color: "var(--fg)" }}>
              Have something worth building?
              <span style={{ color: "var(--accent)" }}>.</span>
            </h2>
          </div>

          <ContactTerminal />
        </motion.div>
      </div>
    </section>
  );
}


