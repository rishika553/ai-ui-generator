🧠 AI UI Generator

An AI-powered full-stack web application that generates dynamic React UI components from natural language prompts.

The system supports iterative UI modification, live preview updates, AI explanations, rollback/version control, and a modular AI generation pipeline — all delivered through a scalable frontend + backend architecture.

🚀 Live Demo

Frontend (Netlify)
👉 https://ai-ui-generatorr.netlify.app/

Backend (Render)
👉 https://ai-ui-generator-eden.onrender.com

API Documentation (Swagger UI)
👉 https://ai-ui-generator-eden.onrender.com/docs

📌 Features
🔤 Natural Language → UI Generation

Generate React UI components by describing the UI in plain English.

🔁 Iterative UI Modification

Update or refine the UI by modifying the prompt and regenerating components.

👀 Live Preview Rendering

The generated UI updates instantly inside the application.

🧠 AI Explanation Output

The backend provides an explanation describing how the UI was structured and generated.

⏪ Rollback / Version Control

Restore previously generated UI versions using backend memory handling.

🛡️ Safe Fallback Mechanism

Prevents broken AI responses from crashing the system in production.

🧩 Tech Stack
Frontend

React (Vite)

JavaScript

CSS

Hosted on Netlify

Backend

FastAPI (Python)

REST API architecture

Modular AI planning & generation pipeline

Hosted on Render

📂 Project Structure
ai-ui-generator/
├── backend/
│   ├── main.py
│   ├── planner.py
│   ├── generator.py
│   ├── validator.py
│   ├── memory.py
│   └── requirements.txt
│
├── frontend/
│   └── AI-UI-generator/
│       ├── src/
│       │   ├── pages/
│       │   ├── services/
│       │   └── App.jsx
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
└── README.md
⚙️ Local Setup Instructions
🔹 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000
🔹 Frontend Setup
cd frontend/AI-UI-generator
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🌐 Deployment

Backend deployed on Render

Frontend deployed on Netlify

Both services are publicly accessible (no local-only demo)

⚠️ Note: On free-tier hosting, the backend may experience a 20–30 second cold start delay.

🏗️ Architecture Overview

The backend follows a modular AI pipeline:

Planner → Converts prompt into structured UI plan

Generator → Produces UI code

Validator → Ensures output stability

Memory → Enables rollback/versioning

API Layer → Serves structured response to frontend

The system is designed to be extensible for future integration with advanced LLMs.

📌 Notes & Limitations

A deterministic fallback mechanism ensures production stability.

Designed for extensibility and AI experimentation.

Cold-start delays may occur on free hosting plans.

📜 Submission Details

This project includes:

Public GitHub repository with full commit history

Deployed frontend and backend

Working API documentation

👩‍💻 Author

Rishika
BCA Student | Full-Stack & AI Enthusiast