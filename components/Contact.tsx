"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LINKS } from "@/lib/links";

const socials = [
  { label: "GitHub", href: LINKS.github, external: true },
  { label: "Twitter", href: LINKS.twitter, external: true },
  { label: "Email", href: LINKS.email, external: false },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="px-6 py-20" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-5xl" ref={ref}>
        <div className="grid gap-12 md:grid-cols-[200px_1fr]">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
            <p className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: "var(--fg-subtle)" }}>
              Contact
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
            <p className="text-[0.95rem] leading-[1.8] mb-2" style={{ color: "var(--fg-muted)" }}>
              Let&apos;s build something meaningful.
            </p>
            <p className="text-[0.95rem] leading-[1.8] mb-10 max-w-sm" style={{ color: "var(--fg-subtle)" }}>
              Open to freelance projects, full-time roles, and interesting
              collaborations. If you have something worth building, reach out.
            </p>

            <a
              href={LINKS.email}
              className="inline-block text-sm font-medium px-4 py-2 mb-10 transition-opacity hover:opacity-85"
              style={{ color: "var(--bg)", backgroundColor: "var(--accent)" }}
            >
              {LINKS.emailDisplay}
            </a>

            <div className="flex items-center gap-6">
              {socials.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="font-mono text-xs transition-colors duration-200"
                  style={{ color: "var(--fg-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-subtle)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
