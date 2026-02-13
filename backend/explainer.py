# explainer.py

import ollama

EXPLAINER_PROMPT = """
Explain the UI decisions clearly:
- Why this layout was chosen
- Why each component was used
- What problem it solves
Use simple language.
"""

def explain(plan: dict):
    try:
        response = ollama.chat(
            model="deepseek-coder",
            messages=[
                {"role": "system", "content": EXPLAINER_PROMPT},
                {"role": "user", "content": str(plan)}
            ]
        )
        
        explanation = response["message"]["content"]
        return explanation
    except KeyError as e:
        print(f"Key error in response: {e}")
        raise ValueError(f"Unexpected response format from Ollama: {e}")
    except Exception as e:
        print(f"Error in explain: {e}")
        raise