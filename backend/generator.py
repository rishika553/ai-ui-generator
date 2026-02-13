# generator.py

import ollama

GENERATOR_PROMPT = """
You are a React UI generator.

Allowed components:
Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart

Rules:
- Use ONLY allowed components
- No CSS
- No inline styles
- Return valid JSX only
"""
def generate_code(plan: dict):
    try:
        response = ollama.chat(
            model="phi",
            messages=[
                {
                    "role": "system",
                    "content": GENERATOR_PROMPT
                },
                {
                    "role": "user",
                    "content": str(plan)
                }
            ],
            options={
                "temperature": 0.2
            }
        )

        if not response or "message" not in response:
            raise ValueError("Invalid response from Ollama")

        code = response["message"]["content"]

        print("Generated code preview:", code[:120])

        return code

    except Exception as e:
        print("Generator failed:", e)

        #  SAFE FALLBACK (never let app freeze)
        return """
export default function GeneratedUI() {
  return (
    <div>
      <Navbar />
      <Card />
      <Button />
    </div>
  );
}
"""
