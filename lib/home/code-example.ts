    export const PYTHON_EXAMPLE = `import requests

    API_KEY = "your_api_key"
    headers = {"Authorization": f"Token {API_KEY}"}

    # 1. Create a squid with a crawler
    squid = requests.post("https://api.lobstr.io/v1/squids",
        headers=headers,
        json={"crawler": "google-maps-scraper", "name": "Restaurants Paris"}
    ).json()

    # 2. Add tasks to scrape
    requests.post("https://api.lobstr.io/v1/tasks",
        headers=headers,
        json={
            "squid": squid['id'],
            "tasks": [{"url": "https://google.com/maps/search/restaurants+paris"}]
        }
    )

    # 3. Start the run
    run = requests.post("https://api.lobstr.io/v1/runs",
        headers=headers,
        json={"squid": squid['id']}
    ).json()

    # 4. Get results
    results = requests.get("https://api.lobstr.io/v1/results",
        headers=headers,
        params={"run": run['id']}
    ).json()

    for place in results['data']:
        print(f"{place['name']} - {place['rating']}★")`;