import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Package, Zap, RefreshCw, Lock, Layers, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CodeBlock from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Python SDK - lobstr.io API Documentation',
  description: 'Official Python SDK for the lobstr.io API. Sync and async clients, typed models, auto-pagination, and full API coverage.',
};

const FEATURES = [
  { icon: Zap, title: 'Sync & Async', description: 'Both LobstrClient and AsyncLobstrClient with identical API surfaces.' },
  { icon: Layers, title: 'Typed Models', description: 'Dataclass models for every response — no raw dicts in the public API.' },
  { icon: RefreshCw, title: 'Auto-Pagination', description: 'Lazy PageIterator streams all pages on demand with .iter() method.' },
  { icon: Lock, title: 'Auto Auth', description: 'Token resolved from explicit param, LOBSTR_TOKEN env, or ~/.config/lobstr/config.toml.' },
];

const API_REFERENCE = [
  { group: 'User', methods: [
    { sdk: 'client.me()', endpoint: 'GET /v1/me', slug: 'user-me' },
    { sdk: 'client.balance()', endpoint: 'GET /v1/user/balance', slug: 'get-balance' },
  ]},
  { group: 'Crawlers', methods: [
    { sdk: 'client.crawlers.list()', endpoint: 'GET /v1/crawlers', slug: 'list-crawlers' },
    { sdk: 'client.crawlers.get(hash)', endpoint: 'GET /v1/crawlers/{hash}', slug: 'get-crawler-details' },
    { sdk: 'client.crawlers.params(hash)', endpoint: 'GET /v1/crawlers/{hash}/params', slug: 'get-crawler-parameters' },
    { sdk: 'client.crawlers.attributes(hash)', endpoint: 'GET /v1/crawlers/{hash}/attributes', slug: 'get-crawler-attributes' },
  ]},
  { group: 'Squids', methods: [
    { sdk: 'client.squids.create(crawler, name)', endpoint: 'POST /v1/squids', slug: 'create-squid' },
    { sdk: 'client.squids.list()', endpoint: 'GET /v1/squids', slug: 'list-squids' },
    { sdk: 'client.squids.get(hash)', endpoint: 'GET /v1/squids/{hash}', slug: 'get-squid-details' },
    { sdk: 'client.squids.update(hash, ...)', endpoint: 'POST /v1/squids/{hash}', slug: 'update-squid' },
    { sdk: 'client.squids.empty(hash)', endpoint: 'POST /v1/squids/{hash}/empty', slug: 'empty-squid' },
    { sdk: 'client.squids.delete(hash)', endpoint: 'DELETE /v1/squids/{hash}', slug: 'delete-squid' },
  ]},
  { group: 'Tasks', methods: [
    { sdk: 'client.tasks.add(squid, tasks)', endpoint: 'POST /v1/tasks', slug: 'add-tasks' },
    { sdk: 'client.tasks.list(squid)', endpoint: 'GET /v1/tasks', slug: 'list-tasks' },
    { sdk: 'client.tasks.get(hash)', endpoint: 'GET /v1/tasks/{hash}', slug: 'get-task' },
    { sdk: 'client.tasks.upload(squid, file)', endpoint: 'POST /v1/tasks/upload', slug: 'upload-tasks' },
    { sdk: 'client.tasks.upload_status(id)', endpoint: 'GET /v1/tasks/upload/{id}', slug: 'check-upload-status' },
    { sdk: 'client.tasks.delete(hash)', endpoint: 'DELETE /v1/tasks/{hash}', slug: 'delete-task' },
  ]},
  { group: 'Runs', methods: [
    { sdk: 'client.runs.start(squid)', endpoint: 'POST /v1/runs', slug: 'start-run' },
    { sdk: 'client.runs.list(squid)', endpoint: 'GET /v1/runs', slug: 'list-runs' },
    { sdk: 'client.runs.get(hash)', endpoint: 'GET /v1/runs/{hash}', slug: 'get-run' },
    { sdk: 'client.runs.stats(hash)', endpoint: 'GET /v1/runs/{hash}/stats', slug: 'get-run-stats' },
    { sdk: 'client.runs.tasks(hash)', endpoint: 'GET /v1/runtasks', slug: 'get-run-tasks' },
    { sdk: 'client.runs.abort(hash)', endpoint: 'POST /v1/runs/{hash}/abort', slug: 'abort-run' },
    { sdk: 'client.runs.download(hash)', endpoint: 'GET /v1/runs/{hash}/download', slug: 'download-run' },
    { sdk: 'client.runs.wait(hash)', endpoint: 'Polls GET /v1/runs/{hash}', slug: 'get-run' },
  ]},
  { group: 'Results', methods: [
    { sdk: 'client.results.list(run)', endpoint: 'GET /v1/results', slug: 'get-results' },
    { sdk: 'client.results.iter(run)', endpoint: 'GET /v1/results (paginated)', slug: 'get-results' },
  ]},
  { group: 'Accounts', methods: [
    { sdk: 'client.accounts.list()', endpoint: 'GET /v1/accounts', slug: 'list-accounts' },
    { sdk: 'client.accounts.get(hash)', endpoint: 'GET /v1/accounts/{hash}', slug: 'get-account-details' },
    { sdk: 'client.accounts.types()', endpoint: 'GET /v1/accounts/types', slug: 'list-account-types' },
    { sdk: 'client.accounts.sync(type, cookies)', endpoint: 'POST /v1/synchronize', slug: 'sync-account' },
    { sdk: 'client.accounts.delete(hash)', endpoint: 'DELETE /v1/accounts/{hash}', slug: 'delete-account' },
  ]},
  { group: 'Delivery', methods: [
    { sdk: 'client.delivery.email(squid, ...)', endpoint: 'POST /v1/delivery', slug: 'configure-email-delivery' },
    { sdk: 'client.delivery.google_sheet(squid, ...)', endpoint: 'POST /v1/delivery', slug: 'configure-google-sheet-delivery' },
    { sdk: 'client.delivery.s3(squid, ...)', endpoint: 'POST /v1/delivery', slug: 'configure-s3-delivery' },
    { sdk: 'client.delivery.webhook(squid, ...)', endpoint: 'POST /v1/delivery', slug: 'configure-webhook-delivery' },
    { sdk: 'client.delivery.sftp(squid, ...)', endpoint: 'POST /v1/delivery', slug: 'configure-sftp-delivery' },
  ]},
];

