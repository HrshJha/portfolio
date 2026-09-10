// Shared pointer field.
//
// The single source of truth for the raw cursor position is KiviBackground's
// global `pointermove` listener. It writes the latest coordinates here so other
// decorative layers (e.g. CursorOwl) can subscribe WITHOUT registering a second
// global pointermove listener of their own.
export interface PointerField {
  /** Latest raw client X of the cursor (viewport coordinates). */
  x: number;
  /** Latest raw client Y of the cursor (viewport coordinates). */
  y: number;
  /** True while a fine pointer is present/moving over the page. */
  active: boolean;
}

export const pointerField: PointerField = {
  x: -9999,
  y: -9999,
  active: false,
};
