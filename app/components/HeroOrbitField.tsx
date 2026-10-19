"use client";

import { useEffect, useRef } from "react";

type Particle = {
  ring: number;
  angle: number;
  size: number;
  alpha: number;
  speed: number;
  phase: number;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

/**
 * A lightweight canvas field of concentric, slowly rotating particle bands.
 * It is intentionally atmospheric: hero copy remains the primary focus.
 */
export default function HeroOrbitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !context) return;

    const random = seededRandom(12041996);
    const particles: Particle[] = [];
    const ringCount = 36;

    for (let ring = 0; ring < ringCount; ring += 1) {
      const amount = Math.round(22 + (ring / ringCount) * 68);
      for (let index = 0; index < amount; index += 1) {
        particles.push({
          ring,
          angle: (index / amount) * Math.PI * 2 + (random() - 0.5) * 0.12,
          size: 0.35 + random() * 1.45,
          alpha: 0.18 + random() * 0.62,
          speed: (0.014 + random() * 0.025) * (ring % 2 === 0 ? 1 : -1),
          phase: random() * Math.PI * 2,
        });
      }
    }

    let width = 0;
    let height = 0;
    let frameId = 0;
    let startTime = 0;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0, true);
    };

    const draw = (elapsed: number, staticFrame = false) => {
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.84;
      const radiusX = width * 0.58;
      const radiusY = height * 0.43;
      const time = staticFrame || reducedMotion ? 0 : elapsed * 0.001;

      // Fine, imperfect elliptical contours make the particle field read as a
      // textured rotating surface rather than a stack of perfect UI circles.
      for (let ring = 2; ring < ringCount; ring += 3) {
        const radius = 0.12 + (ring / ringCount) * 1.04;
        context.beginPath();
        for (let step = 0; step <= 220; step += 1) {
          const angle = (step / 220) * Math.PI * 2;
          const drift = Math.sin(angle * 5 + ring * 0.52 + time * 0.12) * 0.006;
          const wobble = Math.sin(angle * 3 - ring * 0.24 + time * 0.06) * 0.006;
          const x = centerX + Math.cos(angle + time * 0.035) * radiusX * (radius + drift);
          const y = centerY + Math.sin(angle + time * 0.035) * radiusY * (radius + wobble);
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.strokeStyle = "rgba(226, 225, 209, 0.055)";
        context.lineWidth = 0.7;
        context.stroke();
      }

      for (const particle of particles) {
        const radius = 0.1 + (particle.ring / ringCount) * 1.08;
        const angle =
          particle.angle +
          time * particle.speed +
          Math.sin(particle.angle * 3 + particle.phase + time * 0.08) * 0.026;
        const radialWobble =
          Math.sin(particle.angle * 7 + particle.phase + time * 0.09) * 0.009;
        const bandRadius = radius + radialWobble;
        const x =
          centerX +
          Math.cos(angle) * radiusX * bandRadius +
          Math.sin(angle * 8 + particle.phase) * 1.8;
        const y =
          centerY +
          Math.sin(angle) * radiusY * bandRadius +
          Math.cos(angle * 6 + particle.phase) * 1.4;

        // Add quiet density variation so there are visible gaps between bands.
        const texture = 0.26 + 0.74 * Math.pow(
          (Math.sin(particle.angle * 11 + particle.ring * 0.7 + time * 0.045) + 1) / 2,
          1.8,
        );
        const edgeFade = Math.max(0, 1 - Math.max(0, bandRadius - 0.92) * 1.55);
        const alpha = particle.alpha * texture * edgeFade;
        if (alpha < 0.035) continue;

        const tint = particle.ring % 6 === 0 ? "229, 229, 213" : "198, 203, 187";
        context.fillStyle = `rgba(${tint}, ${alpha})`;
        context.beginPath();
        context.ellipse(
          x,
          y,
          particle.size * (1 + Math.abs(Math.sin(angle * 2)) * 0.7),
          Math.max(0.35, particle.size * 0.42),
          angle * 0.28,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      // A small, restrained core gives the rotating surface a point of focus.
      const coreGlow = context.createRadialGradient(centerX, centerY, 1, centerX, centerY, 54);
      coreGlow.addColorStop(0, "rgba(228, 228, 211, 0.22)");
      coreGlow.addColorStop(1, "rgba(228, 228, 211, 0)");
      context.fillStyle = coreGlow;
      context.beginPath();
      context.ellipse(centerX, centerY, 54, 22, 0, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "rgba(238, 236, 220, 0.88)";
      context.beginPath();
      context.ellipse(centerX, centerY - 2, 1.7, 5.5, 0, 0, Math.PI * 2);
      context.fill();
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      draw(timestamp - startTime);
      if (!reducedMotion) frameId = window.requestAnimationFrame(animate);
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(frameId);
      if (reducedMotion) draw(0, true);
      else {
        startTime = 0;
        frameId = window.requestAnimationFrame(animate);
      }
    };

    resize();
    if (!reducedMotion) frameId = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-orbit-field__canvas" aria-hidden="true" />;
}
