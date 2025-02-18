import requests

# הגדרות
OWNER = "KALFANET"
REPO = "clientsoft"
BRANCH = "main"  # שנה את השם אם יש ענף אחר
EXCLUDE_DIRS = ["node_modules", "__pycache__", ".git", "build", "dist"]
API_URL = f"https://api.github.com/repos/{OWNER}/{REPO}/git/trees/{BRANCH}?recursive=1"
RAW_BASE_URL = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{BRANCH}/"


def get_github_files():
    response = requests.get(API_URL)
    if response.status_code != 200:
        print(f"Error: Unable to fetch repository tree ({response.status_code})")
        return []
    
    data = response.json()
    files = [item["path"] for item in data.get("tree", []) if item["type"] == "blob"]
    
    return [file for file in files if not any(excluded in file.split("/") for excluded in EXCLUDE_DIRS)]


def export_file_links():
    files = get_github_files()
    if not files:
        print("No files found.")
        return
    
    with open("github_file_links.txt", "w", encoding="utf-8") as f:
        for file in files:
            f.write(f"{RAW_BASE_URL}{file}\n")
    
    print(f"Export completed. {len(files)} files saved in 'github_file_links.txt'")


if __name__ == "__main__":
    export_file_links()
