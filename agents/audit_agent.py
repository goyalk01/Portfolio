import json
import os
from datetime import datetime

def audit_portfolio():
    try:
        with open("../src/data/master_profile.json", "r") as f:
            profile = json.load(f)
    except FileNotFoundError:
        print("Master profile not found. Run generator.py first.")
        return

    missing_items = []
    missing_links = []
    
    # Profile Completeness Checks (flat structure — fields at root level)
    if not profile.get("name"): missing_items.append("name")
    if not profile.get("headline"): missing_items.append("headline")
    
    contact = profile.get("contact", {})
    if not contact.get("email"): missing_items.append("email")
    if not contact.get("linkedin"): missing_links.append("linkedin")
    if not contact.get("github"): missing_links.append("github")
    
    projects = profile.get("projects", [])
    if len(projects) == 0: missing_items.append("projects")
    
    skills = profile.get("skills", [])
    if len(skills) == 0: missing_items.append("skills")
        
    # Check physical assets
    if not os.path.exists("../public/resume.pdf"): missing_items.append("resume_pdf")
    if not os.path.exists("../public/profile.jpg"): missing_items.append("profile_photo")
    
    # Calculate Component Scores
    github_score = min(profile.get("metrics", {}).get("github_repos", 0) * 5 + profile.get("metrics", {}).get("github_stars", 0) * 10, 100)
    project_score = min(len(projects) * 20, 100)
    skills_score = min(len(skills) * 5, 100)
    
    # Aggregates
    total_checks = 8
    checks_passed = total_checks - len(missing_items) - len(missing_links)
    profile_completeness = int((checks_passed / total_checks) * 100)
    portfolio_completion = profile_completeness
    
    # Recruiter Readiness Score
    metrics = profile.get("metrics", {})
    readiness_score = 40
    if github_score > 50: readiness_score += 20
    if metrics.get("leetcode_solved", 0) > 100: readiness_score += 20
    if profile.get("experience"): readiness_score += 20
    
    deployment_readiness = 100 if portfolio_completion > 80 and len(missing_items) == 0 else 50
    content_freshness = 100 # Assuming fresh upon generation
    
    report = {
        "portfolio_completion": portfolio_completion,
        "profile_completeness": profile_completeness,
        "recruiter_readiness": min(readiness_score, 100),
        "content_freshness": content_freshness,
        "deployment_readiness": deployment_readiness,
        "scores": {
            "github_score": github_score,
            "project_score": project_score,
            "skills_score": skills_score
        },
        "missing_assets": missing_items,
        "missing_links": missing_links,
        "metrics_summary": metrics,
        "last_sync": datetime.now().strftime("%Y-%m-%d")
    }
    
    os.makedirs("outputs", exist_ok=True)
    with open("outputs/audit_report.json", "w") as f:
        json.dump(report, f, indent=2)
        
    print("Audit Phase 3.9 complete.")
    print(json.dumps(report, indent=2))

if __name__ == "__main__":
    audit_portfolio()
