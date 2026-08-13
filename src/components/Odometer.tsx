interface OdometerProps {
  year: number;
  className?: string;
}

/** Rolling flip-digit readout. Handles BCE via abs value + suffix. */
export function Odometer({ year, className = "" }: OdometerProps) {
  const abs = Math.abs(year);
  const digits = String(abs).split("").map(Number);

  return (
    <div className={`odo ${className}`} aria-label={`Year ${year < 0 ? abs + " BCE" : abs + " CE"}`}>
      {digits.map((d, i) => (
        <span className="odo-col" key={i}>
          <span
            className="odo-strip"
            style={{ transform: `translateY(-${d}em)` }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
      <span
        className="ml-[0.18em]"
        style={{ fontSize: "0.28em", letterSpacing: "0.22em", fontFamily: "var(--font-mono)" }}
      >
        {year < 0 ? "BCE" : "CE"}
      </span>
    </div>
  );
}
