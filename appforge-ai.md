# AppForge AI

## One-line Summary

AppForge AI is a compiler-inspired AI application generation platform.

## Project Metadata

- Category: Developer Tool
- Status: Completed
- GitHub: https://github.com/HrshJha/AppForge-AI
- Primary Engineering Focus: AI application generation
- Tech Stack: Python, FastAPI, Next.js, TypeScript, Tailwind CSS, Pydantic, Cerebras, Groq, OpenAI, SQLite, SQLAlchemy, Railway

## The Problem

Standard LLM coding assistants often generate raw code without enough structure, validation, or repair logic. That makes prompt-to-application workflows brittle when outputs need to become coherent system designs instead of one-off snippets.

## The Solution

AppForge AI treats natural-language application generation as a compilation problem. It uses a staged pipeline with intermediate representations, typed schema validation, cross-layer checks, and repair loops before packaging the generated application configuration.

The system combines a FastAPI backend, a Next.js frontend, and multiple LLM providers for generation and fallback behavior.

## Architecture

- Intent extraction converts natural language into an intent representation.
- System design transforms intent into a structured system design representation.
- Sequential schema generation produces database, API, UI, and auth schemas.
- Validation and repair loops check cross-layer consistency.
- A boot repair engine normalizes generated structures before packaging.

## Key Features

- Five-stage generation pipeline.
- Cerebras primary LLM provider with Groq and OpenAI fallback paths.
- Strict Pydantic v2 schema validation.
- Cross-layer validation and LLM-assisted repair.
- Persistent compile history in the frontend dashboard.
- Railway-ready backend deployment configuration.

## Technical Highlights

- FastAPI backend.
- Next.js 14 frontend.
- Pydantic v2 validation engine.
- Cerebras, Groq, and OpenAI LLM integrations.
- SQLite and SQLAlchemy persistence.
- Pipeline timeout and token-budget handling.

## Challenges

- Preventing generated application structures from drifting across layers.
- Handling provider limits and truncated model responses.
- Designing deterministic repair loops around nondeterministic LLM output.
- Keeping generation stages explicit enough to debug.

## What I Learned

- Compiler-style structure makes AI generation more inspectable.
- Intermediate representations help constrain model output.
- Validation and repair loops are core architecture, not polish.
- Provider fallback and timeout handling shape product reliability.

## Repository

GitHub: https://github.com/HrshJha/AppForge-AI
