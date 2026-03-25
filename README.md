# lobstr.io API Documentation

Official API documentation site for [lobstr.io](https://lobstr.io), a powerful platform for performing web scraping jobs at scale.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Syntax Highlighting:** Shiki
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Environment Variables

Create a `.env` file in the root of the project with the following variable:

```env
NEXT_PUBLIC_SITE_URL=base_url or domain
e.g
NEXT_PUBLIC_SITE_URL=https://docs.lobstr.io
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | The base URL of the site. Used for generating absolute URLs (e.g. OG/meta image URLs for SEO). |

> The `.env` file is not committed to the repository. Make sure to create it locally before running the project.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   └── docs/
│       ├── layout.tsx       # Docs layout with sidebar
│       └── [...slug]/
│           └── page.tsx     # Dynamic doc pages
├── components/
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── DocContent.tsx   # Main content area
│   │   └── CodeColumn.tsx   # Code examples column
│   └── ui/                  # UI components
│       ├── CodeBlock.tsx    # Syntax-highlighted code
│       ├── CopyButton.tsx   # Copy to clipboard
│       └── ProTip.tsx       # Callout boxes
├── content/
│   ├── docs/                # Documentation JSON files
│   │   └── examples/        # Scraper-specific examples
│   ├── code-examples/       # Code snippets
│   │   ├── curl/            # cURL examples
│   │   ├── python/          # Python examples
│   │   └── response/        # API response examples
│   └── navigation.json      # Sidebar navigation structure
├── lib/
│   ├── content/             # Content loading utilities
│   ├── types/               # TypeScript interfaces
│   └── utils/               # Helper functions
└── scripts/
    └── generate-content.ts  # Content generation script
```

## Content Structure

Documentation is stored as JSON files in `content/docs/`. Each endpoint has:

- **Doc file:** `content/docs/{slug}.json` - Title, description, parameters, etc.
- **cURL example:** `content/code-examples/curl/{slug}`
- **Python example:** `content/code-examples/python/{slug}`
- **Response example:** `content/code-examples/response/{slug}/{status-code}`

### Adding New Documentation

1. Create the doc JSON file in `content/docs/`
2. Add code examples in `content/code-examples/`
3. Update `content/navigation.json` to include the new page

## API Sections

### Core Endpoints
- **Authentication** - API key authentication
- **Rate Limiting** - Request limits and handling
- **User** - Profile and balance endpoints
- **Crawler** - List and manage crawlers
- **Squid** - Create, update, and manage squids
- **Task** - Add and manage scraping tasks
- **Run** - Start and monitor scraping runs
- **Result** - Retrieve scraped data
- **Delivery** - Configure email, SFTP, S3, webhook delivery

### Example Scrapers
- Google Maps Reviews/Leads
- Google Search/News
- Twitter Profile/Search/Tweets
- Facebook Pages/Details
- LinkedIn Sales Navigator
- Leboncoin Listings/Messages/Phone
- Vinted Products
- TripAdvisor Restaurants
- Yelp Search
- YouTube Channel Emails
- Idealista Listings
- SeLoger/PAP/Pages Jaunes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For help, open an issue or contact [support@lobstr.io](mailto:support@lobstr.io).

---

© [lobstr.io](https://lobstr.io)
