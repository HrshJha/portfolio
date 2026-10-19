"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { DitherArt, HeroProximityWave } from "./components/KiviBackground";
import { projects, type Project } from "./data/projects";

const toolkitGroups = [
  { label: "Languages", items: ["Python", "Java", "C++", "SQL"] },
  {
    label: "AI / ML",
    items: ["PyTorch", "TensorFlow/Keras", "scikit-learn", "Transformers (Hugging Face)", "Sentence Transformers"],
  },
  { label: "Data / Visualization", items: ["NumPy", "Pandas", "Matplotlib"] },
  { label: "Backend / APIs", items: ["FastAPI", "REST APIs"] },
  { label: "Tools / Infrastructure", items: ["Git", "GitHub", "Docker", "Jupyter Notebook", "PostgreSQL"] },
];

const domainLabsMeta = ["AI SAFETY", "LLM EVALUATION", "RED TEAMING", "BAYORA", "ROBUSTNESS"];
const mathonGoMeta = ["CONTENT TAGGING", "RESEARCH", "CONTENT DEVELOPMENT", "QUALITY"];

const domainLabsDetails = [
  ["AI SAFETY", "Researched adversarial testing and LLM evaluation methodologies."],
  ["MODEL EVALUATION", "Assisted with experiments and benchmarks for evaluating AI-system behaviour."],
  ["RED TEAMING", "Worked on adversarial threat taxonomies and LLM red-teaming frameworks."],
  ["BAYORA", "Contributed to Bayora, an automated adversarial red-teaming platform, through model integration and testing."],
  ["ROBUSTNESS", "Explored model alignment, robustness, and interpretability techniques."],
  ["RESEARCH", "Prepared technical documentation, research summaries, and internal reports on AI/ML experiments."],
] as const;

const domainLabsDetailMeta = ["AI SAFETY", "LLM EVALUATION", "ADVERSARIAL TESTING", "RED TEAMING", "MODEL ROBUSTNESS", "INTERPRETABILITY", "RESEARCH"];

const mathonGoDetails = [
  ["CONTENT TAGGING", "Classified and structured content for systematic organization."],
  ["RESEARCH", "Researched and validated information used in content development."],
  ["CONTENT DEVELOPMENT", "Created and refined academic content with emphasis on clarity."],
  ["QUALITY", "Reviewed content for consistency, correctness, and detail."],
] as const;

// Keep the project data and case-study route intact; this only disconnects
// AppForge from the homepage showcase until the next project direction is set.
const showcaseProjects = projects.filter(
  (project) => project.id !== "candidate-intelligence-system" && project.id !== "appforge-ai",
);

