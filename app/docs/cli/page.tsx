import { Metadata } from 'next';
import Link from 'next/link';
import { codeToHtml } from 'shiki';
import CodeBlock from '@/components/ui/CodeBlock';
import CopyButton from '@/components/ui/CopyButton';
import FeaturesBar from '@/components/_home/FeaturesBar';
import HeroButton from '@/components/ui/HeroButton';
import QuickStartTabs from '@/components/ui/QuickStartTabs';

export const metadata: Metadata = {
  title: 'CLI - lobstr.io API Documentation',
  description: 'Command-line interface for the lobstr.io API. Run scrapers, manage squids, download results — all from your terminal.',
};

const FEATURES = [
  { tag: 'One Command', title: 'lobstr go', description: 'The go command combines create, configure, add tasks, run, and download into a single execution. One line from idea to CSV.' },
  { tag: 'Browse', title: '50+ Crawlers', description: 'Search and explore every crawler by slug — Google Maps, LinkedIn, Twitter/X, Instagram, and more. Inspect params and attributes before running.' },
  { tag: 'Export', title: 'CSV & JSON', description: 'Download results as CSV or JSON with a single command. A live progress bar keeps you informed while runs complete in the background.' },
  { tag: 'Delivery', title: 'Webhooks & Cloud', description: 'Configure automated delivery to email, Google Sheets, S3, SFTP, or a webhook endpoint — all from the terminal, no dashboard required.' },
];

const CLI_BAR_FEATURES = [
  { iconSrc: '/images/zap_icon.svg', text: '5 Command Groups' },
  { iconSrc: '/images/layer_icon.svg', text: '50+ Crawlers' },
  { iconSrc: '/images/refresh_icon.svg', text: 'Python 3.10+' },
  { iconSrc: '/images/lock_icon.svg', text: 'CSV & JSON Export' },
];

const COMMANDS = [
  {
    group: 'Crawlers', cmds: [
      { cmd: 'crawlers ls', description: 'List all available crawlers' },
      { cmd: 'crawlers search <query>', description: 'Search crawlers by keyword' },
      { cmd: 'crawlers show <slug>', description: 'Get crawler details by slug' },
      { cmd: 'crawlers params <slug>', description: 'Get supported parameters for a crawler' },
      { cmd: 'crawlers attrs <slug>', description: 'Get output attributes for a crawler' },
    ]
  },
  {
    group: 'Squids', cmds: [
      { cmd: 'squid create <crawler> --name "My Scraper"', description: 'Create a new squid for a crawler' },
      { cmd: 'squid ls', description: 'List all squids in your account' },
      { cmd: 'squid show <id>', description: 'Get squid details by ID' },
      { cmd: 'squid update <id> --param key=value', description: 'Update squid settings or parameters' },
      { cmd: 'squid empty <id>', description: 'Remove all tasks from a squid' },
      { cmd: 'squid rm <id>', description: 'Permanently delete a squid' },
    ]
  },
  {
    group: 'Tasks', cmds: [
      { cmd: 'task add <squid> <url1> <url2> ...', description: 'Add one or more task URLs to a squid' },
      { cmd: 'task upload <squid> <file.csv>', description: 'Bulk upload tasks from a CSV file' },
      { cmd: 'task ls <squid>', description: 'List tasks for a squid' },
      { cmd: 'task rm <id>', description: 'Delete a task by ID' },
    ]
  },
  {
    group: 'Runs', cmds: [
      { cmd: 'run start <squid> --wait', description: 'Start a new run and optionally wait for completion' },
      { cmd: 'run ls <squid>', description: 'List all runs for a squid' },
      { cmd: 'run show <id>', description: 'Get run details by ID' },
      { cmd: 'run stats <id>', description: 'Get statistics for a run' },
      { cmd: 'run abort <id>', description: 'Abort an in-progress run' },
      { cmd: 'run download <id> -o results.csv', description: 'Download run results to a file' },
    ]
  },
  {
    group: 'Results', cmds: [
      { cmd: 'results get <squid> --format csv -o data.csv', description: 'Get results for a squid and export to file' },
    ]
  },
  {
    group: 'Delivery', cmds: [
      { cmd: 'delivery email <squid> --email user@example.com', description: 'Configure email delivery for a squid' },
      { cmd: 'delivery webhook <squid> --url https://...', description: 'Configure webhook delivery for a squid' },
      { cmd: 'delivery s3 <squid> --bucket my-bucket', description: 'Configure Amazon S3 delivery for a squid' },
    ]
  },
];

