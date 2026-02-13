# planner.py

import ollama
import json
import re
PLANNER_PROMPT = """
You are a UI planner.

Return ONLY a valid JSON object.
Use DOUBLE QUOTES for all keys and values.
Do NOT use single quotes.
Do NOT add explanations.
Do NOT wrap in markdown.

Allowed components:
Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart

JSON structure:
{
  "layout": "string",
  "components": [
    {"type": "ComponentName", "props": {}}
  ]
}
"""

def create_plan(user_input: str):
    try:
        response = ollama.chat(
            model="deepseek-coder",
            messages=[
                {"role": "system", "content": PLANNER_PROMPT},
                {"role": "user", "content": user_input}
            ]
        )

        content = response["message"]["content"]
        print("RAW PLANNER OUTPUT:\n", content)

        # Extract first JSON object
        match = re.search(r"\{[\s\S]*\}", content)
        if not match:
            raise ValueError("No JSON found")

        json_str = match.group()

        # Minimal safe cleanup only
        json_str = json_str.strip()
        json_str = re.sub(r",\s*([}\]])", r"\1", json_str)

        try:
            return json.loads(json_str)

        except json.JSONDecodeError:
            #  SAFE FALLBACK (DO NOT CRASH)
            return {
                "layout": "fallback",
                "components": [
                    {
                        "type": "Navbar",
                        "props": { "title": "Generated UI" }
                    },
                    {
                        "type": "Card",
                        "props": { "text": "AI output was adjusted for safety" }
                    },
                    {
                        "type": "Button",
                        "props": { "text": "Click Me" }
                    }
                ]
            }

    except Exception as e:
        #  FINAL SAFETY NET
        return {
            "layout": "error",
            "components": [
                {
                    "type": "Card",
                    "props": {
                        "text": f"Planner error: {str(e)}"
                    }
                }
            ]
        }
