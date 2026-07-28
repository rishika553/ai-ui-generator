import sys
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from explainer import explain
from generator import apply_website_edits, generate_website
from memory import memory
from planner import create_plan, detect_edit_intent
from validator import ensure_valid_website

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

app = FastAPI(title="AI Landing Page Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateRequest(BaseModel):
    message: str
    modify: bool = False


class EditRequest(BaseModel):
    message: str
    website: Optional[dict] = None


@app.get("/health")
def health():
    return {"status": "ok", "app": "AI Landing Page Generator Pipeline"}


@app.post("/generate_ui")
def generate_ui(req: GenerateRequest):
    prompt = req.message.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    try:
        plan = create_plan(prompt)
        raw_website = generate_website(plan)
        website, used_fallback = ensure_valid_website(raw_website, prompt)
        explanation = explain(website)
        version = memory.save(website, explanation)

        return {
            "plan": plan,
            "website": website,
            "explanation": explanation,
            "history": memory.list_versions(),
            "versionId": version["versionId"],
            "usedFallback": used_fallback,
        }
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@app.post("/edit_ui")
def edit_ui(req: EditRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Edit message is required")

    latest = memory.get_latest()
    source_website = req.website or (latest["website"] if latest else None)
    if not source_website:
        raise HTTPException(status_code=400, detail="Generate a landing page before editing")

    try:
        intent = detect_edit_intent(req.message)
        edited_raw = apply_website_edits(source_website, intent, req.message)
        website, used_fallback = ensure_valid_website(edited_raw, req.message)
        explanation = explain(website)
        version = memory.save(website, explanation)

        return {
            "intent": intent,
            "website": website,
            "explanation": explanation,
            "history": memory.list_versions(),
            "versionId": version["versionId"],
            "usedFallback": used_fallback,
        }
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@app.get("/history")
def history():
    return {"history": memory.list_versions()}


@app.post("/restore/{version_id}")
def restore_ui(version_id: int):
    version = memory.restore(version_id)
    if not version:
        raise HTTPException(status_code=404, detail="Version not found")

    return {
        "website": version["website"],
        "explanation": version["explanation"],
        "history": memory.list_versions(),
        "versionId": version["versionId"],
    }


@app.post("/rollback")
def rollback_ui():
    version = memory.rollback()
    if not version:
        raise HTTPException(status_code=400, detail="No previous version available")

    return {
        "website": version["website"],
        "explanation": version["explanation"],
        "history": memory.list_versions(),
        "versionId": version["versionId"],
    }
