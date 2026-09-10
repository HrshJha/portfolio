"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitFork } from "lucide-react";
import { Project } from "../../data/projects";
import ChipIcon from "../../components/ChipIcon";
import KiviBackground from "../../components/KiviBackground";

type WorkDetailClientProps = {
  project: Project;
  prevProject: Project;
  nextProject: Project;
  stackChips: { name: string; color: string }[];
};

export default function WorkDetailClient({
  project,
  prevProject,
  nextProject,
  stackChips,
}: WorkDetailClientProps) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <>
      <KiviBackground />
      <div className="grain" aria-hidden="true" />

      {/* Top Floating Mini-Nav */}
      <header className="work-detail-nav section-pad">
        <Link href="/#work" className="work-detail-back-link">
          <ArrowLeft size={15} className="work-detail-back-arrow" />
          <span>Back to work</span>
        </Link>

      </header>

      <main className="work-detail-main section-pad">
        {/* Project Header */}
        <section className="work-detail-header">
          <div className="work-detail-meta-row">
            <span className="work-detail-kicker">
              {project.index} / {project.category}
            </span>
            <span className="work-detail-year">{project.year}</span>
          </div>

          <h1 className="work-detail-title">{project.title}</h1>
          <p className="work-detail-thesis">{project.thesis}</p>
        </section>

        {/* Primary Large Project Media */}
        <section className="work-detail-media-wrap" aria-label={`${project.title} video demonstration`}>
          <div className="work-detail-media-frame">
            {!videoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.poster}
                className="work-detail-video"
                onError={() => setVideoError(true)}
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <div
                className="work-detail-fallback-poster"
                style={{ backgroundImage: `url(${project.poster})` }}
              />
            )}
          </div>

          {/* Quick Action Links */}
          <div className="work-detail-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-action project-action-primary"
            >
              <GitFork size={14} /> View Code on GitHub
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="project-action project-action-secondary"
              >
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </section>

        {/* Complete Deep Case Study Grid */}
        <section className="work-detail-content-grid">
          {/* 1. PROBLEM */}
          <article className="work-detail-block">
            <span className="work-detail-label">PROBLEM</span>
            <p className="work-detail-body">{project.problem}</p>
          </article>

          {/* 2. APPROACH */}
          <article className="work-detail-block">
            <span className="work-detail-label">APPROACH</span>
            <p className="work-detail-body">{project.approach}</p>
          </article>

          {/* 3. ARCHITECTURE */}
          <article className="work-detail-block">
            <span className="work-detail-label">ARCHITECTURE</span>
            <p className="work-detail-body">{project.architecture}</p>
          </article>

          {/* 4. COMPLETE TECH STACK */}
          <article className="work-detail-block">
            <span className="work-detail-label">TECH STACK</span>
            <div className="tech-stack-chips" aria-label={`${project.title} complete technologies`}>
              {project.fullStack.map((name) => {
                const chip = stackChips.find((item) => item.name === name);
                return (
                  <span
                    key={name}
                    className="tech-pill"
                    style={{ "--chip-color": chip?.color === "currentColor" ? "var(--text)" : chip?.color } as React.CSSProperties}
                  >
                    <ChipIcon name={name} color={chip?.color || "currentColor"} />
                    <span>{name}</span>
                  </span>
                );
              })}
            </div>
          </article>

          {/* 5. KEY IDEA */}
          <article className="work-detail-block work-detail-idea-block">
            <span className="work-detail-label">KEY IDEA</span>
            <blockquote className="work-detail-idea-quote">
              &ldquo;{project.keyIdea}&rdquo;
            </blockquote>
          </article>
        </section>

        {/* Previous / Next Project Tour Navigation */}
        <nav className="work-detail-tour-nav" aria-label="Project tour navigation">
          <Link href={`/work/${prevProject.id}`} className="work-tour-link work-tour-prev">
            <span className="work-tour-sub">
              <ArrowLeft size={13} /> PREVIOUS PROJECT
            </span>
            <span className="work-tour-title">{prevProject.title}</span>
          </Link>

          <Link href={`/work/${nextProject.id}`} className="work-tour-link work-tour-next">
            <span className="work-tour-sub">
              NEXT PROJECT <ArrowRight size={13} />
            </span>
            <span className="work-tour-title">{nextProject.title}</span>
          </Link>
        </nav>
      </main>

      {/* Minimal Footer */}
      <footer className="site-footer" role="contentinfo">
        <span className="footer-name">HARSH KUMAR JHA</span>
        <span className="footer-line">AI systems / software / visual work.</span>
        <span className="footer-copy">© 2026</span>
      </footer>
    </>
  );
}
