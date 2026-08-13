import { useEffect, useState } from "react";
import type { EmblemId, Era } from "../data/eras";
import { EraScene } from "./scenes";

/* Line-art motifs, one per era family. Drawn in the era's accent colour. */
function Emblem({ id }: { id: EmblemId }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "ankh":
      return (
        <g {...p}>
          <ellipse cx="32" cy="18" rx="9" ry="11" />
          <path d="M32 29v27M20 38h24" />
        </g>
      );
    case "laurel":
      return (
        <g {...p}>
          <path d="M32 56C18 50 12 38 14 22M32 56c14-6 20-18 18-34" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <ellipse cx={16 + i * 2.2} cy={44 - i * 7} rx="5.5" ry="2.6" transform={`rotate(${-38 - i * 5} ${16 + i * 2.2} ${44 - i * 7})`} />
              <ellipse cx={48 - i * 2.2} cy={44 - i * 7} rx="5.5" ry="2.6" transform={`rotate(${38 + i * 5} ${48 - i * 2.2} ${44 - i * 7})`} />
            </g>
          ))}
        </g>
      );
    case "eagle":
      return (
        <g {...p}>
          <path d="M32 20v26" />
          <path d="M32 24C24 16 14 14 8 16c6 4 8 10 14 12-5 1-8 0-11-2 4 6 12 9 21 8" />
          <path d="M32 24c8-8 18-10 24-8-6 4-8 10-14 12 5 1 8 0 11-2-4 6-12 9-21 8" />
          <path d="M28 46h8l-4 10z" />
        </g>
      );
    case "seal":
      return (
        <g {...p}>
          <circle cx="32" cy="26" r="14" />
          <circle cx="32" cy="26" r="9" strokeDasharray="2 3" />
          <path d="M32 21v10M28 26h8" />
          <path d="M24 39l-3 17 11-6 11 6-3-17" />
        </g>
      );
    case "cathedral":
      return (
        <g {...p}>
          <path d="M20 56V26l12-16 12 16v30z" />
          <path d="M32 10V4M28 7h8" />
          <path d="M32 56V38a6 6 0 0 0-12 0" />
          <circle cx="32" cy="28" r="4.5" />
          <path d="M12 56V34l8-6M52 56V34l-8-6" />
        </g>
      );
    case "raven":
      return (
        <g {...p}>
          <path d="M18 44c0-12 8-20 18-20 8 0 12 4 14 8l6 2-5 4c0 12-9 18-19 18-8 0-14-4-14-12z" />
          <circle cx="42" cy="30" r="1.6" fill="currentColor" />
          <path d="M50 32l8-2-8 6" />
          <path d="M20 50c-6 2-10 6-12 10" />
        </g>
      );
    case "press":
      return (
        <g {...p}>
          <path d="M14 10h36v10H14zM14 44h36v10H14z" />
          <path d="M32 20v24M22 20v6h20v-6" />
          <path d="M20 54v6h24v-6" />
          <path d="M24 32h16M24 37h11" />
        </g>
      );
    case "prism":
      return (
        <g {...p}>
          <path d="M32 12L14 46h36z" />
          <path d="M4 34h14M46 30l14-8M46 36l14 0M46 42l14 8" />
        </g>
      );
    case "cannon":
      return (
        <g {...p}>
          <path d="M12 40h30l14-10v8l-12 6H12z" />
          <circle cx="20" cy="48" r="7" />
          <path d="M20 41v14M13 48h14" />
          <path d="M44 44v10h10" />
        </g>
      );
    case "trench":
      return (
        <g {...p}>
          <path d="M4 44h14l4-8h8l4 8h22" />
          <path d="M18 44v14M46 44v14" />
          <path d="M28 36V16M24 20h8M24 26h8" />
          <path d="M4 58h56" strokeDasharray="3 4" />
        </g>
      );
    case "atom":
      return (
        <g {...p}>
          <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
          <ellipse cx="32" cy="32" rx="22" ry="9" />
          <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(120 32 32)" />
        </g>
      );
    case "wall":
      return (
        <g {...p}>
          <path d="M8 22h20v10H8zM32 22h24v10H32zM8 36h32v10H8zM44 36h12v10H44z" />
          <path d="M30 16v36" strokeDasharray="3 3" />
          <path d="M40 50l6 8M46 50l-6 8" />
        </g>
      );
    case "persia":
      return (
        <g {...p}>
          <circle cx="32" cy="26" r="7" />
          <path d="M25 26C16 20 8 20 3 24c6 3 12 4 20 4M39 26c9-6 17-6 22-2-6 3-12 4-20 4" />
          <path d="M28 33l-4 10M32 34v12M36 33l4 10" />
          <path d="M20 50h24" />
        </g>
      );
    case "radar":
      return (
        <g {...p}>
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="12" strokeDasharray="2 3" />
          <path d="M32 32l14-14" />
          <path d="M32 32l6-19" strokeDasharray="2 3" opacity="0.6" />
          <circle cx="41" cy="24" r="2" fill="currentColor" stroke="none" />
          <circle cx="26" cy="40" r="1.5" fill="currentColor" stroke="none" />
        </g>
      );
    case "pin":
      return (
        <g {...p}>
          <path d="M32 10a14 14 0 0 1 14 14c0 11-14 26-14 26S18 35 18 24a14 14 0 0 1 14-14z" />
          <circle cx="32" cy="24" r="5" />
          <path d="M24 56q8 4 16 0" opacity="0.6" />
        </g>
      );
    case "relativity":
      return (
        <g {...p}>
          <path d="M32 32L12 8M32 32L52 8M32 32L12 56M32 32L52 56" />
          <ellipse cx="32" cy="8" rx="20" ry="5" opacity="0.7" />
          <ellipse cx="32" cy="56" rx="20" ry="5" opacity="0.45" />
          <circle cx="32" cy="32" r="3.4" fill="currentColor" stroke="none" />
        </g>
      );
    case "bookburn":
      return (
        <g {...p}>
          <path d="M8 40h20l4 4 4-4h20" />
          <path d="M8 40V26l20 4 4 4M56 40V26l-20 4-4 4" />
          <path d="M32 34v18M8 40l4 12h40l4-12" />
          <path d="M32 22c-5-4-2-9 0-12 3 4 8 5 5 12" opacity="0.85" />
        </g>
      );
    case "ring":
    default:
      return (
        <g {...p}>
          <circle cx="32" cy="32" r="10" />
          <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-20 32 32)" />
          <path d="M32 22v-8M32 42v8" opacity="0.6" />
        </g>
      );
  }
}

