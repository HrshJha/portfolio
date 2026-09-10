'use client';

/**
 * ParticleTrail — Effect B.
 *
 * Canvas-based particle emitter. Glyphs are drawn as Canvas 2D Path2D
 * objects (leaf, teardrop/petal, bird) — no image loading, no load race,
 * crisp at any devicePixelRatio. A particle spawns every ~18px of pointer
 * travel, drifts upward + sideways, fades over ~1200ms with easeOutQuad.
 *
 * The render loop is completely decoupled from React — no setState, no
 * re-renders. Only the initial subscribe call ties it to React lifecycle.
 */

import { useEffect, useRef } from 'react';
import { useCursorField } from './CursorFieldProvider';
import type { Particle } from './types';

// ── Glyph path factories ───────────────────────────────────────────────
// Each factory returns a Path2D centered at (0,0), fitting roughly in
// a [-0.5, 0.5] unit square, scaled at draw time by `size`.

function makeLeafPath(): Path2D {
  const p = new Path2D();
  // Elongated organic leaf shape
  p.moveTo(0, -0.5);
  p.bezierCurveTo(0.28, -0.28, 0.28, 0.1, 0, 0.5);
  p.bezierCurveTo(-0.28, 0.1, -0.28, -0.28, 0, -0.5);
  return p;
}

function makePetalPath(): Path2D {
  const p = new Path2D();
  // Rounded teardrop / petal
  p.moveTo(0, -0.5);
  p.bezierCurveTo(0.32, -0.22, 0.32, 0.32, 0, 0.45);
  p.bezierCurveTo(-0.32, 0.32, -0.32, -0.22, 0, -0.5);
  return p;
}

function makeBirdPath(): Path2D {
  const p = new Path2D();
  // Stylised flying bird — two arcing wing strokes
  p.moveTo(-0.5, 0);
  p.quadraticCurveTo(-0.25, -0.22, 0, 0);
  p.quadraticCurveTo(0.25, -0.22, 0.5, 0);
  return p;
}

// ── Constants ──────────────────────────────────────────────────────────
const LIFETIME_MS = 1200;
const SPAWN_MIN_DIST = 18; // px of pointer travel between spawns
const MAX_PARTICLES = 16;
// sage-green matching portfolio dark palette
const GLYPH_COLOR = '#B8CCA8';

// ── Component ──────────────────────────────────────────────────────────

export function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef({ x: 0, y: 0 });
  const pathsRef = useRef<Path2D[]>([]);
  const { subscribe } = useCursorField();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Build glyph paths once (safe — Path2D doesn't depend on canvas size)
    pathsRef.current = [makeLeafPath(), makePetalPath(), makeBirdPath()];

    // ── Canvas resize ────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Emitter subscription ─────────────────────────────────────────
    const unsubscribe = subscribe((x, y) => {
      const dx = x - lastSpawnRef.current.x;
      const dy = y - lastSpawnRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > SPAWN_MIN_DIST) {
        const speed = Math.min(dist * 0.012, 0.6);
        const particle: Particle = {
          x,
          y,
          // drift: mostly upward, slight bias away from movement direction
          vx: (Math.random() - 0.5) * 0.35 - (dx / dist) * speed * 0.4,
          vy: -0.25 - Math.random() * 0.3 - (dy / dist) * speed * 0.3,
          rotation: (Math.random() - 0.5) * 40, // ±20°
          spawnedAt: performance.now(),
          glyphIndex: Math.floor(Math.random() * pathsRef.current.length),
          size: 13 + Math.random() * 9, // 13–22px
        };
        particlesRef.current.push(particle);
        if (particlesRef.current.length > MAX_PARTICLES) {
          particlesRef.current.shift(); // prune oldest
        }
        lastSpawnRef.current = { x, y };
      }
    });

    // ── Render loop ──────────────────────────────────────────────────
    let raf = 0;

    const render = () => {
      const now = performance.now();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Prune dead particles
      particlesRef.current = particlesRef.current.filter(
        (p) => now - p.spawnedAt < LIFETIME_MS
      );

      for (const p of particlesRef.current) {
        const t = (now - p.spawnedAt) / LIFETIME_MS; // 0 → 1
        const eased = 1 - (1 - t) * (1 - t); // easeOutQuad
        const opacity = Math.max(1 - eased, 0);
        const elapsed = now - p.spawnedAt;

        // Physics: constant velocity drift (no gravity needed for floaty feel)
        const px = p.x + p.vx * elapsed * 0.055;
        const py = p.y + p.vy * elapsed * 0.055;

        const path = pathsRef.current[p.glyphIndex];
        if (!path) continue;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = GLYPH_COLOR;
        ctx.strokeStyle = GLYPH_COLOR;
        ctx.lineWidth = p.size * 0.08;

        ctx.translate(px, py);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.size, p.size);

        // Bird is a stroke glyph; leaf + petal are filled
        if (p.glyphIndex === 2) {
          ctx.stroke(path);
        } else {
          ctx.fill(path);
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      ro.disconnect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [subscribe]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
