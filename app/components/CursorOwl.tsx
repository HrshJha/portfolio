"use client";

import { useEffect, useRef, useState } from "react";
import { pointerField } from "./cursorField";

/**
 * CursorOwl — a tiny, quiet decorative companion that trails the cursor.
 *
 * It subscribes to the shared `pointerField` (fed by KiviBackground's existing
 * global pointermove listener) rather than adding its own, and drives all
 * per-frame motion through refs + transforms so React never re-renders on a
 * frame. It is purely decorative: aria-hidden, pointer-events:none, and hidden
 * entirely on coarse/touch pointers.
 */
export default function CursorOwl() {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);

  // Detect pointer capability + reduced motion on the client only.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setEnabled(fine.matches);
      setReduced(rm.matches);
    };
    sync();
    fine.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const tilt = tiltRef.current;
    const eyes = eyesRef.current;
    if (!root || !tilt) return;

    // Owl box geometry (matches the SVG container size in CSS px).
    const OWL_W = 24;
    const OWL_H = 27;
    const MARGIN = 6;

    // Motion state — locals only, so nothing here triggers a React render.
    let owlX = pointerField.x;
    let owlY = pointerField.y;
    let velX = 0;
    let velY = 0;
    let tiltDeg = 0;
    let opacity = 0;
    let overInteractive = false;
    let wasActive = false;
    let prevX = pointerField.x;
    let prevY = pointerField.y;
    let prevSpeed = 0;
    let lastDir = 1;

    // Sudden-stop head tilt.
    let headTiltUntil = 0;
    let headTiltDir = 1;
    let nextHeadOk = 0;

    // Wing flutter debounce.
    let nextFlutterOk = 0;

    let frame = 0;
    let tick = 0;
    let flutterTimer: ReturnType<typeof setTimeout> | null = null;
    let blinkTimer: ReturnType<typeof setTimeout> | null = null;
    let blinkEnd: ReturnType<typeof setTimeout> | null = null;

    const start = performance.now();

    const scheduleBlink = () => {
      if (reduced) return;
      const delay = 3000 + Math.random() * 3000; // every 3–6s
      blinkTimer = setTimeout(() => {
        if (eyes) {
          eyes.classList.add("is-blinking");
          blinkEnd = setTimeout(() => eyes.classList.remove("is-blinking"), 160);
        }
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      tick++;

      const raw = pointerField;
      const active = raw.active;

      // First activation: snap in place so it fades in rather than flying from a corner.
      if (active && !wasActive) {
        owlX = raw.x;
        owlY = raw.y;
        prevX = raw.x;
        prevY = raw.y;
      }
      wasActive = active;

      // Per-frame raw delta → smoothed velocity (drives lag offset, tilt, flutter).
      const dX = raw.x - prevX;
      const dY = raw.y - prevY;
      prevX = raw.x;
      prevY = raw.y;
      velX += (dX - velX) * 0.25;
      velY += (dY - velY) * 0.25;
      const speed = Math.hypot(velX, velY);
      if (speed > 3) lastDir = velX >= 0 ? 1 : -1;

      // Interactive-UI proximity (throttled): dim so the owl never fights the UI.
      if (active && tick % 8 === 0 && raw.x >= 0 && raw.y >= 0) {
        const el = document.elementFromPoint(raw.x, raw.y);
        overInteractive = Boolean(
          el &&
            el.closest(
              'a, button, input, textarea, select, [role="button"], [contenteditable="true"]'
            )
        );
      }

      // Directional trailing offset: owl rests down-right, but sits BEHIND travel.
      const trailX = Math.max(-14, Math.min(14, velX * 0.9));
      const trailY = Math.max(-14, Math.min(14, velY * 0.9));
      const targetX = raw.x + 12 - trailX;
      const targetY = raw.y + 10 - trailY;

      // Follow with subtle lag.
      const ease = reduced ? 0.32 : 0.14;
      owlX += (targetX - owlX) * ease;
      owlY += (targetY - owlY) * ease;

      // Clamp to the viewport so the owl is never clipped at an edge.
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = Math.max(MARGIN, Math.min(vw - OWL_W - MARGIN, owlX));
      const cy = Math.max(MARGIN, Math.min(vh - OWL_H - MARGIN, owlY));
      root.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;

      // Fade in/out + dim over interactive UI.
      const targetOpacity = active ? (overInteractive ? 0.45 : 0.9) : 0;
      opacity += (targetOpacity - opacity) * 0.1;
      root.style.opacity = opacity.toFixed(3);

      if (reduced) {
        tilt.style.transform = "";
      } else {
        const t = (now - start) / 1000;

        // Sudden-stop head tilt (§22): was moving fast, now near-still.
        if (prevSpeed > 6 && speed < 1.2 && now > nextHeadOk) {
          headTiltUntil = now + 620;
          headTiltDir = lastDir;
          nextHeadOk = now + 2200;
        }
        let head = 0;
        if (now < headTiltUntil) {
          head = headTiltDir * 4 * ((headTiltUntil - now) / 620); // decays to 0
        }

        // Lean gently into motion (capped at 4°).
        const targetTilt = Math.max(-4, Math.min(4, velX * 0.35));
        tiltDeg += (targetTilt - tiltDeg) * 0.12;

        const bob = Math.sin(t * ((Math.PI * 2) / 3.4)) * 0.6;
        const breath = 1 + Math.sin(t * ((Math.PI * 2) / 4)) * 0.012;
        tilt.style.transform = `translateY(${bob.toFixed(2)}px) rotate(${(tiltDeg + head).toFixed(2)}deg) scale(${breath.toFixed(4)})`;

        // Wing flutter on a burst of speed (debounced so it stays a micro-response).
        if (speed > 9 && now > nextFlutterOk) {
          nextFlutterOk = now + 950;
          root.classList.add("is-fluttering");
          if (flutterTimer) clearTimeout(flutterTimer);
          flutterTimer = setTimeout(() => root.classList.remove("is-fluttering"), 500);
        }
      }

      prevSpeed = speed;
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      if (flutterTimer) clearTimeout(flutterTimer);
      if (blinkTimer) clearTimeout(blinkTimer);
      if (blinkEnd) clearTimeout(blinkEnd);
      root.classList.remove("is-fluttering");
      eyes?.classList.remove("is-blinking");
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="cursor-owl" aria-hidden="true">
      <div ref={tiltRef} className="cursor-owl__tilt">
        <svg className="cursor-owl__svg" viewBox="0 0 28 32" aria-hidden="true">
          {/* ear tufts (painted behind the head so only the tips read) */}
          <path className="cursor-owl__ear" d="M9 5 L6 1.5 L12 4.5 Z" />
          <path className="cursor-owl__ear" d="M19 5 L22 1.5 L16 4.5 Z" />
          {/* body / head silhouette */}
          <path
            className="cursor-owl__body"
            d="M14 4 C 19.5 4 23 8 23 14.5 C 23 22.5 19 29 14 29 C 9 29 5 22.5 5 14.5 C 5 8 8.5 4 14 4 Z"
          />
          {/* folded wings (flutter on fast motion) */}
          <path
            className="cursor-owl__wing cursor-owl__wing--l"
            d="M6.5 11 C 4 14 4 20 7 24 C 6.5 19 6.5 14 8.5 11 Z"
          />
          <path
            className="cursor-owl__wing cursor-owl__wing--r"
            d="M21.5 11 C 24 14 24 20 21 24 C 21.5 19 21.5 14 19.5 11 Z"
          />
          {/* beak */}
          <path className="cursor-owl__beak" d="M14 15.8 L12.7 14.4 L15.3 14.4 Z" />
          {/* eyes (blink) */}
          <g ref={eyesRef} className="cursor-owl__eyes">
            <circle className="cursor-owl__iris" cx="10.5" cy="13.4" r="2.4" />
            <circle className="cursor-owl__iris" cx="17.5" cy="13.4" r="2.4" />
            <circle className="cursor-owl__pupil" cx="10.5" cy="13.6" r="1" />
            <circle className="cursor-owl__pupil" cx="17.5" cy="13.6" r="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}
