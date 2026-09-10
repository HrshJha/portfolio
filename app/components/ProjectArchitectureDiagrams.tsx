'use client';

import React from 'react';

/**
 * Responsive, pixel-perfect SVG architecture diagrams for the 3 flagship projects.
 * Guaranteed 100% visible at all breakpoints with responsive viewBox scaling.
 */

export function FrameOSPipeline() {
  return (
    <svg
      viewBox="0 0 680 880"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="portfolio-architecture-svg"
      aria-hidden="true"
    >
      <defs>
        {/* Background Gradients */}
        <radialGradient id="frameos-bg-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#d9854c" stopOpacity="0.09" />
          <stop offset="60%" stopColor="#d9854c" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="frameos-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#181a17" />
          <stop offset="100%" stopColor="#0e100d" />
        </linearGradient>

        <linearGradient id="frameos-engine-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2b2118" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1b1612" stopOpacity="0.9" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="frameos-orange-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Grid pattern */}
        <pattern id="frameos-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(242, 240, 233, 0.04)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Outer Card Background */}
      <rect width="680" height="880" rx="22" fill="url(#frameos-card-bg)" stroke="rgba(242, 240, 233, 0.12)" strokeWidth="1" />
      <rect width="680" height="880" rx="22" fill="url(#frameos-bg-glow)" />
      <rect width="680" height="880" rx="22" fill="url(#frameos-grid)" />

      {/* ── HEADER ── */}
      <g className="frameos-header">
        <text x="28" y="38" fill="#9aa095" fontSize="12" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.14em">
          FRAMEOS / MEDIA LOOP
        </text>
        
        {/* Live indicator badge */}
        <g transform="translate(528, 24)">
          <circle cx="8" cy="12" r="4" fill="#d9854c" filter="url(#frameos-orange-glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="20" y="16" fill="#dce0d6" fontSize="11" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.12em">
            LIVE PIPELINE
          </text>
        </g>

        {/* Divider */}
        <line x1="28" y1="52" x2="652" y2="52" stroke="rgba(242, 240, 233, 0.1)" strokeWidth="1" />
      </g>

      {/* ── STAGE 1: TREND ── */}
      <g className="frameos-node">
        <rect x="54" y="72" width="572" height="46" rx="10" fill="#181a16" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1.1" />
        <text x="80" y="101" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">TREND</text>
        <text x="602" y="101" textAnchor="end" fill="#9aa095" fontSize="11" fontWeight="600" letterSpacing="0.1em">DISCOVER</text>
      </g>

      {/* Connector 1 */}
      <line x1="340" y1="118" x2="340" y2="162" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,157 340,163 345,157" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="118" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="118;162" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 2: RESEARCH ── */}
      <g className="frameos-node">
        <rect x="54" y="162" width="572" height="46" rx="10" fill="#181a16" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1.1" />
        <text x="80" y="191" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">RESEARCH</text>
        <text x="602" y="191" textAnchor="end" fill="#9aa095" fontSize="11" fontWeight="600" letterSpacing="0.1em">EXTRACT + SYNTHESIZE</text>
      </g>

      {/* Connector 2 */}
      <line x1="340" y1="208" x2="340" y2="252" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,247 340,253 345,247" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="208" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="208;252" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 3: SCRIPT ── */}
      <g className="frameos-node">
        <rect x="54" y="252" width="572" height="46" rx="10" fill="#181a16" stroke="rgba(217, 133, 76, 0.75)" strokeWidth="1.2" />
        <text x="80" y="281" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">SCRIPT</text>
        <text x="602" y="281" textAnchor="end" fill="#d9854c" fontSize="11" fontWeight="600" letterSpacing="0.1em">GENERATE</text>
      </g>

      {/* Connector 3 */}
      <line x1="340" y1="298" x2="340" y2="344" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,339 340,345 345,339" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="298" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="298;344" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 4: CONTENT ENGINE (Branch Box) ── */}
      <g className="frameos-content-engine">
        <rect x="54" y="344" width="572" height="116" rx="12" fill="url(#frameos-engine-bg)" stroke="rgba(217, 133, 76, 0.85)" strokeWidth="1.3" />
        
        {/* Engine Header */}
        <text x="80" y="372" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">CONTENT ENGINE</text>
        <text x="602" y="372" textAnchor="end" fill="#d9854c" fontSize="10.5" fontWeight="600" letterSpacing="0.09em">ASSEMBLE / GENERATE</text>

        {/* 3 Sub-Boxes: Voice, Visuals, Assembly */}
        {/* Branch 1: Voice */}
        <rect x="74" y="390" width="160" height="48" rx="8" fill="#141613" stroke="rgba(242, 240, 233, 0.24)" strokeWidth="1" />
        <text x="154" y="420" textAnchor="middle" fill="#dce0d6" fontSize="11.5" fontWeight="600" letterSpacing="0.08em">VOICE</text>
        <path d="M 340 376 L 154 390" stroke="rgba(217, 133, 76, 0.45)" strokeWidth="1.1" strokeDasharray="3 2" />

        {/* Branch 2: Visuals */}
        <rect x="260" y="390" width="160" height="48" rx="8" fill="#141613" stroke="rgba(242, 240, 233, 0.24)" strokeWidth="1" />
        <text x="340" y="420" textAnchor="middle" fill="#dce0d6" fontSize="11.5" fontWeight="600" letterSpacing="0.08em">VISUALS</text>
        <path d="M 340 376 L 340 390" stroke="rgba(217, 133, 76, 0.7)" strokeWidth="1.1" />

        {/* Branch 3: Assembly */}
        <rect x="446" y="390" width="160" height="48" rx="8" fill="#141613" stroke="rgba(242, 240, 233, 0.24)" strokeWidth="1" />
        <text x="526" y="420" textAnchor="middle" fill="#dce0d6" fontSize="11.5" fontWeight="600" letterSpacing="0.08em">ASSEMBLY</text>
        <path d="M 340 376 L 526 390" stroke="rgba(217, 133, 76, 0.45)" strokeWidth="1.1" strokeDasharray="3 2" />
      </g>

      {/* Connector 4 */}
      <line x1="340" y1="460" x2="340" y2="506" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,501 340,507 345,501" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="460" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="460;506" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 5: RENDER ── */}
      <g className="frameos-node">
        <rect x="54" y="506" width="572" height="46" rx="10" fill="#181a16" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1.1" />
        <text x="80" y="535" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">RENDER</text>
        <text x="602" y="535" textAnchor="end" fill="#9aa095" fontSize="11" fontWeight="600" letterSpacing="0.1em">PRODUCE</text>
      </g>

      {/* Connector 5 */}
      <line x1="340" y1="552" x2="340" y2="598" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,593 340,599 345,593" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="552" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="552;598" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 6: DISTRIBUTE ── */}
      <g className="frameos-node">
        <rect x="54" y="598" width="572" height="46" rx="10" fill="#181a16" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1.1" />
        <text x="80" y="627" fill="#f2f0e9" fontSize="14" fontWeight="700" letterSpacing="0.08em">DISTRIBUTE</text>
        <text x="602" y="627" textAnchor="end" fill="#9aa095" fontSize="11" fontWeight="600" letterSpacing="0.1em">PUBLISH</text>
      </g>

      {/* Connector 6 */}
      <line x1="340" y1="644" x2="340" y2="690" stroke="rgba(242, 240, 233, 0.35)" strokeWidth="1.3" />
      <polygon points="335,685 340,691 345,685" fill="rgba(242, 240, 233, 0.7)" />
      <circle cx="340" cy="644" r="3.5" fill="#d9854c" filter="url(#frameos-orange-glow)">
        <animate attributeName="cy" values="644;690" dur="1.8s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.8s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 7: ANALYTICS & FEEDBACK ── */}
      <g className="frameos-feedback-row">
        {/* Analytics Box */}
        <rect x="54" y="690" width="276" height="58" rx="10" fill="#181a16" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1.1" />
        <text x="78" y="717" fill="#f2f0e9" fontSize="13" fontWeight="700" letterSpacing="0.08em">ANALYTICS</text>
        <text x="78" y="736" fill="#9aa095" fontSize="10.5" fontWeight="600" letterSpacing="0.08em">MEASURE</text>

        {/* Feedback Box */}
        <rect x="350" y="690" width="276" height="58" rx="10" fill="#1b1814" stroke="rgba(217, 133, 76, 0.9)" strokeWidth="1.3" />
        <text x="374" y="717" fill="#f2f0e9" fontSize="13" fontWeight="700" letterSpacing="0.08em">FEEDBACK</text>
        <text x="374" y="736" fill="#d9854c" fontSize="10.5" fontWeight="600" letterSpacing="0.08em">LEARN</text>
      </g>

      {/* ── FEEDBACK LOOP (Complete and 100% visible) ── */}
      <g className="frameos-loop">
        {/* Loop Path from Feedback around to Trend */}
        <path
          d="M 488 748 V 772 C 488 786, 476 792, 456 792 H 42 C 26 792, 18 782, 18 764 V 104 C 18 84, 28 76, 46 76 H 52"
          fill="none"
          stroke="rgba(217, 133, 76, 0.8)"
          strokeWidth="1.3"
          strokeDasharray="5 3"
        />
        <polygon points="52,73 58,76 52,79" fill="#d9854c" />

        {/* Loop Label */}
        <text x="340" y="818" textAnchor="middle" fill="#d9854c" fontSize="11.5" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.1em">
          ↺ FEEDBACK LOOP / BACK TO TREND DETECTION
        </text>
      </g>

      {/* ── FOOTER ── */}
      <g className="frameos-footer">
        <line x1="28" y1="846" x2="652" y2="846" stroke="rgba(242, 240, 233, 0.1)" strokeWidth="1" />
        <text x="28" y="868" fill="#9aa095" fontSize="10.5" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.1em">
          AUTONOMOUS MEDIA LOOP
        </text>
        <text x="652" y="868" textAnchor="end" fill="#d9854c" fontSize="10.5" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.08em">
          TREND → RESEARCH → CREATE → DISTRIBUTE → LEARN
        </text>
      </g>
    </svg>
  );
}

