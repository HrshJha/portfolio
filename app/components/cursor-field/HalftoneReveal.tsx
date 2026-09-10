'use client';

/**
 * HalftoneReveal — Effect A.
 *
 * Portals an absolutely-positioned div directly into the section element
 * (fieldRootRef from context) so there's no wrapper div disrupting CSS
 * layout. The section must have position: relative + overflow: hidden.
 *
 * Subscribes to the shared listeners Set from CursorFieldProvider.
 * Writes --mx / --my CSS vars directly to the element's style each rAF
 * tick — zero React re-renders. The CSS radial-gradient mask follows.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './cursor-field.module.css';
import { useCursorField } from './CursorFieldProvider';

// ── Inline SVG halftone floral pattern ───────────────────────────────────
const FLORAL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <g fill="#C9D8B8" fill-opacity="1">
    <!-- Clover cluster 1 — top left -->
    <circle cx="18" cy="12" r="3.2"/>
    <circle cx="24" cy="8"  r="2.5"/>
    <circle cx="28" cy="14" r="2.8"/>
    <circle cx="21" cy="18" r="2.2"/>
    <circle cx="15" cy="17" r="1.8"/>
    <circle cx="25" cy="20" r="1.5"/>
    <!-- Petal cluster 2 -->
    <circle cx="74" cy="6"  r="2.8"/>
    <circle cx="80" cy="10" r="3.0"/>
    <circle cx="78" cy="16" r="2.3"/>
    <circle cx="72" cy="14" r="2.0"/>
    <circle cx="68" cy="10" r="1.7"/>
    <circle cx="82" cy="4"  r="1.5"/>
    <!-- Leaf scatter — center top -->
    <ellipse cx="130" cy="10" rx="3.5" ry="2.0" transform="rotate(-20 130 10)"/>
    <ellipse cx="138" cy="15" rx="3.0" ry="1.8" transform="rotate(15 138 15)"/>
    <circle  cx="133" cy="20" r="1.8"/>
    <circle  cx="126" cy="18" r="1.5"/>
    <circle  cx="142" cy="9"  r="1.3"/>
    <!-- Mushroom-dot cluster — far right top -->
    <circle cx="190" cy="18" r="3.5"/>
    <circle cx="198" cy="14" r="2.8"/>
    <circle cx="196" cy="22" r="2.2"/>
    <circle cx="186" cy="22" r="1.9"/>
    <circle cx="192" cy="26" r="1.6"/>
    <circle cx="201" cy="22" r="1.4"/>
    <!-- Mid-left organic quad -->
    <circle cx="10" cy="68"  r="2.5"/>
    <circle cx="16" cy="63"  r="3.0"/>
    <circle cx="22" cy="68"  r="2.7"/>
    <circle cx="18" cy="74"  r="2.2"/>
    <circle cx="11" cy="75"  r="1.8"/>
    <circle cx="24" cy="74"  r="1.5"/>
    <!-- Center-ish scatter -->
    <circle cx="100" cy="55" r="2.2"/>
    <circle cx="108" cy="50" r="3.0"/>
    <circle cx="115" cy="56" r="2.5"/>
    <circle cx="110" cy="63" r="2.0"/>
    <circle cx="102" cy="62" r="1.7"/>
    <circle cx="118" cy="62" r="1.4"/>
    <circle cx="96"  cy="58" r="1.3"/>
    <!-- Right middle petal burst -->
    <circle cx="178" cy="62" r="2.8"/>
    <circle cx="185" cy="56" r="2.5"/>
    <circle cx="191" cy="62" r="3.2"/>
    <circle cx="187" cy="70" r="2.3"/>
    <circle cx="179" cy="70" r="2.0"/>
    <circle cx="194" cy="68" r="1.6"/>
    <circle cx="182" cy="50" r="1.4"/>
    <!-- Lower left clover -->
    <circle cx="20"  cy="128" r="3.0"/>
    <circle cx="28"  cy="122" r="2.8"/>
    <circle cx="34"  cy="128" r="2.5"/>
    <circle cx="30"  cy="135" r="2.2"/>
    <circle cx="22"  cy="135" r="1.9"/>
    <circle cx="36"  cy="135" r="1.5"/>
    <circle cx="15"  cy="122" r="1.4"/>
    <!-- Lower center leaf pair -->
    <ellipse cx="96"  cy="118" rx="3.2" ry="1.8" transform="rotate(30 96 118)"/>
    <ellipse cx="106" cy="112" rx="3.0" ry="1.7" transform="rotate(-15 106 112)"/>
    <circle  cx="110" cy="120" r="2.0"/>
    <circle  cx="100" cy="124" r="1.8"/>
    <circle  cx="92"  cy="112" r="1.5"/>
    <!-- Lower right scatter -->
    <circle cx="172" cy="122" r="2.5"/>
    <circle cx="180" cy="116" r="3.0"/>
    <circle cx="188" cy="122" r="2.7"/>
    <circle cx="184" cy="130" r="2.2"/>
    <circle cx="175" cy="130" r="1.9"/>
    <circle cx="190" cy="130" r="1.4"/>
    <!-- Bottom left -->
    <circle cx="12"  cy="185" r="2.8"/>
    <circle cx="20"  cy="180" r="3.2"/>
    <circle cx="27"  cy="186" r="2.5"/>
    <circle cx="23"  cy="193" r="2.0"/>
    <circle cx="15"  cy="193" r="1.7"/>
    <circle cx="29"  cy="193" r="1.4"/>
    <!-- Bottom center -->
    <circle cx="98"  cy="180" r="2.5"/>
    <circle cx="107" cy="175" r="3.0"/>
    <circle cx="115" cy="181" r="2.7"/>
    <circle cx="111" cy="188" r="2.2"/>
    <circle cx="102" cy="188" r="1.9"/>
    <circle cx="118" cy="188" r="1.5"/>
    <circle cx="94"  cy="175" r="1.4"/>
    <!-- Bottom right -->
    <circle cx="180" cy="183" r="3.0"/>
    <circle cx="188" cy="178" r="2.8"/>
    <circle cx="195" cy="184" r="2.5"/>
    <circle cx="192" cy="191" r="2.0"/>
    <circle cx="183" cy="192" r="1.8"/>
    <circle cx="198" cy="191" r="1.4"/>
    <!-- Lone accent dots -->
    <circle cx="50"  cy="40"  r="1.2"/>
    <circle cx="148" cy="38"  r="1.0"/>
    <circle cx="58"  cy="98"  r="1.3"/>
    <circle cx="154" cy="90"  r="1.1"/>
    <circle cx="46"  cy="155" r="1.2"/>
    <circle cx="152" cy="150" r="1.0"/>
    <circle cx="60"  cy="205" r="1.1"/>
    <circle cx="145" cy="208" r="1.3"/>
    <circle cx="210" cy="50"  r="1.2"/>
    <circle cx="210" cy="145" r="1.0"/>
  </g>
</svg>`;

function svgToDataUri(svg: string): string {
  return (
    'data:image/svg+xml,' +
    svg
      .replace(/\n\s*/g, ' ')
      .replace(/#/g, '%23')
      .replace(/"/g, "'")
  );
}

const PATTERN_URI = svgToDataUri(FLORAL_SVG);

// ── Component ────────────────────────────────────────────────────────────

export function HalftoneReveal() {
  const layerRef = useRef<HTMLDivElement>(null);
  const { subscribe, fieldRootRef } = useCursorField();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // Write CSS vars directly — zero React re-renders, runs every rAF tick.
    const unsubscribe = subscribe((x, y) => {
      layer.style.setProperty('--mx', `${x}px`);
      layer.style.setProperty('--my', `${y}px`);
    });

    return unsubscribe;
  }, [subscribe]);

  if (!mounted || !fieldRootRef.current) return null;

  return createPortal(
    <div
      ref={layerRef}
      className={styles.halftoneLayer}
      style={{ backgroundImage: `url("${PATTERN_URI}")` }}
      aria-hidden="true"
    />,
    fieldRootRef.current
  );
}
