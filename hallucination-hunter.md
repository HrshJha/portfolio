# Hallucination Hunter

## One-line Summary

Hallucination Hunter is a claim-level hallucination detection platform for verifying AI-generated answers.

## Project Metadata

- Category: LLM Evaluation
- Status: Completed
- GitHub: https://github.com/HrshJha/Hallucination-Hunter
- Primary Engineering Focus: Hallucination detection
- Tech Stack: Python, FastAPI, PyTorch, Hugging Face Transformers, spaCy, scikit-learn, XGBoost, Pandas, Seaborn, Docker

## The Problem

AI-generated answers can sound confident while containing unsupported or contradictory claims. Whole-response checks are too coarse because partial hallucinations can hide inside otherwise accurate answers.

## The Solution

Hallucination Hunter decomposes an AI answer into individual claims and verifies each claim against source text. It combines NLI reasoning, semantic similarity, conservative classification, and readable output so users can see which parts of an answer are supported, contradicted, or unsupported.

The project is implemented as a FastAPI service with a browser interface and model-backed verification pipeline.

## Architecture

- FastAPI routes expose detection, visualization, and health endpoints.
- spaCy segments model responses into candidate claims.
- A DeBERTa-v3 NLI cross-encoder classifies entailment, contradiction, and neutral cases.
- Sentence-Transformers semantic similarity grounds claims against source sentences.
- Aggregation and visualization layers produce verdicts, summaries, and heatmaps.

## Key Features

- Claim-level verification instead of whole-answer scoring.
- NLI-powered contradiction and entailment detection.
- Semantic similarity grounding against source text.
- Conservative unsupported-claim classification.
- Alignment heatmap for claim-to-source mapping.
- Docker-ready deployment path.

## Technical Highlights

- Python FastAPI REST interface.
- Hugging Face Transformers model pipeline.
- PyTorch inference layer.
- spaCy claim extraction.
- scikit-learn and XGBoost ensemble support.
- Matplotlib and Seaborn visualization output.

## Challenges

- Splitting fluent model answers into verifiable claims.
- Distinguishing unsupported claims from direct contradictions.
- Combining NLI and semantic similarity without hiding uncertainty.
- Presenting verification results in a way humans can inspect quickly.

## What I Learned

- Hallucination detection is more useful when it works at claim granularity.
- Conservative classification can reduce overconfident verification.
- Evaluation tools need interpretable outputs, not only labels.
- RAG systems need verification layers that can be reused independently.

## Repository

GitHub: https://github.com/HrshJha/Hallucination-Hunter
