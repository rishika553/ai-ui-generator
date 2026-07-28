from copy import deepcopy

FONT_STACKS = {
    "Inter": "Inter, system-ui, -apple-system, sans-serif",
    "Poppins": "Poppins, system-ui, -apple-system, sans-serif",
    "Outfit": "Outfit, system-ui, -apple-system, sans-serif",
    "DM Sans": "'DM Sans', system-ui, -apple-system, sans-serif",
    "Playfair Display": "'Playfair Display', Georgia, serif",
}

THEMES = {
    "modern": {
        "font": "Inter",
        "palette": {
            "primary": "#2563eb",    # Royal Blue
            "secondary": "#0f172a",  # Deep Black / Slate
            "accent": "#f97316",     # Vibrant Orange
            "background": "#f8fafc", # Clean Light White
            "surface": "#ffffff",    # Pure White
            "text": "#0f172a",       # Solid Black / Dark Slate
            "muted": "#475569",      # Legible Muted Slate
        },
        "radius": "12px",
        "buttonStyle": "rounded",
    },
    "minimal": {
        "font": "DM Sans",
        "palette": {
            "primary": "#0f172a",
            "secondary": "#2563eb",
            "accent": "#f97316",
            "background": "#ffffff",
            "surface": "#fafafa",
            "text": "#09090b",
            "muted": "#475569",
        },
        "radius": "8px",
        "buttonStyle": "sharp",
    },
    "dark": {
        "font": "Outfit",
        "palette": {
            "primary": "#38bdf8",
            "secondary": "#818cf8",
            "accent": "#facc15",
            "background": "#030712",
            "surface": "#0f172a",
            "text": "#f8fafc",
            "muted": "#94a3b8",
        },
        "radius": "16px",
        "buttonStyle": "rounded",
    },
    "glassmorphism": {
        "font": "Poppins",
        "palette": {
            "primary": "#2563eb",
            "secondary": "#0f172a",
            "accent": "#f97316",
            "background": "#f1f5f9",
            "surface": "rgba(255, 255, 255, 0.85)",
            "text": "#0f172a",
            "muted": "#475569",
        },
        "radius": "20px",
        "buttonStyle": "rounded",
    },
    "startup": {
        "font": "Inter",
        "palette": {
            "primary": "#4f46e5",    # Indigo Blue
            "secondary": "#0f172a",  # Black
            "accent": "#f97316",     # Orange
            "background": "#f8fafc", # White
            "surface": "#ffffff",
            "text": "#0f172a",
            "muted": "#475569",
        },
        "radius": "12px",
        "buttonStyle": "rounded",
    },
    "luxury": {
        "font": "Playfair Display",
        "palette": {
            "primary": "#0f172a",
            "secondary": "#ea580c",
            "accent": "#f97316",
            "background": "#fafaf9",
            "surface": "#ffffff",
            "text": "#1c1917",
            "muted": "#78716c",
        },
        "radius": "10px",
        "buttonStyle": "sharp",
    },
}

COLOR_PRESETS = {
    "classic": {"primary": "#2563eb", "secondary": "#0f172a", "accent": "#f97316"},
    "blue": {"primary": "#2563eb", "secondary": "#0f172a", "accent": "#f97316"},
    "orange": {"primary": "#ea580c", "secondary": "#1e293b", "accent": "#2563eb"},
    "black": {"primary": "#0f172a", "secondary": "#2563eb", "accent": "#f97316"},
    "green": {"primary": "#059669", "secondary": "#0f172a", "accent": "#f97316"},
    "purple": {"primary": "#7c3aed", "secondary": "#0f172a", "accent": "#f97316"},
    "pink": {"primary": "#db2777", "secondary": "#0f172a", "accent": "#f97316"},
    "teal": {"primary": "#0d9488", "secondary": "#0f172a", "accent": "#f97316"},
    "white": {"primary": "#0f172a", "secondary": "#2563eb", "accent": "#ea580c"},
}


def get_theme(name: str):
    theme_key = name.lower() if name and name.lower() in THEMES else "modern"
    config = deepcopy(THEMES[theme_key])
    return {
        "name": theme_key,
        "font": config["font"],
        "palette": config["palette"],
        "radius": config["radius"],
        "buttonStyle": config["buttonStyle"],
    }


def apply_theme_overrides(theme_dict: dict, palette_name: str = None, button_style: str = None, font: str = None):
    updated = deepcopy(theme_dict)
    if palette_name and palette_name.lower() in COLOR_PRESETS:
        preset = COLOR_PRESETS[palette_name.lower()]
        updated["palette"]["primary"] = preset["primary"]
        updated["palette"]["secondary"] = preset["secondary"]
        updated["palette"]["accent"] = preset["accent"]

    if button_style:
        if button_style == "rounded":
            updated["buttonStyle"] = "rounded"
            updated["radius"] = "999px"
        elif button_style in ["sharp", "square"]:
            updated["buttonStyle"] = "sharp"
            updated["radius"] = "6px"

    if font and font in FONT_STACKS:
        updated["font"] = font

    return updated
