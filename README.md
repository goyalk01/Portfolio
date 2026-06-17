# Krish Goyal — Portfolio Intelligence Platform

A **living portfolio system** that automatically keeps itself up-to-date by syncing data from GitHub, LeetCode, LinkedIn, and your resume — then rendering it as a beautiful, interactive personal website.

> **Live Site:** [Coming Soon on Vercel]
> **Backend API:** [Coming Soon on Render]

---

## Architecture

```text
portfolio/
├── frontend/          React + TypeScript + Vite portfolio website
├── backend/           Python agent system + FastAPI API
├── docs/              Deployment guides & documentation
└── render.yaml        Render deployment blueprint
```

### Frontend
A modern, responsive single-page application showcasing projects, skills, education, certifications, and achievements.

- **React 19** with TypeScript
- **Vite 7** for lightning-fast builds
- **Tailwind CSS v4** for styling
- **Framer Motion** for scroll animations and page transitions
- **Three.js** for an interactive 3D particle background
- **Data-driven architecture** — all content is rendered from a single `master_profile.json`

### Backend — Agent System
A collection of Python agents that fetch, analyze, validate, and merge data from multiple sources into a unified profile.

| Agent | Source | Purpose |
|-------|--------|---------|
| `github_agent.py` | GitHub API | Fetch repos, stars, languages, contribution activity |
| `leetcode_agent.py` | LeetCode API | Fetch solve counts and difficulty breakdown |
| `linkedin_agent.py` | LinkedIn Export | Parse professional profile and experience |
| `resume_agent.py` | Resume PDF | Extract skills, projects, and education via Gemini AI |
| `validator_agent.py` | All Sources | Resolve conflicts using priority rules |
| `generator.py` | Merged Data | Build `master_profile.json` with schema validation |
| `audit_agent.py` | Generated Profile | Score portfolio completeness and recruiter readiness |

### Sync Pipeline
```text
GitHub + LeetCode + LinkedIn + Resume
            ↓
    Validator (Priority Engine)
            ↓
    Generator (Schema Validation)
            ↓
    master_profile.json
            ↓
    Frontend renders instantly
```

### FastAPI Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/profile` | GET | Full master profile |
| `/projects` | GET | Project list |
| `/skills` | GET | Skills list |
| `/audit` | GET | Latest audit report |
| `/sync` | POST | Trigger full sync pipeline |
| `/snapshots` | GET | List profile snapshots |

---

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # Add your GEMINI_API_KEY
uvicorn api.main:app --reload
```
API available at `http://localhost:8000`

---

## Deployment

### Frontend → Vercel
Connect the repository and set the root directory to `frontend/`.

### Backend → Render
The included `render.yaml` auto-creates:
- **Web Service**: FastAPI API server
- **Cron Job**: Runs the full sync pipeline on the 1st and 15th of every month

Add your `GEMINI_API_KEY` as an environment variable in the Render dashboard.

See [docs/deployment/deployment.md](docs/deployment/deployment.md) for the full guide.

---

## Roadmap
- [ ] Supabase integration for persistent profile storage
- [ ] GitHub auto-commit after sync (push updated JSON back to repo)
- [ ] Additional agents (Codeforces, HackerRank)
- [ ] Admin dashboard for manual overrides

---

*Built by Krish Goyal — a curious CS student who believes portfolios should update themselves.*
