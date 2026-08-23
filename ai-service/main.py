from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Smart Notes AI Service")


class SummarizeRequest(BaseModel):
    text: str


class SummarizeResponse(BaseModel):
    summary: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/summarize", response_model=SummarizeResponse)
def summarize(request: SummarizeRequest):
    # Placeholder logic — replace with a real LangChain chain + LLM call.
    preview = request.text.strip()[:100]
    return SummarizeResponse(summary=f"[stub summary] {preview}...")
