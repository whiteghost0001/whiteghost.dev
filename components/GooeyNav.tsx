"use client";

import { useRef, useEffect, useState } from "react";

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
.gn-container {
  position: relative;
  overflow: hidden;
  padding: 2px 0;
}

.gn-container nav {
  display: flex;
  position: relative;
  transform: translate3d(0, 0, 0.01px);
}

.gn-container nav ul {
  display: flex;
  gap: 0.1em;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 3;
}

.gn-container nav ul li {
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  color: var(--fg-muted);
  transition: color 0.2s ease;
}

.gn-container nav ul li a {
  display: inline-block;
  padding: 0.4em 0.75em;
  font-size: 0.8125rem;
  font-weight: 450;
  text-decoration: none;
  color: inherit;
  letter-spacing: 0.01em;
}

.gn-container nav ul li:hover {
  color: var(--fg);
}

.gn-container nav ul li:focus-within:has(:focus-visible) {
  outline: 1px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Active — bottom border, no pill */
.gn-container nav ul li::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75em;
  right: 0.75em;
  height: 1.5px;
  background: var(--accent);
  opacity: 0;
  transform: scaleX(0);
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 2;
  border-radius: 1px;
}

.gn-container nav ul li.active {
  color: var(--fg);
}

.gn-container nav ul li.active::after {
  opacity: 1;
  transform: scaleX(1);
}

/* Hide the gooey filter effect — using underline instead */
.gn-container .effect {
  display: none;
}
`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: NavItem[];
  initialActiveIndex?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GooeyNav({ items, initialActiveIndex = 0 }: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById("gn-styles")) return;
    const el = document.createElement("style");
    el.id = "gn-styles";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const makeParticles = (element: HTMLElement) => {
    const PARTICLE_COUNT = 8;
    const DISTANCES: [number, number] = [60, 8];
    const RADIUS = 70;
    const ANIM_TIME = 400;
    const TIME_VARIANCE = 200;
    // Muted grey tones only
    const COLORS = ["#2a2a2a", "#333", "#3a3a3a", "#2a2a2a"];

    const bubbleTime = ANIM_TIME * 2 + TIME_VARIANCE;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = ANIM_TIME * 2 + noise(TIME_VARIANCE * 2);
      const rotate = noise(RADIUS / 10);
      const start = getXY(DISTANCES[0], PARTICLE_COUNT - i, PARTICLE_COUNT);
      const end = getXY(DISTANCES[1] + noise(5), PARTICLE_COUNT - i, PARTICLE_COUNT);
      const scale = 1 + noise(0.15);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const rotateDeg = rotate > 0 ? (rotate + RADIUS / 20) * 10 : (rotate - RADIUS / 20) * 10;

      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("gn-particle");
        particle.style.setProperty("--start-x", `${start[0]}px`);
        particle.style.setProperty("--start-y", `${start[1]}px`);
        particle.style.setProperty("--end-x", `${end[0]}px`);
        particle.style.setProperty("--end-y", `${end[1]}px`);
        particle.style.setProperty("--time", `${t}ms`);
        particle.style.setProperty("--scale", `${scale}`);
        particle.style.setProperty("--color", color);
        particle.style.setProperty("--rotate", `${rotateDeg}deg`);
        point.classList.add("gn-point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => element.classList.add("active"));
        setTimeout(() => {
          try { element.removeChild(particle); } catch { /* gone */ }
        }, t);
      }, 30);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    const liEl = e.currentTarget;
    const href = items[index].href;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      filterRef.current.querySelectorAll(".gn-particle").forEach((p) =>
        filterRef.current!.removeChild(p)
      );
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) makeParticles(filterRef.current);

    // Smooth scroll to anchor
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current || activeIndex < 0) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    const ro = new ResizeObserver(() => {
      if (activeIndex < 0) return;
      const li = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement;
      if (li) updateEffectPosition(li);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="gn-container" ref={containerRef}>
      <nav aria-label="Main navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.href}
              className={activeIndex === index ? "active" : ""}
              onClick={(e) => handleClick(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(e as unknown as React.MouseEvent<HTMLLIElement>, index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-current={activeIndex === index ? "page" : undefined}
            >
              <a
                href={item.href}
                onClick={(e) => e.preventDefault()}
                tabIndex={-1}
                aria-hidden="true"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}
