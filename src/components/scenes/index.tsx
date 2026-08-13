import type { CSSProperties, ReactElement } from "react";
import type { EmblemId } from "../../data/eras";

/* Each scene is a wide-aspect SVG that fills its container. Every shape uses
 * `currentColor` so the entire plate inherits the era's accent colour. */

const sw = 1.4;
const baseStroke: Record<string, unknown> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

interface SceneProps {
  className?: string;
  style?: CSSProperties;
}

function RavennaMosaic({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="rav-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.34" />
          <stop offset="0.6" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <pattern id="rav-tile" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="currentColor" fillOpacity="0.04" />
          <path d="M0 0L14 0M0 7L14 7M0 14L14 14M0 0L0 14M7 0L7 14M14 0L14 14" stroke="currentColor" strokeOpacity="0.32" strokeWidth="0.6" />
        </pattern>
        <pattern id="rav-tile-2" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <path d="M0 0L11 0M0 5.5L11 5.5M0 11L11 11M0 0L0 11M5.5 0L5.5 11M11 0L11 11" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="rav-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill="var(--bg-2, transparent)" />
      <rect width="400" height="300" fill="url(#rav-tile-2)" opacity="0.6" />
      <rect width="400" height="220" fill="url(#rav-sky)" />

      {/* moon */}
      <circle cx="100" cy="60" r="22" fill="currentColor" fillOpacity="0.18" />
      <circle cx="100" cy="60" r="22" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />

      {/* distant city of Ravenna */}
      <g {...baseStroke} opacity="0.6">
        <path d="M0 200 L60 200 L60 180 L100 180 L100 192 L150 192 L150 170 L170 170 L170 195 L210 195 L210 175 L240 175 L240 192 L290 192 L290 178 L320 178 L320 195 L400 195" />
        {/* basilica dome */}
        <path d="M170 170 q12 -28 24 0" />
        <line x1="182" y1="146" x2="182" y2="138" />
        <path d="M178 138 L186 138" />
        {/* campanile */}
        <path d="M250 192 L250 162 L258 162 L258 192" />
        <path d="M252 170 L256 170 M252 176 L256 176 M252 182 L256 182" />
      </g>

      {/* lagoon + reflections */}
      <path d="M0 200 L400 200" {...baseStroke} strokeOpacity="0.6" />
      <g opacity="0.4">
        <path d="M0 220 q20 -3 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" {...baseStroke} />
        <path d="M0 240 q25 -3 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" {...baseStroke} />
        <path d="M0 262 q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" {...baseStroke} />
      </g>
      {/* a single late galley */}
      <g {...baseStroke}>
        <path d="M50 232 L120 232 L112 244 L58 244 Z" />
        <line x1="80" y1="232" x2="80" y2="210" />
        <path d="M80 212 L106 226 L80 226 Z" />
      </g>

      {/* the golden mosaic panel — a senator at the balcony, jewel-toned */}
      <g transform="translate(210 90)">
        <rect x="0" y="0" width="160" height="120" fill="url(#rav-tile)" />
        <rect x="0" y="0" width="160" height="120" fill="url(#rav-glow)" />
        {/* frame */}
        <g {...baseStroke} strokeOpacity="0.7">
          <rect x="0" y="0" width="160" height="120" />
          <rect x="6" y="6" width="148" height="108" strokeDasharray="2 4" strokeOpacity="0.5" />
        </g>
        {/* inside the mosaic: a senator, a column, a last eagle */}
        <g {...baseStroke}>
          <path d="M10 100 L150 100" />
          <path d="M20 100 L20 60 L40 60 L40 100" />
          <path d="M30 60 L30 40 L48 40 L48 60" />
          <circle cx="39" cy="46" r="2" fill="currentColor" />
          {/* senator */}
          <g transform="translate(78 36)">
            <circle cx="0" cy="6" r="6" />
            <path d="M-6 12 L-10 4 L-2 0" />
            <path d="M6 12 L10 4 L2 0" />
            <path d="M0 12 L0 42 M-12 22 L12 22 M0 42 L-8 64 M0 42 L8 64" />
            {/* toga stripe */}
            <path d="M-12 22 q6 14 12 28 q6 -14 12 -28" strokeOpacity="0.6" />
          </g>
          {/* right column with capital */}
          <g transform="translate(110 60)">
            <path d="M0 40 L20 40" />
            <path d="M4 40 L4 12 L16 12 L16 40" />
            <path d="M0 12 L20 12" />
            <path d="M-2 8 L22 8" />
            <path d="M10 8 L10 0" />
          </g>
          {/* little imperial eagle in the spandrel */}
          <g transform="translate(134 12) scale(0.5)">
            <path d="M0 0 v22" />
            <path d="M0 4 C-8 -2 -16 0 -18 6 C-12 6 -8 10 -4 10" />
            <path d="M0 4 C8 -2 16 0 18 6 C12 6 8 10 4 10" />
            <path d="M-4 18 L4 18 L0 26 Z" />
          </g>
        </g>
      </g>

      {/* late starfield */}
      <g fill="currentColor" opacity="0.6">
        {[
          [30, 30],
          [70, 18],
          [150, 28],
          [200, 18],
          [280, 30],
          [340, 22],
          [380, 36],
          [50, 80],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 0.8} />
        ))}
      </g>
    </svg>
  );
}

function RunnymedeScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="run-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#run-sky)" />
      {/* horizon, distant trees */}
      <g {...baseStroke} opacity="0.45">
        <path d="M0 165 q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" />
        <path d="M30 165 L30 145 M50 165 L52 142 M70 165 L68 148" />
        <path d="M310 162 L312 140 M340 160 L338 144" />
      </g>
      {/* meadow */}
      <path d="M0 165 L400 165 L400 300 L0 300 Z" fill="currentColor" fillOpacity="0.04" />
      <g {...baseStroke} opacity="0.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M${20 + i * 28} ${220 + (i % 3) * 8} l3 -8 l3 8`} />
        ))}
      </g>
      {/* king on throne */}
      <g transform="translate(80 110)" {...baseStroke}>
        <path d="M0 60 L60 60 L60 8 L0 8 Z" />
        <path d="M0 8 L60 8 L50 0 L10 0 Z" />
        <path d="M10 30 L50 30" />
        <circle cx="30" cy="20" r="6" />
        <path d="M30 26 L30 44 M22 38 L38 38" />
        <path d="M22 38 L18 52 M38 38 L42 52" />
        {/* crown */}
        <path d="M24 14 L24 6 L30 12 L36 6 L36 14" />
        <circle cx="30" cy="9" r="1.2" fill="currentColor" />
      </g>
      {/* scribe */}
      <g transform="translate(170 200)" {...baseStroke}>
        <circle cx="0" cy="-6" r="4" />
        <path d="M0 -2 L0 18 M-10 8 L10 8 M0 18 L-6 30 M0 18 L6 30" />
        <path d="M-12 26 L16 26 L18 30 L-14 30 Z" />
        <path d="M-8 26 L-10 18 L8 22" />
      </g>
      {/* barons on horseback */}
      <g {...baseStroke}>
        {[40, 130, 250, 330].map((x, i) => (
          <g key={i} transform={`translate(${x} 130)`}>
            <path d="M0 30 L40 30 L34 40 L6 40 Z" />
            <circle cx="20" cy="14" r="3" />
            <path d="M20 17 L20 26 M14 21 L26 21" />
            <path d="M8 40 L8 52 M32 40 L32 52" />
            {/* horse head */}
            <path d="M-2 30 q-4 -8 -2 -16 q4 -6 10 -4 l4 6" />
            <path d="M14 14 L24 14" />
            {/* lance */}
            <path d="M20 4 L20 -22" />
            <path d="M18 -22 L22 -22 L24 -16 L16 -16 Z" />
          </g>
        ))}
      </g>
      {/* banner */}
      <g transform="translate(220 70)" {...baseStroke}>
        <path d="M0 0 L0 50" />
        <path d="M0 4 L26 0 L22 14 L28 28 L0 24 Z" />
      </g>
      {/* clouds */}
      <g opacity="0.4" {...baseStroke}>
        <path d="M40 50 q8 -10 18 0 q8 -8 16 0" />
        <path d="M260 30 q8 -10 18 0 q8 -8 16 0" />
      </g>
    </svg>
  );
}

function PlagueShips({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#moon-glow)" />
      <circle cx="120" cy="80" r="34" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="120" cy="80" r="22" fill="currentColor" fillOpacity="0.18" />
      {/* harbour wall */}
      <g {...baseStroke} opacity="0.7">
        <path d="M0 200 L180 200 L210 215 L400 215 L400 230 L0 230 Z" />
        <path d="M40 200 L40 195 M90 200 L90 195 M140 200 L140 195" />
      </g>
      {/* masts + ships */}
      <g {...baseStroke}>
        {/* ship 1 */}
        <g transform="translate(60 150)">
          <path d="M0 30 L80 30 L70 50 L10 50 Z" />
          <path d="M20 30 L20 0 M40 30 L40 -10 M60 30 L60 0" />
          <path d="M20 0 L20 6 L36 4 L36 0 Z M40 -10 L40 -2 L58 -2 L58 -10 Z" />
          {/* oars */}
          <path d="M14 36 L4 50 M30 36 L20 50 M46 36 L36 50 M62 36 L52 50 M70 36 L60 50" />
        </g>
        {/* ship 2 */}
        <g transform="translate(170 160)">
          <path d="M0 30 L70 30 L60 48 L10 48 Z" />
          <path d="M20 30 L20 0 M40 30 L40 -8 M58 30 L58 0" />
          <path d="M20 0 L20 4 L36 2 L36 0 Z M40 -8 L40 -2 L54 -2 L54 -8 Z" />
        </g>
        {/* collapsed figure */}
        <g transform="translate(82 168)">
          <circle cx="0" cy="0" r="3" />
          <path d="M-2 4 L4 12 M-2 12 L4 4" />
        </g>
      </g>
      {/* torchlight on quay */}
      <g {...baseStroke}>
        <line x1="220" y1="200" x2="220" y2="180" />
        <path d="M214 178 L226 178 L222 170 L218 170 Z" />
        <circle cx="220" cy="174" r="3" fill="currentColor" fillOpacity="0.6" />
        <line x1="310" y1="200" x2="310" y2="180" />
        <path d="M304 178 L316 178 L312 170 L308 170 Z" />
        <circle cx="310" cy="174" r="3" fill="currentColor" fillOpacity="0.6" />
      </g>
      {/* bishop with censer */}
      <g transform="translate(260 200)" {...baseStroke}>
        <circle cx="0" cy="-4" r="4" />
        <path d="M0 0 L0 16 M-6 6 L6 6 M0 16 L-4 26 M0 16 L4 26" />
        <path d="M-8 4 L8 4 L10 8 L-10 8 Z" />
        <path d="M-2 8 L-2 14 M2 8 L2 14" />
        <path d="M0 14 L0 22 L4 26 L-4 26 Z" />
      </g>
      {/* rats */}
      <g {...baseStroke} opacity="0.7">
        <g transform="translate(50 232)">
          <ellipse cx="0" cy="0" rx="5" ry="3" />
          <circle cx="-5" cy="-1" r="2" />
          <path d="M4 0 L9 -2" />
        </g>
        <g transform="translate(140 240)">
          <ellipse cx="0" cy="0" rx="5" ry="3" />
          <circle cx="-5" cy="-1" r="2" />
          <path d="M4 0 L9 -2" />
        </g>
        <g transform="translate(320 238)">
          <ellipse cx="0" cy="0" rx="5" ry="3" />
          <circle cx="-5" cy="-1" r="2" />
          <path d="M4 0 L9 -2" />
        </g>
      </g>
      {/* smoke */}
      <g opacity="0.35" {...baseStroke}>
        <path d="M220 168 q4 -10 0 -18 q-6 -10 0 -20" />
        <path d="M310 168 q4 -10 0 -18 q-6 -10 0 -20" />
      </g>
    </svg>
  );
}