export function VeraPipeline() {
  return (
    <svg
      viewBox="0 0 540 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="portfolio-architecture-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="vera-bg-glow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#79a4d5" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#79a4d5" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="vera-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#161917" />
          <stop offset="100%" stopColor="#0d0f0e" />
        </linearGradient>

        <filter id="vera-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <pattern id="vera-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(242, 240, 233, 0.035)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Card Background */}
      <rect width="540" height="320" rx="16" fill="url(#vera-card-bg)" stroke="rgba(242, 240, 233, 0.12)" strokeWidth="1" />
      <rect width="540" height="320" rx="16" fill="url(#vera-bg-glow)" />
      <rect width="540" height="320" rx="16" fill="url(#vera-grid)" />

      {/* ── HEADER ── */}
      <g className="vera-header">
        <text x="24" y="28" fill="#8a8f85" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.12em">
          VERA / MERCHANT GROWTH ENGINE
        </text>
        <text x="516" y="28" textAnchor="end" fill="#8a8f85" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.09em">
          DECISION → MESSAGE → VERIFY
        </text>
        <line x1="24" y1="38" x2="516" y2="38" stroke="rgba(242, 240, 233, 0.08)" strokeWidth="1" />
      </g>

      {/* ── 3-COLUMN ARCHITECTURE ── */}

      {/* COLUMN 1: Inputs */}
      <g className="vera-inputs">
        <rect x="22" y="56" width="94" height="25" rx="6" fill="#141715" stroke="rgba(242, 240, 233, 0.22)" strokeWidth="1" />
        <text x="69" y="72" textAnchor="middle" fill="#8a8f85" fontSize="8" fontWeight="600" letterSpacing="0.08em">TRIGGER</text>
        <line x1="116" y1="68" x2="132" y2="68" stroke="rgba(242, 240, 233, 0.3)" strokeWidth="1" />

        <rect x="22" y="90" width="94" height="25" rx="6" fill="#141715" stroke="rgba(242, 240, 233, 0.22)" strokeWidth="1" />
        <text x="69" y="106" textAnchor="middle" fill="#8a8f85" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">MERCHANT CONTEXT</text>
        <line x1="116" y1="102" x2="132" y2="82" stroke="rgba(242, 240, 233, 0.3)" strokeWidth="1" />

        <rect x="22" y="124" width="94" height="25" rx="6" fill="#141715" stroke="rgba(242, 240, 233, 0.22)" strokeWidth="1" />
        <text x="69" y="140" textAnchor="middle" fill="#8a8f85" fontSize="7.5" fontWeight="600" letterSpacing="0.06em">TIME + HISTORY</text>
        <line x1="116" y1="136" x2="132" y2="92" stroke="rgba(242, 240, 233, 0.3)" strokeWidth="1" />
      </g>

      {/* COLUMN 2: Main Pipeline */}
      <g className="vera-pipeline-main">
        {/* Node 1: Decision Engine */}
        <rect x="134" y="48" width="272" height="52" rx="8" fill="#1d1914" stroke="rgba(217, 133, 76, 0.75)" strokeWidth="1" />
        <text x="146" y="66" fill="#f2f0e9" fontSize="11" fontWeight="600" letterSpacing="0.07em">DECISION ENGINE</text>
        <text x="146" y="78" fill="#8a8f85" fontSize="7.5" letterSpacing="0.05em">7 HARD GATES · 10-FACTOR PRIORITY</text>

        {/* Gate Tags */}
        <g transform="translate(146, 84)">
          <rect x="0" y="0" width="36" height="12" rx="3" fill="#12100d" stroke="rgba(217, 133, 76, 0.4)" strokeWidth="0.8" />
          <text x="18" y="9" textAnchor="middle" fill="#d9854c" fontSize="6.5" fontWeight="600">TIME</text>

          <rect x="40" y="0" width="42" height="12" rx="3" fill="#12100d" stroke="rgba(217, 133, 76, 0.4)" strokeWidth="0.8" />
          <text x="61" y="9" textAnchor="middle" fill="#d9854c" fontSize="6.5" fontWeight="600">DEDUP</text>

          <rect x="86" y="0" width="62" height="12" rx="3" fill="#12100d" stroke="rgba(217, 133, 76, 0.4)" strokeWidth="0.8" />
          <text x="117" y="9" textAnchor="middle" fill="#d9854c" fontSize="6.5" fontWeight="600">AUTO-REPLY</text>

          <rect x="152" y="0" width="56" height="12" rx="3" fill="#12100d" stroke="rgba(217, 133, 76, 0.4)" strokeWidth="0.8" />
          <text x="180" y="9" textAnchor="middle" fill="#d9854c" fontSize="6.5" fontWeight="600">SUPPRESS</text>
        </g>

        {/* Connector 1 */}
        <line x1="270" y1="100" x2="270" y2="110" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
        <polygon points="267.5,108 270,111 272.5,108" fill="rgba(242, 240, 233, 0.5)" />
        <circle cx="270" cy="100" r="2.5" fill="#79a4d5" filter="url(#vera-blue-glow)">
          <animate attributeName="cy" values="100;110" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Node 2: Fact Packet */}
        <rect x="134" y="110" width="272" height="34" rx="8" fill="#151816" stroke="rgba(242, 240, 233, 0.25)" strokeWidth="1" />
        <text x="146" y="125" fill="#f2f0e9" fontSize="10.5" fontWeight="600" letterSpacing="0.06em">FACT PACKET</text>
        <text x="146" y="137" fill="#8a8f85" fontSize="7.5" letterSpacing="0.05em">GROUNDED + PROVENANCE TAGGED</text>

        {/* Connector 2 */}
        <line x1="270" y1="144" x2="270" y2="154" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
        <polygon points="267.5,152 270,155 272.5,152" fill="rgba(242, 240, 233, 0.5)" />
        <circle cx="270" cy="144" r="2.5" fill="#79a4d5" filter="url(#vera-blue-glow)">
          <animate attributeName="cy" values="144;154" dur="1.6s" begin="0.35s" repeatCount="indefinite" />
        </circle>

        {/* Node 3: Message Composer */}
        <rect x="134" y="154" width="272" height="34" rx="8" fill="#141920" stroke="rgba(121, 156, 203, 0.68)" strokeWidth="1" />
        <text x="146" y="169" fill="#f2f0e9" fontSize="10.5" fontWeight="600" letterSpacing="0.06em">MESSAGE COMPOSER</text>
        <text x="146" y="181" fill="#79a4d5" fontSize="7.5" letterSpacing="0.05em">GEMINI FLASH · WHATSAPP DRAFT</text>

        {/* Connector 3 */}
        <line x1="270" y1="188" x2="270" y2="198" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
        <polygon points="267.5,196 270,199 272.5,196" fill="rgba(242, 240, 233, 0.5)" />
        <circle cx="270" cy="188" r="2.5" fill="#60b59b" filter="url(#vera-blue-glow)">
          <animate attributeName="cy" values="188;198" dur="1.6s" begin="0.7s" repeatCount="indefinite" />
        </circle>

        {/* Node 4: Output Validator */}
        <rect x="134" y="198" width="272" height="52" rx="8" fill="#131b17" stroke="rgba(96, 181, 155, 0.72)" strokeWidth="1" />
        <text x="146" y="216" fill="#f2f0e9" fontSize="11" fontWeight="600" letterSpacing="0.07em">OUTPUT VALIDATOR</text>
        <text x="146" y="228" fill="#8a8f85" fontSize="7.5" letterSpacing="0.05em">GROUNDING · SAFETY · SINGLE CTA</text>

        {/* Validator Tags */}
        <g transform="translate(146, 233)">
          <rect x="0" y="0" width="56" height="12" rx="3" fill="#0d1411" stroke="rgba(96, 181, 155, 0.45)" strokeWidth="0.8" />
          <text x="28" y="9" textAnchor="middle" fill="#76c0a6" fontSize="6.5" fontWeight="600">FACT CHECK</text>

          <rect x="60" y="0" width="36" height="12" rx="3" fill="#0d1411" stroke="rgba(96, 181, 155, 0.45)" strokeWidth="0.8" />
          <text x="78" y="9" textAnchor="middle" fill="#76c0a6" fontSize="6.5" fontWeight="600">TONE</text>

          <rect x="100" y="0" width="32" height="12" rx="3" fill="#0d1411" stroke="rgba(96, 181, 155, 0.45)" strokeWidth="0.8" />
          <text x="116" y="9" textAnchor="middle" fill="#76c0a6" fontSize="6.5" fontWeight="600">CTA</text>
        </g>
      </g>

      {/* COLUMN 3: Key Pool */}
      <g className="vera-key-pool">
        <rect x="418" y="138" width="98" height="66" rx="8" fill="#13181f" stroke="rgba(121, 156, 203, 0.55)" strokeWidth="1" />
        <text x="467" y="158" textAnchor="middle" fill="#79a4d5" fontSize="9.5" fontWeight="600" letterSpacing="0.08em">KEY POOL</text>
        <text x="467" y="174" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.06em">AUTO-ROTATE</text>
        <text x="467" y="186" textAnchor="middle" fill="#8a8f85" fontSize="6.8" letterSpacing="0.05em">COOLDOWN + FAILOVER</text>

        {/* Connector from Key Pool to Composer */}
        <path d="M 418 171 L 406 171" stroke="rgba(121, 156, 203, 0.5)" strokeWidth="1" strokeDasharray="2 2" />
        <polygon points="408,169 406,171 408,173" fill="#79a4d5" />
      </g>

      {/* ── FOOTER ── */}
      <g className="vera-footer">
        <line x1="24" y1="272" x2="516" y2="272" stroke="rgba(242, 240, 233, 0.08)" strokeWidth="1" />
        <text x="270" y="295" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.08em">
          <tspan fill="#c5c9be">THE DETERMINISTIC SYSTEM DECIDES. </tspan>
          <tspan fill="#79a4d5">THE LLM WRITES.</tspan>
        </text>
      </g>
    </svg>
  );
}

