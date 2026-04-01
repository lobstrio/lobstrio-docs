import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import McpSetupTabs from './McpSetupTabs';
import HeroButton from '@/components/ui/HeroButton';
import { codeToHtml } from 'shiki';
import FeaturesBar from '@/components/_home/FeaturesBar';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.lobstr.io';
const MCP_URL = `${BASE_URL}/api/mcp`;

export const metadata: Metadata = {
  title: 'MCP Server - lobstr.io API Documentation',
  description: 'Connect AI assistants to lobstr.io API documentation using the Model Context Protocol (MCP). Search docs, get code examples, and explore scrapers programmatically.',
};

const TOOLS = [
  { name: 'list_docs', description: 'Browse all core API documentation pages with category filtering and pagination.', tag: 'Navigation' },
  { name: 'list_examples', description: 'View all 31 scrapers with example documentation and their available endpoints.', tag: 'Examples' },
  { name: 'get_doc', description: 'Get full endpoint documentation including request body, response fields, and code examples.', tag: 'Reference' },
  { name: 'search_docs', description: 'Keyword search across all documentation — titles, descriptions, and endpoint paths.', tag: 'Search' },
  { name: 'get_code_example', description: 'Get cURL, Python, or API response examples for any endpoint.', tag: 'Code' },
  { name: 'get_navigation', description: 'Get the full sidebar navigation structure showing how docs are organized.', tag: 'Structure' },
];

const SDK_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: '6 Tools' },
  { iconSrc: '/images/layer_icon.svg', text: '31 Scrapers' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Auth None' },
  { iconSrc: '/images/lock_icon.svg', text: 'HTTP transport' },
];


function getPlatforms() {
  return [
    {
      name: 'Claude Code',
      config: `claude mcp add lobstrio-docs \\\n  --transport http \\\n  ${MCP_URL}`,
      lang: 'bash',
    },
    {
      name: 'Claude Desktop',
      config: JSON.stringify({ mcpServers: { 'lobstrio-docs': { type: 'http', url: MCP_URL } } }, null, 2),
      lang: 'json',
    },
    {
      name: 'Cursor',
      config: JSON.stringify({ mcpServers: { 'lobstrio-docs': { type: 'http', url: MCP_URL } } }, null, 2),
      lang: 'json',
      file: '.cursor/mcp.json',
    },
    {
      name: 'Any MCP Client',
      config: `curl -X POST ${MCP_URL} \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "search_docs",
      "arguments": { "query": "squid", "limit": 2 }
    },
    "id": 1
  }'

# Response:
# {
#   "jsonrpc": "2.0",
#   "id": 1,
#   "result": {
#     "content": [{
#       "type": "text",
#       "text": "Found 2 result(s) for \\"squid\\":\\n\\n1. Create Squid (POST /v1/squids)..."
#     }]
#   }
# }`,
      lang: 'bash',
    },
  ];
}

const EXAMPLE_PROMPTS = [
  'How do I create a squid and start scraping Google Maps?',
  'Show me the Python code for adding tasks to a scraper',
  'What parameters does the LinkedIn Profile Scraper accept?',
  'List all delivery configuration options (email, S3, webhook)',
  'How do I handle rate limiting in the lobstr.io API?',
];

async function highlight(code: string, lang: string, dark = false) {
  // Shiki codeToHtml produces trusted output from known code strings at build time (no user input)
  return await codeToHtml(code, { lang, theme: dark ? 'github-dark' : 'github-light' });
}


