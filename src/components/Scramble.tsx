import { useEffect, useRef, useState } from "react";

const GLYPHS = "▓▒░<>/\\*+=#%&@ΞΔΦ§0123456789";

interface ScrambleProps {
  text: string;
  className?: string;
  reduced: boolean;
  duration?: number;
}

/** Decodes text through temporal static whenever `text` changes. */
export function Scramble({ text, className = "", reduced, duration = 850 }: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (reduced) {
      setDisplay(text);
      return;
    }
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const resolved = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (i < resolved || c === " ") out += c;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) frameRef.current = requestAnimationFrame(step);
      else setDisplay(text);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, reduced, duration]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
