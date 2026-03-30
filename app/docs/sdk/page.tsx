import { Metadata } from 'next';
import { ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/ui/CodeBlock';
import CopyButton from '@/components/ui/CopyButton';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import { getMethodBadgeClass } from '@/lib/utils/code-generator';
import FeaturesBar from '@/components/_home/FeaturesBar';

export const metadata: Metadata = {
  title: 'Python SDK - lobstr.io API Documentation',
  description: 'Official Python SDK for the lobstr.io API. Sync and async clients, typed models, auto-pagination, and full API coverage.',
};

const FEATURES = [
  { iconSrc: '/images/zap_icon.svg', title: 'Sync & Async', description: 'Both `LobstrClient` and `AsyncLobstrClient` with identical API surfaces.' },
  { iconSrc: '/images/layer_icon.svg', title: 'Typed Models', description: 'Dataclass models for every response — no raw dicts in the public API.' },
  { iconSrc: '/images/refresh_icon.svg', title: 'Auto-Pagination', description: 'Lazy `PageIterator` streams all pages on demand with `.iter()` method.' },
  { iconSrc: '/images/lock_icon.svg', title: 'Auto Auth', description: 'Token resolved from explicit param, `LOBSTR_TOKEN` env, or `~/.config/lobstr/config.toml`.' },
];

const SDK_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: 'Sync & Async' },
  { iconSrc: '/images/layer_icon.svg', text: 'Typed Models' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Auto-Pagination' },
  { iconSrc: '/images/lock_icon.svg', text: 'Automatic Auth' },
];

function renderDescription(text: string) {
  const parts = text.split('`');
  return parts.map((part, i) =>
    i % 2 === 1
      ? <code 
      key={i} 
      className="text-[12px] leading-[1.5] px-[9px] py-[3px] rounded-[4px] border border-[#dde1ee] bg-[#f2f5f9] !text-[#0a2540] !opacity-100" 
      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      >{part}</code>
      : part
  );
}

