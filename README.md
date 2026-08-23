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

### Run everything with Docker (recommended)

Requires Docker + Docker Compose installed.

```bash
docker compose up --build
```

This starts Postgres, the Spring Boot backend, the Python AI service, the
React frontend, and an **Nginx gateway** sitting in front of all three.

Once it's up, everything goes through **one port**:

| URL | Routes to |
|---|---|
| `http://localhost/` | React frontend |
| `http://localhost/api/**` | Spring Boot backend |
| `http://localhost/ai/**` | Python AI service |

The individual services are also exposed directly (5173, 8080, 8000) for
debugging, but the frontend should call everything through `/api/` and `/ai/`
via the gateway — no more CORS juggling between ports.

### Run services individually (without Docker)

See each service's own README:
- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)
- [`ai-service/README.md`](./ai-service/README.md)
