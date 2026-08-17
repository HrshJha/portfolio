"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Moon, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type PetState =
  | "IDLE"
  | "CURIOUS"
  | "READING"
  | "EXPLORING"
  | "THINKING"
  | "WORKING"
  | "SUCCESS"
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

const stateLabel: Record<PetState, string> = {
  IDLE: "At rest",
  CURIOUS: "Looking closer",
  READING: "Reading the room",
  EXPLORING: "Exploring",
  THINKING: "Thinking through it",
  WORKING: "Working",
  SUCCESS: "Nice and done",
  ATTENTION: "Ready when you are",
  SLEEPING: "Taking a quiet break",
};

const actionItems = [
  { label: "View work", target: "work" },
  { label: "Experience", target: "experience" },
  { label: "About Harsh", target: "about" },
  { label: "Contact Harsh", target: "contact" },
];

const statePose: Record<PetState, { y: number | number[]; rotate: number | number[]; scale?: number | number[] }> = {
  IDLE: { y: [0, -1, 0], rotate: [0, -1, 0], scale: [1, 1.012, 1] },
  CURIOUS: { y: -2, rotate: -3, scale: 1.025 },
  READING: { y: -1, rotate: 1, scale: 1.01 },
  EXPLORING: { y: [0, -1, 0], rotate: [0, -2, 0], scale: [1, 1.01, 1] },
  THINKING: { y: -1, rotate: [0, 2, 0], scale: [1, 1.008, 1] },
  WORKING: { y: [0, -1, 0], rotate: [0, 1, 0], scale: [1, 0.985, 1] },
  SUCCESS: { y: [0, -5, 0], rotate: [0, -3, 0], scale: [1, 1.035, 1] },
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
      ? { duration: state === "SUCCESS" ? 0.72 : state === "IDLE" ? 4.4 : 2.4, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const }
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
        {(state === "SUCCESS" || state === "ATTENTION") && (
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
  const lastScroll = useRef(0);
  const lastProjectReaction = useRef(0);
  const visibleProjects = useRef(new Set<Element>());
  const [sectionState, setSectionState] = useState<PetState>("IDLE");
  const [reaction, setReaction] = useState<PetState | null>(null);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [scrolling, setScrolling] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

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
      if (detail.type === "FORM_SUBMIT_SUCCESS") setTemporaryReaction("SUCCESS", 780);
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
  }, []);

  const state = useMemo<PetState>(() => {
    if (sleeping) return "SLEEPING";
    if (reaction) return reaction;
    if (scrolling) return "EXPLORING";
    return sectionState;
  }, [reaction, scrolling, sectionState, sleeping]);

  const goTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    setOpen(false);
    setTemporaryReaction("EXPLORING", 620);
  };

  if (hidden) return null;

  return (
    <div className="companion-pet" ref={petRef} data-open={open ? "true" : "false"}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            className="companion-panel"
            aria-label="Companion actions"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="companion-panel-topline">
              <div>
                <p className="companion-panel-kicker">Harsh&apos;s companion</p>
                <p className="companion-panel-state"><span /> {stateLabel[state]}</p>
              </div>
              <button className="companion-panel-close" type="button" onClick={() => setOpen(false)} aria-label="Close companion panel"><X size={15} /></button>
            </div>
            <div className="companion-actions">
              {actionItems.map((item) => (
                <button key={item.target} type="button" className="companion-action" onClick={() => goTo(item.target)}>
                  <span>{item.label}</span><ArrowUpRight size={14} />
                </button>
              ))}
            </div>
            <button className="companion-tuck" type="button" onClick={() => { setOpen(false); setHidden(true); }}>
              <Moon size={13} /> Tuck away
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="companion-pet-hitbox"
        aria-label="Portfolio companion"
        aria-expanded={open}
        onClick={() => { setOpen((current) => !current); wake(); setTemporaryReaction("CURIOUS", 560); }}
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      >
        <SignalScout state={state} reducedMotion={Boolean(reducedMotion)} direction={direction} tilt={tilt} />
      </motion.button>
    </div>
  );
}