import { VeraPipeline } from "./components/ProjectArchitectureDiagrams";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ProjectCard({
  project,
  isFeatured = false,
}: {
  project: Project;
  isFeatured?: boolean;
}) {
  const hasVideoPreview = project.id !== "vera";

  return (
    <motion.article
      className={`portfolio-project-card portfolio-project-card--video ${isFeatured ? "portfolio-project-card--featured" : "portfolio-project-card--secondary"}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
    >
      <Link
        href={`/work/${project.id}`}
        className={`portfolio-project-visual ${hasVideoPreview ? "portfolio-project-visual--video" : "portfolio-project-visual--diagram"} ${isFeatured ? "portfolio-project-visual--featured" : "portfolio-project-visual--secondary"}`}
        aria-label={`Open ${project.title} case study`}
        onMouseEnter={(event) => {
          const video = event.currentTarget.querySelector("video");
          if (video) void video.play().catch(() => undefined);
        }}
        onMouseLeave={(event) => {
          const video = event.currentTarget.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }}
        onFocus={(event) => {
          const video = event.currentTarget.querySelector("video");
          if (video) void video.play().catch(() => undefined);
        }}
        onBlur={(event) => {
          const video = event.currentTarget.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }}
      >
        {hasVideoPreview ? (
          <video
            className="portfolio-project-preview"
            src={project.video}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <VeraPipeline />
        )}
        <span className="portfolio-project-index">{project.index} <span aria-hidden="true">/</span> {project.year}</span>
        {hasVideoPreview && <span className="portfolio-project-preview-cue"><span aria-hidden="true">▶</span> PREVIEW ON HOVER</span>}
        <span className="portfolio-project-open" aria-hidden="true"><ArrowUpRight size={19} /></span>
      </Link>

      <div className="portfolio-project-info">
        <div className="portfolio-project-header">
          <div>
            <p className="portfolio-project-eyebrow">{project.category}</p>
            <h3>
              <Link href={`/work/${project.id}`} className="portfolio-project-title-link">
                {project.title}
              </Link>
            </h3>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="portfolio-project-gh-link"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubMark size={isFeatured ? 18 : 16} />
            </a>
          )}
        </div>

        <p className="portfolio-project-desc">{project.shortDescription || project.thesis}</p>

        <div className="portfolio-project-tags" aria-label={`${project.title} technology stack`}>
          {project.cardStack.slice(0, isFeatured ? 5 : 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
          {!isFeatured && project.cardStack.length > 4 && (
            <span>+{project.cardStack.length - 4}</span>
          )}
        </div>

        <div className="portfolio-project-action">
          <Link href={`/work/${project.id}`} className="portfolio-writeup-link">
            Read case study <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ExperienceEntry({
  id,
  company,
  role,
  date,
  overview,
  meta,
  details,
  detailMeta,
  primary = false,
}: {
  id: string;
  company: string;
  role: string;
  date: string;
  overview: string;
  meta: readonly string[];
  details: readonly (readonly [string, string])[];
  detailMeta?: readonly string[];
  primary?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailsId = `${id}-details`;
  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsRendered(true);
    setIsOpen(true);
  };

  const renderToggle = (expanded: boolean) => (
    <button
      type="button"
      className={`portfolio-experience-toggle${expanded ? " portfolio-experience-toggle--inside" : ""}`}
      aria-expanded={expanded}
      aria-controls={detailsId}
      onClick={handleToggle}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={expanded ? "hide" : "view"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {expanded ? "HIDE DETAILS" : "VIEW DETAILED WORK"}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={expanded ? "up" : "out"}
          className="portfolio-experience-toggle-icon"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {expanded ? <ArrowUp size={14} aria-hidden="true" /> : <ArrowUpRight size={14} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  return (
    <article className={`portfolio-experience-entry${primary ? " portfolio-experience-entry--primary" : " portfolio-experience-entry--secondary"}`}>
      <header className="portfolio-experience-entry-header">
        <div>
          <h3>{company}</h3>
          <div className="portfolio-experience-entry-role">{role}</div>
        </div>
        <time>{date}</time>
      </header>

      <p className="portfolio-experience-overview">{overview}</p>

      <div className="portfolio-experience-meta-row" aria-label={`${company} focus areas`}>
        {meta.map((item) => <span key={item}>{item}</span>)}
      </div>

      {!isRendered && renderToggle(false)}

      <AnimatePresence initial={false} onExitComplete={() => setIsRendered(false)}>
        {isOpen && (
          <motion.div
            id={detailsId}
            className="portfolio-experience-details"
            initial={reduceMotion ? { opacity: 1, height: "auto", y: 0 } : { opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={reduceMotion ? { opacity: 1, height: 0, y: 0 } : { opacity: 0, height: 0, y: 10 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portfolio-experience-detail-overview">
              <span>OVERVIEW</span>
              <p>{overview}</p>
            </div>

            <div className="portfolio-experience-detail-grid">
              {details.map(([title, description], index) => (
                <article key={title} className={`portfolio-experience-detail-item${title === "BAYORA" ? " portfolio-experience-detail-item--emphasis" : ""}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            {detailMeta && (
              <div className="portfolio-experience-detail-meta" aria-label={`${company} detailed focus areas`}>
                {detailMeta.map((item) => <span key={item}>{item}</span>)}
              </div>
            )}

            {renderToggle(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <NavBar />

        <main id="top" className="portfolio-main">
          {/* ── 01. Hero Band — s1 artwork (s1-hero.png) ── */}
          <section className="portfolio-hero-band" id="hero-band">
            <div className="hero-media-slot" aria-hidden="true">
              <DitherArt
                region="hero"
                src="/assets/art/dither/s1-hero.png"
                position="50% 50%"
                fit="cover"
                seam="none"
                restOpacity={0.24}
              />
            </div>
            <HeroProximityWave />

            <div className="portfolio-hero" aria-labelledby="hero-heading">
              <div className="portfolio-hero-edge portfolio-hero-edge--top">
                <span>HARSH KUMAR JHA</span>
                <span>DELHI · INDIA</span>
              </div>

              <div className="portfolio-hero-composition">
                <p className="portfolio-hero-kicker">ENGINEER / AI BUILDER</p>
                <h1 id="hero-heading">I&apos;m Harsh Kumar Jha, an <span>AI/ML engineer</span><br />building AI systems, software and products.</h1>
                <div className="portfolio-hero-support">
                  <div className="portfolio-hero-support-meta">HARSH KUMAR JHA · DELHI, INDIA<br /><span>ECE @ MSIT · AI / ML · SOFTWARE</span></div>
                  <p className="portfolio-hero-support-copy">Harsh Kumar Jha is an engineer and AI builder in Delhi, India. He builds practical AI systems, software, and product experiments with robust architecture and clean interfaces.</p>
                  <a href="#work" className="portfolio-inline-link">
                    View work <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="portfolio-hero-edge portfolio-hero-edge--bottom">
                <span>01 — INTRO</span>
                <span>AI SYSTEMS · SOFTWARE · PRODUCTS</span>
                <a href="#work">Explore projects <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </section>

          {/* ── 02. Selected Work Section (Clean Continuous Warm-Ivory Canvas) ── */}
          <section id="work" data-section="work" className="portfolio-section portfolio-work-section" aria-labelledby="work-heading">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-eyebrow">02 — SELECTED WORK</p>
                <h2 id="work-heading">Systems I&apos;ve been building.</h2>
              </div>
              <p className="portfolio-section-intro">Working prototypes, clear system boundaries, and the reasoning behind each build.</p>
            </div>

            {/* ── One Large Continuous Warm-Ivory Project Canvas ── */}
            <div className="portfolio-work-canvas">
              <div className="portfolio-work-editorial-grid">
                {/* Left Column: Featured Project (FrameOS) */}
                <div className="portfolio-featured-col">
                  <Reveal className="portfolio-featured-reveal">
                    <ProjectCard project={showcaseProjects[0]} isFeatured={true} />
                  </Reveal>
                </div>

                {/* Right Column: Stacked Secondary Projects (Vera, Hallucination Hunter) */}
                <div className="portfolio-secondary-col">
                  {showcaseProjects.slice(1).map((project) => (
                    <Reveal key={project.id}>
                      <ProjectCard project={project} isFeatured={false} />
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="portfolio-work-see-all">
                <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="portfolio-see-all-action">
                  MORE PROJECTS ON GITHUB <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {/* ── 03. Experience Band — SECONDARY ARTWORK: 2-s3 (s3-meadow.png) ── */}
          <section className="portfolio-experience-band" id="experience-band">
            <div className="experience-media-slot" aria-hidden="true">
              <DitherArt
                region="meadow"
                src="/assets/art/dither/s3-meadow.png"
                position="50% 50%"
                fit="cover"
                seam="bottom"
                restOpacity={0.22}
              />
            </div>
            <div
              id="experience"
              data-section="experience"
              className="portfolio-section portfolio-experience-section"
              aria-labelledby="experience-heading"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <div className="portfolio-experience-surface">
                <header className="portfolio-experience-header">
                  <div>
                    <p className="portfolio-experience-kicker">03 — EXPERIENCE</p>
                    <h2 id="experience-heading">Experience</h2>
                  </div>
                  <div className="portfolio-experience-proof" aria-label="Verify Harsh Kumar Jha's work">
                    <span>VERIFY THE WORK</span>
                    <a href="/harshaha.pdf" target="_blank" rel="noreferrer">RESUME <ArrowUpRight size={12} aria-hidden="true" /></a>
                    <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} aria-hidden="true" /></a>
                  </div>
                </header>

                <ExperienceEntry
                  id="domalynlabs"
                  company="domaiynlabs LLP"
                  role="AI / ML INTERN · AI SAFETY & EVALUATION RESEARCH"
                  date="JUN 2026 — AUG 2026"
                  overview="Worked on AI safety, adversarial evaluation, LLM robustness, and automated red-teaming research."
                  meta={domainLabsMeta}
                  details={domainLabsDetails}
                  detailMeta={domainLabsDetailMeta}
                  primary
                />

                <ExperienceEntry
                  id="mathongo"
                  company="MATHONGO"
                  role="CONTENT DEVELOPER INTERN · CONTENT TAGGING, RESEARCH & DEVELOPMENT"
                  date="JUN 2025 — AUG 2025"
                  overview="Worked on content tagging, research, and academic content development with a focus on accuracy, structure, and quality."
                  meta={mathonGoMeta}
                  details={mathonGoDetails}
                />
              </div>
            </div>
          </section>

          {/* ── 04 & 05. Closing Band (About + Contact) — SECONDARY ARTWORK: 3-s2 (s2-clearing.png) ── */}
          <section className="portfolio-closing-band" id="closing-band">
            <div className="closing-media-slot" aria-hidden="true">
              <DitherArt
                region="clearing"
                src="/assets/art/dither/s2-clearing.png"
                position="50% 50%"
                fit="cover"
                seam="top"
                restOpacity={0.22}
              />
            </div>

            <div
              id="about"
              data-section="about"
              className="portfolio-section portfolio-about-section"
              aria-labelledby="about-heading"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <div className="portfolio-about-label">
                <p className="portfolio-eyebrow">04 — ABOUT</p>
                <span>A SHORT VERSION</span>
              </div>
              <div className="portfolio-about-content">
                <h2 id="about-heading">AI systems.<br />Software products.<br /><span>Engineering-led.</span></h2>
                <p>I&apos;m Harsh Kumar Jha, an engineer and AI builder focused on AI/ML, backend systems, and product engineering. My work includes AI safety and evaluation research at domaiynlabs LLP, content development at MathonGo, and projects such as FrameOS, Vera, and Hallucination Hunter.</p>
                <section className="portfolio-toolkit" aria-labelledby="toolkit-heading">
                  <h2 id="toolkit-heading" className="portfolio-eyebrow">CURRENT TOOLKIT</h2>
                  <div className="portfolio-toolkit-groups">
                    {toolkitGroups.map((group) => (
                      <div key={group.label} className="portfolio-toolkit-group">
                        <h3>{group.label}</h3>
                        <ul>
                          {group.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <div
              id="contact"
              data-section="contact"
              className="portfolio-contact-section"
              aria-labelledby="contact-heading"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <p className="portfolio-eyebrow">05 — CONTACT</p>
              <div className="portfolio-contact-grid">
                <h2 id="contact-heading">Let&apos;s build<br /><span>something useful.</span></h2>
                <div>
                  <p>Have a project, idea, or opportunity?</p>
                  <a href="mailto:jhaharsh451@gmail.com" className="portfolio-contact-link">jhaharsh451@gmail.com <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="portfolio-footer" role="contentinfo">
          <span>HARSH KUMAR JHA</span>
          <span>AI systems / software / products</span>
          <div>
            <a href="mailto:jhaharsh451@gmail.com">EMAIL</a>
            <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer">GITHUB</a>
            <a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer">LINKEDIN</a>
            <a href="https://x.com/haarshjha" target="_blank" rel="noreferrer">X</a>
          </div>
        </footer>
      </div>
  );
}
