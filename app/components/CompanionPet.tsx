"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type FireballState = "IDLE" | "HOVER_HOP" | "HOVER_LOOP" | "WALKING" | "SLEEPING";

type Physics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hover: boolean;
  hopping: boolean;
  hoverStarted: number;
  landingAt: number;
  sparkUntil: number;
  walkUntil: number;
  walkDistance: number;
  walkStarted: number;
  seed: number;
};

const clampDt = (value: number) => Math.min(0.1, Math.max(0, value));

function FireballVisual({
  visualRef,
  shellRef,
  reducedMotion,
  state,
}: {
  visualRef: React.RefObject<HTMLDivElement | null>;
  shellRef: React.RefObject<SVGGElement | null>;
  reducedMotion: boolean;
  state: FireballState;
}) {
  return (
    <div ref={visualRef} className="companion-pet-body" data-state={state.toLowerCase()}>
      <svg className="companion-pet-svg" viewBox="0 0 72 92" aria-hidden="true">
        <ellipse className="companion-pet-shadow" cx="36" cy="87" rx="18" ry="3" />
        <g ref={shellRef} className="companion-fireball-shell" style={{ "--reduced-motion": reducedMotion ? 0 : 1 } as CSSProperties}>
          <path className="fire-crown-outer" d="M24 31c-4-4-2-9 3-12-1-5 2-10 7-15 1 6 6 8 6 14 4-3 7-6 8-11 5 7 6 14 3 20 4-1 6-3 7-7 3 8 1 14-5 18-4 3-7 3-10 0-5 5-13 7-19 2Z" />
          <path className="fire-crown-mid" d="M29 30c-3-3-1-6 2-8-1-3 1-6 3-9 2 4 4 6 3 10 3-1 5-3 6-6 3 5 3 9 1 12 3 0 4-1 6-3 1 6-3 9-8 8-5 3-10 1-13-4Z" />
          <path className="fire-crown-core" d="M34 29c-1-2 0-4 2-6 1 3 3 4 2 7 2-1 3-2 3-4 2 4 0 6-3 7-2 0-3-2-4-4Z" />
          <rect className="fire-head-border" x="13" y="28" width="46" height="37" rx="11" />
          <rect className="fire-head-face" x="16" y="31" width="40" height="31" rx="8" />
          <circle className="fire-ear left" cx="13" cy="47" r="3" />
          <circle className="fire-ear right" cx="59" cy="47" r="3" />
          <rect className="fire-eye" x="23" y="42" width="7" height="4" rx=".6" />
          <rect className="fire-eye" x="42" y="42" width="7" height="4" rx=".6" />
          <rect className="fire-mouth" x="33" y="51" width="7" height="3" rx="1" />
          <path className="fire-arm left" d="M20 68c-5-2-8 1-7 5 1 3 4 4 7 1" />
          <path className="fire-arm right" d="M52 68c5-2 8 1 7 5-1 3-4 4-7 1" />
          <circle className="fire-hand" cx="14" cy="73" r="3" />
          <circle className="fire-hand" cx="58" cy="73" r="3" />
          <path className="fire-body" d="M23 64h26l2 17c-5 3-25 3-30 0Z" />
          <rect className="fire-core-badge" x="30" y="69" width="12" height="11" rx="3" />
          <rect className="fire-core-bar one" x="33" y="71" width="2" height="7" rx="1" />
          <rect className="fire-core-bar two" x="36" y="70" width="2" height="8" rx="1" />
          <rect className="fire-core-bar three" x="39" y="71" width="2" height="7" rx="1" />
          <path className="fire-leg left" d="M27 80v6h-5" />
          <path className="fire-leg right" d="M45 80v6h5" />
          <ellipse className="fire-foot" cx="23" cy="87" rx="5" ry="2" />
          <ellipse className="fire-foot" cx="49" cy="87" rx="5" ry="2" />
          <path className="fireball-spark spark-a" d="M15 28v6m-3-3h6" />
          <path className="fireball-spark spark-b" d="M57 39v5m-2.5-2.5h5" />
        </g>
      </svg>
    </div>
  );
}

