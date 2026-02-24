# generator.py
# generator.py

from dotenv import load_dotenv
load_dotenv()

import requests
import os
import json

HF_API_KEY = os.getenv("HF_API_KEY")

# ✅ Better free coding model
MODEL_ID = "bigcode/starcoder2-3b"

GENERATOR_PROMPT = """
You are a professional React UI generator.

You will receive a UI plan in JSON format.

STRICT RULES:
- Use ONLY these components: Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart
- Use ALL components listed in the plan
- Pass all props exactly as given
- Do NOT add CSS
- Do NOT add inline styles
- Do NOT explain anything
- Return ONLY complete valid React JSX
- Output must be a full functional component:
If layout is "dashboard", group Sidebar separately and place other components inside main content area.
Example format:

export default function GeneratedUI() {
  return (
    <div>
      ...
    </div>
  );
}

Here is the UI plan:
"""


def generate_code(plan: dict):
    try:
        if not HF_API_KEY:
            raise Exception("HF_API_KEY not found in environment variables")

        # ✅ Convert plan to proper formatted JSON
        formatted_plan = json.dumps(plan, indent=2)

        prompt = GENERATOR_PROMPT + "\n" + formatted_plan

        response = requests.post(
            f"https://router.huggingface.co/models/{MODEL_ID}",
            headers={
                "Authorization": f"Bearer {HF_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "inputs": prompt,
                "parameters": {
                    "temperature": 0.1,
                    "max_new_tokens": 600,
                    "return_full_text": False
                }
            },
            timeout=60
        )

        result = response.json()

        # ✅ Debug: See full HF response if needed
        print("HF RAW RESPONSE:", result)

        # Handle Hugging Face errors
        if isinstance(result, dict) and "error" in result:
            raise Exception(result["error"])

        if not isinstance(result, list) or "generated_text" not in result[0]:
            raise Exception("Invalid response format from Hugging Face")

        code = result[0]["generated_text"].strip()

        print("Generated code preview:", code[:200])

        return code

    except Exception as e:
        print("Generator failed:", e)

        # ✅ Safe fallback (never crash frontend)
        return """
export default function GeneratedUI() {
  return (
    <div>
      <Navbar title="Dashboard" />
      <Sidebar />
      <Card text="Welcome" />
      <Button text="Click" />
    </div>
  );
}
"""