"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type PetState =
  | "IDLE"
  | "WALKING"
  | "CURIOUS"
  | "READING"
  | "EXPLORING"
  | "THINKING"
  | "WORKING"
  | "PHOTOGRAPHING"
  | "CELEBRATING"
  | "ATTENTION"
  | "SLEEPING";

type CompanionEvent =
  | { type: "FORM_SUBMIT_START" }
  | { type: "FORM_SUBMIT_SUCCESS" }
  | { type: "FORM_SUBMIT_ERROR" }
  | { type: "SECTION_ENTER"; section: string };

const companionBus = new EventTarget();

export function emitCompanionEvent(event: CompanionEvent) {
  companionBus.dispatchEvent(new CustomEvent("companion", { detail: event }));
}

const sectionStates: Record<string, PetState> = {
  work: "CURIOUS",
  experience: "THINKING",
  about: "CURIOUS",
  contact: "ATTENTION",
};

const statePose: Record<PetState, { y: number | number[]; rotate: number | number[]; scale?: number | number[] }> = {
  IDLE: { y: [0, -1, 0], rotate: [0, -1, 0], scale: [1, 1.012, 1] },
  WALKING: { y: [0, -1, 0], rotate: [0, -2, 0], scale: [1, 1.014, 1] },
  CURIOUS: { y: -2, rotate: -3, scale: 1.025 },
  READING: { y: -1, rotate: 1, scale: 1.01 },
  EXPLORING: { y: [0, -1, 0], rotate: [0, -2, 0], scale: [1, 1.01, 1] },
  THINKING: { y: -1, rotate: [0, 2, 0], scale: [1, 1.008, 1] },
  WORKING: { y: [0, -1, 0], rotate: [0, 1, 0], scale: [1, 0.985, 1] },
  PHOTOGRAPHING: { y: [0, -2, 0], rotate: [0, 2, 0], scale: [1, 1.02, 1] },
  CELEBRATING: { y: [0, -5, 0], rotate: [0, -3, 0], scale: [1, 1.035, 1] },
  ATTENTION: { y: -1, rotate: [0, 3, 0], scale: 1.018 },
  SLEEPING: { y: 1, rotate: -2, scale: [1, 0.99, 1] },
};

function SignalScout({ state, reducedMotion, direction, tilt }: {
  state: PetState;
  reducedMotion: boolean;
  direction: "up" | "down";
  tilt: number;
}) {
  const pose = statePose[state];
  const transition = reducedMotion
    ? { duration: 0.18 }
    : Array.isArray(pose.y)
      ? { duration: state === "CELEBRATING" ? 0.72 : state === "IDLE" ? 4.4 : 2.4, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const }
      : { type: "spring" as const, stiffness: 280, damping: 24 };

  return (
    <motion.div
      className="companion-pet-body"
      data-state={state.toLowerCase()}
      animate={{ y: pose.y, rotate: pose.rotate, scale: pose.scale, x: direction === "down" ? 1 : direction === "up" ? -1 : 0 }}
      transition={transition}
      style={{ "--pet-tilt": `${tilt}deg` } as CSSProperties}
    >
      <svg className="companion-pet-svg" viewBox="0 0 72 72" aria-hidden="true">
        <ellipse className="companion-pet-shadow" cx="36" cy="65" rx="21" ry="3.4" />
        <path className="companion-pet-orbit" d="M13 41C7 31 10 20 21 16c11-4 28-2 36 7 6 7 4 16-3 21" />
        <g className="companion-flame">
          <path className="companion-flame-outer" d="M36 18c-5-4-3-8 1-13 1 4 6 6 5 10 4-2 5-5 5-7 4 5 3 10-1 13-3 2-7 1-10-3Z" />
          <path className="companion-flame-mid" d="M37 17c-2-3 0-5 2-8 1 3 4 4 3 7 2-1 3-2 3-4 2 4 0 8-3 9-2 0-4-2-5-4Z" />
          <path className="companion-flame-core" d="M39 17c-1-2 0-3 1-5 1 2 2 3 1 5 0 1-1 1-2 0Z" />
        </g>
        <path className="companion-pet-fin" d="M57 28c6-2 10-1 12 2-3 1-6 4-9 8l-5-4z" />
        <path className="companion-pet-fin-detail" d="M59 30l7 1-6 4" />
        <path className="companion-pet-body-shell" d="M17 39c0-11 8-19 19-19s20 7 20 18c0 10-8 18-19 19-11 0-20-7-20-18Z" />
        <path className="companion-pet-topline" d="M25 25c6-4 16-4 23 0" />
        <path className="companion-pet-sensor" d="M36 17v-5m0 0-3-3m3 3 3-3" />
        <circle className="companion-pet-sensor-dot" cx="36" cy="9" r="1.7" />
        <g className="companion-pet-face">
          <ellipse className="companion-pet-eye" cx="29" cy="40" rx="3.2" ry="4.2" />
          <ellipse className="companion-pet-eye" cx="43" cy="40" rx="3.2" ry="4.2" />
          <path className="companion-pet-mouth" d="M33 49c2 1.8 4 1.8 6 0" />
        </g>
        <path className="companion-pet-foot left" d="M25 55c-1 4-4 6-7 6" />
        <path className="companion-pet-foot right" d="M47 55c1 4 4 6 7 6" />
        {state === "WORKING" && <circle className="companion-pet-processing" cx="52" cy="19" r="2" />}
        {state === "PHOTOGRAPHING" && <path className="companion-camera-glyph" d="M51 15h6l1 2v5h-8v-5l1-2Zm2 2h2m-1 1.5v2" />}
        {(state === "CELEBRATING" || state === "ATTENTION" || state === "PHOTOGRAPHING") && (
          <path className="companion-pet-spark" d="M12 20v7m-3.5-3.5h7M58 53v6m-3-3h6" />
        )}
      </svg>
    </motion.div>
  );
}

