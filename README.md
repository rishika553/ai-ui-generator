# ⚡ AI Landing Page Generator

An AI-powered full-stack web application that converts natural language prompts into complete, responsive, high-converting landing pages.

Instead of generating raw unverified code, the backend converts user prompts into structured **JSON Schemas** describing every section, theme token, color palette, typography stack, and copy. The frontend dynamically renders reusable **React components** powered by **Tailwind CSS** and **Framer Motion** animations.

---

## ✨ Features

- **🔤 Natural Language → Structured JSON Schema**: Converts simple prompts (e.g., *"Create a modern landing page for an AI SaaS startup"*) into complete JSON describing all page sections:
  - `Navbar` · `Hero` · `Features` · `Statistics` · `About` · `Pricing` · `Testimonials` · `FAQ` · `Contact` · `Footer`
- **🎨 Dynamic Theme & Typography System**:
  - **6 Themes**: Modern, Minimal, Dark, Glassmorphism, Startup, Luxury.
  - **5 Font Stacks**: Inter, Poppins, Outfit, DM Sans, Playfair Display.
  - **Automated Color Palettes**: Primary, Secondary, Accent, Surface, Background, Text, and Muted tokens.
- **💬 Follow-Up AI Chat Editing**: Iterative prompts (e.g. *"Make it dark"*, *"Change the hero title to..."*, *"Add pricing"*, *"Remove FAQ"*, *"Use rounded buttons"*) target specific JSON sections without re-generating unchanged parts.
- **🖥️ Live Desktop Preview**: Renders full-width desktop view with event-intercepted smooth scrolling.
- **⏪ Version History & Restoration**: Keeps snapshots of all generations and edits, allowing instant restoration of any previous state.
- **📊 AI Design Explanations**: Provides deep breakdowns for:
  - Layout Flow & Structure Strategy
  - Color Palette & Typography Choice
  - Accessibility Compliance (Contrast, Tap Targets, ARIA)
  - SEO Optimization (Meta Titles, Heading Hierarchy)
- **⚡ Professional Skeleton Loader**: Shimmering skeleton UI with animated progress bar during AI processing.
- **🛡️ Schema Validator Guard**: Built-in validation pipeline ensures invalid AI responses are safely replaced with fallback landing page layouts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: JavaScript (ESNext)

### Backend
- **Framework**: FastAPI (Python 3.13)
- **Server**: Uvicorn
- **Data Validation**: Pydantic
- **Architecture**: Modular AI Pipeline (`Planner → Generator → Theme → Validator → Memory → Explainer → API`)

---

## 📂 Project Structure

```text
ai-ui-generator/
├── backend/
│   ├── main.py              # FastAPI endpoints & CORS middleware
│   ├── planner.py           # Industry profile matching & intent parsing
│   ├── generator.py         # Landing page JSON structure builder & edit engine
│   ├── theme_generator.py   # Theme tokens, font stacks, and color palettes
│   ├── validator.py         # Schema verification & fallback guard
│   ├── memory.py            # Version control memory history
│   ├── explainer.py         # AI design, color, accessibility & SEO insights
│   ├── test_pipeline.py     # Automated backend pipeline test script
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   └── AI-UI-generator/
│       ├── src/
│       │   ├── components/
│       │   │   ├── LandingSections.jsx # Reusable section components
│       │   │   ├── Renderer.jsx        # Component renderer
│       │   │   ├── ThemeProvider.jsx   # Dynamic CSS variable & font injector
│       │   │   ├── Preview.jsx         # Live desktop preview container
│       │   │   └── LoadingSkeleton.jsx # Shimmering skeleton loader
│       │   ├── pages/
│       │   │   └── Generator.jsx       # Main AI Website Builder workspace
│       │   ├── services/
│       │   │   └── api.js              # REST API client
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

## ⚙️ Local Setup & Execution

### 1️⃣ Backend Setup (FastAPI)

```powershell
# Navigate to backend directory
cd backend

# Activate virtual environment (if using .venv)
..\.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI backend server
python -m uvicorn main:app --reload --port 8000
```
Backend API server will run at: **`http://127.0.0.1:8000`**  
Swagger API Docs available at: **`http://127.0.0.1:8000/docs`**

---

### 2️⃣ Frontend Setup (React + Vite)

```powershell
# Navigate to frontend directory
cd frontend/AI-UI-generator

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend Web Builder will run at: **`http://localhost:5173`**

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check & service status |
| `POST` | `/generate_ui` | Generate a new landing page JSON from prompt |
| `POST` | `/edit_ui` | Apply targeted AI chat edits to an existing website JSON |
| `GET` | `/history` | Fetch list of all saved version snapshots |
| `POST` | `/restore/{version_id}` | Restore a specific version snapshot |
| `POST` | `/rollback` | Rollback to the previous version |

---

## 👩‍💻 Author

**Rishika**  
Full-Stack & AI Engineer