function Workshop({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="lamp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#lamp)" />
      {/* window */}
      <g {...baseStroke} opacity="0.55">
        <path d="M260 50 L360 50 L360 130 L260 130 Z" />
        <path d="M310 50 L310 130 M260 90 L360 90" />
        <path d="M255 130 L365 130 L365 140 L255 140 Z" />
      </g>
      {/* bench */}
      <g {...baseStroke}>
        <path d="M0 200 L400 200" />
        <path d="M30 200 L30 240 M370 200 L370 240" />
        <path d="M30 240 L370 240" />
      </g>
      {/* Gutenberg figure */}
      <g transform="translate(120 110)" {...baseStroke}>
        <circle cx="0" cy="0" r="9" />
        <path d="M-8 4 L-12 -2 L-6 -8 M8 4 L12 -2 L6 -8" />
        <path d="M-14 8 q14 -4 28 0 L14 30 q-14 4 -28 0 Z" />
        <path d="M-12 18 L-2 12 M12 18 L2 12" />
        <path d="M-6 30 L-6 60 M6 30 L6 60 M-12 50 L12 50" />
      </g>
      {/* hand mould on bench */}
      <g transform="translate(170 184)" {...baseStroke}>
        <rect x="-22" y="-6" width="44" height="12" />
        <path d="M-18 0 L-18 6 M0 -6 L0 6 M18 -6 L18 6" />
        <path d="M-26 -10 L26 -10" />
        {/* freshly cast type */}
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={-22 + i * 7} y="-12" width="6" height="3" />
          ))}
        </g>
      </g>
      {/* screw press behind */}
      <g transform="translate(280 200)" {...baseStroke}>
        <path d="M-50 0 L50 0 L40 -30 L-40 -30 Z" />
        <path d="M-40 -30 L40 -30 L40 -60 L-40 -60 Z" />
        <path d="M0 -60 L0 -90" />
        <path d="M-12 -90 L12 -90" />
        <path d="M-30 -60 L30 -60" />
        <path d="M-30 -60 q-12 -18 0 -34 M30 -60 q12 -18 0 -34" />
        <path d="M-50 0 L-50 30 L50 30 L50 0" />
        <path d="M-46 12 L-30 12 M-30 18 L-12 18" />
      </g>
      {/* drying page */}
      <g transform="translate(40 130)" {...baseStroke}>
        <path d="M0 0 L40 0 L40 60 L0 60 Z" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d={`M6 ${10 + i * 6} L34 ${10 + i * 6}`} strokeOpacity="0.6" />
        ))}
      </g>
      {/* scattered type */}
      <g transform="translate(140 248)" {...baseStroke} opacity="0.7">
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={i * 7} y={i % 2 ? 0 : -3} width="4" height="4" />
        ))}
      </g>
      {/* ink pot */}
      <g transform="translate(220 184)" {...baseStroke}>
        <ellipse cx="0" cy="0" rx="10" ry="3" />
        <path d="M-8 0 L-6 12 L6 12 L8 0" />
      </g>
      {/* hanging lamp */}
      <g {...baseStroke}>
        <path d="M200 0 L200 30" />
        <path d="M192 30 L208 30 L204 42 L196 42 Z" />
        <circle cx="200" cy="46" r="4" fill="currentColor" fillOpacity="0.55" />
      </g>
    </svg>
  );
}

