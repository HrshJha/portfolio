# Candidate Intelligence System

## One-line Summary

Candidate Intelligence System is an AI-powered resume intelligence backend for semantic matching and explainable candidate ranking.

## Project Metadata

- Category: AI Platform
- Status: Completed
- GitHub: https://github.com/HrshJha/resume-checker
- Primary Engineering Focus: Resume intelligence
- Tech Stack: Python, FastAPI, Docker, SQLAlchemy, Alembic, FAISS, Sentence-Transformers, BM25, Redis, PostgreSQL, SQLite, Nginx

## The Problem

Traditional applicant tracking workflows over-index on keywords and often miss semantic relevance between resumes and job descriptions. They also make it difficult for recruiters and hiring teams to understand why a candidate was recommended.

## The Solution

Candidate Intelligence System converts resumes and job descriptions into structured intelligence. It parses documents, normalizes skills, retrieves relevant candidates through hybrid search, reranks matches, and produces explainable scoring signals for recruiter review.

The project is implemented as a backend-first FastAPI system with modular parsing, retrieval, ranking, persistence, and API layers.

## Architecture

- FastAPI exposes authentication, job, candidate, and search routes.
- Resume and job-description parsers extract structured fields and embeddings.
- FAISS dense retrieval and BM25 sparse retrieval feed a hybrid retriever.
- Cross-encoder reranking and learning-to-rank abstractions refine candidate order.
- SQLAlchemy, Alembic, PostgreSQL-ready persistence, Redis, and Nginx support deployment.

## Key Features

- Resume parsing for PDF, DOCX, and OCR-backed scanned documents.
- Job description parsing for role requirements and skill groups.
- Hybrid semantic and keyword retrieval.
- Cross-encoder reranking for job-resume pairs.
- Explainable ranking records with feature contribution support.
- JWT authentication and protected API endpoints.

## Technical Highlights

- Python FastAPI backend.
- SQLAlchemy 2.0 async ORM with Alembic migrations.
- FAISS vector search and BM25 sparse search.
- Sentence-Transformers cross-encoder reranking.
- Docker compose stack with API, PostgreSQL, Redis, and Nginx.
- Unit and integration tests for parser and API behavior.

## Challenges

- Parsing heterogeneous resume formats reliably.
- Balancing semantic retrieval with keyword precision.
- Producing ranking explanations instead of opaque scores.
- Designing a backend-first system that can support future recruiter UI workflows.

## What I Learned

- Resume intelligence needs explainability as much as retrieval quality.
- Hybrid search improves candidate discovery over one retrieval method alone.
- Ranking systems are easier to evolve when parsing, retrieval, and scoring are modular.
- Hiring data products require careful API and persistence boundaries.

## Repository

GitHub: https://github.com/HrshJha/resume-checker
