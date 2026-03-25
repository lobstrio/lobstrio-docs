# Changelog

All notable changes to this project are documented here.

## [1.1.0] - 2025-03-25

### Added
- **Footer redesign** — favicon + brand logo, social icons (GitHub, Twitter, LinkedIn), three link columns (API, Tools, Resources), Dashboard CTA, gradient background
- **MCP Server** — 6 documentation tools over HTTP (`list_docs`, `list_examples`, `get_doc`, `search_docs`, `get_navigation`, `get_code_example`) with word-based search scoring
- **MCP documentation page** (`/docs/mcp`) — setup configs for Claude Code, Claude Desktop, Cursor; example prompts; API reference
- **SDK documentation page** (`/docs/sdk`) — installation, quick start, async client example, full API reference table mapping SDK methods to endpoints
- **CLI documentation page** (`/docs/cli`) — installation, `go` command examples, step-by-step workflow, command reference
- **Shared CodeBlock component** — extended with `theme` (dark/light), `showCopy`, `showLabel` props
- **Homepage meta tags** using Head component (title, description, OG, Twitter card, canonical)
- **Standalone deployment** with PM2 + nginx (`deploy.sh`, `ecosystem.config.cjs`)
- **Get Crawler Attributes endpoint** documentation (`GET /v1/crawlers/{hash}/attributes`)
- **Delivery code examples** — cURL, Python, response for all 6 delivery routes
- **Rate limiting 429 response** example
- Apache 2.0 license
- CONTRIBUTING.md and .env.example

### Changed
- Header nav links (SDK, CLI, MCP) now point to internal documentation pages
- Footer completely redesigned with multi-column layout
- Homepage code example updated with correct API flow (configure settings step, proper status check, correct field names)
- "How it works" grid updated to 6 steps (added "Configure settings")
- Search improved from exact substring to word-based scoring
- "Lobstr.io" → "lobstr.io" across all files
- CTA buttons use sentence case ("Get started" not "Get Started")
- Logo font restored to Source Sans 3 in header and footer
- Package renamed from `lobstr-api-docs` to `lobstrio-docs`
- Version bumped to 1.1.0

### Fixed
- Example docs category/subcategory normalization (81 files)
- `NEXT_PUBLIC_SITE_URL` fallback in doc pages
- Internal links use Next.js `<Link>` instead of `<a target="_blank">`
- Sidebar `findActiveContext` path stripping

## [1.0.0] - 2025-02-03

### Added
- **Documentation site** — Next.js 15 App Router with TypeScript and Tailwind CSS 4
- **138 API endpoint documentation pages** covering all lobstr.io API routes
- **31 scraper example documentation sets** (add-tasks, update-settings, get-results) for Google Maps, Twitter, LinkedIn, Instagram, Facebook, and more
- **Code examples** — cURL and Python for every endpoint, response examples with status codes
- **Three-column layout** — sidebar navigation, main content, code examples
- **Syntax highlighting** with Shiki (github-dark and github-light themes)
- **Content system** — JSON-based docs with dynamic code example discovery
- **Navigation** — collapsible sidebar with sections and scraper subsections
- **Copy to clipboard** — light and dark variants
- **Copy for LLM** button on every doc page
- **SEO** — per-page meta tags, OG images, sitemap, robots.txt, canonical URLs
- **Homepage** — hero, features bar, "How it works" with live code preview, API reference grid, CTA section
- **Custom components** — ProTip alerts (tip/note/warning), parameters list, response fields, event types, custom tables
- **Not found page** with custom design
- **Responsive design** — mobile hamburger menu, adaptive layouts

### Scraper Examples
- Bien'Ici Search Export
- Facebook Page Details Export
- Facebook Pages Search Export
- Google Maps Leads Scraper
- Google Maps Reviews Scraper
- Google News Search Export
- Google Search Scraper
- Idealista Listings Search Export
- Instagram Posts Scraper
- Instagram Profile Scraper
- Instagram Reels Scraper
- LaCentrale Cars Scraper
- Leboncoin Auto Message Sender
- Leboncoin Listings Search Export
- Leboncoin Listings & Phone Search Export
- LinkedIn Posts Commenters and Likers Scraper
- LinkedIn Profile Scraper
- Pages Jaunes Companies Search Export
- PAP Search Export
- Sales Navigator Companies Scraper
- Sales Navigator Leads Scraper
- SeLoger Search Export
- TikTok Top Ads Scraper
- TripAdvisor Restaurants Scraper
- TripAdvisor Reviews Scraper
- Twitter Profile Scraper
- Twitter Search Results Scraper
- Twitter User Tweets Scraper
- Vinted Products Scraper
- Yelp Search Export
- YouTube Channel Email Scraper
