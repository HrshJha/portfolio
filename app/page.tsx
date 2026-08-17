"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitFork, Pause, Play, Volume2, VolumeX } from "lucide-react";
import NavBar from "./components/NavBar";
import ContourField from "./components/ContourField";
import CompanionPet, { emitCompanionEvent } from "./components/CompanionPet";

/* ── TYPES ────────────────────────────────────────────── */
type Project = {
  index: string; title: string; category: string; thesis: string;
  video: string; poster: string; github: string; stack: string[];
  problem: string; approach: string; architecture: string; idea: string; liveDemo?: string;
};

/* ── DATA ─────────────────────────────────────────────── */
const projects: Project[] = [
  {
    index: "01", title: "FrameOS", category: "AI INFRASTRUCTURE",
    thesis: "An AI-native media infrastructure platform for scaling autonomous content operations.",
    video: "/videos/frameos.mp4", poster: "/posters/frameos.jpg",
    github: "https://github.com/HrshJha/FrameOS",
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Supabase", "Redis", "Docker", "Prisma"],
    problem: "Short-form media production breaks down when research, script generation, rendering, publishing, and analytics live as disconnected manual steps — creating context switching, inconsistent quality, and bottlenecks when one operator manages multiple content pipelines.",
    approach: "FrameOS treats media production as infrastructure. It organises content work into autonomous pipeline stages — research, script generation, content assembly, rendering, publishing, analytics collection, and feedback learning — with the operator setting direction and the system carrying execution.",
    architecture: "Next.js + React interface · TypeScript application code · Node.js backend services · PostgreSQL/Supabase data layer · Redis-backed queue orchestration · Dockerized system components · Prisma ORM.",
    idea: "Make creative automation inspectable by separating operator direction from system execution.",
  },
  {
    index: "02", title: "Candidate Intelligence System", category: "AI PLATFORM",
    thesis: "A backend-first resume intelligence system for semantic matching and explainable candidate ranking.",
    video: "/videos/candidate-intelligence-system.mp4", poster: "/posters/candidate-intelligence-system.jpg",
    github: "https://github.com/HrshJha/resume-checker",
    stack: ["Python", "FastAPI", "FAISS", "BM25", "Sentence-Transformers", "PostgreSQL", "Redis", "Docker", "Nginx"],
    problem: "Traditional applicant tracking workflows over-index on keywords and often miss semantic relevance between resumes and job descriptions. They also make it difficult for reviewers to understand why a candidate surfaced.",
    approach: "The system converts resumes and job descriptions into structured intelligence. It parses documents, normalises skills, retrieves candidates through hybrid FAISS dense and BM25 sparse search, reranks matches with a cross-encoder, and produces explainable scoring signals.",
    architecture: "FastAPI routes for auth, job, candidate, and search · Resume + JD parsers · FAISS dense + BM25 sparse hybrid retrieval · Cross-encoder reranking · SQLAlchemy 2.0 async ORM + Alembic migrations · PostgreSQL + Redis + Nginx deployment stack.",
    idea: "Retrieval is only useful in hiring when a person can inspect why a match surfaced.",
  },
  {
    index: "03", title: "AppForge AI", category: "DEVELOPER TOOL",
    thesis: "A compiler-inspired pipeline that turns a natural-language application idea into validated system structure.",
    video: "/videos/appforge-ai.mp4", poster: "/posters/appforge-ai.jpg",
    github: "https://github.com/HrshJha/AppForge-AI",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "Pydantic v2", "Cerebras", "Groq", "SQLite", "Railway"],
    problem: "Standard LLM coding assistants generate raw code without enough structure, validation, or repair logic. That makes prompt-to-application workflows brittle when outputs need to become coherent system designs rather than one-off snippets.",
    approach: "AppForge treats natural-language application generation as a compilation problem. It uses a staged pipeline with intermediate representations, typed Pydantic v2 schema validation, cross-layer checks, and repair loops before packaging the generated application configuration.",
    architecture: "Five-stage pipeline: intent extraction → system-design representation → sequential database/API/UI/auth schema generation → cross-layer validation → boot repair engine · Cerebras primary LLM + Groq/OpenAI fallback · FastAPI backend + Next.js 14 frontend · SQLite persistence.",
    idea: "Intermediate representations make generative systems easier to constrain and debug.",
  },
  {
    index: "04", title: "Hallucination Hunter", category: "LLM EVALUATION",
    thesis: "A claim-level hallucination detection platform for verifying AI-generated answers against source text.",
    video: "/videos/hallucination-hunter.mp4", poster: "/posters/hallucination-hunter.jpg",
    github: "https://github.com/HrshJha/Hallucination-Hunter",
    stack: ["Python", "FastAPI", "PyTorch", "DeBERTa-v3", "spaCy", "Hugging Face", "scikit-learn", "Docker"],
    problem: "AI-generated answers can sound confident while containing unsupported or contradictory claims. Whole-response checks are too coarse: partial hallucinations can hide inside otherwise accurate answers.",
    approach: "The pipeline decomposes an AI answer into individual claims, grounds each claim against source text using NLI and semantic similarity, then presents readable evidence so users can see which parts are supported, contradicted, or unsupported — without relying on a single opaque score.",
    architecture: "FastAPI service with detection, visualisation, and health endpoints · spaCy claim extraction · DeBERTa-v3 NLI cross-encoder for entailment/contradiction/neutral classification · Sentence-Transformers semantic grounding · Aggregation + alignment heatmap visualisation layers.",
    idea: "AI reliability needs claim-level evidence, not a single opaque confidence score.",
  },
];

