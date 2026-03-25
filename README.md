# lobstr.io API Documentation

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![MCP](https://img.shields.io/badge/MCP-Server-red)](https://staging.docs.lobstr.io/docs/mcp)

Official API documentation site for [lobstr.io](https://lobstr.io) — a web scraping automation platform with 50+ ready-made crawlers.

**Live:** [docs.lobstr.io](https://docs.lobstr.io)

## Features

- **138 API endpoint docs** with cURL, Python examples, and response samples
- **31 scraper examples** — Google Maps, Twitter, LinkedIn, Instagram, and more
- **MCP Server** — AI assistants can search and retrieve docs via [Model Context Protocol](https://staging.docs.lobstr.io/docs/mcp)
- **Python SDK** and **CLI** documentation pages
- **Three-column layout** — sidebar navigation, content, code examples
- **Syntax highlighting** with Shiki (dark/light themes)
- **Copy for LLM** button on every page
- **SEO** — per-page meta, OG images, sitemap, robots.txt

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Syntax Highlighting:** Shiki
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/lobstrio/lobstrio-docs.git
cd lobstrio-docs
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Base URL for absolute URLs (OG images, canonical, sitemap). Default: `https://docs.lobstr.io` |

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  docs/
    [...slug]/          # Dynamic doc pages (from JSON)
    mcp/                # MCP server page
    sdk/                # Python SDK page
    cli/                # CLI page
  api/mcp/              # MCP HTTP endpoint
components/
  layout/               # Header, Footer, Sidebar, ThreeColumnLayout
  ui/                   # CodeBlock, CopyButton, ProTip
  docs/                 # CustomTable, ParametersList, ResponseFieldsList
content/
  docs/                 # 138 documentation JSON files
    examples/           # 31 scraper-specific examples
  code-examples/
    curl/               # cURL examples
    python/             # Python examples
    response/           # API response examples (by status code)
  navigation.json       # Sidebar structure
lib/
  content/              # Content loader (reads JSON + code examples)
  types/                # TypeScript interfaces
```

## API Sections

### Core Endpoints
- **Authentication** — Token-based API authentication
- **Rate Limiting** — Request limits and headers
- **User** — Profile and balance
- **Crawler** — List, details, parameters, attributes
- **Squid** — Create, update, empty, delete
- **Task** — Add, upload, list, delete
- **Run** — Start, monitor, abort, download
- **Result** — Retrieve scraped data
- **Delivery** — Email, SFTP, S3, Google Sheet, webhook
- **Account** — Sync, manage platform accounts

### Example Scrapers (31)
Google Maps (Leads + Reviews) · Google Search · Google News · Twitter (Profile + Search + Tweets) · Facebook (Pages + Details) · LinkedIn (Profile + Posts) · Sales Navigator (Leads + Companies) · Instagram (Profile + Posts + Reels) · Leboncoin (Listings + Phone + Messages) · Vinted · TripAdvisor (Restaurants + Reviews) · Yelp · YouTube · TikTok Top Ads · SeLoger · PAP · Pages Jaunes · LaCentrale · Idealista · Bien'Ici

### Developer Tools
- **[Python SDK](https://staging.docs.lobstr.io/docs/sdk)** — `pip install lobstrio-sdk`
- **[CLI](https://staging.docs.lobstr.io/docs/cli)** — `pip install lobstrio`
- **[MCP Server](https://staging.docs.lobstr.io/docs/mcp)** — Connect AI assistants to the docs

## MCP Server

The documentation is available via [Model Context Protocol](https://modelcontextprotocol.io) at `/api/mcp`. Configure in Claude Code, Claude Desktop, or Cursor:

```json
{
  "mcpServers": {
    "lobstrio-docs": {
      "type": "http",
      "url": "https://docs.lobstr.io/api/mcp"
    }
  }
}
```

**6 tools:** `list_docs`, `list_examples`, `get_doc`, `search_docs`, `get_navigation`, `get_code_example`

## Adding Documentation

Each endpoint needs 4 files:

1. `content/docs/{slug}.json` — Documentation JSON
2. `content/code-examples/curl/{slug}` — cURL example
3. `content/code-examples/python/{slug}` — Python example
4. `content/code-examples/response/{slug}/{status}` — Response example

Then add to `content/navigation.json`. See [DOCS_GUIDE.md](DOCS_GUIDE.md) for the full schema.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[Apache License 2.0](LICENSE)

---

&copy; [lobstr.io](https://lobstr.io)
