# Documentation JSON Format Guide

This guide explains how to create documentation JSON files for the lobstr.io API documentation site.

## File Structure

Each scraper example requires **12 files**:

```
content/
├── docs/examples/{scraper-slug}/
│   ├── add-tasks.json
│   ├── update-settings.json
│   └── get-results.json
├── code-examples/
│   ├── curl/examples/{scraper-slug}/
│   │   ├── add-tasks
│   │   ├── update-settings
│   │   └── get-results
│   ├── python/examples/{scraper-slug}/
│   │   ├── add-tasks
│   │   ├── update-settings
│   │   └── get-results
│   └── response/examples/{scraper-slug}/
│       ├── add-tasks/200
│       ├── update-settings/201
│       └── get-results/200
└── navigation.json (update to add new scraper)
```

---

## JSON Documentation Schema

### Root Level Fields

```json
{
  "slug": "examples/{scraper-slug}/{endpoint}",
  "title": "Add Tasks",
  "description": "Short description of what this endpoint does",
  "category": "Scraper Display Name",
  "metadata": { ... },
  "content": { ... },
  "seo": { ... }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | URL path: `examples/{scraper-slug}/{endpoint}` |
| `title` | string | Yes | Page title (e.g., "Add Tasks", "Update Settings", "Get Results") |
| `description` | string | Yes | Brief description for the page |
| `category` | string | Yes | Display name of the scraper (e.g., "Google Maps Reviews Scraper") |
| `metadata` | object | Yes | API endpoint metadata |
| `content` | object | Yes | Main content of the documentation |
| `seo` | object | Yes | SEO metadata |

---

### Metadata Object

```json
"metadata": {
  "method": "POST",
  "endpoint": "/v1/tasks",
  "requiresAuth": true
}
```

| Field | Type | Description |
|-------|------|-------------|
| `method` | string | HTTP method: `POST`, `GET`, `PATCH`, `DELETE` |
| `endpoint` | string | API endpoint path |
| `requiresAuth` | boolean | Whether authentication is required (usually `true`) |

**Common endpoints:**
- Add Tasks: `POST /v1/tasks`
- Update Settings: `POST /v1/squids/{squid_hash}`
- Get Results: `GET /v1/results`

---

### Content Object

```json
"content": {
  "introduction": "Detailed introduction text...",
  "sections": { ... },
  "parameters": [ ... ],
  "headers": [ ... ],
  "proTips": [ ... ]
}
```

#### Introduction
A string with markdown support. Explains what this endpoint does and how to use it.

```json
"introduction": "Add Google Maps place URLs as tasks to your squid. The scraper will extract reviews from each place you provide.\n\nYou can use either the short CID format or the full Google Maps URL."
```

#### RENDER Directive

You can embed sections inline within the introduction using the `{{RENDER:sectionKey}}` syntax. This renders the specified section at that position in the introduction text.

```json
"introduction": "This endpoint retrieves details about a squid.\n\n{{RENDER:coreFields}}\n\n{{RENDER:statusFields}}\n\n{{RENDER:integrationFields}}"
```

**How it works:**
- `{{RENDER:coreFields}}` will be replaced with the rendered content of `sections.coreFields`
- Useful for organizing long documentation with multiple field tables
- Each rendered section appears in order within the introduction flow

**Example with RENDER:**

```json
{
  "content": {
    "introduction": "Get comprehensive squid details.\n\n{{RENDER:coreFields}}\n\n{{RENDER:runFields}}",
    "sections": {
      "coreFields": {
        "title": "Core Information Fields",
        "fields": [
          {"path": "id", "type": "string", "description": "Unique identifier", "example": "\"abc123\""},
          {"path": "name", "type": "string", "description": "Display name", "example": "\"My Squid\""}
        ]
      },
      "runFields": {
        "title": "Run Status Fields",
        "fields": [
          {"path": "last_run_status", "type": "string", "description": "Status of last run", "example": "\"DONE\""},
          {"path": "total_runs", "type": "integer", "description": "Total runs executed", "example": "5"}
        ]
      }
    }
  }
}
```

This renders as:
1. Introduction text
2. "Core Information Fields" table
3. "Run Status Fields" table

---

### Sections Object

Sections contain different content blocks. Each section has a unique key and can be one of several types:

#### Type 1: Simple Content Section

```json
"sections": {
  "urlFormat": {
    "title": "URL Format",
    "content": "**Google Maps search URL:**\n`https://www.google.com/maps/search/...`\n\nThe URL contains the search query and coordinates."
  }
}
```

#### Type 2: Table Section (with columns and rows)

```json
"sections": {
  "requestBody": {
    "title": "Request Body",
    "columns": [
      {"header": "Field", "key": "field"},
      {"header": "Type", "key": "type"},
      {"header": "Required", "key": "required"},
      {"header": "Description", "key": "description"}
    ],
    "rows": [
      {"field": "**squid**", "type": "string", "required": "Yes", "description": "Hash of your squid"},
      {"field": "**tasks**", "type": "array", "required": "Yes", "description": "Array of task objects"}
    ]
  }
}
```

#### Type 3: Fields Section (for Get Results)

```json
"sections": {
  "resultFields": {
    "title": "Result Fields",
    "content": "Each result object contains the following fields:",
    "fields": [
      {"path": "id", "type": "string", "description": "Unique result identifier", "example": "\"6ab98eca1b26828a\""},
      {"path": "user_name", "type": "string", "description": "Reviewer's display name", "example": "\"John Doe\""},
      {"path": "score", "type": "integer", "description": "Rating (1-5 stars)", "example": "5"}
    ]
  }
}
```

---

### Parameters Array (for GET endpoints)

Used in Get Results pages:

```json
"parameters": [
  {
    "name": "squid",
    "type": "string",
    "required": true,
    "description": "Hash of the squid to get results from",
    "example": "b6ab0f03b02e472a8e2ab0b16b4fdd0f"
  },
  {
    "name": "page",
    "type": "integer",
    "required": false,
    "description": "Page number (default: 1)",
    "example": "1"
  }
]
```

For POST endpoints, use an empty array: `"parameters": []`

---

### Headers Array

```json
"headers": [
  {
    "key": "Authorization",
    "value": "Token YOUR_API_KEY",
    "required": true,
    "description": "Your API authentication token"
  },
  {
    "key": "Content-Type",
    "value": "application/json",
    "required": true,
    "description": "Request body format"
  }
]
```

**Note:** GET endpoints typically only need Authorization header.

---

### ProTips Array

```json
"proTips": [
  {
    "type": "tip",
    "content": "You can add up to 1000 tasks in a single request."
  },
  {
    "type": "note",
    "content": "Duplicate URLs are automatically detected."
  },
  {
    "type": "warning",
    "content": "This feature may incur additional costs."
  }
]
```

| Type | Usage |
|------|-------|
| `tip` | Helpful suggestions and best practices |
| `note` | Important information to be aware of |
| `warning` | Cautions about potential issues or costs |

---

### SEO Object

```json
"seo": {
  "title": "Add Tasks - Google Maps Reviews Scraper - lobstr.io API",
  "description": "Learn how to add Google Maps place URLs to scrape reviews using the lobstr.io API.",
  "image": "images/your-custom-meta-image.png"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Page title for SEO |
| `description` | string | Yes | Brief, keyword-rich description (150-160 characters) |
| `image` | string | No | Custom OG/meta image path. Falls back to the site default meta image if omitted. |

**Format:**
- Title: `{Page Title} - {Scraper Name} - lobstr.io API`
- Description: Brief, keyword-rich description (150-160 characters)
- Image (optional): Path relative to the public directory (e.g. `"images/authentication-meta-img.png"`). If not provided, the default site meta image is used automatically.

---

## Code Examples

### cURL Example

File: `content/code-examples/curl/examples/{scraper-slug}/add-tasks`

```bash
curl -X POST "https://api.lobstr.io/api/v2/squid/YOUR_SQUID_ID/task" \
  -H "Authorization: Token YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/search"
  }'
```

### Python Example

File: `content/code-examples/python/examples/{scraper-slug}/add-tasks`

```python
import requests

API_TOKEN = "YOUR_API_TOKEN"
SQUID_ID = "YOUR_SQUID_ID"

url = f"https://api.lobstr.io/api/v2/squid/{SQUID_ID}/task"
headers = {
    "Authorization": f"Token {API_TOKEN}",
    "Content-Type": "application/json"
}
data = {
    "url": "https://example.com/search"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### Response Example

File: `content/code-examples/response/examples/{scraper-slug}/add-tasks/200`

```json
{
  "id": "task_abc123",
  "squid_id": "YOUR_SQUID_ID",
  "status": "pending",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

## Navigation JSON

Add new scraper to `content/navigation.json`:

```json
{
  "title": "Examples",
  "subsections": [
    // ... existing scrapers ...
    {
      "title": "My New Scraper",
      "items": [
        {
          "title": "Add Tasks",
          "slug": "examples/my-new-scraper/add-tasks"
        },
        {
          "title": "Update Settings",
          "slug": "examples/my-new-scraper/update-settings"
        },
        {
          "title": "Get Results",
          "slug": "examples/my-new-scraper/get-results"
        }
      ]
    }
  ]
}
```

---

## Checklist for New Scraper Documentation

- [ ] Create folder: `content/docs/examples/{scraper-slug}/`
- [ ] Create `add-tasks.json`
- [ ] Create `update-settings.json`
- [ ] Create `get-results.json`
- [ ] Create cURL examples (3 files)
- [ ] Create Python examples (3 files)
- [ ] Create response examples (3 files)
- [ ] Update `navigation.json`
- [ ] Commit changes

---

## Common Patterns

### Add Tasks (URL-based scrapers)
- Task field is usually `url`
- Include URL format examples in sections

### Add Tasks (Keyword-based scrapers)
- Task field is usually `keyword` or `search_term`
- Explain what keywords to use

### Update Settings
- Document all scraper-specific parameters
- Include allowed values for enum fields
- Note which settings are required vs optional

### Get Results
- List all result fields with types and examples
- Include pagination parameters
- Note any fields that may be null
