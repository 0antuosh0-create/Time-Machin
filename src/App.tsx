import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { DANGER_LABELS, ERAS, GROUPS, PRESENT_YEAR } from "./data/eras";
import { useNow, useReducedMotion } from "./lib/hooks";
import { Odometer } from "./components/Odometer";
import { Scramble } from "./components/Scramble";
import { Warp } from "./components/Warp";
import { Reveal } from "./components/Reveal";
import { EraVisual } from "./components/EraVisual";
import { EraBackdrop } from "./components/EraBackdrop";
import { QUOTES, SURVIVAL } from "./data/quotes";
import { chronoAudio } from "./lib/audio";

interface LogEntry {
  id: number;
  time: string;
  text: string;
}

const FUN_FACTS = [
  "Time travel tip: never meet yourself. The paperwork is atrocious.",
  "The Authority once lost a traveler in 1969. He was at Woodstock the whole time.",
  "Paradox insurance covers everything except butterflies.",
  "Some eras smell like paper. Others smell like ozone. 1945 smells like both.",
  "If you hear a clock ticking backwards, you're already late.",
  "The console is 99.9% accurate. The last 0.1% is called 'history'.",
  "You cannot take a selfie in 476. The camera doesn't exist yet.",
];

function loadVisited(): string[] {
  try {
    const raw = localStorage.getItem("tempora-visited");
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    /* ignore */
  }
  return [];
}

const BOOT_INDEX = ERAS.findIndex((e) => e.id === "space");

