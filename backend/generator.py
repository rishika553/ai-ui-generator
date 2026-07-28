from copy import deepcopy
from datetime import datetime, timezone
from uuid import uuid4

from theme_generator import apply_theme_overrides, get_theme


def generate_website(plan: dict):
    brand = plan.get("brand", "Aether Startup")
    industry = plan.get("industry", "AI Tech Startup")
    audience = plan.get("audience", "modern digital users and growth teams")
    tone = plan.get("tone", "polished, trustworthy, conversion-focused")
    theme_name = plan.get("theme_name", "startup")

    theme = get_theme(theme_name)

    website = {
        "id": str(uuid4()),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "prompt": plan.get("prompt", ""),
        "industry": industry,
        "theme": theme,
        "seo": {
            "title": f"{brand} | Modern {industry} Platform",
            "description": f"Accelerate your workflow with {brand}. Designed specifically for {audience} with a {tone} approach.",
        },
        "navbar": {
            "brand": brand,
            "links": ["Features", "About", "Pricing", "Testimonials", "FAQ"],
            "cta": "Get Started",
        },
        "hero": {
            "eyebrow": f"⚡ Built for {audience}",
            "title": f"Transform your {industry.lower()} experience with {brand}.",
            "subtitle": f"{brand} empowers {audience} with an intuitive platform designed for peak performance, high efficiency, and effortless scalability.",
            "primaryCta": "Start Free Trial",
            "secondaryCta": "Explore Live Demo",
            "visual": {
                "headline": "Real-Time AI Insight Engine",
                "metric": "+142%",
                "caption": "Boost in operational productivity & user conversion",
            },
        },
        "features": [
            {
                "title": "Intelligent Automation",
                "description": "Streamline complex workflows with adaptive AI rules and real-time execution pipelines.",
                "icon": "zap",
            },
            {
                "title": "Instant Dynamic Previews",
                "description": "Experience zero-delay live rendering across desktop, tablet, and mobile device frames.",
                "icon": "layout",
            },
            {
                "title": "Enterprise Security & Scale",
                "description": "Bank-grade encryption, automated backups, and 99.99% uptime SLA guaranteed.",
                "icon": "shield",
            },
            {
                "title": "Smart Component Engine",
                "description": "Modular structured JSON schema designed to power modern high-converting UI components.",
                "icon": "cpu",
            },
        ],
        "statistics": [
            {"value": "10x", "label": "Faster Page Assembly"},
            {"value": "99.8%", "label": "Customer Satisfaction"},
            {"value": "50K+", "label": "Active Power Users"},
            {"value": "24/7", "label": "AI Assistance & Support"},
        ],
        "about": {
            "title": f"Why leading organizations trust {brand}",
            "body": f"We built {brand} to solve the core bottlenecks facing {audience}. By combining beautiful aesthetics with resilient software architecture, we deliver solutions that turn visitors into loyal customers.",
            "points": [
                "Tailored design systems built around brand identity",
                "Zero manual code editing required",
                "Fully responsive across every screen dimension",
            ],
        },
        "pricing": [
            {
                "name": "Starter",
                "price": "$29",
                "period": "/month",
                "description": "Perfect for solos and small teams getting started.",
                "features": ["1 Active Landing Page", "Responsive Preview System", "Standard Themes", "Basic AI Chat Edits"],
                "highlight": False,
            },
            {
                "name": "Pro Growth",
                "price": "$79",
                "period": "/month",
                "description": "For scaling startups and growing businesses.",
                "features": [
                    "Unlimited Landing Pages",
                    "All 6 Themes & Custom Palettes",
                    "Full Version History & Restore",
                    "AI SEO & Accessibility Insights",
                    "Priority AI Regeneration",
                ],
                "highlight": True,
            },
            {
                "name": "Enterprise",
                "price": "$199",
                "period": "/month",
                "description": "For high-volume agencies and large organizations.",
                "features": [
                    "Dedicated Component Pipeline",
                    "Custom Brand Kit Import",
                    "SSO & Multi-user Collaboration",
                    "24/7 Priority SLA Support",
                ],
                "highlight": False,
            },
        ],
        "testimonials": [
            {
                "quote": f"{brand} completely transformed our launch timeline. We created a high-converting landing page in seconds!",
                "name": "Elena Rostova",
                "role": "VP of Product, Apex Tech",
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            },
            {
                "quote": "The design aesthetics and responsive preview switcher made it effortless to present to stakeholders.",
                "name": "Marcus Vance",
                "role": "Founder, Vance & Co",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            },
            {
                "quote": "AI Chat editing is unbelievable! I asked to make it dark mode with rounded buttons and it updated instantly.",
                "name": "Sophia Chen",
                "role": "Lead Designer, Studio Kinetic",
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            },
        ],
        "faq": [
            {
                "question": "How does the AI Landing Page Generator work?",
                "answer": "You type a natural language prompt. Our backend converts it into structured JSON representing sections, themes, typography, and content. The frontend then dynamically renders reusable React components.",
            },
            {
                "question": "Can I edit the generated landing page?",
                "answer": "Yes! You can use the AI Chat Editor to request edits like 'Make it dark', 'Change the hero title', 'Add pricing', 'Use blue colours', or 'Make it more premium'.",
            },
            {
                "question": "Is the generated page fully responsive?",
                "answer": "Absolutely. You can switch between Desktop, Tablet, and Mobile preview sizes in real-time to inspect every breakpoint.",
            },
            {
                "question": "Does it support version history and rollback?",
                "answer": "Yes. Every prompt generation or edit is saved as a version. You can browse and restore any previous state at any time.",
            },
        ],
        "contact": {
            "title": f"Ready to build with {brand}?",
            "body": "Get in touch with our team or start generating your landing page immediately.",
            "email": f"hello@{brand.lower().replace(' ', '')}.io",
            "phone": "+1 (800) 555-0199",
            "cta": "Submit Request",
        },
        "footer": {
            "brand": brand,
            "links": ["Privacy Policy", "Terms of Service", "Documentation", "Support"],
            "copyright": f"© {datetime.now(timezone.utc).year} {brand}. All rights reserved.",
        },
    }

    # Filter optional sections according to plan
    requested = plan.get("sections", [])
    for section_key in ["statistics", "about", "pricing", "testimonials", "faq", "contact"]:
        if section_key not in requested:
            website.pop(section_key, None)

    return website


