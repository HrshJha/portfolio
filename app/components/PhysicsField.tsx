"use client";

import { useEffect, useRef } from "react";

type MotifKind = 0 | 1 | 2 | 3 | 4;

type Motif = {
  x: number;
  y: number;
  size: number;
  rotation: number;
  kind: MotifKind;
  phase: number;
  colorIndex: number;
};

const PALETTE = [
  [235, 118, 129],
  [248, 157, 108],
  [255, 207, 110],
  [143, 220, 178],
  [102, 198, 211],
  [113, 151, 236],
  [157, 133, 224],
  [221, 126, 193],
] as const;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function PhysicsField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let motifs: Motif[] = [];
    let animationFrame = 0;
    let lastTime = performance.now();
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointerActive = false;
    let targetX = -1000;
    let targetY = -1000;
    let pointerX = targetX;
    let pointerY = targetY;
    let pointerEase = 0;

    function buildMotifs() {
      const random = seededRandom(Math.round(width * 13 + height * 7));
      const spacing = width < 600 ? 43 : 50;
      const columns = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      motifs = [];
      for (let row = -1; row < rows; row += 1) {
        for (let column = -1; column < columns; column += 1) {
          const rowOffset = row % 2 === 0 ? spacing * 0.14 : -spacing * 0.14;
          motifs.push({
            x: column * spacing + rowOffset + (random() - 0.5) * spacing * 0.42,
            y: row * spacing + (random() - 0.5) * spacing * 0.42,
            size: 0.62 + random() * 0.48,
            rotation: (random() - 0.5) * 0.8,
            kind: Math.floor(random() * 5) as MotifKind,
            phase: random() * Math.PI * 2,
            colorIndex: Math.floor(random() * PALETTE.length),
          });
        }
      }
    }

    function drawBloom(scale: number) {
      for (let petal = 0; petal < 4; petal += 1) {
        context.save();
        context.rotate((Math.PI / 2) * petal);
        context.beginPath();
        context.ellipse(0, -2.4 * scale, 1.35 * scale, 2.35 * scale, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
      context.beginPath();
      context.arc(0, 0, 0.8 * scale, 0, Math.PI * 2);
      context.fill();
    }

    function drawSprig(scale: number) {
      context.beginPath();
      context.moveTo(-4.5 * scale, 3.2 * scale);
      context.bezierCurveTo(-1.5 * scale, 1.4 * scale, 0.7 * scale, -0.5 * scale, 3.8 * scale, -3.1 * scale);
      context.stroke();

      for (const [x, y, angle] of [[-1.6, 1.8, -0.85], [1.1, -0.5, 0.55], [3, -2.5, -0.65]] as const) {
        context.save();
        context.translate(x * scale, y * scale);
        context.rotate(angle);
        context.beginPath();
        context.ellipse(0, -1.5 * scale, 1 * scale, 2 * scale, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    function drawPetalCluster(scale: number) {
      context.beginPath();
      context.arc(-2.4 * scale, 1.5 * scale, 1.2 * scale, 0, Math.PI * 2);
      context.arc(0.8 * scale, -1.8 * scale, 1.55 * scale, 0, Math.PI * 2);
      context.arc(3.1 * scale, 1.9 * scale, 1.05 * scale, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.moveTo(-4.6 * scale, 3.7 * scale);
      context.quadraticCurveTo(0, 5.3 * scale, 4.8 * scale, 3.6 * scale);
      context.stroke();
    }

    function drawVine(scale: number) {
      context.beginPath();
      context.arc(0, 0, 4.7 * scale, Math.PI * 0.98, Math.PI * 1.85);
      context.stroke();
      context.beginPath();
      context.ellipse(-2.8 * scale, -1.4 * scale, 1.1 * scale, 2.1 * scale, -0.7, 0, Math.PI * 2);
      context.ellipse(0.1 * scale, -3.2 * scale, 1 * scale, 1.8 * scale, 0.55, 0, Math.PI * 2);
      context.ellipse(3 * scale, -2.4 * scale, 1 * scale, 1.8 * scale, -0.65, 0, Math.PI * 2);
      context.fill();
    }

    function drawBloomWithStem(scale: number) {
      context.beginPath();
      context.moveTo(0, 4.8 * scale);
      context.quadraticCurveTo(-0.4 * scale, 1.8 * scale, 0, 0);
      context.stroke();
      context.save();
      context.translate(0, -1.6 * scale);
      drawBloom(scale * 0.88);
      context.restore();
    }

    function drawMotif(motif: Motif, time: number) {
      const distance = Math.hypot(motif.x - pointerX, motif.y - pointerY);
      const radius = width < 600 ? 185 : 230;
      const reveal = 1 - smoothstep(radius * 0.08, radius, distance);
      const pulse = reducedMotion ? 1 : 0.92 + Math.sin(time * 1.1 + motif.phase) * 0.08;
      const baseAlpha = 0.055;
      const alpha = baseAlpha + reveal * 0.78 * pulse;
      const scale = motif.size * (1 + reveal * 0.1);

      context.save();
      context.translate(motif.x, motif.y);
      context.rotate(motif.rotation);
      context.lineWidth = 0.48 + reveal * 0.3;
      context.lineCap = "round";
      context.lineJoin = "round";

      if (reveal > 0.01) {
        const [r, g, b] = PALETTE[motif.colorIndex];
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.9).toFixed(3)})`;
      } else {
        context.strokeStyle = `rgba(164, 174, 158, ${baseAlpha.toFixed(3)})`;
        context.fillStyle = `rgba(164, 174, 158, ${(baseAlpha * 0.9).toFixed(3)})`;
      }

      switch (motif.kind) {
        case 0:
          drawBloom(scale);
          break;
        case 1:
          drawSprig(scale);
          break;
        case 2:
          drawPetalCluster(scale);
          break;
        case 3:
          drawVine(scale);
          break;
        default:
          drawBloomWithStem(scale);
      }

      context.restore();
    }

    function draw(time: number) {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < motifs.length; index += 1) {
        drawMotif(motifs[index], time);
      }
    }

    function render(now: number) {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const ease = reducedMotion ? 1 : Math.min(1, delta * 9);
      pointerX += (targetX - pointerX) * ease;
      pointerY += (targetY - pointerY) * ease;
      pointerEase += ((pointerActive ? 1 : 0) - pointerEase) * ease;
      draw(now / 1000);

      if (!reducedMotion || pointerActive || pointerEase > 0.01) {
        animationFrame = requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    }

    function handlePointerMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
      pointerActive = true;
      if (!animationFrame) {
        lastTime = performance.now();
        animationFrame = requestAnimationFrame(render);
      }
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) {
        pointerActive = false;
        targetX = -1000;
        targetY = -1000;
        if (!animationFrame) animationFrame = requestAnimationFrame(render);
      }
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      if (!reducedMotion && !animationFrame) animationFrame = requestAnimationFrame(render);
      if (reducedMotion) draw(performance.now() / 1000);
    }

    function resize() {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const changed = nextWidth !== width || nextHeight !== height || nextDpr !== dpr;

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (changed) buildMotifs();
    }

    resize();
    draw(performance.now() / 1000);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", handleMotionChange);
    if (!reducedMotion) animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="physics-field-canvas" aria-hidden="true" />;
}
