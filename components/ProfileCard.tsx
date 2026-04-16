"use client";

import React, { useEffect, memo } from "react";

// ─── CSS (injected once) ──────────────────────────────────────────────────────

const CSS = `
.pc-wrap {
  position: relative;
  width: 100%;
}

.pc-shell {
  position: relative;
}

.pc-card {
  display: grid;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.pc-card * {
  display: grid;
  grid-area: 1/-1;
  border-radius: 4px;
  pointer-events: none;
}

.pc-inside {
  inset: 0;
  position: absolute;
  background: var(--surface);
}

.pc-avatar-layer {
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.pc-avatar-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.pc-info-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 28px 14px 12px;
  background: linear-gradient(to top, color-mix(in srgb, var(--bg) 80%, transparent), transparent);
  pointer-events: none;
}

.pc-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--fg);
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
  font-family: var(--font-geist-mono, monospace);
}
`;

// ─── Component ────────────────────────────────────────────────────────────────

interface ProfileCardProps {
  avatarUrl: string;
  name?: string;
  role?: string;
}

function ProfileCardInner({
  avatarUrl,
  name = "Khalid Nasiru",
}: ProfileCardProps) {
  useEffect(() => {
    if (document.getElementById("pc-styles")) return;
    const el = document.createElement("style");
    el.id = "pc-styles";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);

  return (
    <div className="pc-wrap">
      <div className="pc-shell">
        <div className="pc-card">
          <div className="pc-inside" />
          <div className="pc-avatar-layer">
            <img src={avatarUrl} alt={name} loading="eager" />
          </div>
          <div className="pc-info-bar">
            <span className="pc-name">{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileCard = memo(ProfileCardInner);
export default ProfileCard;
