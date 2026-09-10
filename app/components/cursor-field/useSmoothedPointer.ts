/**
 * createPointerLoop — single document-level pointermove listener,
 * rAF-driven lerp toward raw pointer position, iterates a shared
 * listeners Set each tick.
 *
 * The listeners Set is owned and provided by CursorFieldProvider.
 * Children add to it via subscribe() before or after the loop starts —
 * the loop always reads the live Set, so there's no timing race.
 *
 * Coords delivered to listeners are relative to `fieldRoot`'s bounding
 * rect, so each section's effects read local coords.
 */

import type { CursorFieldListener } from './types';

const EASE = 0.15; // lerp factor per rAF tick (~60 fps → ~1-2 frame lag)

export interface CursorFieldHandle {
  destroy(): void;
}

export function createPointerLoop(
  fieldRoot: HTMLElement,
  listeners: Set<CursorFieldListener>
): CursorFieldHandle {
  let rawX = 0;
  let rawY = 0;
  let x = 0;
  let y = 0;
  let raf = 0;

  const onMove = (e: PointerEvent) => {
    const rect = fieldRoot.getBoundingClientRect();
    rawX = e.clientX - rect.left;
    rawY = e.clientY - rect.top;
  };

  const tick = () => {
    x += (rawX - x) * EASE;
    y += (rawY - y) * EASE;
    listeners.forEach((fn) => fn(x, y));
    raf = requestAnimationFrame(tick);
  };

  // passive: true — no scroll jank, never calls preventDefault
  document.addEventListener('pointermove', onMove, { passive: true });
  raf = requestAnimationFrame(tick);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      // Don't clear listeners — owned by the provider
    },
  };
}