def apply_website_edits(website: dict, intent: dict, message: str):
    updated = deepcopy(website)
    updated["id"] = str(uuid4())
    updated["createdAt"] = datetime.now(timezone.utc).isoformat()
    updated["prompt"] = f"{website.get('prompt', '')} | Edit: {message}".strip()

    # Apply Theme or Palette or Button overrides
    theme_name = intent.get("theme") or updated.get("theme", {}).get("name", "modern")

    if intent.get("theme"):
        updated["theme"] = get_theme(intent["theme"])

    updated["theme"] = apply_theme_overrides(
        updated["theme"],
        palette_name=intent.get("palette"),
        button_style=intent.get("button_style"),
    )

    # Hero title update
    if intent.get("hero_title"):
        updated["hero"]["title"] = intent["hero_title"]

    # Section removals
    for remove_sec in intent.get("remove", []):
        updated.pop(remove_sec, None)

    # Section additions
    for add_sec in intent.get("add", []):
        if add_sec not in updated:
            dummy_plan = {
                "brand": updated.get("navbar", {}).get("brand", "BrightLayer"),
                "industry": updated.get("industry", "Modern Startup"),
                "audience": "growth teams",
                "tone": "polished",
                "theme_name": theme_name,
                "sections": [add_sec],
            }
            generated_fresh = generate_website(dummy_plan)
            if add_sec in generated_fresh:
                updated[add_sec] = generated_fresh[add_sec]

    # Specific theme adjustments
    if intent.get("premium_boost") or intent.get("theme") == "luxury":
        updated["hero"]["eyebrow"] = "✨ Premium Tier Launch"
        updated["hero"]["subtitle"] = updated["hero"]["subtitle"].replace("polished", "luxurious and high-converting")

    return updated
