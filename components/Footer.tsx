export default function Footer() {
  return (
    <footer className="px-6 py-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <a
          href="#"
          className="font-mono text-xs font-medium"
          style={{ color: "var(--fg-subtle)" }}
        >
          whiteghost<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <p className="font-mono text-xs" style={{ color: "var(--fg-subtle)" }}>
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
