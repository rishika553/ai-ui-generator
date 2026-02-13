# validator.py

import re

ALLOWED_COMPONENTS = {
    "Button",
    "Card",
    "Input",
    "Table",
    "Modal",
    "Sidebar",
    "Navbar",
    "Chart"
}

def validate_plan(plan: dict):
    if "components" not in plan:
        raise ValueError("Plan must contain components array")

    for comp in plan["components"]:
        if comp["type"] not in ALLOWED_COMPONENTS:
            raise ValueError(f"Unauthorized component: {comp['type']}")

def validate_code(code: str):
    tags = re.findall(r"<([A-Z][a-zA-Z]*)", code)

    for tag in tags:
        if tag not in ALLOWED_COMPONENTS:
            raise ValueError(f"Unauthorized component in code: {tag}")

    if "style=" in code:
        raise ValueError("Inline styles are forbidden")

    if "className=" in code:
        raise ValueError("AI-generated CSS is forbidden")

    return True