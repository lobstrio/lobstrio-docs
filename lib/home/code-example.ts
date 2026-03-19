    export const PYTHON_EXAMPLE = `import requests
import time

API_KEY = "your_api_key"
headers = {"Authorization": f"Token {API_KEY}"}

# 1. Create a squid with Google Maps Leads Scraper
squid = requests.post("https://api.lobstr.io/v1/squids",
    headers=headers,
    json={"crawler": "4734d096159ef05210e0e1677e8be823", "name": "Restaurants Paris"}
).json()

# 2. Configure squid settings
requests.post(f"https://api.lobstr.io/v1/squids/{squid['id']}",
    headers=headers,
    json={"params": {"country": "France", "max_results": 200}}
)

# 3. Add tasks to scrape
requests.post("https://api.lobstr.io/v1/tasks",
    headers=headers,
    json={
        "squid": squid['id'],
        "tasks": [{"url": "https://google.com/maps/search/restaurants+paris"}]
    }
)

# 4. Start the run
run = requests.post("https://api.lobstr.io/v1/runs",
    headers=headers,
    json={"squid": squid['id']}
).json()

# 5. Wait for the run to complete
while True:
    status = requests.get(f"https://api.lobstr.io/v1/runs/{run['id']}",
        headers=headers
    ).json()
    if status['status'] in ('done', 'error'):
        break
    time.sleep(10)

# 6. Get results
results = requests.get("https://api.lobstr.io/v1/results",
    headers=headers,
    params={"run": run['id']}
).json()

for place in results['data']:
    print(f"{place['name']} - {place['score']}★")
`;