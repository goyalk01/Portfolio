import json
import os

def load_json(filepath):
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except:
        return {}

def enforce_priority(field, sources):
    """
    Priority Order:
    1. manual
    2. resume
    3. linkedin
    4. github
    5. leetcode
    """
    priority = ["manual", "resume", "linkedin", "github", "leetcode"]
    for source in priority:
        if source in sources and sources[source] is not None:
            return source, sources[source]
    return None, None

def resolve_data():
    github_data = load_json("outputs/github_data.json")
    leetcode_data = load_json("outputs/leetcode_data.json")
    linkedin_data = load_json("outputs/linkedin_data.json")
    resume_data = load_json("outputs/resume_data.json")
    manual_data = load_json("inputs/manual_overrides.json")
    
    conflict_report = {
        "conflicts_resolved": [],
        "warnings": []
    }
    
    # Example: Resolving CGPA
    cgpa_sources = {
        "manual": manual_data.get("cgpa"),
        "resume": resume_data.get("cgpa"),
        "linkedin": linkedin_data.get("cgpa")
    }
    
    chosen_source, resolved_cgpa = enforce_priority("cgpa", cgpa_sources)
    
    if len([v for v in cgpa_sources.values() if v is not None]) > 1:
        # We had multiple sources, log the decision
        conflict_report["conflicts_resolved"].append({
            "field": "cgpa",
            "available_sources": {k: v for k, v in cgpa_sources.items() if v is not None},
            "chosen_source": chosen_source,
            "resolved_value": resolved_cgpa,
            "rule_applied": "Priority hierarchy (Manual > Resume > LinkedIn)"
        })
        
    os.makedirs("data", exist_ok=True)
    with open("data/conflict_report.json", "w") as f:
        json.dump(conflict_report, f, indent=2)
        
    print("Source Priority Engine completed. Logged to data/conflict_report.json")
    return conflict_report

if __name__ == "__main__":
    resolve_data()

# Alias for backward compatibility (used by generator.py and api/main.py)
validate_sources = resolve_data
