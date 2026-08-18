"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ExternalLink } from "lucide-react";
import NavBar from "./components/NavBar";
import ContourField from "./components/ContourField";
import CompanionPet from "./components/CompanionPet";
import ChipIcon from "./components/ChipIcon";
import ProjectGridCard from "./components/ProjectGridCard";
import { projects } from "./data/projects";

/* ── REVEAL ───────────────────────────────────────────── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── HOME ─────────────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme] = useState("light");

  /* Sync theme from DOM */
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("harsh-theme", next);
    setTheme(next);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <CompanionPet />

      <main id="top">
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="hero section-pad" aria-labelledby="hero-heading">
          <div className="hero-blob" aria-hidden="true" />
          <ContourField />
          <div className="hero-inner">
            {/* Sarvam botanical ornament — visible in light mode only */}
            <svg
              className="hero-ornament"
              viewBox="0 0 280 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16 44 C16 44 8 36 12 26 C16 16 28 18 28 26 C28 34 20 38 16 44 Z" stroke="white" strokeWidth="1.2" fill="none" opacity=".9" />
              <path d="M16 44 C16 44 6 40 4 30 C2 20 10 14 18 20 C24 24 22 34 16 44 Z" stroke="white" strokeWidth="1" fill="none" opacity=".75" />
              <path d="M16 44 C16 44 10 48 6 44 C2 40 4 34 10 36 C14 38 16 44 16 44 Z" stroke="white" strokeWidth=".9" fill="none" opacity=".65" />
              <path d="M14 46 Q12 50 10 52" stroke="white" strokeWidth=".8" fill="none" opacity=".5" />
              <path d="M18 46 Q16 52 14 56" stroke="white" strokeWidth=".8" fill="none" opacity=".5" />
              <circle cx="140" cy="48" r="1.8" fill="white" opacity=".7" />
              <circle cx="140" cy="40" r="1.2" fill="white" opacity=".5" />
              <path d="M264 44 C264 44 272 36 268 26 C264 16 252 18 252 26 C252 34 260 38 264 44 Z" stroke="white" strokeWidth="1.2" fill="none" opacity=".9" />
              <path d="M264 44 C264 44 274 40 276 30 C278 20 270 14 262 20 C256 24 258 34 264 44 Z" stroke="white" strokeWidth="1" fill="none" opacity=".75" />
              <path d="M264 44 C264 44 270 48 274 44 C278 40 276 34 270 36 C266 38 264 44 264 44 Z" stroke="white" strokeWidth=".9" fill="none" opacity=".65" />
              <path d="M266 46 Q268 50 270 52" stroke="white" strokeWidth=".8" fill="none" opacity=".5" />
              <path d="M262 46 Q264 52 266 56" stroke="white" strokeWidth=".8" fill="none" opacity=".5" />
              <line x1="28" y1="52" x2="252" y2="52" stroke="white" strokeWidth=".8" opacity=".45" />
              <line x1="100" y1="48" x2="100" y2="56" stroke="white" strokeWidth=".7" opacity=".35" />
              <line x1="180" y1="48" x2="180" y2="56" stroke="white" strokeWidth=".7" opacity=".35" />
            </svg>

            <p className="hero-eyebrow">ECE · AI/ML · Software</p>
            <div className="eyebrow-rule" aria-hidden="true" />
            <h1 className="hero-name hero-wordmark" id="hero-heading">
              <span className="wm-word wm-first">Harsh</span>
              <span className="wm-word wm-middle">Kumar</span>
              <span className="wm-word wm-last">
                Jha<span className="wm-mark" aria-hidden="true" />
              </span>
            </h1>
            <p className="hero-copy">
              Building AI systems through machine learning and engineering.
            </p>
            <div className="hero-ctas">
              <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="hero-btn hero-btn-secondary hero-btn-github">
                <span>GitHub</span>
                <ExternalLink size={14} className="hero-btn-arrow" />
              </a>
              <a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer" className="hero-btn hero-btn-secondary hero-btn-linkedin">
                <span>LinkedIn</span>
              </a>
              <a href="https://x.com/haarshjha" target="_blank" rel="noreferrer" className="hero-btn hero-btn-secondary hero-btn-x">
                <span>X</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── SELECTED WORK ───────────────────────────────── */}
        <div id="divider-work" className="section-divider" aria-hidden="true" />
        <section id="work" data-section="work" className="work-section section-pad" aria-labelledby="work-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">01 / Selected Work</p>
              <h2 className="section-title" id="work-heading">
                Four systems,<br />
                each grounded in a real<br />
                product workflow.
              </h2>
            </div>
          </Reveal>

          {/* Compact 2-Column Project Grid */}
          <div className="project-grid">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <ProjectGridCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────── */}
        <div id="divider-experience" className="section-divider" aria-hidden="true" />
        <section id="experience" data-section="experience" className="exp-section section-pad" aria-labelledby="exp-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">02 / Experience</p>
              <h2 className="section-title" id="exp-heading">
                Where the questions<br />
                got sharper.
              </h2>
            </div>
          </Reveal>

          <div className="exp-list">
            {/* DomainLabs */}
            <Reveal>
              <article className="exp-card">
                <div className="exp-meta">
                  <p className="exp-year">2026</p>
                  <h3 className="exp-company">DomainLabs</h3>
                  <p className="exp-role">AI/ML Intern · AI Safety &amp; Evaluation</p>
                  <div className="exp-stack">
                    {["AI Safety", "LLM Evaluation", "Adversarial Testing", "Red Teaming"].map((t) => (
                      <span key={t} className="exp-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <ul className="exp-bullets">
                  <li>Researched AI safety, adversarial testing, and LLM evaluation across production-oriented AI workflows.</li>
                  <li>Built evaluation pipelines and benchmarks to measure model performance, robustness, and safety.</li>
                  <li>Contributed to <strong>Bayora</strong>, an automated adversarial red-teaming platform, through LLM integration and model testing.</li>
                </ul>
              </article>
            </Reveal>

            {/* MathonGo */}
            <Reveal>
              <article className="exp-card">
                <div className="exp-meta">
                  <p className="exp-year">2025</p>
                  <h3 className="exp-company">MathonGo</h3>
                  <p className="exp-role">Research &amp; Development Intern</p>
                  <div className="exp-stack">
                    {["Data Validation", "AI-Assisted QA", "Physics", "Datasets"].map((t) => (
                      <span key={t} className="exp-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <ul className="exp-bullets">
                  <li>Validated and structured 2,000+ Physics questions for JEE/NEET question banks.</li>
                  <li>Applied AI-assisted QA to improve dataset quality and retrieval efficiency.</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ── ABOUT & TOOLKIT (UNIFIED CHAPTER) ─────────── */}
        <div id="divider-about" className="section-divider" aria-hidden="true" />
        <section id="about" data-section="about" className="about-section section-pad" aria-labelledby="about-heading">
          {/* Section Header across full width */}
          <Reveal>
            <div className="about-section-header">
              <p className="section-kicker">03 / About</p>
              <h2 className="section-title about-main-heading" id="about-heading">
                Systems over demos.<br />
                Evidence over<br />
                adjectives.
              </h2>
            </div>
          </Reveal>

          {/* 2-Column Content Below Header: Narrative (Left) + Profile Rail (Right) */}
          <div className="about-content-grid">
            <Reveal className="about-narrative-col">
              <p className="about-body">
                I&apos;m an ECE student at MSIT building AI systems around retrieval,
                evaluation, backend engineering, and reliable automation. I care about
                what happens after the demo — where systems meet real inputs, failures,
                and users.
              </p>
            </Reveal>

            <Reveal className="about-meta-col">
              <div className="about-profile-rail">
                <div className="about-rail-item">
                  <div className="about-rail-marker" aria-hidden="true" />
                  <div className="about-rail-content">
                    <span className="about-meta-tag">CURRENT FOCUS</span>
                    <p className="about-meta-value">
                      AI systems · Backend · Machine Learning
                    </p>
                  </div>
                </div>

                <div className="about-rail-item">
                  <div className="about-rail-marker" aria-hidden="true" />
                  <div className="about-rail-content">
                    <span className="about-meta-tag">EDUCATION</span>
                    <p className="about-meta-value">
                      <strong className="about-edu-degree">B.Tech — Electronics &amp; Communication Engineering</strong>
                      <span className="about-meta-sub">MSIT · Delhi · GGSIPU · 2025–2029</span>
                    </p>
                  </div>
                </div>

                <div className="about-rail-item">
                  <div className="about-rail-marker" aria-hidden="true" />
                  <div className="about-rail-content">
                    <span className="about-meta-tag">BACKGROUND</span>
                    <p className="about-meta-value">
                      ECE · AI / ML · Software
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Integrated Honest Toolkit */}
          <div className="about-toolkit-wrap">
            <Reveal>
              <div className="toolkit-sub-header">
                <span className="toolkit-sub-kicker">03.1 / TOOLKIT</span>
                <h3 className="toolkit-sub-heading">Tools I reach for when the system calls for them.</h3>
              </div>
            </Reveal>

            {/* Single Compact Stack Pill Grid */}
            <Reveal>
              <div className="toolkit-stack-block">
                <span className="toolkit-stack-label">STACK</span>
                <div className="toolkit-pill-strip" role="list" aria-label="Technology stack">
                  {[
                    "Python",
                    "TypeScript",
                    "Java",
                    "JavaScript",
                    "SQL",
                    "FastAPI",
                    "React",
                    "Next.js",
                    "Node.js",
                    "PostgreSQL",
                    "Redis",
                    "Docker",
                    "FAISS",
                    "PyTorch",
                    "SQLAlchemy",
                  ].map((name) => (
                    <div key={name} className="toolkit-pill" role="listitem" title={name}>
                      <ChipIcon name={name} color="currentColor" />
                      <span className="toolkit-pill-name">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTEXTUAL END-OF-PAGE CTA ────────────────────── */}
        <div id="divider-contact" className="section-divider" aria-hidden="true" />
        <section id="contact-cta" className="closing-cta-section section-pad" aria-labelledby="cta-heading">
          <div className="closing-cta-container">
            <Reveal>
              <span className="section-kicker">04 / NEXT STEP</span>
              <h2 className="closing-cta-title" id="cta-heading">
                Have something worth building?
              </h2>
              <p className="closing-cta-sub">
                Open for AI/ML engineering roles, system architecture, and ambitious technical projects.
              </p>
              <div className="closing-cta-actions">
                <Link href="/contact" className="closing-cta-btn">
                  <span>Let&apos;s talk</span>
                  <ArrowUpRight size={17} className="closing-cta-arrow" aria-hidden="true" />
                </Link>
                <a href="mailto:jhaharsh451@gmail.com" className="closing-cta-email">
                  <span>jhaharsh451@gmail.com</span>
                  <ArrowUpRight size={15} className="closing-cta-email-arrow" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <span className="footer-name">HARSH KUMAR JHA</span>
        <span className="footer-line">Building AI systems through machine learning and engineering.</span>
        <span className="footer-copy">© 2026</span>
      </footer>
    </>
  );
}
