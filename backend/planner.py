import re

PROMPT_PROFILES = {
    "crm": {
        "industry": "AI CRM",
        "brand": "PulseFlow CRM",
        "audience": "sales teams and revenue managers automation",
        "tone": "productive, confident, modern",
        "theme": "startup",
    },
    "coffee": {
        "industry": "Coffee Shop",
        "brand": "Velvet & Bean",
        "audience": "local coffee enthusiasts and remote workers",
        "tone": "warm, artisanal, inviting",
        "theme": "luxury",
    },
    "travel": {
        "industry": "Travel Agency",
        "brand": "Wanderlust Excursions",
        "audience": "explorers and families seeking curated luxury trips",
        "tone": "vibrant, adventurous, inspiring",
        "theme": "modern",
    },
    "portfolio": {
        "industry": "Portfolio",
        "brand": "Alex Rivera Studio",
        "audience": "recruiters, agency partners, and tech founders",
        "tone": "minimal, sleek, creative",
        "theme": "minimal",
    },
    "fitness": {
        "industry": "Fitness Website",
        "brand": "Apex Athletics",
        "audience": "athletes and fitness enthusiasts striving for peak performance",
        "tone": "energetic, bold, high-performance",
        "theme": "modern",
    },
    "fintech": {
        "industry": "Fintech Startup",
        "brand": "NexusPay AI",
        "audience": "founders, CFOs, and finance teams",
        "tone": "secure, reliable, futuristic",
        "theme": "startup",
    },
    "restaurant": {
        "industry": "Restaurant",
        "brand": "Lumina Bistro",
        "audience": "food lovers seeking fine dining experiences",
        "tone": "elegant, indulgent, welcoming",
        "theme": "luxury",
    },
    "saas": {
        "industry": "SaaS Product",
        "brand": "LaunchStack AI",
        "audience": "software engineers and product teams shipping fast",
        "tone": "modern, high-efficiency, ambitious",
        "theme": "startup",
    },
    "healthcare": {
        "industry": "Healthcare Landing Page",
        "brand": "CarePulse Health",
        "audience": "patients and families seeking accessible medical care",
        "tone": "calm, trustworthy, compassionate",
        "theme": "modern",
    },
}


def _match_profile(prompt: str):
    normalized = prompt.lower()
    for key, profile in PROMPT_PROFILES.items():
        if key in normalized:
            return profile

    if "ai" in normalized or "software" in normalized:
        return PROMPT_PROFILES["saas"]

    return {
        "industry": "Modern Startup",
        "brand": "Aether Digital",
        "audience": "ambitious businesses building their modern web presence",
        "tone": "polished, conversion-focused, innovative",
        "theme": "modern",
    }


def _resolve_theme(prompt: str, default_theme: str):
    normalized = prompt.lower()
    if "dark" in normalized:
        return "dark"
    if "glass" in normalized or "glassmorphism" in normalized:
        return "glassmorphism"
    if "luxury" in normalized or "premium" in normalized or "elegant" in normalized:
        return "luxury"
    if "minimal" in normalized or "clean" in normalized:
        return "minimal"
    if "startup" in normalized or "saas" in normalized or "tech" in normalized:
        return "startup"
    if "modern" in normalized:
        return "modern"
    return default_theme


def _resolve_sections(prompt: str):
    normalized = prompt.lower()
    sections = [
        "navbar",
        "hero",
        "features",
        "statistics",
        "about",
        "pricing",
        "testimonials",
        "faq",
        "contact",
        "footer",
    ]

    if "no pricing" in normalized or "without pricing" in normalized:
        if "pricing" in sections:
            sections.remove("pricing")
    if "no faq" in normalized or "without faq" in normalized:
        if "faq" in sections:
            sections.remove("faq")

    return sections


def create_plan(user_prompt: str):
    prompt = user_prompt.strip() or "Create a modern landing page for an AI SaaS startup."
    profile = _match_profile(prompt)
    theme_name = _resolve_theme(prompt, profile["theme"])
    sections = _resolve_sections(prompt)

    return {
        "prompt": prompt,
        "industry": profile["industry"],
        "brand": profile["brand"],
        "audience": profile["audience"],
        "tone": profile["tone"],
        "theme_name": theme_name,
        "sections": sections,
    }


def detect_edit_intent(message: str):
    normalized = message.lower()
    intent = {
        "theme": None,
        "palette": None,
        "add": [],
        "remove": [],
        "hero_title": None,
        "button_style": None,
        "premium_boost": False,
    }

    # Theme overrides
    for t in ["modern", "minimal", "dark", "glassmorphism", "startup", "luxury"]:
        if t in normalized:
            intent["theme"] = t

    if "dark mode" in normalized or "make it dark" in normalized or "dark theme" in normalized:
        intent["theme"] = "dark"
    elif "glassmorphism" in normalized or "glass" in normalized:
        intent["theme"] = "glassmorphism"
    elif "premium" in normalized or "more premium" in normalized or "luxurious" in normalized:
        intent["theme"] = "luxury"
        intent["premium_boost"] = True

    # Color palette overrides
    if "yellow" in normalized or "orange" in normalized or "black" in normalized or "classic" in normalized or "normal" in normalized:
        intent["palette"] = "classic"
    else:
        for color in ["yellow", "orange", "blue", "black", "white", "classic"]:
            if color in normalized:
                intent["palette"] = color

    # Section additions / removals
    section_keys = ["pricing", "faq", "testimonials", "statistics", "about", "contact", "features"]
    for sec in section_keys:
        if f"add {sec}" in normalized or f"include {sec}" in normalized or f"show {sec}" in normalized:
            intent["add"].append(sec)
        if f"remove {sec}" in normalized or f"delete {sec}" in normalized or f"hide {sec}" in normalized:
            intent["remove"].append(sec)

    # Hero title extraction
    title_match = re.search(
        r"(?:change|set|update|make)\s+(?:the\s+)?(?:hero\s+)?(?:title|headline)\s+(?:to|as|:)\s*[\"']?(.+?)[\"']?$",
        message,
        re.IGNORECASE,
    )
    if title_match:
        intent["hero_title"] = title_match.group(1).strip().strip('"').strip("'")
    elif "change title" in normalized or "hero title" in normalized:
        parts = message.split("to ")
        if len(parts) > 1:
            intent["hero_title"] = parts[-1].strip().strip('"').strip("'")

    # Button style extraction
    if "rounded button" in normalized or "rounded buttons" in normalized or "round buttons" in normalized:
        intent["button_style"] = "rounded"
    elif "sharp button" in normalized or "square button" in normalized or "sharp buttons" in normalized:
        intent["button_style"] = "sharp"

    return intent
