"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import NavBar from "./components/NavBar";
import { projects, type Project } from "./data/projects";

const toolkit = [
  "Python", "TypeScript", "Java", "JavaScript", "SQL", "FastAPI", "React", "Next.js",
  "Node.js", "PostgreSQL", "Redis", "Docker", "FAISS", "PyTorch", "SQLAlchemy",
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal>
      <article className={`feature-project${index % 2 === 1 ? " feature-project--reverse" : ""}`}>
        <div className="feature-project-meta">
          <span>{project.index}</span>
          <span>{project.year}</span>
        </div>

        <div className="feature-project-layout">
          <Link href={`/work/${project.id}`} className="feature-project-media" aria-label={`Open ${project.title} case study`}>
            <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
              <source src={project.video} type="video/mp4" />
            </video>
            <span className="feature-project-media-note">View case study <ArrowUpRight size={14} /></span>
          </Link>

          <div className="feature-project-copy">
            <p className="feature-project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="feature-project-thesis">{project.thesis}</p>
            <p className="feature-project-description">{project.shortDescription}</p>

            <div className="feature-project-footer">
              <div className="feature-project-stack" aria-label={`${project.title} technology stack`}>
                {project.cardStack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
              </div>
              <a href={project.github} target="_blank" rel="noreferrer" className="editorial-link">
                Source <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <div className="site-shell">
        <div className="grain" aria-hidden="true" />
        <NavBar />

        <main id="top" className="editorial-main">
          <section className="editorial-hero section-pad" aria-labelledby="hero-heading">
            <div className="editorial-hero-topline">
              <span>01 / INTRO</span>
              <span>Delhi · India</span>
            </div>

            <div className="editorial-hero-content">
              <p className="editorial-kicker">AI / SYSTEMS / VISUAL STORYTELLING</p>
              <h1 id="hero-heading">Harsh Kumar<br /><em>Jha.</em></h1>
              <p className="editorial-hero-statement">
                I build AI systems that hold up after the demo — and care about how a story is seen, not only how it runs.
              </p>
              <div className="editorial-hero-links">
                <a href="#work" className="editorial-link editorial-link--large">See the work <ArrowUpRight size={16} /></a>
                <a href="mailto:jhaharsh451@gmail.com" className="editorial-link">Get in touch <ArrowUpRight size={14} /></a>
              </div>
            </div>

            <div className="editorial-hero-bottomline">
              <span>ECE @ MSIT</span>
              <span>AI / ML · BACKEND · FILM</span>
              <span>2025 — 2029</span>
            </div>
          </section>

          <div className="editorial-rule" aria-hidden="true" />

          <section id="work" data-section="work" className="editorial-work section-pad" aria-labelledby="work-heading">
            <div className="editorial-section-lead">
              <p className="editorial-kicker">02 / SELECTED WORK</p>
              <h2 id="work-heading">Things I make<br /><em>to understand them.</em></h2>
              <p>Four systems grounded in a real product workflow — retrieval, evaluation, orchestration, and evidence.</p>
            </div>

            <div className="feature-project-list">
              {projects.map((project, index) => <ProjectFeature key={project.id} project={project} index={index} />)}
            </div>
          </section>

          <div className="editorial-rule" aria-hidden="true" />

          <section id="experience" data-section="experience" className="editorial-experience section-pad" aria-labelledby="experience-heading">
            <div className="editorial-section-lead editorial-section-lead--wide">
              <p className="editorial-kicker">03 / EXPERIENCE</p>
              <h2 id="experience-heading">Where the questions<br /><em>got sharper.</em></h2>
            </div>

            <div className="editorial-experience-list">
              <article className="editorial-experience-row">
                <div className="editorial-experience-index">01</div>
                <div>
                  <p className="editorial-meta">2026 · AI/ML INTERN</p>
                  <h3>DomainLabs</h3>
                </div>
                <p>Researched AI safety, adversarial testing, and LLM evaluation; built evaluation pipelines and benchmarks; contributed to Bayora, an automated red-teaming platform.</p>
              </article>
              <article className="editorial-experience-row">
                <div className="editorial-experience-index">02</div>
                <div>
                  <p className="editorial-meta">2025 · R&amp;D INTERN</p>
                  <h3>MathonGo</h3>
                </div>
                <p>Validated and structured 2,000+ Physics questions for JEE/NEET question banks and applied AI-assisted QA to improve dataset quality and retrieval efficiency.</p>
              </article>
            </div>
          </section>

          <div className="editorial-rule" aria-hidden="true" />

          <section id="about" data-section="about" className="editorial-about section-pad" aria-labelledby="about-heading">
            <div className="editorial-about-label">
              <p className="editorial-kicker">04 / ABOUT</p>
              <span>THE SHORT VERSION</span>
            </div>
            <div className="editorial-about-content">
              <h2 id="about-heading">Systems over demos.<br /><em>Evidence over adjectives.</em></h2>
              <p>I&apos;m an ECE student at MSIT building AI systems around retrieval, evaluation, backend engineering, and reliable automation. I also think in frames, rhythm, and the details that make a piece of work feel human.</p>
              <div className="editorial-about-notes">
                <span>AI SYSTEMS</span>
                <span>BACKEND</span>
                <span>MACHINE LEARNING</span>
                <span>VISUAL STORYTELLING</span>
              </div>
              <div className="editorial-toolkit" aria-label="Technology stack">
                <span className="editorial-toolkit-label">STACK</span>
                <div>{toolkit.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </section>

          <div className="editorial-rule" aria-hidden="true" />

          <section id="contact-cta" data-section="contact" className="editorial-contact section-pad" aria-labelledby="contact-heading">
            <p className="editorial-kicker">05 / NEXT STEP</p>
            <h2 id="contact-heading">Have something<br /><em>worth building?</em></h2>
            <div className="editorial-contact-links">
              <Link href="/contact" className="editorial-link editorial-link--large">Let&apos;s talk <ArrowUpRight size={17} /></Link>
              <a href="mailto:jhaharsh451@gmail.com" className="editorial-link">jhaharsh451@gmail.com <ArrowUpRight size={14} /></a>
            </div>
          </section>
        </main>

        <footer className="editorial-footer" role="contentinfo">
          <span>HARSH KUMAR JHA</span>
          <span>Building AI systems through machine learning and engineering.</span>
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
