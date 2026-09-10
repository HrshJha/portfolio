"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import NavBar from "./components/NavBar";
import KiviBackground from "./components/KiviBackground";
import { projects, type Project } from "./data/projects";

const toolkit = [
  "Python", "TypeScript", "JavaScript", "FastAPI", "React", "Next.js",
  "Node.js", "PostgreSQL", "Redis", "Docker", "FAISS", "PyTorch",
];

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
    <Reveal>
      <article className={`portfolio-work-item${index % 2 === 1 ? " portfolio-work-item--reverse" : ""}`}>
        <div className="portfolio-work-index">
          <span>{project.index}</span>
          <span>{project.year}</span>
        </div>

        <Link
          href={`/work/${project.id}`}
          className="portfolio-work-media"
          aria-label={`Open ${project.title} case study`}
        >
          <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
            <source src={project.video} type="video/mp4" />
          </video>
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
    <>
      <KiviBackground />
      <div className="site-shell">
        <div className="grain" aria-hidden="true" />
        <NavBar />

        <main id="top" className="portfolio-main">
          <section className="portfolio-hero" aria-labelledby="hero-heading">
            <div className="portfolio-hero-topline">
              <span>HARSH KUMAR JHA</span>
              <span>DELHI · INDIA</span>
            </div>

            <div className="portfolio-hero-grid">
              <div className="portfolio-hero-statement">
                <p className="portfolio-eyebrow">ENGINEERING / AI / FILM</p>
                <h1 id="hero-heading">I build systems.<br /><span>I shoot stories.</span></h1>
              </div>

              <div className="portfolio-hero-aside">
                <p>
                  AI/ML engineering student interested in the distance between a good idea and a working system.
                </p>
                <a href="#work" className="portfolio-inline-link portfolio-inline-link--hero">
                  See selected work <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="portfolio-hero-baseline">
              <span>01 — INTRO</span>
              <span>AI SYSTEMS · BACKEND · VISUAL STORYTELLING</span>
              <a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a>
            </div>
          </section>

          <section id="work" data-section="work" className="portfolio-section portfolio-work-section" aria-labelledby="work-heading">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-eyebrow">02 — SELECTED WORK</p>
                <h2 id="work-heading">Built to hold up<br />after the demo.</h2>
              </div>
              <p className="portfolio-section-intro">Four systems shaped around retrieval, evaluation, orchestration, and evidence.</p>
            </div>
            <div className="portfolio-work-list">
              {projects.map((project, index) => <ProjectFeature key={project.id} project={project} index={index} />)}
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

          <section className="portfolio-film-section" aria-labelledby="film-heading">
            <div className="portfolio-film-copy">
              <p className="portfolio-eyebrow">04 — FILM</p>
              <h2 id="film-heading">The other<br /><span>way I think.</span></h2>
              <p>I also work with moving images — looking for rhythm, atmosphere, and the detail that makes a place feel present.</p>
              <div className="portfolio-film-tags">
                <span>CINEMATOGRAPHY</span>
                <span>VISUAL STORYTELLING</span>
              </div>
            </div>
            <div className="portfolio-film-media">
              <video autoPlay muted loop playsInline preload="metadata" poster="/posters/frameos.jpg" aria-label="Cinematic moving image study">
                <source src="/videos/frameos.mp4" type="video/mp4" />
              </video>
              <span>Moving image study / 2026</span>
            </div>
          </section>

          <section id="about" data-section="about" className="portfolio-section portfolio-about-section" aria-labelledby="about-heading">
            <div className="portfolio-about-label">
              <p className="portfolio-eyebrow">05 — ABOUT</p>
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

          <section id="contact" data-section="contact" className="portfolio-contact-section" aria-labelledby="contact-heading">
            <p className="portfolio-eyebrow">06 — CONTACT</p>
            <div className="portfolio-contact-grid">
              <h2 id="contact-heading">Let&apos;s make<br /><span>something useful.</span></h2>
              <div>
                <p>Have a system to build, a story to shape, or just a good question?</p>
                <a href="mailto:jhaharsh451@gmail.com" className="portfolio-contact-link">jhaharsh451@gmail.com <ArrowUpRight size={17} aria-hidden="true" /></a>
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
    </>
  );
}
