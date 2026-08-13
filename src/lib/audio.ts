/**
 * Chrono-audio engine — synthesized entirely with the Web Audio API, no assets.
 * - warp(): a directional whoosh (pitch rises travelling futureward, falls retrograde)
 * - ping(): a soft two-note arrival chime
 * - stamp(): a rubber-stamp "thunk" for new passport stamps
 */
class ChronoAudio {
  private ctx: AudioContext | null = null;
  enabled = false;

  setEnabled(v: boolean) {
    this.enabled = v;
    if (v) this.ensure();
  }

  private ensure(): AudioContext | null {
    if (!this.ctx) {
      try {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AC();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** dir: +1 futureward (rising), -1 retrograde (falling) */
  warp(dir: number) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const dur = 1.15;

    // filtered noise sweep
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(dir > 0 ? 260 : 2200, t);
    bp.frequency.exponentialRampToValueAtTime(dir > 0 ? 2400 : 240, t + dur);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.16, t + 0.09);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    noise.connect(bp).connect(ng).connect(ctx.destination);
    noise.start(t);
    noise.stop(t + dur);

    // glissando oscillator
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(dir > 0 ? 110 : 660, t);
    o.frequency.exponentialRampToValueAtTime(dir > 0 ? 820 : 82, t + dur * 0.8);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.05, t + 0.05);
    og.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.8);
    o.connect(og).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }

  ping() {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    [659, 988].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      const g = ctx.createGain();
      const start = t + i * 0.09;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.07, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
      o.connect(g).connect(ctx.destination);
      o.start(start);
      o.stop(start + 0.55);
    });
  }

  stamp() {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(180, t);
    o.frequency.exponentialRampToValueAtTime(60, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.14, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.2);
  }
}

export const chronoAudio = new ChronoAudio();
