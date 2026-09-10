"use client";

import { useEffect, useRef } from "react";

type Motif = {
  x: number;
  y: number;
  size: number;
  type: number;
  rotation: number;
  seed: number;
  tone: number;
};

type Point = { x: number; y: number };

const CELL_SIZE = 19;
const REVEAL_RADIUS = 310;
const REVEAL_SOFTNESS = 210;
const MOTIF_COLORS = [
  [132, 255, 31],
  [183, 239, 51],
  [255, 178, 61],
  [224, 222, 145],
  [103, 218, 118],
  [245, 136, 74],
] as const;

function seeded(value: number) {
  const x = Math.sin(value * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function drawPixel(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(size)), Math.max(1, Math.round(size)));
}

function drawMotif(
  ctx: CanvasRenderingContext2D,
  motif: Motif,
  influence: number,
  dpr: number,
) {
  const baseAlpha = 0.07 + (motif.seed % 0.12);
  const alpha = baseAlpha + influence * (0.35 + (motif.seed % 0.28));
  const color = MOTIF_COLORS[motif.tone];
  const neutral = [74, 94, 52];
  const tint = Math.min(1, influence * 1.15);
  const r = Math.round(mix(neutral[0], color[0], tint));
  const g = Math.round(mix(neutral[1], color[1], tint));
  const b = Math.round(mix(neutral[2], color[2], tint));
  const fill = `rgba(${r}, ${g}, ${b}, ${Math.min(0.78, alpha)})`;
  const pixel = Math.max(1, Math.round(motif.size * dpr));
  const unit = motif.size * dpr;
  const x = motif.x * dpr;
  const y = motif.y * dpr;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(motif.rotation);

  // Small, imperfect pixel-glyphs keep the field floral and handcrafted.
  if (motif.type === 0) {
    drawPixel(ctx, -unit * 0.5, -unit * 0.5, pixel, fill);
    drawPixel(ctx, unit * 0.7, -unit * 0.5, pixel, fill);
    drawPixel(ctx, -unit * 0.5, unit * 0.7, pixel, fill);
    drawPixel(ctx, unit * 0.7, unit * 0.7, pixel, fill);
    drawPixel(ctx, unit * 0.1, unit * 0.1, pixel, fill);
  } else if (motif.type === 1) {
    drawPixel(ctx, 0, -unit * 1.2, pixel, fill);
    drawPixel(ctx, -unit * 1.2, 0, pixel, fill);
    drawPixel(ctx, unit * 1.2, 0, pixel, fill);
    drawPixel(ctx, 0, unit * 1.2, pixel, fill);
    drawPixel(ctx, 0, 0, pixel, fill);
  } else if (motif.type === 2) {
    drawPixel(ctx, -unit * 0.7, -unit * 0.7, pixel, fill);
    drawPixel(ctx, unit * 0.7, -unit * 0.7, pixel, fill);
    drawPixel(ctx, -unit * 0.7, unit * 0.7, pixel, fill);
    drawPixel(ctx, unit * 0.7, unit * 0.7, pixel, fill);
    drawPixel(ctx, 0, 0, pixel, fill);
    drawPixel(ctx, -unit * 1.5, unit * 1.5, pixel, fill);
  } else if (motif.type === 3) {
    drawPixel(ctx, -unit * 0.8, -unit * 0.1, pixel, fill);
    drawPixel(ctx, 0, -unit * 0.8, pixel, fill);
    drawPixel(ctx, unit * 0.8, -unit * 0.1, pixel, fill);
    drawPixel(ctx, unit * 0.8, unit * 0.7, pixel, fill);
    drawPixel(ctx, unit * 1.6, unit * 1.1, pixel, fill);
  } else if (motif.type === 4) {
    drawPixel(ctx, -unit * 1.6, 0, pixel, fill);
    drawPixel(ctx, -unit * 0.8, -unit * 0.8, pixel, fill);
    drawPixel(ctx, 0, 0, pixel, fill);
    drawPixel(ctx, unit * 0.8, unit * 0.8, pixel, fill);
    drawPixel(ctx, unit * 1.6, unit * 0.8, pixel, fill);
  } else {
    drawPixel(ctx, -unit * 0.8, -unit * 0.8, pixel, fill);
    drawPixel(ctx, 0, -unit * 1.6, pixel, fill);
    drawPixel(ctx, unit * 0.8, -unit * 0.8, pixel, fill);
    drawPixel(ctx, 0, 0, pixel, fill);
    drawPixel(ctx, -unit * 0.8, unit * 0.8, pixel, fill);
    drawPixel(ctx, unit * 0.8, unit * 0.8, pixel, fill);
  }

  ctx.restore();
}

function createMotifs(width: number, height: number): Motif[] {
  const columns = Math.ceil(width / CELL_SIZE) + 2;
  const rows = Math.ceil(height / CELL_SIZE) + 2;
  const motifs: Motif[] = [];

  for (let row = -1; row < rows; row += 1) {
    for (let column = -1; column < columns; column += 1) {
      const seed = seeded(row * 97.37 + column * 31.19 + 4.7);
      const detail = seeded(row * 11.17 + column * 43.71 + 8.4);
      if (detail < 0.08) continue;

      const shape = seeded(seed * 71.3 + detail * 19.1);
      const type = shape < 0.34
        ? 0
        : shape < 0.61
          ? 2
          : shape < 0.82
            ? 5
            : shape < 0.92
              ? 3
              : shape < 0.97
                ? 1
                : 4;

      motifs.push({
        x: column * CELL_SIZE + (seed - 0.5) * 14,
        y: row * CELL_SIZE + (detail - 0.5) * 14,
        size: seed > 0.8 ? 2.2 : 1.5 + seeded(seed * 87.1) * 0.65,
        type,
        rotation: Math.floor(seeded(detail * 101.3) * 4) * (Math.PI / 2),
        seed,
        tone: Math.floor(seeded(seed * 121.7 + detail * 4.4) * MOTIF_COLORS.length),
      });
    }
  }

  return motifs;
}

export default function KiviBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer: Point = { x: -1000, y: -1000 };
    const current: Point = { x: -1000, y: -1000 };
    let motifs: Motif[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let active = 0;
    let targetActive = 0;
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      motifs = createMotifs(width, height);
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      targetActive = 1;
    };

    const leave = () => {
      targetActive = 0;
    };

    const render = () => {
      current.x += (pointer.x - current.x) * (reduceMotion.matches ? 1 : 0.14);
      current.y += (pointer.y - current.y) * (reduceMotion.matches ? 1 : 0.14);
      active += (targetActive - active) * (reduceMotion.matches ? 0.2 : 0.045);

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const motif of motifs) {
        const dx = motif.x - current.x;
        const dy = motif.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const reveal = smoothstep(REVEAL_RADIUS + REVEAL_SOFTNESS, 0, distance) * active;
        drawMotif(context, motif, reveal, dpr);
      }

      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="kivi-background" aria-hidden="true" />;
}
