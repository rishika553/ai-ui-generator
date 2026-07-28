import json
from planner import create_plan, detect_edit_intent
from generator import generate_website, apply_website_edits
from validator import ensure_valid_website
from explainer import explain
from memory import memory

def main():
    print("=== TEST 1: Generate UI ===")
    prompt = "Create a modern landing page for an AI SaaS startup."
    plan = create_plan(prompt)
    print("Plan created:", json.dumps(plan, indent=2))
    
    raw_website = generate_website(plan)
    website, fallback = ensure_valid_website(raw_website, prompt)
    print("Validation passed (used fallback = %s)" % fallback)
    print("Generated Top-Level Keys:", list(website.keys()))
    print("Theme:", website["theme"]["name"], "| Font:", website["theme"]["font"])

    explanation = explain(website)
    print("Explanation:", json.dumps(explanation, indent=2))
    
    version1 = memory.save(website, explanation)
    print("Version 1 saved with ID:", version1["versionId"])

    print("\n=== TEST 2: AI Chat Edit ('Make it dark.') ===")
    edit_msg = "Make it dark."
    intent = detect_edit_intent(edit_msg)
    print("Intent detected:", intent)
    edited_website, fallback2 = ensure_valid_website(apply_website_edits(website, intent, edit_msg), edit_msg)
    print("Edited Theme:", edited_website["theme"]["name"])
    
    version2 = memory.save(edited_website, explain(edited_website))
    print("Version 2 saved with ID:", version2["versionId"])
    
    print("\n=== Memory Versions ===")
    print(memory.list_versions())

if __name__ == "__main__":
    main()
