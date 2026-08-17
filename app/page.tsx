"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Github, Linkedin, Menu, Moon, Pause, Play, Sun, Twitter, X } from "lucide-react";

type Project = { index: string; title: string; category: string; thesis: string; video: string; poster: string; github: string; stack: string[]; problem: string; approach: string; architecture: string; idea: string };

const projects: Project[] = [
  { index: "01", title: "FrameOS", category: "AI WORKFLOW PLATFORM", thesis: "An AI-native system for orchestrating research, creation, publishing, and feedback loops.", video: "/videos/frameos.mp4", poster: "/posters/frameos.jpg", github: "https://github.com/HrshJha/FrameOS", stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"], problem: "Content operations break down when research, generation, rendering, and publishing live as disconnected manual steps.", approach: "FrameOS turns that chain into an orchestrated workflow where an operator sets direction and the system carries execution across stages.", architecture: "Next.js and React interface · Node services · PostgreSQL/Supabase data · Redis-backed job infrastructure · Dockerized components.", idea: "Make creative automation inspectable by separating direction from execution." },
  { index: "02", title: "Candidate Intelligence System", category: "AI PLATFORM", thesis: "A backend-first resume intelligence system for semantic matching and explainable ranking.", video: "/videos/candidate-intelligence-system.mp4", poster: "/posters/candidate-intelligence-system.jpg", github: "https://github.com/HrshJha/resume-checker", stack: ["FastAPI", "FAISS", "BM25", "Redis", "PostgreSQL"], problem: "Keyword-led applicant tracking can miss semantic relevance and rarely makes recommendations legible to a reviewer.", approach: "The system parses resumes and job descriptions, combines dense and sparse retrieval, then reranks with explicit scoring signals.", architecture: "FastAPI routes · document parsers · FAISS + BM25 hybrid retrieval · cross-encoder ranking · SQLAlchemy/Alembic persistence · Redis and Nginx.", idea: "Retrieval is only useful in hiring when a person can inspect why a match surfaced." },
  { index: "03", title: "AppForge AI", category: "DEVELOPER TOOL", thesis: "A compiler-inspired pipeline that turns an application idea into validated system structure.", video: "/videos/appforge-ai.mp4", poster: "/posters/appforge-ai.jpg", github: "https://github.com/HrshJha/AppForge-AI", stack: ["FastAPI", "Next.js", "Pydantic", "Cerebras", "Groq"], problem: "Prompt-to-code workflows become brittle when raw output skips design structure, validation, and repair.", approach: "AppForge treats generation as compilation: explicit representations move through schema generation, cross-layer checks, and repair loops.", architecture: "Intent representation · system-design representation · sequential database/API/UI/auth schemas · Pydantic validation · multi-provider fallback.", idea: "Intermediate representations make generative systems easier to constrain and debug." },
  { index: "04", title: "Hallucination Hunter", category: "LLM EVALUATION", thesis: "A claim-level verification system for finding unsupported or contradictory AI-generated answers.", video: "/videos/hallucination-hunter.mp4", poster: "/posters/hallucination-hunter.jpg", github: "https://github.com/HrshJha/Hallucination-Hunter", stack: ["FastAPI", "DeBERTa-v3", "spaCy", "PyTorch", "Docker"], problem: "Whole-response checks are too coarse: unsupported claims can hide inside otherwise accurate AI answers.", approach: "The pipeline splits an answer into claims, grounds them against source text, and presents readable evidence for each verdict.", architecture: "FastAPI service · spaCy claim extraction · DeBERTa-v3 NLI classification · Sentence-Transformers grounding · aggregation and visualization layers.", idea: "AI reliability needs claim-level evidence, not a single opaque score." },
];

const socials = [
  { label: "GitHub", href: "https://github.com/HrshJha", icon: Code2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hrshjha", icon: BriefcaseBusiness },
  { label: "X", href: "https://x.com", icon: ArrowUpRight },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && ref.current?.classList.add("visible"), { threshold: .12 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function VideoPlayer({ project, onActive }: { project: Project; onActive: (video: HTMLVideoElement) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const play = (preview = false) => { const video = videoRef.current; if (!video) return; setStarted(true); video.muted = preview; onActive(video); video.play().then(() => setPlaying(true)).catch(() => setError(true)); };
  const pause = (reset = false) => { const video = videoRef.current; if (!video) return; video.pause(); if (reset) { video.currentTime = 0; setStarted(false); } setPlaying(false); };
  return <div className="video-shell" onMouseEnter={() => { if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches && !started) play(true); }} onMouseLeave={() => pause(true)}>
    <video ref={videoRef} preload="none" poster={project.poster} playsInline aria-label={`${project.title} product demo video`} onEnded={() => pause(true)} onError={() => setError(true)}>
      <source src={project.video} type="video/mp4" />
    </video>
    {!playing && <button className="video-control play" onClick={() => play(false)} aria-label={`Play ${project.title} demo`}><Play size={18} fill="currentColor" /><span>{error ? "Retry video" : started ? "Resume" : "Play demo"}</span></button>}
    {playing && <button className="video-control pause" onClick={() => pause()} aria-label={`Pause ${project.title} demo`}><Pause size={17} fill="currentColor" /><span>Pause</span></button>}
    {error && <p className="video-error">Video unavailable. Retry to load.</p>}
  </div>;
}

function ProjectShowcase({ project, onActive }: { project: Project; onActive: (video: HTMLVideoElement) => void }) {
  return <article className="project" id={project.title.toLowerCase().replaceAll(" ", "-")}>
    <Reveal><div className="project-kicker"><span>{project.index} / PROJECT</span><span>{project.category}</span></div><h3>{project.title}</h3><p className="thesis">{project.thesis}</p></Reveal>
    <Reveal><VideoPlayer project={project} onActive={onActive} /></Reveal>
    <div className="project-details">
      {[ ["Problem", project.problem], ["Approach", project.approach], ["Architecture", project.architecture], ["Key idea", project.idea] ].map(([label, copy]) => <Reveal key={label}><div className="detail"><span>{label}</span><p>{copy}</p></div></Reveal>)}
    </div>
    <Reveal><div className="project-end"><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a href={project.github} target="_blank" rel="noreferrer" className="text-link">GitHub <ArrowUpRight size={15} /></a></div></Reveal>
  </article>;
}

export default function Home() {
  const [theme, setTheme] = useState("dark"); const [menu, setMenu] = useState(false); const currentVideo = useRef<HTMLVideoElement | null>(null);
  useEffect(() => { setTheme(document.documentElement.dataset.theme || "dark"); }, []);
  const toggleTheme = () => { const next = theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = next; localStorage.setItem("harsh-theme", next); setTheme(next); };
  const onActive = (video: HTMLVideoElement) => { if (currentVideo.current && currentVideo.current !== video) { currentVideo.current.pause(); currentVideo.current.currentTime = 0; } currentVideo.current = video; };
  return <>
    <div className="grain" aria-hidden="true" />
    <header className="nav"><a href="#top" className="wordmark">HKJ<span>.</span></a><nav className={menu ? "open" : ""}>{["Work", "Experience", "About", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}</a>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X size={19} /> : <Menu size={19} />}</button></div></header>
    <main id="top">
      <section className="hero"><div><p className="eyebrow">ECE · AI/ML · SOFTWARE</p><h1>Harsh<br />Kumar Jha<span className="dot">.</span></h1><p className="hero-copy">Building AI systems through machine learning and engineering.</p><div className="hero-links"><a href="#work" className="button primary">View Work <ArrowUpRight size={17} /></a><a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="button">GitHub</a><a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer" className="button quiet">LinkedIn / X</a></div></div><p className="hero-index">SCROLL TO EXPLORE <span>↓</span></p></section>
      <section id="work" className="work"><Reveal><div className="section-head"><span>01 / SELECTED WORK</span><p>Four systems, each grounded in a real product workflow.</p></div></Reveal>{projects.map(project => <ProjectShowcase key={project.title} project={project} onActive={onActive} />)}</section>
      <section id="experience" className="section split-section"><Reveal><div className="section-head"><span>02 / EXPERIENCE</span><h2>Where the questions got sharper.</h2></div></Reveal><div className="experience-list"><Reveal><article className="experience"><div><span>2026</span><h3>DomainLabs</h3><p>AI/ML Intern · AI Safety & Evaluation Research</p></div><ul><li>Researched AI safety, adversarial testing, and LLM evaluation across reliability workflows.</li><li>Built evaluation experiments, benchmarks, and adversarial threat taxonomies for language models.</li><li>Contributed to Bayora through LLM integration, model testing, and AI pipeline development.</li></ul></article></Reveal><Reveal><article className="experience"><div><span>2025</span><h3>MathonGo</h3><p>Research & Development Intern</p></div><ul><li>Validated and structured 2,000+ JEE Physics questions for educational question banks.</li><li>Applied AI-assisted quality assurance to content validation and dataset organization.</li></ul></article></Reveal></div></section>
      <section id="about" className="section about"><Reveal><div className="section-head"><span>03 / ABOUT</span><h2>Systems over demos. Evidence over adjectives.</h2></div></Reveal><Reveal><p className="about-copy">I’m an Electronics and Communication Engineering student at MSIT, building toward research and production AI engineering. I’m drawn to the engineering work around intelligent systems: how they retrieve, reason, validate, and become useful in the real world.</p></Reveal></section>
      <section className="section skills"><Reveal><div className="section-head"><span>04 / TOOLKIT</span><h2>Tools I reach for when the system calls for them.</h2></div></Reveal><div className="skill-grid">{[["Programming", "Python · Java · SQL · TypeScript"], ["AI / ML", "LLMs · RAG · NLP · Hugging Face · Sentence-Transformers"], ["Backend", "FastAPI · REST APIs · JWT · Pydantic · SQLAlchemy"], ["Data / Infra", "PostgreSQL · Redis · Supabase · Docker · Railway"], ["Dev tools", "Git · GitHub · Jupyter · Postman · Vercel"]].map(([title, copy]) => <Reveal key={title}><div className="skill"><span>{title}</span><p>{copy}</p></div></Reveal>)}</div></section>
      <section className="section education"><Reveal><div className="section-head"><span>05 / EDUCATION</span><h2>Maharaja Surajmal Institute of Technology</h2></div><div className="education-fact"><p>B.Tech · Electronics & Communication Engineering</p><span>2025—2029</span></div></Reveal></section>
      <section id="contact" className="contact"><Reveal><span>06 / CONTACT</span><h2>Let’s build something<br /><em>that holds up.</em></h2><a className="email" href="mailto:contactharshjh@gmail.com">contactharshjh@gmail.com <ArrowUpRight size={25} /></a><div className="socials">{socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={17} /> {label}</a>)}</div></Reveal></section>
    </main>
    <footer><span>HARSH KUMAR JHA</span><span>Building things. Learning systems. Exploring AI.</span><span>© 2026</span></footer>
  </>;
}
