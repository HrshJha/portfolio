"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Curve = { points: Point[]; alpha: number };
type Trace = { curve: number; phase: number; speed: number; length: number; seed: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function seeded(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export default function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let curves: Curve[] = [];
    let traces: Trace[] = [];
    let lineColor = "#1e2841";
    let accentColor = "#d96f32";
    let colorTick = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const readColor = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return value || fallback;
    };

    const buildField = () => {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = Math.round(clamp(width / 10, 62, 142));
      curves = Array.from({ length: count }, (_, index) => {
        const points: Point[] = [];
        const normalized = index / Math.max(1, count - 1);
        const samples = 170;

        for (let step = 0; step <= samples; step += 1) {
          const progress = step / samples;
          const startX = -width * 0.12;
          const startY = height * (0.04 + normalized * 0.92);
          const endX = width * (0.76 - normalized * 0.08);
          const endY = height * (0.51 + (normalized - 0.5) * 0.09);
          const bend = (0.5 - normalized) * height * 0.56;
          const control1X = width * (0.08 + normalized * 0.02);
          const control1Y = startY + bend;
          const control2X = width * (0.42 + normalized * 0.06);
          const control2Y = endY + bend * 0.16;
          const inverse = 1 - progress;
          points.push({
            x: inverse ** 3 * startX + 3 * inverse ** 2 * progress * control1X + 3 * inverse * progress ** 2 * control2X + progress ** 3 * endX,
            y: inverse ** 3 * startY + 3 * inverse ** 2 * progress * control1Y + 3 * inverse * progress ** 2 * control2Y + progress ** 3 * endY,
          });
        }

        return {
          points,
          alpha: 0.022 + (1 - normalized) * 0.026,
        };
      });

      const traceCount = Math.round(clamp(width / 110, 8, 16));
      traces = Array.from({ length: traceCount }, (_, index) => ({
        curve: Math.floor(seeded(index + 7) * curves.length * 0.82),
        phase: seeded(index + 21),
        speed: 0.000028 + seeded(index + 31) * 0.000038,
        length: 5 + Math.floor(seeded(index + 41) * 13),
        seed: seeded(index + 51),
      }));
    };

    const draw = (time: number) => {
      if (colorTick++ % 30 === 0) {
        lineColor = readColor("--field-line", "#1e2841");
        accentColor = readColor("--field-accent", "#d96f32");
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.62;
      context.lineCap = "round";
      context.lineJoin = "round";

      curves.forEach((curve) => {
        for (let index = 1; index < curve.points.length; index += 1) {
          const previous = curve.points[index - 1];
          const current = curve.points[index];
          const midpoint = (previous.x + current.x) / 2;
          const spatialFade = clamp(1 - (midpoint / width - 0.02) / 0.78, 0, 1);
          const midY = (previous.y + current.y) / 2;
          const contentZone = Math.exp(-Math.pow((midpoint / width - 0.52) / 0.28, 2)) * Math.exp(-Math.pow((midY / height - 0.56) / 0.32, 2));
          const contentFade = 1 - 0.78 * contentZone;
          const alpha = curve.alpha * (0.24 + spatialFade * 0.76) * contentFade;
          context.strokeStyle = lineColor;
          context.globalAlpha = clamp(alpha * 2.2, 0.012, 0.1);
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(current.x, current.y);
          context.stroke();
        }
      });
      context.globalAlpha = 1;

      traces.forEach((trace) => {
        const curve = curves[trace.curve];
        if (!curve) return;
        const movement = reduceMotion ? trace.phase : (trace.phase + time * trace.speed) % 1;
        const center = Math.floor((0.06 + movement * 0.86) * (curve.points.length - 1));
        const half = Math.max(2, Math.floor(trace.length / 2));
        const start = clamp(center - half, 1, curve.points.length - 2);
        const end = clamp(center + half, start + 1, curve.points.length - 1);
        const life = Math.sin(Math.PI * movement) ** 0.72;
        const local = curve.points[center];
        if (!local) return;
        const spatialFade = clamp(1 - (local.x / width - 0.02) / 0.8, 0, 1);
        const traceContentZone = Math.exp(-Math.pow((local.x / width - 0.52) / 0.28, 2)) * Math.exp(-Math.pow((local.y / height - 0.56) / 0.32, 2));
        context.strokeStyle = accentColor;
        context.globalAlpha = (0.28 + trace.seed * 0.42) * life * spatialFade * (1 - 0.65 * traceContentZone);
        context.lineWidth = 0.78 + trace.seed * 0.18;
        context.beginPath();
        context.moveTo(curve.points[start].x, curve.points[start].y);
        for (let point = start + 1; point <= end; point += 1) {
          context.lineTo(curve.points[point].x, curve.points[point].y);
        }
        context.stroke();
        context.globalAlpha = 1;
      });

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    buildField();
    draw(performance.now());
    const observer = new ResizeObserver(buildField);
    observer.observe(hero);
    window.addEventListener("resize", buildField, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", buildField);
    };
  }, []);

  return <canvas ref={canvasRef} className="contour-field" aria-hidden="true" />;
}
