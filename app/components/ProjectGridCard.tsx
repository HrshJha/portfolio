"use client";

import Link from "next/link";
import { ArrowUpRight, GitFork } from "lucide-react";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Project, stackChips } from "../data/projects";
import ChipIcon from "./ChipIcon";

export default function ProjectGridCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  return (
    <article className="project-grid-card">
      {/* Clickable Card Body leading to Project Case Study */}
      <Link
        href={`/work/${project.id}`}
        className="project-card-main-link"
        aria-label={`View full case study for ${project.title}`}
      >
        {/* 16:9 Cinematic Media Frame */}
        <div className="project-card-media">
          {!videoError ? (
            <video
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster}
              className="project-card-video"
              onError={() => setVideoError(true)}
              aria-hidden="true"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <div
              className="project-card-fallback-poster"
              style={{ backgroundImage: `url(${project.poster})` }}
              role="img"
              aria-label={`${project.title} preview`}
            />
          )}
          <div className="project-card-media-overlay" aria-hidden="true" />
        </div>

        {/* Card Info Content */}
        <div className="project-card-info">
          {/* Title + Year Row */}
          <div className="project-card-title-row">
            <h3 className="project-card-title">{project.title}</h3>
            <span className="project-card-year">{project.year}</span>
          </div>

          {/* 3-6 Curated Stack Pills */}
          <div className="project-card-tech" aria-label={`${project.title} technology stack`}>
            {project.cardStack.slice(0, 6).map((name) => {
              const chip = stackChips.find((item) => item.name === name);
              return (
                <span
                  key={name}
                  className="project-card-pill"
                  style={{ "--chip-color": chip?.color === "currentColor" ? "var(--text)" : chip?.color } as React.CSSProperties}
                >
                  <ChipIcon name={name} color={chip?.color || "currentColor"} />
                  <span>{name}</span>
                </span>
              );
            })}
          </div>

          {/* Short 2-3 Line Project Description */}
          <p className="project-card-desc">{project.shortDescription}</p>
        </div>
      </Link>

      {/* Dual Actions Footer: View Code + View Project */}
      <div className="project-card-footer">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="project-card-code-btn"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          <GitFork size={13} className="project-card-code-icon" aria-hidden="true" />
          <span>VIEW CODE</span>
        </a>

        <Link
          href={`/work/${project.id}`}
          className="project-card-view-btn"
          aria-label={`View full case study for ${project.title}`}
        >
          <span>View Project</span>
          <ArrowUpRight size={14} className="project-card-btn-arrow" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
