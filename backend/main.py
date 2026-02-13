# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from planner import create_plan
from generator import generate_code
from explainer import explain
from validator import validate_plan, validate_code
from memory import memory
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Deterministic AI UI Generator")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    message: str
    modify: bool = False


@app.post("/generate_ui")
def generate_ui(req: UserRequest):
    try:
        print("➡️ Received request")
        print("Message:", req.message)
        print("Modify:", req.modify)

        # Step 1: Generate plan
        print("➡️ Creating plan...")
        plan = create_plan(req.message)
        print("✅ Plan created:", plan)

        # Step 2: Generate code
        print("➡️ Generating code...")
        code = generate_code(plan)
        print("✅ Code generated")

        return {
            "plan": plan,
            "code": code,
            "explanation": "Generated using AI"
        }

    except Exception as e:
        print("❌ Error:", e)
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/rollback")
def rollback_ui():
    version = memory.rollback()
    if not version:
        raise HTTPException(status_code=400, detail="No previous version")
    return version