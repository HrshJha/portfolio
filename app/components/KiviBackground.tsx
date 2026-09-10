'use client';

import React, { useEffect, useRef } from 'react';

export const WAVE_HEIGHTS = [
  0.242, 0.285, 0.293, 0.277, 0.265, 0.283, 0.330, 0.379, 0.398, 0.369,
  0.309, 0.252, 0.228, 0.238, 0.259, 0.260, 0.229, 0.186, 0.162, 0.183,
  0.242, 0.308, 0.346, 0.344, 0.318, 0.299, 0.310, 0.343, 0.368, 0.357,
  0.305, 0.236, 0.186, 0.179, 0.208, 0.242, 0.252, 0.233, 0.209, 0.210,
  0.251, 0.317, 0.373, 0.389, 0.362, 0.317, 0.287, 0.288,
];

export interface DitherArtProps {
  region: 'hero' | 'clearing' | 'meadow' | 'closing' | 'site';
  src?: string;
  position?: string;
  fit?: 'contain' | 'cover';
  restOpacity?: number;
  seam?: 'bottom' | 'top' | 'both' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export function DitherArt({
  region,
  src,
  position = '50% 50%',
  fit = 'contain',
  restOpacity = 0.16,
  seam = 'none',
  className = '',
  style = {},
}: DitherArtProps) {
  const defaultSrc = {
    hero: '/assets/art/dither/s4-nest.png',
    clearing: '/assets/art/dither/s2-clearing.png',
    meadow: '/assets/art/dither/s3-meadow.png',
    closing: '/assets/art/dither/s2-clearing.png',
    site: '/assets/art/dither/s4-nest.png',
  }[region];

  const artSrc = src || defaultSrc;

  // Seam configuration matching heykivi.ai
  let seamImage = 'linear-gradient(#000,#000)';
  let seamSize = '100% 100%';
  let seamPos = 'top left';
  let seamRepeat = 'no-repeat';

  if (seam === 'bottom') {
    seamImage = 'linear-gradient(to bottom, #000 0%, #000 calc(100% - 140px), transparent 100%)';
    seamSize = '100% 100%';
    seamPos = 'top left';
    seamRepeat = 'no-repeat';
  } else if (seam === 'top') {
    seamImage = 'linear-gradient(to bottom, transparent 0%, #000 140px, #000 100%)';
    seamSize = '100% 100%';
    seamPos = 'top left';
    seamRepeat = 'no-repeat';
  } else if (seam === 'both') {
    seamImage = 'linear-gradient(to bottom, transparent 0%, #000 140px, #000 calc(100% - 140px), transparent 100%)';
    seamSize = '100% 100%';
    seamPos = 'top left';
    seamRepeat = 'no-repeat';
  }

  const customStyle: React.CSSProperties = {
    ['--art-src' as any]: `url("${artSrc}")`,
    ['--art-fit' as any]: fit,
    ['--art-position' as any]: position,
    ['--art-rest' as any]: restOpacity,
    ['--art-overlap-top' as any]: '0px',
    ['--art-overlap-bottom' as any]: '0px',
    ['--lens-src' as any]: 'url("/assets/art/dither/mask-lens.png")',
    ['--lens-size' as any]: '600px 600px',
    ['--lens-radius' as any]: '300px',
    ['--seam-image' as any]: seamImage,
    ['--seam-size' as any]: seamSize,
    ['--seam-position' as any]: seamPos,
    ['--seam-repeat' as any]: seamRepeat,
    ...style,
  };

  return (
    <span
      className={`dither-art dither-art--fill ${className}`}
      data-dither-art
      data-art-region={region}
      data-art-natural="768,512"
      data-art-fit={fit}
      data-art-position={position}
      data-art-grid="2"
      style={customStyle}
      aria-hidden="true"
    >
      <span className="dither-art__seam">
        <span className="dither-art__rest" />
        <span className="dither-art__vivid" />
      </span>
    </span>
  );
}

export function HeroProximityWave() {
  return (
    <div className="hero-proximity-wave" data-proximity-wave aria-hidden="true">
      {WAVE_HEIGHTS.map((height, i) => (
        <span
          key={i}
          data-wave-height={height}
          style={{ ['--wave-height' as any]: height }}
        />
      ))}
    </div>
  );
}

export default function KiviBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --------------------------------------------------------------------------
    // 1. FOOTPRINT CANVAS ENGINE (Exact 1:1 replica of heykivi.ai)
    // --------------------------------------------------------------------------
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Load sprite
    const sprite = new Image();
    const stampCells: HTMLCanvasElement[] = [];
    let spriteReady = false;

