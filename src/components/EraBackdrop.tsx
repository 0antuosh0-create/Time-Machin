import type { Era } from "../data/eras";

interface EraBackdropProps {
  era: Era;
  reduced: boolean;
}

function toBackdropUrl(url: string): string {
  if (url.includes("images.pexels.com")) {
    return `${url.split("?")[0]}?auto=compress&cs=tinysrgb&w=900`;
  }
  if (url.includes("Special:FilePath") || url.includes("upload.wikimedia.org")) {
    return `${url.split("?")[0]}?width=900`;
  }
  return url;
}

export function EraBackdrop({ era, reduced }: EraBackdropProps) {
  const seed = Math.abs(era.year);
  const posX = 28 + (seed % 45);
  const posY = 24 + ((seed * 7) % 46);
  const source = toBackdropUrl(era.backdrop ?? era.image ?? "");
  const imageOpacity = era.memorial ? 0.4 : era.id === "home" ? 0.34 : 0.5;

  return (
    <div className="era-backdrop" aria-hidden>
      {source && (
        <div
          key={`bg-${era.id}`}
          className={`era-backdrop-image ${reduced ? "" : "era-backdrop-drift"}`}
          style={{
            backgroundImage: `url(${source})`,
            backgroundPosition: `${posX}% ${posY}%`,
            opacity: imageOpacity,
            filter: era.memorial
              ? "grayscale(1) blur(2px) contrast(1.25) brightness(0.66)"
              : "blur(2px) saturate(1.2) contrast(1.05) brightness(0.82)",
          }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${posX}% ${posY}%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 36%), radial-gradient(circle at ${100 - posX}% ${100 - posY}%, color-mix(in srgb, var(--accent-2) 15%, transparent), transparent 40%), linear-gradient(135deg, color-mix(in srgb, var(--bg-2) 46%, transparent), color-mix(in srgb, var(--bg) 84%, transparent))`,
        }}
      />
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`era-orbital-ring ${reduced ? "" : "era-ring-spin"}`}
          style={{ borderColor: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
        />
      </div>
      <div key={`stamp-${era.id}`} className="era-backdrop-year font-display" style={{ color: "var(--accent)" }}>
        {era.yearLabel}
      </div>
    </div>
  );
}
