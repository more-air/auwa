"use client";

import { useEffect, useRef } from "react";

/*
  Canvas-based cursor particle trail. Drop inside any relatively-positioned
  container; the component watches its parent element for mousemove and
  emits soft warm-light particles at the cursor position. Particles drift
  upward and fade out, additively composited so overlapping particles
  read as gathered light rather than stacked discs.

  Skipped on touch devices (no hover) and under prefers-reduced-motion.

  Tuning props let each placement pick density/brightness/scale that suits
  its surface. Defaults match the home page "The character." card.
*/

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
};

type Props = {
  /** Min particle radius in px. Default 4. */
  sizeMin?: number;
  /** Max particle radius in px. Default 12. */
  sizeMax?: number;
  /** Halo extends this multiple past size for the visible glow. Default 1.7. */
  haloMultiplier?: number;
  /** Peak alpha (eased squared over lifetime). Default 0.85. */
  maxAlpha?: number;
  /** Minimum ms between spawns. Default 18 (~55/s). Lower = denser. */
  spawnIntervalMs?: number;
  /** Cap on live particles. Default 110. */
  maxParticles?: number;
  /** Min particle lifetime ms. Default 1000. */
  lifeMin?: number;
  /** Max particle lifetime ms. Default 1600. */
  lifeMax?: number;
  /** Extra className passed to the canvas element. */
  className?: string;
};

export function CursorTrail({
  sizeMin = 4,
  sizeMax = 12,
  haloMultiplier = 1.7,
  maxAlpha = 0.85,
  spawnIntervalMs = 18,
  maxParticles = 110,
  lifeMin = 1000,
  lifeMax = 1600,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const target = canvas.parentElement as HTMLElement | null;
    if (!target) return;

    // No hover on touch devices → no trail. Reduced-motion users get
    // the calm version of the surface.
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = target.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(target);

    const particles: Particle[] = [];
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;
    let lastSpawnTime = 0;
    let lastMoveTime = 0;
    let rafId = 0;

    // Spawn only while the cursor is actually moving. A short grace
    // period (120ms) keeps brief micro-stalls from breaking the trail,
    // but a held cursor stops emitting — otherwise additive particles
    // pile up at one point and read as a burn-in rather than light.
    const MOVE_GRACE_MS = 120;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      // Mousemove fires even on cursor-coast-to-rest. Filter to actual
      // position changes so a held cursor doesn't keep refreshing
      // lastMoveTime via redundant events.
      if (nx === pointerX && ny === pointerY) return;
      pointerX = nx;
      pointerY = ny;
      pointerActive = true;
      lastMoveTime = performance.now();
    };
    const onLeave = () => { pointerActive = false; };
    target.addEventListener("mousemove", onMove);
    target.addEventListener("mouseleave", onLeave);

    const sizeRange = sizeMax - sizeMin;
    const lifeRange = lifeMax - lifeMin;

    const spawn = (now: number) => {
      if (!pointerActive) return;
      // Stationary cursor → stop emitting. Existing particles fade
      // out, the trail dissolves cleanly. Prevents additive burn-in.
      if (now - lastMoveTime > MOVE_GRACE_MS) return;
      if (now - lastSpawnTime < spawnIntervalMs) return;
      lastSpawnTime = now;
      if (particles.length >= maxParticles) particles.shift();
      // Mostly pairs, occasional triples for variety.
      const r = Math.random();
      const count = r < 0.2 ? 3 : r < 0.7 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: pointerX + (Math.random() - 0.5) * 10,
          y: pointerY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.4,
          // Slight upward drift — light rises.
          vy: -0.2 - Math.random() * 0.4,
          age: 0,
          life: lifeMin + Math.random() * lifeRange,
          size: sizeMin + Math.random() * sizeRange,
        });
      }
    };

    let lastFrame = performance.now();
    const tick = (now: number) => {
      const dt = now - lastFrame;
      lastFrame = now;

      spawn(now);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt / p.life;
        if (p.age >= 1) {
          particles.splice(i, 1);
          continue;
        }
        // dt/16 normalises motion to 60fps regardless of monitor refresh.
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
      }

      const rect = target.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      // Additive composite so overlapping particles read as gathered
      // light, not stacked discs.
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        // Ease-out² fade: bright early, soft long tail.
        const alpha = (1 - p.age) * (1 - p.age) * maxAlpha;
        const haloRadius = p.size * haloMultiplier;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloRadius);
        g.addColorStop(0, `rgba(255, 248, 235, ${alpha})`);
        g.addColorStop(0.35, `rgba(252, 240, 215, ${alpha * 0.6})`);
        g.addColorStop(0.7, `rgba(245, 225, 195, ${alpha * 0.25})`);
        g.addColorStop(1, "rgba(245, 225, 195, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      target.removeEventListener("mousemove", onMove);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, [sizeMin, sizeMax, haloMultiplier, maxAlpha, spawnIntervalMs, maxParticles, lifeMin, lifeMax]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // inherit the parent's border-radius. <canvas>, like <video>, is
      // often promoted to its own GPU compositor layer that doesn't
      // always inherit the parent's overflow clip on Safari — particularly
      // inside an isolation:isolate stacking context. Inheriting the
      // radius applies the clip to the canvas's own layer.
      style={{ borderRadius: "inherit" }}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
