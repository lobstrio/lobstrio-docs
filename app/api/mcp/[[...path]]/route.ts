import fs from 'fs';
import path from 'path';
import { loadDocContent, getAllDocSlugs, loadNavigation } from '@/lib/content/content-loader';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

// ---- In-memory docs index ----

interface DocSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  method: string;
  endpoint: string;
  introduction: string;
}

let docsIndex: DocSummary[] | null = null;

async function getDocsIndex(): Promise<DocSummary[]> {
  if (docsIndex) return docsIndex;
  const slugs = await getAllDocSlugs();
  docsIndex = slugs.map((slug) => {
    const filePath = path.join(process.cwd(), 'content', 'docs', `${slug}.json`);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return {
      slug: raw.slug ?? slug,
      title: raw.title ?? '',
      description: raw.description ?? '',
      category: raw.category ?? '',
      subcategory: raw.subcategory ?? '',
      method: raw.metadata?.method ?? '',
      endpoint: raw.metadata?.endpoint ?? '',
      introduction: raw.content?.introduction ?? '',
    };
  });
  return docsIndex;
}

function formatDocSummary(doc: DocSummary): string {
  const method = doc.method ? `${doc.method} ` : '';
  const endpoint = doc.endpoint ? `${doc.endpoint} ` : '';
  return `${doc.title} (${method}${endpoint})\n  slug: ${doc.slug}\n  category: ${doc.category}\n  ${doc.description}`;
}

// ---- Tool handlers ----

type ToolResult = { content: { type: 'text'; text: string }[]; isError?: boolean };

