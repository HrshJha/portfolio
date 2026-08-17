"use client";

import { useEffect, useRef } from "react";

class Trace {
  lineIndex: number;
  u: number;
  speed: number;
  length: number;
  alpha: number;

  constructor(lineIndex: number, isDark: boolean) {
    this.lineIndex = lineIndex;
    this.u = Math.random() * 0.65; // Concentrated on the left & mid regions
    this.speed = 0.022 + Math.random() * 0.030;
    this.length = 0.012 + Math.random() * 0.025;
    this.alpha = isDark
      ? 0.22 + Math.random() * 0.26 // 0.22 to 0.48 in dark mode
      : 0.18 + Math.random() * 0.17; // 0.18 to 0.35 in light mode
  }

  update(dt: number, isDark: boolean) {
    this.u += this.speed * dt;
    if (this.u > 0.88) {
      this.u = -0.06 - Math.random() * 0.12;
      this.speed = 0.022 + Math.random() * 0.030;
      this.length = 0.012 + Math.random() * 0.025;
      this.alpha = isDark
        ? 0.22 + Math.random() * 0.26
        : 0.18 + Math.random() * 0.17;
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

    // Measured headline metrics for exact geometric alignment
    const headlineMetrics = {
      nameCenterX: 0,
      nameCenterY: 0,
      headlineWidth: 0,
      headlineHeight: 0,
    };

    function updateHeadlineMetrics() {
      const headline = document.querySelector(".hero-name") || document.getElementById("hero-heading");
      if (!headline || !hero) {
        headlineMetrics.nameCenterX = width * 0.5;
        headlineMetrics.nameCenterY = height * 0.48;
        headlineMetrics.headlineWidth = width * 0.55;
        headlineMetrics.headlineHeight = height * 0.14;
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const nameRect = headline.getBoundingClientRect();

      headlineMetrics.nameCenterX = nameRect.left - heroRect.left + nameRect.width / 2;
      headlineMetrics.nameCenterY = nameRect.top - heroRect.top + nameRect.height / 2;
      headlineMetrics.headlineWidth = nameRect.width || width * 0.55;
      headlineMetrics.headlineHeight = nameRect.height || height * 0.14;
    }

    // Mathematical field: anchored directly to the vertical centerline of "Harsh Kumar Jha."
    function getFieldY(u: number, index: number, time: number, w: number, h: number): number {
      const nameY = headlineMetrics.nameCenterY || h * 0.48;
      const normalized = index / Math.max(1, lineCount - 1) - 0.5; // -0.5 to +0.5
      const sourceSpread = h * 0.72;
      const convergence = Math.pow(1 - u, 1.65);
      const base = normalized * sourceSpread * convergence;
      const organic = Math.sin(u * Math.PI * 1.1 + index * 0.12) * 8 * convergence;
      const drift = Math.sin(time * 0.08 + index * 0.07) * 1.2;
      const breathing = Math.sin(time * 0.05) * 0.01 * sourceSpread * convergence;

      return nameY + base + organic + drift + breathing;
    }

    // Name safe zone: soft attenuation centered directly on "Harsh Kumar Jha."
    function headlineMask(x: number, y: number): number {
      const { nameCenterX, nameCenterY, headlineWidth, headlineHeight } = headlineMetrics;
      const dx = (x - nameCenterX) / (headlineWidth * 0.72);
      const dy = (y - nameCenterY) / (headlineHeight * 2.2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      return Math.min(1, 0.25 + distance * 0.9);
    }

    function resize() {
      const rect = canvas?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;

      const newWidth = rect.width;
      const newHeight = rect.height;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (Math.abs(newWidth - width) > 1 || Math.abs(newHeight - height) > 1 || newDpr !== dpr) {
        width = newWidth;
        height = newHeight;
        dpr = newDpr;

        if (canvas && ctx) {
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const newLineCount = width < 600 ? 55 : width < 1024 ? 85 : Math.min(160, Math.floor(width / 16));
        lineCount = newLineCount;

        if (traces.length === 0) {
          const traceCount = Math.max(8, Math.round(lineCount * 0.14));
          traces = Array.from({ length: traceCount }, (_, index) => {
            const lineIdx = Math.floor((index / traceCount) * (lineCount - 1));
            return new Trace(lineIdx, isDark);
          });
        } else {
          traces.forEach((t) => {
            t.lineIndex = Math.min(lineCount - 1, t.lineIndex);
          });
        }
      }

      updateHeadlineMetrics();
    }

    function drawFieldLine(i: number, time: number, w: number, h: number) {
      if (!ctx) return;
      const steps = 160;
      const startX = -w * 0.20;
      const endX = w * 1.05;
      const spanX = endX - startX;

      const indexRatio = Math.pow(1 - i / lineCount, 0.45);

      // Color-aware, atmospheric line rendering:
      // In light mode: delicate blue-charcoal / periwinkle-gray dissolved into the atmosphere (0.018 - 0.045)
      // In dark mode: restrained cool silver-white (0.030 - 0.065)
      const baseAlpha = isDark
        ? 0.030 + 0.035 * indexRatio
        : 0.018 + 0.027 * indexRatio;

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      if (isDark) {
        grad.addColorStop(0, `rgba(240, 240, 235, ${(baseAlpha * 1.0).toFixed(4)})`);
        grad.addColorStop(0.5, `rgba(225, 228, 240, ${(baseAlpha * 0.75).toFixed(4)})`);
        grad.addColorStop(1, `rgba(200, 204, 220, ${(baseAlpha * 0.25).toFixed(4)})`);
      } else {
        grad.addColorStop(0, `rgba(65, 70, 105, ${(baseAlpha * 1.0).toFixed(4)})`);
        grad.addColorStop(0.48, `rgba(78, 84, 120, ${(baseAlpha * 0.75).toFixed(4)})`);
        grad.addColorStop(1, `rgba(100, 105, 140, ${(baseAlpha * 0.25).toFixed(4)})`);
      }

      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        const x = startX + u * spanX;
        const y = getFieldY(u, i, time, w, h);
        if (s === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.60;
      ctx.stroke();
    }

    function drawTrace(trace: Trace, time: number, w: number, h: number) {
      if (!ctx) return;
      const subSteps = 8;
      const startX = -w * 0.20;
      const endX = w * 1.05;
      const spanX = endX - startX;
      // Exact brand accent matching the period '.' in "Harsh Kumar Jha." (#C96F2E)
      const accentRgb = "201, 111, 46";

      for (let j = 0; j < subSteps; j++) {
        const t1 = j / subSteps;
        const t2 = (j + 1) / subSteps;
        const u1 = trace.u + t1 * trace.length;
        const u2 = trace.u + t2 * trace.length;

        if (u1 < 0 || u2 > 1.05) continue;

        const clampedU1 = Math.max(0, Math.min(1, u1));
        const clampedU2 = Math.max(0, Math.min(1, u2));

        const x1 = startX + clampedU1 * spanX;
        const y1 = getFieldY(clampedU1, trace.lineIndex, time, w, h);
        const x2 = startX + clampedU2 * spanX;
        const y2 = getFieldY(clampedU2, trace.lineIndex, time, w, h);

        const midU = (clampedU1 + clampedU2) / 2;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const headTail = Math.sin(Math.PI * ((t1 + t2) / 2));
        const uDecay = Math.pow(1 - midU, 0.3);
        const mask = headlineMask(midX, midY);
        const segAlpha = trace.alpha * headTail * uDecay * mask;

        if (segAlpha <= 0.005) continue;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${accentRgb}, ${segAlpha.toFixed(3)})`;
        ctx.lineWidth = 0.95;
        ctx.stroke();
      }
    }

    function update(dt: number) {
      for (let i = 0; i < traces.length; i++) {
        traces[i].update(dt, isDark);
      }
    }

    function draw(time: number) {
      if (!ctx || width === 0 || height === 0) return;
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
