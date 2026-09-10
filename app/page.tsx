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

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className={index === 0 ? "portfolio-project-featured-wrap" : "portfolio-project-tile-wrap"}>
      <article className={`portfolio-work-item${index === 0 ? " portfolio-work-item--featured" : " portfolio-work-item--tile"}`}>
        <Link
          href={`/work/${project.id}`}
          className="portfolio-work-media"
          aria-label={`Open ${project.title} case study`}
        >
          {index === 0 ? <FrameOSPipeline /> : project.id === "vera" ? <VeraPipeline /> : project.id === "hallucination-hunter" ? <HallucinationPipeline /> : (
            <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
              <source src={project.video} type="video/mp4" />
            </video>
          )}
          <span className="portfolio-media-link">Open case study <ArrowUpRight size={15} aria-hidden="true" /></span>
        </Link>

        <div className="portfolio-work-copy">
          <p className="portfolio-eyebrow">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="portfolio-work-thesis">{project.thesis}</p>
          <p className="portfolio-work-description">{project.shortDescription}</p>
          <div className="portfolio-work-footer">
            <div className="portfolio-stack" aria-label={`${project.title} technology stack`}>
              {project.cardStack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" className="portfolio-inline-link">
              GitHub <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <NavBar />

        <main id="top" className="portfolio-main">
          {/* ── Hero Band — 1:1 heykivi.ai s1-hero floral dither artwork + proximity wave ── */}
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
                <p className="portfolio-hero-kicker">ENGINEERING / AI / FILM</p>
                <h1 id="hero-heading">I build<br /><span>systems.</span><br />I shoot<br /><span>stories.</span></h1>
                <div className="portfolio-hero-support">
                  <p>AI / ML ENGINEERING<br /><span>+ FILM / VISUAL STORYTELLING</span></p>
                  <p className="portfolio-hero-support-copy">Systems with a point of view. Stories with a working spine.</p>
                  <a href="#work" className="portfolio-inline-link">
                    View selected work <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="portfolio-hero-edge portfolio-hero-edge--bottom">
                <span>01 — INTRO</span>
                <span>AI SYSTEMS · BACKEND · VISUAL STORYTELLING</span>
                <a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </section>

          <section id="work" data-section="work" className="portfolio-section portfolio-work-section" aria-labelledby="work-heading">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-eyebrow">02 — SELECTED WORK</p>
                <h2 id="work-heading">Built to hold up<br />after the demo.</h2>
              </div>
              <p className="portfolio-section-intro">Systems shaped around orchestration, evaluation, and evidence.</p>
            </div>
            <div className="portfolio-work-list">
              {showcaseProjects.map((project, index) => <ProjectFeature key={project.id} project={project} index={index} />)}
            </div>
          </section>

          <section id="experience" data-section="experience" className="portfolio-section portfolio-experience-section" aria-labelledby="experience-heading">
            <div className="portfolio-section-heading portfolio-section-heading--compact">
              <div>
                <p className="portfolio-eyebrow">03 — EXPERIENCE</p>
                <h2 id="experience-heading">Questions got sharper.</h2>
              </div>
              <p className="portfolio-section-intro">Places where research had to become something useful.</p>
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
              <h2 id="about-heading">I build things.<br />I care how they work.<br /><span>I make films, too.</span></h2>
              <p>I&apos;m an ECE student at MSIT, usually somewhere between backend systems, machine learning, and a camera. The common thread is attention: to the logic under the surface, and to the feeling it leaves behind.</p>
              <div className="portfolio-toolkit" aria-label="Technology stack">
                <span className="portfolio-eyebrow">CURRENT TOOLKIT</span>
                <div>{toolkit.map((item) => <span key={item}>{item}</span>)}</div>
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
              <p className="portfolio-eyebrow">05 — CONTACT</p>
              <div className="portfolio-contact-grid">
                <h2 id="contact-heading">Let&apos;s make<br /><span>something useful.</span></h2>
                <div>
                  <p>Have a system to build, a story to shape, or just a good question?</p>
                  <a href="mailto:jhaharsh451@gmail.com" className="portfolio-contact-link">jhaharsh451@gmail.com <ArrowUpRight size={17} aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="portfolio-footer" role="contentinfo">
          <span>HARSH KUMAR JHA</span>
          <span>AI systems / visual storytelling</span>
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
