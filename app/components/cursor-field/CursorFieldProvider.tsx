'use client';

/**
 * CursorFieldProvider — owns a stable listeners Set and mounts one
 * pointer loop. Children subscribe to the shared Set via useCursorField().
 *
 * The provider renders NO wrapper div of its own. Instead it expects the
 * caller to pass a `fieldRootRef` — the DOM element that serves as the
 * coordinate origin. This avoids inserting extra divs that break existing
 * CSS layout rules (grid/flex children, width constraints, etc.).
 *
 * Children's useEffect calls subscribe() before the parent's useEffect
 * creates the loop — that's fine because the loop iterates the live Set
 * each tick, picking up any pre-registered listeners automatically.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { createPointerLoop } from './useSmoothedPointer';
import type { CursorFieldListener } from './types';

interface CursorFieldCtx {
  /** Register a listener; returns cleanup. Safe to call before loop starts. */
  subscribe: (fn: CursorFieldListener) => () => void;
  /** Ref to the DOM element used as coordinate origin. */
  fieldRootRef: MutableRefObject<HTMLElement | null>;
}

const CursorFieldContext = createContext<CursorFieldCtx | null>(null);

interface Props {
  children: ReactNode;
  /** The DOM element that defines the coordinate origin for pointer events. */
  fieldRootRef: MutableRefObject<HTMLElement | null>;
}

export function CursorFieldProvider({ children, fieldRootRef }: Props) {
  // Stable shared Set — loop iterates this live; children add/remove directly.
  const listenersRef = useRef<Set<CursorFieldListener>>(new Set());

  useEffect(() => {
    const el = fieldRootRef.current;
    if (!el) return;
    const handle = createPointerLoop(el, listenersRef.current);
    return () => {
      handle.destroy();
    };
  }, [fieldRootRef]);

  const subscribe = useCallback((fn: CursorFieldListener): (() => void) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  return (
    <CursorFieldContext.Provider value={{ subscribe, fieldRootRef }}>
      {children}
    </CursorFieldContext.Provider>
  );
}

export function useCursorField(): CursorFieldCtx {
  const ctx = useContext(CursorFieldContext);
  if (!ctx) {
    throw new Error('useCursorField must be used inside <CursorFieldProvider>');
  }
  return ctx;
}