export default function CompanionPet() {
  const reducedMotion = Boolean(useReducedMotion());
  const visualRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<SVGGElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const physics = useRef<Physics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    hover: false,
    hopping: false,
    hoverStarted: 0,
    landingAt: 0,
    sparkUntil: 0,
    walkUntil: 0,
    walkDistance: 0,
    walkStarted: 0,
    seed: Math.random() * Math.PI * 2,
  });
  const [sleeping, setSleeping] = useState(false);
  const [state, setState] = useState<FireballState>("IDLE");

  const wake = useCallback(() => {
    setSleeping(false);
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => {
      if (!physics.current.hover) setSleeping(true);
    }, 5 * 60 * 1000);
  }, []);

  const triggerHop = useCallback((strong = false) => {
    const p = physics.current;
    if (reducedMotion) {
      p.hopping = false;
      p.y = 0;
      p.vy = 0;
      p.sparkUntil = performance.now() + 180;
      setState("HOVER_HOP");
      return;
    }
    p.hopping = true;
    p.y = Math.min(0, p.y);
    p.vy = strong ? -420 : -260;
    p.vx = strong ? (p.vx >= 0 ? 26 : -26) : p.vx;
    p.sparkUntil = performance.now() + 280;
    setState("HOVER_HOP");
  }, [reducedMotion]);

  const setHover = useCallback((next: boolean) => {
    const p = physics.current;
    p.hover = next;
    wake();
    if (next) {
      p.hoverStarted = performance.now();
      triggerHop(false);
    } else if (!p.hopping) {
      setState("IDLE");
    }
  }, [triggerHop, wake]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = clampDt((now - last) / 1000);
      last = now;
      const p = physics.current;
      const seconds = now / 1000;

      if (p.hover && !reducedMotion) {
        if (p.hopping) {
          p.vy += 2200 * dt;
          p.y += p.vy * dt;
          p.x += p.vx * dt;
          p.vx *= Math.max(0, 1 - dt * 6);
          if (p.y >= 0) {
            p.y = 0;
            p.vy = 0;
            p.hopping = false;
            p.landingAt = now;
            setState("HOVER_LOOP");
          }
        } else {
          const loopT = ((now - p.hoverStarted) % 520) / 520;
          const bounce = (1 - Math.cos(loopT * Math.PI * 2)) / 2;
          p.y = -5 * bounce;
          p.x = 2 * Math.sin((2 * Math.PI * (now - p.hoverStarted)) / 640 + Math.PI / 3);
          p.vx = 0;
        }
      } else if (p.hopping && !reducedMotion) {
        p.vy += 2200 * dt;
        p.y += p.vy * dt;
        if (p.y >= 0) {
          p.y = 0;
          p.vy = 0;
          p.hopping = false;
          p.landingAt = now;
          setState("IDLE");
        }
      } else {
        const stiffness = 210;
        const damping = 14;
        const acceleration = (-stiffness * p.y - damping * p.vy);
        p.vy += acceleration * dt;
        p.y += p.vy * dt;
        p.x *= Math.max(0, 1 - dt / 0.22);
        p.vx *= Math.max(0, 1 - dt / 0.22);
        if (Math.abs(p.y) < 0.5 && Math.abs(p.vy) < 2) { p.y = 0; p.vy = 0; }
      }

      if (p.walkUntil > now && !p.hover && !p.hopping) {
        const progress = Math.min(1, (now - p.walkStarted) / 1600);
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        p.x = p.walkDistance * eased;
        setState("WALKING");
      }

      const idleBreath = reducedMotion ? 1 : 1 + Math.sin(seconds * (Math.PI * 2 / 4.2)) * 0.01;
      const landingAge = p.landingAt ? now - p.landingAt : 9999;
      let scaleX = 1;
      let scaleY = idleBreath;
      if (landingAge < 70) { scaleX = 1.18; scaleY = 0.82; }
      else if (landingAge < 160) { scaleX = 0.95; scaleY = 1.06; }
      else if (landingAge < 280) { const settle = (landingAge - 160) / 120; scaleX = 0.95 + settle * 0.05; scaleY = 1.06 - settle * 0.06; }
      if (sleeping) { scaleX *= 1.02; scaleY *= 0.9; }

      const amplitude = p.hover && !reducedMotion ? 1.2 : 1;
      const turbulence = amplitude * (3 * Math.sin(1.1 * seconds + p.seed) + 1.5 * Math.sin(2.7 * seconds + p.seed * 1.7) + 0.8 * Math.sin(4.3 * seconds + p.seed * 2.3));
      const flameScale = sleeping ? 0.72 : 1 + (reducedMotion ? 0 : 0.08 * Math.sin(0.9 * seconds + p.seed + 1));
      const visual = visualRef.current;
      const shell = shellRef.current;
      if (visual) visual.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scaleX}, ${scaleY})`;
      if (shell) {
        shell.style.transform = `translate3d(${turbulence}px, 0, 0) scale(${flameScale}, ${flameScale})`;
        shell.style.opacity = sleeping ? "0.45" : "1";
        shell.parentElement?.setAttribute("data-sparks", p.sparkUntil > now ? "true" : "false");
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, sleeping]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const scheduleWalk = () => {
      timer = setTimeout(() => {
        const p = physics.current;
        if (!p.hover && !sleeping) {
          p.walkStarted = performance.now();
          p.walkUntil = p.walkStarted + 1600;
          p.walkDistance = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 20);
        }
        scheduleWalk();
      }, 45000 + Math.random() * 75000);
    };
    scheduleWalk();
    return () => { if (timer) clearTimeout(timer); };
  }, [sleeping]);

  useEffect(() => {
    wake();
    const onActivity = () => wake();
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    return () => {
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("keydown", onActivity);
      if (sleepTimer.current) clearTimeout(sleepTimer.current);
    };
  }, [wake]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    wake();
    if (event.pointerType === "touch") {
      setHover(true);
      holdTimer.current = setTimeout(() => setHover(false), 850);
    }
  };

  const clearHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  const currentState = sleeping ? "SLEEPING" : state;

  return (
    <div className="companion-pet" data-fireball-state={currentState.toLowerCase()}>
      <button
        type="button"
        className="companion-pet-hitbox"
        aria-label="Fireball companion"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onPointerDown={onPointerDown}
        onPointerUp={clearHold}
        onPointerCancel={clearHold}
        onClick={() => { wake(); triggerHop(true); }}
      >
        <FireballVisual visualRef={visualRef} shellRef={shellRef} reducedMotion={reducedMotion} state={currentState} />
      </button>
    </div>
  );
}
