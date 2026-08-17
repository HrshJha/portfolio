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
    let lastTime = 0;
    let curves: Curve[] = [];
    let traces: Trace[] = [];
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
        const centerX = -width * 0.78;
        const centerY = height * (0.48 + normalized * 0.055);
        const axisX = width * (1.34 + normalized * 0.018);
        const axisY = height * (0.16 + normalized * 0.0052);
        const start = -Math.PI * (0.86 - normalized * 0.035);
        const end = 0.08 + normalized * 0.01;
        const samples = 170;

        for (let step = 0; step <= samples; step += 1) {
          const progress = step / samples;
          const t = start + (end - start) * progress;
          const opticalBend = Math.sin(progress * Math.PI) * (height * 0.014) * (1 - normalized * 0.6);
          points.push({
            x: centerX + axisX * Math.cos(t),
            y: centerY + axisY * Math.sin(t) + opticalBend,
          });
        }

        return {
          points,
          alpha: 0.032 + (1 - normalized) * 0.038,
        };
      });

      const traceCount = Math.round(clamp(width / 135, 5, 13));
      traces = Array.from({ length: traceCount }, (_, index) => ({
        curve: Math.floor(seeded(index + 7) * curves.length * 0.82),
        phase: seeded(index + 21),
        speed: 0.000028 + seeded(index + 31) * 0.000038,
        length: 5 + Math.floor(seeded(index + 41) * 13),
        seed: seeded(index + 51),
      }));
    };

    const draw = (time: number) => {
      const line = readColor("--field-line", "rgba(30, 40, 65, .055)");
      const accent = readColor("--field-accent", "#d96f32");
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
          const contentFade = 1 - 0.44 * Math.exp(-Math.pow((midpoint / width - 0.48) / 0.24, 2));
          const alpha = curve.alpha * (0.24 + spatialFade * 0.76) * contentFade;
          context.strokeStyle = line;
          context.globalAlpha = clamp(alpha, 0.008, 0.085);
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
        context.strokeStyle = accent;
        context.globalAlpha = (0.18 + trace.seed * 0.38) * life * spatialFade;
        context.lineWidth = 0.72 + trace.seed * 0.16;
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