const API_REFERENCE = [
  {
    group: 'User', methods: [
      { sdk: 'client.me()', method: 'GET', path: '/v1/me', slug: 'user-me', description: 'Get authenticated user profile' },
      { sdk: 'client.balance()', method: 'GET', path: '/v1/user/balance', slug: 'get-balance', description: 'Get current credit balance' },
    ]
  },
  {
    group: 'Crawlers', methods: [
      { sdk: 'client.crawlers.list()', method: 'GET', path: '/v1/crawlers', slug: 'list-crawlers', description: 'List all available crawlers' },
      { sdk: 'client.crawlers.get(hash)', method: 'GET', path: '/v1/crawlers/{hash}', slug: 'get-crawler-details', description: 'Get crawler details by hash' },
      { sdk: 'client.crawlers.params(hash)', method: 'GET', path: '/v1/crawlers/{hash}/params', slug: 'get-crawler-parameters', description: 'Get supported parameters for a crawler' },
      { sdk: 'client.crawlers.attributes(hash)', method: 'GET', path: '/v1/crawlers/{hash}/attributes', slug: 'get-crawler-attributes', description: 'Get output attributes for a crawler' },
    ]
  },
  {
    group: 'Squids', methods: [
      { sdk: 'client.squids.create(crawler, name)', method: 'POST', path: '/v1/squids', slug: 'create-squid', description: 'Create a new squid for a crawler' },
      { sdk: 'client.squids.list()', method: 'GET', path: '/v1/squids', slug: 'list-squids', description: 'List all squids in your account' },
      { sdk: 'client.squids.get(hash)', method: 'GET', path: '/v1/squids/{hash}', slug: 'get-squid-details', description: 'Get squid details by hash' },
      { sdk: 'client.squids.update(hash, ...)', method: 'POST', path: '/v1/squids/{hash}', slug: 'update-squid', description: 'Update squid settings or parameters' },
      { sdk: 'client.squids.empty(hash)', method: 'POST', path: '/v1/squids/{hash}/empty', slug: 'empty-squid', description: 'Remove all tasks from a squid' },
      { sdk: 'client.squids.delete(hash)', method: 'DELETE', path: '/v1/squids/{hash}', slug: 'delete-squid', description: 'Permanently delete a squid' },
    ]
  },
  {
    group: 'Tasks', methods: [
      { sdk: 'client.tasks.add(squid, tasks)', method: 'POST', path: '/v1/tasks', slug: 'add-tasks', description: 'Add one or more tasks to a squid' },
      { sdk: 'client.tasks.list(squid)', method: 'GET', path: '/v1/tasks', slug: 'list-tasks', description: 'List tasks for a squid' },
      { sdk: 'client.tasks.get(hash)', method: 'GET', path: '/v1/tasks/{hash}', slug: 'get-task', description: 'Get a single task by hash' },
      { sdk: 'client.tasks.upload(squid, file)', method: 'POST', path: '/v1/tasks/upload', slug: 'upload-tasks', description: 'Bulk upload tasks from a file' },
      { sdk: 'client.tasks.upload_status(id)', method: 'GET', path: '/v1/tasks/upload/{id}', slug: 'check-upload-status', description: 'Check status of a bulk upload' },
      { sdk: 'client.tasks.delete(hash)', method: 'DELETE', path: '/v1/tasks/{hash}', slug: 'delete-task', description: 'Delete a task by hash' },
    ]
  },
  {
    group: 'Runs', methods: [
      { sdk: 'client.runs.start(squid)', method: 'POST', path: '/v1/runs', slug: 'start-run', description: 'Start a new run for a squid' },
      { sdk: 'client.runs.list(squid)', method: 'GET', path: '/v1/runs', slug: 'list-runs', description: 'List all runs for a squid' },
      { sdk: 'client.runs.get(hash)', method: 'GET', path: '/v1/runs/{hash}', slug: 'get-run', description: 'Get run details by hash' },
      { sdk: 'client.runs.stats(hash)', method: 'GET', path: '/v1/runs/{hash}/stats', slug: 'get-run-stats', description: 'Get statistics for a run' },
      { sdk: 'client.runs.tasks(hash)', method: 'GET', path: '/v1/runtasks', slug: 'get-run-tasks', description: 'List tasks executed in a run' },
      { sdk: 'client.runs.abort(hash)', method: 'POST', path: '/v1/runs/{hash}/abort', slug: 'abort-run', description: 'Abort an in-progress run' },
      { sdk: 'client.runs.download(hash)', method: 'GET', path: '/v1/runs/{hash}/download', slug: 'download-run', description: 'Download run results as a file' },
      { sdk: 'client.runs.wait(hash)', method: 'GET', path: '/v1/runs/{hash}', slug: 'get-run', description: 'Poll until run completes' },
    ]
  },
  {
    group: 'Results', methods: [
      { sdk: 'client.results.list(run)', method: 'GET', path: '/v1/results', slug: 'get-results', description: 'Get first page of results for a run' },
      { sdk: 'client.results.iter(run)', method: 'GET', path: '/v1/results', slug: 'get-results', description: 'Lazily iterate all result pages' },
    ]
  },
  {
    group: 'Accounts', methods: [
      { sdk: 'client.accounts.list()', method: 'GET', path: '/v1/accounts', slug: 'list-accounts', description: 'List all connected accounts' },
      { sdk: 'client.accounts.get(hash)', method: 'GET', path: '/v1/accounts/{hash}', slug: 'get-account-details', description: 'Get account details by hash' },
      { sdk: 'client.accounts.types()', method: 'GET', path: '/v1/accounts/types', slug: 'list-account-types', description: 'List supported account types' },
      { sdk: 'client.accounts.sync(type, cookies)', method: 'POST', path: '/v1/synchronize', slug: 'sync-account', description: 'Sync an account using cookies' },
      { sdk: 'client.accounts.delete(hash)', method: 'DELETE', path: '/v1/accounts/{hash}', slug: 'delete-account', description: 'Delete a connected account' },
    ]
  },
  {
    group: 'Delivery', methods: [
      { sdk: 'client.delivery.email(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-email-delivery', description: 'Configure email delivery for a squid' },
      { sdk: 'client.delivery.google_sheet(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-google-sheet-delivery', description: 'Configure Google Sheets delivery' },
      { sdk: 'client.delivery.s3(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-s3-delivery', description: 'Configure Amazon S3 delivery' },
      { sdk: 'client.delivery.webhook(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-webhook-delivery', description: 'Configure webhook delivery' },
      { sdk: 'client.delivery.sftp(squid, ...)', method: 'POST', path: '/v1/delivery', slug: 'configure-sftp-delivery', description: 'Configure SFTP delivery' },
    ]
  },
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

export default function SdkPage() {
  return (
    <>
      {/* Hero */}
      <section className="">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-20">
          <div className="flex justify-center mb-3.5">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-[8px] border border-[#ff7f7f] bg-[#FEF2F2] text-[#FF0000] text-base font-semibold">
              <Image src="/images/sdk-icon.svg" alt="" width={16} height={16} />
              SDK
            </div>
          </div>
          <h1 className="text-[56px] text-center font-black leading-[1] mb-10">
            lobstrio-sdk
          </h1>
          <p className="text-lg text-[#11182799] mx-auto text-center  max-w-2xl leading-[1.78]">
            Official Python SDK for the lobstr.io API. Typed models, sync &amp; async clients, auto-pagination, and full API coverage — one dependency (httpx).
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="#quickstart" className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-[#FF0000] text-white rounded-lg font-bold text-sm hover:bg-[#E60000] transition">
              Quick start
            </a>
            <a href="https://pypi.org/project/lobstrio-sdk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4.5 py-2.5 text-[#FF0000] hover:text-white rounded-lg  text-[13px] border border-[#FF0000] hover:bg-[#FF0000] transition">
              View on PyPI <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="">
        <FeaturesBar features={SDK_BAR_FEATURES} />
      </section>

      {/* Install */}
      <section id="installation">
        <div className="max-w-4xl mx-auto px-6 md:px-0 pt-20">
          <h2 className="text-[40px] font-bold text-center leading-[1.3] mb-10">Installation</h2>

          <div className="bg-[#0a2540] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center gap-2 px-4 py-3">
              <span className="leading-[2.06] text-white text-[13px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>Terminal</span>
              <CopyButton text={INSTALL_CODE} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
            </div>
          
            <CodeBlock code={INSTALL_CODE} language="bash" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
      
          </div>

          <p className="flex items-center gap-2 text-sm mt-2.5" style={{ color: '#0a254099' }}>
            <AlertCircle className="w-4 h-4 shrink-0 text-[#0a254099]" />
            Requires Python 3.10+. Only dependency: httpx.
          </p>

          {/* <p className="text-sm mt-3">
            <a
              href="https://pypi.org/project/lobstrio-sdk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#FF0000] hover:underline"
            >
              View on PyPI
              <ExternalLink className="w-3 h-3" />
            </a>
          </p> */}
        </div>
      </section>

      {/* Features */}
      
      <section id="features" className="bg-[#f8fafc]  mt-20 border-y border-[#dde1ee]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-20">
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-2.5">Features</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-10.5">Everything you need to integrate lobstr.io into your Python applications.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="border border-[#E5E7EB] rounded-lg px-6 py-5 hover:border-[#FF0000]/30 hover:shadow-[8px_8px_13px_0_rgba(33,52,71,0.07)] transition group">
                <div className="w-[42px] h-[42px] rounded-lg bg-[#fff0f0] flex items-center justify-center mb-4.5 ">
                  <Image src={f.iconSrc} alt="" className="w-6 h-6" width={18} height={18} />
                </div>
                <h3 className="font-bold text-xl">{f.title}</h3>
                <p className="text-base mt-5 leading-[1.63] text-[#111827]/60">{renderDescription(f.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quickstart" className="-mx-12 border-b border-[#dde1ee]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-20">
          <h2 className="text-[40px] font-bold leading-[0.98] text-center mb-2.5">Quick Start</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-10.5">Full workflow: create squid, add tasks, run, get results.</p>
          <div className="bg-[#0a2540] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center gap-2 px-4 py-3"> 
              <span className="text-[13px] text-[#e1e4e8] leading-[2.06] text-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>quickstart.py</span>
              <CopyButton text={QUICK_START} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
            </div>
            <CodeBlock code={QUICK_START} language="python" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
          </div>

          <h3 className="text-[30px] font-bold leading-[1.3] mt-[62px] mb-8">Async Client</h3>
          <div className="bg-[#0a2540] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center gap-2 px-4 py-3">
              <span className="text-[13px] text-[#e1e4e8] leading-[2.06] text-white" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>async_example.py</span>
              <CopyButton text={ASYNC_EXAMPLE} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
            </div>
            <CodeBlock code={ASYNC_EXAMPLE} language="python" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-20">
          <h2 className="text-[40px] font-bold leading-[0.98] text-center mb-2.5">API Reference</h2>
          <p  className="text-[#111827b3] text-base text-center leading-[1.75] mb-10.5">Every SDK method mapped to its API endpoint.</p>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="flex items-stretch bg-[#f0f4f8] border-b border-[#E5E7EB]">
              <span className="w-[40%] px-4 py-[11.5px] flex items-center border-r border-[#E5E7EB] text-[13px] opacity-60 font-semibold uppercase tracking-wider">SDK Method</span>
              <span className="w-[7%] px-4 py-[11.5px] flex items-center justify-center border-r border-[#E5E7EB] text-[13px] opacity-60 font-semibold uppercase tracking-wider">API</span>
              <span className="w-[30%] px-4 py-[11.5px] flex items-center border-r border-[#E5E7EB] text-[13px] opacity-60 font-semibold uppercase tracking-wider">Endpoint</span>
              <span className="w-[20%] px-4 py-[11.5px] flex items-center text-[13px] opacity-60 font-semibold uppercase tracking-wider">Description</span>
            </div>
            {API_REFERENCE.map((group) => (
              <div key={group.group} className="border-t border-[#E5E7EB] first:border-t-0">
                <div className="px-4 py-2.5 bg-[#f9fafb] border-b border-[#E5E7EB] text-[13px] font-bold">{group.group}</div>
                <div className="divide-y divide-[#E5E7EB]">
                  {group.methods.map((m) => (
                    <div key={m.sdk} className="flex items-stretch transition">
                      <span className="w-[40%] px-2.5 py-[15] border-r border-[#E5E7EB] flex items-center">
                        <span className="inline-block text-[12px] text-[#0a2540] font-normal leading-[1.5] px-2 py-0.5 rounded-[4px] border border-[#dde1ee] bg-[#f2f5f9] break-all"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                        >{m.sdk}</span>
                      </span>
                      <span className="w-[7%] px-2.5 py-[15px] border-r border-[#E5E7EB] flex items-center justify-center">
                        <span
                          className={`badge-table ${getMethodBadgeClass(m.method as any)} !text-[11px] !py-0.5 !px-2 !rounded-[4px]`}
                          style={m.method === 'POST' ? {
                            borderRadius: '4px',
                            border: 'solid 0.8px #79b8ff',
                            backgroundColor: 'rgba(121, 184, 255, 0.14)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: '#79b8ff',
                          } : undefined}
                        >{m.method === 'DELETE' ? 'DEL' : m.method}</span>
                      </span>
                      <Link href={`/docs/${m.slug}`} className="w-[30%] px-2.5 py-[15px] border-r border-[#E5E7EB] flex items-center font-mono text-[14px] leading-[1.5] text-[#FF0000] hover:underline break-all">
                        {m.path}
                      </Link>
                      <span className="w-[20%] text-[#111827] px-2.5 py-[15px] flex items-center text-[14px] leading-[1.5] text-[#6B7280] break-words">{m.description}</span>
                    </div>
                  ))}
                </div>
              </div> 
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/docs/authentication" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0000] hover:underline">
              View full API documentation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