function Principia({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <radialGradient id="star-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#star-glow)" />
      {/* star field */}
      <g fill="currentColor" opacity="0.7">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 53) % 400;
          const y = ((i * 71) % 220) + 10;
          const r = i % 9 === 0 ? 1.4 : 0.7;
          return <circle key={i} cx={x} cy={y} r={r} />;
        })}
      </g>
      {/* telescope on stand */}
      <g transform="translate(70 130)" {...baseStroke}>
        <path d="M0 0 L130 -50 L142 -36 L12 14 Z" />
        <path d="M0 0 L-10 8 L8 16 L142 -36" />
        <path d="M70 0 L70 60" />
        <path d="M50 70 L90 70 L100 86 L40 86 Z" />
        <circle cx="0" cy="0" r="6" fill="currentColor" fillOpacity="0.5" />
        <circle cx="142" cy="-36" r="4" fill="currentColor" fillOpacity="0.5" />
      </g>
      {/* open book — Principia */}
      <g transform="translate(220 170)" {...baseStroke}>
        <path d="M0 0 L80 -8 L160 0 L160 70 L80 62 L0 70 Z" />
        <path d="M80 -8 L80 62" />
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i}>
            <path d={`M10 ${8 + i * 7} L70 ${2 + i * 7}`} strokeOpacity="0.7" />
            <path d={`M90 ${2 + i * 7} L150 ${8 + i * 7}`} strokeOpacity="0.7" />
          </g>
        ))}
        <path d="M40 20 q12 -10 22 0 q12 10 22 0" />
      </g>
      {/* comet */}
      <g transform="translate(320 60)" {...baseStroke}>
        <path d="M0 0 L40 0" />
        <path d="M0 0 L-30 6" strokeOpacity="0.5" />
        <path d="M0 0 L-30 -6" strokeOpacity="0.5" />
        <circle cx="0" cy="0" r="4" fill="currentColor" fillOpacity="0.6" />
        <circle cx="0" cy="0" r="9" strokeOpacity="0.4" />
      </g>
      {/* apple */}
      <g transform="translate(160 220)" {...baseStroke}>
        <circle cx="0" cy="0" r="6" />
        <path d="M-2 -6 q4 -4 6 0" />
        <path d="M0 -8 L4 -12" />
      </g>
      {/* horizon */}
      <path d="M0 250 L400 250" {...baseStroke} strokeOpacity="0.4" />
      {/* partial dome of observatory */}
      <g transform="translate(280 250)" {...baseStroke} opacity="0.5">
        <path d="M-40 0 a40 40 0 0 1 80 0" />
        <path d="M-30 -8 L-10 12 M-10 -16 L10 8 M10 -20 L30 4" />
      </g>
    </svg>
  );
}

function Trench({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="flare" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#flare)" />
      {/* flare light */}
      <circle cx="320" cy="50" r="22" fill="currentColor" fillOpacity="0.25" />
      <circle cx="320" cy="50" r="6" fill="currentColor" fillOpacity="0.9" />
      {/* sky stars */}
      <g fill="currentColor" opacity="0.5">
        <circle cx="60" cy="30" r="0.8" />
        <circle cx="140" cy="50" r="0.8" />
        <circle cx="220" cy="20" r="0.8" />
        <circle cx="280" cy="40" r="0.8" />
      </g>
      {/* horizon line + no man's land */}
      <g {...baseStroke} opacity="0.5">
        <path d="M0 130 L400 130" />
        <path d="M0 130 L60 110 M0 140 L100 130 M0 150 L70 145" />
        <path d="M400 130 L340 110 M400 140 L320 130 M400 150 L350 145" />
      </g>
      {/* mud, duckboards, puddles */}
      <g {...baseStroke}>
        <path d="M0 130 L0 300 L400 300 L400 130" fill="currentColor" fillOpacity="0.04" />
        {/* duckboards */}
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i} transform={`translate(${30 + i * 52} 250)`}>
              <path d="M0 0 L36 0" />
              <path d="M0 6 L36 6" />
              <path d="M6 0 L6 6 M18 0 L18 6 M30 0 L30 6" />
            </g>
          ))}
        </g>
        {/* puddles */}
        <ellipse cx="80" cy="280" rx="22" ry="4" fill="currentColor" fillOpacity="0.2" />
        <ellipse cx="220" cy="290" rx="18" ry="3" fill="currentColor" fillOpacity="0.2" />
        <ellipse cx="320" cy="280" rx="14" ry="3" fill="currentColor" fillOpacity="0.2" />
      </g>
      {/* sandbags at the parapet */}
      <g transform="translate(0 110)" {...baseStroke}>
        {Array.from({ length: 22 }).map((_, i) => (
          <ellipse key={i} cx={10 + i * 18} cy="20" rx="11" ry="6" fill="currentColor" fillOpacity="0.18" />
        ))}
      </g>
      {/* barbed wire */}
      <g {...baseStroke} opacity="0.7">
        <path d="M-4 90 L80 70 L160 90 L240 70 L320 90 L404 70" />
        <path d="M-4 80 L80 60 L160 80 L240 60 L320 80 L404 60" />
        {/* barbs */}
        {Array.from({ length: 22 }).map((_, i) => (
          <g key={i} transform={`translate(${20 + i * 18} ${i % 2 ? 60 : 70})`}>
            <path d="M-3 -3 L3 3 M-3 3 L3 -3" />
          </g>
        ))}
      </g>
      {/* helmeted head at the parapet */}
      <g transform="translate(200 90)" {...baseStroke}>
        <path d="M-10 0 a10 8 0 0 1 20 0 L8 8 L-8 8 Z" />
        <path d="M-8 8 L8 8 L6 14 L-6 14 Z" />
        <path d="M-2 4 L2 4" />
      </g>
      {/* distant flares */}
      <g fill="currentColor">
        <circle cx="60" cy="50" r="1.6" opacity="0.9" />
        <circle cx="160" cy="40" r="1.6" opacity="0.9" />
        <circle cx="260" cy="60" r="1.6" opacity="0.9" />
      </g>
    </svg>
  );
}