    sprite.onload = () => {
      const sourceWidth = 48;
      const sourceHeight = 26;
      const fill = '#dcebc3'; // Dusk footprint tint
      for (let cell = 0; cell < 6; cell++) {
        const cellCanvas = document.createElement('canvas');
        cellCanvas.width = 48;
        cellCanvas.height = 26;
        const cellCtx = cellCanvas.getContext('2d');
        if (cellCtx) {
          cellCtx.drawImage(
            sprite,
            (cell % 3) * sourceWidth,
            Math.floor(cell / 3) * sourceHeight,
            sourceWidth,
            sourceHeight,
            0,
            0,
            48,
            26
          );
          cellCtx.globalCompositeOperation = 'source-in';
          cellCtx.fillStyle = fill;
          cellCtx.fillRect(0, 0, 48, 26);
          stampCells.push(cellCanvas);
        }
      }
      spriteReady = true;
    };
    sprite.src = '/assets/brand/kivi-footprints-144.png';

    interface Stamp {
      x: number;
      y: number;
      angle: number;
      born: number;
      cell: number;
      opacity: number;
    }

    const stamps: Stamp[] = [];
    let lastPoint: { x: number; y: number } | null = null;
    let pointerStampIndex = 0;
    let footprintFrame = 0;

    const drawStamps = (now: number) => {
      footprintFrame = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = stamps.length - 1; i >= 0; i--) {
        const stamp = stamps[i];
        const age = now - stamp.born;
        if (age > 1200) {
          stamps.splice(i, 1);
          continue;
        }
        const enter = Math.min(1, age / 90);
        const fade = age < 260 ? 1 : 1 - (age - 260) / 940;
        ctx.save();
        ctx.translate(stamp.x, stamp.y);
        ctx.rotate(stamp.angle);
        ctx.globalAlpha = stamp.opacity * enter * Math.max(0, fade);
        if (stampCells[stamp.cell]) {
          ctx.drawImage(stampCells[stamp.cell], -24, -13, 48, 26);
        }
        ctx.restore();
      }

