import requests
import json
import os

LEETCODE_USER = "Goyalk"

def fetch_leetcode_data(username):
    url = "https://leetcode.com/graphql"
    
    query = """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    """
    
    variables = {"username": username}
    
    headers = {
        "Content-Type": "application/json",
        "Referer": f"https://leetcode.com/{username}/"
    }
    
    response = requests.post(url, json={"query": query, "variables": variables}, headers=headers)
    
    if response.status_code != 200:
        print(f"Error fetching from LeetCode: {response.status_code}")
        return None
        
    data = response.json().get("data", {})
    matched_user = data.get("matchedUser")
    
    if not matched_user:
        print(f"User {username} not found on LeetCode.")
        return None
        
    stats = matched_user.get("submitStats", {}).get("acSubmissionNum", [])
    profile = matched_user.get("profile", {})
    
    result = {
        "ranking": profile.get("ranking"),
        "total_solved": 0,
        "easy": 0,
        "medium": 0,
        "hard": 0
    }
    
    for stat in stats:
        diff = stat.get("difficulty", "").lower()
        if diff == "all":
            result["total_solved"] = stat.get("count", 0)
        elif diff in ["easy", "medium", "hard"]:
            result[diff] = stat.get("count", 0)
            
    return result

if __name__ == "__main__":
    print(f"Fetching LeetCode data for {LEETCODE_USER}...")
    result = fetch_leetcode_data(LEETCODE_USER)
    
    if result:
        output_dir = "outputs"
        os.makedirs(output_dir, exist_ok=True)
        
        with open(f"{output_dir}/leetcode_data.json", "w") as f:
            json.dump(result, f, indent=2)
            
        print(f"Saved LeetCode analysis to {output_dir}/leetcode_data.json")
