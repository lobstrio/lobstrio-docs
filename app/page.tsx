import Link from 'next/link';
import { ArrowRight, Zap, Shield, Code2, Database } from 'lucide-react';
import { codeToHtml } from 'shiki';
import Header from '@/components/layout/Header';

const pythonExample = `import requests

API_KEY = "your_api_key"
headers = {"Authorization": f"Token {API_KEY}"}

# 1. Create a squid with a crawler
squid = requests.post("https://api.lobstr.io/v1/squids",
    headers=headers,
    json={"crawler": "google-maps-scraper", "name": "Restaurants Paris"}
).json()

# 2. Add tasks to scrape
requests.post("https://api.lobstr.io/v1/tasks",
    headers=headers,
    json={
        "squid": squid['id'],
        "tasks": [{"url": "https://google.com/maps/search/restaurants+paris"}]
    }
)

# 3. Start the run
run = requests.post("https://api.lobstr.io/v1/runs",
    headers=headers,
    json={"squid": squid['id']}
).json()

# 4. Get results
results = requests.get("https://api.lobstr.io/v1/results",
    headers=headers,
    params={"run": run['id']}
).json()

for place in results['data']:
    print(f"{place['name']} - {place['rating']}★")`;

export default async function HomePage() {
  const highlightedCode = await codeToHtml(pythonExample, {
    lang: 'python',
    theme: 'github-dark',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 via-transparent to-accent-green/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get the data you need
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              The most powerful and easy-to-use data collection API.
              50+ ready-made crawlers, simple REST endpoints, structured JSON output.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/authentication"
                className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs/list-crawlers"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary px-6 py-3 rounded-lg font-medium transition-colors border border-border hover:border-text-muted"
              >
                Explore Crawlers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-y border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, text: '50+ Ready-made crawlers' },
              { icon: Code2, text: 'Simple REST API' },
              { icon: Database, text: 'Structured JSON output' },
              { icon: Shield, text: '99.5% success rate' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-accent-red flex-shrink-0" />
                <span className="text-sm text-text-secondary">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - How it works */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How it works</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Start collecting data in minutes. No infrastructure to manage, no proxies to configure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left - Steps */}
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Choose a crawler',
                desc: 'Google Maps, LinkedIn, Instagram, Twitter, and 50+ more ready to use.',
                link: '/docs/list-crawlers'
              },
              {
                step: 2,
                title: 'Create a squid',
                desc: 'Your scraping configuration. Link it to a crawler and set your preferences.',
                link: '/docs/create-squid'
              },
              {
                step: 3,
                title: 'Add tasks',
                desc: 'URLs or search parameters. Add one by one via API or bulk upload via CSV.',
                link: '/docs/add-tasks'
              },
              {
                step: 4,
                title: 'Start the run',
                desc: 'Launch the job and monitor progress in real-time.',
                link: '/docs/start-run'
              },
              {
                step: 5,
                title: 'Get results',
                desc: 'Retrieve structured JSON or set up automatic delivery to S3, webhooks, email.',
                link: '/docs/get-results'
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.link}
                className="flex gap-4 p-4 rounded-lg border border-transparent hover:border-border hover:bg-surface/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-accent-red text-white font-bold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-accent-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-red transition-colors flex-shrink-0 mt-2" />
              </Link>
            ))}
          </div>

          {/* Right - Code */}
          <div className="md:sticky md:top-6">
            <div className="bg-[#0d1117] rounded-xl border border-border overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-white/50 ml-2">example.py</span>
              </div>
              <div
                className="p-4 overflow-x-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* API Reference Grid */}
      <div className="bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            <p className="text-text-secondary">
              Everything you need to integrate Lobstr.io into your workflow
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Authentication', desc: 'Get your API key and authenticate requests', slug: 'authentication', color: 'bg-blue-500/10 text-blue-400' },
              { title: 'Crawlers', desc: 'Browse 50+ available scrapers', slug: 'list-crawlers', color: 'bg-green-500/10 text-green-400' },
              { title: 'Squids', desc: 'Create scraping configurations', slug: 'create-squid', color: 'bg-purple-500/10 text-purple-400' },
              { title: 'Tasks', desc: 'Add URLs and parameters', slug: 'add-tasks', color: 'bg-orange-500/10 text-orange-400' },
              { title: 'Runs', desc: 'Execute and monitor jobs', slug: 'start-run', color: 'bg-pink-500/10 text-pink-400' },
              { title: 'Results', desc: 'Retrieve scraped data', slug: 'get-results', color: 'bg-cyan-500/10 text-cyan-400' },
              { title: 'Delivery', desc: 'Auto-export to S3, webhooks', slug: 'configure-webhook-delivery', color: 'bg-yellow-500/10 text-yellow-400' },
              { title: 'Rate Limits', desc: 'API usage limits', slug: 'rate-limiting', color: 'bg-red-500/10 text-red-400' },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/docs/${item.slug}`}
                className="block p-5 bg-background border border-border rounded-xl hover:border-accent-red hover:shadow-lg transition-all group"
              >
                <h3 className="font-semibold group-hover:text-accent-red transition-colors mb-2">
                  {item.title}
                </h3>
                <span className="text-sm text-text-muted">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Get your API key and start collecting data in minutes.
          </p>
          <Link
            href="/docs/authentication"
            className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
