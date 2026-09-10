'use client';

import React from 'react';

/**
 * 1:1 Fully Responsive Vector Architecture Diagram for FrameOS
 * viewBox: 0 0 520 660
 * Every node, connector, branch and feedback loop is 100% contained in the viewBox.
 */
export function FrameOSPipeline() {
  return (
    <div className="pipeline-visual-wrapper">
      <svg
        viewBox="0 0 520 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pipeline-svg"
        aria-label="FrameOS Media Loop Architecture Pipeline"
      >
        <defs>
          <linearGradient id="frameos-bg-grad" x1="0" y1="0" x2="0" y2="660" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#141712" />
            <stop offset="100%" stopColor="#0a0c09" />
          </linearGradient>
          <linearGradient id="frameos-active-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2a2016" />
            <stop offset="100%" stopColor="#221b13" />
          </linearGradient>
          <filter id="frameos-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Card Canvas Background */}
        <rect width="520" height="660" rx="16" fill="url(#frameos-bg-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Header */}
        <g id="frameos-header">
          <text x="24" y="32" fill="#7d7b6f" fontSize="10" fontWeight="600" letterSpacing="0.12em" fontFamily="var(--font-mono, monospace)">FRAMEOS / MEDIA LOOP</text>
          <circle cx="426" cy="29" r="3" fill="#c96f2e" filter="url(#frameos-glow)">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="436" y="32" fill="#b9b6a8" fontSize="10" fontWeight="500" letterSpacing="0.08em" fontFamily="var(--font-mono, monospace)">LIVE PIPELINE</text>
          <line x1="24" y1="44" x2="496" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </g>

        {/* Stage 1: TREND */}
        <g id="stage-trend" transform="translate(24, 60)">
          <rect width="472" height="42" rx="8" fill="#161a15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="18" y="26" fill="#f4f1e6" fontSize="12" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">TREND</text>
          <text x="454" y="26" fill="#7d7b6f" fontSize="10" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">DISCOVER</text>
        </g>

        {/* Connector 1 */}
        <path d="M260 102 L260 120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="260" cy="111" r="2.5" fill="#c96f2e" />

        {/* Stage 2: RESEARCH */}
        <g id="stage-research" transform="translate(24, 120)">
          <rect width="472" height="42" rx="8" fill="#161a15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="18" y="26" fill="#f4f1e6" fontSize="12" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">RESEARCH</text>
          <text x="454" y="26" fill="#7d7b6f" fontSize="10" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">EXTRACT + SYNTHESIZE</text>
        </g>

        {/* Connector 2 */}
        <path d="M260 162 L260 180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="260" cy="171" r="2.5" fill="#c96f2e" />

        {/* Stage 3: SCRIPT (Active/Highlighted) */}
        <g id="stage-script" transform="translate(24, 180)">
          <rect width="472" height="42" rx="8" fill="url(#frameos-active-grad)" stroke="#c96f2e" strokeWidth="1.2" />
          <text x="18" y="26" fill="#f4f1e6" fontSize="12" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">SCRIPT</text>
          <text x="454" y="26" fill="#c96f2e" fontSize="10" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">GENERATE</text>
        </g>

        {/* Connector 3 */}
        <path d="M260 222 L260 240" stroke="#c96f2e" strokeWidth="1.5" />
        <polygon points="257,236 263,236 260,240" fill="#c96f2e" />

        {/* Stage 4: CONTENT ENGINE (Complex Multi-branch) */}
        <g id="stage-content-engine" transform="translate(24, 240)">
          <rect width="472" height="78" rx="10" fill="#191713" stroke="rgba(201, 111, 46, 0.55)" strokeWidth="1" />
          <text x="18" y="24" fill="#f4f1e6" fontSize="11" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">CONTENT ENGINE</text>
          <text x="454" y="24" fill="#c96f2e" fontSize="9" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">ASSEMBLE / GENERATE</text>

          {/* Three Sub-branches */}
          {/* Branch 1: VOICE */}
          <g transform="translate(18, 36)">
            <rect width="134" height="28" rx="6" fill="#121411" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <text x="67" y="18" fill="#d8d5ca" fontSize="10" fontWeight="500" letterSpacing="0.08em" textAnchor="middle" fontFamily="var(--font-mono, monospace)">VOICE</text>
          </g>
          {/* Branch 2: VISUALS */}
          <g transform="translate(169, 36)">
            <rect width="134" height="28" rx="6" fill="#121411" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <text x="67" y="18" fill="#d8d5ca" fontSize="10" fontWeight="500" letterSpacing="0.08em" textAnchor="middle" fontFamily="var(--font-mono, monospace)">VISUALS</text>
          </g>
          {/* Branch 3: ASSEMBLY */}
          <g transform="translate(320, 36)">
            <rect width="134" height="28" rx="6" fill="#121411" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <text x="67" y="18" fill="#d8d5ca" fontSize="10" fontWeight="500" letterSpacing="0.08em" textAnchor="middle" fontFamily="var(--font-mono, monospace)">ASSEMBLY</text>
          </g>
        </g>

        {/* Connector 4 */}
        <path d="M260 318 L260 336" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="260" cy="327" r="2.5" fill="#c96f2e" />

        {/* Stage 5: RENDER */}
        <g id="stage-render" transform="translate(24, 336)">
          <rect width="472" height="42" rx="8" fill="#161a15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="18" y="26" fill="#f4f1e6" fontSize="12" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">RENDER</text>
          <text x="454" y="26" fill="#7d7b6f" fontSize="10" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">PRODUCE</text>
        </g>

        {/* Connector 5 */}
        <path d="M260 378 L260 396" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="260" cy="387" r="2.5" fill="#c96f2e" />

        {/* Stage 6: DISTRIBUTE */}
        <g id="stage-distribute" transform="translate(24, 396)">
          <rect width="472" height="42" rx="8" fill="#161a15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="18" y="26" fill="#f4f1e6" fontSize="12" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">DISTRIBUTE</text>
          <text x="454" y="26" fill="#7d7b6f" fontSize="10" fontWeight="500" textAnchor="end" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">PUBLISH</text>
        </g>

        {/* Connector 6 */}
        <path d="M260 438 L260 458" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="260" cy="448" r="2.5" fill="#c96f2e" />

        {/* Stage 7: ANALYTICS & FEEDBACK (Dual Node) */}
        <g id="stage-feedback-dual" transform="translate(24, 458)">
          {/* Analytics Box */}
          <rect x="0" y="0" width="226" height="52" rx="8" fill="#161a15" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x="16" y="24" fill="#f4f1e6" fontSize="11" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">ANALYTICS</text>
          <text x="16" y="40" fill="#7d7b6f" fontSize="9" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">MEASURE</text>

          {/* Feedback Box */}
          <rect x="246" y="0" width="226" height="52" rx="8" fill="#1b1713" stroke="#c96f2e" strokeWidth="1.2" />
          <text x="262" y="24" fill="#f4f1e6" fontSize="11" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">FEEDBACK</text>
          <text x="262" y="40" fill="#c96f2e" fontSize="9" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">LEARN</text>
        </g>

        {/* Feedback Loop Backwards Return Path */}
        <g id="frameos-loop-return">
          <path
            d="M 359 510 L 359 542 Q 359 554 344 554 L 38 554 Q 14 554 14 538 L 14 81 Q 14 65 30 65 L 42 65"
            stroke="rgba(201, 111, 46, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <polygon points="40,61 46,65 40,69" fill="#c96f2e" />
          {/* Center Feedback Annotation Banner */}
          <rect x="90" y="542" width="340" height="24" rx="4" fill="#0d0f0b" stroke="rgba(201, 111, 46, 0.4)" strokeWidth="1" />
          <text x="260" y="558" fill="#c96f2e" fontSize="9" fontWeight="600" letterSpacing="0.1em" textAnchor="middle" fontFamily="var(--font-mono, monospace)">
            ↺ FEEDBACK LOOP / BACK TO TREND DETECTION
          </text>
        </g>

        {/* Footer Banner */}
        <g id="frameos-footer" transform="translate(24, 610)">
          <line x1="0" y1="0" x2="472" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="0" y="24" fill="#7d7b6f" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="var(--font-mono, monospace)">AUTONOMOUS MEDIA LOOP</text>
          <text x="472" y="24" fill="#a8e063" fontSize="8.5" fontWeight="500" letterSpacing="0.06em" textAnchor="end" fontFamily="var(--font-mono, monospace)">
            TREND → RESEARCH → CREATE → DISTRIBUTE → LEARN
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 1:1 Fully Responsive Vector Architecture Diagram for Vera
 * viewBox: 0 0 460 290
 * Every node, connector, branch and label is 100% contained in the viewBox.
 */
export function VeraPipeline() {
  return (
    <div className="pipeline-visual-wrapper">
      <svg
        viewBox="0 0 460 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pipeline-svg"
        aria-label="Vera Merchant Growth Engine Architecture"
      >
        <defs>
          <linearGradient id="vera-bg-grad" x1="0" y1="0" x2="0" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#141814" />
            <stop offset="100%" stopColor="#0b0e0a" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="460" height="290" rx="14" fill="url(#vera-bg-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Header */}
        <g id="vera-header">
          <text x="18" y="24" fill="#7d7b6f" fontSize="8.5" fontWeight="600" letterSpacing="0.1em" fontFamily="var(--font-mono, monospace)">VERA / MERCHANT GROWTH ENGINE</text>
          <text x="442" y="24" fill="#79a4d5" fontSize="8" fontWeight="500" letterSpacing="0.08em" textAnchor="end" fontFamily="var(--font-mono, monospace)">DECISION → MESSAGE → VERIFY</text>
          <line x1="18" y1="34" x2="442" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </g>

        {/* Left Column: 3 Input Triggers */}
        <g id="vera-inputs" transform="translate(18, 48)">
          <g transform="translate(0, 0)">
            <rect width="84" height="28" rx="6" fill="#131612" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <text x="42" y="17" fill="#b9b6a8" fontSize="7.5" fontWeight="500" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">TRIGGER</text>
          </g>
          <g transform="translate(0, 40)">
            <rect width="84" height="34" rx="6" fill="#131612" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <text x="42" y="15" fill="#b9b6a8" fontSize="7" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">MERCHANT</text>
            <text x="42" y="25" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">CONTEXT</text>
          </g>
          <g transform="translate(0, 86)">
            <rect width="84" height="34" rx="6" fill="#131612" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
            <text x="42" y="15" fill="#b9b6a8" fontSize="7" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">TIME +</text>
            <text x="42" y="25" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">HISTORY</text>
          </g>
          {/* Connector to Decision Engine */}
          <path d="M 84 14 L 100 14 Q 106 14 106 28 L 106 58 L 112 58" stroke="rgba(201, 111, 46, 0.6)" strokeWidth="1" fill="none" />
          <path d="M 84 57 L 112 57" stroke="rgba(201, 111, 46, 0.6)" strokeWidth="1" fill="none" />
          <path d="M 84 103 L 100 103 Q 106 103 106 86 L 106 58" stroke="rgba(201, 111, 46, 0.6)" strokeWidth="1" fill="none" />
          <polygon points="110,55 114,57.5 110,60" fill="#c96f2e" />
        </g>

        {/* Center Main Lane */}
        <g id="vera-main-lane" transform="translate(132, 44)">
          {/* Node 1: Decision Engine */}
          <g>
            <rect width="218" height="48" rx="8" fill="#1c1813" stroke="#c96f2e" strokeWidth="1" />
            <text x="14" y="18" fill="#f4f1e6" fontSize="9.5" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">DECISION ENGINE</text>
            <text x="14" y="29" fill="#c96f2e" fontSize="7" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">7 HARD GATES · 10-FACTOR PRIORITY</text>
            <g transform="translate(14, 34)">
              <rect x="0" y="0" width="30" height="10" rx="3" fill="#241e17" stroke="rgba(201, 111, 46, 0.4)" strokeWidth="0.8" />
              <text x="15" y="7.5" fill="#c96f2e" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">TIME</text>

              <rect x="34" y="0" width="34" height="10" rx="3" fill="#241e17" stroke="rgba(201, 111, 46, 0.4)" strokeWidth="0.8" />
              <text x="51" y="7.5" fill="#c96f2e" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">DEDUP</text>

              <rect x="72" y="0" width="54" height="10" rx="3" fill="#241e17" stroke="rgba(201, 111, 46, 0.4)" strokeWidth="0.8" />
              <text x="99" y="7.5" fill="#c96f2e" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">AUTO-REPLY</text>

              <rect x="130" y="0" width="46" height="10" rx="3" fill="#241e17" stroke="rgba(201, 111, 46, 0.4)" strokeWidth="0.8" />
              <text x="153" y="7.5" fill="#c96f2e" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">SUPPRESS</text>
            </g>
          </g>

          {/* Connector */}
          <line x1="109" y1="48" x2="109" y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <polygon points="107,56 111,56 109,58" fill="#c96f2e" />

          {/* Node 2: Fact Packet */}
          <g transform="translate(0, 58)">
            <rect width="218" height="30" rx="6" fill="#151814" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="14" y="14" fill="#f4f1e6" fontSize="9" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">FACT PACKET</text>
            <text x="14" y="24" fill="#7d7b6f" fontSize="6.5" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">GROUNDED + PROVENANCE TAGGED</text>
          </g>

          {/* Connector */}
          <line x1="109" y1="88" x2="109" y2="98" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <polygon points="107,96 111,96 109,98" fill="#c96f2e" />

          {/* Node 3: Message Composer */}
          <g transform="translate(0, 98)">
            <rect width="218" height="30" rx="6" fill="#151814" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="14" y="14" fill="#f4f1e6" fontSize="9" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">MESSAGE COMPOSER</text>
            <text x="14" y="24" fill="#79a4d5" fontSize="6.5" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">GEMINI FLASH · WHATSAPP DRAFT</text>
          </g>

          {/* Connector */}
          <line x1="109" y1="128" x2="109" y2="138" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <polygon points="107,136 111,136 109,138" fill="#76c0a6" />

          {/* Node 4: Output Validator */}
          <g transform="translate(0, 138)">
            <rect width="218" height="46" rx="8" fill="#131916" stroke="rgba(118, 192, 166, 0.7)" strokeWidth="1" />
            <text x="14" y="16" fill="#f4f1e6" fontSize="9.5" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">OUTPUT VALIDATOR</text>
            <text x="14" y="27" fill="#76c0a6" fontSize="6.5" fontWeight="500" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">GROUNDING · SAFETY · SINGLE CTA</text>
            <g transform="translate(14, 32)">
              <rect x="0" y="0" width="56" height="9.5" rx="3" fill="#15211d" stroke="rgba(118, 192, 166, 0.4)" strokeWidth="0.8" />
              <text x="28" y="7" fill="#76c0a6" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">FACT CHECK</text>

              <rect x="60" y="0" width="36" height="9.5" rx="3" fill="#15211d" stroke="rgba(118, 192, 166, 0.4)" strokeWidth="0.8" />
              <text x="78" y="7" fill="#76c0a6" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">TONE</text>

              <rect x="100" y="0" width="30" height="9.5" rx="3" fill="#15211d" stroke="rgba(118, 192, 166, 0.4)" strokeWidth="0.8" />
              <text x="115" y="7" fill="#76c0a6" fontSize="5.5" fontWeight="500" textAnchor="middle" fontFamily="var(--font-mono, monospace)">CTA</text>
            </g>
          </g>
        </g>

        {/* Right Column: Key Pool Side Node */}
        <g id="vera-key-pool" transform="translate(362, 88)">
          <rect width="80" height="68" rx="8" fill="#161814" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="40" y="24" fill="#d8d5ca" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">KEY POOL</text>
          <text x="40" y="38" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.04em" fontFamily="var(--font-mono, monospace)">AUTO-ROTATE</text>
          <text x="40" y="48" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.04em" fontFamily="var(--font-mono, monospace)">COOLDOWN</text>
          <text x="40" y="58" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.04em" fontFamily="var(--font-mono, monospace)">+ FAILOVER</text>

          {/* Sync Link to Composer */}
          <path d="M 0 34 L -12 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
        </g>

        {/* Footer */}
        <g id="vera-footer">
          <line x1="18" y1="246" x2="442" y2="246" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="18" y="268" fill="#7d7b6f" fontSize="7.5" fontWeight="600" letterSpacing="0.08em" fontFamily="var(--font-mono, monospace)">THE DETERMINISTIC SYSTEM DECIDES.</text>
          <text x="442" y="268" fill="#79a4d5" fontSize="7.5" fontWeight="600" letterSpacing="0.08em" textAnchor="end" fontFamily="var(--font-mono, monospace)">THE LLM WRITES.</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * 1:1 Fully Responsive Vector Architecture Diagram for Hallucination Hunter
 * viewBox: 0 0 460 290
 * Every node, connector, branch and label is 100% contained in the viewBox.
 */
export function HallucinationPipeline() {
  return (
    <div className="pipeline-visual-wrapper">
      <svg
        viewBox="0 0 460 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pipeline-svg"
        aria-label="Hallucination Hunter Verification Pipeline"
      >
        <defs>
          <linearGradient id="hh-bg-grad" x1="0" y1="0" x2="0" y2="290" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#12151b" />
            <stop offset="100%" stopColor="#0b0d11" />
          </linearGradient>
          <linearGradient id="hh-result-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#142420" />
            <stop offset="100%" stopColor="#121b18" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="460" height="290" rx="14" fill="url(#hh-bg-grad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* Header */}
        <g id="hh-header">
          <text x="18" y="24" fill="#7d7b6f" fontSize="8" fontWeight="600" letterSpacing="0.1em" fontFamily="var(--font-mono, monospace)">HALLUCINATION HUNTER / CLAIM VERIFICATION</text>
          <text x="442" y="24" fill="#79a4d5" fontSize="8" fontWeight="500" letterSpacing="0.08em" textAnchor="end" fontFamily="var(--font-mono, monospace)">NLI + EMBEDDINGS</text>
          <line x1="18" y1="34" x2="442" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </g>

        {/* Node 1: Input Text */}
        <g transform="translate(100, 44)">
          <rect width="260" height="28" rx="6" fill="#161a22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x="130" y="14" fill="#f4f1e6" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">INPUT TEXT</text>
          <text x="130" y="23" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">ANSWER + SOURCE DOCUMENTS</text>
        </g>

        {/* Connector line 1 */}
        <line x1="230" y1="72" x2="230" y2="84" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <polygon points="228,82 232,82 230,84" fill="#79a4d5" />

        {/* Node 2: Claim Extraction */}
        <g transform="translate(100, 84)">
          <rect width="260" height="28" rx="6" fill="#161a22" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x="130" y="14" fill="#f4f1e6" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">CLAIM EXTRACTION</text>
          <text x="130" y="23" fill="#7d7b6f" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">SPLIT RESPONSE INTO ATOMIC CLAIMS</text>
        </g>

        {/* Branching Connectors */}
        <path d="M 230 112 L 230 120 Q 230 124 220 124 L 120 124 Q 110 124 110 128 L 110 134" stroke="rgba(121, 164, 213, 0.5)" strokeWidth="1" fill="none" />
        <path d="M 230 112 L 230 120 Q 230 124 240 124 L 340 124 Q 350 124 350 128 L 350 134" stroke="rgba(201, 111, 46, 0.5)" strokeWidth="1" fill="none" />

        {/* Dual Verification Layers */}
        {/* Left Branch: Embedding Layer */}
        <g transform="translate(18, 134)">
          <text x="96" y="10" fill="#79a4d5" fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.08em" fontFamily="var(--font-mono, monospace)">EMBEDDING LAYER</text>

          {/* Node 3A: Semantic Search */}
          <g transform="translate(0, 16)">
            <rect width="192" height="26" rx="6" fill="#141922" stroke="rgba(121, 164, 213, 0.6)" strokeWidth="1" />
            <text x="96" y="13" fill="#f4f1e6" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">SEMANTIC SEARCH</text>
            <text x="96" y="21" fill="#79a4d5" fontSize="6" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">SENTENCE-TRANSFORMERS</text>
          </g>

          <line x1="96" y1="42" x2="96" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Node 3B: Claim <-> Evidence */}
          <g transform="translate(0, 48)">
            <rect width="192" height="26" rx="6" fill="#141922" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="96" y="13" fill="#f4f1e6" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">CLAIM ↔ EVIDENCE</text>
            <text x="96" y="21" fill="#7d7b6f" fontSize="6" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">SIMILARITY PAIRS</text>
          </g>
        </g>

        {/* Right Branch: NLI Verification Layer */}
        <g transform="translate(250, 134)">
          <text x="96" y="10" fill="#c96f2e" fontSize="6.5" fontWeight="600" textAnchor="middle" letterSpacing="0.08em" fontFamily="var(--font-mono, monospace)">NLI VERIFICATION LAYER</text>

          {/* Node 4A: Cross-Encoder */}
          <g transform="translate(0, 16)">
            <rect width="192" height="26" rx="6" fill="#1c1813" stroke="rgba(201, 111, 46, 0.6)" strokeWidth="1" />
            <text x="96" y="13" fill="#f4f1e6" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">CROSS-ENCODER</text>
            <text x="96" y="21" fill="#c96f2e" fontSize="6" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">DEBERTA-V3</text>
          </g>

          <line x1="96" y1="42" x2="96" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Node 4B: Entailment */}
          <g transform="translate(0, 48)">
            <rect width="192" height="26" rx="6" fill="#1c1813" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x="96" y="13" fill="#f4f1e6" fontSize="8" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">ENTAILMENT</text>
            <text x="96" y="21" fill="#7d7b6f" fontSize="6" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">CONTRADICTION · UNCERTAINTY</text>
          </g>
        </g>

        {/* Convergence Connectors */}
        <path d="M 114 208 L 114 216 Q 114 220 124 220 L 220 220 Q 230 220 230 224 L 230 228" stroke="rgba(96, 181, 155, 0.5)" strokeWidth="1" fill="none" />
        <path d="M 346 208 L 346 216 Q 346 220 336 220 L 240 220 Q 230 220 230 224" stroke="rgba(96, 181, 155, 0.5)" strokeWidth="1" fill="none" />
        <circle cx="230" cy="222" r="2.5" fill="#60b59b" />

        {/* Node 5: Verification Heatmap */}
        <g transform="translate(100, 228)">
          <rect width="260" height="30" rx="7" fill="url(#hh-result-grad)" stroke="#60b59b" strokeWidth="1.2" />
          <text x="130" y="15" fill="#f4f1e6" fontSize="9" fontWeight="600" textAnchor="middle" letterSpacing="0.06em" fontFamily="var(--font-mono, monospace)">VERIFICATION HEATMAP</text>
          <text x="130" y="24" fill="#60b59b" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.05em" fontFamily="var(--font-mono, monospace)">HALLUCINATION SCORE + EXPLANATION</text>
        </g>

        {/* Footer */}
        <g id="hh-footer">
          <line x1="18" y1="268" x2="442" y2="268" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="230" y="282" fill="#7d7b6f" fontSize="7" fontWeight="500" letterSpacing="0.08em" textAnchor="middle" fontFamily="var(--font-mono, monospace)">CLAIM-LEVEL ENTAILMENT · GROUNDED VERIFICATION ENGINE</text>
        </g>
      </svg>
    </div>
  );
}