const INSTALL_CODE = 'pip install lobstrio';

const GO_EXAMPLES = `# Scrape Google Maps in one command
lobstr go google-maps-leads-scraper \\
  "https://google.com/maps/search/restaurants+paris" \\
  -o leads.csv

# Keyword-based search
lobstr go google-search-scraper "pizza delivery" --key keyword

# With parameters and concurrency
lobstr go google-maps-leads-scraper url1 url2 \\
  --param max_results=200 --concurrency 3

# Don't download, just kick off
lobstr go twitter-profile-scraper @elonmusk --no-download`;

const WORKFLOW_EXAMPLE = `# Step by step
lobstr crawlers search "google maps"
lobstr squid create google-maps-leads-scraper --name "Paris Restaurants"
lobstr task add SQUID_ID "https://google.com/maps/search/restaurants+paris"
lobstr run start SQUID_ID --wait
lobstr results get SQUID_ID --format csv -o results.csv

# Check who you are
lobstr whoami`;


export default async function CliPage() {
  const [goHtml, workflowHtml] = await Promise.all([
    codeToHtml(GO_EXAMPLES, { lang: 'bash', theme: 'github-dark' }).then(html =>
      html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, '$1#0a1b2b$2')
    ),
    codeToHtml(WORKFLOW_EXAMPLE, { lang: 'bash', theme: 'github-dark' }).then(html =>
      html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, '$1#0a1b2b$2')
    ),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px] text-center">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg border border-[#FF7F7F] bg-[#FEF2F2] text-[#FF0000] text-sm  mb-6">
            Model Context Protocol
          </div>
          <h1 className="text-[40px] md:text-[64px] font-[900] text-[#0A2540] leading-[0.77] tracking-normal text-center mb-10">
            lobstr <span className="text-[#ff0000]">CLI</span>
          </h1>
          <p className="text-[18px] font-normal text-[#0A2540]/70 max-w-2xl mx-auto leading-[1.78] tracking-normal text-center">
            Install the lobstr CLI, browse 50+ crawlers, and start scraping Google Maps, LinkedIn, or any platform — without ever touching the UI
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <HeroButton label="Quick start" href="#quickstart" />
            <a href="https://pypi.org/project/lobstrio/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-[50px] px-[26px] rounded-lg font-semibold text-[18px] text-[#FF0000] border border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition whitespace-nowrap">View on PyPI</a>
          </div>
        </div>
      </section>

      

      {/* Features Bar */}
      <section>
        <FeaturesBar features={CLI_BAR_FEATURES} />
      </section>

        {/* Features */}
      <section id="features" className="border-b border-[#dde1ee]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[0.79] tracking-[1px] uppercase">Features</p>
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-4">Full control from your terminal</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-[64px]">Everything you need to scrape at scale — no UI, no browser, no problem</p>
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="border bg-[#fff] border-[#E5E7EB] rounded-lg p-[25px] hover:border-[#FF0000]/30 hover:shadow-[8px_8px_13px_0_rgba(33,52,71,0.07)] transition group">
                <span className="inline-block px-[9px] text-[12px] font-semibold rounded-[8px] bg-[#fff0f0] leading-[2.17] text-[#FF0000] mb-[18px] uppercase">{f.tag}</span>
                <h3 className="font-semibold text-[18px]">{f.title}</h3>
                <p className="text-base mt-2 leading-[1.63] text-[#111827]/60">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[0.79] tracking-[1px] uppercase">How it works</p>
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-9">Up and running in 30 seconds</h2>

          <div className="flex flex-col md:flex-row gap-10 md:items-center">
            {/* Steps */}
            <div className="w-full md:flex-shrink-0 md:w-[366px] space-y-0">
              {[
                {
                  n: 1,
                  title: 'Install the CLI',
                  desc: 'One pip command and you\'re ready. Requires Python 3.10+. Installs the lobstr command globally.',
                },
                {
                  n: 2,
                  title: 'Find your crawler',
                  desc: 'Search 50+ available crawlers by name. Inspect input parameters and output attributes before running.',
                },
                {
                  n: 3,
                  title: 'Run and download',
                  desc: 'Fire lobstr go with your URL or keyword. Get a CSV with a live progress bar — real data, no hallucinations.',
                },
              ].map((step) => (
                <div key={step.n} className="py-7.5 border-b border-[#dee0ea]">
                  <div className="flex gap-2.5 mb-2">
                    <span className="flex-shrink-0 w-7.5 h-7.5 rounded-lg bg-[#fff0f0] text-[#FF0000] text-[13px] font-bold flex items-center justify-center">{step.n}</span>
                    <h3 className="text-[18px] font-bold text-[#111827] leading-[1.56]">{step.title}</h3>
                  </div>
                  <p className="ml-10 text-[#111827b3] leading-[1.75]">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Terminal preview */}
            <div className="w-full md:flex-1 md:w-[367px] rounded-lg overflow-hidden flex flex-col">
              {/* Header */}
               <div className="bg-[#0a2540] px-5 py-3 h-10 flex items-center gap-1.5">
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
                <span className="rounded-full" style={{ width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' }} />
              </div>
              {/* Body */}
              <div className="bg-[#0a1b2b] px-6 py-5 text-[14px] font-normal font-mono leading-[2.43] flex-1 flex flex-col gap-0 items-start justify-center">
                <div className="space-y-1.5">
                  <p className="text-[#ffffffb3] whitespace-pre-wrap"><span className="text-[#ffffffb3]"># Install</span> <span className="text-white">pip install lobstrio</span> <span className="text-[#ffffffb3]"> # Find a crawler</span> <span className="text-white">lobstr</span></p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white whitespace-pre-wrap">crawlers search <span className="text-[#79b8ff]">&quot;google maps&quot;</span> <span className="text-[#ffffffb3]"> # One-command</span></p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-white whitespace-pre-wrap"><span className="text-[#ffffffb3]"># scrape</span> lobstr go google-maps-leads-scraper \
                     <span className="text-[#79b8ff] pl-2 whitespace-pre-wrap break-all">&quot;https://google.com/maps/search/restaurants+paris&quot;</span> \ -o
                  </p>
                </div>
                <p className="text-[#ffffffb3] whitespace-pre-wrap">leads.csv ────────────────────────────────────────</p>
                <div className="space-y-2">
                  <p className="text-[#4adb98]">──────── ✓ squid created ✓ 200 tasks added ✓ run</p>
                  <p className="text-white whitespace-pre-wrap leading-[1em]"><span className="text-[#4adb98]">started </span><span style={{ fontSize: 8, verticalAlign: 'middle' }}>████████████████░░░░░░░░</span> 67% ✓ download</p>
                </div>
                <p className="text-[#ffffffb3] whitespace-pre-wrap">complete ─────────────────────────────────────────</p>
                <p className="whitespace-pre-wrap text-[#ffffffb3]">──────── <span className="text-[#79b8ff]">Saved</span> <span className="text-white">leads.csv (1 204 rows)</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="installation" className="border-b bg-[#f8fafc] border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[0.79] tracking-[1px] uppercase">Setup</p>
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-4">Connect in one step</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-[64px]">Requires Python 3.10+. No API key needed to browse crawlers. Add your token to run scraping jobs.</p>

          <div className="bg-[#0a2540] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center gap-2 px-4 py-3">
              <span className="leading-[2.06] text-white text-[13px]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>{'>'}_  terminal</span>
              <CopyButton text={INSTALL_CODE} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
            </div>
            <CodeBlock code={INSTALL_CODE} language="bash" theme="dark" showLabel={false} codeBg="#0a1b2b" className='[&>pre]:!p-5 [&>pre]:!m-0' />
          </div>

          <div className="flex items-center justify-between mt-4 overflow-x-auto gap-4 pb-1">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[#0a254099]">PyPI</span>
              <a href="https://pypi.org/project/lobstrio/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 hover:border-[#FF0000]/40 transition bg-white whitespace-nowrap">pypi.org/project/lobstrio</a>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {['Python 3.10+', 'No key to browse', 'Cross-platform'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0A2540] border border-[#dde1ee] rounded-md px-3.5 py-2 bg-white whitespace-nowrap">
                  <img src="/images/check-red-icon.svg" alt="" className="w-3 h-3 shrink-0" /> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    

      {/* Quick Start */}
      <section id="quickstart" className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
          <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[0.79] tracking-[1px] uppercase">Quick Start</p>
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-4">What will you scrape?</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-[64px]">Full workflow: create squid, add tasks, run, get results</p>
          <QuickStartTabs goHtml={goHtml} workflowHtml={workflowHtml} goCode={GO_EXAMPLES} workflowCode={WORKFLOW_EXAMPLE} />
        </div>
      </section>

      {/* Commands */}
      <section className="border-b border-[#dee0ea]">
        <div className="max-w-4xl mx-auto px-6 md:px-0 py-10 md:py-[80px]">
        <p className="text-[14px] font-semibold text-[#FF0000] text-center mb-4 leading-[0.79] tracking-[1px] uppercase">Reference</p>
          <h2 className="text-[40px] font-bold text-center leading-[0.98] mb-4">Command Reference</h2>
          <p className="text-[#111827b3] text-base text-center leading-[1.75] mb-[64px]">All available commands grouped by resource.</p>
          <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
            <div className="flex items-stretch bg-[#f0f4f8] border-b border-[#E5E7EB]">
              <span className="w-[48%] px-4 py-[11.5px] flex items-center text-[#11182799] font-semibold leading-[1.31]">Command</span>
              <span className="w-[35%] px-4 py-[11.5px] flex items-center leading-[1.31] text-[#11182799] font-semibold">Description</span>
            </div>
            {COMMANDS.map((g) => (
              <div key={g.group} className="border-t border-[#E5E7EB] first:border-t-0">
                <div className="px-4 py-2.5 bg-[#f9fafb] border-b border-[#E5E7EB] text-[13px] font-bold tracking-[0.65px]">{g.group}</div>
                <div className="divide-y divide-[#E5E7EB]">
                  {g.cmds.map((item) => (
                    <div key={item.cmd} className="flex items-stretch">
                      <span className="w-[48%] px-2.5 py-[15px] flex items-center">
                        <span
                          className="inline-block text-[12px] text-[#0a2540] font-normal leading-[1.5] px-2 py-0.5 rounded-[4px] border border-[#dee0ea] bg-[#f2f5f9] whitespace-nowrap"
                          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                        >
                          lobstr {item.cmd}
                        </span>
                      </span>
                      <span className="w-[35%] px-2.5 py-[15px] flex items-center text-[14px] leading-[1.5] text-[#6B7280]">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-15 rounded-xl bg-[#0A2540] px-7.5 py-10 text-center">
            <h3 className="text-[24px] font-bold text-white mb-4">Explore the full API documentation</h3>
            <p className="text-[#ffffffb3] mb-7.5 mx-auto">Reuse the same CTA treatment from the cleaner reference page to keep docs pages visually consistent.</p>
            <Link href="/docs/authentication" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-bold rounded-lg transition">
              Open API docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
