# Smart Notes AI

An AI-powered study/notes assistant. Upload or write notes, get AI summaries,
auto-generated quizzes, and chat-based Q&A over your own notes (RAG).
Includes multimodal support (image → text via vision model).

## Architecture

```
React (frontend)
   |
   v
Spring Boot (auth, CRUD, orchestration)
   |  REST
   v
Python + FastAPI + LangChain (AI: summarization, RAG, multimodal)
   |
   v
PostgreSQL
```

## Structure

- `frontend/`   — React + Vite app
- `backend/`    — Spring Boot app (auth, notes CRUD, API gateway to AI service)
- `ai-service/` — Python FastAPI service (LangChain pipelines, embeddings, vision)
- `docs/`       — architecture notes, API docs

## Status

🚧 In progress — see issues/project board for current milestone.

## Getting Started

Setup instructions per service will live in each folder's own README as they're built.