/* Stack chips — verified against all four project docs + experience */
const stackChips: { name: string; color: string }[] = [
  { name: "Python",    color: "#3776AB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Java",       color: "#ED8B00" },
  { name: "SQL",        color: "#336791" },
  { name: "FastAPI",    color: "#009688" },
  { name: "Next.js",    color: "currentColor" },
  { name: "React",      color: "#61DAFB" },
  { name: "Node.js",    color: "#339933" },
  { name: "FAISS",      color: "#0070C0" },
  { name: "spaCy",      color: "#09A3D5" },
  { name: "PyTorch",    color: "#EE4C2C" },
  { name: "Hugging Face", color: "#FFD21E" },
  { name: "Pydantic",   color: "#E92063" },
  { name: "SQLAlchemy", color: "#D71F00" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Redis",      color: "#DC382D" },
  { name: "SQLite",     color: "#003B57" },
  { name: "Docker",     color: "#2496ED" },
  { name: "Nginx",      color: "#009639" },
  { name: "Prisma",     color: "currentColor" },
  { name: "Git",        color: "#F05032" },
  { name: "Vercel",     color: "currentColor" },
  { name: "Railway",    color: "#0B0D0E" },
];

/* ── CHIP ICON SVGs (inline, real brand marks) ────────── */
function ChipIcon({ name, color }: { name: string; color: string }) {
  const fill = color === "currentColor" ? "var(--text)" : color;
  const icons: Record<string, React.ReactNode> = {
    "Python": <svg viewBox="0 0 24 24" fill={fill}><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.131V3.13S18.28 0 11.914 0zm-3.21 1.814a1.046 1.046 0 1 1 0 2.092 1.046 1.046 0 0 1 0-2.092zM12.087 24c6.094 0 5.714-2.657 5.714-2.657l-.007-2.752H12v-.826h8.121S24 18.21 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.031v2.868s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.131v5.396S5.72 24 12.087 24zm3.21-1.814a1.046 1.046 0 1 1 0-2.092 1.046 1.046 0 0 1 0 2.092z"/></svg>,
    "TypeScript": <svg viewBox="0 0 24 24" fill={fill}><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
    "JavaScript": <svg viewBox="0 0 24 24" fill={fill}><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>,
    "Java": <svg viewBox="0 0 24 24" fill={fill}><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.542 1.644-2.469 6.197-3.665 5.19-7.624M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>,
    "SQL": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0C5.373 0 0 2.686 0 6v12c0 3.314 5.373 6 12 6s12-2.686 12-6V6c0-3.314-5.373-6-12-6zm0 2c5.514 0 10 2.237 10 5s-4.486 5-10 5S2 10.237 2 7.5 6.486 2 12 2zm0 18c-5.514 0-10-2.237-10-5v-2.5c2.07 1.565 5.773 2.5 10 2.5s7.93-.935 10-2.5V15c0 2.763-4.486 5-10 5zm0-5c-5.514 0-10-2.237-10-5V7.5c2.07 1.565 5.773 2.5 10 2.5s7.93-.935 10-2.5V10c0 2.763-4.486 5-10 5z"/></svg>,
    "FastAPI": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0C5.375 0 0 5.375 0 12c0 6.626 5.375 12 12 12 6.626 0 12-5.374 12-12 0-6.625-5.374-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"/></svg>,
    "Next.js": <svg viewBox="0 0 24 24" fill={fill}><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245z"/></svg>,
    "React": <svg viewBox="0 0 24 24" fill={fill}><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09c.745 0 1.295.5 1.301 1.48.01 1.512-.73 3.37-1.962 5.224a25.585 25.585 0 0 0-5.223-1.296c-.62-1.245-1.314-2.435-2.036-3.537.67-1.117 1.382-2.084 2.088-2.892 1.093 1.27 2.07 1.55 3.005 1.55.607 0 1.198-.108 1.827-.529zM4.14 8.764c-.607.28-1.185.602-1.717.963.59-1.99 1.73-3.39 2.965-3.39.342 0 .706.104 1.09.312-.778 1.048-1.56 2.281-2.338 3.648v-.533zm3.558-.532c.607 1.068 1.224 2.196 1.798 3.383a25.585 25.585 0 0 1-3.623 0c.574-1.187 1.19-2.315 1.825-3.383zm8.213 5.35c1.374.303 2.573.724 3.538 1.215C18.62 16.418 17.4 17.48 16.056 17.48c-.44 0-.935-.13-1.48-.405.588-.972 1.117-1.984 1.591-3.008.213-.457.41-.92.595-1.39-.1.018-.206.028-.311.028zM12 14.56a26.22 26.22 0 0 1-1.8-3.384 25.523 25.523 0 0 1 3.6 0A25.523 25.523 0 0 1 12 14.56zm2.36 4.455c-.437.338-.873.643-1.306.91l-.016.01C13.038 19.935 13 19.935 12.95 19.935c-.05 0-.087 0-.088-.01-.433-.267-.87-.572-1.305-.91a27.5 27.5 0 0 1-1.78-1.723 26.174 26.174 0 0 1-3.605.001c.47.99.99 1.875 1.55 2.616.606.812 1.245 1.462 1.888 1.944.438.338.876.606 1.302.805.05.023.1.034.088.034.05 0 .1-.011.15-.034.427-.2.864-.467 1.303-.805.643-.482 1.282-1.132 1.887-1.944.56-.741 1.081-1.626 1.55-2.616a26.174 26.174 0 0 1-3.58-.001 27.5 27.5 0 0 1-1.8 1.724z"/></svg>,
    "Node.js": <svg viewBox="0 0 24 24" fill={fill}><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.241l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.048-.139.142-.139.241v10.15c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.659.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.275-.924 1.604l-8.794 5.076c-.282.164-.6.247-.925.247z"/></svg>,
    "FAISS": <svg viewBox="0 0 24 24" fill={fill}><circle cx="12" cy="12" r="11" strokeWidth="1.5" stroke={fill} fill="none"/><text x="50%" y="57%" textAnchor="middle" fontSize="7" fontWeight="bold" fill={fill}>FAISS</text></svg>,
    "spaCy": <svg viewBox="0 0 24 24" fill={fill}><path d="M.2 4.8C.2 2.2 2.4 0 5 0h14c2.6 0 4.8 2.2 4.8 4.8v14.4c0 2.6-2.2 4.8-4.8 4.8H5C2.4 24 .2 21.8.2 19.2V4.8zm3.8 9L12 6.8l8 7.1-8 3.3-8-3.4z"/></svg>,
    "PyTorch": <svg viewBox="0 0 24 24" fill={fill}><path d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 13.992 9.865 9.865 0 0 0 13.992 0 9.865 9.865 0 0 0 0-13.992L16.463 9.54a5.63 5.63 0 0 1 0 7.944 5.63 5.63 0 0 1-7.944 0 5.63 5.63 0 0 1 0-7.944l3.486-3.54zM15.93 3.336a1.318 1.318 0 1 1-1.317 1.317c0-.728.59-1.317 1.317-1.317z"/></svg>,
    "Hugging Face": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm3 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8 10h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8zm1 2v1h1v-1H9zm4 0v1h1v-1h-1zm-2 2.5a2.5 2.5 0 0 0 2.449-2H8.55A2.5 2.5 0 0 0 11 14.5z"/></svg>,
    "Pydantic": <svg viewBox="0 0 24 24" fill={fill}><path d="M12.5 0L1 6.5v11L12.5 24 24 17.5v-11z"/></svg>,
    "SQLAlchemy": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0C5.383 0 0 2.695 0 6.02v11.96C0 21.305 5.383 24 12 24s12-2.695 12-6.02V6.02C24 2.695 18.617 0 12 0zm0 2c4.648 0 8.875 1.715 9.818 4H2.182C3.125 3.715 7.352 2 12 2zm0 20c-5.523 0-10-2.239-10-5v-2.154C3.855 16.254 7.656 17 12 17s8.145-.746 10-1.154V17c0 2.761-4.477 5-10 5zm0-7c-5.523 0-10-2.239-10-5V7.846C3.855 9.254 7.656 10 12 10s8.145-.746 10-1.154V10c0 2.761-4.477 5-10 5z"/></svg>,
    "PostgreSQL": <svg viewBox="0 0 24 24" fill={fill}><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.082.023A10.47 10.47 0 0 0 12 0C9.053 0 6.403 1.128 4.388 2.965a11.64 11.64 0 0 0-.49-.299C2.37 1.866.653 1.884.653 1.884s-.714 2.176.779 4.226a11.23 11.23 0 0 0-.608 3.5C.824 15.5 5.864 20 12 20c.368 0 .732-.016 1.092-.046.073.148.147.293.223.435a3.5 3.5 0 0 0 6.262-2.1 12.057 12.057 0 0 0 3.197-8.18C22.774 4.5 20.42 0 17.128 0zM12 4.615a6 6 0 0 1 1.615.215 7.036 7.036 0 0 0-3.25 4.347A7.029 7.029 0 0 0 8.53 7.43 7.015 7.015 0 0 1 12 4.615z"/></svg>,
    "Redis": <svg viewBox="0 0 24 24" fill={fill}><path d="M10.838 10.78L8.637 12l2.201 1.22 2.2-1.22zM0 15.866v1.492l5.738 3.018 5.736-3.018v-1.492L5.738 18.88zM23.977 5.57L12.09.03 0 5.588l3.03 1.57 8.9-4.67 9.01 4.673zM5.737 7.16L0 10.19l5.738 3.03 5.736-3.03zm12.484 0L12.486 10.19l5.735 3.03 5.736-3.03zm-6.249 3.588L6.235 13.77l-5.732 3.02 5.734 3.02 5.735-3.02V13.77l5.737-3.023-.002-.002zm6.249 2.41l-5.735 3.02v1.49l5.735 3.02 5.78-3.02v-1.49z"/></svg>,
    "SQLite": <svg viewBox="0 0 24 24" fill={fill}><path d="M21.678.521C20.467-.296 18.895-.036 17.5.572c-1.694.75-3.24 2.066-4.566 3.556-1.67 1.867-3.12 4.234-4.012 6.702-.773 2.15-1.127 4.59-.775 6.86.124.783.332 1.635.8 2.248-1.01 1.66-1.844 3.472-2.353 5.365-.185.683.554 1.17 1.166.792.25-.154.33-.52.49-.76.18-.27.35-.548.53-.82.33-.517.67-1.025 1.025-1.524.35.175.705.335 1.075.47 2.34.855 5.055.65 7.255-.375 2.255-1.056 4.02-2.96 5.055-5.203.93-2.01 1.23-4.37.87-6.564-.355-2.11-1.37-4.094-2.805-5.614 1.07-1.18 1.965-2.506 2.455-3.916.575-1.68.558-3.564-.83-4.468zm-5.477 5.73c.555-.005 1.085.1 1.58.31.07.03.097.123.062.195-.38.77-.985 1.498-1.675 2.08-.43.368-.888.71-1.367 1.016a15.097 15.097 0 0 0-.652-2.087c.578-.935 1.27-1.508 2.052-1.513zM4.515 22.474c-.08.124-.28.138-.38.02a.28.28 0 0 1-.032-.275c.48-1.34 1.09-2.635 1.83-3.85.23.78.54 1.543.93 2.264-.8.617-1.594 1.223-2.348 1.84z"/></svg>,
    "Docker": <svg viewBox="0 0 24 24" fill={fill}><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.498 10.354 10.354 0 0 0 2.61-2.97c1.237-1.986 1.973-4.184 2.12-6.443h.187c1.15 0 1.862-.starting.45-2.137-.016-.026-.051-.051-.075z"/></svg>,
    "Nginx": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0L1.605 6v12L12 24l10.395-6V6zm0 1.156l9.364 5.41v10.869L12 22.844 2.636 17.435V6.566zm.87 4.26a.435.435 0 0 0-.435.435v7.41L7.8 9.956a.435.435 0 0 0-.435-.436h-.869a.435.435 0 0 0-.435.435v7.39c0 .24.194.435.435.435h.869a.435.435 0 0 0 .435-.435v-7.41l4.635 3.305a.435.435 0 0 0 .435.436h.869a.435.435 0 0 0 .435-.435V5.85a.435.435 0 0 0-.435-.435z"/></svg>,
    "Prisma": <svg viewBox="0 0 24 24" fill={fill}><path d="M21.8074 18.2228 13.4605.8c-.3-.63-1.2-.63-1.5 0l-11 23c-.15.32-.1.7.14.96.23.26.6.34.91.19l8.01-3.96 9.81 3.96c.12.05.25.07.38.07.22 0 .44-.09.6-.27.24-.26.28-.64.13-.95zM12 3.4328l6.91 14.54-7.32-2.96c-.22-.09-.47-.07-.67.05l-5.82 2.88z"/></svg>,
    "Git": <svg viewBox="0 0 24 24" fill={fill}><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>,
    "Vercel": <svg viewBox="0 0 24 24" fill={fill}><path d="M24 22.525H0l12-21.05z"/></svg>,
    "Railway": <svg viewBox="0 0 24 24" fill={fill}><path d="M0 12.005C0 5.37 5.37 0 12.005 0 18.64 0 24 5.37 24 12.005c0 6.63-5.37 12.006-11.995 12.006C5.369 24.011 0 18.635 0 12.005zM1.329 12.97h8.95l-4.36-7.564-4.59 7.564zm9.82-10.128L6.16 11.053h9.988l-4.999-8.211zm2.45 10.128h8.944L17.96 5.406l-4.361 7.564zm-4.028 1.031 4.99 8.182 4.989-8.182H9.571z"/></svg>,
    "BM25": <svg viewBox="0 0 24 24" fill={fill}><circle cx="12" cy="12" r="11" strokeWidth="1.5" stroke={fill} fill="none"/><text x="50%" y="57%" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill={fill}>BM25</text></svg>,
    "DeBERTa-v3": <svg viewBox="0 0 24 24" fill={fill}><circle cx="12" cy="12" r="11" strokeWidth="1.5" stroke={fill} fill="none"/><text x="50%" y="57%" textAnchor="middle" fontSize="5" fontWeight="bold" fill={fill}>DeBERTa</text></svg>,
    "scikit-learn": <svg viewBox="0 0 24 24" fill={fill}><path d="M.119 13.78c.307 2.664 1.55 5.007 3.395 6.7l3.33-3.257-.047-.066C5.59 15.656 5.04 13.605 5.04 11.4c0-1.58.304-3.077.841-4.462L2.575 4.025C1.057 6.072.155 8.61.005 11.35c-.07 1.22.054 2.443.114 2.43z"/><path d="M11.4 5.04c2.204 0 4.256.55 6.06 1.762l3.256-3.258A11.901 11.901 0 0 0 11.4 0C8.636 0 6.1.913 4.05 2.432l2.914 2.913A8.34 8.34 0 0 1 11.4 5.04z"/><path d="M11.4 18.96a8.34 8.34 0 0 1-4.437-1.277L3.707 21.57A11.903 11.903 0 0 0 11.4 24c2.765 0 5.302-.913 7.353-2.432l-2.914-2.913A8.34 8.34 0 0 1 11.4 18.96z"/><path d="M22.8 11.4c0 1.58-.303 3.077-.84 4.462l3.306 3.112A11.9 11.9 0 0 0 24 11.4c-.001-2.764-.914-5.3-2.432-7.35L18.654 6.96A8.34 8.34 0 0 1 22.8 11.4z"/></svg>,
    "Sentence-Transformers": <svg viewBox="0 0 24 24" fill={fill}><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.522 0 10 4.478 10 10s-4.478 10-10 10S2 17.522 2 12 6.478 2 12 2zm-1 4v1H7v2h4v1H7v2h4v1H7v2h8v-2h-4v-1h4v-2h-4V9h4V7h-4V6z"/></svg>,
    "XGBoost": <svg viewBox="0 0 24 24" fill={fill}><circle cx="12" cy="12" r="11" strokeWidth="1.5" stroke={fill} fill="none"/><text x="50%" y="57%" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill={fill}>XGB</text></svg>,
    "Supabase": <svg viewBox="0 0 24 24" fill={fill}><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.59.72 13.39 1.424 13.39h9.99l.035 9.883c.015.986 1.26 1.41 1.874.637l9.262-11.653c.434-.54.044-1.34-.66-1.34h-9.99L11.9 1.036z"/></svg>,
  };
  return (
    <span className="chip-icon" aria-hidden="true">
      {icons[name] ?? (
        <svg viewBox="0 0 24 24" fill={fill}><circle cx="12" cy="12" r="10"/></svg>
      )}
    </span>
  );
}

/* ── REVEAL ───────────────────────────────────────────── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── VIDEO PLAYER ─────────────────────────────────────── */
function VideoPlayer({ project, onActive }: { project: Project; onActive: (v: HTMLVideoElement) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  const playVideo = useCallback((muted = false) => {
    const v = videoRef.current; if (!v) return;
    setStarted(true); v.muted = muted; setMuted(muted); onActive(v);
    v.play().then(() => setPlaying(true)).catch(() => setError(true));
  }, [onActive]);

  const pauseVideo = useCallback((reset = false) => {
    const v = videoRef.current; if (!v) return;
    v.pause();
    if (reset) { v.currentTime = 0; setStarted(false); }
    setPlaying(false);
    setMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches && !started) {
      playVideo(true);
    }
  }, [started, playVideo]);

  return (
    <div
      className="video-shell"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => pauseVideo(true)}
    >
      <video
        ref={videoRef}
        preload="none"
        poster={project.poster}
        playsInline
        aria-label={`${project.title} product demo video`}
        onEnded={() => pauseVideo(true)}
        onError={() => setError(true)}
      >
        <source src={project.video} type="video/mp4" />
      </video>

      {!playing && (
        <div className="video-overlay clickable">
          <button
            className="video-play-btn"
            onClick={() => playVideo(false)}
            aria-label={`Play ${project.title} demo`}
          >
            <Play size={22} fill="currentColor" />
          </button>
        </div>
      )}
      {playing && (
        <div className="video-controls">
          <button className="video-control-btn" onClick={toggleMute} aria-label={muted ? `Unmute ${project.title} demo` : `Mute ${project.title} demo`}>
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button className="video-pause-btn" onClick={() => pauseVideo(false)} aria-label={`Pause ${project.title} demo`}>
            <Pause size={14} fill="currentColor" />
            <span>Pause</span>
          </button>
        </div>
      )}
      {error && (
        <p className="video-error-msg">Video unavailable — click play to retry.</p>
      )}
    </div>
  );
}

