from generator import generate_website

REQUIRED_TOP_LEVEL = ["theme", "navbar", "hero", "features", "footer"]
REQUIRED_THEME_KEYS = ["name", "font", "palette", "radius", "buttonStyle"]
REQUIRED_PALETTE_KEYS = ["primary", "secondary", "accent", "background", "surface", "text", "muted"]


def fallback_website(prompt: str = "Create a modern landing page for an AI SaaS startup."):
    return generate_website({
        "prompt": prompt,
        "industry": "AI SaaS Startup",
        "brand": "LaunchPilot AI",
        "audience": "growth teams and software builders",
        "tone": "modern, high-efficiency, ambitious",
        "theme_name": "startup",
        "sections": ["navbar", "hero", "features", "statistics", "about", "pricing", "testimonials", "faq", "contact", "footer"],
    })


def validate_website(website: dict):
    if not isinstance(website, dict):
        raise ValueError("Website payload must be a JSON object")

    for key in REQUIRED_TOP_LEVEL:
        if key not in website or not website[key]:
            raise ValueError(f"Website JSON missing required section: '{key}'")

    theme = website.get("theme", {})
    if not isinstance(theme, dict):
        raise ValueError("Theme must be a JSON object")

    for key in REQUIRED_THEME_KEYS:
        if key not in theme:
            raise ValueError(f"Theme object missing key: '{key}'")

    palette = theme.get("palette", {})
    if not isinstance(palette, dict):
        raise ValueError("Palette must be a JSON object")

    for key in REQUIRED_PALETTE_KEYS:
        if key not in palette:
            raise ValueError(f"Palette object missing color key: '{key}'")

    if not isinstance(website.get("features"), list) or len(website["features"]) == 0:
        raise ValueError("Features section must be a non-empty list")

    return True


def ensure_valid_website(website: dict, prompt: str):
    try:
        validate_website(website)
        return website, False
    except ValueError as error:
        fallback = fallback_website(prompt)
        fallback["validationWarning"] = str(error)
        return fallback, True