interface EraVisualProps {
  era: Era;
  className?: string;
  animate?: boolean;
}

/**
 * Photographic feed where telemetry exists; an engraved archive plate otherwise.
 * Both share the same aspect handling so grids stay flush.
 */
export function EraVisual({ era, className = "", animate = true }: EraVisualProps) {
  if (era.image) {
    // Memorial eras (e.g. 1933) get a documentary warning treatment, not a
    // cinematic one — desaturated, still, framed as archival record.
    if (era.memorial) {
      return (
        <div className={`relative h-full w-full overflow-hidden ${className}`}>
          <img
            src={era.image}
            alt={`${era.name} — ${era.location}, ${era.yearLabel}`}
            className={`h-full w-full grayscale contrast-125 brightness-95 ${
              era.id === "reichstag" ? "object-contain bg-black" : "object-cover"
            }`}
            loading="lazy"
          />
          {/* archival frame */}
          <div className="pointer-events-none absolute inset-0 border-4" style={{ borderColor: "rgba(0,0,0,0.4)" }} aria-hidden />
          <div className="pointer-events-none absolute inset-0 border" style={{ borderColor: "rgba(255,255,255,0.25)" }} aria-hidden />
          {/* red archival warning band */}
          <div
            className="pointer-events-none absolute left-0 top-0 flex items-center gap-2 px-3 py-1.5"
            style={{ background: "rgba(190,30,20,0.9)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Memorial record · observe only
          </div>
          {/* do-not-reproduce stamp */}
          <div
            className="pointer-events-none absolute bottom-3 right-3 rotate-[-8deg] border-2 px-2 py-1"
            style={{ borderColor: "rgba(190,30,20,0.85)", color: "rgba(190,30,20,0.9)", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            For historical study
          </div>
        </div>
      );
    }

    return (
      <img
        src={era.image}
        alt={`${era.name} — ${era.location}, ${era.yearLabel}`}
        className={`${animate ? "kenburns" : ""} h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`archive-plate relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 60%), linear-gradient(160deg, var(--bg-2), var(--bg))`,
      }}
      role="img"
      aria-label={`Archive plate — ${era.name}, ${era.yearLabel}`}
    >
      {/* engraved line-art scene, tinted with the era accent */}
      <div className="absolute inset-0" style={{ color: "var(--accent)" }}>
        <EraScene emblem={era.emblem} className="h-full w-full" />
      </div>

      {/* big watermark year, like an artifact stamp */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ color: "var(--accent)" }}
        aria-hidden
      >
        <span
          className="font-display leading-none"
          style={{ fontSize: "clamp(6rem, 14vw, 12rem)", opacity: 0.08, letterSpacing: "-0.04em" }}
        >
          {era.yearLabel}
        </span>
      </div>

      {/* faint paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, transparent 0, transparent 1.4px, currentColor 1.4px, currentColor 1.8px, transparent 1.8px), radial-gradient(circle at 70% 70%, transparent 0, transparent 1.6px, currentColor 1.6px, currentColor 2px, transparent 2px)",
          backgroundSize: "9px 9px, 13px 13px",
          backgroundPosition: "0 0, 4px 6px",
          color: "var(--accent)",
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />

      {/* top-left: emblem + plate id */}
      <div
        className="pointer-events-none absolute left-4 top-4 flex items-center gap-2"
        style={{ color: "var(--accent)" }}
      >
        <svg viewBox="0 0 64 64" width="22" height="22" aria-hidden>
          <Emblem id={era.emblem} />
        </svg>
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink)" }}
        >
          Plate {era.short}
        </span>
      </div>

      {/* bottom-left: long caption */}
      <div className="pointer-events-none absolute bottom-4 left-4 max-w-[70%]" style={{ color: "var(--ink)" }}>
        <p
          className="font-display text-[clamp(1.2rem,2.4vw,1.8rem)] leading-tight"
          style={{ color: "var(--accent)" }}
        >
          {era.location}
        </p>
        <p
          style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}
        >
          Reconstructed from record · {era.epoch}
        </p>
      </div>

      {/* bottom-right: tiny crosshair / plate number */}
      <div
        className="pointer-events-none absolute bottom-4 right-4 text-right"
        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}
      >
        <div>Plate № {(era.year < 0 ? "NEG" : "POS")}-{String(Math.abs(era.year)).padStart(4, "0")}</div>
        <div style={{ color: "var(--accent)" }}>{era.confidence.split(":")[0]}</div>
      </div>
    </div>
  );
}