/* ── PROJECT SHOWCASE ─────────────────────────────────── */
function ProjectShowcase({ project, onActive }: { project: Project; onActive: (v: HTMLVideoElement) => void }) {
  const id = project.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <motion.article
      className="project-article section-pad"
      id={id}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
    >
      <Reveal>
        <div className="project-kicker">
          <span className="project-index">{project.index} / PROJECT</span>
          <span className="project-cat">{project.category}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-thesis">{project.thesis}</p>
      </Reveal>

      <Reveal>
        <div className="project-card">
          <div className="project-media-panel">
            <VideoPlayer project={project} onActive={onActive} />
            <div className="project-media-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="project-action project-action-primary">
                <GitFork size={14} /> View Code
              </a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="project-action project-action-secondary">
                  Live Demo <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          <div className="project-info-panel">
            {([
              ["Problem", project.problem],
              ["Approach", project.approach],
              ["Architecture", project.architecture],
            ] as [string, string][]).map(([label, copy]) => (
              <div className="info-row" key={label}>
                <span className="detail-label">{label}</span>
                <p className="detail-body">{copy}</p>
                {label === "Architecture" && (
                  <div className="project-stack-chips" aria-label={`${project.title} technology stack`}>
                    {project.stack.map((name) => {
                      const chip = stackChips.find((item) => item.name === name);
                      return (
                        <motion.span
                          className="project-stack-chip"
                          key={name}
                          whileHover={{ scale: 1.08, y: -1 }}
                          transition={{ type: "spring", stiffness: 280, damping: 28 }}
                          style={{ "--chip-color": chip?.color === "currentColor" ? "var(--text)" : chip?.color } as React.CSSProperties}
                          title={name}
                        >
                          <ChipIcon name={name} color={chip?.color || "currentColor"} />
                          <span>{name}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="info-row info-row-idea">
              <span className="detail-label">Key idea</span>
              <p className="detail-body idea">{project.idea}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </motion.article>
  );
}

/* ── HOME ─────────────────────────────────────────────── */
export default function Home() {
  const [theme, setTheme] = useState("light");
  const currentVideo = useRef<HTMLVideoElement | null>(null);

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

  const onActive = (video: HTMLVideoElement) => {
    if (currentVideo.current && currentVideo.current !== video) {
      currentVideo.current.pause();
      currentVideo.current.currentTime = 0;
    }
    currentVideo.current = video;
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
          <svg className="aperture-motif" viewBox="0 0 900 700" aria-hidden="true">
            <circle cx="640" cy="280" r="255" />
            <circle cx="640" cy="280" r="205" />
            <circle cx="640" cy="280" r="150" />
            <path d="M386 280h508M640 26v508" />
            <path d="M460 100l360 360M820 100L460 460" />
          </svg>
          <div className="hero-inner">
            {/* Sarvam botanical ornament — visible in light mode only */}
            <svg
              className="hero-ornament"
              viewBox="0 0 280 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* left flourish */}
              <path d="M16 44 C16 44 8 36 12 26 C16 16 28 18 28 26 C28 34 20 38 16 44 Z" stroke="white" strokeWidth="1.2" fill="none" opacity=".9"/>
              <path d="M16 44 C16 44 6 40 4 30 C2 20 10 14 18 20 C24 24 22 34 16 44 Z" stroke="white" strokeWidth="1" fill="none" opacity=".75"/>
              <path d="M16 44 C16 44 10 48 6 44 C2 40 4 34 10 36 C14 38 16 44 16 44 Z" stroke="white" strokeWidth=".9" fill="none" opacity=".65"/>
              <path d="M14 46 Q12 50 10 52" stroke="white" strokeWidth=".8" fill="none" opacity=".5"/>
              <path d="M18 46 Q16 52 14 56" stroke="white" strokeWidth=".8" fill="none" opacity=".5"/>
              {/* center dot cluster */}
              <circle cx="140" cy="48" r="1.8" fill="white" opacity=".7"/>
              <circle cx="140" cy="40" r="1.2" fill="white" opacity=".5"/>
              {/* right flourish (mirrored) */}
              <path d="M264 44 C264 44 272 36 268 26 C264 16 252 18 252 26 C252 34 260 38 264 44 Z" stroke="white" strokeWidth="1.2" fill="none" opacity=".9"/>
              <path d="M264 44 C264 44 274 40 276 30 C278 20 270 14 262 20 C256 24 258 34 264 44 Z" stroke="white" strokeWidth="1" fill="none" opacity=".75"/>
              <path d="M264 44 C264 44 270 48 274 44 C278 40 276 34 270 36 C266 38 264 44 264 44 Z" stroke="white" strokeWidth=".9" fill="none" opacity=".65"/>
              <path d="M266 46 Q268 50 270 52" stroke="white" strokeWidth=".8" fill="none" opacity=".5"/>
              <path d="M262 46 Q264 52 266 56" stroke="white" strokeWidth=".8" fill="none" opacity=".5"/>
              {/* horizontal base line */}
              <line x1="28" y1="52" x2="252" y2="52" stroke="white" strokeWidth=".8" opacity=".45"/>
              {/* small mid ticks */}
              <line x1="100" y1="48" x2="100" y2="56" stroke="white" strokeWidth=".7" opacity=".35"/>
              <line x1="180" y1="48" x2="180" y2="56" stroke="white" strokeWidth=".7" opacity=".35"/>
            </svg>

            <p className="hero-eyebrow">ECE · AI/ML · Software</p>
            <div className="eyebrow-rule" aria-hidden="true" />
            <h1 className="hero-name" id="hero-heading">
              <span className="name-line">Harsh</span>
              <span className="name-line">Kumar Jha<span className="accent-dot">.</span></span>
            </h1>
            <p className="hero-copy">
              Building AI systems through machine learning and engineering.
            </p>
            <div className="hero-ctas">
              <a href="#work" className="btn btn-primary">
                View Work <ArrowUpRight size={16} />
              </a>
              <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="btn">
                <ExternalLink size={15} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer" className="btn btn-ghost">
                LinkedIn
              </a>
              <a href="https://x.com/haarshjha" target="_blank" rel="noreferrer" className="btn btn-ghost">
                X
              </a>
            </div>
          </div>
        </section>

        {/* ── SELECTED WORK ───────────────────────────────── */}
        <section id="work" className="work-section" aria-labelledby="work-heading">
          <div className="section-pad">
            <Reveal>
              <div className="section-header">
                <p className="section-kicker">01 / Selected Work</p>
                <h2 className="section-title" id="work-heading">
                  Four systems, each grounded in a real product workflow.
                </h2>
              </div>
            </Reveal>
          </div>
          {projects.map(p => (
            <ProjectShowcase key={p.title} project={p} onActive={onActive} />
          ))}
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────── */}
        <section id="experience" className="exp-section section-pad" aria-labelledby="exp-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">02 / Experience</p>
              <h2 className="section-title" id="exp-heading">
                Where the questions got sharper.
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
                  <p className="exp-role">AI/ML Intern · AI Safety &amp; Evaluation Research</p>
                  <div className="exp-stack">
                    {["FastAPI", "NLP", "LLM Evaluation", "Retrieval Systems", "Python"].map(t => (
                      <span key={t} className="exp-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <ul className="exp-bullets">
                  <li>Researched AI safety, adversarial testing, and LLM evaluation across reliability workflows — hallucination detection and failure taxonomy work.</li>
                  <li>Built evaluation experiments, benchmarks, and adversarial threat taxonomies for language models deployed in production contexts.</li>
                  <li>Contributed to LLM integration, model testing, and AI evaluation pipeline development using FastAPI and NLP retrieval systems.</li>
                  <li>Connected evaluation work to source-backed portfolio themes around AI reliability, producing Hallucination Hunter as the flagship deliverable.</li>
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
                    {["AI-assisted workflows", "Dataset organisation", "Content validation", "Research"].map(t => (
                      <span key={t} className="exp-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <ul className="exp-bullets">
                  <li>Validated and structured 2,000+ JEE Physics questions for educational question banks — content scope was the primary engineering surface.</li>
                  <li>Applied AI-assisted workflows to quality assurance and content validation, learning that structured review still requires domain judgment.</li>
                  <li>Contributed to dataset organisation for structured question workflows, improving reusability and inspection reliability of the content base.</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────── */}
        <section id="about" className="about-section section-pad" aria-labelledby="about-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">03 / About</p>
              <h2 className="section-title" id="about-heading">
                Systems over demos. Evidence over adjectives.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <p className="about-body">
              I&apos;m an Electronics and Communication Engineering student at MSIT, building toward
              <em> research and production AI engineering.</em> I&apos;m drawn to the engineering
              work around intelligent systems — how they retrieve, reason, validate, and become
              useful in the real world. Photography sharpens how I think about signal versus noise,
              and that same instinct runs through every system I build.
            </p>
          </Reveal>
        </section>

        {/* ── SKILLS / TOOLKIT ────────────────────────────── */}
        <section className="skills-section section-pad" aria-labelledby="skills-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">04 / Toolkit</p>
              <h2 className="section-title" id="skills-heading">
                Tools I reach for when the system calls for them.
              </h2>
            </div>
          </Reveal>

          {/* Categorised groups */}
          <Reveal>
            <div className="skill-groups">
              {([
                ["Programming", "Python · TypeScript · JavaScript · Java · SQL"],
                ["AI / ML", "LLMs · RAG · NLP · FAISS · BM25 · Hugging Face · Sentence-Transformers · PyTorch · spaCy · scikit-learn"],
                ["Backend", "FastAPI · REST APIs · JWT · Pydantic v2 · SQLAlchemy · Alembic"],
                ["Data / Infra", "PostgreSQL · Redis · SQLite · Supabase · Docker · Nginx · Railway · Vercel"],
                ["Dev Tools", "Git · GitHub · Jupyter · Postman · VS Code · Linux"],
              ] as [string, string][]).map(([label, items]) => (
                <div className="skill-group" key={label}>
                  <p className="skill-group-label">{label}</p>
                  <p className="skill-group-items">{items}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Stack chips — flattened from projects */}
          <Reveal>
            <p className="stack-label">Stack</p>
            <div className="chip-field" role="list">
              {stackChips.map(({ name, color }) => (
                <div key={name} className="stack-chip" role="listitem" title={name}>
                  <ChipIcon name={name} color={color} />
                  <span className="chip-name">{name}</span>
                </div>
              ))}
            </div>
            <div className="chip-divider" aria-hidden="true" />
          </Reveal>
        </section>

        {/* ── EDUCATION ───────────────────────────────────── */}
        <section className="education-section section-pad" aria-labelledby="edu-heading">
          <Reveal>
            <div className="section-header">
              <p className="section-kicker">05 / Education</p>
              <h2 className="section-title" id="edu-heading">
                Maharaja Surajmal Institute of Technology
              </h2>
            </div>
            <div className="edu-block">
              <div className="edu-main">
                <p className="edu-degree">B.Tech — Electronics &amp; Communication Engineering</p>
                <p className="edu-school">MSIT, Delhi · Affiliated to GGSIPU</p>
                <p className="edu-cgpa">CGPA 8.36</p>
              </div>
              <span className="edu-period">2025 — 2029</span>
            </div>
          </Reveal>
        </section>

        {/* ── CONTACT ─────────────────────────────────────── */}
        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-heading">
          <div className="contact-container">
            <Reveal>
              <p className="section-kicker">06 / Contact</p>
              <h2 className="contact-title" id="contact-heading">
                Let&apos;s build something<br />
                <em>that holds up.</em>
              </h2>
            </Reveal>

            <div className="contact-grid">
              {/* Left Column: Contact Info & Socials */}
              <Reveal className="contact-left">
                <div className="contact-block">
                  <span className="contact-label">EMAIL</span>
                  <a href="mailto:jhaharsh451@gmail.com" className="contact-email-link">
                    <span className="email-text">jhaharsh451@gmail.com</span>
                    <ArrowUpRight size={18} className="email-arrow" />
                  </a>
                </div>

                <div className="contact-block social-block">
                  <span className="contact-label">SOCIAL</span>
                  <div className="social-list">
                    <a href="https://github.com/HrshJha" target="_blank" rel="noreferrer" className="social-row-link">
                      <span className="social-row-name">GitHub</span>
                      <ArrowUpRight size={16} className="social-row-arrow" />
                    </a>
                    <a href="https://www.linkedin.com/in/hrshjha" target="_blank" rel="noreferrer" className="social-row-link">
                      <span className="social-row-name">LinkedIn</span>
                      <ArrowUpRight size={16} className="social-row-arrow" />
                    </a>
                    <a href="https://x.com/haarshjha" target="_blank" rel="noreferrer" className="social-row-link">
                      <span className="social-row-name">X</span>
                      <ArrowUpRight size={16} className="social-row-arrow" />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Send A Message Form */}
              <Reveal className="contact-right">
                <div className="contact-form-wrap">
                  <span className="contact-label">SEND A MESSAGE</span>
                  <form
                    className="contact-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      emitCompanionEvent({ type: "FORM_SUBMIT_START" });
                      const form = e.currentTarget;
                      const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
                      const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
                      const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;
                      window.setTimeout(() => emitCompanionEvent({ type: "FORM_SUBMIT_SUCCESS" }), 420);
                      window.location.href = `mailto:jhaharsh451@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="Your email"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="form-textarea"
                      />
                    </div>

                    <button type="submit" className="contact-submit-btn">
                      <span>Send message</span>
                      <ArrowUpRight size={16} className="submit-arrow" />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <span className="footer-name">HARSH KUMAR JHA</span>
        <span className="footer-line">Building things. Learning systems. Exploring AI.</span>
        <span className="footer-copy">© 2026</span>
      </footer>
    </>
  );
}
