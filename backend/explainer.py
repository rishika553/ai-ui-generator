def explain(website: dict):
    theme = website.get("theme", {})
    palette = theme.get("palette", {})
    theme_name = theme.get("name", "modern").capitalize()
    font_name = theme.get("font", "Inter")

    present_sections = [
        s for s in ["navbar", "hero", "features", "statistics", "about", "pricing", "testimonials", "faq", "contact", "footer"]
        if s in website
    ]

    brand = website.get("navbar", {}).get("brand", "Brand")
    industry = website.get("industry", "Industry")

    return {
        "layout": f"The page structure follows a high-converting landing flow ({', '.join(present_sections)}). Starting with a clear Hero value proposition, followed by Features, Social Proof (Statistics/Testimonials), Pricing transparency, and direct Contact action.",
        "colors": f"Selected the '{theme_name}' theme palette. Primary '{palette.get('primary')}' drives primary calls to action; Secondary '{palette.get('secondary')}' highlights key details; Surface '{palette.get('surface')}' provides visual hierarchy against Background '{palette.get('background')}'.",
        "typography": f"Font set to '{font_name}'. Selected for modern legibility, clean visual weight distribution, and comfortable reading across high-density desktop views down to mobile viewports.",
        "accessibility": "Built with semantic HTML5 elements (header, main, section, footer), high visual contrast ratios (>4.5:1), keyboard-accessible focus outlines, aria labels on interactive triggers, and responsive tap targets (min 44px).",
        "seo": f"Targeting title tag '{website.get('seo', {}).get('title', brand)}'. Includes structured section headings (H1 for main value prop, H2 for section titles, H3 for cards) and meta descriptions optimized for search crawler indexing.",
    }