function BrandGlyph() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="16" cy="16" r="13.5" strokeWidth="1.6" />
      <path d="M10.5 8h11M10.5 24h11" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.5 8c0 5 9 4.6 9 8s-9 3-9 8" strokeWidth="1.6" />
      <path d="M20.5 8c0 5-9 4.6-9 8s9 3 9 8" strokeWidth="1.6" opacity="0.55" />
      <circle cx="27.6" cy="8.6" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const now = useNow(1000);

  const [idx, setIdx] = useState(BOOT_INDEX);
  const [displayYear, setDisplayYear] = useState(ERAS[BOOT_INDEX].year);
  const [sliderVal, setSliderVal] = useState(BOOT_INDEX);
  const [warping, setWarping] = useState(false);
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem("tempora-sound") === "1";
    } catch {
      return false;
    }
  });
  const [visited, setVisited] = useState<string[]>(loadVisited);
  const [toast, setToast] = useState<string | null>(null);
  const [paradox, setParadox] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 0, time: "00:00:00", text: "System online · anchor 2026 CE" },
  ]);
  const toastTimer = useRef<number | null>(null);

  const idxRef = useRef(BOOT_INDEX);
  const busyRef = useRef(false);
  const reducedRef = useRef(reduced);
  const displayRef = useRef(ERAS[BOOT_INDEX].year);
  const animRef = useRef<number | null>(null);
  const pendingRef = useRef<number | null>(null);
  const arrivalRef = useRef<HTMLElement | null>(null);
  const prevRef = useRef(BOOT_INDEX);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  const era = ERAS[idx];
  const previewEra = ERAS[sliderVal];
  const displacement = Math.abs(PRESENT_YEAR - era.year);
  const direction = era.year < PRESENT_YEAR ? "Retrograde" : "Prograde";

  /* ------------------------------ year tweening ----------------------------- */

  const animateYear = useCallback((to: number, dur: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (reducedRef.current || dur <= 0) {
      displayRef.current = to;
      setDisplayYear(to);
      return;
    }
    const from = displayRef.current;
    if (from === to) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (to - from) * e);
      displayRef.current = v;
      setDisplayYear(v);
      if (p < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  /* --------------------------------- jumping -------------------------------- */

  const jumpTo = useCallback(
    (i: number) => {
      if (busyRef.current || i === idxRef.current || i < 0 || i >= ERAS.length) return;
      busyRef.current = true;
      setWarping(true);
      setSliderVal(i);

      // paradox easter egg
      if (i === prevRef.current && i !== BOOT_INDEX) {
        chronoAudio.warp(0);
        setParadox(true);
        setToast("⏳ Paradox detected · timeline loop!");
        if (toastTimer.current) window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => {
          setParadox(false);
          setToast(null);
        }, 2200);
      }
      prevRef.current = idxRef.current;

      // directional whoosh — rising futureward, falling retrograde
      chronoAudio.warp(ERAS[i].year > ERAS[idxRef.current].year ? 1 : -1);

      const arrive = () => {
        busyRef.current = false;
        setWarping(false);
        const e = ERAS[i];
        chronoAudio.ping();
        setLogs((l) =>
          [
            {
              id: Date.now(),
              time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
              text: `${e.yearLabel} · ${e.name}`,
            },
            ...l,
          ].slice(0, 5)
        );
        // passport stamp
        setVisited((prev) => {
          if (prev.includes(e.id)) return prev;
          const next = [...prev, e.id];
          try {
            localStorage.setItem("tempora-visited", JSON.stringify(next));
          } catch {
            /* ignore */
          }
          chronoAudio.stamp();
          if (toastTimer.current) window.clearTimeout(toastTimer.current);
          setToast(`Passport stamped · ${e.yearLabel} — ${e.name}`);
          toastTimer.current = window.setTimeout(() => setToast(null), 2600);
          return next;
        });
        arrivalRef.current?.scrollIntoView({
          behavior: reducedRef.current ? "auto" : "smooth",
          block: "start",
        });
      };

      if (reducedRef.current) {
        idxRef.current = i;
        setIdx(i);
        displayRef.current = ERAS[i].year;
        setDisplayYear(ERAS[i].year);
        window.setTimeout(arrive, 340);
        return;
      }

      animateYear(ERAS[i].year, 1150);
      window.setTimeout(() => {
        idxRef.current = i;
        setIdx(i);
      }, 700);
      window.setTimeout(arrive, 1650);
    },
    [animateYear]
  );

  const jumpToRef = useRef(jumpTo);
  useEffect(() => {
    jumpToRef.current = jumpTo;
  }, [jumpTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") jumpToRef.current(idxRef.current + 1);
      if (e.key === "ArrowLeft") jumpToRef.current(idxRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // prefetch only the current era and its neighbours — not all 24 photos at boot
  useEffect(() => {
    [idx - 1, idx, idx + 1].forEach((i) => {
      const e = ERAS[i];
      if (!e) return;
      [e.image, e.backdrop].forEach((src) => {
        if (!src) return;
        const im = new Image();
        im.src = src;
      });
    });
  }, [idx]);

  // the era you boot into counts as visited; restore sound preference
  useEffect(() => {
    chronoAudio.setEnabled(soundOn);
    setVisited((prev) => {
      const id = ERAS[BOOT_INDEX].id;
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("tempora-visited", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    // fun fact on first load
    const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    window.setTimeout(() => {
      setToast(fact);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 5000);
    }, 1800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------------------- derived -------------------------------- */

  const themeVars = {
    "--bg": era.palette.bg,
    "--bg-2": era.palette.bg2,
    "--ink": era.palette.ink,
    "--accent": era.palette.accent,
    "--accent-2": era.palette.accent2,
    "--muted": era.palette.muted,
    "--font-body": era.fonts.body,
    "--font-display": era.fonts.display,
  } as CSSProperties;

  const clock = now.toISOString().slice(11, 19);
  const groupFirst = useMemo(
    () => GROUPS.map((g) => ({ ...g, index: ERAS.findIndex((e) => e.group === g.id) })),
    []
  );

  const summary = [
    { k: "Destination", v: `${era.name}` },
    { k: "Coordinates", v: era.location },
    { k: "Displacement", v: `${displacement.toLocaleString("en-US")} yrs ${direction.toLowerCase()}` },
    { k: "Feed status", v: era.signal },
  ];

  /* ---------------------------------- render -------------------------------- */

  return (
    <div className="app-shell" style={themeVars}>
      <EraBackdrop era={era} reduced={reduced} />
      <div className="vignette" aria-hidden />
      <div className="grain" aria-hidden />
      <Warp active={warping} reduced={reduced} />
      {paradox && <div className="paradox-flash" aria-hidden />}

      {/* ================================ header ================================ */}
      <header
        className="sticky top-0 z-40 border-b hairline"
        style={{ background: "color-mix(in srgb, var(--bg) 94%, transparent)" }}
      >
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-6 px-5 py-3 md:px-8">
          <a href="#console" className="flex shrink-0 items-center gap-3" style={{ color: "var(--accent)" }}>
            <BrandGlyph />
            <span className="font-display text-lg tracking-[0.2em]" style={{ color: "var(--ink)" }}>
              TEMPORA
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ["#console", "Console"],
              ["#arrival", "Arrival"],
              ["#manual", "Manual"],
              ["#events", "Log"],
              ["#chronicle", "Chronicle"],
              ["#destinations", "Destinations"],
              ["#passport", "Passport"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[11px] uppercase tracking-[0.22em] transition-colors duration-200"
                style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {label}
              </a>
            ))}
          </nav>
          <div
            className="flex shrink-0 items-center gap-3 text-[11px] tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
          >
            <span className="hidden md:inline">{ERAS.length} STOPS</span>
            <span className="hidden md:inline" style={{ color: "var(--accent)" }}>
              {visited.length}/{ERAS.length} STAMPED
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !soundOn;
                setSoundOn(next);
                chronoAudio.setEnabled(next);
                try {
                  localStorage.setItem("tempora-sound", next ? "1" : "0");
                } catch {
                  /* ignore */
                }
                if (next) chronoAudio.ping();
              }}
              aria-pressed={soundOn}
              title={soundOn ? "Mute temporal audio" : "Enable temporal audio"}
              className="flex items-center gap-1.5 border px-2 py-1 transition-colors duration-200 hover:opacity-100"
              style={{
                borderColor: soundOn ? "var(--accent)" : "color-mix(in srgb, var(--muted) 40%, transparent)",
                color: soundOn ? "var(--accent)" : "var(--muted)",
              }}
            >
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden>
                <path d="M2 6v4h3l4 3V3L5 6H2z" />
                {soundOn ? (
                  <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                ) : (
                  <path d="M11 6l4 4M15 6l-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                )}
              </svg>
              <span className="hidden sm:inline">{soundOn ? "SOUND ON" : "SOUND OFF"}</span>
            </button>
            <span className="led inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="hidden sm:inline" style={{ color: "var(--ink)" }}>{clock}</span>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* ================================ console ================================ */}
        <section id="console" className="relative z-10 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1380px] px-5 pb-8 pt-8 md:px-8">
            {/* --- row 1: readout + viewport --- */}
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              {/* readout */}
              <div className="panel flex flex-col">
                <div className="panel-head">
                  <span>Temporal Coordinate</span>
                  <span style={{ color: warping ? "var(--accent)" : "var(--muted)" }}>
                    {warping ? "◆ DISPLACING" : "◇ LOCKED"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-8 p-6 md:p-8">
                  {/* year block */}
                  <div>
                    <p className="mono-label mb-3">Destination year</p>
                    <Odometer year={displayYear} className="odo-xl font-display" />
                    <p
                      className="mt-4 text-lg"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      {era.epoch}
                    </p>
                  </div>

                  {/* summary table */}
                  <dl className="grid gap-0 border-t hairline">
                    {summary.map((row) => (
                      <div
                        key={row.k}
                        className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 border-b hairline py-3"
                      >
                        <dt className="mono-label pt-1">{row.k}</dt>
                        <dd className="text-base leading-snug" style={{ color: "var(--ink)" }}>
                          {row.v}
                        </dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[130px_minmax(0,1fr)] items-center gap-4 py-3">
                      <dt className="mono-label">Threat level</dt>
                      <dd className="flex items-center gap-3">
                        <span className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className="inline-block h-2.5 w-2.5 rounded-full border transition-colors duration-500"
                              style={{
                                background: n <= era.danger ? "var(--accent)" : "transparent",
                                borderColor:
                                  n <= era.danger ? "var(--accent)" : "color-mix(in srgb, var(--muted) 55%, transparent)",
                              }}
                            />
                          ))}
                        </span>
                        <span
                          style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}
                        >
                          {DANGER_LABELS[era.danger]}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* viewport */}
              <div className="panel scanlines relative flex min-h-[380px] flex-col overflow-hidden">
                <div className="panel-head">
                  <span>Viewport · {era.image ? "Live optical feed" : "Archive reconstruction"}</span>
                  <span className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
                    <span className="led inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-2)" }} />
                    REC
                  </span>
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <div key={era.id} className="era-in absolute inset-0">
                    <EraVisual era={era} />
                  </div>
                  <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div className="absolute left-1/2 top-0 h-full w-px" style={{ background: "var(--accent)", opacity: 0.2 }} />
                    <div className="absolute left-0 top-1/2 h-px w-full" style={{ background: "var(--accent)", opacity: 0.2 }} />
                    <div
                      className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                      style={{ borderColor: "var(--accent)", opacity: 0.55 }}
                    />
                  </div>
                  {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                    <span key={c} className={`pointer-events-none absolute h-5 w-5 ${c}`} style={{ borderColor: "var(--accent)" }} aria-hidden />
                  ))}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      color: "#f2f2f2",
                    }}
                  >
                    <span>{era.location}</span>
                    <span style={{ color: "var(--accent-2)" }}>{era.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- row 2: the dial --- */}
            <div className="panel mt-5">
              <div className="panel-head">
                <span>Chronometric Dial</span>
                <span className="hidden sm:inline">Drag to spin · release to jump · ◄ ► keys</span>
              </div>

              <div className="p-6 md:p-8">
                {/* group chips */}
                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="mono-label mr-2 hidden md:inline">Eras</span>
                  {groupFirst.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className="chip"
                      data-active={era.group === g.id}
                      onClick={() => jumpTo(g.index)}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                {/* slider */}
                <div className="relative pb-10">
                  <input
                    type="range"
                    className="timeline"
                    min={0}
                    max={ERAS.length - 1}
                    step={1}
                    value={sliderVal}
                    aria-label="Timeline scrubber"
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setSliderVal(v);
                      pendingRef.current = v;
                      animateYear(ERAS[v].year, 320);
                    }}
                    onPointerUp={() => {
                      if (pendingRef.current !== null) {
                        const p = pendingRef.current;
                        pendingRef.current = null;
                        jumpTo(p);
                      }
                    }}
                    onKeyUp={(e) => {
                      if (
                        ["ArrowLeft", "ArrowRight", "Home", "End", "Enter", " "].includes(e.key) &&
                        pendingRef.current !== null
                      ) {
                        const p = pendingRef.current;
                        pendingRef.current = null;
                        jumpTo(p);
                      }
                    }}
                  />
                  {/* stops */}
                  <div className="pointer-events-none absolute inset-x-0 top-[26px] h-6">
                    <div className="relative mx-[9px] h-full">
                      {ERAS.map((e, i) => (
                        <button
                          key={e.id}
                          type="button"
                          className="dial-stop pointer-events-auto"
                          data-active={i === sliderVal}
                          style={{ left: `${(i / (ERAS.length - 1)) * 100}%` }}
                          title={`${e.yearLabel} — ${e.name}`}
                          aria-label={`Jump to ${e.yearLabel}, ${e.name}`}
                          onClick={() => jumpTo(i)}
                        >
                          <i />
                          <span>{e.short}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* controls */}
                <div className="mt-2 flex flex-wrap items-center gap-3 border-t hairline pt-6">
                  <button className="btn" onClick={() => jumpTo(idx - 1)} disabled={warping || idx === 0}>
                    ← Earlier
                  </button>
                  <button
                    className="btn btn-primary flex-1 sm:flex-none"
                    onClick={() => jumpTo(sliderVal)}
                    disabled={warping || sliderVal === idx}
                  >
                    {warping
                      ? "Displacing…"
                      : sliderVal === idx
                      ? "Coordinate locked"
                      : `Jump to ${previewEra.yearLabel} →`}
                  </button>
                  <button className="btn" onClick={() => jumpTo(idx + 1)} disabled={warping || idx === ERAS.length - 1}>
                    Later →
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      let r = idx;
                      while (r === idx) r = Math.floor(Math.random() * ERAS.length);
                      jumpTo(r);
                    }}
                    disabled={warping}
                  >
                    ⚄ Random
                  </button>
                </div>
              </div>
            </div>

            {/* --- row 3: status strip --- */}
            <div className="panel mt-5 grid gap-0 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.4fr)]">
              {[
                ["Operator", "GUEST-001 · temporal tourist", null],
                ["Anchor year", "2026 CE", `${displacement.toLocaleString("en-US")} yrs ${direction.toLowerCase()}`],
                ["Jumps logged", String(logs.length - 1), null],
              ].map(([k, v, extra]) => (
                <div key={k as string} className="border-b hairline px-6 py-4 md:border-b-0 md:border-r">
                  <p className="mono-label mb-1.5">{k as string}</p>
                  <p className="text-base" style={{ color: "var(--ink)" }}>{v as string}</p>
                  {extra && (
                    <p className="mt-0.5 text-base" style={{ color: "var(--accent)" }}>{extra as string}</p>
                  )}
                </div>
              ))}
              <div className="px-6 py-4">
                <p className="mono-label mb-1.5">Jump log</p>
                <ul className="flex flex-col gap-1" style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                  {logs.map((l) => (
                    <li key={l.id} className="flex gap-3 truncate">
                      <span style={{ color: "var(--muted)" }}>{l.time}</span>
                      <span className="truncate" style={{ color: "var(--ink)" }}>{l.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================ marquee ================================ */}
        <div className="marquee-mask relative z-10 mt-6 overflow-hidden border-y hairline py-4" aria-hidden>
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-baseline">
                {ERAS.map((e) => (
                  <span key={`${dup}-${e.id}`} className="flex items-baseline whitespace-nowrap">
                    <span className="px-5 font-display text-xl md:text-2xl" style={{ color: "var(--ink)" }}>
                      {e.yearLabel}
                    </span>
                    <span className="mono-label">{e.name}</span>
                    <span className="px-5" style={{ color: "var(--accent)" }}>✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============================= arrival report ============================= */}
        <section id="arrival" ref={arrivalRef} className="relative z-10 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28">
            <div key={era.id} className="era-in grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
              <div className="self-start lg:sticky lg:top-24">
                <p className="mono-label mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                  Arrival report · {era.yearLabel} · {era.confidence}
                </p>
                <h2
                  className="font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.05]"
                  style={{ color: "var(--ink)" }}
                >
                  <Scramble text={era.name} reduced={reduced} />
                </h2>
                <p className="mt-5 max-w-lg text-xl italic leading-snug" style={{ color: "var(--accent)" }}>
                  {era.tagline}
                </p>
                <p
                  className="mt-7 max-w-xl text-lg leading-[1.75] md:text-xl"
                  style={{ color: "color-mix(in srgb, var(--ink) 84%, transparent)" }}
                >
                  {era.description}
                </p>

                {era.memorial && (
                  <div
                    className="mt-10 flex items-center gap-4 border p-5"
                    style={{ borderColor: "rgba(190,30,20,0.5)", background: "color-mix(in srgb, rgba(120,18,12,0.22), var(--bg))" }}
                  >
                    {/* regime flag, shown under a red prohibition */}
                    <div className="relative shrink-0" aria-label="Flag of the Nazi regime, displayed for historical study">
                      <img
                        src="https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Germany%20(1933%E2%80%931935).svg?width=200"
                        alt="Flag of Germany 1933–1935 (Nazi regime), shown with a prohibition mark for historical study"
                        className="h-12 w-16 object-cover grayscale contrast-125 brightness-90"
                        loading="lazy"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                          <circle cx="12" cy="12" r="11" stroke="#e02020" strokeWidth="2.4" />
                          <path d="M4.6 19.4 19.4 4.6" stroke="#e02020" strokeWidth="2.6" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "#e0685a" }}>Memorial · historical study</p>
                      <p
                        style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: 1.7, color: "color-mix(in srgb, var(--ink) 80%, transparent)" }}
                      >
                        The symbols of this regime are shown only to teach what they meant
                        — never to celebrate them. Its ideology and its flag caused the
                        deaths of tens of millions. This is the record, not the endorsement.
                      </p>
                    </div>
                  </div>
                )}

                {era.figure && (
                  <div
                    className="mt-10 border-l-2 p-5"
                    style={{
                      borderColor: "var(--accent)",
                      background: "color-mix(in srgb, var(--bg-2) 55%, transparent)",
                    }}
                  >
                    <p className="mono-label mb-3">Key figure</p>
                    <p className="font-display text-2xl leading-tight md:text-3xl" style={{ color: "var(--accent)" }}>
                      {era.figure.name}
                    </p>
                    <p
                      className="mt-1.5"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}
                    >
                      {era.figure.role}
                    </p>
                    <p
                      className="mt-4 text-lg leading-relaxed"
                      style={{ color: "color-mix(in srgb, var(--ink) 82%, transparent)" }}
                    >
                      {era.figure.note}
                    </p>
                  </div>
                )}

                <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 border-t hairline pt-9 sm:grid-cols-2">
                  {era.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="mono-label mb-1.5">{s.label}</dt>
                      <dd className="text-lg" style={{ color: "var(--ink)" }}>{s.value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="mono-label mb-1.5">Displacement</dt>
                    <dd className="text-lg" style={{ color: "var(--accent)" }}>
                      {displacement.toLocaleString("en-US")} years {direction.toLowerCase()}
                    </dd>
                  </div>
                </dl>

                {/* confidence meter — future eras only */}
                {era.group === "future" && (
                  <div className="mt-10 border-t hairline pt-8">
                    <p className="mono-label mb-4">Signal confidence</p>
                    <div className="flex items-center gap-4">
                      <div
                        className="h-2.5 flex-1 overflow-hidden rounded-full"
                        style={{ background: "color-mix(in srgb, var(--muted) 28%, transparent)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${era.id === "near" ? 88 : era.id === "mid" ? 54 : 12}%`,
                            background: `linear-gradient(90deg, var(--accent), var(--accent-2))`,
                          }}
                        />
                      </div>
                      <span
                        style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", color: "var(--accent)" }}
                      >
                        {era.id === "near" ? "88%" : era.id === "mid" ? "54%" : "12%"}
                      </span>
                    </div>
                    <p
                      className="mt-3 leading-relaxed"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)", lineHeight: 1.8 }}
                    >
                      {era.id === "near"
                        ? "Near-term projection based on current ITER timelines, NASA Artemis scheduling, IPCC AR7 climate models, and UN population forecasts. Technology trajectories are extrapolated from 2020s baselines."
                        : era.id === "mid"
                        ? "Mid-range extrapolation. O'Neill cylinder physics are sound; sociological and economic trajectories are speculative. Confidence degrades significantly beyond 2080."
                        : "Deep speculation. The physics of Dyson swarms and habitat rings is well-established; everything else — governance, biology, culture — is narrative, not forecast. Handle with wonder, not certainty."}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-7">
                <figure className="panel overflow-hidden">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <EraVisual era={era} />
                  </div>
                  <figcaption
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t hairline px-4 py-3"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}
                  >
                    <span>{era.location}</span>
                    <span>{era.signal}</span>
                  </figcaption>
                </figure>

                <p className="mono-label mt-2">Field notes</p>
                {era.facts.map((f, i) => (
                  <div
                    key={f}
                    className="postcard panel flex items-start gap-4 p-5"
                    style={
                      {
                        "--rot": ["-1.6deg", "1.4deg", "-0.9deg"][i % 3],
                        marginLeft: i === 1 ? "clamp(0px, 3vw, 34px)" : i === 2 ? "clamp(0px, 1.5vw, 16px)" : 0,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center border font-display text-[12px]"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="pt-1 leading-relaxed"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "color-mix(in srgb, var(--ink) 88%, transparent)" }}
                    >
                      {f}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================= field manual ============================= */}
        <section id="manual" className="relative z-10 scroll-mt-20 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28">
            <div key={`fm-${era.id}`} className="era-in">
              <Reveal>
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="mono-label mb-5 flex items-center gap-3">
                      <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                      Traveler's field manual · {era.yearLabel}
                    </p>
                    <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-tight" style={{ color: "var(--ink)" }}>
                      How to survive the visit
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="mono-label">Threat</span>
                    <span className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className="inline-block h-2.5 w-2.5 rounded-full border transition-colors duration-500"
                          style={{
                            background: n <= era.danger ? "var(--accent)" : "transparent",
                            borderColor: n <= era.danger ? "var(--accent)" : "color-mix(in srgb, var(--muted) 55%, transparent)",
                          }}
                        />
                      ))}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)" }}>
                      {DANGER_LABELS[era.danger]}
                    </span>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-5 md:grid-cols-3">
                {[
                  { icon: "▲", label: "What to pack", text: SURVIVAL[era.id]?.pack },
                  { icon: "✕", label: "What to avoid", text: SURVIVAL[era.id]?.avoid },
                  { icon: "◈", label: "How to blend in", text: SURVIVAL[era.id]?.blend },
                ].map((card, i) => (
                  <Reveal key={card.label} delay={i * 110}>
                    <div className="panel h-full p-6">
                      <div
                        className="mb-5 flex h-11 w-11 items-center justify-center border text-lg"
                        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                        aria-hidden
                      >
                        {card.icon}
                      </div>
                      <p className="mono-label mb-3">{card.label}</p>
                      <p className="text-lg leading-relaxed" style={{ color: "var(--ink)" }}>
                        {card.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================== on this year ============================== */}
        <section id="events" className="relative z-10 scroll-mt-20 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28">
            <div key={`ev-${era.id}`}>
              <Reveal>
                <p className="mono-label mb-5 flex items-center gap-3">
                  <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                  Transmission log · verified records
                </p>
                <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-tight" style={{ color: "var(--ink)" }}>
                  On this year — <span style={{ color: "var(--accent)" }}>{era.yearLabel}</span>
                </h3>
              </Reveal>

              <div className="mt-12 border-t hairline">
                {era.events.map((ev, i) => (
                  <Reveal key={ev.title} delay={i * 120}>
                    <article className="event-row grid gap-x-8 gap-y-3 border-b hairline px-2 py-8 md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.5fr)] md:px-4">
                      <span className="font-display text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="font-display text-2xl leading-snug" style={{ color: "var(--ink)" }}>
                        {ev.title}
                      </h4>
                      <p className="text-lg leading-[1.75]" style={{ color: "color-mix(in srgb, var(--ink) 72%, transparent)" }}>
                        {ev.detail}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =============================== overheard =============================== */}
        <section className="relative z-10 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-24">
            <div key={`q-${era.id}`} className="era-in grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-14">
              <span
                className="font-display leading-none"
                style={{ fontSize: "clamp(5rem, 12vw, 9rem)", color: "var(--accent)", opacity: 0.6 }}
                aria-hidden
              >
                &ldquo;
              </span>
              <div>
                <p className="mono-label mb-6">Overheard on arrival · {era.yearLabel}</p>
                <blockquote
                  className="font-display leading-[1.15]"
                  style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.2rem)", color: "var(--ink)" }}
                >
                  {QUOTES[era.id]?.line}
                </blockquote>
                <p
                  className="mt-6 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}
                >
                  <span className="inline-block h-px w-8" style={{ background: "var(--accent)" }} />
                  {QUOTES[era.id]?.who}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =============================== chronicle =============================== */}
        <section id="chronicle" className="relative z-10 scroll-mt-20 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <p className="mono-label mb-5 flex items-center gap-3">
                    <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                    The whole line · 3000 BCE → 3123 CE
                  </p>
                  <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-tight" style={{ color: "var(--ink)" }}>
                    A chronicle of everything
                  </h3>
                </div>
                <p
                  className="max-w-sm"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)", lineHeight: 1.9 }}
                >
                  Five millennia on a single rail. Tap any node to displace there — the
                  one glowing is where you're standing now.
                </p>
              </div>
            </Reveal>

            <div className="relative">
              {/* spine */}
              <div
                className="absolute bottom-0 left-[18px] top-0 w-px md:left-1/2"
                style={{ background: "color-mix(in srgb, var(--muted) 30%, transparent)" }}
                aria-hidden
              />
              <ol className="flex flex-col gap-2">
                {ERAS.map((e, i) => {
                  const active = i === idx;
                  const left = i % 2 === 0;
                  return (
                    <Reveal key={e.id} delay={(i % 6) * 40}>
                      <li className="relative pl-12 md:grid md:grid-cols-2 md:gap-0 md:pl-0">
                        {/* node */}
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          aria-label={`Jump to ${e.yearLabel} — ${e.name}`}
                          className="absolute left-[11px] top-4 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 transition-all duration-300 hover:scale-125 md:left-1/2"
                          style={{
                            borderColor: active ? "var(--accent)" : "color-mix(in srgb, var(--muted) 60%, transparent)",
                            background: active ? "var(--accent)" : "var(--bg)",
                            boxShadow: active ? "0 0 0 5px color-mix(in srgb, var(--accent) 22%, transparent)" : "none",
                          }}
                        />
                        {/* card */}
                        <button
                          type="button"
                          onClick={() => jumpTo(i)}
                          className={`group event-row block w-full text-left md:col-span-1 ${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
                        >
                          <div
                            className="border p-4 transition-colors duration-300"
                            style={{
                              borderColor: active ? "var(--accent)" : "color-mix(in srgb, var(--muted) 24%, transparent)",
                              background: active ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                            }}
                          >
                            <div className={`flex items-baseline gap-3 ${left ? "md:justify-end" : ""}`}>
                              <span className="font-display text-2xl md:text-3xl" style={{ color: active ? "var(--accent)" : "var(--ink)" }}>
                                {e.yearLabel}
                              </span>
                              <span className="mono-label">{GROUPS.find((g) => g.id === e.group)?.label}</span>
                            </div>
                            <p className="mt-1 text-lg" style={{ color: "var(--ink)" }}>{e.name}</p>
                            <p
                              className="mt-1 leading-relaxed"
                              style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)" }}
                            >
                              {e.events[0].title}
                            </p>
                            {e.group === "future" && (
                              <span
                                className="mt-2 inline-block border px-2 py-0.5"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "9px",
                                  letterSpacing: "0.2em",
                                  textTransform: "uppercase",
                                  borderColor: "var(--accent)",
                                  color: "var(--accent)",
                                  borderStyle: "dashed",
                                }}
                              >
                                {e.confidence}
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ============================== destinations ============================== */}
        <section id="destinations" className="relative z-10 scroll-mt-20 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 pt-20 md:px-8 md:pt-28">
            <Reveal>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <p className="mono-label mb-5 flex items-center gap-3">
                    <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                    Departures board · {ERAS.length} stops
                  </p>
                  <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-tight" style={{ color: "var(--ink)" }}>
                    Where will you land?
                  </h3>
                </div>
                <p
                  className="max-w-sm"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)", lineHeight: 1.9 }}
                >
                  One click per stop. The console repaints the present into your
                  destination — palette, type, history, atmosphere.
                </p>
              </div>
            </Reveal>
          </div>

          {GROUPS.map((g) => {
            const items = ERAS.map((e, i) => ({ e, i })).filter(({ e }) => e.group === g.id);
            if (!items.length) return null;
            return (
              <div key={g.id} className="mx-auto w-full max-w-[1380px] px-5 pb-14 md:px-8">
                <div className="mb-5 flex items-center gap-4">
                  <span className="mono-label whitespace-nowrap" style={{ color: "var(--accent)" }}>{g.label}</span>
                  <span className="h-px flex-1" style={{ background: "color-mix(in srgb, var(--muted) 26%, transparent)" }} />
                  <span className="mono-label">{items.length} stops</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map(({ e, i }) => (
                    <Reveal key={e.id} delay={(i % 4) * 70}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        className="dest-card group flex h-full w-full flex-col border p-3 text-left transition-colors duration-300"
                        style={{
                          borderColor: i === idx ? "var(--accent)" : "color-mix(in srgb, var(--muted) 28%, transparent)",
                          background: "color-mix(in srgb, var(--bg-2) 65%, transparent)",
                        }}
                        aria-label={`Jump to ${e.yearLabel} — ${e.name}`}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <EraVisual era={e} animate={false} />
                          {e.memorial && (
                            <span
                              className="absolute left-0 top-0 px-2 py-1"
                              style={{ background: "rgba(190,30,20,0.9)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase" }}
                            >
                              Memorial
                            </span>
                          )}
                          <span
                            className="absolute right-0 top-0 px-2 py-1"
                            style={{ background: "rgba(0,0,0,0.62)", color: e.memorial ? "#f0b0a8" : "#fff", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em" }}
                          >
                            {e.yearLabel}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2 pt-4">
                          <span
                            className="font-display text-xl"
                            style={{ color: i === idx ? "var(--accent)" : "var(--ink)" }}
                          >
                            {e.name}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                              i === idx ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                            style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
                          >
                            {i === idx ? "● Here" : "Jump →"}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <p className="mono-label truncate">{e.figure ? e.figure.name : e.location}</p>
                          <span className="flex shrink-0 gap-1" aria-label={`Threat level ${e.danger} of 5`}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <span
                                key={n}
                                className="inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: n <= e.danger ? (e.memorial ? "#c0392e" : "var(--accent)") : "color-mix(in srgb, var(--muted) 40%, transparent)" }}
                              />
                            ))}
                          </span>
                        </div>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ================================ passport ================================ */}
        <section id="passport" className="relative z-10 scroll-mt-20 border-t hairline">
          <div className="mx-auto w-full max-w-[1380px] px-5 py-20 md:px-8 md:py-28">
            <Reveal>
              <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <div>
                  <p className="mono-label mb-5 flex items-center gap-3">
                    <span className="inline-block h-px w-10" style={{ background: "var(--accent)" }} />
                    Traveler's passport · Chronological Transit Authority
                  </p>
                  <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-tight" style={{ color: "var(--ink)" }}>
                    Every era leaves a mark
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="border px-4 py-2"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.16em", color: "var(--accent)", borderColor: "var(--accent)" }}
                  >
                    {visited.length} / {ERAS.length} STAMPED
                  </span>
                  <button
                    className="btn"
                    onClick={() => {
                      setVisited([]);
                      try {
                        localStorage.removeItem("tempora-visited");
                      } catch {
                        /* ignore */
                      }
                      setToast("Passport reset · all stamps cleared");
                      if (toastTimer.current) window.clearTimeout(toastTimer.current);
                      toastTimer.current = window.setTimeout(() => setToast(null), 2600);
                    }}
                  >
                    Reset passport
                  </button>
                </div>
              </div>
            </Reveal>

            {/* progress rail */}
            <div
              className="mb-10 h-1.5 w-full overflow-hidden"
              style={{ background: "color-mix(in srgb, var(--muted) 24%, transparent)" }}
            >
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${(visited.length / ERAS.length) * 100}%`,
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {ERAS.map((e, i) => {
                const stamped = visited.includes(e.id);
                const rot = (i % 5) * 2.4 - 4.8;
                return (
                  <Reveal key={e.id} delay={(i % 6) * 50}>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      title={stamped ? `Return to ${e.yearLabel}` : `Travel to ${e.yearLabel} to earn this stamp`}
                      className="stamp group flex aspect-[4/5] w-full flex-col items-center justify-center gap-1.5 border-2 p-3 text-center transition-all duration-300 hover:-translate-y-1"
                      style={{
                        borderColor: stamped ? e.palette.accent : "color-mix(in srgb, var(--muted) 30%, transparent)",
                        borderStyle: stamped ? "double" : "dashed",
                        background: stamped ? `color-mix(in srgb, ${e.palette.bg2} 70%, transparent)` : "transparent",
                        transform: stamped ? `rotate(${rot}deg)` : undefined,
                        opacity: stamped ? 1 : 0.55,
                      }}
                      aria-label={stamped ? `Return to ${e.yearLabel}, ${e.name}` : `Travel to ${e.yearLabel}, ${e.name}`}
                    >
                      <svg viewBox="0 0 64 64" width="26" height="26" style={{ color: stamped ? e.palette.accent : "var(--muted)" }} aria-hidden>
                        {/* inline small emblem via text fallback */}
                        <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray={stamped ? "0" : "3 4"} />
                        <text
                          x="32"
                          y="40"
                          textAnchor="middle"
                          fontSize="19"
                          fontFamily="var(--font-mono)"
                          fill="currentColor"
                        >
                          {stamped ? "✓" : "?"}
                        </text>
                      </svg>
                      <span
                        className="font-display text-xl leading-none md:text-2xl"
                        style={{ color: stamped ? e.palette.accent : "var(--muted)" }}
                      >
                        {e.yearLabel}
                      </span>
                      <span
                        className="leading-tight"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: stamped ? "var(--ink)" : "var(--muted)" }}
                      >
                        {e.name}
                      </span>
                      {stamped && (
                        <span
                          style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: e.palette.accent }}
                        >
                          C.T.A. · verified
                        </span>
                      )}
                    </button>
                  </Reveal>
                );
              })}
            </div>

            <p
              className="mt-8"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)", lineHeight: 1.9 }}
            >
              Stamps are recorded locally on this machine and survive timeline resets.
              Collect all {ERAS.length} to prove you've been everywhere — including home.
            </p>
          </div>
        </section>

        {/* toast */}
        {toast && (
          <div
            key={toast}
            className="toast-in fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 border px-5 py-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink)",
              background: "color-mix(in srgb, var(--bg-2) 92%, transparent)",
              borderColor: "var(--accent)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            }}
            role="status"
          >
            {toast}
          </div>
        )}

        {/* ================================= footer ================================= */}
        <footer className="relative z-10 border-t hairline">
          <div className="mx-auto grid w-full max-w-[1380px] gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
            <div>
              <div className="flex items-center gap-3" style={{ color: "var(--accent)" }}>
                <BrandGlyph />
                <span className="font-display text-xl tracking-[0.2em]" style={{ color: "var(--ink)" }}>TEMPORA</span>
              </div>
              <p
                className="mt-4 max-w-xs leading-relaxed"
                style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)" }}
              >
                Chronological Transit Authority. Scheduled service to {ERAS.length} verified
                coordinates between 3000 BCE and 3123 CE.
              </p>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: 2.2, color: "var(--muted)" }}>
              <p className="mono-label mb-3">Fine print</p>
              <p>· Not liable for paradoxes, doppelgängers or missed birthdays.</p>
              <p>· Butterfly contact strictly prohibited (see §1254-B).</p>
              <p>· Return tickets honoured across all timelines, except one.</p>
            </div>
            <div className="md:text-right">
              <button className="btn" onClick={() => jumpTo(BOOT_INDEX)} disabled={warping || idx === BOOT_INDEX}>
                Re-calibrate to 1965
              </button>
              <p className="mono-label mt-6">Permit #T-88 · 1254 · 1965 · © MMXXVI</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
