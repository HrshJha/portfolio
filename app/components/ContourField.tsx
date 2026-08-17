"use client";

import { useEffect, useRef } from "react";

class Trace {
  lineIndex: number;
  u: number;
  speed: number;
  length: number;
  alpha: number;
  phase: number;

  constructor(lineIndex: number) {
    this.lineIndex = lineIndex;
    this.u = Math.random();
    this.speed = 0.025 + Math.random() * 0.035;
    this.length = 0.015 + Math.random() * 0.035;
    this.alpha = 0.65 + Math.random() * 0.35;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(dt: number) {
    this.u += this.speed * dt;
    if (this.u > 1.05) {
      this.u = -0.05;
      this.speed = 0.025 + Math.random() * 0.035;
      this.length = 0.015 + Math.random() * 0.035;
      this.alpha = 0.65 + Math.random() * 0.35;
    }
  }
}

export default function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hero = canvas.parentElement;
    if (!hero) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let lineCount = 120;
    let traces: Trace[] = [];
    let animationFrameId = 0;
    let previousTime = performance.now();
    let isDark = document.documentElement.dataset.theme === "dark";

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = reduceMotionQuery.matches;

    // Mathematical field: getY with exponential curvature decay Math.pow(1 - u, 1.75)
    function getY(u: number, i: number, time: number, w: number, h: number): number {
      const centerY = h * 0.58;
      const normalized = i / Math.max(1, lineCount - 1) - 0.5; // -0.5 to +0.5
      const sourceSpread = h * 0.72;
      const convergence = Math.pow(1 - u, 1.75);
      const primaryCurve = normalized * sourceSpread * convergence;
      const wave = Math.sin(u * Math.PI * 1.15 + i * 0.11) * 10 * convergence;
      const drift = Math.sin(time * 0.08 + i * 0.07) * 1.5;
      const breathing = Math.sin(time * 0.05) * 0.015 * sourceSpread * convergence;
      return centerY + primaryCurve + wave + drift + breathing;
    }

    // Spatial content attenuation mask around center-right hero text
    function contentMask(x: number, y: number, w: number, h: number): number {
      const cx = w * 0.58;
      const cy = h * 0.46;
      const dx = (x - cx) / (w * 0.34);
      const dy = (y - cy) / (h * 0.28);
      const d = Math.sqrt(dx * dx + dy * dy);
      return Math.min(1, 0.55 + d * 0.45);
    }

    function resize() {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas && ctx) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      lineCount = width < 600 ? 55 : width < 1024 ? 85 : Math.min(160, Math.floor(width / 16));

      // Generate persistent trace objects (14-18% of line paths)
      const traceCount = Math.max(10, Math.round(lineCount * 0.16));
      traces = Array.from({ length: traceCount }, (_, index) => {
        const lineIdx = Math.floor((index / traceCount) * (lineCount - 1));
        return new Trace(lineIdx);
      });
    }

    function drawFieldLine(i: number, time: number, w: number, h: number) {
      if (!ctx) return;
      const steps = 160;
      const startX = -w * 0.18;
      const endX = w * 1.05;
      const spanX = endX - startX;

      // Calibrated visibility base alpha
      const indexRatio = Math.pow(1 - i / lineCount, 0.45);
      const baseAlpha = isDark
        ? 0.10 + 0.14 * indexRatio // 0.10 to 0.24 in dark mode
        : 0.12 + 0.16 * indexRatio; // 0.12 to 0.28 in light mode

      // Create per-line horizontal gradient from left (clearly visible) to right (subtle convergence)
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      if (isDark) {
        grad.addColorStop(0, `rgba(240, 244, 255, ${(baseAlpha * 1.1).toFixed(4)})`);
        grad.addColorStop(0.5, `rgba(225, 230, 255, ${(baseAlpha * 0.65).toFixed(4)})`);
        grad.addColorStop(1, `rgba(210, 218, 255, ${(baseAlpha * 0.28).toFixed(4)})`);
      } else {
        grad.addColorStop(0, `rgba(25, 32, 58, ${(baseAlpha * 1.15).toFixed(4)})`);
        grad.addColorStop(0.5, `rgba(32, 40, 70, ${(baseAlpha * 0.72).toFixed(4)})`);
        grad.addColorStop(1, `rgba(45, 55, 90, ${(baseAlpha * 0.32).toFixed(4)})`);
      }

      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        const x = startX + u * spanX;
        const y = getY(u, i, time, w, h);
        if (s === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.75;
      ctx.stroke();
    }

    function drawTrace(trace: Trace, time: number, w: number, h: number) {
      if (!ctx) return;
      const subSteps = 8;
      const startX = -w * 0.18;
      const endX = w * 1.05;
      const spanX = endX - startX;
      const accentRgb = isDark ? "245, 130, 65" : "217, 106, 50"; // Clear vibrant copper/amber accent

      for (let j = 0; j < subSteps; j++) {
        const t1 = j / subSteps;
        const t2 = (j + 1) / subSteps;
        const u1 = trace.u + t1 * trace.length;
        const u2 = trace.u + t2 * trace.length;

        if (u1 < 0 || u2 > 1.05) continue;

        const clampedU1 = Math.max(0, Math.min(1, u1));
        const clampedU2 = Math.max(0, Math.min(1, u2));

        const x1 = startX + clampedU1 * spanX;
        const y1 = getY(clampedU1, trace.lineIndex, time, w, h);
        const x2 = startX + clampedU2 * spanX;
        const y2 = getY(clampedU2, trace.lineIndex, time, w, h);

        const midU = (clampedU1 + clampedU2) / 2;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const headTail = Math.sin(Math.PI * ((t1 + t2) / 2));
        const uDecay = Math.pow(1 - midU, 0.2);
        const mask = contentMask(midX, midY, w, h);
        const segAlpha = trace.alpha * headTail * uDecay * mask;

        if (segAlpha <= 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${accentRgb}, ${segAlpha.toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
    }

    function update(dt: number) {
      for (let i = 0; i < traces.length; i++) {
        traces[i].update(dt);
      }
    }

    function draw(time: number) {
      if (!ctx) return;
      isDark = document.documentElement.dataset.theme === "dark";

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < lineCount; i++) {
        drawFieldLine(i, time, width, height);
      }

      for (let k = 0; k < traces.length; k++) {
        drawTrace(traces[k], time, width, height);
      }
    }

    function render(now: number) {
      const dt = Math.min((now - previousTime) / 1000, 0.033);
      previousTime = now;

      update(dt);
      draw(now / 1000);

      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    resize();
    render(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) {
        draw(performance.now() / 1000);
      }
    });
    resizeObserver.observe(hero);

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      if (!reduceMotion) {
        previousTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    reduceMotionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      reduceMotionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas id="v7-field" ref={canvasRef} className="contour-field" aria-hidden="true" />;
}
