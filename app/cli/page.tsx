import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Terminal, Zap, Download, Settings, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CodeBlock from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'CLI - lobstr.io API Documentation',
  description: 'Command-line interface for the lobstr.io API. Run scrapers, manage squids, download results — all from your terminal.',
};

const FEATURES = [
  { icon: Zap, title: 'One-Command Scrape', description: 'The go command combines create, configure, add tasks, run, and download in a single command.' },
  { icon: Globe, title: '50+ Crawlers', description: 'Browse, search, and use any crawler by slug — Google Maps, LinkedIn, Twitter, and more.' },
  { icon: Download, title: 'CSV / JSON Export', description: 'Download results as CSV or JSON. Live progress bar while waiting for runs to complete.' },
  { icon: Settings, title: 'Delivery Config', description: 'Set up email, Google Sheets, S3, SFTP, or webhook delivery from the terminal.' },
];

const COMMANDS = [
  { group: 'Crawlers', cmds: ['crawlers ls', 'crawlers search <query>', 'crawlers show <slug>', 'crawlers params <slug>', 'crawlers attrs <slug>'] },
  { group: 'Squids', cmds: ['squid create <crawler> --name "My Scraper"', 'squid ls', 'squid show <id>', 'squid update <id> --param key=value', 'squid empty <id>', 'squid rm <id>'] },
  { group: 'Tasks', cmds: ['task add <squid> <url1> <url2> ...', 'task upload <squid> <file.csv>', 'task ls <squid>', 'task rm <id>'] },
  { group: 'Runs', cmds: ['run start <squid> --wait', 'run ls <squid>', 'run show <id>', 'run stats <id>', 'run abort <id>', 'run download <id> -o results.csv'] },
  { group: 'Results', cmds: ['results get <squid> --format csv -o data.csv'] },
  { group: 'Delivery', cmds: ['delivery email <squid> --email user@example.com', 'delivery webhook <squid> --url https://...', 'delivery s3 <squid> --bucket my-bucket'] },
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
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF2F2] text-[#FF0000] text-sm font-semibold mb-6">
            <Terminal className="w-4 h-4" />
            Command Line Interface
          </div>
          <h1 className="text-[42px] font-bold text-[#0A2540] leading-tight mb-5">
            lobstr CLI
          </h1>
          <p className="text-lg text-[#0A2540]/70 max-w-2xl mx-auto leading-relaxed">
            Run scrapers, manage squids, download results — all from your terminal. One command to go from zero to CSV.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#quickstart" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0000] text-white rounded-lg font-semibold text-sm hover:bg-[#E60000] transition">
              Quick Start <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://pypi.org/project/lobstrio/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-[#FF0000] hover:text-white rounded-lg font-semibold text-sm border border-[#FF0000] hover:bg-[#FF0000] transition">
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
          <p className="text-sm text-[#0A2540]/50 mt-3">Requires Python 3.10+. Installs the <code className="text-[13px] bg-[#F6F8FA] px-1.5 py-0.5 rounded border border-[#E5E7EB]">lobstr</code> command.</p>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-2">Features</h2>
          <p className="text-[#0A2540]/60 mb-10">Full control over lobstr.io from your terminal.</p>
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
          <p className="text-[#0A2540]/60 mb-6">The <code className="text-[13px] bg-[#F6F8FA] px-1.5 py-0.5 rounded border border-[#E5E7EB] font-mono">go</code> command does everything in one shot.</p>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">Terminal</div>
            <CodeBlock code={GO_EXAMPLES} language="bash" theme="light" showCopy showLabel={false} />
          </div>

          <h3 className="text-lg font-bold text-[#0A2540] mt-10 mb-4">Step-by-Step Workflow</h3>
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">Terminal</div>
            <CodeBlock code={WORKFLOW_EXAMPLE} language="bash" theme="light" showCopy showLabel={false} />
          </div>
        </div>
      </section>

      {/* Commands */}
      <section className="border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-2">Command Reference</h2>
          <p className="text-[#0A2540]/60 mb-10">All available commands grouped by resource.</p>
          <div className="space-y-6">
            {COMMANDS.map((g) => (
              <div key={g.group} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] text-sm font-semibold text-[#0A2540]">{g.group}</div>
                <div className="divide-y divide-[#E5E7EB]">
                  {g.cmds.map((cmd) => (
                    <div key={cmd} className="px-5 py-2.5 font-mono text-[13px] text-[#0A2540]/80">
                      <span className="text-[#FF0000]">lobstr</span> {cmd}
                    </div>
                  ))}
                </div>
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
