import json
import os
from datetime import datetime
from validator_agent import validate_sources

def load_json(filepath):
    if not os.path.exists(filepath):
        print(f"Warning: Data file {filepath} not found.")
        return None
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def merge_data():
    # 1. Run Validation First
    print("Running validation layer...")
    validation = validate_sources()
    if validation.get("status") == "WARNING":
        print("Note: Validation layer found warnings. Resolving via priority rules.")

    github_data = load_json("outputs/github_data.json") or {}
    leetcode_data = load_json("outputs/leetcode_data.json") or {}
    linkedin_data = load_json("outputs/linkedin_data.json") or {}
    resume_data = load_json("outputs/resume_data.json") or {}
    
    # Priority Rule: Resume > LinkedIn for CGPA
    cgpa = resume_data.get("cgpa", linkedin_data.get("cgpa", 8.82))
    
    master_profile = {
        "name": "Krish Goyal",
        "cgpa": cgpa,
        "headline": linkedin_data.get("headline", "Software Engineer • AI/ML • Cloud • Systems"),
        "summary": linkedin_data.get("summary", "Curious Computer Science student passionate about building intelligent systems."),
    }
    
    resume_contact = resume_data.get("contact", {})
    master_profile["contact"] = {
        "email": resume_contact.get("email", "krishaggarwal1452@gmail.com"),
        "linkedin": resume_contact.get("linkedin", "https://www.linkedin.com/in/krish-goyal-b58a31320"),
        "github": resume_contact.get("github", "https://github.com/goyalk01"),
        "leetcode": resume_contact.get("leetcode", "https://leetcode.com/u/Goyalk")
    }
    
    master_profile["metrics"] = {
        "github_stars": sum(repo.get("stars", 0) for repo in github_data.get("raw_repos", [])),
        "github_repos": len(github_data.get("raw_repos", [])),
        "leetcode_solved": leetcode_data.get("total_solved", 0),
        "leetcode_hard": leetcode_data.get("hard", 0),
        "leetcode_medium": leetcode_data.get("medium", 0),
    }
    
    analysis = github_data.get("analysis", {})
    master_profile["top_projects"] = analysis.get("flagship_projects", [])
    
    # Add full project list
    master_profile["projects"] = []
    for repo in github_data.get("raw_repos", []):
        master_profile["projects"].append({
            "title": repo.get("name"),
            "description": repo.get("description", "") or "",
            "tech_stack": repo.get("topics", []),
            "url": repo.get("url")
        })
        
    master_profile["experience"] = resume_data.get("experience", linkedin_data.get("experience", []))
    master_profile["education"] = resume_data.get("education", linkedin_data.get("education", []))
    master_profile["skills"] = list(set(resume_data.get("skills", []) + linkedin_data.get("skills", [])))
    
    return master_profile

if __name__ == "__main__":
    print("Generating Master Profile...")
    profile = merge_data()
    
    # 1. Schema Validation
    try:
        from jsonschema import validate, ValidationError
        with open("schema/master_profile.schema.json", "r") as f:
            schema = json.load(f)
        validate(instance=profile, schema=schema)
        print("✅ Schema validation passed.")
    except ValidationError as e:
        print(f"❌ Schema validation failed: {e.message}")
        print("Aborting generation.")
        exit(1)
    except Exception as e:
        print(f"⚠️ Could not load schema for validation: {e}")
        
    # 2. Output to React src/data
    output_path = "../frontend/src/data/master_profile.json"
    with open(output_path, "w") as f:
        json.dump(profile, f, indent=2)
    print(f"Successfully generated {output_path}")
    
    # 3. Output Snapshot
    snapshot_dir = "data/snapshots"
    os.makedirs(snapshot_dir, exist_ok=True)
    
    today_str = datetime.now().strftime("%Y-%m-%d")
    snapshot_path = f"{snapshot_dir}/{today_str}.json"
    
    with open(snapshot_path, "w") as f:
        json.dump(profile, f, indent=2)
    print(f"Snapshot saved to {snapshot_path}")
