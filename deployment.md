# Deployment Guide

## Architecture
- **Frontend:** Vercel (React + Vite)
- **Backend:** Render (FastAPI)
- **Database:** Supabase (Planned)

## 1. Local Development
1. `cd agents`
2. `python -m venv venv`
3. `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. `pip install -r requirements.txt`
5. Create `.env` from `.env.example` and add your `GEMINI_API_KEY`.
6. Run API: `uvicorn api.main:app --reload`

## 2. Render Deployment
The repository includes a `render.yaml` blueprint.
1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` and create two services:
   - **portfolio-intelligence-api**: The FastAPI web service.
   - **portfolio-sync-job**: A Cron Job that runs every 15 days (`0 0 1,15 * *`).
3. Manually add your `GEMINI_API_KEY` in the Render Environment Variables dashboard for both services.

## 3. GitHub Automation (Phase 6.2)
To achieve true automation:
1. The Cron Job runs the Python synchronization scripts on Render.
2. The sync updates `master_profile.json` and creates a snapshot.
3. The Render script uses the `GITHUB_PAT` to commit these JSON changes back to the `main` branch.
4. Pushing to `main` automatically triggers Vercel to rebuild and redeploy the frontend with the fresh data!

## 4. Supabase Setup (Future)
We will eventually migrate the JSON snapshot data into PostgreSQL.
1. Create a project on Supabase.
2. Get the `DATABASE_URL`.
3. Add it to Render Environment variables.