export default async function McpPage() {
  const platforms = getPlatforms();
  const platformsWithHtml = await Promise.all(
    platforms.map(async (p) => ({
      ...p,
      html: await highlight(p.config, p.lang, true),
    }))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-[80px] text-center">
          <div className="inline-flex items-center px-2 py-1 rounded-lg border border-[#FF7F7F] bg-[#FFF2F2] text-[#FF0000] text-sm mb-3.5">
            Model Context Protocol
          </div>
          <h1 className="text-[64px] font-[900] text-[#0A2540] leading-[1.22] tracking-normal text-center mb-10">
            Give your AI access <br /> to <span className="text-[#FF0000]">lobstr.io</span> in seconds
          </h1>
          <p className="text-[18px] font-normal text-[#0A2540]/70 max-w-2xl mx-auto leading-[1.78] tracking-normal text-center mb-10">
            Let your AI assistant search documentation, retrieve code examples, and explore scraper configurations — all through the MCP protocol. No API key required.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <HeroButton label="Get started" href="#tools"  />

            <a href="#tools" className="inline-flex items-center gap-2 px-5 py-2.5 text-[#FF0000] hover:text-white rounded-lg font-semibold text-[18px] border border-[#FF0000] hover:bg-[#FF0000] transition">
              View tools
            </a>
          </div>
        </div>
      </section>

        <section>
              <FeaturesBar features={SDK_BAR_FEATURES} />
        </section>

      {/* Tools */}
      <section id="tools" className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase">Available Tools</p>
          <h2 className="text-[40px] font-[900] text-[#0A2540] mb-2 text-center leading-[0.98] tracking-normal">Everything your AI needs</h2>
          <p className="text-[16px] font-normal text-[#0A2540]/70 mb-10 text-center leading-[1.75]">6 tools for searching, browsing, and retrieving API documentation.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="border border-[#dee0ea] rounded-lg p-[25px] hover:border-[#FF0000]/30 hover:[box-shadow:8px_8px_13px_0_rgba(33,52,71,0.07)] transition group">
             
                  <span className="inline-block px-[9px] text-xs font-semibold rounded-[8px] bg-[#fff0f0] text-[12px] font-semibold leading-[2.17] text-[#FF0000] mb-[19px] uppercase">
                    {tool.tag}
                  </span>
                  <h3 className="text-[18px] font-semibold text-[#0A2540] mb-2">{tool.name}</h3>
          
                <p className="text-[16px] font-normal text-[#0A2540]/70 leading-[1.63]">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase">How it works</p>
          <h2 className="text-[40px] font-[900] text-[#0A2540] mb-16 text-center leading-[0.98] tracking-normal">Up and running in 30 seconds</h2>

          <div className="grid md:grid-cols-2 gap-16 items-stretch">
            {/* Steps */}
            <div className="space-y-0">
              {[
                {
                  n: 1,
                  title: 'Add the MCP server',
                  desc: 'One command in Claude Code, or add a JSON snippet to your Claude Desktop or Cursor config.',
                },
                {
                  n: 2,
                  title: 'Ask anything',
                  desc: 'Your AI now has full access to all lobstr.io docs — just ask in plain language.',
                },
                {
                  n: 3,
                  title: 'Get instant answers',
                  desc: 'Code examples, endpoint specs, scraper configs — retrieved in real time, no hallucinations.',
                },
              ].map((step, i, arr) => (
                <div key={step.n} className="py-7 border-b border-[#dee0ea]">
                  <div className='flex gap-2.5'>
                  <span className="flex-shrink-0 w-7.5 h-7.5 rounded-lg bg-[#fff0f0] text-[#FF0000] text-[13px] font-bold flex items-center justify-center">{step.n}</span>
                    <h3 className="text-[18px] font-bold text-[#111827] leading-[1.56] mb-1">{step.title}</h3>
                  </div>
                    <p className="ml-10 text-[#111827b3] leading-[1.75]">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Terminal preview */}
            <div className="rounded-lg overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="bg-[#0a2540] px-5 py-3 h-10" />
              {/* Body */}
              <div className="bg-[#0a1b2b] px-6 py-4 text-[13px] font-mono flex-1 flex flex-col gap-5 justify-center">
                <div className="space-y-5">
                  <p className="text-[#6b7882]"># Ask your AI assistant</p>
                  <p className="text-[#919aa1] text-[15px] leading-[1.6]">&quot;Show me Python code to use an existing LinkedIn scraper and add tasks.&quot;</p>
                </div>
                <hr className="border-[#42545f]" />
                <div className="space-y-3">
                  <p className="text-[#00ce95]">✓ <span>get_doc</span> <span className="text-[#50606c]">POST /v1/squids</span></p>
                  <p className="text-[#00ce95]">✓ <span>get_code_example</span> <span className="text-[#50606c]">python</span></p>
                  <p className="text-[#00ce95]">✓ <span>get_doc</span> <span className="text-[#50606c]">POST /v1/tasks</span></p>
                </div>
                <hr className="border-[#42545f]" />
                <div className="space-y-3">
                  <p><span className="text-[#418fc5]">import</span> <span className="text-[#50606c]">requests</span></p>
                  <p><span className="text-[#50606c]">url</span> <span className="text-white/40">= </span><span className="text-[#418fc5]">&quot;https://api.lobstr.io/v1/squids&quot;</span></p>
                  <p><span className="text-[#50606c]">headers</span> <span className="text-white/40">= </span><span className="text-white/40">{'{'}</span><span className="text-[#418fc5]">&quot;Authorization&quot;: &quot;Token ...&quot;</span><span className="text-white/40">{'}'}</span></p>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>
      {/* Setup */}
      <section id="setup" className="border-b bg-[#f8fafc] border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase">Setup</p>
          <h2 className="text-[40px] font-[900] text-[#0A2540] mb-2 text-center leading-[0.98] tracking-normal">Connect in one step</h2>
          <p className="text-[16px] font-normal text-[#0A2540]/70 mb-10 text-center leading-[1.75]">No API key. No OAuth. Just one command or config snippet.</p>
          <McpSetupTabs platforms={platformsWithHtml} mcpUrl={MCP_URL} />
        </div>
      </section>

      {/* Example Prompts */}
      <section id="examples" className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase">Example Prompts</p>
          <h2 className="text-[40px] font-[900] text-[#0A2540] mb-2 text-center leading-[0.98] tracking-normal">What will you ask?</h2>
          <p className="text-[16px] font-normal text-[#0A2540]/70 mb-10 text-center leading-[1.75]">Once connected, try asking your AI assistant:</p>
          <div className="space-y-4">
            {EXAMPLE_PROMPTS.map((prompt, i) => (
              <div key={i} className="flex items-center gap-3 border border-[#dee0ea] rounded-lg px-6 py-4 hover:border-[#FF0000] hover:[box-shadow:8px_8px_13px_0_rgba(33,52,71,0.07)] transition">
                <img src="/images/arrow-red-icon.svg" alt="" className="w-2 h-2 shrink-0" />
                <span className="text-[16px] font-semibold   leading-[1.63]">{prompt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-2 leading-[2] tracking-[1px] uppercase">Reference</p>
          <h2 className="text-[40px] font-[900] text-[#0A2540] mb-2 text-center leading-[0.98] tracking-normal">API Reference</h2>
          <p className="text-[16px] font-normal text-[#0A2540]/70 mb-10 text-center leading-[1.75]">The MCP server uses JSON-RPC 2.0 over HTTP POST.</p>

          <div className="border border-[#dee0ea] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f2f5f9] border-b border-[#dde1ee]">
                  <th className="text-left px-5 py-3 text-[16px] font-semibold text-[#0A2540]/60">Method</th>
                  <th className="text-left px-5 py-3 text-[16px] font-semibold text-[#0A2540]/60">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dee0ea]">
                <tr>
                  <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#FF0000]/25 bg-[#FF0000]/[0.04] font-mono text-[12px] leading-none text-[#FF0000]">initialize</span></td>
                  <td className="px-5 py-3 text-[16px] font-light text-[#0a2540]">Handshake — returns server info and capabilities</td>
                </tr>
                <tr>
                  <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#FF0000]/25 bg-[#FF0000]/[0.04] font-mono text-[12px] leading-none text-[#FF0000]">tools/list</span></td>
                  <td className="px-5 py-3 text-[16px] font-light text-[#0a2540]">List all available tools with input schemas</td>
                </tr>
                <tr>
                  <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#FF0000]/25 bg-[#FF0000]/[0.04] font-mono text-[12px] leading-none text-[#FF0000]">tools/call</span></td>
                  <td className="px-5 py-3 text-[16px] font-light text-[#0a2540]">Execute a tool with arguments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-15 rounded-xl bg-[#0A2540] px-7.5 py-10 text-center">
            <h3 className="text-[24px] font-bold text-white mb-4">Explore the full API documentation</h3>
            <p className="text-[#ffffffb3] mb-7.5 mx-auto">Full API specs, request schemas, and code examples — everything your AI needs to build with lobstr.io.</p>
            <Link href="/docs/authentication" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-bold rounded-lg transition">
              Open API docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