const TOOLS = [
  {
    name: 'list_docs',
    description: 'List core Lobstr.io API documentation pages (excludes scraper examples). Optionally filter by category (e.g. User, Squid, Task, Run, Crawler, Delivery, Account, Result, Getting Started). Paginated.',
    inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Filter by category name. Case-insensitive.' }, page: { type: 'number', description: 'Page number (default: 1)' }, page_size: { type: 'number', description: 'Results per page (default: 20, max: 50)' } } },
  },
  {
    name: 'list_examples',
    description: 'List all scrapers that have example documentation. Shows scraper name, slug, and available endpoints (add-tasks, update-settings, get-results).',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_doc',
    description: 'Get full documentation for a specific Lobstr.io API endpoint, including request body, response fields, parameters, headers, code examples, and response examples.',
    inputSchema: { type: 'object', properties: { slug: { type: 'string', description: 'Document slug (e.g. "get-balance", "create-squid", "examples/google-maps-leads-scraper/add-tasks")' } }, required: ['slug'] },
  },
  {
    name: 'search_docs',
    description: 'Search all Lobstr.io API documentation (core + examples) by keyword. Searches across titles, descriptions, introductions, and endpoint paths.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', description: 'Search query' }, limit: { type: 'number', description: 'Max results (default: 10, max: 50)' } }, required: ['query'] },
  },
  {
    name: 'get_navigation',
    description: 'Get the Lobstr.io API documentation navigation structure.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_code_example',
    description: 'Get a specific code example (cURL, Python, or API response) for a Lobstr.io API endpoint.',
    inputSchema: { type: 'object', properties: { slug: { type: 'string', description: 'Document slug' }, type: { type: 'string', enum: ['curl', 'python', 'response'], description: 'Example type' } }, required: ['slug', 'type'] },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  switch (name) {
    case 'list_docs': {
      const index = await getDocsIndex();
      const category = args.category as string | undefined;
      const page = Math.max((args.page as number) ?? 1, 1);
      const pageSize = Math.min(Math.max((args.page_size as number) ?? 20, 1), 50);
      let results = index.filter((d) => !d.slug.startsWith('examples/'));
      if (category) {
        const q = category.toLowerCase();
        results = results.filter((d) => d.category.toLowerCase().includes(q));
      }
      const total = results.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const paged = results.slice(start, start + pageSize);
      const text = paged.length
        ? `Page ${page}/${totalPages} (${total} total)\n\n${paged.map((d, i) => `${start + i + 1}. ${formatDocSummary(d)}`).join('\n\n')}`
        : `No documentation pages found${category ? ` for category "${category}"` : ''}.`;
      return { content: [{ type: 'text', text }] };
    }

    case 'list_examples': {
      const index = await getDocsIndex();
      const examples = index.filter((d) => d.slug.startsWith('examples/'));
      const scraperMap = new Map<string, { name: string; slug: string; endpoints: string[] }>();
      for (const doc of examples) {
        const parts = doc.slug.split('/');
        const scraperSlug = parts[1];
        const endpoint = parts[2];
        if (!scraperMap.has(scraperSlug)) {
          scraperMap.set(scraperSlug, { name: doc.subcategory || doc.category, slug: scraperSlug, endpoints: [] });
        }
        scraperMap.get(scraperSlug)!.endpoints.push(endpoint);
      }
      const scrapers = Array.from(scraperMap.values()).sort((a, b) => a.name.localeCompare(b.name));
      const lines = scrapers.map((s, i) =>
        `${i + 1}. **${s.name}** (${s.slug})\n   Endpoints: ${s.endpoints.join(', ')}`
      );
      return { content: [{ type: 'text', text: `${scrapers.length} scrapers with example documentation:\n\n${lines.join('\n\n')}\n\nTo get full docs for a scraper endpoint, use get_doc with slug: "examples/{slug}/{endpoint}"\nExample: get_doc({ slug: "examples/google-maps-leads-scraper/add-tasks" })` }] };
    }

    case 'get_doc': {
      const slug = args.slug as string;
      try {
        const doc = await loadDocContent(slug);
        const parts: string[] = [];
        parts.push(`# ${doc.title}`);
        parts.push(`**Category:** ${doc.category}`);
        if (doc.metadata?.method && doc.metadata?.endpoint) parts.push(`**${doc.metadata.method}** \`${doc.metadata.endpoint}\``);
        if (doc.metadata?.requiresAuth) parts.push('**Authentication:** Required');
        parts.push(`\n${doc.description}`);
        if (doc.content?.introduction) parts.push(`\n## Introduction\n${doc.content.introduction}`);
        if (doc.content?.parameters?.length) {
          parts.push('\n## Query Parameters');
          for (const p of doc.content.parameters) parts.push(`- **${p.name}** \`${p.type}\` ${p.required ? '(required)' : '(optional)'} — ${p.description}${p.example ? ` Example: ${p.example}` : ''}`);
        }
        if (doc.content?.headers?.length) {
          parts.push('\n## Headers');
          for (const h of doc.content.headers) parts.push(`- **${h.key}:** \`${h.value}\`${h.required ? ' (required)' : ''} — ${h.description}`);
        }
        if (doc.content?.body?.length) {
          parts.push('\n## Request Body');
          for (const b of doc.content.body) parts.push(`- **${b.name}** \`${b.type}\` ${b.required ? '(required)' : '(optional)'} — ${b.description}${b.example ? ` Example: \`${JSON.stringify(b.example)}\`` : ''}`);
        }
        // Render sections: bodyParameters, responseFields, tables, etc.
        if (doc.content?.sections) {
          for (const [key, section] of Object.entries(doc.content.sections)) {
            const s = section as unknown as Record<string, unknown>;
            const title = s.title as string || key;
            // ParameterSection (has .parameters)
            if (Array.isArray(s.parameters)) {
              parts.push(`\n## ${title}`);
              for (const p of s.parameters as Array<Record<string, unknown>>) {
                parts.push(`- **${p.name}** \`${p.type}\` ${p.required ? '(required)' : '(optional)'} — ${p.description}${p.example ? ` Example: \`${p.example}\`` : ''}`);
              }
            }
            // ResponseFieldsSection (has .fields)
            else if (Array.isArray(s.fields)) {
              parts.push(`\n## ${title}`);
              for (const f of s.fields as Array<Record<string, unknown>>) {
                parts.push(`- **${f.path}** \`${f.type}\` — ${f.description}${f.example ? ` Example: \`${f.example}\`` : ''}`);
              }
            }
            // TableSection (has .columns + .rows)
            else if (Array.isArray(s.columns) && Array.isArray(s.rows)) {
              const cols = s.columns as Array<{ header: string; key: string }>;
              const rows = s.rows as Array<Record<string, string>>;
              parts.push(`\n## ${title}`);
              if (s.content) parts.push(s.content as string);
              const header = `| ${cols.map((c) => c.header).join(' | ')} |`;
              const divider = `| ${cols.map(() => '---').join(' | ')} |`;
              const body = rows.map((r) => `| ${cols.map((c) => r[c.key] ?? '').join(' | ')} |`).join('\n');
              parts.push(`${header}\n${divider}\n${body}`);
            }
            // Simple content section
            else if (typeof s.content === 'string') {
              parts.push(`\n## ${title}\n${s.content}`);
            }
          }
        }
        if (doc.content?.proTips?.length) {
          parts.push('\n## Tips');
          for (const tip of doc.content.proTips) parts.push(`- [${tip.type}] ${tip.content}`);
        }
        if (doc.examples?.languages?.length) {
          parts.push('\n## Code Examples');
          for (const ex of doc.examples.languages) parts.push(`\n### ${ex.label}\n\`\`\`${ex.language}\n${ex.code}\n\`\`\``);
        }
        if (doc.examples?.responses?.length) {
          parts.push('\n## Response Examples');
          for (const r of doc.examples.responses) parts.push(`\n### Status ${r.status}\n\`\`\`json\n${r.body}\n\`\`\``);
        }
        return { content: [{ type: 'text', text: parts.join('\n') }] };
      } catch {
        return { content: [{ type: 'text', text: `Documentation not found for slug: "${slug}"` }], isError: true };
      }
    }

    case 'search_docs': {
      const query = args.query as string;
      const limit = Math.min((args.limit as number) ?? 10, 50);
      const q = query.toLowerCase();
      const index = await getDocsIndex();
      const scored = index
        .map((doc) => {
          let score = 0;
          if (doc.title.toLowerCase().includes(q)) score += 10;
          if (doc.endpoint.toLowerCase().includes(q)) score += 8;
          if (doc.description.toLowerCase().includes(q)) score += 5;
          if (doc.category.toLowerCase().includes(q)) score += 3;
          if (doc.introduction.toLowerCase().includes(q)) score += 1;
          return { doc, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      const text = scored.length
        ? `Found ${scored.length} result(s) for "${query}":\n\n${scored.map((r, i) => `${i + 1}. ${formatDocSummary(r.doc)}`).join('\n\n')}`
        : `No results found for "${query}".`;
      return { content: [{ type: 'text', text }] };
    }

    case 'get_navigation': {
      const nav = await loadNavigation();
      const parts: string[] = ['# Documentation Navigation\n'];
      for (const section of nav.sections) {
        parts.push(`## ${section.title}`);
        if (section.items) for (const item of section.items) parts.push(`  - ${item.title} → ${item.slug}`);
        if (section.subsections) for (const sub of section.subsections) {
          parts.push(`  ### ${sub.title}`);
          for (const item of sub.items) parts.push(`    - ${item.title} → ${item.slug}`);
        }
      }
      return { content: [{ type: 'text', text: parts.join('\n') }] };
    }

    case 'get_code_example': {
      const slug = args.slug as string;
      const type = args.type as string;
      const baseDir = path.join(process.cwd(), 'content', 'code-examples');
      if (type === 'response') {
        const responseDir = path.join(baseDir, 'response', slug);
        if (!fs.existsSync(responseDir)) return { content: [{ type: 'text', text: `No response examples for "${slug}".` }], isError: true };
        const files = fs.readdirSync(responseDir).filter((f) => !isNaN(parseInt(f, 10))).sort();
        const parts = files.map((file) => `### Status ${file}\n\`\`\`json\n${fs.readFileSync(path.join(responseDir, file), 'utf-8')}\n\`\`\``);
        return { content: [{ type: 'text', text: parts.join('\n\n') || `No response examples for "${slug}".` }] };
      }
      const filePath = path.join(baseDir, type, slug);
      if (!fs.existsSync(filePath)) return { content: [{ type: 'text', text: `No ${type} example for "${slug}".` }], isError: true };
      const code = fs.readFileSync(filePath, 'utf-8');
      return { content: [{ type: 'text', text: `\`\`\`${type === 'curl' ? 'bash' : type}\n${code}\n\`\`\`` }] };
    }

    default:
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
  }
}

// ---- JSON-RPC handler ----

const SERVER_INFO = { name: pkg.name, version: pkg.version };

function jsonrpc(id: unknown, result: unknown) {
  return { jsonrpc: '2.0', id, result };
}

function jsonrpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

async function handleMessage(msg: { id?: unknown; method: string; params?: Record<string, unknown> }) {
  switch (msg.method) {
    case 'initialize':
      return jsonrpc(msg.id, {
        protocolVersion: '2025-03-26',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });
    case 'tools/list':
      return jsonrpc(msg.id, { tools: TOOLS });
    case 'tools/call': {
      const { name, arguments: args } = msg.params as { name: string; arguments: Record<string, unknown> };
      const result = await handleToolCall(name, args ?? {});
      return jsonrpc(msg.id, result);
    }
    case 'notifications/initialized':
      return null;
    default:
      return jsonrpcError(msg.id, -32601, `Method not found: ${msg.method}`);
  }
}

// ---- Request logging ----

function logRequest(method: string, req: Request, extra?: string) {
  const url = new URL(req.url);
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => { headers[k] = v; });
  console.log(`[MCP] ${method} ${url.pathname}${extra ? ' ' + extra : ''}`);
  console.log(`[MCP] Headers: ${JSON.stringify(headers)}`);
}

// ---- Route handlers (catch-all: /api/mcp, /api/mcp/sse, /api/mcp/message, etc.) ----

export async function POST(req: Request) {
  const accept = req.headers.get('accept') || '';
  const wantsSSE = accept.includes('text/event-stream');

  try {
    const body = await req.json();
    logRequest('POST', req, `body: ${JSON.stringify(body).slice(0, 200)}`);
    const response = await handleMessage(body);

    if (!response) return new Response(null, { status: 202 });

    if (wantsSSE) {
      const sseData = `event: message\ndata: ${JSON.stringify(response)}\n\n`;
      return new Response(sseData, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    return Response.json(response);
  } catch (err) {
    console.log(`[MCP] POST error: ${err}`);
    return Response.json(jsonrpcError(null, -32700, 'Parse error'), { status: 400 });
  }
}

export async function GET(req: Request) {
  logRequest('GET', req);
  return Response.json({
    name: SERVER_INFO.name,
    version: SERVER_INFO.version,
    protocol: 'MCP',
    tools: TOOLS.map((t) => t.name),
  });
}

export async function DELETE(req: Request) {
  logRequest('DELETE', req);
  return new Response('', { status: 200 });
}