export default function CompanionPet() {
  const reducedMotion = useReducedMotion();
  const petRef = useRef<HTMLDivElement>(null);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCopy = useRef(0);
  const lastScroll = useRef(0);
  const lastProjectReaction = useRef(0);
  const visibleProjects = useRef(new Set<Element>());
  const [sectionState, setSectionState] = useState<PetState>("IDLE");
  const [reaction, setReaction] = useState<PetState | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [scrolling, setScrolling] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [focusedTarget, setFocusedTarget] = useState("top");
  const [copied, setCopied] = useState(false);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const setTemporaryReaction = useCallback((next: PetState, duration = 720) => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    setReaction(next);
    reactionTimer.current = setTimeout(() => setReaction(null), duration);
  }, []);

  const wake = useCallback(() => {
    setSleeping(false);
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => setSleeping(true), 5 * 60 * 1000);
  }, []);

  useEffect(() => {
    wake();
    const resetActivity = () => wake();
    window.addEventListener("pointerdown", resetActivity, { passive: true });
    window.addEventListener("keydown", resetActivity);
    window.addEventListener("visibilitychange", resetActivity);
    return () => {
      window.removeEventListener("pointerdown", resetActivity);
      window.removeEventListener("keydown", resetActivity);
      window.removeEventListener("visibilitychange", resetActivity);
      if (sleepTimer.current) clearTimeout(sleepTimer.current);
    };
  }, [wake]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const next = sectionStates[(visible.target as HTMLElement).id] || "IDLE";
      setSectionState(next);
      setFocusedTarget((visible.target as HTMLElement).id);
      companionBus.dispatchEvent(new CustomEvent("companion", { detail: { type: "SECTION_ENTER", section: (visible.target as HTMLElement).id } }));
    }, { threshold: [0, 0.2, 0.45, 0.7], rootMargin: "-18% 0px -42%" });

    ["work", "experience", "about", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const projectObserver = new IntersectionObserver((entries) => {
      const now = Date.now();
      entries.forEach((entry) => {
        if (entry.isIntersecting && !visibleProjects.current.has(entry.target)) {
          visibleProjects.current.add(entry.target);
          const projectId = (entry.target as HTMLElement).closest(".project-article")?.id;
          if (projectId) setFocusedTarget(projectId);
          if (now - lastProjectReaction.current > 1400) {
            lastProjectReaction.current = now;
            setTemporaryReaction("CURIOUS", 680);
          }
        }
        if (!entry.isIntersecting) visibleProjects.current.delete(entry.target);
      });
    }, { threshold: 0.32 });
    document.querySelectorAll(".project-card").forEach((card) => projectObserver.observe(card));
    return () => projectObserver.disconnect();
  }, [setTemporaryReaction]);

  useEffect(() => {
    const ambientObserver = new IntersectionObserver((entries) => {
      const now = Date.now();
      if (now - lastProjectReaction.current < 2600) return;
      const entry = entries.find((item) => item.isIntersecting);
      if (!entry) return;
      lastProjectReaction.current = now;
      const node = entry.target as HTMLElement;
      setFocusedTarget(node.closest("section, article")?.id || "top");
      if (node.matches("img")) setTemporaryReaction("PHOTOGRAPHING", 900);
      if (node.matches(".exp-card")) setTemporaryReaction("WORKING", 1100);
    }, { threshold: 0.55 });
    document.querySelectorAll("img, .exp-card").forEach((element) => ambientObserver.observe(element));
    return () => ambientObserver.disconnect();
  }, [setTemporaryReaction]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setDirection(current >= lastScroll.current ? "down" : "up");
      lastScroll.current = current;
      setScrolling(true);
      wake();
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrolling(false), 520);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [wake]);

  useEffect(() => {
    const onCompanionEvent = (event: Event) => {
      const detail = (event as CustomEvent<CompanionEvent>).detail;
      if (!detail) return;
      wake();
      if (detail.type === "FORM_SUBMIT_START") setTemporaryReaction("WORKING", 900);
      if (detail.type === "FORM_SUBMIT_SUCCESS") setTemporaryReaction("CELEBRATING", 780);
      if (detail.type === "FORM_SUBMIT_ERROR") setTemporaryReaction("ATTENTION", 780);
    };
    companionBus.addEventListener("companion", onCompanionEvent);
    return () => companionBus.removeEventListener("companion", onCompanionEvent);
  }, [setTemporaryReaction, wake]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || !petRef.current) return;
      const rect = petRef.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      if (distance > 150) {
        setTilt(0);
        return;
      }
      if (Math.abs(dx) < 20) return;
      setTilt(Math.max(-8, Math.min(8, (dx / 150) * 8)));
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion]);

  useEffect(() => {
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("a, button, .project-card")) setTemporaryReaction("CURIOUS", 520);
    };
    document.addEventListener("pointerover", onPointerOver);
    return () => document.removeEventListener("pointerover", onPointerOver);
  }, [setTemporaryReaction]);

  useEffect(() => () => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      idleTimer = setTimeout(() => {
        if (!document.hidden && !reducedMotion) setTemporaryReaction("WALKING", 900);
        schedule();
      }, 18000 + Math.round(Math.random() * 18000));
    };
    schedule();
    return () => { if (idleTimer) clearTimeout(idleTimer); };
  }, [reducedMotion, setTemporaryReaction]);

  const state = useMemo<PetState>(() => {
    if (sleeping) return "SLEEPING";
    if (reaction) return reaction;
    if (scrolling) return "EXPLORING";
    return sectionState;
  }, [reaction, scrolling, sectionState, sleeping]);

  const copyFocusedLink = useCallback(async () => {
    const now = Date.now();
    if (now - lastCopy.current < 2000) return;
    lastCopy.current = now;
    const target = focusedTarget || "top";
    const url = `${window.location.origin}${window.location.pathname}#${target}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = url;
      fallback.setAttribute("readonly", "true");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    setCopied(true);
    setTemporaryReaction("CELEBRATING", 820);
    window.setTimeout(() => setCopied(false), 1400);
  }, [focusedTarget, setTemporaryReaction]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") return;
    setLongPressTriggered(false);
    holdTimer.current = setTimeout(() => {
      setLongPressTriggered(true);
      void copyFocusedLink();
    }, 560);
  };

  const clearHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  if (hidden) {
    return (
      <div className="companion-pet companion-pet-hidden" ref={petRef}>
        <button
          type="button"
          className="companion-restore"
          aria-label="Show portfolio companion"
          onClick={() => { setHidden(false); wake(); setTemporaryReaction("CURIOUS", 560); }}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    );
  }

  return (
    <div className="companion-pet" ref={petRef}>
      {copied && <span className="companion-toast" role="status">Link copied</span>}
      <span className="companion-tooltip" role="tooltip">Double-click to copy a link to this section</span>
      <motion.button
        type="button"
        className="companion-pet-hitbox"
        aria-label="Portfolio companion — double-click to copy a link to this section"
        onClick={() => {
          if (longPressTriggered) { setLongPressTriggered(false); return; }
          wake();
          setTemporaryReaction("CURIOUS", 560);
        }}
        onDoubleClick={() => void copyFocusedLink()}
        onPointerDown={handlePointerDown}
        onPointerUp={clearHold}
        onPointerCancel={clearHold}
        onPointerLeave={clearHold}
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      >
        <SignalScout state={state} reducedMotion={Boolean(reducedMotion)} direction={direction} tilt={tilt} />
      </motion.button>
      <button className="companion-tuck" type="button" onClick={() => setHidden(true)} aria-label="Tuck away companion">Tuck away</button>
    </div>
  );
}
