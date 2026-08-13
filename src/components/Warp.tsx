interface WarpProps {
  active: boolean;
  reduced: boolean;
}

/** Full-screen displacement effect fired on every jump. */
export function Warp({ active, reduced }: WarpProps) {
  if (!active) return null;
  return (
    <div className="warp-overlay" aria-hidden>
      {!reduced && (
        <>
          <div className="warp-streaks" />
          <div className="warp-ring" style={{ animationDelay: "0ms" }} />
          <div className="warp-ring" style={{ animationDelay: "130ms" }} />
          <div className="warp-ring" style={{ animationDelay: "260ms" }} />
        </>
      )}
      <div className={reduced ? "warp-flash-fast" : "warp-flash"} />
    </div>
  );
}
