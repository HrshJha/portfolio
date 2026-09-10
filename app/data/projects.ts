export type Project = {
  id: string;
  index: string;
  title: string;
  year: string;
  category: string;
  thesis: string;
  shortDescription: string;
  video: string;
  poster: string;
  github: string;
  liveDemo?: string;
  cardStack: string[];
  fullStack: string[];
  problem: string;
  approach: string;
  architecture: string;
  keyIdea: string;
};

export const projects: Project[] = [
  {
    id: "frameos",
    index: "01",
    title: "FrameOS",
    year: "2026",
    category: "AI INFRASTRUCTURE",
    thesis: "An AI-native media infrastructure platform for scaling autonomous content operations.",
    shortDescription: "AI-native media orchestration platform that organizes content operations into autonomous pipeline stages for research, scripting, rendering, publishing, and analytics.",
    video: "/videos/frameos.mp4",
    poster: "/posters/frameos.jpg",
    github: "https://github.com/HrshJha/FrameOS",
    cardStack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    fullStack: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Redis", "Docker", "Prisma"],
    problem: "Short-form media production breaks down when research, script generation, rendering, publishing, and analytics live as disconnected manual steps — creating context switching, inconsistent quality, and operational bottlenecks when one operator manages multiple content pipelines.",
    approach: "FrameOS treats media production as infrastructure instead of isolated content tasks. It organises content work into autonomous pipeline stages — research, script generation, content assembly, rendering, publishing, analytics collection, and feedback learning — with the operator setting direction and the system carrying execution.",
    architecture: "Next.js + React interface · TypeScript application code · Node.js backend services · PostgreSQL/Supabase data layer · Redis-backed queue orchestration · Dockerized system components · Prisma ORM.",
    keyIdea: "Make creative automation inspectable by separating operator direction from system execution.",
  },
  {
    id: "vera",
    index: "02",
    title: "Vera",
    year: "2026",
    category: "MERCHANT GROWTH ENGINE",
    thesis: "A deterministic merchant engagement system where the system decides and the LLM writes.",
    shortDescription: "Context-aware merchant growth assistant that ranks triggers, grounds messages in sourced fact packets, rotates model keys, and validates every outbound WhatsApp draft.",
    video: "",
    poster: "",
    github: "https://github.com/HrshJha/vera",
    liveDemo: "https://vera-dctv.onrender.com",
    cardStack: ["Python", "FastAPI", "Gemini", "Pydantic"],
    fullStack: ["Python", "FastAPI", "Gemini Flash", "OpenRouter", "Pydantic", "JSONL", "Redis"],
    problem: "Merchant outreach needs to be timely and specific without turning the language model into the decision-maker. Repeated messages, unsupported claims, and rate limits make generic automation unreliable.",
    approach: "Vera separates deterministic decision intelligence from generative drafting. Hard gates, priority ranking, suppression, and time tracking decide whether a message should exist; a grounded composer writes it; a validator checks tone, claims, and CTA safety before it ships.",
    architecture: "FastAPI service · versioned context store · deterministic conversation machine · 7 hard gates + 10-factor ranker · fact packet builder with provenance · Gemini Flash composer · output validator · auto-rotating multi-key pool with cooldown and failover.",
    keyIdea: "The deterministic system decides. The LLM writes.",
  },
  {
    id: "candidate-intelligence-system",
    index: "02",
    title: "Candidate Intelligence System",
    year: "2026",
    category: "AI PLATFORM",
    thesis: "A backend-first resume intelligence system for semantic matching and explainable candidate ranking.",
    shortDescription: "Backend-first resume intelligence system that converts resumes and JDs into structured intelligence using hybrid FAISS dense and BM25 sparse search with cross-encoder reranking.",
    video: "/videos/candidate-intelligence-system.mp4",
    poster: "/posters/candidate-intelligence-system.jpg",
    github: "https://github.com/HrshJha/resume-checker",
    cardStack: ["Python", "FastAPI", "FAISS", "BM25", "PostgreSQL", "Docker"],
    fullStack: ["Python", "FastAPI", "FAISS", "BM25", "Sentence-Transformers", "PostgreSQL", "Redis", "Docker", "SQLAlchemy"],
    problem: "Traditional applicant tracking workflows over-index on keywords and often miss semantic relevance between resumes and job descriptions. They also make it difficult for reviewers to understand why a candidate surfaced.",
    approach: "The system converts resumes and job descriptions into structured intelligence. It parses documents, normalises skills, retrieves candidates through hybrid FAISS dense and BM25 sparse search, reranks matches with a cross-encoder, and produces explainable scoring signals.",
    architecture: "FastAPI routes for auth, job, candidate, and search · Resume + JD parsers · FAISS dense + BM25 sparse hybrid retrieval · Cross-encoder reranking · SQLAlchemy 2.0 async ORM + Alembic migrations · PostgreSQL + Redis + Nginx deployment stack.",
    keyIdea: "Retrieval is only useful in hiring when a person can inspect why a match surfaced.",
  },
  {
    id: "appforge-ai",
    index: "03",
    title: "AppForge AI",
    year: "2025",
    category: "DEVELOPER TOOL",
    thesis: "A compiler-inspired pipeline that turns a natural-language application idea into validated system structure.",
    shortDescription: "Compiler-inspired pipeline that converts natural-language product ideas into validated system designs with intermediate representations, Pydantic v2 schemas, and repair loops.",
    video: "/videos/appforge-ai.mp4",
    poster: "/posters/appforge-ai.jpg",
    github: "https://github.com/HrshJha/AppForge-AI",
    cardStack: ["Python", "FastAPI", "Next.js", "TypeScript", "Pydantic", "Docker"],
    fullStack: ["Python", "FastAPI", "Next.js", "TypeScript", "Pydantic", "SQLite", "Docker", "Railway"],
    problem: "Standard LLM coding assistants generate raw code without enough structure, validation, or repair logic. That makes prompt-to-application workflows brittle when outputs need to become coherent system designs rather than one-off snippets.",
    approach: "AppForge treats natural-language application generation as a compilation problem. It uses a staged pipeline with intermediate representations, typed Pydantic v2 schema validation, cross-layer checks, and repair loops before packaging the generated application configuration.",
    architecture: "Five-stage pipeline: intent extraction → system-design representation → sequential database/API/UI/auth schema generation → cross-layer validation → boot repair engine · Cerebras primary LLM + Groq/OpenAI fallback · FastAPI backend + Next.js 14 frontend · SQLite persistence.",
    keyIdea: "Intermediate representations make generative systems easier to constrain and debug.",
  },
  {
    id: "hallucination-hunter",
    index: "04",
    title: "Hallucination Hunter",
    year: "2026",
    category: "LLM EVALUATION",
    thesis: "A claim-level hallucination detection platform for verifying AI-generated answers against source text.",
    shortDescription: "Claim-level hallucination detection platform that decomposes model responses, grounds individual claims with NLI and semantic similarity, and surfaces explainable verification heatmaps.",
    video: "/videos/hallucination-hunter.mp4",
    poster: "/posters/hallucination-hunter.jpg",
    github: "https://github.com/HrshJha/Hallucination-Hunter",
    cardStack: ["Python", "FastAPI", "PyTorch", "DeBERTa-v3", "Hugging Face"],
    fullStack: ["Python", "FastAPI", "PyTorch", "DeBERTa-v3", "Hugging Face", "scikit-learn", "Docker"],
    problem: "AI-generated answers can sound confident while containing unsupported or contradictory claims. Whole-response checks are too coarse: partial hallucinations can hide inside otherwise accurate answers.",
    approach: "The pipeline decomposes an AI answer into individual claims, grounds each claim against source text using NLI and semantic similarity, then presents readable evidence so users can see which parts are supported, contradicted, or unsupported — without relying on a single opaque score.",
    architecture: "FastAPI service with detection, visualisation, and health endpoints · Claim extraction & decomposition · DeBERTa-v3 NLI cross-encoder for entailment/contradiction/neutral classification · Sentence-Transformers semantic grounding · Aggregation + alignment heatmap visualisation layers.",
    keyIdea: "AI reliability needs claim-level evidence, not a single opaque confidence score.",
  },
];

export const stackChips: { name: string; color: string }[] = [
  { name: "Python", color: "#3776AB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Java", color: "#ED8B00" },
  { name: "SQL", color: "#336791" },
  { name: "FastAPI", color: "#009688" },
  { name: "Next.js", color: "currentColor" },
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "FAISS", color: "#0070C0" },
  { name: "spaCy", color: "#09A3D5" },
  { name: "PyTorch", color: "#EE4C2C" },
  { name: "Hugging Face", color: "#FFD21E" },
  { name: "Pydantic", color: "#E92063" },
  { name: "SQLAlchemy", color: "#D71F00" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Redis", color: "#DC382D" },
  { name: "SQLite", color: "#003B57" },
  { name: "Docker", color: "#2496ED" },
  { name: "Nginx", color: "#009639" },
  { name: "Prisma", color: "currentColor" },
  { name: "Git", color: "#F05032" },
  { name: "Vercel", color: "currentColor" },
  { name: "Railway", color: "#0B0D0E" },
  { name: "BM25", color: "currentColor" },
  { name: "DeBERTa-v3", color: "currentColor" },
  { name: "Sentence-Transformers", color: "currentColor" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "scikit-learn", color: "#F7931E" },
];