const INSTALL_CODE = 'pip install lobstrio-sdk';

const QUICK_START = `from lobstrio import LobstrClient

client = LobstrClient()  # auto-resolves token

# Get account info
user = client.me()
print(f"{user.email} — {client.balance().credits} credits")

# Create a squid and scrape
squid = client.squids.create(
    crawler="google-maps-leads-scraper",
    name="Restaurants Paris"
)
client.squids.update(squid.id, params={"country": "France", "max_results": 50})
client.tasks.add(squid=squid.id, tasks=[
    {"url": "https://google.com/maps/search/restaurants+paris"}
])

# Start and wait for completion
run = client.runs.start(squid=squid.id)
run = client.runs.wait(run.id)

# Get results
for page in client.results.iter(run=run.id):
    for place in page.data:
        print(f"{place['name']} — {place['score']}★")`;

const ASYNC_EXAMPLE = `import asyncio
from lobstrio import AsyncLobstrClient

async def main():
    async with AsyncLobstrClient() as client:
        squids = await client.squids.list()
        for squid in squids.data:
            print(f"{squid.name} ({squid.id})")

asyncio.run(main())`;

export default async function SdkPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF2F2] text-[#FF0000] text-sm font-semibold mb-6">
            <Package className="w-4 h-4" />
            Python SDK
          </div>
          <h1 className="text-[42px] font-bold text-[#0A2540] leading-tight mb-5">
            lobstrio-sdk
          </h1>
          <p className="text-lg text-[#0A2540]/70 max-w-2xl mx-auto leading-relaxed">
            Official Python SDK for the lobstr.io API. Typed models, sync &amp; async clients, auto-pagination, and full API coverage — one dependency (httpx).
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#quickstart" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0000] text-white rounded-lg font-semibold text-sm hover:bg-[#E60000] transition">
              Quick Start <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://pypi.org/project/lobstrio-sdk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-[#FF0000] hover:text-white rounded-lg font-semibold text-sm border border-[#FF0000] hover:bg-[#FF0000] transition">
              PyPI <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-6">Installation</h2>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">Terminal</div>
            <CodeBlock code={INSTALL_CODE} language="bash" theme="light" showCopy showLabel={false} />
          </div>
          <p className="text-sm text-[#0A2540]/50 mt-3">Requires Python 3.10+. Only dependency: httpx.</p>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-2">Features</h2>
          <p className="text-[#0A2540]/60 mb-10">Everything you need to integrate lobstr.io into your Python applications.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="border border-[#E5E7EB] rounded-lg p-5 hover:border-[#FF0000]/30 transition group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0 group-hover:bg-[#FF0000]/10 transition">
                    <f.icon className="w-4.5 h-4.5 text-[#FF0000]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[#0A2540]">{f.title}</h3>
                    <p className="text-sm text-[#0A2540]/60 mt-1 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-2">Quick Start</h2>
          <p className="text-[#0A2540]/60 mb-6">Full workflow: create squid, add tasks, run, get results.</p>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">Python</div>
            <CodeBlock code={QUICK_START} language="python" theme="light" showCopy showLabel={false} />
          </div>

          <h3 className="text-lg font-bold text-[#0A2540] mt-10 mb-4">Async Client</h3>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">Python (async)</div>
            <CodeBlock code={ASYNC_EXAMPLE} language="python" theme="light" showCopy showLabel={false} />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-2">API Reference</h2>
          <p className="text-[#0A2540]/60 mb-10">Every SDK method mapped to its API endpoint.</p>
          <div className="space-y-6">
            {API_REFERENCE.map((group) => (
              <div key={group.group} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">{group.group}</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-[#0A2540]/50 uppercase tracking-wider">SDK Method</th>
                      <th className="text-left px-5 py-2.5 text-xs font-semibold text-[#0A2540]/50 uppercase tracking-wider">API Endpoint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {group.methods.map((m) => (
                      <tr key={m.sdk} className="hover:bg-[#F9FAFB] transition">
                        <td className="px-5 py-2.5 font-mono text-[13px] text-[#0A2540]">{m.sdk}</td>
                        <td className="px-5 py-2.5">
                          <Link href={`/${m.slug}`} className="font-mono text-[13px] text-[#FF0000] hover:underline">
                            {m.endpoint}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/authentication" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0000] hover:underline">
              View full API documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