function Trinity({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <radialGradient id="mush" cx="50%" cy="40%" r="55%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mush)" />
      {/* mesa horizon */}
      <g {...baseStroke} opacity="0.55">
        <path d="M0 220 L80 220 L80 200 L160 200 L160 215 L260 215 L260 195 L340 195 L340 220 L400 220" />
      </g>
      {/* mushroom cloud — concentric arcs */}
      <g transform="translate(200 140)" {...baseStroke} fill="currentColor" fillOpacity="0.05">
        <path d="M-90 60 a90 50 0 0 1 180 0 Z" />
        <path d="M-110 40 a110 30 0 0 1 220 0" />
        <path d="M-130 20 a130 14 0 0 1 260 0" />
      </g>
      <g transform="translate(200 130)" {...baseStroke}>
        <path d="M-70 50 a70 50 0 0 1 140 0" />
        <path d="M-100 30 a100 30 0 0 1 200 0" />
        <path d="M-130 8 a130 12 0 0 1 260 0" />
        <path d="M-150 -10 a150 6 0 0 1 300 0" />
      </g>
      {/* stem */}
      <g transform="translate(200 170)" {...baseStroke}>
        <path d="M-22 0 L-30 60 L30 60 L22 0 Z" fill="currentColor" fillOpacity="0.18" />
      </g>
      {/* ground zero — zero point */}
      <g transform="translate(200 240)" {...baseStroke}>
        <path d="M-50 0 a50 8 0 0 0 100 0" />
        <path d="M-70 6 a70 4 0 0 0 140 0" strokeOpacity="0.6" />
      </g>
      {/* tiny observers in the distance */}
      <g transform="translate(80 222)" {...baseStroke}>
        <circle cx="0" cy="-2" r="1.5" />
        <path d="M0 0 L0 4 M-2 2 L2 2" />
      </g>
      <g transform="translate(330 222)" {...baseStroke}>
        <circle cx="0" cy="-2" r="1.5" />
        <path d="M0 0 L0 4 M-2 2 L2 2" />
      </g>
      {/* tripod instrument */}
      <g transform="translate(140 224)" {...baseStroke} opacity="0.7">
        <line x1="0" y1="0" x2="-6" y2="-12" />
        <line x1="0" y1="0" x2="6" y2="-12" />
        <line x1="0" y1="0" x2="0" y2="-14" />
        <line x1="-3" y1="-6" x2="3" y2="-6" />
        <path d="M-8 -14 L8 -14 L6 -10 L-6 -10 Z" />
      </g>
      {/* radiation arcs */}
      <g transform="translate(200 240)" {...baseStroke} strokeOpacity="0.4" fill="none">
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M${-60 - i * 18} 0 a${20 + i * 10} ${20 + i * 10} 0 0 0 ${120 + i * 36} 0`} />
        ))}
      </g>
    </svg>
  );
}

function WallFalls({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="berlin-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#berlin-sky)" />
      {/* street lamps */}
      <g {...baseStroke}>
        <path d="M40 60 L40 220" />
        <path d="M40 60 L60 50" />
        <circle cx="62" cy="48" r="3" fill="currentColor" fillOpacity="0.7" />
        <path d="M360 70 L360 220" />
        <path d="M360 70 L340 60" />
        <circle cx="338" cy="58" r="3" fill="currentColor" fillOpacity="0.7" />
      </g>
      {/* cobblestone street */}
      <g {...baseStroke} opacity="0.45">
        <path d="M0 250 L400 250" />
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx={20 + i * 32} cy="270" rx="12" ry="3" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx={20 + i * 32 + 12} cy="282" rx="12" ry="3" />
        ))}
      </g>
      {/* THE WALL — broken slabs */}
      <g transform="translate(40 110)" {...baseStroke}>
        {/* top crown pipe */}
        <path d="M0 0 L320 0 L320 6 L0 6 Z" fill="currentColor" fillOpacity="0.18" />
        {/* left slab intact */}
        <path d="M0 6 L0 140 L60 140 L60 6 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M8 30 L52 30 M8 50 L52 50 M8 70 L52 70 M8 90 L52 90 M8 110 L52 110" strokeOpacity="0.5" />
        {/* gap in the middle, broken slab tipping */}
        <path d="M60 6 L60 140" strokeDasharray="2 4" />
        <g transform="translate(90 50) rotate(18)">
          <path d="M0 0 L60 0 L60 90 L0 90 Z" fill="currentColor" fillOpacity="0.18" />
          <path d="M6 14 L54 14 M6 30 L54 30 M6 46 L54 46 M6 62 L54 62 M6 78 L54 78" strokeOpacity="0.5" />
        </g>
        {/* fallen slab */}
        <g transform="translate(180 130) rotate(-8)">
          <path d="M0 0 L60 0 L60 24 L0 24 Z" fill="currentColor" fillOpacity="0.22" />
          <path d="M4 6 L56 6 M4 12 L56 12 M4 18 L56 18" strokeOpacity="0.5" />
        </g>
        {/* right slab still standing */}
        <g transform="translate(240 6)">
          <path d="M0 0 L80 0 L80 134 L0 134 Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M8 22 L72 22 M8 40 L72 40 M8 58 L72 58 M8 76 L72 76 M8 94 L72 94 M8 112 L72 112" strokeOpacity="0.5" />
        </g>
        {/* graffiti on right */}
        <path d="M250 60 q6 -10 12 0 t12 0 t12 0" strokeOpacity="0.7" />
        <path d="M256 80 L268 92 M268 80 L256 92" strokeOpacity="0.7" />
      </g>
      {/* crowd figures climbing over */}
      <g transform="translate(0 200)" {...baseStroke}>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`translate(${70 + i * 32} ${i === 3 ? -6 : i === 4 ? -10 : 0})`}>
            <circle cx="0" cy="-6" r="3" />
            <path d="M-2 -3 L2 0 L-2 4 M2 -3 L-2 0 L2 4" />
            <path d="M0 -3 L0 6 M-3 0 L3 0" />
          </g>
        ))}
      </g>
      {/* camera on tripod */}
      <g transform="translate(60 232)" {...baseStroke}>
        <line x1="0" y1="0" x2="-6" y2="12" />
        <line x1="0" y1="0" x2="6" y2="12" />
        <line x1="0" y1="0" x2="0" y2="14" />
        <path d="M-8 -4 L8 -4 L10 4 L-10 4 Z" fill="currentColor" fillOpacity="0.4" />
        <circle cx="0" cy="0" r="2" fill="currentColor" />
      </g>
      {/* a chunk falling */}
      <g transform="translate(190 60)" {...baseStroke} opacity="0.7">
        <path d="M0 0 L20 0 L18 14 L2 14 Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M3 4 L17 4 M3 8 L17 8" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}

function PersiaScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="per-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#per-sky)" />
      {/* winged disc sun */}
      <g transform="translate(200 52)" {...baseStroke}>
        <circle cx="0" cy="0" r="12" fill="currentColor" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="6" fill="currentColor" fillOpacity="0.5" />
        <path d="M-12 0 C-30 -10 -52 -10 -70 -2 C-52 4 -30 6 -12 2" />
        <path d="M12 0 C30 -10 52 -10 70 -2 C52 4 30 6 12 2" />
        <path d="M-14 8 L-26 22 M-6 12 L-12 26 M14 8 L26 22 M6 12 L12 26" strokeOpacity="0.7" />
      </g>
      {/* distant ziggurat */}
      <g transform="translate(40 150)" {...baseStroke} opacity="0.55">
        <path d="M0 60 L100 60 L88 40 L74 40 L66 22 L52 22 L46 8 L34 8 L28 22 L16 22 L8 40 L0 40 Z" />
      </g>
      {/* terrace */}
      <g {...baseStroke} strokeOpacity="0.6">
        <path d="M0 240 L400 240" />
        <path d="M0 252 L400 252 M0 264 L400 264" strokeOpacity="0.3" />
      </g>
      {/* Persepolis columns — double bull capitals */}
      {[70, 150, 250, 330].map((x) => (
        <g key={x} transform={`translate(${x} 120)`} {...baseStroke}>
          <path d="M-14 0 L14 0 L10 8 L-10 8 Z" />
          <path d="M-16 -8 L-6 -14 L-6 -8 M16 -8 L6 -14 L6 -8" />
          <circle cx="-6" cy="-11" r="1" fill="currentColor" />
          <circle cx="6" cy="-11" r="1" fill="currentColor" />
          <path d="M-8 8 L-8 120 M8 8 L8 120" />
          <path d="M-8 20 L8 20 M-8 32 L8 32 M-8 44 L8 44" strokeOpacity="0.5" />
          <path d="M-12 120 L12 120 L14 128 L-14 128 Z" />
        </g>
      ))}
      {/* royal courier on horseback */}
      <g transform="translate(300 218)" {...baseStroke}>
        <path d="M0 14 L34 14 L28 24 L6 24 Z" />
        <path d="M2 24 L2 32 M30 24 L30 32" />
        <path d="M0 14 q-6 -10 -2 -20 q4 -8 12 -6 l6 8" />
        <circle cx="18" cy="-2" r="4" />
        <path d="M18 2 L18 12 M14 6 L22 6" />
        <path d="M22 0 L34 -8" />
        <path d="M34 -8 L36 -12 M34 -8 L38 -8" strokeOpacity="0.7" />
      </g>
      {/* birds */}
      <g {...baseStroke} opacity="0.6">
        <path d="M60 60 q4 -4 8 0 q4 -4 8 0" />
        <path d="M320 40 q4 -4 8 0 q4 -4 8 0" />
        <path d="M120 30 q3 -3 6 0 q3 -3 6 0" />
      </g>
    </svg>
  );
}

function RadarScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* horizon */}
      <path d="M0 190 L400 190" {...baseStroke} strokeOpacity="0.5" />
      {/* searchlights sweeping up */}
      <g opacity="0.45">
        <path d="M60 190 L20 20 L60 30 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M340 190 L380 20 L340 30 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M60 190 L20 20 M60 190 L60 30 M340 190 L380 20 M340 190 L340 30" {...baseStroke} strokeOpacity="0.5" />
      </g>
      {/* city blackout */}
      <g {...baseStroke} opacity="0.55">
        <path d="M0 190 L0 160 L30 160 L30 175 L55 175 L55 150 L90 150 L90 170 L120 170 L120 190" />
        <path d="M280 190 L280 165 L310 165 L310 178 L340 178 L340 158 L370 158 L370 172 L400 172 L400 190" />
      </g>
      {/* planes */}
      <g transform="translate(180 70)" {...baseStroke}>
        <path d="M0 0 L26 0 L34 4 L26 8 L0 8 Z" />
        <path d="M8 0 L14 -8 L20 0 M10 8 L14 16 L18 8" />
        <path d="M2 4 L-8 4" strokeOpacity="0.6" />
      </g>
      <g transform="translate(260 110) scale(0.7)" {...baseStroke} opacity="0.7">
        <path d="M0 0 L26 0 L34 4 L26 8 L0 8 Z" />
        <path d="M8 0 L14 -8 L20 0 M10 8 L14 16 L18 8" />
      </g>
      {/* radar scope */}
      <g transform="translate(200 235)">
        <circle cx="0" cy="0" r="52" fill="url(#radar-glow)" />
        <g {...baseStroke}>
          <circle cx="0" cy="0" r="52" />
          <circle cx="0" cy="0" r="34" strokeOpacity="0.5" />
          <circle cx="0" cy="0" r="16" strokeOpacity="0.35" />
          <path d="M0 -52 L0 52 M-52 0 L52 0" strokeOpacity="0.3" />
          <path d="M0 0 L36 -36" />
          <path d="M0 0 L24 -46" strokeOpacity="0.4" strokeDasharray="2 4" />
        </g>
        {/* blips */}
        <circle cx="20" cy="-24" r="2.4" fill="currentColor" />
        <circle cx="-14" cy="18" r="1.8" fill="currentColor" opacity="0.7" />
        <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.5" />
      </g>
      {/* stars */}
      <g fill="currentColor" opacity="0.5">
        <circle cx="100" cy="30" r="1" />
        <circle cx="140" cy="18" r="0.8" />
        <circle cx="300" cy="26" r="1" />
        <circle cx="240" cy="40" r="0.8" />
      </g>
    </svg>
  );
}

function HomeScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="home-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#home-sky)" />
      {/* sun */}
      <circle cx="310" cy="70" r="24" fill="currentColor" fillOpacity="0.3" />
      <circle cx="310" cy="70" r="24" fill="none" stroke="currentColor" strokeOpacity="0.6" />
      {/* skyline */}
      <g {...baseStroke}>
        <path d="M0 200 L0 150 L24 150 L24 170 L40 170 L40 130 L64 130 L64 160 L80 160 L80 145 L100 145 L100 175 L120 175 L120 120 L146 120 L146 165 L170 165 L170 140 L190 140 L190 180 L210 180 L210 150 L240 150 L240 172 L262 172 L262 135 L288 135 L288 168 L310 168 L310 148 L334 148 L334 176 L356 176 L356 158 L380 158 L380 200 Z" fill="currentColor" fillOpacity="0.06" />
        {/* windows */}
        <g strokeOpacity="0.45">
          {[128, 134, 140].map((y) =>
            [50, 56].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />)
          )}
          {[155, 161].map((y) =>
            [126, 132, 138].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />)
          )}
          {[142, 148, 154].map((y) =>
            [268, 274, 280].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" />)
          )}
        </g>
        {/* antenna */}
        <path d="M133 120 L133 104 M128 108 L138 108" />
        <circle cx="133" cy="102" r="1.5" fill="currentColor" />
      </g>
      {/* ground + street */}
      <path d="M0 200 L400 200" {...baseStroke} strokeOpacity="0.6" />
      <g {...baseStroke} strokeOpacity="0.4">
        <path d="M0 230 L400 230" strokeDasharray="10 14" />
      </g>
      {/* people with phones */}
      {[80, 150, 220, 290].map((x, i) => (
        <g key={x} transform={`translate(${x} 212)`} {...baseStroke}>
          <circle cx="0" cy="-6" r="3" />
          <path d="M0 -3 L0 8 M-3 2 L3 2 M0 8 L-3 16 M0 8 L3 16" />
          {i % 2 === 0 && <path d="M3 2 L7 0 L7 4" />}
        </g>
      ))}
      {/* location pin */}
      <g transform="translate(200 60)" {...baseStroke}>
        <path d="M0 -20 a14 14 0 0 1 14 14 c0 12 -14 26 -14 26 s-14 -14 -14 -26 a14 14 0 0 1 14 -14 Z" fill="currentColor" fillOpacity="0.15" />
        <circle cx="0" cy="-6" r="5" fill="currentColor" fillOpacity="0.5" />
        <path d="M-8 26 q8 4 16 0" strokeOpacity="0.5" />
      </g>
      {/* birds */}
      <g {...baseStroke} opacity="0.55">
        <path d="M60 50 q4 -4 8 0 q4 -4 8 0" />
        <path d="M100 34 q3 -3 6 0 q3 -3 6 0" />
      </g>
    </svg>
  );
}

function MiracleYearScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <linearGradient id="mir-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mir-glow)" />
      {/* blackboard */}
      <g {...baseStroke}>
        <rect x="26" y="30" width="230" height="140" strokeOpacity="0.7" />
        <rect x="32" y="36" width="218" height="128" strokeOpacity="0.25" />
        {/* the equation */}
        <g transform="translate(60 108)" strokeWidth="2.1">
          <path d="M0 -16h18M0 -16v30M0 -1h13M0 14h18" />
          <path d="M32 -2h16M32 4h16" />
          <path d="M62 6c-6 0-10-5-10-10s5-9 10-9 8 3 8 7-4 6-9 6" />
          <path d="M82 -14v22M82 -14l10 10 10-10M102 -14v22" strokeOpacity="0.9" />
          <path d="M112 -18l6 7-6 7" strokeOpacity="0.75" />
        </g>
        {/* scribbled workings */}
        <g strokeOpacity="0.4">
          <path d="M46 52h58M46 62h34M150 52h74M150 62h50M46 142h72M160 142h60" />
        </g>
        <path d="M26 170l-8 16h246l-8-16" strokeOpacity="0.6" />
      </g>
      {/* light cone */}
      <g transform="translate(320 118)" {...baseStroke}>
        <path d="M0 0L-30 -42M0 0L30 -42M0 0L-30 42M0 0L30 42" strokeOpacity="0.8" />
        <ellipse cx="0" cy="-42" rx="30" ry="8" strokeOpacity="0.7" />
        <ellipse cx="0" cy="42" rx="30" ry="8" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="3" fill="currentColor" stroke="none" />
      </g>
      {/* desk */}
      <g {...baseStroke}>
        <path d="M0 214h400" />
        <path d="M40 214v52M350 214v52" strokeOpacity="0.5" />
        {/* stack of patent files */}
        <g transform="translate(70 190)">
          <rect x="0" y="10" width="54" height="7" />
          <rect x="3" y="3" width="50" height="7" />
          <rect x="1" y="-4" width="52" height="7" />
          <path d="M8 6h20M10 13h24" strokeOpacity="0.5" />
        </g>
        {/* inkwell + pen */}
        <g transform="translate(180 196)">
          <ellipse cx="0" cy="0" rx="9" ry="3" />
          <path d="M-7 0l2 14h10l2-14" />
          <path d="M6 -2l16 -18" />
          <path d="M22 -20l5 -6-1 7z" />
        </g>
        {/* desk lamp */}
        <g transform="translate(300 176)">
          <path d="M0 38v-26" />
          <path d="M-14 38h28" />
          <path d="M0 12l-16 -8 8 -12 20 8z" />
          <circle cx="2" cy="6" r="2.5" fill="currentColor" fillOpacity="0.7" stroke="none" />
          <path d="M-6 16l-10 16M6 16l8 16M0 18v18" strokeOpacity="0.35" />
        </g>
      </g>
      {/* Bern clock tower, small, in the window */}
      <g transform="translate(288 34)" {...baseStroke} opacity="0.5">
        <path d="M0 60V22l14-14 14 14v38" />
        <circle cx="14" cy="34" r="8" />
        <path d="M14 34V28M14 34l5 3" />
        <path d="M14 8V0" />
      </g>
      {/* chalk dust */}
      <g fill="currentColor" opacity="0.4">
        {[[70, 186], [120, 178], [210, 184], [250, 176]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.1" />
        ))}
      </g>
    </svg>
  );
}

function BebelplatzScene({ className, style }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <defs>
        <radialGradient id="beb-glow" cx="50%" cy="78%" r="46%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#beb-glow)" />
      {/* night sky, sparse */}
      <g fill="currentColor" opacity="0.35">
        {[[40, 26], [110, 16], [190, 30], [270, 18], [350, 28]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" />
        ))}
      </g>
      {/* neoclassical facade — the opera house on the square */}
      <g {...baseStroke} opacity="0.6">
        <path d="M60 150V96l70-34 70 34v54" />
        <path d="M84 150V104M104 150V102M124 150V100M144 150V100M164 150V102M184 150V104" />
        <path d="M56 96h148" />
        <path d="M60 62h140" strokeOpacity="0.5" />
        {/* right wing */}
        <path d="M230 150v-40h130v40" />
        <path d="M250 150v-32M274 150v-32M298 150v-32M322 150v-32M346 150v-32" />
        <path d="M226 110h138" />
      </g>
      {/* the square */}
      <path d="M0 150h400" {...baseStroke} strokeOpacity="0.5" />
      <g {...baseStroke} strokeOpacity="0.18">
        <path d="M0 176h400M0 204h400M0 236h400" />
        <path d="M70 150v120M150 150v120M250 150v120M330 150v120" />
      </g>
      {/* the memorial: a lit window in the ground, empty shelves below */}
      <g transform="translate(200 224)">
        <rect x="-72" y="-32" width="144" height="64" fill="currentColor" fillOpacity="0.1" />
        <g {...baseStroke}>
          <rect x="-72" y="-32" width="144" height="64" />
          <rect x="-66" y="-26" width="132" height="52" strokeOpacity="0.45" />
          {/* empty shelves, receding */}
          <path d="M-58 -16h116M-58 -4h116M-58 8h116M-58 20h116" strokeOpacity="0.55" />
          <path d="M-58 -22v46M-20 -22v46M20 -22v46M58 -22v46" strokeOpacity="0.35" />
        </g>
        <text
          x="0"
          y="46"
          textAnchor="middle"
          fontSize="7.5"
          letterSpacing="2.4"
          fill="currentColor"
          fillOpacity="0.75"
          fontFamily="var(--font-mono)"
        >
          20,000 EMPTY SHELVES
        </text>
      </g>
      {/* two small mourners at the glass */}
      {[[148, 196], [258, 200]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} {...baseStroke} strokeOpacity="0.8">
          <circle cx="0" cy="-7" r="3.2" />
          <path d="M0 -4v12M-4 0h8M0 8l-3 10M0 8l3 10" />
        </g>
      ))}
      {/* ash drifting */}
      <g fill="currentColor" opacity="0.45">
        {[[60, 64], [96, 108], [150, 78], [214, 60], [268, 96], [312, 70], [348, 118], [40, 130]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="2.6" height="2" transform={`rotate(${i * 24} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

const SCENES: Record<EmblemId, (p: SceneProps) => ReactElement> = {
  relativity: MiracleYearScene, // 1905 — blackboard, light cone, patent desk
  bookburn: BebelplatzScene, // 1933 — the empty-shelf memorial, ash, silence
  ankh: PlagueShips,
  laurel: PlagueShips, // 44 BCE Rome — ships, senate, marble
  persia: PersiaScene, // 539 BCE — Persepolis columns, winged disc, royal courier
  eagle: RavennaMosaic, // 476 — golden mosaic, basilica, lagoon
  seal: RunnymedeScene, // 1215 — meadow, throne, barons on horseback
  cathedral: Workshop, // 1254 — gothic workshop
  raven: PlagueShips, // 1347 — galleys, torchlight, rats
  press: Workshop, // 1450 — Gutenberg workshop
  prism: Principia, // 1503 + 1687 — telescope, book, comet
  cannon: Trench, // 1789 — gunpowder era
  trench: Trench, // 1914 — parapet, barbed wire, flare
  radar: RadarScene, // 1939 — searchlights, blackout, radar scope
  atom: Trinity, // 1945 + 1965 — nuclear / atomic age
  wall: WallFalls, // 1989 — Berlin Wall
  pin: HomeScene, // 2026 — your skyline, your pin
  ring: WallFalls,
};

interface EraSceneProps extends SceneProps {
  emblem: EmblemId;
}

export function EraScene({ emblem, className, style }: EraSceneProps) {
  const C = SCENES[emblem] || RavennaMosaic;
  return <C className={className} style={style} />;
}
