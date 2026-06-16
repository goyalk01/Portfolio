import requests
import json
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

GITHUB_USER = "goyalk01"

def fetch_github_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"Accept": "application/vnd.github.v3+json"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Error fetching from GitHub: {response.status_code}")
        return []
    
    repos = response.json()
    extracted_repos = []
    
    for repo in repos:
        if not repo.get('fork') and not repo.get('archived'):
            extracted_repos.append({
                "name": repo.get("name"),
                "description": repo.get("description", ""),
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "language": repo.get("language", ""),
                "topics": repo.get("topics", []),
                "updated_at": repo.get("updated_at"),
                "url": repo.get("html_url")
            })
            
    # Sort by stars and recent activity
    extracted_repos.sort(key=lambda x: (x["stars"], x["updated_at"]), reverse=True)
    return extracted_repos

def analyze_repos_with_gemini(repos):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY not found in environment. Returning raw repos.")
        return {"raw_repos": repos}
    
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert technical recruiter and senior software engineer evaluating a candidate's GitHub portfolio.
    Analyze the following list of repositories and determine the top flagship projects.
    
    Repositories:
    {json.dumps(repos, indent=2)}
    
    Output JSON format:
    {{
        "flagship_projects": ["repo1", "repo2", "repo3"],
        "top_ai_projects": ["repoX"],
        "top_fullstack_projects": ["repoY"],
        "most_impressive_repository": "repo_name",
        "analysis_summary": "Brief summary of the developer's strengths."
    }}
    Ensure your response is valid JSON only. Do not include markdown formatting like ```json.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        # Clean response text if it contains markdown formatting
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
            
        analysis = json.loads(text.strip())
        return {
            "raw_repos": repos,
            "analysis": analysis
        }
    except Exception as e:
        print(f"Error during Gemini analysis: {e}")
        return {"raw_repos": repos}

if __name__ == "__main__":
    print(f"Fetching GitHub data for {GITHUB_USER}...")
    repos = fetch_github_repos(GITHUB_USER)
    
    print(f"Found {len(repos)} active public repositories.")
    print("Analyzing with Gemini...")
    result = analyze_repos_with_gemini(repos)
    
    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)
    
    with open(f"{output_dir}/github_data.json", "w") as f:
        json.dump(result, f, indent=2)
        
    print(f"Saved GitHub analysis to {output_dir}/github_data.json")