export function HallucinationPipeline() {
  return (
    <svg
      viewBox="0 0 540 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="portfolio-architecture-svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hh-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#688bc2" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#688bc2" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hh-card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#15171a" />
          <stop offset="100%" stopColor="#0d0f11" />
        </linearGradient>

        <filter id="hh-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <pattern id="hh-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(242, 240, 233, 0.035)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Card Background */}
      <rect width="540" height="320" rx="16" fill="url(#hh-card-bg)" stroke="rgba(242, 240, 233, 0.12)" strokeWidth="1" />
      <rect width="540" height="320" rx="16" fill="url(#hh-bg-glow)" />
      <rect width="540" height="320" rx="16" fill="url(#hh-grid)" />

      {/* ── HEADER ── */}
      <g className="hh-header">
        <text x="24" y="28" fill="#8a8f85" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.12em">
          HALLUCINATION HUNTER / CLAIM VERIFICATION
        </text>
        <text x="516" y="28" textAnchor="end" fill="#8a8f85" fontSize="9" fontFamily="var(--font-mono, monospace)" fontWeight="600" letterSpacing="0.09em">
          NLI + EMBEDDINGS
        </text>
        <line x1="24" y1="38" x2="516" y2="38" stroke="rgba(242, 240, 233, 0.08)" strokeWidth="1" />
      </g>

      {/* ── PIPELINE FLOW ── */}

      {/* Stage 1: Input Text */}
      <rect x="120" y="46" width="300" height="30" rx="7" fill="#15171a" stroke="rgba(242, 240, 233, 0.26)" strokeWidth="1" />
      <text x="270" y="60" textAnchor="middle" fill="#f2f0e9" fontSize="10" fontWeight="600" letterSpacing="0.07em">INPUT TEXT</text>
      <text x="270" y="70" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.06em">ANSWER + SOURCE DOCUMENTS</text>

      {/* Connector 1 */}
      <line x1="270" y1="76" x2="270" y2="86" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
      <polygon points="267.5,84 270,87 272.5,84" fill="rgba(242, 240, 233, 0.5)" />
      <circle cx="270" cy="76" r="2.5" fill="#79a4d5" filter="url(#hh-blue-glow)">
        <animate attributeName="cy" values="76;86" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Stage 2: Claim Extraction */}
      <rect x="120" y="86" width="300" height="30" rx="7" fill="#15171a" stroke="rgba(242, 240, 233, 0.26)" strokeWidth="1" />
      <text x="270" y="100" textAnchor="middle" fill="#f2f0e9" fontSize="10" fontWeight="600" letterSpacing="0.07em">CLAIM EXTRACTION</text>
      <text x="270" y="110" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.06em">SPLIT RESPONSE INTO ATOMIC CLAIMS</text>

      {/* Split Connectors */}
      <path d="M 270 116 L 270 126 L 140 126 L 140 140" fill="none" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
      <polygon points="137.5,138 140,141 142.5,138" fill="rgba(242, 240, 233, 0.5)" />

      <path d="M 270 116 L 270 126 L 400 126 L 400 140" fill="none" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
      <polygon points="397.5,138 400,141 402.5,138" fill="rgba(242, 240, 233, 0.5)" />

      {/* ── PARALLEL BRANCHES ── */}

      {/* Left Branch: Embedding Layer */}
      <g className="hh-branch-embedding">
        <text x="140" y="136" textAnchor="middle" fill="#8a8f85" fontSize="7.5" fontWeight="600" letterSpacing="0.08em">EMBEDDING LAYER</text>

        {/* Box 1: Semantic Search */}
        <rect x="32" y="142" width="216" height="32" rx="7" fill="#14181f" stroke="rgba(121, 164, 213, 0.68)" strokeWidth="1" />
        <text x="140" y="156" textAnchor="middle" fill="#f2f0e9" fontSize="9.5" fontWeight="600" letterSpacing="0.06em">SEMANTIC SEARCH</text>
        <text x="140" y="167" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.05em">SENTENCE-TRANSFORMERS</text>

        {/* Branch Connector */}
        <line x1="140" y1="174" x2="140" y2="184" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
        <polygon points="137.5,182 140,185 142.5,182" fill="rgba(242, 240, 233, 0.5)" />

        {/* Box 2: Claim <-> Evidence */}
        <rect x="32" y="184" width="216" height="32" rx="7" fill="#14181f" stroke="rgba(242, 240, 233, 0.24)" strokeWidth="1" />
        <text x="140" y="198" textAnchor="middle" fill="#f2f0e9" fontSize="9.5" fontWeight="600" letterSpacing="0.06em">CLAIM ↔ EVIDENCE</text>
        <text x="140" y="209" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.05em">SIMILARITY PAIRS</text>
      </g>

      {/* Right Branch: NLI Verification Layer */}
      <g className="hh-branch-nli">
        <text x="400" y="136" textAnchor="middle" fill="#8a8f85" fontSize="7.5" fontWeight="600" letterSpacing="0.08em">NLI VERIFICATION LAYER</text>

        {/* Box 1: Cross-Encoder */}
        <rect x="292" y="142" width="216" height="32" rx="7" fill="#1a1714" stroke="rgba(217, 133, 76, 0.72)" strokeWidth="1" />
        <text x="400" y="156" textAnchor="middle" fill="#f2f0e9" fontSize="9.5" fontWeight="600" letterSpacing="0.06em">CROSS-ENCODER</text>
        <text x="400" y="167" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.05em">DEBERTA-V3</text>

        {/* Branch Connector */}
        <line x1="400" y1="174" x2="400" y2="184" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
        <polygon points="397.5,182 400,185 402.5,182" fill="rgba(242, 240, 233, 0.5)" />

        {/* Box 2: Entailment */}
        <rect x="292" y="184" width="216" height="32" rx="7" fill="#1a1714" stroke="rgba(242, 240, 233, 0.24)" strokeWidth="1" />
        <text x="400" y="198" textAnchor="middle" fill="#f2f0e9" fontSize="9.5" fontWeight="600" letterSpacing="0.06em">ENTAILMENT</text>
        <text x="400" y="209" textAnchor="middle" fill="#8a8f85" fontSize="7" letterSpacing="0.05em">CONTRADICTION · UNCERTAINTY</text>
      </g>

      {/* Merge Connectors */}
      <path d="M 140 216 L 140 230 L 270 230 L 270 244" fill="none" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
      <path d="M 400 216 L 400 230 L 270 230" fill="none" stroke="rgba(242, 240, 233, 0.28)" strokeWidth="1" />
      <polygon points="267.5,242 270,245 272.5,242" fill="rgba(242, 240, 233, 0.5)" />
      <circle cx="270" cy="230" r="2.5" fill="#76c0a6" filter="url(#hh-blue-glow)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* ── STAGE 4: VERIFICATION HEATMAP ── */}
      <rect x="80" y="246" width="380" height="38" rx="8" fill="#131b17" stroke="rgba(96, 181, 155, 0.75)" strokeWidth="1.2" />
      <text x="270" y="262" textAnchor="middle" fill="#f2f0e9" fontSize="11" fontWeight="600" letterSpacing="0.08em">VERIFICATION HEATMAP</text>
      <text x="270" y="275" textAnchor="middle" fill="#76c0a6" fontSize="8" fontWeight="500" letterSpacing="0.06em">HALLUCINATION SCORE + EXPLANATION</text>
    </svg>
  );
}
