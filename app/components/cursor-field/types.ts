// Shared type definitions for the cursor-reactive floral system.

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number; // degrees
  spawnedAt: number; // performance.now() timestamp
  glyphIndex: number; // index into GLYPH_PATHS
  size: number; // px
}

export interface PointerState {
  x: number;
  y: number;
}

export type CursorFieldListener = (x: number, y: number) => void;

export interface CursorFieldLoop {
  subscribe(fn: CursorFieldListener): () => void;
  destroy(): void;
}
