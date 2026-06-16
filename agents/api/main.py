from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import sys

# Add parent dir to path to allow importing agent scripts
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from generator import merge_data
from audit_agent import audit_portfolio
from validator_agent import validate_sources

app = FastAPI(title="Portfolio Intelligence API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_master_profile():
    path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "src", "data", "master_profile.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Master profile not found. Have you run the sync pipeline?")
    with open(path, "r") as f:
        return json.load(f)

@app.get("/profile")
def get_profile():
    return load_master_profile()

@app.get("/projects")
def get_projects():
    return load_master_profile().get("projects", [])

@app.get("/skills")
def get_skills():
    return load_master_profile().get("skills", [])

@app.get("/audit")
def get_audit():
    path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "outputs", "audit_report.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Audit report not found")
    with open(path, "r") as f:
        return json.load(f)

@app.get("/health")
def get_health():
    return {"status": "ok", "service": "Portfolio Intelligence API"}

@app.post("/sync")
def trigger_sync():
    """
    Triggers the full sync pipeline: Validate -> Generate -> Audit
    (Assuming raw data fetching from GitHub/LeetCode runs on a separate cron script)
    """
    try:
        # Run validation
        validation = validate_sources()
        
        # Merge and generate profile
        profile = merge_data()
        
        # Output to React src/data
        output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "src", "data", "master_profile.json")
        with open(output_path, "w") as f:
            json.dump(profile, f, indent=2)
            
        # Run Audit
        audit_portfolio()
        
        return {
            "status": "success",
            "message": "Pipeline synchronized successfully",
            "validation_warnings": len(validation.get("conflicts", []))
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/snapshots")
def get_snapshots():
    snapshot_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "snapshots")
    if not os.path.exists(snapshot_dir):
        return []
    snapshots = []
    for file in os.listdir(snapshot_dir):
        if file.endswith(".json"):
            snapshots.append(file.replace(".json", ""))
    return sorted(snapshots, reverse=True)
