"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import NavBar from "./components/NavBar";
import { DitherArt, HeroProximityWave } from "./components/KiviBackground";
import { projects, type Project } from "./data/projects";

const toolkit = [
  "Python", "TypeScript", "JavaScript", "FastAPI", "React", "Next.js",
  "Node.js", "PostgreSQL", "Redis", "Docker", "FAISS", "PyTorch",
];

// Keep the project data and case-study route intact; this only disconnects
// AppForge from the homepage showcase until the next project direction is set.
const showcaseProjects = projects.filter(
  (project) => project.id !== "candidate-intelligence-system" && project.id !== "appforge-ai",
);

import {
  FrameOSPipeline,
  VeraPipeline,
  HallucinationPipeline,
} from "./components/ProjectArchitectureDiagrams";

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
  return (
    <article className={`portfolio-project-card ${isFeatured ? "portfolio-project-card--featured" : "portfolio-project-card--secondary"}`}>
      <Link
        href={`/work/${project.id}`}
        className={`portfolio-project-visual ${isFeatured ? "portfolio-project-visual--featured" : "portfolio-project-visual--secondary"}`}
        aria-label={`Open ${project.title} case study`}
      >
        {project.id === "frameos" ? (
          <FrameOSPipeline />
        ) : project.id === "vera" ? (
          <VeraPipeline />
        ) : (
          <HallucinationPipeline />
        )}
      </Link>

      <div className="portfolio-project-info">
        <div className="portfolio-project-header">
          <h3>
            <Link href={`/work/${project.id}`} className="portfolio-project-title-link">
              {project.title}
            </Link>
          </h3>
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

        <p className="portfolio-project-eyebrow">{project.category}</p>

        <p className="portfolio-project-desc">
          {project.shortDescription || project.thesis}
        </p>

        <div className="portfolio-project-tags" aria-label={`${project.title} technology stack`}>
          {project.cardStack.slice(0, isFeatured ? 6 : 4).map((item) => (
            <span key={item}>{item.toUpperCase()}</span>
          ))}
          {!isFeatured && project.cardStack.length > 4 && (
            <span>+{project.cardStack.length - 4}</span>
          )}
        </div>

        <div className="portfolio-project-action">
          <Link href={`/work/${project.id}`} className="portfolio-writeup-link">
            READ THE WRITE-UP <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <NavBar />

        <main id="top" className="portfolio-main">
          {/* ── Hero Band — existing floral dither artwork + proximity wave ── */}
          <section className="portfolio-hero-band" id="hero-band">
            <div className="hero-media-slot" aria-hidden="true">
              <DitherArt
                region="hero"
                src="/assets/art/dither/s1-hero.png"
                position="50% 46%"
                seam="bottom"
                restOpacity={0.16}
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
                <h1 id="hero-heading">I build AI systems,<br /><span>software and products.</span></h1>
                <div className="portfolio-hero-support">
                  <p>HARSH KUMAR JHA · DELHI, INDIA<br /><span>ECE @ MSIT · AI / ML · SOFTWARE</span></p>
                  <p className="portfolio-hero-support-copy">I build practical AI systems, software and product experiments. Film and visual work are a secondary practice.</p>
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

          <section id="work" data-section="work" className="portfolio-section portfolio-work-section" aria-labelledby="work-heading">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-eyebrow">SELECTED</p>
                <h2 id="work-heading">Here&apos;s what I have been<br />engineering..</h2>
              </div>
              <p className="portfolio-section-intro">Most of engineering is deciding what you are willing to lose.</p>
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
                  SEE EVERYTHING (3 MORE) <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section id="experience" data-section="experience" className="portfolio-section portfolio-experience-section" aria-labelledby="experience-heading">
            <div className="portfolio-section-heading portfolio-section-heading--compact">
              <div>
                <p className="portfolio-eyebrow">03 — EXPERIENCE</p>
                <h2 id="experience-heading">Engineering experience.</h2>
              </div>
              <p className="portfolio-section-intro">AI safety, evaluation, and data quality work.</p>
            </div>

            <div className="portfolio-experience-list">
              <article className="portfolio-experience-row">
                <span className="portfolio-experience-number">01</span>
                <div className="portfolio-experience-role">
                  <p className="portfolio-eyebrow">2026 · AI/ML INTERN</p>
                  <h3>DomainLabs</h3>
                </div>
                <p>Researched AI safety, adversarial testing, and LLM evaluation; built evaluation pipelines and benchmarks for Bayora, an automated red-teaming platform.</p>
              </article>
              <article className="portfolio-experience-row">
                <span className="portfolio-experience-number">02</span>
                <div className="portfolio-experience-role">
                  <p className="portfolio-eyebrow">2025 · R&amp;D INTERN</p>
                  <h3>MathonGo</h3>
                </div>
                <p>Validated and structured 2,000+ Physics questions for JEE/NEET question banks, using AI-assisted QA to improve dataset quality and retrieval.</p>
              </article>
            </div>
          </section>

          <section id="about" data-section="about" className="portfolio-section portfolio-about-section" aria-labelledby="about-heading">
            <div className="portfolio-about-label">
              <p className="portfolio-eyebrow">04 — ABOUT</p>
              <span>A SHORT VERSION</span>
            </div>
            <div className="portfolio-about-content">
              <h2 id="about-heading">AI systems.<br />Software products.<br /><span>Visual work, too.</span></h2>
              <p>I&apos;m an ECE student at MSIT focused on AI/ML, backend systems, and product engineering. I like taking ideas from prototype to software people can use. Outside engineering, I work with film and visual media.</p>
              <div className="portfolio-toolkit" aria-label="Technology stack">
                <span className="portfolio-eyebrow">CURRENT TOOLKIT</span>
                <div>{toolkit.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </section>

          <section id="film" data-section="film" className="portfolio-section portfolio-film-note" aria-labelledby="film-heading">
            <div className="portfolio-about-label">
              <p className="portfolio-eyebrow">05 — FILM / VISUAL WORK</p>
              <span>SECONDARY PRACTICE</span>
            </div>
            <div className="portfolio-about-content">
              <h2 id="film-heading">A separate<br /><span>visual practice.</span></h2>
              <p>Film and visual media sit alongside my engineering work as a second craft. This is where I experiment with images, editing, and composition.</p>
              <div className="portfolio-film-tags" aria-label="Visual work interests">
                <span>FILM</span>
                <span>PHOTOGRAPHY</span>
                <span>EDITING</span>
              </div>
            </div>
          </section>

          {/* ── Contact Band — 1:1 heykivi.ai s4-nest floral/nest artwork ── */}
          <section className="portfolio-contact-band" id="contact-band">
            <div className="contact-media-slot" aria-hidden="true">
              <DitherArt
                region="closing"
                src="/assets/art/dither/s4-nest.png"
                position="50% 50%"
                seam="top"
                restOpacity={0.16}
              />
            </div>
            <div
              id="contact"
              data-section="contact"
              className="portfolio-contact-section"
              aria-labelledby="contact-heading"
              style={{ position: 'relative', zIndex: 3 }}
            >
              <p className="portfolio-eyebrow">06 — CONTACT</p>
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
          <span>AI systems / software / visual work</span>
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