      if (stamps.length > 0) {
        footprintFrame = requestAnimationFrame(drawStamps);
      }
    };

    const requestDraw = () => {
      if (!footprintFrame) footprintFrame = requestAnimationFrame(drawStamps);
    };

    const EXCLUDED = 'a, button, input, textarea, select';
    const isExcluded = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return false;
      return Boolean(el.closest(EXCLUDED));
    };

    // --------------------------------------------------------------------------
    // 2. DITHER ART VIBRANCY LENS ENGINE
    // --------------------------------------------------------------------------
    const LERP = 0.12;
    let targetX = -9999;
    let targetY = -9999;
    let lensX = targetX;
    let lensY = targetY;
    let lensArmed = false;
    let lensFrame = 0;
    let idleUntil = 0;

    const snap = (value: number, grid: number = 2) => Math.round(value / grid) * grid;

    const renderLens = () => {
      lensFrame = 0;
      lensX += (targetX - lensX) * LERP;
      lensY += (targetY - lensY) * LERP;

      const settled = Math.abs(targetX - lensX) < 0.4 && Math.abs(targetY - lensY) < 0.4;
      if (settled) {
        lensX = targetX;
        lensY = targetY;
      }

      const hosts = Array.from(document.querySelectorAll<HTMLElement>('[data-dither-art]'));
      const vh = window.innerHeight;

      for (const host of hosts) {
        const rect = host.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) continue;

        const localX = snap(lensX - rect.left, 2);
        const localY = snap(lensY - rect.top, 2);
        host.style.setProperty('--lens-x', `${localX}px`);
        host.style.setProperty('--lens-y', `${localY}px`);
      }

      // Proximity Wave Update
      const wave = document.querySelector<HTMLElement>('[data-proximity-wave]');
      if (wave) {
        const waveRect = wave.getBoundingClientRect();
        if (waveRect.top < vh && waveRect.bottom > 0) {
          const bars = Array.from(wave.querySelectorAll<HTMLElement>('[data-wave-height]'));
          const time = performance.now() * 0.001;
          const centerY = waveRect.top + waveRect.height / 2;

          bars.forEach((bar, idx) => {
            const barRect = bar.getBoundingClientRect();
            const barCenterX = barRect.left + barRect.width / 2;
            const firstSine = Math.sin(time * 0.64 + idx * 0.29) * 0.09;
            const secondSine = Math.sin(time * 0.37 + idx * 0.11 + 1.4) * 0.06;
            const dx = lensX - barCenterX;
            const dy = lensY - centerY;
            const pointerLift = 0.7 * Math.exp(-(dx * dx + dy * dy) / 12800);
            const base = WAVE_HEIGHTS[idx] || 0.28;
            const targetHeight = Math.max(0.18, Math.min(1.7, base * (1 + firstSine + secondSine) + pointerLift));
            bar.style.transform = `scaleY(${targetHeight.toFixed(3)})`;
          });
        }
      }

      if (!settled || performance.now() < idleUntil) {
        lensFrame = requestAnimationFrame(renderLens);
      }
    };

    const wakeLens = (tailMs = 220) => {
      if (!lensArmed) return;
      idleUntil = Math.max(idleUntil, performance.now() + tailMs);
      if (!lensFrame) lensFrame = requestAnimationFrame(renderLens);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      targetX = e.clientX;
      targetY = e.clientY;

      if (!lensArmed) {
        lensArmed = true;
        lensX = targetX;
        lensY = targetY;
        document.documentElement.classList.add('v19-lens');
      }
      wakeLens(220);

      // Footprints logic
      if (!spriteReady) return;
      if (isExcluded(e.clientX, e.clientY)) {
        lastPoint = null;
        return;
      }

      const point = { x: e.clientX, y: e.clientY };
      if (!lastPoint) {
        lastPoint = point;
        return;
      }

      const dx = point.x - lastPoint.x;
      const dy = point.y - lastPoint.y;
      if (Math.hypot(dx, dy) >= 52) {
        stamps.push({
          x: point.x,
          y: point.y,
          angle: Math.atan2(dy, dx),
          born: performance.now(),
          cell: (pointerStampIndex % 2) * 3 + (Math.floor(pointerStampIndex / 2) % 3),
          opacity: 0.24,
        });
        pointerStampIndex++;
        if (stamps.length > 8) stamps.shift();
        lastPoint = point;
        requestDraw();
      }
    };

    const handleScroll = () => wakeLens(220);
    const handleMouseLeave = () => {
      lensArmed = false;
      document.documentElement.classList.remove('v19-lens');
      if (lensFrame) cancelAnimationFrame(lensFrame);
      lensFrame = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      if (footprintFrame) cancelAnimationFrame(footprintFrame);
      if (lensFrame) cancelAnimationFrame(lensFrame);
    };
  }, []);

  return (
    <>
      {/* 1:1 heykivi.ai Kiwi Footprints Canvas */}
      <canvas
        ref={canvasRef}
        className="v19-footprints"
        data-v19-footprints
        aria-hidden="true"
      />
      {/* 1:1 heykivi.ai Grain overlay */}
      <div className="v19-grain" aria-hidden="true" />
    </>
  );
}
