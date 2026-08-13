import { useEffect, useRef } from "react";

interface ParticlesProps {
  color: string;
  drift: "up" | "down";
  reduced: boolean;
  count?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Ambient dust / embers / spores field. Color and drift follow the active era. */
export function Particles({ color, drift, reduced, count = 64 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorRef = useRef<[number, number, number]>(hexToRgb(color));
  const driftRef = useRef(drift);

  useEffect(() => {
    colorRef.current = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    driftRef.current = drift;
  }, [drift]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.2,
      speed: 0.00018 + Math.random() * 0.0005,
      phase: Math.random() * Math.PI * 2,
      wobble: 0.0001 + Math.random() * 0.0002,
      alpha: 0.12 + Math.random() * 0.4,
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = colorRef.current;
      const dir = driftRef.current === "up" ? -1 : 1;
      const t = performance.now();

      for (const p of particles) {
        p.y += p.speed * dir;
        p.x += Math.sin(t * p.wobble + p.phase) * 0.0004;
        if (dir < 0 && p.y < -0.02) p.y = 1.02;
        if (dir > 0 && p.y > 1.02) p.y = -0.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;

        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
    />
  );
}
