# AI Service — Python + FastAPI

Currently a stub: `/summarize` returns a fake truncated-text "summary" so the
rest of the system (Spring Boot gateway call, Nginx routing) can be built and
tested end-to-end before real AI logic is wired in.

Real LangChain pipelines (summarization, RAG, multimodal) come next.

## Run standalone (without Docker)
```bash
python -m venv venv
source venv/bin/activate   # venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Runs on `http://localhost:8000`. Check `http://localhost:8000/health`.

## Run via the gateway
See the root `README.md` — reachable through `http://localhost/ai/**` once
`docker compose up` is running.
